// Everything on the page is data here. Edit this file, not the components.
export default defineAppConfig({
  profile: {
    name: 'Martin Navrátil',
    tagline: 'Frontend developer. Nuxt, Vue and the tooling around them.',
    // Shown under the tagline while the real portfolio is being built.
    note: 'A proper portfolio is on its way. Until then, this page is the crossroad to what I am building.',
  },

  // One entry per project. `url` is optional: without it the card renders as "in progress".
  projects: [
    {
      name: 'Nuxt Interview Prep',
      description: 'An interactive study app for senior frontend, Nuxt and fullstack interviews: Vue and Nuxt by the docs, JavaScript, TypeScript, CSS and accessibility, security, testing, Nitro, architecture and coding rounds, with a spaced-repetition trainer that syncs across devices, mock interviews and flashcards.',
      url: 'https://prep.martinnavratil.dev',
      icon: 'i-lucide-graduation-cap',
      tags: ['Nuxt 4', 'Nuxt Content', 'Nuxt UI'],
    },
  ] as { name: string, description: string, url?: string, icon?: string, tags?: string[] }[],

  // Add links when you want them public, e.g.
  // { label: 'GitHub', icon: 'i-simple-icons-github', to: 'https://github.com/…' }
  links: [] as { label: string, icon: string, to: string }[],

  ui: {
    colors: { primary: 'emerald', neutral: 'zinc' },
  },
})
