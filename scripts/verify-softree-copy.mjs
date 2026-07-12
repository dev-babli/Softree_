#!/usr/bin/env node
/** Run: npx tsx scripts/verify-softree-copy.mjs */
import { SOFTREE_AGENTIC_SECTIONS, SOFTREE_AGENTIC_DIALOGS, SOFTREE_AGENTIC_FOOTER, SOFTREE_AGENTIC_HEADER } from "../src/components/softree-agentic-exact/referenceContent.ts"
import { applySoftreeSectionHtml, applySoftreeShellHtml } from "../src/components/softree-agentic-exact/softreeAgenticHtmlCopy.ts"

const brand = /kore\.ai|artemis|abl™|™arch|\babl\b/i

for (const s of SOFTREE_AGENTIC_SECTIONS) {
  const patched = applySoftreeSectionHtml(s.name, s.html)
  const plain = patched.replace(/<style[\s\S]*?<\/style>/gi, "").replace(/<[^>]+>/g, " ")
  const hits = plain.match(brand) || []
  if (hits.length) console.log(s.name, "REMAINING:", [...new Set(hits)].join(", "))
}

for (const [label, html] of [
  ["header", SOFTREE_AGENTIC_HEADER.html],
  ["footer", SOFTREE_AGENTIC_FOOTER.html],
  ["dialogs", SOFTREE_AGENTIC_DIALOGS.map((d) => d.html).join("")],
]) {
  const patched = applySoftreeShellHtml(html)
  const plain = patched.replace(/<style[\s\S]*?<\/style>/gi, "").replace(/<[^>]+>/g, " ")
  const hits = plain.match(brand) || []
  if (hits.length) console.log(label, "REMAINING:", [...new Set(hits)].join(", "))
}

console.log("done")
