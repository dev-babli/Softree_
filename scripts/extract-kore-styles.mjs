/**
 * extract-softree-styles.mjs
 *
 * Build-time Source_Document style audit for the Kore homepage clone.
 *
 * Reads `public/softree-source-sections.html`, walks every `<style>` block plus
 * every inline `style="..."` attribute, and emits a JSON inventory of distinct
 * style values bucketed by category (colors, fontFamilies, fontSizes,
 * fontWeights, lineHeights, letterSpacings, spacing, radii, shadows, durations,
 * easings, zIndices, breakpoints).
 *
 * Output: `scripts/.softree-style-inventory.json`
 *
 * Idempotence: re-running over the same source emits a byte-identical JSON.
 * This is achieved by sorting every bucket deterministically and inserting
 * keys in a fixed order before stringifying.
 *
 * Used as the input for `src/components/softree-marketing-ui/tokens.ts` and
 * `src/components/softree-marketing-ui/tokens.css` authoring (Requirements 22.1, 22.2, 22.3,
 * 22.4, 22.5).
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import postcss from 'postcss';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const SOURCE_HTML = path.join(ROOT, 'public', 'kore-source-sections.html');
const OUTPUT_JSON = path.join(__dirname, '.softree-style-inventory.json');

// ---------------------------------------------------------------------------
// Property → bucket mapping
// ---------------------------------------------------------------------------

const FONT_FAMILY_PROPS = new Set(['font-family']);
const FONT_SIZE_PROPS = new Set(['font-size']);
const FONT_WEIGHT_PROPS = new Set(['font-weight']);
const LINE_HEIGHT_PROPS = new Set(['line-height']);
const LETTER_SPACING_PROPS = new Set(['letter-spacing']);

const SPACING_PROPS = new Set([
    'margin',
    'margin-top',
    'margin-right',
    'margin-bottom',
    'margin-left',
    'margin-inline',
    'margin-inline-start',
    'margin-inline-end',
    'margin-block',
    'margin-block-start',
    'margin-block-end',
    'padding',
    'padding-top',
    'padding-right',
    'padding-bottom',
    'padding-left',
    'padding-inline',
    'padding-inline-start',
    'padding-inline-end',
    'padding-block',
    'padding-block-start',
    'padding-block-end',
    'gap',
    'row-gap',
    'column-gap',
    'grid-gap',
    'grid-row-gap',
    'grid-column-gap',
    'top',
    'right',
    'bottom',
    'left',
    'inset',
    'inset-block',
    'inset-block-start',
    'inset-block-end',
    'inset-inline',
    'inset-inline-start',
    'inset-inline-end',
    'width',
    'height',
    'min-width',
    'min-height',
    'max-width',
    'max-height',
    'flex-basis',
]);

const RADIUS_PROPS = new Set([
    'border-radius',
    'border-top-left-radius',
    'border-top-right-radius',
    'border-bottom-left-radius',
    'border-bottom-right-radius',
    'border-start-start-radius',
    'border-start-end-radius',
    'border-end-start-radius',
    'border-end-end-radius',
]);

const SHADOW_PROPS = new Set(['box-shadow', 'text-shadow']);

const TIMING_PROPS = new Set([
    'transition',
    'transition-duration',
    'transition-delay',
    'transition-timing-function',
    'animation',
    'animation-duration',
    'animation-delay',
    'animation-timing-function',
]);

// ---------------------------------------------------------------------------
// Buckets
// ---------------------------------------------------------------------------

const BUCKET_KEYS = [
    'colors',
    'fontFamilies',
    'fontSizes',
    'fontWeights',
    'lineHeights',
    'letterSpacings',
    'spacing',
    'radii',
    'shadows',
    'durations',
    'easings',
    'zIndices',
    'breakpoints',
];

/** @returns {Record<string, Set<string|number>>} */
function emptyBuckets() {
    return Object.fromEntries(BUCKET_KEYS.map((k) => [k, new Set()]));
}

const buckets = emptyBuckets();

// ---------------------------------------------------------------------------
// Value extractors
// ---------------------------------------------------------------------------

const HEX_RE = /#[0-9a-fA-F]{3,8}\b/g;
const COLOR_FN_RE =
    /\b(?:rgba?|hsla?|hwb|oklch|oklab|lab|lch|color)\(\s*[^()]*?\)/gi;
const NAMED_COLOR_RE = /\b(?:transparent|currentcolor)\b/gi;

const DURATION_RE =
    /(?<![\w-])(-?\d*\.?\d+)(ms|s)\b(?!-)/gi;

const EASING_FN_RE = /\b(?:cubic-bezier|steps)\(\s*[^()]*?\)/gi;

const EASING_KEYWORDS = new Set([
    'linear',
    'ease',
    'ease-in',
    'ease-out',
    'ease-in-out',
    'step-start',
    'step-end',
]);

const LENGTH_TOKEN_RE =
    /(?<![\w.-])(-?\d*\.?\d+)(px|rem|em|%|vh|vw|svh|svw|lvh|lvw|dvh|dvw|ch|ex|cm|mm|in|pt|pc|fr|vmin|vmax)\b/gi;

const UNITLESS_ZERO_RE = /(?<![\w.-])0(?![\w.])/g;

/** Extract all color tokens from a CSS value. */
function extractColors(value) {
    const out = [];
    let m;
    HEX_RE.lastIndex = 0;
    while ((m = HEX_RE.exec(value)) !== null) {
        out.push(m[0].toLowerCase());
    }
    COLOR_FN_RE.lastIndex = 0;
    while ((m = COLOR_FN_RE.exec(value)) !== null) {
        out.push(normalizeWhitespace(m[0]).toLowerCase());
    }
    NAMED_COLOR_RE.lastIndex = 0;
    while ((m = NAMED_COLOR_RE.exec(value)) !== null) {
        out.push(m[0].toLowerCase());
    }
    return out;
}

/** Extract all `<num>(s|ms)` durations from a CSS value, preserved as-written. */
function extractDurations(value) {
    const out = [];
    let m;
    DURATION_RE.lastIndex = 0;
    while ((m = DURATION_RE.exec(value)) !== null) {
        out.push(`${m[1]}${m[2].toLowerCase()}`);
    }
    return out;
}

/** Extract `cubic-bezier(...)` and `steps(...)` easing function calls. */
function extractEasingFunctions(value) {
    const out = [];
    let m;
    EASING_FN_RE.lastIndex = 0;
    while ((m = EASING_FN_RE.exec(value)) !== null) {
        out.push(normalizeWhitespace(m[0]).toLowerCase());
    }
    return out;
}

/** Extract bare easing keywords from transition/animation values. */
function extractEasingKeywords(value) {
    const out = [];
    const tokens = value.split(/[\s,]+/).map((t) => t.trim().toLowerCase()).filter(Boolean);
    for (const t of tokens) {
        if (EASING_KEYWORDS.has(t)) out.push(t);
    }
    return out;
}

/** Extract length tokens (number + unit) from a CSS value. */
function extractLengthTokens(value) {
    const out = [];
    let m;
    LENGTH_TOKEN_RE.lastIndex = 0;
    while ((m = LENGTH_TOKEN_RE.exec(value)) !== null) {
        out.push(`${m[1]}${m[2].toLowerCase()}`);
    }
    return out;
}

/** Extract length tokens plus unitless `0` (which is a valid length). */
function extractLengthsWithZero(value) {
    const out = extractLengthTokens(value);
    UNITLESS_ZERO_RE.lastIndex = 0;
    if (UNITLESS_ZERO_RE.test(value)) out.push('0');
    return out;
}

/**
 * Extract line-height tokens. Accepts unitless numbers, `<num><unit>`, and the
 * `normal` keyword.
 */
function extractLineHeights(value) {
    const out = [];
    const tokens = value.split(/[\s,]+/).map((t) => t.trim()).filter(Boolean);
    for (const t of tokens) {
        if (/^normal$/i.test(t)) out.push('normal');
        else if (/^-?\d*\.?\d+$/.test(t)) out.push(t);
        else if (/^-?\d*\.?\d+[a-z%]+$/i.test(t)) out.push(t.toLowerCase().replace(/^(-?\d*\.?\d+)/, '$1'));
    }
    return out;
}

/** Extract font-weight tokens. */
function extractFontWeights(value) {
    const out = [];
    const tokens = value.split(/[\s,]+/).map((t) => t.trim()).filter(Boolean);
    for (const t of tokens) {
        if (/^(normal|bold|lighter|bolder)$/i.test(t)) out.push(t.toLowerCase());
        else if (/^[1-9]00$/.test(t)) out.push(t);
    }
    return out;
}

/** Extract font-family entries (split on commas, unquote). */
function extractFontFamilies(value) {
    return value
        .split(',')
        .map((f) => f.trim().replace(/^['"](.*)['"]$/, '$1').trim())
        .filter(Boolean);
}

/** Split a multi-shadow CSS value on commas not inside parens. */
function splitShadows(value) {
    const trimmed = value.trim();
    if (!trimmed) return [];
    const lower = trimmed.toLowerCase();
    if (lower === 'none' || lower === 'inherit' || lower === 'initial' || lower === 'unset') {
        return [];
    }
    const parts = [];
    let depth = 0;
    let buf = '';
    for (const ch of trimmed) {
        if (ch === '(') depth++;
        else if (ch === ')') depth--;
        if (ch === ',' && depth === 0) {
            const piece = normalizeWhitespace(buf);
            if (piece && piece.toLowerCase() !== 'none') parts.push(piece);
            buf = '';
        } else {
            buf += ch;
        }
    }
    const last = normalizeWhitespace(buf);
    if (last && last.toLowerCase() !== 'none') parts.push(last);
    return parts;
}

function normalizeWhitespace(s) {
    return s.replace(/\s+/g, ' ').trim();
}

// ---------------------------------------------------------------------------
// Declaration walker
// ---------------------------------------------------------------------------

function collectFromDecl(decl) {
    const prop = decl.prop.toLowerCase();
    const value = decl.value;
    if (typeof value !== 'string') return;

    // Colors and easing-function calls are extracted from any property because
    // colors appear in many shorthand contexts (border, background, gradient,
    // box-shadow, etc.) and `cubic-bezier(...)` cannot meaningfully appear in
    // any other context.
    for (const c of extractColors(value)) buckets.colors.add(c);
    for (const e of extractEasingFunctions(value)) buckets.easings.add(e);

    if (TIMING_PROPS.has(prop)) {
        for (const d of extractDurations(value)) buckets.durations.add(d);
        for (const e of extractEasingKeywords(value)) buckets.easings.add(e);
    }

    if (FONT_FAMILY_PROPS.has(prop)) {
        for (const f of extractFontFamilies(value)) buckets.fontFamilies.add(f);
    }
    if (FONT_SIZE_PROPS.has(prop)) {
        for (const s of extractLengthTokens(value)) buckets.fontSizes.add(s);
    }
    if (FONT_WEIGHT_PROPS.has(prop)) {
        for (const w of extractFontWeights(value)) buckets.fontWeights.add(w);
    }
    if (LINE_HEIGHT_PROPS.has(prop)) {
        for (const l of extractLineHeights(value)) buckets.lineHeights.add(l);
    }
    if (LETTER_SPACING_PROPS.has(prop)) {
        for (const l of extractLengthTokens(value)) buckets.letterSpacings.add(l);
        if (/\bnormal\b/i.test(value)) buckets.letterSpacings.add('normal');
    }
    if (SPACING_PROPS.has(prop)) {
        for (const s of extractLengthsWithZero(value)) buckets.spacing.add(s);
    }
    if (RADIUS_PROPS.has(prop)) {
        for (const r of extractLengthsWithZero(value)) buckets.radii.add(r);
    }
    if (SHADOW_PROPS.has(prop)) {
        for (const sh of splitShadows(value)) buckets.shadows.add(sh);
    }
    if (prop === 'z-index') {
        const z = parseInt(value.trim(), 10);
        if (!Number.isNaN(z)) buckets.zIndices.add(z);
    }
}

const MEDIA_NUMERIC_RE =
    /\((?:min|max)-(?:width|height)\s*:\s*(\d+(?:\.\d+)?)\s*px\s*\)/gi;

function collectBreakpoints(mediaParams) {
    let m;
    MEDIA_NUMERIC_RE.lastIndex = 0;
    while ((m = MEDIA_NUMERIC_RE.exec(mediaParams)) !== null) {
        const n = parseFloat(m[1]);
        if (!Number.isNaN(n)) buckets.breakpoints.add(n);
    }
}

function walkRoot(root) {
    root.walk((node) => {
        if (node.type === 'decl') {
            collectFromDecl(node);
        } else if (node.type === 'atrule' && node.name.toLowerCase() === 'media') {
            collectBreakpoints(node.params);
        }
    });
}

// ---------------------------------------------------------------------------
// HTML extraction
// ---------------------------------------------------------------------------

function decodeHtmlEntities(s) {
    return s
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#x27;/gi, "'")
        .replace(/&#39;/g, "'")
        .replace(/&apos;/g, "'");
}

function extractStyleBlocks(html) {
    const out = [];
    const re = /<style\b[^>]*>([\s\S]*?)<\/style>/gi;
    let m;
    while ((m = re.exec(html)) !== null) {
        out.push(m[1]);
    }
    return out;
}

function extractInlineStyles(html) {
    // Strip <script> and <style> blocks first so attribute selectors and string
    // literals inside them don't leak into the inline-style scan.
    const cleaned = html
        .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
        .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '');

    const out = [];
    const re = /\sstyle\s*=\s*"([^"]*)"|\sstyle\s*=\s*'([^']*)'/gi;
    let m;
    while ((m = re.exec(cleaned)) !== null) {
        const raw = m[1] !== undefined ? m[1] : m[2];
        if (raw && raw.trim()) out.push(decodeHtmlEntities(raw));
    }
    return out;
}

// ---------------------------------------------------------------------------
// Sorting
// ---------------------------------------------------------------------------

const STRING_COMPARE = new Intl.Collator('en', {
    sensitivity: 'variant',
    numeric: true,
    caseFirst: 'upper',
}).compare;

function sortStrings(arr) {
    return [...new Set(arr)].sort(STRING_COMPARE);
}

function sortNumbers(arr) {
    return [...new Set(arr)].sort((a, b) => a - b);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
    if (!fs.existsSync(SOURCE_HTML)) {
        console.error(`[extract-softree-styles] Source HTML not found: ${SOURCE_HTML}`);
        process.exit(1);
    }

    const html = fs.readFileSync(SOURCE_HTML, 'utf8');

    const styleBlocks = extractStyleBlocks(html);
    const inlineStyles = extractInlineStyles(html);

    let parsedBlocks = 0;
    let parsedInlines = 0;

    for (const block of styleBlocks) {
        try {
            const root = postcss.parse(block);
            walkRoot(root);
            parsedBlocks++;
        } catch (err) {
            console.warn(`[extract-softree-styles] Skipped malformed <style> block: ${err.message}`);
        }
    }

    for (const inline of inlineStyles) {
        try {
            // Wrap the inline declaration list in a synthetic rule so postcss
            // can parse it.
            const root = postcss.parse(`__inline__{${inline}}`);
            walkRoot(root);
            parsedInlines++;
        } catch (err) {
            console.warn(`[extract-softree-styles] Skipped malformed inline style: ${err.message}`);
        }
    }

    const finalBuckets = {
        colors: sortStrings([...buckets.colors]),
        fontFamilies: sortStrings([...buckets.fontFamilies]),
        fontSizes: sortStrings([...buckets.fontSizes]),
        fontWeights: sortStrings([...buckets.fontWeights]),
        lineHeights: sortStrings([...buckets.lineHeights]),
        letterSpacings: sortStrings([...buckets.letterSpacings]),
        spacing: sortStrings([...buckets.spacing]),
        radii: sortStrings([...buckets.radii]),
        shadows: sortStrings([...buckets.shadows]),
        durations: sortStrings([...buckets.durations]),
        easings: sortStrings([...buckets.easings]),
        zIndices: sortNumbers([...buckets.zIndices]),
        breakpoints: sortNumbers([...buckets.breakpoints]),
    };

    const counts = {};
    for (const k of BUCKET_KEYS) counts[k] = finalBuckets[k].length;

    const output = {
        source: 'public/softree-source-sections.html',
        generator: 'scripts/extract-softree-styles.mjs',
        schemaVersion: 1,
        parsed: {
            styleBlocks: parsedBlocks,
            inlineStyles: parsedInlines,
        },
        counts,
        buckets: finalBuckets,
    };

    const json = JSON.stringify(output, null, 2) + '\n';
    fs.mkdirSync(path.dirname(OUTPUT_JSON), { recursive: true });
    fs.writeFileSync(OUTPUT_JSON, json);

    const summary = BUCKET_KEYS.map((k) => `${k}=${counts[k]}`).join(' ');
    console.log(
        `[extract-softree-styles] Parsed ${parsedBlocks} <style> block(s), ${parsedInlines} inline style attr(s).`,
    );
    console.log(`[extract-softree-styles] ${summary}`);
    console.log(`[extract-softree-styles] Wrote ${path.relative(ROOT, OUTPUT_JSON)} (${Buffer.byteLength(json)} bytes).`);
}

main();
