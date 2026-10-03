# Design 4 — Bento of proof: live widgets, rearrangeable

## Brief

Portfolio of Martin Navrátil — senior frontend engineer, Nuxt specialist who ships fullstack (Nuxt 4, Hono, Cloudflare Workers, D1), Czechia, remote only; the link in his CV, read in 30–60 seconds by recruiters and hiring engineers. Direction: Nev Flynn lineage — the hero *is* nine tiles, but every tile is evidence: face, posters, the page's own Lighthouse and Core Web Vitals, its last commit, career, stack, e-mail, CV. Same-size tiles swap by drag, click or keyboard; the order is remembered. The memorable thing is not the grid: **the page measures itself**. Mood: a dense, calm **engineering datasheet** — warm near-black, mono index lines, hairline rules, serif identity type, flat 4 px tiles, no glow, no glass, one vermilion reserved for Download CV. Dark default; light mode first-class.

## Audience and the 30-second scan

Plan for a **1440×790 viewport** (1440×900 minus browser chrome). Visible without scrolling: name, the verbatim headline "Senior frontend engineer. Nuxt specialist who ships fullstack.", face, a one-line stack string, the Nambi poster with a working **Live** link, the proof panel, "Based in Czechia · remote only", e-mail and the vermilion **Download CV (PDF)** — tiles 01–06, rows 1–5, ending at 756 px. Hiring engineers scroll to Selected work and open a detail panel.

## Palette

Ratios against `bg` · `tile` · `tile-raised`. Dark (default):

| Token | Hex | Ratio |
|---|---|---|
| `bg` / `tile` / `tile-raised` | `#0F0E0C` / `#171512` / `#1E1B17` | page / tile / hover, panel, pills |
| `text` | `#F2EDE4` | 16.5 · 15.6 · 14.7 |
| `muted` (≥ 14 px) | `#A69F91` | 7.3 · 6.9 · 6.5 |
| `small` (12–13 px) | `#B5AD9E` | 8.7 · 8.2 · 7.7 |
| `accent` (CV fill, proof, focus, selection) | `#FF4D1C` | 5.8 · 5.5 · 5.2 |
| `accent-ink` on vermilion | `#0F0E0C` | 5.8 |
| `ok` / `warn` | `#7FD99A` / `#F2B84B` | 11.3 · 10.7 · 10.0 / 10.8 · 10.2 · 9.6 |
| `hairline` (decorative) | `#2A2721` | — |
| `control` (borders, 1.4.11) | `#6B6455` | 3.3 · 3.1; `muted` on `tile-raised` |

Light:

| Token | Hex | Ratio |
|---|---|---|
| `bg` / `tile` / `tile-raised` | `#F4F0E8` / `#FBF9F4` / `#FFFFFF` | — |
| `text` | `#16140F` | 16.2 · 17.5 · 18.4 |
| `muted` | `#5E584E` | 6.2 · 6.7 · 7.0 |
| `small` | `#4A453C` | 8.4 · 9.0 · 9.5 |
| `accent` | `#B83008` | 5.3 · 5.8 · 6.1; white on it 6.1 |
| `ok` / `warn` | `#1F6B3A` / `#8A5A00` | 5.7 · 6.2 · 6.5 / 5.2 · 5.6 · 5.9 |
| `hairline` / `control` | `#DDD6C9` / `#857D6E` | control 3.6 · 3.9 · 4.1 |

Pure `#FF4D1C` is never text on light (2.9:1). Selection `accent` with `accent-ink`. Nuxt UI `text-dimmed` (3.4:1) banned. Status never by colour alone: `ok` values carry ●, `warn` ○, plus "pass" / "needs work" in the accessible name.

## Typography

Three variable families, Czech diacritics verified. `@nuxt/fonts`, self-hosted woff2, `latin` + `latin-ext`, `font-display: swap` with `size-adjust` fallbacks (Georgia / Arial / Menlo); preload only Newsreader roman and Geist; ≤ 50 KB per file (fonttools `instancer` on Newsreader: `wght` 300–600, `opsz` 24–72).

- **Newsreader** (Google Fonts, true italic): name, headline, section titles, project names. 400, letter-spacing −0.015em, line-height **1.05** at ≥ 48 px with `overflow: visible` (Ř Ů Č never clipped), 1.1 at 24–40. Italic is the *twist* device; never body or UI.
- **Geist**: body 16 / 1.6, lead 18 / 1.55, UI 14 / 1.4 weight 500, metadata 12 / 16 uppercase, 0.08em, 500, `small`.
- **Geist Mono**: every figure; `tabular-nums`; 13 / 1.5 (≈ 7.8 px per character); proof hero number 56 / 1.0 weight 500.

Scale (≥ 1280 / 1024 / 390): name 48 / 40 / 36; headline 28 / 28 / 22, **Czech 26 / 26 / 20** ("Senior frontend engineer. Specialista na Nuxt, který dotáhne i backend." must hold two lines); intro 18 / 16 / 16; section title 40 / 40 / 30; work-row project name 32 / 28 / 24; tile project name 28 (Nambi), 18 (others); h3 20 / 20 / 18 Geist 600; table secondary copy 16 `muted`. `text-wrap: balance` on headings. Czech runs ~20 % longer; every width below is checked against it.

## Layout system

- Container 1280; gutters 16 / 32 (≥ 768) / 48 (≥ 1280). Spacing 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128. Sections 96 px apart (64 mobile), split by 1 px `hairline` rules with mono labels (`02 — Selected work`).
- Radii 4 px, pills 999. Shadow only on the dragged tile (`0 24px 48px -12px rgba(0,0,0,.6)`; `.25` light). Gradients only inside posters.
- **Pill**: 24 px, `tile-raised` fill, 1 px `control` border, `small` 12 uppercase. **Link pill**: 32 px, Geist 13 500 `text`, 12 px side padding, 44 px invisible hit area on `(pointer: coarse)`.
- **Tile**: 1 px `hairline` border, `tile` fill, 16 px padding, `:focus-within` outline 2 px `accent`. First line the mono index `01 IDENTITY` (`small`, 12 / 16 uppercase, 8 px below) — the datasheet voice, in every frame. Content box 92 / 228 / 364 px for one / two / three rows.
- **Grid**: gap 12, row 124 at every width ≥ 768, `grid-auto-flow: row` (never `dense`); DOM order = visual order = reading order. ≥ 1280: 6 × `1fr` (187.33 px) in 1184, 6 rows; after the 56 px header and 32 px padding row 5 ends at 756, row 6 at 892. 1024–1279: 4 × 231, 8 rows. 768–1023: 2 × 346, 12 rows. < 768: one column, auto rows. 2 cols = 387 px, 3 cols = 586; content = width − 32.
- Spans (6 / 4 / 2 cols): 01 3×3 / 2×3 / 2×3 · 02 3×2 / 2×3 / 2×2 · 03 3×1 / 2×1 / 2×1 · 04, 05 2×2 / 2×2 / 1×2 · 06 2×2 / 2×2 / 2×1 · 07, 08, 09 2×1 everywhere. Default order fills 36, 32 and 24 cells with no holes (at 4 columns the grid steps like brickwork: 03 under 01, 05 under 03).
- **Rearranging** (≥ 1024 only): a tile swaps only with one of the same span — group A {04, 05, 06}, group B {07, 08, 09}; 01–03 fixed. No holes, no growth, no CLS. State = nine ids in `localStorage` `mn.bento.v1`; invalid orders ignored; below 1024 the stored order renders in the column flow.

## Sections in order

**Header** — 56 px sticky, `bg` at 92 %, hairline bottom, no blur. Left `MARTIN NAVRÁTIL` Geist 500 13, 0.06em; skip link first in DOM. **< 768**: name · theme · "⌘K". **768–1023**: + Work · Experience · Contact · CV (14 px, 2 px accent underline on hover/current) · "Search ⌘K" (≈ 530 of 704 px). **≥ 1024**: + EN / CS and the motion switch (segmented System / Reduced / Full, 32 px, `control` border, active segment `text` fill with `bg` text) — ≈ 918 px with Czech links in 960. Language and motion also live in ⌘K, the island sheet and the footer.

**Hero — the bento** (default order, spans at ≥ 1280):

| # | Tile | Span | Content |
|---|---|---|---|
| 01 | Identity | 3×3 | Portrait `/images/portrait-placeholder.webp` 96×128 (3:4, 4 px radius, 20 % desaturated in dark) top-left, **Martin Navrátil** `<h1>` Newsreader 48 beside it; headline verbatim (28, two lines, *ships* italic); intro verbatim "I build fast, accessible web apps with Nuxt and Vue, and I take them all the way to production on Cloudflare." (Geist 18, two lines); "Based in Czechia · remote only" and `Nuxt · Vue · TypeScript · Hono · Cloudflare Workers · D1` (mono 13). 340 of 364 px; Czech fits at 26. |
| 02 | Nambi | 3×2 | Poster 280×175 left; column 258: name Newsreader 28 · "A barter marketplace where influencers exchange content for local-business experiences" (Geist 14) · pill *in progress* · link pills **Live ↗** nambi.cz and **Details**. At 2×3 (4 columns): wide poster 442×133 on top, text below. |
| 03 | Proof | 3×1 | Outlined: 1 px `accent` border, `tile` fill, figures `accent`. Left the Lighthouse performance score at 56 px; right three mono rows (`text`, ≤ 40 characters): `LIGHTHOUSE ● 97 · ● 100 · ● 100 · ● 100` / `LCP ● 0.9 s · INP ● 40 ms · CLS ● 0.00` / `JS ● 48 KB gz first view · 2026-10-02 ↗`. Index `03 PROOF — this page, measured on itself`; the date links to the GitHub Actions run that measured it. Lighthouse and first-viewport JS are measured by the CI run that deployed this build (deploy fails under 95, so never `warn`); CWV is field data from a scheduled Worker's JSON and may show ○. Values sit in the DOM at build time; no tooltips. |
| 04 | Tábořiště Kondor + SkautSim | 2×2 | Wide poster 354×106 (not a link) · name Newsreader 18 · "Fundraising site for a scout troop building its own campsite" (Geist 13, ≤ 2 lines) · pills **Live ↗** taboriste.fenixb.cz, **SkautSim ↗** skautsim.fenixb.cz. |
| 05 | Becky Kay Livingstonová | 2×2 | Same anatomy; "A therapist's website built to be usable by everyone"; one pill **Live ↗** beckykaylivingston.cz. |
| 06 | Contact + CV | 2×2 | `hello@martinnavratil.dev` underlined mailto (Geist 14) + 32×32 copy button ("Copy e-mail", toast "Copied") · **Download CV (PDF)** — the only vermilion-filled element on the page (36 px, `accent-ink` / white text) · GitHub, LinkedIn 32×32 icon buttons with tooltip and sr label. At 2×1 (768) one row. |
| 07 | Now | 2×1 | `COMMIT a1b2c3d · 3 h ago · main` (linked to this site's public repo; after 14 days the ISO date replaces "ago") / `DEPLOYED 2026-10-02 · CI run ↗` / `TIME 14:32 · Prague`. Worker JSON hourly; fallback build metadata and the client clock. Rows always rendered (`—` placeholder), so data never shifts the tile. |
| 08 | Stack | 2×1 | Three mono lines ≤ 44 characters, labels `small` uppercase: `FRONTEND TypeScript · Vue · Nuxt · Tailwind` / `BACKEND Hono · Drizzle · Cloudflare Workers` / `QUALITY · XR Vitest · Zod · Three.js · WebXR`. No badges; the full list lives in Experience. |
| 09 | Experience | 2×1 | `2022–2026 Develit Full Stack Engineer` / `2020–2022 Sensorico Frontend Developer` / `2018–2020 Spatial Hub Frontend Developer`; index `09 EXPERIENCE — full table ↓` (link, 24 px padding box). |

Under the grid, 13 px mono, ≥ 1024 only: "Drag a tile onto one of the same size to swap · Reset layout" (Reset hidden at default order).

**Mobile hero (< 768)**: one fixed column, auto heights, no handles. Portrait 96×128 beside the 36 px name; the stack string wraps to two lines; tile 01 ends with a 44 px CTA row — `hello@martinnavratil.dev` and vermilion **Download CV (PDF)** — so identity, stack and contact end at ≈ 520 of 812 px; Nambi's 16:10 poster (358×224) and **Live** pill follow on the first swipe.

**Selected work** — three ruled rows (Nambi; Tábořiště Kondor + SkautSim; Becky Kay Livingstonová): 16:10 poster 320 px left; right, name Newsreader 32, tagline, summary and role verbatim from the Content and images section (roles: Nambi "Fullstack: architecture, API and data model, web apps, CI"; Kondor "Design system, site, 3D integration"; Becky "Design direction with Claude Design, build, accessibility audit"), mono stack, links (both for Kondor + SkautSim), **Details**. Details expands an in-page panel: **Problem**, **My role**, **Decisions** (numbered), **Outcome** in four columns (stacked on mobile), then **Links**; `aria-expanded`, Esc collapses, `?project=nambi` deep-links and moves focus to the panel heading. Only Nambi has `detail` copy; Kondor's and Becky's Details button is **hidden until theirs exists** — never a placeholder.

**More projects** — one ruled row per project, columns 3 / 5 / 3 / 1 of 12 (stacked < 768): name Geist 600 16 · tagline `muted` 14 verbatim · stack mono 12 · status pill; 4 px left rule in the product colour: Nuxt Study `#00DC82`, Účetnictví Blansko `#0F766E`, Skautské hlasování `#7C3AED`, RoboPilot `#DC2626`. Links and status as listed in the Content and images section; no thumbnails.

**Experience** — table Period · Company · Role · Location, mono dates, company Newsreader 24, summary `muted` 16 beneath, mono stack; then the four skill groups in full, Education (Mendel University, Brno — Bachelor's degree, Software Engineering, thesis SkautSim) and Leadership (Junák – český skaut, Scout Group Leader, 100+ members). Below 768 rows become cards with explicit `role="table" / row / columnheader / cell`.

**Contact** — "The fastest way is e-mail." Newsreader 40; the address a Newsreader 40 underlined link; Copy e-mail, vermilion Download CV (PDF), CV as a web page; GitHub, LinkedIn. All text `text`, never `accent`, because Silk sits behind it.

**Footer** — "Built with Nuxt. Source on GitHub." (underlined), © 2026 Martin Navrátil, EN/CS, theme, motion switch.

**/cv page** — print-first A4, white, text `#16140F`. Main column: headline, intro, experience with highlights, selected projects (name, tagline, role, link), education. Sidebar 56 mm: portrait 24×32 mm, contact with printed URLs, skills, leadership. Name Newsreader 28 pt, headline 12 pt, body Geist 10.5 pt / 1.4, dates Geist Mono 9 pt; the only colour a 2 pt `#B83008` rule under the name; `@page { margin: 16mm }`; two pages maximum in both languages (Czech overflow valves: project summaries fall back to taglines, then the fourth Develit highlight; `cv:pdf` fails CI on a third page). On screen: `bg`, a bar with "Download PDF" and "Back to the site".

**Mobile navigation** — Inspira **Scroll Island**: a 48 px pill fixed bottom-centre (16 px above the safe area), `tile-raised` fill, `muted` border, section name in `text` (14.7:1), thin vermilion progress arc (`aria-hidden`); < 1024 always, ≥ 1024 after one viewport of scroll. `<nav aria-label="Site">` holding a `<button aria-expanded aria-controls>`; expands into a 320 px `role="dialog" aria-modal="true"` sheet: Work · Experience · Contact · CV (44 px rows), EN/CS, theme, motion, Search; focus trapped, Esc closes, `aria-current` on the section.

## Project posters

Two compositions per featured project from the same art: **16:10** (640×400, 1280×800: tile 02, work rows, mobile) and **wide 10:3** (708×212, 1416×424: tiles 04, 05, and 02 at 4 columns). Three layers: abstract background in the product's colours, an Inspira device mockup of **one product component at 200 %**, never a whole page, whose screen stays an empty labelled placeholder in this design, and a 12 px mono wordmark. Static WebP with `width`/`height`, alt = project name + "poster"; Nambi's hero poster `fetchpriority="high" loading="eager"`, the rest `loading="lazy"`, all `decoding="async"`.

- **Nambi** — two overlapping discs in Nambi's brand colours, royal blue `#4361EE` and cerise `#EB49C8`, on deep navy `#1A1B51`, 40 px blur; Safari mockup whose screen is a placeholder for one offer card; `nambi.cz` wordmark in white (15.9:1).
- **Tábořiště Kondor + SkautSim** — `#1F4D2E` → `#0C1A12`, 1 px topographic contour at 15 % white; iPhone mockup of the 3D campsite at an angle, a small 3:2 frame of the SkautSim VR scene; `taboriste.fenixb.cz · skautsim`.
- **Becky Kay Livingstonová** — cream `#F5F5DC`, orange `#FF6105` condensed type fragments, 8 % grain; Safari mockup of her wordmark hero; `beckykaylivingston.cz`.

## Components

Inspira UI:
- **Scroll Island** — mobile and post-hero navigation; striking, rarely seen, fills a real gap (the scaffold has no mobile nav).
- **Variable Text** — the name follows the cursor along Newsreader's weight axis 300–600, `(hover: hover)` only. SSR renders the plain `<h1>`; the effect enhances after hydration, letter spans `aria-hidden`, `aria-label="Martin Navrátil"` on the h1, inline-size reserved at weight 600 so nothing reflows.
- **Safari mockup**, **iPhone mockup** — rendered into the static posters.
- **Silk** (`bg-silk`) — the one WebGL element, behind Contact only. The registry version imports three.js: port the fragment shader to **ogl**, chunk ≤ 40 KB gz, else ship only the static radial. IntersectionObserver-loaded when Contact is within one viewport, `<ClientOnly>` + `defineAsyncComponent`, paused off-screen, skipped under reduced motion, `prefers-reduced-data`, Save-Data or no WebGL, `aria-hidden`. `accent` blended ≤ 20 % over `bg` (dark peak `#3F1B0F`: text 13.1, muted 5.8; light `#E8CABB`: text 11.9, muted 4.6). Fallback `radial-gradient(60% 50% at 50% 40%, accent 12%, transparent)`.
- **Blur Reveal** (vendored) — the text column of work rows only.

Nuxt UI 4: `UButton` (primary `text` fill / `bg` text; CV button `accent` fill; secondary `control` outline; 36 px, 44 on touch), `UTooltip` (icon buttons, handle), `UCommandPalette` in `UModal` (⌘K: sections, projects, copy e-mail, download CV, theme, language, motion; `defineAsyncComponent` on first use), `UColorModeButton`, `UKbd`. The grid (bespoke CSS Grid, not Inspira's Bento Grid), the motion switch (`radiogroup` of three `radio`s) and the detail panel are custom.

## Motion

**Lenis** (lerp 0.1, `syncTouch: false`; off under reduced motion or the switch — native scroll, `scroll-behavior: auto`) drives **GSAP ScrollTrigger** (reveals, SplitText, island arc). **motion-v** owns layout: swaps, panel height, island expand, toast. The grid renders static; GSAP, Lenis and the swap module (`LazyMotion` + `domMax`, pointer handlers) are imported on idle after first paint, the swap module only ≥ 1024. Tokens 150 / 250 / 400 / 700 ms; out `cubic-bezier(.22,1,.36,1)`, in-out `cubic-bezier(.65,0,.35,1)`; layout spring stiffness 420, damping 38, mass 1. Only `transform` and `opacity` animate, with two named exceptions: Blur Reveal's `filter` on text and Variable Text's `font-variation-settings`.

| Element | Full | Reduced (system or switch) |
|---|---|---|
| Hero on load | tiles 01–02 at full opacity from the start, only y 12 → 0 (LCP intact); 03–09 opacity 0 → 1, y 12 → 0, 400 ms out, stagger 40 ms; hidden state gated on `html.js` | 150 ms opacity on 03–09 |
| Stored order | an inline script after the grid validates `mn.bento.v1` and re-appends tile nodes before paint; the component reads the same key in client setup, so hydration matches; no CLS | same |
| Swap by drag (pointer, ≥ 1024) | 8 px threshold; dragged tile scale 1.02, shadow, `tile-raised`; same-size tiles get a 2 px `accent` outline; the hovered target slides into the vacated slot (`layout` spring); drop settles 250 ms; DOM nodes move | 1:1 move, no scale, target snaps |
| Swap by click or keyboard | the 24×24 handle (six dots, `control`) is `<button aria-label="Move Nambi" aria-describedby>`; click, Enter, Space or M (only while focused) enters move mode — live region "Moving Nambi. Choose a tile of the same size."; same-size tiles become 44 px "Swap here" buttons; arrows cycle, Enter or click swaps ("Swapped with Contact"), Esc cancels | identical, instant |
| Reset layout | 400 ms layout | snap |
| Variable Text | weight follows cursor, 120 ms lerp | static 400 |
| Proof and now values | 150 ms opacity when JSON replaces the build value | same |
| Section titles | SplitText lines (`aria: 'auto'`), wrappers with 0.15 em vertical padding, y 100 % → 0, 700 ms, stagger 60 ms | 150 ms fade |
| Work rows | text column Blur Reveal 8 → 0 px, poster opacity + y 8 → 0, 400 ms at 20 % visible | fade |
| More projects, Experience, Contact, footer | opacity + y 8 → 0, 400 ms | fade |
| Detail panel | height via `layout` 400 ms, content fades 150 ms after | instant height, fade |
| Anchors, deep links | Lenis 700 ms | native jump |
| Scroll Island | continuous arc; expand spring 250 ms | arc continuous; instant + fade |
| Theme toggle | View Transition circle 400 ms | 150 ms crossfade |
| Silk | 30 fps while visible | static fallback |
| Toast (`role="status"`) | rises 8 px, 250 ms, leaves after 1.6 s | fade |

No parallax, pinning or scroll hijack. Hover states (underline, border → `control`) are 150 ms in both modes.

## The signature

A portfolio that measures itself: next to his face, in the first viewport, the page shows its own Lighthouse scores, Core Web Vitals and first-view bundle size, linked to the CI run that produced them, and the commit that shipped three hours ago. The nine datasheet tiles can be tidied — same-size tiles swap by drag, click or keyboard — and the desk is still yours when you come back.

## Accessibility

WCAG 2.2 AA, axe in CI. Drag has a single-pointer alternative (2.5.7, the handle's click menu) and a keyboard path; handles 24 px (2.5.8); icon buttons 32 px, 44 on touch. Tiles are `listitem`s in a `role="list"` grid, `aria-roledescription="movable tile"` ≥ 1024 only; order changes announced politely. Focus ring 2 px `accent` + 2 px `bg` offset (5.8:1 dark, 5.3:1 light), never obscured (`scroll-margin-top: 72px`, `scroll-margin-bottom: 80px`). Inline links underlined (1 px, offset 3 px). Skip link, one h1, `lang` per locale, tooltip content duplicated as sr text.

## Responsive

390: one column, no handles, island nav, work rows and panel columns stack, experience as cards with table roles · 768: 2-column static bento, island nav · 1024: 4-column brick bento, swaps on, full header · 1280–1440: 6 columns, tiles 01–06 above 790 px. Targets 44 px on touch, 24 minimum; no horizontal scroll at 320 px.

## Deliverables for Claude Design

1. Style tile: both palettes, type scale, buttons (default / hover / focus / pressed / disabled) with the vermilion CV button, motion switch, pills, tile anatomy with hover / focus-within / move-mode states, poster system (16:10 and wide).
2. Home dark 1440 (default order, 790 px viewport marked), light 1440, 1024 (brick grid, tightest header), 768, and mobile 390 with the island collapsed and expanded.
3. Project panel open — Nambi, desktop and mobile.
4. States: tile mid-drag with target outline; move mode with its live-region text; proof panel with a ○ CWV value; Copied toast; ⌘K open.
5. /cv at A4 plus its on-screen wrapper; motion spec frame (every Motion row with trigger, duration, easing, reduced fallback).

Build the animations into the prototype (CSS transitions, IntersectionObserver reveals, scroll-progress variables, pointer transforms); do not only describe them.

Content gaps for Martin before launch: Problem / Decisions / Outcome copy for Kondor + SkautSim and Becky; the real portrait; the accountant site's URL.

## Do not

- No preloader, scroll hijack, pinning, parallax, cursor follower, glass, glow, gradient borders, mesh or purple/blue AI gradients; no `dense` grid or CSS `order`.
- No second WebGL element, nothing WebGL in the mobile first viewport; the name is never a canvas or image.
- No lorem ipsum or "[TO WRITE]", availability line, phone number, stack badges or count-up numbers; proof values are placeholders labelled "measured at build".
- No Inspira component outside the six named; no text under 4.5:1, `text-dimmed`, colour-only status, unlabelled icon buttons, hover-only affordances on touch, or drag promised below 1024.

---

<!-- content:start · generated by `pnpm brief:content` from the site data; do not edit by hand -->

## Content and images

This section is the only source of facts about Martin and his work: projects, jobs, dates, numbers and quotes. Use every string exactly as written. Anything not listed here does not exist yet: leave it out, never invent it, and never draw lorem ipsum or a TODO box. Interface labels that the brief itself introduces are allowed; every other label comes from the interface strings below. Field names used earlier in the brief (tagline, summary, role, highlights, detail, Problem / Decisions / Outcome) refer to the labels in this section.

### Images

No images are attached: this design is a layout and motion study for Martin, and the real images are added in code. Wherever the brief mentions the portrait, a screenshot, a device screen or a photo, draw an empty frame at its exact size, aspect ratio, radius and position, filled with a flat neutral tone from the palette and a small mono label naming what will go there, for example "Portrait" or "Screenshot · taboriste.fenixb.cz". Everything else on a poster is designed in full: colour field, grain, monogram, device frame and caption. Only the screen inside the device stays empty. Never generate, search for or invent photos, screenshots, logos or stock imagery.

For context, the hero direction comes from two references Martin liked: a large serif identity sentence with one italic twist word beside an experience table at a glance, and a big name above a fanned stack of work above a big role line. Where they differ from this brief, the brief wins.

### Profile

- Name: Martin Navrátil
- Headline: Senior frontend engineer. Nuxt specialist who ships fullstack.
- Intro: I build fast, accessible web apps with Nuxt and Vue, and I take them all the way to production on Cloudflare.
- Location: Based in Czechia · remote only
- E-mail: hello@martinnavratil.dev
- Links: GitHub github.com/navratilmartin · LinkedIn linkedin.com/in/martin-navrátil-a14234232 · Site martinnavratil.dev
- CV files: /martin-navratil-cv.pdf (English), /martin-navratil-cv-cs.pdf (Czech); the CV as a web page lives at /cv.

### Featured projects, in this order

#### Nambi
- 2026 · in progress · Live: nambi.cz
- Tagline: A barter marketplace where influencers exchange content for local-business experiences
- Summary: Monorepo with a tRPC API on Nitro, admin and company web apps, a marketing landing and a Capacitor mobile app. Offers, applications, term proposals, deliverables, ratings and chat in one flow.
- Role: Fullstack: architecture, API and data model, web apps, CI
- Stack: Nuxt 4 · Turborepo · tRPC · Hono · better-auth · Cloudflare D1 · Capacitor · Vitest · Playwright
- Problem: Collaborations between small businesses and influencers live in DMs and spreadsheets: no shared state, no history, no accountability.
- Decisions:
  1. One monorepo with shared packages, so the admin, company and mobile apps share types, auth and UI.
  2. tRPC over Hono on Nitro for end-to-end typed APIs on Cloudflare D1.
  3. Magic-link onboarding: an admin creates the company account, the company sets its own password.
- Outcome: Demo-ready with seeded walkthrough accounts; dev, staging and production environments on Cloudflare.
- The app is private; nambi.cz is its public landing page.
- Brand colours (from Nambi's own design system): royal blue #4361EE, cerise #EB49C8, persimmon #F87153, deep navy #1A1B51.

#### Tábořiště Kondor
- 2026 · live · Live: taboriste.fenixb.cz
- Tagline: Fundraising site for a scout troop building its own campsite
- Summary: A static promo and fundraising site for the 3rd scout troop Kondor Blansko, with a 3D preview of the campsite and a door into SkautSim, a VR simulation of the camp.
- Role: Design system, site, 3D integration
- Stack: Nuxt 4 · PrimeVue · TresJS · three.js · Tailwind v4 · Cloudflare Workers
- No Problem / Decisions / Outcome copy yet.

#### Becky Kay Livingstonová
- 2026 · live · Live: beckykaylivingston.cz
- Tagline: A therapist's website built to be usable by everyone
- Summary: Multi-page site with an accessibility-first brief: WCAG 2.2 AA as the floor, an on-page motion switch, axe and interaction checks in CI, GSAP scroll choreography and a contact form delivered through Cloudflare Email Routing without third parties.
- Role: Design direction with Claude Design, build, accessibility audit
- Stack: Astro 7 · Tailwind v4 · GSAP · Lenis · Cloudflare Workers · Playwright · axe-core
- No Problem / Decisions / Outcome copy yet.

#### SkautSim
- 2026 · live · Live: skautsim.fenixb.cz
- Tagline: A VR simulation of a scout camp with multiplayer
- Summary: Bachelor's thesis project with two co-authors: walk through the planned campsite in VR, meet others in the same scene over WebRTC and send photos from the game to the campsite website.
- Role: One of three authors: multiplayer and the bridge to the website
- Stack: three.js · Vite · WebRTC · Docker
- No Problem / Decisions / Outcome copy yet.

### More projects, in this order

#### Nuxt Study
- 2026 · live · Live: prep.martinnavratil.dev
- Tagline: A spaced-repetition study app for Vue, Nuxt and the web platform
- Summary: 177 study pages in seven tracks, 749 questions with spaced repetition synced across devices, timed quiz runs with model answers, flashcards extracted from the content at build time, notes and progress stats.
- Role: Solo: content model, custom Nuxt module, progress sync on D1, UI
- Stack: Nuxt 4 · Nuxt Content 3 · Nuxt UI 4 · Cloudflare Workers · D1 · nuxt-auth-utils · CodeMirror
- Problem: Keeping Vue, Nuxt and web-platform knowledge sharp meant juggling docs, notes and question lists with no feedback loop on what I actually retained.
- Decisions:
  1. Content as Markdown collections plus a local Nuxt module that extracts flashcards at build time, so one source feeds study pages, flashcards and the trainer.
  2. Every page is prerendered; the Cloudflare Worker only runs for the progress-sync API backed by D1.
  3. A Leitner-style scheduler brings weak questions back sooner instead of cycling everything equally.
- Outcome: Live at prep.martinnavratil.dev: 749 questions, 157 glossary terms and a 21-day study plan.

#### Účetnictví Blansko
- 2025 · live · Source: github.com/navratilmartin/accountant-web
- Tagline: Website for an accounting practice in Blansko
- Summary: Service pages, client references and a contact form sending through Resend, with sitemap and image optimisation.
- Role: Solo
- Stack: Nuxt · UnoCSS · FormKit · Resend · Cloudflare Workers
- No Problem / Decisions / Outcome copy yet.

#### Skautské hlasování
- 2025 · archived · no links
- Tagline: Real-time emoji voting for scout meetings
- Summary: A leader presents statements, participants vote anonymously from their phones and results update live. Runs on a local network without internet.
- Role: Solo
- Stack: Vue 3 · Vite · socket.io · Tailwind
- No Problem / Decisions / Outcome copy yet.

#### RoboPilot
- 2025 · archived · no links
- Tagline: Robot-arm control with live camera and audio streaming
- Summary: A FastAPI camera server streaming over WebRTC, stream clients, and Python modules driving a UR arm and its gripper over sockets.
- Role: Solo
- Stack: Python · FastAPI · WebRTC · ur-rtde
- No Problem / Decisions / Outcome copy yet.

### Experience, newest first

#### Develit
- Aug 2022 – Sep 2026 · Full Stack Engineer · Remote
- Summary: Fintech products on Nuxt 4 SSR, a company-wide microservice platform on Cloudflare Workers with typed RPC, and shared Nuxt layers used by every frontend app.
- Highlights:
  1. Led development on fintech projects built with Nuxt 4 SSR.
  2. Designed the company microservice infrastructure on Cloudflare Workers with typed RPC.
  3. Created company-wide Nuxt layers for UI shared across all frontend applications.
  4. Built scalable web platforms following modern UI/UX principles.
- Stack: TypeScript · Nuxt 4 · Nuxt Layers · Hono · Cloudflare Workers

#### Sensorico
- Dec 2020 – Aug 2022 · Frontend Developer · Brno
- Summary: Web application for managing smart lighting and water meters, in a corporate, agile team.
- Stack: TypeScript · Nuxt 3 · Tailwind · Vue Query · Zod

#### Spatial Hub
- Jul 2018 – Dec 2020 · Frontend Developer · Brno
- Summary: An open-source UI library for augmented-reality environments and its integration into WebXR applications for businesses.
- Stack: JavaScript · A-Frame · Three.js · Docker

### Education

- Mendel University, Brno · Bachelor's degree · Software Engineering
- Years not confirmed yet: show no dates.
- Note: Web applications, database systems, software architecture, OOP, neural networks, algorithms. Bachelor's thesis: a web multiplayer VR game (SkautSim).

### Leadership

- Junák – český skaut, Blansko · Scout Group Leader
- Start year not confirmed yet: show no dates.
- Summary: Leading a troop of 100+ members: leadership, teamwork and planning in practice.

### Skills

- Frontend: TypeScript · Vue · Nuxt · Nuxt Layers · CSS · SCSS · Tailwind
- Backend & infrastructure: Hono · Drizzle · SQL · Cloudflare Workers · Docker · GitHub Actions · Sentry
- Quality & tooling: Vitest · Zod · Figma
- 3D & XR: Three.js · A-Frame · WebXR

### Interface strings (English)

- Navigation: Skip to content · Work · Experience · Contact · CV
- Work: Selected work · More projects · Live · Source · Role · Stack · Problem · Decisions · Outcome · Details · live / in progress / archived
- Experience: Experience · Period · Company · Role · present
- Contact: Contact · The fastest way is e-mail. · Copy e-mail · Copied · Download CV (PDF) · CV as a web page
- CV page: Curriculum vitae · Download PDF · Back to the site · Selected projects · Contact · Education · Skills · Leadership · Portrait of Martin Navrátil
- Settings: Language · Theme · Switch to light mode · Switch to dark mode · Motion · Motion: system · Motion: reduced · Motion: full
- Footer: Built with Nuxt. Source on GitHub.

### Czech strings for the fit checks (Czech runs about 20 % longer)

- Headline: Senior frontend engineer. Specialista na Nuxt, který dotáhne i backend.
- Intro: Stavím rychlé a přístupné webové aplikace v Nuxtu a Vue a dotahuju je až do produkce na Cloudflare.
- Location: Česko · pouze remote
- Navigation: Přeskočit na obsah · Projekty · Zkušenosti · Kontakt · Životopis
- Work: Vybrané projekty · Další projekty · Web · Zdrojový kód · Role · Technologie · Problém · Rozhodnutí · Výsledek · Podrobnosti · v provozu / ve vývoji / archiv
- Experience: Zkušenosti · Období · Firma · Role · dosud
- Contact: Kontakt · Nejrychlejší cesta je e-mail. · Zkopírovat e-mail · Zkopírováno · Stáhnout životopis (PDF) · Životopis jako webová stránka
- CV page: Životopis · Stáhnout PDF · Zpět na web · Vybrané projekty · Kontakt · Vzdělání · Dovednosti · Vedení · Portrét Martina Navrátila
- Settings: Jazyk · Vzhled · Přepnout na světlý režim · Přepnout na tmavý režim · Animace · Animace: podle systému · Animace: omezené · Animace: plné
- Footer: Postaveno na Nuxtu. Zdrojový kód na GitHubu.

<!-- content:end -->
