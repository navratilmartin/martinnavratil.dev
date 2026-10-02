<script setup lang="ts">
import { profile } from '~/data/profile'
import { experience } from '~/data/experience'
import { projects } from '~/data/projects'
import { links } from '~/data/links'

// The CV as a web page, print-styled; `scripts/cv-pdf.ts` renders it to PDF at build time (Q10).
const { t, locale } = useI18n()
const l = useLocalized()
const localePath = useLocalePath()

const pdf = computed(() => locale.value === 'cs' ? '/martin-navratil-cv-cs.pdf' : '/martin-navratil-cv.pdf')
const featured = projects.filter(project => project.featured)

function year(month: string) {
  return month === 'present' ? t('experience.present') : month.slice(0, 4)
}

useSeoMeta({
  title: () => t('cv.title'),
  description: () => l(profile.headline),
})

defineOgImageComponent('Default', {
  title: profile.name,
  description: t('cv.title'),
})
</script>

<template>
  <div class="min-h-screen bg-default text-default">
    <main
      id="main"
      class="mx-auto max-w-3xl px-6 py-12 print:max-w-none print:p-0"
    >
      <nav class="mb-10 flex items-center justify-between gap-4 text-sm print:hidden">
        <NuxtLink
          :to="localePath('/')"
          class="text-muted hover:text-highlighted"
        >
          ← {{ t('cv.back') }}
        </NuxtLink>
        <div class="flex items-center gap-2">
          <LanguageSwitch />
          <UButton
            :to="pdf"
            icon="i-lucide-file-down"
            color="neutral"
            variant="soft"
            size="sm"
            external
            download
          >
            {{ t('cv.download') }}
          </UButton>
        </div>
      </nav>

      <header class="border-b border-default pb-6">
        <h1 class="text-3xl font-bold tracking-tight text-highlighted">
          {{ profile.name }}
        </h1>
        <p class="mt-1 text-lg text-muted">
          {{ l(profile.headline) }}
        </p>
        <p class="mt-4 text-sm text-muted">
          {{ l(profile.intro) }}
        </p>
        <ul class="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm">
          <li>{{ l(profile.location) }}</li>
          <li>
            <a
              :href="`mailto:${profile.email}`"
              class="text-highlighted underline underline-offset-2"
            >{{ profile.email }}</a>
          </li>
          <li
            v-for="link in links"
            :key="link.to"
          >
            <a
              :href="link.to"
              class="text-highlighted underline underline-offset-2"
            >{{ link.to.replace(/^https?:\/\//, '') }}</a>
          </li>
          <li>
            <a
              href="https://martinnavratil.dev"
              class="text-highlighted underline underline-offset-2"
            >martinnavratil.dev</a>
          </li>
        </ul>
      </header>

      <section class="mt-8">
        <h2 class="text-xs font-semibold uppercase tracking-widest text-muted">
          {{ t('experience.title') }}
        </h2>
        <ul class="mt-4 space-y-5">
          <li
            v-for="entry in experience"
            :key="entry.company + entry.from"
            class="grid gap-1 sm:grid-cols-[8rem_1fr]"
          >
            <span class="text-sm tabular-nums text-muted">{{ year(entry.from) }} – {{ year(entry.to) }}</span>
            <div>
              <p class="font-medium text-highlighted">
                {{ l(entry.role) }} · {{ entry.company }}
              </p>
              <p
                v-if="entry.summary"
                class="mt-1 text-sm text-muted"
              >
                {{ l(entry.summary) }}
              </p>
              <ul
                v-if="entry.highlights"
                class="mt-1 list-disc pl-5 text-sm text-muted"
              >
                <li
                  v-for="(highlight, index) in entry.highlights"
                  :key="index"
                >
                  {{ l(highlight) }}
                </li>
              </ul>
              <p
                v-if="entry.stack"
                class="mt-1 text-xs text-muted"
              >
                {{ entry.stack.join(' · ') }}
              </p>
            </div>
          </li>
        </ul>
      </section>

      <section class="mt-8">
        <h2 class="text-xs font-semibold uppercase tracking-widest text-muted">
          {{ t('cv.selectedProjects') }}
        </h2>
        <ul class="mt-4 space-y-5">
          <li
            v-for="project in featured"
            :key="project.slug"
          >
            <p class="font-medium text-highlighted">
              {{ project.name }}
              <span class="font-normal text-muted"> — {{ l(project.tagline) }}</span>
            </p>
            <p class="mt-1 text-sm text-muted">
              {{ l(project.role) }}
            </p>
            <p class="mt-1 text-xs text-muted">
              {{ project.stack.join(' · ') }}
              <template v-if="project.links.live">
                · <a
                  :href="project.links.live"
                  class="text-highlighted underline underline-offset-2"
                >{{ project.links.live.replace(/^https?:\/\//, '') }}</a>
              </template>
            </p>
          </li>
        </ul>
      </section>
    </main>
  </div>
</template>

<style>
@page {
  size: A4;
  margin: 14mm;
}
</style>
