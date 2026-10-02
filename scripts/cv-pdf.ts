/**
 * Renders the print-styled CV routes of the generated site to PDF (PROJECT.md Q10).
 * Run after `nuxt generate`; writes the PDFs next to the static files so `wrangler deploy` ships them:
 *   .output/public/martin-navratil-cv.pdf      (English, /cv)
 *   .output/public/martin-navratil-cv-cs.pdf   (Czech, /cs/cv)
 * Uses the installed Google Chrome when available (GitHub runners have it), else Playwright's Chromium.
 */
import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { extname, join, normalize } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { AddressInfo } from 'node:net'
import { chromium } from '@playwright/test'

const root = fileURLToPath(new URL('../.output/public/', import.meta.url))
const outputs = [
  { route: '/cv', file: 'martin-navratil-cv.pdf' },
  { route: '/cs/cv', file: 'martin-navratil-cv-cs.pdf' },
]
const types: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
}

async function resolveFile(pathname: string) {
  const clean = normalize(decodeURIComponent(pathname.split('?')[0] ?? '/')).replace(/^(\.\.[/\\])+/, '')
  for (const candidate of [clean, `${clean}.html`, join(clean, 'index.html')]) {
    const file = join(root, candidate)
    if (!file.startsWith(root)) continue
    const info = await stat(file).catch(() => null)
    if (info?.isFile()) return file
  }
  return null
}

const server = createServer(async (req, res) => {
  const file = await resolveFile(req.url ?? '/')
  if (!file) {
    res.writeHead(404).end('not found')
    return
  }
  res.writeHead(200, { 'content-type': types[extname(file)] ?? 'application/octet-stream' })
  res.end(await readFile(file))
})

await new Promise<void>(resolve => server.listen(0, '127.0.0.1', resolve))
const { port } = server.address() as AddressInfo
const base = `http://127.0.0.1:${port}`

const browser = await chromium.launch({ channel: 'chrome' }).catch(() => chromium.launch())
try {
  for (const { route, file } of outputs) {
    const page = await browser.newPage()
    // The site is dark-first; the PDF is a document, so force the light theme before the page loads.
    await page.emulateMedia({ colorScheme: 'light' })
    await page.addInitScript(() => {
      try {
        localStorage.setItem('nuxt-color-mode', 'light')
      }
      catch { /* storage unavailable */ }
    })
    const response = await page.goto(base + route, { waitUntil: 'networkidle' })
    if (!response?.ok()) throw new Error(`${route} responded ${response?.status()}; run \`pnpm generate\` first`)
    await page.emulateMedia({ media: 'print' })
    const path = join(root, file)
    await page.pdf({ path, format: 'A4', printBackground: true, preferCSSPageSize: true })
    const { size } = await stat(path)
    console.log(`${route} → ${file} (${Math.round(size / 1024)} kB)`)
    await page.close()
  }
}
finally {
  await browser.close()
  server.close()
}
