import puppeteer from "puppeteer"

const URL = "http://localhost:3001/kore-ai-component?replay-loader=1"

const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] })
try {
  const page = await browser.newPage()
  await page.evaluateOnNewDocument(() => localStorage.removeItem("k2LoaderPlayedAt"))
  await page.setViewport({ width: 1536, height: 960 })
  await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 90000 })
  await page.waitForFunction(
    () => document.querySelector(".kore-ai-exact-shell")?.classList.contains("kore-ai-intro-complete"),
    { timeout: 25000 },
  )
  await new Promise((r) => setTimeout(r, 1500))
  await page.screenshot({
    path: ".planning/page-forge/kore-ai-exact/hero-settled-audit/settled-viewport.png",
    clip: { x: 0, y: 0, width: 1536, height: 960 },
  })
} finally {
  await browser.close()
}
