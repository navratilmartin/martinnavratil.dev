# Design 3 — Maximal dark: the full Inspira show, within budget

## Brief

You are designing the personal portfolio of Martin Navrátil, senior frontend engineer and Nuxt specialist who ships fullstack, Czechia, remote only. It is the link in his CV and must land a senior frontend / Nuxt role with recruiters and hiring engineers who give it 30–60 seconds. The breathtaking variant: a silk shader behind the hero, a variable serif whose breath is the clock of the whole page, posters that tilt under the pointer, section titles that trace an amber outline under the cursor, a magnetic experience stage. Not the 2026 dark-glow template: no blue-violet gradients, glass, gradient borders, Inter or bento. The mood is a darkroom: warm soot, bone type, one amber signal, film grain, hairline rules, an editorial serif. Every effect is tinted in that palette and degrades to a static page that is still beautiful.

**Still to come from Martin** (never invented): Problem / Decisions / Outcome copy for Tábořiště Kondor, SkautSim and Becky (until then no "Details" button on those cards); years for the degree and the scout leadership (hidden until confirmed); the Účetnictví Blansko URL; the real portrait.

## Audience and the 30-second scan

Seconds 0–5: name, "Senior frontend engineer.", four posters, the amber e-mail pill. Seconds 5–15: identity sentence, intro, stack line, experience at a glance. Viewport assumption 1440×900 with browser chrome, ≈820px usable; the hero is budgeted to 733px under the 64px header (§1), so all of it is above the fold; at 390×844 the e-mail pill sits at ≈300px. Seconds 15–30: the first project card with a live link, within 1.15 screens everywhere. No preloader, scroll hijacking or cursor replacement. The `<h1>`, role line and posters are painted at final opacity in the SSR HTML; nothing in the first viewport waits for JavaScript; the shader arrives after first paint.

## Palette

Dark is default; light is a full citizen. Warm neutrals with a hint of brown, never grey-blue. Ratios are on bg-0/bg-1/bg-2 of the same theme.

| Token | Dark | WCAG | Light | WCAG | Use |
|---|---|---|---|---|---|
| bg-0 | `#0C0B0A` Pitch | — | `#F4F0E8` Paper | — | page |
| bg-1 | `#161412` Soot | 1.07 vs bg-0, hairline-separated | `#FBF9F5` | — | cards, scrolled header |
| bg-2 | `#211E1B` Ash | — | `#EAE4DA` | — | panels, inputs, menu, island |
| line | `#2E2A26` | — | `#D9D2C6` | — | decorative rules only |
| control border | `#756C60` | 3.8/3.6/3.2 | `#857D71` | 3.6/3.9/3.2 | outlined pill, inputs, segmented controls |
| text | `#F1ECE3` Bone | 16.7/15.6/14.1 | `#161412` Ink | 16.2/17.5/14.5 | body, headings, island label |
| muted | `#B5AC9F` | 8.8/8.2/7.4 | `#5E574E` | 6.3/6.8/5.6 | taglines, summaries, all hero mono |
| meta (12–13px) | `#9C9387` | 6.5/6.1/5.5 | `#5F5950` | 6.1/6.6/5.5 | labels, years, footer; never over the dark shader |
| accent fill | `#F5B82E` Amber | Ink on Amber 10.3 | `#F5B82E` Amber | Ink on Amber 10.3 | primary button |
| accent text | `#F5B82E` Amber | 11.0/10.3/9.3 | `#7A4F00` Ochre | 6.3/6.8/5.6 | twist word, link hover, active dot, island arc, in-progress dot; Amber is never text or a line in light |
| focus ring | `#F5B82E` | 11.0 | `#161412` | 16.2 | 2px, 3px offset |
| live | `#3DD68C` | 10.5 | `#1F7A4D` | 4.7 | live status dot |
| shader range | `#0C0B0A`→`#2A2218` | Bone 13.3, muted 7.0 on `#2A2218` | `#F4F0E8`→`#E3DBCB` | Ink 13.4, muted 5.2, meta 5.0 on `#E3DBCB` | brightest / darkest Silk pixel, enforced |

Status: live = green dot; in progress = Amber/Ochre dot; archived = meta text, no dot. Selection: Amber background, Ink text. Running-text links: current colour, 1px underline, 3px offset; hover Amber/Ochre, 2px. Grain: a static 256×256 noise tile at 4% over everything, `soft-light`, never a live SVG filter.

## Typography

Three variable Google Fonts, self-hosted by `@nuxt/fonts` with metric fallbacks so no swap moves a pixel; verify Ř, Ů, Ě, Ť, Ď, Ň at display size.

- **Display: Fraunces**, roman `wght` 400–800, `opsz` 48–144, `SOFT` 0–100 (one preloaded file ≤50KB gz); italic `wght` 400 with `WONK` 1 as a second lazy file. Mixed case. Sizes at 1440/1024/768/390: hero name 120/92/72/56px (two lines at 390), all 12 columns, `white-space: nowrap` per line, wght 500, opsz 144, SOFT rests at 50, tracking −0.03em, line-height 0.92; role line 48/40/34/28px wght 600, line-height 1.02; identity sentence italic 28/26/24/22px, line-height 1.2, twist word Amber/Ochre; section titles 96/72/56/44px wght 700, tracking −0.02em, line-height 0.95, `text-wrap: balance`, two lines allowed at 390 ("Vybrané projekty" ≈387px must wrap); project names 32/28/26/24px wght 600; contact e-mail 44/26px, `overflow-wrap: anywhere`.
- **Body and UI: Hanken Grotesk**, `wght` 400–700, preloaded, ≤40KB. Body 18px/1.6 (17px mobile); summaries 16px/1.55; highlights 15px; buttons 15px wght 600; nav 14px wght 500.
- **Mono: JetBrains Mono** `wght` 500, lazy, ≤30KB. 13px uppercase, tracking 0.12em, tabular figures; periods 14px; chips 12px.

Czech runs ~20% longer: containers clamp width, never height; "Stáhnout životopis (PDF)" sets the secondary pill's min width.

## Layout system

12 columns, 1280px max, 24px gutters; margins 80/48/24/16px. Spacing (px): 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160; sections 160px apart on desktop, 96px on mobile. Radii: chips 4 (12px mono, padding 4 10); in-card "Details"/"Close" and header icon buttons 10 (height 36/44); cards 12; posters 20; CTAs and the island 999 (height 48/52, padding 0 24). Structure from hairlines and type, never filled boxes; cards are bg-1 with a 1px `line` border. Shadows only on floating things: posters `0 24px 48px -16px rgb(0 0 0/.6)` dark, `rgb(20 16 10/.25)` light; the island. Stacking: shader → grain → content. Nav links: hover 1px underline 3px offset; active section a 6px Amber/Ochre dot before the label.

## Sections in order

### 1. Hero (the sandwich)

Min-height 100svh, Silk behind on desktop. Vertical budget at 1440 under the header: eyebrow 17 + name 110 + fanned stack 303 + role line 49 + identity 34 + two-column row 148 + six 12px gaps = 733px. Top to bottom:

1. **Eyebrow**, mono 13px muted: `Based in Czechia · remote only`.
2. **Name** "Martin Navrátil", a real `<h1>`, columns 1–12, visible at first paint, breathing on `SOFT`.
3. **Project stack**, columns 2–11: four Floating Cards fanned −6°/−2°/2°/6°, overlapping 28%, posters 224×280px at 1440 and 1024 (200×250 at 768; 160×200 below 768 as a static snap-scroll row): Nambi, Tábořiště Kondor, SkautSim, Becky Kay Livingstonová. Each is a link to its card (accessible name "Nambi — open project details", image `alt=""`); focusable in order, focus lifts like hover.
4. **Role line**, the headline verbatim: "Senior frontend engineer." (48px, Variable Letter Text), then "Nuxt specialist who *ships* fullstack." in italic, *ships* the twist word. Czech: "Specialista na Nuxt, který *dotáhne* i backend."
5. **Two-column row.** Columns 2–6: the intro verbatim ("I build fast, accessible web apps with Nuxt and Vue, and I take them all the way to production on Cloudflare."), 18px, max 52ch, muted; under it the stack line, mono 13px muted: TypeScript, Vue, Nuxt, Nuxt Layers, Tailwind, Hono, tRPC, Cloudflare Workers, D1 (each has a project or job on the page). Columns 7–11: a split pill, `hello@martinnavratil.dev` as a mailto link in Amber with Ink text, a 1px divider, and a separate 36×48 copy button (aria-label "Copy e-mail", toast "Copied"); the outlined pill "Download CV (PDF)" → `/martin-navratil-cv.pdf` (`-cs` on /cs); GitHub and LinkedIn as underlined links. Below: **Experience at a glance**, a mono table in muted, four rows (years, company, role for the three jobs; "Mendel University · Bachelor's · Software Engineering"), linking to `#experience`.

Mobile (390): static radial gradient `#161412`→`#0C0B0A` (light `#EAE4DA`→`#F4F0E8`) instead of the shader. Order: eyebrow, name on two lines, role line, e-mail split pill full width with the CV pill beneath (≈300–410px from the top), poster snap row, intro, stack line, glance collapsed to "Develit · Sensorico · Spatial Hub → Experience" (CS "… → Zkušenosti"), GitHub, LinkedIn. Hero ≈1 screen; the first card starts at ≈1.15.

### 2. Selected work + detail panel

Title "Selected work", a real `<h2>`. Three full-width Fey Cards, poster 5 columns/text 7, sides alternating: **Nambi**; **Tábořiště Kondor + SkautSim** (one card, two posters, live links taboriste.fenixb.cz and skautsim.fenixb.cz); **Becky Kay Livingstonová**. Card content in order: status badge (dot per §Palette) and year in mono, name, tagline, summary, "Role" line, stack chips, underlined links with an external icon ("Live" labelled by what it opens: "nambi.cz · landing page"), and a "Details" button rendered only when the project has `detail` (today: Nambi).

**Detail panel**: in-page, not a modal. The card expands downward into a bg-2 panel, four columns on desktop, stacked on mobile: Problem, Role, Decisions (numbered), Outcome, links; copy is the project's Problem, Decisions and Outcome from the Content and attachments section, verbatim. The button becomes "Close"; focus moves to the panel heading; Esc closes; one panel at a time. From a hero poster, the card first scrolls to 96px from the top (instant under reduced motion).

### 3. More projects

Title "More projects". A hairline-ruled list: year (mono), name (Fraunces 26px), tagline, chips, status, links. Rows: Nuxt Study (live, prep.martinnavratil.dev, its own Details toggle), Účetnictví Blansko (Source), Skautské hlasování (archived), RoboPilot (archived). Rows without links are plain text, never fake buttons.

### 4. Experience

Title "Experience". Columns 1–6: a real `<table>`: Period, Company, Role, Location, three rows, hairlines, mono periods; the company name is a button (min-height 36/44), the hover, focus and keyboard trigger. Columns 7–12: the **magnetic stage** (Design Testimonials pattern): three bg-1 cards, width 100% of columns 7–12 minus 32px, `min-height: 280px`, auto height shared at the tallest, padding 24, stacked with 16px offsets; the active row's card rises to the top with the summary, the Develit highlights (15px list; the only entry with them) and stack chips. Below, two bg-1 cards: Education (Mendel University, Brno, Bachelor's degree, Software Engineering, note verbatim, no years) and Leadership (Junák – český skaut, Scout Group Leader, summary verbatim, no period until confirmed). Mobile: a stacked list; the same button toggles the card inline.

### 5. Contact

Title "Contact". Left: the portrait, plain 3:2 `<img>`, 20px radius, inside a 1px Amber (dark)/Ochre (light) hairline frame 8px outside the image, alt "Portrait of Martin Navrátil". Right: "The fastest way is e-mail." in Fraunces italic 36/26px, `hello@martinnavratil.dev` as a Fraunces 44/26px mailto link, then "Copy e-mail" (icon button, toast "Copied"), "Download CV (PDF)", "CV as a web page", GitHub, LinkedIn, the location line.

### 6. Footer

Hairline, then one mono row: "Built with Nuxt. Source on GitHub." (underlined link), "© 2026 Martin Navrátil", and theme/motion/language as text buttons.

### 7. `/cv` page

Print-styled, no effects, no Lenis, light palette regardless of theme, A4 rhythm: 20mm margins, Hanken Grotesk 10.5pt/1.45, Fraunces 24pt name, mono 13pt uppercase section headings. Order: name, headline, contact row (e-mail, martinnavratil.dev, LinkedIn, GitHub, location) with a 32mm portrait right; Experience with highlights; Selected projects (the four featured projects plus Nuxt Study, one line each: name, tagline, stack, URL); Skills (four groups); Education; Leadership. Screen-only top bar: "Back to the site", "Download PDF" (locale-dependent file). Two pages maximum in both languages.

### 8. Header and mobile navigation

Desktop: 64px bar, transparent over the hero, bg-1 at 100% with a bottom hairline after 80px of scroll, no blur. Left: "Martin Navrátil", Fraunces 20px wght 600. Right: Work, Experience, Contact, CV, then 36px icon buttons: ⌘K (visible, `UKbd`, aria-label "Open menu"), theme toggle, motion as a `UDropdownMenu` with three radio items "Motion: system/reduced/full" (current item checked and named in the tooltip), language EN/CS. No island on desktop; header links and ⌘K navigate.

Mobile (<768): the header is the **Scroll Island** only (the wordmark moves into the slideover): a 44px pill, max 220px wide, centred 12px from the top, bg-2 at 100%, no blur, poster shadow. Inside, a menu button (`aria-expanded`, aria-label "Menu — current section: Work") with a 2px progress arc in Amber dark/Ochre light, the current section in mono 12px Bone/Ink truncated at 14 characters, and a menu glyph; beside it a 44×44 mailto link with a mail glyph (aria-label "E-mail Martin"). Tap → `USlideover` from the top (bg-2, 85svh max, focus trapped): wordmark, nav links in Fraunces 40px, theme/motion/language as segmented controls, "Copy e-mail", "Download CV (PDF)".

## Project posters

Six projects with a live site or source (the hero four, Nuxt Study, Účetnictví Blansko; archived rows get none) get a 4:5 poster on one system so the stack reads as a set. Composed and exported by Claude Design at 960×1200, never built at runtime from the Inspira Safari/iPhone components: a bg-0 base; an abstract field in the product's two colours (soft radial blob + diagonal silk stripe) confined to the upper 70%, saturation −20% toward the soot palette, a 10% bg-0 vignette, grain 6%; a device mockup (Safari frame for web, iPhone 15 Pro for Nambi's app) with the attached screenshot at 0.78 scale, rotated −4° to 4°, poster shadow. The bottom 30% stays bg-0; the name (Fraunces 28px Bone) and year (mono) are an HTML overlay on that band, never baked in. No screenshot (Nambi is private; Nuxt Study and Účetnictví Blansko have none) → a bg-1 frame labelled with the project name, never stock UI. Pairs: Nambi royal blue `#4361EE` + cerise `#EB49C8` (Nambi's brand colours); Tábořiště Kondor forest `#2F6B3A` + khaki `#D9C68A`; SkautSim night `#0F3D5C` + cyan `#5FE3D8`; Becky orange `#FF6105` + cream `#F5F5DC`; Nuxt Study `#00DC82` + `#0E2A22`; Účetnictví Blansko navy `#1F3A5F` + sand `#E8DCC4`. The same posters serve light mode.

## Components

Inspira UI components, used as *patterns* and rebuilt where the vendored source breaks budget or accessibility (mechanics in the Implementation notes):

- **Shader Toy background: Silk**, the one WebGL element, behind the hero at ≥1024px with `(hover: hover)` and full motion only; monochrome-tinted to the shader ranges above, speed 0.35, amplitude driven by the breath. A slow silk is texture, not a light show.
- **Breathing Text** on the name: `SOFT` 20→90 on a 6s loop, `wght` fixed at 500 so no letter ever moves.
- **Variable Letter Text** on "Senior frontend engineer.": per-letter `SOFT` 20→100 within 120px of the pointer, `wght` fixed at 600; nothing shifts.
- **Text Hover Effect** on the four section titles, rebuilt on a real `<h2>`: filled Bone/Ink by default; under the pointer a 220px radial mask reveals a 1px Amber/Ochre outline clone. Pure type, readable at rest.
- **Floating Card** for the hero posters: tilt ±10°, lift 24px, deeper shadow, glare opacity ≤.25; touch ignored.
- **Fey Cards** for the three featured projects: poster rises 16px, border-color → Amber/Ochre, 1px, no blur, 250ms.
- **Scroll Island**: pattern only, rebuilt as the mobile `<nav>` in §8 (no blur, no second `<h1>`).
- **Design Testimonials** pattern for the experience stage: magnetic drift ±8px toward the pointer, card swap on hover/focus.

Not used: Particle Image (an instantly recognisable demo; the portrait gets the breathing hairline instead), Liquid Logo (WebGL, over budget), and the ubiquitous staples: Shimmer Button, Bento Grid, Dock, Marquee, Meteors, Border Beam, Flip Words, Text Generate, Globe, Aurora, Lamp.

Nuxt UI 4: `UButton` (Amber/outline/ghost), `UModal` + `UCommandPalette` for ⌘K (jump to section or project, copy e-mail, download CV, theme, motion, language), `USlideover`, `UDropdownMenu`, `UTooltip`, `UBadge`, `UKbd`, colour mode, toast. New interface strings: "Open menu", "E-mail Martin", "Menu — current section".

## Motion

Lenis (lerp 0.1, pointer devices only, off under reduced motion) + GSAP ScrollTrigger for reveals, SplitText on the identity sentence only (never the name or titles); motion-v for layout animations (panel, card swap, slideover) and press springs; the name breathes in pure CSS. Touch viewports load neither Lenis nor GSAP.

**The breath clock.** One CSS variable `--breath` (0→1→0, 6s, in-out) feeds the name's `SOFT`, the Silk amplitude, the live dots' opacity (.7→1), the portrait frame (opacity .6→1) and the island arc's stroke opacity. It pauses (held inhale) while the pointer rests on the e-mail pill, and stops when the hero is off-screen or the tab hidden.

Durations: 150 press, 250 hover, 400 reveal/panel, 600 fan, 900 settle, 1200ms shader fade; hero choreography ends by 1.4s. Easings: out-expo `cubic-bezier(.16,1,.3,1)`, in-out `cubic-bezier(.65,0,.35,1)`, spring stiffness 220/damping 26. Animated properties: `transform`, `opacity`, `font-variation-settings`, `grid-template-rows` (panel), `mask-position` (titles), `border-color`/`background-color` (states), the shader. No scroll parallax, no pinning.

| Element | Full | Reduced (system or switch) |
|---|---|---|
| Silk shader | fades in 1200ms after first paint, loops, pauses off-screen | not loaded; static gradient |
| Hero intro | name visible at first paint, never animates opacity; `SOFT` settles 100→50 over 900ms; posters fan from a pile 600ms spring (transform only); role line and row fade-rise 12px 400ms at +100/+300ms | nothing moves, no fade |
| Breath clock | 6s loop | `--breath` fixed at .5, static `SOFT` 50 |
| Role line letters | pointer-reactive `SOFT` | static |
| Floating Card | tilt, lift 24px, 250ms | opacity .9 on hover, no lift; touch: static fan |
| Section titles | fade-rise 16px 400ms once; outline mask follows pointer | 200ms fade; filled title only |
| Section reveals | fade-rise 16px, 400ms, once, at 15% visible | 200ms fade |
| Fey Cards | poster rises 16px, border 250ms | border colour only |
| Detail panel | rows expand 400ms in-out, content fade-rise 400ms | instant expand, 200ms fade |
| Experience stage | magnetic ±8px, spring card swap | 200ms crossfade swap |
| Portrait frame | breathes with the clock | static |
| Island | arc tracks scroll; appears 400ms rise + fade | arc updates; 150ms fade |
| Slideover · ⌘K · header · toast | slide from top 400ms out-expo · scale .98→1 + fade 200ms · bg-1 after 80px, 250ms · rise 250ms | 150ms fade · instant · instant · 150ms fade |
| Theme toggle | View Transition circle from the button, 600ms | instant swap |
| Buttons · images on load | press scale .97, 150ms · fade 250ms | colour change only · instant |

Pointer-reactive effects run only on `(hover: hover)`; on touch the stack, titles and stage are static.

## The signature

One breath. The page keeps the tempo of a slow breath: the name softens and sharpens, the silk swells, the live dots and the portrait frame glow and dim with it, and it holds while your pointer rests on the e-mail pill, as if the page were waiting for you to write. Not a catalog component but a rhythm, and the name stays plain text at every frame.

## Accessibility

WCAG 2.2 AA floor; both themes pass 4.5:1 for body, muted and small text and 3:1 for control borders and the arc. Focus ring 2px Amber (dark)/Ink (light), 3px offset, on every control, never obscured by header or island. Hit targets ≥36px desktop, ≥44px mobile. Skip link to `#main`; one `<h1>`; section titles are real `<h2>`s. Split and letter effects carry `aria-label` with the full string; the shader is `aria-hidden`. The stack works with Tab and Enter; no drag anywhere; no nested interactive elements. The motion switch is a visible three-state control, persisted. Panel expansion is 400ms so it ends inside the 500ms input-exclusion window and never counts toward CLS.

## Responsive

Breakpoints 390/768/1024/1440. Mobile: single column, 16px gutter, no horizontal scroll except the poster snap row, posters 160×200, the island replaces the header, cards stack poster over text, the stage becomes inline toggles. 768: two-column cards, posters 200px, island plus header links. 1024+: shader on, full fan, stage on, header navigates. Every heading tested at +20% length at 390px.

## Deliverables for Claude Design

(1) Style tile: both palettes with hex, type scale, buttons default/hover/focus/pressed, the split e-mail pill, the outlined pill with its 3:1 border, status badges, chips, links, table row, island states. (2) Home desktop dark 1440×900, shader on, fold marked. (3) Home mobile dark 390. (4) Home desktop light. (5) Home mobile light. (6) Nambi card with the panel open. (7) Experience stage, Develit card raised. (8) Island and slideover open on mobile. (9) ⌘K palette open; header scrolled state. (10) Focus-visible sheet, both themes. (11) `/cv`. (12) One-screen motion spec: every animation with trigger, duration, easing and reduced-motion fallback. (13) The six posters (field + mockup only, no text).

Build the animations into the prototype (CSS transitions, IntersectionObserver reveals, scroll-progress variables, pointer transforms); do not only describe them.

## Do not

No preloader, scroll hijacking, pinning, parallax or cursor replacement. No blue-violet gradients, glass blur, gradient borders, glow, Inter, bento, shimmer or meteors. No uppercase name hero. No second WebGL element, three.js, Liquid Logo, or shader on mobile or in a touch first viewport. No text as image or canvas (poster names are HTML). No first-viewport element starting at opacity 0. No lorem ipsum, invented metrics, availability line or phone number. No stack badges without a project behind them. Nothing over 50KB gzipped in the first viewport.

---

## Implementation notes (for the build; exempt from the word budget)

How the brief's promises are kept in Nuxt. Claude Design may ignore this section.

- **Silk.** Inspira's `bg-silk` is re-implemented on raw WebGL/ogl, ≤15KB gz; if that is not done, the hero ships with the static gradient only. The ShaderToy fragment is patched to output `mix(uBg, uTint, clamp(luma, 0., 1.))` with `uBg = #0C0B0A`, `uTint = #2A2218` (light `#F4F0E8` / `#E3DBCB`, INVERT off). Gating: `<ClientOnly>` + `defineAsyncComponent` at idle, a WebGL capability check, ≥1024px, `(hover: hover)`, full motion only; `aria-hidden`; paused via IntersectionObserver and on `visibilitychange`. The e2e test samples the canvas with `getImageData`: no pixel brighter than `#2A2218` (dark) or darker than `#E3DBCB` (light).
- **Breathing Text.** A CSS `@keyframes` on `font-variation-settings` (zero JS) that also sets `--breath`; `animation-play-state: paused` when the hero is off-screen or the tab hidden. Under reduced motion the plain `<h1>` renders (`v-if` on `useMotionPreference()`): `MotionConfig reducedMotion="user"` does not stop font-axis animation, and the vendored component never checks it. The `<h1>` box is reserved at the width measured at `SOFT` 90 / `opsz` 144.
- **Variable Letter Text and Floating Card.** Each a ~40-line pointer handler writing CSS custom properties (`--soft` per letter; tilt/lift per card), not the vendored motion-v components; `aria-label` on the parent, letters `aria-hidden`; same reduced-motion gate; touch pointers ignored.
- **Section titles.** A real `<h2>`; the flourish is a `::before` clone with `-webkit-text-stroke: 1px` Amber/Ochre, transparent fill, `mask-image: radial-gradient(220px at var(--x) var(--y), #000, transparent)`, pointer devices only. The vendored Text Hover Effect (SVG `<text>`, three copies, invisible at rest) is not used; SplitText never touches the titles.
- **Scroll Island.** Rebuilt: `<nav aria-label="Site"><button type="button" aria-expanded aria-controls="mobile-menu" class="h-11 min-w-44 px-4">` with an inline SVG arc (`aria-hidden`) and the section name in a `<span>`; bg-2 at 100%, no `backdrop-blur`, no NumberFlow, no VueUse colour mode (Nuxt UI owns colour mode), no second `<h1>`. `html { scroll-padding-top: 72px }` on mobile, 80px on desktop (2.4.11).
- **Bundles.** Touch viewports load no GSAP and no Lenis: reveals via IntersectionObserver + CSS, the island arc via a passive scroll listener. Pointer viewports load Lenis + GSAP after first paint through `requestIdleCallback`; motion-v only via `LazyMotion` with `domAnimation` at idle. First-viewport JS is Nuxt + Nuxt UI only. Lenis `syncTouch: false`; `lenis.on('scroll', ScrollTrigger.update)`.
- **Fonts.** Exactly two files preload before LCP: Fraunces roman (axes `wght` 400–800, `opsz` 48–144, `SOFT` 0–100, `WONK` dropped, latin + latin-ext merged, ≤50KB gz; if larger, pin `opsz` 144) and Hanken Grotesk (`wght` 400–700, latin + latin-ext, ≤40KB). Fraunces italic (`wght` 400, `WONK` 1, ≤30KB) and JetBrains Mono (`wght` 500, ≤30KB) use `font-display: swap` with `@nuxt/fonts` `size-adjust` fallbacks. The build report verifies sizes.
- **Posters.** `srcset` 320/480/640/960 from the 960×1200 master, `sizes` matching the 160/224px slots, every served variant ≤40KB, the four hero variants ≤160KB together; the front poster preloaded with `fetchpriority="high"`, the other three `loading="eager"`. The name/year overlay is HTML; the link carries the accessible name.
- **Detail panel and tables.** Panel: `grid-template-rows` 0fr→1fr, 400ms; `aria-expanded`/`aria-controls` on the button; afterwards `ScrollTrigger.refresh()` and `lenis.resize()`; the panel heading has `tabindex="-1"`; cards carry `scroll-margin-top: 96px`. Experience: `<caption class="sr-only">`, `<th scope="col">`, a `<button aria-expanded aria-controls>` in the Company cell. The copy control is a separate `<button>` beside the mailto `<a>` (no nested interactive); toast region `aria-live="polite"`; the slideover is a dialog with a focus trap.
- **Grain.** A 256×256 PNG tile (feTurbulence rasterised once, ≤6KB) as `background-image` on a `position: fixed` pseudo-element above the shader, `mix-blend-mode: soft-light`, `pointer-events: none`; never `background-attachment: fixed`, never a live SVG filter.

---

<!-- content:start · generated by `pnpm brief:content` from the site data; do not edit by hand -->

## Content and attachments

This section is the only source of facts about Martin and his work: projects, jobs, dates, numbers and quotes. Use every string exactly as written. Anything not listed here does not exist yet: leave it out, never invent it, and never draw lorem ipsum, a placeholder or a TODO box. Interface labels that the brief itself introduces are allowed; every other label comes from the interface strings below. Field names used earlier in the brief (tagline, summary, role, highlights, detail, Problem / Decisions / Outcome) refer to the labels in this section.

### Attachments

- `portrait-placeholder.jpg`: Martin's portrait, a stand-in until the real photo arrives. Landscape 3:2 on a dark backdrop; crop it as the brief says.
- `ref-1-rachelchen-identity-line.jpg` and `ref-2-sandwich-hero.jpg`: Martin's mood references for the hero. The first is a large serif identity sentence with one italic twist word beside an experience table; the second is a big name above a fanned stack of work images above a big role line. Inspiration only: where they differ from this brief, the brief wins. Never copy their text or images.
- `shot-taboriste.jpg`: taboriste.fenixb.cz, the Tábořiště Kondor site with its 3D campsite hero.
- `shot-skautsim.jpg`: skautsim.fenixb.cz, the SkautSim lobby inside the 3D camp.
- `shot-becky.jpg`: beckykaylivingston.cz, the home page of Becky Kay Livingstonová's site.
- `shot-nambi-landing.jpg`: nambi.cz, the public Nambi landing page. A brand reference only (colours, logo, type): Nambi's app is private, so its posters show a UI abstraction in Nambi's brand colours, never this page.
- The three site screenshots go inside the poster device frames, cropped as the brief describes. Nuxt Study, Účetnictví Blansko, Skautské hlasování and RoboPilot have no screenshot: where the brief gives one of them a poster, draw a two-tone UI abstraction labelled with the project name.

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
