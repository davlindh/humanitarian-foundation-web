# Genomgång: var användaren förväntar sig mer detaljer

Nedan är alla punkter i den publika sajten där texten lovar "mer" — men där länken antingen är död, går till en listsida istället för en detaljvy, eller bara expanderar in-place utan en delbar permalänk. Grupperat per sida med föreslagen åtgärd.

## 1. Projects (`/projects`)

Nuvarande beteende (`src/components/Projects.jsx`):
- Varje programkort visar namn, beskrivning, status och en progress-bar — men det finns **ingen "Read more"** och ingen väg till en detaljsida per projekt.
- `FeaturedProjects` och `ProjectShowcase` renderas ovanpå listan utan egna länkar in.
- Kartmarkörer använder deterministisk jitter från `DEFAULT_POS` istället för riktiga koordinater, och popup:en har ingen "View project"-länk.

Åtgärd:
- Ny route `/projects/:slug` som hämtar ett projekt från `public.projects` och renderar full text, alla milstolpar (`milestones` filtrerat på `project_id`), resurser (`resources`), och location.
- Lägg till `slug` (unique) på `projects` om det saknas — DB-migration med backfill från `name`.
- Kort i `Projects.jsx` får titel som `<Link to={/projects/${p.slug}}>` + "Read the full brief →".
- Kartpopup får samma länk.
- `FeaturedProjects` "Learn more" pekar mot slug istället för `/projects`.

## 2. News (`/news`)

Nuvarande beteende (`src/components/News.jsx`):
- Två parallella affordanser på varje kort: "Read more ←/→" som togglar `expanded` in-place **och** en separat "Permalink" som går till `/news/:slug`. Förvirrande — samma innehåll, två interaktioner.
- Press releases använder bara toggle, ingen tydlig permalänk.
- Detaljvyn `PostView` visar innehåll men saknar **nästa/föregående-navigation**, relaterade poster, och delningslänkar.

Åtgärd:
- Ta bort in-place toggle. "Read more →" pekar direkt på `/news/:slug` (samma för blog och press).
- På `/news/:slug`: lägg till "← Föregående / Nästa →" baserat på `published_at`-ordning, samt ett block "Fler från samma kategori" (3 senaste med matchande `category`).
- Lägg till JSON-LD (`Article`) och `<title>`/`<meta description>` per post via `react-helmet-async` (installera).

## 3. Blog (`/blog`)

Nuvarande beteende (`src/pages/Blog.jsx`):
- Hårdkodad array `posts` med "Read more →" som är en `<button>` utan onClick — **helt död länk**.
- Innehållet överlappar med News (blog-poster ligger redan i `news_posts` med `post_type='blog'`).

Åtgärd:
- Ersätt hårdkodade listan med query mot `news_posts` där `post_type = 'blog'` och `is_published = true`.
- "Read more →" blir `<Link to={/news/${p.slug}}>` och återanvänder samma detaljvy.
- Alternativt: gör `/blog` till en alias-route som filtrerar `News`-komponenten på blog-typ.

## 4. About Us (`/about-us`)

Nuvarande beteende (`src/components/AboutUs.jsx`):
- Team-kort visar namn, roll, bio — men bio klipps aldrig och det finns ingen profilsida.
- Partner-kort länkar bara till extern `p.website`, ingen intern detaljvy.
- "Our Impact"-sektionen visar en statisk infografik utan länk till underliggande siffror/rapport.

Åtgärd:
- Kollapsa långa bios till 3 rader med "Read bio →" som expanderar in-place (inget behov av route här — bios är korta).
- Impact-figuren får en "Läs 2025 impact report →"-länk till `/news/2025-impact-report` (eller senaste post i kategori `report`).

## 5. Partners (`/partners`)

Nuvarande beteende (`src/pages/Partners.jsx`):
- Kort visar tier, namn, description. Extern länk endast om `website` finns. Ingen kategoriindelning (samma data som About visar redan grupperat).
- Ingen "Read more" / detaljvy per partner.

Åtgärd:
- Gruppera per `tier` (Government / Coalition / Foundation / Assurance) med rubriker — samma modell som redan används i About.
- Om `description` > 240 tecken: "Read more" som expanderar in-place.
- Extern webbsajt visas som sekundär pill-knapp "Visit website ↗" istället för inbäddad rubriklänk.

## 6. Home (`/`)

Nuvarande beteende (`src/pages/Home.jsx`):
- **"Read the full programme brief →"** på featured-programmet pekar på `/projects` (listsidan), inte på det specifika programmet.
- Supporting-kort ("Five new primary schools…", "Three health centres…") — titel-länk går också till `/projects`.
- "Latest"-listan i högerkolumnen har hårdkodade rubriker vars href alla är `/news`.

Åtgärd:
- Låt featured och supporting hämtas från `projects` (t.ex. flagga `is_featured` eller de tre nyaste `active`) och länka till `/projects/:slug`.
- "Latest"-listan hämtas från `news_posts` (senaste 3 publicerade) och länkar till `/news/:slug`.

## 7. Awareness (`/awareness`)

Nuvarande beteende (`src/pages/Awareness.jsx`):
- Tre hårdkodade kort ("Primer", "Library", "Updates") — **inga länkar alls**. Sidan är en återvändsgränd.

Åtgärd:
- Varje kort får en tydlig destination:
  - Primer → `/news?category=primer` (filtrerad newslista)
  - Library → ny sida `/awareness/library` som listar `resources` från DB där `is_public = true`
  - Updates → `/news`
- Lägg till `?category=` -stöd i `News.jsx` (query-param filter).

## 8. Get Involved (`/get-involved`)

Snabbkontroll: `#donate`-ankaret fungerar, men engagement-tiles (volunteer/partner/etc.) borde varje leda till ett dedikerat ankare eller sida med formulär snarare än en modal-lös tile.

Åtgärd:
- Volunteer-tile → `/get-involved#volunteer` med ett riktigt formulär (skriver till ny tabell `volunteer_applications`).
- Partner-tile → `/partners#become-a-partner` med kontaktformulär.
- (Utanför scope om användaren bara vill ha länknings-passet — flaggas här för nästa iteration.)

---

## Sammanfattande route-tillägg
```text
/projects/:slug         → nytt, detaljvy per programme
/awareness/library      → nytt, publika resurser
```

## DB-tillägg
- `projects.slug text unique not null` + backfill-migration.
- (valfritt) `projects.is_featured boolean default false` för Home-featured urval.

## Tekniska anteckningar
- Slug-generering återanvänder helper i `NewsAdmin.jsx` (`.slice(0,80)`-varianten) — extrahera till `src/lib/slug.ts`.
- Föregående/nästa i News: enkel `.lt()`/`.gt()` på `published_at` med `.limit(1)`.
- SEO per detaljvy: `react-helmet-async` installeras, `<HelmetProvider>` runt `<AuthProvider>` i `App.jsx`.
- Query-param filter i News: läs `useSearchParams()` och applicera på Supabase-queryn.

## Ordning
1. Slug + migration + `/projects/:slug` (störst impact — Home & Projects lovar redan detta).
2. Blog → News-driven (tar bort död "Read more"-knapp).
3. News in-place toggle bort + prev/next + related.
4. Awareness-kort får destinationer + `?category=` i News.
5. Home featured/supporting/latest hämtar från DB och länkar korrekt.
6. Partners tier-gruppering + expand.
7. About team bio-expand.
