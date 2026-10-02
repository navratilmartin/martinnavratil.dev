# martinnavratil.dev — project source of truth

> **Purpose of this file:** the single source of truth for the portfolio. It records **decisions**
> (with the why), **status**, **what is left**, **what is deferred**, and the **research** behind the
> choices. Updated continuously during planning, design and implementation. Written in English because
> the site, the repo and the README are English.

- **Project:** personal portfolio of Martin Navrátil, used as the link in a CV
- **Domain:** `martinnavratil.dev` (+ `www`), Cloudflare zone, custom domains already bound to an
  assets-only Worker named `martinnavratil-dev`
- **GitHub:** `navratilmartin/martinnavratil.dev` — public (decided Q4; created at scaffold time)
- **Placeholder online since:** 2026-09-20 (Nuxt 4 + Nuxt UI 4, one page driven by `app/app.config.ts`)
- **Planning started:** 2026-10-02
- **Phase:** 🟡 **design** — scaffold and real content done; four Claude Design briefs written and adversarially reviewed (`design-prompts/`, see §2.1); waiting for Martin's pick of the brief(s) to run in Claude Design

## 0. Process (agreed 2026-10-02)

1. **Decide the tech and set up the repo + Nuxt project** (this interview, then scaffolding).
2. **Design briefs for Claude Design** — several variants written as English briefs in
   `design-prompts/` (same workflow as `becky-web`), pick one, import the result via design sync into
   `design/`, extract tokens.
3. **Implement** the site section by section against the chosen design; QA (a11y, performance, links);
   deploy; iterate.

Legend used below: ✅ decided · 🟡 open · ⏸️ deferred · ❓ needs Martin's input

## 1. Goal, audience, positioning, shape (decided)

| # | Question | Decision | Why |
|---|---|---|---|
| Q1 | Primary job of the site | ✅ **Land a senior frontend / Nuxt role.** Readers: recruiters and hiring engineers (CZ / EU / remote). Desired actions: scan in 30 s, read the work, download the CV, make contact. **English-first.** | The interview-prep project shows this is the live goal; one audience keeps the message sharp. |
| Q2 | Positioning (one line) | ✅ **Frontend engineer, Nuxt specialist, who ships fullstack.** Leads with frontend craft (the site itself is the proof), backed by fullstack evidence (Nambi API with tRPC/Hono/D1/auth, Cloudflare everywhere). | Honest to the projects on disk; widest net for senior frontend roles; justifies a crafted but engineered site, not a WebGL showreel. |
| Q3 | Shape | ✅ **Single long page.** Project cards link out to live sites and GitHub. | Martin's choice: fastest to build, maximal room for the effects. Consequence: senior-level reasoning (decisions, trade-offs, outcomes) has to live *inside* the page — expandable project panels / modal detail — because research says that depth is what hiring engineers click for (see §5.1). To be solved in the design phase. |

## 2. Hero direction — two references from Martin (2026-10-02)

Two Instagram reels, both **light, editorial** portfolio headers:

**Ref A — rachelchen.tech** ("the portfolio that landed me my dream product role", Notion).
Top bar: `RACHEL CHEN · PRODUCT DESIGNER + ENGINEER` with `WORK / FUN / ABOUT / RESUME`. Left: a large
serif identity sentence, *"I'm Rachel, a product designer who* **engineers**." Right: a compact experience
table at a glance (year · company · role, five rows). Below: project cards with gradient thumbnails.

**Ref B — "sandwich hero"** (reel by louyi.ux, example: Spencer Gabor, illustrator, Brooklyn).
Big uppercase `FULL NAME` on top, a fanned / overlapping stack of work images in the middle, big
uppercase `ILLUSTRATOR, DESIGNER & ANIMATOR` below, then a "clients include" row. Pitch of the reel:
"instant hero energy".

**Assessment**

- Ref A matches what recruiters actually do (identity + proof above the fold, 30-second scan, §5.1).
  The italic twist word is a cheap, memorable device. Weakness: by itself it is not "breathtaking"; the
  wow must come from execution — typography, motion craft, one signature interaction.
- Ref B shows the work within the first second and the fanned stack is a natural host for interaction
  (tilt, drag, scatter on scroll) and for Inspira components (3D Card, Floating Card, Parallax Float,
  Fey Cards, Cube Carousel). Weaknesses: it is built for illustrators with colourful artwork — developer
  screenshots of dashboards are drab, so each project needs a designed "poster" (device mockup +
  gradient/texture, Inspira has iPhone/Safari mockups); and the big-uppercase-name hero is now a
  trend-reel cliché, so uniqueness must come from the *behaviour* of the stack, not the layout.

**Recommendation (🟡 pending Martin):** a hybrid. Sandwich hero = `MARTIN NAVRÁTIL` as real text (SEO,
a11y) → interactive fanned stack of 4–5 project posters (pointer: tilt/drag/hover-lift; touch: static
fan; reduced motion: static) → identity sentence with the italic twist ("a frontend engineer who
*ships*" — final copy TBD) → stack line. Immediately below: Ref A's experience table as its own strip.
Light-first editorial base like both references, which is rarer in 2026 than the default dark-glow look
and makes restrained Inspira effects stand out. Final call in the design-brief phase (variants).

### 2.1 Design briefs (2026-10-02, written by a 21-agent workflow: 4 authors → 3 adversarial critiques each → revision → synthesis)

Files in `design-prompts/`; the full comparison, the grafts and the Claude Design run checklist are in
`design-prompts/README.md`. Scores are recruiter / a11y+perf / design director out of 10.

| Brief | Signature | WebGL | Scores | Effort |
|---|---|---|---|---|
| `01-design-hybrid-hero.md` | The deck: fanned project posters you tilt, drag and reorder; deals itself out on scroll, order persisted | none | 7 / 6 / 6 | L |
| `02-design-quiet-signature.md` | Inspect mode: the page annotates its own components with real gzipped costs and "why" notes, keyboard-walkable | none | 7 / 7 / 7 | M |
| `03-design-maximal-dark.md` | One shared 6 s "breath" clock: name, silk shader, live dots, portrait frame | Silk behind the hero, desktop pointer only | 6 / 6 / 6 | L |
| `04-design-bento-proof.md` | Self-measuring hero: Lighthouse, CWV, bundle size, last commit as tiles | Silk behind Contact, lazy | 7 / 6 / 6 | L |

Panel recommendation: run **02** first and graft 01's poster system, 03's warm soot/bone/amber palette and
04's status bar into it. Claude's view: 01 is closest to Martin's references and the "breathtaking" goal,
so run 01 and 02 as two Claude Design projects and compare prototypes before building. 🟡 Martin decides.

## 3. Decisions log

| Date | Decision | Why |
|---|---|---|
| 2026-10-02 | Goal = senior frontend / Nuxt role; English-first (Q1) | See §1 |
| 2026-10-02 | Positioning = frontend engineer, Nuxt specialist, ships fullstack (Q2) | See §1 |
| 2026-10-02 | Single long page (Q3) | Martin's choice; depth moves into the page |
| 2026-10-02 | Process = tech setup → Claude Design briefs → implementation | Martin's instruction |
| 2026-10-02 | This file (`PROJECT.md`) is the source of truth, in English | Same convention as `kondor-taboriste/PROJECT.md`; English because site and repo are English |
| 2026-10-02 | Node 22 stays pinned (`.node-version`) | Matches the machine (22.14); Node 24 LTS is fine later, nothing depends on it |
| 2026-10-02 | Rebuild in place, public repo `navratilmartin/martinnavratil.dev` (Q4) | Domain, wrangler and Node pin already correct; public source is a craft signal |
| 2026-10-02 | Nuxt UI 4 + Inspira UI (Q5) | Official mapping, batteries included, fluency; few `U*` components, look from the design |
| 2026-10-02 | motion-v + GSAP + Lenis (Q6) | Martin wants the becky-web luxe scroll feel; mitigations listed in §4 Q6 |
| 2026-10-02 | One lazy WebGL element max (Q7) | One jaw-dropper, hero stays text-first, mobile stays fast |
| 2026-10-02 | Typed TS data modules in `app/data/` (Q8) | One page, zero runtime, one source for page + CV + OG |
| 2026-10-02 | Static build on Workers static assets, direct e-mail, no form (Q9) | No backend or spam handling; direct e-mail beats forms for hiring |
| 2026-10-02 | `/cv` print route + PDF generated at build (Q10) | Never drifts from the page; recruiters get a file |
| 2026-10-02 | `@nuxtjs/seo` + zero-runtime OG images + Cloudflare Web Analytics (Q11) | Link previews must look alive; cookieless stats without a banner |
| 2026-10-02 | Quality bar = becky-web grade (Q12) | The site is the work sample; heavy motion needs the a11y/perf guard rails |
| 2026-10-02 | GitHub Actions for checks + deploy (Q13) | One pipeline; deploy only when checks pass; runners have Chrome for the PDF |
| 2026-10-02 | English + Czech via `@nuxtjs/i18n` (Q14) | Martin wants Czech HR and local readers covered; data model is bilingual from day one |
| 2026-10-02 | Dark-first with a light mode (Q15) | Martin's choice; effects' native habitat; uniqueness must come from type, the hero stack and one signature interaction |

## 4. Open questions — rest of the interview (recommended answers in bold)

Tech first (changes the scaffold), then content, then design.

| # | Question | Options → recommendation |
|---|---|---|
| Q4 | Where the project lives, repo visibility | ✅ **Rebuild in place in `martinnavratil.dev/`, `git init`, public repo `navratilmartin/martinnavratil.dev`** — keeps domain + wrangler + Node pin; public source is a craft signal and allows a "how this site is built" link. The 4 placeholder app files get replaced. |
| Q5 | UI foundation next to Inspira UI | ✅ **Nuxt UI 4 + Inspira UI** — official Nuxt UI token mapping, colour mode, icons, CommandPalette, accessible Modal/Slideover/Tooltip; Martin is fluent. Rules: use only a handful of `U*` components, the look comes from the design tokens; keep the two token systems aligned in one CSS file; verify the `text-muted` ambiguity early. |
| Q6 | Motion stack | ✅ **motion-v + GSAP 3.15 (ScrollTrigger, SplitText, CustomEase) + Lenis** — the becky-web stack, Martin's choice over the lighter recommendation (motion-v + GSAP-when-needed, native scroll). Obligations: Lenis drives ScrollTrigger (`lenis.on('scroll', ScrollTrigger.update)` + `gsap.ticker`), Lenis and GSAP pins are disabled under `prefers-reduced-motion` and the on-page motion switch, native scroll stays on touch (`syncTouch: false`), anchor links and the ⌘K modal must still scroll, `<MotionConfig reducedMotion="user">` wraps the app for the Inspira components. |
| Q7 | WebGL / shader budget | ✅ **At most one WebGL/shader element** (ogl-based, no three.js unless tree-shaken), loaded after first paint inside `<ClientOnly>` + `defineAsyncComponent`, static/CSS fallback, paused when off-screen (IntersectionObserver), skipped under reduced motion and on WebGL-less browsers. Which element: decided in the design phase. |
| Q8 | Content and data | ✅ **Typed TS data modules** — `app/data/profile.ts`, `experience.ts`, `projects.ts`, `links.ts`, each `satisfies` a type in `shared/types/`. Zero runtime, full type checking, reused by the `/cv` route and the OG template. Long text as arrays of paragraphs, no Markdown engine. |
| Q9 | Rendering, hosting, contact | ✅ **Static `nuxt generate` → Cloudflare Workers static assets (as today). Contact = `mailto:` + "copy e-mail" button + LinkedIn + GitHub, no form.** Any live widget later comes from a separate scheduled Worker publishing JSON; the site stays static. |
| Q10 | CV delivery | ✅ **`/cv` print-styled route from the same `app/data` modules + `public/martin-navratil-cv.pdf` generated at build** by a Playwright script (`pnpm cv:pdf`, headless Chromium). One source of truth; `/cv` is also a shareable web CV. Exception to "single page": `/cv` is the only second route. |
| Q11 | SEO, OG, analytics | ✅ **`@nuxtjs/seo`** (robots, sitemap, schema.org Person, link checker, site config) with **`nuxt-og-image` in zero-runtime mode** and a custom OG template fed by `app/data`; **Cloudflare Web Analytics** (free, cookieless, no consent banner, real-user CWV). |
| Q12 | Quality bar | ✅ **becky-web grade.** WCAG 2.2 AA floor; `prefers-reduced-motion` honoured + a visible on-page motion switch; Lighthouse mobile ≥ 95 in all four categories; LCP ≤ 1.2 s, INP ≤ 200 ms, CLS ≤ 0.1; nothing over 50 KB gz in the first viewport. Enforced by `typecheck` + `lint` + `nuxt-link-checker` on every build, Playwright + axe across desktop and mobile viewports, and a screenshot script for visual QA. |
| Q13 | CI/CD | ✅ **GitHub Actions does checks and deploy.** Every push/PR: `typecheck`, `lint`, `generate`, Playwright + axe, link check. On `main`, if green: `cv:pdf` (Chrome preinstalled on runners) then `wrangler deploy`. Secrets: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID` in the repo. PR preview URLs via `wrangler versions upload` later if wanted. |
| Q14 | Language | ✅ **English + Czech via `@nuxtjs/i18n`** — Martin's choice over English-only. Consequences: strategy `prefix_except_default` (`/` = en, `/cs` = cs), both trees prerendered; data modules carry localised fields (`{ en, cs }`) so one object feeds both languages; `hreflang` + per-locale sitemap via the `@nuxtjs/seo` ↔ i18n integration; OG image per locale; `/cv` and `/cs/cv` → two PDFs; language switch in the header and as a ⌘K action; `<html lang>` follows the locale. |
| Q15 | Theme | ✅ **Dark-first with a light mode** — Martin's choice over the light-first recommendation. Inspira effects work in their native habitat; the risk is looking like the 2026 default, so the design briefs must push uniqueness through typography, the hero stack and one signature interaction rather than glow. Light mode is a first-class citizen (both palettes pass contrast, both get QA), default follows `prefers-color-scheme`? → no: **dark is the default**, system preference and toggle switch to light. |
| Q16 | Which projects lead, what is public | ✅ **Q16a: featured = Nambi, Tábořiště Kondor + SkautSim, Becky Kay Livingstonová** (Nuxt Interview Prep stays secondary, Martin's choice). ✅ **Q16b: Nambi in full** — name, screenshots/mockups, architecture, link to nambi.cz. ✅ **Q16c: the interview-prep app stays as a secondary project, reframed as "Nuxt Study"** (no interview framing in any copy). ✅ **Q16d (from the CV, 2026-10-02):** Develit (Full Stack Engineer, Aug 2022 – Sep 2026, remote), Sensorico (Frontend Developer, Dec 2020 – Aug 2022, Brno), Spatial Hub (Frontend Developer, Jul 2018 – Dec 2020, Brno); Mendel University BSc Software Engineering (thesis = SkautSim); scout group leader (100+ members). Live: beckykaylivingston.cz, taboriste.fenixb.cz, skautsim.fenixb.cz. Accountant site URL still ❓. |
| Q17 | Personal details on the page | ✅ **Photo yes** — AI-generated placeholder (`public/images/portrait-placeholder.webp`) until the real portrait arrives. **Location: "Based in Czechia · remote only"** (remote-only is Martin's requirement). **E-mail `hello@martinnavratil.dev`** via Cloudflare Email Routing → `martin.navratil00@gmail.com` (**not set up yet**: the API route needs the stored Cloudflare token, which the agent sandbox refused to use; three dashboard steps are listed in §8). **LinkedIn** linked. **No availability line**; the headline says *Senior* frontend engineer. Phone stays off the web. |

## 5. Research digest (2 Oct 2026)

Two research passes were run: portfolio design / hiring expectations, and Inspira UI in depth. Only
what affects decisions is kept here; URLs are the sources.

### 5.1 What recruiters and hiring engineers want (ranked)

1. **Identity and stack above the fold** — "what you build, for whom" visible without scrolling
   (https://slategit.com/blog/what-50-rejected-developer-portfolios-had-in-common).
2. **Working live links** — reviewers cannot credit work they cannot run; a broken demo is worse than
   none (https://devplaybook.cc/blog/developer-portfolio-checklist-20-things-hiring-managers).
3. **2–5 curated projects with decisions, not feature lists** — "what did you own, what was hard, why does
   it matter" (https://www.greatfrontend.com/blog/frontend-developer-portfolio;
   https://www.joshwcomeau.com/effective-portfolio/).
4. **Speed and no gating** — reviewers spend 30–60 s; full-screen intros cost every second before the
   first project (https://scrimba.com/articles/web-developer-portfolio-mistakes/amp/).
5. **Direct contact and a CV download** — direct e-mail beats forms.
6. **Evidence of iteration and real users** — commit history, business problems over tool lists
   (https://news.ycombinator.com/item?id=43134745).
7. **Senior signals** — honest trade-offs, a11y/perf/testing practice, measured results.

**Anti-patterns:** preloaders / enter screens, scroll hijacking, heavy 3D on mobile, ignoring
`prefers-reduced-motion`, broken links, stale copyright, placeholder text, tutorial clones as own work,
8–12 small projects instead of 3–4 strong ones, stack badges without projects behind them.

### 5.2 Reference portfolios that matter for this site

| Site | Signature element | Why it matters here |
|---|---|---|
| https://rauno.me | Manifesto + "Craft" gallery of single micro-interactions | The engineer-respected model: text-first, one crafted interaction |
| https://brittanychiang.com | Sticky intro + spotlight-hover cards, single page | The single-page structure done right (About → Experience → Projects) |
| https://emilkowal.ski, https://paco.me | Ultra-minimal, projects = shipped things | Proof over decoration |
| https://antfu.me, https://hugorcd.com | Nuxt/Vue people's own sites | Hugo's dense "design engineer" column (Contact → Experience → Projects → Writing) is close to Ref A |
| https://www.awwwards.com/sites/nev-flynn | Drag-to-rearrange bento of live widgets | The one maximal idea that still respects the reader |
| https://bruno-simon.com, https://dennissnellenberg.com | 3D world / magnetic cursor luxe | What *not* to copy for a CV link; expensive and copied everywhere |

Takeaway: "Rauno/Brittany structure + one Nev-Flynn-grade signature" is the CV-link sweet spot.
`godly.website` is gone (redirects), `cassie.codes` is retired.

### 5.3 Trends — use / avoid

- **Use:** one crafted signature interaction; kinetic *variable-font* type (readable without animation);
  CSS scroll-driven animations (`animation-timeline`, Chrome/Edge/Safari 26, Firefox behind a flag) with
  GSAP ScrollTrigger as fallback (GSAP is fully free since Webflow bought it,
  https://webflow.com/blog/gsap-becomes-free); pointer-only cursor effects gated on `(hover: hover)`;
  ⌘K palette (Nuxt UI 4 `CommandPalette`); View Transitions for theme toggle (Nuxt
  `experimental.viewTransition`, respects reduced motion); OG images (a CV link without one looks dead
  in LinkedIn/Slack).
- **Avoid:** Spline (269 KB runtime + 3–5 MB scenes), full three.js above the fold (185 KB gz), glass
  blur on scrolling layers, bento for its own sake (the 2026 default look), pinning/scroll hijack.

### 5.4 Inspira UI — facts that change how we use it

- **What it is:** copy-paste Vue/Nuxt port of Aceternity UI + Magic UI effects, MIT, 155 components in
  12 categories (docs index wrongly says 115), built on Tailwind v4 + motion-v
  (https://github.com/unovue/inspira-ui, https://inspira-ui.com).
- **No versions:** no releases, tags or npm package; `main` is rolling, essentially one maintainer with
  bursty activity. Pin by copying files into the repo (which the registry does anyway).
- **Install path:** shadcn-vue CLI registry — `npx shadcn-vue@latest add "https://registry.inspira-ui.com/<id>.json"`;
  needs a `components.json`; registry ids differ from slugs for some (e.g. `bg-silk`, `bg-neural`),
  copy the command from the component page. Deps: `@vueuse/core motion-v tw-animate-css @inspira-ui/plugins`
  (`cn()` comes from `@inspira-ui/plugins`, not shadcn). motion-v on Nuxt: `modules: ['motion-v/nuxt']`.
- **Nuxt UI 4 coexistence is official:** the install page has a "Nuxt UI" CSS tab mapping shadcn tokens
  to `--ui-*` vars; the Inspira docs site itself runs Nuxt 4 + Nuxt UI 4.5. Do **not** add Inspira's
  `html.dark` block or a second `@custom-variant dark` (Nuxt UI provides `.dark` via color-mode).
  Watch-out: the mapping makes `text-muted` ambiguous (Inspira: a background colour; Nuxt UI: text
  colour) — check in the app.
- **Nuxt auto-import gotcha:** components land in `components/ui/<name>/`; set
  `components: [{ path: '~/components', pathPrefix: false, ignore: ['**/index.ts','**/shaders.ts','**/types.ts'] }]`
  or demos' bare names (`<AuroraBackground>`) will not resolve.
- **SSR:** the docs wrap every demo in `<Suspense><ClientOnly>`; WebGL/canvas components assume WebGL
  exists. Wrap them in `<ClientOnly>` with a static fallback and lazy-import.
- **Reduced motion is essentially unhandled** (3 of 155 components check it). Mitigation: app-level
  `<MotionConfig reducedMotion="user">` for the ~60 motion-v components, plus our own gate
  (`usePreferredReducedMotion()`) for every canvas/WebGL loop.
- **A11y gaps:** Dock (no keyboard), tabs (no roles), Marquee (no pause), span-splitting text effects
  fragment screen readers (add `aria-label` / sr-only copy), decorative canvases need `aria-hidden`.
- **Most striking and least common (candidates):** Variable Text / Breathing Text / Variable Letter
  Text (variable-font axes), Text Hover Effect (x.ai-style outline), Fey Cards, Floating Card, Parallax
  Float, Path Marquee, Scroll Island, Design Testimonials, Particle Image, Liquid Logo, the Shader Toy
  backgrounds (Silk, Ribbon, Neural), HTML-in-Canvas family (experimental browser API, check support).
- **Ubiquitous (use sparingly or not at all):** Shimmer Button, Bento Grid, Dock, Marquee, Meteors,
  Border Beam, Animated Beam, Flip Words, Text Generate, Number Ticker, cobe Globe, Aurora, Lamp.
- **Alternatives:** Vue Bits (MIT + Commons Clause, heavy overlap with Inspira, nothing gained by
  mixing); motion-v and GSAP for bespoke choreography — the surest route to something not seen elsewhere.

### 5.5 Nuxt ecosystem notes (as of 2 Oct 2026)

- Nuxt `latest` 4.5.2 (Vite 8); Nuxt 5 estimated Q4 2026 (Nitro v3), Nuxt 4 EOL six months after —
  build on 4.5 now, 5 should be a minor migration (https://nuxt.com/docs/4.x/community/roadmap).
- Vue 3.5.43 stable, 3.6 (Vapor) in RC — do not gate on it.
- `@nuxt/image` on `nuxt generate` auto-selects `ipxStatic` and writes `/_ipx/...` files at build
  (https://image.nuxt.com/advanced/static-images). If the site ever goes SSR on Workers, use the
  `cloudflare` provider.
- `@nuxt/fonts` self-hosts fonts at build with metric fallbacks (https://fonts.nuxt.com/).
- `nuxt-og-image` with `zeroRuntime: true` prerenders every OG image, no runtime cost
  (https://nuxtseo.com/docs/og-image/guides/zero-runtime); `@nuxtjs/seo` bundles robots, sitemap,
  link-checker, og-image, schema.org, site-config.
- Nuxt Content 3.16 would ship a SQLite WASM dump to the browser for client queries — unnecessary for one
  page (reason behind Q8's recommendation).
- Cloudflare: assets-only Worker is already how the placeholder deploys; Workers is the recommended
  Nitro preset if SSR is ever needed (https://nitro.build/deploy/providers/cloudflare).
- motion-v 2.5.1 = official "Motion for Vue" (scroll, layout, gestures, `AnimatePresence`,
  `LazyMotion`); GSAP 3.15 free incl. ScrollTrigger/SplitText.

### 5.6 Performance and accessibility bar (proposed, see Q12)

- Lighthouse mobile ≥ 95 in all four categories; field CWV LCP ≤ 2.5 s (aim ≤ 1.2 s on static Workers),
  INP ≤ 200 ms, CLS ≤ 0.1 (https://web.dev/articles/vitals).
- Library weights (gzipped): gsap core 27 KB, motion-v 67 KB full (tree-shake / `LazyMotion`), cobe 6 KB,
  three 185 KB, Spline runtime 270 KB + scene. Rule: nothing over 50 KB in the first viewport; heavy
  things load via `<ClientOnly>` + `defineAsyncComponent` + IntersectionObserver.
- Reduced motion: reduce, do not remove (https://web.dev/articles/prefers-reduced-motion); a single
  `useReducedMotion()` composable that disables canvas loops, pins and 3D; plus an on-page switch.
- WCAG 2.2 additions that bite here: 2.5.7 Dragging Movements (any drag UI needs a non-drag
  alternative), 2.5.8 Target Size 24 px, 2.4.11 Focus Not Obscured; custom cursors must not remove the
  native one; ⌘K needs a visible button; skip link; `:focus-visible` rings that survive the theme.

### 5.7 "Wow" shortlist (ranked by memorability ÷ cost; pick 1–2 for the design briefs)

1. **Inspect mode** — a toggle that annotates the live page with its own component names, bundle cost
   and "why" notes. Proves craft on the site itself. Cost M.
2. **Interactive project stack in the hero** (Ref B lineage) — tilt/drag/scatter-on-scroll, persisted
   order, keyboard alternative. Cost M.
3. **Proof panel** — this site's live CWV / Lighthouse / bundle size from a scheduled Worker → KV.
   Senior signal almost nobody shows. Cost S–M.
4. **⌘K as navigation with actions** (copy e-mail, download CV, theme, jump to project). Cost S.
5. **CSS scroll-driven career timeline** — zero JS, no pinning; static list under reduced motion. Cost M.
6. **View-transition theme reveal** from the toggle, initial theme from local sunset. Cost S.
7. **Cursor-reactive variable-font name** (Inspira Variable Text), name stays plain text. Cost M.
8. **Live "now" strip** (last commit, listening, local time, available-from) from a Worker. Cost M.
9. **ASCII / dither-rendered 3D object** (Inspira Dither Shader or three `AsciiEffect`), text-weight
   "3D". Cost M/L.
10. **Metrics scrubber** for project panels (before/after numbers and screenshots). Cost M.

## 6. Content inventory — projects on disk (candidates, ❓ selection pending Q16)

| Project | What it is | Stack | Status / link | Public source? |
|---|---|---|---|---|
| **Nuxt Study** (repo: nuxt-interview-prep; reframed, Q16c) | Study app for Vue/Nuxt/web platform: 177 pages, 749 questions, spaced repetition synced across devices, mock interviews, flashcards, notes | Nuxt 4, Nuxt Content 3, Nuxt UI 4, D1, nuxt-auth-utils, CodeMirror, custom Nuxt module, Cloudflare Workers | **Live:** https://prep.martinnavratil.dev | ❓ not on GitHub list |
| **Nambi** (`selectd`) | Influencer × company collaboration platform: API (Nitro, tRPC, Hono, better-auth, D1), admin web, company web, landing (nambi.cz), Capacitor mobile | Nuxt 4 monorepo, Turborepo, pnpm, Vitest, Playwright, Tailwind v4 | in development | private repo — ❓ what may be shown |
| **Tábořiště Kondor** | Fundraising / promo site for a scout campsite, links to SkautSim | Nuxt, PrimeVue, TresJS/three, Tailwind v4, @nuxt/fonts/image/icon, Cloudflare | design proof | ❓ |
| **SkautSim** | VR scout camp simulation with multiplayer (EasyRTC), school project with two co-authors | Vite, three.js, Docker | ❓ | ❓ |
| **Becky Kay Livingstonová** | Therapist site with a hard accessibility requirement, Claude Design workflow, axe + Playwright checks, Cloudflare Email Routing contact | Astro 7, Tailwind v4, GSAP, Lenis | beckykaylivingston.cz | ❓ |
| **Accountant web** | Accounting services site (Martina Navrátilová, Blansko), contact via Resend | Nuxt, UnoCSS, FormKit, @nuxt/image, sitemap | ❓ live? | public `accountant-web` |
| **Skautské hlasování** | Real-time emoji voting for scout meetings, works on a LAN | Vue 3, Vite, socket.io, Tailwind | — | ❓ |
| **RoboPilot** | Robot-arm control with camera/audio streaming | Python, FastAPI, WebRTC, ur-rtde | — | ❓ |
| yasi-web / yasi-product-web | Personal gift site (confetti) | Nuxt, NuxtHub | — | public `yasi-web` |
| detsky-oddil-IS, mysterious-island, SkinMate | Older / school work | — | — | public |

Not on disk: employer / contract work for the experience table (❓ Q16).

## 7. Infrastructure and stack (as scaffolded on 2026-10-02)

| Layer | Choice | Version | Notes |
|---|---|---|---|
| Framework | Nuxt | 4.5.2 | Vue 3.5.43, Vite 8; Nuxt 5 expected Q4 2026 (§5.5) |
| UI base | Nuxt UI | 4.11.3 | colour mode (`.dark` class, dark default), icons (`@nuxt/icon`, bundled `lucide` + `simple-icons`), Reka primitives |
| Effects | Inspira UI | rolling `main` | vendored via the shadcn-vue registry (`pnpm ui:add <registry url>`), `@inspira-ui/plugins` 0.0.2 for `cn()`, `tw-animate-css` 1.4 |
| Styling | Tailwind CSS | 4.3.3 | one CSS entry `app/assets/css/main.css` with the official Inspira ↔ Nuxt UI token mapping |
| Motion | motion-v + GSAP + Lenis | 2.5.1 / 3.15.0 / 1.3.26 | `MotionConfig` keyed to the motion switch; Lenis drives ScrollTrigger (`plugins/lenis.client.ts`) |
| i18n | `@nuxtjs/i18n` | 10.6.0 | `prefix_except_default`, `/` en + `/cs` cs, no browser-language redirect, `<html lang>` = `en-US` / `cs-CZ` |
| SEO | `@nuxtjs/seo` | 5.3.16 | robots, per-locale sitemaps (`/sitemap_index.xml`, `public/_redirects` sends `/sitemap.xml` there), schema.org Person, link checker, `nuxt-og-image` 6.10 zero-runtime with the **Takumi** renderer (`@takumi-rs/core` 2.14), 1200×630 |
| Images / fonts | `@nuxt/image` 2.1, `@nuxt/fonts` 0.14 | | `ipxStatic` on generate; fonts self-hosted at build (Inter placeholder) |
| Utilities | VueUse | 15.0 | `useClipboard`, `usePreferredReducedMotion`, … |
| Quality | `@nuxt/eslint` 1.17 (stylistic), vue-tsc 3.3, TypeScript 6.0, Playwright 1.63 + `@axe-core/playwright` 4.13 | | `app/components/ui/**` excluded from lint (vendored) |
| Build / hosting | `nuxt generate` → `.output/public` → Cloudflare Workers static assets | wrangler 4.146 | custom domains `martinnavratil.dev` + `www`; `_headers` immutable cache for `/_nuxt/*` |
| CI | GitHub Actions `.github/workflows/ci.yml` | | typecheck → lint → generate → `cv:pdf` → Playwright; deploy job on `main` with `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID` |
| Toolchain | Node 22.14 (`.node-version`), pnpm 10.4.1 (`packageManager`), `pnpm.onlyBuiltDependencies: esbuild, workerd` | | gh logged in as `navratilmartin` |

**Commands:** see `README.md` (`dev`, `generate`, `cv:pdf`, `preview:cf`, `test:e2e`, `typecheck`, `lint`,
`check`, `deploy`, `ui:add`).

**File map:** `app/data/*.ts` content (typed by `shared/types/content.ts`, every string `{ en, cs }`) ·
`i18n/locales/*.json` UI strings · `app/pages/index.vue` the page, `app/pages/cv.vue` the CV ·
`app/components/` sections, `app/components/ui/` vendored Inspira, `app/components/OgImage/Default.takumi.vue`
the OG template · `app/composables/useMotionPreference.ts` + `app/plugins/motion.client.ts` the motion switch ·
`app/plugins/lenis.client.ts` smooth scroll · `scripts/cv-pdf.ts` PDF export · `tests/e2e/` axe + smoke.

### 7.1 Verified on 2026-10-02

- `pnpm typecheck`, `pnpm lint` clean; `pnpm generate` prerenders 22 routes with 0 link-checker errors;
  `pnpm cv:pdf` writes `martin-navratil-cv.pdf` (141 kB) and `martin-navratil-cv-cs.pdf` (167 kB);
  `pnpm test:e2e` 18/18 (axe WCAG 2.2 AA + best-practice on `/`, `/cs`, `/cv`, `/cs/cv`, desktop + Pixel 7;
  smoke: hero, sections, language switch, dark→light toggle, motion switch persisted, CV links).
- Inspira registry CLI works from the repo (`blur-reveal` added, used in the hero). The CLI also adds
  `@lucide/vue`; removed, icons come from `@nuxt/icon`.
- OG image renders (dark card, name, headline) — see `.output/public/_og/s/*.png` after a build.

### 7.2 Baseline numbers and known debts (to fix during implementation)

| Metric | Now | Target (Q12) |
|---|---|---|
| Client JS, all chunks, gzipped | ~277 kB (largest chunk 134 kB: Nuxt UI/Reka + GSAP + Lenis + motion-v) | nothing over 50 kB in the first viewport |
| CSS gzipped | 29 kB | — |
| HTML of `/` | 46 kB | — |

- **Debt 1 — eager motion libraries:** `lenis.client.ts` imports GSAP + ScrollTrigger + Lenis on first load.
  Load them after first paint (`requestIdleCallback` / dynamic import) and use `LazyMotion` for motion-v.
- **Debt 2 — Nuxt UI weight:** only a handful of `U*` components are used; measure after the design and
  drop Nuxt UI pieces that the design does not need.
- **Debt 3 — `text-dimmed`:** Nuxt UI's dimmed token is 3.4:1 on dark; never use it for text. Design tokens
  must pass 4.5:1 in both themes (axe enforces it in CI).
- **Debt 4 — inline links** inside running text need an underline (axe `link-in-text-block`).
- **Debt 5 — vendored patch:** `BlurReveal.vue` was patched for motion-v 2.5 typings (`easing` → `ease`);
  expect similar small patches when vendoring other Inspira components.
- **Debt 6 — i18n and the single page:** `localePath({ path: '/', hash })` works; a mobile nav does not exist
  yet (header links hidden below `sm`).
- `_og-static-fonts/` (Inter ttf/woff for the OG renderer) is shipped in `.output/public`; harmless, could
  be excluded.

## 8. Needs Martin (❓)

1. Set up the e-mail alias in the Cloudflare dashboard (zone `martinnavratil.dev` → Email → Email Routing):
   **Get started / Enable** (adds the MX + SPF records), **Destination addresses → add
   `martin.navratil00@gmail.com`** and click the verification link Cloudflare sends, then **Routing rules →
   custom address `hello` → forward to that destination**. Until then `hello@martinnavratil.dev` bounces.
2. The real portrait (replace `public/images/portrait-placeholder.webp`, keep the path), the accountant
   site's live URL, Develit / Spatial Hub URLs, years for the degree and the scout leadership.
3. GitHub repository secrets for the deploy job: `CLOUDFLARE_API_TOKEN` (Workers Scripts: Edit) and
   `CLOUDFLARE_ACCOUNT_ID`. Until then, `pnpm deploy` from the machine works as before.
4. Git identity: the global `user.name` is "Martin Navráti." (typo); the repo uses a local
   `user.name = Martin Navrátil` so public commits show the full name.

## 9. Log

- 2026-10-02 — Interview started (Q1–Q3 decided). Two research passes completed (§5). Martin shared two
  hero references (§2) and set the process order (§0). This file created.
- 2026-10-02 — Four design briefs written, critiqued and ranked (§2.1, `design-prompts/`).
- 2026-10-02 — Q16–Q17 answered from the CV and Martin's notes; content, photo placeholder and Email
  Routing applied (see Q16/Q17 rows and §8).
- 2026-10-02 — Q4–Q15 decided (§4). Repo initialised on `main` with the deployed placeholder as the
  first commit. Stack scaffolded (§7), verified end to end (§7.1), baseline recorded (§7.2).
  Next: design briefs for Claude Design (§0 step 2), after Q16–Q17.
