#!/usr/bin/env node
import {
  existsSync,
  readFileSync,
  writeFileSync,
  mkdirSync,
  readdirSync,
  statSync,
} from "node:fs";
import { join } from "node:path";
import { enginePath, knowledgeRoot, loadConfig } from "../../.cursor/knowledge-engine/lib/paths.mjs";
import { rebuildGraphFromDisk } from "../../.cursor/knowledge-engine/lib/graph.mjs";
import { rebuildIndexFromDisk } from "../../.cursor/knowledge-engine/lib/indexer.mjs";
import { loadAllAtoms } from "../../.cursor/knowledge-engine/lib/graph.mjs";

const QUESTIONS = [
  "What new concepts appeared?",
  "What knowledge is outdated?",
  "What contradictions exist?",
  "What patterns are emerging?",
  "What should be researched next?",
];

function countFilesInFolder(folderPath) {
  if (!existsSync(folderPath)) return 0;
  let count = 0;
  for (const entry of readdirSync(folderPath)) {
    const full = join(folderPath, entry);
    if (statSync(full).isFile() && entry.endsWith(".md") && !entry.startsWith("_")) count++;
  }
  return count;
}

function analyzeGaps() {
  const config = loadConfig();
  const atoms = loadAllAtoms();
  const coveredFolders = new Set(
    atoms.map((a) => a.meta.knowledgeFolder).filter(Boolean)
  );

  const emptyFolders = config.taxonomy.filter(
    (t) => countFilesInFolder(join(knowledgeRoot(), t.folder)) === 0
  );

  const lowConfidence = atoms.filter((a) => a.meta.confidence < 0.75);
  const drafts = atoms.filter((a) => a.meta.status === "draft");
  const stale = atoms.filter((a) => {
    const updated = new Date(a.meta.lastUpdated);
    const days = (Date.now() - updated.getTime()) / (1000 * 60 * 60 * 24);
    return days > 90;
  });

  const competitorDir = join(knowledgeRoot(), "23_competitors");
  const competitors = existsSync(competitorDir)
    ? readdirSync(competitorDir).filter((f) => f.endsWith(".md"))
    : [];

  const backlog = [];

  for (const folder of emptyFolders.slice(0, 20)) {
    backlog.push({
      id: `research-${folder.folder}`,
      query: `Authoritative best practices for ${folder.label} (${folder.purpose})`,
      domain: folder.folder.replace(/^\d+_/, ""),
      knowledgeFolder: folder.folder,
      priority: 2,
      status: "pending",
      reason: "empty taxonomy folder",
    });
  }

  for (const atom of lowConfidence) {
    backlog.push({
      id: `verify-${atom.meta.id}`,
      query: `Verify and strengthen: ${atom.meta.title}`,
      domain: atom.meta.domain,
      knowledgeFolder: atom.meta.knowledgeFolder,
      priority: 1,
      status: "pending",
      reason: "low confidence",
      targetAtom: atom.meta.id,
    });
  }

  for (const atom of drafts) {
    backlog.push({
      id: `draft-${atom.meta.id}`,
      query: `Complete draft atom: ${atom.meta.title}`,
      knowledgeFolder: atom.meta.knowledgeFolder,
      priority: 1,
      status: "pending",
      reason: "draft status",
      targetAtom: atom.meta.id,
    });
  }

  const expectedCompetitors = [
    "kore-ai", "accenture", "ibm-consulting", "thoughtworks", "moveworks",
  ];
  for (const c of expectedCompetitors) {
    if (!competitors.some((f) => f.includes(c))) {
      backlog.push({
        id: `competitor-${c}`,
        query: `Competitive benchmark: ${c.replace(/-/g, " ")} — positioning, messaging, design, SEO`,
        domain: "competitors",
        knowledgeFolder: "23_competitors",
        priority: 1,
        status: "pending",
        reason: "missing competitor profile",
      });
    }
  }

  backlog.sort((a, b) => a.priority - b.priority);

  return {
    analyzedAt: new Date().toISOString(),
    pipeline: config.pipeline.flow,
    questions: QUESTIONS,
    stats: {
      totalAtoms: atoms.length,
      coveredFolders: coveredFolders.size,
      emptyFolders: emptyFolders.length,
      lowConfidence: lowConfidence.length,
      drafts: drafts.length,
      stale: stale.length,
      competitors: competitors.length,
    },
    emptyFolders: emptyFolders.map((f) => ({ folder: f.folder, label: f.label })),
    items: backlog.slice(0, 50),
    suggestions: [
      emptyFolders.length > 0 &&
        `Prioritize seeding ${Math.min(5, emptyFolders.length)} empty taxonomy folders per week`,
      lowConfidence.length > 0 &&
        `Fact-check pass on ${lowConfidence.length} low-confidence atoms`,
      competitors.length < 5 &&
        "Ingest top 5 competitor profiles into 23_competitors/",
      "Run npm run atlas:ingest after populating ingest/raw/*.json from web research",
    ].filter(Boolean),
  };
}

const report = analyzeGaps();
mkdirSync(enginePath("meta"), { recursive: true });
writeFileSync(
  enginePath("meta", "research-backlog.json"),
  JSON.stringify(report, null, 2)
);

writeFileSync(
  enginePath("meta", "improvement-report.json"),
  JSON.stringify(
    {
      ...report,
      graph: { nodes: rebuildGraphFromDisk().nodeCount },
      index: { docs: rebuildIndexFromDisk().documentCount },
    },
    null,
    2
  )
);

console.log(JSON.stringify(report.stats, null, 2));
console.log(`\nBacklog: ${report.items.length} items → meta/research-backlog.json`);
