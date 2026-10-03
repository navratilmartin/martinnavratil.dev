import type { ExperienceEntry } from '#shared/types/content'

// Employment history from the CV (Q16d, 2026-10-02). Newest first.
export const experience: ExperienceEntry[] = [
  {
    from: '2022-08',
    to: '2026-09',
    company: 'Develit',
    location: 'Remote',
    role: { en: 'Full Stack Engineer', cs: 'Full Stack Engineer' },
    summary: {
      en: 'Fintech products on Nuxt 4 SSR, a company-wide microservice platform on Cloudflare Workers with typed RPC, and shared Nuxt layers used by every frontend app.',
      cs: 'Fintech produkty na Nuxt 4 SSR, firemní mikroslužbová platforma na Cloudflare Workers s typovaným RPC a sdílené Nuxt layers používané každou frontendovou aplikací.',
    },
    highlights: [
      {
        en: 'Led development on fintech projects built with Nuxt 4 SSR.',
        cs: 'Vedl vývoj fintech projektů postavených na Nuxt 4 SSR.',
      },
      {
        en: 'Designed the company microservice infrastructure on Cloudflare Workers with typed RPC.',
        cs: 'Navrhl firemní mikroslužbovou infrastrukturu na Cloudflare Workers s typovaným RPC.',
      },
      {
        en: 'Created company-wide Nuxt layers for UI shared across all frontend applications.',
        cs: 'Vytvořil celofiremní Nuxt layers pro UI sdílené napříč všemi frontendovými aplikacemi.',
      },
      {
        en: 'Built scalable web platforms following modern UI/UX principles.',
        cs: 'Stavěl škálovatelné webové platformy podle moderních UI/UX principů.',
      },
    ],
    stack: ['TypeScript', 'Nuxt 4', 'Nuxt Layers', 'Hono', 'Cloudflare Workers'],
  },
  {
    from: '2020-12',
    to: '2022-08',
    company: 'Sensorico',
    location: 'Brno',
    role: { en: 'Frontend Developer', cs: 'Frontend developer' },
    summary: {
      en: 'Web application for managing smart lighting and water meters, in a corporate, agile team.',
      cs: 'Webová aplikace pro správu chytrého osvětlení a vodoměrů, v korporátním agilním týmu.',
    },
    stack: ['TypeScript', 'Nuxt 3', 'Tailwind', 'Vue Query', 'Zod'],
  },
  {
    from: '2018-07',
    to: '2020-12',
    company: 'Spatial Hub',
    location: 'Brno',
    role: { en: 'Frontend Developer', cs: 'Frontend developer' },
    summary: {
      en: 'An open-source UI library for augmented-reality environments and its integration into WebXR applications for businesses.',
      cs: 'Open-source UI knihovna pro prostředí rozšířené reality a její integrace do WebXR aplikací pro firmy.',
    },
    stack: ['JavaScript', 'A-Frame', 'Three.js', 'Docker'],
  },
]

// Leadership outside work (CV "Soft Skills & Leadership").
export const volunteering: ExperienceEntry[] = [
  {
    // TODO(Martin): the start year is unknown; add `from` once confirmed, never a guess.
    to: 'present',
    company: 'Junák – český skaut',
    location: 'Blansko',
    role: { en: 'Scout Group Leader', cs: 'Vedoucí skautského střediska' },
    summary: {
      en: 'Leading a troop of 100+ members: leadership, teamwork and planning in practice.',
      cs: 'Vedení oddílu se 100+ členy: leadership, týmová práce a plánování v praxi.',
    },
  },
]
