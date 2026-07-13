import puppeteer from "puppeteer"
import fs from "node:fs"

async function sample(url, label) {
  const b = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] })
  const p = await b.newPage()
  await p.setViewport({ width: 1600, height: 900 })
  await p.goto(url, { waitUntil: "networkidle2", timeout: 120000 })
  await new Promise((r) => setTimeout(r, 4000))

  await p.evaluate(() =>
    document
      .querySelector('[data-framer-name="Section Process"]')
      ?.scrollIntoView({ block: "start" }),
  )
  await new Promise((r) => setTimeout(r, 500))

  const rows = []
  for (let i = 0; i < 6; i++) {
    const snap = await p.evaluate((step) => {
      const sec = document.querySelector('[data-framer-name="Section Process"]')
      const read = (sel) => {
        const el = sec?.querySelector(sel)
        if (!el) return null
        const m = getComputedStyle(el).transform.match(/matrix\(([^)]+)\)/)
        const parts = m ? m[1].split(",").map(Number) : null
        return {
          ty: parts ? +parts[5].toFixed(1) : 0,
          top: Math.round(el.getBoundingClientRect().top),
        }
      }
      return {
        step,
        scrollY: Math.round(window.scrollY),
        sectionTop: Math.round(sec.getBoundingClientRect().top),
        r1: read(".framer-vi8nhy"),
        r2: read(".framer-1wzefn9"),
        r3: read(".framer-1fcolx0"),
      }
    }, i)
    rows.push(snap)
    await p.evaluate(() => window.scrollBy(0, 160))
    await new Promise((r) => setTimeout(r, 250))
  }

  await p.screenshot({ path: `scripts/_parallax-${label}-process-v2.png`, fullPage: false })

  // testimonials
  await p.evaluate(() =>
    document
      .querySelector('[data-framer-name="Section Testimonials"]')
      ?.scrollIntoView({ block: "start" }),
  )
  await new Promise((r) => setTimeout(r, 400))
  const testi = await p.evaluate(() => {
    const sec = document.querySelector('[data-framer-name="Section Testimonials"]')
    const read = (sel) => {
      const el = sec?.querySelector(sel)
      if (!el) return null
      const m = getComputedStyle(el).transform.match(/matrix\(([^)]+)\)/)
      const parts = m ? m[1].split(",").map(Number) : null
      return { ty: parts ? +parts[5].toFixed(1) : 0 }
    }
    return {
      sectionTop: Math.round(sec.getBoundingClientRect().top),
      g1: read(".framer-cf67t"),
      g2: read(".framer-9xwwk9"),
      sticky: getComputedStyle(sec.querySelector(".framer-1msv653")).position,
    }
  })

  await b.close()
  return { label, rows, testi }
}

const hanza = await sample("https://hanza-template.framer.website/", "hanza")
const client = await sample("http://localhost:3000/client", "client")

const cmp = hanza.rows.map((h, i) => {
  const c = client.rows[i]
  return {
    step: i,
    hanza: { st: h.sectionTop, r1: h.r1?.ty, r2: h.r2?.ty, r3: h.r3?.ty },
    client: { st: c?.sectionTop, r1: c?.r1?.ty, r2: c?.r2?.ty, r3: c?.r3?.ty },
    d1: c?.r1 && h.r1 ? +(c.r1.ty - h.r1.ty).toFixed(1) : null,
    d2: c?.r2 && h.r2 ? +(c.r2.ty - h.r2.ty).toFixed(1) : null,
    d3: c?.r3 && h.r3 ? +(c.r3.ty - h.r3.ty).toFixed(1) : null,
  }
})

fs.writeFileSync(
  "scripts/_parallax-verify-loop.json",
  JSON.stringify({ cmp, hanzaTesti: hanza.testi, clientTesti: client.testi }, null, 2),
)
console.log(JSON.stringify({ cmp, hanzaTesti: hanza.testi, clientTesti: client.testi }, null, 2))
