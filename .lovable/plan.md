# Restyle the four legacy pages

Bring `/quiz`, `/advanced-search`, `/user-profile`, `/user-dashboard` onto the Emerald Prestige system used by the rest of the site. All four currently render bare daisyUI (`p-10 bg-base-200`, `btn btn-primary`, `input input-bordered`) with no `PageHeader` and no editorial framing.

## Shared treatment (all four)

- Wrap in `<PageHeader>` for the title + eyebrow + gold rule, matching About/Projects/News.
- Replace daisyUI utilities with the project's Tailwind tokens: `bg-paper`, `bg-parchment/40`, `text-ink`, `text-ink-soft`, `text-emerald-deep`, `border-line`, focus ring `focus:border-gold`.
- Buttons: solid emerald primary (`bg-emerald-deep text-paper hover:bg-emerald-deep/90`) and outline secondary (`border border-line hover:border-gold`).
- Inputs/selects/textareas: `w-full border border-line bg-paper px-3 py-2 focus:outline-none focus:border-gold`.
- Section container: `mx-auto max-w-4xl px-4 py-12` (quiz narrower at `max-w-2xl`).

## Per-page changes

**InteractiveQuiz (`/quiz`)** — editorial quiz card.
- Progress row: "Question X of Y" eyebrow + a thin gold progress bar.
- Question in `font-display` serif-black, options as full-width bordered answer cards (hover → gold border, selected state on click).
- Result screen: score in large display type, subtle summary line, "Restart" outline button.
- Extend to 4 HUFIDA-relevant questions (health, water, education, region) so the quiz is representative rather than trivia.

**AdvancedSearch (`/advanced-search`)** — themed filter form.
- Same field set (term, category, tag, date range), themed inputs, two-column grid on desktop, single column on mobile.
- Adds a small "No results yet — run a search" empty-state block under the form so the page isn't blank after submit. Search logic stays as `console.log` (unchanged scope).

**UserProfile (`/user-profile`)** & **UserDashboard (`/user-dashboard`)** — themed shells, still mock/local (they don't persist anywhere today, and wiring them to Cloud is outside this request).
- UserProfile: two-column layout on desktop — avatar/upload block on the left, name/email/bio/privacy on the right; native file input styled via a bordered label wrapper.
- UserDashboard: keep the two lists (Recent Activity, Saved Content) but as bordered rows on `bg-parchment/40` with eyebrow labels for activity type and date, matching the News page pattern.
- Both pages get a small info line at the top: *"Demo view — data is not saved yet."* so it's clear these aren't the admin CRUD.

## Not in scope

- No new routes, no removals, no auth wiring for UserProfile/UserDashboard, no backend changes.
- No changes to `PageHeader`, tokens, or other pages.

## Files touched

- `src/components/InteractiveQuiz.jsx`
- `src/components/AdvancedSearch.jsx`
- `src/components/UserProfile.jsx`
- `src/components/UserDashboard.jsx`
