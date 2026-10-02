<script setup lang="ts">
defineProps<{ name: string }>()

const { t } = useI18n()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-default py-8 text-xs text-muted">
    <UContainer class="flex flex-wrap items-center justify-between gap-2">
      <span>© {{ year }} {{ name }}</span>
      <a
        href="https://github.com/navratilmartin/martinnavratil.dev"
        target="_blank"
        rel="noopener"
        class="hover:text-highlighted"
      >
        {{ t('footer.built') }}
      </a>
    </UContainer>
  </footer>
</template>
