import puppeteer from "puppeteer"
import fs from "node:fs"

const URL = process.env.CLIENT_URL || "http://localhost:3000/client"
const b = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] })
const p = await b.newPage()
const pageErrors = []
const consoleErrors = []
p.on("pageerror", (e) => pageErrors.push(e.message.slice(0, 300)))
p.on("console", (msg) => {
  if (msg.type() === "error") consoleErrors.push(msg.text().slice(0, 300))
})
await p.setViewport({ width: 1600, height: 900 })
await p.goto(URL, { waitUntil: "networkidle2", timeout: 120000 })
await new Promise((r) => setTimeout(r, 4000))

// Close menu if open, scroll to about
await p.evaluate(() => {
  document.querySelector(".client-exact-framer-shell")?.classList.remove("cx-menu-open")
  document.querySelectorAll(".cx-menu-backdrop, .cx-menu-panel").forEach((el) => el.remove())
})

const about = await p.evaluate(() => {
  const sec = document.querySelector('[data-framer-name="Section About"]')
  if (!sec) return null
  sec.scrollIntoView({ block: "start" })
  const r = sec.getBoundingClientRect()
  const words = [...sec.querySelectorAll(".framer-1lsrsdw span")].filter(
    (s) => s.children.length === 0 && (s.textContent || "").trim(),
  )
  const opacities = words.slice(0, 12).map((s) => ({
    t: (s.textContent || "").trim().slice(0, 20),
    op: getComputedStyle(s).opacity,
  }))
  return {
    h: Math.round(r.height),
    w: Math.round(r.width),
    textHead: sec.innerText.slice(0, 400).replace(/\n/g, " | "),
    wordCount: words.length,
    opacities,
    sticky: [...sec.querySelectorAll("*")]
      .filter((el) => {
        const cs = getComputedStyle(el)
        return cs.position === "sticky" || cs.position === "fixed"
      })
      .slice(0, 8)
      .map((el) => ({
        name: el.getAttribute("data-framer-name"),
        pos: getComputedStyle(el).position,
        cls: (el.className || "").toString().slice(0, 60),
      })),
  }
})
await new Promise((r) => setTimeout(r, 600))
await p.screenshot({ path: "scripts/_verify-client-about.png", fullPage: false })

// scroll mid-about to trigger reveals
await p.evaluate(() => window.scrollBy(0, 400))
await new Promise((r) => setTimeout(r, 800))
const aboutAfter = await p.evaluate(() => {
  const sec = document.querySelector('[data-framer-name="Section About"]')
  const words = [...(sec?.querySelectorAll(".framer-1lsrsdw span") || [])].filter(
    (s) => s.children.length === 0 && (s.textContent || "").trim(),
  )
  return words.slice(0, 15).map((s) => ({
    t: (s.textContent || "").trim().slice(0, 20),
    op: getComputedStyle(s).opacity,
  }))
})

// Footer clean shot
await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
await new Promise((r) => setTimeout(r, 1000))
await p.screenshot({ path: "scripts/_verify-client-footer-clean.png", fullPage: false })

const nextOverlay = await p.evaluate(() => {
  const el = document.querySelector("nextjs-portal, [data-nextjs-dialog], #__next-build-watcher")
  return {
    hasPortal: !!document.querySelector("nextjs-portal"),
    issuesText: [...document.querySelectorAll("button,div,a")]
      .find((e) => /Issues/i.test(e.textContent || ""))
      ?.textContent?.slice(0, 80),
  }
})

const out = { about, aboutAfter, pageErrors, consoleErrors: consoleErrors.slice(0, 20), nextOverlay }
fs.writeFileSync("scripts/_verify-client-about.json", JSON.stringify(out, null, 2))
console.log(JSON.stringify(out, null, 2))
await b.close()
