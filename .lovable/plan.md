## Goal

Replace the current `/get-involved` body with the "Prestige editorial actions" direction: a compact numeric impact strip followed by a 2×2 grid of engagement tiles that invert to emerald on hover. Keep the existing PageHeader (hero) and site chrome untouched.

## Scope

Only `src/components/GetInvolved.jsx`. No route changes, no DB changes, no new dependencies. Reuse existing design tokens (`bg-paper`, `bg-parchment`, `text-ink`, `text-emerald-deep`, `border-line`, `.eyebrow`, `.rule-gold`, `font-display`) — do not use raw hex codes from the prototype.

## New page structure

1. **Impact strip** — replaces the oversized infographic (`support-impact-infographic.png` is dropped from the render).
   - Section header row: eyebrow "The harvest of your support" + Archivo Black H2 "What contributions have funded so far" on the left; short lead paragraph on the right; hairline underline.
   - Three stat cells in a 3-col grid, each with a gold top rule, a large display number, an emerald sub-label, and a short sentence. Content pulled from real programme framing:
     - `42` — Districts reached — primary care, WASH and education programmes across East & Central Africa.
     - `$1.4M` — Programme spend — published budgets, independently audited outcomes.
     - `18k` — Lives supported — patients treated, students enrolled, households on clean water.

2. **Engagement grid** — 2×2 tiles on a thin emerald divider grid. Tiles: Donate, Volunteer, Partner, Events. Each tile:
   - Gold eyebrow category ("Finances", "Presence", "Collaboration", "Community")
   - Archivo Black H3 title
   - Short paragraph (kept concise, existing copy compressed)
   - Bottom action link with arrow, uppercase tracking
   - Hover: background flips to `bg-emerald-deep`, text/eyebrow/action recolor to parchment/gold. Use `group`/`group-hover` with a 500ms color transition.
   - Anchors: Donate → `#donate`, Volunteer → `mailto:volunteer@hufida.org`, Partner → `/partners`, Events → `#events`.

3. **Donate detail (`#donate`)** — kept, but re-laid to match the editorial rhythm: eyebrow + rule-gold + H2, then the existing 2-col (giving levels list + donation form). Trim intro copy. Keep form logic unchanged.

4. **Events detail (`#events`)** — kept as the existing date-rail diary list, retitled to sit under the engagement grid.

5. **Remove** the standalone Volunteer roles section — the tile links to email, and role detail is out of scope for this pass. (If we want it kept, it moves to a follow-up.)

## Technical notes

- Preserve the `useState` donate form and `handleSubmit` — no behavior change.
- Drop the `<img>` reference to `support-impact-infographic.png` from this component (asset stays on disk, unused here).
- All colors via tokens; the emerald tile hover uses `hover:bg-emerald-deep` + `group-hover:text-parchment` etc.
- Wrap sections in `<section id="...">` so the tile anchors scroll correctly; add `scroll-mt-24` for sticky-nav offset.
- Responsive: impact grid collapses to 1 col on mobile; engagement grid collapses to 1 col; tiles keep min padding `p-8 md:p-10`.
- No new fonts, no new packages, no changes to `PageHeader` or routing.

## Out of scope

Volunteer roles catalogue, real payment integration, event RSVP flow, CMS-backed impact numbers (hardcoded for now, easy to swap later).
