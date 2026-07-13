import fs from "node:fs"
import path from "node:path"

const dir = "src/components/client-exact/sections"
const files = fs.readdirSync(dir).filter((f) => f.endsWith(".tsx"))
const out = {}

for (const f of files) {
  const src = fs.readFileSync(path.join(dir, f), "utf8")
  // capture text between > and < that looks like copy (letters)
  const texts = []
  const re = />([^<>{}\n][^<>{}]{2,})</g
  let m
  while ((m = re.exec(src))) {
    const t = m[1].trim()
    if (!t) continue
    if (/^(https?:|\/|#|rgb|var\(|px|%|0|1|2|3|4|5|6|7|8|9)/.test(t)) continue
    if (t.length < 2) continue
    if (/^[\s\d./+\-–—]+$/.test(t)) continue
    texts.push(t)
  }
  // also placeholder attrs
  const ph = [...src.matchAll(/placeholder="([^"]+)"/g)].map((x) => `placeholder:${x[1]}`)
  const alts = [...src.matchAll(/alt="([^"]+)"/g)].map((x) => `alt:${x[1]}`)
  out[f] = [...new Set([...texts, ...ph, ...alts])]
}

fs.writeFileSync(
  ".planning/page-forge/client-vigorous/00-COPY-INVENTORY.json",
  JSON.stringify(out, null, 2),
)
console.log(
  Object.entries(out)
    .map(([k, v]) => `${k}: ${v.length} strings`)
    .join("\n"),
)
