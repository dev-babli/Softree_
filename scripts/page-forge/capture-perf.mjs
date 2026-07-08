/**
 * Page Forge — Performance evidence capture (`capture-perf.mjs`).
 *
 * Populates a `PerfMeasurement` (see `src/lib/page-forge/types.ts`) for the
 * Performance_Checker (Req 11.2, 12). It has two independent halves:
 *
 *  1. RUNTIME metrics (`lcpMs`) — captured by driving a real browser. The script
 *     tries Lighthouse first, then falls back to Puppeteer + a
 *     `largest-contentful-paint` PerformanceObserver (the same signal web-vitals
 *     reports). When neither tool is available in the environment, the runtime
 *     half returns a sentinel (`toolAbsent: true`) and `lcpMs` is left
 *     `undefined` so the checker records "performed by inspection, tool absent"
 *     (Req 11.4).
 *
 *  2. STATIC-ANALYSIS fields (`scrollLinkedProps`, `gsapContextsWithoutCleanup`,
 *     `heavyPinCount`, `globalLayoutHijack`, `reducedMotionPathPresent`, and the
 *     `lcpElementOpacityZeroUnderLoader` heuristic) — derived by scanning the
 *     built source with simple regex heuristics. These require no browser, so
 *     the static half NEVER sets `toolAbsent` (Req 11.4): even in a headless CI
 *     with no browser the Performance_Checker still gets its source-derived
 *     Findings.
 *
 * Public API:
 *   async function capturePerf(url, opts) -> { measurement, toolAbsent }
 *     opts.sourceFiles?: { path, content }[]  // pre-read built source
 *     opts.sourceDir?: string                 // directory to scan for source
 *     opts.briefRequestsGlobalLoader?: boolean // permits a root-layout loader
 *     opts.timeoutMs?: number                 // runtime capture budget
 *     opts.skipRuntime?: boolean              // static-only (no browser)
 *
 * CLI:
 *   node scripts/page-forge/capture-perf.mjs <url> [sourceDir]
 *   Prints the { measurement, toolAbsent } result as JSON.
 *
 * Requirements: 11.2, 11.3, 11.4
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Pin_Budget — at most one heavy pin (mirrors constraints.PIN_BUDGET). */
export const PIN_BUDGET = 1;

/** Default runtime capture budget in milliseconds. */
const DEFAULT_TIMEOUT_MS = 20000;

/** Source file extensions worth scanning for static analysis. */
const SOURCE_EXTENSIONS = new Set([
    ".ts",
    ".tsx",
    ".js",
    ".jsx",
    ".mjs",
    ".cjs",
]);

/** Directories never worth descending into when scanning source. */
const IGNORED_DIRS = new Set([
    "node_modules",
    ".next",
    ".git",
    "dist",
    "build",
    "coverage",
    ".turbo",
]);

// ---------------------------------------------------------------------------
// capturePerf — public entry
// ---------------------------------------------------------------------------

/**
 * Capture a `PerfMeasurement` for `url`.
 *
 * @param {string} url
 * @param {{
 *   sourceFiles?: { path: string, content: string }[],
 *   sourceDir?: string,
 *   briefRequestsGlobalLoader?: boolean,
 *   timeoutMs?: number,
 *   skipRuntime?: boolean,
 * }} [opts]
 * @returns {Promise<{ measurement: import("../../src/lib/page-forge/types").PerfMeasurement, toolAbsent: boolean }>}
 */
export async function capturePerf(url, opts = {}) {
    const files = await resolveSourceFiles(opts);

    // Static half — never sets toolAbsent (Req 11.4).
    const staticFields = analyzeStatic(files, {
        briefRequestsGlobalLoader: opts.briefRequestsGlobalLoader === true,
    });

    // Runtime half — LCP via Lighthouse or Puppeteer; toolAbsent on absence.
    let lcpMs;
    let toolAbsent = false;
    if (opts.skipRuntime === true) {
        toolAbsent = true;
    } else {
        const runtime = await measureRuntime(url, {
            timeoutMs: opts.timeoutMs ?? DEFAULT_TIMEOUT_MS,
        });
        toolAbsent = runtime.toolAbsent;
        if (typeof runtime.lcpMs === "number") {
            lcpMs = runtime.lcpMs;
        }
    }

    /** @type {import("../../src/lib/page-forge/types").PerfMeasurement} */
    const measurement = {
        ...(lcpMs !== undefined ? { lcpMs } : {}),
        lcpElementOpacityZeroUnderLoader: staticFields.lcpElementOpacityZeroUnderLoader,
        scrollLinkedProps: staticFields.scrollLinkedProps,
        gsapContextsWithoutCleanup: staticFields.gsapContextsWithoutCleanup,
        heavyPinCount: staticFields.heavyPinCount,
        globalLayoutHijack: staticFields.globalLayoutHijack,
        reducedMotionPathPresent: staticFields.reducedMotionPathPresent,
    };

    return { measurement, toolAbsent };
}

// ---------------------------------------------------------------------------
// Source resolution
// ---------------------------------------------------------------------------

/**
 * Resolve the source files to statically analyze from the options: an explicit
 * `sourceFiles` array wins; otherwise scan `sourceDir` recursively. When
 * neither is supplied, static analysis runs over an empty set (all fields take
 * their safe defaults).
 *
 * @param {{ sourceFiles?: { path: string, content: string }[], sourceDir?: string }} opts
 * @returns {Promise<{ path: string, content: string }[]>}
 */
async function resolveSourceFiles(opts) {
    if (Array.isArray(opts.sourceFiles)) {
        return opts.sourceFiles;
    }
    if (typeof opts.sourceDir === "string" && opts.sourceDir.length > 0) {
        return scanSourceDir(opts.sourceDir);
    }
    return [];
}

/**
 * Recursively read every source file (by extension) under `dir`, returning
 * `{ path, content }` entries. Unreadable files/dirs are skipped rather than
 * throwing, so a partial tree still yields useful static analysis.
 *
 * @param {string} dir
 * @returns {Promise<{ path: string, content: string }[]>}
 */
async function scanSourceDir(dir) {
    /** @type {{ path: string, content: string }[]} */
    const out = [];

    /** @param {string} current */
    async function walk(current) {
        let entries;
        try {
            entries = await fs.readdir(current, { withFileTypes: true });
        } catch {
            return;
        }
        for (const entry of entries) {
            const full = path.join(current, entry.name);
            if (entry.isDirectory()) {
                if (IGNORED_DIRS.has(entry.name)) {
                    continue;
                }
                await walk(full);
            } else if (entry.isFile() && SOURCE_EXTENSIONS.has(path.extname(entry.name))) {
                try {
                    const content = await fs.readFile(full, "utf8");
                    out.push({ path: full, content });
                } catch {
                    // Skip unreadable file.
                }
            }
        }
    }

    await walk(dir);
    return out;
}

// ---------------------------------------------------------------------------
// Static analysis (Req 11.4 — works without a browser)
// ---------------------------------------------------------------------------

/**
 * Derive the static-analysis `PerfMeasurement` fields from the built source.
 *
 * @param {{ path: string, content: string }[]} files
 * @param {{ briefRequestsGlobalLoader: boolean }} opts
 */
export function analyzeStatic(files, opts) {
    /** @type {string[]} */
    const scrollLinkedProps = [];
    /** @type {string[]} */
    const gsapContextsWithoutCleanup = [];
    let heavyPinCount = 0;
    let globalLayoutHijack = false;
    let reducedMotionPathPresent = false;
    let lcpElementOpacityZeroUnderLoader = false;

    for (const file of files) {
        const { path: filePath, content } = file;

        for (const prop of findScrollLinkedProps(content)) {
            if (!scrollLinkedProps.includes(prop)) {
                scrollLinkedProps.push(prop);
            }
        }

        for (const symbol of findGsapContextsWithoutCleanup(filePath, content)) {
            if (!gsapContextsWithoutCleanup.includes(symbol)) {
                gsapContextsWithoutCleanup.push(symbol);
            }
        }

        heavyPinCount += countHeavyPins(content);

        if (
            !opts.briefRequestsGlobalLoader &&
            mountsGlobalLoaderOnRootLayout(filePath, content)
        ) {
            globalLayoutHijack = true;
        }

        if (hasReducedMotionPath(content)) {
            reducedMotionPathPresent = true;
        }

        if (hasLcpHiddenUnderLoader(content)) {
            lcpElementOpacityZeroUnderLoader = true;
        }
    }

    return {
        scrollLinkedProps,
        gsapContextsWithoutCleanup,
        heavyPinCount,
        globalLayoutHijack,
        reducedMotionPathPresent,
        lcpElementOpacityZeroUnderLoader,
    };
}

/**
 * The expensive properties a scroll-linked animation must never drive
 * (Req 12.2 / 17.2). Canonical names as consumed by `perf-rules.ts`.
 */
const FORBIDDEN_SCROLL_PROPS = ["blur", "backdrop-filter", "top", "height", "width"];

/**
 * Markers that identify a scroll-linked animation context: a GSAP scrub
 * timeline / ScrollTrigger, or a native scroll event handler.
 */
const SCROLL_LINK_MARKERS = [
    /scrollTrigger\s*:/gi,
    /ScrollTrigger\.create\s*\(/gi,
    /\bscrub\s*:/gi,
    /addEventListener\s*\(\s*["']scroll["']/gi,
    /\bonScroll\b/g,
    /useScroll\s*\(/g,
    /scrollYProgress/g,
];

/** Window (in characters) scanned after a scroll-linked marker for props. */
const SCROLL_WINDOW = 500;

/**
 * Find forbidden properties animated inside scroll-linked contexts. For each
 * scroll-linked marker we scan a following window and collect any forbidden
 * property references, returning canonical names (`blur`, `backdrop-filter`,
 * `top`, `height`, `width`).
 *
 * @param {string} content
 * @returns {string[]}
 */
export function findScrollLinkedProps(content) {
    /** @type {Set<string>} */
    const found = new Set();

    for (const marker of SCROLL_LINK_MARKERS) {
        marker.lastIndex = 0;
        let match;
        while ((match = marker.exec(content)) !== null) {
            const start = match.index;
            const segment = content.slice(start, start + SCROLL_WINDOW);
            for (const prop of forbiddenPropsInSegment(segment)) {
                found.add(prop);
            }
            if (marker.lastIndex === match.index) {
                marker.lastIndex++;
            }
        }
    }

    // Preserve canonical order for deterministic output.
    return FORBIDDEN_SCROLL_PROPS.filter((prop) => found.has(prop));
}

/**
 * Detect forbidden property references within a single scroll-linked segment.
 * Handles `blur(...)`, `filter: blur`, `backdropFilter`/`backdrop-filter`, and
 * the layout props `top`/`height`/`width` when written as animated object keys
 * (e.g. `top: "40%"`) or CSS declarations.
 *
 * @param {string} segment
 * @returns {string[]}
 */
function forbiddenPropsInSegment(segment) {
    /** @type {string[]} */
    const props = [];
    const lower = segment.toLowerCase();

    if (/blur\s*\(/.test(lower) || /filter\s*:\s*["'`]?\s*blur/.test(lower)) {
        props.push("blur");
    }
    if (/backdrop-?filter/.test(lower)) {
        props.push("backdrop-filter");
    }
    // Layout props as animated object keys or CSS declarations: `top:`, `height:`,
    // `width:`. Require a word boundary so `paddingTop`/`maxWidth` don't match.
    if (/(^|[^a-z-])top\s*:/.test(lower)) {
        props.push("top");
    }
    if (/(^|[^a-z-])height\s*:/.test(lower)) {
        props.push("height");
    }
    if (/(^|[^a-z-])width\s*:/.test(lower)) {
        props.push("width");
    }

    return props;
}

/**
 * Find GSAP contexts / ScrollTriggers that lack cleanup on unmount (Req 12.3).
 *
 * Heuristic: a file "has cleanup" when it uses `useGSAP` (which auto-reverts) or
 * contains an explicit `.revert()` / `.kill()` / `ScrollTrigger.killAll()` call.
 * When a file creates GSAP contexts (`gsap.context(`, `ScrollTrigger.create(`,
 * or scrubbed `gsap.to/from/fromTo` timelines with a `scrollTrigger`) but has no
 * cleanup mechanism, each created context is reported as `file:symbol`, where
 * `symbol` is the nearest enclosing binding (a `const X =` assignment or the
 * enclosing hook) or `anonymous`.
 *
 * @param {string} filePath
 * @param {string} content
 * @returns {string[]}
 */
export function findGsapContextsWithoutCleanup(filePath, content) {
    const contextRe = /\b(?:gsap\.context|ScrollTrigger\.create)\s*\(/g;
    const relPath = normalizePath(filePath);
    /** @type {string[]} */
    const results = [];

    if (!contextRe.test(content)) {
        return results;
    }

    // File-level cleanup detection.
    const hasCleanup =
        /\buseGSAP\s*\(/.test(content) ||
        /\.revert\s*\(/.test(content) ||
        /\.kill\s*\(/.test(content) ||
        /ScrollTrigger\.killAll\s*\(/.test(content) ||
        /getAll\s*\(\s*\)\s*\.forEach\s*\(\s*[^)]*\.kill/.test(content);

    if (hasCleanup) {
        return results;
    }

    contextRe.lastIndex = 0;
    let match;
    while ((match = contextRe.exec(content)) !== null) {
        const symbol = nearestBindingName(content, match.index);
        results.push(`${relPath}:${symbol}`);
    }
    return results;
}

/**
 * Find the nearest binding name preceding `index`: the last `const/let/var X =`
 * or `function X(` before the position. Falls back to the enclosing hook name
 * (`useEffect`/`useLayoutEffect`/`useGSAP`) or `anonymous`.
 *
 * @param {string} content
 * @param {number} index
 * @returns {string}
 */
function nearestBindingName(content, index) {
    const before = content.slice(0, index);

    const bindingRe = /\b(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=|\bfunction\s+([A-Za-z_$][\w$]*)\s*\(/g;
    let name = null;
    let m;
    while ((m = bindingRe.exec(before)) !== null) {
        name = m[1] ?? m[2] ?? name;
    }
    if (name) {
        return name;
    }

    const hookRe = /\b(useGSAP|useLayoutEffect|useEffect)\s*\(/g;
    let hook = null;
    let h;
    while ((h = hookRe.exec(before)) !== null) {
        hook = h[1];
    }
    return hook ?? "anonymous";
}

/**
 * Count heavy ScrollTrigger pins (`pin: true`) in the source (Req 12.4).
 *
 * @param {string} content
 * @returns {number}
 */
export function countHeavyPins(content) {
    const re = /\bpin\s*:\s*true\b/g;
    const matches = content.match(re);
    return matches ? matches.length : 0;
}

/** True when `filePath` is the App Router root layout (`src/app/layout.tsx`). */
function isRootLayoutPath(filePath) {
    const normalized = normalizePath(filePath).toLowerCase();
    return /(^|\/)src\/app\/layout\.(?:t|j)sx?$/.test(normalized);
}

/**
 * Loader / page-transition indicators mounted on the root layout (Req 12.5 /
 * 17.5). Mirrors the heuristics in `build-analysis.ts`.
 */
const LOADER_COMPONENT_RE = /<\s*[A-Za-z0-9_]*(?:Loader|Preloader|Splash|IntroSequence|PageTransition|SmoothScroll|Lenis|Barba|LocomotiveScroll)[A-Za-z0-9_]*\b/;
const TRANSITION_IMPORT_RE = /\bfrom\s*["'](?:@barba\/core|barba|swup|locomotive-scroll|lenis|@studio-freight\/lenis|@studio-freight\/react-lenis|next-transition-router|@react-page-transition\/[\w-]+)["']/;

/**
 * True when `filePath` is the root layout AND it mounts a global loader or
 * page-transition system (Req 12.5).
 *
 * @param {string} filePath
 * @param {string} content
 * @returns {boolean}
 */
export function mountsGlobalLoaderOnRootLayout(filePath, content) {
    if (!isRootLayoutPath(filePath)) {
        return false;
    }
    return LOADER_COMPONENT_RE.test(content) || TRANSITION_IMPORT_RE.test(content);
}

/**
 * True when the source references a Reduced_Motion path (Req 12.6):
 * `prefers-reduced-motion`, `prefersReducedMotion`, `useReducedMotion`, or a
 * `matchMedia("(prefers-reduced-motion...")` guard.
 *
 * @param {string} content
 * @returns {boolean}
 */
export function hasReducedMotionPath(content) {
    return (
        /prefers-reduced-motion/i.test(content) ||
        /prefersReducedMotion/.test(content) ||
        /useReducedMotion\s*\(/.test(content)
    );
}

/**
 * Heuristic for LCP text hidden at zero opacity while awaiting a loader
 * (Req 12.1). True only when BOTH a loader gate AND a heading/hero element set
 * to zero opacity (via `opacity: 0`, `autoAlpha: 0`, initial `opacity: 0`, or a
 * `gsap.set(..., { opacity: 0 })`) appear in the same file.
 *
 * @param {string} content
 * @returns {boolean}
 */
export function hasLcpHiddenUnderLoader(content) {
    const hasLoaderGate =
        /\b(?:isLoading|loading|loaded|showLoader|preloader|isReady|complete)\b/i.test(content) &&
        (/<\s*[A-Za-z0-9_]*(?:Loader|Preloader|Splash)[A-Za-z0-9_]*\b/.test(content) ||
            /\b(?:isLoading|loaded|isReady|complete)\b\s*(?:\?|&&)/.test(content));

    if (!hasLoaderGate) {
        return false;
    }

    const hidesText =
        /opacity\s*:\s*0(?![.\d])/.test(content) ||
        /autoAlpha\s*:\s*0(?![.\d])/.test(content) ||
        /initial\s*=\s*\{\{[^}]*opacity\s*:\s*0/.test(content);

    // Only care about hiding when a heading / hero-like target is present.
    const hasHeadingTarget = /<h1\b/i.test(content) || /\bhero\b/i.test(content) || /headingRef/i.test(content);

    return hidesText && hasHeadingTarget;
}

/** Normalize a filesystem path to forward slashes for stable matching. */
function normalizePath(filePath) {
    return filePath.replace(/\\/g, "/");
}

// ---------------------------------------------------------------------------
// Runtime metrics (Lighthouse / Puppeteer + web-vitals-style LCP)
// ---------------------------------------------------------------------------

/**
 * Measure runtime LCP for `url`. Tries Lighthouse, then Puppeteer, then reports
 * the tool as absent (Req 11.4). Never throws — a failed capture is reported as
 * `toolAbsent: true` with no `lcpMs`.
 *
 * @param {string} url
 * @param {{ timeoutMs: number }} opts
 * @returns {Promise<{ lcpMs?: number, toolAbsent: boolean }>}
 */
async function measureRuntime(url, opts) {
    const viaLighthouse = await measureWithLighthouse(url, opts).catch(() => null);
    if (viaLighthouse && typeof viaLighthouse.lcpMs === "number") {
        return { lcpMs: viaLighthouse.lcpMs, toolAbsent: false };
    }

    const viaPuppeteer = await measureWithPuppeteer(url, opts).catch(() => null);
    if (viaPuppeteer && typeof viaPuppeteer.lcpMs === "number") {
        return { lcpMs: viaPuppeteer.lcpMs, toolAbsent: false };
    }

    // No runtime tool available or capture failed → sentinel (Req 11.4).
    return { toolAbsent: true };
}

/**
 * Attempt an LCP measurement via Lighthouse + chrome-launcher. Returns `null`
 * when the tools are not installed (dynamic import throws) or the run yields no
 * LCP.
 *
 * @param {string} url
 * @param {{ timeoutMs: number }} _opts
 * @returns {Promise<{ lcpMs: number } | null>}
 */
async function measureWithLighthouse(url, _opts) {
    let lighthouse;
    let chromeLauncher;
    try {
        lighthouse = (await import("lighthouse")).default;
        chromeLauncher = await import("chrome-launcher");
    } catch {
        return null; // Tool absent.
    }

    let chrome;
    try {
        chrome = await chromeLauncher.launch({
            chromeFlags: ["--headless=new", "--no-sandbox"],
        });
        const result = await lighthouse(
            url,
            { port: chrome.port, onlyCategories: ["performance"], output: "json" },
        );
        const lcp = result?.lhr?.audits?.["largest-contentful-paint"]?.numericValue;
        if (typeof lcp === "number" && Number.isFinite(lcp)) {
            return { lcpMs: Math.round(lcp) };
        }
        return null;
    } finally {
        if (chrome) {
            await chrome.kill().catch(() => { });
        }
    }
}

/**
 * Attempt an LCP measurement via Puppeteer. Boots a headless browser, navigates
 * to `url`, and reads the final `largest-contentful-paint` entry through a
 * `PerformanceObserver` — the same signal `web-vitals` reports. Returns `null`
 * when Puppeteer is not installed or no LCP is observed.
 *
 * @param {string} url
 * @param {{ timeoutMs: number }} opts
 * @returns {Promise<{ lcpMs: number } | null>}
 */
async function measureWithPuppeteer(url, opts) {
    let puppeteer;
    try {
        puppeteer = (await import("puppeteer")).default;
    } catch {
        return null; // Tool absent.
    }

    let browser;
    try {
        browser = await puppeteer.launch({
            headless: true,
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
        });
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: "networkidle0", timeout: opts.timeoutMs });

        const lcpMs = await page.evaluate(
            (settleMs) =>
                new Promise((resolve) => {
                    let last = 0;
                    try {
                        const observer = new PerformanceObserver((list) => {
                            const entries = list.getEntries();
                            const latest = entries[entries.length - 1];
                            if (latest) {
                                last = latest.renderTime || latest.loadTime || latest.startTime || last;
                            }
                        });
                        observer.observe({ type: "largest-contentful-paint", buffered: true });
                        setTimeout(() => {
                            observer.disconnect();
                            resolve(last > 0 ? Math.round(last) : null);
                        }, settleMs);
                    } catch {
                        resolve(null);
                    }
                }),
            Math.min(3000, opts.timeoutMs),
        );

        if (typeof lcpMs === "number" && Number.isFinite(lcpMs)) {
            return { lcpMs };
        }
        return null;
    } finally {
        if (browser) {
            await browser.close().catch(() => { });
        }
    }
}

// ---------------------------------------------------------------------------
// CLI entry
// ---------------------------------------------------------------------------

/**
 * True when this module is executed directly (not imported). Compares the
 * resolved entry path against this file's URL.
 */
function isMain() {
    if (!process.argv[1]) {
        return false;
    }
    return import.meta.url === pathToFileURL(process.argv[1]).href;
}

async function main() {
    const [, , url, sourceDir] = process.argv;
    if (!url) {
        console.error(
            "Usage: node scripts/page-forge/capture-perf.mjs <url> [sourceDir]",
        );
        process.exit(1);
        return;
    }

    const opts = {};
    if (sourceDir) {
        opts.sourceDir = sourceDir;
    }

    const result = await capturePerf(url, opts);
    process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
}

if (isMain()) {
    main().catch((err) => {
        console.error(err instanceof Error ? err.stack ?? err.message : String(err));
        process.exit(1);
    });
}

// Referenced to keep `fileURLToPath` import meaningful for path-based tooling.
export const __filenamePath = fileURLToPath(import.meta.url);
