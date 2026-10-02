<script setup lang="ts">
const { profile, projects, links } = useAppConfig()
const year = new Date().getFullYear()
</script>

<template>
  <div class="min-h-screen bg-default text-default">
    <UContainer class="max-w-3xl py-16 sm:py-24">
      <header class="flex items-start justify-between gap-6">
        <div class="space-y-4">
          <h1 class="text-4xl font-bold tracking-tight text-highlighted sm:text-5xl">
            {{ profile.name }}
          </h1>
          <p class="text-lg text-muted sm:text-xl">
            {{ profile.tagline }}
          </p>
          <p
            v-if="profile.note"
            class="max-w-xl text-sm text-dimmed"
          >
            {{ profile.note }}
          </p>
        </div>
        <UColorModeButton class="shrink-0" />
      </header>

      <section class="mt-16 space-y-6">
        <h2 class="text-xs font-semibold uppercase tracking-widest text-muted">
          Projects
        </h2>

        <UPageGrid class="grid-cols-1 sm:grid-cols-2">
          <UPageCard
            v-for="project in projects"
            :key="project.name"
            :title="project.name"
            :description="project.description"
            :icon="project.icon"
            :to="project.url"
            :target="project.url ? '_blank' : undefined"
            variant="subtle"
            :highlight="!!project.url"
            :ui="{ description: 'text-sm leading-relaxed' }"
          >
            <template #footer>
              <div class="flex flex-wrap items-center gap-1.5">
                <UBadge
                  v-for="tag in project.tags"
                  :key="tag"
                  color="neutral"
                  variant="subtle"
                  size="sm"
                >
                  {{ tag }}
                </UBadge>
                <UBadge
                  v-if="!project.url"
                  color="warning"
                  variant="subtle"
                  size="sm"
                >
                  in progress
                </UBadge>
                <span
                  v-else
                  class="ml-auto inline-flex items-center gap-1 text-xs text-muted"
                >
                  {{ project.url.replace(/^https?:\/\//, '') }}
                  <UIcon
                    name="i-lucide-arrow-up-right"
                    class="size-3.5"
                  />
                </span>
              </div>
            </template>
          </UPageCard>
        </UPageGrid>
      </section>

      <section
        v-if="links.length"
        class="mt-16 space-y-4"
      >
        <h2 class="text-xs font-semibold uppercase tracking-widest text-muted">
          Elsewhere
        </h2>
        <div class="flex flex-wrap gap-2">
          <UButton
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            :icon="link.icon"
            target="_blank"
            color="neutral"
            variant="soft"
          >
            {{ link.label }}
          </UButton>
        </div>
      </section>

      <footer class="mt-24 flex items-center justify-between border-t border-default pt-6 text-xs text-dimmed">
        <span>© {{ year }} {{ profile.name }}</span>
        <span>martinnavratil.dev</span>
      </footer>
    </UContainer>
  </div>
</template>
