#!/usr/bin/env node
/**
 * Relocate knowledge files into numbered taxonomy folders.
 * Idempotent — skips if destination exists.
 */
import {
  existsSync,
  readFileSync,
  writeFileSync,
  mkdirSync,
  readdirSync,
} from "node:fs";
import { join, dirname } from "node:path";
import { enginePath, knowledgeRoot, loadConfig } from "../../.cursor/knowledge-engine/lib/paths.mjs";
import { parseAtom, serializeAtom } from "../../.cursor/knowledge-engine/lib/frontmatter.mjs";
import { rebuildGraphFromDisk } from "../../.cursor/knowledge-engine/lib/graph.mjs";
import { rebuildIndexFromDisk } from "../../.cursor/knowledge-engine/lib/indexer.mjs";

const RELOCATIONS = [
  { from: "atoms/consulting/thinking-principles.md", folder: "00_constitution" },
  { from: "atoms/business/softree-context.md", folder: "01_company" },
  { from: "atoms/business/brand-positioning.md", folder: "01_company" },
  { from: "atoms/business/ideal-client.md", folder: "01_company", rename: "ideal-client-profile.md" },
  { from: "frameworks/consulting/d5oo-framework.md", folder: "26_frameworks" },
  { from: "frameworks/competitors/benchmark-framework.md", folder: "26_frameworks", rename: "competitor-benchmark-framework.md" },
  { from: "rubrics/scoring/website-rubric.md", folder: "29_scoring" },
  { from: "templates/consulting/executive-report-template.md", folder: "28_report_templates" },
  { from: "playbooks/consulting/website-audit.md", folder: "30_playbooks" },
  { from: "playbooks/competitors/competitive-benchmark.md", folder: "30_playbooks" },
  { from: "patterns/consulting/business-outcomes-first.md", folder: "31_patterns" },
  { from: "patterns/motion-design/scroll-choreography-storytelling.md", folder: "31_patterns" },
  { from: "competitors/agentic-ai/kore-ai.md", folder: "23_competitors" },
];

const config = loadConfig();
const root = knowledgeRoot();

for (const t of config.taxonomy) {
  mkdirSync(join(root, t.folder), { recursive: true });
}

let moved = 0;

for (const rel of RELOCATIONS) {
  const src = enginePath(rel.from);
  if (!existsSync(src)) continue;

  const parsed = parseAtom(readFileSync(src, "utf8"));
  parsed.meta.knowledgeFolder = rel.folder;

  const baseName = rel.rename ?? src.split(/[/\\]/).pop();
  const dest = join(root, rel.folder, baseName);
  if (existsSync(dest)) continue;

  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, serializeAtom(parsed.meta, parsed.sections));
  moved++;
}

// Seed constitution README if empty
const readmePath = join(root, "README.md");
if (!existsSync(readmePath)) {
  writeFileSync(
    readmePath,
    `# ATLAS Knowledge Repository

Numbered taxonomy — every file is an atomic, interconnected knowledge asset.

## Pipeline

\`\`\`
Internet → Research Agent → Scraper → Cleaner → Summarizer → Fact Checker
→ Knowledge Extractor → Pattern Engine → Knowledge Files (.md) → Knowledge Graph
\`\`\`

## Folders

${config.taxonomy.map((t) => `- \`${t.folder}/\` — ${t.label}: ${t.purpose}`).join("\n")}

## Commands

\`\`\`bash
npm run atlas:knowledge search "query"
npm run atlas:ingest
npm run atlas:improve
\`\`\`
`
  );
}

console.log(`Relocated ${moved} files into knowledge/ taxonomy`);
const graph = rebuildGraphFromDisk();
const index = rebuildIndexFromDisk();
console.log(`Graph: ${graph.nodeCount} nodes | Index: ${index.documentCount} docs`);
