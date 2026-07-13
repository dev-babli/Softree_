import puppeteer from "puppeteer"
import fs from "node:fs"

const b = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] })
const p = await b.newPage()
await p.setViewport({ width: 1440, height: 900 })
await p.goto("https://hanza-template.framer.website/", {
  waitUntil: "networkidle2",
  timeout: 120000,
})
await new Promise((r) => setTimeout(r, 5000))

// Real mouse click on Menu
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
  return r
    ? { x: r.left + r.width / 2, y: r.top + r.height / 2, w: r.width, h: r.height }
    : null
})
console.log("menu box", box)
if (!box) {
  await b.close()
  process.exit(1)
}

await p.mouse.click(box.x, box.y)
await new Promise((r) => setTimeout(r, 2000))

const state = await p.evaluate(() => {
  const layout = document.querySelector(".framer-3L5GK")
  // Find panel containing Home + Portfolio + profile-ish content OR Goodwell
  const candidates = [...document.querySelectorAll("div,aside,nav,section")].filter((el) => {
    const t = el.innerText || ""
    const r = el.getBoundingClientRect()
    return (
      r.width > 400 &&
      r.height > 400 &&
      /HOME/i.test(t) &&
      /PORTFOLIO/i.test(t) &&
      (/Goodwell|Ikigai|NOVÁK|NOVAK/i.test(t) || el.querySelector("img"))
    )
  })

  // Prefer smallest that still matches (actual menu panel)
  candidates.sort(
    (a, b) =>
      a.getBoundingClientRect().width * a.getBoundingClientRect().height -
      b.getBoundingClientRect().width * b.getBoundingClientRect().height,
  )

  const panel = candidates[0]
  const closeBtn = [...document.querySelectorAll("a,button,div")].find((el) => {
    const r = el.getBoundingClientRect()
    return (
      r.top < 100 &&
      r.right > window.innerWidth - 120 &&
      (el.querySelector("svg") || /close|×|x/i.test(el.getAttribute("aria-label") || ""))
    )
  })

  return {
    layoutCls: layout?.className?.toString?.(),
    topText: document.querySelector(".framer-1iup1yh-container")?.innerText?.slice(0, 200),
    candidateCount: candidates.length,
    panel: panel
      ? {
          tag: panel.tagName,
          name: panel.getAttribute("data-framer-name"),
          cls: panel.className?.toString?.().slice(0, 200),
          parentCls: panel.parentElement?.className?.toString?.().slice(0, 120),
          grandCls: panel.parentElement?.parentElement?.className?.toString?.().slice(0, 120),
          rect: (() => {
            const r = panel.getBoundingClientRect()
            return {
              t: Math.round(r.top),
              l: Math.round(r.left),
              w: Math.round(r.width),
              h: Math.round(r.height),
            }
          })(),
          text: panel.innerText.slice(0, 400).replace(/\n/g, " | "),
          htmlLen: panel.outerHTML.length,
          imgs: [...panel.querySelectorAll("img")].map((img) => ({
            src: img.currentSrc || img.src,
            alt: img.alt,
            w: img.naturalWidth,
            h: img.naturalHeight,
          })),
        }
      : null,
    // dump all fixed high-z elements
    fixed: [...document.querySelectorAll("*")]
      .filter((el) => {
        const cs = getComputedStyle(el)
        const r = el.getBoundingClientRect()
        return (
          (cs.position === "fixed" || Number(cs.zIndex) >= 8) &&
          r.width > 200 &&
          r.height > 200 &&
          r.top < 200
        )
      })
      .slice(0, 12)
      .map((el) => ({
        name: el.getAttribute("data-framer-name"),
        cls: el.className?.toString?.().slice(0, 100),
        z: getComputedStyle(el).zIndex,
        pos: getComputedStyle(el).position,
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
  }
})

fs.writeFileSync("scripts/_hanza-menu-panel-state.json", JSON.stringify(state, null, 2))
console.log(JSON.stringify(state, null, 2).slice(0, 5000))

if (state.panel) {
  const html = await p.evaluate(() => {
    const candidates = [...document.querySelectorAll("div,aside,nav,section")].filter((el) => {
      const t = el.innerText || ""
      const r = el.getBoundingClientRect()
      return (
        r.width > 400 &&
        r.height > 400 &&
        /HOME/i.test(t) &&
        /PORTFOLIO/i.test(t) &&
        (/Goodwell|Ikigai|NOVÁK|NOVAK/i.test(t) || el.querySelectorAll("img").length >= 2)
      )
    })
    candidates.sort(
      (a, b) =>
        a.getBoundingClientRect().width * a.getBoundingClientRect().height -
        b.getBoundingClientRect().width * b.getBoundingClientRect().height,
    )
    // walk up to find a good container that includes both columns
    let el = candidates[0]
    for (let i = 0; i < 6 && el?.parentElement; i++) {
      const t = el.innerText || ""
      if (/HOME/i.test(t) && /Goodwell|Ikigai/i.test(t) && el.querySelectorAll("img").length >= 2) {
        // prefer this if it has both
        const parent = el.parentElement
        const pt = parent.innerText || ""
        if (
          /HOME/i.test(pt) &&
          /Goodwell|Ikigai/i.test(pt) &&
          parent.getBoundingClientRect().width < window.innerWidth * 0.95
        ) {
          el = parent
          continue
        }
        break
      }
      el = el.parentElement
    }
    return el ? el.outerHTML : null
  })
  if (html) {
    fs.writeFileSync(
      "src/components/client-exact/_extracted/sections/menu-open-panel.html",
      html,
    )
    console.log("wrote panel html", html.length)
  }
}

await p.screenshot({ path: "scripts/_hanza-menu-exact-ref.png", fullPage: false })
await b.close()
