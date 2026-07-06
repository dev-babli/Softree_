/**
 * Hero + loader visual score tally — local vs Kore reference.
 * Usage: node scripts/hero-visual-score.mjs
 */
import fs from "node:fs"
import path from "node:path"
import puppeteer from "puppeteer"

const OUT_DIR = path.resolve(".planning/page-forge/kore-ai-exact")
const LOCAL_URL = process.env.CLONE_LOCAL_URL || process.env.HANDOFF_URL || "http://localhost:3001/kore-ai-component?replay-loader=1"
const REF_URL = "https://www.kore.ai/ai-agent-platform"
const VIEWPORT = { width: 1536, height: 960 }

const WEIGHTS = {
  loader_dom: 0.12,
  loader_motion: 0.13,
  pill: 0.1,
  flip_heading: 0.15,
  h1: 0.15,
  sub: 0.1,
  body: 0.1,
  cta: 0.08,
  layout: 0.07,
}

function scoreTextMatch(local, ref) {
  if (!local || !ref) return 0
  const a = local.replace(/\s+/g, " ").trim()
  const b = ref.replace(/\s+/g, " ").trim()
  if (a === b) return 10
  if (a.toLowerCase() === b.toLowerCase()) return 8
  const overlap = a.length / Math.max(b.length, 1)
  return Math.max(0, Math.min(7, Math.round(overlap * 10)))
}

function scoreStyleMatch(local, ref) {
  if (!local || !ref) return 0
  const keys = ["fontSize", "lineHeight", "letterSpacing", "fontWeight", "color", "fontStyle"]
  let hits = 0
  for (const key of keys) {
    if (local[key] === ref[key]) hits++
  }
  return Math.round((hits / keys.length) * 10 * 10) / 10
}

function scoreRectMatch(local, ref, tolerance = 24) {
  if (!local || !ref) return 0
  const dTop = Math.abs(local.top - ref.top)
  const dLeft = Math.abs(local.left - ref.left)
  const dW = Math.abs(local.width - ref.width)
  const dH = Math.abs(local.height - ref.height)
  const avg = (dTop + dLeft + dW + dH) / 4
  if (avg <= tolerance) return 10
  if (avg <= tolerance * 2) return 8
  if (avg <= tolerance * 4) return 6
  if (avg <= tolerance * 8) return 4
  return 2
}

async function extractHero(page) {
  return page.evaluate(() => {
    const hero = document.querySelector("#meet-artemis")
    if (!hero) return null

    const pick = (sel) => {
      const el = hero.querySelector(sel)
      if (!el) return null
      const s = getComputedStyle(el)
      const r = el.getBoundingClientRect()
      return {
        text: el.textContent?.replace(/\s+/g, " ").trim() ?? "",
        style: {
          fontSize: s.fontSize,
          lineHeight: s.lineHeight,
          letterSpacing: s.letterSpacing,
          fontWeight: s.fontWeight,
          color: s.color,
          fontStyle: s.fontStyle,
        },
        rect: { top: r.top, left: r.left, width: r.width, height: r.height },
        visible: s.visibility !== "hidden" && s.opacity !== "0" && r.width > 0,
      }
    }

    const loader = document.querySelector(".k2-loader")
    return {
      loader: loader
        ? {
            present: true,
            className: loader.className,
            text: loader.querySelector("[data-flip]")?.textContent?.replace(/\s+/g, " ").trim() ?? "",
            display: getComputedStyle(loader).display,
            zIndex: getComputedStyle(loader).zIndex,
          }
        : { present: false },
      pill: pick(".k2-container-hero > .k2-hero > .k2-text"),
      flip: pick('[data-flip-target="loader"]'),
      h1: pick("h1"),
      sub: pick(".k2-container-hero em"),
      body: pick(".k2-container-hero-2 .k2-text"),
      cta: pick(".k2-cta-text"),
      ctaHref: hero.querySelector(".k2-action")?.getAttribute("href") ?? "",
    }
  })
}

async function capture(page, url, opts = {}) {
  await page.setViewport(VIEWPORT)
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 90000 })

  let loaderSnapshot = { present: false }

  if (opts.waitForLoader) {
    await page.waitForSelector(".k2-loader", { timeout: 20000 }).catch(() => {})
    loaderSnapshot = await page.evaluate(() => {
      const loader = document.querySelector(".k2-loader")
      if (!loader) return { present: false }
      return {
        present: true,
        className: loader.className,
        text: loader.querySelector("[data-flip]")?.textContent?.replace(/\s+/g, " ").trim() ?? "",
        display: getComputedStyle(loader).display,
        zIndex: getComputedStyle(loader).zIndex,
      }
    })
    await new Promise((r) => setTimeout(r, 1200))
    if (opts.loaderShot && loaderSnapshot.present) {
      try {
        await page.screenshot({ path: path.join(OUT_DIR, opts.loaderShot), type: "png" })
      } catch (err) {
        console.warn("Loader screenshot failed:", err.message)
      }
    }
    await page.waitForFunction(() => !document.querySelector(".k2-loader"), { timeout: 30000 }).catch(() => {})
    await new Promise((r) => setTimeout(r, 1500))
  } else {
    await new Promise((r) => setTimeout(r, 2000))
  }

  if (opts.heroShot) {
    try {
      await page.screenshot({ path: path.join(OUT_DIR, opts.heroShot), type: "png" })
    } catch (err) {
      console.warn("Hero screenshot failed:", err.message)
    }
  }

  const hero = await extractHero(page).catch((err) => {
    console.warn("Hero extract failed:", err.message)
    return null
  })
  return { hero, loader: loaderSnapshot }
}

function weightedTotal(scores) {
  let sum = 0
  for (const [key, weight] of Object.entries(WEIGHTS)) {
    sum += (scores[key] ?? 0) * weight
  }
  return Math.round(sum * 100) / 100
}

function tallyMarkdown({ local, ref, scores, total, loaderLocal, loaderRef }) {
  const rows = Object.entries(scores)
    .map(([k, v]) => `| ${k.replaceAll("_", " ")} | ${(WEIGHTS[k] * 100).toFixed(0)}% | ${v}/10 |`)
    .join("\n")

  return `# Hero + Loader score tally (automated)

**Generated:** ${new Date().toISOString()}  
**Local:** ${LOCAL_URL}  
**Reference:** ${REF_URL}  
**Viewport:** ${VIEWPORT.width}×${VIEWPORT.height}

## Screenshots

| | Local | Reference |
| --- | --- | --- |
| Loader (~900ms) | \`diff-loader-1536-local-score.png\` | \`diff-loader-1536-ref-score.png\` |
| Hero (post-loader) | \`diff-hero-1536-local-score.png\` | \`diff-hero-1536-ref-score.png\` |

## Overall weighted score

| Metric | Score |
| --- | ---: |
| **Local vs reference parity** | **${total}/10** |
| Pass threshold (loop gate) | ≥ 8.5 |
| Verdict | ${total >= 8.5 ? "PASS" : total >= 7 ? "CONDITIONAL" : "FAIL"} |

## Criterion tally

| Criterion | Weight | Score /10 |
| --- | ---: | ---: |
${rows}

## Side-by-side field comparison

| Field | Reference | Local | Text | Style | Layout |
| --- | --- | --- | ---: | ---: | ---: |
| Pill | ${ref.pill?.text?.slice(0, 40) ?? "—"} | ${local.pill?.text?.slice(0, 40) ?? "—"} | ${scoreTextMatch(local.pill?.text, ref.pill?.text)}/10 | ${scoreStyleMatch(local.pill?.style, ref.pill?.style)}/10 | ${scoreRectMatch(local.pill?.rect, ref.pill?.rect)}/10 |
| Flip heading | ${ref.flip?.text?.slice(0, 40) ?? "—"} | ${local.flip?.text?.slice(0, 40) ?? "—"} | ${scoreTextMatch(local.flip?.text, ref.flip?.text)}/10 | ${scoreStyleMatch(local.flip?.style, ref.flip?.style)}/10 | ${scoreRectMatch(local.flip?.rect, ref.flip?.rect)}/10 |
| H1 | ${ref.h1?.text?.slice(0, 50) ?? "—"} | ${local.h1?.text?.slice(0, 50) ?? "—"} | ${scoreTextMatch(local.h1?.text, ref.h1?.text)}/10 | ${scoreStyleMatch(local.h1?.style, ref.h1?.style)}/10 | ${scoreRectMatch(local.h1?.rect, ref.h1?.rect)}/10 |
| Sub | ${ref.sub?.text?.slice(0, 50) ?? "—"} | ${local.sub?.text?.slice(0, 50) ?? "—"} | ${scoreTextMatch(local.sub?.text, ref.sub?.text)}/10 | ${scoreStyleMatch(local.sub?.style, ref.sub?.style)}/10 | ${scoreRectMatch(local.sub?.rect, ref.sub?.rect)}/10 |
| Body | ${ref.body?.text?.slice(0, 50) ?? "…"} | ${local.body?.text?.slice(0, 50) ?? "…"} | ${scoreTextMatch(local.body?.text, ref.body?.text)}/10 | ${scoreStyleMatch(local.body?.style, ref.body?.style)}/10 | — |
| CTA | ${ref.cta?.text ?? "—"} | ${local.cta?.text ?? "—"} | ${scoreTextMatch(local.cta?.text, ref.cta?.text)}/10 | ${scoreStyleMatch(local.cta?.style, ref.cta?.style)}/10 | — |

## Loader audit

| Check | Reference | Local |
| --- | --- | --- |
| Present during intro | ${loaderRef.present ? "yes" : "no"} | ${loaderLocal.present ? "yes" : "no"} |
| Copy | ${loaderRef.text || "—"} | ${loaderLocal.text || "—"} |
| Display | ${loaderRef.display || "—"} | ${loaderLocal.display || "—"} |
| z-index | ${loaderRef.zIndex || "—"} | ${loaderLocal.zIndex || "—"} |

## P0 gaps (auto)

${total < 8.5 ? "- Weighted score below 8.5 gate — see criterion rows under 8.0" : "- None from automated tally"}

## How to replay loader locally

\`http://localhost:3000/kore-ai-component?replay-loader=1\`
`
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true })
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: VIEWPORT,
    protocolTimeout: 120000,
  })

  try {
    const refPage = await browser.newPage()
    await refPage.evaluateOnNewDocument(() => localStorage.removeItem("k2LoaderPlayedAt"))
    const ref = await capture(refPage, REF_URL, {
      waitForLoader: true,
      loaderShot: "diff-loader-1536-ref-score.png",
      heroShot: "diff-hero-1536-ref-score.png",
    })

    const localPage = await browser.newPage()
    await localPage.evaluateOnNewDocument(() => localStorage.removeItem("k2LoaderPlayedAt"))
    const local = await capture(localPage, LOCAL_URL, {
      waitForLoader: true,
      loaderShot: "diff-loader-1536-local-score.png",
      heroShot: "diff-hero-1536-local-score.png",
    })

    const refHero = ref.hero ?? {}
    const localHero = local.hero ?? {}

    const scores = {
      loader_dom:
        local.loader.present && ref.loader.present
          ? scoreTextMatch(local.loader.text, ref.loader.text)
          : 0,
      loader_motion:
        local.loader.present && ref.loader.present
          ? local.loader.text === ref.loader.text
            ? 9
            : 7
          : local.loader.present || ref.loader.present
            ? 5
            : 0,
      pill:
        (scoreTextMatch(localHero.pill?.text, refHero.pill?.text) +
          scoreStyleMatch(localHero.pill?.style, refHero.pill?.style)) /
        2,
      flip_heading:
        (scoreTextMatch(localHero.flip?.text, refHero.flip?.text) +
          scoreStyleMatch(localHero.flip?.style, refHero.flip?.style) +
          scoreRectMatch(localHero.flip?.rect, refHero.flip?.rect)) /
        3,
      h1:
        (scoreTextMatch(localHero.h1?.text, refHero.h1?.text) +
          scoreStyleMatch(localHero.h1?.style, refHero.h1?.style) +
          scoreRectMatch(localHero.h1?.rect, refHero.h1?.rect)) /
        3,
      sub:
        (scoreTextMatch(localHero.sub?.text, refHero.sub?.text) +
          scoreStyleMatch(localHero.sub?.style, refHero.sub?.style)) /
        2,
      body:
        (scoreTextMatch(localHero.body?.text, refHero.body?.text) +
          scoreStyleMatch(localHero.body?.style, refHero.body?.style)) /
        2,
      cta:
        (scoreTextMatch(localHero.cta?.text, refHero.cta?.text) +
          scoreStyleMatch(localHero.cta?.style, refHero.cta?.style)) /
        2,
      layout:
        (scoreRectMatch(localHero.pill?.rect, refHero.pill?.rect) +
          scoreRectMatch(localHero.flip?.rect, refHero.flip?.rect) +
          scoreRectMatch(localHero.h1?.rect, refHero.h1?.rect)) /
        3,
    }

    for (const key of Object.keys(scores)) {
      scores[key] = Math.round(scores[key] * 10) / 10
    }

    const total = weightedTotal(scores)
    const md = tallyMarkdown({
      local: localHero,
      ref: refHero,
      scores,
      total,
      loaderLocal: local.loader,
      loaderRef: ref.loader,
    })

    const outPath = path.join(OUT_DIR, "12-HERO-SCORE-TALLY.md")
    fs.writeFileSync(outPath, md)
    console.log("Wrote", outPath)
    console.log("Weighted score:", total, "/10")
    console.log(JSON.stringify(scores, null, 2))
  } finally {
    await browser.close()
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
