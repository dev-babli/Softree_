import fs from "node:fs"
import path from "node:path"

const html = fs.readFileSync(path.join(process.cwd(), "Softree_", "client.html"), "utf8")
const outDir = path.join(process.cwd(), "src", "components", "client-exact", "_extracted")
fs.mkdirSync(outDir, { recursive: true })

// Extract all style blocks (fonts + ssr css)
const styles = [...html.matchAll(/<style([^>]*)>([\s\S]*?)<\/style>/g)]
const cssParts = []
for (const m of styles) {
  const attrs = m[1]
  // skip editorbar-only tiny styles that reference __framer-editorbar
  if (m[2].includes("__framer-editorbar") && m[2].length < 5000) continue
  cssParts.push(m[2])
}
fs.writeFileSync(path.join(outDir, "framer-ssr.css"), cssParts.join("\n\n"))
console.log("CSS chars:", cssParts.reduce((a, c) => a + c.length, 0))

// Extract #main inner HTML (from <div id="main" ...> to matching close before script)
const mainOpen = html.indexOf('<div id="main"')
if (mainOpen < 0) throw new Error("no #main")
// find end of opening tag
const mainTagEnd = html.indexOf(">", mainOpen) + 1
// Framer puts scripts after #main; find </div> before the first script after main
// Better: find the closing of #main by looking for pattern after main content
const afterMain = html.slice(mainTagEnd)
const scriptIdx = afterMain.search(/\n\s*<script/)
const mainInner = afterMain.slice(0, scriptIdx)
// The mainInner may include trailing closing divs for #main
fs.writeFileSync(path.join(outDir, "main-inner.html"), mainInner)
console.log("main-inner chars:", mainInner.length)

// Split by data-framer-name="Section ..."
const sectionNames = [...mainInner.matchAll(/data-framer-name="(Section [^"]+)"/g)].map((m) => m[1])
console.log("sections:", sectionNames)

// Also list top-level framer children of main wrapper
const names = [...mainInner.matchAll(/data-framer-name="([^"]+)"/g)].map((m) => m[1])
const sectionish = names.filter((n) => /^Section |^Nav$|^Hero$|^Main Wrapper$/i.test(n) || n.startsWith("Section"))
console.log("sectionish unique:", [...new Set(sectionish)])

// Extract modulepreload / script_main URL
const mainScript = (html.match(/src="(https:\/\/framerusercontent\.com\/sites\/[^"]+script_main[^"]+)"/) || [])[1]
const modulepreloads = [...html.matchAll(/href="(https:\/\/framerusercontent\.com\/sites\/[^"]+\.mjs)"/g)].map((m) => m[1])
fs.writeFileSync(
  path.join(outDir, "assets.json"),
  JSON.stringify({ mainScript, modulepreloads: [...new Set(modulepreloads)].slice(0, 30), sectionNames }, null, 2),
)
console.log("mainScript:", mainScript)
console.log("modulepreloads:", modulepreloads.length)
