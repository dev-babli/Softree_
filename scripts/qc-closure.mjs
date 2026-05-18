// Computes the transitive closure of files in src/qualitycomponents/ that are
// actually reachable from the live `src/app/` tree (via @/qualitycomponents/* imports).
// Prints the reachable set and the unreachable set.

import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve("src");
const QC = path.join(ROOT, "qualitycomponents");
const APP = path.join(ROOT, "app");
const COMPONENTS = path.join(ROOT, "components"); // live shared components also can re-export qc

const FILE_EXTS = [".tsx", ".ts", ".jsx", ".js"];
const SOURCE_EXTS = [".tsx", ".ts", ".jsx", ".js", ".css", ".json"];

function* walk(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(p);
    else yield p;
  }
}

/** Resolve a `@/X` path or relative path to an absolute file. */
function resolveImport(spec, fromFile) {
  let basePath;
  if (spec.startsWith("@/")) {
    basePath = path.join(ROOT, spec.slice(2));
  } else if (spec.startsWith(".")) {
    basePath = path.resolve(path.dirname(fromFile), spec);
  } else {
    return null; // external module
  }

  for (const ext of SOURCE_EXTS) {
    if (fs.existsSync(basePath + ext)) return basePath + ext;
  }
  if (fs.existsSync(basePath) && fs.statSync(basePath).isDirectory()) {
    for (const ext of SOURCE_EXTS) {
      const p = path.join(basePath, "index" + ext);
      if (fs.existsSync(p)) return p;
    }
  }
  if (fs.existsSync(basePath) && fs.statSync(basePath).isFile()) return basePath;
  return null;
}

/** Extract all import specifiers from file source. */
function extractImports(src) {
  const specs = new Set();
  const regexes = [
    /from\s+["'`]([^"'`]+)["'`]/g,
    /import\(\s*["'`]([^"'`]+)["'`]\s*\)/g,
    /require\(\s*["'`]([^"'`]+)["'`]\s*\)/g,
  ];
  for (const re of regexes) {
    let m;
    while ((m = re.exec(src))) specs.add(m[1]);
  }
  return [...specs];
}

// Seed: every file under src/app + src/components that imports from qualitycomponents.
const seeds = new Set();
for (const root of [APP, COMPONENTS]) {
  for (const file of walk(root)) {
    if (!FILE_EXTS.includes(path.extname(file))) continue;
    const src = fs.readFileSync(file, "utf8");
    if (src.includes("@/qualitycomponents/")) seeds.add(file);
  }
}

console.log(`Seed files (in app/components that touch qualitycomponents): ${seeds.size}`);

// BFS over imports, collecting reachable qualitycomponents files.
const visited = new Set();
const reachableQc = new Set();
const queue = [...seeds];
while (queue.length) {
  const file = queue.shift();
  if (visited.has(file)) continue;
  visited.add(file);

  const src = fs.readFileSync(file, "utf8");
  for (const spec of extractImports(src)) {
    const resolved = resolveImport(spec, file);
    if (!resolved) continue;
    if (resolved.startsWith(QC)) reachableQc.add(resolved);
    if (
      (resolved.startsWith(QC) ||
        resolved.startsWith(APP) ||
        resolved.startsWith(COMPONENTS) ||
        resolved.startsWith(path.join(ROOT, "lib")) ||
        resolved.startsWith(path.join(ROOT, "hooks")) ||
        resolved.startsWith(path.join(ROOT, "data"))) &&
      !visited.has(resolved)
    ) {
      queue.push(resolved);
    }
  }
}

// Collect ALL files under qualitycomponents.
const allQc = new Set();
for (const file of walk(QC)) {
  if (FILE_EXTS.includes(path.extname(file)) || [".css", ".json"].includes(path.extname(file))) {
    allQc.add(file);
  }
}

const unreachable = [...allQc].filter((f) => !reachableQc.has(f));

console.log(`\nTotal qc files: ${allQc.size}`);
console.log(`Reachable from live app: ${reachableQc.size}`);
console.log(`Dead (unreachable): ${unreachable.length}`);

const reachableList = [...reachableQc].sort();
console.log(`\n--- REACHABLE (will be migrated) ---`);
for (const f of reachableList) {
  console.log(path.relative(ROOT, f).replace(/\\/g, "/"));
}

fs.writeFileSync(
  "scripts/qc-reachable.json",
  JSON.stringify(reachableList.map((f) => path.relative(ROOT, f).replace(/\\/g, "/")), null, 2)
);
console.log(`\nWritten scripts/qc-reachable.json`);
