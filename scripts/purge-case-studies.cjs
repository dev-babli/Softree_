const fs = require("node:fs");
const path = require("node:path");
const { createClient } = require("@sanity/client");

function loadEnvLocal() {
  const envPath = path.join(process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) return;
  const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    if (!line || line.trim().startsWith("#") || !line.includes("=")) continue;
    const idx = line.indexOf("=");
    const key = line.slice(0, idx).trim();
    const raw = line.slice(idx + 1).trim();
    const value = raw.replace(/^"(.*)"$/, "$1");
    if (!process.env[key]) process.env[key] = value;
  }
}

async function main() {
  loadEnvLocal();
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "1zmh4sfw";
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
  const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-05-21";
  const token = process.env.SANITY_API_WRITE_TOKEN;

  if (!token) {
    throw new Error("Missing SANITY_API_WRITE_TOKEN");
  }

  const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });
  const published = await client.fetch("*[_type == 'caseStudy']._id", {}, { perspective: "raw" });
  const drafts = await client.fetch("*[_id in path('drafts.**') && _type == 'caseStudy']._id", {}, { perspective: "raw" });
  const ids = [...new Set([...(published || []), ...(drafts || [])])];

  if (ids.length === 0) {
    console.log("No caseStudy documents found.");
    return;
  }

  let tx = client.transaction();
  for (const id of ids) tx = tx.delete(id);
  await tx.commit();
  console.log(`Deleted ${ids.length} caseStudy documents.`);
}

main().catch((err) => {
  console.error(err?.message || err);
  process.exit(1);
});
