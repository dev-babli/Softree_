import puppeteer from "puppeteer"
import fs from "node:fs"

const b = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] })
const p = await b.newPage()
await p.setViewport({ width: 1600, height: 900 })
await p.goto("https://hanza-template.framer.website/", {
  waitUntil: "networkidle2",
  timeout: 120000,
})
await new Promise((r) => setTimeout(r, 5000))

const data = await p.evaluate(() => {
  const menu = [...document.querySelectorAll("p")].find(
    (el) => (el.textContent || "").trim() === "Menu",
  )
  // climb until we get a wide fixed-ish bar containing all three
  let el = menu
  let best = null
  while (el && el !== document.body) {
    const t = el.innerText || ""
    const r = el.getBoundingClientRect()
    if (
      /Menu/.test(t) &&
      /Local Time/.test(t) &&
      /Start Project/.test(t) &&
      r.width > 1000
    ) {
      best = el
      break
    }
    el = el.parentElement
  }

  // also find layout siblings
  const layout = document.querySelector(".framer-3L5GK")
  const kids = layout
    ? [...layout.children].map((c) => ({
        cls: c.className?.toString?.().slice(0, 100),
        text: (c.innerText || "").slice(0, 80).replace(/\n/g, " | "),
        h: Math.round(c.getBoundingClientRect().height),
        pos: getComputedStyle(c).position,
        z: getComputedStyle(c).zIndex,
      }))
    : []

  return {
    bestCls: best?.className?.toString?.().slice(0, 150),
    bestLen: best?.outerHTML?.length,
    bestHtml: best?.outerHTML || null,
    kids,
  }
})

console.log(
  JSON.stringify(
    {
      bestCls: data.bestCls,
      bestLen: data.bestLen,
      kids: data.kids,
      snippet: data.bestHtml?.slice(0, 400),
    },
    null,
    2,
  ),
)

if (data.bestHtml) {
  fs.writeFileSync(
    "src/components/client-exact/_extracted/sections/topbar-live.html",
    data.bestHtml,
  )
  console.log("wrote topbar-live.html", data.bestHtml.length)
}

await b.close()
