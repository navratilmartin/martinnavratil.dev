<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const nav = computed(() => [
  { label: t('nav.work'), to: localePath({ path: '/', hash: '#work' }) },
  { label: t('nav.experience'), to: localePath({ path: '/', hash: '#experience' }) },
  { label: t('nav.contact'), to: localePath({ path: '/', hash: '#contact' }) },
  { label: t('nav.cv'), to: localePath('/cv') },
])
</script>

<template>
  <a
    href="#main"
    class="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-default focus:px-3 focus:py-2 focus:text-highlighted focus:ring-2 focus:ring-primary"
  >
    {{ t('nav.skip') }}
  </a>
  <header class="sticky top-0 z-40 border-b border-default bg-default/80 backdrop-blur">
    <UContainer class="flex h-14 items-center justify-between gap-4">
      <NuxtLink
        :to="localePath('/')"
        class="font-semibold tracking-tight text-highlighted"
      >
        MN
      </NuxtLink>
      <nav class="hidden sm:block">
        <ul class="flex items-center gap-5 text-sm">
          <li
            v-for="item in nav"
            :key="item.label"
          >
            <NuxtLink
              :to="item.to"
              class="text-muted hover:text-highlighted"
            >
              {{ item.label }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
      <div class="flex items-center gap-1">
        <LanguageSwitch />
        <ThemeSwitch />
        <MotionSwitch />
      </div>
    </UContainer>
  </header>
</template>
