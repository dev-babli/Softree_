import puppeteer from "puppeteer"
import fs from "node:fs"

const URL = process.env.CLIENT_URL || "http://localhost:3000/client"

const b = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] })
const p = await b.newPage()
const pageErrors = []
p.on("pageerror", (e) => pageErrors.push(e.message.slice(0, 200)))
await p.setViewport({ width: 1600, height: 900 })
await p.goto(URL, { waitUntil: "networkidle2", timeout: 120000 }).catch((e) => {
  console.error("goto failed", e.message)
})
await new Promise((r) => setTimeout(r, 3500))

const before = await p.evaluate(() => {
  const footer = document.querySelector("footer")
  const fr = footer?.getBoundingClientRect()
  return {
    title: document.title,
    hasFooter: !!footer,
    footerH: fr ? Math.round(fr.height) : 0,
    footerText: footer?.innerText?.slice(0, 220)?.replace(/\n/g, " | "),
    menuLabel: [...document.querySelectorAll("p")].find(
      (el) =>
        /^(Menu|Close)$/i.test((el.textContent || "").trim()) &&
        el.getBoundingClientRect().top < 120,
    )?.textContent?.trim(),
    sectionCount: document.querySelectorAll("[data-framer-name^='Section ']").length,
  }
})
console.log("before", before)

const box = await p.evaluate(() => {
  const menuText = [...document.querySelectorAll("p")].find(
    (el) =>
      (el.textContent || "").trim() === "Menu" &&
      el.getBoundingClientRect().top < 120,
  )
  const btn =
    menuText?.closest('[data-framer-name="Inverse (Left)"]') ||
    menuText?.closest("[data-highlight]")
  const r = btn?.getBoundingClientRect()
  return r ? { x: r.left + r.width / 2, y: r.top + r.height / 2 } : null
})
console.log("menu box", box)
if (box) {
  await p.mouse.click(box.x, box.y)
  await new Promise((r) => setTimeout(r, 800))
}

const afterMenu = await p.evaluate(() => {
  const backdrop = document.querySelector(".cx-menu-backdrop, .framer-qlili8")
  const panel = document.querySelector(".cx-menu-panel, .framer-cqh11d-container")
  const nav = panel?.querySelector("nav")
  return {
    shellOpen: document.querySelector(".client-exact-framer-shell")?.classList.contains("cx-menu-open"),
    label: [...document.querySelectorAll("p")].find(
      (el) =>
        /^(Menu|Close)$/i.test((el.textContent || "").trim()) &&
        el.getBoundingClientRect().top < 120,
    )?.textContent?.trim(),
    backdrop: backdrop
      ? {
          op: getComputedStyle(backdrop).opacity,
          z: getComputedStyle(backdrop).zIndex,
          pos: getComputedStyle(backdrop).position,
        }
      : null,
    panel: panel
      ? {
          op: getComputedStyle(panel).opacity,
          z: getComputedStyle(panel).zIndex,
          pos: getComputedStyle(panel).position,
          text: panel.innerText.slice(0, 120).replace(/\n/g, " | "),
          rect: (() => {
            const r = panel.getBoundingClientRect()
            return {
              t: Math.round(r.top),
              l: Math.round(r.left),
              w: Math.round(r.width),
              h: Math.round(r.height),
            }
          })(),
        }
      : null,
    navText: nav?.innerText?.slice(0, 120),
  }
})
console.log("afterMenu", JSON.stringify(afterMenu, null, 2))
await p.screenshot({ path: "scripts/_verify-client-menu.png", fullPage: false })

await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
await new Promise((r) => setTimeout(r, 1000))
await p.screenshot({ path: "scripts/_verify-client-footer.png", fullPage: false })

const bottom = await p.evaluate(() => {
  const footer = document.querySelector("footer")
  const r = footer?.getBoundingClientRect()
  return {
    scrollH: document.body.scrollHeight,
    footerVisible: r ? r.top < window.innerHeight && r.bottom > 0 : false,
    footerH: r ? Math.round(r.height) : 0,
    hasForm: !!document.querySelector("footer form, footer input[type='email'], footer textarea"),
    endText: document.body.innerText.slice(-350).replace(/\n+/g, " | "),
  }
})
console.log("bottom", bottom)
console.log("pageErrors", pageErrors)
fs.writeFileSync(
  "scripts/_verify-client-menu-footer.json",
  JSON.stringify({ before, afterMenu, bottom, pageErrors }, null, 2),
)
await b.close()
