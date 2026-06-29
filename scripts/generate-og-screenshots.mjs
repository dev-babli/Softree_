/**
 * Captures centered 1:1 (1200×1200) viewport screenshots of each page for OG previews.
 * No overlays — raw page render only.
 *
 * Usage:
 *   OG_BASE_URL=https://www.softreetechnology.com npm run generate:og
 *   OG_BASE_URL=http://localhost:3000 npm run generate:og   (dev server must be running)
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer'
import { createClient } from '@sanity/client'
import { STATIC_OG_ROUTES, routeToOgFilename } from './og-routes.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT_DIR = path.join(__dirname, '../public/og/pages')
const OG_SIZE = 1200
const BASE_URL = (process.env.OG_BASE_URL || 'https://www.softreetechnology.com').replace(/\/$/, '')

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '1zmh4sfw'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-05-21'

fs.mkdirSync(OUT_DIR, { recursive: true })

async function fetchDynamicRoutes() {
  const client = createClient({ projectId, dataset, apiVersion, useCdn: true })
  const [caseSlugs, postSlugs] = await Promise.all([
    client.fetch(
      `*[_type == "caseStudy" && defined(slug.current) && coalesce(status, "published") == "published"].slug.current`,
    ),
    client.fetch(
      `*[_type == "post" && defined(slug.current) && coalesce(status, "published") == "published"].slug.current`,
    ),
  ])

  const dynamic = []
  for (const slug of caseSlugs || []) dynamic.push(`/case-studies/${slug}`)
  for (const slug of postSlugs || []) dynamic.push(`/blog/${slug}`)
  return dynamic
}

async function capturePage(page, route) {
  const url = `${BASE_URL}${route}`
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 120000 })
  await page.evaluate(() => window.scrollTo(0, 0))
  await new Promise((r) => setTimeout(r, 800))

  const filename = `${routeToOgFilename(route)}.png`
  const outPath = path.join(OUT_DIR, filename)

  await page.screenshot({
    path: outPath,
    type: 'png',
    clip: { x: 0, y: 0, width: OG_SIZE, height: OG_SIZE },
  })

  return { route, filename, outPath }
}

async function main() {
  const dynamicRoutes = await fetchDynamicRoutes()
  const routes = [...new Set([...STATIC_OG_ROUTES, ...dynamicRoutes])]

  console.log(`📸  OG screenshots — ${routes.length} routes @ ${BASE_URL} (${OG_SIZE}×${OG_SIZE})`)

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  const page = await browser.newPage()
  await page.setViewport({
    width: OG_SIZE,
    height: OG_SIZE,
    deviceScaleFactor: 1,
  })
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
  )

  const manifest = []
  let failed = 0

  for (const route of routes) {
    try {
      const result = await capturePage(page, route)
      manifest.push({
        route,
        file: `/og/pages/${result.filename}`,
        width: OG_SIZE,
        height: OG_SIZE,
      })
      console.log(`✅  ${route} → og/pages/${result.filename}`)
    } catch (error) {
      failed++
      console.error(`❌  ${route}: ${error instanceof Error ? error.message : error}`)
    }
  }

  await browser.close()

  const manifestPath = path.join(__dirname, '../public/og/manifest.json')
  fs.mkdirSync(path.dirname(manifestPath), { recursive: true })
  fs.writeFileSync(
    manifestPath,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        baseUrl: BASE_URL,
        size: OG_SIZE,
        count: manifest.length,
        routes: manifest,
      },
      null,
      2,
    ),
  )

  // Legacy root filenames (home / section indexes)
  const legacy = [
    ['home', 'og-image.png'],
    ['case-studies', 'og-case-studies.png'],
    ['blog', 'og-blog.png'],
  ]
  const publicDir = path.join(__dirname, '../public')
  for (const [src, dest] of legacy) {
    const srcPath = path.join(OUT_DIR, `${src}.png`)
    const destPath = path.join(publicDir, dest)
    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destPath)
      console.log(`↪   copied og/pages/${src}.png → ${dest}`)
    }
  }

  console.log(`\nDone — ${manifest.length} OK, ${failed} failed. Manifest: public/og/manifest.json`)
  process.exit(failed > 0 ? 1 : 0)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
