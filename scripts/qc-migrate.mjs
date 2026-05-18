// Migrates the 12 in-use files from src/qualitycomponents/components/* into
// src/components/qc/*, rewrites their internal @/qualitycomponents/components/
// imports, rewrites the 3 live src/app pages, then deletes src/qualitycomponents/.

import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(".");
const SRC = path.join(ROOT, "src");

const moves = [
  // [from (relative to src), to (relative to src)]
  ["qualitycomponents/components/homepage-light/AboutClientLogos.tsx",   "components/qc/homepage-light/AboutClientLogos.tsx"],
  ["qualitycomponents/components/homepage-light/AboutTeamSection.tsx",   "components/qc/homepage-light/AboutTeamSection.tsx"],
  ["qualitycomponents/components/homepage-light/AvooraHero.tsx",         "components/qc/homepage-light/AvooraHero.tsx"],
  ["qualitycomponents/components/homepage-light/AwardsMarqueeSection.tsx","components/qc/homepage-light/AwardsMarqueeSection.tsx"],
  ["qualitycomponents/components/homepage-light/Grainient.tsx",          "components/qc/homepage-light/Grainient.tsx"],
  ["qualitycomponents/components/homepage-light/LightAboutMerged.tsx",   "components/qc/homepage-light/LightAboutMerged.tsx"],
  ["qualitycomponents/components/homepage-light/LightContactSection.tsx","components/qc/homepage-light/LightContactSection.tsx"],
  ["qualitycomponents/components/homepage-light/LightEngagementModels.tsx","components/qc/homepage-light/LightEngagementModels.tsx"],
  ["qualitycomponents/components/homepage-light/LightTestimonialGrid.tsx","components/qc/homepage-light/LightTestimonialGrid.tsx"],
  ["qualitycomponents/components/homepage-light/LightWhyChooseUs.tsx",   "components/qc/homepage-light/LightWhyChooseUs.tsx"],
  ["qualitycomponents/components/homepage/TrustedByStrip.tsx",           "components/qc/homepage/TrustedByStrip.tsx"],
  ["qualitycomponents/components/shared/SpotlightCard.tsx",              "components/qc/shared/SpotlightCard.tsx"],
];

const livePages = [
  "src/app/about-us/page.tsx",
  "src/app/services/page.tsx",
  "src/app/contact/page.tsx",
];

// Step 1: copy files to new locations
for (const [from, to] of moves) {
  const srcPath = path.join(SRC, from);
  const dstPath = path.join(SRC, to);
  fs.mkdirSync(path.dirname(dstPath), { recursive: true });
  fs.copyFileSync(srcPath, dstPath);
  console.log(`copied: ${from}\n     -> ${to}`);
}

// Step 2: rewrite @/qualitycomponents/components/X -> @/components/qc/X
// (both inside moved files and the 3 live pages)
const filesToRewrite = [
  ...moves.map(([, to]) => path.join(SRC, to)),
  ...livePages.map((p) => path.join(ROOT, p)),
];

const importRe = /@\/qualitycomponents\/components\//g;
let rewrites = 0;
for (const file of filesToRewrite) {
  if (!fs.existsSync(file)) continue;
  const src = fs.readFileSync(file, "utf8");
  if (!importRe.test(src)) {
    importRe.lastIndex = 0;
    continue;
  }
  importRe.lastIndex = 0;
  const out = src.replace(importRe, "@/components/qc/");
  fs.writeFileSync(file, out, "utf8");
  rewrites++;
  console.log(`rewrote imports in: ${path.relative(ROOT, file).replace(/\\/g, "/")}`);
}
console.log(`\nFiles with imports rewritten: ${rewrites}`);

// Step 3: delete src/qualitycomponents/ entirely
const qcDir = path.join(SRC, "qualitycomponents");
if (fs.existsSync(qcDir)) {
  fs.rmSync(qcDir, { recursive: true, force: true });
  console.log(`\nDeleted: ${path.relative(ROOT, qcDir).replace(/\\/g, "/")}`);
}

console.log("\nMigration complete.");
