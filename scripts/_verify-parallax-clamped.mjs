import puppeteer from "puppeteer"
import fs from "node:fs"

async function measure(url) {
  const b = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] })
  const p = await b.newPage()
  await p.setViewport({ width: 1600, height: 900 })
  await p.goto(url, { waitUntil: "networkidle2", timeout: 120000 })
  await new Promise((r) => setTimeout(r, 4000))

  const targets = [1200, 900, 450, 0, -150, -300, -600, -800]
  const samples = []
  for (const target of targets) {
    await p.evaluate((t) => {
      const sec = document.querySelector('[data-framer-name="Section Process"]')
      const top = sec.getBoundingClientRect().top + window.scrollY
      window.scrollTo(0, top - t)
    }, target)
    await new Promise((r) => setTimeout(r, 280))
    samples.push(
      await p.evaluate(() => {
        const sec = document.querySelector('[data-framer-name="Section Process"]')
        const read = (sel) => {
          const el = sec.querySelector(sel)
          const m = getComputedStyle(el).transform.match(/matrix\(([^)]+)\)/)
          const parts = m ? m[1].split(",").map(Number) : [1, 0, 0, 1, 0, 0]
          return +parts[5].toFixed(1)
        }
        return {
          sectionTop: Math.round(sec.getBoundingClientRect().top),
          r1: read(".framer-vi8nhy"),
          r2: read(".framer-1wzefn9"),
          r3: read(".framer-1fcolx0"),
        }
      }),
    )
  }

  // portfolio scale mid-section
  await p.evaluate(() => {
    const sec = document.querySelector('[data-framer-name="Section Portfolio"]')
    const top = sec.getBoundingClientRect().top + window.scrollY
    window.scrollTo(0, top - 200)
  })
  await new Promise((r) => setTimeout(r, 300))
  const portfolio = await p.evaluate(() => {
    const el = document.querySelector(
      '[data-framer-name="Section Portfolio"] [data-framer-name="Image"]',
    )
    return el ? getComputedStyle(el).transform : null
  })

  await b.close()
  return { samples, portfolio }
}

const hanza = await measure("https://hanza-template.framer.website/")
const client = await measure("http://localhost:3000/client")

const cmp = hanza.samples.map((h, i) => {
  const c = client.samples[i]
  return {
    targetTop: h.sectionTop,
    h: [h.r1, h.r2, h.r3],
    c: [c.r1, c.r2, c.r3],
    d: [
      +(c.r1 - h.r1).toFixed(1),
      +(c.r2 - h.r2).toFixed(1),
      +(c.r3 - h.r3).toFixed(1),
    ],
  }
})
const maxAbs = Math.max(...cmp.flatMap((x) => x.d.map(Math.abs)))
const out = { cmp, maxAbs, portfolio: { hanza: hanza.portfolio, client: client.portfolio } }
fs.writeFileSync("scripts/_parallax-clamped-cmp.json", JSON.stringify(out, null, 2))
console.log(JSON.stringify(out, null, 2))
