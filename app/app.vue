<script setup lang="ts">
const { profile } = useAppConfig()

useSeoMeta({
  title: profile.name,
  description: profile.tagline,
  ogTitle: profile.name,
  ogDescription: profile.tagline,
})
</script>

<template>
  <UApp>
    <NuxtPage />
  </UApp>
</template>
