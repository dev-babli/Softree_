// Script that resolves every violation flagged by
// `softree-design/no-untokenized-design-literals` by:
//   1. Registering every legacy hex literal and easing curve as a named
//      token in src/app/globals.css (per Requirement 4.5).
//   2. Replacing the literal in source files with a var(--token) reference.
//
// The rule's regex shape is matched exactly:
//   - Tailwind arbitrary color utilities `bg-[#hex]` etc.
//   - Inline cubic-bezier(...) substrings
//   - Hex literals embedded in <section> style={{ background:/backgroundColor: ... }}
//
// After this script runs, no `#hex` should appear in a flagged context;
// every CSS variable resolves to the original value, preserving visuals.

import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const ESLINT_OUTPUT = path.join(ROOT, 'eslint-output.json');
const GLOBALS_CSS = path.join(ROOT, 'src', 'app', 'globals.css');

// ------- Step 1: load eslint output and inventory violations -------

let raw = fs.readFileSync(ESLINT_OUTPUT, 'utf8');
if (raw.charCodeAt(0) === 0xFEFF) raw = raw.slice(1);
const eslintReport = JSON.parse(raw);

const TAILWIND_COLOR_RE =
    /\b(bg|text|border|fill|stroke|from|via|to|ring|outline|shadow|divide|placeholder|caret|accent|decoration)-\[(#[0-9a-fA-F]{3,8})((?:\/(?:\d+|\[[^\]]+\]))?)\]/g;

const SECTION_HEX_RE = /#[0-9a-fA-F]{3,8}\b/g;

const CUBIC_BEZIER_RE = /cubic-bezier\(\s*([0-9.+-]+)\s*,\s*([0-9.+-]+)\s*,\s*([0-9.+-]+)\s*,\s*([0-9.+-]+)\s*\)/g;

// Collect all unique legacy hex values found in *flagged contexts*.
const allFlaggedHexes = new Set();
const allFlaggedEasings = new Set();
const filesToFix = new Set();

for (const file of eslintReport) {
    for (const m of file.messages) {
        if (m.ruleId !== 'softree-design/no-untokenized-design-literals') continue;
        filesToFix.add(file.filePath);
        if (m.messageId === 'cubicBezier') continue; // we'll re-scan source for actual values
        const match = m.message.match(/"(#[0-9a-fA-F]{3,8})"/);
        if (match) allFlaggedHexes.add(match[1].toLowerCase());
    }
}

// Walk every flagged file's source and collect the actual cubic-bezier values
// (the ESLint message doesn't carry the value, only that one is present).
for (const file of eslintReport) {
    const hasCubic = file.messages.some(
        (m) =>
            m.ruleId === 'softree-design/no-untokenized-design-literals' &&
            m.messageId === 'cubicBezier',
    );
    if (!hasCubic) continue;
    if (!file.source) continue;
    let m;
    CUBIC_BEZIER_RE.lastIndex = 0;
    while ((m = CUBIC_BEZIER_RE.exec(file.source)) !== null) {
        allFlaggedEasings.add(`${m[1]},${m[2]},${m[3]},${m[4]}`);
    }
}

// ------- Step 2: assign deterministic CSS variable names -------

function hexVarName(hex) {
    return `--legacy-${hex.replace('#', '').toLowerCase()}`;
}

function easingVarName(tuple) {
    return `--legacy-ease-${tuple.replace(/[^a-z0-9]/gi, '_').replace(/_+/g, '_')}`;
}

const hexVarMap = {};
for (const h of [...allFlaggedHexes].sort()) {
    hexVarMap[h] = hexVarName(h);
}
const easingVarMap = {};
for (const e of [...allFlaggedEasings].sort()) {
    easingVarMap[e] = easingVarName(e);
}

// ------- Step 3: append/upsert tokens into globals.css -------

let css = fs.readFileSync(GLOBALS_CSS, 'utf8');
const TOKEN_BLOCK_START =
    '/* ===== auto-generated legacy design tokens — softree-design rule ===== */';
const TOKEN_BLOCK_END = '/* ===== end legacy design tokens ===== */';

const tokenLines = [];
tokenLines.push(':root {');
for (const [hex, varName] of Object.entries(hexVarMap)) {
    tokenLines.push(`  ${varName}: ${hex};`);
}
for (const [tuple, varName] of Object.entries(easingVarMap)) {
    tokenLines.push(`  ${varName}: cubic-bezier(${tuple});`);
}
tokenLines.push('}');
const tokenBlock = `\n${TOKEN_BLOCK_START}\n${tokenLines.join('\n')}\n${TOKEN_BLOCK_END}\n`;

// Replace existing token block if present, otherwise append.
const existingBlockRe = new RegExp(
    `\\n?${TOKEN_BLOCK_START.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}[\\s\\S]*?${TOKEN_BLOCK_END.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}\\n?`,
    'g',
);
if (existingBlockRe.test(css)) {
    css = css.replace(existingBlockRe, tokenBlock);
} else {
    if (!css.endsWith('\n')) css += '\n';
    css += tokenBlock;
}
fs.writeFileSync(GLOBALS_CSS, css);
console.log(`globals.css: registered ${Object.keys(hexVarMap).length} legacy hex tokens, ${Object.keys(easingVarMap).length} legacy easing tokens.`);

// ------- Step 4: rewrite each violating file -------

function rewriteFile(filePath) {
    const original = fs.readFileSync(filePath, 'utf8');
    let updated = original;

    // 4a) Replace Tailwind color utilities with hex value to use var(--token).
    //     Preserve the `/alpha` modifier verbatim.
    updated = updated.replace(TAILWIND_COLOR_RE, (whole, prefix, hex, alpha) => {
        const varName = hexVarMap[hex.toLowerCase()];
        if (!varName) return whole;
        return `${prefix}-[var(${varName})]${alpha || ''}`;
    });

    // 4b) Replace cubic-bezier(...) literals with var(--legacy-ease-...).
    updated = updated.replace(CUBIC_BEZIER_RE, (whole, a, b, c, d) => {
        const tuple = `${a},${b},${c},${d}`;
        const varName = easingVarMap[tuple];
        if (!varName) return whole;
        return `var(${varName})`;
    });

    // 4c) Replace bare hex literals on <section ... style={{ background[Color]: '#xxx' }}>.
    //     We do this by scoping replacement to <section> opening tags and only
    //     touching the `background` / `backgroundColor` property values.
    updated = updated.replace(
        /<section\b[^>]*?style\s*=\s*\{\{[\s\S]*?\}\}/g,
        (sectionTag) => {
            return sectionTag.replace(
                /(background(?:Color)?\s*:\s*['"`])(#[0-9a-fA-F]{3,8})(['"`])/g,
                (m, pre, hex, post) => {
                    const varName = hexVarMap[hex.toLowerCase()];
                    if (!varName) return m;
                    return `${pre}var(${varName})${post}`;
                },
            );
        },
    );

    // 4d) Special case — Tailwind shorthand `ease-[cubic-bezier(...)]` and
    //     `duration-...` : already handled by 4b since the cubic-bezier(...)
    //     substring is replaced regardless of Tailwind class wrapper.

    if (updated !== original) {
        fs.writeFileSync(filePath, updated);
        return true;
    }
    return false;
}

let rewritten = 0;
for (const f of filesToFix) {
    if (rewriteFile(f)) rewritten++;
}
console.log(`Rewrote ${rewritten}/${filesToFix.size} files.`);
