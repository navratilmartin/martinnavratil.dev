<script setup lang="ts">
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const others = computed(() => locales.value.filter(l => l.code !== locale.value))
</script>

<template>
  <NuxtLink
    v-for="l in others"
    :key="l.code"
    :to="switchLocalePath(l.code)"
    :hreflang="l.language"
    class="rounded px-2 py-1 text-sm text-muted hover:text-highlighted"
  >
    {{ l.name }}
  </NuxtLink>
</template>
