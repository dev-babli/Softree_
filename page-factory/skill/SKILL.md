---
name: page-factory
description: Generate an awwwards-level page with the multi-agent Page Factory pipeline (design research → storytelling → parallel builds → QA gauntlet loop with correction agents). Use when the user asks to generate, rebuild, or "factory" a page.
---

# Page Factory orchestration

The user invokes `/page-factory <route>` (e.g. `/page-factory /about-us`).
If no route given, ask which page.

## Steps

1. **Derive args**: `route` (as given), `pageSlug` (route with slashes → dashes, `/` → `home`),
   `date` (today, YYYY-MM-DD).
2. **Preflight**:
   - Check the dev server: `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000`
     (Windows: use `NUL`). If it is not running, tell the user to start `npm run dev` in a
     separate terminal — the QA gauntlet needs it. You may proceed with `serverUp: false`
     (harness checks are skipped; design/build/static review still run), but say so clearly.
   - Check `page-factory/design-references/` for user-supplied references; mention in one
     line whether intake will use references or research-only.
3. **Run the workflow**:
   ```
   Workflow({
     scriptPath: "page-factory/workflow/page-factory.workflow.js",
     args: { route, pageSlug, date, serverUp, maxQaRounds: 4 }
   })
   ```
4. **Report**: relay the returned summary — brief path, story spec path, sections built,
   QA rounds table, pass/fail, and where remaining findings live if not passed.
5. **If QA was blocked** (server down): after the user starts the server, offer to run just
   the gauntlet: `npm run qa:viewport -- --route <route> --out page-factory/qa/<slug>/round-N`
   and `npm run qa:perf -- ...`, then dispatch correction agents on the findings and repeat
   until pass (this is the same loop the workflow runs).

## Rules

- Never run two Page Factory workflows concurrently (they share LEARNINGS.md).
- Never edit `page-factory/LEARNINGS.md` yourself except through correction agents.
- The homepage route `/` builds to a preview route (`/home-2026`) — never overwrite
  `src/app/page.tsx` without explicit user confirmation.
