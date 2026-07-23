# Real tables + RLS for the admin CRUD

The six admin forms (`/admin/projects`, `tasks`, `milestones`, `resources`, `profiles`, `group-profiles`) currently call `supabase.from(...)` against tables that don't exist. This plan creates those tables, locks them down with an admin-only role, and keeps the existing form code working unchanged.

## Tables

All in `public`, all with `id uuid pk`, `created_at`, `updated_at` (auto via trigger), plus a `created_by uuid` referencing `auth.users` for auditing.

| Table | Domain columns |
|---|---|
| `projects` | `name` (required), `description` |
| `tasks` | `name` (required), `description`, `status` (`open`/`in_progress`/`done`, default `open`), `project_id` (nullable FK → projects) |
| `milestones` | `name` (required), `description`, `project_id` (nullable FK → projects), `due_date` |
| `resources` | `name` (required), `description`, `url` |
| `profiles` | `name` (required), `email`, `role` (free-text, e.g. "Field officer") |
| `group_profiles` | `name` (required), `description` |

Column set matches what the existing forms already insert (`name`, `description`, or `name`+`email` for profiles). Extra columns are nullable so current forms keep working; they become useful when forms are extended later.

Note: `profiles` here is the HUFIDA people directory managed in the admin — it is NOT an auth-user profile. Kept the name to avoid touching working component code.

## Access control

Use the standard roles pattern (roles must live in their own table, never on a user row):

- `app_role` enum with values `admin`, `editor`, `viewer` (only `admin` is used today; the others give us room).
- `user_roles(user_id, role)` table.
- `has_role(_user_id uuid, _role app_role)` — `security definer`, `stable`, `set search_path = public`.
- Trigger on `auth.users` insert: if the `user_roles` table is empty, grant the new user `admin`. This bootstraps the first signup as admin so the site owner can log in and use `/admin` immediately; every later signup gets no role until an admin grants one.

RLS on all six CRUD tables:

- SELECT / INSERT / UPDATE / DELETE: allowed only when `has_role(auth.uid(), 'admin')`.
- No `anon` grants — data is admin-only.
- `authenticated` gets `SELECT, INSERT, UPDATE, DELETE`; `service_role` gets `ALL`.

RLS on `user_roles`:

- SELECT: a user can read their own rows; admins can read all.
- INSERT / UPDATE / DELETE: admins only.

## What is NOT changing

- No changes to `src/components/*Form.jsx` / `*List.jsx` — their existing `.from('projects')` etc. calls will start working the moment the migration runs.
- No changes to `/admin` routing or `AuthContext`.
- No changes to marketing pages.

## Follow-ups (not in this plan, flag only)

- The current forms don't stamp `created_by`. That's fine because RLS is admin-only, but adding `created_by: user.id` on insert would improve auditing — worth a small follow-up.
- No UI yet for granting `admin` to a second user; done via SQL until an admin screen exists.

## Deliverable

A single `supabase--migration` call containing: enum, `user_roles`, `has_role`, first-user bootstrap trigger, the six CRUD tables with GRANTs + RLS + admin policies, and a shared `update_updated_at_column` trigger.
