# Design 2 — Quiet editorial with one signature interaction

Revision 3 — grafts applied: posters from 01, palette from 03, status-bar proof from 04; review fixes folded in

## Brief

The personal site of Martin Navrátil, a senior frontend engineer and Nuxt specialist who ships fullstack (Nuxt 4, Hono, Cloudflare Workers, D1), based in Czechia, remote only. It is the link in his CV; readers are recruiters and hiring engineers who give it 30–60 seconds. Rauno Freiberg / Brittany Chiang / Emil Kowalski school: text first, one reading column, dark by default and system-aware, almost no decoration; proof comes from shipped work and care in details. Exactly one signature interaction, **Inspect mode**, turns the page into an annotated, measured blueprint of itself; everything else is still. Mood: an engineering notebook in warm soot and bone, one amber signal. English copy; Czech strings are ~20% longer and must fit.

## Audience and the 30-second scan

In the first viewport (1440×900 desktop, 390×844 phone, measured in §1) the reader gets, in order: who, what, the two actions (e-mail, CV), proof (three posters with stack lines and live links), where. Nothing is gated; every first-viewport element is at full opacity by 400ms; the first project is reachable in under 2 s on a mid-range phone. Depth lives in place: an in-page panel per featured project. Inspect mode rewards the curious, never required.

## Palette

Warm neutrals with a hint of brown, never grey-blue; one amber accent, no gradients, no glow; hairlines carry structure. Ratios are WCAG 2.x on `bg`/`surface`/`raised` of the same theme; "dim" = the colour at 92% opacity over `bg` during Inspect.

| Token | Dark | Light | Use | Ratios dark — light (bg/surface/raised, dim) |
|---|---|---|---|---|
| `bg` | `#0C0B0A` Pitch | `#F4F0E8` Paper | page, header | — |
| `surface` | `#161412` Soot | `#FBF9F5` | row hover, secondary hover fill, tags | 1.07 vs `bg`, always hairline-separated |
| `raised` | `#211E1B` Ash | `#EAE4DA` | panel, sheet, ⌘K, Inspect notes and bar | — |
| `line` | `#2E2A26` | `#D9D2C6` | hairlines, rules, dot grid | decorative |
| `line-strong` | `#756C60` | `#857D71` | control borders, poster edges, portrait ring | 3.81/3.56/3.21, dim 3.39 — 3.57/3.86/3.21, dim 3.16 |
| `text` | `#F1ECE3` Bone | `#161412` Ink | body, headings, primary fill | 16.71/15.62/14.10, dim 14.14 — 16.17/17.47/14.53, dim 13.28 |
| `muted` | `#B5AC9F` | `#5E574E` | taglines, roles, metadata ≥ 14px | 8.77/8.20/7.40, dim 7.51 — 6.26/6.77/5.63, dim 5.21 |
| `faint` | `#9C9387` | `#5F5950` | 12–13px mono: periods, footer, captions, bar | 6.50/6.07/5.48, dim 5.62 — 6.09/6.59/5.48, dim 5.07 |
| `accent` | `#F5B82E` Amber | `#F5B82E` Amber | fills only: chips, selection | vs `bg` 11.03 — 1.57, so light fills get a 1px `accent-text` border |
| `accent-text` | `#F5B82E` Amber | `#7A4F00` Ochre | links, twist word, focus ring, Inspect outlines, cost figures, in-progress dot | 11.03/10.31/9.30, dim 9.38 — 6.27/6.78/5.64, dim 5.25 |
| `accent-ink` | `#161412` | `#161412` | text on `accent` fills | 10.31 on `accent`, both themes |
| `status-live` | `#3DD68C` | `#1F7A4D` | live dot, non-text | 10.48/9.80/8.84 — 4.68/5.06/4.21 |

Rules: `muted` and `faint` are the only secondary text colours (Nuxt UI `dimmed`, 3.4:1, is banned); `faint` never below 12px. Amber is never text or a line in light: every light link, ring and outline is Ochre. `::selection { background: accent; color: accent-ink }`. Running-text links: `text`, 1px underline offset 3px, `accent-text` on hover; standalone links and nav: `accent-text`, underline on hover and focus. Dark is default; system preference and the toggle switch to light.

## Typography

Self-hosted via `@nuxt/fonts`, `font-display: swap` with metric fallbacks, latin + latin-ext `unicode-range` subsets, ≤ 50KB per file, Czech diacritics verified per face.

- **Identity serif: Newsreader**, 400 roman and 400 italic at display optical size (`opsz` 36–72). H1, Contact closing line, panel names, poster monograms. H1 56px/1.1/`-0.015em` at ≥ 1024; 44px at 768; 32px/1.15 mobile; `text-wrap: balance`; twist word italic `accent-text` ("ships", Czech "dotáhne"). Panel name 28px/1.2. Closing line 34px, 28 mobile.
- **Body and UI: Geist** (variable; the two first-viewport files preloaded). Body 17px/1.6 (16 mobile); lead 20px/1.5 (17px/1.55 mobile); section titles 15px/1.3/500, uppercase, `0.08em`, `muted`; card names 22px/1.25/500/`-0.01em` (20 mobile); buttons and nav 14px/500; metadata 13px/1.4 `faint`, tabular figures.
- **Mono: Geist Mono** (variable). Periods, stack tags (12px), e-mail, footer, poster captions, Inspect labels and bar: 13px/1.4.

Baseline 4px; spacing 4, 8, 12, 16, 24, 32, 48, 64, 96, 128. Radii 4px (tags, posters, chips), 8px (buttons, panels, notes). No shadows except the sheet (`0 -8px 32px rgb(0 0 0 / .35)`, light `rgb(20 16 10 / .12)`).

**States.** Primary button: fill `text`, ink `bg`; hover fill `#FFFFFF` dark (19.67:1), `#000000` light (18.48:1); active `translateY(1px)`; disabled 50% opacity + `aria-disabled`. Secondary and icon buttons: 1px `line-strong` outline; hover border `text`, fill `surface`. Text links: underline draws in 150ms. Poster hover: lift 4px + 1px `accent-text` ring, pointer only. Row hover: `surface`. Focus ring: instant.

## Layout system

One column, max 680px, centred; gutters 24px mobile, 32 from 768. Poster row, Work cards and the Experience list widen to 880px, text aligned to the 680 left edge. At ≥ 1200 the hero alone is a 1032px grid: 680 text, 32 gap, 320 at-a-glance column top-aligned with the name row. Sections 128px apart at ≥ 1024, 96 at 768, 64 mobile; 32px title → content. Structure is 1px `line` rules; boxed surfaces only for open panels and Inspect notes. Header 56px, sticky, opaque `bg` plus a 1px `line` rule. Hero top padding 64px desktop, 32 mobile; no `min-height`.

## Sections in order

### 1. Hero (first viewport)

Real text. Desktop, y from document top at 1440×900:

1. **Name row** (120–210): portrait `/images/portrait-placeholder.webp` 72×90 (56×70 mobile), 4:5, 4px radius, 1px `line-strong` ring, saturation 85% in dark, `alt="Portrait of Martin Navrátil"`; 16px right: "Martin Navrátil" (15px/500), "Based in Czechia · remote only" `muted`.
2. **H1** (234–419, three lines): "Senior frontend engineer. Nuxt specialist who *ships* fullstack."
3. **Intro** (435–495, two lines, 20px): "I build fast, accessible web apps with Nuxt and Vue, and I take them all the way to production on Cloudflare."
4. **Action row** (519–559): 40px buttons, 8px radius, 14px padding. Primary `mailto:hello@martinnavratil.dev`, label = the address in mono; beside it a 40×40 icon button "Copy e-mail" (name never changes; icon becomes a check for 1500ms; an `aria-live="polite"` region says "E-mail copied"); secondary "Download CV (PDF)"; text links "GitHub", "LinkedIn", 24px hit box. Contact repeats this row.
5. **Proof row** (607–863): three posters 3-up in 880, 16px gaps, 283×212. Poster + name is one `<a>` to the live site, same tab: "Nambi · nambi.cz ↗" (private app, so never "Live"), "Tábořiště Kondor + SkautSim · taboriste.fenixb.cz ↗", "Becky Kay Livingstonová · beckykaylivingston.cz ↗". Beneath, 13px mono `faint`: status (`status-live` dot "live"; `accent-text` dot "in progress"), stack "Nuxt 4 · tRPC · D1" / "Nuxt 4 · TresJS · three.js" / "Astro 7 · GSAP · axe", a "Details ↓" link to the Work card. Six links, distinct names, sr-only prefix "Selected work:". Touch and reduced motion: static.
6. **At-a-glance column** (≥ 1200, 320px, from y 120): label "Experience"; mono rows `2022–2026 · Develit · Full Stack Engineer`, `2020–2022 · Sensorico · Frontend Developer`, `2018–2020 · Spatial Hub · Frontend Developer` linking to their Experience rows; "Mendel University, Brno · Software Engineering"; then the signature's resting trace, mono 13px `accent-text`, dashed underline: **"Inspect how this page is built →"**. Below 1200 it sits under the proof row, 48px gap.

Posters end at y 863 < 900. **Mobile 390×844** (header 56, padding 32): name row 88–158; H1 32px, 3 lines EN 178–288 (4 lines CS, to 325); actions as two full-width 44px rows (mailto flex + 44px copy icon; CV) 308–404; proof strip 428–636, horizontal snap-scroll, 56vw posters (218×164), 12px gaps, two caption lines; intro 17px, 3 lines 660–738; Inspect link; at-a-glance list; gaps 20/20/24/24. Target: proof strip top ≤ 640 (428 EN, 465 CS). GitHub and LinkedIn move to Contact and the sheet below 640.

### 2. Selected work with detail panel

Title "Selected work". Four cards, one per row, `line` rules: Nambi, Tábořiště Kondor, SkautSim, Becky Kay Livingstonová. Desktop: poster 320×240 left (the hero's combined poster links to `#work-taboriste-kondor`); right: name 22px, tagline 17px, role `muted` ("Fullstack: architecture, API and data model, web apps, CI"), mono stack tags on `surface`, status, live link ("nambi.cz ↗" for Nambi, "Live ↗" otherwise, underlined), "Details" button (`aria-expanded`, `aria-controls`). Mobile: poster full width above text.

Panel: opens in place under the card on `raised`, 8px radius, 32px padding (24 mobile), pushing the page; no modal; `grid-template-rows: 0fr → 1fr` + opacity. Newsreader name 28px, then a Geist 17px definition list: **Problem, My role, Decisions** (mono numerals in `accent-text`), **Outcome, Links**. Projects without `detail` (today Kondor, SkautSim, Becky) render only **Summary, My role, Stack, Links**, never empty labels. **Note for Martin: write `detail` for Kondor and Becky before launch.** "Close" returns focus to "Details"; `#work-nambi` opens on load; one panel at a time. Scroll on open only if the card top is above the viewport or the panel bottom off-screen: Lenis when present, else `scrollIntoView({ block: 'start' })`, `scroll-margin-top: 96px`.

### 3. More projects

Rows, 16px padding, `line` rules: name 17px/500, tagline `muted`, year mono `faint`, link. Nuxt Study ("A spaced-repetition study app for Vue, Nuxt and the web platform"): "Live ↗" **plus a "Details" disclosure** opening the same panel, since it has full `detail`. Účetnictví Blansko ("Website for an accounting practice in Blansko"): "Source ↗" only. Skautské hlasování ("Real-time emoji voting for scout meetings") and RoboPilot ("Robot-arm control with live camera and audio streaming"): no link, no icon, "archived" in `muted`. No posters.

### 4. Experience

A `<ul>` of rows styled as a grid (period mono 13px `faint`, company 17px/500, role, location `muted`) with visually hidden column headers; the company cell is a `<button aria-expanded aria-controls>` with a chevron revealing summary, highlights (Develit has four) and stack tags. `<table>` is reserved for `/cv`. Mobile: stacked rows. Below: "Education" (Mendel University, Brno · Bachelor's degree, Software Engineering · thesis note) and "Leadership" (Junák – český skaut, Scout Group Leader, summary). No scroll reveal; expansion animates as the panel, 250ms.

### 5. Contact

Newsreader closing line "The fastest way is e-mail." Then the §1 action row, "CV as a web page" (→ `/cv`), GitHub, LinkedIn, "Inspect how this page is built →", and "Based in Czechia · remote only" in `muted`. No form, no availability line.

### 6. Footer

One mono 13px `faint` line under a `line` rule, 64px padding: "Built with Nuxt. Source on GitHub." (underlined), "© {build year} Martin Navrátil", "EN / CS", theme toggle, motion switch (system / reduced / full) as a segmented control, `line-strong` borders, active segment `text`-filled, 32px at ≥ 768, 44px below, current option announced. Mobile: two rows, meta then controls.

### 7. /cv page

Same data, print first. Screen: 680px column in the current theme, "Back to the site" top left, "Download PDF" top right (both hidden in print); name, headline, location, e-mail, LinkedIn, GitHub; portrait 96×120 top right; Experience, Selected projects (live URL printed), Education, Skills (four groups), Leadership. Print: A4, 18mm margins, 11pt Geist, 10pt mono, black on white, the only colour a 1pt Ochre `#7A4F00` rule under the name (7.13:1), URLs after links, no page break inside a row; Czech subsets embedded; `/cs/cv` makes the Czech PDF.

### 8. Header and mobile navigation

Desktop (≥ 768): "Martin Navrátil" left (15px/500, to top); right Work · Experience · Contact · CV (Czech Projekty · Zkušenosti · Kontakt · Životopis, 4 × ≈ 90px), 14px, `accent-text` underline on hover and current; 32px icon buttons: search "Search and actions" (palette placeholder "⌘K / Ctrl+K"), Inspect (dotted square), theme, "CS". Mobile: name left; search and "Menu" right, 44×44. Menu = `USlideover` bottom sheet (16px top radius, `raised`): four 20px links in 48px rows, the current one `aria-current="true"` with a 4px `accent-text` dot; settings (language, theme, 44px motion switch); Inspect toggle; 48px "Close". Focus trapped; Esc closes.

## Project posters

Dashboard screenshots are drab, so every featured project gets a designed poster on one system. Source: an HTML/CSS component (`PosterSource.vue`, never in the site bundle) screenshotted at 1600×1200 by the Playwright script that makes the PDF, served as **build-time WebP**; Inspira's Safari / iPhone frame SVGs are a design-time template only (one `img` and one alt per poster — the §5.4 exception). Sizes are at the hero's 283×212; the card (320×240) and the mobile strip (218×164) scale the same 4:3 file.

**System.** 4px radius, 1px `line-strong` edge in the theme's value (the only theme-dependent part). Field: two product tones, A filling the upper 60% and blending into B over a 20% band, a static 256×256 noise tile at 4% `soft-light` baked in — never a live filter. Monogram: the project's first word in Newsreader 400 roman, 96px (34% of poster width; 109 card, 74 mobile), the table's monogram colour at 12% opacity, bleeding off the top-right so two or three letters show (Tábořiště → "TÁB"). Device: **Safari frame at 72% of poster width, bottom-centre, its bottom edge 32px above the poster edge**, leaving the lowest 32px of tone B as a caption band; or **iPhone frame at 34% width, bottom-right, 16px right inset, bleeding 25% off the bottom** (Nambi), leaving x 12–160 free. Live products hold a real screenshot cropped at 1.25× so the first 60% of the viewport fills the frame, never a data table; Nambi (private) holds a two-tone UI abstraction (nav bar, three cards, one list) labelled "Offers". Caption: mono 13px bottom-left, 12px inset, on tone B, `name · year · one stack word`, ≤ 32 characters (≈ 250px); the table gives the short name where the full one overruns.

| Poster | Tones A → B | Caption (on B) | Monogram (on A, at 12%) | Device · screen |
|---|---|---|---|---|
| Nambi | plum `#2B1B1A` → coral `#F26B5E` [CHECK brand colour] | "Nambi", ink `#0C0B0A` (6.59) | Bone `#F1ECE3` (14.00) | iPhone · offers list |
| Tábořiště Kondor (hero version: SkautSim's night tone bleeds in at the right 22%; the card drops it) | forest `#1F3D2B` → `#0E1A13` | "Tábořiště Kondor", Amber `#F5B82E` (10.02) | Amber (6.69) | Safari · 3D campsite preview |
| SkautSim (card only) | night `#1A1F4A` → `#0B0D1F` | "SkautSim", Bone (16.35) | Bone (13.33) | Safari · in-game view |
| Becky Kay Livingstonová | orange `#FF6105` → cream `#F5F5DC` | "Becky Kay L.", ink `#161412` (16.60) | ink `#161412` (6.09) | Safari · home hero |

Cream on light `bg` is 1.03:1, coral and orange ≈ 2.6:1, and the dark tone Bs on dark `bg` 1.02–1.10:1, so the `line-strong` edge is never dropped. The edge contrasts with `bg` on its outer side at 3.81 dark / 3.57 light, which is the ratio that marks the boundary; against the inner tones it may be as low as 1.36 (light edge on coral) and is not relied on.

Delivery: `@nuxt/image`, `srcset` 320/640/960/1280, `sizes="(min-width: 768px) 283px, 56vw"`, ≤ 40KB at 640w, inline 16px blur placeholder ≤ 1KB, `width`/`height` set (CLS 0), first poster `fetchpriority="high"` + `loading="eager"`, the rest lazy. Alt: "Poster of Nambi: the company app in a phone frame". No logos or stock imagery. The placeholder portrait is landscape; ask for the real one in 4:5. Also deliver the **OG card**, 1200×630, dark `bg` with the same grain and a "MAR" monogram in `faint` (6.50:1) at 12%: name, headline, portrait.

## Components

Inspira at runtime: none; bespoke choreography is the surest route to something not seen elsewhere (PROJECT.md §5.4). Nuxt UI 4 for buttons, collapsibles, the slideover, tooltips, colour mode and `LazyUModal` + `UCommandPalette` (⌘K: jump to section, copy e-mail, download CV, open LinkedIn, theme, language, motion, Inspect; `defineAsyncComponent` on first open). Built-in Reka/`tw-animate-css` transitions ignore the switch, so set `:unmount-on-hide` and `[data-motion="reduced"] * { animation-duration: .01ms; transition-duration: .01ms }`. motion-v via `LazyMotion` + `domAnimation` with `MotionConfig` inside. Everything else is semantic HTML. WebGL: none, deliberately.

## Motion

Lenis (`lerp 0.1`, `syncTouch: false`, native on touch, off under reduced motion) drives GSAP ScrollTrigger below the fold; motion-v owns state transitions. GSAP, ScrollTrigger and Lenis load in `requestIdleCallback`; the hero never waits for them. Tokens 150/250/400ms; ease-out `cubic-bezier(.22,1,.36,1)`; ease-in-out `cubic-bezier(.65,0,.35,1)`; stagger 30ms. Only `transform` and `opacity` animate, with three exceptions: grid rows (one element, ≤ 400ms, user-initiated), Inspect `stroke-dashoffset`, View Transition `clip-path`. The on-page switch overrides the media query; "reduced" means either.

| Element | Full motion | Reduced |
|---|---|---|
| Name row, portrait, H1 container | static | static |
| Identity sentence | CSS only: word spans `opacity 0, y 6px` under inline-script-set `html[data-motion="full"]`, 400ms ease-out, 30ms stagger, done by 400ms; a keyframe fallback forces opacity 1 at 1200ms; no SplitText | 150ms fade |
| Intro, actions, posters, column | same CSS from t = 0, delays 0/40/80/120ms, full opacity by 400ms | 150ms fade |
| Poster placeholder → image | opacity 250ms on `load` | same |
| Poster and row hover, link underline | 250ms / 150ms, pointer only | ring only, instant underline |
| Focus ring | instant | instant |
| Titles, cards, rows below the fold | ScrollTrigger at 85%, once: opacity 0→1, y 12→0, 400ms, 30ms stagger | opacity 150ms |
| Panel, experience row + chevron | motion-v `0fr → 1fr` 400ms ease-in-out (rows 250), content fades 250, chevron rotates 180° | snap, 150ms fade, no scroll |
| Theme toggle | View Transition circle `clip-path` from the toggle, 400ms | 150ms crossfade |
| Sheet, `UTooltip` | up 24px + fade 250ms, items 30ms stagger; tooltip fade 150 | 150ms fade |
| ⌘K | scale .98→1 + fade 150ms | fade |
| Copy icon | crossfade 150ms | same |
| Inspect enter / leave, status bar | see signature item 7 | see signature item 7 |
| Inspect chip → note, mobile Proof note | `0fr → 1fr` 250ms ease-out + opacity; figures never count up | 150ms fade, no size animation |

Loading order: first paint = HTML, CSS, two Geist files, hero; idle = GSAP, ScrollTrigger, Lenis, motion-v features; on demand = ⌘K, `inspect.json`, slideover. No parallax, pinning, preloader, cursor followers or loops.

## The signature: Inspect mode

Pressing **Inspect** (header icon, the "Inspect how this page is built →" links, or the ⌘K action; `Esc` exits; no single-key shortcut, WCAG 2.1.4) annotates the live page with its own component names, bundle costs and "why" notes; its status bar shows what the deploying build measured.

1. **Overlay** (`<ClientOnly>`): fixed layer of SVG rects (`aria-hidden`, `pointer-events: none`), one 1px dashed `accent-text` outline per target at its bounding box (11.03:1 dark, 6.27:1 light on `bg`; 5.64:1 on a panel), recomputed via `ResizeObserver` + the Lenis scroll event, one `requestAnimationFrame`, paused when the tab is hidden. Targets, up to 14: header, hero sentence, proof row, four Work cards, the open panel, More projects, Experience, Contact, motion switch, plus two virtual chips docked in the bar for `<SmoothScroll>` and `<CommandPalette>`.
2. **Chips**: real `<button aria-expanded aria-describedby>` in a `<ul aria-label="Inspect: up to 14 components">`, `pointer-events: auto`, at each target's top-left, 2px inset (an inner target sharing a top edge moves its chip to bottom-left). Mono 13px, fill `accent`, text `accent-ink` (10.31:1), 4px radius, 4×8px padding, ≥ 24px tall; in light a 1px `accent-text` border gives the chip its 6.27:1 boundary. Labels: `<WorkCard> · 2.1kB`, `<CommandPalette> · 18.4kB · lazy`, `<SmoothScroll> · 9.6kB · after paint`. Every figure is **[from build]**: gzipped per source file from rollup `generateBundle` module info written to `public/inspect.json`; CSS-only pieces say "css only".
3. **Dimming**: content on `bg` to 92% opacity (the palette's "dim" column: nothing below 5.07:1 for text, 3.16:1 for `line-strong`); the open panel, notes and bar stay at 100%, because `line-strong` inside a dimmed `raised` panel would fall to 2.92:1; `bg` gains a 24px dot grid of 1px `line` dots; `scroll-padding-bottom: 64px` while on.
4. **Keyboard**: the chip list is one Tab stop with roving `tabindex`; Arrow / Home / End move, Tab leaves normally, `Enter` toggles the note, `Esc` exits and returns focus to the header button (precedence: ⌘K → sheet → Inspect). The active chip expands (`0fr → 1fr` 250ms ease-out; reduced: the note appears with a 150ms fade, no size animation) into a 280px `role="note"` on `raised`, 1px `accent-text` border: name, cost in `accent-text` (9.30:1 dark, 5.64:1 light), a two-line "why" in Geist 14px. Pointer users hover or click.
5. **Why notes** (real copy): HeroIdentity "Real text, CSS-only reveal; nothing waits for JavaScript." ProofRow "Build-time WebP posters, one `img` each, first one eager." WorkCard "One panel at a time, pushed in place; no modal, no route." ProjectPanel "Grid-rows animation on one element; scrolls only when off-screen." MoreProjects "Rows without links show a status word, never a dead icon." Experience "Disclosure list, not a table; the table is on /cv." Contact "mailto plus a copy button; no form, no backend." MotionSwitch "Overrides the OS query, persisted; every animation has a reduced variant." SmoothScroll "Lenis loads at idle, native on touch, off under reduced motion." CommandPalette "Loaded on first open; free until you ask." Header "Sticky, opaque, one hairline; no blur over text." Other cards reuse the WorkCard note.
6. **Status bar**: `role="status"`, fixed bottom, mono 13px on `raised`, `line` rule on top, two groups 24px apart. *Build group*, `text`: "Inspect · 14 components · 61kB JS gz · first view 38kB · built 2026-10-02 ↗", the date linking to `runUrl` (the CI run). *Proof group*, `faint` labels, `text` figures: "LH 97 · 100 · 100 · 100 · LCP 0.9 s · CLS 0.00 · INP ○ · PageSpeed ↗ [from build] · Esc to exit". A 6px `status-live` dot precedes each Lighthouse score (sr-only "pass"); it has no failing state, because a build under 95 never deploys. INP is field-only: ○, accessible name "no field data yet", until CrUX returns a value for the production origin. No tooltips; `tabular-nums`. "PageSpeed ↗" opens `pagespeedUrl` (`https://pagespeed.web.dev/report?url=https%3A%2F%2Fmartinnavratil.dev%2F`), same tab.
   **Data file**: `public/inspect.json` = `{ build: { date, commit, totalKb, firstViewKb, components: [{ name, kb, mode }] }, proof: { lighthouse: { performance, accessibility, bestPractices, seo }, lab: { lcpMs, cls }, field: { inpMs | null }, pagespeedUrl, runUrl, measuredAt } | null }`. The deploy job (PROJECT.md Q13) builds, uploads a preview (`wrangler versions upload`), runs Lighthouse CI (`@lhci/cli`, mobile, median of 3) against it, asks the PageSpeed Insights API for field INP, writes `proof`, then `wrangler deploy`; under 95 anywhere the job fails and nothing ships. Local and preview builds leave `proof: null`.
   **Fallback**: `proof: null` → "proof: not measured in this build" in `faint`, no figures, no link; a failed `inspect.json` fetch → chips read `cost ○`, bar "Inspect · costs unavailable · Esc to exit". Invented numbers never appear.
   **Sizes**: ≥ 1200 one 32px row (≈ 130 characters ≈ 1010px); 768–1199 two 24px rows, build above proof; **mobile** 48px: "14 comp · 61kB · LH 97 · Proof ▸ · Exit", 44px Exit, 44px "Proof" disclosure expanding a three-line `role="note"` above the bar (Lighthouse; LCP · CLS · INP; first view · PageSpeed ↗), motion per the table. **Czech**, same group order: build "Inspect · 14 komponent · 61 kB JS gz · první zobrazení 38 kB · sestaveno 2026-10-02 ↗"; proof "LH 97 · 100 · 100 · 100 · LCP 0,9 s · CLS 0,00 · INP ○ · PageSpeed ↗ [z buildu] · Esc ukončí"; mobile "14 komp. · 61 kB · LH 97 · Měření ▸ · Ukončit"; fallback "měření: v tomto buildu neproběhlo".
7. **Enter / leave**: outlines sweep in via `stroke-dashoffset` 250ms, chips rise 4px with 30ms stagger, bar slides up 250ms with its figures already final; reduced: one 150ms fade, solid outlines, the bar simply appears. Leaving reverses in 150ms. State lasts the session. Mobile: toggled from the sheet; tap a chip for its note.

## Accessibility and performance

WCAG 2.2 AA floor, axe in CI. One `h1`, `h2` sections, `h3` project names. Focus ring 2px solid `accent-text` with 2px `bg` offset (11.03:1 dark, 6.27:1 light), `:focus-visible`, never removed. Hit targets ≥ 24px (44 for mobile controls). Skip link first. `aria-expanded`/`aria-controls` on every disclosure; sheet and ⌘K trap focus and close on Esc; `scroll-padding-top: 72px` (2.4.11). Icons labelled; status never by colour alone; external links open in the same tab. Inspect never changes reading order; the bar is announced once on entering. Language switch sets `<html lang>`. Budget: ≤ 50kB gz JS before idle, no first-viewport chunk over 50kB, LCP = the H1, CLS 0, Lighthouse mobile ≥ 95 — the numbers the bar shows.

## Responsive

Breakpoints 390 (design mobile), 640, 768, 1024, 1200 (hero grid), 1440 (design desktop). Mobile: the §1 stack, sheet menu, posters above card text, stacked experience rows, 48px Inspect bar with Proof disclosure. 640: GitHub and LinkedIn return to the hero. 768: 32px gutters, 3-up posters, grid rows, two-row bar. 1024: full type scale, 128px rhythm. ≥ 1200: at-a-glance column, one-row bar. Czech: buttons stack full width below 640 with "Stáhnout životopis (PDF)" and "Zkopírovat e-mail"; "Senior frontend engineer. Specialista na Nuxt, který *dotáhne* i backend." wraps to four lines at 32px on 390 without hyphenation; "Životopis jako webová stránka" fits one Contact line.

## Deliverables for Claude Design

1. Style tile: both palettes with hex and ratios, faces and scale, button and link states, tags, status dots, motion switch, ⌘K input, one poster with layers labelled.
2. Home: desktop 1440×900 dark and light; mobile 390×844 dark, plus the open sheet.
3. Nambi panel open, desktop and mobile; Nuxt Study row expanded.
4. Inspect: open with the `<WorkCard>` note (dark desktop, bar with proof); mobile open, Proof expanded; light open; the `proof: null` fallback.
5. The five posters at 283×212; OG card 1200×630.
6. `/cv`: screen (dark) and print (A4).
7. States: ⌘K open, "E-mail copied", focus rings in both themes, a one-screen motion spec of every Motion-table row.

## Do not

- No preloader, scroll hijacking, pinning, parallax, cursor followers, marquee, glow, gradients outside posters, glass, bento, 3D or WebGL.
- No Inspira at runtime: no Shimmer Button, Bento Grid, Dock, Marquee, Meteors, Border Beam, Flip Words, Text Generate, Number Ticker, Globe, Aurora, Lamp, Variable Text, Fey Cards, Scroll Island or shaders.
- No second accent, Amber text or lines in light, text under 4.5:1, `dimmed`, un-underlined running-text links or header transparency.
- No lorem ipsum, invented projects, employers, numbers or testimonials; no phone number, availability line, hard-coded year or stack badges without a project behind them.
- No image or canvas for the name; no content hidden before JavaScript; no Inspect or proof figure the build did not produce; no live grain filter.
