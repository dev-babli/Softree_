import puppeteer from "puppeteer"
import fs from "node:fs"

const URL = "http://localhost:3000/client"
const b = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] })
const p = await b.newPage()
const pageErrors = []
p.on("pageerror", (e) => pageErrors.push(e.message.slice(0, 250)))
await p.setViewport({ width: 1440, height: 900 })
await p.goto(URL, { waitUntil: "networkidle2", timeout: 120000 })
await new Promise((r) => setTimeout(r, 4000))

const box = await p.evaluate(() => {
  const t = [...document.querySelectorAll("p")].find(
    (el) => (el.textContent || "").trim() === "Menu" && el.getBoundingClientRect().top < 120,
  )
  const btn = t?.closest('[data-framer-name="Inverse (Left)"]') || t?.closest("[data-highlight]")
  const r = btn?.getBoundingClientRect()
  return r ? { x: r.left + r.width / 2, y: r.top + r.height / 2 } : null
})
await p.mouse.click(box.x, box.y)
await new Promise((r) => setTimeout(r, 1000))

const menu = await p.evaluate(() => {
  const panel = document.querySelector(".cx-menu-panel, .framer-cqh11d-container")
  const r = panel?.getBoundingClientRect()
  return {
    open: document.querySelector(".client-exact-framer-shell")?.classList.contains("cx-menu-open"),
    panel: panel
      ? {
          w: Math.round(r.width),
          h: Math.round(r.height),
          t: Math.round(r.top),
          l: Math.round(r.left),
          text: panel.innerText.slice(0, 250).replace(/\n/g, " | "),
          imgs: panel.querySelectorAll("img").length,
          hasGoodwell: /Goodwell|mwMZjXO|OBhRqYn/i.test(panel.innerHTML),
          hasIkigai: /Ikigai|rdYH8Fpt|L2rXxsY/i.test(panel.innerHTML),
          hasProfile: /NOVÁK|NOVAK|zeniIu0/i.test(panel.innerHTML),
        }
      : null,
    hasRfa: !!document.querySelector(".framer-rFApl"),
    hasBackdrop: !!document.querySelector(".framer-qlili8"),
  }
})
await p.screenshot({ path: "scripts/_verify-menu-exact.png", fullPage: false })
console.log("menu", JSON.stringify(menu, null, 2))

// close and check parallax
await p.mouse.click(box.x, box.y)
await new Promise((r) => setTimeout(r, 400))
await p.evaluate(() =>
  document.querySelector('[data-framer-name="Section Portfolio"]')?.scrollIntoView({ block: "center" }),
)
await new Promise((r) => setTimeout(r, 500))
const para1 = await p.evaluate(() => {
  const el = document.querySelector(
    '[data-framer-name="Section Portfolio"] [data-framer-name="Image"].cx-parallax-target, [data-framer-name="Section Portfolio"] [data-framer-name="Image"]',
  )
  return el ? getComputedStyle(el).transform : null
})
await p.evaluate(() => window.scrollBy(0, 400))
await new Promise((r) => setTimeout(r, 300))
const para2 = await p.evaluate(() => {
  const el = document.querySelector(
    '[data-framer-name="Section Portfolio"] [data-framer-name="Image"].cx-parallax-target, [data-framer-name="Section Portfolio"] [data-framer-name="Image"]',
  )
  return el ? getComputedStyle(el).transform : null
})
console.log("parallax", { para1, para2, pageErrors })
fs.writeFileSync(
  "scripts/_verify-menu-parallax.json",
  JSON.stringify({ menu, para1, para2, pageErrors }, null, 2),
)
await b.close()
