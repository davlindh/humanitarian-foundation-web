
-- News posts: draft/publish flag and slug
ALTER TABLE public.news_posts
  ADD COLUMN IF NOT EXISTS is_published boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS slug text;

-- Existing seeded rows should be considered published
UPDATE public.news_posts SET is_published = true WHERE is_published = false AND published_at IS NOT NULL;

-- Allow null published_at (drafts have no publish date yet)
ALTER TABLE public.news_posts ALTER COLUMN published_at DROP NOT NULL;

-- Backfill slugs from titles
UPDATE public.news_posts
SET slug = regexp_replace(lower(trim(title)), '[^a-z0-9]+', '-', 'g')
WHERE slug IS NULL;

-- Deduplicate slugs by suffixing id fragment
UPDATE public.news_posts n
SET slug = n.slug || '-' || substr(n.id::text, 1, 6)
FROM (
  SELECT slug FROM public.news_posts GROUP BY slug HAVING count(*) > 1
) dup
WHERE n.slug = dup.slug;

CREATE UNIQUE INDEX IF NOT EXISTS news_posts_slug_key ON public.news_posts(slug);

-- Projects: display fields
ALTER TABLE public.projects
  ADD COLUMN IF NOT EXISTS cover_image text,
  ADD COLUMN IF NOT EXISTS location text,
  ADD COLUMN IF NOT EXISTS status text;

-- Group profiles: display fields
ALTER TABLE public.group_profiles
  ADD COLUMN IF NOT EXISTS logo_url text,
  ADD COLUMN IF NOT EXISTS website text;

-- Profiles: display fields
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS avatar_url text,
  ADD COLUMN IF NOT EXISTS bio text;

-- === Public read access ===
GRANT SELECT ON public.projects TO anon;
GRANT SELECT ON public.milestones TO anon;
GRANT SELECT ON public.profiles TO anon;
GRANT SELECT ON public.group_profiles TO anon;

-- Replace overly broad news read with a live-only policy
DROP POLICY IF EXISTS "Public can read news" ON public.news_posts;
CREATE POLICY "Public can read live news"
  ON public.news_posts FOR SELECT
  TO anon, authenticated
  USING (
    is_published = true
    AND (published_at IS NULL OR published_at <= now())
  );

CREATE POLICY "Public can read projects"
  ON public.projects FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public can read milestones"
  ON public.milestones FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public can read profiles"
  ON public.profiles FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public can read group profiles"
  ON public.group_profiles FOR SELECT
  TO anon, authenticated
  USING (true);
