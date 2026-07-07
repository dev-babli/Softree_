import {
  SOFTREE_AGENTIC_DIALOGS,
  SOFTREE_AGENTIC_FOOTER,
  SOFTREE_AGENTIC_HEADER,
  SOFTREE_AGENTIC_SECTIONS,
} from "../src/components/softree-agentic-exact/referenceContent.ts"

function plain(html) {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]+>/g, "\n")
    .split("\n")
    .map((x) => x.trim())
    .filter((x) => x.length > 4 && /[a-zA-Z]{3}/.test(x))
}

for (const s of SOFTREE_AGENTIC_SECTIONS) {
  console.log(`\n== ${s.name} ==`)
  console.log(plain(s.html).join("\n"))
}

console.log("\n== HEADER ==")
console.log(plain(SOFTREE_AGENTIC_HEADER.html).slice(0, 30).join("\n"))

console.log("\n== FOOTER ==")
console.log(plain(SOFTREE_AGENTIC_FOOTER.html).slice(0, 30).join("\n"))

console.log("\n== DIALOGS ==")
for (const d of SOFTREE_AGENTIC_DIALOGS) {
  console.log(plain(d.html).slice(0, 15).join(" | "))
}
