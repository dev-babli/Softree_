import fs from "node:fs"

const t = fs.readFileSync("src/components/kore-ai-exact/referenceContent.ts", "utf8")
const m = t.match(/export const KORE_AI_REFERENCE_CSS = "([\s\S]*)";/)
const css = m[1].replace(/\\n/g, "\n").replace(/\\"/g, '"')

let pos = 0
let i = 0
while ((pos = css.indexOf("</style>", pos)) >= 0 && i < 5) {
  console.log(`\n=== break ${i} @ ${pos} ===`)
  console.log(css.slice(Math.max(0, pos - 80), pos + 300))
  pos += 8
  i++
}

// find k2Scroll function definition
const ks = css.indexOf("const k2Scroll =")
console.log("\nk2Scroll def @", ks)
if (ks >= 0) console.log(css.slice(ks, ks + 1200))
