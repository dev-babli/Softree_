import puppeteer from "puppeteer"

const URL = "http://localhost:3001/agentic-ai-platform?replay-loader=1"

const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] })
try {
  const page = await browser.newPage()
  await page.evaluateOnNewDocument(() => localStorage.removeItem("k2LoaderPlayedAt"))
  await page.setViewport({ width: 1536, height: 960 })
  await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 90000 })
  await page.waitForFunction(
    () => document.querySelector(".softree-agentic-shell")?.classList.contains("softree-agentic-intro-complete"),
    { timeout: 25000 },
  )
  await new Promise((r) => setTimeout(r, 1000))

  const check = await page.evaluate(() => {
    const bg = document.querySelector("#meet-artemis .k2-bg")
    const img = document.querySelector("#meet-artemis .k2-bg .k2-img")
    const h1 = document.querySelector("#meet-artemis h1")
    if (!bg || !img) return { ok: false, reason: "missing nodes" }
    const bs = getComputedStyle(bg)
    const is = getComputedStyle(img)
    const hs = h1 ? getComputedStyle(h1) : null
    const rect = img.getBoundingClientRect()
    return {
      ok:
        Number(bs.opacity) >= 0.85 &&
        Number(is.opacity) >= 0.85 &&
        rect.width > 200 &&
        rect.height > 200 &&
        (hs ? Number(hs.opacity) >= 0.85 : true),
      bg: { opacity: bs.opacity, z: bs.zIndex, w: Math.round(rect.width), h: Math.round(rect.height) },
      h1Opacity: hs?.opacity ?? null,
      src: img.getAttribute("src")?.slice(-40),
    }
  })

  await page.screenshot({
    path: ".planning/page-forge/softree-agentic-exact/hero-bg-fix-check.png",
    clip: { x: 0, y: 0, width: 1536, height: 960 },
  })
  console.log(JSON.stringify(check, null, 2))
  if (!check.ok) process.exit(1)
} finally {
  await browser.close()
}
