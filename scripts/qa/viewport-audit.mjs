#!/usr/bin/env node
/**
 * Page Factory — viewport & layout audit
 *
 * Captures full-page + per-scroll-step screenshots at 6 viewports and runs
 * automated layout-fault detection (horizontal overflow, oversized elements,
 * broken/zero-size images, tiny touch targets, overlapping interactive
 * elements, console errors, failed requests).
 *
 * Usage:
 *   node scripts/qa/viewport-audit.mjs --route / --out page-factory/qa/home/round-1
 *   npm run qa:viewport -- --route /about-us --out page-factory/qa/about-us/round-1
 *
 * Env: QA_BASE_URL (default http://localhost:3000)
 */
import puppeteer from "puppeteer";
import fs from "node:fs";
import path from "node:path";

const argv = process.argv.slice(2);
function arg(name, fallback) {
  const i = argv.indexOf(`--${name}`);
  return i !== -1 && argv[i + 1] ? argv[i + 1] : fallback;
}

const ROUTE = arg("route", "/");
const OUT = arg("out", `page-factory/qa/${ROUTE.replace(/\W+/g, "-").replace(/^-|-$/g, "") || "home"}/adhoc`);
const BASE = process.env.QA_BASE_URL || arg("base", "http://localhost:3000");
const URL_ = new URL(ROUTE, BASE).toString();

const VIEWPORTS = [
  { name: "mobile-360", width: 360, height: 800, mobile: true },
  { name: "mobile-390", width: 390, height: 844, mobile: true },
  { name: "tablet-768", width: 768, height: 1024, mobile: true },
  { name: "laptop-1024", width: 1024, height: 768, mobile: false },
  { name: "desktop-1440", width: 1440, height: 900, mobile: false },
  { name: "desktop-1920", width: 1920, height: 1080, mobile: false },
];

fs.mkdirSync(OUT, { recursive: true });

/** Runs inside the page: structural fault detection. */
function domChecks(isMobileWidth) {
  const vw = window.innerWidth;
  const findings = [];
  const sel = (el) => {
    if (!el || el === document.documentElement) return "html";
    let s = el.tagName.toLowerCase();
    if (el.id) return `${s}#${el.id}`;
    if (el.className && typeof el.className === "string") {
      const c = el.className.trim().split(/\s+/).slice(0, 3).join(".");
      if (c) s += `.${c}`;
    }
    const parent = el.parentElement ? sel(el.parentElement) : "";
    return parent ? `${parent} > ${s}` : s;
  };

  // 1. document-level horizontal overflow
  const docOverflow = document.documentElement.scrollWidth - vw;
  if (docOverflow > 1) {
    findings.push({ type: "horizontal-overflow", detail: `document scrollWidth exceeds viewport by ${docOverflow}px` });
  }

  const all = Array.from(document.querySelectorAll("body *"));
  const visible = (el) => {
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return r.width > 0 && r.height > 0 && cs.visibility !== "hidden" && cs.display !== "none" && cs.opacity !== "0";
  };

  // 2. elements extending beyond viewport width (ignore intentionally-translated animation wrappers barely offscreen)
  let oversize = 0;
  for (const el of all) {
    if (oversize >= 25) break;
    const r = el.getBoundingClientRect();
    if (r.width === 0) continue;
    const cs = getComputedStyle(el);
    if (cs.position === "fixed" && cs.transform !== "none") continue;
    if ((r.right > vw + 2 && r.left < vw) || (r.left < -2 && r.right > 0)) {
      const overflowPx = Math.max(r.right - vw, -r.left);
      if (overflowPx > 8) {
        findings.push({ type: "element-overflow", selector: sel(el), detail: `extends ${Math.round(overflowPx)}px past viewport edge (rect ${Math.round(r.left)}..${Math.round(r.right)}, vw ${vw})` });
        oversize++;
      }
    }
  }

  // 3. broken / zero-size images
  for (const img of Array.from(document.images)) {
    if (img.loading === "lazy" && img.getBoundingClientRect().top > window.innerHeight * 3) continue;
    if (img.complete && img.naturalWidth === 0 && img.src) {
      findings.push({ type: "broken-image", selector: sel(img), detail: `failed to load: ${img.currentSrc || img.src}` });
    }
    const r = img.getBoundingClientRect();
    if (img.complete && img.naturalWidth > 0 && (r.width === 0 || r.height === 0)) {
      findings.push({ type: "zero-size-image", selector: sel(img), detail: "image loaded but renders at 0px" });
    }
  }

  // 4. tiny touch targets (mobile widths only)
  if (isMobileWidth) {
    let tiny = 0;
    for (const el of Array.from(document.querySelectorAll("a,button,[role='button']"))) {
      if (tiny >= 15) break;
      if (!visible(el)) continue;
      const r = el.getBoundingClientRect();
      if ((r.width < 40 || r.height < 40) && r.width > 0 && el.textContent.trim().length > 0) {
        // exclude inline text links inside paragraphs
        if (el.tagName === "A" && el.closest("p")) continue;
        findings.push({ type: "tiny-touch-target", selector: sel(el), detail: `${Math.round(r.width)}x${Math.round(r.height)}px (< 40px)` });
        tiny++;
      }
    }
  }

  // 5. overlapping interactive elements
  const interactive = Array.from(document.querySelectorAll("a,button,[role='button']")).filter(visible).slice(0, 150);
  const rects = interactive.map((el) => ({ el, r: el.getBoundingClientRect() }));
  let overlaps = 0;
  for (let i = 0; i < rects.length && overlaps < 10; i++) {
    for (let j = i + 1; j < rects.length && overlaps < 10; j++) {
      const a = rects[i], b = rects[j];
      if (a.el.contains(b.el) || b.el.contains(a.el)) continue;
      const ix = Math.max(0, Math.min(a.r.right, b.r.right) - Math.max(a.r.left, b.r.left));
      const iy = Math.max(0, Math.min(a.r.bottom, b.r.bottom) - Math.max(a.r.top, b.r.top));
      const inter = ix * iy;
      const smaller = Math.min(a.r.width * a.r.height, b.r.width * b.r.height);
      if (smaller > 0 && inter / smaller > 0.3) {
        findings.push({ type: "overlapping-interactive", selector: `${sel(a.el)} <-> ${sel(b.el)}`, detail: `${Math.round((inter / smaller) * 100)}% overlap` });
        overlaps++;
      }
    }
  }

  return { findings, pageHeight: document.documentElement.scrollHeight };
}

async function auditViewport(browser, vp) {
  const page = await browser.newPage();
  const consoleErrors = [];
  const failedRequests = [];
  page.on("console", (m) => { if (m.type() === "error") consoleErrors.push(m.text().slice(0, 500)); });
  page.on("pageerror", (e) => consoleErrors.push(`pageerror: ${String(e).slice(0, 500)}`));
  page.on("requestfailed", (req) => {
    const f = req.failure();
    if (f && f.errorText !== "net::ERR_ABORTED") failedRequests.push(`${req.url().slice(0, 200)} — ${f.errorText}`);
  });
  page.on("response", (res) => { if (res.status() >= 400) failedRequests.push(`${res.url().slice(0, 200)} — HTTP ${res.status()}`); });

  await page.setViewport({ width: vp.width, height: vp.height, isMobile: vp.mobile, hasTouch: vp.mobile, deviceScaleFactor: 1 });
  await page.goto(URL_, { waitUntil: "networkidle2", timeout: 90_000 });
  await new Promise((r) => setTimeout(r, 2500)); // let entrance animations settle

  const dir = path.join(OUT, vp.name);
  fs.mkdirSync(dir, { recursive: true });

  // scroll-step captures (drives lazy sections + ScrollTrigger states)
  const steps = await page.evaluate(() => Math.min(20, Math.ceil(document.documentElement.scrollHeight / window.innerHeight)));
  for (let s = 0; s < steps; s++) {
    await page.evaluate((i) => window.scrollTo({ top: i * window.innerHeight, behavior: "instant" }), s);
    await new Promise((r) => setTimeout(r, 700));
    await page.screenshot({ path: path.join(dir, `scroll-${String(s).padStart(2, "0")}.png`) });
  }

  // back to top, settle, run checks + full-page shot
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await new Promise((r) => setTimeout(r, 1000));
  const checks = await page.evaluate(domChecks, vp.width <= 768);
  await page.screenshot({ path: path.join(dir, "full-page.png"), fullPage: true });

  await page.close();
  return {
    viewport: vp.name, width: vp.width, height: vp.height,
    pageHeight: checks.pageHeight,
    findings: checks.findings,
    consoleErrors: [...new Set(consoleErrors)].slice(0, 30),
    failedRequests: [...new Set(failedRequests)].slice(0, 30),
    screenshots: { dir, scrollSteps: steps },
  };
}

const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox", "--disable-dev-shm-usage", "--font-render-hinting=none"] });
const results = [];
try {
  for (const vp of VIEWPORTS) {
    process.stdout.write(`[viewport-audit] ${vp.name} (${vp.width}x${vp.height}) ... `);
    try {
      const r = await auditViewport(browser, vp);
      results.push(r);
      console.log(`${r.findings.length} findings, ${r.consoleErrors.length} console errors`);
    } catch (e) {
      results.push({ viewport: vp.name, error: String(e).slice(0, 500) });
      console.log(`ERROR: ${e.message}`);
    }
  }
} finally {
  await browser.close();
}

const totalFindings = results.reduce((n, r) => n + (r.findings?.length || 0), 0);
const totalConsole = results.reduce((n, r) => n + (r.consoleErrors?.length || 0), 0);
const totalFailed = results.reduce((n, r) => n + (r.failedRequests?.length || 0), 0);
const report = {
  url: URL_, route: ROUTE, generatedBy: "viewport-audit.mjs",
  summary: { totalFindings, totalConsoleErrors: totalConsole, totalFailedRequests: totalFailed, pass: totalFindings === 0 && totalConsole === 0 && totalFailed === 0 },
  viewports: results,
};
fs.writeFileSync(path.join(OUT, "report.json"), JSON.stringify(report, null, 2));
console.log(`\n[viewport-audit] ${totalFindings} layout findings, ${totalConsole} console errors, ${totalFailed} failed requests`);
console.log(`[viewport-audit] report: ${path.join(OUT, "report.json")}`);
process.exit(report.summary.pass ? 0 : 1);
