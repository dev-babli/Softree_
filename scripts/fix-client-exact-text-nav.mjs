/**
 * Fix client-exact section JSX issues:
 * 1. &amp;amp; → &amp; (double-encoded entities)
 * 2. Preserve whitespace text nodes between word spans (Ahoj text)
 * 3. Regenerate TopBar from extracted header HTML
 * 4. Inject SVG icon sprite
 */
import fs from "node:fs"
import path from "node:path"
import { parse } from "node-html-parser"

const ROOT = path.resolve("src/components/client-exact")
const SECTIONS = path.join(ROOT, "sections")
const EXTRACTED = path.join(ROOT, "_extracted")

// --- 1. Fix amp;amp; across all section tsx ---
for (const f of fs.readdirSync(SECTIONS)) {
  if (!f.endsWith(".tsx")) continue
  const p = path.join(SECTIONS, f)
  let t = fs.readFileSync(p, "utf8")
  const before = t
  // Fix double-encoded ampersands in JSX text/attrs
  t = t.replace(/&amp;amp;/g, "&amp;")
  // Also fix any literal "Designer &amp;amp;" style already in text nodes as string
  if (t !== before) {
    fs.writeFileSync(p, t)
    console.log("fixed amp", f)
  }
}

// --- 2. Extract header from main-inner ---
const main = fs.readFileSync(path.join(EXTRACTED, "main-inner.html"), "utf8")
const mainRoot = parse(main)
const headerWrap = mainRoot.querySelector(".framer-1iup1yh-container")
if (!headerWrap) {
  console.error("header wrap missing")
  process.exit(1)
}
const headerHtml = headerWrap.toString()
fs.writeFileSync(path.join(EXTRACTED, "sections", "topbar.html"), headerHtml)
console.log("topbar html", headerHtml.length)

// --- 3. Convert header HTML → TopBarSection.tsx using same converter logic ---
// Import by re-running a minimal conversion inline
const VOID = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
])
const ATTR_MAP = {
  class: "className",
  for: "htmlFor",
  tabindex: "tabIndex",
  readonly: "readOnly",
  maxlength: "maxLength",
  minlength: "minLength",
  cellpadding: "cellPadding",
  cellspacing: "cellSpacing",
  colspan: "colSpan",
  rowspan: "rowSpan",
  usemap: "useMap",
  frameborder: "frameBorder",
  contenteditable: "contentEditable",
  crossorigin: "crossOrigin",
  datetime: "dateTime",
  enctype: "encType",
  formaction: "formAction",
  formenctype: "formEncType",
  formmethod: "formMethod",
  formnovalidate: "formNoValidate",
  formtarget: "formTarget",
  marginheight: "marginHeight",
  marginwidth: "marginWidth",
  novalidate: "noValidate",
  radiogroup: "radioGroup",
  spellcheck: "spellCheck",
  srcdoc: "srcDoc",
  srcset: "srcSet",
  autoplay: "autoPlay",
  playsinline: "playsInline",
  allowfullscreen: "allowFullScreen",
  autocomplete: "autoComplete",
  autofocus: "autoFocus",
  charset: "charSet",
  checked: "checked",
  disabled: "disabled",
  multiple: "multiple",
  muted: "muted",
  selected: "selected",
  defer: "defer",
  async: "async",
  loop: "loop",
  controls: "controls",
  open: "open",
  required: "required",
  draggable: "draggable",
  hidden: "hidden",
}
const BOOL_TRUE = new Set([
  "checked",
  "disabled",
  "multiple",
  "muted",
  "selected",
  "defer",
  "async",
  "loop",
  "controls",
  "open",
  "required",
  "autoPlay",
  "playsInline",
  "allowFullScreen",
  "readOnly",
  "autoFocus",
  "hidden",
  "draggable",
])

function camelCaseStyleProp(name) {
  if (name.startsWith("--")) return name
  if (name === "float") return "cssFloat"
  return name.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
}

function parseStyle(styleStr) {
  if (!styleStr || !styleStr.trim()) return null
  const entries = []
  for (const part of styleStr.split(";")) {
    const trimmed = part.trim()
    if (!trimmed) continue
    const idx = trimmed.indexOf(":")
    if (idx === -1) continue
    const rawKey = trimmed.slice(0, idx).trim()
    let rawVal = trimmed.slice(idx + 1).trim()
    if (!rawKey) continue
    const key = camelCaseStyleProp(rawKey)
    if (
      (rawVal.startsWith('"') && rawVal.endsWith('"')) ||
      (rawVal.startsWith("'") && rawVal.endsWith("'"))
    ) {
      rawVal = rawVal.slice(1, -1)
    }
    entries.push([key, rawVal])
  }
  return entries.length ? entries : null
}

function styleToJsx(entries) {
  const parts = entries.map(([k, v]) => {
    const keyLit = k.startsWith("--") ? `["${k}"]` : k
    return `${keyLit}: ${JSON.stringify(v)}`
  })
  return `{{ ${parts.join(", ")} }}`
}

function attrNameToJsx(name) {
  const lower = name.toLowerCase()
  if (ATTR_MAP[lower]) return ATTR_MAP[lower]
  if (lower.startsWith("aria-") || lower.startsWith("data-")) return lower
  if (lower.includes("-") && !lower.startsWith("data-") && !lower.startsWith("aria-")) {
    return lower.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
  }
  return name
}

function escapeText(text) {
  // Decode common entities first so we don't turn &amp; into &amp;amp;
  const decoded = text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
  return decoded
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\{/g, "&#123;")
    .replace(/\}/g, "&#125;")
}

function nodeToJsx(node, indent) {
  const pad = "  ".repeat(indent)

  if (node.nodeType === 3) {
    const t = node.rawText
    if (!t) return ""
    // CRITICAL: preserve single spaces between word spans (Ahoj text)
    if (/^\s+$/.test(t)) {
      if (t.includes("\n") && !t.trim()) return ""
      // keep at least one space if original had space
      return `${pad}{" "}\n`
    }
    return `${pad}${escapeText(t)}\n`
  }

  if (node.nodeType === 8) return ""
  if (node.nodeType !== 1) return ""

  const tag = node.rawTagName?.toLowerCase()
  if (!tag) return ""
  if (tag === "script" || tag === "style" || tag === "noscript") return ""
  // invalid JSX attr "as" on anchors from Framer
  const attrs = []
  const rawAttrs = node.attributes || {}
  for (const [rawName, rawValue] of Object.entries(rawAttrs)) {
    if (rawName === "as") continue // Framer SSR quirk
    if (rawName === "style") {
      const entries = parseStyle(rawValue)
      if (entries) attrs.push(`style=${styleToJsx(entries)}`)
      continue
    }
    let jsxName = attrNameToJsx(rawName)
    if (jsxName === "corner-shape" || jsxName === "cornerShape") continue
    if (BOOL_TRUE.has(jsxName)) {
      if (rawValue === "" || rawValue === jsxName || rawValue === "true") attrs.push(jsxName)
      else if (rawValue === "false") attrs.push(`${jsxName}={false}`)
      else attrs.push(`${jsxName}={${JSON.stringify(rawValue)}}`)
      continue
    }
    if (
      rawValue === "" &&
      ["draggable", "hidden", "disabled", "checked", "muted", "loop", "autoplay", "playsinline", "controls"].includes(
        rawName.toLowerCase(),
      )
    ) {
      attrs.push(ATTR_MAP[rawName.toLowerCase()] || rawName)
      continue
    }
    if ((jsxName === "width" || jsxName === "height") && /^\d+$/.test(rawValue)) {
      attrs.push(`${jsxName}={${rawValue}}`)
      continue
    }
    // decode double-encoded entities in attribute values
    const decoded = rawValue.replace(/&amp;amp;/g, "&amp;").replace(/&amp;/g, "&")
    attrs.push(`${jsxName}=${JSON.stringify(decoded)}`)
  }

  const attrStr = attrs.length ? " " + attrs.join(" ") : ""
  const children = node.childNodes || []
  if (VOID.has(tag)) return `${pad}<${tag}${attrStr} />\n`
  if (!children.length) return `${pad}<${tag}${attrStr} />\n`

  let childJsx = ""
  for (const child of children) childJsx += nodeToJsx(child, indent + 1)
  if (!childJsx.trim()) return `${pad}<${tag}${attrStr} />\n`
  return `${pad}<${tag}${attrStr}>\n${childJsx}${pad}</${tag}>\n`
}

function htmlToComponent(html, exportName) {
  const root = parse(html, {
    lowerCaseTagName: false,
    comment: false,
    blockTextElements: { script: true, style: true, noscript: true },
  })
  const el = root.childNodes.find((n) => n.nodeType === 1) || root.firstChild
  if (!el || el.nodeType !== 1) throw new Error(`No root for ${exportName}`)
  const jsxBody = nodeToJsx(el, 2).trimEnd()
  return `"use client"

/**
 * REAL React JSX transcribed from Framer SSR markup.
 * Edit copy/structure here — no dangerouslySetInnerHTML.
 */
export function ${exportName}() {
  return (
${jsxBody}
  )
}
`
}

// TopBarSection is hand-maintained (LocalTime + fixed positioning) — do not overwrite
console.log("skipped TopBarSection overwrite (hand-maintained)")

// --- 4. Re-convert About (and any word-split sections) with space preservation ---
const RECONVERT = [
  ["about.html", "AboutSection.tsx", "AboutSection"],
  ["casy-study.html", "CasyStudySection.tsx", "CasyStudySection"],
  ["process.html", "ProcessSection.tsx", "ProcessSection"],
  ["testimonials.html", "TestimonialsSection.tsx", "TestimonialsSection"],
  ["services.html", "ServicesSection.tsx", "ServicesSection"],
  ["portfolio.html", "PortfolioSection.tsx", "PortfolioSection"],
  ["blog.html", "BlogSection.tsx", "BlogSection"],
  ["faq.html", "FaqSection.tsx", "FaqSection"],
  ["pricing.html", "PricingSection.tsx", "PricingSection"],
  ["stats.html", "StatsSection.tsx", "StatsSection"],
  ["logos.html", "LogosSection.tsx", "LogosSection"],
  ["nav.html", "NavSection.tsx", "NavSection"],
]

for (const [src, out, name] of RECONVERT) {
  const html = fs.readFileSync(path.join(EXTRACTED, "sections", src), "utf8")
  // decode double amp in source HTML first
  const cleaned = html.replace(/&amp;amp;/g, "&amp;")
  const tsx = htmlToComponent(cleaned, name)
  fs.writeFileSync(path.join(SECTIONS, out), tsx)
  console.log("reconverted", out)
}

// --- 5. Icon sprite component ---
const spriteInner = fs.readFileSync(path.join(EXTRACTED, "icon-sprite-inner.html"), "utf8")
const spriteTs = `export const FRAMER_ICON_SPRITE_HTML = ${JSON.stringify(spriteInner)}\n`
fs.writeFileSync(path.join(ROOT, "iconSpriteHtml.ts"), spriteTs)
console.log("wrote iconSpriteHtml.ts")

console.log("done")
