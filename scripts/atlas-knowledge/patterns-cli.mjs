#!/usr/bin/env node
import { searchPatterns, loadPatternRegistry, seedPatterns } from "../../.cursor/knowledge-engine/lib/pattern-engine.mjs";

const [cmd, ...rest] = process.argv.slice(2);

if (cmd === "search") {
  seedPatterns();
  const query = rest.join(" ");
  console.log(JSON.stringify(searchPatterns(query), null, 2));
} else if (cmd === "list") {
  const registry = seedPatterns();
  console.log(JSON.stringify(registry.patterns.map((p) => ({
    id: p.id,
    title: p.title,
    category: p.category,
    confidence: p.confidenceLabel,
    recommendation: p.recommendation,
  })), null, 2));
} else if (cmd === "seed") {
  const registry = seedPatterns();
  console.log(`Seeded ${registry.patterns.length} patterns`);
} else {
  console.log(`ATLAS Pattern Engine

npm run atlas:patterns search <query>
npm run atlas:patterns list
npm run atlas:patterns seed
`);
}
