import type { Locale, Localized } from '#shared/types/content'

/** Picks the current language from a bilingual `Localized` pair: `l(project.tagline)`. */
export function useLocalized() {
  const { locale } = useI18n()
  return (value: Localized) => value[locale.value as Locale]
}
