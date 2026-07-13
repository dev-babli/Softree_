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
  const header = document.querySelector(".framer-xobrsp-container")
  const menuBtn = [...document.querySelectorAll("p,button,a,div")].find(
    (el) => (el.textContent || "").trim() === "Menu" && el.getBoundingClientRect().top < 100,
  )
  const start = [...document.querySelectorAll("a,button")].find((el) =>
    /Start Project/i.test(el.textContent || ""),
  )
  // climb to fixed bar content (not just blur mask)
  let bar = header
  if (header) {
    const kids = [...header.querySelectorAll("*")].filter((el) => {
      const t = (el.innerText || "").trim()
      return /Menu|Local Time|Start Project/i.test(t) && el.children.length < 40
    })
    bar = kids.sort((a, b) => a.children.length - b.children.length)[0] || header
  }

  // find the actual interactive header row
  const row = [...document.querySelectorAll("*")].find((el) => {
    const t = el.innerText || ""
    const r = el.getBoundingClientRect()
    return (
      /Menu/.test(t) &&
      /Local Time/.test(t) &&
      /Start Project/.test(t) &&
      r.height > 40 &&
      r.height < 160 &&
      r.top < 40 &&
      r.width > 800
    )
  })

  // svg sprite: collect all symbol/path defs with numeric ids used by <use>
  const useIds = [...document.querySelectorAll("use")].map((u) =>
    (u.getAttribute("href") || u.getAttribute("xlink:href") || "").replace("#", ""),
  )
  const unique = [...new Set(useIds.filter(Boolean))]
  const defs = []
  for (const id of unique.slice(0, 40)) {
    const el = document.getElementById(id)
    if (el) defs.push(el.outerHTML)
  }

  return {
    headerOuter: header?.outerHTML?.length,
    headerSnippet: header?.outerHTML?.slice(0, 500),
    rowHtml: row?.outerHTML || null,
    rowLen: row?.outerHTML?.length || 0,
    rowCls: row?.className?.toString?.().slice(0, 120),
    menuParent: menuBtn?.closest("[class]")?.className?.toString?.().slice(0, 120),
    startHtml: start?.outerHTML?.slice(0, 400),
    defsCount: defs.length,
    defsJoinedLen: defs.join("").length,
    useIds: unique.slice(0, 20),
  }
})

console.log(JSON.stringify({ ...data, rowHtml: data.rowHtml?.slice(0, 300) }, null, 2))
if (data.rowHtml) {
  fs.writeFileSync(
    "src/components/client-exact/_extracted/sections/floating-header-live.html",
    data.rowHtml,
  )
}

const defs = await p.evaluate(() => {
  const useIds = [...document.querySelectorAll("use")].map((u) =>
    (u.getAttribute("href") || u.getAttribute("xlink:href") || "").replace("#", ""),
  )
  const unique = [...new Set(useIds.filter(Boolean))]
  const parts = []
  for (const id of unique) {
    const el = document.getElementById(id)
    if (el) parts.push(el.outerHTML)
  }
  return parts.join("\n")
})
fs.writeFileSync(
  "src/components/client-exact/_extracted/icon-sprite-inner.html",
  defs,
)
console.log("defs written", defs.length)

await b.close()
