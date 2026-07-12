import puppeteer from "puppeteer"
import fs from "node:fs"

async function measure(url) {
  const b = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] })
  const p = await b.newPage()
  await p.setViewport({ width: 1600, height: 900 })
  await p.goto(url, { waitUntil: "networkidle2", timeout: 120000 })
  await new Promise((r) => setTimeout(r, 4500))

  const scrollToSectionTop = async (target) => {
    for (let i = 0; i < 8; i++) {
      await p.evaluate((t) => {
        const sec = document.querySelector('[data-framer-name="Section Process"]')
        const cur = sec.getBoundingClientRect().top
        window.scrollBy(0, cur - t)
      }, target)
      await new Promise((r) => setTimeout(r, 120))
      const st = await p.evaluate(
        () =>
          Math.round(
            document
              .querySelector('[data-framer-name="Section Process"]')
              .getBoundingClientRect().top,
          ),
      )
      if (Math.abs(st - target) <= 2) return st
    }
    return p.evaluate(
      () =>
        Math.round(
          document
            .querySelector('[data-framer-name="Section Process"]')
            .getBoundingClientRect().top,
        ),
    )
  }

  const targets = [1200, 900, 450, 0, -150, -300, -600, -800]
  const samples = []
  for (const target of targets) {
    const st = await scrollToSectionTop(target)
    const vals = await p.evaluate(() => {
      const sec = document.querySelector('[data-framer-name="Section Process"]')
      const read = (sel) => {
        const el = sec.querySelector(sel)
        const m = getComputedStyle(el).transform.match(/matrix\(([^)]+)\)/)
        const parts = m ? m[1].split(",").map(Number) : [1, 0, 0, 1, 0, 0]
        return +parts[5].toFixed(1)
      }
      return { r1: read(".framer-vi8nhy"), r2: read(".framer-1wzefn9"), r3: read(".framer-1fcolx0") }
    })
    samples.push({ target, st, ...vals })
  }

  await p.screenshot({
    path: `scripts/_parallax-${url.includes("localhost") ? "client" : "hanza"}-locked.png`,
    fullPage: false,
  })
  await b.close()
  return samples
}

const hanza = await measure("https://hanza-template.framer.website/")
const client = await measure("http://localhost:3000/client")

const cmp = hanza.map((h, i) => {
  const c = client[i]
  return {
    target: h.target,
    hSt: h.st,
    cSt: c.st,
    h: [h.r1, h.r2, h.r3],
    c: [c.r1, c.r2, c.r3],
    d: [+(c.r1 - h.r1).toFixed(1), +(c.r2 - h.r2).toFixed(1), +(c.r3 - h.r3).toFixed(1)],
  }
})
const maxAbs = Math.max(...cmp.flatMap((x) => x.d.map(Math.abs)))
const out = { cmp, maxAbs }
fs.writeFileSync("scripts/_parallax-locked-cmp.json", JSON.stringify(out, null, 2))
console.log(JSON.stringify(out, null, 2))
