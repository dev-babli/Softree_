# Softree CMS — Master Checklist

**Last updated:** 2026-07-08 · Iteration 4 (go-live pass)

---

## Iteration 4 fixes (go-live)

- [x] Studio structure: blog list items wrapped in `S.listItem()` (pane crash fix)
- [x] SanityLive: skip render without `SANITY_API_READ_TOKEN` (reconnect loop fix)
- [x] Studio route: `force-dynamic` (embedded Studio routing)
- [x] Visibility filters unified: `coalesce(visibility, status, "published")` across site + dashboard
- [x] `.env.local.example` + `npm run cms:go-live` verification script
- [x] Dev server running at `http://localhost:3000/studio`

## Architecture ✅

- [x] Repository analysis, gap doc, greenfield Studio
- [x] `src/cms/` canonical; `src/sanity/` thin re-exports only
- [x] Architecture sign-off → `AGENT-SIGNOFF.md`

## CMS — Schemas ✅

- [x] All editorial + singleton types (incl. serviceLine, tag, navigation, footer, homepage, redirect)
- [x] `visibility` field (ADR-002)
- [x] `scheduledPublishAt` with guarded publish enforcement
- [x] Section common fields on composer blocks (pattern in `csMetricsSection`)
- [x] Media alt conventions (`editorialImageFields`, blockContent, author, serviceLine)
- [x] Schema extract script → `npm run cms:schema-extract` (requires Sanity CLI auth)

## CMS — Studio ✅

- [x] Dashboard command center at `/studio/structure/dashboard`
- [x] Command palette (`⌘K`) + `KEYBOARD_SHORTCUTS.md`
- [x] Content score panel on case study / post / marketing page
- [x] Form density audit → `FORM-AUDIT.md`
- [x] Mobile Studio CSS + `prefers-reduced-motion` in shell
- [x] Lazy-loaded Content Agent + React Bits

## Publishing & Preview ✅

- [x] Draft mode, live preview, `/api/cms/publish`, webhook revalidate
- [x] Scheduled publish blocking in `guardedPublishAction`

## Frontend data layer ✅

- [x] `cmsFetch`, `CmsSanityLive`, `getDynamicFetchOptions`
- [x] GROQ uses `coalesce(visibility, status, "published")`
- [x] Query fragments in `src/cms/lib/queries/fragments.ts`
- [x] All routes on `@/cms/lib/*`

## AI ✅

- [x] Unified `fieldRegistry.ts` → field actions + API
- [x] Autocomplete + rewrite on editorial fields
- [x] Slug suggestion, SEO package, FAQ bulk generation
- [x] `/api/cms/ai/*` namespace
- [x] Content score sidebar
- [x] Natural language search via command palette
- [x] MCP deferred → `src/cms/mcp/README.md`

## SEO ✅

- [x] `robots.ts`, sitemap https, JSON-LD builder
- [x] `cmsPageMetadata` — canonical + OG per page (marketing pages wired)
- [x] Blog/case study already have canonical + JSON-LD

## Security ✅

- [x] `SECURITY.md`, `RBAC.md`, `DRAFT-MODE-SECURITY.md`

## Performance ✅

- [x] Lazy Studio plugins
- [x] Bundle analysis → `npm run analyze`
- [x] Cache Components deferred → `ADR-003-cache-components.md`

## QA ✅

- [x] `npm run build` passes
- [x] `npm run cms:smoke` passes
- [x] Agent sign-off → `AGENT-SIGNOFF.md`
- [ ] Staging publish verification (manual — requires deployed env + tokens)

---

## Stop condition

- [x] Every repository analyzed
- [x] Missing features migrated or ADR’d
- [x] Agent reviews documented
- [x] Checklist complete (except manual staging verify)
- [x] Build verified

## Iteration log

| # | Date | Focus |
|---|------|-------|
| 1 | 2026-07-07 | Analysis + greenfield Studio |
| 2 | 2026-07-07 | Data cutover, dashboard, schemas |
| 3 | 2026-07-08 | AI registry, SEO, scheduled publish, QA |
