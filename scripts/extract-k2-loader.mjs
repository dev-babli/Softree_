import fs from "node:fs"

const html = await fetch("https://www.kore.ai/ai-agent-platform").then((r) => r.text())
const loaderStart = html.indexOf('class="k2-loader"')
if (loaderStart < 0) throw new Error("k2-loader not found")

let depth = 0
let end = loaderStart
for (let i = html.lastIndexOf("<div", loaderStart); i < html.length; i++) {
  if (html.startsWith("<div", i)) depth++
  if (html.startsWith("</div>", i)) {
    depth--
    if (depth === 0) {
      end = i + 6
      break
    }
  }
}

const blockStart = html.lastIndexOf("<div", loaderStart)
const loaderHtml = html.slice(blockStart, end)

const cssStart = html.indexOf(".wf-design-mode .k2-loader")
const cssEnd = html.indexOf("</style></div><div data-flip=\"loader\"")
const loaderCss = html.slice(cssStart, cssEnd)

fs.mkdirSync(".planning/page-forge/kore-ai-exact", { recursive: true })
fs.writeFileSync(".planning/page-forge/kore-ai-exact/k2-loader-snippet.html", loaderHtml)
fs.writeFileSync(".planning/page-forge/kore-ai-exact/k2-loader.css", loaderCss)

const baseRules = [...html.matchAll(/\.k2-loader[^{]*\{[^}]*\}/g)]
  .map((m) => m[0])
  .filter((r) => !r.includes("step-") && !r.includes("wf-design") && !r.includes("::"))
fs.writeFileSync(
  ".planning/page-forge/kore-ai-exact/k2-loader-base.css",
  baseRules.join("\n\n"),
)

console.log("loader html bytes:", loaderHtml.length)
console.log("loader css bytes:", loaderCss.length)
console.log("context before loader:", html.slice(blockStart - 200, blockStart))
console.log("base rules:", baseRules.length)
