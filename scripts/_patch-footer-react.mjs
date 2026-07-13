import fs from "node:fs"

const p = "src/components/client-exact/sections/FooterSection.tsx"
let s = fs.readFileSync(p, "utf8")
s = s.replace(/tabIndex="0"/g, "tabIndex={0}")
s = s.replace(/tabIndex="-1"/g, "tabIndex={-1}")
s = s.replace(
  /value="" style=\{\{ position: "absolute", transform: "scale\(0\)" \}\}/g,
  'defaultValue="" readOnly style={{ position: "absolute", transform: "scale(0)" }}',
)
fs.writeFileSync(p, s)
console.log(
  "footer patched",
  (s.match(/tabIndex=\{/g) || []).length,
  "honeypots",
  (s.match(/defaultValue=""/g) || []).length,
)
