
# Admin pages — audit & plan

## What's there today

- `/admin` shell (`AdminLayout`, `AdminHome`) plus finished screens: `AdminRoles`, `AdminActivity`. Both are polished and themed.
- Six CRUD resources (`projects`, `tasks`, `milestones`, `resources`, `profiles`, `group_profiles`) each have a **List** and a separate **New** page.
- All twelve list/form components are the original scaffold: no styling (plain `<ul>`, unstyled inputs, no design tokens), no toasts, no validation, **no edit, no delete**, no empty/loading/error states beyond `console.error`. Forms don't reset or navigate after submit.
- `ProfileList`/`Form` only reads `name` + `email`, but the real `profiles` table has 7 columns (bio, role, avatar, etc.) that are invisible in the UI.
- **No admin UI for `news_posts`** even though the table exists, is seeded, and drives the public `/news` page.
- `ProtectedRoute` only checks `user`, not role. Any signed-in viewer/editor can reach `/admin` and see forms that then silently fail against admin-only RLS.
- Forms POST but never show success/failure to the user; lists don't refresh after a create.

## Goal

Turn `/admin/*` into a coherent editorial workspace: role-gated entry, one screen per resource with list + inline create/edit + delete, News manager included, consistent Emerald Prestige styling.

## Plan

### 1. Role-gated admin shell
- Extend `ProtectedRoute` (or add `AdminRoute`) to also verify `private.has_role(auth.uid(), 'admin')` via RPC; non-admin authenticated users get a "You need admin access" screen instead of a broken form.
- `AdminLayout` shows the caller's role next to their email.

### 2. Shared admin primitives (`src/pages/admin/_shared/`)
- `ResourcePage` — themed page shell: eyebrow, `rule-gold`, heading, "New" toggle, list container.
- `AdminTable` — bordered rows with name/meta, edit + delete actions, empty state, loading skeleton, error banner.
- `AdminField` — labeled input/textarea/select using `bg-parchment/40`, `border-line`, focus-gold styling.
- `useCrud(table, selectCols)` — hook wrapping list/insert/update/delete with toast + refresh.
- `confirmDelete()` — small modal helper.

### 3. Rebuild the six resources
For each of `projects`, `tasks`, `milestones`, `resources`, `profiles`, `group_profiles`:
- Merge `XxxList` + `XxxForm` into a single `/admin/<resource>` screen with inline "New / Edit" panel (retire the separate `/new` route).
- Surface the real columns that exist in the DB (e.g. project `status`, task `due_date` + `status`, milestone `target_date`, resource `url` + `type`, profile `role` + `bio` + `avatar_url`, group_profile `type` + `website`).
- Add edit + delete actions with confirmation and optimistic refresh.
- Toast on success/error.

### 4. Add News manager
- New route `/admin/news` (`NewsList`/inline editor).
- Fields: `title`, `slug`, `excerpt`, `body`, `category` (blog/press), `cover_image`, `published_at`, `is_published`.
- Slug auto-derived from title with manual override.

### 5. Navigation & housekeeping
- Add "News" card to `AdminHome` and link in `AdminLayout` sidebar.
- Remove `/admin/<resource>/new` routes from `src/App.jsx` (inline editor replaces them).
- Delete the twelve now-unused legacy list/form components.

## Out of scope
- No schema changes (all needed columns already exist).
- No changes to `AdminRoles` or `AdminActivity` — they're already done.
- Public marketing pages are untouched; wiring `/news` to the DB stays separate work.

## Technical notes
- Role check RPC: `supabase.rpc('has_role', { _user_id, _role: 'admin' })` — already exposed through the `private.has_role` wrapper.
- All writes go directly through the client; RLS + the existing `log_admin_activity` triggers cover authz and audit.
- Toasts: use existing daisyUI/shadcn toast primitive already in the project (fall back to a tiny inline notice component if none is wired).
