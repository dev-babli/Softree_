/**
 * Page Forge — artifact naming, guarded IO, and front-matter round-trip
 * (`artifacts.ts`).
 *
 * Every phase of the pipeline reads and writes a single structured Markdown
 * artifact under the session directory `.planning/page-forge/<slug>/`. This
 * module is the seam between the agent layer (which writes artifacts) and the
 * deterministic core (which reads scores, verdicts, and findings back).
 *
 * Responsibilities:
 *  - Canonical artifact names (`ARTIFACT_NAMES`, `loopArtifactName`).
 *  - Guarded persistence (`persist`, `verifyExists`) that confines every write
 *    to the session root. A path resolving outside `ROOT(slug)` is rejected
 *    synchronously, before any IO (Req 1.4).
 *  - A serializer/parser pair for YAML front matter + a Markdown body
 *    (`serializeArtifact`, `parseArtifact`). The pair is a true round-trip: for
 *    any front-matter object, `parseArtifact(serializeArtifact(front, body))`
 *    reproduces both the object and the body exactly (Req 13.1, 16.1, 16.2).
 *
 * No YAML dependency is available in the project, so a minimal but correct
 * block-style YAML implementation is used. Strings are always double-quoted so
 * the type of every scalar round-trips unambiguously; numbers, booleans, and
 * null are emitted bare.
 *
 * Requirements: 1.2, 1.4, 2.1, 9.2, 13.1, 15.1
 */

import { access, mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve, sep } from "node:path";

/**
 * The session directory for a given slug, relative to the workspace root
 * (`process.cwd()`). All artifacts for a page live under this directory.
 */
export const ROOT = (slug: string): string => `.planning/page-forge/${slug}`;

/**
 * Canonical artifact file names, keyed by pipeline phase output.
 */
export const ARTIFACT_NAMES = {
    brief: "00-BRIEF.md",
    direction: "01-DIRECTION.md",
    story: "02-STORY.md",
    componentMap: "03-COMPONENT-MAP.md",
    build: "04-BUILD.md",
    design: "05a-DESIGN.md",
    responsive: "05b-RESPONSIVE.md",
    performance: "05c-PERFORMANCE.md",
    review: "06-REVIEW.md",
    verification: "08-VERIFICATION.md",
    escalation: "08-ESCALATION.md",
} as const;

/**
 * The dimensions a correction loop can target.
 */
export type LoopDimension = "design" | "responsive" | "performance";

/**
 * The file name for the `n`-th correction loop targeting a given dimension:
 * `07-LOOP-<n>-<dimension>.md`.
 */
export function loopArtifactName(n: number, dim: LoopDimension): string {
    return `07-LOOP-${n}-${dim}.md`;
}

// ---------------------------------------------------------------------------
// Guarded IO
// ---------------------------------------------------------------------------

/**
 * Resolves the absolute path for an artifact and asserts it is contained within
 * the resolved session root. Throws synchronously (before any IO) if the
 * resolved path escapes `ROOT(slug)` — for example via `..` segments or an
 * absolute `name`. This is a programming-error guard, not a recoverable
 * condition (Req 1.4).
 */
function resolveWithinRoot(slug: string, name: string): string {
    const root = resolve(process.cwd(), ROOT(slug));
    const target = resolve(root, name);
    const contained = target === root || target.startsWith(root + sep);
    if (!contained) {
        throw new Error(
            `Refusing to write artifact outside the session directory: ` +
            `"${name}" resolves to "${target}", which escapes "${root}".`
        );
    }
    return target;
}

/**
 * Writes an artifact under `ROOT(slug)`, creating the directory as needed.
 *
 * The path-escape guard runs synchronously before the returned promise begins
 * any IO: if `name` resolves outside the session root the call throws
 * immediately rather than rejecting later (Req 1.4).
 */
export function persist(slug: string, name: string, content: string): Promise<void> {
    const target = resolveWithinRoot(slug, name);
    return writeArtifact(target, content);
}

async function writeArtifact(target: string, content: string): Promise<void> {
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, content, "utf8");
}

/**
 * Returns whether an artifact exists under `ROOT(slug)`.
 *
 * As with {@link persist}, the path-escape guard runs synchronously before any
 * IO (Req 1.4).
 */
export function verifyExists(slug: string, name: string): Promise<boolean> {
    const target = resolveWithinRoot(slug, name);
    return artifactExists(target);
}

async function artifactExists(target: string): Promise<boolean> {
    try {
        await access(target);
        return true;
    } catch {
        return false;
    }
}

// ---------------------------------------------------------------------------
// Front matter (YAML) + Markdown body
// ---------------------------------------------------------------------------

const FRONT_MATTER_DELIMITER = "---";

/**
 * Serializes a typed front-matter object plus a Markdown body into a single
 * artifact string: a YAML block delimited by `---` lines, followed by the body.
 *
 * Forms a true round-trip pair with {@link parseArtifact}.
 */
export function serializeArtifact<T>(front: T, body: string): string {
    const yaml = serializeYaml(front as unknown);
    return `${FRONT_MATTER_DELIMITER}\n${yaml}\n${FRONT_MATTER_DELIMITER}\n${body}`;
}

/**
 * Parses an artifact string into its typed front matter and Markdown body.
 *
 * When the string has no `---`-delimited front matter, the front matter is an
 * empty object and the whole string is treated as the body.
 *
 * Forms a true round-trip pair with {@link serializeArtifact}.
 */
export function parseArtifact<T>(raw: string): { front: T; body: string } {
    const match = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n([\s\S]*))?$/.exec(raw);
    if (!match) {
        return { front: {} as T, body: raw };
    }
    const yaml = match[1];
    const body = match[2] ?? "";
    const front = parseYaml(yaml) as T;
    return { front, body };
}

// ---------------------------------------------------------------------------
// Minimal block-style YAML (serializer)
// ---------------------------------------------------------------------------

type YamlScalar = string | number | boolean | null;

function isYamlScalar(value: unknown): value is YamlScalar {
    return (
        value === null ||
        typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "boolean"
    );
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * A bare key is safe to emit unquoted. Anything else is JSON-quoted so it
 * round-trips exactly.
 */
function serializeKey(key: string): string {
    return /^[A-Za-z0-9_-]+$/.test(key) ? key : JSON.stringify(key);
}

function serializeScalar(value: YamlScalar): string {
    if (value === null) {
        return "null";
    }
    if (typeof value === "boolean") {
        return value ? "true" : "false";
    }
    if (typeof value === "number") {
        // Non-finite numbers have no unambiguous YAML round-trip; persist as null.
        return Number.isFinite(value) ? String(value) : "null";
    }
    // Always double-quote strings so their type is unambiguous on parse.
    return JSON.stringify(value);
}

function serializeYaml(value: unknown): string {
    return serializeNode(value, 0).join("\n");
}

function serializeNode(value: unknown, indent: number): string[] {
    const pad = " ".repeat(indent);

    if (isYamlScalar(value)) {
        return [pad + serializeScalar(value)];
    }

    if (Array.isArray(value)) {
        return serializeSequence(value, indent);
    }

    if (isPlainObject(value)) {
        return serializeMapping(value, indent);
    }

    // Unsupported values (functions, undefined, symbols) collapse to null so the
    // output stays valid rather than throwing mid-serialization.
    return [pad + "null"];
}

function serializeMapping(obj: Record<string, unknown>, indent: number): string[] {
    const pad = " ".repeat(indent);
    const entries = Object.entries(obj);
    if (entries.length === 0) {
        return [pad + "{}"];
    }
    const out: string[] = [];
    for (const [key, value] of entries) {
        out.push(...serializeEntry(serializeKey(key), value, pad, indent));
    }
    return out;
}

function serializeSequence(items: unknown[], indent: number): string[] {
    const pad = " ".repeat(indent);
    if (items.length === 0) {
        return [pad + "[]"];
    }
    const out: string[] = [];
    for (const item of items) {
        if (isYamlScalar(item)) {
            out.push(pad + "- " + serializeScalar(item));
        } else if (isPlainObject(item)) {
            out.push(...serializeObjectSeqItem(item, indent));
        } else if (Array.isArray(item)) {
            // Nested sequence item: keep the type by wrapping in a deeper block.
            const nested = serializeNode(item, indent + 2);
            nested[0] = pad + "- " + nested[0].slice(indent + 2);
            out.push(...nested);
        } else {
            out.push(pad + "- null");
        }
    }
    return out;
}

/**
 * Serializes an object as a sequence item. The first entry sits inline after the
 * `- ` marker; continuation entries align two columns deeper.
 */
function serializeObjectSeqItem(obj: Record<string, unknown>, indent: number): string[] {
    const pad = " ".repeat(indent);
    const entries = Object.entries(obj);
    if (entries.length === 0) {
        return [pad + "- {}"];
    }
    const out: string[] = [];
    const contPad = pad + "  ";
    entries.forEach(([key, value], index) => {
        const marker = index === 0 ? pad + "- " : contPad;
        out.push(...serializeEntry(serializeKey(key), value, marker, indent + 2));
    });
    return out;
}

/**
 * Serializes a single `key: value` mapping entry. `linePad` is the exact prefix
 * for the key line (a normal indent, or a `- ` sequence marker); `childIndent`
 * is the indentation used for a nested block value.
 */
function serializeEntry(
    key: string,
    value: unknown,
    linePad: string,
    childIndent: number
): string[] {
    if (isYamlScalar(value)) {
        return [linePad + key + ": " + serializeScalar(value)];
    }
    if (Array.isArray(value) && value.length === 0) {
        return [linePad + key + ": []"];
    }
    if (isPlainObject(value) && Object.keys(value).length === 0) {
        return [linePad + key + ": {}"];
    }
    return [linePad + key + ":", ...serializeNode(value, childIndent + 2)];
}

// ---------------------------------------------------------------------------
// Minimal block-style YAML (parser)
// ---------------------------------------------------------------------------

interface YamlLine {
    indent: number;
    text: string;
}

function tokenize(src: string): YamlLine[] {
    return src
        .split(/\r?\n/)
        .filter((line) => line.trim().length > 0)
        .map((line) => ({
            indent: line.length - line.trimStart().length,
            text: line.trimStart(),
        }));
}

function parseYaml(src: string): unknown {
    const lines = tokenize(src);
    if (lines.length === 0) {
        return {};
    }
    // A lone top-level scalar (including `{}` / `[]`) is not a mapping entry.
    // `isSequenceScalarItem` disambiguates a quoted-string scalar (`"foo"`) from
    // a single-entry mapping whose key is quoted (`"": false`), which must be
    // parsed as a mapping rather than JSON-parsed as a scalar.
    if (
        lines.length === 1 &&
        !lines[0].text.startsWith("- ") &&
        isSequenceScalarItem(lines[0].text)
    ) {
        return parseScalar(lines[0].text);
    }
    const parser = new YamlParser(lines);
    return parser.parseNode(lines[0].indent);
}

function isScalarText(text: string): boolean {
    return (
        text.startsWith('"') ||
        text === "[]" ||
        text === "{}" ||
        text === "null" ||
        text === "true" ||
        text === "false" ||
        isNumberText(text)
    );
}

/**
 * Decide whether a sequence item (the text after `- `) is a pure scalar rather
 * than an inline mapping entry (an object sequence item).
 *
 * A quoted token is ambiguous: `"foo"` is a string scalar, but `"foo": bar` is
 * an object item whose first key is quoted. We disambiguate by scanning past a
 * leading quoted token: if a `:` mapping separator follows it, the item is an
 * object sequence item, not a scalar. Non-quoted scalars fall back to
 * {@link isScalarText}.
 */
function isSequenceScalarItem(text: string): boolean {
    if (text.startsWith('"')) {
        const end = findQuotedEnd(text, 0);
        const after = text.slice(end).trimStart();
        // `"key": value` → mapping entry (object item); `"just a string"` → scalar.
        return !after.startsWith(":");
    }
    return isScalarText(text);
}

function isNumberText(text: string): boolean {
    return /^-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(text);
}

function parseScalar(text: string): YamlScalar | unknown[] | Record<string, unknown> {
    if (text === "null") {
        return null;
    }
    if (text === "true") {
        return true;
    }
    if (text === "false") {
        return false;
    }
    if (text === "[]") {
        return [];
    }
    if (text === "{}") {
        return {};
    }
    if (text.startsWith('"')) {
        return JSON.parse(text) as string;
    }
    if (isNumberText(text)) {
        return Number(text);
    }
    // Fallback: treat unquoted, non-typed text as a plain string.
    return text;
}

/**
 * Splits a mapping line into its raw key and the trimmed remainder after the
 * colon. Handles JSON-quoted keys.
 */
function splitKeyValue(text: string): { key: string; rest: string } {
    let colon: number;
    if (text.startsWith('"')) {
        const end = findQuotedEnd(text, 0);
        colon = text.indexOf(":", end);
    } else {
        colon = text.indexOf(":");
    }
    const rawKey = text.slice(0, colon).trim();
    const key = rawKey.startsWith('"') ? (JSON.parse(rawKey) as string) : rawKey;
    return { key, rest: text.slice(colon + 1).trim() };
}

/**
 * Assign `key` on `obj` as an own, enumerable data property.
 *
 * Uses `Object.defineProperty` so dangerous keys such as `__proto__` become
 * real own properties rather than mutating the object's prototype. This keeps
 * the parser a faithful inverse of the serializer even for reserved key names.
 */
function safeSet(obj: Record<string, unknown>, key: string, value: unknown): void {
    Object.defineProperty(obj, key, {
        value,
        writable: true,
        enumerable: true,
        configurable: true,
    });
}

function findQuotedEnd(text: string, start: number): number {
    let i = start + 1;
    while (i < text.length) {
        if (text[i] === "\\") {
            i += 2;
            continue;
        }
        if (text[i] === '"') {
            return i + 1;
        }
        i += 1;
    }
    return text.length;
}

class YamlParser {
    private pos = 0;

    constructor(private readonly lines: YamlLine[]) { }

    parseNode(indent: number): unknown {
        const line = this.lines[this.pos];
        if (line !== undefined && line.text.startsWith("- ")) {
            return this.parseSequence(indent);
        }
        return this.parseMapping(indent);
    }

    private parseMapping(indent: number): Record<string, unknown> {
        const obj: Record<string, unknown> = {};
        while (this.pos < this.lines.length) {
            const line = this.lines[this.pos];
            if (line.indent !== indent || line.text.startsWith("- ")) {
                break;
            }
            const { key, rest } = splitKeyValue(line.text);
            this.pos += 1;
            safeSet(obj, key, this.parseValue(rest, indent));
        }
        return obj;
    }

    private parseSequence(indent: number): unknown[] {
        const arr: unknown[] = [];
        while (this.pos < this.lines.length) {
            const line = this.lines[this.pos];
            if (line.indent !== indent || !line.text.startsWith("- ")) {
                break;
            }
            const itemText = line.text.slice(2);
            if (isSequenceScalarItem(itemText)) {
                this.pos += 1;
                arr.push(parseScalar(itemText));
            } else {
                arr.push(this.parseObjectSeqItem(itemText, indent));
            }
        }
        return arr;
    }

    /**
     * Parses an object sequence item whose first entry is inline on the `- `
     * line; continuation entries live at `indent + 2`.
     */
    private parseObjectSeqItem(firstEntry: string, indent: number): Record<string, unknown> {
        const childIndent = indent + 2;
        const { key, rest } = splitKeyValue(firstEntry);
        this.pos += 1;
        const obj: Record<string, unknown> = {};
        safeSet(obj, key, this.parseValue(rest, childIndent));
        const rest2 = this.parseMapping(childIndent);
        for (const k of Object.keys(rest2)) {
            safeSet(obj, k, rest2[k]);
        }
        return obj;
    }

    /**
     * Resolves a mapping value: an inline scalar when `rest` is present,
     * otherwise the nested block that follows.
     */
    private parseValue(rest: string, indent: number): unknown {
        if (rest !== "") {
            return parseScalar(rest);
        }
        const next = this.lines[this.pos];
        if (next !== undefined && next.indent > indent) {
            return this.parseNode(next.indent);
        }
        return null;
    }
}
