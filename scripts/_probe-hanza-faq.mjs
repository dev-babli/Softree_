import puppeteer from "puppeteer"
import fs from "node:fs"

const b = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] })
const p = await b.newPage()
await p.setViewport({ width: 1600, height: 900 })
await p.goto("https://hanza-template.framer.website/", {
  waitUntil: "networkidle2",
  timeout: 120000,
})
await new Promise((r) => setTimeout(r, 4000))

await p.evaluate(() => {
  document
    .querySelector('[data-framer-name="Section FAQ"]')
    ?.scrollIntoView({ block: "center" })
})
await new Promise((r) => setTimeout(r, 800))

const items = await p.evaluate(() => {
  const sec = document.querySelector('[data-framer-name="Section FAQ"]')
  const rows = [...(sec?.querySelectorAll('[data-highlight="true"]') || [])].filter(
    (el) => /Open|Close/i.test(el.getAttribute("data-framer-name") || ""),
  )
  return rows.map((el, i) => {
    const r = el.getBoundingClientRect()
    return {
      i,
      name: el.getAttribute("data-framer-name"),
      q: el.innerText.split("\n")[0]?.slice(0, 80),
      x: r.left + r.width / 2,
      y: r.top + r.height / 2,
      h: Math.round(r.height),
    }
  })
})
console.log("items", items)

const answers = []
for (const item of items) {
  // re-query box each time (layout shifts)
  const box = await p.evaluate((idx) => {
    const sec = document.querySelector('[data-framer-name="Section FAQ"]')
    const rows = [...(sec?.querySelectorAll('[data-highlight="true"]') || [])].filter(
      (el) => /Open|Close/i.test(el.getAttribute("data-framer-name") || ""),
    )
    const el = rows[idx]
    if (!el) return null
    const r = el.getBoundingClientRect()
    return { x: r.left + r.width / 2, y: r.top + 24 }
  }, item.i)
  if (!box) continue
  await p.mouse.click(box.x, box.y)
  await new Promise((r) => setTimeout(r, 700))
  const state = await p.evaluate((idx) => {
    const sec = document.querySelector('[data-framer-name="Section FAQ"]')
    const rows = [...(sec?.querySelectorAll('[data-highlight="true"]') || [])].filter(
      (el) => /Open|Close/i.test(el.getAttribute("data-framer-name") || ""),
    )
    const el = rows[idx]
    if (!el) return null
    return {
      name: el.getAttribute("data-framer-name"),
      cls: el.className.toString().match(/framer-v-[a-z0-9]+/)?.[0],
      text: el.innerText.replace(/\n+/g, " | ").slice(0, 600),
      h: Math.round(el.getBoundingClientRect().height),
    }
  }, item.i)
  answers.push(state)
  console.log(item.i, state?.name, state?.h, state?.text?.slice(0, 120))
}

fs.writeFileSync(
  "scripts/_hanza-faq-answers.json",
  JSON.stringify({ items, answers }, null, 2),
)
await b.close()
