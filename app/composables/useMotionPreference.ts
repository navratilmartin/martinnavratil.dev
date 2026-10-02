export type MotionMode = 'auto' | 'reduced' | 'full'

export const MOTION_STORAGE_KEY = 'mn:motion'

/**
 * Motion is opt-out on the page itself, not only through the OS (PROJECT.md Q12).
 * `mode`   — the visitor's choice: follow the system, force reduced, or force full.
 * `reduced` — the effective state every animation must respect: Lenis, GSAP, canvas loops, motion-v
 *            (`MotionConfig`) and CSS (`html.reduce-motion`) all key off this one flag.
 * Persistence and the `<html>` classes live in `plugins/motion.client.ts`.
 */
export function useMotionPreference() {
  const mode = useState<MotionMode>('motion-mode', () => 'auto')
  const osPreference = usePreferredReducedMotion()
  const reduced = computed(() =>
    mode.value === 'reduced' || (mode.value === 'auto' && osPreference.value === 'reduce'),
  )
  return { mode, reduced }
}
