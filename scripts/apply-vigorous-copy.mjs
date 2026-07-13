import fs from "node:fs"
import path from "node:path"

const dir = "src/components/client-exact/sections"
const files = fs.readdirSync(dir).filter((f) => f.endsWith(".tsx"))

const pairs = [
  ["Hanza Novák ", "Ashish Gangrade "],
  ["Hanza Novák", "Ashish Gangrade"],
  ["Designer &amp; Framer Expert", "CEO, Vigorous Softech"],
  ["Designer & Framer Expert", "CEO, Vigorous Softech"],
  ["Prague, Czechia", "Indore, India"],
  ["/Hanza", "/Vigorous"],
  ["Start Project", "Book Intro"],
  ["122+ Founders", "Leadership perspective"],
  ["Founder at Goodwell", "CEO, Vigorous Softech"],
  ["Founder at Ikigai Labs", "Vigorous Softech · GCC practice"],
  ["See Project", "Book a GCC fit check"],
  ["All Projects", "All Offerings"],
  ["View Project", "Explore"],
  ["My Mission", "Our Mission"],
  ["© 2026 HANZA®", "© 2026 Vigorous Softech Systems Pvt Ltd. All rights reserved."],
  ["Copyright 2026 HANZA®", "Copyright 2026 Vigorous Softech"],
  ['alt="Gola Templates"', 'alt="Vigorous Softech"'],
  ["120 00 Prague", "Indore, MP 452001"],
  ["Goodwell", "GCC Solutions"],
  ["Ikigai", "Digital Services"],
]

for (const f of files) {
  const p = path.join(dir, f)
  let s = fs.readFileSync(p, "utf8")
  let n = 0
  for (const [a, b] of pairs) {
    const c = s.split(a).length - 1
    if (c) {
      s = s.split(a).join(b)
      n += c
    }
  }
  if (n) {
    fs.writeFileSync(p, s)
    console.log(f, n)
  }
}
console.log("done")
