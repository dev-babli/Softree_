import { KORE_AI_FOOTER, KORE_AI_HEADER } from "../src/components/kore-ai-exact/referenceContent.ts"
import { applySoftreeShellHtml } from "../src/components/kore-ai-exact/koreHtmlCopy.ts"

function plain(html) {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, "\n")
    .split("\n")
    .map((s) => s.trim())
    .filter((s) => s.length > 2)
}

console.log("=== HEADER RAW ===")
console.log(plain(KORE_AI_HEADER.html).join("\n"))
console.log("\n=== HEADER PATCHED ===")
console.log(plain(applySoftreeShellHtml(KORE_AI_HEADER.html)).join("\n"))
console.log("\n=== FOOTER RAW ===")
console.log(plain(KORE_AI_FOOTER.html).join("\n"))
console.log("\n=== FOOTER PATCHED ===")
console.log(plain(applySoftreeShellHtml(KORE_AI_FOOTER.html)).join("\n"))
