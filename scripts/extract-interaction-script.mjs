import fs from "node:fs"

const t = fs.readFileSync("src/components/kore-ai-exact/referenceContent.ts", "utf8")
const m = t.match(/export const KORE_AI_INTERACTION_SCRIPT = "([\s\S]*)";/)
if (!m) throw new Error("no script")
const script = m[1].replace(/\\n/g, "\n").replace(/\\"/g, '"')
fs.writeFileSync(".planning/page-forge/kore-ai-exact/interaction-script.js", script)

const needles = ["data-scroll", "data-stagger", "data-split", "SplitType", "meet-artemis", "k2-loader", ".on", "ready"]
for (const n of needles) {
  const idx = script.indexOf(n)
  console.log(n, idx >= 0 ? `found @ ${idx}` : "missing")
}

// extract chunks around data-scroll
let pos = 0
let count = 0
while ((pos = script.indexOf("data-scroll", pos)) >= 0 && count < 5) {
  console.log("\n--- chunk ---\n", script.slice(Math.max(0, pos - 120), pos + 400))
  pos += 9
  count++
}
