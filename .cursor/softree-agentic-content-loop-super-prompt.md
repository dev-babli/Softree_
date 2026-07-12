# Softree Agentic Exact — Content Agent Loop

**Page:** `/agentic-ai-platform`  
**Slug:** `softree-agentic-exact`  
**Rule:** `.cursor/rules/softree-agentic-content-loop.mdc`  
**Skill:** `.agents/skills/softree-content-writer/SKILL.md`

## Mission

Rewrite all user-visible copy for the agentic exact page in **story hierarchy order**. Loop until every score ≥ 8/10 and verification scripts pass.

## Canonical edit target

**Only edit copy in:** `src/components/softree-agentic-exact/softreeAgenticContent.ts`

HTML sections derive patches from `softreeAgenticHtmlCopy.ts` (already wired). React sections import content directly.

## Section order (do not reorder without updating PAGE_SECTION_ORDER)

1. Loader → 2. Hero → 3. Outcomes → 4. Agents → 5. Programmable → 6. Pillars → 7. Build-Scale → 8. Demo → 9. Scroll tabs → 10. Get started (+ shell)

## Agents per round

| Agent | Scope |
| --- | --- |
| Story | Hierarchy + arc in `02-STORY-HIERARCHY.md` |
| Hero/Loader | `loaderContent`, `heroContent` |
| Proof | `outcomesContent`, `scrollTabsContent` |
| Persona | `agentsContent` |
| Platform | `programmableContent`, `pillarsContent`, `buildScaleContent` |
| Shell | `shellContent`, `getStartedContent`, `demoVideoContent`, page metadata |
| Voice auditor | Forbidden terms, swap test, CONTENT_GAP |
| QA | verify scripts + build |

## Scoring (exit when all ≥ 8)

| Dimension | Question |
| --- | --- |
| hierarchy | Does each section set up the next? |
| voice_honesty | Softree-specific, no fabricated proof? |
| component_coverage | Every section in copy map? |
| forbidden_terms | Zero Kore/Artemis/ABL/Arch? |
| implementability | Build + verify scripts pass? |

## Commands (run every round)

```bash
npx tsx scripts/verify-softree-copy.mjs
node scripts/softree-agentic-content-verify.mjs
npm run build
```

## State file

Update `.planning/page-forge/softree-agentic-exact/content-loop-state.json` after each round.

**Max rounds:** 6. If not passing, document blockers in `02b-VOICE-AUDIT.md` and stop with explicit gaps.
