<script setup lang="ts">
import type { Project } from '#shared/types/content'

defineProps<{ project: Project }>()

const { t } = useI18n()
const l = useLocalized()
</script>

<template>
  <article class="flex flex-col gap-4 rounded-lg border border-default bg-elevated/50 p-6">
    <header class="flex flex-wrap items-baseline justify-between gap-2">
      <h3 class="text-xl font-semibold text-highlighted">
        {{ project.name }}
      </h3>
      <span class="text-xs tabular-nums text-muted">
        {{ project.year }} · {{ t(`work.status.${project.status}`) }}
      </span>
    </header>

    <p class="text-highlighted">
      {{ l(project.tagline) }}
    </p>
    <p class="text-sm text-muted">
      {{ l(project.summary) }}
    </p>

    <dl class="grid gap-2 text-sm sm:grid-cols-[auto_1fr]">
      <dt class="text-muted">
        {{ t('work.role') }}
      </dt>
      <dd>{{ l(project.role) }}</dd>
      <dt class="text-muted">
        {{ t('work.stack') }}
      </dt>
      <dd class="flex flex-wrap gap-1">
        <UBadge
          v-for="item in project.stack"
          :key="item"
          color="neutral"
          variant="subtle"
          size="sm"
        >
          {{ item }}
        </UBadge>
      </dd>
    </dl>

    <details
      v-if="project.detail"
      class="text-sm"
    >
      <summary class="cursor-pointer text-highlighted">
        {{ t('work.details') }}
      </summary>
      <div class="mt-3 space-y-3 text-muted">
        <p>
          <strong class="text-highlighted">{{ t('work.problem') }}.</strong>
          {{ l(project.detail.problem) }}
        </p>
        <div>
          <strong class="text-highlighted">{{ t('work.decisions') }}</strong>
          <ul class="mt-1 list-disc space-y-1 pl-5">
            <li
              v-for="(decision, index) in project.detail.decisions"
              :key="index"
            >
              {{ l(decision) }}
            </li>
          </ul>
        </div>
        <p>
          <strong class="text-highlighted">{{ t('work.outcome') }}.</strong>
          {{ l(project.detail.outcome) }}
        </p>
      </div>
    </details>

    <footer
      v-if="project.links.live || project.links.source"
      class="mt-auto flex flex-wrap gap-2"
    >
      <UButton
        v-if="project.links.live"
        :to="project.links.live"
        :aria-label="`${t('work.live')}: ${project.name}`"
        target="_blank"
        rel="noopener"
        icon="i-lucide-arrow-up-right"
        color="neutral"
        variant="soft"
        size="sm"
      >
        {{ t('work.live') }}
      </UButton>
      <UButton
        v-if="project.links.source"
        :to="project.links.source"
        :aria-label="`${t('work.source')}: ${project.name}`"
        target="_blank"
        rel="noopener"
        icon="i-simple-icons-github"
        color="neutral"
        variant="ghost"
        size="sm"
      >
        {{ t('work.source') }}
      </UButton>
    </footer>
  </article>
</template>
