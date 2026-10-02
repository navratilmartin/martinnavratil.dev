import { MOTION_STORAGE_KEY, type MotionMode } from '~/composables/useMotionPreference'

// Loads the stored motion choice after hydration (so server and client markup match), persists
// changes, and mirrors the effective state onto <html> for CSS: `.reduce-motion` / `.full-motion`.
export default defineNuxtPlugin((nuxtApp) => {
  const { mode, reduced } = useMotionPreference()

  nuxtApp.hook('app:mounted', () => {
    try {
      const stored = localStorage.getItem(MOTION_STORAGE_KEY)
      if (stored === 'reduced' || stored === 'full') mode.value = stored
    }
    catch { /* storage unavailable: stay on 'auto' */ }

    watch(mode, (value: MotionMode) => {
      try {
        if (value === 'auto') localStorage.removeItem(MOTION_STORAGE_KEY)
        else localStorage.setItem(MOTION_STORAGE_KEY, value)
      }
      catch { /* ignore */ }
    })
  })

  watch([reduced, mode], ([isReduced, currentMode]) => {
    const root = document.documentElement
    root.classList.toggle('reduce-motion', isReduced)
    root.classList.toggle('full-motion', currentMode === 'full')
  }, { immediate: true })
})
