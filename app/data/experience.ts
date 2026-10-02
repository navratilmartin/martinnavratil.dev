import type { ExperienceEntry } from '#shared/types/content'

// TODO(Martin, Q16): real employment history. These rows only keep the table visible in the scaffold.
export const experience: ExperienceEntry[] = [
  {
    from: '2024-01',
    to: 'present',
    company: 'TODO Company',
    role: { en: 'Frontend Engineer', cs: 'Frontend engineer' },
    stack: ['Nuxt', 'Vue', 'TypeScript'],
  },
  {
    from: '2022-01',
    to: '2023-12',
    company: 'TODO Previous company',
    role: { en: 'Web Developer', cs: 'Webový vývojář' },
  },
]
