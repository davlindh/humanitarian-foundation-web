## Scope

Rewrite the marketing components still using `p-10 bg-base-200` daisyUI styling so they match the Emerald Prestige / magazine system. Wire them to the images that already live in `public/images/` (the prior turn's "no images exist" note was wrong — hero-banner, project1–5, blog1–4, team, partners, infographics, and awareness images are all present).

## Components to rewrite

Each is currently a centered card grid on `bg-base-200`. Rewrite to use the same tokens as `PageHeader` / `Home` (`bg-paper`, `text-ink`, `text-ink-soft`, `text-emerald-deep`, `border-line`, `eyebrow`, Archivo Black headings, editorial rhythm, no card shadows).

- **`AboutUs.jsx`** — Story, Mission & Vision, Impact, Team, Partners. Drop the placeholder YouTube iframe. Keep the impact infographic as an inline figure. Team + partners become bordered profile blocks, not shadow cards.
- **`Projects.jsx`** — Drop the placeholder YouTube iframe. Keep the Leaflet map but restyle the container. Current/Past projects become magazine article blocks with image-left / copy-right rows, progress bars in gold, and existing `project1-5.jpg` images.
- **`News.jsx`** — Rewrite to the same divided-list pattern used in `Blog.jsx`, with a small category eyebrow and image thumbnails from `blog1-4.jpg`.
- **`Contact.jsx`** — Two-column layout: contact details + labelled form. Emerald submit button, `border-line` inputs, no card shadow.
- **`GetInvolved.jsx`** — Three stacked calls to action (Donate, Volunteer, Partner) as bordered feature blocks with an eyebrow, headline, body, and CTA.
- **`FeaturedProjects.jsx`** / **`ProjectShowcase.jsx`** — Reconcile with the new `Projects.jsx`. `FeaturedProjects` becomes a compact 3-up "highlighted programmes" strip; `ProjectShowcase` becomes a full-width photo gallery from the existing project images. If either becomes redundant, remove it from `pages/Projects.jsx` rather than keeping empty sections.
- **`Awareness.jsx`** page — Give it a `PageHeader`, use `container-wide`, and rebuild its three cards as bordered editorial blocks using the existing `awareness/*.jpg` files.

## Components not currently rendered anywhere

`MissionStatement`, `Testimonials`, `ImpactStories`, `Transparency`, `DonorRecognition`, `QuickLinks`, `InteractiveQuiz` — not referenced by any route after the P1 restructure. Delete them so they don't rot. If you want any of them kept for later, name which ones.

## Images

Use the files already in `public/images/` — no new asset generation needed. Files in use:

- Hero / featured: `hero-banner.jpg`, `project1-5.jpg`, `gallery1.jpg`, `impact1-2.jpg`
- Editorial: `blog1-4.jpg`
- Team: `team/john_doe.jpg`, `team/jane_smith.jpg`
- Partners: `partners/partner1-3.png`
- Infographics: `infographics/impact-infographic.png`, `project-progress-infographic.png`
- Awareness: `awareness/development_issues.jpg`, `educational_resources.jpg`, `news_updates.jpg`

Team roster and partner list stay as-is (John Doe / Jane Smith, Partner 1–3) since no real names were provided. Flag if you want placeholder copy replaced with real people/orgs.

## Verify

`bun run build`, then screenshot `/about`, `/projects`, `/news`, `/contact`, `/get-involved`, `/awareness` at 1280×1800 to confirm the daisyUI card look is gone and each page reads as one continuous editorial layout with the new palette.

## Out of scope

- Wiring admin CRUD forms to real Cloud tables (already flagged for a later pass).
- Generating new photography — the existing stock is used as-is.
- Changing the Home page or admin area.
