import puppeteer from "puppeteer"
import fs from "node:fs"

async function probe(url, label) {
  const b = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] })
  const p = await b.newPage()
  await p.setViewport({ width: 1600, height: 900 })
  await p.goto(url, { waitUntil: "networkidle2", timeout: 120000 })
  await new Promise((r) => setTimeout(r, 4500))

  // Scroll to Process
  await p.evaluate(() => {
    document
      .querySelector('[data-framer-name="Section Process"], #home-process')
      ?.scrollIntoView({ block: "start" })
  })
  await new Promise((r) => setTimeout(r, 600))

  const samples = []
  for (let i = 0; i < 8; i++) {
    const snap = await p.evaluate((step) => {
      const sec = document.querySelector(
        '[data-framer-name="Section Process"], #home-process',
      )
      if (!sec) return { step, error: "no process" }

      // Find numbered process cards / sticky columns / images
      const cards = [
        ...sec.querySelectorAll(
          '[data-framer-name*="Card"], [data-framer-name*="Step"], [data-framer-name*="Item"], [data-framer-name="Column"], [data-framer-name="Image"], [data-framer-name="Sticky"]',
        ),
      ]

      // Also any element with transform that looks like parallax
      const transformed = [...sec.querySelectorAll("*")]
        .filter((el) => {
          const cs = getComputedStyle(el)
          const t = cs.transform
          if (!t || t === "none") return false
          const r = el.getBoundingClientRect()
          return r.height > 40 && r.width > 40
        })
        .slice(0, 25)
        .map((el) => {
          const cs = getComputedStyle(el)
          const r = el.getBoundingClientRect()
          return {
            name: el.getAttribute("data-framer-name"),
            cls: (el.className || "").toString().slice(0, 70),
            pos: cs.position,
            transform: cs.transform,
            willChange: cs.willChange,
            top: Math.round(r.top),
            h: Math.round(r.height),
            w: Math.round(r.width),
            text: (el.innerText || "").slice(0, 40).replace(/\n/g, " "),
          }
        })

      // sticky / fixed inside process
      const sticky = [...sec.querySelectorAll("*")]
        .filter((el) => {
          const cs = getComputedStyle(el)
          return cs.position === "sticky" || cs.position === "fixed"
        })
        .slice(0, 15)
        .map((el) => {
          const r = el.getBoundingClientRect()
          return {
            name: el.getAttribute("data-framer-name"),
            cls: (el.className || "").toString().slice(0, 70),
            pos: getComputedStyle(el).position,
            top: getComputedStyle(el).top,
            transform: getComputedStyle(el).transform,
            rectTop: Math.round(r.top),
            h: Math.round(r.height),
            text: (el.innerText || "").slice(0, 50).replace(/\n/g, " "),
          }
        })

      return {
        step,
        scrollY: Math.round(window.scrollY),
        sectionH: Math.round(sec.getBoundingClientRect().height),
        sectionTop: Math.round(sec.getBoundingClientRect().top),
        cardCount: cards.length,
        sticky,
        transformed,
      }
    }, i)
    samples.push(snap)
    await p.evaluate(() => window.scrollBy(0, 220))
    await new Promise((r) => setTimeout(r, 350))
  }

  await p.screenshot({
    path: `scripts/_parallax-${label}-process.png`,
    fullPage: false,
  })

  // Also sample Portfolio + Testimonials + Pricing cards
  const other = await p.evaluate(() => {
    const sections = [
      "Section Portfolio",
      "Section Testimonials",
      "Section Pricing",
      "Section Blog",
      "Section About",
    ]
    const out = {}
    for (const name of sections) {
      const sec = document.querySelector(`[data-framer-name="${name}"]`)
      if (!sec) {
        out[name] = null
        continue
      }
      sec.scrollIntoView({ block: "center" })
      const transformed = [...sec.querySelectorAll("*")]
        .filter((el) => {
          const t = getComputedStyle(el).transform
          const r = el.getBoundingClientRect()
          return t && t !== "none" && r.height > 50 && r.width > 50
        })
        .slice(0, 12)
        .map((el) => ({
          name: el.getAttribute("data-framer-name"),
          cls: (el.className || "").toString().slice(0, 60),
          transform: getComputedStyle(el).transform,
          pos: getComputedStyle(el).position,
        }))
      const sticky = [...sec.querySelectorAll("*")]
        .filter((el) => {
          const p = getComputedStyle(el).position
          return p === "sticky" || p === "fixed"
        })
        .slice(0, 8)
        .map((el) => ({
          name: el.getAttribute("data-framer-name"),
          pos: getComputedStyle(el).position,
          top: getComputedStyle(el).top,
          cls: (el.className || "").toString().slice(0, 50),
        }))
      out[name] = { transformed, sticky }
    }
    return out
  })

  await b.close()
  return { label, samples, other }
}

const hanza = await probe("https://hanza-template.framer.website/", "hanza")
const client = await probe("http://localhost:3000/client", "client")

fs.writeFileSync(
  "scripts/_parallax-process-compare.json",
  JSON.stringify({ hanza, client }, null, 2),
)

// Print concise delta for Process sticky/transform across scroll steps
function summarize(data) {
  return data.samples.map((s) => ({
    step: s.step,
    scrollY: s.scrollY,
    sticky: (s.sticky || []).map((x) => `${x.name||x.cls}|${x.pos}|t${x.rectTop}|${x.transform}`),
    transforms: (s.transformed || [])
      .slice(0, 8)
      .map((x) => `${x.name||x.cls}|${x.transform}|t${x.top}`),
  }))
}

console.log("=== HANZA PROCESS ===")
console.log(JSON.stringify(summarize(hanza), null, 2))
console.log("=== CLIENT PROCESS ===")
console.log(JSON.stringify(summarize(client), null, 2))
console.log("=== HANZA OTHER sticky ===")
for (const [k, v] of Object.entries(hanza.other || {})) {
  console.log(k, "sticky", v?.sticky?.length, "xform", v?.transformed?.length)
  if (v?.sticky?.length) console.log(" ", JSON.stringify(v.sticky))
  if (v?.transformed?.length) console.log(" ", JSON.stringify(v.transformed.slice(0, 4)))
}
