<script setup lang="ts">
// Open Graph image template, rendered at build time (nuxt-og-image, zero runtime). Flexbox and inline
// styles only: the renderer supports a subset of CSS. Replace with the real design later.
defineProps<{
  title: string
  description?: string
}>()
</script>

<template>
  <div
    style="display: flex; flex-direction: column; justify-content: space-between; width: 100%; height: 100%; padding: 72px; background: #0a0a0a; color: #fafafa; font-family: 'Inter';"
  >
    <div style="font-size: 28px; color: #a1a1aa;">
      martinnavratil.dev
    </div>
    <div style="display: flex; flex-direction: column;">
      <div style="font-size: 88px; font-weight: 700; letter-spacing: -0.03em; line-height: 1;">
        {{ title }}
      </div>
      <div
        v-if="description"
        style="margin-top: 28px; font-size: 34px; color: #d4d4d8; line-height: 1.3;"
      >
        {{ description }}
      </div>
    </div>
  </div>
</template>
