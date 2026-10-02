import type { Profile } from '#shared/types/content'

export const profile: Profile = {
  name: 'Martin Navrátil',
  headline: {
    en: 'Frontend engineer. Nuxt specialist who ships fullstack.',
    cs: 'Frontend engineer. Specialista na Nuxt, který dotáhne i backend.',
  },
  intro: {
    en: 'I build fast, accessible web apps with Nuxt and Vue, and I take them all the way to production on Cloudflare.',
    cs: 'Stavím rychlé a přístupné webové aplikace v Nuxtu a Vue a dotahuju je až do produkce na Cloudflare.',
  },
  // TODO(Martin, Q17): the location to show publicly (Blansko / Brno / Czech Republic only).
  location: {
    en: 'Czech Republic',
    cs: 'Česká republika',
  },
  // TODO(Martin, Q17): the public address. `hello@martinnavratil.dev` can be a free Cloudflare Email
  // Routing alias forwarding to a private mailbox, so the private address never appears in the source.
  email: 'hello@martinnavratil.dev',
}
