import puppeteer from "puppeteer"

const url = process.env.AIH_URL || "http://localhost:3000/ai-home?replay-loader=1"
const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] })
const page = await browser.newPage()
const errors = []
page.on("pageerror", (e) => errors.push("PAGEERR: " + e.message))
page.on("console", (m) => {
  if (m.type() === "error") errors.push("CONSOLE: " + m.text())
})
await page.setViewport({ width: 1440, height: 900 })
await page.goto(url, { waitUntil: "networkidle2", timeout: 120000 })
await new Promise((r) => setTimeout(r, 5000))

// Scroll to industries section
await page.evaluate(() => {
  const el = document.querySelector("#content")
  if (el) el.scrollIntoView({ behavior: "instant", block: "center" })
})
await new Promise((r) => setTimeout(r, 2500))

const info = await page.evaluate(() => {
  const w = window
  const swiperEl = document.querySelector("#content .swiper")
  const text = document.body.innerText.toLowerCase()
  return {
    ready: document.documentElement.classList.contains("ready"),
    hasGsap: typeof w.gsap !== "undefined",
    hasLenis: typeof w.Lenis !== "undefined",
    scrollTriggers: w.ScrollTrigger?.getAll?.().length ?? null,
    industryTabs: document.querySelectorAll("#content .tab-btn").length,
    slides: document.querySelectorAll("#content .swiper-slide").length,
    swiperInit: !!(swiperEl && swiperEl.classList.contains("swiper-initialized")),
    caps: document.querySelectorAll("#content .connect-cap").length,
    borrowedLogos: ["morgan", "pfizer", "roche", "deutsche", "metlife", "aegon"].filter((x) => text.includes(x)),
    hasKore: text.includes("kore"),
  }
})

console.log("INFO:", JSON.stringify(info, null, 2))
console.log("ERRORS:", errors.length ? errors.slice(0, 20).join("\n") : "none")
await page.screenshot({ path: "scripts/_ai-home-shot.png", fullPage: false })
console.log("screenshot saved")
await browser.close()
