import {
  KORE_AI_DIALOGS,
  KORE_AI_FOOTER,
  KORE_AI_HEADER,
  KORE_AI_SECTIONS,
} from "../src/components/kore-ai-exact/referenceContent.ts"

function plain(html) {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]+>/g, "\n")
    .split("\n")
    .map((x) => x.trim())
    .filter((x) => x.length > 4 && /[a-zA-Z]{3}/.test(x))
}

for (const s of KORE_AI_SECTIONS) {
  console.log(`\n== ${s.name} ==`)
  console.log(plain(s.html).join("\n"))
}

console.log("\n== HEADER ==")
console.log(plain(KORE_AI_HEADER.html).slice(0, 30).join("\n"))

console.log("\n== FOOTER ==")
console.log(plain(KORE_AI_FOOTER.html).slice(0, 30).join("\n"))

console.log("\n== DIALOGS ==")
for (const d of KORE_AI_DIALOGS) {
  console.log(plain(d.html).slice(0, 15).join(" | "))
}
