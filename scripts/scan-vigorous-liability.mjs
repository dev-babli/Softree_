import fs from "node:fs"
import path from "node:path"

const dir = "src/components/client-exact/sections"
const needles = [
  "Hanza",
  "HaNZA",
  "HANZA",
  "Goodwell",
  "Ikigai",
  "Prague",
  "Gola",
  "$3,",
  "$7,",
  "$12,",
  "122+",
  "128k",
  "4.2M",
  "84+",
  "12+",
  "Framer Expert",
  "Ahoj",
  "Start Project",
  "/Hanza",
  "founders, studios",
  "websites in Framer",
  "Next Website",
]

for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".tsx"))) {
  const lines = fs.readFileSync(path.join(dir, f), "utf8").split(/\n/)
  lines.forEach((l, i) => {
    if (
      l.includes("Exact Hanza") ||
      l.includes("Hanza scroll") ||
      l.includes("open-menu panel") ||
      l.includes("Hanza Framer") ||
      l.includes("live Hanza")
    )
      return
    for (const n of needles) {
      if (l.includes(n)) {
        console.log(`${f}:${i + 1}: ${l.trim().slice(0, 140)}`)
        break
      }
    }
  })
}
