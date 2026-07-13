import puppeteer from "puppeteer"

const b = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] })
const p = await b.newPage()
await p.setViewport({ width: 1600, height: 900 })
await p.goto("http://localhost:3000/client", { waitUntil: "networkidle2", timeout: 120000 })
await new Promise((r) => setTimeout(r, 4000))

await p.evaluate(() =>
  document.querySelector('[data-framer-name="Section FAQ"]')?.scrollIntoView({ block: "center" }),
)
await new Promise((r) => setTimeout(r, 500))

const result = await p.evaluate(() => {
  const first = document.querySelector(
    '[data-framer-name="Section FAQ"] .framer-kWrVV',
  )
  if (!first) return { ok: false }
  const before = first.getAttribute("data-framer-name")
  first.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }))
  const after = first.getAttribute("data-framer-name")
  const content = first.querySelector('[data-framer-name="Content"]')
  return {
    ok: true,
    before,
    after,
    contentDisplay: content ? getComputedStyle(content).display : null,
    hasListenerHint: first.style.cursor,
  }
})
console.log(JSON.stringify(result, null, 2))
await b.close()
