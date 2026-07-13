#!/usr/bin/env node
/**
 * Full-page /client QA — broken images, missing section ids, invisible light text on light sections.
 * Usage: node scripts/client-page-audit.mjs [baseUrl]
 */
const baseUrl = process.argv[2] ?? "http://localhost:3000/client"

async function main() {
  const puppeteer = await import("puppeteer").catch(() => null)
  if (!puppeteer) {
    console.error("puppeteer not installed — use Chrome DevTools audit instead")
    process.exit(2)
  }

  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 900 })
  await page.goto(baseUrl, { waitUntil: "networkidle2", timeout: 60000 })

  const sectionIds = [
    "home-hero",
    "home-about",
    "home-industries-ticker",
    "home-industries",
    "home-services",
    "home-process",
    "home-testimonials",
    "home-stats",
    "home-case-study",
    "home-pricing",
    "home-faq",
    "home-blog",
    "home-contact",
  ]

  const report = await page.evaluate(async (ids) => {
    const broken = []
    const missingIds = []
    const lightSections = ["home-hero", "home-about", "home-industries-ticker", "home-services", "home-pricing", "home-faq", "home-blog"]

    for (const id of ids) {
      const el = document.getElementById(id)
      if (!el) {
        missingIds.push(id)
        continue
      }
      el.scrollIntoView({ block: "center" })
      await new Promise((r) => setTimeout(r, 200))
    }

    document.querySelectorAll("img").forEach((img) => {
      if (!img.src || img.src.startsWith("data:")) return
      if (img.complete && img.naturalWidth === 0) {
        broken.push(img.src.replace(location.origin, ""))
      }
    })

    const invisible = []
    for (const id of lightSections) {
      const root = document.getElementById(id)
      if (!root) continue
      root.querySelectorAll(".framer-text, .cx-local-time").forEach((el) => {
        const cs = getComputedStyle(el)
        const m = cs.color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
        if (!m || !el.textContent?.trim()) return
        const lum = 0.299 * +m[1] + 0.587 * +m[2] + 0.114 * +m[3]
        if (lum > 220) invisible.push({ section: id, text: el.textContent.trim().slice(0, 50), color: cs.color })
      })
    }

    return { broken: [...new Set(broken)], missingIds, invisible: invisible.slice(0, 20) }
  }, sectionIds)

  console.log(JSON.stringify(report, null, 2))
  await browser.close()
  process.exit(report.broken.length || report.missingIds.length || report.invisible.length ? 1 : 0)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
