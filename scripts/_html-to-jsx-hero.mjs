import fs from "node:fs"
import path from "node:path"
import { parseDocument } from "htmlparser2"
import { DomUtils } from "htmlparser2"
import render from "dom-serializer"

// Prefer a simple regex/transform approach without new deps if htmlparser2 isn't available
const html = fs.readFileSync(
  path.join(process.cwd(), "src/components/client-exact/_extracted/sections/hero.html"),
  "utf8",
)

function cssStyleToObject(styleStr) {
  if (!styleStr || !styleStr.trim()) return null
  const obj = {}
  // split on ; but not inside quotes/parens carefully enough for Framer
  const parts = styleStr.split(";")
  for (const part of parts) {
    const idx = part.indexOf(":")
    if (idx < 0) continue
    let prop = part.slice(0, idx).trim()
    let val = part.slice(idx + 1).trim()
    if (!prop || !val) continue
    // keep CSS variables as-is
    if (prop.startsWith("--")) {
      obj[prop] = val
      continue
    }
    // camelCase
    const camel = prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
    obj[camel] = val
  }
  return obj
}

function attrToJsx(name, value) {
  if (name === "class") return ["className", value]
  if (name === "for") return ["htmlFor", value]
  if (name === "tabindex") return ["tabIndex", value]
  if (name === "readonly") return ["readOnly", value === "" || value === "true" || value === name]
  if (name === "playsinline") return ["playsInline", true]
  if (name === "autoplay") return ["autoPlay", true]
  if (name === "loop") return ["loop", true]
  if (name === "muted") return ["muted", true]
  if (name === "controls") return ["controls", true]
  if (name === "srcset") return ["srcSet", value]
  if (name === "charset") return ["charSet", value]
  if (name === "autocomplete") return ["autoComplete", value]
  if (name === "crossorigin") return ["crossOrigin", value]
  if (name === "style") {
    const obj = cssStyleToObject(value)
    return ["style", obj]
  }
  // data-* and aria-* stay
  if (name.startsWith("data-") || name.startsWith("aria-")) return [name, value]
  // boolean-ish empty
  if (value === "" || value === name) return [name, true]
  return [name, value]
}

function escapeJsxText(t) {
  return t.replace(/\{/g, "&#123;").replace(/\}/g, "&#125;")
}

function nodeToJsx(node, indent = 0) {
  const pad = "  ".repeat(indent)
  if (node.type === "text") {
    const t = node.data
    if (!t || !t.trim()) return t.includes("\n") ? "\n" : ""
    return `${pad}${escapeJsxText(t)}`
  }
  if (node.type === "comment") return ""
  if (node.type !== "tag") return ""

  const tag = node.name
  const voidTags = new Set(["img", "br", "hr", "input", "meta", "link", "source", "area", "col", "embed", "wbr"])
  const attrs = []
  for (const [k, v] of Object.entries(node.attribs || {})) {
    const [jk, jv] = attrToJsx(k, v)
    if (jk === "style" && jv && typeof jv === "object") {
      const entries = Object.entries(jv)
        .map(([pk, pv]) => {
          const key = pk.startsWith("--") ? `"${pk}"` : pk
          return `${key}: ${JSON.stringify(pv)}`
        })
        .join(", ")
      attrs.push(`style={{ ${entries} }}`)
    } else if (jv === true) {
      attrs.push(jk)
    } else if (typeof jv === "boolean") {
      attrs.push(`${jk}={${jv}}`)
    } else {
      attrs.push(`${jk}=${JSON.stringify(jv)}`)
    }
  }
  const attrStr = attrs.length ? " " + attrs.join(" ") : ""
  const children = node.children || []

  if (voidTags.has(tag)) {
    return `${pad}<${tag}${attrStr} />`
  }

  if (children.length === 0) {
    return `${pad}<${tag}${attrStr}></${tag}>`
  }

  // single text child — keep inline
  if (children.length === 1 && children[0].type === "text") {
    const t = children[0].data
    return `${pad}<${tag}${attrStr}>${escapeJsxText(t)}</${tag}>`
  }

  const inner = children.map((c) => nodeToJsx(c, indent + 1)).filter((s) => s && s.trim()).join("\n")
  return `${pad}<${tag}${attrStr}>\n${inner}\n${pad}</${tag}>`
}

async function main() {
  let parseDocument, DomHandler
  try {
    ;({ parseDocument } = await import("htmlparser2"))
  } catch {
    console.error("htmlparser2 missing — install or use fallback")
    process.exit(1)
  }

  const doc = parseDocument(html, { decodeEntities: true })
  const root = doc.children.find((c) => c.type === "tag")
  const jsx = nodeToJsx(root, 2)

  const out = `"use client"

import { hero } from "../content"

/**
 * REAL React JSX — Framer classes preserved for exact look.
 * Copy comes from content.ts (editable).
 * NO dangerouslySetInnerHTML.
 */
export function HeroSection() {
  return (
${jsx}
  )
}
`

  // Now replace hardcoded text with content refs via a second pass on known strings
  let final = out
  final = final.replace(
    />I help founders and growing brands <\/span>turn their ideas into refined websites\.</,
    `>{hero.headlineLead} </span>{hero.headlineRest}.<`,
  )
  // fix if structure different
  final = final.replace(
    `I help founders and growing brands `,
    `{hero.headlineLead} `,
  )
  final = final.replace(
    `turn their ideas into refined websites.`,
    `{hero.headlineRest}`,
  )
  final = final.replace(`>Web Design<`, `>{hero.services[0]}<`)
  final = final.replace(`>Website Development<`, `>{hero.services[1]}<`)
  final = final.replace(`>Motion<`, `>{hero.services[2]}<`)
  final = final.replace(`>4.92<`, `>{hero.rating}<`)
  final = final.replace(`Trusted by `, `{hero.trustLead}`)
  final = final.replace(`122+ Founders`, `{hero.trustRest}`)
  final = final.replace(`alt="Logo"`, `alt={hero.logoAlt}`)
  final = final.replace(
    `src="https://framerusercontent.com/images/2GMXWWbIueByg8aHy0ppmBuIo5k.webp?width=1901&height=400"`,
    `src={hero.logoSrc}`,
  )
  // video
  final = final.replace(
    `src="https://framerusercontent.com/assets/q7kP8jHypD3vormI50Hujnug0es.mp4"`,
    `src={hero.videoSrc}`,
  )

  fs.writeFileSync(
    path.join(process.cwd(), "src/components/client-exact/sections/HeroSection.tsx"),
    final,
  )
  console.log("wrote HeroSection.tsx", final.length)
}

main()
