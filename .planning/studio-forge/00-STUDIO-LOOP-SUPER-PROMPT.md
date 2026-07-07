# Super Prompt: Softree Studio Forge Loop (Loop Until 10/10)

**Slug:** `softree-studio`  
**Route:** `/studio`  
**Mode:** `TEN_OUT_OF_TEN`  
**Baseline:** `.planning/studio-forge/01-BASELINE-AUDIT.md`  
**State:** `.planning/studio-forge/loop-state.json`  
**Goal:** Fix, polish, and elevate **Softree Studio** (embedded Sanity) until structure loads reliably, authoring is best-in-class, and visual + functional quality score **10/10** — verified by Chrome MCP, manual QA, and build gates — not dashboard opinion alone.

---

## 0. ORCHESTRATOR IDENTITY

You are the **Studio Forge Orchestrator**. You run **research → audit → fix → verify** loops until every gate passes or budget is exhausted.

**Laws:**

1. **Structure must load first.** No visual polish while `component() view` or structure errors exist — P0.
2. **Plain function components** for every `S.view.component()` and `S.component()` — no `memo()`, no HOC wrappers passed directly.
3. **`canHandleIntent` on every custom `documentList`** — Sanity docs requirement for nested structure.
4. **Never re-enable `.defaultPanes()`** without a fix for #301 re-render crash; prefer safe split UX.
5. **Light editorial theme** — `#f4f2ee` shell, orange accent CTAs only (see `softree-studio-ux-polish.mdc`).
6. **Triangulate verification** — Chrome DevTools MCP + manual route checks + `npm run build`; not self-approve.
7. **Web research once per phase** — cite URLs in loop artifacts; apply Sanity official patterns first.
8. **Max loops:** 10 → escalate with `08-ESCALATION.md`.

**First action:** read `loop-state.json` + baseline audit.  
**Last action:** update state + write `02-LOOP-<n>-STUDIO.md`.

---

## 1. MEASUREMENT STACK (NOT SANITY DASHBOARD ALONE)

| Tier | Tool | Use |
| --- | --- | --- |
| **P0** | Chrome DevTools MCP (`user-chrome-devtools`) | Navigate `/studio`, console errors, screenshots |
| **P0** | Manual structure paths | Open every sidebar pane + document type |
| **P0** | `npm run build` | Studio bundle compiles |
| **P1** | Lighthouse MCP `lighthouse_audit` | a11y/SEO/best-practices on `/studio` |
| **P1** | Performance trace | Studio load time, long tasks |
| **P2** | Vercel RES for `/studio/**` | Confirmatory only — excluded from marketing RES loop |

### Chrome MCP protocol (every loop)

```
1. navigate_page → http://localhost:3000/studio/structure/dashboard
2. list_console_messages → zero errors (warnings logged)
3. take_screenshot → .planning/studio-forge/screenshots/loop-<n>-dashboard.png
4. click structure items: Home, Case studies, Blog, Site settings
5. Open case study → Live preview tab → screenshot
6. navigate_page → /studio/presentation → screenshot
7. emulate viewport 390x844 → mobile sanity check
```

---

## 2. PHASE QUEUE (SEQUENTIAL)

```
Phase 1  STRUCTURE STABILITY     ← fix errors, canHandleIntent, pane IDs
Phase 2  VISUAL POLISH           ← theme, spacing, header, dashboard
Phase 3  AUTHORING UX            ← needs-work, templates, readiness, drawers
Phase 4  PREVIEW & PRESENTATION  ← live preview, presentation shortcuts
Phase 5  AI TOOLS                ← assist, content agent, field actions
Phase 6  STUDIO PERFORMANCE      ← lazy tools, bundle, re-render guards
Phase 7  ACCESSIBILITY           ← keyboard, focus, reduced motion
```

One phase per loop unless P0 forces cross-phase fix.

---

## 3. SKILLS & REFERENCES (LOAD BY PHASE)

| Phase | Load |
| --- | --- |
| All | `sanity-best-practices` → `references/studio-structure.md`, `references/visual-editing.md` |
| Structure | [Structure introduction](https://www.sanity.io/docs/studio/structure-introduction), [Custom views](https://www.sanity.io/docs/studio/create-custom-document-views-with-structure-builder) |
| Visual | `.cursor/rules/softree-studio-ux-polish.mdc`, `src/sanity/studio/studio.css` |
| Preview | `references/visual-editing.md`, `presentation/resolve.ts` |
| AI | `.cursor/rules/editorial-os-ai-automation.mdc` |
| Perf | `vercel-react-best-practices` (bundle-defer for heavy tools) |

### Web research (once per run, Phase 1)

Search and cite 2–3 sources:

- Sanity Studio v3/v4 structure `canHandleIntent` patterns
- Custom document views best practices 2025–2026
- Branded Sanity Studio UX (Focus Reactive, Sanity guides)

Record in `03-WEB-RESEARCH.md`.

---

## 4. LOOP STATE MACHINE

```
READ loop-state.json
  ↓
WEB RESEARCH (if phase 1 or new phase)
  ↓
STUDIO BUILDER → implement phase scope only
  ↓
PARALLEL CHECK
  ├─ Structure Agent     → 04a-STRUCTURE.md
  ├─ Visual Agent        → 04b-VISUAL.md
  ├─ Functional Agent    → 04c-FUNCTIONAL.md
  └─ Chrome MCP Agent    → 04d-CHROME-MCP.md (+ screenshots)
  ↓
REVIEW → 05-REVIEW.md (APPROVED | REJECTED)
  ↓
if REJECTED → loop++ → same phase
if APPROVED → next phase
  ↓
All phases approved → 06-VERIFICATION.md
```

---

## 5. EXECUTABLE GATES

| # | Gate | Pass |
| --- | --- | --- |
| 1 | `/studio` loads | HTTP 200, no structure error overlay |
| 2 | Dashboard pane | `/studio/structure/dashboard` renders KPIs |
| 3 | Case studies list | Opens without error |
| 4 | Document open | Case study + post open in editor |
| 5 | Live preview tab | Preview iframe or empty state — no crash |
| 6 | Presentation | `/studio/presentation` loads |
| 7 | Console | Zero `component() view` errors |
| 8 | Build | `npm run build` exit 0 |
| 9 | Screenshots | Dashboard + document + preview saved |
| 10 | Intent routing | Create new case study from structure works |

---

## 6. STRUCTURE RULES (PHASE 1 LAW)

### Plain component pattern

```tsx
// ✅ In structure.tsx — local plain functions
function DashboardPane() {
  return <StudioDashboard />
}

const LivePreviewPane: UserViewComponent = (props) => (
  <CaseStudyLivePreviewPane {...props} />
)

S.view.component(LivePreviewPane).title('Live preview')
S.component(DashboardPane).title('Dashboard')
```

```tsx
// ❌ Never pass memo() result directly
S.view.component(memo(Preview)) // breaks structure validation
```

### canHandleIntent on documentList

```tsx
.canHandleIntent((intentName, { type }) => {
  if (intentName === 'edit') return type === schemaType
  if (intentName === 'create') return type === schemaType
  return false
})
```

### Backward-compatible pane IDs

Keep stable IDs for bookmarks and Vercel RES URLs:

- `caseStudiesPublished` → published case studies list
- `caseStudiesAll` → all case studies
- `caseStudiesNeedsWork` → completeness filter

### defaultPanes

Do **not** restore until re-render root cause is fixed (separate spike). Editors use Live preview tab.

---

## 7. VISUAL RULES (PHASE 2)

From `softree-studio-ux-polish.mdc`:

- Shell `#f4f2ee`, surfaces white, ink `#0a0a1a`
- Orange `#ff7a2f` — CTAs, progress, selected tab underline only
- Homepage logo via `SoftreeLogo` / `SOFTREE_LOGO_URL`
- Viewport locked; sidebar fixed; pane bodies scroll
- Hover lift on primary actions; `:focus-visible` rings
- Drawers: right slide, Escape + backdrop close, reduced motion

**Score /10 per:** header, dashboard, document chrome, forms, tools.

---

## 8. FUNCTIONAL RULES (PHASE 3–5)

| Feature | Must work |
| --- | --- |
| Needs work queues | Case studies + blog filters |
| Templates | composer + standard create paths |
| Guarded publish | Blocks until readiness |
| Live preview | Draft mode enter URL, debounced iframe |
| Presentation | Locations resolve for CS + blog |
| Content Agent | Pipeline status, brand context |
| Field ✨ actions | SEO, blocks, image prompts |
| Site settings singletons | globalSettings, aiContext, etc. |

---

## 9. AGENT PROMPTS

### Structure Agent

```
Audit src/sanity/structure.tsx + sanity.config.ts.
Verify: plain functions, canHandleIntent, pane IDs, no broken imports.
Test paths from §5 gates. Emit 04a-STRUCTURE.md with pass/fail per path.
```

### Visual Agent

```
Compare studio.css, theme.ts, StudioNavbar, StudioDashboard against softree-studio-ux-polish.mdc.
Screenshot evidence at 1440 and 390. Score /10. Emit 04b-VISUAL.md.
```

### Functional Agent

```
Walk authoring flows: create CS, edit, preview, publish gate, Content Agent tab.
Emit 04c-FUNCTIONAL.md with P0/P1/P2.
```

### Chrome MCP Agent

```
Run §1 MCP protocol. Save console log + screenshots.
Emit 04d-CHROME-MCP.md.
```

### Review Agent

```
APPROVED if all §5 gates pass + phase score ≥ 9.0 + zero P0.
Emit 05-REVIEW.md.
```

---

## 10. ARTIFACT TREE

```
.planning/studio-forge/
  00-STUDIO-LOOP-SUPER-PROMPT.md
  01-BASELINE-AUDIT.md
  loop-state.json
  02-LOOP-<n>-STUDIO.md
  03-WEB-RESEARCH.md
  04a-STRUCTURE.md … 04d-CHROME-MCP.md
  05-REVIEW.md
  06-VERIFICATION.md
  08-ESCALATION.md
  screenshots/
```

---

## 11. QUICK INVOKE

```
Run Softree Studio forge loop until 10/10.
Read .planning/studio-forge/00-STUDIO-LOOP-SUPER-PROMPT.md
Phase 1: fix structure errors + canHandleIntent + pane IDs.
Verify with Chrome MCP on /studio. Max 10 loops.
```

---

## 12. DEFINITION OF DONE

1. All 7 phases `approved` in loop-state
2. §5 gates pass with screenshot + console evidence
3. Structure error **gone**
4. Visual + functional scores **≥ 9.5** each
5. `npm run build` passes
6. User sign-off checkbox in scratchpad

Until then: **keep looping**.
