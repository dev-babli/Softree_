import puppeteer from "puppeteer"
import fs from "node:fs"

const b = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] })
const p = await b.newPage()
await p.setViewport({ width: 1600, height: 900 })
await p.goto("https://hanza-template.framer.website/", {
  waitUntil: "networkidle2",
  timeout: 120000,
})
await new Promise((r) => setTimeout(r, 4000))

// Jump to just before Process enters
const processTop = await p.evaluate(() => {
  const sec = document.querySelector('[data-framer-name="Section Process"]')
  const top = sec.getBoundingClientRect().top + window.scrollY
  return Math.round(top)
})
console.log("process doc top", processTop)

// Sample from 900px before section to 900px after start
const samples = []
for (let y = processTop - 900; y <= processTop + 900; y += 150) {
  await p.evaluate((yy) => window.scrollTo(0, Math.max(0, yy)), y)
  await new Promise((r) => setTimeout(r, 200))
  const snap = await p.evaluate(() => {
    const sec = document.querySelector('[data-framer-name="Section Process"]')
    const read = (sel) => {
      const el = sec.querySelector(sel)
      const m = getComputedStyle(el).transform.match(/matrix\(([^)]+)\)/)
      const parts = m ? m[1].split(",").map(Number) : [1, 0, 0, 1, 0, 0]
      return +parts[5].toFixed(2)
    }
    return {
      scrollY: Math.round(window.scrollY),
      sectionTop: Math.round(sec.getBoundingClientRect().top),
      r1: read(".framer-vi8nhy"),
      r2: read(".framer-1wzefn9"),
      r3: read(".framer-1fcolx0"),
    }
  })
  samples.push(snap)
  console.log(snap)
}

fs.writeFileSync("scripts/_parallax-full-curve.json", JSON.stringify(samples, null, 2))
await b.close()
