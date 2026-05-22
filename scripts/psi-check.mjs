/**
 * PageSpeed Insights CI check for Softree Technology.
 *
 * Usage:
 *   PSI_API_KEY=<your-key> node scripts/psi-check.mjs
 *   PSI_SITE_BASE=https://staging.example.com node scripts/psi-check.mjs
 *
 * Environment variables:
 *   PSI_API_KEY   – Google PageSpeed Insights API key (required)
 *   PSI_SITE_BASE – Base URL of the site to audit (default: https://softreetechnology.com)
 *
 * Exit codes:
 *   0 – all pages passed their thresholds
 *   1 – one or more pages failed a threshold
 */

const BASE_URL = process.env.PSI_SITE_BASE || "https://softreetechnology.com";
const API_KEY  = process.env.PSI_API_KEY;

if (!API_KEY) {
  console.error("❌  PSI_API_KEY environment variable is not set.");
  console.error("    Set it with: PSI_API_KEY=<your-key> npm run psi");
  process.exit(1);
}

// ─── Pages to audit ────────────────────────────────────────────────────────
const PAGES = [
  { path: "/",           label: "Homepage"  },
  { path: "/services",   label: "Services"  },
  { path: "/about-us",   label: "About Us"  },
  { path: "/contact",    label: "Contact"   },
  { path: "/blog",       label: "Blog"      },
];

// ─── Score thresholds (0–100) ─────────────────────────────────────────────
const THRESHOLDS = {
  performance:   50,
  accessibility: 85,
  seo:           85,
  "best-practices": 80,
};

const STRATEGIES = ["mobile", "desktop"];
const PSI_ENDPOINT = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";

// ─── Helpers ──────────────────────────────────────────────────────────────
function score(raw) {
  return Math.round((raw ?? 0) * 100);
}

function colorScore(n, threshold) {
  if (n >= 90)        return `\x1b[32m${n}\x1b[0m`;   // green
  if (n >= threshold) return `\x1b[33m${n}\x1b[0m`;   // yellow
  return                      `\x1b[31m${n}\x1b[0m`;  // red
}

const MAX_RETRIES = 3;
const RETRY_BASE_MS = 8000; // 8 s, 16 s, 32 s

async function auditPage(url, strategy, attempt = 1) {
  const endpoint = new URL(PSI_ENDPOINT);
  endpoint.searchParams.set("url",      url);
  endpoint.searchParams.set("strategy", strategy);
  endpoint.searchParams.set("key",      API_KEY);
  for (const cat of ["performance", "accessibility", "best-practices", "seo"]) {
    endpoint.searchParams.append("category", cat);
  }

  let res;
  try {
    res = await fetch(endpoint.toString());
  } catch (networkErr) {
    if (attempt <= MAX_RETRIES) {
      const wait = RETRY_BASE_MS * attempt;
      process.stdout.write(`\x1b[33m (network error, retry ${attempt}/${MAX_RETRIES} in ${wait / 1000}s…)\x1b[0m`);
      await new Promise((r) => setTimeout(r, wait));
      return auditPage(url, strategy, attempt + 1);
    }
    throw networkErr;
  }

  if (!res.ok) {
    const body = await res.text();
    // Retry transient server-side errors (5xx) but not client errors (4xx)
    if (res.status >= 500 && attempt <= MAX_RETRIES) {
      const wait = RETRY_BASE_MS * attempt;
      process.stdout.write(`\x1b[33m (${res.status}, retry ${attempt}/${MAX_RETRIES} in ${wait / 1000}s…)\x1b[0m`);
      await new Promise((r) => setTimeout(r, wait));
      return auditPage(url, strategy, attempt + 1);
    }
    throw new Error(`PSI API error ${res.status} for ${url} [${strategy}]: ${body}`);
  }

  const json = await res.json();
  const cats = json.lighthouseResult?.categories ?? {};

  return {
    performance:       score(cats.performance?.score),
    accessibility:     score(cats.accessibility?.score),
    seo:               score(cats.seo?.score),
    "best-practices":  score(cats["best-practices"]?.score),
  };
}

// ─── Main ─────────────────────────────────────────────────────────────────
const summary = [];

console.log(`\n🔍  PageSpeed Insights Audit — ${BASE_URL}`);
console.log(`${"─".repeat(70)}\n`);

for (const page of PAGES) {
  const url = `${BASE_URL}${page.path}`;
  console.log(`📄  ${page.label}  (${url})`);

  for (const strategy of STRATEGIES) {
    process.stdout.write(`    ${strategy.padEnd(8)}: `);
    try {
      const scores = await auditPage(url, strategy);
      let pageFailed = false;

      const parts = Object.entries(THRESHOLDS).map(([cat, threshold]) => {
        const s = scores[cat];
        if (s < threshold) {
          pageFailed = true;
        }
        return `${cat}=${colorScore(s, threshold)}`;
      });

      const status = pageFailed ? "\x1b[31m✖ FAIL\x1b[0m" : "\x1b[32m✔ PASS\x1b[0m";
      console.log(`${status}  ${parts.join("  ")}`);

      summary.push({ label: page.label, url, strategy, scores, passed: !pageFailed });
    } catch (err) {
      console.error(`\x1b[31m    ✖ ERROR\x1b[0m  ${err.message}`);
      summary.push({ label: page.label, url, strategy, scores: null, passed: false, error: err.message });
    }

    // Respect API rate limits – wait 1 s between requests
    await new Promise((r) => setTimeout(r, 1000));
  }

  console.log();
}

// ─── Summary ──────────────────────────────────────────────────────────────
console.log(`${"─".repeat(70)}`);
console.log("📊  Thresholds enforced:");
for (const [cat, val] of Object.entries(THRESHOLDS)) {
  console.log(`    ${cat.padEnd(20)}: ≥ ${val}`);
}

const failed = summary.filter((r) => !r.passed);
if (failed.length > 0) {
  console.log(`\n\x1b[31m✖  ${failed.length} audit(s) failed:\x1b[0m`);
  for (const r of failed) {
    console.log(`   - ${r.label} [${r.strategy}] ${r.url}`);
    if (r.error) {
      console.log(`     Error: ${r.error}`);
    } else {
      for (const [cat, threshold] of Object.entries(THRESHOLDS)) {
        const s = r.scores[cat];
        if (s < threshold) console.log(`     ${cat}: ${s} < ${threshold}`);
      }
    }
  }
  console.log();
  process.exit(1);
} else {
  console.log("\n\x1b[32m✔  All pages passed!\x1b[0m\n");
  process.exit(0);
}
