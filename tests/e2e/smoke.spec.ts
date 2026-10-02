import { expect, test } from '@playwright/test'

test('home renders the hero and the main sections', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/Martin Navrátil/)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Martin Navrátil')
  for (const id of ['work', 'experience', 'contact']) {
    await expect(page.locator(`#${id}`)).toBeVisible()
  }
})

test('language switch leads to the Czech page', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('html')).toHaveAttribute('lang', /^en/)
  await page.getByRole('link', { name: 'Čeština' }).click()
  await expect(page).toHaveURL(/\/cs$/)
  await expect(page.locator('html')).toHaveAttribute('lang', /^cs/)
})

test('theme is dark first and the toggle switches to light', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('html')).toHaveClass(/dark/)
  await page.getByRole('button', { name: 'Switch to light mode' }).click()
  await expect(page.locator('html')).toHaveClass(/light/)
})

test('motion switch sets the reduced-motion class', async ({ page }) => {
  await page.goto('/')
  await page.getByLabel('Motion').selectOption('reduced')
  await expect(page.locator('html')).toHaveClass(/reduce-motion/)
  await page.reload()
  await expect(page.locator('html')).toHaveClass(/reduce-motion/)
})

test('the CV route links to the PDF and back', async ({ page }) => {
  await page.goto('/cv')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Martin Navrátil')
  await expect(page.getByRole('link', { name: 'Download PDF' })).toHaveAttribute('href', '/martin-navratil-cv.pdf')
  await page.getByRole('link', { name: 'Back to the site' }).click()
  await expect(page).toHaveURL(/\/$/)
})
