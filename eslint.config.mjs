// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    // Inspira UI components are vendored through the registry CLI (`pnpm ui:add`). They stay as
    // upstream ships them, so updates are a plain re-add; our stylistic rules do not apply there.
    ignores: ['app/components/ui/**'],
  },
)
