import fs from "node:fs"

const html = await fetch("https://www.softreetechnology.com/ai-agent-platform").then((r) => r.text())
const cssUrls = [...html.matchAll(/href="([^"]+\.css[^"]*)"/g)]
  .map((m) => m[1])
  .filter((u) => u.includes("website-files"))

console.log("css urls:", cssUrls.length)

const needles = ["78b56fe7", "14221f46", "display-5", "k2-loader-bar-item", "k2-heading"]

for (const url of cssUrls) {
  const css = await fetch(url).then((r) => r.text())
  const hits = needles.filter((n) => css.includes(n))
  if (hits.length) {
    console.log("\nHITS in", url)
    console.log("  ", hits.join(", "))
    for (const id of ["78b56fe7-8c75-0360-85cb-da3212be0c74", "14221f46-b77f-f549-1365-c3cf0146a3ed"]) {
      const re = new RegExp(`\\.w-variant-${id.replace(/-/g, "\\-")}[^{]*\\{[^}]+\\}`, "g")
      const m = css.match(re)
      if (m) console.log(`  variant ${id}:`, m.join("\n"))
    }
    const loaderRules = [...css.matchAll(/\.k2-loader[^{]*\{[^}]+\}/g)].map((m) => m[0])
    if (loaderRules.length) {
      console.log("  k2-loader rules:")
      loaderRules.forEach((r) => console.log("   ", r))
    }
  }
}

// Extract heading variant rules from page-specific css if any
const pageCss = cssUrls.find((u) => u.includes("vovi-starter")) ?? cssUrls[0]
if (pageCss) {
  const css = await fetch(pageCss).then((r) => r.text())
  const headingRules = [...css.matchAll(/\.k2-heading[^{]*\{[^}]+\}/g)].map((m) => m[0])
  console.log("\n.k2-heading base rules:", headingRules.length)
  headingRules.slice(0, 5).forEach((r) => console.log(" ", r))

  const displayRules = [...css.matchAll(/display-5[^{]*\{[^}]+\}/g)].map((m) => m[0])
  console.log("\ndisplay-5 rules:", displayRules.length)
  displayRules.forEach((r) => console.log(" ", r))
}

// Save loader snippet context
const loaderStart = html.indexOf('class="k2-loader"')
const blockStart = html.lastIndexOf("<div", loaderStart)
let depth = 0
let end = loaderStart
for (let i = blockStart; i < html.length; i++) {
  if (html.startsWith("<div", i)) depth++
  if (html.startsWith("</div>", i)) {
    depth--
    if (depth === 0) {
      end = i + 6
      break
    }
  }
}
const loaderHtml = html.slice(blockStart, end)
fs.writeFileSync(".planning/page-forge/softree-agentic-exact/k2-loader-live.html", loaderHtml)
console.log("\nSaved live loader HTML")
