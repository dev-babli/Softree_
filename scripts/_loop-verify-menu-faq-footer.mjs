import puppeteer from "puppeteer"
import fs from "node:fs"

const URL = "http://localhost:3000/client"
const b = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] })
const p = await b.newPage()
const pageErrors = []
p.on("pageerror", (e) => pageErrors.push(e.message.slice(0, 200)))
await p.setViewport({ width: 1600, height: 900 })
await p.goto(URL, { waitUntil: "networkidle2", timeout: 120000 })
await new Promise((r) => setTimeout(r, 3500))

// Menu
const menuBox = await p.evaluate(() => {
  const t = [...document.querySelectorAll("p")].find(
    (el) => (el.textContent || "").trim() === "Menu" && el.getBoundingClientRect().top < 120,
  )
  const btn = t?.closest('[data-framer-name="Inverse (Left)"]')
  const r = btn?.getBoundingClientRect()
  return r ? { x: r.left + r.width / 2, y: r.top + r.height / 2 } : null
})
await p.mouse.click(menuBox.x, menuBox.y)
await new Promise((r) => setTimeout(r, 600))
const menu = await p.evaluate(() => ({
  open: document.querySelector(".client-exact-framer-shell")?.classList.contains("cx-menu-open"),
  label: [...document.querySelectorAll("p")].find(
    (el) => /^(Menu|Close)$/i.test((el.textContent || "").trim()) && el.getBoundingClientRect().top < 120,
  )?.textContent?.trim(),
  links: document.querySelector(".cx-menu-panel nav")?.innerText?.replace(/\n+/g, " | "),
}))
await p.screenshot({ path: "scripts/_loop-menu.png", fullPage: false })
// close
await p.mouse.click(menuBox.x, menuBox.y)
await new Promise((r) => setTimeout(r, 400))

// FAQ accordion
await p.evaluate(() =>
  document.querySelector('[data-framer-name="Section FAQ"]')?.scrollIntoView({ block: "center" }),
)
await new Promise((r) => setTimeout(r, 600))
const faqBefore = await p.evaluate(() => {
  const sec = document.querySelector('[data-framer-name="Section FAQ"]')
  const first = sec?.querySelector(".framer-kWrVV")
  return {
    sectionH: Math.round(sec.getBoundingClientRect().height),
    firstName: first?.getAttribute("data-framer-name"),
    firstH: Math.round(first?.getBoundingClientRect().height || 0),
  }
})
const faqClick = await p.evaluate(() => {
  const sec = document.querySelector('[data-framer-name="Section FAQ"]')
  const first = sec?.querySelector(".framer-kWrVV")
  const r = first?.getBoundingClientRect()
  return r ? { x: r.left + r.width / 2, y: r.top + 30 } : null
})
await p.mouse.click(faqClick.x, faqClick.y)
await new Promise((r) => setTimeout(r, 500))
const faqAfter = await p.evaluate(() => {
  const sec = document.querySelector('[data-framer-name="Section FAQ"]')
  const first = sec?.querySelector(".framer-kWrVV")
  return {
    sectionH: Math.round(sec.getBoundingClientRect().height),
    firstName: first?.getAttribute("data-framer-name"),
    firstH: Math.round(first?.getBoundingClientRect().height || 0),
    contentDisplay: getComputedStyle(
      first?.querySelector('[data-framer-name="Content"]'),
    ).display,
  }
})
await p.screenshot({ path: "scripts/_loop-faq.png", fullPage: false })

// Footer
await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
await new Promise((r) => setTimeout(r, 800))
const footer = await p.evaluate(() => {
  const f = document.querySelector("footer")
  return {
    h: Math.round(f?.getBoundingClientRect().height || 0),
    hasForm: !!f?.querySelector("input, textarea"),
    text: f?.innerText?.slice(0, 120)?.replace(/\n/g, " | "),
  }
})
await p.screenshot({ path: "scripts/_loop-footer.png", fullPage: false })

const out = { menu, faqBefore, faqAfter, footer, pageErrors }
fs.writeFileSync("scripts/_loop-verify.json", JSON.stringify(out, null, 2))
console.log(JSON.stringify(out, null, 2))
await b.close()
