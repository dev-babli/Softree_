import { AI_HOME_BODY_HTML } from "../src/components/softree-ai-home/referenceContent.ts"

const visibleText = AI_HOME_BODY_HTML
  .replace(/<script[\s\S]*?<\/script>/gi, "")
  .replace(/<style[\s\S]*?<\/style>/gi, "")
  .replace(/<[^>]+>/g, " ")
  .replace(/\s+/g, " ")

const checks = [
  { label: "Kore/Artemis brand", re: /\b(Kore|Artemis|kore\.ai)\b/i, expect: 0 },
  { label: "platform trust claim", re: /only agent platform you can trust/i, expect: 0 },
  { label: "Forrester awards", re: /forrester wave/i, expect: 0 },
  { label: "Gartner MQ", re: /magic quadrant/i, expect: 0 },
  { label: "Kore customer names", re: /Morgan Stanley|Pfizer|Deutsche Bank|Boardwalk REIT|Tech@Lilly/i, expect: 0 },
  { label: "ABL trademark", re: /ABL™|Agent Blueprint Language/i, expect: 0 },
  { label: "Softree hero", re: /enterprise certainty|Microsoft Copilot Studio/i, expect: 1 },
  { label: "Softree testimonial", re: /Darrell Trimble|Natasha Adams|Arkady Fedorovtsjev/i, expect: 1 },
]

let failed = false
for (const { label, re, expect } of checks) {
  const hits = (visibleText.match(re) || []).length
  const pass = expect === 0 ? hits === 0 : hits >= expect
  if (!pass) {
    console.error(`FAIL: ${label} — found ${hits}, expected ${expect}`)
    const m = visibleText.match(re)
    if (m) {
      const i = visibleText.search(re)
      console.error("  context:", visibleText.slice(Math.max(0, i - 50), i + 80))
    }
    failed = true
  } else {
    console.log(`OK: ${label}`)
  }
}

if (failed) process.exit(1)
console.log("\nAll content checks passed.")
