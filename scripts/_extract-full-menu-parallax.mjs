import puppeteer from "puppeteer"
import fs from "node:fs"

const b = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] })
const p = await b.newPage()
await p.setViewport({ width: 1440, height: 900 })
await p.goto("https://hanza-template.framer.website/", {
  waitUntil: "networkidle2",
  timeout: 120000,
})
await new Promise((r) => setTimeout(r, 4500))

const box = await p.evaluate(() => {
  const t = [...document.querySelectorAll("p")].find(
    (el) => (el.textContent || "").trim() === "Menu" && el.getBoundingClientRect().top < 120,
  )
  const btn = t?.closest('[data-framer-name="Inverse (Left)"]') || t?.closest("[data-highlight]")
  const r = btn?.getBoundingClientRect()
  return r ? { x: r.left + r.width / 2, y: r.top + r.height / 2 } : null
})
await p.mouse.click(box.x, box.y)
await new Promise((r) => setTimeout(r, 1800))

const html = await p.evaluate(() => {
  const el = document.querySelector(".framer-cqh11d-container")
  return el ? el.outerHTML : ""
})
fs.writeFileSync(
  "src/components/client-exact/_extracted/sections/menu-open-cqh.html",
  html,
)
console.log("cqh full", html.length)

// Also grab close button in topbar when open
const closeInfo = await p.evaluate(() => {
  const top = document.querySelector(".framer-1iup1yh-container")
  // right side CTA area often becomes X
  const rights = [...document.querySelectorAll(".framer-1gl6ihi, [data-framer-name='Column']")].filter(
    (el) => el.getBoundingClientRect().top < 120,
  )
  return {
    topText: top?.innerText?.slice(0, 200),
    layoutCls: document.querySelector(".framer-3L5GK")?.className?.toString?.(),
    has11vsk7q: !!document.querySelector(".framer-11vsk7q"),
    hasQlili: !!document.querySelector(".framer-qlili8"),
    panelRect: (() => {
      const el = document.querySelector(".framer-cqh11d-container")
      const r = el?.getBoundingClientRect()
      return r
        ? { t: Math.round(r.top), l: Math.round(r.left), w: Math.round(r.width), h: Math.round(r.height) }
        : null
    })(),
    imgs: [...(document.querySelector(".framer-cqh11d-container")?.querySelectorAll("img") || [])].map(
      (img) => ({
        src: (img.currentSrc || img.src).split("?")[0],
        alt: img.alt,
        w: img.naturalWidth,
        h: img.naturalHeight,
      }),
    ),
  }
})
fs.writeFileSync("scripts/_hanza-menu-meta.json", JSON.stringify(closeInfo, null, 2))
console.log(JSON.stringify(closeInfo, null, 2))
await p.screenshot({ path: "scripts/_hanza-menu-exact-ref.png", fullPage: false })

// PARALLAX probe while menu closed - reload
await p.goto("https://hanza-template.framer.website/", {
  waitUntil: "networkidle2",
  timeout: 120000,
})
await new Promise((r) => setTimeout(r, 4000))

const measureTransforms = () =>
  p.evaluate(() => {
    const pick = (sel) =>
      [...document.querySelectorAll(sel)].slice(0, 12).map((el) => {
        const img = el.matches("img") ? el : el.querySelector("img")
        const target = img || el
        const wrap =
          target.closest('[data-framer-name="Image"]') ||
          target.closest('[data-framer-name="Image Wrapper"]') ||
          target.parentElement
        return {
          section: el.closest("[data-framer-name^='Section ']")?.getAttribute("data-framer-name"),
          wrapName: wrap?.getAttribute?.("data-framer-name"),
          wrapCls: (wrap?.className || "").toString().slice(0, 40),
          wrapT: wrap ? getComputedStyle(wrap).transform : null,
          imgT: img ? getComputedStyle(img).transform : null,
          bgT: (() => {
            const bg = wrap?.querySelector?.("[data-framer-background-image-wrapper]")
            return bg ? getComputedStyle(bg).transform : null
          })(),
        }
      })

    return {
      portfolioImages: pick('[data-framer-name="Section Portfolio"] [data-framer-name="Image"]'),
      blogImages: pick('[data-framer-name="Section Blog"] [data-framer-name="Image"]'),
      aboutImages: pick('[data-framer-name="Section About"] [data-framer-name="Image"]'),
      caseImages: pick('[data-framer-name="Section Casy Study"] [data-framer-name="Image"]'),
      scrollY: window.scrollY,
    }
  })

await p.evaluate(() =>
  document.querySelector('[data-framer-name="Section Portfolio"]')?.scrollIntoView({ block: "center" }),
)
await new Promise((r) => setTimeout(r, 400))
const atCenter = await measureTransforms()
await p.evaluate(() => window.scrollBy(0, 500))
await new Promise((r) => setTimeout(r, 400))
const afterScroll = await measureTransforms()

fs.writeFileSync(
  "scripts/_hanza-parallax-probe.json",
  JSON.stringify({ atCenter, afterScroll }, null, 2),
)
console.log(
  "portfolio transform delta sample",
  JSON.stringify(
    {
      before: atCenter.portfolioImages[0],
      after: afterScroll.portfolioImages[0],
    },
    null,
    2,
  ),
)

await b.close()
