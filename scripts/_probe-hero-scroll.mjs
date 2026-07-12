import puppeteer from "puppeteer"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const fileUrl = "file:///" + path.resolve(__dirname, "../Softree_/client.html").replace(/\\/g, "/")

const b = await puppeteer.launch({ headless: true, args: ["--no-sandbox", "--allow-file-access-from-files"] })
const p = await b.newPage()
await p.setViewport({ width: 1600, height: 900 })
await p.goto(fileUrl, { waitUntil: "networkidle2", timeout: 120000 }).catch(() => {})
await new Promise((r) => setTimeout(r, 6000))

async function sample(label) {
  return p.evaluate((label) => {
    const el = document.querySelector(".framer-1278xai-container")
    const video = el?.querySelector("video")
    const hero = document.querySelector('[data-framer-name="Section Hero"]')
    if (!el) return { label, missing: true }
    const cs = getComputedStyle(el)
    const vs = video ? getComputedStyle(video) : null
    return {
      label,
      scrollY: window.scrollY,
      el: {
        style: el.getAttribute("style"),
        transform: cs.transform,
        opacity: cs.opacity,
        willChange: cs.willChange,
        rect: (() => {
          const r = el.getBoundingClientRect()
          return { t: Math.round(r.top), h: Math.round(r.height), w: Math.round(r.width) }
        })(),
      },
      video: video
        ? {
            transform: vs.transform,
            opacity: vs.opacity,
            style: video.getAttribute("style"),
          }
        : null,
      heroH: hero ? Math.round(hero.getBoundingClientRect().height) : null,
      appearId: el.getAttribute("data-framer-appear-id"),
      attrs: [...el.attributes].map((a) => a.name + "=" + a.value.slice(0, 80)),
    }
  }, label)
}

console.log(JSON.stringify(await sample("top"), null, 2))
await p.evaluate(() => window.scrollTo(0, 300))
await new Promise((r) => setTimeout(r, 400))
console.log(JSON.stringify(await sample("y300"), null, 2))
await p.evaluate(() => window.scrollTo(0, 600))
await new Promise((r) => setTimeout(r, 400))
console.log(JSON.stringify(await sample("y600"), null, 2))
await p.evaluate(() => window.scrollTo(0, 900))
await new Promise((r) => setTimeout(r, 400))
console.log(JSON.stringify(await sample("y900"), null, 2))

await b.close()
