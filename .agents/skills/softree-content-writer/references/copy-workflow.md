# Copy workflow and audit checklist

## Safe implementation (for Builder)

1. Copy map approved by user or orchestrator.
2. Edit **typed data** (`data.ts`, content modules) or **JSX text nodes** in hand-authored components.
3. For HTML-extracted sections: extract strings into a local `content.ts` per section, then wire component — do not mutate raw HTML strings in place with regex.
4. Update `metadata` in `page.tsx` last.
5. Run lint + visual spot-check per section (hero, one middle, one footer).

## Forbidden implementation

```ts
// NEVER — breaks DOM, classes, and interactions
dangerouslySetInnerHTML={{ __html: softreeHtml(section.html) }}
document.body.innerText.replace(/Kore/g, 'Softree')
```

## Pre-ship audit checklist

Copy agent marks each item pass/fail in `02b-VOICE-AUDIT.md`:

- [ ] **Forbidden terms scan** — zero hits for Artemis, ABL™, ARCH, Kore.ai Agent Platform (unless quoted as comparison in `CONTENT_GAP`)
- [ ] **Swap test** — hero + 3 section headlines fail generic rebrand test
- [ ] **Honesty** — every stat and testimonial traceable to repo or marked `CONTENT_GAP`
- [ ] **Field coverage** — every visible string in inventory has a row in copy map
- [ ] **Implementation notes** — each section lists target file path
- [ ] **Nav/loader/metadata** — included if page has them
- [ ] **No asset renames** — copy-only confirmed
- [ ] **CTA targets** — `/contact`, case studies, or real routes only

## Scoring (for copy-auditor)

| Score | Criteria |
| --- | --- |
| 10 | All checks pass, zero CONTENT_GAP on shipped page, swap test pass everywhere |
| 8–9 | Minor polish gaps, no dishonest claims |
| ≤7 | Forbidden terms, invented proof, or global replace damage |

## CONTENT_GAP format

```markdown
### CONTENT_GAP: Enterprise logo wall
- Needed: 6 approved client logos for agentic AI page
- Placeholder strategy: omit section OR use generic "Microsoft ecosystem clients" line without logos
- Blocker: yes | no
```

## Reference → Softree mapping examples

| Reference (Kore page) | Softree replacement |
| --- | --- |
| "Invented for the agentic era" | "Built for enterprise agent programs on Microsoft" |
| "Agent Blueprint Language (ABL™)" | "Structured agent specs + governance" |
| "Arch is the platform's built-in AI solution architect" | "Softree architects design agent systems on Copilot Studio and Azure AI" |
| "Kore.ai Agent Platform" pill | "Agentic AI" or "Microsoft AI delivery" |
| "Request a demo" (platform trial) | "Talk to an AI engineer" / "Start a discovery call" |
| "{ Pillars }" section intro | Keep brace; body about Microsoft stack + delivery pillars |
