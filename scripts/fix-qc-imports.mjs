// Surgical import fixer for src/qualitycomponents files.
// Rewrites `@/components/X` and `@/app/X` -> `@/qualitycomponents/components/X` / `@/qualitycomponents/app/X`
// ONLY when the original target does NOT exist at src/<X> but the qualitycomponents version DOES.
// Safe: never rewrites a still-valid import.

import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(process.cwd(), "src");
const QC_ROOT = path.join(ROOT, "qualitycomponents");

const FILE_EXTS = [".tsx", ".ts", ".jsx", ".js"];
const SOURCE_EXTS = [".tsx", ".ts", ".jsx", ".js", ".css", ".module.css"];

/** Walk a directory recursively yielding file paths. */
function* walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(p);
    else yield p;
  }
}

/** Check if an import target like "components/foo/bar" resolves under a given root. */
function resolves(root, importTarget) {
  // importTarget is like "components/ui/button" or "app/services/foo/cta"
  const candidate = path.join(root, importTarget);

  // Try exact file matches with all extensions
  for (const ext of SOURCE_EXTS) {
    if (fs.existsSync(candidate + ext)) return true;
  }
  // Try as directory with index file
  if (fs.existsSync(candidate) && fs.statSync(candidate).isDirectory()) {
    for (const ext of SOURCE_EXTS) {
      if (fs.existsSync(path.join(candidate, "index" + ext))) return true;
    }
  }
  return false;
}

// Match any @/<top-level>/... in:
//   - static imports:    from "@/foo"
//   - dynamic imports:   import("@/foo")
// Skip @/qualitycomponents/* (already correct)
const importRe =
  /((?:from|import\()\s*["'`])(@\/(?!qualitycomponents\/)[^"'`]+)(["'`])/g;

let touchedFiles = 0;
let totalRewrites = 0;
const rewriteSummary = new Map(); // path -> count

for (const file of walk(QC_ROOT)) {
  if (!FILE_EXTS.includes(path.extname(file))) continue;
  const original = fs.readFileSync(file, "utf8");
  let fixed = original;

  fixed = fixed.replace(importRe, (full, prefix, spec, suffix) => {
    // strip the "@/" leaving e.g. "components/ui/button"
    const target = spec.slice(2);
    if (resolves(ROOT, target)) return full; // import is fine, leave it alone

    // check if qualitycomponents version exists
    if (resolves(QC_ROOT, target)) {
      const newSpec = `@/qualitycomponents/${target}`;
      totalRewrites++;
      rewriteSummary.set(spec, (rewriteSummary.get(spec) || 0) + 1);
      return `${prefix}${newSpec}${suffix}`;
    }

    // neither exists -> leave as-is, will surface as a real build error
    return full;
  });

  if (fixed !== original) {
    fs.writeFileSync(file, fixed, "utf8");
    touchedFiles++;
  }
}

console.log(`\nFixed imports: ${totalRewrites}`);
console.log(`Files touched: ${touchedFiles}\n`);

const sorted = [...rewriteSummary.entries()].sort((a, b) => b[1] - a[1]);
for (const [spec, count] of sorted.slice(0, 30)) {
  console.log(`  ${count.toString().padStart(3)}x  ${spec}`);
}
if (sorted.length > 30) console.log(`  ... and ${sorted.length - 30} more`);
