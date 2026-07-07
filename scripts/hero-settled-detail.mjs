import puppeteer from "puppeteer"

const URL = "http://localhost:3001/agentic-ai-platform?replay-loader=1"

const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] })
try {
  const page = await browser.newPage()
  await page.evaluateOnNewDocument(() => localStorage.removeItem("k2LoaderPlayedAt"))
  await page.setViewport({ width: 1536, height: 960 })
  await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 90000 })
  await page.waitForFunction(
    () => document.querySelector(".softree-agentic-shell")?.classList.contains("softree-agentic-intro-complete"),
    { timeout: 25000 },
  )
  await new Promise((r) => setTimeout(r, 1500))

  const audit = await page.evaluate(() => {
    const hero = document.querySelector("#meet-artemis")
    const read = (el) => {
      if (!el) return null
      const r = el.getBoundingClientRect()
      const cs = getComputedStyle(el)
      return {
        text: (el.textContent || "").trim().slice(0, 80),
        rect: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) },
        opacity: cs.opacity,
        vis: cs.visibility,
        display: cs.display,
        color: cs.color,
        fontSize: cs.fontSize,
        transform: cs.transform,
        clip: cs.clipPath,
        overflow: cs.overflow,
      }
    }
    const pill = hero?.querySelector(".k2-container-hero > .k2-hero > .k2-text")
    const h1 = hero?.querySelector('[data-stagger="300"] h1')
    const flip = hero?.querySelector('[data-flip-target="loader"]')
    const chars = Array.from(hero?.querySelectorAll(".char") ?? []).slice(0, 8).map((el, i) => ({
      i,
      t: el.textContent,
      opacity: getComputedStyle(el).opacity,
    }))
    return {
      shell: document.querySelector(".softree-agentic-shell")?.className,
      pill: read(pill),
      h1: read(h1),
      flip: read(flip),
      chars,
      staggerOn: hero?.querySelector('[data-stagger="300"]')?.className,
    }
  })
  console.log(JSON.stringify(audit, null, 2))
  await page.screenshot({ path: ".planning/page-forge/softree-agentic-exact/hero-settled-audit/settled2.png" })
} finally {
  await browser.close()
}
