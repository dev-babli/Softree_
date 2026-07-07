import puppeteer from "puppeteer"

const LOCAL = "http://localhost:3001/agentic-ai-platform?replay-loader=1"
const REF = "https://www.softreetechnology.com/ai-agent-platform"

async function readHero(page, waitIntro = false) {
  if (waitIntro) {
    await page.evaluateOnNewDocument(() => localStorage.removeItem("k2LoaderPlayedAt"))
    await page.goto(LOCAL, { waitUntil: "domcontentloaded", timeout: 90000 })
    await page
      .waitForFunction(
        () => document.querySelector(".softree-agentic-shell")?.classList.contains("softree-agentic-intro-complete"),
        { timeout: 15000 },
      )
      .catch(() => {})
    await new Promise((r) => setTimeout(r, 500))
  } else {
    await page.goto(REF, { waitUntil: "networkidle2", timeout: 90000 })
    await new Promise((r) => setTimeout(r, 2000))
  }

  return page.evaluate(() => {
    const hero = document.querySelector("#meet-artemis")
    const q = (sel) => {
      const el = hero?.querySelector(sel)
      if (!el) return null
      const s = getComputedStyle(el)
      const r = el.getBoundingClientRect()
      return {
        text: el.textContent?.replace(/\s+/g, " ").trim().slice(0, 60),
        fontSize: s.fontSize,
        lineHeight: s.lineHeight,
        letterSpacing: s.letterSpacing,
        fontWeight: s.fontWeight,
        color: s.color,
        top: Math.round(r.top),
        left: Math.round(r.left),
        w: Math.round(r.width),
        h: Math.round(r.height),
      }
    }
    return {
      pill: q(".k2-container-hero > .k2-hero > .k2-text"),
      flip: q('[data-flip-target="loader"]'),
      h1: q("h1"),
      sub: q('[data-stagger="300"] p em'),
      body: q(".k2-container-hero-2 .k2-text"),
      cta: q(".k2-container-hero-2 .k2-cta"),
    }
  })
}

const browser = await puppeteer.launch({ headless: true })
const page = await browser.newPage()
await page.setViewport({ width: 1536, height: 960 })

const local = await readHero(page, true)
const refPage = await browser.newPage()
await refPage.setViewport({ width: 1536, height: 960 })
const ref = await readHero(refPage, false)

function delta(a, b) {
  if (!a || !b) return { error: "missing" }
  return {
    top: a.top - b.top,
    left: a.left - b.left,
    w: a.w - b.w,
    h: a.h - b.h,
    fontSize: a.fontSize === b.fontSize ? 0 : `${a.fontSize} vs ${b.fontSize}`,
  }
}

const probes = ["pill", "flip", "h1", "sub", "body", "cta"]
const report = {}
for (const p of probes) {
  report[p] = { local: local[p], ref: ref[p], delta: delta(local[p], ref[p]) }
}

console.log(JSON.stringify(report, null, 2))
await browser.close()
