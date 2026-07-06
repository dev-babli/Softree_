import fs from "node:fs"
import path from "node:path"
import puppeteer from "puppeteer"

const OUT = path.resolve(".planning/page-forge/kore-ai-exact/loader-layout-audit")
fs.mkdirSync(OUT, { recursive: true })

const LOCAL = process.env.LOADER_AUDIT_URL || "http://localhost:3001/kore-ai-component?replay-loader=1"
const REF = "https://www.kore.ai/ai-agent-platform"

async function measure(page, label) {
  await page.evaluateOnNewDocument(() => localStorage.removeItem("k2LoaderPlayedAt"))
  await page.setViewport({ width: 1536, height: 960 })
  await page.goto(label === "local" ? LOCAL : REF, { waitUntil: "domcontentloaded", timeout: 90000 })

  if (label === "local") {
    await page.waitForSelector(".k2-loader.step-0", { timeout: 15000 })
    await new Promise((r) => setTimeout(r, 1200))
  } else {
    await page.waitForSelector(".k2-loader", { timeout: 15000 })
    await page.evaluate(() => {
      const loader = document.querySelector(".k2-loader")
      if (loader) {
        loader.style.display = "flex"
        loader.classList.add("step-0")
      }
    })
    await new Promise((r) => setTimeout(r, 800))
  }

  const metrics = await page.evaluate(() => {
    const loader = document.querySelector(".k2-loader")
    const heading = loader?.querySelector(".k2-heading")
    const bar = loader?.querySelector(".k2-loader-bar-item")
    const meet = heading?.querySelector("p > :first-child")
    const p = heading?.querySelector("p")
    const rect = (el) => {
      if (!el) return null
      const r = el.getBoundingClientRect()
      const cs = getComputedStyle(el)
      return {
        x: Math.round(r.x),
        y: Math.round(r.y),
        w: Math.round(r.width),
        h: Math.round(r.height),
        fontSize: cs.fontSize,
        lineHeight: cs.lineHeight,
        fontFamily: cs.fontFamily.slice(0, 40),
        position: cs.position,
        transform: cs.transform,
        variant: heading?.className.match(/w-variant-[a-f0-9-]+/)?.[0] ?? null,
        dataVariant: heading?.getAttribute("data-wf--heading--variant"),
      }
    }
    return {
      viewport: { w: innerWidth, h: innerHeight },
      loader: rect(loader),
      heading: rect(heading),
      meet: rect(meet),
      paragraph: rect(p),
      bar: rect(bar),
    }
  })

  await page.screenshot({ path: path.join(OUT, `${label}-step0.png`) })
  return metrics
}

const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] })
try {
  const page = await browser.newPage()
  const local = await measure(page, "local")
  const ref = await measure(page, "ref")

  const report = { local, ref, deltas: {} }
  for (const key of ["heading", "meet", "bar"]) {
    const l = local[key]
    const r = ref[key]
    if (l && r) {
      report.deltas[key] = {
        x: l.x - r.x,
        y: l.y - r.y,
        w: l.w - r.w,
        h: l.h - r.h,
        fontSize: l.fontSize === r.fontSize ? "match" : `${l.fontSize} vs ${r.fontSize}`,
      }
    }
  }

  fs.writeFileSync(path.join(OUT, "report.json"), JSON.stringify(report, null, 2))
  console.log(JSON.stringify(report, null, 2))
} finally {
  await browser.close()
}
