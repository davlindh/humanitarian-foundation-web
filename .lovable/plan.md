## Admin upgrade — dashboard, uploads, publishing, public wiring

### 1. AdminHome dashboard
Turn the current link grid into a real overview.
- Top strip: counts for Projects, Tasks, Milestones, Resources, Profiles, Group profiles, News (published / drafts).
- "Recent activity" panel: last 10 rows from `admin_activity_log` with actor, action, table, record name, timestamp — click-through to `/admin/activity`.
- "Needs attention" panel: news drafts, news scheduled for the future, tasks without a project.
- Quick-create buttons that jump to each resource page with the inline editor open.

### 2. Media uploads (covers & avatars)
- Create a **public** Storage bucket `media` with RLS: public read, admin-only write/update/delete.
- New shared `ImageUploader` component used by:
  - News manager → `cover_image`
  - Projects manager → new `cover_image` column
  - Profiles manager → `avatar_url`
  - Group profiles manager → new `logo_url` column
- Uploader shows current image, "Upload" and "Remove" actions, stores the public URL in the row.
- Small schema migration: add `projects.cover_image text`, `group_profiles.logo_url text`.

### 3. News publishing workflow
Refit `/admin/news` around a real editorial flow.
- Status model built on existing `is_published` + `published_at`: **Draft** (not published), **Scheduled** (published + future date), **Live** (published + past date).
- List filter tabs: All / Drafts / Scheduled / Live, plus search on title.
- Editor changes: slug auto-generated from title with manual override + uniqueness check; "Save draft", "Publish now", "Schedule…" actions; "Copy public link" button; validation for required fields.
- Public `/news` and post pages read only Live posts (published + `published_at <= now()`); admins can preview any post via `?preview=<id>` (RLS already allows admin read).

### 4. Wire public pages to the database
Replace hardcoded content with live reads. All queries are anon-safe SELECTs guarded by new public-read RLS policies (writes stay admin-only).
- `/news` + individual post view → `news_posts` (Live only).
- `/projects` list + featured strip on home → `projects` (+ `milestones` for progress where present).
- `/about-us` team roster → `profiles`; partners strip → `group_profiles`.
- Loading skeletons and empty states in the Emerald Prestige style; keep existing imagery as fallbacks when a row has no cover/avatar.

### 5. RLS additions (writes stay admin-only)
Add `GRANT SELECT ... TO anon` and a public-read policy on `projects`, `milestones`, `profiles`, `group_profiles`, plus a `news_posts` policy scoped to Live rows. Existing admin-only insert/update/delete policies remain untouched. Re-run the linter after.

### Technical notes
- Storage bucket created via `supabase--storage_create_bucket` (not SQL); object policies via migration on `storage.objects`.
- Uploader uses `supabase.storage.from('media').upload(...)` with a path like `covers/<uuid>.<ext>` and reads back the public URL.
- Dashboard counts use `select('*', { count: 'exact', head: true })` per table in parallel.
- Slug uniqueness: check via `select id from news_posts where slug = ? and id <> ?` before save.
- No changes to `AdminRoles`, `AdminActivity`, or the audit triggers.

### Out of scope
- Rich-text editor for news body (still textarea/Markdown).
- Editor-role permissions, bulk ops/CSV export, i18n.
