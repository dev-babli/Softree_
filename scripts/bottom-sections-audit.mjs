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
  await page.waitForFunction(() => !document.querySelector(".k2-loader"), { timeout: 20000 }).catch(() => {})

  const scrollTo = async (sel, offset = 120) => {
    await page.evaluate((selector, topOffset) => {
      const el = document.querySelector(selector)
      if (!el) return
      window.scrollTo({ top: window.scrollY + el.getBoundingClientRect().top - topOffset, behavior: "instant" })
    }, sel, offset)
    await new Promise((r) => setTimeout(r, 1200))
  }

  await scrollTo(".k2-demo-video", 80)
  const demoBefore = await page.evaluate(() => {
    const play = document.querySelector("#custom-play")
    const r = play?.getBoundingClientRect()
    const hit = r ? document.elementFromPoint(r.left + 12, r.top + 12) : null
    return {
      iframe: !!document.querySelector("#vimeo-player"),
      play: !!play,
      playHit: hit?.id || String(hit?.className || "").slice(0, 40),
      vimeo: !!window.Vimeo,
    }
  })
  await page.click("#custom-play").catch(() => {})
  await new Promise((r) => setTimeout(r, 700))
  const demoAfter = await page.evaluate(() => ({
    playHidden: document.querySelector("#custom-play")?.classList.contains("hidden"),
    progress: document.querySelector("#video-progress-container")?.classList.contains("show"),
  }))

  await scrollTo(".k2-section-scroll-tabs", 80)
  const scrollBefore = await page.evaluate(() => {
    const sec = document.querySelector(".k2-section-scroll-tabs")
    const links = [...document.querySelectorAll(".k2-scroll-tabs-menu-link")]
    return {
      links: links.length,
      active: links.find((l) => l.classList.contains("w--current"))?.textContent?.trim().slice(0, 40),
      pin: !!document.querySelector(".pin-spacer"),
      secW: Math.round(sec?.getBoundingClientRect().width || 0),
      gsap: !!window.gsap,
      st: !!window.ScrollTrigger,
    }
  })
  await page.evaluate(() => document.querySelectorAll(".k2-scroll-tabs-menu-link")[1]?.click())
  await new Promise((r) => setTimeout(r, 800))
  const scrollAfter = await page.evaluate(() => ({
    active: [...document.querySelectorAll(".k2-scroll-tabs-menu-link")]
      .find((l) => l.classList.contains("w--current"))
      ?.textContent?.trim()
      .slice(0, 40),
    panes: document.querySelectorAll(".k2-scroll-tabs-content-pane.w--tab-active").length,
  }))

  await scrollTo("#get-started", 100)
  for (let i = 0; i < 4; i++) {
    await page.evaluate(() => window.dispatchEvent(new Event("scroll")))
    await new Promise((r) => setTimeout(r, 200))
  }
  const getStarted = await page.evaluate(() => {
    const c = document.querySelector(".k2-container-prefooter")
    const heading = document.querySelector("#get-started [data-scroll]")
    return {
      containerOn: c?.classList.contains("on"),
      headingOn: heading?.classList.contains("on"),
      pluses: document.querySelectorAll(".k2-pluses use").length,
      cta: document.querySelector(".k2-prefooter-panel a")?.textContent?.trim().slice(0, 30),
    }
  })

  console.log(JSON.stringify({ demoBefore, demoAfter, scrollBefore, scrollAfter, getStarted }, null, 2))
} finally {
  await browser.close()
}
