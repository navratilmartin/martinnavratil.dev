# martinnavratil.dev

Personal portfolio of Martin Navrátil. Nuxt 4 + Nuxt UI 4 + Inspira UI, English and Czech, generated
as static files and served by an assets-only Cloudflare Worker at **https://martinnavratil.dev**.

Every decision, the research behind it, the status and the open questions live in
**[PROJECT.md](./PROJECT.md)** — read that first.

## Commands

```bash
pnpm install          # also runs `nuxt prepare`
pnpm dev              # http://localhost:3000 (English) and /cs (Czech)
pnpm generate         # static build into .output/public
pnpm cv:pdf           # renders /cv and /cs/cv of the generated site to PDF (needs Chrome or `pnpm exec playwright install chromium`)
pnpm preview:cf       # serves the generated site like production (wrangler, http://localhost:8789)
pnpm test:e2e         # Playwright: axe (WCAG 2.2 AA) + smoke, desktop and mobile, against preview:cf
pnpm typecheck && pnpm lint
pnpm check            # everything above in order
pnpm deploy           # generate + cv:pdf + wrangler deploy (CI does this on main)
```

## Where things are

| Path | What |
|---|---|
| `app/data/*.ts` | All content (profile, experience, projects, links), typed by `shared/types/content.ts`; every string is `{ en, cs }` |
| `i18n/locales/*.json` | UI strings per language |
| `app/pages/index.vue` | The single page; `app/pages/cv.vue` is the print-styled CV |
| `app/components/` | Site sections; `app/components/ui/` is where Inspira UI components land |
| `app/components/OgImage/` | Open Graph image template, rendered at build time |
| `app/composables/useMotionPreference.ts` | The on-page motion switch every animation respects |
| `app/plugins/lenis.client.ts` | Lenis smooth scroll driving GSAP ScrollTrigger; off under reduced motion |
| `app/assets/css/main.css` | Tailwind v4, Nuxt UI, the Inspira ↔ Nuxt UI token mapping, motion rules |
| `scripts/cv-pdf.ts` | PDF export of the CV routes |
| `tests/e2e/` | Playwright + axe |
| `.github/workflows/ci.yml` | Typecheck, lint, build, PDF, tests on every push; deploy on `main` |

## Adding an Inspira UI component

```bash
pnpm ui:add "https://registry.inspira-ui.com/<component-id>.json"
```

Copy the exact command from the component's page on https://inspira-ui.com (ids differ from slugs
for some components). Files land in `app/components/ui/<name>/` and are used by their bare name,
e.g. `<TextHoverEffect>`. They are vendored as upstream ships them (ESLint ignores that folder), so
updating one is a plain re-add. WebGL/canvas components go inside `<ClientOnly>` with a static
fallback and load after first paint. If the CLI adds `@lucide/vue` to `package.json`, remove it:
icons come from `@nuxt/icon`.

## Hosting

`wrangler.jsonc` describes an assets-only Worker: Cloudflare serves `.output/public` and binds the
custom domains `martinnavratil.dev` and `www.martinnavratil.dev`. `public/_headers` gives the hashed
`/_nuxt/*` files a one-year immutable cache. CI deploys from `main` with `CLOUDFLARE_API_TOKEN` and
`CLOUDFLARE_ACCOUNT_ID` repository secrets.
