import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { readFileSync, existsSync } from "node:fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
export const ENGINE_ROOT = resolve(__dirname, "..");
export const CURSOR_ROOT = resolve(ENGINE_ROOT, "..");
export const REPO_ROOT = resolve(CURSOR_ROOT, "..");

export function loadConfig() {
  return JSON.parse(readFileSync(join(ENGINE_ROOT, "config.json"), "utf8"));
}

export function enginePath(...segments) {
  return join(ENGINE_ROOT, ...segments);
}

export function knowledgeRoot() {
  const config = loadConfig();
  const rel = config.paths.knowledge;
  return resolve(ENGINE_ROOT, rel);
}

export function promptsRoot() {
  const config = loadConfig();
  return resolve(ENGINE_ROOT, config.paths.prompts);
}

export function patternsRoot() {
  return enginePath("patterns");
}

export function memoryRoot() {
  const config = loadConfig();
  return resolve(ENGINE_ROOT, config.paths.memory);
}

export function resolveKnowledgePath(meta) {
  const slug = meta.fileName ?? (meta.id.includes(".") ? meta.id.split(".").pop() : meta.id);
  const fileName = slug.endsWith(".md") ? slug : `${slug}.md`;

  let folder = meta.knowledgeFolder;
  if (!folder) {
    const config = loadConfig();
    folder =
      config.categoryToFolder[meta.category] ??
      config.domainToFolder[meta.domain] ??
      "02-consulting";
  }
  if (folder === "patterns") return join(patternsRoot(), fileName);
  return join(knowledgeRoot(), folder, fileName);
}

export function allKnowledgeFolders() {
  return loadConfig().taxonomy.map((t) => t.folder);
}

export function folderForDomain(domain) {
  return loadConfig().domainToFolder[domain] ?? "02-consulting";
}

export function folderForCategory(category) {
  return loadConfig().categoryToFolder[category];
}

export function legacyKnowledgePath(...segments) {
  return join(CURSOR_ROOT, "knowledge", ...segments);
}
