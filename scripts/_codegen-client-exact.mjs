import fs from "node:fs"
import path from "node:path"

const root = process.cwd()
const extracted = path.join(root, "src/components/client-exact/_extracted")
const sectionsDir = path.join(extracted, "sections")
const outDir = path.join(root, "src/components/client-exact")
const genDir = path.join(outDir, "sections")
fs.mkdirSync(genDir, { recursive: true })

const manifest = JSON.parse(fs.readFileSync(path.join(extracted, "sections-manifest.json"), "utf8"))

function toComponentName(slug) {
  return (
    slug
      .split("-")
      .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
      .join("") + "Section"
  )
}

function escapeForTemplate(html) {
  // Use JSON.stringify so the HTML is a safe JS string literal
  return JSON.stringify(html)
}

const imports = []
const mounts = []

for (const item of manifest) {
  if (item.slug === "nav") continue // skip nav per prior preference unless needed for look — include it, user wants exact page
  const html = fs.readFileSync(path.join(sectionsDir, item.file), "utf8")
  const comp = toComponentName(item.slug)
  const fileBase = `${comp}.tsx`
  const content = `"use client"

/** Exact Framer markup from Softree_/client.html — ${item.name} */
const HTML = ${escapeForTemplate(html)}

export function ${comp}() {
  return <div className="cx-framer-section" dangerouslySetInnerHTML={{ __html: HTML }} />
}
`
  fs.writeFileSync(path.join(genDir, fileBase), content)
  imports.push(`import { ${comp} } from "./sections/${comp}"`)
  mounts.push(`        <${comp} />`)
  console.log("wrote", fileBase, html.length)
}

// Also write Nav
const navItem = manifest.find((m) => m.slug === "nav")
if (navItem) {
  const html = fs.readFileSync(path.join(sectionsDir, navItem.file), "utf8")
  const content = `"use client"

const HTML = ${escapeForTemplate(html)}

export function NavSection() {
  return <div className="cx-framer-section" dangerouslySetInnerHTML={{ __html: HTML }} />
}
`
  fs.writeFileSync(path.join(genDir, "NavSection.tsx"), content)
  imports.push(`import { NavSection } from "./sections/NavSection"`)
  mounts.push(`        <NavSection />`)
}

// Copy CSS into importable file (may be large)
const css = fs.readFileSync(path.join(extracted, "framer-ssr.css"), "utf8")
const cssOut = path.join(outDir, "framer-ssr.css")
fs.writeFileSync(cssOut, css)
console.log("css", css.length)

// Extract appear animation JSON + animator script from original HTML
const source = fs.readFileSync(path.join(root, "Softree_/client.html"), "utf8")
const appearMatch = source.match(
  /<script type="framer\/appear" id="__framer__appearAnimationsContent">([\s\S]*?)<\/script>/,
)
const breakpointsMatch = source.match(
  /<script type="framer\/appear" id="__framer__breakpoints">([\s\S]*?)<\/script>/,
)
const animatorMatch = source.match(/<script>var animator=\(\(\)=>\{[\s\S]*?<\/script>/)
const appearRunnerMatch = source.match(
  /<script data-framer-appear-animation="no-preference">([\s\S]*?)<\/script>/,
)

const runtimeDir = path.join(outDir, "runtime")
fs.mkdirSync(runtimeDir, { recursive: true })
if (appearMatch) fs.writeFileSync(path.join(runtimeDir, "appear-content.json"), appearMatch[1])
if (breakpointsMatch) fs.writeFileSync(path.join(runtimeDir, "breakpoints.json"), breakpointsMatch[1])
if (animatorMatch) {
  // strip <script> tags
  const code = animatorMatch[0].replace(/^<script>/, "").replace(/<\/script>$/, "")
  fs.writeFileSync(path.join(runtimeDir, "animator.js"), code)
}
if (appearRunnerMatch) {
  fs.writeFileSync(path.join(runtimeDir, "appear-runner.js"), appearRunnerMatch[1])
}

const page = `"use client"

import { useEffect } from "react"
import "./framer-ssr.css"
import "./client-exact-overrides.css"
${imports.join("\n")}
import { bootFramerAppear } from "./bootFramerAppear"

/**
 * Exact visual clone of Softree_/client.html (Framer Hanza).
 * Each section is a React component wrapping the verbatim Framer SSR markup
 * + the original Framer SSR CSS. Appear animations boot via the reference animator.
 */
export default function ClientExactPage() {
  useEffect(() => {
    const cleanup = bootFramerAppear()
    return cleanup
  }, [])

  return (
    <div className="client-exact-framer-shell">
      <div id="main" className="client-exact-main">
        <div
          data-framer-root=""
          className="framer-7JiRT framer-J0UB8 framer-0fB9Y framer-ic7tY framer-BfFRM framer-Y9G5g framer-7Z0zH framer-pL0Rf framer-OwmSi framer-PXhJw framer-72rtr7"
          style={{ minHeight: "100vh", width: "auto", display: "contents" }}
        >
${mounts.join("\n")}
        </div>
      </div>
    </div>
  )
}
`

fs.writeFileSync(path.join(outDir, "ClientExactPage.tsx"), page)
console.log("wrote ClientExactPage.tsx")
