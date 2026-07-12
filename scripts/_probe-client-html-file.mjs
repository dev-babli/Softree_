import puppeteer from "puppeteer"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const htmlPath = path.resolve(__dirname, "../Softree_/client.html")
const fileUrl = "file:///" + htmlPath.replace(/\\/g, "/")

const b = await puppeteer.launch({ headless: true, args: ["--no-sandbox", "--allow-file-access-from-files"] })
const p = await b.newPage()
await p.setViewport({ width: 1600, height: 900 })
await p.goto(fileUrl, { waitUntil: "networkidle2", timeout: 120000 }).catch(() => {})
await new Promise((r) => setTimeout(r, 5000))

const info = await p.evaluate(() => {
  const pick = (sel) => {
    const el = document.querySelector(sel)
    if (!el) return null
    const r = el.getBoundingClientRect()
    return {
      w: Math.round(r.width),
      h: Math.round(r.height),
      t: Math.round(r.top),
      l: Math.round(r.left),
      tag: el.tagName,
      cls: el.className?.toString?.().slice(0, 80),
    }
  }
  return {
    title: document.title,
    root: pick("[data-framer-root]"),
    rootDisplay: document.querySelector("[data-framer-root]") && getComputedStyle(document.querySelector("[data-framer-root]")).display,
    hero: pick('[data-framer-name="Section Hero"]'),
    headline: pick(".framer-16qcng6"),
    videoWrap: pick(".framer-1278xai-container"),
    video: pick("video"),
    logo: pick(".framer-1wu5efj"),
    bodySnippet: document.body.innerText.slice(0, 200),
  }
})
console.log(JSON.stringify(info, null, 2))
await p.screenshot({ path: "scripts/_client-html-ref-1600.png", fullPage: false })
await b.close()
