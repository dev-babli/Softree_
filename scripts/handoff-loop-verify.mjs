/**
 * Loader→hero handoff loop gates + screenshots.
 * Usage: node scripts/handoff-loop-verify.mjs [loopNumber]
 */
import fs from "node:fs"
import path from "node:path"
import puppeteer from "puppeteer"

const loop = Number(process.argv[2] || 1)
const BASE = path.resolve(".planning/page-forge/kore-ai-exact")
const OUT = path.join(BASE, `handoff-loop-${loop}`)
const LOCAL = process.env.HANDOFF_URL || "http://localhost:3000/kore-ai-component?replay-loader=1"
const VIEWPORTS = [
  { name: "390", width: 390, height: 844 },
  { name: "768", width: 768, height: 1024 },
  { name: "1536", width: 1536, height: 960 },
]

const gates = []

function pass(id, detail) {
  gates.push({ id, pass: true, detail })
  console.log(`PASS ${id}: ${detail}`)
}

function fail(id, detail) {
  gates.push({ id, pass: false, detail })
  console.log(`FAIL ${id}: ${detail}`)
}

async function waitForGsap(page) {
  await page.waitForFunction(() => typeof window.gsap !== "undefined", { timeout: 15000 }).catch(() => {})
}

async function captureFrame(page, file, waitMs = 0) {
  if (waitMs) await new Promise((r) => setTimeout(r, waitMs))
  await page.screenshot({ path: path.join(OUT, file), type: "png" }).catch((e) => {
    console.warn("screenshot skip", file, e.message)
  })
}

async function gotoPage(page, url) {
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 90000 })
      await page.waitForSelector(".kore-ai-exact-shell", { timeout: 30000 })
      return
    } catch (error) {
      if (attempt === 2) throw error
      await new Promise((r) => setTimeout(r, 1500))
    }
  }
}

async function waitForLoader(page) {
  await page.waitForFunction(
    () => document.querySelector(".k2-loader") || document.querySelector(".kore-ai-exact-shell")?.classList.contains("kore-ai-intro-complete"),
    { timeout: 30000 },
  )
}

async function runViewport(page, vp) {
  await page.setViewport({ width: vp.width, height: vp.height })
  await page.evaluateOnNewDocument(() => localStorage.removeItem("k2LoaderPlayedAt"))
  await gotoPage(page, LOCAL)
  await waitForGsap(page)
  await waitForLoader(page)
  await captureFrame(page, `${vp.name}-01-loader-step0.png`, 400)

  await page.waitForFunction(
    () => document.querySelector(".k2-loader")?.classList.contains("step-3"),
    { timeout: 12000 },
  ).catch(() => {})
  await captureFrame(page, `${vp.name}-02-loader-step3.png`, 200)

  await page.waitForFunction(
    () => document.documentElement.classList.contains("kore-ai-k2-handoff-running"),
    { timeout: 15000 },
  ).catch(() => {})
  await captureFrame(page, `${vp.name}-03-handoff-mid.png`, 600)

  await page.waitForFunction(
    () =>
      document.querySelector(".kore-ai-exact-shell")?.classList.contains("kore-ai-intro-complete") &&
      !document.querySelector(".k2-loader"),
    { timeout: 20000 },
  ).catch(() => {})
  await captureFrame(page, `${vp.name}-04-hero-settled.png`, 400)

  return page.evaluate(() => ({
    loaderSrc: document.querySelector(".k2-loader-bg-img")?.getAttribute("src") ?? null,
    heroSrc: document.querySelector("#meet-artemis .k2-img")?.getAttribute("src") ?? null,
    introComplete: document.querySelector(".kore-ai-exact-shell")?.classList.contains("kore-ai-intro-complete"),
    loaderGone: !document.querySelector(".k2-loader"),
    flipVisible: getComputedStyle(document.querySelector('[data-flip-target="loader"]') || document.body).visibility,
    h1: document.querySelector("#meet-artemis h1")?.textContent?.trim().slice(0, 60),
    heroTextAudit: (() => {
      const hero = document.querySelector("#meet-artemis")
      if (!hero) return { ok: false, reason: "no hero" }
      const h1 = hero.querySelector("h1")
      const flip = hero.querySelector('[data-flip-target="loader"]')
      const pill = hero.querySelector(".k2-container-hero > .k2-hero > .k2-text")
      const body = hero.querySelector(".k2-container-hero-2 .k2-text")
      const cta = hero.querySelector(".k2-container-hero-2 .k2-cta")
      const tabs = hero.querySelector(".k2-tabs")
      const read = (el) => {
        if (!el) return { opacity: 0, visibility: "hidden" }
        const s = getComputedStyle(el)
        return { opacity: Number(s.opacity), visibility: s.visibility }
      }
      const blocks = { h1: read(h1), flip: read(flip), pill: read(pill), body: read(body), cta: read(cta), tabs: read(tabs) }
      const chars = [...hero.querySelectorAll(".char")]
      const visibleChars = chars.filter((c) => Number(getComputedStyle(c).opacity) > 0.5).length
      const blockOk = (key, b) => {
        if (b.visibility === "hidden") return false
        if (key === "body") return b.opacity >= 0.65
        return b.opacity > 0.85
      }
      const ok = Object.entries(blocks).every(([key, b]) => blockOk(key, b)) && visibleChars >= 8
      return { ok, blocks, visibleChars, charTotal: chars.length }
    })(),
  }))
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true })

  // Gate: shared asset in code
  const loaderTs = fs.readFileSync("src/components/kore-ai-exact/KoreK2Loader.tsx", "utf8")
  if (loaderTs.includes("KORE_HERO_BG_IMAGE")) pass("shared_asset", "KoreK2Loader imports KORE_HERO_BG_IMAGE")
  else fail("shared_asset", "missing KORE_HERO_BG_IMAGE import")

  const layout = fs.readFileSync("src/app/layout.tsx", "utf8")
  if (!layout.includes("KoreK2Loader") && !layout.includes("k2-loader")) pass("no_layout_hijack", "loader not in layout.tsx")
  else fail("no_layout_hijack", "loader found in layout.tsx")

  let browser
  try {
    browser = await puppeteer.launch({
      headless: true,
      protocolTimeout: 120000,
      defaultViewport: { width: 1536, height: 960 },
    })
    const page = await browser.newPage()

    await page.setViewport({ width: VIEWPORTS[2].width, height: VIEWPORTS[2].height })
    await page.evaluateOnNewDocument(() => localStorage.removeItem("k2LoaderPlayedAt"))
    await gotoPage(page, LOCAL)
    await waitForGsap(page)
    await waitForLoader(page)

    const assetCheck = await page.evaluate(() => ({
      loaderSrc: document.querySelector(".k2-loader-bg-img")?.getAttribute("src") ?? null,
      heroSrc: document.querySelector("#meet-artemis .k2-img")?.getAttribute("src") ?? null,
    }))

    if (
      assetCheck.loaderSrc &&
      assetCheck.heroSrc &&
      assetCheck.loaderSrc === assetCheck.heroSrc
    ) {
      pass("bg_url_match", assetCheck.loaderSrc)
    } else {
      fail("bg_url_match", JSON.stringify(assetCheck))
    }

    const sequenceStart = await page.evaluate(() => {
      window.__handoffSequenceStart = Date.now()
      return !!document.querySelector(".k2-loader")
    })
    if (!sequenceStart) {
      fail("replay_loader", "loader did not mount with ?replay-loader=1")
    } else {
      pass("replay_loader", "loader mounted")
    }

    await page.waitForFunction(
      () =>
        document.querySelector(".kore-ai-exact-shell")?.classList.contains("kore-ai-intro-complete") &&
        !document.querySelector(".k2-loader"),
      { timeout: 25000 },
    )
    const handoffMs = await page.evaluate(() => Date.now() - (window.__handoffSequenceStart || Date.now()))

    if (handoffMs <= 12000) pass("hard_stop_12s", `${handoffMs}ms`)
    else fail("hard_stop_12s", `${handoffMs}ms`)

    await new Promise((r) => setTimeout(r, 500))

    const runHeroTextAudit = () =>
      page.evaluate(() => {
        const hero = document.querySelector("#meet-artemis")
        if (!hero) return { ok: false, reason: "no hero" }
        const h1 = hero.querySelector("h1")
        const flip = hero.querySelector('[data-flip-target="loader"]')
        const pill = hero.querySelector(".k2-container-hero > .k2-hero > .k2-text")
        const body = hero.querySelector(".k2-container-hero-2 .k2-text")
        const cta = hero.querySelector(".k2-container-hero-2 .k2-cta")
        const tabs = hero.querySelector(".k2-tabs")
        const read = (el) => {
          if (!el) return { opacity: 0, visibility: "hidden" }
          const s = getComputedStyle(el)
          return { opacity: Number(s.opacity), visibility: s.visibility }
        }
        const blocks = { h1: read(h1), flip: read(flip), pill: read(pill), body: read(body), cta: read(cta), tabs: read(tabs) }
        const chars = [...hero.querySelectorAll(".char")]
        const visibleChars = chars.filter((c) => Number(getComputedStyle(c).opacity) > 0.5).length
        const blockOk = (key, b) => {
          if (b.visibility === "hidden") return false
          if (key === "body") return b.opacity >= 0.65
          return b.opacity >= 0.85
        }
        const ok = Object.entries(blocks).every(([key, b]) => blockOk(key, b)) && visibleChars >= 8
        return { ok, blocks, visibleChars, charTotal: chars.length }
      })

    let heroTextAudit = await runHeroTextAudit()
    for (let attempt = 0; !heroTextAudit.ok && attempt < 4; attempt++) {
      await new Promise((r) => setTimeout(r, 250))
      heroTextAudit = await runHeroTextAudit()
    }

    const audit1536 = await page.evaluate(() => ({
      introComplete: document.querySelector(".kore-ai-exact-shell")?.classList.contains("kore-ai-intro-complete"),
      loaderGone: !document.querySelector(".k2-loader"),
      h1: document.querySelector("#meet-artemis h1")?.textContent?.trim().slice(0, 60),
      heroTypography: (() => {
        const h1 = document.querySelector("#meet-artemis h1")
        if (!h1) return { ok: false }
        const s = getComputedStyle(h1)
        const fontSize = Number.parseFloat(s.fontSize)
        return { ok: fontSize >= 28 && fontSize <= 120, fontSize, lineHeight: s.lineHeight, fontFamily: s.fontFamily.slice(0, 40) }
      })(),
    }))
    audit1536.heroTextAudit = heroTextAudit

    await captureFrame(page, "1536-04-hero-settled.png", 200)

    if (audit1536.introComplete && audit1536.loaderGone) pass("handoff_complete", "intro complete, loader removed")
    else fail("handoff_complete", JSON.stringify(audit1536))

    if (audit1536.h1?.includes("AI-programmable")) pass("hero_h1", audit1536.h1)
    else fail("hero_h1", audit1536.h1 ?? "missing")

    if (audit1536.heroTextAudit?.ok) {
      pass("hero_text_visible", `${audit1536.heroTextAudit.visibleChars}/${audit1536.heroTextAudit.charTotal} chars`)
    } else {
      fail("hero_text_visible", JSON.stringify(audit1536.heroTextAudit))
    }

    if (audit1536.heroTypography?.ok) {
      pass("hero_typography", `${audit1536.heroTypography.fontSize}px / ${audit1536.heroTypography.lineHeight}`)
    } else {
      fail("hero_typography", JSON.stringify(audit1536.heroTypography))
    }

    if (audit1536.heroTextAudit?.blocks?.flip?.visibility === "visible") {
      pass("hero_flip_visible", "flip target visible")
    } else {
      fail("hero_flip_visible", JSON.stringify(audit1536.heroTextAudit?.blocks?.flip))
    }

    const heroBgCheck = await page.evaluate(() => {
      const hero = document.querySelector("#meet-artemis")
      const bg = hero?.querySelector(".k2-bg")
      const img = hero?.querySelector(".k2-bg .k2-img")
      if (!hero || !bg || !img) return { ok: false, reason: "missing hero bg nodes" }
      const bgStyle = getComputedStyle(bg)
      const imgStyle = getComputedStyle(img)
      const rect = img.getBoundingClientRect()
      const z = Number.parseInt(bgStyle.zIndex, 10)
      return {
        ok:
          Number(bgStyle.opacity) >= 0.85 &&
          bgStyle.visibility !== "hidden" &&
          Number(imgStyle.opacity) >= 0.85 &&
          imgStyle.visibility !== "hidden" &&
          rect.width > 200 &&
          rect.height > 200 &&
          !!img.getAttribute("src"),
        opacity: bgStyle.opacity,
        imgOpacity: imgStyle.opacity,
        zIndex: Number.isNaN(z) ? bgStyle.zIndex : z,
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        src: img.getAttribute("src"),
      }
    })

    if (heroBgCheck.ok) pass("hero_bg_visible", `${heroBgCheck.width}x${heroBgCheck.height} @ z${heroBgCheck.zIndex}`)
    else fail("hero_bg_visible", JSON.stringify(heroBgCheck))

    const layoutCheck = await page.evaluate(() => {
      const hero = document.querySelector("#meet-artemis")
      if (!hero) return { ok: false, reason: "no hero" }
      const pill = hero.querySelector(".k2-container-hero > .k2-hero > .k2-text")
      const flip = hero.querySelector('[data-flip-target="loader"]')
      const h1 = hero.querySelector("h1")
      const read = (el) => {
        if (!el) return null
        const r = el.getBoundingClientRect()
        return { top: r.top, left: r.left, width: r.width, height: r.height }
      }
      const blocks = { pill: read(pill), flip: read(flip), h1: read(h1) }
      if (!blocks.pill || !blocks.flip || !blocks.h1) return { ok: false, blocks }
      const orderOk = blocks.pill.top < blocks.flip.top && blocks.flip.top < blocks.h1.top
      const leftDelta = Math.abs(blocks.pill.left - blocks.flip.left)
      const leftOk = leftDelta < 48
      return { ok: orderOk && leftOk && blocks.h1.width > 200, blocks, orderOk, leftDelta }
    })

    if (layoutCheck.ok) pass("hero_layout", `order ok, leftDelta ${Math.round(layoutCheck.leftDelta)}px`)
    else fail("hero_layout", JSON.stringify(layoutCheck))

    for (const vp of VIEWPORTS) {
      await runViewport(page, vp)
    }

    const shots = fs.readdirSync(OUT).filter((f) => f.endsWith(".png"))
    if (shots.length >= 12) pass("screenshots", `${shots.length} files in ${OUT}`)
    else fail("screenshots", `${shots.length} files (need 12)`)

    // Route gate
    const routeUrl = LOCAL.replace(/\?.*$/, "")
    const res = await fetch(routeUrl)
    if (res.status === 200) pass("route_200", "200")
    else fail("route_200", String(res.status))
  } catch (e) {
    fail("browser", e.message)
  } finally {
    await browser?.close()
  }

  const report = {
    loop,
    replay: LOCAL,
    gates,
    passCount: gates.filter((g) => g.pass).length,
    failCount: gates.filter((g) => !g.pass).length,
    allPass: gates.every((g) => g.pass),
  }

  fs.writeFileSync(path.join(BASE, `14-LOOP-${loop}-GATES.json`), JSON.stringify(report, null, 2))
  console.log("\n", JSON.stringify(report, null, 2))
  process.exit(report.allPass ? 0 : 1)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
