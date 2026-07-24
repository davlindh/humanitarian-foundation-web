
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS slug text;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS is_featured boolean NOT NULL DEFAULT false;

-- Backfill slug from name
UPDATE public.projects
SET slug = regexp_replace(regexp_replace(lower(name), '[^a-z0-9]+', '-', 'g'), '(^-+|-+$)', '', 'g')
WHERE slug IS NULL OR slug = '';

-- Deduplicate any collisions by appending short id suffix
UPDATE public.projects p
SET slug = p.slug || '-' || substr(p.id::text, 1, 6)
WHERE p.id IN (
  SELECT id FROM (
    SELECT id, slug, row_number() OVER (PARTITION BY slug ORDER BY created_at) rn
    FROM public.projects
  ) x WHERE x.rn > 1
);

ALTER TABLE public.projects ALTER COLUMN slug SET NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS projects_slug_key ON public.projects(slug);
