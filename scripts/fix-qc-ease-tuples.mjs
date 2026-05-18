// Adds `as const` to bare numeric tuples used as framer-motion ease values.
// Pattern targeted: `ease: [<numbers>]` not already followed by `as const` or `]`.

import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve("src/qualitycomponents");
const FILE_EXTS = [".tsx", ".ts", ".jsx", ".js"];

function* walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(p);
    else yield p;
  }
}

// Match: ease: [ <numbers and commas> ]  (not already followed by " as const")
const easeRe = /(ease:\s*)(\[\s*-?\d[\d.\-eE,\s]*\])(?!\s*as\s+const)/g;

let files = 0;
let edits = 0;
for (const file of walk(ROOT)) {
  if (!FILE_EXTS.includes(path.extname(file))) continue;
  const src = fs.readFileSync(file, "utf8");
  let n = 0;
  const out = src.replace(easeRe, (_m, head, tuple) => {
    n++;
    return `${head}${tuple} as const`;
  });
  if (n > 0) {
    fs.writeFileSync(file, out, "utf8");
    files++;
    edits += n;
  }
}
console.log(`ease tuples patched: ${edits} across ${files} files`);
