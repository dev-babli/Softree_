import fs from "node:fs"

const p = "src/components/client-exact/sections/FooterSection.tsx"
let s = fs.readFileSync(p, "utf8")
const map = [
  ['href="./"', 'href="#home-hero"'],
  ['href="./portfolio"', 'href="#home-portfolio"'],
  ['href="./about"', 'href="#home-about"'],
  ['href="./contact"', 'href="#home-contact"'],
  ['href="./blog"', 'href="#home-blog"'],
  ['href="./404"', 'href="#home-hero"'],
]
for (const [a, b] of map) s = s.split(a).join(b)
fs.writeFileSync(p, s)
console.log("footer anchors updated")
