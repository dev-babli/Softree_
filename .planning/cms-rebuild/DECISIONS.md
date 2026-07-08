# CMS Rebuild — Locked Decisions

**Date:** 2026-07-07

| # | Question | Decision |
|---|----------|----------|
| 1 | Dataset | **Same `production` dataset** — in-place schema migration |
| 2 | Premium layouts | **Keep all 18 + page-composer** — run dedicated fine-tuning loop (see `PREMIUM-LAYOUT-LOOP.md`) |
| 3 | Parallel `/studio-v2` | **No** — build `src/cms/` in repo; **single cutover** at `/studio` when ready |

## Implications

- Migration scripts must be **non-destructive** and reversible on `production`
- Old `src/sanity/` stays live until cutover gate passes
- No second Studio URL — internal testing uses feature branch or staging deploy
- Premium layouts remain **frontend registry** (`detailLayout` / `layoutKey`); loop improves renderer quality
