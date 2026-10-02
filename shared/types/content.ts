/**
 * Content model of the site. Everything the page, the CV route and the OG image show comes from
 * `app/data/*.ts`, typed with these interfaces (PROJECT.md Q8). Copy is bilingual (Q14): every
 * human-readable string is a `Localized` pair, so one object feeds both languages.
 */

export interface Localized {
  en: string
  cs: string
}

export type Locale = keyof Localized

export interface Profile {
  name: string
  /** One-line positioning under the name (Q2). */
  headline: Localized
  /** The identity sentence of the hero. */
  intro: Localized
  location: Localized
  /** Public contact address; the page offers it as `mailto:` and a copy button (Q9). */
  email: string
  /** Portrait, path under `public/`. */
  photo?: string
  /** Shown as a status pill when set, e.g. "Available from January". Not used for now (Q17). */
  availability?: Localized
}

export interface ExperienceEntry {
  /** ISO month, e.g. `2024-09`. */
  from: string
  /** ISO month or `present`. */
  to: string
  company: string
  url?: string
  location?: string
  role: Localized
  summary?: Localized
  highlights?: Localized[]
  stack?: string[]
}

export interface EducationEntry {
  school: string
  location?: string
  degree: Localized
  field: Localized
  from?: string
  to?: string
  note?: Localized
}

export interface SkillGroup {
  label: Localized
  items: string[]
}

export type ProjectStatus = 'live' | 'in-progress' | 'archived'

export interface Project {
  slug: string
  name: string
  tagline: Localized
  summary: Localized
  /** What Martin owned, the first thing hiring engineers check. */
  role: Localized
  year: number
  status: ProjectStatus
  stack: string[]
  links: {
    live?: string
    source?: string
  }
  /** Featured projects form the hero stack and the first row of Work. */
  featured: boolean
  /** Senior-level depth for the in-page detail panel (single page, Q3). */
  detail?: {
    problem: Localized
    decisions: Localized[]
    outcome: Localized
  }
}

export interface SocialLink {
  label: string
  /** Iconify name, e.g. `i-simple-icons-github`. */
  icon: string
  to: string
}
