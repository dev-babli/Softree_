import fs from "node:fs"

const css = fs.readFileSync("src/components/client-exact/framer-ssr.css", "utf8")
// Find all framer-6rypv variant classes
const variants = uniq([...css.matchAll(/\.framer-6rypv\.framer-v-([a-z0-9]+)/g)].map((m) => m[1]))
console.log("6rypv variants", variants)

for (const v of variants) {
  // look for height / content rules
  const re = new RegExp(
    `framer-6rypv\\.framer-v-${v}[^{]*\\{[^}]{0,300}`,
    "g",
  )
  const m = [...css.matchAll(re)].slice(0, 2)
  if (!m.length) continue
  console.log("\n", v)
  m.forEach((x) => console.log(x[0].slice(0, 280)))
}

function uniq(a) {
  return [...new Set(a)]
}

// FAQ kWrVV variants
const faqV = uniq([...css.matchAll(/\.framer-kWrVV\.framer-v-([a-z0-9]+)/g)].map((m) => m[1]))
console.log("\nkWrVV variants", faqV)
for (const v of faqV) {
  const re = new RegExp(`framer-kWrVV\\.framer-v-${v}[^{]*\\{[^}]{0,250}`, "g")
  const m = [...css.matchAll(re)].slice(0, 1)
  if (m[0]) console.log(v, m[0][0].slice(0, 220))
}
