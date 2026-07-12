import fs from "node:fs"

const h = fs.readFileSync("Softree_/client.html", "utf8")
const names = [...h.matchAll(/data-framer-name="([^"]+)"/g)].map((m) => m[1])
const interesting = [...new Set(names)].filter((n) =>
  /Nav|Menu|Header|Button|Time|CTA|Touch|Project|Floating|Bar|Local|Start/i.test(n),
)
console.log("interesting names:\n", interesting.join("\n"))

for (const k of ["MENU", "START PROJECT", "LOCAL TIME", "Get in Touch", "Ahoj", "Designer &amp;"]) {
  const i = h.indexOf(k)
  console.log("\n==", k, i)
  if (i >= 0) console.log(h.slice(Math.max(0, i - 150), i + 200).replace(/\s+/g, " ").slice(0, 350))
}

// find svg symbol defs
const svgIdx = h.indexOf("<svg")
console.log("\nsvg count", (h.match(/<svg/g) || []).length)
const useHrefs = [...h.matchAll(/href="#(\d+)"/g)].map((m) => m[1])
console.log("use hrefs sample", [...new Set(useHrefs)].slice(0, 20))
const symbol = h.includes("id=\"3166100823\"") || h.includes("id='3166100823'")
console.log("has icon symbol 3166100823", symbol)

// floating components outside sections?
const mainIdx = h.indexOf('id="main"')
const afterMain = h.slice(mainIdx, mainIdx + 2000)
console.log("\nmain open:\n", afterMain.slice(0, 800))
