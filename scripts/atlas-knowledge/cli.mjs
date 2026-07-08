#!/usr/bin/env node
import { runPipeline } from "./run-pipeline.mjs";

const args = process.argv.slice(2);
const force = args.includes("--force");
const fromIdx = args.indexOf("--from");
const toIdx = args.indexOf("--to");
const fromStage = fromIdx >= 0 ? args[fromIdx + 1] : null;
const toStage = toIdx >= 0 ? args[toIdx + 1] : null;

try {
  const result = await runPipeline({ fromStage, toStage, force });
  console.log(JSON.stringify({
    runId: result.runId,
    stored: result.stored ?? 0,
    rejected: result.rejected?.length ?? 0,
    graph: result.graph ? { nodes: result.graph.nodeCount, edges: result.graph.edgeCount } : null,
    index: result.searchIndex ? { docs: result.searchIndex.documentCount } : null,
    version: result.version?.revision,
  }, null, 2));
  process.exit(result.rejected?.length && !force ? 1 : 0);
} catch (err) {
  console.error(err.message);
  process.exit(1);
}
