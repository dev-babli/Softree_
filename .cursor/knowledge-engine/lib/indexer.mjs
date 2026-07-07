import { writeFileSync, mkdirSync, readFileSync, existsSync } from "node:fs";
import { enginePath } from "./paths.mjs";
import { loadAllAtoms } from "./graph.mjs";
import { atomToPlainText } from "./frontmatter.mjs";

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 2);
}

export function buildSearchIndex(atoms = null) {
  const items = atoms ?? loadAllAtoms();
  const entries = items.map((atom) => {
    const text = atomToPlainText(atom);
    const tokens = tokenize(text);
    const termFreq = {};
    for (const t of tokens) termFreq[t] = (termFreq[t] ?? 0) + 1;

    return {
      id: atom.meta.id,
      title: atom.meta.title,
      category: atom.meta.category,
      domain: atom.meta.domain,
      knowledgeFolder: atom.meta.knowledgeFolder,
      summary: atom.meta.summary,
      confidence: atom.meta.confidence,
      path: atom.relPath,
      tags: atom.meta.tags ?? [],
      tokens: [...new Set(tokens)],
      termFreq,
    };
  });

  const docCount = entries.length;
  const df = {};
  for (const entry of entries) {
    for (const token of entry.tokens) df[token] = (df[token] ?? 0) + 1;
  }

  return {
    version: "2.0.0",
    updatedAt: new Date().toISOString(),
    documentCount: docCount,
    entries,
    idf: Object.fromEntries(
      Object.entries(df).map(([term, count]) => [
        term,
        Math.log(1 + docCount / count),
      ])
    ),
  };
}

export function saveIndex(index) {
  const path = enginePath("index", "search-index.json");
  mkdirSync(enginePath("index"), { recursive: true });
  writeFileSync(path, JSON.stringify(index, null, 2));
  return path;
}

export function loadIndex() {
  const path = enginePath("index", "search-index.json");
  if (!existsSync(path)) return buildSearchIndex();
  return JSON.parse(readFileSync(path, "utf8"));
}

export function search(
  query,
  { limit = 10, domain = null, category = null, folder = null } = {}
) {
  const index = loadIndex();
  const qTokens = tokenize(query);
  if (qTokens.length === 0) return [];

  const scores = [];

  for (const entry of index.entries) {
    if (domain && entry.domain !== domain) continue;
    if (category && entry.category !== category) continue;
    if (folder && entry.knowledgeFolder !== folder) continue;

    let score = 0;
    for (const qt of qTokens) {
      if (entry.termFreq[qt]) score += entry.termFreq[qt] * (index.idf[qt] ?? 1);
      if (entry.title.toLowerCase().includes(qt)) score += 3;
      if (entry.tags.some((t) => t.toLowerCase().includes(qt))) score += 2;
    }
    if (entry.id === query || entry.title.toLowerCase() === query.toLowerCase()) {
      score += 10;
    }
    if (score > 0) scores.push({ ...entry, score });
  }

  return scores
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ tokens, termFreq, ...rest }) => rest);
}

export function rebuildIndexFromDisk() {
  const index = buildSearchIndex();
  saveIndex(index);
  return index;
}
