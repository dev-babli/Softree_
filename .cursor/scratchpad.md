# Task: Kore AI Exact Page Loop

## ATLAS v3 — Live

**182 knowledge atoms** in `.cursor/knowledge/{00-21}-*/`

```bash
npm run atlas:bootstrap      # refresh scaffolds + migrate
npm run atlas:knowledge search "KoreAI"
npm run atlas:patterns list  # Pattern Engine moat
npm run atlas:improve
```

**Pattern Engine:** `knowledge-engine/patterns/` — learns from `20-memory/audits/`

**Prompts:** `.cursor/prompts/WebsiteAudit.md` etc.

**Constitution:** `.cursor/rules/atlas-constitution.mdc`

---

## ATLAS Page Revamp

**Master prompt:** `.cursor/atlas-revamp-super-prompt.md`  
**System overview:** `.cursor/ATLAS.md`  
**Knowledge brain:** `.cursor/knowledge/` (thinking-principles.md first)  
**State:** `.cursor/atlas-loop-state.json`  
**Research output:** `design-reference/DESIGN-BRIEF.md`

**Target bar:** Awwwards SOTD / Apple / Kore.ai · self-correcting verifier loop · max 6 iterations/page

**Default page queue:** about-us → /ai → offshore-ai-development → offshore-generative-ai → website-modernization → ai-powered-test-automation → case-studies/ai

**Invoke (full queue):**
```
Run ATLAS. Read .cursor/atlas-revamp-super-prompt.md — paste PROMPT into Plan mode.
Phase 1: screenshot kore.ai + craft refs → DESIGN-BRIEF.md. Then loop page 1.
```

**Invoke (single page):**
```
Run ATLAS Complete Loop on /about-us only. Follow atlas-revamp-super-prompt.md.
```

---

- [x] **COMPONENT CLONE LOOP — ALL 12/12 APPROVED** (10/10 each @ :3001)
- [x] Handoff loop 3 — 13/13 gates pass
- [x] Loader layout fix — display-5 + flex center (0px delta vs live Kore @ 1536)
- [x] Hero text visibility fix — z-index stacking + handoff reveal lock
- [x] Hero bg fix — isolation isolate + z-index 0/1/2 layering (see 16-LOOP-HERO-BG-ERROR-CORRECTION.md)
- [x] Light theme fix — agents / programmable / pillars reveal + Kore copy (see 17-LOOP-LIGHT-THEME-ERROR-CORRECTION.md)
- [x] Handoff loop 5 — 13/13 gates pass
- [ ] User visual sign-off on full page

## RES Performance Loop (NEW)

**Baseline:** Global RES **49** · FCP 3.28s · LCP 4.54s · INP 704ms · CLS 0  
**Target:** RES **≥ 95** · 10/10 mode  
**Super prompt:** `.planning/res-performance/00-RES-LOOP-SUPER-PROMPT.md`  
**State:** `.planning/res-performance/loop-state.json`

**Measurement (NOT Vercel-only):**
1. **Chrome DevTools MCP** — `performance_start_trace` + `LCPBreakdown` (primary)
2. **CLI Lighthouse** — `npx lighthouse` mobile (cross-check)
3. **Network waterfall** — MCP `list_network_requests`
4. **Bundle** — `npm run analyze`
5. **Triangulation** — sources must agree
6. **Vercel RES** — confirmatory after deploy only

**Invoke:**
```
Run RES loop until 10/10. Chrome MCP trace + Lighthouse + triangulation. Not Vercel-only.
```

## Softree Studio Forge Loop (NEW)

**Route:** `/studio`  
**Target:** 10/10 visual + functional + structure stability  
**Super prompt:** `.planning/studio-forge/00-STUDIO-LOOP-SUPER-PROMPT.md`  
**State:** `.planning/studio-forge/loop-state.json`

**Loop 1 done (structure):** plain-function views, `canHandleIntent`, Published/Drafts lists, Presentation sidebar

**Loop 2 done:** empty editor fix — Story tab default + welcome panel

**Loop 3 done (single-path UX):** ONE create path per type; global Create filtered to 3 templates; category in form; PostEditorWelcome; see `03-LOOP-3-STUDIO.md`

**Loop 4 done (dashboard redesign):** Workspace-first layout; see `04-LOOP-4-DASHBOARD.md`

**Loop 5 done (Command Center):** Vercel Speed Insights reference — site pulse, per-page scores, top pages, content issues; see `05-LOOP-5-COMMAND-CENTER.md` + `05-DASHBOARD-REFERENCE.md`

**COS registration:** `npm run sanity:connect` for **localhost:3000** (dev pinned to 3000)

**Verify:** Chrome MCP on `/studio/structure/dashboard` + click **Register studio** after `sanity:connect`

**Invoke:**
```
Run Studio forge loop until 10/10. Read 00-STUDIO-LOOP-SUPER-PROMPT.md. Phase 1 structure.
```

## Approved components

loader-hero · enterprise-outcomes · ai-agents · ai-programmable · pillars · build-scale-optimize · demo-video · scroll-tabs · get-started · shell-header · shell-footer · modals

## Replay

`http://localhost:3001/kore-ai-component?replay-loader=1`

## Verify all

```bash
npm run component:verify -- loader-hero 1
npm run handoff:verify -- 3
```
