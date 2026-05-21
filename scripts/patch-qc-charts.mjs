// Adds `payload?: any[]` and `label?: any` to the inline type intersection
// in all qualitycomponents chart.tsx files so they match the canonical
// src/components/ui/chart.tsx and don't fail TS in newer recharts.

import fs from "node:fs";
import path from "node:path";

const files = [
  "src/qualitycomponents/components/brilliance/ui/chart.tsx",
  "src/qualitycomponents/components/landing/ui/chart.tsx",
  "src/qualitycomponents/components/optimus/ui/chart.tsx",
  "src/qualitycomponents/components/ui/chart.tsx",
];

let touched = 0;
for (const rel of files) {
  const p = path.resolve(rel);
  if (!fs.existsSync(p)) continue;
  let src = fs.readFileSync(p, "utf8");

  // Match the type intersection block and prepend payload + label if not already present.
  // Look for "hideLabel?: boolean" and add payload/label above it once.
  let changed = false;

  if (!src.includes("payload?: any[]")) {
    src = src.replace(
      /(React\.ComponentProps<['"]div['"]>\s*&\s*\{\s*\n)(\s*)(hideLabel\?: boolean)/,
      (_m, head, indent, rest) => {
        changed = true;
        return `${head}${indent}payload?: any[]\n${indent}label?: any\n${indent}${rest}`;
      }
    );
  }

  // Replace `Pick<RechartsPrimitive.LegendProps, 'payload' | 'verticalAlign'> & {`
  // with `{ payload?: any[]; verticalAlign?: RechartsPrimitive.LegendProps["verticalAlign"]; ` merged in.
  src = src.replace(
    /Pick<RechartsPrimitive\.LegendProps,\s*['"]payload['"]\s*\|\s*['"]verticalAlign['"]>\s*&\s*\{/,
    () => {
      changed = true;
      return `{\n    payload?: any[]\n    verticalAlign?: RechartsPrimitive.LegendProps["verticalAlign"]`;
    }
  );

  if (!changed) continue;

  fs.writeFileSync(p, src, "utf8");
  touched++;
  console.log(`patched ${rel}`);
}
console.log(`\nDone. Files patched: ${touched}`);
