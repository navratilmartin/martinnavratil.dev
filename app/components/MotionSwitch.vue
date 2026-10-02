<script setup lang="ts">
const { t } = useI18n()
const { mode } = useMotionPreference()
const id = useId()
</script>

<template>
  <label
    :for="id"
    class="sr-only"
  >{{ t('settings.motion') }}</label>
  <select
    :id="id"
    v-model="mode"
    class="rounded border border-default bg-default px-2 py-1 text-sm text-muted"
  >
    <option value="auto">
      {{ t('settings.motionAuto') }}
    </option>
    <option value="reduced">
      {{ t('settings.motionReduced') }}
    </option>
    <option value="full">
      {{ t('settings.motionFull') }}
    </option>
  </select>
</template>
