<script setup lang="ts">
import * as uiLocales from '@nuxt/ui/locale'
import { MotionConfig } from 'motion-v'

const { locale } = useI18n()
const head = useLocaleHead()
const { reduced } = useMotionPreference()

useHead(head)
</script>

<template>
  <UApp :locale="uiLocales[locale]">
    <!-- Every motion-v based component (that is most of Inspira UI) follows the motion switch. -->
    <MotionConfig :reduced-motion="reduced ? 'always' : 'user'">
      <NuxtPage />
    </MotionConfig>
  </UApp>
</template>
