import type { Project } from '#shared/types/content'

// Ordered by importance; `featured` entries lead (PROJECT.md §6, selection pending Q16).
// TODO(Martin, Q16): confirm roles, team sizes, what may be public and the missing live URLs.
export const projects: Project[] = [
  {
    slug: 'nuxt-interview-prep',
    name: 'Nuxt Interview Prep',
    tagline: {
      en: 'A study app for senior frontend and Nuxt interviews',
      cs: 'Studijní aplikace pro pohovory na senior frontend a Nuxt pozice',
    },
    summary: {
      en: '177 study pages in seven tracks, 749 questions with spaced repetition synced across devices, timed mock interviews, flashcards extracted from the content at build time, notes and progress stats.',
      cs: '177 studijních stránek v sedmi tracích, 749 otázek s opakováním synchronizovaným mezi zařízeními, mock pohovory na čas, kartičky generované z obsahu při buildu, poznámky a statistiky pokroku.',
    },
    role: {
      en: 'Solo: content model, custom Nuxt module, progress sync on D1, UI',
      cs: 'Sólo: datový model obsahu, vlastní Nuxt modul, synchronizace pokroku přes D1, UI',
    },
    year: 2026,
    status: 'live',
    stack: ['Nuxt 4', 'Nuxt Content 3', 'Nuxt UI 4', 'Cloudflare Workers', 'D1', 'nuxt-auth-utils', 'CodeMirror'],
    links: { live: 'https://prep.martinnavratil.dev' },
    featured: true,
    detail: {
      problem: {
        en: 'Preparing for senior Nuxt interviews meant juggling docs, notes and question lists with no feedback loop on what I actually knew.',
        cs: 'Příprava na senior Nuxt pohovory znamenala žonglovat s dokumentací, poznámkami a seznamy otázek bez zpětné vazby o tom, co opravdu umím.',
      },
      decisions: [
        {
          en: 'Content as Markdown collections plus a local Nuxt module that extracts flashcards at build time, so one source feeds study pages, flashcards and the trainer.',
          cs: 'Obsah jako Markdown kolekce a lokální Nuxt modul, který při buildu vytahuje kartičky, takže jeden zdroj živí studijní stránky, kartičky i trenažér.',
        },
        {
          en: 'Every page is prerendered; the Cloudflare Worker only runs for the progress-sync API backed by D1.',
          cs: 'Každá stránka je předrenderovaná; Cloudflare Worker běží jen pro API synchronizace pokroku nad D1.',
        },
        {
          en: 'A Leitner-style scheduler brings weak questions back sooner instead of cycling everything equally.',
          cs: 'Plánovač ve stylu Leitnera vrací slabé otázky dřív, místo aby všechno točil stejně.',
        },
      ],
      outcome: {
        en: 'Live at prep.martinnavratil.dev: 749 questions, 157 glossary terms, a 56-item readiness checklist and a 21-day plan.',
        cs: 'Běží na prep.martinnavratil.dev: 749 otázek, 157 pojmů ve slovníku, 56bodový checklist připravenosti a 21denní plán.',
      },
    },
  },
  {
    slug: 'nambi',
    name: 'Nambi',
    tagline: {
      en: 'A platform where companies and influencers run collaborations end to end',
      cs: 'Platforma, kde firmy a influenceři řeší spolupráce od nabídky po hodnocení',
    },
    summary: {
      en: 'Monorepo with a tRPC API on Nitro, admin and company web apps, a marketing landing and a Capacitor mobile app. Offers, applications, term proposals, deliverables, ratings and chat in one flow.',
      cs: 'Monorepo s tRPC API na Nitru, administrace a firemní web, marketingový landing a mobilní aplikace v Capacitoru. Nabídky, přihlášky, návrhy termínů, výstupy, hodnocení a chat v jednom toku.',
    },
    role: {
      en: 'Fullstack: architecture, API and data model, web apps, CI',
      cs: 'Fullstack: architektura, API a datový model, webové aplikace, CI',
    },
    year: 2026,
    status: 'in-progress',
    stack: ['Nuxt 4', 'Turborepo', 'tRPC', 'Hono', 'better-auth', 'Cloudflare D1', 'Capacitor', 'Vitest', 'Playwright'],
    // TODO(Martin): confirm nambi.cz is public before linking it.
    links: {},
    featured: true,
    detail: {
      problem: {
        en: 'Collaborations between small businesses and influencers live in DMs and spreadsheets: no shared state, no history, no accountability.',
        cs: 'Spolupráce mezi malými firmami a influencery žijí v DM a tabulkách: žádný sdílený stav, žádná historie, žádná odpovědnost.',
      },
      decisions: [
        {
          en: 'One monorepo with shared packages, so the admin, company and mobile apps share types, auth and UI.',
          cs: 'Jedno monorepo se sdílenými balíčky, takže administrace, firemní a mobilní aplikace sdílejí typy, auth i UI.',
        },
        {
          en: 'tRPC over Hono on Nitro for end-to-end typed APIs on Cloudflare D1.',
          cs: 'tRPC přes Hono na Nitru pro end-to-end typované API nad Cloudflare D1.',
        },
        {
          en: 'Magic-link onboarding: an admin creates the company account, the company sets its own password.',
          cs: 'Onboarding přes magic link: admin založí firemní účet, firma si nastaví vlastní heslo.',
        },
      ],
      outcome: {
        en: 'Demo-ready with seeded walkthrough accounts; dev, staging and production environments on Cloudflare.',
        cs: 'Připraveno na demo se seedovanými účty pro průchod; dev, staging a produkce na Cloudflare.',
      },
    },
  },
  {
    slug: 'taboriste-kondor',
    name: 'Tábořiště Kondor',
    tagline: {
      en: 'Fundraising site for a scout troop building its own campsite',
      cs: 'Web pro sbírku na vlastní skautské tábořiště',
    },
    summary: {
      en: 'A static promo and fundraising site for the 3rd scout troop Kondor Blansko, with a 3D preview of the campsite and a door into SkautSim, a VR simulation of the camp.',
      cs: 'Statický propagační a fundraisingový web pro 3. skautský oddíl Kondor Blansko, s 3D náhledem tábořiště a vstupem do SkautSimu, VR simulace tábora.',
    },
    role: {
      en: 'Design system, site, 3D integration',
      cs: 'Design systém, web, integrace 3D',
    },
    year: 2026,
    status: 'in-progress',
    stack: ['Nuxt 4', 'PrimeVue', 'TresJS', 'three.js', 'Tailwind v4', 'Cloudflare Workers'],
    links: {},
    featured: true,
  },
  {
    slug: 'becky-kay-livingston',
    name: 'Becky Kay Livingstonová',
    tagline: {
      en: 'A therapist\'s website built to be usable by everyone',
      cs: 'Web terapeutky navržený tak, aby ho mohl používat každý',
    },
    summary: {
      en: 'Multi-page site with an accessibility-first brief: WCAG 2.2 AA as the floor, an on-page motion switch, axe and interaction checks in CI, GSAP scroll choreography and a contact form delivered through Cloudflare Email Routing without third parties.',
      cs: 'Vícestránkový web s důrazem na přístupnost: WCAG 2.2 AA jako minimum, přepínač animací přímo na stránce, axe a interakční testy v CI, scroll choreografie v GSAP a kontaktní formulář přes Cloudflare Email Routing bez třetích stran.',
    },
    role: {
      en: 'Design direction with Claude Design, build, accessibility audit',
      cs: 'Designový směr s Claude Design, implementace, audit přístupnosti',
    },
    year: 2026,
    status: 'in-progress',
    stack: ['Astro 7', 'Tailwind v4', 'GSAP', 'Lenis', 'Cloudflare Workers', 'Playwright', 'axe-core'],
    // TODO(Martin): add https://beckykaylivingston.cz once it is live.
    links: {},
    featured: true,
  },
  {
    slug: 'accountant-web',
    name: 'Účetnictví Blansko',
    tagline: {
      en: 'Website for an accounting practice in Blansko',
      cs: 'Web účetní praxe v Blansku',
    },
    summary: {
      en: 'Service pages, client references and a contact form sending through Resend, with sitemap and image optimisation.',
      cs: 'Stránky služeb, reference klientů a kontaktní formulář přes Resend, se sitemapou a optimalizací obrázků.',
    },
    role: { en: 'Solo', cs: 'Sólo' },
    year: 2025,
    status: 'live',
    stack: ['Nuxt', 'UnoCSS', 'FormKit', 'Resend', 'Cloudflare Workers'],
    // TODO(Martin): live URL.
    links: { source: 'https://github.com/navratilmartin/accountant-web' },
    featured: false,
  },
  {
    slug: 'skaut-hlasovani',
    name: 'Skautské hlasování',
    tagline: {
      en: 'Real-time emoji voting for scout meetings',
      cs: 'Hlasování emoji v reálném čase pro skautské besedy',
    },
    summary: {
      en: 'A leader presents statements, participants vote anonymously from their phones and results update live. Runs on a local network without internet.',
      cs: 'Vedoucí prezentuje stanoviska, účastníci anonymně hlasují z telefonu a výsledky se aktualizují živě. Běží na lokální síti bez internetu.',
    },
    role: { en: 'Solo', cs: 'Sólo' },
    year: 2025,
    status: 'archived',
    stack: ['Vue 3', 'Vite', 'socket.io', 'Tailwind'],
    links: {},
    featured: false,
  },
  {
    slug: 'skautsim',
    name: 'SkautSim',
    tagline: {
      en: 'A VR simulation of a scout camp with multiplayer',
      cs: 'VR simulace skautského tábora s multiplayerem',
    },
    summary: {
      en: 'University project with two co-authors: walk through the planned campsite in VR, meet others in the same scene over WebRTC and send photos from the game to the campsite website.',
      cs: 'Školní projekt se dvěma spoluautory: procházka plánovaným tábořištěm ve VR, setkání s ostatními ve stejné scéně přes WebRTC a odesílání fotek ze hry na web tábořiště.',
    },
    role: {
      en: 'One of three authors: multiplayer and the bridge to the website',
      cs: 'Jeden ze tří autorů: multiplayer a propojení s webem',
    },
    year: 2026,
    status: 'in-progress',
    stack: ['three.js', 'Vite', 'WebRTC', 'Docker'],
    links: {},
    featured: false,
  },
  {
    slug: 'robopilot',
    name: 'RoboPilot',
    tagline: {
      en: 'Robot-arm control with live camera and audio streaming',
      cs: 'Ovládání robotického ramene s živým přenosem obrazu a zvuku',
    },
    summary: {
      en: 'A FastAPI camera server streaming over WebRTC, stream clients, and Python modules driving a UR arm and its gripper over sockets.',
      cs: 'Kamerový server ve FastAPI streamující přes WebRTC, klienti pro příjem streamu a Python moduly řídící UR rameno a jeho gripper přes sockety.',
    },
    role: { en: 'Solo', cs: 'Sólo' },
    year: 2025,
    status: 'archived',
    stack: ['Python', 'FastAPI', 'WebRTC', 'ur-rtde'],
    links: {},
    featured: false,
  },
]
