#!/usr/bin/env node
/**
 * Kore → Softree rename loop
 *
 * Usage:
 *   node scripts/rename-kore-to-softree.mjs --dry-run
 *   node scripts/rename-kore-to-softree.mjs --apply
 *   node scripts/rename-kore-to-softree.mjs --apply --verify
 *
 * Order: text replacements → file renames (deepest first) → dir renames (deepest first)
 */
import fs from "node:fs"
import path from "node:path"
import { spawnSync } from "node:child_process"

const ROOT = process.cwd()
const DRY_RUN = process.argv.includes("--dry-run")
const APPLY = process.argv.includes("--apply")
const VERIFY = process.argv.includes("--verify")

if (!DRY_RUN && !APPLY) {
  console.log("Pass --dry-run or --apply")
  process.exit(1)
}

const SKIP_DIRS = new Set([
  "node_modules",
  ".git",
  "dist",
  ".next",
  ".turbo",
  "coverage",
])

const SCOPE_DIRS = [
  "src",
  "scripts",
  "tests",
  "public",
  ".cursor",
  ".planning",
]

const TEXT_EXT = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".mjs",
  ".cjs",
  ".css",
  ".json",
  ".md",
  ".mdc",
  ".html",
  ".txt",
])

/** Longest / most specific replacements first. Avoid bare `kore-ai` (breaks external CDN paths). */
const REPLACEMENTS = [
  ["softree-agentic-intro-v1", "softree-agentic-intro-v1"],
  ["softree-agentic-shell", "softree-agentic-shell"],
  ["softree-agentic-intro-complete", "softree-agentic-intro-complete"],
  ["softree-agentic-k2-loader-running", "softree-agentic-k2-loader-running"],
  ["softree-agentic-k2-handoff-running", "softree-agentic-k2-handoff-running"],
  ["agentic-ai-platform", "agentic-ai-platform"],
  ["softree-agentic-exact", "softree-agentic-exact"],
  ["superdesign/softree-agentic", "superdesign/softree-agentic"],
  ["public/softree-agentic-exact", "public/softree-agentic-exact"],
  ["public/softree-source-sections", "public/softree-source-sections"],
  ["public/softree-marketing/", "public/softree-marketing/"],
  ["@/components/softree-marketing-ui/", "@/components/softree-marketing-ui/"],
  ["/components/softree-marketing-ui/", "/components/softree-marketing-ui/"],
  ["`@/components/softree-marketing-ui`", "`@/components/softree-marketing-ui`"],
  ["from \"@/components/kore\"", "from \"@/components/softree-marketing-ui\""],
  ["from '@/components/softree-marketing-ui'", "from '@/components/softree-marketing-ui'"],
  ["`/softree-marketing/${string}`", "`/softree-marketing/${string}`"],
  ["'/softree-marketing/rive/", "'/softree-marketing/rive/"],
  ['"/softree-marketing/rive/', '"/softree-marketing/rive/'],
  ["`/softree-marketing/", "`/softree-marketing/"],
  ["'/softree-marketing/", "'/softree-marketing/"],
  ['"/softree-marketing/', '"/softree-marketing/'],
  ["page-forge/softree-agentic-exact", "page-forge/softree-agentic-exact"],

  ["SOFTREE_AGENTIC_SECTION_COMPONENTS", "SOFTREE_AGENTIC_SECTION_COMPONENTS"],
  ["SOFTREE_AGENTIC_INTERACTION_SCRIPT", "SOFTREE_AGENTIC_INTERACTION_SCRIPT"],
  ["SOFTREE_AGENTIC_REFERENCE_CSS", "SOFTREE_AGENTIC_REFERENCE_CSS"],
  ["SOFTREE_AGENTIC_SCROLL_NAV", "SOFTREE_AGENTIC_SCROLL_NAV"],
  ["SOFTREE_AGENTIC_SECTIONS", "SOFTREE_AGENTIC_SECTIONS"],
  ["SOFTREE_AGENTIC_DIALOGS", "SOFTREE_AGENTIC_DIALOGS"],
  ["SOFTREE_AGENTIC_HEADER", "SOFTREE_AGENTIC_HEADER"],
  ["SOFTREE_AGENTIC_FOOTER", "SOFTREE_AGENTIC_FOOTER"],
  ["SOFTREE_AGENTIC_HERO_BG_IMAGE", "SOFTREE_AGENTIC_HERO_BG_IMAGE"],

  ["installSoftreeAgenticTabs", "installSoftreeAgenticTabs"],
  ["mountSoftreeAgenticScrollTabs", "mountSoftreeAgenticScrollTabs"],
  ["initSoftreeAgenticScrollReveal", "initSoftreeAgenticScrollReveal"],
  ["softreeAgenticHtmlCopy", "softreeAgenticHtmlCopy"],
  ["softreeAgenticTabs", "softreeAgenticTabs"],
  ["softreeAgenticHeroAssets", "softreeAgenticHeroAssets"],

  ["SoftreeAgenticPage", "SoftreeAgenticPage"],
  ["SoftreeAgenticCaseStudyInteractive", "SoftreeAgenticCaseStudyInteractive"],
  ["SoftreeAgenticCaseStudyFrame", "SoftreeAgenticCaseStudyFrame"],
  ["SoftreeAgenticProgrammableSection", "SoftreeAgenticProgrammableSection"],
  ["SoftreeAgenticLightMiddleGroup", "SoftreeAgenticLightMiddleGroup"],
  ["SoftreeAgenticAgentsSection", "SoftreeAgenticAgentsSection"],
  ["SoftreeAgenticReferenceModals", "SoftreeAgenticReferenceModals"],
  ["SoftreeAgenticScrollNav", "SoftreeAgenticScrollNav"],
  ["SoftreeAgenticHeader", "SoftreeAgenticHeader"],
  ["SoftreeAgenticFooter", "SoftreeAgenticFooter"],
  ["SoftreeAgenticBuildScaleOptimizeSection", "SoftreeAgenticBuildScaleOptimizeSection"],
  ["SoftreeAgenticOutcomesSection", "SoftreeAgenticOutcomesSection"],
  ["SoftreeAgenticOutcomesSection", "SoftreeAgenticOutcomesSection"],
  ["SoftreeEnterpriseCarousel", "SoftreeEnterpriseCarousel"],
  ["SoftreeAgenticDemoVideoSection", "SoftreeAgenticDemoVideoSection"],
  ["SoftreeAgenticScrollTabsSection", "SoftreeAgenticScrollTabsSection"],
  ["SoftreeAgenticGetStartedSection", "SoftreeAgenticGetStartedSection"],
  ["SoftreeAgenticPillarsSection", "SoftreeAgenticPillarsSection"],
  ["SoftreeAgenticAgentsSection", "SoftreeAgenticAgentsSection"],
  ["SoftreeAgenticHeroSection", "SoftreeAgenticHeroSection"],
  ["SoftreeAgenticIntroTransition", "SoftreeAgenticIntroTransition"],
  ["SoftreeAgenticMeetSection", "SoftreeAgenticMeetSection"],
  ["SoftreeAgenticScrollTabsSection", "SoftreeAgenticScrollTabsSection"],
  ["SoftreeAgenticSection7Section", "SoftreeAgenticSection7Section"],
  ["SoftreeAgenticLoader", "SoftreeAgenticLoader"],
  ["SoftreePlatformShowcaseSection", "SoftreePlatformShowcaseSection"],
  ["SoftreeAgenticScrollTabs", "SoftreeAgenticScrollTabs"],
  ["SoftreeAgenticPrimitives", "SoftreeAgenticPrimitives"],
  ["SoftreeHoverImagePreview", "SoftreeHoverImagePreview"],
  ["SoftreeHoverImageTarget", "SoftreeHoverImageTarget"],
  ["SoftreeAccordionRow", "SoftreeAccordionRow"],
  ["SoftreeButtonDot", "SoftreeButtonDot"],
  ["SoftreeChatbotProps", "SoftreeChatbotProps"],
  ["SoftreeChatbot", "SoftreeChatbot"],
  ["SoftreeExitModalProps", "SoftreeExitModalProps"],
  ["SoftreeExitModal", "SoftreeExitModal"],
  ["SoftreeMarqueeProps", "SoftreeMarqueeProps"],
  ["SoftreeMarquee", "SoftreeMarquee"],
  ["SoftreeModalProps", "SoftreeModalProps"],
  ["SoftreeModal", "SoftreeModal"],
  ["SoftreeNavigationProps", "SoftreeNavigationProps"],
  ["SoftreeNavigation", "SoftreeNavigation"],
  ["SoftreeRiveCanvasPoster", "SoftreeRiveCanvasPoster"],
  ["SoftreeRiveCanvasProps", "SoftreeRiveCanvasProps"],
  ["SoftreeRiveCanvas", "SoftreeRiveCanvas"],
  ["SoftreeSectionPillProps", "SoftreeSectionPillProps"],
  ["SoftreeSectionPill", "SoftreeSectionPill"],
  ["SoftreeSideArrow", "SoftreeSideArrow"],
  ["SoftreeSwiperWrapper", "SoftreeSwiperWrapper"],
  ["SoftreeTabPanel", "SoftreeTabPanel"],
  ["SoftreeTabStrip", "SoftreeTabStrip"],
  ["SoftreeAgentic", "SoftreeAgentic"],

  ["softreePanelDomId", "softreePanelDomId"],
  ["softreeTabDomId", "softreeTabDomId"],
  ["softreeBlue", "softreeBlue"],
  ["softreeRed", "softreeRed"],
  ["--softree-blue", "--softree-blue"],
  ["--softree-red", "--softree-red"],
  ["softree-ui-tokens", "softree-ui-tokens"],
  ["export const SOFTREE_UI =", "export const SOFTREE_UI ="],

  ["extract-softree-styles", "extract-softree-styles"],
  ["extract-softree-section-text", "extract-softree-section-text"],
  [".softree-style-inventory.json", ".softree-style-inventory.json"],

  ['barba-namespace="softree-agentic-exact"', 'barba-namespace="softree-agentic-exact"'],
  ['"softree-agentic-exact"', '"softree-agentic-exact"'],

  ["Softree white logo", "Softree white logo"],
  ["Softree Logo White", "Softree Logo White"],
  ["Softree%20Logo%20White", "Softree%20Logo%20White"],
  ["alt=\"Kore", 'alt="Softree'],
  [">Softree<", ">Softree<"],
  ["Softree", "Softree"],
  ["softreetechnology.com", "softreetechnology.com"],

  // kebab-case module filenames (imports)
  ["softree-accordion-row", "softree-accordion-row"],
  ["softree-button-dot", "softree-button-dot"],
  ["softree-hover-image-target", "softree-hover-image-target"],
  ["softree-hover-image-preview", "softree-hover-image-preview"],
  ["softree-marquee", "softree-marquee"],
  ["softree-modal", "softree-modal"],
  ["softree-rive-canvas", "softree-rive-canvas"],
  ["softree-section-pill", "softree-section-pill"],
  ["softree-side-arrow", "softree-side-arrow"],
  ["softree-swiper-wrapper", "softree-swiper-wrapper"],
  ["softree-tab-panel", "softree-tab-panel"],
  ["softree-tab-strip", "softree-tab-strip"],
  ["softree-loader", "softree-loader"],
  ["softree-scroll-tabs.css", "softree-scroll-tabs.css"],
  ["softree-body-theme.css", "softree-body-theme.css"],
  ["softree-build-scale-fix.css", "softree-build-scale-fix.css"],
  ["softree-demo-video-fix.css", "softree-demo-video-fix.css"],
  ["softree-get-started-fix.css", "softree-get-started-fix.css"],
  ["softree-hero-handoff.css", "softree-hero-handoff.css"],
  ["softree-light-theme-fix.css", "softree-light-theme-fix.css"],
  ["softree-scroll-tabs-fix.css", "softree-scroll-tabs-fix.css"],
  ["softree-agentic-page-fix.css", "softree-agentic-page-fix.css"],
  ["company/softree-technology", "company/softree-technology"],
]

const EXACT_FILE_RENAMES = {
  SoftreeAgenticPage: "SoftreeAgenticPage",
  SoftreeAgenticLoader: "SoftreeAgenticLoader",
  SoftreeAgenticIntroTransition: "SoftreeAgenticIntroTransition",
  SoftreeAgenticHeroSection: "SoftreeAgenticHeroSection",
  SoftreeAgenticAgentsSection: "SoftreeAgenticAgentsSection",
  SoftreeAgenticOutcomesSection: "SoftreeAgenticOutcomesSection",
  SoftreeAgenticDemoVideoSection: "SoftreeAgenticDemoVideoSection",
  SoftreeAgenticGetStartedSection: "SoftreeAgenticGetStartedSection",
  SoftreeAgenticPillarsSection: "SoftreeAgenticPillarsSection",
  SoftreeAgenticScrollTabsSection: "SoftreeAgenticScrollTabsSection",
  SoftreeAgenticBuildScaleOptimizeSection: "SoftreeAgenticBuildScaleOptimizeSection",
  SoftreeAgenticProgrammableSection: "SoftreeAgenticProgrammableSection",
  SoftreeAgenticPrimitives: "SoftreeAgenticPrimitives",
  SoftreeAgenticScrollTabs: "SoftreeAgenticScrollTabs",
  SoftreeEnterpriseCarousel: "SoftreeEnterpriseCarousel",
  SoftreePlatformShowcaseSection: "SoftreePlatformShowcaseSection",
  SoftreeAgenticCaseStudyFrame: "SoftreeAgenticCaseStudyFrame",
  SoftreeAgenticCaseStudyInteractive: "SoftreeAgenticCaseStudyInteractive",
  "softree-ui-tokens.ts": "softree-ui-tokens.ts",
  softreeAgenticHtmlCopy: "softreeAgenticHtmlCopy",
  softreeAgenticTabs: "softreeAgenticTabs",
  softreeAgenticHeroAssets: "softreeAgenticHeroAssets",
}

function renamePathSegment(name, parentPath = "") {
  const baseNoExt = name.replace(/\.[^.]+$/, "")
  const ext = name.slice(baseNoExt.length)
  if (EXACT_FILE_RENAMES[baseNoExt]) {
    return EXACT_FILE_RENAMES[baseNoExt] + ext
  }
  if (EXACT_FILE_RENAMES[name]) return EXACT_FILE_RENAMES[name]

  let n = name
  const parent = parentPath.replace(/\\/g, "/")
  if (n === "kore" && parent.endsWith("/public")) return "softree-marketing"
  if (n === "kore") return "softree-marketing-ui"
  if (n === "kore-ai") return "softree-agentic"
  if (n === "kore-exact") return "softree-agentic-exact"
  if (n === "softree-agentic-exact") return "softree-agentic-exact"
  if (n === "agentic-ai-platform") return "agentic-ai-platform"
  if (n === "agentic-ai-platform.tsx") return "softree-agentic-component.tsx"

  n = n.replace(/^SoftreeAgenticPage/, "SoftreeAgenticPage")
  n = n.replace(/^SoftreeAgenticLoader/, "SoftreeAgenticLoader")
  n = n.replace(/^SoftreeAgentic/, "SoftreeAgentic")
  n = n.replace(/^Kore/, "Softree")
  n = n.replace(/^softreeAgenticHtmlCopy/, "softreeAgenticHtmlCopy")
  n = n.replace(/^softreeAgenticTabs/, "softreeAgenticTabs")
  n = n.replace(/^softreeAgenticHeroAssets/, "softreeAgenticHeroAssets")
  n = n.replace(/^softree-ui-tokens/, "softree-ui-tokens")
  n = n.replace(/^kore-ai-/, "softree-agentic-")
  n = n.replace(/^kore-/, "softree-")
  n = n.replace(/softree-agentic-exact/g, "softree-agentic-exact")
  n = n.replace(/agentic-ai-platform/g, "agentic-ai-platform")
  return n
}

function walkFiles(dir, files = []) {
  if (!fs.existsSync(dir)) return files
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(ent.name)) continue
    const full = path.join(dir, ent.name)
    if (ent.isDirectory()) walkFiles(full, files)
    else files.push(full)
  }
  return files
}

function walkAll(dir, entries = []) {
  if (!fs.existsSync(dir)) return entries
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(ent.name)) continue
    const full = path.join(dir, ent.name)
    entries.push(full)
    if (ent.isDirectory()) walkAll(full, entries)
  }
  return entries
}

function applyTextReplacements(content) {
  let out = content
  for (const [from, to] of REPLACEMENTS) {
    out = out.split(from).join(to)
  }
  return out
}

function collectRenameTargets() {
  const targets = []
  for (const scope of SCOPE_DIRS) {
    walkAll(path.join(ROOT, scope), targets)
  }
  return targets
    .filter((p) => /kore/i.test(path.basename(p)))
    .sort((a, b) => b.split(path.sep).length - a.split(path.sep).length)
}

function renamePath(oldPath) {
  const parent = path.dirname(oldPath)
  const newBase = renamePathSegment(path.basename(oldPath), parent)
  const newPath = path.join(parent, newBase)
  if (newPath === oldPath) return false
  if (!fs.existsSync(oldPath)) return false

  const relOld = path.relative(ROOT, oldPath)
  const relNew = path.relative(ROOT, newPath)
  console.log(`RENAME ${relOld} → ${relNew}`)

  if (!DRY_RUN) {
    fs.mkdirSync(path.dirname(newPath), { recursive: true })
    fs.renameSync(oldPath, newPath)
  }
  return true
}

function phaseTextReplace() {
  const files = []
  for (const scope of SCOPE_DIRS) {
    walkFiles(path.join(ROOT, scope), files)
  }
  const extras = ["package.json", "next.config.ts", "vitest.config.ts"]
  for (const f of extras) {
    const p = path.join(ROOT, f)
    if (fs.existsSync(p)) files.push(p)
  }

  let changed = 0
  for (const file of files) {
    const ext = path.extname(file)
    if (ext && !TEXT_EXT.has(ext)) continue
    const content = fs.readFileSync(file, "utf8")
    const next = applyTextReplacements(content)
    if (next !== content) {
      changed++
      if (!DRY_RUN) fs.writeFileSync(file, next, "utf8")
    }
  }
  console.log(`Text replacements: ${changed} file(s)`)
  return changed
}

function phaseRenames() {
  const targets = collectRenameTargets()
  let renamed = 0
  for (const target of targets) {
    if (renamePath(target)) renamed++
  }
  console.log(`Path renames: ${renamed}`)
  return renamed
}

function scanRemaining() {
  const hits = []
  for (const scope of SCOPE_DIRS) {
    const files = walkFiles(path.join(ROOT, scope))
    for (const file of files) {
      const ext = path.extname(file)
      if (ext && !TEXT_EXT.has(ext)) continue
      const content = fs.readFileSync(file, "utf8")
      if (/kore/i.test(content) || /kore/i.test(file)) {
        const rel = path.relative(ROOT, file)
        const matches = content.match(/kore/gi) ?? []
        hits.push({ file: rel, count: matches.length })
      }
    }
  }
  hits.sort((a, b) => b.count - a.count)
  return hits
}

function addRedirectIfNeeded() {
  const configPath = path.join(ROOT, "next.config.ts")
  let content = fs.readFileSync(configPath, "utf8")
  const marker = 'source: "/agentic-ai-platform"'
  if (content.includes(marker)) return

  const redirect = `      {
        source: "/agentic-ai-platform",
        destination: "/agentic-ai-platform",
        permanent: true,
      },
      {
        source: "/agentic-ai-platform/:path*",
        destination: "/agentic-ai-platform/:path*",
        permanent: true,
      },`

  const anchor = '      {\n        source: "/contact-us",'
  if (!content.includes(anchor)) {
    console.warn("Could not inject redirect — edit next.config.ts manually")
    return
  }

  content = content.replace(anchor, `${redirect}\n${anchor}`)
  if (!DRY_RUN) fs.writeFileSync(configPath, content, "utf8")
  console.log("Added /agentic-ai-platform → /agentic-ai-platform redirects")
}

function runVerify() {
  const remaining = scanRemaining()
  const top = remaining.slice(0, 25)
  if (top.length) {
    console.log("\nRemaining kore references (top 25):")
    for (const hit of top) {
      console.log(`  ${hit.count.toString().padStart(4)}  ${hit.file}`)
    }
  } else {
    console.log("\nNo remaining kore references in scoped text files.")
  }

  if (VERIFY && !DRY_RUN) {
    console.log("\nRunning build...")
    const build = spawnSync("npm", ["run", "build"], { cwd: ROOT, stdio: "inherit", shell: true })
    if (build.status !== 0) {
      process.exit(build.status ?? 1)
    }
  }
}

console.log(DRY_RUN ? "=== DRY RUN ===" : "=== APPLY ===")
phaseTextReplace()
phaseRenames()
// Second pass: renames may expose new path-only mismatches in imports already updated
phaseRenames()
if (!DRY_RUN) addRedirectIfNeeded()
runVerify()
