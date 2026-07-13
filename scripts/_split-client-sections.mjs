import fs from "node:fs"
import path from "node:path"

const main = fs.readFileSync(
  path.join(process.cwd(), "src/components/client-exact/_extracted/main-inner.html"),
  "utf8",
)

function extractNamedSection(html, name) {
  const needle = `data-framer-name="${name}"`
  const idx = html.indexOf(needle)
  if (idx < 0) return null
  // walk back to opening tag (<section or <div or <nav)
  let start = idx
  while (start > 0 && html[start] !== "<") start--
  const openMatch = html.slice(start, start + 20).match(/^<(section|div|nav|header|footer)\b/i)
  if (!openMatch) return null
  const tag = openMatch[1].toLowerCase()
  const openRe = new RegExp(`<${tag}\\b`, "gi")
  const closeRe = new RegExp(`</${tag}>`, "gi")

  let i = start
  let depth = 0
  while (i < html.length) {
    openRe.lastIndex = i
    closeRe.lastIndex = i
    const open = openRe.exec(html)
    const close = closeRe.exec(html)
    const nextOpen = open && open.index >= i ? open.index : Infinity
    const nextClose = close && close.index >= i ? close.index : Infinity
    if (nextOpen === Infinity && nextClose === Infinity) break
    if (nextOpen < nextClose) {
      depth++
      i = nextOpen + 1
    } else {
      depth--
      i = nextClose + `</${tag}>`.length
      if (depth === 0) return html.slice(start, i)
    }
  }
  return null
}

const sectionOrder = [
  "Section Hero",
  "Section Logos",
  "Section About",
  "Section Portfolio",
  "Section Services",
  "Section Process",
  "Section Testimonials",
  "Section Stats",
  "Section Casy Study",
  "Section Pricing",
  "Section FAQ",
  "Section Blog",
]

const sectionsDir = path.join(process.cwd(), "src/components/client-exact/_extracted/sections")
fs.mkdirSync(sectionsDir, { recursive: true })

const manifest = []
for (const name of sectionOrder) {
  const chunk = extractNamedSection(main, name)
  if (!chunk) {
    console.warn("MISSING", name)
    continue
  }
  const slug = name
    .replace(/^Section\s+/i, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
  const file = `${slug}.html`
  fs.writeFileSync(path.join(sectionsDir, file), chunk)
  manifest.push({ name, slug, file, chars: chunk.length })
  console.log("OK", name, chunk.length)
}

const nav = extractNamedSection(main, "Nav")
if (nav) {
  fs.writeFileSync(path.join(sectionsDir, "nav.html"), nav)
  manifest.push({ name: "Nav", slug: "nav", file: "nav.html", chars: nav.length })
  console.log("OK Nav", nav.length)
}

// Extract Main Wrapper / framer-root shell start+end for page chrome
const rootIdx = main.indexOf('data-framer-root=""')
let rootStart = rootIdx
while (rootStart > 0 && main[rootStart] !== "<") rootStart--
const rootOpenEnd = main.indexOf(">", rootIdx) + 1
const rootOpenTag = main.slice(rootStart, rootOpenEnd)
fs.writeFileSync(path.join(process.cwd(), "src/components/client-exact/_extracted/root-open.txt"), rootOpenTag)

fs.writeFileSync(
  path.join(process.cwd(), "src/components/client-exact/_extracted/sections-manifest.json"),
  JSON.stringify(manifest, null, 2),
)
console.log("manifest", manifest.length)
