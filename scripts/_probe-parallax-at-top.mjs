import puppeteer from "puppeteer"

const b = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] })
const p = await b.newPage()
await p.setViewport({ width: 1600, height: 900 })
await p.goto("https://hanza-template.framer.website/", {
  waitUntil: "networkidle2",
  timeout: 120000,
})
await new Promise((r) => setTimeout(r, 4000))

// At page top — is Process already transformed?
await p.evaluate(() => window.scrollTo(0, 0))
await new Promise((r) => setTimeout(r, 300))
const atTop = await p.evaluate(() => {
  const sec = document.querySelector('[data-framer-name="Section Process"]')
  const read = (sel) => {
    const el = sec.querySelector(sel)
    const m = getComputedStyle(el).transform.match(/matrix\(([^)]+)\)/)
    const parts = m ? m[1].split(",").map(Number) : [1, 0, 0, 1, 0, 0]
    return { ty: +parts[5].toFixed(1), t: getComputedStyle(el).transform }
  }
  return {
    sectionTop: Math.round(sec.getBoundingClientRect().top),
    r1: read(".framer-vi8nhy"),
    r2: read(".framer-1wzefn9"),
    r3: read(".framer-1fcolx0"),
  }
})
console.log("at page top", JSON.stringify(atTop, null, 2))

// Scroll until sectionTop ~= 900, 0, -300 and compare
for (const target of [1200, 900, 450, 0, -300, -600, -800]) {
  await p.evaluate((t) => {
    const sec = document.querySelector('[data-framer-name="Section Process"]')
    const top = sec.getBoundingClientRect().top + window.scrollY
    window.scrollTo(0, top - t)
  }, target)
  await new Promise((r) => setTimeout(r, 250))
  const snap = await p.evaluate(() => {
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
  })
  console.log(snap)
}
await b.close()
