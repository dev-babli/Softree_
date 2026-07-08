import fs from "node:fs"
import path from "node:path"
import puppeteer from "puppeteer"

const OUT = path.resolve(".planning/page-forge/softree-agentic-exact/hero-settled-audit")
fs.mkdirSync(OUT, { recursive: true })
const URL = process.env.HERO_AUDIT_URL || "http://localhost:3001/agentic-ai-platform?replay-loader=1"

const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] })
try {
  const page = await browser.newPage()
  await page.evaluateOnNewDocument(() => localStorage.removeItem("k2LoaderPlayedAt"))
  await page.setViewport({ width: 1536, height: 960 })
  await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 90000 })
  await page.waitForFunction(
    () => document.querySelector(".softree-agentic-shell")?.classList.contains("softree-agentic-intro-complete"),
    { timeout: 20000 },
  )
  await new Promise((r) => setTimeout(r, 2000))

  const audit = await page.evaluate(() => {
    const hero = document.querySelector("#meet-artemis")
    const shell = document.querySelector(".softree-agentic-shell")
    const probes = [
      { id: "pill", sel: ".k2-container-hero > .k2-hero > .k2-text" },
      { id: "flip", sel: '[data-flip-target="loader"]' },
      { id: "meet", sel: '[data-flip-target="loader"] p > :first-child' },
      { id: "em", sel: '[data-flip-target="loader"] em' },
      { id: "h1", sel: '[data-stagger="300"] h1' },
      { id: "sub", sel: '[data-stagger="300"] em' },
      { id: "body", sel: ".k2-container-hero-2 .k2-text" },
      { id: "cta", sel: ".k2-cta-text" },
      { id: "tabs", sel: ".k2-tabs" },
    ]
    const read = (el) => {
      if (!el) return null
      const r = el.getBoundingClientRect()
      const cs = getComputedStyle(el)
      return {
        text: (el.textContent || "").trim().slice(0, 60),
        x: Math.round(r.x),
        y: Math.round(r.y),
        w: Math.round(r.width),
        h: Math.round(r.height),
        opacity: cs.opacity,
        visibility: cs.visibility,
        display: cs.display,
        transform: cs.transform,
      }
    }
    return {
      shellClass: shell?.className ?? null,
      heroClass: hero?.className ?? null,
      htmlClass: document.documentElement.className,
      probes: Object.fromEntries(
        probes.map((p) => [p.id, read(hero?.querySelector(p.sel) ?? null)]),
      ),
      charOpacity: Array.from(hero?.querySelectorAll(".char") ?? []).slice(0, 20).map((el, i) => ({
        i,
        text: el.textContent,
        opacity: getComputedStyle(el).opacity,
        parent: el.parentElement?.className,
      })),
    }
  })

  fs.writeFileSync(path.join(OUT, "audit.json"), JSON.stringify(audit, null, 2))
  await page.screenshot({ path: path.join(OUT, "settled.png") })
  console.log(JSON.stringify(audit, null, 2))
} finally {
  await browser.close()
}
