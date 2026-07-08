import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { join, relative } from "node:path";
import {
  enginePath,
  knowledgeRoot,
  patternsRoot,
  promptsRoot,
  allKnowledgeFolders,
} from "./paths.mjs";
import { parseAtom } from "./frontmatter.mjs";

function walkMarkdown(dir, files = []) {
  if (!existsSync(dir)) return files;
  for (const entry of readdirSync(dir)) {
    if (entry.startsWith("_") || entry === "schema.json") continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walkMarkdown(full, files);
    else if (entry.endsWith(".md")) files.push(full);
  }
  return files;
}

export function loadAllAtoms() {
  const atoms = [];
  const roots = [patternsRoot(), promptsRoot()];

  const kRoot = knowledgeRoot();
  if (existsSync(kRoot)) {
    for (const folder of allKnowledgeFolders()) {
      roots.push(join(kRoot, folder));
    }
  }

  for (const root of roots) {
    for (const file of walkMarkdown(root)) {
      try {
        const content = readFileSync(file, "utf8");
        if (file.endsWith("README.md") && !content.startsWith("---")) continue;
        const parsed = parseAtom(content);
        atoms.push({
          ...parsed,
          filePath: file,
          relPath: relative(join(enginePath(), ".."), file).replace(/\\/g, "/"),
        });
      } catch (err) {
        if (!file.endsWith("/README.md")) {
          console.warn(`[graph] skip ${file}: ${err.message}`);
        }
      }
    }
  }

  return atoms;
}

export function buildGraph(atoms) {
  const nodes = atoms.map((a) => ({
    id: a.meta.id,
    title: a.meta.title,
    category: a.meta.category,
    domain: a.meta.domain,
    knowledgeFolder: a.meta.knowledgeFolder,
    confidence: a.meta.confidence,
    version: a.meta.version,
    lastUpdated: a.meta.lastUpdated,
    status: a.meta.status,
    path: a.relPath,
    tags: a.meta.tags ?? [],
  }));

  const edges = [];
  const nodeIds = new Set(nodes.map((n) => n.id));

  for (const atom of atoms) {
    for (const related of atom.meta.related ?? []) {
      if (nodeIds.has(related)) {
        edges.push({ from: atom.meta.id, to: related, type: "related" });
      }
    }
    if (atom.meta.supersedes && nodeIds.has(atom.meta.supersedes)) {
      edges.push({ from: atom.meta.id, to: atom.meta.supersedes, type: "supersedes" });
    }
  }

  return {
    version: "3.0.0",
    updatedAt: new Date().toISOString(),
    nodeCount: nodes.length,
    edgeCount: edges.length,
    folders: allKnowledgeFolders(),
    nodes,
    edges,
  };
}

export function saveGraph(graph) {
  const path = enginePath("graph", "knowledge-graph.json");
  mkdirSync(enginePath("graph"), { recursive: true });
  writeFileSync(path, JSON.stringify(graph, null, 2));
  return path;
}

export function loadGraph() {
  const path = enginePath("graph", "knowledge-graph.json");
  if (!existsSync(path)) return buildGraph([]);
  return JSON.parse(readFileSync(path, "utf8"));
}

export function getRelated(id, depth = 1) {
  const graph = loadGraph();
  const visited = new Set([id]);
  const result = [];

  function walk(current, d) {
    if (d > depth) return;
    for (const edge of graph.edges) {
      let next = null;
      if (edge.from === current) next = edge.to;
      if (edge.to === current) next = edge.from;
      if (next && !visited.has(next)) {
        visited.add(next);
        const node = graph.nodes.find((n) => n.id === next);
        if (node) {
          result.push({ ...node, relation: edge.type, depth: d });
          walk(next, d + 1);
        }
      }
    }
  }

  walk(id, 1);
  return result;
}

export function rebuildGraphFromDisk() {
  const atoms = loadAllAtoms();
  const graph = buildGraph(atoms);
  saveGraph(graph);
  return graph;
}
