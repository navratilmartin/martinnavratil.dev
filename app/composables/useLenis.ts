import type Lenis from 'lenis'

/** The live Lenis instance, or `null` on the server and while motion is reduced. */
export function useLenis(): Lenis | null {
  const { $lenis } = useNuxtApp()
  return $lenis?.() ?? null
}
