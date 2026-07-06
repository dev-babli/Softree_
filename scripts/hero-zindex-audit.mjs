import puppeteer from "puppeteer"

const URL = "http://localhost:3001/kore-ai-component?replay-loader=1"

const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] })
try {
  const page = await browser.newPage()
  await page.evaluateOnNewDocument(() => localStorage.removeItem("k2LoaderPlayedAt"))
  await page.setViewport({ width: 1536, height: 960 })
  await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 90000 })
  await page.waitForFunction(
    () => document.querySelector(".kore-ai-exact-shell")?.classList.contains("kore-ai-intro-complete"),
    { timeout: 25000 },
  )
  await new Promise((r) => setTimeout(r, 1500))

  const audit = await page.evaluate(() => {
    const hero = document.querySelector("#meet-artemis")
    const layers = [
      ".k2-bg",
      ".k2-overlay",
      ".k2-container-hero",
      ".k2-container-hero-2",
      '[data-stagger="300"] h1',
      '[data-flip-target="loader"]',
    ]
    return Object.fromEntries(
      layers.map((sel) => {
        const el = hero?.querySelector(sel)
        if (!el) return [sel, null]
        const cs = getComputedStyle(el)
        const r = el.getBoundingClientRect()
        return [
          sel,
          {
            z: cs.zIndex,
            pos: cs.position,
            opacity: cs.opacity,
            y: Math.round(r.y),
            h: Math.round(r.height),
          },
        ]
      }),
    )
  })
  console.log(JSON.stringify(audit, null, 2))

  // pixel sample at h1 center
  const sample = await page.evaluate(() => {
    const h1 = document.querySelector('#meet-artemis [data-stagger="300"] h1')
    if (!h1) return null
    const r = h1.getBoundingClientRect()
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    return { x: r.x + r.width / 2, y: r.y + r.height / 2, text: h1.textContent?.slice(0, 40) }
  })
  console.log("h1 sample point", sample)

  await page.screenshot({ path: ".planning/page-forge/kore-ai-exact/hero-settled-audit/settled3.png", fullPage: true })
} finally {
  await browser.close()
}
