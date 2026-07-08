import { loadConfig } from "./paths.mjs";
import { jaccardSimilarity } from "./frontmatter.mjs";
import { loadAllAtoms } from "./graph.mjs";

export function validateAtom(atom) {
  const { meta, sections } = atom;
  const config = loadConfig();
  const errors = [];
  const warnings = [];

  const requiredMeta = [
    "id",
    "title",
    "category",
    "domain",
    "summary",
    "confidence",
    "version",
    "lastUpdated",
  ];
  for (const field of requiredMeta) {
    if (meta[field] === undefined || meta[field] === "") {
      errors.push(`Missing required meta field: ${field}`);
    }
  }

  if (!meta.sources || meta.sources.length === 0) {
    errors.push("Missing sources — every atom must be traceable");
  }

  if (typeof meta.confidence === "number" && meta.confidence < config.qualityGates.minConfidence) {
    warnings.push(
      `Confidence ${meta.confidence} below minimum ${config.qualityGates.minConfidence}`
    );
  }

  for (const section of config.qualityGates.requiredSections) {
    const inMeta = meta[section];
    const inBody = sections[section];
    if (!inMeta && (!inBody || !String(inBody).trim())) {
      errors.push(`Missing required section: ${section}`);
    }
  }

  if (meta.confidence >= 0.8 && (!sections.bestPractices || !sections.bestPractices.trim())) {
    warnings.push("High-confidence atom should include Best Practices section");
  }

  return { valid: errors.length === 0, errors, warnings };
}

export function findDuplicates(candidate, existingAtoms = null) {
  const atoms = existingAtoms ?? loadAllAtoms();
  const candidateText = [
    candidate.meta?.summary ?? "",
    candidate.sections?.coreConcepts ?? "",
  ].join("\n");

  const duplicates = [];
  for (const atom of atoms) {
    if (candidate.meta?.id && atom.meta.id === candidate.meta.id) continue;
    const existingText = [
      atom.meta.summary ?? "",
      atom.sections?.coreConcepts ?? "",
    ].join("\n");
    const similarity = jaccardSimilarity(candidateText, existingText);
    if (similarity >= loadConfig().qualityGates.maxDuplicateSimilarity) {
      duplicates.push({
        id: atom.meta.id,
        title: atom.meta.title,
        similarity: Number(similarity.toFixed(3)),
        path: atom.relPath,
      });
    }
  }
  return duplicates;
}

export function runQualityGates(atom, { skipDuplicateCheck = false } = {}) {
  const validation = validateAtom(atom);
  const duplicates = skipDuplicateCheck ? [] : findDuplicates(atom);

  const rejected = [
    ...validation.errors,
    ...duplicates.map(
      (d) =>
        `Duplicate content (${Math.round(d.similarity * 100)}% similar to ${d.id})`
    ),
  ];

  return {
    passed: rejected.length === 0,
    errors: validation.errors,
    warnings: validation.warnings,
    duplicates,
    rejected,
  };
}

export function scoreSourceConfidence(sources) {
  if (!sources?.length) return 0;
  const weights = sources.map((s) => s.confidence ?? 0.5);
  return weights.reduce((a, b) => a + b, 0) / weights.length;
}
