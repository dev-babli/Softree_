import fs from "node:fs"

const t = fs.readFileSync("src/components/kore-ai-exact/referenceContent.ts", "utf8")
const m = t.match(/export const KORE_AI_REFERENCE_CSS = "([\s\S]*)";/)
const css = m[1].replace(/\\n/g, "\n").replace(/\\"/g, '"')

const ks = css.indexOf("const k2Scroll =")
console.log("before k2Scroll (500 chars):\n", css.slice(ks - 500, ks))
console.log("\nafter k2Scroll start (200 chars):\n", css.slice(ks, ks + 200))

// find script near k2Scroll
const scriptBefore = css.lastIndexOf("<script", ks)
const scriptAfter = css.indexOf("<script", ks)
console.log("\nscript before", scriptBefore, "after", scriptAfter)
if (scriptBefore >= 0) console.log("script tag:", css.slice(scriptBefore, scriptBefore + 100))
