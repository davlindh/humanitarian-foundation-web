## Problem

The `group_profiles` table powers the public **Partners** page (`/partners`) and the "Partners & Sponsors" block on About Us. Inside the admin, most surfaces already call it **Partners**:

- `AdminHome.jsx` dashboard tile → "Partners"
- `GroupProfilesAdmin.jsx` page header eyebrow → "Partners"
- Public nav + footer → "Partners"

But the admin sidebar (`AdminLayout.jsx`) still labels the same link **"Group profiles"**, so navigating from the dashboard tile "Partners" lands on a page titled "Partners" reached via a sidebar item called "Group profiles". That is the misinterpretation.

## Fix

Standardize the admin-facing label to **Partners** (the user-facing concept) while keeping the internal table/route name `group_profiles` / `/admin/group-profiles` untouched.

- `src/pages/admin/AdminLayout.jsx`: change sidebar label `Group profiles` → `Partners`.

Nothing else needs to change — dashboard, page header, public nav, and DB schema are already aligned on "Partners".

## Out of scope

- Renaming the `group_profiles` table or the `/admin/group-profiles` route (would require a migration and route rewrite for no user benefit).
- Any change to `AdminActivity` table filter, which correctly uses the raw table name `group_profiles`.
