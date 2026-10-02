# martinnavratil.dev

Placeholder for a personal portfolio, and the crossroad to other projects.
Deployed as static files to Cloudflare Workers at **https://martinnavratil.dev** (and `www`).

```bash
pnpm install
pnpm dev          # local dev server
pnpm deploy       # nuxt generate + wrangler deploy
```

## Editing

Everything on the page is data in `app/app.config.ts`:

- `profile` — name, tagline and the placeholder note.
- `projects` — one card each. Leave `url` out and the card shows "in progress" instead of a link.
- `links` — buttons in the "Elsewhere" section (GitHub, LinkedIn, …). Empty by default, so the section is hidden.

`app/pages/index.vue` is the only page. Add real portfolio pages next to it whenever you are ready;
the static build prerenders every route it can reach.

## Hosting

`wrangler.jsonc` describes an assets-only Worker: no server code, Cloudflare serves `.output/public`
and binds the custom domains (`martinnavratil.dev`, `www.martinnavratil.dev`), creating the DNS
records and certificates on deploy. `public/_headers` gives the hashed `/_nuxt/*` files a one-year
immutable cache. `.node-version` pins Node 22 for any CI build.

To move to server rendering later (API routes, forms): set `nitro.preset` to `cloudflare_module`
in `nuxt.config.ts`, add `"main": ".output/server/index.mjs"` to `wrangler.jsonc`, and use
`pnpm build` instead of `generate`. Nothing else changes.

Built with Nuxt 4 and Nuxt UI.
