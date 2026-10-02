import type { EducationEntry, SkillGroup } from '#shared/types/content'

export const education: EducationEntry[] = [
  {
    school: 'Mendel University',
    location: 'Brno',
    degree: { en: 'Bachelor\'s degree', cs: 'Bakalářský titul' },
    field: { en: 'Software Engineering', cs: 'Softwarové inženýrství' },
    // TODO(Martin): years.
    note: {
      en: 'Web applications, database systems, software architecture, OOP, neural networks, algorithms. Bachelor\'s thesis: a web multiplayer VR game (SkautSim).',
      cs: 'Webové aplikace, databázové systémy, softwarová architektura, OOP, neuronové sítě, algoritmy. Bakalářská práce: webová multiplayerová VR hra (SkautSim).',
    },
  },
]

// Grouped from the CV skill line; order = what matters most for a senior Nuxt role.
export const skills: SkillGroup[] = [
  {
    label: { en: 'Frontend', cs: 'Frontend' },
    items: ['TypeScript', 'Vue', 'Nuxt', 'Nuxt Layers', 'CSS', 'SCSS', 'Tailwind'],
  },
  {
    label: { en: 'Backend & infrastructure', cs: 'Backend a infrastruktura' },
    items: ['Hono', 'Drizzle', 'SQL', 'Cloudflare Workers', 'Docker', 'GitHub Actions', 'Sentry'],
  },
  {
    label: { en: 'Quality & tooling', cs: 'Kvalita a nástroje' },
    items: ['Vitest', 'Zod', 'Figma'],
  },
  {
    label: { en: '3D & XR', cs: '3D a XR' },
    items: ['Three.js', 'A-Frame', 'WebXR'],
  },
]
