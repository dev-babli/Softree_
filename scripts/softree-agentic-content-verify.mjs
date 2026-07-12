import fs from "node:fs"
import path from "node:path"

const ROOT = path.resolve("src/components/softree-agentic-exact")
const CONTENT = path.join(ROOT, "softreeAgenticContent.ts")
const COPY = path.join(ROOT, "softreeAgenticHtmlCopy.ts")

const REQUIRED_SECTIONS = [
  "loaderContent",
  "heroContent",
  "outcomesContent",
  "agentsContent",
  "programmableContent",
  "pillarsContent",
  "buildScaleContent",
  "demoVideoContent",
  "scrollTabsContent",
  "getStartedContent",
  "shellContent",
  "PAGE_SECTION_ORDER",
]

const WIRED_COMPONENTS = [
  "SoftreeAgenticHeroSection.tsx",
  "SoftreeAgenticOutcomesSection.tsx",
  "SoftreeAgenticAgentsSection.tsx",
  "SoftreeAgenticLoader.tsx",
]

let failed = false

const contentSrc = fs.readFileSync(CONTENT, "utf8")
for (const key of REQUIRED_SECTIONS) {
  if (!contentSrc.includes(`export const ${key}`) && !contentSrc.includes(`export const ${key} =`)) {
    console.error(`MISSING export: ${key}`)
    failed = true
  }
}

const copySrc = fs.readFileSync(COPY, "utf8")
if (!copySrc.includes('from "./softreeAgenticContent"')) {
  console.error("softreeAgenticHtmlCopy.ts must import from softreeAgenticContent.ts")
  failed = true
}

for (const file of WIRED_COMPONENTS) {
  const src = fs.readFileSync(path.join(ROOT, file), "utf8")
  if (!src.includes("softreeAgenticContent")) {
    console.error(`${file} must import from softreeAgenticContent.ts`)
    failed = true
  }
}

if (scrollTabsCount(contentSrc) !== 9) {
  console.error("scrollTabsContent.tabs must have exactly 9 entries")
  failed = true
}

if (failed) {
  process.exit(1)
}

console.log("softree-agentic-content-verify: PASS")
console.log(`  sections: ${REQUIRED_SECTIONS.length}`)
console.log(`  wired components: ${WIRED_COMPONENTS.length}`)
console.log(`  scroll tabs: 9`)

function scrollTabsCount(src) {
  const m = src.match(/scrollTabsContent[\s\S]*?tabs:\s*\[/)
  if (!m) return 0
  const start = src.indexOf("tabs: [", src.indexOf("scrollTabsContent"))
  let depth = 0
  let count = 0
  for (let i = start; i < src.length; i++) {
    if (src[i] === "[") depth++
    if (src[i] === "]") {
      depth--
      if (depth === 0) break
    }
    if (depth === 1 && src.slice(i, i + 4) === "id: ") count++
  }
  return count
}
