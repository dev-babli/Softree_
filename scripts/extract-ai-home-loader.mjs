#!/usr/bin/env node
/**
 * Extract the AI home loader exactly from Softree_/aihomepage.html + Webflow CSS.
 *
 * The saved HTML omits `.loader` (removed after animation) — we rebuild DOM from
 * source CSS rules + nav-logo SVG, rebranded to Softree.
 *
 * Usage: node scripts/extract-ai-home-loader.mjs
 */
import fs from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const SRC = path.join(ROOT, "Softree_", "aihomepage.html")
const CSS_URL =
  "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/css/vovi-starter-9d8b21f567cf-f7c28d5917abe.shared.8900fac45.min.css"
const OUT_TS = path.join(ROOT, "src", "components", "softree-ai-home", "loaderContent.ts")
const OUT_CSS = path.join(ROOT, "src", "components", "softree-ai-home", "ai-home-loader.css")

const raw = fs.readFileSync(SRC, "utf8")

// ---------------------------------------------------------------------------
// Inline loader state CSS from <head>
// ---------------------------------------------------------------------------
const headEnd = raw.indexOf("</head>")
const head = raw.slice(0, headEnd)
const inlineLoaderCss = []
for (const m of head.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)) {
  const block = m[1]
  const rules = []
  const ruleRe =
    /(?:\.loader[^{]*\{[^}]+\}|html\.loading\s*\{[^}]+\})/g
  let rule
  while ((rule = ruleRe.exec(block)) !== null) {
    rules.push(rule[0].trim())
  }
  if (rules.length) inlineLoaderCss.push(rules.join("\n"))
}

// ---------------------------------------------------------------------------
// Webflow shared CSS — .loader + .kore-logo-2 base rules
// ---------------------------------------------------------------------------
let webflowLoaderCss = ""
try {
  const bundle = await fetch(CSS_URL).then((r) => r.text())
  const loaderIdx = bundle.indexOf(".loader{")
  if (loaderIdx !== -1) {
    // Grab .loader{...} and .kore-logo-2{...} chunks
    const slice = bundle.slice(loaderIdx, loaderIdx + 600)
    const loaderRule = slice.match(/\.loader\{[^}]+\}/)?.[0] ?? ""
    const logo2Rule = slice.match(/\.kore-logo-2\{[^}]+\}/)?.[0] ?? ""
    webflowLoaderCss = [loaderRule, logo2Rule].filter(Boolean).join("\n")
  }
} catch (err) {
  console.warn("Could not fetch Webflow CSS:", err.message)
  webflowLoaderCss = `.loader{z-index:3000;pointer-events:none;justify-content:center;align-items:center;display:flex;position:fixed;inset:0%}
.kore-logo-2{opacity:0;width:11.25rem;height:auto;transition:opacity 1s;position:absolute}`
}

// Rebrand kore-logo → softree-logo in CSS
function rebrandLoaderCss(css) {
  return css
    .replace(/\.kore-logo-2/g, ".softree-logo-2")
    .replace(/\.kore-logo-1/g, ".softree-logo-1")
}

const combinedCss = rebrandLoaderCss(
  [
    webflowLoaderCss,
    ...inlineLoaderCss.map(rebrandLoaderCss),
    `.softree-logo-1,
.softree-logo-2 {
  width: 11.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.softree-logo-1 img,
.softree-logo-2 img {
  width: 11.25rem;
  height: auto;
  display: block;
}
.loader {
  background: #fff;
}`,
  ].join("\n\n"),
)

// ---------------------------------------------------------------------------
// Extract nav-logo SVG (source wordmark) — used only for path archive; render Softree img
// ---------------------------------------------------------------------------
const navLogoMatch = raw.match(
  /class="nav-logo[\s\S]*?<svg[\s\S]*?viewBox="([^"]+)"[\s\S]*?>([\s\S]*?)<\/svg>/,
)
const viewBox = navLogoMatch?.[1] ?? "0 0 75 20"
const svgInner = navLogoMatch?.[2] ?? ""
const pathDs = [...svgInner.matchAll(/d="([^"]+)"/g)].map((m) => m[1])

// ---------------------------------------------------------------------------
// Reconstructed loader DOM (exact class choreography: logo-1 → logo-2)
// ---------------------------------------------------------------------------
const SOFTREE_LOGO =
  '<img src="/logo/Softree-Technology-Final-Logo.png" alt="Softree Technology" width="180" height="48" />'

const loaderHtml = `<div class="loader" aria-hidden="true" role="presentation">
  <div class="softree-logo-1">${SOFTREE_LOGO}</div>
  <div class="softree-logo-2">${SOFTREE_LOGO}</div>
</div>`

// ---------------------------------------------------------------------------
// handleLoader timings (verbatim defaults from source script)
// ---------------------------------------------------------------------------
const handleLoaderMatch = raw.match(
  /async function handleLoader\(\{[\s\S]*?t0:\s*n\s*=\s*(\d+),\s*tLogo1:\s*l\s*=\s*(\d+),\s*tBetween:\s*o\s*=\s*(\d+),\s*tLogo2:\s*s\s*=\s*(\d+),\s*tHtmlAfter:\s*c\s*=\s*(\d+),\s*tBotDelay:\s*d\s*=\s*(\d+)/,
)

const timings = {
  t0: Number(handleLoaderMatch?.[1] ?? 1),
  tLogo1: Number(handleLoaderMatch?.[2] ?? 700),
  tBetween: Number(handleLoaderMatch?.[3] ?? 700),
  tLogo2: Number(handleLoaderMatch?.[4] ?? 700),
  tHtmlAfter: Number(handleLoaderMatch?.[5] ?? 250),
  tBotDelay: Number(handleLoaderMatch?.[6] ?? 450),
}

// ---------------------------------------------------------------------------
// Write outputs
// ---------------------------------------------------------------------------
fs.mkdirSync(path.dirname(OUT_TS), { recursive: true })
fs.writeFileSync(OUT_CSS, combinedCss, "utf8")

const j = (v) => JSON.stringify(v)
const moduleSource = `/* AUTO-GENERATED by scripts/extract-ai-home-loader.mjs — do not edit by hand.
 * Re-run: node scripts/extract-ai-home-loader.mjs
 */

export const AI_HOME_LOADER_TIMINGS = ${JSON.stringify(timings, null, 2)} as const

/** Verbatim nav-logo SVG paths from reference (archived; loader renders Softree img). */
export const AI_HOME_LOADER_LOGO_PATHS = ${j(pathDs)} as const

export const AI_HOME_LOADER_VIEWBOX = ${j(viewBox)}

export const AI_HOME_LOADER_HTML = ${j(loaderHtml)}

export const AI_HOME_LOADER_CSS = ${j(combinedCss)}
`

fs.writeFileSync(OUT_TS, moduleSource, "utf8")

console.log("AI home loader extracted:")
console.log("  css bytes:   ", combinedCss.length)
console.log("  html bytes:  ", loaderHtml.length)
console.log("  svg paths:   ", pathDs.length)
console.log("  timings:     ", timings)
console.log("  wrote:       ", path.relative(ROOT, OUT_TS))
console.log("  wrote:       ", path.relative(ROOT, OUT_CSS))
