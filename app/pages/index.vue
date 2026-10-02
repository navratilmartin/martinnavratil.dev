<script setup lang="ts">
import { profile } from '~/data/profile'
import { projects } from '~/data/projects'
import { experience } from '~/data/experience'
import { links } from '~/data/links'

// Scaffold of the single page (PROJECT.md Q3): the sections and data flow are final, the visual
// layer is a placeholder until the design phase.
const { t } = useI18n()
const l = useLocalized()

const featured = projects.filter(project => project.featured)
const more = projects.filter(project => !project.featured)

// The home title carries the positioning line itself, so the site-name suffix is switched off here.
useHead({ titleTemplate: '%s' })
useSeoMeta({
  title: () => `${profile.name} · ${l(profile.headline)}`,
  description: () => l(profile.intro),
})

defineOgImageComponent('Default', {
  title: profile.name,
  description: l(profile.headline),
})

useSchemaOrg([
  definePerson({
    name: profile.name,
    url: 'https://martinnavratil.dev',
    email: profile.email,
    jobTitle: 'Senior Frontend Engineer',
    image: profile.photo ? `https://martinnavratil.dev${profile.photo}` : undefined,
    sameAs: links.map(link => link.to),
  }),
])
</script>

<template>
  <div class="min-h-screen bg-default text-default">
    <SiteHeader />

    <main id="main">
      <section class="py-24 sm:py-32">
        <UContainer class="max-w-4xl">
          <NuxtImg
            v-if="profile.photo"
            :src="profile.photo"
            :alt="t('cv.photoAlt')"
            width="160"
            height="160"
            fit="cover"
            sizes="160px"
            loading="eager"
            fetchpriority="high"
            class="mb-8 size-28 rounded-full object-cover sm:size-36"
          />
          <h1 class="text-5xl font-bold tracking-tight text-highlighted sm:text-7xl">
            {{ profile.name }}
          </h1>
          <p class="mt-6 text-xl text-muted sm:text-2xl">
            {{ l(profile.headline) }}
          </p>
          <!-- First Inspira UI component through the registry CLI; proves the pipeline (PROJECT.md §5.4). -->
          <BlurReveal
            :delay="0.2"
            :duration="0.8"
            class="mt-4"
          >
            <p class="max-w-2xl text-balance text-muted">
              {{ l(profile.intro) }}
            </p>
          </BlurReveal>
        </UContainer>
      </section>

      <section
        id="work"
        class="scroll-mt-14 py-16"
      >
        <UContainer class="max-w-4xl space-y-8">
          <h2 class="text-xs font-semibold uppercase tracking-widest text-muted">
            {{ t('work.title') }}
          </h2>
          <div class="grid gap-6 sm:grid-cols-2">
            <ProjectCard
              v-for="project in featured"
              :key="project.slug"
              :project="project"
            />
          </div>
          <h3 class="pt-4 text-xs font-semibold uppercase tracking-widest text-muted">
            {{ t('work.more') }}
          </h3>
          <div class="grid gap-6 sm:grid-cols-2">
            <ProjectCard
              v-for="project in more"
              :key="project.slug"
              :project="project"
            />
          </div>
        </UContainer>
      </section>

      <section
        id="experience"
        class="scroll-mt-14 py-16"
      >
        <UContainer class="max-w-4xl space-y-6">
          <h2 class="text-xs font-semibold uppercase tracking-widest text-muted">
            {{ t('experience.title') }}
          </h2>
          <ExperienceTable :entries="experience" />
        </UContainer>
      </section>

      <section
        id="contact"
        class="scroll-mt-14 py-16"
      >
        <UContainer class="max-w-4xl space-y-6">
          <h2 class="text-xs font-semibold uppercase tracking-widest text-muted">
            {{ t('contact.title') }}
          </h2>
          <ContactBlock
            :email="profile.email"
            :links="links"
          />
        </UContainer>
      </section>
    </main>

    <SiteFooter :name="profile.name" />
  </div>
</template>
