import { SOFTREE_AGENTIC_FOOTER, SOFTREE_AGENTIC_HEADER } from "../src/components/softree-agentic-exact/referenceContent.ts"
import { applySoftreeShellHtml } from "../src/components/softree-agentic-exact/softreeAgenticHtmlCopy.ts"

function plain(html) {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, "\n")
    .split("\n")
    .map((s) => s.trim())
    .filter((s) => s.length > 2)
}

console.log("=== HEADER RAW ===")
console.log(plain(SOFTREE_AGENTIC_HEADER.html).join("\n"))
console.log("\n=== HEADER PATCHED ===")
console.log(plain(applySoftreeShellHtml(SOFTREE_AGENTIC_HEADER.html)).join("\n"))
console.log("\n=== FOOTER RAW ===")
console.log(plain(SOFTREE_AGENTIC_FOOTER.html).join("\n"))
console.log("\n=== FOOTER PATCHED ===")
console.log(plain(applySoftreeShellHtml(SOFTREE_AGENTIC_FOOTER.html)).join("\n"))
