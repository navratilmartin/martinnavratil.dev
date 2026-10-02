# Design 2 — Quiet editorial with one signature interaction

## Brief

The personal site of Martin Navrátil, a senior frontend engineer and Nuxt specialist who ships fullstack (Nuxt 4, Hono, Cloudflare Workers, D1), based in Czechia, remote only. It is the link in his CV; readers are recruiters and hiring engineers who give it 30–60 seconds. Rauno Freiberg / Brittany Chiang / Emil Kowalski school: text first, one reading column, dark by default and system-aware, almost no decoration; proof comes from shipped work and care in details. Exactly one crafted signature interaction, **Inspect mode**, turns the page into an annotated blueprint of itself; everything else is still. Mood: a well-set engineering notebook. English copy; Czech strings are ~20% longer and must fit.

## Audience and the 30-second scan

In the first viewport (1440×900 desktop, 390×844 phone, measured in §1) the reader gets, in order: who (name, small portrait), what (headline), the two actions (e-mail, CV), proof (three posters with stack lines and live links), where (Czechia, remote only). Nothing is gated; every first-viewport element is at full opacity by 400ms; the first project is reachable in under 2 s on a mid-range phone. Depth lives in place: an in-page panel per featured project. Inspect mode is a reward for the curious, reachable from a text link, never required.

## Palette

One accent, two neutrals, no gradients, no glow; hairlines carry structure. Ratios computed (WCAG 2.x), dark/light.

| Token | Dark | Light | Use | Contrast dark/light |
|---|---|---|---|---|
| `bg` | `#0C0C0D` | `#FAFAF7` | page, header | — |
| `surface` | `#151517` | `#F1F1EC` | panel, sheet, notes, status bar | — |
| `line` | `#2A2A2E` | `#DAD9D2` | hairlines, rules | decorative |
| `line-strong` | `#767678` | `#7F7F79` | meaningful borders, poster edges | 4.31/3.85 `bg`; 4.02/3.55 `surface`; 3.84/3.36 at Inspect dim |
| `text` | `#EDEDEA` | `#161616` | body, headings, primary fill | 16.67/17.31 `bg`; 15.55/15.97 `surface` |
| `muted` | `#A6A6A1` | `#5E5E59` | metadata, 13–14px text | 8.00/6.23 `bg`; 7.46/5.75 `surface`; 6.92/5.19 at dim |
| `accent` | `#8FB4FF` | `#1F4FD1` | links, focus, Inspect outlines, chip fill | 9.44/6.48 `bg`; 8.81/5.98 `surface` |
| `accent-ink` | `#0C0C0D` | `#FAFAF7` | chip text (fill `accent`, text `accent-ink`) | 9.44/6.48 on `accent` |
| `inspect-cost` | `#F6B26B` | `#8F4707` | cost figures on `surface` | 9.99/6.03 |
| `status-live` | `#86D39B` | `#1E7A3C` | live dot, non-text | 10.99/5.14 `bg` |

Rules: `muted` is the only secondary text colour (Nuxt UI `dimmed`, 3.4:1 dark, is banned). `::selection { background: accent; color: accent-ink }`. Running-text links: `text`, 1px underline offset 3px, `accent` on hover; standalone links and nav: `accent`, underline on hover and focus. Dark is default; system preference and the toggle switch to light.

## Typography

Self-hosted via `@nuxt/fonts`, `font-display: swap` with metric fallbacks, latin + latin-ext `unicode-range` subsets, ≤ 50KB per file, Czech diacritics verified per face.

- **Identity serif: Newsreader**, two static files: 400 roman and 400 italic at display optical size (`opsz` 36–72). H1, Contact closing line, project names in open panels. H1 56px/1.1/`-0.015em` at ≥ 1024; 44px at 768; 32px/1.15 mobile; `text-wrap: balance`; twist word italic `accent` ("ships", Czech "dotáhne"). Panel name 28px/1.2. Closing line 34px, 28 mobile.
- **Body and UI: Geist** (variable; the two first-viewport files preloaded). Body 17px/1.6 (16 mobile); lead 20px/1.5 (17px/1.55 mobile); section titles 15px/1.3/500, uppercase, `0.08em`, `muted`; card names 22px/1.25/500/`-0.01em` (20 mobile); buttons and nav 14px/500; metadata 13px/1.4 `muted`, tabular figures.
- **Mono: Geist Mono** (variable). Periods, stack tags (12px), e-mail, footer meta, Inspect labels: 13px/1.4.

Baseline 4px; spacing 4, 8, 12, 16, 24, 32, 48, 64, 96, 128. Radii 4px (tags, posters), 8px (buttons, panels, notes). No shadows except the sheet (`0 -8px 32px rgb(0 0 0 / .35)`, light `.12`).

**States.** Primary button: fill `text`, ink `bg`; hover fill `#FFFFFF` dark (19.55:1), `#000000` light (20.08:1); active `translateY(1px)`; disabled 50% opacity + `aria-disabled`. Secondary and icon buttons: 1px `line-strong` outline; hover border `text`, fill `surface`. Text links: underline draws in 150ms. Poster hover: lift 4px + 1px `accent` ring, pointer only. Row hover: fill `surface`. Focus ring: instant.

## Layout system

One column, max 680px, centred; gutters 24px mobile, 32 from 768. Poster row, Work cards and the Experience list widen to 880px, text aligned to the 680 left edge. At ≥ 1200 the hero alone is a 1032px grid: 680 text, 32 gap, 320 at-a-glance column top-aligned with the name row. Sections 128px apart at ≥ 1024, 96 at 768, 64 mobile; 32px title → content. Structure is 1px `line` rules; boxed surfaces only for open panels and Inspect notes. Header 56px, sticky, 100% `bg` plus a 1px `line` rule (nav contrast as on `bg`). Hero top padding 64px desktop, 32 mobile; no `min-height`.

## Sections in order

### 1. Hero (first viewport)

Real text. Desktop, y from document top at 1440×900:

1. **Name row** (120–210): portrait `/images/portrait-placeholder.webp` 72×90 (56×70 mobile), 4:5, 4px radius, 1px `line-strong` ring, saturation 85% in dark, `alt="Portrait of Martin Navrátil"`; 16px right: "Martin Navrátil" (15px/500), "Based in Czechia · remote only" `muted`. Static.
2. **H1** (234–419, three lines): "Senior frontend engineer. Nuxt specialist who *ships* fullstack."
3. **Intro** (435–495, two lines, 20px): "I build fast, accessible web apps with Nuxt and Vue, and I take them all the way to production on Cloudflare."
4. **Action row** (519–559): 40px buttons, 8px radius, 14px padding. Primary `mailto:hello@martinnavratil.dev`, label = the address in mono; beside it a 40×40 icon button "Copy e-mail" (name never changes; icon becomes a check for 1500ms; a separate `aria-live="polite"` region says "E-mail copied"); secondary "Download CV (PDF)"; text links "GitHub", "LinkedIn", 4px vertical padding (24px hit box). Contact repeats this row.
5. **Proof row** (607–863): three posters 3-up in 880, 16px gaps, 283×212. Poster + name is one `<a>` to the live site, same tab: "Nambi · nambi.cz ↗" (the app is private, so never "Live"), "Tábořiště Kondor + SkautSim · taboriste.fenixb.cz ↗", "Becky Kay Livingstonová · beckykaylivingston.cz ↗". Beneath, 13px mono: status (`status-live` dot, "live"/"in progress"), stack "Nuxt 4 · tRPC · D1" / "Nuxt 4 · TresJS · three.js" / "Astro 7 · GSAP · axe", a "Details ↓" link to the Work card. Six links, distinct names, sr-only prefix "Selected work:". Touch and reduced motion: static.
6. **At-a-glance column** (≥ 1200, 320px, from y 120): label "Experience"; mono rows `2022–2026 · Develit · Full Stack Engineer`, `2020–2022 · Sensorico · Frontend Developer`, `2018–2020 · Spatial Hub · Frontend Developer` linking to their Experience rows; "Mendel University, Brno · Software Engineering"; then the signature's resting trace, mono 13px `accent`, dashed underline: **"Inspect how this page is built →"**. Below 1200 the column sits under the proof row, 48px gap.

Posters end at y 863 < 900: items 1–6 fit. **Mobile 390×844** (header 56, padding 32): name row 88–158; H1 32px, 3 lines EN 178–288 (4 lines CS, to 325); actions as two full-width 44px rows (mailto flex + 44px copy icon; CV) 308–404; proof strip 428–636, horizontal snap-scroll, 56vw posters (218×164), 12px gaps, two caption lines; intro 17px, 3 lines 660–738; Inspect link; at-a-glance list; gaps 20/20/24/24. Target: proof strip top ≤ 640 (428 EN, 465 CS); at 390×664 the first poster's bottom edge is at 636. GitHub and LinkedIn move to Contact and the sheet below 640.

### 2. Selected work with detail panel

Title "Selected work". Four cards, one per row, `line` rules: Nambi, Tábořiště Kondor, SkautSim, Becky Kay Livingstonová. Desktop: poster 320×240 left (the hero's combined poster links to `#work-taboriste-kondor`); right: name 22px, tagline 17px, role `muted` ("Fullstack: architecture, API and data model, web apps, CI"), mono stack tags, status, live link ("nambi.cz ↗" for Nambi, "Live ↗" otherwise, underlined), "Details" button (`aria-expanded`, `aria-controls`). Mobile: poster full width above text.

Panel: opens in place under the card on `surface`, 8px radius, 32px padding (24 mobile), pushing the page; no modal; `grid-template-rows: 0fr → 1fr` + opacity. Newsreader name 28px, then a Geist 17px definition list: **Problem, My role, Decisions** (mono numerals), **Outcome, Links**. Projects without `detail` (today Kondor, SkautSim, Becky) render only **Summary, My role, Stack, Links**, never empty labels. **Note for Martin: write `detail` for Tábořiště Kondor and Becky Kay Livingstonová before launch** (becky-web has the material: WCAG floor, motion switch, axe in CI, Email Routing). "Close" returns focus to "Details"; `#work-nambi` opens on load; one panel at a time. Scroll on open only if the card top is above the viewport or the panel bottom would be off-screen: Lenis when present, else `scrollIntoView({ block: 'start' })` with `scroll-margin-top: 96px`.

### 3. More projects

Title "More projects". Rows, 16px padding, `line` rules: name 17px/500, tagline `muted`, year mono, link. Nuxt Study ("A spaced-repetition study app for Vue, Nuxt and the web platform"): "Live ↗" **plus a "Details" disclosure** opening the same panel, since it has full `detail`. Účetnictví Blansko ("Website for an accounting practice in Blansko"): "Source ↗" only. Skautské hlasování ("Real-time emoji voting for scout meetings") and RoboPilot ("Robot-arm control with live camera and audio streaming"): no link, no icon, "archived" in `muted`. No posters.

### 4. Experience

Title "Experience". A `<ul>` of rows styled as a grid (period mono 13px, company 17px/500, role, location `muted`) with visually hidden column headers; the company cell is a `<button aria-expanded aria-controls>` with a chevron revealing summary, highlights (Develit has four) and stack tags. `<table>` is reserved for `/cv`. Mobile: stacked rows. Below: "Education" (Mendel University, Brno · Bachelor's degree, Software Engineering · thesis note) and "Leadership" (Junák – český skaut, Scout Group Leader, summary). No scroll reveal; expansion animates as the panel at 250ms.

### 5. Contact

Title "Contact". Newsreader closing line "The fastest way is e-mail." Then the §1 action row (mailto, copy icon, CV), "CV as a web page" (→ `/cv`), GitHub, LinkedIn, "Inspect how this page is built →", and "Based in Czechia · remote only" in `muted`. No form, no availability line.

### 6. Footer

One mono 13px line under a `line` rule, 64px padding: "Built with Nuxt. Source on GitHub." (underlined), "© {build year} Martin Navrátil", "EN / CS", theme toggle, motion switch (system / reduced / full) as a segmented control, 32px at ≥ 768, 44px below, current option announced. Links have 24px hit boxes (4px padding). Mobile: two rows, meta then controls.

### 7. /cv page

Same data, print first. Screen: 680px column, "Back to the site" top left, "Download PDF" top right (both hidden in print); name, headline, location, e-mail, LinkedIn, GitHub; portrait 96×120 top right; Experience (period, company, role, location, summary, highlights, stack); Selected projects (name, tagline, role, stack, live URL printed); Education; Skills (four groups); Leadership. Print: A4, 18mm margins, 11pt Geist, 10pt mono, black on white, URLs after links, no page break inside a row; Geist + Geist Mono subsets with Czech embedded; `/cs/cv` makes the Czech PDF.

### 8. Header and mobile navigation

Desktop (≥ 768): "Martin Navrátil" left (15px/500, to top); right Work · Experience · Contact · CV (Czech Projekty · Zkušenosti · Kontakt · Životopis, 4 × ≈ 90px), 14px, `accent` underline on hover and current; 32px icon buttons: search icon "Search and actions" (palette placeholder "⌘K / Ctrl+K"), Inspect (dotted square), theme, "CS". Mobile: name left; search and "Menu" right, 44×44. Menu = `USlideover` bottom sheet (16px top radius, `surface`): four 20px links in 48px rows, the current one `aria-current="true"` with a 4px `accent` dot; settings block (language, theme, 44px motion switch); Inspect toggle; 48px "Close". Focus trapped; Esc closes.

## Project posters

**Build-time WebP**, rendered by a script from Inspira's Safari / iPhone frame SVGs (device-mocks category, a design-time template only; no Inspira runtime, one `img` and one alt per poster — the explicit §5.4 exception). 1600×1200, 4px radius: the product in its frame, bottom-aligned at 78% of poster width, lower edge cropped, on a flat field with 2% noise in the product's colours. Dashboard-like screens: crop at 1.25× so the first 60% of the viewport fills the frame, never a data table, product theme matching the site theme. Dark and light share the field; the frame stroke swaps to the theme's `line-strong`.

- **Nambi**: iPhone frame, plum `#2B1E3A`, coral `#FF6A5C` accents.
- **Tábořiště Kondor + SkautSim** (hero): Safari frame of taboriste.fenixb.cz on forest `#1F3A2A` with pine `#9BC28A`, the SkautSim wireframe grid `#6FA8FF` bleeding in at the right edge. Cards: Kondor alone on forest; SkautSim alone on night blue `#0F1F3D` with the grid.
- **Becky Kay Livingstonová**: dark = aubergine `#2A1A21` field with orange `#FF6105` chrome; light = orange field with cream `#F5F5DC` chrome (a cream field on `#FAFAF7` is 1.06:1).

Delivery: `@nuxt/image`, `srcset` 320/640/960/1280, `sizes="(min-width: 768px) 283px, 56vw"`, ≤ 40KB at 640w, inline 16px blur placeholder ≤ 1KB, `width`/`height` set (CLS 0), first poster `fetchpriority="high"` + `loading="eager"`, the rest lazy. Alt: "Poster of Nambi: the company app in a phone frame". No logos or stock imagery. The placeholder portrait is 2000×1342 landscape; 4:5 discards 65%, so ask for the real portrait in 4:5. Also deliver the **OG card**, 1200×630, dark: name, headline, portrait.

## Components

Inspira at runtime: none; restraint is the point, bespoke choreography is the surest route to something not seen elsewhere (PROJECT.md §5.4). Nuxt UI 4: `UButton` (primary, secondary, icon), `UCollapsible` (panels, rows), `USlideover` (sheet), `LazyUModal` + `UCommandPalette` (⌘K: jump to section, copy e-mail, download CV, open LinkedIn, theme, language, motion, Inspect; `defineAsyncComponent` on first open), `UTooltip` on icon buttons (on focus too), colour mode. Built-in Reka/`tw-animate-css` transitions ignore the switch, so set `:unmount-on-hide` and `[data-motion="reduced"] * { animation-duration: .01ms; transition-duration: .01ms }`. motion-v via `LazyMotion` + `domAnimation` with `MotionConfig` inside. Everything else is semantic HTML. WebGL: none, the budget deliberately unspent.

## Motion

Lenis (`lerp 0.1`, `syncTouch: false`, native on touch, off under reduced motion) drives GSAP ScrollTrigger below the fold; motion-v owns state transitions. GSAP, ScrollTrigger and Lenis are dynamically imported in `requestIdleCallback`; the hero never waits for them. Tokens 150/250/400ms; ease-out `cubic-bezier(.22,1,.36,1)`; ease-in-out `cubic-bezier(.65,0,.35,1)`; stagger 30ms. Only `transform` and `opacity` animate, with three named exceptions: panel grid rows (one element, ≤ 400ms, user-initiated), Inspect `stroke-dashoffset`, View Transition `clip-path`. The on-page switch overrides the media query; "reduced" means either.

| Element | Full motion | Reduced |
|---|---|---|
| Name row, portrait, H1 container | static | static |
| Identity sentence | CSS only: word spans `opacity 0, y 6px` under inline-script-set `html[data-motion="full"]`, 400ms ease-out, 30ms stagger, last word done by 400ms; a keyframe fallback forces opacity 1 at 1200ms; no SplitText | 150ms fade |
| Intro, actions, posters, column | same CSS, parallel from t = 0, delays 0/40/80/120ms, full opacity by 400ms | 150ms fade |
| Poster placeholder → image | opacity 250ms on `load` | same |
| Poster and row hover, link underline | 250ms / 150ms, pointer only | ring only, instant underline |
| Focus ring | instant | instant |
| Titles, cards, rows below the fold | ScrollTrigger at 85%, once: opacity 0→1, y 12→0, 400ms, 30ms stagger | opacity 150ms |
| Panel, experience row + chevron | motion-v `0fr → 1fr` 400ms ease-in-out (rows 250), content fades 250, chevron rotates 180° | snap, 150ms fade, no scroll |
| Theme toggle | View Transition circle `clip-path` from the toggle, 400ms | 150ms crossfade |
| Sheet, `UTooltip` | up 24px + fade 250ms, items 30ms stagger; tooltip fade 150 | 150ms fade |
| ⌘K | scale .98→1 + fade 150ms | fade |
| Copy icon | crossfade 150ms | same |
| Inspect | see signature | see signature |

Loading order: first paint = HTML, CSS, two Geist files, hero; idle = GSAP, ScrollTrigger, Lenis, motion-v features; on demand = ⌘K, Inspect JSON, slideover. No parallax, pinning, scroll hijacking, preloader, cursor followers or loops.

## The signature: Inspect mode

Pressing **Inspect** (header icon, the "Inspect how this page is built →" links, or the ⌘K action; `Esc` exits; no single-key shortcut, WCAG 2.1.4) annotates the live page with its own component names, bundle costs and "why" notes.

1. **Overlay** (`<ClientOnly>`): fixed layer of SVG rects (`aria-hidden`, `pointer-events: none`), one 1px dashed `accent` outline per target at its bounding box, recomputed via `ResizeObserver` + the Lenis scroll event, throttled to one `requestAnimationFrame`, paused when the tab is hidden. Targets, up to 14: header, hero sentence, proof row, four Work cards, the open panel (when open), More projects, Experience, Contact, motion switch, plus two virtual chips docked in the status bar for `<SmoothScroll>` and `<CommandPalette>`, which have no box.
2. **Chips**: real `<button aria-expanded aria-describedby>` in a `<ul aria-label="Inspect: up to 14 components">`, `pointer-events: auto`, at each target's top-left, 2px inset (an inner target sharing a top edge moves its chip to bottom-left). Mono 13px, fill `accent`, text `accent-ink`, 4px radius, 4×8px padding, ≥ 24px tall: `<HeroIdentity> · 0.8kB`, `<WorkCard> · 2.1kB`, `<CommandPalette> · 18.4kB · lazy`, `<SmoothScroll> · 9.6kB · after paint`. Every figure is a **[from build]** sample: gzipped per source file from rollup `generateBundle` module info (or `rollup-plugin-visualizer` stats JSON) written to `public/inspect.json`; CSS-only pieces say "css only".
3. **Dimming**: content to 92% opacity; `bg` gains a 24px dot grid of 1px `line` dots; `scroll-padding-bottom: 48px` while on.
4. **Keyboard**: the chip list is one Tab stop with roving `tabindex`; Arrow / Home / End move, Tab leaves normally, `Enter` toggles the note, `Esc` exits and returns focus to the header button (precedence: ⌘K → sheet → Inspect). The active chip expands (250ms) into a 280px `role="note"` on `surface`, 1px `accent` border: name, cost in `inspect-cost`, a two-line "why" in Geist 14px. Pointer users hover or click.
5. **Why notes** (real copy): HeroIdentity "Real text, CSS-only reveal; nothing waits for JavaScript." ProofRow "Build-time WebP posters, one `img` each, first one eager." WorkCard "One panel at a time, pushed in place; no modal, no route." ProjectPanel "Grid-rows animation on one element; scrolls only when off-screen." MoreProjects "Rows without links show a status word, never a dead icon." Experience "Disclosure list, not a table; the table is on /cv." Contact "mailto plus a copy button; no form, no backend." MotionSwitch "Overrides the OS query, persisted; every animation has a reduced variant." SmoothScroll "Lenis loads at idle, native on touch, off under reduced motion." CommandPalette "Loaded on first open; free until you ask." Header "Sticky, opaque, one hairline; no blur over text." Other cards reuse the WorkCard note.
6. **Status bar**: `role="status"`, 32px (48 mobile), mono 13px on `surface`: "Inspect · 14 components · 61kB JS gz · first viewport 38kB · built 2026-10-02 · Esc to exit" [from build].
7. **Enter / leave**: outlines sweep in via `stroke-dashoffset` 250ms, chips rise 4px with 30ms stagger, bar slides up 250ms; reduced: one 150ms fade, solid outlines. Leaving reverses in 150ms. State lasts the session. Mobile: toggled from the sheet; tap a chip for its note; bar "14 comp · 61kB · Exit", 44px Exit.

## Accessibility and performance

WCAG 2.2 AA floor, axe in CI. One `h1`, `h2` sections, `h3` project names. Focus ring 2px solid `accent` with 2px `bg` offset, `:focus-visible`, never removed, both themes. Hit targets ≥ 24px (44 for mobile controls). Skip link first. `aria-expanded`/`aria-controls` on every disclosure; sheet and ⌘K trap focus and close on Esc; `scroll-padding-top: 72px` (2.4.11). Icons labelled; the live dot has sr-only "live"; external links open in the same tab. Posters are `img` with alt. Inspect never changes reading order. Language switch sets `<html lang>`. Reduced motion honoured from the OS and the persisted switch. Budget: ≤ 50kB gz JS before idle, no first-viewport chunk over 50kB, LCP = the H1, CLS 0, Lighthouse mobile ≥ 95.

## Responsive

Breakpoints 390 (design mobile), 640, 768, 1024, 1200 (hero grid), 1440 (design desktop). Mobile: the §1 stack, sheet menu, posters above card text, stacked experience rows, 48px Inspect bar. 640: GitHub and LinkedIn return to the hero. 768: 32px gutters, 3-up posters, grid rows. 1024: full type scale, 128px rhythm. ≥ 1200: at-a-glance column. Czech: buttons stack full width below 640 with "Stáhnout životopis (PDF)" and "Zkopírovat e-mail"; "Senior frontend engineer. Specialista na Nuxt, který *dotáhne* i backend." wraps to four lines at 32px on 390 without hyphenation; "Životopis jako webová stránka" fits one Contact line.

## Deliverables for Claude Design

1. Style tile: both palettes with hex and ratios, three faces and scale, buttons (default / hover / focus / active / disabled), links, tags, status dot, motion switch, ⌘K input.
2. Home, desktop 1440×900, dark (Inspect link visible).
3. Home, mobile 390×844, dark, plus the open sheet.
4. Home, desktop 1440, light.
5. Nambi panel open, desktop and mobile; Nuxt Study row expanded.
6. Inspect: closed; open with the `<WorkCard>` note (dark desktop); mobile open; light open.
7. `/cv`: screen (dark) and print (A4).
8. OG card 1200×630.
9. States: ⌘K open, "E-mail copied", experience row expanded, focus rings in both themes, a one-screen motion spec listing every Motion-table row.

## Do not

- No preloader, scroll hijacking, pinning, parallax, cursor followers, marquee, glow, gradients, glassmorphism, bento, 3D or WebGL.
- No Shimmer Button, Bento Grid, Dock, Marquee, Meteors, Border Beam, Flip Words, Text Generate, cobe Globe, Aurora or Lamp; no Inspira at runtime (not even Variable Text, Fey Cards, Scroll Island or shader backgrounds).
- No second accent, text under 4.5:1, `dimmed` text, un-underlined running-text links or header transparency.
- No lorem ipsum, invented projects, employers, numbers or testimonials; no phone number, availability line, hard-coded year or stack badges without a project behind them.
- No image or canvas for the name; no content hidden before JavaScript; nothing in the first viewport below full opacity after 400ms; no Inspect figures the build did not produce.
