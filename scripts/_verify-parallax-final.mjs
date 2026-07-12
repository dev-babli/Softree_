import puppeteer from "puppeteer"
import fs from "node:fs"

async function curve(url, label) {
  const b = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] })
  const p = await b.newPage()
  await p.setViewport({ width: 1600, height: 900 })
  await p.goto(url, { waitUntil: "networkidle2", timeout: 120000 })
  await new Promise((r) => setTimeout(r, 4000))

  const processTop = await p.evaluate(() => {
    const sec = document.querySelector('[data-framer-name="Section Process"]')
    return Math.round(sec.getBoundingClientRect().top + window.scrollY)
  })

  const samples = []
  for (const delta of [-900, -450, 0, 150, 300, 600, 900]) {
    const y = processTop + delta
    // delta here: negative = before section, 0 = section at top, positive = scrolled past
    await p.evaluate((yy) => window.scrollTo(0, Math.max(0, yy)), y)
    await new Promise((r) => setTimeout(r, 220))
    const snap = await p.evaluate(() => {
      const sec = document.querySelector('[data-framer-name="Section Process"]')
      const read = (sel) => {
        const el = sec.querySelector(sel)
        if (!el) return null
        const m = getComputedStyle(el).transform.match(/matrix\(([^)]+)\)/)
        const parts = m ? m[1].split(",").map(Number) : [1, 0, 0, 1, 0, 0]
        return +parts[5].toFixed(1)
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
  }

  // testimonials at section top
  const testiTop = await p.evaluate(() => {
    const sec = document.querySelector('[data-framer-name="Section Testimonials"]')
    return Math.round(sec.getBoundingClientRect().top + window.scrollY)
  })
  await p.evaluate((yy) => window.scrollTo(0, yy), testiTop)
  await new Promise((r) => setTimeout(r, 300))
  const testi = await p.evaluate(() => {
    const sec = document.querySelector('[data-framer-name="Section Testimonials"]')
    const read = (sel) => {
      const el = sec.querySelector(sel)
      const m = getComputedStyle(el).transform.match(/matrix\(([^)]+)\)/)
      const parts = m ? m[1].split(",").map(Number) : [1, 0, 0, 1, 0, 0]
      return +parts[5].toFixed(1)
    }
    return {
      sectionTop: Math.round(sec.getBoundingClientRect().top),
      g1: read(".framer-cf67t"),
      g2: read(".framer-9xwwk9"),
    }
  })

  await p.screenshot({ path: `scripts/_parallax-${label}-final.png`, fullPage: false })
  await b.close()
  return { label, processTop, samples, testi }
}

const hanza = await curve("https://hanza-template.framer.website/", "hanza")
const client = await curve("http://localhost:3000/client", "client")

const cmp = hanza.samples.map((h, i) => {
  const c = client.samples[i]
  return {
    st: h.sectionTop,
    h: [h.r1, h.r2, h.r3],
    c: [c?.r1, c?.r2, c?.r3],
    d: [
      c?.r1 != null ? +(c.r1 - h.r1).toFixed(1) : null,
      c?.r2 != null ? +(c.r2 - h.r2).toFixed(1) : null,
      c?.r3 != null ? +(c.r3 - h.r3).toFixed(1) : null,
    ],
  }
})

const out = {
  cmp,
  testi: { hanza: hanza.testi, client: client.testi },
  maxAbsDelta: Math.max(...cmp.flatMap((x) => x.d.map((v) => Math.abs(v || 0)))),
}
fs.writeFileSync("scripts/_parallax-final-cmp.json", JSON.stringify(out, null, 2))
console.log(JSON.stringify(out, null, 2))
