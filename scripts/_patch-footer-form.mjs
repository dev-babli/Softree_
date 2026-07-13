import fs from "node:fs"

const p = "src/components/client-exact/sections/FooterSection.tsx"
let s = fs.readFileSync(p, "utf8")
s = s.replace(
  /className="framer-form-input framer-form-input-empty" value=""/g,
  'className="framer-form-input framer-form-input-empty" defaultValue=""',
)
// textarea if any
s = s.replace(
  /(<textarea[^>]*className="framer-form-input[^"]*") value=""/g,
  "$1 defaultValue=\"\"",
)
fs.writeFileSync(p, s)
console.log(
  "patched form fields",
  (s.match(/framer-form-input-empty" defaultValue/g) || []).length,
)
