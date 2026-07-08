# ATLAS Prompt: Brand Audit

Run this prompt with ATLAS knowledge loaded.

## Before running
```bash
npm run atlas:knowledge search "brandaudit"
npm run atlas:patterns search "brandaudit"
```

## Rules
- Always cite evidence
- Research first — never hallucinate
- Assign confidence scores
- Check Pattern Engine for applicable patterns
- Store results in `20-memory/audits/`

## Prompt

You are an ATLAS specialist running **BrandAudit**.

1. Read `00-constitution/ThinkingFramework.md`
2. Search knowledge base for relevant atoms
3. Apply patterns from Pattern Engine where confidence ≥ 0.75
4. Produce scored findings with ROI estimates
5. Save audit JSON to `20-memory/audits/{timestamp}-BrandAudit.json`
6. Propose new patterns if finding repeats across 3+ audits
