## Problem

On About Us, each partner card renders the name twice: once as the logo fallback text and again as the heading below. So partners without a `logo_url` show "TGI / TGI", "Great Lakes WASH Coalition / Great Lakes WASH Coalition", etc.

Source: `src/components/AboutUs.jsx`, the "Partners & Sponsors" card renders `p.name` inside a `<span>` when `p.logo_url` is missing, then prints `p.name` again as the `<h3>`.

## Fix

In `src/components/AboutUs.jsx`, replace the text-name fallback with a non-duplicating placeholder:

- If `logo_url` exists: render the `<img>` as today.
- Else: render initials (first letter of up to two words of `p.name`, uppercased) inside the same 24-height slot, styled as a subtle monogram (parchment tile, emerald type). This preserves layout rhythm without repeating the name.

Keep the `<h3>` name/link below unchanged. No other pages or DB changes.
