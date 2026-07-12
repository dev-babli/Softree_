import puppeteer from "puppeteer"
import fs from "node:fs"

const b = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] })
const p = await b.newPage()
await p.setViewport({ width: 1600, height: 900 })
await p.goto("https://hanza-template.framer.website/", {
  waitUntil: "networkidle2",
  timeout: 120000,
})
await new Promise((r) => setTimeout(r, 5000))

// Get Menu button box and real-click it
const box = await p.evaluate(() => {
  const menuText = [...document.querySelectorAll("p")].find(
    (el) => (el.textContent || "").trim() === "Menu" && el.getBoundingClientRect().top < 120,
  )
  const btn =
    menuText?.closest('[data-framer-name="Inverse (Left)"]') ||
    menuText?.closest("[data-highlight]") ||
    menuText
  const r = btn?.getBoundingClientRect()
  return r
    ? { x: r.left + r.width / 2, y: r.top + r.height / 2, w: r.width, h: r.height }
    : null
})
console.log("menu box", box)

if (box) {
  await p.mouse.click(box.x, box.y)
  await new Promise((r) => setTimeout(r, 1500))
}

const state = await p.evaluate(() => {
  const layout = document.querySelector(".framer-3L5GK")
  // anything covering the viewport with nav links
  const candidates = [...document.querySelectorAll("div,nav,aside,section")].filter((el) => {
    const r = el.getBoundingClientRect()
    const cs = getComputedStyle(el)
    const t = el.innerText || ""
    return (
      r.width > 800 &&
      r.height > 500 &&
      r.top < 50 &&
      /Home/.test(t) &&
      /Portfolio/.test(t) &&
      Number(cs.opacity) > 0.5 &&
      cs.visibility !== "hidden" &&
      cs.display !== "none"
    )
  })
  return {
    layoutCls: layout?.className?.toString?.(),
    bodyCls: document.body.className,
    htmlCls: document.documentElement.className,
    candidates: candidates.slice(0, 6).map((el) => ({
      tag: el.tagName,
      name: el.getAttribute("data-framer-name"),
      cls: el.className?.toString?.().slice(0, 160),
      z: getComputedStyle(el).zIndex,
      pos: getComputedStyle(el).position,
      op: getComputedStyle(el).opacity,
      text: el.innerText.slice(0, 180).replace(/\n/g, " | "),
    })),
    // check if topbar changed to Close
    topText: document.querySelector(".framer-1iup1yh-container")?.innerText?.slice(0, 120),
  }
})
console.log(JSON.stringify(state, null, 2))
await p.screenshot({ path: "scripts/_audit-hanza-menu-click.png", fullPage: false })

// Scroll to footer and screenshot
await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
await new Promise((r) => setTimeout(r, 800))
await p.screenshot({ path: "scripts/_audit-hanza-footer.png", fullPage: false })

const footerInfo = await p.evaluate(() => {
  const f = document.querySelector("footer")
  if (!f) return null
  const r = f.getBoundingClientRect()
  return {
    name: f.getAttribute("data-framer-name"),
    cls: f.className?.toString?.().slice(0, 120),
    h: Math.round(r.height),
    textHead: f.innerText.slice(0, 400),
    textTail: f.innerText.slice(-400),
  }
})
console.log("footer", JSON.stringify(footerInfo, null, 2))

await b.close()
