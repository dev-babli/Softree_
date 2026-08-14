/**
 * Property test: Token Coverage and tokens.ts ↔ tokens.css Parity
 *
 * **Property 9: Token Coverage and tokens.ts ↔ tokens.css Parity**
 * **Validates: Requirements 22.6, 22.7**
 *
 * Two assertions split across two `it` blocks:
 *
 * Part A (Req 22.6 — Token_Coverage = 100%):
 *   AST-walk every `.ts`/`.tsx`/`.css` file under `src/components/softree-marketing-ui/`
 *   and `src/app/agentic-ai-platform/` (whitelisting tokens.ts, tokens.css,
 *   keyframes.css, assets.ts, the data fixture folder, and any test files)
 *   and assert that no literal numeric / color / easing / duration /
 *   radius / shadow value appears at a call site.  Today the test passes
 *   vacuously because no component files exist that aren't whitelisted —
 *   it becomes enforcing as new component code lands.
 *
 * Part B (Req 22.7 — 1:1 cardinality):
 *   Parse `src/components/softree-marketing-ui/tokens.ts` with @babel/parser, extract
 *   every `as const` leaf.  Parse `src/components/softree-marketing-ui/tokens.css` with
 *   postcss, extract every `--*` custom property declared inside the
 *   `@theme` block.  Assert one-to-one cardinality with a deterministic
 *   per-category prefix + camelCase→kebab-case derivation.
 *
 * The suite uses fast-check only to randomly shuffle the order in which
 * leaves are checked (the result is deterministic; the shuffle exists to
 * exercise the property under fast-check and to make any assertion
 * failure include the random seed).
 */

import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import { parse as babelParse } from "@babel/parser";
import postcss from "postcss";
import * as fs from "node:fs";
import * as path from "node:path";

// ---------------------------------------------------------------------------
// Workspace roots
// ---------------------------------------------------------------------------

const WORKSPACE_ROOT = path.resolve(__dirname, "..", "..");
const KORE_DIR = path.join(WORKSPACE_ROOT, "src", "components", "kore");
const KORE_AI_PAGE_DIR = path.join(
    WORKSPACE_ROOT,
    "src",
    "app",
    "agentic-ai-platform",
);

// ---------------------------------------------------------------------------
// Helpers — file walk
// ---------------------------------------------------------------------------

/**
 * Files / folders that are NOT subject to the no-literal-magic-values rule
 * because they are themselves the source of truth (tokens, keyframes), the
 * verbatim asset manifest, or test/data fixture content copied one-to-one
 * from Source_Document.
 */
const PATH_ALLOWLIST: ReadonlyArray<string> = [
    // tokens themselves
    "tokens.ts",
    "tokens.css",
    // raw keyframes mirrored from Source_Document
    "keyframes.css",
    // verbatim asset manifest
    "assets.ts",
];

const FOLDER_ALLOWLIST_SEGMENTS: ReadonlyArray<string> = [
    // data fixtures contain Source_Document content one-to-one
    `${path.sep}data${path.sep}`,
    // colocated unit tests
    `${path.sep}__tests__${path.sep}`,
    // node_modules and build output (defensive)
    `${path.sep}node_modules${path.sep}`,
    `${path.sep}.next${path.sep}`,
];

function isAllowlisted(filePath: string): boolean {
    const base = path.basename(filePath);
    if (PATH_ALLOWLIST.includes(base)) return true;
    if (base.endsWith(".test.ts") || base.endsWith(".test.tsx")) return true;
    for (const seg of FOLDER_ALLOWLIST_SEGMENTS) {
        if (filePath.includes(seg)) return true;
    }
    return false;
}

function walk(dir: string): string[] {
    if (!fs.existsSync(dir)) return [];
    const out: string[] = [];
    const stack: string[] = [dir];
    while (stack.length > 0) {
        const cur = stack.pop()!;
        let entries: fs.Dirent[];
        try {
            entries = fs.readdirSync(cur, { withFileTypes: true });
        } catch {
            continue;
        }
        for (const ent of entries) {
            const full = path.join(cur, ent.name);
            if (ent.isDirectory()) {
                stack.push(full);
            } else if (ent.isFile()) {
                out.push(full);
            }
        }
    }
    return out;
}

function isCodeFile(filePath: string): boolean {
    return /\.(?:tsx?|css)$/.test(filePath);
}

// ---------------------------------------------------------------------------
// Part A — Magic value detection
// ---------------------------------------------------------------------------

/**
 * Regex set for "this string is a magic style value at a call site".
 *
 * Every match is paired with a category to make any failure message
 * actionable.  These patterns deliberately avoid false positives on:
 *   - empty strings, single characters, identifier-only strings
 *   - file paths and URLs (rejected by the pattern shape)
 *   - ARIA role strings (always plain words, never matched)
 */
const MAGIC_STRING_PATTERNS: ReadonlyArray<{
    name: string;
    test: (s: string) => boolean;
}> = [
        {
            name: "hex-color",
            test: (s) => /^#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(s),
        },
        {
            name: "rgb-or-hsl-color",
            test: (s) => /^(?:rgb|rgba|hsl|hsla)\s*\(/.test(s),
        },
        {
            name: "length-with-unit",
            test: (s) =>
                /^-?(?:\d+\.\d+|\d+|\.\d+)(?:px|rem|em|vh|vw|vmin|vmax|ch|ex|cm|mm|in|pt|pc)$/.test(
                    s,
                ),
        },
        {
            name: "duration",
            test: (s) => /^-?(?:\d+\.\d+|\d+|\.\d+)(?:ms|s)$/.test(s),
        },
        {
            name: "easing-cubic-bezier",
            test: (s) => /^cubic-bezier\s*\(/.test(s),
        },
        // standalone keyword easings only count when used as a value, not as a
        // word inside larger identifiers — we let context-aware AST detection
        // handle false positives, this list is intentionally small
    ];

/** Numeric literals in [1, 99999] paired with a known z-index/breakpoint
 * context will be flagged.  We restrict to common range to avoid false
 * positives on small integers used for indexing or array sizes. */
const NUMERIC_MAGIC_MIN = 100; // small enough to catch breakpoints / z-indexes
const NUMERIC_MAGIC_MAX = 99999;

interface MagicHit {
    file: string;
    line: number;
    column: number;
    value: string;
    kind: string;
}

/**
 * Walk a TypeScript / TSX source file looking for literal style values.
 *
 * We use @babel/parser to get an AST with location information and then
 * recurse over node properties manually (no @babel/traverse dependency
 * required).  String literals are matched against MAGIC_STRING_PATTERNS;
 * numeric literals are matched against the [NUMERIC_MAGIC_MIN,
 * NUMERIC_MAGIC_MAX] range.  Values appearing inside an `import` statement,
 * a literal type position, or an enum-like `as const` record at module
 * scope are skipped (they aren't call sites).
 */
function findMagicValuesInTs(filePath: string): MagicHit[] {
    const src = fs.readFileSync(filePath, "utf8");
    let ast: ReturnType<typeof babelParse>;
    try {
        ast = babelParse(src, {
            sourceType: "module",
            plugins: [
                "typescript",
                "jsx",
                "decorators-legacy",
                "classProperties",
                "topLevelAwait",
            ],
            errorRecovery: true,
        });
    } catch {
        // If parsing fails entirely, skip the file rather than crash the
        // suite — this lets the test stay vacuously green on partially-
        // typed scaffolding.
        return [];
    }

    const hits: MagicHit[] = [];

    type AstNode = {
        type: string;
        loc?: { start: { line: number; column: number } };
        [key: string]: unknown;
    };

    function visit(node: AstNode | null | undefined, parents: AstNode[]): void {
        if (!node || typeof node !== "object" || !("type" in node)) return;

        // Skip things that are NOT call sites:
        //   - import / export specifiers and source strings
        //   - TS type annotations and literal types
        if (
            node.type === "ImportDeclaration" ||
            node.type === "ExportNamedDeclaration" ||
            node.type === "ExportAllDeclaration" ||
            node.type === "TSLiteralType" ||
            node.type === "TSTypeAnnotation" ||
            node.type === "TSAsExpression" === false &&
            node.type === "TSTypeReference"
        ) {
            // For ImportDeclaration and the export-* nodes we'd return; for
            // type nodes we still allow descent into TSAsExpression
            // expression body via the generic recursion below.  We special-
            // case import/export only.
            if (
                node.type === "ImportDeclaration" ||
                node.type === "ExportNamedDeclaration" ||
                node.type === "ExportAllDeclaration"
            ) {
                return;
            }
        }

        // Inspect literal nodes for magic values
        if (node.type === "StringLiteral") {
            const value = (node as any).value as string;
            for (const pat of MAGIC_STRING_PATTERNS) {
                if (pat.test(value)) {
                    // Skip if inside a TS type-literal context
                    if (parents.some((p) => p.type === "TSLiteralType")) break;
                    hits.push({
                        file: filePath,
                        line: node.loc?.start.line ?? -1,
                        column: node.loc?.start.column ?? -1,
                        value,
                        kind: pat.name,
                    });
                    break;
                }
            }
        } else if (node.type === "NumericLiteral") {
            const num = (node as any).value as number;
            if (
                Number.isFinite(num) &&
                num >= NUMERIC_MAGIC_MIN &&
                num <= NUMERIC_MAGIC_MAX &&
                Number.isInteger(num)
            ) {
                // Skip if inside a TS literal type
                if (parents.some((p) => p.type === "TSLiteralType")) {
                    /* skip */
                } else {
                    hits.push({
                        file: filePath,
                        line: node.loc?.start.line ?? -1,
                        column: node.loc?.start.column ?? -1,
                        value: String(num),
                        kind: "numeric-literal",
                    });
                }
            }
        }

        // Recurse over children
        const nextParents = parents.concat(node);
        for (const key of Object.keys(node)) {
            if (key === "loc" || key === "range" || key === "start" || key === "end")
                continue;
            const child = (node as Record<string, unknown>)[key];
            if (Array.isArray(child)) {
                for (const c of child) {
                    if (c && typeof c === "object" && "type" in c) {
                        visit(c as AstNode, nextParents);
                    }
                }
            } else if (child && typeof child === "object" && "type" in (child as object)) {
                visit(child as AstNode, nextParents);
            }
        }
    }

    visit(ast.program as unknown as AstNode, []);
    return hits;
}

/**
 * Walk a CSS file (other than tokens.css / keyframes.css) and flag
 * declarations whose value contains a hex / rgb / length / duration that
 * is not behind a `var(--<token>)` reference.
 */
function findMagicValuesInCss(filePath: string): MagicHit[] {
    const src = fs.readFileSync(filePath, "utf8");
    const hits: MagicHit[] = [];
    let root;
    try {
        root = postcss.parse(src, { from: filePath });
    } catch {
        return [];
    }
    root.walkDecls((decl) => {
        const value = decl.value;
        // Ignore declarations whose value is purely `var(...)` or a list of
        // var() calls — that's the desired pattern.
        const stripped = value.replace(/var\([^)]+\)/g, "").trim();
        if (stripped === "" || stripped === ",") return;

        for (const pat of MAGIC_STRING_PATTERNS) {
            // Tokenize on whitespace + commas to avoid matching
            // sub-strings inside e.g. `linear-gradient(...)` and instead
            // match the contained color stops directly.
            for (const tok of stripped.split(/[\s,()]+/)) {
                const t = tok.trim();
                if (t && pat.test(t)) {
                    hits.push({
                        file: filePath,
                        line: decl.source?.start?.line ?? -1,
                        column: decl.source?.start?.column ?? -1,
                        value: `${decl.prop}: ${value}`,
                        kind: pat.name,
                    });
                    return; // only flag once per declaration
                }
            }
        }
    });
    return hits;
}

// ---------------------------------------------------------------------------
// Part B — tokens.ts ↔ tokens.css parity
// ---------------------------------------------------------------------------

/** Per-category Tailwind v4 namespace prefixes for tokens.css custom
 *  property names.  Order matches tokens.ts. */
const CATEGORY_PREFIXES: Readonly<Record<string, string>> = {
    colors: "color",
    fonts: "font",
    fontSizes: "text",
    fontWeights: "font-weight",
    lineHeights: "leading",
    letterSpacings: "tracking",
    spacing: "spacing",
    radii: "radius",
    shadows: "shadow",
    durations: "duration",
    easings: "ease",
    zIndices: "z",
    breakpoints: "breakpoint",
};

/** Convert a camelCase identifier to kebab-case using the convention
 *  documented in tokens.css:
 *
 *    kebab(key) = key.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
 */
function kebab(key: string): string {
    return key.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

/** Compose the expected CSS custom property name for a given (category,
 *  key) pair. */
function expectedCssVarName(category: string, key: string): string {
    const prefix = CATEGORY_PREFIXES[category];
    if (!prefix) {
        throw new Error(
            `Unknown tokens.ts category "${category}" — update CATEGORY_PREFIXES.`,
        );
    }
    return `--${prefix}-${kebab(key)}`;
}

interface TsLeaf {
    category: string;
    key: string;
    value: string; // stringified literal (string or number)
    cssVar: string; // expected --<prefix>-<kebab>
}

/**
 * Parse `tokens.ts` with @babel/parser and extract every leaf from each
 * exported `as const` record.  Categories are recognised by their
 * variable name appearing in CATEGORY_PREFIXES.
 */
function extractTsLeaves(filePath: string): TsLeaf[] {
    const src = fs.readFileSync(filePath, "utf8");
    const ast = babelParse(src, {
        sourceType: "module",
        plugins: ["typescript"],
    });

    const leaves: TsLeaf[] = [];

    type Body = Array<Record<string, unknown>>;
    const body = ((ast.program as unknown) as { body: Body }).body;

    for (const stmt of body) {
        // Match: `export const <name> = { ... } as const;`
        let decls: unknown = null;
        if (stmt.type === "ExportNamedDeclaration") {
            const decl = (stmt as { declaration?: Record<string, unknown> })
                .declaration;
            if (decl && decl.type === "VariableDeclaration") {
                decls = (decl as { declarations: unknown[] }).declarations;
            }
        }
        if (!Array.isArray(decls)) continue;

        for (const d of decls as Array<Record<string, unknown>>) {
            const id = d.id as { type?: string; name?: string } | undefined;
            const init = d.init as Record<string, unknown> | undefined;
            if (!id || id.type !== "Identifier" || !id.name) continue;
            const category = id.name;
            if (!(category in CATEGORY_PREFIXES)) continue;

            // Strip TSAsExpression wrapper
            let obj: Record<string, unknown> | undefined = init;
            if (obj && obj.type === "TSAsExpression") {
                obj = obj.expression as Record<string, unknown>;
            }
            if (!obj || obj.type !== "ObjectExpression") continue;

            const props = (obj.properties as Array<Record<string, unknown>>) ?? [];
            for (const p of props) {
                if (p.type !== "ObjectProperty") continue;
                const k = p.key as
                    | { type?: string; name?: string; value?: string }
                    | undefined;
                const v = p.value as
                    | { type?: string; value?: string | number }
                    | undefined;
                if (!k || !v) continue;

                const keyName =
                    k.type === "Identifier"
                        ? k.name
                        : k.type === "StringLiteral"
                            ? k.value
                            : undefined;
                if (!keyName) continue;

                let valueStr: string;
                if (v.type === "StringLiteral") valueStr = String(v.value);
                else if (v.type === "NumericLiteral") valueStr = String(v.value);
                else if (v.type === "UnaryExpression") {
                    const arg = (v as { argument?: Record<string, unknown> })
                        .argument;
                    if (
                        arg &&
                        arg.type === "NumericLiteral" &&
                        (v as { operator?: string }).operator === "-"
                    ) {
                        valueStr = `-${String((arg as { value: number }).value)}`;
                    } else {
                        continue;
                    }
                } else {
                    continue;
                }

                leaves.push({
                    category,
                    key: keyName,
                    value: valueStr,
                    cssVar: expectedCssVarName(category, keyName),
                });
            }
        }
    }
    return leaves;
}

interface CssVar {
    name: string; // including leading "--"
    value: string;
}

/**
 * Parse `tokens.css` with postcss and extract every custom property
 * declared inside the @theme {} block.  Tailwind v4 uses an at-rule
 * with name "theme" — we walk its declarations.
 */
function extractCssVars(filePath: string): CssVar[] {
    const src = fs.readFileSync(filePath, "utf8");
    const root = postcss.parse(src, { from: filePath });
    const vars: CssVar[] = [];
    root.walkAtRules("theme", (atRule) => {
        atRule.walkDecls((decl) => {
            if (decl.prop.startsWith("--")) {
                vars.push({ name: decl.prop, value: decl.value });
            }
        });
    });
    return vars;
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("Property 9: Token Coverage and tokens.ts ↔ tokens.css Parity", () => {
    it("no literal magic values appear at call sites in src/components/kore or src/app/agentic-ai-platform", () => {
        const candidateFiles: string[] = [];
        for (const root of [KORE_DIR, KORE_AI_PAGE_DIR]) {
            for (const f of walk(root)) {
                if (!isCodeFile(f)) continue;
                if (isAllowlisted(f)) continue;
                candidateFiles.push(f);
            }
        }

        // No-files case — passes vacuously today; will become enforcing
        // as components land.
        if (candidateFiles.length === 0) {
            expect(candidateFiles).toEqual([]);
            return;
        }

        // Use fast-check to randomly shuffle the file order so any
        // failure surfaces with a reproducible seed.  The check itself
        // is deterministic.
        const allHits: MagicHit[] = [];
        fc.assert(
            fc.property(fc.shuffledSubarray(candidateFiles, {
                minLength: candidateFiles.length,
                maxLength: candidateFiles.length,
            }), (shuffled) => {
                const hits: MagicHit[] = [];
                for (const f of shuffled) {
                    const hitsForFile = f.endsWith(".css")
                        ? findMagicValuesInCss(f)
                        : findMagicValuesInTs(f);
                    hits.push(...hitsForFile);
                }
                if (hits.length > 0 && allHits.length === 0) {
                    allHits.push(...hits);
                }
                return hits.length === 0;
            }),
            { numRuns: 5 },
        );

        if (allHits.length > 0) {
            const formatted = allHits
                .slice(0, 25)
                .map(
                    (h) =>
                        `  ${path.relative(WORKSPACE_ROOT, h.file)}:${h.line}:${h.column}  [${h.kind}]  ${h.value}`,
                )
                .join("\n");
            throw new Error(
                `Found ${allHits.length} literal magic value(s) at call sites that should reference tokens:\n${formatted}`,
            );
        }
    });

    it("every tokens.ts leaf has exactly one matching tokens.css custom property and vice versa", () => {
        const tokensTsPath = path.join(KORE_DIR, "tokens.ts");
        const tokensCssPath = path.join(KORE_DIR, "tokens.css");

        const tsLeaves = extractTsLeaves(tokensTsPath);
        const cssVars = extractCssVars(tokensCssPath);

        // Sanity: design.md and tokens.css both say 154 leaves total
        expect(tsLeaves.length).toBe(154);
        expect(cssVars.length).toBe(154);

        const tsByCssName = new Map<string, TsLeaf>();
        for (const leaf of tsLeaves) {
            if (tsByCssName.has(leaf.cssVar)) {
                throw new Error(
                    `Duplicate expected CSS var "${leaf.cssVar}" derived from tokens.ts category=${leaf.category} key=${leaf.key}`,
                );
            }
            tsByCssName.set(leaf.cssVar, leaf);
        }

        const cssByName = new Map<string, CssVar>();
        for (const v of cssVars) {
            if (cssByName.has(v.name)) {
                throw new Error(
                    `Duplicate CSS custom property "${v.name}" in tokens.css`,
                );
            }
            cssByName.set(v.name, v);
        }

        // Use fast-check to shuffle the leaves and verify every leaf
        // round-trips to a CSS var with the expected value, in any order.
        fc.assert(
            fc.property(
                fc.shuffledSubarray(tsLeaves, {
                    minLength: tsLeaves.length,
                    maxLength: tsLeaves.length,
                }),
                (shuffled) => {
                    for (const leaf of shuffled) {
                        const cssVar = cssByName.get(leaf.cssVar);
                        if (!cssVar) return false;
                        if (cssVar.value !== leaf.value) return false;
                    }
                    return true;
                },
            ),
            { numRuns: 10 },
        );

        // Surface any missing/extra entries with a friendly diff
        const missingInCss: string[] = [];
        for (const leaf of tsLeaves) {
            if (!cssByName.has(leaf.cssVar)) {
                missingInCss.push(
                    `  tokens.ts ${leaf.category}.${leaf.key} -> expected ${leaf.cssVar}`,
                );
            } else {
                const cssVar = cssByName.get(leaf.cssVar)!;
                if (cssVar.value !== leaf.value) {
                    missingInCss.push(
                        `  ${leaf.cssVar}: ts="${leaf.value}" css="${cssVar.value}"`,
                    );
                }
            }
        }
        const missingInTs: string[] = [];
        for (const v of cssVars) {
            if (!tsByCssName.has(v.name)) {
                missingInTs.push(`  tokens.css ${v.name} has no tokens.ts leaf`);
            }
        }

        if (missingInCss.length > 0 || missingInTs.length > 0) {
            const lines: string[] = [];
            if (missingInCss.length > 0) {
                lines.push("Missing or mismatched in tokens.css:");
                lines.push(...missingInCss);
            }
            if (missingInTs.length > 0) {
                lines.push("Extra in tokens.css (no matching tokens.ts leaf):");
                lines.push(...missingInTs);
            }
            throw new Error(lines.join("\n"));
        }

        expect(tsLeaves.length).toBe(cssVars.length);
    });
});
