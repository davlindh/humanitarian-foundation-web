
## Goal

Complete the design token layer so every surface — public site AND admin — inherits the same Emerald Prestige geometry, motion, and editorial style. Retire daisyUI as the styling authority. Ship reusable React primitives so future work never touches raw utility classes.

## Token layer (src/index.css + tailwind.config.js)

### 1. Color — semantic layer on top of the palette
Palette stays; add role tokens so components consume intent, not hue:

```
--surface           /* page background (parchment warm) */
--surface-elevated  /* cards, popovers — slightly lighter */
--surface-muted     /* alternating bands (emerald-mist) */
--surface-inverse   /* emerald-deep sections */

--content           /* body ink */
--content-soft      /* secondary text */
--content-inverse   /* text on emerald */
--content-brand     /* emerald deep for headings */
--content-accent    /* gold for eyebrows */

--border-subtle     /* hairlines */
--border-strong     /* dividers */
--border-brand      /* emerald outlines */
```

### 2. Radius — already scaled; add semantic aliases
`--radius-field`, `--radius-card`, `--radius-pill`, `--radius-image`.

### 3. Shadow — expand from 2 to 4
`--shadow-hairline` (1px inset for cards on parchment), `--shadow-soft`, `--shadow-lift`, `--shadow-overlay` (modals, popovers).

### 4. Gradients — named, reusable
`--gradient-emerald-fade` (hero→paper transition, already inline), `--gradient-gold-rule` (2px gold line accent), `--gradient-hero-veil` (image overlay for legibility).

### 5. Motion
`--ease-editorial: cubic-bezier(0.22, 1, 0.36, 1)`, `--duration-fast: 180ms`, `--duration-base: 280ms`, `--duration-slow: 480ms`. Applied via a `.transition-editorial` utility.

### 6. Focus, spacing rhythm
`--focus-ring: 0 0 0 3px rgba(201,168,76,0.35)`, section padding scale, container widths already tokenized.

### 7. Tailwind theme extends
Expose all of the above as Tailwind utilities: `bg-surface-elevated`, `text-content-soft`, `border-border-subtle`, `shadow-overlay`, `rounded-card`, `duration-base`, `ease-editorial`, `bg-gradient-emerald-fade`.

## Component primitives (`src/components/ui/`)

Small, headless-ish, token-driven React primitives. No daisyUI. All use `class-variance-authority`-style variants inline (already using `clsx`-style patterns), no new dependency needed.

- **`Button.jsx`** — variants: `primary` (emerald pill), `secondary` (gold outline pill), `ghost`, `link`, `donate` (gold fill). Sizes: `sm | md | lg`. Loading state.
- **`Link.jsx`** — variants: `inline` (emerald underline), `standalone` (arrow suffix), `nav` (active-aware, wraps NavLink).
- **`Card.jsx`** — surfaces: `paper | elevated | inverse`. Optional `hoverable` prop triggers lift + shadow-lift.
- **`Field.jsx`** + **`Textarea.jsx`** + **`Select.jsx`** — themed labels, focus rings, error state. Retires daisyUI `input`/`select`/`textarea`.
- **`Badge.jsx`** — variants: `neutral | brand | gold | success | warning | danger`.
- **`Divider.jsx`** — variants: `hairline | rule-gold | soft`.
- **`Eyebrow.jsx`** — replaces raw `<p className="eyebrow">`.
- **`SectionHeader.jsx`** — bundles eyebrow + rule + title + optional lead (already partially in `PageHeader`, but for in-page sections).

Each primitive exports its variant class fn so admins can compose without importing daisyUI.

## Migration sweep

- **Public marketing:** `HeroSection`, `Home`, `AboutUs`, `Projects`, `News`, `Contact`, `GetInvolved`, `Partners`, `FeaturedProjects`, `Breadcrumb`, `NavigationBar`, `Awareness`, `Blog`, `InteractiveQuiz`, `AdvancedSearch`, `UserProfile`, `UserDashboard`, `ProjectShowcase`. Swap `btn btn-*`, `card`, `input`, `select`, `textarea`, `badge`, `alert` → primitives.
- **Admin:** `AdminLayout`, `AdminHome`, `AdminActivity`, `AdminRoles`, `NewsAdmin`, all `_shared/*` (`ResourcePage`, `primitives.jsx`, `ImageUploader`). Rebuild the admin `primitives.jsx` on top of the new `ui/` primitives so both worlds share one system.
- **Auth pages:** `Auth.jsx`, `AdminRoute` empty states.

## Retire daisyUI

- Remove `require("daisyui")` from `tailwind.config.js`.
- Remove `data-theme="hufida"` from `index.html`.
- `bun remove daisyui` in build mode.
- Grep sweep for `btn|card|input|select|textarea|badge|alert|tabs|modal|drawer|menu|navbar|hero-content|hero-overlay|hero-slide` daisy class survivors; convert each.

## Verification

- `bun run build` clean.
- Playwright shots at 390px and 1280px of: `/`, `/get-involved`, `/about-us`, `/projects`, `/news`, `/contact`, `/auth`, `/admin`, `/admin/news`. Confirm consistent radius, pill CTAs, gold eyebrows, soft shadows, no square daisyUI leftovers.

## Files created / modified (headline)

**New:** `src/components/ui/{Button,Link,Card,Field,Textarea,Select,Badge,Divider,Eyebrow,SectionHeader}.jsx`, `src/components/ui/index.js`, `src/components/ui/variants.js` (shared cva-style helper).

**Modified:** `src/index.css` (full token expansion), `tailwind.config.js` (semantic tokens + gradients + motion, drop daisyUI), `index.html` (drop data-theme), `package.json` (drop daisyUI), plus every component listed in the migration sweep.

**No changes:** routing, data fetching, RLS, edge functions, business logic.

## Risks

- daisyUI removal touches many files; done as one coordinated pass to avoid a half-migrated state.
- `react-slick`'s slick-theme.css still ships default dot styling — will theme via override in `index.css`.

## Out of scope

- New pages, copy changes, motion beyond token-level transitions (no scroll-linked animation), image asset changes.
