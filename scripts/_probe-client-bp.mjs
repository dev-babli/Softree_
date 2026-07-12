import puppeteer from "puppeteer"

const b = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] })
const p = await b.newPage()
await p.setViewport({ width: 1600, height: 900 })
await p.goto("http://localhost:3000/client", { waitUntil: "domcontentloaded", timeout: 120000 })
await new Promise((r) => setTimeout(r, 3500))

const info = await p.evaluate(() => {
  const pick = (sel) => {
    const el = document.querySelector(sel)
    if (!el) return null
    const r = el.getBoundingClientRect()
    const cs = getComputedStyle(el)
    return {
      w: Math.round(r.width),
      h: Math.round(r.height),
      t: Math.round(r.top),
      l: Math.round(r.left),
      op: cs.opacity,
      disp: cs.display,
      flex: cs.flex,
      tf: cs.transform.slice(0, 60),
    }
  }
  return {
    bp: [...document.querySelector("[data-framer-root]")?.classList || []].filter((c) =>
      /framer-(72rtr7|zo2ufi|1g6n99x|1vb5nd8)/.test(c),
    ),
    hero: pick('[data-framer-name="Section Hero"]'),
    wrap: pick(".framer-1he253f"),
    content: pick(".framer-2i1two"),
    headline: pick(".framer-16qcng6"),
    logo: pick(".framer-1wu5efj"),
    videoWrap: pick(".framer-1278xai-container"),
    video: pick("video"),
    services: pick(".framer-v1eolc"),
    rating: pick(".framer-1bjsyq0"),
  }
})

console.log("1600px", JSON.stringify(info, null, 2))
await p.screenshot({ path: "scripts/_client-exact-1600.png", fullPage: false })

await p.setViewport({ width: 1440, height: 900 })
await new Promise((r) => setTimeout(r, 1000))
const info2 = await p.evaluate(() => {
  const el = document.querySelector(".framer-16qcng6")
  const v = document.querySelector(".framer-1278xai-container")
  return {
    bp: [...document.querySelector("[data-framer-root]")?.classList || []].filter((c) =>
      /framer-(72rtr7|zo2ufi|1g6n99x|1vb5nd8)/.test(c),
    ),
    headlineL: el && Math.round(el.getBoundingClientRect().left),
    videoW: v && Math.round(v.getBoundingClientRect().width),
  }
})
console.log("1440px after resize", info2)
await p.screenshot({ path: "scripts/_client-exact-shot.png", fullPage: false })
await b.close()
