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

const before = await p.evaluate(() => {
  const layout = document.querySelector(".framer-3L5GK")
  return {
    layoutCls: layout?.className?.toString?.(),
    kids: [...(layout?.children || [])].map((el) => ({
      tag: el.tagName,
      cls: el.className?.toString?.().slice(0, 120),
      name: el.getAttribute("data-framer-name"),
      h: Math.round(el.getBoundingClientRect().height),
    })),
  }
})
console.log("BEFORE", JSON.stringify(before, null, 2))

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
console.log("box", box)
if (!box) {
  await b.close()
  process.exit(1)
}
await p.mouse.click(box.x, box.y)
await new Promise((r) => setTimeout(r, 1500))

const after = await p.evaluate(() => {
  const layout = document.querySelector(".framer-3L5GK")
  const cqh = document.querySelector(
    ".framer-cqh11d-container, [class*='cqh11d']",
  )
  const qlili = document.querySelector(".framer-qlili8, [class*='qlili8']")
  const nav = document.querySelector(
    "nav.framer-1qvl8bs, nav[data-framer-name='Nav']",
  )
  const closeEl = [...document.querySelectorAll("p")].find(
    (el) => (el.textContent || "").trim() === "Close",
  )
  return {
    layoutCls: layout?.className?.toString?.(),
    kids: [...(layout?.children || [])].map((el) => ({
      tag: el.tagName,
      cls: el.className?.toString?.().slice(0, 140),
      name: el.getAttribute("data-framer-name"),
      op: getComputedStyle(el).opacity,
      pos: getComputedStyle(el).position,
      z: getComputedStyle(el).zIndex,
      text: (el.innerText || "").slice(0, 80).replace(/\n/g, " | "),
      rect: (() => {
        const r = el.getBoundingClientRect()
        return {
          t: Math.round(r.top),
          l: Math.round(r.left),
          w: Math.round(r.width),
          h: Math.round(r.height),
        }
      })(),
    })),
    cqh: cqh
      ? {
          cls: cqh.className?.toString?.().slice(0, 160),
          html: cqh.outerHTML.slice(0, 8000),
          parentCls: cqh.parentElement?.className?.toString?.().slice(0, 100),
        }
      : null,
    qlili: qlili
      ? { cls: qlili.className?.toString?.().slice(0, 160), tag: qlili.tagName }
      : null,
    nav: nav
      ? {
          cls: nav.className?.toString?.(),
          parentCls: nav.parentElement?.className?.toString?.().slice(0, 120),
          text: nav.innerText,
          rect: (() => {
            const r = nav.getBoundingClientRect()
            return {
              t: Math.round(r.top),
              l: Math.round(r.left),
              w: Math.round(r.width),
              h: Math.round(r.height),
            }
          })(),
        }
      : null,
    topText: document
      .querySelector(".framer-1iup1yh-container")
      ?.innerText?.slice(0, 150),
    close: closeEl
      ? {
          cls: closeEl
            .closest("[data-highlight],button,a,div")
            ?.className?.toString?.()
            .slice(0, 120),
          name: closeEl
            .closest("[data-framer-name]")
            ?.getAttribute("data-framer-name"),
          html: closeEl.closest("[data-highlight]")?.outerHTML?.slice(0, 1500),
        }
      : null,
  }
})

fs.writeFileSync(
  "scripts/_hanza-menu-open-state.json",
  JSON.stringify(after, null, 2),
)
console.log("AFTER layout", after.layoutCls)
after.kids.forEach((k, i) =>
  console.log(i, k.cls?.slice(0, 90), k.name, k.rect, k.text?.slice(0, 60)),
)
console.log("cqh", !!after.cqh, after.cqh?.cls)
console.log("qlili", after.qlili)
console.log("nav", after.nav)
console.log("top", after.topText)
console.log("close", after.close?.name, after.close?.cls)
if (after.cqh?.html) {
  fs.writeFileSync(
    "src/components/client-exact/_extracted/sections/menu-open-cqh.html",
    after.cqh.html,
  )
}
await p.screenshot({ path: "scripts/_hanza-menu-open-exact.png", fullPage: false })
await b.close()
