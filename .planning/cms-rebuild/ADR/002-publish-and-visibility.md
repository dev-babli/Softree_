# ADR-002: Publish and Website Visibility

**Status:** Proposed  
**Date:** 2026-07-07  
**Agents:** 2 (CMS), 4 (Sanity), 8 (Security)

## Context

Current Softree CMS has **two publish concepts**:

1. Sanity draft → published (Content Lake)
2. Custom `status` field (`published` | `draft` | `archived`) gating website GROQ

This caused bugs: stories published in Sanity but hidden on site; `MarkLiveOnWebsiteAction` workarounds; network errors on patch+publish race.

## Decision

1. **Website visibility follows Sanity publish** — published perspective = visible on site
2. Replace `status` with `visibility`:
   - `visible` — live on site (default when published)
   - `hidden` — published in Sanity but excluded from public queries (edge cases)
   - `archived` — soft-delete, 404 on site
3. **Unpublished Sanity drafts** never appear on site (existing draft mode excepted)
4. **Server publish API** for status-only go-live (`/api/cms/publish`)
5. **No client-side full-document transactions** from Studio actions

## Rationale

- One mental model for editors: "Publish = live"
- `hidden` covers "published but not listed" without faking Sanity draft state
- Server-side publish avoids browser network errors on large documents

## Migration

```groq
// Old
coalesce(status, "published") == "published"

// New
visibility != "archived" && !(_id in path("drafts.**"))
// + coalesce(visibility, "visible") == "visible"
```

Map: `status: draft` → `visibility: hidden` OR unpublish; `status: published` → `visible`; `status: archived` → `archived`

## Consequences

- Simpler publish action (no dual patch)
- Must update all GROQ queries in migration
- Editors lose "Sanity published but website draft" — intentional
