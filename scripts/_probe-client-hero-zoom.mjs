import puppeteer from "puppeteer"

const b = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] })
const p = await b.newPage()
await p.setViewport({ width: 1600, height: 900 })
await p.goto("http://localhost:3000/client", { waitUntil: "domcontentloaded", timeout: 120000 })
await new Promise((r) => setTimeout(r, 3500))

async function sample(label) {
  return p.evaluate((label) => {
    const el = document.querySelector(".framer-1278xai-container")
    if (!el) return { label, missing: true }
    const cs = getComputedStyle(el)
    const m = cs.transform.match(/matrix\(([^)]+)\)/)
    const n = m ? m[1].split(",").map(Number) : null
    return {
      label,
      scrollY: Math.round(window.scrollY),
      scale: n ? +n[0].toFixed(5) : cs.transform,
      ty: n ? +n[5].toFixed(2) : null,
      opacity: +(+cs.opacity).toFixed(5),
    }
  }, label)
}

for (const y of [0, 300, 600, 900]) {
  await p.evaluate((y) => window.scrollTo(0, y), y)
  await new Promise((r) => setTimeout(r, 250))
  console.log(JSON.stringify(await sample(`y${y}`)))
}

await b.close()
