import puppeteer from "puppeteer"

const URL = process.env.BUILD_AUDIT_URL || "http://localhost:3000/kore-ai-component"

const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] })
try {
  const page = await browser.newPage()
  await page.setViewport({ width: 1536, height: 960 })
  await page.evaluateOnNewDocument(() => {
    localStorage.setItem("k2LoaderPlayedAt", String(Date.now()))
  })
  await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 120000 })
  await page.waitForSelector("#build-scale-optimize", { timeout: 20000 })
  await new Promise((r) => setTimeout(r, 2500))

  await page.evaluate(() => {
    const el = document.querySelector("#build-scale-optimize")
    const top = window.scrollY + el.getBoundingClientRect().top - 80
    window.scrollTo(0, Math.max(0, top))
  })
  await new Promise((r) => setTimeout(r, 1500))

  const report = await page.evaluate(() => {
    const section = document.querySelector("#build-scale-optimize")
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

    const outerTabs = section?.querySelector(".k2-tabs-2")
    const outerBtns = Array.from(section?.querySelectorAll(".k2-tabs-2 > .k2-tabs-menu > button") || [])
    const nestedTabs = section?.querySelectorAll(".k2-tabs-3").length
    const heading = section?.querySelector("[data-scroll][data-split]")

    return {
      bodyTheme: document.body.getAttribute("data-theme"),
      headingOn: heading?.classList.contains("on"),
      headingLines: heading?.querySelectorAll(".line").length ?? 0,
      bg: read(".k2-bg .k2-img"),
      heading: read(".k2-container-header-3 .k2-heading"),
      outerTabsInit: outerTabs?.dataset.k2Init,
      outerAutoplay: outerTabs?.hasAttribute("data-autoplay"),
      outerPlaying: outerTabs?.classList.contains("playing"),
      outerActive: outerBtns.find((b) => b.classList.contains("on"))?.textContent?.trim(),
      outerPanels: section?.querySelectorAll(".k2-tabs-panels-2 > .k2-tabs-panel").length,
      outerPanelOn: section?.querySelectorAll(".k2-tabs-panels-2 > .k2-tabs-panel.on").length,
      nestedTabGroups: nestedTabs,
      radarPanel: !!section?.querySelector(".radar-panel"),
      radarCanvas: !!section?.querySelector(".radar-panel canvas"),
      probes: {
        tab1: read("#tabs-3-tab-1-panel"),
        tab5: read("#tabs-3-tab-5-panel"),
        buildNested: read("#tabs-3-tab-1-panel .k2-tabs-3"),
      },
    }
  })

  // click Scale tab
  await page.click("#tabs-3-tab-2")
  await new Promise((r) => setTimeout(r, 800))

  const afterTab2 = await page.evaluate(() => ({
    active: document.querySelector("#tabs-3-tab-2")?.classList.contains("on"),
    panel2On: document.querySelector("#tabs-3-tab-2-panel")?.classList.contains("on"),
    panel1Inert: document.querySelector("#tabs-3-tab-1-panel")?.hasAttribute("inert"),
    panel2Text: document.querySelector("#tabs-3-tab-2-panel h3")?.textContent?.trim().slice(0, 40),
  }))

  await page.click("#tabs-3-tab-5")
  await new Promise((r) => setTimeout(r, 2500))

  const afterFoundation = await page.evaluate(() => ({
    panel5On: document.querySelector("#tabs-3-tab-5-panel")?.classList.contains("on"),
    radarSvg: !!document.querySelector("#radar-wrap svg"),
    radarPaths: document.querySelectorAll("#radar-wrap svg path").length,
  }))

  console.log(JSON.stringify({ atSection: report, afterTab2, afterFoundation }, null, 2))
} finally {
  await browser.close()
}
