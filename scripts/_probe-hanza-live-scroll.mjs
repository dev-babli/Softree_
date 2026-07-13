import puppeteer from "puppeteer"

const b = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] })
const p = await b.newPage()
await p.setViewport({ width: 1600, height: 900 })
await p.goto("https://hanza-template.framer.website/", {
  waitUntil: "networkidle2",
  timeout: 120000,
})
await new Promise((r) => setTimeout(r, 5000))

async function sample(label) {
  return p.evaluate((label) => {
    const el =
      document.querySelector(".framer-1278xai-container") ||
      document.querySelector('[data-framer-name="Section Hero"] video')?.parentElement
    const video = document.querySelector('[data-framer-name="Section Hero"] video')
    const hero = document.querySelector('[data-framer-name="Section Hero"]')
    if (!el) {
      return {
        label,
        missing: true,
        videos: document.querySelectorAll("video").length,
        body: document.body.innerText.slice(0, 120),
      }
    }
    const cs = getComputedStyle(el)
    const parseMatrix = (t) => {
      const m = t.match(/matrix\(([^)]+)\)/)
      if (!m) return { raw: t }
      const n = m[1].split(",").map(Number)
      return { a: n[0], d: n[3], tx: n[4], ty: n[5], scale: n[0] }
    }
    return {
      label,
      scrollY: Math.round(window.scrollY),
      transform: parseMatrix(cs.transform),
      opacity: cs.opacity,
      styleAttr: el.getAttribute("style")?.slice(0, 160),
      videoTransform: video ? getComputedStyle(video).transform : null,
      heroTop: hero ? Math.round(hero.getBoundingClientRect().top) : null,
      elTop: Math.round(el.getBoundingClientRect().top),
      elH: Math.round(el.getBoundingClientRect().height),
      elW: Math.round(el.getBoundingClientRect().width),
    }
  }, label)
}

const points = [0, 100, 200, 300, 450, 600, 750, 900]
for (const y of points) {
  await p.evaluate((y) => window.scrollTo(0, y), y)
  await new Promise((r) => setTimeout(r, 350))
  console.log(JSON.stringify(await sample(`y${y}`)))
}

await b.close()
