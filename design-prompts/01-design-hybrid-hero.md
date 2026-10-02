# Design 1 — Hybrid hero: the recommended direction

## Brief

The personal portfolio of Martin Navrátil, senior frontend engineer and Nuxt specialist who ships fullstack, based in Czechia, remote only. It is the link in his CV; recruiters and hiring engineers give it 30–60 seconds. One long page that proves craft by being crafted: dark-first, editorial, typographic, one accent, one signature interaction — a fanned deck of project posters the reader can tilt, drag and reorder, and that deals itself out into a row on scroll. Mood: a well-set magazine spread in a developer's habitat — confident type, 1 px hairlines instead of boxes, generous space, no glow, no glass, no gradients outside the posters. Nothing may look like a 2026 dark-mode template.

## Audience and the 30-second scan

- 0–3 s: name, four posters of shipped work, *senior*, *Nuxt*, *remote*, the stack line — real text at opacity 1 in the server markup; the `<h1>` is the LCP element.
- 3–10 s: identity sentence, **Download CV (PDF)**, **Copy e-mail** — inside the first viewport on every budgeted screen.
- 10–20 s: the experience strip — employers, dates, roles, summaries — without a click.
- 20–30 s: the first project card: working link, "Details" opening the reasoning in place.

Selected work starts no lower than 160 vh desktop / 170 vh mobile; no preloader or scroll hijacking; links come from `app/data`; e-mail and CV one click from hero, header and ⌘K.

## Palette

One accent (amber), warm neutrals. Dark default; toggle and system preference switch to light. Ratios are WCAG 2.x against bg / surface / raised.

**Dark** — bg #0B0B0D · surface #141416 · raised #1C1C20 · hairline #2A2A2F (decorative, 1.4:1) · border #6E6D67 (3.8 / 3.6 / 3.3; secondary-button outline, WCAG 1.4.11)

| Token | Hex | Use | Ratio |
|---|---|---|---|
| text | #EDECE8 | body, headings, name | 16.6 / 15.6 / 14.4 |
| muted | #A6A59F | secondary copy, table cells, chips | 8.0 / 7.5 / 6.9 |
| faint | #8E8D88 | 13 px meta | 5.9 / 5.5 / 5.1 |
| accent | #E8B04B | twist word, links, focus ring, primary fill (ink #0B0B0D on it 10.1; hover #F0BD63, 11.4) | 10.1 / 9.4 / 8.7 |

**Light** — bg #F7F6F2 · surface #FFFFFF · raised #EEEDE8 · hairline #D9D8D2 (1.3:1) · border #85847F (3.5 / 3.8 / 3.2)

| Token | Hex | Use | Ratio |
|---|---|---|---|
| text | #15151A | body, headings | 16.8 / 18.2 / 15.5 |
| muted | #5A5A60 | secondary copy, chips | 6.3 / 6.9 / 5.8 |
| faint | #6A6A70 | 13 px meta | 5.0 / 5.4 / 4.6 |
| accent-text | #8A5600 | twist word, links, focus ring, /cv labels | 5.7 / 6.2 / 5.3 |
| accent-fill | #E8B04B | primary button only, #15151A on it 9.3; hover #D99F38, 7.8 | — |

Never Nuxt UI's `dimmed` for text. Selection accent at 35 %. Status chips: text plus a 6 px dot (live accent, in progress muted, archived faint). Chips: `raised`, muted text, hairline. One shadow, posters and open panel: `0 24px 48px -24px rgb(0 0 0 / .6)` dark, `/ .25` light. Posters keep their colours in both themes.

## Typography

Three families via `@nuxt/fonts`, Czech diacritics verified in every instance (Ř Ů Ě Č Ť Ď Ň, italic and condensed too).

- **Display — Bricolage Grotesque.** One variable file, latin + latin-ext, axes trimmed to wght 600–700 and wdth 75–100, opsz pinned. Name uppercase (`text-transform`) at wdth 80 / 700; headings wdth 90 / 600.
- **Accent serif — Fraunces.** Two static instances (`pyftsubset --instance`, opsz 144, wght 400, SOFT 50): roman, and italic with WONK 1. Only the identity sentence, the Contact pull line and single italic words; the twist word is the italic in accent. Never body or UI.
- **Body and UI — Geist 400/500, Geist Mono 400/500** (static, latin + latin-ext): Geist for paragraphs and buttons; Geist Mono, tabular figures, for meta, stack line, table, dates, chips, footer.

Budget: ≤ 50 KB per file, ≤ 140 KB for all seven, `font-display: swap` with `@nuxt/fonts` metric fallbacks; preload only Bricolage and the Fraunces italic (≤ 70 KB before LCP).

Scale 1440 / 768 / 390, fluid with `clamp()`:

| Role | Face | Size | Weight | LH | Tracking |
|---|---|---|---|---|---|
| Hero name | Bricolage wdth 80 | `clamp(56px, min(10.5cqw, 16svh), 136px)` → 126 / 80 / 56 px | 700 | 0.9 | −0.03em |
| Identity sentence | Fraunces | 48 / 40 / 32 px | 400 | 1.1 | −0.01em |
| H2 | Bricolage wdth 90 | 48 / 40 / 32 px | 600 | 1.05 | −0.02em |
| H3 project | Bricolage | 24 / 22 / 22 px | 600 | 1.15 | −0.01em |
| Intro | Geist | 18 / 18 / 17 px | 400 | 1.5 | 0 |
| Body | Geist | 17 / 16 / 16 px | 400 | 1.6 | 0 |
| Meta / table / stack line | Geist Mono | 14 / 14 / 13 px | 400 | 1.5 | 0; uppercase labels 0.08em |
| Chips | Geist Mono | 12 px | 500 | 1 | 0.02em |

Headings use `text-wrap: balance`; Czech runs ~20 % longer, so every heading frame tolerates one extra line.

## Layout system

- 12 columns, max 1200 px, gutters 80 / 40 / 20 px, gap 24 px. Spacing 4, 8, 12, 16, 24, 32, 48, 64, 96, 128 px; section padding 128 / 96 / 64 px.
- Hairlines and type, not boxes; cards only in Selected work. Radii: 4 px chips, 10 px buttons, 16 px cards, 20 px posters, 999 px pills.
- Buttons (`UButton`, 40 px, 16 px padding, Geist 500): primary accent fill + ink; secondary 1 px `border` outline, `raised` on hover; tertiary mono link with draw-in underline. Icon buttons 40 × 40 px; every target ≥ 24 px.
- Nav links muted, `text` when hovered or active (1 px underline). Table and More-projects rows `raised` on hover; panel background `raised`. Inline links in running text underlined (1 px, offset 3 px, accent / accent-text).

## Sections in order

### Hero — the sandwich

`min-height: 100svh` under the 64 px header, centred. Order: name → deck → identity sentence → stack line → buttons → meta row → intro; the first five must fit inside 100 svh on every budgeted viewport, meta row and intro may dip below the fold.

| | 1440 × 800 | 1280 × 720 | 390 × 740 |
|---|---|---|---|
| Name line box (0.12em reserved for Á) | 128 px | 112 px | 2 lines, 110 px |
| Deck band | 680 × 336 px | 600 × 300 px | 350 × 200 px |
| Identity sentence | 2 × 53 px | 2 × 48 px (44 px type) | 3 × 35 px |
| Stack line | 21 px | 21 px | 2 × 20 px |
| Buttons | 40 px | 40 px | 44 px, side by side, 48 % each |
| Gaps | 16 / 24 / 12 / 20 | 12 / 16 / 12 / 16 | 12 / 16 / 12 / 16 |
| Sum / available | 703 / 736 | 626 / 656 | 544 / 676 |

1. **Name** — `MARTIN NAVRÁTIL`, real `<h1>`, `white-space: nowrap`, `contain: layout`; one line at ≥ 1024, `MARTIN` / `NAVRÁTIL` at 390; the accent may rise above the cap line. Server-painted at opacity 1, never faded in.
2. **Deck** — 1440: posters 224 × 280 px, slot centres x = −195 / −65 / +65 / +195, rotations −12° / −4° / 4° / 12°, y offsets 0 / −12 / −12 / 0, z-order 1-2-4-3 (slot 3 front). Default order: Tábořiště Kondor, Becky, Nambi (front), SkautSim. 1280 and 768: 200 × 250, step 116. 390: 128 × 160, step 64, rotations ±8° / ±3°, static; each card's visible 64 px strip is its tap target. Between viewports: height `clamp(250px, 35svh, 280px)`, width 0.8 × height, step 0.58 × width. Screenshots ≤ 40 KB webp at 2× the device width, explicit `width`/`height`; front card `fetchpriority="high"`, the others `loading="eager" fetchpriority="low"`; tones, monogram and caption are CSS and paint before any image.
3. **Identity sentence** (verbatim `profile.headline.en`), Fraunces 48 px, two to three lines, max 880 px: *Senior frontend engineer. Nuxt specialist who **ships** fullstack.* — "ships" is the italic accent twist word; Czech twist word **dotáhne**.
4. **Stack line**, mono 14 px muted, five items from `skills[0]` + `skills[1]`: `Nuxt · Vue · TypeScript · Hono · Cloudflare Workers`.
5. **Buttons** — **Download CV (PDF)** primary, **Copy e-mail** secondary, 12 px apart.
6. **Meta row**, mono 14 px faint: `Based in Czechia · remote only` · `hello@martinnavratil.dev` (`mailto:`) · `GitHub` · `LinkedIn`; links underlined, accent, 8 px vertical padding so the inline target reaches 24 px.
7. **Intro** (verbatim `profile.intro.en`), Geist 18 px muted, one line, max 560 px; three lines at 390.

### Experience strip

Full-width `surface` band directly under the hero, hairlines top and bottom, 64 px padding; H2 "Experience" in 3 columns, a real `<table>` in 9 (widths 2 / 3 / 3 / 1: Period · Company · Role · Where) with a visible mono uppercase `<th scope="col">` row. Rows 72 px, Geist Mono 14 px: period in `text`, the rest muted; second line the `summary`, muted. Newest first:

| 2022 — 2026 | Develit | Full Stack Engineer | Remote |
| 2020 — 2022 | Sensorico | Frontend Developer | Brno |
| 2018 — 2020 | Spatial Hub | Frontend Developer | Brno |

The Company cell holds a `<button aria-expanded aria-controls>` (row click delegated to it); the expanded content is the next `<tr>` with `colspan`: `highlights` (Develit) and `stack` chips, `layout` 300 ms. Under the table, from `volunteering`, never inside it: mono label **Volunteering** · `[TODO: year] — present · Junák – český skaut · Scout Group Leader · Blansko`. Below 1024: heading on top, no Where column, three-line rows.

### Selected work + detail panel

H2 "Selected work". One row of four cards at ≥ 1200 px (282 px wide, 24 px gap), two columns at 768, one at 390: poster 4:5, 282 × 352 px, radius 16 px; H3 name; tagline muted; `Role —` in mono; stack chips; status chip (Nambi, `in-progress`, adds its `outcome` line beside it). Links **Landing ↗** for Nambi (marketing site only), **Live ↗** for Kondor, Becky, SkautSim, underlined; **Details** secondary. Grid order fixed — Nambi, Tábořiště Kondor, Becky Kay Livingstonová, SkautSim — whatever the deck order.

**Detail panel:** "Details" expands the card in place to full grid width, siblings reflow below. Left, mono labels **Role**, **Problem**, **Outcome**; right **Decisions** numbered 01–03 in mono accent, then **Stack**; links row; 40 px close button top-right ("Close details"); Escape closes; focus returns to the opener (Details, or the deck poster after Enter); one panel at a time; URL gains `#nambi`. No-detail variant (Kondor, Becky, SkautSim today) is a designed state: one column — summary, Role, Stack, links — no empty blocks, no visible TODO; Martin writes `detail` for these three before launch. Mobile: `UDrawer` from the bottom (vaul; `USlideover` has no handle), snap 92 svh, decorative `aria-hidden` handle, same close button and Escape.

### More projects

H2 "More projects": hairline rows 72 px — name (Bricolage 20 px) · tagline (muted) · year and status (mono, right) · links. Nuxt Study (Live ↗ and **Details**: it has a full `detail`, reuse the panel), Účetnictví Blansko (Source), Skautské hlasování (archived), RoboPilot (archived). No posters.

### Contact

Columns 5 + 7. Left: the portrait (`/images/portrait-placeholder.webp`, 3:2, radius 20 px, 420 px wide, hairline frame as the only treatment — no vignette or recolour, the dark backdrop stays dark in light mode). Right: H2 "Contact", pull line Fraunces roman 40 px *The fastest way is e-mail.*, `hello@martinnavratil.dev` as a 32 px Bricolage `mailto:` link with draw-in underline, buttons **Copy e-mail** (primary), **Download CV (PDF)**, **CV as a web page** (may wrap to two rows in Czech), GitHub / LinkedIn in mono. Mobile: portrait first, full width, 4:5.

### Footer

Hairline top, 48 px padding, mono 13 px faint: "Built with Nuxt. Source on GitHub." (underlined) · © {year from build time} Martin Navrátil · motion switch (`radiogroup` System / Reduced / Full, segments 32 px tall, mono 13 px, selected segment filled `raised` in `text`) · EN / CS · theme toggle.

### /cv page

A4 from the same data; web top bar (hidden in print): "Back to the site", "Download PDF". Name Bricolage 28 pt, headline Fraunces italic 12 pt, portrait 32 mm right, contact line mono 9 pt; sections Experience (highlights, stack), Selected projects (name, tagline, role, full URL), Skills (four groups), Education, Leadership. Geist 10.5 pt / 1.45, 0.5 pt hairlines, section labels accent-text #8A5600 on screen and #000 in print, 18 mm margins, two pages maximum; light palette on screen, #000 on #FFF in print.

### Header + mobile nav

64 px, solid `bg`, hairline after 8 px of scroll. Left: wordmark "Martin Navrátil", Bricolage 16 px 600. ≥ 1024 px right: Work · Experience · Contact · CV (mono 14 px, active item underlined via section observers), a 40 px command button showing `⌘K` (`aria-label="Command menu"`), theme toggle, EN/CS. 768–1023: text links move into the menu; the cluster is command, theme, EN/CS, a 40 px menu button. Below 768: wordmark, command button with a search icon (no ⌘K glyph), menu button. The menu is a `USlideover` from the right (full height, `surface`): four links at Bricolage 32 px, 16 px apart, a settings block (Theme, Language, Motion), e-mail and CV buttons at the bottom. "Skip to content" is the first focusable element.

## Project posters

Dashboard screenshots are drab, so each project gets a designed poster: an HTML/CSS component exported at build to 640 × 800 webp for the mobile deck and OG images. System: 4:5, radius 20 px, two-tone background from the product's palette with 4 % grain; the project's first word as a Bricolage wdth 75 monogram (220 px, caption colour at 12 % opacity) bleeding off the top-right so only two or three letters show (Tábořiště → "TÁB"); Inspira **Safari Mockup** at 70 % of poster width anchored bottom-centre, or **iPhone Mockup** at 42 % width bleeding 25 % off the bottom (Nambi); a mono 13 px caption bottom-left — name · year · one stack word — on the tone named below. No real screenshots exist yet: the device holds a two-tone UI abstraction (nav bar, three cards, one table) labelled with the screen name. Root `role="img" aria-label="<name> — <tagline>"`, every child `aria-hidden="true"`, screenshot `<img alt="">`; the deck `<button>` carries the same label.

| Poster | Tones | Caption | Device · screen |
|---|---|---|---|
| Nambi | coral #F26B5E → #2B1B1A [CHECK brand colour] | ink #0B0B0D on coral (6.6) | iPhone · [SCREENSHOT: app · offers list] |
| Tábořiště Kondor | forest #1F3D2B → #0E1A13 | amber #E8B04B (6.1 / 9.1) | Safari · [SCREENSHOT: 3D campsite preview] |
| Becky Kay Livingstonová | orange #FF6105 → cream #F5F5DC | ink #15151A, either end (6.0 / 16.4) | Safari · [SCREENSHOT: home hero] |
| SkautSim | night #1A1F4A → #0B0D1F | #EDECE8 (13.3 / 16.3) | Safari · [SCREENSHOT: in-game view] |
| Nuxt Study (OG only) | Nuxt green #00DC82 → #0B0B0D | ink #0B0B0D on green (10.8) | Safari · [SCREENSHOT: study page] |

## Components

Inspira UI (registry ids in brackets):

- **Variable Text** (`variable-font-cursor-proximity`) on the name: pointer proximity within 160 px drives `wdth` 80 → 90 (never 100, which would reflow the line), one rAF, inside `contain: layout` and `white-space: nowrap`. If letters are split into spans, the `<h1>` gets `aria-label="Martin Navrátil"` and the spans `aria-hidden`. Static on touch and under reduced motion. Why: kinetic variable-font type reads without animation and is rare on developer sites.
- **Safari Mockup** (`safari-mockup`), **iPhone Mockup** (`iphone-mockup`) inside posters, static, SVGs `aria-hidden`.
- **Blur Reveal** is removed: the vendored component animates `filter` and ignores reduced motion. H2s get a motion-v opacity + 8 px translate reveal.

The WebGL/canvas slot stays empty — no canvas on the page. The portrait is a plain `<img>`: a particle portrait is a recognisable trope and would spend the slot on the one element that should look human; if ever used, spend it on poster grain. Nothing else from Inspira; the deck is bespoke.

Nuxt UI 4: `UButton`, `USlideover` (mobile nav), `UDrawer` (mobile panel), `UTooltip`, `UCommandPalette` in a `UModal` for ⌘K (Copy e-mail, Download CV, jump to project, Theme, Language, Motion), colour mode with dark default.

## Motion

**Lenis** owns scrolling (lerp 0.1, `syncTouch: false`, native on touch, off under reduced motion; `scrollTo` for deck → card jumps). **GSAP ScrollTrigger** owns scroll-linked work (deal-out, active nav, header hairline), updated from Lenis. **GSAP SplitText** (3.13+, `aria: 'auto'`, `autoSplit`, `revert()` after the entrance so `text-wrap: balance` and selection return) splits the identity sentence into lines. **motion-v** owns pointer and layout motion (`useSpring`, `layout`, `AnimatePresence`) inside `<MotionConfig reducedMotion>` keyed to the motion switch. All three load after first paint (dynamic import in `requestIdleCallback`, `LazyMotion`); the hero is usable before they arrive. Tokens 150 / 220 / 400 / 700 ms; out-expo `cubic-bezier(.16,1,.3,1)` for entrances; in-out `cubic-bezier(.65,0,.35,1)` for layout; spring (stiffness 260, damping 24) for pointer. Only `transform` and `opacity`; no pinning, no parallax. The hero choreography runs concurrently, caps at 800 ms, is applied by JS only after the libraries load and while the hero is in view, and is skipped on bfcache restores (`pageshow.persisted`).

| Element | Full motion | Reduced motion |
|---|---|---|
| Hero name | Variable Text proximity; no entrance | Static wdth 80 |
| Deck entrance | The only true entrance: cards deal in from 80 px below, 0° → slot angle, 700 ms out-expo, 60 ms stagger | 200 ms fade, already fanned |
| Deck pointer | Hover lift −12 px, scale 1.03, 220 ms; hovered card tilts ±6° via spring; drag (cursor `grab`) snaps to the nearest slot and reorders; click on a back card brings it to the front (single-pointer alternative to drag, WCAG 2.5.7); click on the front card jumps to its work card. Order persisted in `localStorage`, applied before first paint by an inline script setting `data-deck-order` on `<html>`, never a visible swap | Siblings dim to 0.92, no tilt; drag and click still work, snap 150 ms, no spring |
| Deck keyboard | `<ul aria-roledescription="project deck">` of `<li><button>` posters, roving tabindex; ← → move focus only; Space or Shift+← → reorders; Enter scrolls to the card (Lenis `scrollTo`), focuses its Details button and opens the panel; sr-only hint "Arrow keys move between projects, Space brings one forward, Enter opens" | Identical, native scroll |
| Deck deal-out | ScrollTrigger scrub over the hero's last 40 vh, no pin, nothing leaves the hero: each poster rotates to 0°, drops its y offset and slides to the column centre of its named work card (x = −459 / −153 / +153 / +459 at 1200 px, same size) — the fan becomes a straight 4-up row at the hero's foot; scrolling back reassembles. The row crosses nothing; the experience strip starts below it. Deck posters are `aria-hidden` duplicates; the cards reveal their own `<img>` posters. Touch: the static deck fades to 0.6 over the same range | Posters fade to 0.6, no travel; cards fade in 200 ms |
| Identity + intro | SplitText lines translateY 12 px → 0, 500 ms, 60 ms stagger, text painted throughout (no opacity); twist-word underline draws in 400 ms | Underline only, 200 ms |
| Reveals, once at 20 % visible | Opacity + translateY, 400 ms out-expo: experience rows 12 px, 60 ms apart; H2s, Contact pull line and e-mail link 8 px; project cards and More-projects rows 16 px, 80 ms stagger | 200 ms opacity |
| Hover | Card poster scale 1.02 inside its clip, 220 ms; table and More-projects rows `raised` 150 ms | Colour only |
| Experience row expand | `layout` 300 ms | Instant, 150 ms fade |
| Detail panel | `layout` expansion 400 ms in-out, content stagger 40 ms, siblings reflow with the same ease; drawer 300 ms out-expo | Instant layout, 150 ms fade |
| Header | Hairline after 8 px of scroll: opacity 150 ms; active-nav underline draws 200 ms | 150 ms opacity |
| Links / buttons | Underline draw 200 ms; fill 180 ms; press scale 0.97 | Colour change only |
| Theme toggle | View Transition circular reveal from the button, 500 ms, deck static during the snapshot; keyed to `useMotionPreference().reduced`, not the OS flag alone | `startViewTransition` skipped, 200 ms CSS cross-fade |
| ⌘K modal, slideover, drawer | 300 ms out-expo, items stagger 25 ms | 150 ms fade |
| Copy e-mail | Label → "Copied", 150 ms fade, reverts after 1 500 ms, `aria-live="polite"` | Same |
| Smooth scroll | Lenis lerp 0.1 on pointer devices | Native |

The visible motion switch (footer, mobile menu, ⌘K) has three persisted states — System, Reduced, Full; the Reduced column applies whenever the effective preference is reduced.

## The signature

**The deck.** Four posters of real work fanned under the name, alive under the pointer: tilt, lift, drag or click to reorder — and on scroll the fan deals itself out into a straight row at the foot of the hero, each poster sliding to the column where its card will appear, then gathers again on the way back. The order you left it in is the order you find next time. The memory: "the cards that dealt themselves out".

## Accessibility

- WCAG 2.2 AA floor, axe in CI on all four routes, desktop and Pixel 7. Every token pair ≥ 4.5:1 in both themes; hairlines decorative; `border` ≥ 3:1.
- `:focus-visible` ring 2 px, 2 px offset (dark #E8B04B, light #8A5600), never under the header (`scroll-margin-top: 80px`). Filled buttons: a double ring, 2 px ink inside + 2 px accent outside (dark), 2 px #15151A inside + 2 px #8A5600 outside (light). Skip link first; one `<h1>`; H1 → H2 → H3.
- Deck: click alternative to drag (2.5.7), keyboard as in the Motion table (2.1.1), targets ≥ 24 px (2.5.8); hover and tilt gated on `(hover: hover) and (pointer: fine)`.
- Posters labelled `role="img"`; split text keeps its accessible name; device SVGs `aria-hidden`; panels, drawer and table rows use `<button aria-expanded aria-controls>`; slideover, drawer and modal trap and restore focus; status chips carry text; copied state `aria-live="polite"`; motion switch is a `radiogroup`; no content behind motion; native cursor never replaced.

## Responsive

Breakpoint values live in each section (390 mobile-first, 768, 1024, 1440); at 1920+ the container stays 1200 px and the deck follows its `svh` clamp. Mobile in one line: menu header, two-line name, static fan (tap scrolls to the card), buttons side by side, three-line experience rows, one-column work, bottom drawer, portrait first, exported-webp posters, no Lenis. Czech strings to test in every frame: "Specialista na Nuxt, který dotáhne i backend.", "Stáhnout životopis (PDF)", "Životopis jako webová stránka", "Projekty · Zkušenosti · Kontakt · Životopis".

New i18n keys (invent no others): `experience.where`, `experience.volunteering`, `work.landing`, `work.close`, `nav.command`, `nav.menu`, `deck.hint`.

## Deliverables for Claude Design

1. Style tile: both palettes, the type scale with Czech diacritics, buttons and links in every state including the double focus ring, chips, a table row, one poster.
2. Home desktop 1440 dark, full page; mobile 390 dark; desktop 1440 light; mobile 390 light.
3. Project panel open (Nambi) desktop dark, the no-detail variant (Kondor), the mobile drawer.
4. /cv — screen view and a print preview of page 1.
5. States sheet: header scrolled, 768 header, mobile nav open, ⌘K open, deck hover / drag / keyboard focus, deck mid-deal (0.5) and dealt (1), reduced-motion deck, copied state, expanded experience row.
6. One-screen motion spec reproducing the Motion table.

Build the animations into the prototype (CSS transitions, IntersectionObserver reveals, scroll-progress variables, pointer transforms); do not only describe them.

## Do not

- No preloader, enter screen, scroll hijacking, pinning, fixed overlay layers, parallax, cursor follower or custom cursor; nothing animated crosses the experience strip.
- No glow, glass blur, gradients outside posters, aurora / lamp / beam, bento for its own sake, marquee, `filter` animations.
- The name is never an image, canvas or SVG and never starts at opacity 0; no canvas or WebGL on the page.
- No lorem ipsum, invented metrics, clients, logos, screenshots or testimonials; missing facts render as `[TODO: …]`. No availability line, no phone, no private Gmail — only `hello@martinnavratil.dev`; no hard-coded copyright year.
- No Nuxt UI `dimmed` text, nothing under 12 px, no colour-only status, no hover-only affordances on touch, no Inter, no emoji.
