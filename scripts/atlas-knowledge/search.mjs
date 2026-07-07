#!/usr/bin/env node
import { search } from "../../.cursor/knowledge-engine/lib/indexer.mjs";
import { getRelated, rebuildGraphFromDisk } from "../../.cursor/knowledge-engine/lib/graph.mjs";
import { rebuildIndexFromDisk } from "../../.cursor/knowledge-engine/lib/indexer.mjs";

const [cmd, ...rest] = process.argv.slice(2);

if (cmd === "search") {
  const query = rest.join(" ");
  const results = search(query, { limit: 15 });
  console.log(JSON.stringify(results, null, 2));
} else if (cmd === "related") {
  const id = rest[0];
  if (!id) {
    console.error("Usage: atlas:knowledge related <atom-id>");
    process.exit(1);
  }
  console.log(JSON.stringify(getRelated(id, 2), null, 2));
} else if (cmd === "reindex") {
  rebuildGraphFromDisk();
  const index = rebuildIndexFromDisk();
  console.log(`Rebuilt graph + index (${index.documentCount} documents)`);
} else if (cmd === "graph") {
  const graph = rebuildGraphFromDisk();
  console.log(JSON.stringify({ nodes: graph.nodeCount, edges: graph.edgeCount, updatedAt: graph.updatedAt }, null, 2));
} else {
  console.log(`ATLAS Knowledge CLI

Usage:
  npm run atlas:knowledge search <query>
  npm run atlas:knowledge related <atom-id>
  npm run atlas:knowledge reindex
  npm run atlas:knowledge graph
`);
}
