/**
 * extract-kore-assets.mjs
 *
 * Build-time Source_Document asset audit for the Kore homepage clone.
 *
 * Reads `public/kore-source-sections.html` and extracts every distinct asset
 * URL referenced by:
 *   - <img src>, <img srcset>
 *   - <source src>, <source srcset>
 *   - <video src>, <video poster>
 *   - <a href> when the URL host is cdn.prod.website-files.com
 *   - data-rive-src attributes
 *   - <link href> when rel is preload/icon/apple-touch-icon/shortcut icon
 *     /stylesheet (font / icon / theme CSS only)
 *   - inline style="..."  url(...)  references
 *   - <style> block        url(...)  references
 *
 * Each URL is bucketed under the Page_Section where its first occurrence
 * lives (line-range based; cheap and accurate for the well-formed Webflow
 * output). The output is a deterministic JSON inventory at
 * `scripts/.kore-asset-inventory.json` of shape:
 *
 *   {
 *     "<section>": {
 *       "<id>": { url, kind, ext, basename, sources, fallback? }
 *     },
 *     ...
 *   }
 *
 * Classification:
 *   - kind="cdn-passthrough" when host === "cdn.prod.website-files.com"
 *   - kind="local"           otherwise
 *
 * Rive (.riv) entries are emitted as both a cdn-passthrough entry and an
 * additional `fallback` LocalAsset under /kore/rive/<basename>.riv.
 *
 * Flags:
 *   --download-locals  Download every entry classified as "local" plus every
 *                      .riv fallback into public/kore/<section>/<file>.<ext>
 *                      (and public/kore/rive/<file>.riv). Idempotent: skips
 *                      files that already exist with a non-zero byte length.
 *                      (Used by task 1.8.)
 *
 * Idempotence: re-running over the same source produces a byte-identical
 * inventory JSON. Achieved by sorting every section's entries by id and
 * inserting top-level keys in a fixed order before stringifying.
 *
 * Used as the input for `src/components/kore/assets.ts` (Requirements 24.1,
 * 24.2, 24.3, 24.4, 24.5).
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const SOURCE_HTML = path.join(ROOT, 'public', 'kore-source-sections.html');
const OUTPUT_JSON = path.join(__dirname, '.kore-asset-inventory.json');
const PUBLIC_KORE = path.join(ROOT, 'public', 'kore');

// ---------------------------------------------------------------------------
// Section line ranges (derived from boundary scan of the Source_Document body)
// ---------------------------------------------------------------------------
//
// Section keys map to the Page_Section names in design.md. `shared` is used
// for assets that live outside any section root (head-level <link> tags,
// tracking pixels, CSS-block url(...) refs in <style> blocks).
//
// Order matters: ranges are evaluated top-to-bottom, first match wins.

const SECTION_RANGES = [
    { key: 'navigation', start: 2153, end: 3815 },
    { key: 'topStrip', start: 3817, end: 3823 },
    { key: 'hero', start: 3824, end: 4101 },
    { key: 'industryTabs', start: 4102, end: 4742 },
    { key: 'businessOutcomes', start: 4743, end: 6720 },
    { key: 'analystRecognition', start: 6721, end: 6973 },
    { key: 'testimonials', start: 6974, end: 7320 },
    { key: 'strategicPartners', start: 7321, end: 7490 },
    { key: 'aiInsights', start: 7491, end: 7652 },
    { key: 'modals', start: 7653, end: 7811 },
    { key: 'preFooterCta', start: 7812, end: 8025 },
    { key: 'footer', start: 8026, end: 8522 },
];

const SECTION_KEYS_ORDER = [
    'shared',
    'navigation',
    'topStrip',
    'hero',
    'industryTabs',
    'businessOutcomes',
    'analystRecognition',
    'testimonials',
    'strategicPartners',
    'aiInsights',
    'preFooterCta',
    'footer',
    'modals',
    'chatbot',
    'loader',
];

function sectionForLine(line) {
    for (const r of SECTION_RANGES) {
        if (line >= r.start && line <= r.end) return r.key;
    }
    return 'shared';
}

// ---------------------------------------------------------------------------
// Build a line-offset table for fast char-index → line-number lookup
// ---------------------------------------------------------------------------

function buildLineIndex(source) {
    const lineStarts = [0];
    for (let i = 0; i < source.length; i++) {
        if (source.charCodeAt(i) === 10 /* \n */) lineStarts.push(i + 1);
    }
    return (offset) => {
        // binary search
        let lo = 0;
        let hi = lineStarts.length - 1;
        while (lo < hi) {
            const mid = (lo + hi + 1) >>> 1;
            if (lineStarts[mid] <= offset) lo = mid;
            else hi = mid - 1;
        }
        return lo + 1; // 1-indexed line number
    };
}

// ---------------------------------------------------------------------------
// HTML entity decode (just the few we expect in attribute values)
// ---------------------------------------------------------------------------

function decodeEntities(s) {
    return s
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&apos;/g, "'");
}

// ---------------------------------------------------------------------------
// Asset URL filter — what looks like an actual fetchable asset?
// ---------------------------------------------------------------------------

const ASSET_EXT_RE =
    /\.(png|jpg|jpeg|webp|avif|gif|svg|ico|riv|mp4|webm|mp3|wav|ogg|woff|woff2|ttf|otf|eot|css|json|pdf)(?:$|\?|#)/i;

const CDN_HOST = 'cdn.prod.website-files.com';

// Out_Of_Scope third-party hosts (tracking pixels, analytics, A/B,
// HubSpot, Intellimize, vidstack, etc.) — referenced in Source_Document
// but explicitly excluded from Clone_Page per Requirement 1.4 and the
// Out_Of_Scope_Scripts glossary entry.
const OUT_OF_SCOPE_HOSTS = new Set([
    'aorta.clickagy.com',
    'tags.clickagy.com',
    'snap.licdn.com',
    'js.hs-analytics.net',
    'js.hs-banner.com',
    'js.hubspot.com',
    'js.hsadspixel.net',
    'js.hs-scripts.com',
    'js.adsrvr.org',
    'insight.adsrvr.org',
    'www.googletagmanager.com',
    'googleads.g.doubleclick.net',
    'scripts.clarity.ms',
    'www.clarity.ms',
    'tracking-api.g2.com',
    'cdn.intellimize.co',
    'api.intellimize.co',
    'log.intellimize.co',
    '117417219.intellimizeio.com',
    'cdn.vidstack.io',
    'cdn.jsdelivr.net',
    'js.zi-scripts.com',
    'analytics.o11.tech',
    'ajax.googleapis.com',
]);

/** Heuristic: is `u` an asset URL we should record? */
function looksLikeAsset(u) {
    if (!u) return false;
    if (u.startsWith('data:') || u.startsWith('javascript:')) return false;
    if (u.startsWith('#')) return false;
    if (u.startsWith('mailto:') || u.startsWith('tel:')) return false;
    // Drop Out_Of_Scope third-party hosts entirely (Req 1.4).
    const host = urlHost(u);
    if (OUT_OF_SCOPE_HOSTS.has(host)) return false;
    // CDN_Passthrough origin always counts as an asset.
    if (host === CDN_HOST) return true;
    // Otherwise require a recognised media/font/style extension.
    return ASSET_EXT_RE.test(u);
}

function urlHost(u) {
    try {
        return new URL(u, 'https://__placeholder__/').host;
    } catch {
        return '';
    }
}

function classifyKind(u) {
    return urlHost(u) === CDN_HOST ? 'cdn-passthrough' : 'local';
}

// ---------------------------------------------------------------------------
// Filename / id derivation
// ---------------------------------------------------------------------------

function basenameFromUrl(u) {
    let pathname;
    try {
        pathname = new URL(u, 'https://__placeholder__/').pathname;
    } catch {
        pathname = u.split('?')[0].split('#')[0];
    }
    let last = pathname.split('/').pop() || '';
    last = decodeURIComponent(last);
    return last;
}

function extFromBasename(b) {
    const m = b.match(/\.([a-zA-Z0-9]+)$/);
    return m ? m[1].toLowerCase() : '';
}

function kebabCase(s) {
    return s
        .replace(/[%]20/g, '-')
        .replace(/[\s_]+/g, '-')
        .replace(/[^a-zA-Z0-9.\-]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '')
        .toLowerCase();
}

/** Kebab-cased basename for Local_Asset filesystem paths (Req 24.3). */
function kebabBasename(basename) {
    const ext = extFromBasename(basename);
    const stem = ext ? basename.slice(0, -1 - ext.length) : basename;
    const kebabStem = kebabCase(stem);
    return ext ? `${kebabStem}.${ext}` : kebabStem;
}

/** Derive the manifest entry key from the asset basename. */
function idFromBasename(basename) {
    const ext = extFromBasename(basename);
    const stem = ext
        ? basename.slice(0, -1 - ext.length)
        : basename;
    const kebab = kebabCase(stem);
    return ext ? `${kebab}-${ext}` : kebab;
}

// ---------------------------------------------------------------------------
// Extraction passes
// ---------------------------------------------------------------------------

/**
 * @typedef {Object} Hit
 * @property {string} url
 * @property {number} offset
 * @property {string} source   // 'img-src' | 'img-srcset' | etc.
 */

/** Match an attribute value (handles both quoted and unquoted). */
function attrValueRe(name) {
    return new RegExp(
        `\\s${name}\\s*=\\s*"([^"]*)"|\\s${name}\\s*=\\s*'([^']*)'`,
        'gi',
    );
}

/** Yield every `<tag ...>` opening tag with its source offset and inner attr block. */
function* iterTags(html, tagName) {
    // Match opening tags only; tagName can be a regex alternation like `img|source`.
    const re = new RegExp(
        `<(${tagName})\\b([^>]*?)/?>`,
        'gi',
    );
    let m;
    while ((m = re.exec(html)) !== null) {
        yield { tag: m[1].toLowerCase(), attrs: m[2], offset: m.index };
    }
}

function readAttr(attrs, name) {
    const re = new RegExp(
        `\\s${name}\\s*=\\s*"([^"]*)"|\\s${name}\\s*=\\s*'([^']*)'`,
        'i',
    );
    const m = re.exec(' ' + attrs);
    if (!m) return undefined;
    const raw = m[1] !== undefined ? m[1] : m[2];
    return raw === undefined ? undefined : decodeEntities(raw);
}

function splitSrcset(value) {
    // "<url> <descriptor>, <url> <descriptor>, ..."
    return value
        .split(',')
        .map((part) => part.trim())
        .filter(Boolean)
        .map((part) => {
            // URL is everything up to the first whitespace.
            const ws = part.search(/\s/);
            return ws === -1 ? part : part.slice(0, ws);
        })
        .filter(Boolean);
}

function extractTagAssets(html) {
    /** @type {Hit[]} */
    const hits = [];

    // <img>, <source>, <video>
    for (const { tag, attrs, offset } of iterTags(html, 'img|source|video')) {
        const src = readAttr(attrs, 'src');
        if (src && looksLikeAsset(src)) {
            hits.push({ url: src, offset, source: `${tag}-src` });
        }
        const srcset = readAttr(attrs, 'srcset');
        if (srcset) {
            for (const u of splitSrcset(srcset)) {
                if (looksLikeAsset(u)) {
                    hits.push({ url: u, offset, source: `${tag}-srcset` });
                }
            }
        }
        if (tag === 'video') {
            const poster = readAttr(attrs, 'poster');
            if (poster && looksLikeAsset(poster)) {
                hits.push({ url: poster, offset, source: 'video-poster' });
            }
        }
    }

    // <a href> — only when host is the CDN
    for (const { attrs, offset } of iterTags(html, 'a')) {
        const href = readAttr(attrs, 'href');
        if (href && href.includes(CDN_HOST) && looksLikeAsset(href)) {
            hits.push({ url: href, offset, source: 'a-href' });
        }
    }

    // <link href> — only relevant rels (font / icon / preload / stylesheet)
    const RELEVANT_RELS = new Set([
        'stylesheet',
        'icon',
        'shortcut icon',
        'apple-touch-icon',
        'preload',
        'preconnect',
        'mask-icon',
    ]);
    for (const { attrs, offset } of iterTags(html, 'link')) {
        const rel = (readAttr(attrs, 'rel') || '').trim().toLowerCase();
        if (!RELEVANT_RELS.has(rel)) continue;
        const href = readAttr(attrs, 'href');
        if (!href) continue;
        // preconnect tags reference origins, not assets — skip.
        if (rel === 'preconnect') continue;
        if (looksLikeAsset(href)) {
            hits.push({ url: href, offset, source: `link-${rel.replace(/\s+/g, '-')}` });
        }
    }

    // data-rive-src on any element
    {
        const re = /\sdata-rive-src\s*=\s*"([^"]*)"|\sdata-rive-src\s*=\s*'([^']*)'/gi;
        let m;
        while ((m = re.exec(html)) !== null) {
            const raw = m[1] !== undefined ? m[1] : m[2];
            const url = decodeEntities(raw);
            if (looksLikeAsset(url)) {
                hits.push({ url, offset: m.index, source: 'data-rive-src' });
            }
        }
    }

    return hits;
}

function extractCssUrlAssetsFromInlineStyles(html) {
    /** @type {Hit[]} */
    const hits = [];
    const styleRe = /\sstyle\s*=\s*"([^"]*)"|\sstyle\s*=\s*'([^']*)'/gi;
    let m;
    while ((m = styleRe.exec(html)) !== null) {
        const raw = m[1] !== undefined ? m[1] : m[2];
        if (!raw) continue;
        const decoded = decodeEntities(raw);
        const inner = decoded;
        const urlRe = /url\(\s*['"]?([^'")]+)['"]?\s*\)/gi;
        let u;
        while ((u = urlRe.exec(inner)) !== null) {
            const url = u[1];
            if (looksLikeAsset(url)) {
                hits.push({ url, offset: m.index, source: 'inline-style-url' });
            }
        }
    }
    return hits;
}

function extractCssUrlAssetsFromStyleBlocks(html) {
    /** @type {Hit[]} */
    const hits = [];
    const blockRe = /<style\b[^>]*>([\s\S]*?)<\/style>/gi;
    let m;
    while ((m = blockRe.exec(html)) !== null) {
        const css = m[1];
        const blockOffset = m.index;
        const urlRe = /url\(\s*['"]?([^'")]+)['"]?\s*\)/gi;
        let u;
        while ((u = urlRe.exec(css)) !== null) {
            const url = u[1].trim();
            if (looksLikeAsset(url)) {
                hits.push({
                    url,
                    offset: blockOffset + (u.index || 0),
                    source: 'style-block-url',
                });
            }
        }
    }
    return hits;
}

// ---------------------------------------------------------------------------
// Aggregation
// ---------------------------------------------------------------------------

/**
 * @typedef {Object} ManifestEntry
 * @property {string} url
 * @property {'cdn-passthrough'|'local'} kind
 * @property {string} basename
 * @property {string} ext
 * @property {string[]} sources    // distinct extraction-source labels
 * @property {LocalFallback=} fallback
 */

/**
 * @typedef {Object} LocalFallback
 * @property {'local'} kind
 * @property {string} url
 * @property {string} basename
 * @property {string} ext
 */

function aggregate(html, lineOf) {
    const allHits = [
        ...extractTagAssets(html),
        ...extractCssUrlAssetsFromInlineStyles(html),
        ...extractCssUrlAssetsFromStyleBlocks(html),
    ];

    // Map url -> { firstOffset, sources:Set, hits[] }
    const byUrl = new Map();
    for (const h of allHits) {
        const cur = byUrl.get(h.url);
        if (!cur || h.offset < cur.firstOffset) {
            const sources = cur ? cur.sources : new Set();
            sources.add(h.source);
            byUrl.set(h.url, { firstOffset: h.offset, sources });
        } else {
            cur.sources.add(h.source);
        }
    }

    // Build per-section, per-id entries.
    /** @type {Record<string, Record<string, ManifestEntry>>} */
    const inventory = {};
    for (const key of SECTION_KEYS_ORDER) inventory[key] = {};

    // Track id collisions per section: append `-2`, `-3`, ... if needed.
    const usedIds = new Map(); // section -> Map(id -> count)
    function reserveId(section, baseId) {
        let map = usedIds.get(section);
        if (!map) {
            map = new Map();
            usedIds.set(section, map);
        }
        const n = (map.get(baseId) || 0) + 1;
        map.set(baseId, n);
        return n === 1 ? baseId : `${baseId}-${n}`;
    }

    for (const [url, { firstOffset, sources }] of byUrl) {
        const section = sectionForLine(lineOf(firstOffset));
        const basename = basenameFromUrl(url);
        const ext = extFromBasename(basename);
        const baseId = idFromBasename(basename) || 'asset';
        const id = reserveId(section, baseId);
        const kind = classifyKind(url);
        /** @type {ManifestEntry} */
        const entry = {
            url,
            kind,
            basename,
            ext,
            sources: [...sources].sort(),
        };
        // Rive-on-CDN: emit a local fallback in /kore/rive/.
        if (ext === 'riv' && kind === 'cdn-passthrough') {
            const kebab = kebabBasename(basename);
            entry.fallback = {
                kind: 'local',
                url: `/kore/rive/${kebab}`,
                basename: kebab,
                ext,
            };
        }
        inventory[section][id] = entry;
    }

    return inventory;
}

// ---------------------------------------------------------------------------
// Deterministic JSON emit
// ---------------------------------------------------------------------------

function sortInventory(inv) {
    /** @type {Record<string, Record<string, ManifestEntry>>} */
    const out = {};
    for (const section of SECTION_KEYS_ORDER) {
        const bucket = inv[section] || {};
        const ids = Object.keys(bucket).sort();
        if (ids.length === 0) continue;
        const sorted = {};
        for (const id of ids) sorted[id] = bucket[id];
        out[section] = sorted;
    }
    return out;
}

function emit(inventory) {
    const sorted = sortInventory(inventory);
    const json = JSON.stringify(sorted, null, 2) + '\n';
    fs.writeFileSync(OUTPUT_JSON, json);
    return sorted;
}

// ---------------------------------------------------------------------------
// Local download (idempotent, used by task 1.8 via --download-locals)
// ---------------------------------------------------------------------------

async function downloadLocals(inventory) {
    fs.mkdirSync(PUBLIC_KORE, { recursive: true });

    const targets = [];
    for (const [section, bucket] of Object.entries(inventory)) {
        for (const [id, entry] of Object.entries(bucket)) {
            if (entry.kind === 'local') {
                targets.push({
                    sourceUrl: entry.url.startsWith('http')
                        ? entry.url
                        : null, // workspace-relative locals have no remote source
                    section,
                    id,
                    basename: entry.basename,
                    destPath: path.join(PUBLIC_KORE, section, entry.basename),
                });
            }
            if (entry.fallback) {
                // Use the kebab-cased fallback basename so the on-disk path
                // matches `entry.fallback.url` exactly (Req 24.3, 24.4).
                targets.push({
                    sourceUrl: entry.url, // download the riv from CDN to /kore/rive/
                    section: 'rive',
                    id,
                    basename: entry.fallback.basename,
                    destPath: path.join(
                        PUBLIC_KORE,
                        'rive',
                        entry.fallback.basename,
                    ),
                });
            }
        }
    }

    let downloaded = 0;
    let skipped = 0;
    let failed = 0;

    for (const t of targets) {
        if (!t.sourceUrl) {
            // No remote — can't download. Caller is expected to stage manually.
            continue;
        }
        try {
            fs.mkdirSync(path.dirname(t.destPath), { recursive: true });
            if (fs.existsSync(t.destPath) && fs.statSync(t.destPath).size > 0) {
                skipped++;
                continue;
            }
            const res = await fetch(t.sourceUrl);
            if (!res.ok) {
                console.warn(
                    `[extract-kore-assets] HTTP ${res.status} for ${t.sourceUrl}`,
                );
                failed++;
                continue;
            }
            const buf = Buffer.from(await res.arrayBuffer());
            fs.writeFileSync(t.destPath, buf);
            downloaded++;
        } catch (err) {
            console.warn(
                `[extract-kore-assets] Download failed for ${t.sourceUrl}: ${err.message}`,
            );
            failed++;
        }
    }

    console.log(
        `[extract-kore-assets] download: downloaded=${downloaded} skipped=${skipped} failed=${failed}`,
    );
}

// ---------------------------------------------------------------------------
// assets.ts authoring (--emit-ts)
//
// Writes `src/components/kore/assets.ts` from the inventory. Idempotent: same
// inventory → byte-identical .ts output (entries sorted by id, sections in a
// fixed order).
// ---------------------------------------------------------------------------

const ASSETS_TS_PATH = path.join(
    ROOT,
    'src',
    'components',
    'kore',
    'assets.ts',
);

/** TS-quote a string literal with backslash + double-quote escapes. */
function tsString(s) {
    return JSON.stringify(s);
}

/** Render one ManifestEntry as a TypeScript object literal. */
function renderEntry(entry, indent) {
    const pad = ' '.repeat(indent);
    const lines = [`${pad}{`];
    lines.push(`${pad}    kind: ${tsString(entry.kind)},`);
    lines.push(`${pad}    url: ${tsString(entry.url)},`);
    if (entry.fallback) {
        lines.push(`${pad}    fallback: {`);
        lines.push(`${pad}        kind: 'local',`);
        lines.push(`${pad}        url: ${tsString(entry.fallback.url)},`);
        lines.push(`${pad}    },`);
    }
    lines.push(`${pad}}`);
    return lines.join('\n');
}

/** TS object key — bare when valid identifier, else quoted. */
function tsKey(k) {
    if (/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(k)) return k;
    return tsString(k);
}

function emitAssetsTs(inventory) {
    const header = `/**
 * Asset_Manifest for the Kore.ai homepage clone.
 *
 * SOURCE OF TRUTH: scripts/.kore-asset-inventory.json
 *   - generated by scripts/extract-kore-assets.mjs from public/kore-source-sections.html
 *   - this module's leaf values mirror that inventory verbatim
 *
 * Every CDN_Passthrough_Asset URL is preserved byte-for-byte from
 * Source_Document including scheme, host, path, query, fragment, and
 * percent-encoding (Requirement 24.2).
 *
 * Each .riv asset is emitted as a CDN_Passthrough_Asset with an additional
 * \`fallback\` field referencing a Local_Asset under \`/kore/rive/\` (Requirement
 * 24.4). The local fallback files are staged under \`public/kore/rive/\` by
 * \`scripts/extract-kore-assets.mjs --download-locals\` (task 1.8).
 *
 * REQUIREMENTS COVERED: 24.1, 24.2, 24.3, 24.4, 24.5
 *
 * THIS FILE IS AUTHORED BY \`scripts/extract-kore-assets.mjs --emit-ts\`.
 * Re-run that command after editing the inventory; do not hand-edit leaves.
 */

export type AssetKind = 'cdn-passthrough' | 'local';

export interface CdnPassthroughAsset {
    readonly kind: 'cdn-passthrough';
    readonly url: \`https://cdn.prod.website-files.com/\${string}\`;
    readonly fallback?: LocalAsset; // for .riv files (Req 24.4)
}

export interface LocalAsset {
    readonly kind: 'local';
    readonly url: \`/kore/\${string}\`;
}

export type AssetRef = CdnPassthroughAsset | LocalAsset;

/**
 * Image-specific extension fields applied to an AssetRef.
 *
 * Modelled as an intersection (\`AssetRef & ImageAssetMeta\`) because
 * \`AssetRef\` is a discriminated union and TypeScript cannot \`extend\` a union
 * directly. The shape matches the design document spec.
 */
export interface ImageAssetMeta {
    readonly width?: number;
    readonly height?: number;
    readonly loading?: 'lazy' | 'eager';
    readonly decoding?: 'async' | 'sync' | 'auto';
    readonly srcset?: string;
    readonly sizes?: string;
    readonly alt: string;
}

export type ImageAssetRef = AssetRef & ImageAssetMeta;

export interface VideoAssetRef {
    readonly src: AssetRef;
    readonly poster?: AssetRef;
    readonly autoplay: boolean;
    readonly loop: boolean;
    readonly muted: boolean;
    readonly playsInline: boolean;
}
`;

    const lines = [header, '', 'export const assets = {'];
    for (const section of SECTION_KEYS_ORDER) {
        const bucket = inventory[section];
        if (!bucket || Object.keys(bucket).length === 0) continue;
        lines.push(`    ${section}: {`);
        for (const id of Object.keys(bucket)) {
            const e = bucket[id];
            lines.push(`        ${tsKey(id)}: ${renderEntry(e, 8).trimStart()},`);
        }
        lines.push(`    },`);
    }
    lines.push('} as const satisfies Record<string, Record<string, AssetRef>>;');
    lines.push('');

    const out = lines.join('\n');
    fs.mkdirSync(path.dirname(ASSETS_TS_PATH), { recursive: true });
    fs.writeFileSync(ASSETS_TS_PATH, out);
    console.log(`[extract-kore-assets] Wrote assets.ts: ${ASSETS_TS_PATH}`);
}

async function main() {
    if (!fs.existsSync(SOURCE_HTML)) {
        console.error(
            `[extract-kore-assets] Source HTML not found: ${SOURCE_HTML}`,
        );
        process.exit(1);
    }

    const html = fs.readFileSync(SOURCE_HTML, 'utf8');
    const lineOf = buildLineIndex(html);
    const inventory = aggregate(html, lineOf);
    const sorted = emit(inventory);

    // Summary
    let total = 0;
    let cdn = 0;
    let local = 0;
    let riv = 0;
    const perSection = {};
    for (const [section, bucket] of Object.entries(sorted)) {
        const n = Object.keys(bucket).length;
        perSection[section] = n;
        total += n;
        for (const e of Object.values(bucket)) {
            if (e.kind === 'cdn-passthrough') cdn++;
            else local++;
            if (e.ext === 'riv') riv++;
        }
    }
    console.log(
        `[extract-kore-assets] Wrote inventory: ${OUTPUT_JSON} (${total} entries)`,
    );
    console.log(`[extract-kore-assets] cdn-passthrough=${cdn} local=${local} riv=${riv}`);
    console.log(
        '[extract-kore-assets] per section:',
        Object.entries(perSection)
            .map(([k, v]) => `${k}=${v}`)
            .join(' '),
    );

    if (process.argv.includes('--emit-ts')) {
        emitAssetsTs(sorted);
    }

    if (process.argv.includes('--download-locals')) {
        await downloadLocals(sorted);
    }
}

main().catch((err) => {
    console.error('[extract-kore-assets] Fatal:', err);
    process.exit(1);
});
