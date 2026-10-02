import type { Profile } from '#shared/types/content'

export const profile: Profile = {
  name: 'Martin Navrátil',
  headline: {
    en: 'Senior frontend engineer. Nuxt specialist who ships fullstack.',
    cs: 'Senior frontend engineer. Specialista na Nuxt, který dotáhne i backend.',
  },
  intro: {
    en: 'I build fast, accessible web apps with Nuxt and Vue, and I take them all the way to production on Cloudflare.',
    cs: 'Stavím rychlé a přístupné webové aplikace v Nuxtu a Vue a dotahuju je až do produkce na Cloudflare.',
  },
  // Remote only, based in Czechia (Q17).
  location: {
    en: 'Based in Czechia · remote only',
    cs: 'Česko · pouze remote',
  },
  // Cloudflare Email Routing alias forwarding to the private mailbox (Q17); the private address never
  // appears in the source.
  email: 'hello@martinnavratil.dev',
  // Placeholder portrait until the real photo arrives (Q17). Replace the file, keep the path.
  photo: '/images/portrait-placeholder.webp',
}
