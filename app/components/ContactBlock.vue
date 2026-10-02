<script setup lang="ts">
import type { SocialLink } from '#shared/types/content'

defineProps<{ email: string, links: SocialLink[] }>()

const { t, locale } = useI18n()
const localePath = useLocalePath()
const { copy, copied, isSupported } = useClipboard()

const pdf = computed(() => locale.value === 'cs' ? '/martin-navratil-cv-cs.pdf' : '/martin-navratil-cv.pdf')
</script>

<template>
  <div class="space-y-6">
    <p class="text-muted">
      {{ t('contact.lead') }}
    </p>

    <div class="flex flex-wrap items-center gap-3">
      <a
        :href="`mailto:${email}`"
        class="text-xl font-medium text-highlighted underline-offset-4 hover:underline"
      >
        {{ email }}
      </a>
      <ClientOnly>
        <UButton
          v-if="isSupported"
          :icon="copied ? 'i-lucide-check' : 'i-lucide-copy'"
          color="neutral"
          variant="soft"
          size="sm"
          @click="copy(email)"
        >
          {{ copied ? t('contact.copied') : t('contact.copy') }}
        </UButton>
      </ClientOnly>
      <span
        aria-live="polite"
        class="sr-only"
      >{{ copied ? t('contact.copied') : '' }}</span>
    </div>

    <div class="flex flex-wrap gap-2">
      <UButton
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        :icon="link.icon"
        target="_blank"
        rel="noopener"
        color="neutral"
        variant="ghost"
      >
        {{ link.label }}
      </UButton>
      <UButton
        :to="pdf"
        icon="i-lucide-file-down"
        color="neutral"
        variant="ghost"
        external
        download
      >
        {{ t('contact.downloadCv') }}
      </UButton>
      <UButton
        :to="localePath('/cv')"
        icon="i-lucide-file-text"
        color="neutral"
        variant="ghost"
      >
        {{ t('contact.webCv') }}
      </UButton>
    </div>
  </div>
</template>
