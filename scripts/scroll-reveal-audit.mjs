import puppeteer from "puppeteer"

const URL = process.env.SCROLL_AUDIT_URL || "http://localhost:3001/agentic-ai-platform"

const probes = [
  {
    id: "enterprise-ai-outcomes",
    label: "delivers certainty",
    selector: "#enterprise-ai-outcomes .k2-cards-footer [data-split]",
  },
  {
    id: "enterprise-ai-outcomes",
    label: "what Artemis changes",
    selector: "#enterprise-ai-outcomes .k2-cards-header [data-split]",
  },
  {
    id: "ai-agents",
    label: "agents tabs",
    selector: "#ai-agents [data-scroll]",
  },
  {
    id: "pillars",
    label: "pillars row",
    selector: "#pillars .k2-pillars-row[data-scroll]",
  },
]

const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] })
try {
  const page = await browser.newPage()
  await page.setViewport({ width: 1536, height: 960 })
  await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 90000 })
  await page.waitForSelector(".softree-agentic-shell", { timeout: 15000 })
  await new Promise((r) => setTimeout(r, 2000))

  const report = {}

  for (const probe of probes) {
    await page.evaluate(() => window.scrollTo(0, 0))
    await new Promise((r) => setTimeout(r, 400))

    const before = await page.evaluate((selector) => {
      const el = document.querySelector(selector)
      if (!el) return { missing: selector }
      const line = el.querySelector(".line")
      const beforeEl = line?.querySelector("::before")
      const cs = line ? getComputedStyle(line, "::before") : null
      return {
        hasOn: el.classList.contains("on"),
        lineCount: el.querySelectorAll(".line").length,
        lineOpacity: line ? getComputedStyle(line).opacity : null,
        maskScale: cs?.transform ?? null,
        text: (el.textContent || "").trim().slice(0, 50),
      }
    }, probe.selector)

    await page.evaluate((selector, sectionId) => {
      const el = document.querySelector(selector) ?? document.querySelector(`#${sectionId}`)
      if (!el) return
      const top = window.scrollY + el.getBoundingClientRect().top - window.innerHeight * 0.35
      window.scrollTo(0, Math.max(0, top))
    }, probe.selector, probe.id)
    await new Promise((r) => setTimeout(r, 1500))

    const after = await page.evaluate((selector) => {
      const el = document.querySelector(selector)
      if (!el) return { missing: selector }
      const line = el.querySelector(".line")
      const cs = line ? getComputedStyle(line, "::before") : null
      return {
        hasOn: el.classList.contains("on"),
        lineCount: el.querySelectorAll(".line").length,
        lineOpacity: line ? getComputedStyle(line).opacity : null,
        maskScale: cs?.transform ?? null,
        text: (el.textContent || "").trim().slice(0, 50),
      }
    }, probe.selector)

    report[probe.label] = { before, after }
  }

  console.log(JSON.stringify(report, null, 2))
} finally {
  await browser.close()
}
