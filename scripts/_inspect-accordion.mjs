import fs from "node:fs"

const css = fs.readFileSync("src/components/client-exact/framer-ssr.css", "utf8")
const faq = fs.readFileSync(
  "src/components/client-exact/_extracted/sections/faq.html",
  "utf8",
)
const svc = fs.readFileSync(
  "src/components/client-exact/_extracted/sections/services.html",
  "utf8",
)

function uniq(arr) {
  return [...new Set(arr)]
}

console.log(
  "faq open names",
  uniq([...faq.matchAll(/data-framer-name="([^"]*Open[^"]*)"/g)].map((m) => m[1])),
)
console.log(
  "faq close names",
  uniq([...faq.matchAll(/data-framer-name="([^"]*Close[^"]*)"/g)].map((m) => m[1])),
)
console.log(
  "faq variants",
  uniq([...faq.matchAll(/framer-v-([a-z0-9]+)/g)].map((m) => m[1])),
)
console.log(
  "svc open names",
  uniq([...svc.matchAll(/data-framer-name="([^"]*Open[^"]*)"/g)].map((m) => m[1])),
)
console.log(
  "svc close names",
  uniq([...svc.matchAll(/data-framer-name="([^"]*Close[^"]*)"/g)].map((m) => m[1])),
)
console.log(
  "svc variants",
  uniq([...svc.matchAll(/framer-v-([a-z0-9]+)/g)].map((m) => m[1])),
)

for (const v of ["1ar9q8m", "1kpnvul", "p2ymbf", "1tub5gf"]) {
  const idx = css.indexOf(`framer-v-${v}`)
  console.log("\n===", v, "at", idx)
  if (idx >= 0) console.log(css.slice(idx, idx + 500))
}

// How many Content blocks with text in faq
const contents = [...faq.matchAll(/data-framer-name="Content"[^>]*>[\s\S]*?<\/div>/g)]
console.log("\nfaq content chunks", contents.length)
console.log(
  "faq paragraphs in content",
  (faq.match(/framer-styles-preset-21ogod/g) || []).length,
)
