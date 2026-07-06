import fs from "node:fs"

const t = fs.readFileSync("src/components/kore-ai-exact/referenceContent.ts", "utf8")
const m = t.match(/export const KORE_AI_REFERENCE_CSS = "([\s\S]*)";/)
if (!m) throw new Error("no css export")
const css = m[1].replace(/\\n/g, "\n")

const needles = [
  "k2-section-hero",
  "k2-container-hero",
  "data-stagger",
  ".char",
  "data-split",
  "flip-target",
  "k2-hero",
]

for (const needle of needles) {
  const re = new RegExp(`[^{}]{0,80}${needle.replace(".", "\\.")}[^{}]{0,200}`, "g")
  const hits = css.match(re) ?? []
  console.log(`\n=== ${needle} (${hits.length}) ===`)
  hits.slice(0, 12).forEach((h) => console.log(h.replace(/\s+/g, " ").slice(0, 240)))
}
