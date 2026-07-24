## Problem

Two mismatches on the Partners surface:

1. **`/partners` is hard-coded.** `src/pages/Partners.jsx` renders a static array (District Health Ministries, Great Lakes WASH Coalition, East African Education Trust, Independent Auditors Africa) and never touches the DB. The admin at `/admin/group-profiles` — which the About page already reads from — holds the real records (The Grassroot Institute, Great Lakes WASH Coalition, District Education Working Group). So the public Partners page and the admin/About list disagree.
2. **Admin page still says "Group profiles"** in the H1 (`GroupProfilesAdmin.jsx` `title="Group profiles"`), even though the sidebar, dashboard tile, page eyebrow, and public site all use "Partners".

The hard-coded array also uses a `tier` label ("Government / Coalition / Foundation / Assurance") that has no matching column in `group_profiles`, so we can't render that classification from the DB today.

## Fix

- **DB:** add nullable `tier text` column to `public.group_profiles` (migration). No backfill — admins fill it in per record.
- **`src/pages/Partners.jsx`:** remove the static array; fetch `group_profiles` ordered by `name`, render each card with `tier` as the eyebrow (fallback: "Partner"), name (linked to `website` when present), and `description`. Keep the existing PageHeader copy and the two-column editorial grid. Handle loading and empty states in the site's tone.
- **`src/pages/admin/GroupProfilesAdmin.jsx`:**
  - Change `title="Group profiles"` → `title="Partners"`.
  - Add a `Tier` text field to the form and include it in `defaults` and `toPayload`.
  - Show the tier in the row meta line (e.g. `Coalition · updated 2026-07-24`).

## Out of scope

- Renaming the `group_profiles` table or the `/admin/group-profiles` route.
- Changes to About page's "Partners & Sponsors" block — it already reads live data and works.
- Turning `tier` into an enum. Free-text keeps admins flexible; we can tighten later if needed.
