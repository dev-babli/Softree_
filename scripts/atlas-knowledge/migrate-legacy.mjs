#!/usr/bin/env node
/**
 * Migrates legacy .cursor/knowledge/*.md into numbered knowledge/ taxonomy.
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import {
  REPO_ROOT,
  knowledgeRoot,
  folderForCategory,
} from "../../.cursor/knowledge-engine/lib/paths.mjs";
import { serializeAtom } from "../../.cursor/knowledge-engine/lib/frontmatter.mjs";
import { rebuildGraphFromDisk } from "../../.cursor/knowledge-engine/lib/graph.mjs";
import { rebuildIndexFromDisk } from "../../.cursor/knowledge-engine/lib/indexer.mjs";

const LEGACY_MAP = {
  "thinking-principles.md": { id: "consulting.thinking-principles", domain: "consulting", category: "atom", folder: "00_constitution", tags: ["principles", "atlas"] },
  "business-context.md": { id: "business.softree-context", domain: "company", category: "atom", folder: "01_company", tags: ["softree", "vision"] },
  "brand-positioning.md": { id: "business.brand-positioning", domain: "company", category: "atom", folder: "01_company", tags: ["brand"] },
  "ideal-client-profile.md": { id: "business.ideal-client", domain: "company", category: "atom", folder: "01_company", tags: ["icp"] },
  "consulting-frameworks.md": { id: "consulting.d5oo-framework", domain: "consulting", category: "framework", folder: "26_frameworks", tags: ["framework"], slug: "d5oo-framework" },
  "website-scoring-rubric.md": { id: "scoring.website-rubric", domain: "scoring", category: "rubric", folder: "29_scoring", tags: ["audit"], slug: "website-rubric" },
  "competitor-benchmarks.md": { id: "competitors.benchmark-framework", domain: "competitors", category: "framework", folder: "26_frameworks", tags: ["competitors"], slug: "competitor-benchmark-framework" },
  "report-template.md": { id: "consulting.executive-report-template", domain: "consulting", category: "template", folder: "28_report_templates", tags: ["report"], slug: "executive-report-template" },
};

const legacyDir = join(REPO_ROOT, ".cursor", "knowledge");
const root = knowledgeRoot();
const today = new Date().toISOString().slice(0, 10);
let migrated = 0;

mkdirSync(root, { recursive: true });

for (const [file, meta] of Object.entries(LEGACY_MAP)) {
  const legacyPath = join(legacyDir, file);
  if (!existsSync(legacyPath)) continue;

  const slug = meta.slug ?? meta.id.split(".").pop();
  const folder = meta.folder ?? folderForCategory(meta.category) ?? "02_consulting";
  const outPath = join(root, folder, `${slug}.md`);
  if (existsSync(outPath)) continue;

  const body = readFileSync(legacyPath, "utf8");
  const titleMatch = body.match(/^#\s+(.+)/m);
  const title = titleMatch ? titleMatch[1] : meta.id;

  const atomMeta = {
    id: meta.id,
    title,
    category: meta.category,
    domain: meta.domain,
    knowledgeFolder: folder,
    tags: meta.tags,
    summary: `Migrated from legacy: ${file}`,
    confidence: 0.95,
    version: "1.0.0",
    lastUpdated: today,
    sources: [{ type: "internal", ref: `.cursor/knowledge/${file}`, confidence: 1.0, retrievedAt: today }],
    related: [],
    status: "verified",
  };

  const sections = {
    summary: atomMeta.summary,
    coreConcepts: body.replace(/^#\s+.+\n/, "").trim(),
    references: `- Legacy: \`.cursor/knowledge/${file}\``,
  };

  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, serializeAtom(atomMeta, sections));
  migrated++;
}

console.log(`Migrated ${migrated} legacy files → knowledge/`);
const graph = rebuildGraphFromDisk();
const index = rebuildIndexFromDisk();
console.log(`Graph: ${graph.nodeCount} nodes | Index: ${index.documentCount} docs`);
