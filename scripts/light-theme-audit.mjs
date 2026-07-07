import puppeteer from "puppeteer"

const URL = "http://localhost:3001/agentic-ai-platform"
const sections = [
  { id: "ai-agents", probes: [".k2-tabs-btn.on", ".k2-tabs-panel-agents.on h2", ".k2-agents-content p", ".k2-agents-panel .k2-img-wrapper:last-child img"] },
  { id: "ai-programmable", probes: [".k2-orbit-sticky", ".k2-orbit-arch", ".k2-orbit-button", "#get-to-roi-faster"] },
  { id: "pillars", probes: [".k2-eyebrow", ".k2-pillars-row", "#abl", "#arch"] },
]

const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] })
try {
  const page = await browser.newPage()
  await page.setViewport({ width: 1536, height: 960 })
  await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 90000 })
  await page.waitForSelector(".softree-agentic-shell", { timeout: 15000 })
  await new Promise((r) => setTimeout(r, 1500))

  const report = {}
  for (const sec of sections) {
    await page.evaluate((id) => {
      const el = document.querySelector(`#${id}`)
      if (!el) return
      const top = window.scrollY + el.getBoundingClientRect().top - 80
      window.scrollTo(0, Math.max(0, top))
    }, sec.id)
    await new Promise((r) => setTimeout(r, 1200))

    report[sec.id] = await page.evaluate((id, probes) => {
      const section = document.querySelector(`#${id}`)
      const themeWrap = section?.closest(".k2-theme-light")
      const read = (sel) => {
        const el = section?.querySelector(sel)
        if (!el) return { missing: sel }
        const cs = getComputedStyle(el)
        const r = el.getBoundingClientRect()
        return {
          text: (el.textContent || "").trim().slice(0, 60),
          opacity: cs.opacity,
          vis: cs.visibility,
          display: cs.display,
          w: Math.round(r.width),
          h: Math.round(r.height),
          on: el.classList.contains("on"),
        }
      }
      const themeCs = themeWrap ? getComputedStyle(themeWrap) : null
      return {
        bodyTheme: document.body.getAttribute("data-theme"),
        themeWrapOpacity: themeCs?.opacity ?? null,
        scrollOn: section?.querySelector("[data-scroll]")?.classList.contains("on"),
        probes: Object.fromEntries(probes.map((p) => [p, read(p)])),
      }
    }, sec.id, sec.probes)
  }

  console.log(JSON.stringify(report, null, 2))
} finally {
  await browser.close()
}
