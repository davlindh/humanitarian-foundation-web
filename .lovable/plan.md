
## Current diagnosis

The Emerald Prestige system is technically consistent but reads visually harsh on mobile:

- **Zero border-radius** anywhere. Tiles, images, cards, form fields, buttons — all 90° corners. Combined with Archivo Black at display sizes, every block feels like a stamped brick.
- **Archivo Black everywhere** for headings. It's a poster face, not an editorial face — at H1 mobile size ("WHAT CONTRIBUTIONS HAVE FUNDED SO FAR") it screams instead of narrates.
- **Hard color blocks** — emerald hero → parchment section with no transition, gradient, texture, or soft edge between them.
- **Rigid grid** — hairline `border-line` dividers everywhere, no soft shadows, no depth, no warmth.
- **No motion, no tactility** — hover states flip colors but nothing lifts, fades, or breathes.

## Reference extractions

Three humanitarian / editorial systems worth stealing from wholesale:

1. **charity: water** (charitywater.org) — Warm cream base, generous rounded corners on imagery (12–20px), serif display face paired with humanist sans body, big soft photography, gold-yellow accent used sparingly. Emotional but disciplined.
2. **The Rockefeller Foundation** (rockefellerfoundation.org) — Editorial magazine feel, serif display (Publico-like), asymmetric layouts, subtle paper texture, muted greens with warm neutrals, rounded image treatments, real whitespace rhythm.
3. **Doctors Without Borders / MSF** (doctorswithoutborders.org) — Strong photojournalism, restrained typography, generous line-height, cards with soft shadow rather than hard borders, subtle radius on interactive elements.

Common thread: **serif display + softer geometry + photographic warmth + restrained accent**. That's the direction.

## Proposed system changes

### Typography — replace Archivo Black
- **Display:** switch to a warm editorial serif — recommend **Fraunces** (variable, humanist, has "SOFT" axis) or **Instrument Serif** (elegant, closer to charity: water / Rockefeller). Archivo Black retires.
- **Body:** keep **Hind** (works well) OR upgrade to **Inter Tight** / **Söhne**-alike for sharper editorial body. Recommend keeping Hind for continuity.
- Introduce a display size scale that actually breathes: H1 mobile drops from ~48px black to ~40px serif regular/medium.

### Geometry — soften everything
- Introduce a radius scale: `--radius-sm: 6px`, `--radius-md: 12px`, `--radius-lg: 20px`, `--radius-xl: 32px`, `--radius-full: 9999px`.
- Images: `rounded-lg` (12px) minimum, feature images `rounded-xl` (20px).
- Cards / tiles / form fields: `rounded-md` (12px).
- Buttons: `rounded-full` for primary CTAs (charity: water pattern), `rounded-md` for secondary.
- The Get Involved 2×2 emerald-flip tiles: rounded corners + gentle shadow instead of hard borders.

### Color — warm the palette
- Keep emerald deep (#064e3b) and gold (#c9a84c) as brand anchors.
- Shift `--color-surface` from #fdfaf0 to a warmer paper (#faf6ec) with a very subtle noise/paper texture SVG overlay (optional).
- Add `--color-emerald-mist` (very pale emerald tint) for section alternation instead of hard emerald→parchment jumps.
- Replace hard `border-line` dividers with soft shadow tokens: `--shadow-soft: 0 4px 24px -8px rgba(6,78,59,0.08)`, `--shadow-lift: 0 12px 40px -12px rgba(6,78,59,0.15)`.

### Transitions & rhythm
- Section-to-section: fade the emerald hero into parchment via a 40–80px gradient band instead of a hard cut.
- Add default `transition-all duration-300 ease-out` on interactive elements.
- Introduce subtle hover lifts (`translate-y-[-2px]` + shadow) on tiles and cards.

### Motion (light)
- Fade + rise on section reveal (`opacity 0 → 1`, `translateY 12px → 0`) using intersection observer or Framer Motion — not required for v1, but tokens should support it.

## Scope of the refactor

Files touched:
- `src/index.css` — new tokens (radius, shadows, warmed surface, mist), retire eyebrow harshness, soften rule-gold to 2px, add serif display font.
- `tailwind.config.js` — add `borderRadius` scale, `boxShadow` tokens, add `serif` fontFamily, warm palette additions.
- `index.html` — swap Google Fonts (add Fraunces or Instrument Serif, keep Hind).
- **Component sweep** to apply new radius + shadow tokens: `NavigationBar`, `PageHeader`, `HeroSection`, `GetInvolved`, `Projects`, `News`, `AboutUs`, `Contact`, `Partners`, `FeaturedProjects`, `Home`, admin `primitives.jsx`.
- No behavior, routing, or data changes.

## Open decisions for you before I build

1. **Display serif** — Fraunces (playful, warm, variable) or Instrument Serif (elegant, editorial, closer to Rockefeller)?
2. **Radius intensity** — subtle (8/12/16px, MSF-style) or generous (12/20/32px, charity: water-style)?
3. **Paper texture overlay** — yes (adds warmth, ~2KB SVG) or no (keep flat)?

Once you answer these three I'll issue the full refactor in one pass.
