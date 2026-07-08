import { writeFileSync, readFileSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { patternsRoot, memoryRoot } from "./paths.mjs";

const PATTERN_REGISTRY = join(patternsRoot(), "registry.json");

export function loadPatternRegistry() {
  if (!existsSync(PATTERN_REGISTRY)) {
    return { version: "1.0.0", nextId: 1, patterns: [] };
  }
  return JSON.parse(readFileSync(PATTERN_REGISTRY, "utf8"));
}

export function savePatternRegistry(registry) {
  mkdirSync(patternsRoot(), { recursive: true });
  writeFileSync(PATTERN_REGISTRY, JSON.stringify(registry, null, 2));
}

/**
 * Extract or update a reusable consulting pattern from audit evidence.
 *
 * @param {object} input
 * @param {string} input.title
 * @param {string} input.observation - what was observed
 * @param {string} input.evidence - sample size / sources
 * @param {string} input.recommendation
 * @param {number} input.confidence 0-1
 * @param {string} [input.category] - homepage, enterprise-ai, conversion, etc.
 * @param {object} [input.metrics] - e.g. { conversionLift: "+18%" }
 */
export function recordPattern(input) {
  const registry = loadPatternRegistry();
  const id = registry.nextId++;
  const pattern = {
    id: `#${id}`,
    title: input.title,
    category: input.category ?? "general",
    observation: input.observation,
    evidence: input.evidence,
    metrics: input.metrics ?? {},
    confidence: input.confidence,
    confidenceLabel:
      input.confidence >= 0.85 ? "High" : input.confidence >= 0.65 ? "Medium" : "Low",
    recommendation: input.recommendation,
    whenToUse: input.whenToUse ?? "Apply when context matches evidence sample",
    whenNotToUse: input.whenNotToUse ?? "Do not apply without verifying audience fit",
    relatedPatterns: input.relatedPatterns ?? [],
    sourceAudits: input.sourceAudits ?? [],
    createdAt: new Date().toISOString(),
    version: "1.0.0",
  };

  registry.patterns.push(pattern);
  savePatternRegistry(registry);

  const mdPath = join(patternsRoot(), `pattern-${String(id).padStart(3, "0")}.md`);
  const md = `---
id: pattern.${id}
title: ${input.title}
category: pattern
domain: patterns
knowledgeFolder: patterns
patternId: "#${id}"
confidence: ${input.confidence}
version: 1.0.0
lastUpdated: ${new Date().toISOString().slice(0, 10)}
status: verified
sources:
  - type: observation
    ref: ${input.evidence}
    confidence: ${input.confidence}
    retrievedAt: ${new Date().toISOString().slice(0, 10)}
---

## Summary

${input.observation}

## Core Concepts

**Evidence:** ${input.evidence}

**Confidence:** ${pattern.confidenceLabel} (${input.confidence})

${input.metrics?.conversionLift ? `**Observed impact:** ${input.metrics.conversionLift}` : ""}

## Best Practices

${input.recommendation}

## Decision Framework

**When to use:** ${pattern.whenToUse}

**When not to use:** ${pattern.whenNotToUse}

## References

- Pattern Engine registry: \`patterns/registry.json\`
${(input.sourceAudits ?? []).map((a) => `- Audit: ${a}`).join("\n")}
`;

  writeFileSync(mdPath, md);
  return pattern;
}

/**
 * Scan audit memory for recurring findings and propose patterns.
 */
export function extractPatternsFromMemory() {
  const auditsDir = join(memoryRoot(), "audits");
  if (!existsSync(auditsDir)) return [];

  const audits = readdirSync(auditsDir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(readFileSync(join(auditsDir, f), "utf8")));

  const findingCounts = {};
  for (const audit of audits) {
    for (const finding of audit.findings ?? []) {
      const key = finding.pattern ?? finding.title;
      if (!key) continue;
      findingCounts[key] = (findingCounts[key] ?? 0) + 1;
    }
  }

  const proposals = [];
  for (const [key, count] of Object.entries(findingCounts)) {
    if (count >= 3) {
      proposals.push({
        title: key,
        observation: `Observed in ${count} audits`,
        evidence: `${count} ATLAS audits in memory`,
        confidence: Math.min(0.95, 0.5 + count * 0.1),
        recommendation: `Consider default application when context matches`,
      });
    }
  }
  return proposals;
}

export function searchPatterns(query) {
  const registry = loadPatternRegistry();
  const q = query.toLowerCase();
  return registry.patterns.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.observation.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
  );
}

export function seedPatterns() {
  const registry = loadPatternRegistry();
  if (registry.patterns.length > 0) return registry;

  recordPattern({
    title: "Social proof above the fold",
    category: "homepage",
    observation:
      "High-converting SaaS homepages place social proof (logos, metrics, testimonials) in the first viewport.",
    evidence: "Observed across Softree, Stripe, Linear reference audits",
    metrics: { conversionLift: "benchmark +15–25% (industry range)" },
    confidence: 0.82,
    recommendation:
      "Default: include 3–6 client logos or one quantified proof line above the fold on B2B service pages.",
    whenToUse: "B2B SaaS and consulting homepages targeting enterprise buyers",
    whenNotToUse: "Brand campaigns where mystery/tease is intentional",
  });

  recordPattern({
    title: "Enterprise AI positions outcomes not agents",
    category: "enterprise-ai",
    observation:
      "Most successful enterprise AI companies lead with business outcomes — not 'we build AI agents'.",
    evidence: "Softree, Accenture, Thoughtworks homepage messaging analysis",
    confidence: 0.88,
    recommendation:
      "Lead with: revenue, efficiency, automation, cost reduction. Technology is implementation layer.",
    whenToUse: "All Softree AI and Agentic AI pages",
    whenNotToUse: "Deep technical docs for engineering evaluators",
  });

  recordPattern({
    title: "Scroll choreography on flagship pages",
    category: "design",
    observation:
      "Awwwards/Apple-tier pages use one pinned scroll-driven narrative per flagship page.",
    evidence: "Apple product pages, softreetechnology.com platform sections",
    confidence: 0.85,
    recommendation:
      "Implement one GSAP ScrollTrigger pin+scrub sequence on About, /ai, and primary service pages.",
    whenToUse: "Flagship pages with story to tell",
    whenNotToUse: "Legal, FAQ, utility pages",
  });

  return loadPatternRegistry();
}
