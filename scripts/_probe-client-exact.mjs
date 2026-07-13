import puppeteer from "puppeteer"

const url = process.env.CX_URL || "http://localhost:3000/client"
const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] })
const page = await browser.newPage()
const errors = []
page.on("pageerror", (e) => errors.push("PAGEERR: " + e.message.slice(0, 200)))
page.on("console", (m) => {
  if (m.type() === "error") errors.push("CONSOLE: " + m.text().slice(0, 200))
})
await page.setViewport({ width: 1440, height: 900 })
await page.goto(url, { waitUntil: "domcontentloaded", timeout: 120000 })
await new Promise((r) => setTimeout(r, 4000))

const info = await page.evaluate(() => {
  const text = document.body.innerText
  return {
    title: document.title,
    hasHero: !!document.querySelector('#home-hero, [data-framer-name="Section Hero"]'),
    hasLogos: !!document.querySelector('[data-framer-name="Section Logos"]'),
    hasAbout: !!document.querySelector('#home-about, [data-framer-name="Section About"]'),
    hasPortfolio: !!document.querySelector('[data-framer-name="Section Portfolio"]'),
    hasPricing: !!document.querySelector('#home-pricing, [data-framer-name="Section Pricing"]'),
    hasFaq: !!document.querySelector('[data-framer-name="Section FAQ"]'),
    hasBlog: !!document.querySelector('[data-framer-name="Section Blog"]'),
    hasHanzaText: /I help founders|Hanza|Case Studies|What I Create/i.test(text),
    hasSoftreeRedesign: /We help enterprises turn AI ideas/i.test(text),
    framerSections: document.querySelectorAll("[data-framer-name^='Section ']").length,
    videoCount: document.querySelectorAll("video").length,
  }
})

console.log("INFO:", JSON.stringify(info, null, 2))
console.log("ERRORS:", errors.length ? errors.slice(0, 12).join("\n") : "none")
await page.screenshot({ path: "scripts/_client-exact-shot.png", fullPage: false })
console.log("screenshot saved")
await browser.close()
