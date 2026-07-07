#!/usr/bin/env node
/**
 * ATLAS v3 bootstrap — creates .cursor/knowledge/{00-21} taxonomy,
 * .cursor/prompts/, memory store, seeds patterns, migrates existing content.
 */
import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
  readdirSync,
  statSync,
} from "node:fs";
import { join, dirname } from "node:path";
import {
  knowledgeRoot,
  promptsRoot,
  memoryRoot,
  CURSOR_ROOT,
  REPO_ROOT,
  enginePath,
} from "../../.cursor/knowledge-engine/lib/paths.mjs";
import { serializeAtom } from "../../.cursor/knowledge-engine/lib/frontmatter.mjs";
import { rebuildGraphFromDisk } from "../../.cursor/knowledge-engine/lib/graph.mjs";
import { rebuildIndexFromDisk } from "../../.cursor/knowledge-engine/lib/indexer.mjs";
import { seedPatterns } from "../../.cursor/knowledge-engine/lib/pattern-engine.mjs";

const TODAY = new Date().toISOString().slice(0, 10);

const MANIFEST = {
  "00-constitution": [
    "Mission", "Vision", "Principles", "CorePhilosophy", "QualityStandards",
    "EngineeringStandards", "ThinkingFramework", "DecisionFramework", "SuccessMetrics",
  ],
  "01-company": [
    "Softree", "Mission", "Vision", "Services", "IdealClients", "ICP",
    "BrandPositioning", "CaseStudies", "Team", "Culture", "Pricing", "Goals",
  ],
  "02-consulting": [
    "ProblemSolving", "MECE", "IssueTrees", "BusinessAnalysis", "Transformation",
    "Strategy", "ConsultingPlaybook", "HypothesisDrivenThinking", "RootCauseAnalysis", "ValueChain",
  ],
  "03-design": [
    "Apple", "Stripe", "Linear", "Vercel", "Airbnb", "Notion",
    "DesignPrinciples", "ColorTheory", "Whitespace", "VisualHierarchy",
  ],
  "04-ui-ux": [
    "NielsenNorman", "UXLaws", "MentalModels", "Accessibility", "Interaction",
    "Navigation", "InformationArchitecture", "EnterpriseUX",
  ],
  "05-engineering": [
    "React", "NextJS", "TypeScript", "Architecture", "Security",
    "Performance", "Scalability", "CleanCode", "DesignPatterns",
  ],
  "06-ai": [
    "LLMs", "RAG", "Agents", "AIArchitecture", "PromptEngineering", "AIWorkflows",
    "MCP", "ToolCalling", "AIGovernance", "EnterpriseAI", "AITransformation",
  ],
  "07-marketing": [
    "Positioning", "Messaging", "DemandGeneration", "LeadGeneration", "EmailMarketing",
    "PaidAds", "ABM", "ContentMarketing", "MarketingPsychology",
  ],
  "08-sales": [
    "EnterpriseSales", "DiscoveryCalls", "Pricing", "Negotiation", "ProposalWriting",
    "Procurement", "ObjectionHandling", "CRM",
  ],
  "09-seo": [
    "TechnicalSEO", "KeywordResearch", "InternalLinks", "SemanticSEO",
    "TopicalAuthority", "CoreWebVitals", "Schema",
  ],
  "10-geo": [
    "ChatGPTOptimization", "ClaudeOptimization", "GeminiOptimization", "PerplexityOptimization",
    "EntityOptimization", "CitationOptimization", "KnowledgeGraphs",
  ],
  "11-aeo": [
    "FAQs", "AnswerEngineOptimization", "QuestionResearch", "StructuredAnswers", "SnippetOptimization",
  ],
  "12-brand": [
    "BrandIdentity", "CategoryCreation", "BrandVoice", "Trust", "Authority", "Reputation",
  ],
  "13-copywriting": [
    "Homepage", "LandingPages", "CTAs", "Headlines", "Storytelling",
    "CaseStudies", "Newsletters", "LinkedIn",
  ],
  "14-research": [
    "AITrends", "EnterpriseAI", "Microsoft", "Google", "OpenAI", "Anthropic", "AWS", "Azure",
  ],
  "15-competitors": [
    "KoreAI", "IBM", "Accenture", "Writer", "Moveworks", "YellowAI", "Globant",
    "Thoughtworks", "Deloitte", "PwC", "BuilderAI", "TCS", "Infosys",
  ],
  "16-industry": [
    "Healthcare", "Legal", "Manufacturing", "Finance", "Insurance", "Education", "Retail", "Logistics",
  ],
  "17-frameworks": [
    "SoftreeTransformationFramework", "AIReadinessFramework", "WebsiteAuditFramework",
    "EnterpriseAudit", "DigitalTransformation", "ModernizationFramework", "BrandFramework",
    "ConversionFramework", "TrustFramework",
  ],
  "18-scoring": [
    "WebsiteScore", "SEOScore", "DesignScore", "TrustScore", "AccessibilityScore",
    "PerformanceScore", "ConversionScore", "EnterpriseReadiness",
  ],
  "19-reporting": [
    "ExecutiveReport", "TechnicalReport", "BusinessReport", "CompetitorReport",
    "AuditReport", "ProposalTemplate", "Roadmap",
  ],
  "20-memory": ["README"],
  "21-roadmaps": [
    "30Day", "90Day", "180Day", "365Day", "Transformation", "AIAdoption",
  ],
};

const PROMPTS = [
  "WebsiteAudit", "HomepageAudit", "SEOAudit", "AIAudit", "BrandAudit",
  "CompetitorResearch", "PricingResearch", "ProposalGeneration",
  "CaseStudyGeneration", "RoadmapGeneration",
];

const MIGRATIONS = {
  "00-constitution/ThinkingFramework.md": [
    ".cursor/knowledge-engine/knowledge/00_constitution/thinking-principles.md",
    ".cursor/knowledge/thinking-principles.md",
  ],
  "00-constitution/Principles.md": [".cursor/knowledge/thinking-principles.md"],
  "00-constitution/CorePhilosophy.md": [".cursor/knowledge/business-context.md"],
  "00-constitution/Mission.md": [".cursor/knowledge/business-context.md"],
  "00-constitution/Vision.md": [".cursor/knowledge/business-context.md"],
  "01-company/Softree.md": [".cursor/knowledge/business-context.md"],
  "01-company/BrandPositioning.md": [
    ".cursor/knowledge/brand-positioning.md",
    ".cursor/knowledge-engine/knowledge/01_company/brand-positioning.md",
  ],
  "01-company/ICP.md": [".cursor/knowledge/ideal-client-profile.md"],
  "01-company/IdealClients.md": [".cursor/knowledge/ideal-client-profile.md"],
  "02-consulting/ConsultingPlaybook.md": [".cursor/knowledge/consulting-frameworks.md"],
  "02-consulting/RootCauseAnalysis.md": [".cursor/knowledge-engine/knowledge/30_playbooks/website-audit.md"],
  "15-competitors/KoreAI.md": [".cursor/knowledge-engine/knowledge/23_competitors/kore-ai.md"],
  "17-frameworks/SoftreeTransformationFramework.md": [
    ".cursor/knowledge/consulting-frameworks.md",
    ".cursor/knowledge-engine/knowledge/26_frameworks/d5oo-framework.md",
  ],
  "17-frameworks/WebsiteAuditFramework.md": [
    ".cursor/knowledge-engine/knowledge/30_playbooks/website-audit.md",
  ],
  "18-scoring/WebsiteScore.md": [
    ".cursor/knowledge/website-scoring-rubric.md",
    ".cursor/knowledge-engine/knowledge/29_scoring/website-rubric.md",
  ],
  "19-reporting/ExecutiveReport.md": [
    ".cursor/knowledge/report-template.md",
    ".cursor/knowledge-engine/knowledge/28_report_templates/executive-report-template.md",
  ],
  "13-copywriting/Storytelling.md": [
    ".cursor/knowledge-engine/knowledge/31_patterns/scroll-choreography-storytelling.md",
  ],
  "07-marketing/Positioning.md": [
    ".cursor/knowledge-engine/knowledge/31_patterns/business-outcomes-first.md",
  ],
};

const FOLDER_PURPOSE = {
  "00-constitution": "Mission, vision, principles, quality standards, thinking and decision frameworks",
  "01-company": "Softree company intelligence — services, ICP, positioning, culture",
  "02-consulting": "McKinsey-style consulting knowledge — MECE, issue trees, transformation",
  "03-design": "Design references and principles — Apple, Stripe, Linear, hierarchy",
  "04-ui-ux": "UX laws, accessibility, IA, enterprise UX patterns",
  "05-engineering": "React, Next.js, architecture, security, performance",
  "06-ai": "LLMs, RAG, agents, MCP, enterprise AI, AI transformation",
  "07-marketing": "Positioning, demand gen, ABM, content marketing",
  "08-sales": "Enterprise sales, discovery, negotiation, procurement",
  "09-seo": "Technical SEO, semantic SEO, schema, topical authority",
  "10-geo": "Generative engine optimization across ChatGPT, Claude, Gemini, Perplexity",
  "11-aeo": "Answer engine optimization, FAQs, structured answers",
  "12-brand": "Brand identity, category creation, trust, authority",
  "13-copywriting": "Homepage, CTAs, headlines, storytelling, LinkedIn",
  "14-research": "AI trends, vendor intelligence — Microsoft, Google, OpenAI, AWS",
  "15-competitors": "Competitor profiles — mission, positioning, strengths, weaknesses",
  "16-industry": "Vertical knowledge — problems, AI opportunities, compliance, KPIs",
  "17-frameworks": "Proprietary Softree frameworks — transformation, audit, conversion",
  "18-scoring": "0–100 scoring rubrics for website, SEO, design, trust, conversion",
  "19-reporting": "Executive, technical, business, competitor report templates",
  "20-memory": "Audit memory — findings, recommendations, patterns learned over time",
  "21-roadmaps": "30/90/180/365-day transformation and AI adoption roadmaps",
};

function readFirstExisting(paths) {
  for (const p of paths) {
    const candidates = [
      join(CURSOR_ROOT, p.replace(/^\.cursor\//, "")),
      join(REPO_ROOT, p),
      enginePath(p.replace(/^\.cursor\/knowledge-engine\//, "")),
    ];
    for (const candidate of candidates) {
      if (!existsSync(candidate)) continue;
      const raw = readFileSync(candidate, "utf8");
      if (raw.includes("---\n")) {
        return raw.replace(/^---[\s\S]*?---\n?/, "").trim();
      }
      return raw.replace(/^#\s+.+\n?/, "").trim();
    }
  }
  return null;
}

function toId(folder, fileName) {
  const domain = folder.replace(/^\d+-/, "").replace(/-/g, ".");
  const slug = fileName.replace(/\.md$/, "").replace(/([A-Z])/g, ".$1").toLowerCase().replace(/^\./, "");
  return `${domain}.${slug}`;
}

function scaffold(folder, fileName, extra = {}) {
  const title = fileName.replace(/\.md$/, "").replace(/([A-Z])/g, " $1").trim();
  const purpose = FOLDER_PURPOSE[folder] ?? "ATLAS knowledge domain";
  const id = extra.id ?? toId(folder, fileName);

  const meta = {
    id,
    title,
    category: extra.category ?? "atom",
    domain: folder.replace(/^\d+-/, ""),
    knowledgeFolder: folder,
    fileName: `${fileName}.md`.replace(/\.md\.md$/, ".md"),
    tags: extra.tags ?? [folder.replace(/^\d+-/, "")],
    summary:
      extra.summary ??
      `Knowledge atom for ${title} in ${folder}. ${purpose}. Enriched by ATLAS research pipeline.`,
    confidence: extra.confidence ?? 0.4,
    version: "1.0.0",
    lastUpdated: TODAY,
    sources: extra.sources ?? [
      {
        type: "internal",
        ref: `atlas:bootstrap/${folder}/${fileName}`,
        confidence: 0.4,
        retrievedAt: TODAY,
      },
    ],
    related: extra.related ?? [],
    status: extra.confidence >= 0.7 ? "verified" : "scaffold",
  };

  const sections = {
    summary: meta.summary,
    coreConcepts:
      extra.coreConcepts ??
      `This file is part of ATLAS ${folder}. Purpose: ${purpose}.\n\nIngest authoritative sources via:\n\`npm run atlas:ingest\` after populating \`ingest/raw/{id}.json\`.`,
    bestPractices: extra.bestPractices ?? "",
    references: extra.references ?? "",
    futureResearch: extra.futureResearch ?? `- Deep research for ${title}`,
  };

  return serializeAtom(meta, sections);
}

function writeAtom(folder, fileName, content, force = false) {
  const root = knowledgeRoot();
  const out = join(root, folder, fileName.endsWith(".md") ? fileName : `${fileName}.md`);
  if (existsSync(out) && !force) return false;
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, content);
  return true;
}

// Bootstrap folders + scaffolds
const root = knowledgeRoot();
mkdirSync(root, { recursive: true });
let created = 0;
let migrated = 0;

for (const [folder, files] of Object.entries(MANIFEST)) {
  mkdirSync(join(root, folder), { recursive: true });
  for (const file of files) {
    const fileName = file === "README" ? "README.md" : `${file}.md`;
    const key = `${folder}/${fileName}`;
    const migSources = MIGRATIONS[key];
    let content;

    if (migSources) {
      const body = readFirstExisting(migSources);
      if (body) {
        content = scaffold(folder, file.replace(/\.md$/, ""), {
          confidence: 0.92,
          status: "verified",
          coreConcepts: body,
          summary: `Migrated ATLAS knowledge for ${file.replace(/([A-Z])/g, " $1").trim()}.`,
          sources: migSources.map((s) => ({
            type: "internal",
            ref: s,
            confidence: 0.95,
            retrievedAt: TODAY,
          })),
        });
        migrated++;
      }
    }

    if (!content) content = scaffold(folder, file.replace(/\.md$/, ""));
    if (writeAtom(folder, fileName, content)) created++;
  }
}

// Memory store structure
const mem = memoryRoot();
for (const sub of ["audits", "findings", "recommendations", "competitors", "patterns-learned"]) {
  mkdirSync(join(mem, sub), { recursive: true });
}
writeFileSync(
  join(mem, "schema.json"),
  JSON.stringify(
    {
      version: "1.0.0",
      audit: {
        required: ["id", "url", "auditedAt", "scores", "findings", "recommendations", "confidence"],
        findings: ["id", "title", "severity", "evidence", "pattern", "businessImpact", "roi"],
      },
    },
    null,
    2
  )
);

// Prompt library
const promptsDir = promptsRoot();
mkdirSync(promptsDir, { recursive: true });
for (const name of PROMPTS) {
  const path = join(promptsDir, `${name}.md`);
  if (!existsSync(path)) {
    writeFileSync(
      path,
      `# ATLAS Prompt: ${name.replace(/([A-Z])/g, " $1").trim()}

Run this prompt with ATLAS knowledge loaded.

## Before running
\`\`\`bash
npm run atlas:knowledge search "${name.toLowerCase()}"
npm run atlas:patterns search "${name.toLowerCase()}"
\`\`\`

## Rules
- Always cite evidence
- Research first — never hallucinate
- Assign confidence scores
- Check Pattern Engine for applicable patterns
- Store results in \`20-memory/audits/\`

## Prompt

You are an ATLAS specialist running **${name}**.

1. Read \`00-constitution/ThinkingFramework.md\`
2. Search knowledge base for relevant atoms
3. Apply patterns from Pattern Engine where confidence ≥ 0.75
4. Produce scored findings with ROI estimates
5. Save audit JSON to \`20-memory/audits/{timestamp}-${name}.json\`
6. Propose new patterns if finding repeats across 3+ audits
`
    );
  }
}

// ATLAS vision README
writeFileSync(
  join(root, "README.md"),
  `# ATLAS Knowledge Repository

Consulting intelligence that compounds.

## Pillars
Constitution · Company · Consulting · AI · Design · Engineering · Marketing · Sales · Research · Competitors · Frameworks · Scoring · Reporting · Memory · Roadmaps

## Pipeline
\`\`\`
Internet → Research Agent → Scraper → Cleaner → Summarizer → Fact Checker
→ Knowledge Extractor → Pattern Engine → Knowledge Files → Memory → Graph
\`\`\`

## Folders
${Object.entries(FOLDER_PURPOSE)
  .map(([k, v]) => `- \`${k}/\` — ${v}`)
  .join("\n")}

## Commands
\`\`\`bash
npm run atlas:bootstrap   # rebuild scaffolds
npm run atlas:knowledge search "query"
npm run atlas:patterns
npm run atlas:ingest
npm run atlas:improve
\`\`\`
`
);

// Seed patterns
seedPatterns();

const graph = rebuildGraphFromDisk();
const index = rebuildIndexFromDisk();

console.log(
  JSON.stringify(
    {
      created,
      migrated,
      graphNodes: graph.nodeCount,
      indexDocs: index.documentCount,
      knowledgeRoot: root,
    },
    null,
    2
  )
);
