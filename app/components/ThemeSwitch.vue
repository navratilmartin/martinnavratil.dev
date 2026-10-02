<script setup lang="ts">
const { t } = useI18n()
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')

function toggle() {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}
</script>

<template>
  <ClientOnly>
    <UButton
      :icon="isDark ? 'i-lucide-sun' : 'i-lucide-moon'"
      :aria-label="isDark ? t('settings.themeDark') : t('settings.themeLight')"
      color="neutral"
      variant="ghost"
      @click="toggle"
    />
    <template #fallback>
      <div
        class="size-8"
        aria-hidden="true"
      />
    </template>
  </ClientOnly>
</template>
