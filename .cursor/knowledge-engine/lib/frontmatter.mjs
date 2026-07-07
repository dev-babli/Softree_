const SECTION_ALIASES = {
  "core concepts": "coreConcepts",
  "core-concepts": "coreConcepts",
  "best practices": "bestPractices",
  "best-practices": "bestPractices",
  "common mistakes": "commonMistakes",
  "common-mistakes": "commonMistakes",
  "decision framework": "decisionFramework",
  "decision-framework": "decisionFramework",
  "implementation guide": "implementationGuide",
  "implementation-guide": "implementationGuide",
  "related topics": "relatedTopics",
  "related-topics": "relatedTopics",
  "future research": "futureResearch",
  "future-research": "futureResearch",
  "trade-offs": "tradeoffs",
};

function parseSimpleYaml(yaml) {
  const meta = {};
  let currentKey = null;
  let currentArray = null;

  for (const line of yaml.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const arrayItem = trimmed.match(/^-\s+(.+)$/);
    if (arrayItem && currentArray) {
      currentArray.push(parseScalar(arrayItem[1]));
      continue;
    }

    const kv = trimmed.match(/^([\w.-]+):\s*(.*)$/);
    if (!kv) continue;

    const [, key, rawValue] = kv;
    if (rawValue === "") {
      currentKey = key;
      currentArray = [];
      meta[key] = currentArray;
      continue;
    }

    currentKey = null;
    currentArray = null;
    meta[key] = parseScalar(rawValue);
  }

  return meta;
}

function parseScalar(value) {
  const v = value.trim();
  if (v === "true") return true;
  if (v === "false") return false;
  if (/^\d+\.\d+$/.test(v)) return Number(v);
  if (/^\d+$/.test(v)) return Number(v);
  if (
    (v.startsWith('"') && v.endsWith('"')) ||
    (v.startsWith("'") && v.endsWith("'"))
  ) {
    return v.slice(1, -1);
  }
  return v;
}

function serializeSimpleYaml(meta) {
  const lines = [];
  for (const [key, value] of Object.entries(meta)) {
    if (Array.isArray(value)) {
      lines.push(`${key}:`);
      for (const item of value) {
        if (typeof item === "object" && item !== null) {
          lines.push(`  - type: ${item.type}`);
          lines.push(`    ref: ${item.ref}`);
          lines.push(`    confidence: ${item.confidence}`);
          if (item.retrievedAt) lines.push(`    retrievedAt: ${item.retrievedAt}`);
        } else {
          lines.push(`  - ${item}`);
        }
      }
    } else if (typeof value === "string" && value.includes(":")) {
      lines.push(`${key}: "${value}"`);
    } else {
      lines.push(`${key}: ${value}`);
    }
  }
  return lines.join("\n");
}

export function parseAtom(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) throw new Error("Knowledge atom missing YAML frontmatter");

  const meta = parseSimpleYaml(match[1]);
  const body = match[2];
  const sections = {};
  let current = null;

  for (const line of body.split("\n")) {
    const heading = line.match(/^##\s+(.+)$/);
    if (heading) {
      const key =
        SECTION_ALIASES[heading[1].trim().toLowerCase()] ??
        heading[1].trim().replace(/\s+/g, "");
      current = key.charAt(0).toLowerCase() + key.slice(1);
      sections[current] = [];
      continue;
    }
    if (current) sections[current].push(line);
  }

  for (const key of Object.keys(sections)) {
    sections[key] = sections[key].join("\n").trim();
  }

  return { meta, sections, raw: content };
}

export function serializeAtom(meta, sections) {
  const order = [
    ["Summary", sections.summary ?? meta.summary ?? ""],
    ["Core Concepts", sections.coreConcepts ?? ""],
    ["Definitions", sections.definitions ?? ""],
    ["Best Practices", sections.bestPractices ?? ""],
    ["Common Mistakes", sections.commonMistakes ?? ""],
    ["Examples", sections.examples ?? ""],
    ["Decision Framework", sections.decisionFramework ?? ""],
    ["Implementation Guide", sections.implementationGuide ?? ""],
    ["Trade-offs", sections.tradeoffs ?? ""],
    ["References", sections.references ?? ""],
    ["Related Topics", sections.relatedTopics ?? ""],
    [
      "Future Research",
      sections.futureResearch ??
        (Array.isArray(meta.futureResearch)
          ? meta.futureResearch.map((x) => `- ${x}`).join("\n")
          : ""),
    ],
  ];

  const body = order
    .filter(([, text]) => text && String(text).trim())
    .map(([title, text]) => `## ${title}\n\n${text}`)
    .join("\n\n");

  return `---\n${serializeSimpleYaml(meta)}\n---\n\n${body}\n`;
}

export function atomToPlainText(atom) {
  const { meta, sections } = atom;
  return [
    meta.title,
    meta.summary,
    meta.domain,
    ...(meta.tags ?? []),
    ...Object.values(sections),
  ]
    .filter(Boolean)
    .join("\n");
}

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 2);
}

export function jaccardSimilarity(a, b) {
  const setA = new Set(tokenize(a));
  const setB = new Set(tokenize(b));
  if (setA.size === 0 && setB.size === 0) return 1;
  let intersection = 0;
  for (const token of setA) if (setB.has(token)) intersection++;
  const union = new Set([...setA, ...setB]).size;
  return union === 0 ? 0 : intersection / union;
}
