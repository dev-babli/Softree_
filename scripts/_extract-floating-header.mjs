import fs from "node:fs"
import { parse } from "node-html-parser"

const main = fs.readFileSync(
  "src/components/client-exact/_extracted/main-inner.html",
  "utf8",
)

// Extract floating header container (MENU / time / Start Project)
const root = parse(main, { comment: true })
const header = root.querySelector(".framer-xobrsp-container")
if (!header) {
  console.error("header not found")
  process.exit(1)
}
fs.writeFileSync(
  "src/components/client-exact/_extracted/sections/floating-header.html",
  header.toString(),
)
console.log("header chars", header.toString().length)

// Also grab layout template wrapper classes for CSS
const layout = root.querySelector(".framer-3L5GK")
console.log("layout class", layout?.getAttribute("class"))
console.log("layout children", layout?.childNodes.filter((n) => n.nodeType === 1).map((n) => n.getAttribute?.("class") || n.rawTagName))

// SVG symbol defs from client.html
const h = fs.readFileSync("Softree_/client.html", "utf8")
const svgDefs = [...h.matchAll(/<svg[^>]*>[\s\S]*?<\/svg>/gi)]
  .map((m) => m[0])
  .filter((s) => /id=["']?\d+["']?/.test(s) || /<symbol|<defs|<use/.test(s))
console.log("svg blocks with ids", svgDefs.length)
// Framer often puts icons in a hidden sprite
const spriteIdx = h.indexOf('id="3166100823"')
console.log("icon sprite idx", spriteIdx)
if (spriteIdx >= 0) {
  const start = h.lastIndexOf("<svg", spriteIdx)
  const end = h.indexOf("</svg>", spriteIdx) + 6
  const chunk = h.slice(start, end)
  fs.writeFileSync("src/components/client-exact/_extracted/icon-sprite.svg", chunk)
  console.log("sprite chars", chunk.length)
}

// Count amp;amp; in sections
let amp = 0
for (const f of fs.readdirSync("src/components/client-exact/sections")) {
  if (!f.endsWith(".tsx")) continue
  const t = fs.readFileSync(`src/components/client-exact/sections/${f}`, "utf8")
  const n = (t.match(/&amp;amp;/g) || []).length
  if (n) console.log(f, "amp;amp;", n)
  amp += n
}
console.log("total amp;amp;", amp)
