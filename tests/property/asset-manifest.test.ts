/**
 * Property 10: Asset Manifest Well-Formedness
 *
 * Validates: Requirements 24.1, 24.2, 24.3, 24.4, 24.5
 *
 * For any asset URL appearing in Source_Document at any of the declared
 * selectors and attributes (`<img src>`, `<img srcset>`, `<source src>`,
 * `<source srcset>`, `<video src>`, `<video poster>`, `<a href>` to CDN,
 * `<link href>` for stylesheet/icon/preload, `data-rive-src`, inline-style
 * `url(...)`, `<style>` block `url(...)`), the URL appears in exactly one
 * entry of `assets.ts`. Conversely, every entry in `assets.ts` appears in
 * Source_Document at one of the declared selector/attribute pairs.
 *
 * For any entry E with `kind === 'cdn-passthrough'`, E.url matches the
 * source URL byte-for-byte (scheme, host, path, query, fragment, and
 * percent-encoding). For any entry E with `kind === 'local'`, the file
 * exists at `public${E.url}`. For any entry E referring to a `.riv` file,
 * E has a `fallback` field whose `kind === 'local'` and whose file exists
 * on disk.
 */

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { assets } from '../../src/components/kore/assets';

// ---------------------------------------------------------------------------
// Workspace + inventory paths
// ---------------------------------------------------------------------------

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..', '..');
const SOURCE_HTML_PATH = path.join(ROOT, 'public', 'kore-source-sections.html');
const INVENTORY_PATH = path.join(
    ROOT,
    'scripts',
    '.kore-asset-inventory.json',
);
const PUBLIC_DIR = path.join(ROOT, 'public');

// Read sources up-front so each `it` block reuses the same parsed state.
const SOURCE_HTML = fs.readFileSync(SOURCE_HTML_PATH, 'utf8');

interface InventoryEntry {
    url: string;
    kind: 'cdn-passthrough' | 'local';
    basename: string;
    ext: string;
    sources: string[];
    fallback?: { kind: 'local'; url: string; basename: string; ext: string };
}

const INVENTORY = JSON.parse(
    fs.readFileSync(INVENTORY_PATH, 'utf8'),
) as Record<string, Record<string, InventoryEntry>>;

// ---------------------------------------------------------------------------
// Manifest leaf collection
// ---------------------------------------------------------------------------

interface ManifestLeaf {
    section: string;
    id: string;
    url: string;
    kind: 'cdn-passthrough' | 'local';
    fallback?: { kind: 'local'; url: string };
}

function collectManifestLeaves(): ManifestLeaf[] {
    const leaves: ManifestLeaf[] = [];
    for (const [section, bucket] of Object.entries(assets)) {
        for (const [id, entry] of Object.entries(
            bucket as Record<
                string,
                {
                    kind: 'cdn-passthrough' | 'local';
                    url: string;
                    fallback?: { kind: 'local'; url: string };
                }
            >,
        )) {
            leaves.push({
                section,
                id,
                url: entry.url,
                kind: entry.kind,
                fallback: entry.fallback,
            });
        }
    }
    return leaves;
}

const MANIFEST_LEAVES = collectManifestLeaves();
const MANIFEST_URLS = MANIFEST_LEAVES.map((l) => l.url);

// ---------------------------------------------------------------------------
// Source_Document URL collection (canonical via the inventory)
// ---------------------------------------------------------------------------

function collectInventoryUrls(): string[] {
    const urls: string[] = [];
    for (const bucket of Object.values(INVENTORY)) {
        for (const entry of Object.values(bucket)) {
            urls.push(entry.url);
        }
    }
    return urls;
}

const INVENTORY_URLS = collectInventoryUrls();

// ---------------------------------------------------------------------------
// PART A — Bidirectional 1:1 mapping (Req 24.1, 24.5)
// ---------------------------------------------------------------------------

describe('Property 10: Asset Manifest Well-Formedness', () => {
    it('PART A — bidirectional 1:1 mapping: Source_Document URLs ↔ assets.ts leaves (Req 24.1, 24.5)', () => {
        // Each manifest URL must appear at most once as a leaf (no duplicates).
        const manifestSet = new Set(MANIFEST_URLS);
        expect(MANIFEST_URLS.length).toBe(manifestSet.size);

        // Each inventory URL must appear at most once.
        const inventorySet = new Set(INVENTORY_URLS);
        expect(INVENTORY_URLS.length).toBe(inventorySet.size);

        // Source ⊆ assets.ts: every URL extracted from Source_Document at a
        // declared selector/attribute pair has exactly one matching entry.
        const missingFromManifest = INVENTORY_URLS.filter(
            (u) => !manifestSet.has(u),
        );
        expect(
            missingFromManifest,
            `Source_Document URLs not present in assets.ts:\n${missingFromManifest.join('\n')}`,
        ).toEqual([]);

        // assets.ts ⊆ Source: every leaf URL appears verbatim in
        // Source_Document. We use the canonical inventory as the extraction
        // result (produced by scripts/extract-kore-assets.mjs over the same
        // declared selector/attribute pairs).
        const orphanInManifest = MANIFEST_URLS.filter(
            (u) => !inventorySet.has(u),
        );
        expect(
            orphanInManifest,
            `assets.ts leaves with no matching Source_Document URL:\n${orphanInManifest.join('\n')}`,
        ).toEqual([]);

        // Cardinality equality — explicit final check.
        expect(MANIFEST_URLS.length).toBe(INVENTORY_URLS.length);
    });

    // -----------------------------------------------------------------------
    // PART B — Local file existence on disk (Req 24.3, 24.4)
    // -----------------------------------------------------------------------

    it('PART B — every `local` URL (and every `.riv` fallback) resolves to a file on disk (Req 24.3, 24.4)', () => {
        // Collect every required local file path.
        type LocalCheck = {
            label: string;
            url: string;
            absPath: string;
        };
        const localChecks: LocalCheck[] = [];
        for (const leaf of MANIFEST_LEAVES) {
            if (leaf.kind === 'local') {
                localChecks.push({
                    label: `${leaf.section}.${leaf.id}`,
                    url: leaf.url,
                    absPath: path.join(PUBLIC_DIR, leaf.url),
                });
            }
            if (leaf.fallback?.kind === 'local') {
                localChecks.push({
                    label: `${leaf.section}.${leaf.id}.fallback`,
                    url: leaf.fallback.url,
                    absPath: path.join(PUBLIC_DIR, leaf.fallback.url),
                });
            }
        }

        // Sanity: at least one local path exists to verify (otherwise the
        // .riv fallbacks would still cover the file-existence assertion).
        expect(localChecks.length).toBeGreaterThan(0);

        // First, exhaustively assert every required file exists with a
        // non-zero byte length. This gives precise diagnostics on the
        // failing path rather than a sampled counter-example.
        for (const c of localChecks) {
            const exists = fs.existsSync(c.absPath);
            expect(
                exists,
                `Expected local asset to exist on disk for ${c.label}: ${c.absPath} (url=${c.url})`,
            ).toBe(true);
            const size = fs.statSync(c.absPath).size;
            expect(
                size,
                `Expected local asset to be non-empty for ${c.label}: ${c.absPath}`,
            ).toBeGreaterThan(0);
        }

        // Property-based sampling: pick arbitrary subsets and re-verify
        // (deterministic given the seed), confirming the file-existence
        // invariant holds across every randomly-drawn slice.
        fc.assert(
            fc.property(
                fc.subarray(localChecks, {
                    minLength: 1,
                    maxLength: localChecks.length,
                }),
                (sample) => {
                    for (const c of sample) {
                        if (!fs.existsSync(c.absPath)) return false;
                        if (fs.statSync(c.absPath).size <= 0) return false;
                    }
                    return true;
                },
            ),
            { numRuns: 50 },
        );
    });

    // -----------------------------------------------------------------------
    // PART C — Rive fallback completeness (Req 24.4)
    // -----------------------------------------------------------------------

    it('PART C — every `.riv` entry carries a `local` fallback under `/kore/rive/` (Req 24.4)', () => {
        const rivLeaves = MANIFEST_LEAVES.filter((l) => l.url.endsWith('.riv'));

        // Sanity: Source_Document declares Rive on the Hero block, so we
        // expect at least one .riv entry in the manifest.
        expect(rivLeaves.length).toBeGreaterThan(0);

        for (const leaf of rivLeaves) {
            expect(
                leaf.fallback,
                `Expected fallback on .riv entry ${leaf.section}.${leaf.id}`,
            ).toBeDefined();
            expect(leaf.fallback?.kind).toBe('local');
            expect(
                leaf.fallback?.url.startsWith('/kore/rive/'),
                `Expected fallback URL under /kore/rive/ for ${leaf.section}.${leaf.id}; got ${leaf.fallback?.url}`,
            ).toBe(true);
            // And the fallback file must already exist on disk.
            const absPath = path.join(PUBLIC_DIR, leaf.fallback!.url);
            expect(
                fs.existsSync(absPath),
                `Expected .riv fallback on disk for ${leaf.section}.${leaf.id}: ${absPath}`,
            ).toBe(true);
        }
    });

    // -----------------------------------------------------------------------
    // PART D — CDN passthrough URL preservation (Req 24.2)
    // -----------------------------------------------------------------------

    it('PART D — every `cdn-passthrough` URL is preserved byte-for-byte and lives on the Webflow CDN host (Req 24.2)', () => {
        const cdnLeaves = MANIFEST_LEAVES.filter(
            (l) => l.kind === 'cdn-passthrough',
        );

        // Sanity: the manifest contains many CDN-passthrough entries.
        expect(cdnLeaves.length).toBeGreaterThan(0);

        // Host invariant: every CDN-passthrough URL starts with the canonical
        // CDN origin.
        for (const leaf of cdnLeaves) {
            expect(
                leaf.url.startsWith('https://cdn.prod.website-files.com/'),
                `Expected CDN host for ${leaf.section}.${leaf.id}; got ${leaf.url}`,
            ).toBe(true);
        }

        // Byte-for-byte preservation: the literal URL string must appear
        // verbatim in Source_Document. We do an exhaustive scan first for
        // precise diagnostics, then a fast-check sampled re-verification
        // for property coverage across random slices.
        const missing: string[] = [];
        for (const leaf of cdnLeaves) {
            if (!SOURCE_HTML.includes(leaf.url)) {
                missing.push(`${leaf.section}.${leaf.id}: ${leaf.url}`);
            }
        }
        expect(
            missing,
            `CDN-passthrough URLs not preserved byte-for-byte in Source_Document:\n${missing.join('\n')}`,
        ).toEqual([]);

        fc.assert(
            fc.property(
                fc.subarray(cdnLeaves, {
                    minLength: 1,
                    maxLength: cdnLeaves.length,
                }),
                (sample) => sample.every((leaf) => SOURCE_HTML.includes(leaf.url)),
            ),
            { numRuns: 50 },
        );
    });
});
