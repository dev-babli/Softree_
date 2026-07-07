import fs from "node:fs"
import path from "node:path"
import puppeteer from "puppeteer"

const OUT = path.resolve(".planning/page-forge/softree-agentic-exact/hero-timeline-audit")
fs.mkdirSync(OUT, { recursive: true })
const URL = "http://localhost:3001/agentic-ai-platform?replay-loader=1"

const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] })
try {
  const page = await browser.newPage()
  await page.evaluateOnNewDocument(() => localStorage.removeItem("k2LoaderPlayedAt"))
  await page.setViewport({ width: 1536, height: 960 })
  await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 90000 })

  const times = [500, 1000, 1500, 2000, 2500, 3000, 4000, 6000, 10000]
  const timeline = []

  for (const ms of times) {
    await new Promise((r) => setTimeout(r, ms === times[0] ? ms : ms - times[times.indexOf(ms) - 1]))
    const snap = await page.evaluate(() => {
      const hero = document.querySelector("#meet-artemis")
      const read = (sel) => {
        const el = hero?.querySelector(sel)
        if (!el) return null
        const cs = getComputedStyle(el)
        return { opacity: cs.opacity, vis: cs.visibility, text: (el.textContent || "").trim().slice(0, 40) }
      }
      return {
        t: performance.now(),
        shell: document.querySelector(".softree-agentic-shell")?.className,
        heroClass: hero?.className,
        htmlClass: document.documentElement.className,
        loader: !!document.querySelector(".k2-loader"),
        pill: read(".k2-container-hero > .k2-hero > .k2-text"),
        flip: read('[data-flip-target="loader"]'),
        h1: read('[data-stagger="300"] h1'),
        body: read(".k2-container-hero-2 .k2-text"),
      }
    })
    timeline.push(snap)
    await page.screenshot({ path: path.join(OUT, `t-${ms}ms.png`) })
  }

  fs.writeFileSync(path.join(OUT, "timeline.json"), JSON.stringify(timeline, null, 2))
  console.log(JSON.stringify(timeline, null, 2))
} finally {
  await browser.close()
}
