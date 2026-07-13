import puppeteer from "puppeteer"

const b = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] })
const p = await b.newPage()
await p.setViewport({ width: 1600, height: 900 })
await p.goto("http://localhost:3000/client", { waitUntil: "domcontentloaded", timeout: 120000 })
await new Promise((r) => setTimeout(r, 3500))

const info = await p.evaluate(() => {
  const chain = (sel) => {
    let el = document.querySelector(sel)
    const out = []
    while (el && out.length < 12) {
      const r = el.getBoundingClientRect()
      const cs = getComputedStyle(el)
      out.push({
        tag: el.tagName,
        cls: (el.className?.toString?.() || "").slice(0, 60),
        name: el.getAttribute("data-framer-name"),
        w: Math.round(r.width),
        h: Math.round(r.height),
        l: Math.round(r.left),
        t: Math.round(r.top),
        disp: cs.display,
        pos: cs.position,
        tf: cs.transform,
        overflow: cs.overflow,
        flex: cs.flex,
        width: cs.width,
      })
      el = el.parentElement
    }
    return out
  }
  return {
    headlineChain: chain(".framer-16qcng6"),
    videoChain: chain(".framer-1278xai-container"),
  }
})
console.log(JSON.stringify(info, null, 2))
await b.close()
