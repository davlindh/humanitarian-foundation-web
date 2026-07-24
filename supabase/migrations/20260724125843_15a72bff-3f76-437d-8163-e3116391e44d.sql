
-- Status enum
DO $$ BEGIN
  CREATE TYPE public.news_status AS ENUM ('draft','under_review','scheduled','published');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

ALTER TABLE public.news_posts
  ADD COLUMN IF NOT EXISTS status public.news_status NOT NULL DEFAULT 'draft',
  ADD COLUMN IF NOT EXISTS reviewer_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS submitted_at timestamptz,
  ADD COLUMN IF NOT EXISTS reviewed_at timestamptz;

-- Backfill from legacy is_published/published_at
UPDATE public.news_posts
SET status = CASE
  WHEN is_published AND (published_at IS NULL OR published_at <= now()) THEN 'published'::public.news_status
  WHEN is_published AND published_at > now() THEN 'scheduled'::public.news_status
  ELSE 'draft'::public.news_status
END
WHERE status = 'draft';

-- Keep is_published in sync with status (used by legacy checks)
CREATE OR REPLACE FUNCTION public.sync_news_publish_state()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.is_published := NEW.status IN ('published','scheduled');
  IF NEW.status = 'published' AND NEW.published_at IS NULL THEN
    NEW.published_at := now();
  END IF;
  IF NEW.status = 'under_review' AND (OLD IS NULL OR OLD.status IS DISTINCT FROM 'under_review') THEN
    NEW.submitted_at := now();
  END IF;
  IF NEW.status = 'published' AND (OLD IS NULL OR OLD.status IS DISTINCT FROM 'published') THEN
    NEW.reviewed_at := now();
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS news_posts_sync_publish ON public.news_posts;
CREATE TRIGGER news_posts_sync_publish
  BEFORE INSERT OR UPDATE ON public.news_posts
  FOR EACH ROW EXECUTE FUNCTION public.sync_news_publish_state();

-- Public read policy: only truly published + due
DROP POLICY IF EXISTS "Public can read live news" ON public.news_posts;
CREATE POLICY "Public can read live news"
  ON public.news_posts FOR SELECT
  TO anon, authenticated
  USING (status = 'published' AND (published_at IS NULL OR published_at <= now()));

-- Reviewers can see posts assigned to them (any status)
DROP POLICY IF EXISTS "Reviewers can read assigned news" ON public.news_posts;
CREATE POLICY "Reviewers can read assigned news"
  ON public.news_posts FOR SELECT
  TO authenticated
  USING (reviewer_id = auth.uid());
