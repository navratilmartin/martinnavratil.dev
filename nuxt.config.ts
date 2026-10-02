// https://nuxt.com/docs/4.x/api/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@nuxt/eslint'],

  devtools: { enabled: true },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    },
  },

  css: ['~/assets/css/main.css'],

  compatibilityDate: '2026-09-01',

  nitro: {
    prerender: {
      // `foo.html` rather than `foo/index.html`, so Cloudflare serves `/foo` without a redirect.
      autoSubfolderIndex: false,
    },
  },

  eslint: { config: { stylistic: true } },

  icon: {
    // Bundle the icon sets locally; nothing is fetched from the Iconify API at runtime.
    serverBundle: { collections: ['lucide', 'simple-icons'] },
    clientBundle: { scan: true },
  },
})
