// https://nuxt.com/docs/4.x/api/nuxt-config
// Decisions behind every block are in PROJECT.md (§4, Q4–Q15).
const siteUrl = 'https://martinnavratil.dev'

export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/fonts',
    '@vueuse/nuxt',
    '@nuxtjs/i18n',
    '@nuxtjs/seo',
    'motion-v/nuxt',
  ],

  // Inspira UI components live in `app/components/ui/<name>/<Name>.vue` and are used by their bare
  // name (`<TextHoverEffect>`), so path prefixes are off; helper files next to them are not components.
  components: [
    {
      path: '~/components',
      pathPrefix: false,
      ignore: ['**/index.ts', '**/shaders.ts', '**/types.ts'],
    },
  ],

  devtools: { enabled: true },

  app: {
    head: {
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    },
  },

  css: ['~/assets/css/main.css'],

  site: {
    url: siteUrl,
    name: 'Martin Navrátil',
    description: 'Frontend engineer and Nuxt specialist who ships fullstack.',
    defaultLocale: 'en',
  },

  // Dark-first (Q15): every visitor starts dark; the toggle switches to light and is remembered.
  colorMode: {
    preference: 'dark',
    fallback: 'dark',
  },

  compatibilityDate: '2026-10-01',

  nitro: {
    prerender: {
      // `foo.html` rather than `foo/index.html`, so Cloudflare serves `/foo` without a redirect.
      autoSubfolderIndex: false,
      crawlLinks: true,
      routes: ['/', '/cs', '/cv', '/cs/cv'],
    },
  },

  eslint: { config: { stylistic: true } },

  // English + Czech (Q14): `/` is English, `/cs` is Czech. No automatic redirect by browser language:
  // a shared link always opens the language it was shared in.
  i18n: {
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    baseUrl: siteUrl,
    locales: [
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
      { code: 'cs', language: 'cs-CZ', name: 'Čeština', file: 'cs.json' },
    ],
    detectBrowserLanguage: false,
  },

  icon: {
    // Bundle the icon sets locally; nothing is fetched from the Iconify API at runtime.
    serverBundle: { collections: ['lucide', 'simple-icons'] },
    clientBundle: { scan: true },
  },

  // The CV PDFs are rendered after `nuxt generate` (scripts/cv-pdf.ts), so the link checker cannot see
  // them during the build; the absolute site URL is intentional in the printable CV.
  linkChecker: {
    excludeLinks: ['/martin-navratil-cv.pdf', '/martin-navratil-cv-cs.pdf', 'https://martinnavratil.dev'],
  },

  // OG images are rendered at build time for every prerendered page; no server runtime (Q11).
  ogImage: {
    zeroRuntime: true,
    defaults: { width: 1200, height: 630 },
  },
})
