/**
 * Generate MenuPanel from extracted menu-open-cqh.html
 */
import fs from "node:fs"
import path from "node:path"
import { parse } from "node-html-parser"

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
  srcset: "srcSet",
  autoplay: "autoPlay",
  playsinline: "playsInline",
  autocomplete: "autoComplete",
  charset: "charSet",
}
const BOOL = new Set([
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
  "readOnly",
  "autoFocus",
  "hidden",
  "draggable",
])

function camel(n) {
  if (n.startsWith("--")) return n
  return n.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
}

function parseStyle(s) {
  if (!s?.trim()) return null
  const e = []
  for (const p of s.split(";")) {
    const t = p.trim()
    if (!t) continue
    const i = t.indexOf(":")
    if (i < 0) continue
    const k = camel(t.slice(0, i).trim())
    let v = t.slice(i + 1).trim()
    if (
      (v.startsWith('"') && v.endsWith('"')) ||
      (v.startsWith("'") && v.endsWith("'"))
    ) {
      v = v.slice(1, -1)
    }
    e.push([k, v])
  }
  return e.length ? e : null
}

function styleJsx(e) {
  return (
    "{{ " +
    e
      .map(([k, v]) => (k.startsWith("--") ? `["${k}"]` : k) + ": " + JSON.stringify(v))
      .join(", ") +
    " }}"
  )
}

function esc(t) {
  return t
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
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
    if (/^\s+$/.test(t)) {
      if (t.includes("\n") && !t.trim()) return ""
      return pad + `{" "}\n`
    }
    return pad + esc(t) + "\n"
  }
  if (node.nodeType !== 1) return ""
  const tag = node.rawTagName?.toLowerCase()
  if (!tag || tag === "script" || tag === "style") return ""
  const attrs = []
  for (const [rn, rv] of Object.entries(node.attributes || {})) {
    if (rn === "as" || rn === "corner-shape") continue
    if (rn === "style") {
      const e = parseStyle(rv)
      if (e) attrs.push("style=" + styleJsx(e))
      continue
    }
    let jn =
      ATTR_MAP[rn.toLowerCase()] ||
      (rn.startsWith("aria-") || rn.startsWith("data-")
        ? rn.toLowerCase()
        : rn.replace(/-([a-z])/g, (_, c) => c.toUpperCase()))
    if (BOOL.has(jn)) {
      if (rv === "" || rv === jn || rv === "true") attrs.push(jn)
      else if (rv === "false") attrs.push(jn + "={false}")
      else attrs.push(jn + "={" + JSON.stringify(rv) + "}")
      continue
    }
    if ((jn === "width" || jn === "height") && /^\d+$/.test(rv)) {
      attrs.push(jn + "={" + rv + "}")
      continue
    }
    if (jn === "tabIndex") {
      attrs.push(jn + "={" + (rv === "-1" ? "-1" : "0") + "}")
      continue
    }
    // rewrite internal routes to page anchors
    if (jn === "href") {
      const map = {
        "./": "#home-hero",
        "./portfolio": "#home-portfolio",
        "./about": "#home-about",
        "./contact": "#home-contact",
        "./blog": "#home-blog",
        "./404": "#home-hero",
      }
      const mapped = map[rv] || rv
      attrs.push(jn + "=" + JSON.stringify(mapped))
      continue
    }
    attrs.push(
      jn +
        "=" +
        JSON.stringify(String(rv).replace(/&amp;amp;/g, "&amp;").replace(/&amp;/g, "&")),
    )
  }
  const a = attrs.length ? " " + attrs.join(" ") : ""
  if (VOID.has(tag)) return pad + "<" + tag + a + " />\n"
  let kids = ""
  for (const c of node.childNodes || []) kids += nodeToJsx(c, indent + 1)
  if (!kids.trim()) return pad + "<" + tag + a + " />\n"
  return pad + "<" + tag + a + ">\n" + kids + pad + "</" + tag + ">\n"
}

const htmlPath = path.resolve(
  "src/components/client-exact/_extracted/sections/menu-open-cqh.html",
)
let html = fs.readFileSync(htmlPath, "utf8").replace(/&amp;amp;/g, "&amp;")
const root = parse(html, { comment: false })
const el = root.childNodes.find((n) => n.nodeType === 1)
// Prefer inner .framer-rFApl if present, else whole cqh container
const panel =
  el?.querySelector?.(".framer-rFApl") ||
  el?.childNodes?.find?.((n) => n.nodeType === 1) ||
  el

const body = nodeToJsx(panel, 3).trimEnd()
const tsx = `"use client"

/**
 * Exact Hanza open-menu panel (framer-rFApl Desktop).
 * Left: nav + profile. Right: project image cards.
 */
export function MenuPanel({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div
      className="framer-3L5GK framer-cqh11d-container cx-menu-panel"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      onClick={(e) => e.stopPropagation()}
    >
${body}
    </div>
  )
}
`
const out = path.resolve("src/components/client-exact/sections/MenuPanel.tsx")
fs.writeFileSync(out, tsx)
console.log("wrote", out, tsx.length)
