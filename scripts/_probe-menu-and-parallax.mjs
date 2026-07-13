import fs from "node:fs"
import puppeteer from "puppeteer"

// Save clean cqh panel from previous extract if present; else re-fetch
const cqhPath = "src/components/client-exact/_extracted/sections/menu-open-cqh.html"
let html = fs.existsSync(cqhPath) ? fs.readFileSync(cqhPath, "utf8") : ""

if (!html.includes("framer-rFApl") || html.length < 5000) {
  const b = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] })
  const p = await b.newPage()
  await p.setViewport({ width: 1440, height: 900 })
  await p.goto("https://hanza-template.framer.website/", {
    waitUntil: "networkidle2",
    timeout: 120000,
  })
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
  await new Promise((r) => setTimeout(r, 1500))
  html = await p.evaluate(() => {
    const el = document.querySelector(".framer-cqh11d-container")
    return el ? el.outerHTML : ""
  })
  fs.writeFileSync(cqhPath, html)
  await p.screenshot({ path: "scripts/_hanza-menu-exact-ref.png", fullPage: false })
  await b.close()
}

console.log("cqh html", html.length)
console.log("has rFApl", html.includes("framer-rFApl"))
console.log("has Goodwell/Ikigai imgs", (html.match(/Hero Image/g) || []).length)
console.log("structure peek", html.slice(0, 400))

// Probe parallax on live portfolio images
const b2 = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] })
const p2 = await b2.newPage()
await p2.setViewport({ width: 1600, height: 900 })
await p2.goto("https://hanza-template.framer.website/", {
  waitUntil: "networkidle2",
  timeout: 120000,
})
await new Promise((r) => setTimeout(r, 4000))

await p2.evaluate(() =>
  document
    .querySelector('[data-framer-name="Section Portfolio"]')
    ?.scrollIntoView({ block: "start" }),
)
await new Promise((r) => setTimeout(r, 500))

const sampleBefore = await p2.evaluate(() => {
  const imgs = [...document.querySelectorAll('[data-framer-name="Section Portfolio"] img')].slice(
    0,
    6,
  )
  return imgs.map((img) => {
    const wrap =
      img.closest('[data-framer-name="Image"]') ||
      img.closest('[data-framer-background-image-wrapper]')?.parentElement ||
      img.parentElement
    const cs = getComputedStyle(wrap || img)
    return {
      alt: img.alt,
      transform: cs.transform,
      willChange: cs.willChange,
      wrapName: wrap?.getAttribute?.("data-framer-name"),
      wrapCls: (wrap?.className || "").toString().slice(0, 60),
    }
  })
})

await p2.evaluate(() => window.scrollBy(0, 400))
await new Promise((r) => setTimeout(r, 400))

const sampleAfter = await p2.evaluate(() => {
  const imgs = [...document.querySelectorAll('[data-framer-name="Section Portfolio"] img')].slice(
    0,
    6,
  )
  return imgs.map((img) => {
    const wrap =
      img.closest('[data-framer-name="Image"]') ||
      img.closest('[data-framer-background-image-wrapper]')?.parentElement ||
      img.parentElement
    const cs = getComputedStyle(wrap || img)
    const imgCs = getComputedStyle(img)
    return {
      alt: img.alt,
      wrapTransform: cs.transform,
      imgTransform: imgCs.transform,
      wrapName: wrap?.getAttribute?.("data-framer-name"),
    }
  })
})

// Also check blog / case study / about images
const more = await p2.evaluate(() => {
  const targets = [
    ...document.querySelectorAll(
      '[data-framer-name="Section Blog"] [data-framer-name="Image"], [data-framer-name="Section Casy Study"] [data-framer-name="Image"], [data-framer-name="Section About"] [data-framer-name="Image"], [data-framer-name="Section Portfolio"] [data-framer-name="Image"]',
    ),
  ].slice(0, 20)
  return targets.map((el) => {
    const cs = getComputedStyle(el)
    const img = el.querySelector("img")
    const imgCs = img ? getComputedStyle(img) : null
    return {
      name: el.getAttribute("data-framer-name"),
      section: el.closest("[data-framer-name^='Section ']")?.getAttribute("data-framer-name"),
      elT: cs.transform,
      imgT: imgCs?.transform,
      overflow: cs.overflow,
      cls: el.className?.toString?.().slice(0, 50),
    }
  })
})

fs.writeFileSync(
  "scripts/_hanza-parallax-probe.json",
  JSON.stringify({ sampleBefore, sampleAfter, more }, null, 2),
)
console.log("parallax before", JSON.stringify(sampleBefore, null, 2))
console.log("parallax after", JSON.stringify(sampleAfter, null, 2))
console.log("more", JSON.stringify(more.slice(0, 8), null, 2))
await b2.close()
