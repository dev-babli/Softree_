import puppeteer from "puppeteer"

const b = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] })
const p = await b.newPage()
await p.setViewport({ width: 1440, height: 900 })
await p.goto("http://localhost:3000/client", { waitUntil: "domcontentloaded", timeout: 120000 })
await new Promise((r) => setTimeout(r, 3500))

const info = await p.evaluate(() => {
  const pick = (sel) => {
    const el = document.querySelector(sel)
    if (!el) return null
    const r = el.getBoundingClientRect()
    const cs = getComputedStyle(el)
    return {
      sel,
      w: Math.round(r.width),
      h: Math.round(r.height),
      t: Math.round(r.top),
      l: Math.round(r.left),
      op: cs.opacity,
      vis: cs.visibility,
      disp: cs.display,
      tf: cs.transform.slice(0, 80),
      text: (el.innerText || "").slice(0, 100),
    }
  }
  return {
    ready: document.querySelector(".client-exact-framer-shell")?.classList.contains("cx-ready"),
    hero: pick('[data-framer-name="Section Hero"]'),
    headline: pick(".framer-16qcng6"),
    logo: pick(".framer-1wu5efj"),
    videoWrap: pick(".framer-1278xai-container"),
    video: pick("video"),
    services: pick(".framer-v1eolc"),
    rating: pick(".framer-1bjsyq0"),
    bodyText: document.body.innerText.slice(0, 500),
    hasDangerous: !!document.querySelector("[data-cx-injected]"),
    sectionTags: [...document.querySelectorAll("[data-framer-name^='Section ']")]
      .map((el) => el.tagName + ":" + el.getAttribute("data-framer-name"))
      .slice(0, 15),
  }
})

console.log(JSON.stringify(info, null, 2))
await p.screenshot({ path: "scripts/_client-exact-shot.png", fullPage: false })
await p.screenshot({ path: "scripts/_client-exact-full.png", fullPage: true })
await b.close()
