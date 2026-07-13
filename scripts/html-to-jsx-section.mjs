/**
 * Convert Framer SSR section HTML → real React JSX .tsx files.
 * Output is hand-editable JSX (no dangerouslySetInnerHTML).
 */
import fs from "node:fs"
import path from "node:path"
import { parse } from "node-html-parser"

const ROOT = path.resolve("src/components/client-exact")
const SECTIONS_DIR = path.join(ROOT, "_extracted/sections")
const OUT_DIR = path.join(ROOT, "sections")

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
    // strip wrapping quotes that break JSX
    if (
      (rawVal.startsWith('"') && rawVal.endsWith('"')) ||
      (rawVal.startsWith("'") && rawVal.endsWith("'"))
    ) {
      rawVal = rawVal.slice(1, -1)
    }
    entries.push([key, rawVal])
  }
  if (!entries.length) return null
  return entries
}

function styleToJsx(entries) {
  const parts = entries.map(([k, v]) => {
    const keyLit = k.startsWith("--") ? `["${k}"]` : k
    // numeric px-only lengths stay as strings (Framer uses many calc/var)
    return `${keyLit}: ${JSON.stringify(v)}`
  })
  return `{{ ${parts.join(", ")} }}`
}

function attrNameToJsx(name) {
  const lower = name.toLowerCase()
  if (ATTR_MAP[lower]) return ATTR_MAP[lower]
  if (lower.startsWith("aria-") || lower.startsWith("data-")) return lower
  // SVG / unknown: keep as-is if already camel, else kebab→camel for known svg
  if (lower.includes("-") && !lower.startsWith("data-") && !lower.startsWith("aria-")) {
    return lower.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
  }
  return name
}

function escapeText(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\{/g, "&#123;")
    .replace(/\}/g, "&#125;")
}

function nodeToJsx(node, indent) {
  const pad = "  ".repeat(indent)

  if (node.nodeType === 3) {
    // text
    const t = node.rawText
    if (!t) return ""
    // preserve meaningful whitespace; collapse pure whitespace between tags to single space or nothing
    if (/^\s+$/.test(t)) return t.includes("\n") ? "" : " "
    return `${pad}${escapeText(t)}\n`
  }

  if (node.nodeType === 8) {
    // comment — skip
    return ""
  }

  if (node.nodeType !== 1) return ""

  const tag = node.rawTagName?.toLowerCase()
  if (!tag) return ""

  // skip script/style inside sections
  if (tag === "script" || tag === "style" || tag === "noscript") return ""

  const attrs = []
  const rawAttrs = node.attributes || {}
  for (const [rawName, rawValue] of Object.entries(rawAttrs)) {
    if (rawName === "style") {
      const entries = parseStyle(rawValue)
      if (entries) attrs.push(`style=${styleToJsx(entries)}`)
      continue
    }

    let jsxName = attrNameToJsx(rawName)
    // React doesn't like these on DOM
    if (jsxName === "corner-shape" || jsxName === "cornerShape") continue

    if (BOOL_TRUE.has(jsxName)) {
      if (rawValue === "" || rawValue === jsxName || rawValue === "true") {
        attrs.push(jsxName)
      } else if (rawValue === "false") {
        attrs.push(`${jsxName}={false}`)
      } else {
        attrs.push(`${jsxName}={${JSON.stringify(rawValue)}}`)
      }
      continue
    }

    // boolean-ish HTML attrs without value
    if (rawValue === "" && ["draggable", "hidden", "disabled", "checked", "muted", "loop", "autoplay", "playsinline", "controls"].includes(rawName.toLowerCase())) {
      const mapped = ATTR_MAP[rawName.toLowerCase()] || rawName
      attrs.push(mapped)
      continue
    }

    // numeric-looking width/height on img/video
    if ((jsxName === "width" || jsxName === "height") && /^\d+$/.test(rawValue)) {
      attrs.push(`${jsxName}={${rawValue}}`)
      continue
    }

    attrs.push(`${jsxName}=${JSON.stringify(rawValue)}`)
  }

  const attrStr = attrs.length ? " " + attrs.join(" ") : ""
  const children = node.childNodes || []

  if (VOID.has(tag)) {
    return `${pad}<${tag}${attrStr} />\n`
  }

  if (!children.length) {
    return `${pad}<${tag}${attrStr} />\n`
  }

  let childJsx = ""
  for (const child of children) {
    childJsx += nodeToJsx(child, indent + 1)
  }

  // if only whitespace children, self-close-ish empty
  if (!childJsx.trim()) {
    return `${pad}<${tag}${attrStr} />\n`
  }

  return `${pad}<${tag}${attrStr}>\n${childJsx}${pad}</${tag}>\n`
}

function htmlToComponent(html, exportName) {
  const root = parse(html, {
    lowerCaseTagName: false,
    comment: false,
    blockTextElements: { script: true, style: true, noscript: true },
  })

  // find first element child (the section)
  const el = root.childNodes.find((n) => n.nodeType === 1) || root.firstChild
  if (!el || el.nodeType !== 1) {
    throw new Error(`No root element for ${exportName}`)
  }

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

const MAP = [
  ["logos.html", "LogosSection.tsx", "LogosSection"],
  ["about.html", "AboutSection.tsx", "AboutSection"],
  ["portfolio.html", "PortfolioSection.tsx", "PortfolioSection"],
  ["services.html", "ServicesSection.tsx", "ServicesSection"],
  ["process.html", "ProcessSection.tsx", "ProcessSection"],
  ["testimonials.html", "TestimonialsSection.tsx", "TestimonialsSection"],
  ["stats.html", "StatsSection.tsx", "StatsSection"],
  ["casy-study.html", "CasyStudySection.tsx", "CasyStudySection"],
  ["pricing.html", "PricingSection.tsx", "PricingSection"],
  ["faq.html", "FaqSection.tsx", "FaqSection"],
  ["blog.html", "BlogSection.tsx", "BlogSection"],
  ["nav.html", "NavSection.tsx", "NavSection"],
]

const only = process.argv[2]
for (const [src, out, name] of MAP) {
  if (only && !src.includes(only) && !out.includes(only)) continue
  const html = fs.readFileSync(path.join(SECTIONS_DIR, src), "utf8")
  const tsx = htmlToComponent(html, name)
  const outPath = path.join(OUT_DIR, out)
  fs.writeFileSync(outPath, tsx, "utf8")
  console.log("wrote", out, `(${tsx.length} chars)`)
}
