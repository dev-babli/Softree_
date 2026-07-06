#!/usr/bin/env node
/**
 * Page Factory — performance audit
 *
 * Measures LCP, CLS, long tasks, scroll FPS (auto-scroll through the full page),
 * JS heap growth, transfer weight, console errors and failed requests.
 *
 * Usage:
 *   node scripts/qa/perf-audit.mjs --route / --out page-factory/qa/home/round-1
 *   npm run qa:perf -- --route /about-us --out page-factory/qa/about-us/round-1
 *
 * Env: QA_BASE_URL (default http://localhost:3000)
 * Gates: LCP < 2500ms · CLS < 0.1 · no long task > 200ms · long-task total < 1000ms
 *        scroll FPS avg >= 50, min >= 30 · zero console errors · zero failed requests
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
const GATES = { lcpMs: 2500, cls: 0.1, longTaskMaxMs: 200, longTaskTotalMs: 1000, fpsAvg: 50, fpsMin: 30 };

fs.mkdirSync(OUT, { recursive: true });

const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox", "--disable-dev-shm-usage"] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

const consoleErrors = [];
const failedRequests = [];
const transfers = [];
page.on("console", (m) => { if (m.type() === "error") consoleErrors.push(m.text().slice(0, 500)); });
page.on("pageerror", (e) => consoleErrors.push(`pageerror: ${String(e).slice(0, 500)}`));
page.on("requestfailed", (req) => {
  const f = req.failure();
  if (f && f.errorText !== "net::ERR_ABORTED") failedRequests.push(`${req.url().slice(0, 200)} — ${f.errorText}`);
});
page.on("response", async (res) => {
  try {
    if (res.status() >= 400) { failedRequests.push(`${res.url().slice(0, 200)} — HTTP ${res.status()}`); return; }
    const req = res.request();
    const type = req.resourceType();
    if (["document", "script", "stylesheet", "font", "image", "media", "fetch", "xhr"].includes(type)) {
      const buf = await res.buffer().catch(() => null);
      if (buf) transfers.push({ url: res.url().slice(0, 250), type, bytes: buf.length });
    }
  } catch { /* detached */ }
});

// observers must be registered before any page script runs
await page.evaluateOnNewDocument(() => {
  window.__pf = { lcp: 0, cls: 0, longTasks: [] };
  new PerformanceObserver((l) => {
    const e = l.getEntries();
    if (e.length) window.__pf.lcp = e[e.length - 1].startTime;
  }).observe({ type: "largest-contentful-paint", buffered: true });
  new PerformanceObserver((l) => {
    for (const e of l.getEntries()) if (!e.hadRecentInput) window.__pf.cls += e.value;
  }).observe({ type: "layout-shift", buffered: true });
  new PerformanceObserver((l) => {
    for (const e of l.getEntries()) window.__pf.longTasks.push({ start: Math.round(e.startTime), duration: Math.round(e.duration) });
  }).observe({ type: "longtask", buffered: true });
});

console.log(`[perf-audit] loading ${URL_} ...`);
const t0 = Date.now();
await page.goto(URL_, { waitUntil: "networkidle2", timeout: 120_000 });
const loadMs = Date.now() - t0;
await new Promise((r) => setTimeout(r, 3000)); // settle: fonts, LCP finalization, hydration

const heapBefore = (await page.metrics()).JSHeapUsedSize;

// auto-scroll through the entire page sampling frame times
const scrollStats = await page.evaluate(async () => {
  const frames = [];
  let last = performance.now();
  let rafId;
  const tick = (t) => { frames.push(t - last); last = t; rafId = requestAnimationFrame(tick); };
  rafId = requestAnimationFrame(tick);

  const total = document.documentElement.scrollHeight - window.innerHeight;
  const pxPerStep = 12; // ~720px/s at 60fps — a realistic fast read-scroll
  let y = 0;
  while (y < total) {
    y += pxPerStep;
    window.scrollTo(0, y);
    await new Promise((r) => requestAnimationFrame(r));
  }
  await new Promise((r) => setTimeout(r, 300));
  cancelAnimationFrame(rafId);

  const valid = frames.filter((f) => f > 0 && f < 1000);
  const fps = valid.map((f) => 1000 / f);
  const avg = fps.reduce((a, b) => a + b, 0) / (fps.length || 1);
  const sorted = [...fps].sort((a, b) => a - b);
  const p5 = sorted[Math.floor(sorted.length * 0.05)] || 0;
  const worstFrameMs = Math.max(...valid, 0);
  const jankFrames = valid.filter((f) => f > 33.4).length; // dropped below 30fps
  return {
    scrolledPx: Math.round(total),
    samples: valid.length,
    fpsAvg: Math.round(avg * 10) / 10,
    fpsP5: Math.round(p5 * 10) / 10,
    worstFrameMs: Math.round(worstFrameMs),
    jankFrames,
    jankPct: Math.round((jankFrames / (valid.length || 1)) * 1000) / 10,
  };
});

const heapAfter = (await page.metrics()).JSHeapUsedSize;
const vitals = await page.evaluate(() => window.__pf);

await browser.close();

const byType = {};
for (const t of transfers) byType[t.type] = (byType[t.type] || 0) + t.bytes;
const scripts = transfers.filter((t) => t.type === "script").sort((a, b) => b.bytes - a.bytes);
const longTasksDuringAll = vitals.longTasks;
const worstLongTask = Math.max(0, ...longTasksDuringAll.map((t) => t.duration));
const longTaskTotal = longTasksDuringAll.reduce((a, t) => a + t.duration, 0);
const kb = (b) => Math.round((b / 1024) * 10) / 10;

const gates = {
  lcp: { value: Math.round(vitals.lcp), limit: GATES.lcpMs, pass: vitals.lcp < GATES.lcpMs && vitals.lcp > 0 },
  cls: { value: Math.round(vitals.cls * 1000) / 1000, limit: GATES.cls, pass: vitals.cls < GATES.cls },
  worstLongTask: { value: worstLongTask, limit: GATES.longTaskMaxMs, pass: worstLongTask <= GATES.longTaskMaxMs },
  longTaskTotal: { value: longTaskTotal, limit: GATES.longTaskTotalMs, pass: longTaskTotal <= GATES.longTaskTotalMs },
  scrollFpsAvg: { value: scrollStats.fpsAvg, limit: GATES.fpsAvg, pass: scrollStats.fpsAvg >= GATES.fpsAvg },
  scrollFpsP5: { value: scrollStats.fpsP5, limit: GATES.fpsMin, pass: scrollStats.fpsP5 >= GATES.fpsMin },
  consoleErrors: { value: consoleErrors.length, limit: 0, pass: consoleErrors.length === 0 },
  failedRequests: { value: failedRequests.length, limit: 0, pass: failedRequests.length === 0 },
};

const report = {
  url: URL_, route: ROUTE, generatedBy: "perf-audit.mjs", note: "dev-server numbers; production build will be faster",
  loadMs,
  gates,
  pass: Object.values(gates).every((g) => g.pass),
  scroll: scrollStats,
  longTasks: longTasksDuringAll.slice(0, 40),
  heap: { beforeScrollMB: Math.round(heapBefore / 1048576), afterScrollMB: Math.round(heapAfter / 1048576), growthMB: Math.round((heapAfter - heapBefore) / 1048576) },
  weight: {
    totalKB: kb(transfers.reduce((a, t) => a + t.bytes, 0)),
    byTypeKB: Object.fromEntries(Object.entries(byType).map(([k, v]) => [k, kb(v)])),
    top10Scripts: scripts.slice(0, 10).map((s) => ({ url: s.url, kb: kb(s.bytes) })),
  },
  consoleErrors: [...new Set(consoleErrors)].slice(0, 30),
  failedRequests: [...new Set(failedRequests)].slice(0, 30),
};

fs.writeFileSync(path.join(OUT, "perf-report.json"), JSON.stringify(report, null, 2));
console.log(`[perf-audit] LCP ${report.gates.lcp.value}ms | CLS ${report.gates.cls.value} | scroll FPS avg ${scrollStats.fpsAvg} (p5 ${scrollStats.fpsP5}) | worst long task ${worstLongTask}ms | weight ${report.weight.totalKB}KB`);
console.log(`[perf-audit] ${report.pass ? "PASS" : "FAIL"} — report: ${path.join(OUT, "perf-report.json")}`);
process.exit(report.pass ? 0 : 1);
