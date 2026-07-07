import fs from "node:fs"

const t = fs.readFileSync("src/components/softree-agentic-exact/referenceContent.ts", "utf8")
const m = t.match(/export const SOFTREE_AGENTIC_REFERENCE_CSS = "([\s\S]*)";/)
const css = m[1].replace(/\\n/g, "\n").replace(/\\"/g, '"')

console.log("length", css.length)
console.log("has script tag", css.includes("<script"))
console.log("has k2Scroll", css.includes("k2Scroll"))
console.log("has </style>", css.includes("</style>"))

const idx = css.indexOf("k2Scroll")
if (idx >= 0) console.log("k2Scroll context:\n", css.slice(idx - 100, idx + 800))

const idx2 = css.indexOf("<script")
if (idx2 >= 0) console.log("script context:\n", css.slice(idx2, idx2 + 200))
