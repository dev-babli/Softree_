/**
 * Page Forge — viewport evidence capture (`capture-viewport.mjs`).
 *
 * Boots a rendered page URL in a headless browser, iterates the four
 * verification breakpoints (390 / 768 / 1024 / 1440), and produces one
 * `ViewportMeasurement` per section per breakpoint. Screenshots are written as
 * evidence files under the session directory `.planning/page-forge/<slug>/`.
 *
 * The `ViewportMeasurement` shape mirrors `src/lib/page-forge/types.ts`:
 *   { breakpoint, sectionId, scrollWidth, clientWidth, horizontalPaddingPx,
 *     touchTargets:[{w,h,selector}], pinnedAtBreakpoint, columnsCollapsed,
 *     firstPrimaryContentIndex, firstChromeIndex }
 *
 * Tool availability (Req 11.4): Puppeteer lives in devDependencies and may be
 * absent in some environments. This module imports it dynamically inside a
 * try/catch. When the import fails, `captureViewport` returns a sentinel
 * `{ measurements: [], toolAbsent: true }` so the Responsive_Checker records
 * that the check was "performed by inspection, tool absent" rather than
 * failing the run.
 *
 * Correctness of the browser interaction is validated by the integration/smoke
 * test (task 16.3), not by a unit/property test. This file is kept defensive:
 * all page work is wrapped in try/finally so the browser is always closed.
 *
 * Requirements: 11.1, 11.3, 11.4
 */

import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

/** The four verification viewport widths (Req 10.1 / 11.1). */
export const BREAKPOINTS = [390, 768, 1024, 1440];

/**
 * The session directory for a slug, relative to the workspace root. Mirrors
 * `ROOT(slug)` from `src/lib/page-forge/artifacts.ts` so evidence lands beside
 * the phase artifacts.
 */
export const ROOT = (slug) => `.planning/page-forge/${slug}`;

/**
 * Derives a filesystem-safe slug from a page URL when no slug is supplied via
 * `opts`. Falls back to `"page"` for a bare origin.
 */
export function slugFromUrl(url) {
    let pathname = "";
    try {
        pathname = new URL(url).pathname;
    } catch {
        pathname = String(url);
    }
    const cleaned = pathname
        .replace(/^\/+|\/+$/g, "")
        .replace(/[^A-Za-z0-9/_-]+/g, "-")
        .replace(/\//g, "-");
    return cleaned.length > 0 ? cleaned : "page";
}

/**
 * Attempts to load Puppeteer. Returns the module's default export, or `null`
 * when the dependency is not installed in this environment (Req 11.4).
 */
async function loadPuppeteer() {
    try {
        const mod = await import("puppeteer");
        return mod.default ?? mod;
    } catch {
        return null;
    }
}

/**
 * The in-page collector, evaluated inside the browser for a single breakpoint.
 *
 * It is defined as a plain function serialized to the page via
 * `page.evaluate`, so it must not reference anything from the Node scope. It
 * returns one measurement object per discovered section.
 *
 * @param {number} breakpoint the current viewport width
 */
function collectMeasurements(breakpoint) {
    const PRIMARY_SELECTOR = "h1,h2,h3,h4,h5,h6,p,[data-cta],a.cta,button.cta";
    const CHROME_SELECTOR =
        "hr,[data-chrome],[role='separator'],img,video,canvas,svg,[data-decorative]";
    const TOUCH_SELECTOR = "a,button,[role='button'],input,select,textarea";

    /** Parses a CSS pixel length (e.g. "24px") to a number, defaulting to 0. */
    const px = (value) => {
        const n = parseFloat(value || "0");
        return Number.isFinite(n) ? n : 0;
    };

    const sections = Array.from(
        document.querySelectorAll("[data-section], section[id], section[data-section-id]")
    );

    return sections.map((section, index) => {
        const style = window.getComputedStyle(section);
        const paddingLeft = px(style.paddingLeft);
        const paddingRight = px(style.paddingRight);

        // Touch targets: interactive elements and their rendered box size.
        const touchTargets = Array.from(section.querySelectorAll(TOUCH_SELECTOR))
            .map((el) => {
                const rect = el.getBoundingClientRect();
                const tag = el.tagName.toLowerCase();
                const id = el.id ? `#${el.id}` : "";
                return { w: Math.round(rect.width), h: Math.round(rect.height), selector: `${tag}${id}` };
            })
            // Ignore zero-size (hidden) targets so they do not create false findings.
            .filter((t) => t.w > 0 && t.h > 0);

        // Pin state: any descendant (or the section) rendered fixed/sticky, or a
        // ScrollTrigger pin-spacer present within the section.
        const pinnedAtBreakpoint =
            style.position === "fixed" ||
            style.position === "sticky" ||
            section.querySelector(".pin-spacer") !== null ||
            Array.from(section.querySelectorAll("*")).some((el) => {
                const p = window.getComputedStyle(el).position;
                return p === "fixed" || p === "sticky";
            });

        // Column-collapse heuristic: inspect the section's primary layout child.
        // Collapsed when a grid resolves to a single track or a flex row wraps to
        // a column.
        let columnsCollapsed = false;
        const layoutHost =
            section.querySelector("[data-layout], .grid, [style*='grid'], [style*='flex']") ||
            section.firstElementChild;
        if (layoutHost) {
            const ls = window.getComputedStyle(layoutHost);
            if (ls.display.includes("grid")) {
                const tracks = ls.gridTemplateColumns.trim().split(/\s+/).filter(Boolean);
                columnsCollapsed = tracks.length <= 1;
            } else if (ls.display.includes("flex")) {
                columnsCollapsed = ls.flexDirection.startsWith("column");
            }
        }

        // DOM order of primary content vs chrome. -1 means "not present".
        const descendants = Array.from(section.querySelectorAll("*"));
        const firstPrimaryContentIndex = descendants.findIndex((el) => el.matches(PRIMARY_SELECTOR));
        const firstChromeIndex = descendants.findIndex((el) => el.matches(CHROME_SELECTOR));

        const sectionId =
            section.getAttribute("data-section") ||
            section.getAttribute("data-section-id") ||
            section.id ||
            `section-${index}`;

        return {
            breakpoint,
            sectionId,
            scrollWidth: section.scrollWidth,
            clientWidth: section.clientWidth,
            horizontalPaddingPx: Math.min(paddingLeft, paddingRight),
            touchTargets,
            pinnedAtBreakpoint,
            columnsCollapsed,
            firstPrimaryContentIndex,
            firstChromeIndex,
        };
    });
}

/**
 * Captures per-section viewport measurements for a rendered page across all
 * four breakpoints.
 *
 * @param {string} url the rendered page URL (dev/preview server)
 * @param {object} [opts]
 * @param {string} [opts.slug] session slug; derived from the URL path when omitted
 * @param {number} [opts.timeout] navigation timeout in ms (default 120000)
 * @param {boolean} [opts.screenshots] write per-breakpoint screenshots (default true)
 * @returns {Promise<{ measurements: import('../../src/lib/page-forge/types').ViewportMeasurement[], toolAbsent: boolean }>}
 */
export async function captureViewport(url, opts = {}) {
    const puppeteer = await loadPuppeteer();
    if (!puppeteer) {
        // Tool absent: return the sentinel so the checker records inspection-only
        // evidence and notes the missing tool (Req 11.4).
        return { measurements: [], toolAbsent: true };
    }

    const slug = opts.slug || slugFromUrl(url);
    const timeout = opts.timeout ?? 120000;
    const writeScreenshots = opts.screenshots !== false;
    const evidenceDir = resolve(process.cwd(), ROOT(slug));

    /** @type {import('../../src/lib/page-forge/types').ViewportMeasurement[]} */
    const measurements = [];

    let browser;
    try {
        browser = await puppeteer.launch({ headless: true });

        if (writeScreenshots) {
            await mkdir(evidenceDir, { recursive: true });
        }

        for (const breakpoint of BREAKPOINTS) {
            const page = await browser.newPage();
            try {
                await page.setViewport({ width: breakpoint, height: 900, deviceScaleFactor: 1 });
                await page.goto(url, { waitUntil: "networkidle2", timeout });
                await page.evaluate(() => window.scrollTo(0, 0));

                const perBreakpoint = await page.evaluate(collectMeasurements, breakpoint);
                measurements.push(...perBreakpoint);

                if (writeScreenshots) {
                    const shotPath = resolve(evidenceDir, `viewport-${breakpoint}.png`);
                    await page.screenshot({ path: shotPath, fullPage: true });
                }
            } finally {
                await page.close();
            }
        }
    } finally {
        if (browser) {
            await browser.close();
        }
    }

    return { measurements, toolAbsent: false };
}

// ---------------------------------------------------------------------------
// CLI entry: `node scripts/page-forge/capture-viewport.mjs <url> [slug]`
// ---------------------------------------------------------------------------

function isMain() {
    const invoked = process.argv[1] ? pathToFileURL(process.argv[1]).href : "";
    return import.meta.url === invoked;
}

if (isMain()) {
    const [, , url, slug] = process.argv;
    if (!url) {
        console.error("Usage: node scripts/page-forge/capture-viewport.mjs <url> [slug]");
        process.exit(1);
    }
    captureViewport(url, slug ? { slug } : undefined)
        .then((result) => {
            process.stdout.write(JSON.stringify(result, null, 2) + "\n");
        })
        .catch((err) => {
            console.error(err instanceof Error ? err.stack : String(err));
            process.exit(1);
        });
}
