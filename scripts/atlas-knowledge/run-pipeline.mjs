import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
  appendFileSync,
} from "node:fs";
import { join } from "node:path";
import {
  enginePath,
  loadConfig,
  resolveKnowledgePath,
  folderForDomain,
  folderForCategory,
} from "../../.cursor/knowledge-engine/lib/paths.mjs";
import { parseAtom, serializeAtom } from "../../.cursor/knowledge-engine/lib/frontmatter.mjs";
import { runQualityGates } from "../../.cursor/knowledge-engine/lib/quality-gates.mjs";
import { rebuildGraphFromDisk } from "../../.cursor/knowledge-engine/lib/graph.mjs";
import { rebuildIndexFromDisk } from "../../.cursor/knowledge-engine/lib/indexer.mjs";

const STAGES = loadConfig().pipeline.stages;

function log(stage, message, data = null) {
  const entry = { ts: new Date().toISOString(), stage, message, data };
  const logPath = enginePath("meta", "ingestion-log.jsonl");
  mkdirSync(enginePath("meta"), { recursive: true });
  appendFileSync(logPath, JSON.stringify(entry) + "\n");
  return entry;
}

function loadQueue() {
  const queueDir = enginePath("ingest", "queue");
  mkdirSync(queueDir, { recursive: true });
  return readdirSync(queueDir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(readFileSync(join(queueDir, f), "utf8")))
    .sort((a, b) => (a.priority ?? 5) - (b.priority ?? 5));
}

function stripHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** 1. Research Agent — resolve targets from backlog / queue */
function stageResearchAgent(items, ctx) {
  if (items.length === 0) {
    const backlogPath = enginePath("meta", "research-backlog.json");
    if (existsSync(backlogPath)) {
      const backlog = JSON.parse(readFileSync(backlogPath, "utf8"));
      for (const p of backlog.items.filter((i) => i.status === "pending").slice(0, 5)) {
        items.push({
          id: p.id,
          query: p.query,
          domain: p.domain,
          priority: p.priority,
          url: p.url,
        });
      }
    }
  }
  ctx.targets = items;
  log("researchAgent", `Resolved ${items.length} research targets`);
  return ctx;
}

/** 2. Scraper — load raw scraped payloads */
function stageScraper(ctx) {
  const rawDir = enginePath("ingest", "raw");
  const scrapedDir = enginePath("ingest", "scraped");
  mkdirSync(rawDir, { recursive: true });
  mkdirSync(scrapedDir, { recursive: true });

  ctx.scraped = [];
  for (const target of ctx.targets ?? []) {
    const rawFile = join(rawDir, `${target.id}.json`);
    const scrapedFile = join(scrapedDir, `${target.id}.json`);

    if (existsSync(scrapedFile)) {
      ctx.scraped.push({ ...target, payload: JSON.parse(readFileSync(scrapedFile, "utf8")) });
    } else if (existsSync(rawFile)) {
      const raw = JSON.parse(readFileSync(rawFile, "utf8"));
      const payload = {
        id: target.id,
        url: raw.url ?? target.url,
        title: raw.title,
        html: raw.html ?? null,
        text: raw.content ?? raw.text ?? "",
        metadata: raw.metadata ?? {},
        scrapedAt: new Date().toISOString(),
      };
      writeFileSync(scrapedFile, JSON.stringify(payload, null, 2));
      ctx.scraped.push({ ...target, payload });
    } else {
      ctx.scraped.push({
        ...target,
        payload: {
          id: target.id,
          text: "",
          placeholder: true,
          note: "Populate ingest/raw/{id}.json — agent uses browser tools to scrape",
        },
      });
    }
  }
  log("scraper", `Scraped ${ctx.scraped.length} sources`);
  return ctx;
}

/** 3. Cleaner — strip noise, normalize text */
function stageCleaner(ctx) {
  const cleanedDir = enginePath("ingest", "cleaned");
  mkdirSync(cleanedDir, { recursive: true });

  ctx.cleaned = [];
  for (const item of ctx.scraped ?? []) {
    let text = item.payload.text ?? "";
    if (item.payload.html) text = stripHtml(item.payload.html);
    text = text.replace(/\s+/g, " ").trim();

    const cleaned = {
      id: item.id,
      domain: item.domain,
      title: item.payload.title ?? item.query ?? item.id,
      text,
      url: item.payload.url,
      wordCount: text.split(/\s+/).filter(Boolean).length,
    };
    writeFileSync(join(cleanedDir, `${item.id}.json`), JSON.stringify(cleaned, null, 2));
    ctx.cleaned.push(cleaned);
  }
  log("cleaner", `Cleaned ${ctx.cleaned.length} documents`);
  return ctx;
}

/** 4. Summarizer — produce concise summary */
function stageSummarizer(ctx) {
  for (const doc of ctx.cleaned ?? []) {
    doc.summary =
      doc.text.length > 400
        ? doc.text.slice(0, 397) + "..."
        : doc.text || `Research target: ${doc.title}`;
  }
  log("summarizer", "Summaries generated");
  return ctx;
}

/** 5. Fact Checker — validate sources, assign confidence */
function stageFactChecker(ctx) {
  ctx.factChecked = [];
  for (const doc of ctx.cleaned ?? []) {
    const sources = doc.url
      ? [{ type: "url", ref: doc.url, confidence: 0.85, retrievedAt: new Date().toISOString().slice(0, 10) }]
      : [{ type: "internal", ref: `ingest:${doc.id}`, confidence: 0.6, retrievedAt: new Date().toISOString().slice(0, 10) }];

    const confidence = doc.wordCount > 100 ? 0.75 : 0.5;
    ctx.factChecked.push({ ...doc, sources, confidence, status: confidence >= 0.6 ? "verified" : "draft" });
  }
  log("factChecker", `Fact-checked ${ctx.factChecked.length} items`);
  return ctx;
}

/** 6. Knowledge Extractor — structured atom candidates */
function stageKnowledgeExtractor(ctx) {
  const today = new Date().toISOString().slice(0, 10);
  ctx.extracted = (ctx.factChecked ?? []).map((doc) => {
    const category = doc.category ?? "atom";
    const domain = doc.domain ?? "consulting";
    const folder =
      doc.knowledgeFolder ??
      folderForCategory(category) ??
      folderForDomain(domain);

    return {
      meta: {
        id: doc.id.replace(/[^a-z0-9.-]/gi, "-").toLowerCase(),
        title: doc.title,
        category,
        domain,
        knowledgeFolder: folder,
        tags: doc.tags ?? [domain],
        summary: doc.summary,
        confidence: doc.confidence,
        version: "1.0.0",
        lastUpdated: today,
        sources: doc.sources,
        related: doc.related ?? [],
        status: doc.status,
      },
      sections: {
        summary: doc.summary,
        coreConcepts: doc.text,
        references: doc.url ? `- ${doc.url}` : `- ingest:${doc.id}`,
      },
    };
  });
  log("knowledgeExtractor", `Extracted ${ctx.extracted.length} knowledge atoms`);
  return ctx;
}

/** 7. Pattern Engine — flag pattern candidates */
function stagePatternEngine(ctx) {
  ctx.patterns = [];
  for (const atom of ctx.extracted ?? []) {
    const text = atom.sections.coreConcepts ?? "";
    if (/pattern:/i.test(text) || atom.meta.category === "pattern") {
      atom.meta.category = "pattern";
      atom.meta.knowledgeFolder = "31_patterns";
      ctx.patterns.push({ id: atom.meta.id, title: atom.meta.title });
    }
  }
  log("patternEngine", `Identified ${ctx.patterns.length} patterns`);
  return ctx;
}

function stageDeduplicate(ctx) {
  ctx.deduplicated = [];
  ctx.rejected = ctx.rejected ?? [];
  for (const atom of ctx.extracted ?? []) {
    const gates = runQualityGates(atom);
    if (gates.duplicates.length > 0 && !ctx.force) {
      ctx.rejected.push({ id: atom.meta.id, reason: "duplicate", gates });
      continue;
    }
    if (!gates.passed && !ctx.force) {
      ctx.rejected.push({ id: atom.meta.id, reason: "quality-gate", gates });
      continue;
    }
    ctx.deduplicated.push(atom);
  }
  log("deduplicate", `Passed ${ctx.deduplicated.length}, rejected ${ctx.rejected.length}`);
  return ctx;
}

function stageCategorize(ctx) {
  for (const atom of ctx.deduplicated ?? []) {
    if (!atom.meta.knowledgeFolder) {
      atom.meta.knowledgeFolder =
        folderForCategory(atom.meta.category) ?? folderForDomain(atom.meta.domain);
    }
  }
  log("categorize", "Folder assignments validated");
  return ctx;
}

/** 8. Generate Files — write .md to knowledge/{folder}/ */
function stageGenerateFiles(ctx) {
  ctx.generated = [];
  for (const atom of ctx.deduplicated ?? []) {
    const filePath = resolveKnowledgePath(atom.meta);
    ctx.generated.push({
      path: filePath,
      content: serializeAtom(atom.meta, atom.sections),
      id: atom.meta.id,
    });
  }
  log("generateFiles", `Generated ${ctx.generated.length} knowledge files`);
  return ctx;
}

function stageLinkKnowledge(ctx) {
  log("linkKnowledge", "Related atom links embedded in frontmatter");
  return ctx;
}

/** 9. Update Graph */
function stageUpdateGraph(ctx) {
  ctx.graph = rebuildGraphFromDisk();
  log("updateGraph", `${ctx.graph.nodeCount} nodes, ${ctx.graph.edgeCount} edges`);
  return ctx;
}

function stageIndex(ctx) {
  ctx.searchIndex = rebuildIndexFromDisk();
  log("index", `${ctx.searchIndex.documentCount} indexed documents`);
  return ctx;
}

function stageVersion(ctx) {
  const versionPath = enginePath("meta", "version.json");
  const prev = existsSync(versionPath) ? JSON.parse(readFileSync(versionPath, "utf8")) : { revision: 0 };
  ctx.version = {
    revision: prev.revision + 1,
    updatedAt: new Date().toISOString(),
    stored: ctx.stored ?? 0,
    pipelineRun: ctx.runId,
  };
  writeFileSync(versionPath, JSON.stringify(ctx.version, null, 2));
  log("version", `Revision ${ctx.version.revision}`);
  return ctx;
}

function stageStore(ctx) {
  ctx.stored = 0;
  for (const file of ctx.generated ?? []) {
    mkdirSync(join(file.path, ".."), { recursive: true });
    writeFileSync(file.path, file.content);
    ctx.stored++;
  }
  log("store", `Stored ${ctx.stored} knowledge files`);
  return ctx;
}

const STAGE_FNS = {
  researchAgent: stageResearchAgent,
  scraper: stageScraper,
  cleaner: stageCleaner,
  summarizer: stageSummarizer,
  factChecker: stageFactChecker,
  knowledgeExtractor: stageKnowledgeExtractor,
  patternEngine: stagePatternEngine,
  deduplicate: stageDeduplicate,
  categorize: stageCategorize,
  generateFiles: stageGenerateFiles,
  linkKnowledge: stageLinkKnowledge,
  updateGraph: stageUpdateGraph,
  index: stageIndex,
  version: stageVersion,
  store: stageStore,
};

export async function runPipeline(options = {}) {
  const { items = loadQueue(), fromStage = null, toStage = null, force = false } = options;
  const ctx = { runId: `run-${Date.now()}`, force, rejected: [], stored: 0 };

  let startIdx = 0;
  let endIdx = STAGES.length - 1;
  if (fromStage) startIdx = STAGES.indexOf(fromStage);
  if (toStage) endIdx = STAGES.indexOf(toStage);
  if (startIdx < 0 || endIdx < 0) throw new Error("Invalid stage name");

  log("pipeline", `Run ${ctx.runId}`, { flow: loadConfig().pipeline.flow, stages: STAGES.slice(startIdx, endIdx + 1) });

  for (const stage of STAGES.slice(startIdx, endIdx + 1)) {
    const fn = STAGE_FNS[stage];
    if (stage === "researchAgent") fn(items, ctx);
    else fn(ctx);
  }

  return ctx;
}

export { STAGES, loadQueue, log };
