import puppeteer from "puppeteer"

const URL = process.env.BUILD_AUDIT_URL || "http://localhost:3000/agentic-ai-platform"

const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] })
try {
  const page = await browser.newPage()
  await page.setViewport({ width: 1536, height: 960 })
  await page.evaluateOnNewDocument(() => {
    localStorage.setItem("k2LoaderPlayedAt", String(Date.now()))
  })
  await page.goto(URL, { waitUntil: "networkidle2", timeout: 120000 })
  await page.waitForFunction(() => !document.querySelector(".k2-loader"), { timeout: 25000 }).catch(() => {})
  await new Promise((r) => setTimeout(r, 2000))

  const snap = async (label, scrollY) => {
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), scrollY)
    await new Promise((r) => setTimeout(r, 700))
    return page.evaluate((lbl) => {
      const info = (el) => {
        if (!el) return null
        const r = el.getBoundingClientRect()
        const cs = getComputedStyle(el)
        return {
          top: Math.round(r.top),
          bottom: Math.round(r.bottom),
          h: Math.round(r.height),
          w: Math.round(r.width),
          op: cs.opacity,
          vis: cs.visibility,
          display: cs.display,
          transform: cs.transform?.slice(0, 60),
        }
      }
      const main = document.querySelector(".k2-main")
      const kids = main
        ? Array.from(main.children).map((c, i) => ({
            i,
            tag: c.tagName,
            id: c.id || "",
            cls: (c.className || "").toString().slice(0, 50),
            ...info(c),
          }))
        : []
      const demo = document.querySelector(".k2-demo-video")
      const demoSec = demo?.closest("section")
      const tabs = document.querySelector(".k2-section-scroll-tabs")
      const pin = document.querySelector(".pin-spacer")
      const build = document.querySelector("#build-scale-optimize")
      const getStarted = document.querySelector("#get-started")
      const center = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2)
      return {
        label: lbl,
        scrollY: Math.round(window.scrollY),
        bodyH: document.body.scrollHeight,
        centerEl: center ? `${center.tagName}.${(center.className || "").toString().slice(0, 40)}` : null,
        build: info(build),
        demoSec: info(demoSec),
        demo: info(demo),
        tabs: info(tabs),
        pin: info(pin),
        getStarted: info(getStarted),
        kids,
      }
    }, label)
  }

  const offsets = await page.evaluate(() => ({
    build: document.querySelector("#build-scale-optimize")?.offsetTop ?? 0,
    demo: document.querySelector(".k2-demo-video")?.closest("section")?.offsetTop ?? 0,
    tabs: document.querySelector(".k2-section-scroll-tabs")?.offsetTop ?? 0,
    getStarted: document.querySelector("#get-started")?.offsetTop ?? 0,
  }))

  const results = []
  for (const [name, y] of [
    ["build-end", offsets.build + 800],
    ["demo-start", offsets.demo - 80],
    ["demo-mid", offsets.demo + 400],
    ["tabs-start", offsets.tabs - 80],
    ["tabs-mid", offsets.tabs + 2000],
    ["get-started", offsets.getStarted - 80],
  ]) {
    results.push(await snap(name, y))
  }

  console.log(JSON.stringify({ offsets, results }, null, 2))
} finally {
  await browser.close()
}
