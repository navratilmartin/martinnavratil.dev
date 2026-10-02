import { defineConfig, devices } from '@playwright/test'

// Runs against the generated site served by `wrangler dev`, i.e. the same assets-only Worker setup as
// production. Run `pnpm generate` first (CI does).
export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: 'http://localhost:8789',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'pnpm preview:cf',
    url: 'http://localhost:8789',
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
})
