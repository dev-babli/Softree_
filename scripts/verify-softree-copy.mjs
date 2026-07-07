import { KORE_AI_SECTIONS, KORE_AI_DIALOGS, KORE_AI_FOOTER, KORE_AI_HEADER } from "../src/components/kore-ai-exact/referenceContent.ts"
import { applySoftreeSectionHtml, applySoftreeShellHtml } from "../src/components/kore-ai-exact/koreHtmlCopy.ts"

const brand = /kore\.ai|artemis|abl™|™arch|\babl\b/i

for (const s of KORE_AI_SECTIONS) {
  const patched = applySoftreeSectionHtml(s.name, s.html)
  const plain = patched.replace(/<style[\s\S]*?<\/style>/gi, "").replace(/<[^>]+>/g, " ")
  const hits = plain.match(brand) || []
  if (hits.length) console.log(s.name, "REMAINING:", [...new Set(hits)].join(", "))
}

for (const [label, html] of [
  ["header", KORE_AI_HEADER.html],
  ["footer", KORE_AI_FOOTER.html],
  ["dialogs", KORE_AI_DIALOGS.map((d) => d.html).join("")],
]) {
  const patched = applySoftreeShellHtml(html)
  const plain = patched.replace(/<style[\s\S]*?<\/style>/gi, "").replace(/<[^>]+>/g, " ")
  const hits = plain.match(brand) || []
  if (hits.length) console.log(label, "REMAINING:", [...new Set(hits)].join(", "))
}

console.log("done")
