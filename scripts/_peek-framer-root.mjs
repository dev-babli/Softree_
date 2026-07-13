import fs from "node:fs"

const h = fs.readFileSync("Softree_/client.html", "utf8")
const idx = h.indexOf("data-framer-root")
console.log("idx", idx)
console.log(h.slice(idx, idx + 500))
const classMatch = h.slice(idx, idx + 800).match(/class="([^"]+)"/)
console.log("class", classMatch && classMatch[1])
