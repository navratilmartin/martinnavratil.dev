# Design briefs — comparison and how to run them

Four revised briefs for Claude Design, all bound by the hard constraints in PROJECT.md. Scores: recruiter / a11y+perf / design director out of 10, blocking issues in brackets.

## 1. Comparison

| Variant | Signature | WebGL | Inspira | Scores (blocking) | Risk | Effort |
|---|---|---|---|---|---|---|
| 01 Hybrid hero | Fanned poster deck: tilt, drag, reorder, deals into a row on scroll, order persisted | none | Variable Text; Safari + iPhone Mockup (static) | 7 / 6 / 6 (3 / 7 / 8) | Deck FLIP + keyboard model; most a11y blockers | L |
| 02 Quiet signature | Inspect mode: overlay naming the page's own components with real gzipped costs and "why" notes, keyboard-walkable | none | none at runtime | 7 / 7 / 7 (5 / 6 / 7) | Can read plain; build step for `inspect.json`; grey + blue near the generic dark look | M |
| 03 Maximal dark | One breath: name, silk, live dots and portrait frame share a 6 s `--breath` clock | Silk behind hero, desktop pointer only | Silk, Breathing Text, Variable Letter Text, Text Hover Effect, Floating Card, Fey Cards, Scroll Island, Design Testimonials (rebuilt) | 6 / 6 / 6 (5 / 5 / 6) | Eight rebuilt effects, shader pixel tests, lowest scores | L |
| 04 Bento proof | Self-measuring hero: Lighthouse, CWV, bundle size and last commit as tiles; same-size tiles swap, order remembered | Silk behind Contact, lazy | Scroll Island, Variable Text, Safari + iPhone Mockup, Silk, Blur Reveal | 7 / 6 / 6 (5 / 5 / 4) | CI + Worker pipeline before the hero is truthful; bento = 2026 default | L |

## 2. Ranking and recommendation

1. **02 Quiet signature — send first.** Highest, most even scores, zero WebGL and zero Inspira runtime, so nothing can break the budget or catalog rule, and its signature is item 1 of PROJECT.md §5.7. Cheapest to build; a hiring engineer reads it as craft, not effects.
2. **01 Hybrid hero.** The deck is the most memorable idea and truest to the hero references, but deal-out, persisted order and the keyboard model make the hardest build with the most a11y blockers. The alternative if Martin wants spectacle.
3. **04 Bento proof.** The proof panel is a senior signal nobody shows, but the first screen depends on CI and a Worker, and the grid is the look the project avoids.
4. **03 Maximal dark.** Lowest on every lens; eight rebuilt effects, a shader with luma tests and the longest brief make it the riskiest to design consistently and to ship under budget.

**Grafts into 02**, one per runner-up:

- From 01 → **Project posters**: the poster system (two-tone product field, 4 % grain, bleeding first-word monogram, device mockup anchored bottom, mono caption with stated ratio); 02's flat posters are its weakest visual.
- From 03 → **Palette**: warm soot/bone neutrals with one amber accent (dark `#0C0B0A` / `#F1ECE3` / `#F5B82E`; light `#F4F0E8` / `#161412` / ochre `#7A4F00`, ratios already computed); it moves 02 off the grey-and-blue template without adding an effect.
- From 04 → **The signature**, status bar: show this page's Lighthouse scores, CWV and first-view bundle size from the deploying CI run, linked. Inspect then explains the build and proves it.

## 3. How to run it in Claude Design

1. New Claude Design project, named after the variant.
2. Attach `public/images/portrait-placeholder.webp` (real photo later) and the two hero references: `1.jpg` (rachelchen.tech: serif identity sentence, italic twist word, experience table) and `2.jpg` (sandwich hero: big name / fanned work images / big role line).
3. Paste the whole brief as the first message, plus: "Build the animations into the prototype, do not only describe them."
4. Ask for exactly the frames in its **Deliverables** section, in order; request missing ones singly.
5. Fix contrast and Czech overflow inside Claude Design first; cheaper there.
6. Import as in becky-web: `/design-login`, then `/design-sync` on the project; the prototype lands in `design/` (`<name>.dc.html` + `support.js`) as visual source of truth. Extract tokens into `app/assets/css/main.css`; log deviations in PROJECT.md.

### Review checklist

1. **Contrast, both themes** — recompute body, muted and small text on bg / surface / raised ≥ 4.5:1; control borders ≥ 3:1; no `dimmed`.
2. **Reduced motion** — every Motion-table row has a reduced variant; no parallax, pinning or fixed overlays; switch in footer and mobile menu.
3. **One WebGL at most** — after first paint, static fallback, never in the mobile first viewport (02: none; check no canvas crept in).
4. **Hero name is real text** — `<h1>` at opacity 1, never image, canvas or SVG.
5. **Mobile nav** — 390 px frames closed and open, 44 px targets, focus trap, Esc closes.
6. **Panel states** — Nambi open (desktop + mobile), no-detail variant without empty labels, focus returns on close, one at a time.
7. **/cv** — screen and A4 frames, two pages maximum, black on white, URLs printed.
8. **Posters** — one system for every featured project, product colours, device mockup, no invented screenshots, alt stated.
9. **Czech fit** — "Senior frontend engineer. Specialista na Nuxt, který dotáhne i backend.", "Stáhnout životopis (PDF)", "Životopis jako webová stránka" and the four nav labels fit every frame.
10. **Inspira catalog** — only components the brief names; none of Shimmer Button, Bento Grid, Dock, Marquee, Meteors, Border Beam, Flip Words, Text Generate, Globe, Aurora, Lamp; no glow or glass.
