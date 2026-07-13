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

// Click the actual Menu control (dots + Menu text)
const clicked = await p.evaluate(() => {
  const menuText = [...document.querySelectorAll("p")].find(
    (el) => (el.textContent || "").trim() === "Menu" && el.getBoundingClientRect().top < 120,
  )
  if (!menuText) return { ok: false }
  // Prefer the Inverse (Left) clickable parent
  const btn =
    menuText.closest('[data-framer-name="Inverse (Left)"]') ||
    menuText.closest("[data-highlight]") ||
    menuText.parentElement
  btn?.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }))
  // also try pointer events
  btn?.click?.()
  return {
    ok: true,
    cls: btn?.className?.toString?.().slice(0, 120),
    name: btn?.getAttribute("data-framer-name"),
  }
})
console.log("clicked", clicked)
await new Promise((r) => setTimeout(r, 1200))

const open = await p.evaluate(() => {
  // layout class changes when menu open
  const layout = document.querySelector(".framer-3L5GK")
  const nav = document.querySelector("nav[data-framer-name='Nav'], nav.framer-1qvl8bs")
  const overlays = [...document.querySelectorAll("*")]
    .filter((el) => {
      const cs = getComputedStyle(el)
      const r = el.getBoundingClientRect()
      const t = el.innerText || ""
      return (
        r.width > 500 &&
        r.height > 400 &&
        /Home/.test(t) &&
        /Portfolio/.test(t) &&
        /About/.test(t) &&
        (cs.position === "fixed" || Number(cs.zIndex) >= 8)
      )
    })
    .slice(0, 5)
    .map((el) => ({
      tag: el.tagName,
      name: el.getAttribute("data-framer-name"),
      cls: el.className?.toString?.().slice(0, 150),
      op: getComputedStyle(el).opacity,
      z: getComputedStyle(el).zIndex,
      pos: getComputedStyle(el).position,
      text: el.innerText.slice(0, 200).replace(/\n/g, " | "),
      htmlLen: el.outerHTML.length,
    }))

  return {
    layoutCls: layout?.className?.toString?.(),
    nav: nav
      ? {
          cls: nav.className?.toString?.(),
          op: getComputedStyle(nav).opacity,
          pos: getComputedStyle(nav).position,
          z: getComputedStyle(nav).zIndex,
          disp: getComputedStyle(nav).display,
          text: nav.innerText.slice(0, 200),
          rect: (() => {
            const r = nav.getBoundingClientRect()
            return { t: Math.round(r.top), l: Math.round(r.left), w: Math.round(r.width), h: Math.round(r.height) }
          })(),
        }
      : null,
    overlays,
  }
})
console.log(JSON.stringify(open, null, 2))
await p.screenshot({ path: "scripts/_audit-hanza-menu-open.png", fullPage: false })

// Extract footer live
const footerHtml = await p.evaluate(() => {
  const f = document.querySelector("footer")
  return f ? f.outerHTML : null
})
if (footerHtml) {
  fs.writeFileSync(
    "src/components/client-exact/_extracted/sections/footer-live.html",
    footerHtml,
  )
  console.log("footer live", footerHtml.length)
}

// Extract open menu nav html
const navHtml = await p.evaluate(() => {
  const nav = document.querySelector("nav[data-framer-name='Nav'], nav.framer-1qvl8bs")
  return nav ? nav.outerHTML : null
})
if (navHtml) {
  fs.writeFileSync(
    "src/components/client-exact/_extracted/sections/nav-live-open.html",
    navHtml,
  )
  console.log("nav live", navHtml.length)
}

// Also dump layout class variants used for menu
const cssHints = await p.evaluate(() => {
  const layout = document.querySelector(".framer-3L5GK")
  return {
    classList: [...(layout?.classList || [])],
    // find close button
    close: [...document.querySelectorAll("p,button,div")].find((el) =>
      /^(Close|X)$/i.test((el.textContent || "").trim()),
    )?.outerHTML?.slice(0, 200),
  }
})
console.log("layout classes after open", cssHints)

await b.close()
