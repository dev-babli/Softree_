import puppeteer from "puppeteer"
import fs from "node:fs"

const b = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] })
const p = await b.newPage()
await p.setViewport({ width: 1600, height: 900 })
await p.goto("https://hanza-template.framer.website/", {
  waitUntil: "networkidle2",
  timeout: 120000,
})
await new Promise((r) => setTimeout(r, 4500))

await p.evaluate(() =>
  document
    .querySelector('[data-framer-name="Section Process"]')
    ?.scrollIntoView({ block: "start" }),
)
await new Promise((r) => setTimeout(r, 400))

const track = []
for (let i = 0; i < 12; i++) {
  const snap = await p.evaluate((step) => {
    const sec = document.querySelector('[data-framer-name="Section Process"]')
    const grids = [
      ...sec.querySelectorAll(
        ".framer-vi8nhy, .framer-1wzefn9, .framer-1fcolx0, [data-framer-name='Grid'][style*='will-change'], [data-framer-name='Grid'][style*='willChange']",
      ),
    ]
    // also any Grid that currently has translateY
    const moving = [...sec.querySelectorAll('[data-framer-name="Grid"]')].filter((el) => {
      const t = getComputedStyle(el).transform
      return t && t !== "none" && !t.endsWith(", 0, 0)")
    })

    const mapEl = (el) => {
      const r = el.getBoundingClientRect()
      const m = getComputedStyle(el).transform.match(/matrix\(([^)]+)\)/)
      const parts = m ? m[1].split(",").map(Number) : null
      return {
        cls: (el.className || "").toString().slice(0, 40),
        name: el.getAttribute("data-framer-name"),
        ty: parts ? parts[5] : 0,
        tx: parts ? parts[4] : 0,
        top: Math.round(r.top),
        h: Math.round(r.height),
        cards: el.querySelectorAll('[data-framer-name="Card"]').length,
      }
    }

    return {
      step,
      scrollY: Math.round(window.scrollY),
      sectionTop: Math.round(sec.getBoundingClientRect().top),
      grids: [...new Set([...grids, ...moving])].map(mapEl),
    }
  }, i)
  track.push(snap)
  await p.evaluate(() => window.scrollBy(0, 160))
  await new Promise((r) => setTimeout(r, 280))
}

// Testimonials track
await p.evaluate(() =>
  document
    .querySelector('[data-framer-name="Section Testimonials"]')
    ?.scrollIntoView({ block: "start" }),
)
await new Promise((r) => setTimeout(r, 400))
const testi = []
for (let i = 0; i < 8; i++) {
  const snap = await p.evaluate((step) => {
    const sec = document.querySelector('[data-framer-name="Section Testimonials"]')
    const moving = [...sec.querySelectorAll("*")].filter((el) => {
      const t = getComputedStyle(el).transform
      if (!t || t === "none") return false
      const m = t.match(/matrix\(([^)]+)\)/)
      if (!m) return false
      const parts = m[1].split(",").map(Number)
      const ty = parts[5]
      const sx = parts[0]
      // ignore pure scale and tiny letter moves
      return Math.abs(ty) > 1 || Math.abs(sx - 1) > 0.01
    })
    return {
      step,
      scrollY: Math.round(window.scrollY),
      items: moving.slice(0, 15).map((el) => {
        const m = getComputedStyle(el).transform.match(/matrix\(([^)]+)\)/)
        const parts = m[1].split(",").map(Number)
        return {
          name: el.getAttribute("data-framer-name"),
          cls: (el.className || "").toString().slice(0, 40),
          ty: parts[5],
          sx: parts[0],
          top: Math.round(el.getBoundingClientRect().top),
        }
      }),
    }
  }, i)
  testi.push(snap)
  await p.evaluate(() => window.scrollBy(0, 180))
  await new Promise((r) => setTimeout(r, 280))
}

// Portfolio: check absolute translateY layers (mouse parallax?)
await p.evaluate(() =>
  document
    .querySelector('[data-framer-name="Section Portfolio"]')
    ?.scrollIntoView({ block: "center" }),
)
await new Promise((r) => setTimeout(r, 400))
const portBefore = await p.evaluate(() => {
  const sec = document.querySelector('[data-framer-name="Section Portfolio"]')
  return [...sec.querySelectorAll("*")]
    .filter((el) => {
      const t = getComputedStyle(el).transform
      return t && t !== "none"
    })
    .slice(0, 20)
    .map((el) => ({
      name: el.getAttribute("data-framer-name"),
      cls: (el.className || "").toString().slice(0, 50),
      pos: getComputedStyle(el).position,
      t: getComputedStyle(el).transform,
    }))
})
// move mouse across portfolio
await p.mouse.move(400, 450)
await new Promise((r) => setTimeout(r, 200))
await p.mouse.move(1200, 450)
await new Promise((r) => setTimeout(r, 200))
const portAfterMouse = await p.evaluate(() => {
  const sec = document.querySelector('[data-framer-name="Section Portfolio"]')
  return [...sec.querySelectorAll("*")]
    .filter((el) => {
      const t = getComputedStyle(el).transform
      return t && t !== "none"
    })
    .slice(0, 20)
    .map((el) => ({
      name: el.getAttribute("data-framer-name"),
      cls: (el.className || "").toString().slice(0, 50),
      pos: getComputedStyle(el).position,
      t: getComputedStyle(el).transform,
    }))
})

fs.writeFileSync(
  "scripts/_parallax-rates.json",
  JSON.stringify({ track, testi, portBefore, portAfterMouse }, null, 2),
)
console.log("PROCESS GRIDS")
track.forEach((s) => {
  if (!s.grids.length) return
  console.log(
    `y=${s.scrollY} secTop=${s.sectionTop}`,
    s.grids.map((g) => `${g.cls}:${g.ty.toFixed(1)}@${g.top}`).join(" | "),
  )
})
console.log("\nTESTIMONIALS")
testi.forEach((s) => {
  if (!s.items.length) return
  console.log(
    `y=${s.scrollY}`,
    s.items.map((g) => `${g.name||g.cls}:ty${g.ty.toFixed(1)}`).join(" | "),
  )
})
console.log("\nPORTFOLIO mouse delta")
console.log("before", JSON.stringify(portBefore.slice(0, 6)))
console.log("after", JSON.stringify(portAfterMouse.slice(0, 6)))
await b.close()
