import fs from "node:fs"

const t = fs.readFileSync("src/components/kore-ai-exact/referenceContent.ts", "utf8")
const m = t.match(/export const KORE_AI_REFERENCE_CSS = "([\s\S]*)";/)
const css = m[1].replace(/\\n/g, "\n").replace(/\\"/g, '"')

const start = css.indexOf("/* Scroll Animations */")
const end = css.indexOf("/* Agents Tabs Animations */")
console.log(css.slice(start, end > start ? end : start + 2500))
