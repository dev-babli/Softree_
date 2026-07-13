import puppeteer from "puppeteer"
import fs from "node:fs"

const b = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] })
const p = await b.newPage()
await p.setViewport({ width: 1440, height: 900 })
await p.goto("https://hanza-template.framer.website/", {
  waitUntil: "networkidle2",
  timeout: 120000,
})
await new Promise((r) => setTimeout(r, 4500))

const box = await p.evaluate(() => {
  const t = [...document.querySelectorAll("p")].find(
    (el) => (el.textContent || "").trim() === "Menu" && el.getBoundingClientRect().top < 120,
  )
  const btn = t?.closest('[data-framer-name="Inverse (Left)"]') || t?.closest("[data-highlight]")
  const r = btn?.getBoundingClientRect()
  return r ? { x: r.left + r.width / 2, y: r.top + r.height / 2 } : null
})
await p.mouse.click(box.x, box.y)
await new Promise((r) => setTimeout(r, 1800))

const cssChunks = await p.evaluate(() => {
  const panel = document.querySelector(".framer-cqh11d-container")
  if (!panel) return { error: "no panel" }

  // Collect unique class tokens from panel tree
  const classes = new Set()
  panel.querySelectorAll("*").forEach((el) => {
    ;(el.className?.toString?.() || "")
      .split(/\s+/)
      .filter((c) => c.startsWith("framer-"))
      .forEach((c) => classes.add(c))
  })
  ;(panel.className?.toString?.() || "")
    .split(/\s+/)
    .filter((c) => c.startsWith("framer-"))
    .forEach((c) => classes.add(c))

  // Pull matching CSS rules from all stylesheets
  const rules = []
  for (const sheet of document.styleSheets) {
    let list
    try {
      list = sheet.cssRules
    } catch {
      continue
    }
    for (const rule of list) {
      const text = rule.cssText || ""
      for (const cls of classes) {
        if (text.includes("." + cls)) {
          rules.push(text)
          break
        }
      }
    }
  }

  // Also dump computed layout of key nodes
  const structure = (() => {
    const walk = (el, depth = 0) => {
      if (!el || depth > 4) return null
      const r = el.getBoundingClientRect()
      return {
        tag: el.tagName,
        name: el.getAttribute("data-framer-name"),
        cls: (el.className || "").toString().slice(0, 80),
        rect: {
          t: Math.round(r.top),
          l: Math.round(r.left),
          w: Math.round(r.width),
          h: Math.round(r.height),
        },
        kids: [...el.children]
          .slice(0, 8)
          .map((c) => walk(c, depth + 1))
          .filter(Boolean),
      }
    }
    return walk(panel)
  })()

  return {
    classCount: classes.size,
    classes: [...classes].sort(),
    cssLen: rules.join("\n").length,
    css: rules.join("\n"),
    structure,
  }
})

fs.writeFileSync(
  "src/components/client-exact/menu-panel.css",
  "/* Extracted live Hanza open-menu styles */\n" + (cssChunks.css || ""),
)
fs.writeFileSync(
  "scripts/_hanza-menu-structure.json",
  JSON.stringify(
    { classCount: cssChunks.classCount, classes: cssChunks.classes, structure: cssChunks.structure },
    null,
    2,
  ),
)
console.log("classes", cssChunks.classCount, "css", cssChunks.cssLen)
console.log(JSON.stringify(cssChunks.structure, null, 2).slice(0, 3000))
await b.close()
