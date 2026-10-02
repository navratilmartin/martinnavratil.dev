import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Smooth scrolling (PROJECT.md Q6): Lenis drives GSAP's ScrollTrigger through the GSAP ticker, so
// scroll-linked animations stay in sync. The instance exists only while motion is not reduced; under
// reduced motion the page uses native scrolling and ScrollTrigger falls back to the window scroll.
export default defineNuxtPlugin((nuxtApp) => {
  gsap.registerPlugin(ScrollTrigger)

  const { reduced } = useMotionPreference()
  let lenis: Lenis | null = null
  const tick = (time: number) => lenis?.raf(time * 1000)

  function start() {
    if (lenis) return
    lenis = new Lenis({
      autoRaf: false, // the GSAP ticker calls `raf`
      anchors: true, // in-page `#section` links scroll smoothly
      syncTouch: false, // native scrolling on touch devices
    })
    lenis.on('scroll', () => ScrollTrigger.update())
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
  }

  function stop() {
    if (!lenis) return
    gsap.ticker.remove(tick)
    lenis.destroy()
    lenis = null
  }

  watch(reduced, isReduced => (isReduced ? stop() : start()), { immediate: true })

  nuxtApp.hook('page:finish', () => {
    lenis?.resize()
    ScrollTrigger.refresh()
  })

  return { provide: { lenis: () => lenis } }
})
