<script setup lang="ts">
import type { ExperienceEntry } from '#shared/types/content'

defineProps<{ entries: ExperienceEntry[] }>()

const { t } = useI18n()
const l = useLocalized()

function year(month: string) {
  return month === 'present' ? t('experience.present') : month.slice(0, 4)
}
</script>

<template>
  <table class="w-full text-left text-sm">
    <caption class="sr-only">
      {{ t('experience.title') }}
    </caption>
    <thead>
      <tr class="text-xs uppercase tracking-wider text-muted">
        <th
          scope="col"
          class="py-2 pr-4 font-medium"
        >
          {{ t('experience.period') }}
        </th>
        <th
          scope="col"
          class="py-2 pr-4 font-medium"
        >
          {{ t('experience.company') }}
        </th>
        <th
          scope="col"
          class="py-2 font-medium"
        >
          {{ t('experience.role') }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="entry in entries"
        :key="entry.company + entry.from"
        class="border-t border-default"
      >
        <td class="whitespace-nowrap py-3 pr-4 tabular-nums text-muted">
          {{ year(entry.from) }} – {{ year(entry.to) }}
        </td>
        <td class="py-3 pr-4 text-highlighted">
          <NuxtLink
            v-if="entry.url"
            :to="entry.url"
            target="_blank"
            rel="noopener"
          >
            {{ entry.company }}
          </NuxtLink>
          <template v-else>
            {{ entry.company }}
          </template>
          <span
            v-if="entry.location"
            class="block text-xs text-muted"
          >
            {{ entry.location }}
          </span>
        </td>
        <td class="py-3">
          {{ l(entry.role) }}
          <span
            v-if="entry.stack"
            class="block text-xs text-muted"
          >
            {{ entry.stack.join(' · ') }}
          </span>
        </td>
      </tr>
    </tbody>
  </table>
</template>
