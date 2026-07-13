#!/usr/bin/env node
/**
 * AI Home page forge loop.
 *
 * Reads the captured reference HTML (Softree_/aihomepage.html), strips it to a
 * renderable body + head styles, rebrands every Kore/Artemis reference to
 * Softree, and emits a referenceContent module consumed by the /ai-home route.
 *
 * Usage: node scripts/build-ai-home-page.mjs
 */
import fs from "node:fs"
import path from "node:path"
import { applySoftreeContent } from "./ai-home-copy.mjs"

const ROOT = process.cwd()
const SRC = path.join(ROOT, "Softree_", "aihomepage.html")
const OUT = path.join(ROOT, "src", "components", "softree-ai-home", "referenceContent.ts")

if (!fs.existsSync(SRC)) {
  console.error(`Reference HTML not found: ${SRC}`)
  process.exit(1)
}

const raw = fs.readFileSync(SRC, "utf8")

// ---------------------------------------------------------------------------
// Slice head + body
// ---------------------------------------------------------------------------
const headEnd = raw.indexOf("</head>")
const head = raw.slice(0, headEnd)
const bodyOpen = raw.indexOf(">", raw.indexOf("<body")) + 1
const bodyEnd = raw.lastIndexOf("</body>")
let body = raw.slice(bodyOpen, bodyEnd)

// ---------------------------------------------------------------------------
// Head <style> blocks (page-critical overrides)
// ---------------------------------------------------------------------------
const styleBlocks = []
const styleRe = /<style[^>]*>([\s\S]*?)<\/style>/g
let m
while ((m = styleRe.exec(head)) !== null) {
  const css = m[1].trim()
  if (css) styleBlocks.push(css)
}

// Webflow shared CSS (CDN) — carries the bulk of the layout.
const cssHrefMatch = head.match(/href="([^"]*vovi-starter[^"]*\.min\.css)"/)
const cssHref = cssHrefMatch ? cssHrefMatch[1] : ""

// ---------------------------------------------------------------------------
// Pull inline interaction scripts out of the body, drop every <script>.
// ---------------------------------------------------------------------------
const interactionScripts = []
body = body.replace(/<script([^>]*)>([\s\S]*?)<\/script>/g, (_full, attrs, inner) => {
  if (/\bsrc=/.test(attrs)) return "" // vendor scripts handled separately
  const code = inner.trim()
  if (code) interactionScripts.push(code)
  return ""
})

// Drop third-party tracking snippets (o11, G2, HubSpot body loader, etc.)
const TRACKING_MARKERS = ["o11.tech", "tracking-api.g2.com", "analytics.o11", "GTM-KH6KVMH"]
const cleanInteractionScripts = interactionScripts.filter(
  (code) => !TRACKING_MARKERS.some((m) => code.includes(m)),
)

// Remove duplicate GTM noscript + HubSpot push anchor (site layout already has GTM)
body = body.replace(/<div id="hs-web-interactives-top-push-anchor"[^>]*><\/div>/g, "")
body = body.replace(/<noscript><iframe[^>]*GTM-KH6KVMH[\s\S]*?<\/noscript>/g, "")

// Keep body <style> blocks in place (section-scoped) — they render fine inside body.

// ---------------------------------------------------------------------------
// Rebrand: Kore / Artemis / product / social → Softree
// Case-sensitive word replacements avoid touching lowercase css class names
// (e.g. `artemis-panel`, `k2-badge`).
// ---------------------------------------------------------------------------
const REPLACEMENTS = [
  // URLs / domains / social
  [/https?:\/\/(www\.)?kore\.ai\/?/gi, "https://www.softreetechnology.com/"],
  [/https?:\/\/marketplace\.kore\.ai\/?/gi, "/case-studies"],
  [/https?:\/\/docs\.kore\.ai\/?/gi, "/services"],
  [/https?:\/\/community\.kore\.ai\/?/gi, "https://www.linkedin.com/company/softree-technology-pvt-ltd/"],
  [/https?:\/\/bots\.kore\.ai[^"']*/gi, "/blog"],
  [/https?:\/\/(www\.)?facebook\.com\/KoreDotAI\/?/gi, "https://www.linkedin.com/company/softree-technology-pvt-ltd/"],
  [/https?:\/\/x\.com\/koredotai/gi, "https://x.com/softreetechnology"],
  [/https?:\/\/(www\.|in\.)?linkedin\.com\/company\/kore-inc/gi, "https://www.linkedin.com/company/softree-technology-pvt-ltd"],
  [/https?:\/\/trust\.kore\.ai\/?/gi, "https://www.softreetechnology.com/"],
  [/https?:\/\/(www\.)?youtube\.com\/@Koreai/gi, "https://www.youtube.com/@softreetechnology"],
  [/https?:\/\/(www\.)?instagram\.com\/kore\.ai\/?/gi, "https://www.instagram.com/softreetechnology/"],
  [/https?:\/\/(www\.)?pinterest\.com\/KoreDotAI\/?/gi, "https://www.linkedin.com/company/softree-technology-pvt-ltd/"],

  [/href="\/request-a-demo"/g, 'href="/contact"'],
  [/href="\/analyst-recognition"/g, 'href="/case-studies"'],
  [/href="\/ai-agent-platform"/g, 'href="/agentic-ai-platform"'],
  // Any internal slug that still carries a kore-* name -> safe hub
  [/href="\/[^"]*kore[^"]*"/gi, 'href="/case-studies"'],

  // Brand text (case-sensitive whole words to protect css class names)
  [/Kore\.ai Inc\./g, "Softree Technology"],
  [/Kore\.ai/g, "Softree"],
  [/\bKore\b/g, "Softree"],
  [/\bArtemis\b/g, "Softree AI"],
  [/\bARTEMIS\b/g, "SOFTREE"],
  [/\bKoreDotAI\b/g, "Softree"],
  [/\bKoreai\b/g, "Softree"],
  // Lowercase domain left in aria-labels / tracking querystrings
  [/kore\.ai/gi, "softreetechnology.com"],
]

const SOFTREE_LOGO_IMG =
  '<img src="/logo/Softree-Technology-Final-Logo.png" alt="Softree Technology" style="height:1.4rem;width:auto;display:block" />'

function rebrand(text) {
  let out = text
  for (const [from, to] of REPLACEMENTS) out = out.replace(from, to)
  return out
}

/** Body-only structural swaps: Kore wordmark SVGs + branded diagram image → Softree. */
function rebrandBody(html) {
  let out = rebrand(html)
  // Kore wordmark SVGs (nav viewBox 0 0 75 20, footer/cta 0 0 74|75 19) → Softree logo
  out = out.replace(/<svg[^>]*viewBox="0 0 7[45] (?:19|20)"[\s\S]*?<\/svg>/g, SOFTREE_LOGO_IMG)
  // Branded "marketecture" diagram (shows Kore product branding) → Softree logo
  out = out.replace(
    /https:\/\/cdn\.prod\.website-files\.com\/[^"'\s]*Kore_ai%20Marketecture[^"'\s]*/g,
    "/logo/Softree-Technology-Final-Logo.png",
  )
  return applySoftreeContent(out)
}

body = rebrandBody(body)
const rebrandedStyles = styleBlocks.map(rebrand)
const rebrandedScripts = cleanInteractionScripts.map(rebrand)

// ---------------------------------------------------------------------------
// Emit TS module
// ---------------------------------------------------------------------------
const j = (v) => JSON.stringify(v)

const moduleSource = `/* AUTO-GENERATED by scripts/build-ai-home-page.mjs — do not edit by hand.
 * Source: Softree_/aihomepage.html (Kore reference → Softree content rewrite).
 * Re-run: npm run build:ai-home
 */

export const AI_HOME_CSS_HREF = ${j(cssHref)}

export const AI_HOME_STYLES: string[] = ${j(rebrandedStyles)}

export const AI_HOME_INTERACTION_SCRIPTS: string[] = ${j(rebrandedScripts)}

export const AI_HOME_VENDOR_SCRIPTS: string[] = [
  "https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=6717a0dfaf71071a80dfce8b",
  "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/js/vovi-starter-9d8b21f567cf-f7c28d5917abe.f970800c.23585581112826ba.js",
  "https://cdn.prod.website-files.com/gsap/3.15.0/gsap.min.js",
  "https://cdn.prod.website-files.com/gsap/3.15.0/ScrollTrigger.min.js",
  "https://unpkg.com/lenis@1.3.8/dist/lenis.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/Swiper/11.0.5/swiper-bundle.min.js",
  "https://unpkg.com/@rive-app/canvas@2.21.6/rive.js",
]

export const AI_HOME_BODY_HTML = ${j(body)}
`

fs.mkdirSync(path.dirname(OUT), { recursive: true })
fs.writeFileSync(OUT, moduleSource, "utf8")

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------
const koreLeft = (body.match(/kore/gi) || []).length
const artemisLeft = (body.match(/artemis/gi) || []).length
const artemisWord = (body.match(/\bArtemis\b/gi) || []).length
const platformTrust = (body.match(/only agent platform you can trust/gi) || []).length
const forresterLeft = (body.match(/forrester wave/gi) || []).length
const gartnerLeft = (body.match(/gartner/gi) || []).length
const morganStanley = (body.match(/Morgan Stanley|Pfizer|Deutsche Bank|Lilly|Boardwalk/gi) || []).length
console.log("AI home referenceContent written:", path.relative(ROOT, OUT))
console.log("  body bytes:      ", body.length)
console.log("  head styles:     ", rebrandedStyles.length)
console.log("  inline scripts:  ", rebrandedScripts.length)
console.log("  css href:        ", cssHref ? "found" : "MISSING")
console.log("  'kore' left:     ", koreLeft, "(class/asset names ok)")
console.log("  'artemis' left:  ", artemisLeft, "(lowercase css classes ok)")
console.log("  'Artemis' word:  ", artemisWord, "(should be 0)")
console.log("  platform trust:  ", platformTrust, "(should be 0)")
console.log("  forrester refs:  ", forresterLeft, "(should be 0)")
console.log("  gartner refs:    ", gartnerLeft, "(should be 0)")
console.log("  kore customers:  ", morganStanley, "(should be 0)")
