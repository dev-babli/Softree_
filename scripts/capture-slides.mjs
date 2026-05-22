/**
 * capture-slides.mjs
 *
 * Visits http://localhost:3000/record-slides for each of the 4 slides,
 * waits for the black curtain reveal, captures frames, then stitches
 * them into animated WebP files saved to public/images/slides/.
 *
 * Usage:  node scripts/capture-slides.mjs
 * Prereq: dev server must be running on port 3000
 */

import puppeteer from "puppeteer"
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg"
import Ffmpeg from "fluent-ffmpeg"
import { mkdirSync, existsSync, rmSync } from "fs"
import { join, dirname } from "path"
import { fileURLToPath } from "url"

Ffmpeg.setFfmpegPath(ffmpegInstaller.path)

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_DIR   = join(__dirname, "..", "public", "images", "slides")
const TMP_DIR   = join(__dirname, "..", ".tmp-frames")

mkdirSync(OUT_DIR, { recursive: true })
mkdirSync(TMP_DIR, { recursive: true })

const BASE_URL = "http://localhost:3000/record-slides"

const SLIDES = [
  { index: 0, id: "global-delivery"      },
  { index: 1, id: "delivery-framework"   },
  { index: 2, id: "engineering-execution"},
  { index: 3, id: "long-term-partnership"},
]

// How long to capture after reveal (ms) and at what fps
const CAPTURE_DURATION_MS = 5000
const FPS                 = 20
const FRAME_INTERVAL_MS   = Math.round(1000 / FPS)
const VIEWPORT            = { width: 1280, height: 720 }

function cleanDir(dir) {
  if (!existsSync(dir)) return
  rmSync(dir, { recursive: true, force: true })
  mkdirSync(dir, { recursive: true })
}

async function captureFrames(page, slideDir, durationMs, intervalMs) {
  mkdirSync(slideDir, { recursive: true })
  const totalFrames = Math.floor(durationMs / intervalMs)
  let captured = 0
  for (let i = 0; i < totalFrames; i++) {
    const start = Date.now()
    try {
      const padded = String(i).padStart(5, "0")
      await page.screenshot({ path: join(slideDir, `frame_${padded}.png`), type: "png" })
      captured++
    } catch { /* ignore */ }
    const elapsed = Date.now() - start
    const wait = Math.max(0, intervalMs - elapsed)
    if (wait > 0) await new Promise(r => setTimeout(r, wait))
  }
  return captured
}

function framesToWebP(framesDir, outputPath, fps) {
  return new Promise((resolve, reject) => {
    Ffmpeg()
      .input(join(framesDir, "frame_%05d.png"))
      .inputFPS(fps)
      .outputOptions([
        "-vf", `scale=${VIEWPORT.width}:-1:flags=lanczos`,
        "-loop", "0",
        "-preset", "default",
        "-compression_level", "4",
      ])
      .output(outputPath)
      .on("end", resolve)
      .on("error", reject)
      .run()
  })
}

async function run() {
  console.log("\n🎬  Starting slide capture...\n")

  const browser = await puppeteer.launch({
    headless: false,           // visible so you can see it working
    defaultViewport: VIEWPORT,
    args: ["--window-size=1280,720", "--disable-web-security"],
  })

  const page = await browser.newPage()
  await page.setViewport(VIEWPORT)

  // Navigate once, then switch slides via clicking buttons
  await page.goto(BASE_URL, { waitUntil: "networkidle2" })
  // Let the page fully settle
  await new Promise(r => setTimeout(r, 1500))

  for (const slide of SLIDES) {
    console.log(`  ▶  Capturing slide ${slide.index + 1}/4: ${slide.id}`)

    const slideFrameDir = join(TMP_DIR, slide.id)
    cleanDir(slideFrameDir)

    // Click the correct tab button by data order (first 4 are slide selectors)
    await page.evaluate((idx) => {
      const btns = document.querySelectorAll("button")
      if (btns[idx]) btns[idx].click()
    }, slide.index)

    // Wait for curtain animation + reveal buffer (600ms curtain + 800ms buffer)
    await new Promise(r => setTimeout(r, 1600))

    // Capture frames for CAPTURE_DURATION_MS
    const frameCount = await captureFrames(page, slideFrameDir, CAPTURE_DURATION_MS, FRAME_INTERVAL_MS)
    console.log(`     ✓ Captured ${frameCount} frames`)

    if (frameCount === 0) {
      console.log(`     ⚠  No frames captured for ${slide.id}, skipping.`)
      continue
    }

    // Convert frames → animated WebP
    const webpOut = join(OUT_DIR, `${slide.id}.webp`)
    console.log(`     ⚙  Encoding → ${webpOut}`)
    await framesToWebP(slideFrameDir, webpOut, FPS)
    console.log(`     ✅  Saved: public/images/slides/${slide.id}.webp`)
  }

  await browser.close()
  cleanDir(TMP_DIR)

  console.log("\n✅  All 4 slides captured and saved to public/images/slides/\n")
  console.log("Next step: run  node scripts/swap-slides.mjs  to replace components with <img> tags.\n")
}

run().catch(err => {
  console.error("\n❌ Capture failed:", err.message)
  process.exit(1)
})
