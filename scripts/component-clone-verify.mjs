/**
 * Component-by-component clone verification vs Kore reference.
 * Usage: node scripts/component-clone-verify.mjs <componentId> [loopNumber]
 */
import fs from "node:fs"
import path from "node:path"
import puppeteer from "puppeteer"

const componentId = process.argv[2] || "loader-hero"
const loop = Number(process.argv[3] || 1)
const BASE = path.resolve(".planning/page-forge/kore-ai-exact")
const OUT = path.join(BASE, "components", componentId, `loop-${loop}`)
const LOCAL_BASE = process.env.CLONE_LOCAL_URL || "http://localhost:3000/kore-ai-component"
const REF_URL = "https://www.kore.ai/ai-agent-platform"
const VIEWPORTS = [
  { name: "1536", width: 1536, height: 960 },
  { name: "390", width: 390, height: 844 },
]

const COMPONENTS = {
  "loader-hero": {
    name: "Loader + Hero",
    selector: "#meet-artemis",
    localUrl: `${LOCAL_BASE}?replay-loader=1`,
    waitMs: 11000,
    waitFor: () =>
      document.querySelector(".kore-ai-exact-shell")?.classList.contains("kore-ai-intro-complete"),
    probes: [
      { id: "pill", sel: ".k2-container-hero > .k2-hero > .k2-text" },
      { id: "flip", sel: '[data-flip-target="loader"]' },
      { id: "h1", sel: "h1" },
      { id: "sub", sel: ".k2-container-hero em" },
      { id: "body", sel: ".k2-container-hero-2 .k2-text" },
      { id: "cta", sel: ".k2-cta-text" },
    ],
  },
  "enterprise-outcomes": {
    name: "Enterprise Outcomes",
    selector: "#enterprise-ai-outcomes",
    scroll: true,
    resetScrollProgress: true,
    probes: [
      { id: "header", sel: ".k2-cards-header h2" },
      { id: "card1", sel: ".k2-card-item:nth-child(1) h3" },
      { id: "card2", sel: ".k2-card-item:nth-child(2) h3" },
      { id: "footer", sel: ".k2-cards-footer p" },
    ],
  },
  "ai-agents": {
    name: "AI Agents",
    selector: "#ai-agents",
    scroll: true,
    probes: [
      { id: "tab1", sel: "#tabs-2-tab-1-panel h2" },
      { id: "tab1body", sel: "#tabs-2-tab-1-panel .k2-agents-content p" },
      { id: "tab2", sel: "#tabs-2-tab-2-panel h2" },
    ],
  },
  "ai-programmable": {
    name: "AI Programmable",
    selector: "#ai-programmable",
    scroll: true,
    probes: [{ id: "orbit", sel: ".k2-orbit" }],
  },
  pillars: {
    name: "Pillars",
    selector: "#pillars",
    scroll: true,
    probes: [{ id: "heading", sel: ".k2-heading h2" }],
  },
  "build-scale-optimize": {
    name: "Build Scale Optimize",
    selector: "#build-scale-optimize",
    scroll: true,
    probes: [{ id: "heading", sel: ".k2-heading h2" }],
  },
  "demo-video": {
    name: "Demo Video",
    selector: ".k2-demo-video",
    scroll: true,
    probes: [
      { id: "iframe", sel: "#vimeo-player" },
      { id: "play", sel: "#custom-play" },
    ],
  },
  "scroll-tabs": {
    name: "Scroll Tabs",
    selector: ".k2-section-scroll-tabs",
    scroll: true,
    probes: [{ id: "heading", sel: ".k2-heading h3" }],
  },
  "get-started": {
    name: "Get Started",
    selector: "#get-started",
    scroll: true,
    probes: [{ id: "panel", sel: ".k2-prefooter-panel" }],
  },
  "shell-header": {
    name: "Header",
    selector: ".k2-header",
    probes: [{ id: "logo", sel: ".k2-logo-link" }],
  },
  "shell-footer": {
    name: "Footer",
    selector: ".k2-footer",
    scroll: true,
    probes: [{ id: "logo", sel: ".k2-footer-logo" }],
  },
  modals: {
    name: "Modals",
    selector: ".k2-modal",
    openModal: true,
    probes: [{ id: "abl", sel: '[data-modal-panel="abl"] .k2-eyebrow' }],
  },
}

const gates = []

function pass(id, detail) {
  gates.push({ id, pass: true, detail })
  console.log(`PASS ${id}: ${detail}`)
}

function fail(id, detail) {
  gates.push({ id, pass: false, detail })
  console.log(`FAIL ${id}: ${detail}`)
}

function normalizeCopy(text = "") {
  return text.replace(/\s+/g, " ").trim()
}

function scoreStyle(local, ref) {
  if (!local || !ref) return 0
  const keys = ["fontSize", "lineHeight", "letterSpacing", "fontWeight", "color", "fontStyle"]
  let hits = 0
  for (const key of keys) {
    if (local[key] === ref[key]) hits++
  }
  return Math.round((hits / keys.length) * 100) / 10
}

function scoreRect(local, ref, tol = 4) {
  if (!local || !ref) return 0
  const avg =
    (Math.abs(local.top - ref.top) +
      Math.abs(local.left - ref.left) +
      Math.abs(local.width - ref.width) +
      Math.abs(local.height - ref.height)) /
    4
  if (avg <= tol) return 10
  if (avg <= tol * 2) return 8
  if (avg <= tol * 4) return 6
  return 4
}

async function extractProbes(page, cfg) {
  return page.evaluate(
    (selector, probes) => {
      const root = document.querySelector(selector)
      if (!root) return { ok: false, probes: {} }
      const rootRect = root.getBoundingClientRect()
      const read = (sel) => {
        const el = root.querySelector(sel)
        if (!el) return null
        const s = getComputedStyle(el)
        const r = el.getBoundingClientRect()
        return {
          text: el.innerText?.replace(/\s+/g, " ").trim() ?? "",
          style: {
            fontSize: s.fontSize,
            lineHeight: s.lineHeight,
            letterSpacing: s.letterSpacing,
            fontWeight: s.fontWeight,
            color: s.color,
            fontStyle: s.fontStyle,
          },
          rect: {
            top: r.top - rootRect.top,
            left: r.left - rootRect.left,
            width: r.width,
            height: r.height,
          },
        }
      }
      const out = {}
      for (const p of probes) out[p.id] = read(p.sel)
      return { ok: true, probes: out }
    },
    cfg.selector,
    cfg.probes || [],
  )
}

async function gotoPage(page, url, cfg) {
  if (componentId === "loader-hero") {
    await page.evaluateOnNewDocument(() => localStorage.removeItem("k2LoaderPlayedAt"))
  }
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 90000 })
  if (cfg.waitFor) {
    await page.waitForFunction(cfg.waitFor, { timeout: cfg.waitMs || 15000 }).catch(() => {})
  } else if (cfg.waitMs) {
    await new Promise((r) => setTimeout(r, cfg.waitMs))
  }
  if (cfg.scroll) {
    await page.evaluate((sel, resetProgress) => {
      const target =
        document.querySelector(sel) ||
        document.querySelector(`${sel} .k2-demo-video`) ||
        document.querySelector(".k2-demo-video")
      if (!target) return

      const section = target.closest(".k2-section") || target
      section.querySelectorAll?.("[data-scroll], [data-stagger]").forEach((el) => {
        el.classList.add("on")
        el.style.removeProperty("opacity")
        el.style.removeProperty("transform")
        el.style.removeProperty("visibility")
      })

      const wrapper = section.querySelector?.(".k2-cards-wrapper")
      if (resetProgress && wrapper) {
        wrapper.style.setProperty("--p", "0")
        const targetTop = window.innerHeight * 0.75
        const currentTop = section.getBoundingClientRect().top
        window.scrollBy(0, currentTop - targetTop)
        return
      }
      const top = window.scrollY + section.getBoundingClientRect().top
      window.scrollTo({ top: Math.max(0, top - 80), behavior: "instant" })
    }, cfg.selector, Boolean(cfg.resetScrollProgress))
    await new Promise((r) => setTimeout(r, 800))
  }
}

async function screenshotSection(page, cfg, file) {
  if (componentId !== "modals") {
    await page.evaluate(() => window.scrollTo(0, 0))
    await new Promise((r) => setTimeout(r, 150))
  }

  if (cfg.openModal) {
    await page.evaluate(() => {
      const modal = document.querySelector(".k2-modal")
      if (!modal) return
      modal.querySelectorAll("[data-modal-panel]").forEach((panel) => {
        panel.hidden = panel.getAttribute("data-modal-panel") !== "abl"
      })
      modal.querySelectorAll("[data-stagger], [data-modal-panel], .k2-modal-item").forEach((el) => {
        el.classList.add("on")
        el.style.removeProperty("opacity")
        el.style.removeProperty("transform")
        el.style.removeProperty("visibility")
      })
      if (!modal.open) modal.showModal()
    })
    await new Promise((r) => setTimeout(r, 400))
  }

  if (componentId === "loader-hero") {
    await page.screenshot({
      path: path.join(OUT, file),
      clip: { x: 0, y: 0, width: VIEWPORTS[0].width, height: VIEWPORTS[0].height },
    })
    return
  }

  if (cfg.openModal) {
    await page.screenshot({ path: path.join(OUT, file), fullPage: false })
    return
  }

  const el = await page.$(cfg.selector)
  if (el) {
    try {
      await el.screenshot({ path: path.join(OUT, file) })
    } catch {
      await page.screenshot({ path: path.join(OUT, file), fullPage: false })
    }
  } else {
    await page.screenshot({ path: path.join(OUT, file), fullPage: false })
  }
}

async function main() {
  const cfg = COMPONENTS[componentId]
  if (!cfg) {
    console.error("Unknown component:", componentId, Object.keys(COMPONENTS).join(", "))
    process.exit(1)
  }

  fs.mkdirSync(OUT, { recursive: true })

  let browser
  try {
    browser = await puppeteer.launch({ headless: true, protocolTimeout: 120000 })
    const page = await browser.newPage()
    await page.setViewport(VIEWPORTS[0])

    const localUrl = cfg.localUrl || LOCAL_BASE
    await gotoPage(page, localUrl, cfg)
    if (cfg.openModal) {
      await page.evaluate(() => {
        const modal = document.querySelector(".k2-modal")
        if (!modal) return
        modal.querySelectorAll("[data-modal-panel]").forEach((panel) => {
          panel.hidden = panel.getAttribute("data-modal-panel") !== "abl"
        })
        modal.querySelectorAll("[data-stagger], [data-modal-panel], .k2-modal-item").forEach((el) => {
          el.classList.add("on")
          el.style.removeProperty("opacity")
          el.style.removeProperty("transform")
          el.style.removeProperty("visibility")
        })
        if (!modal.open) modal.showModal()
      })
      await new Promise((r) => setTimeout(r, 800))
    }
    const localData = await extractProbes(page, cfg)
    await screenshotSection(page, cfg, "1536-local.png")

    if (!localData.ok) fail("section_present", `missing ${cfg.selector} on local`)
    else pass("section_present", cfg.selector)

    if (componentId === "loader-hero") {
      const heroBgCheck = await page.evaluate(() => {
        const hero = document.querySelector("#meet-artemis")
        const bg = hero?.querySelector(".k2-bg")
        const img = hero?.querySelector(".k2-bg .k2-img")
        if (!hero || !bg || !img) return { ok: false, reason: "missing hero bg nodes" }
        const bgStyle = getComputedStyle(bg)
        const imgStyle = getComputedStyle(img)
        const rect = img.getBoundingClientRect()
        return {
          ok:
            Number(bgStyle.opacity) >= 0.85 &&
            bgStyle.visibility !== "hidden" &&
            Number(imgStyle.opacity) >= 0.85 &&
            imgStyle.visibility !== "hidden" &&
            rect.width > 200 &&
            rect.height > 200 &&
            !!img.getAttribute("src"),
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          zIndex: bgStyle.zIndex,
        }
      })
      if (heroBgCheck.ok) pass("hero_bg_visible", `${heroBgCheck.width}x${heroBgCheck.height} @ z${heroBgCheck.zIndex}`)
      else fail("hero_bg_visible", JSON.stringify(heroBgCheck))
    }

    const refPage = await browser.newPage()
    await refPage.setViewport(VIEWPORTS[0])
    await gotoPage(refPage, REF_URL, { ...cfg, waitMs: cfg.waitMs || 3000, localUrl: undefined })
    if (cfg.openModal) {
      await refPage.evaluate(() => {
        const modal = document.querySelector(".k2-modal")
        if (!modal) return
        modal.querySelectorAll("[data-modal-panel]").forEach((panel) => {
          panel.hidden = panel.getAttribute("data-modal-panel") !== "abl"
        })
        modal.querySelectorAll("[data-stagger], [data-modal-panel], .k2-modal-item").forEach((el) => {
          el.classList.add("on")
          el.style.removeProperty("opacity")
          el.style.removeProperty("transform")
          el.style.removeProperty("visibility")
        })
        if (!modal.open) modal.showModal()
      })
      await new Promise((r) => setTimeout(r, 800))
    }
    const refData = await extractProbes(refPage, cfg)
    await screenshotSection(refPage, cfg, "1536-ref.png")

    const res = await fetch(localUrl.replace(/\?.*$/, ""))
    if (res.status === 200) pass("route_200", "200")
    else fail("route_200", String(res.status))

    let copyScore = 10
    let styleScore = 10
    let layoutScore = 10
    const deltas = []

    if (localData.ok && refData.ok && cfg.probes) {
      for (const p of cfg.probes) {
        const l = localData.probes[p.id]
        const r = refData.probes[p.id]
        if (!l || !r) {
          deltas.push({ probe: p.id, error: "missing probe" })
          copyScore = Math.min(copyScore, 0)
          continue
        }
        if (normalizeCopy(l.text) !== normalizeCopy(r.text)) {
          deltas.push({ probe: p.id, type: "copy", local: l.text.slice(0, 80), ref: r.text.slice(0, 80) })
          copyScore = Math.min(copyScore, 4)
        }
        const ss = scoreStyle(l.style, r.style)
        styleScore = Math.min(styleScore, ss)
        if (ss < 10) deltas.push({ probe: p.id, type: "style", local: l.style, ref: r.style })
        const rs = scoreRect(l.rect, r.rect)
        layoutScore = Math.min(layoutScore, rs)
        if (rs < 10) deltas.push({ probe: p.id, type: "layout", local: l.rect, ref: r.rect })
      }
    }

    if (copyScore >= 9.8) pass("copy_match", `${copyScore}/10`)
    else fail("copy_match", JSON.stringify(deltas.filter((d) => d.type === "copy")))

    if (styleScore >= 9.8) pass("style_match", `${styleScore}/10`)
    else fail("style_match", `${styleScore}/10`)

    if (layoutScore >= 9.8) pass("layout_match", `${layoutScore}/10`)
    else fail("layout_match", `${layoutScore}/10`)

    const weighted = Math.round(((copyScore * 0.35 + styleScore * 0.35 + layoutScore * 0.3) / 1) * 100) / 100
    if (weighted >= 9.8) pass("weighted_score", `${weighted}/10`)
    else fail("weighted_score", `${weighted}/10`)

    if (fs.existsSync(path.join(OUT, "1536-local.png")) && fs.existsSync(path.join(OUT, "1536-ref.png"))) {
      pass("screenshots", OUT)
    } else fail("screenshots", "missing PNGs")

    const report = {
      componentId,
      name: cfg.name,
      loop,
      localUrl,
      refUrl: REF_URL,
      weighted,
      scores: { copy: copyScore, style: styleScore, layout: layoutScore },
      deltas,
      gates,
      passCount: gates.filter((g) => g.pass).length,
      failCount: gates.filter((g) => !g.pass).length,
      approved: gates.every((g) => g.pass),
    }

    fs.writeFileSync(path.join(BASE, `15-COMPONENT-${componentId}-GATES.json`), JSON.stringify(report, null, 2))
    fs.writeFileSync(
      path.join(BASE, `15-COMPONENT-${componentId}-LOOP-${loop}.md`),
      `# ${cfg.name} — Loop ${loop}\n\n**Approved:** ${report.approved}\n**Score:** ${weighted}/10\n\n## Deltas\n\n\`\`\`json\n${JSON.stringify(deltas, null, 2)}\n\`\`\`\n`,
    )

    console.log("\n", JSON.stringify(report, null, 2))
    process.exit(report.approved ? 0 : 1)
  } catch (e) {
    fail("browser", e.message)
    process.exit(1)
  } finally {
    await browser?.close()
  }
}

main()
