export const meta = {
  name: 'page-factory',
  description: 'Design → story → build → QA-correct loop that generates an awwwards-level page',
  whenToUse: 'When the user asks to generate/rebuild a page with the Page Factory pipeline',
  phases: [
    { title: 'Intake', detail: 'design references + trends + ledger → design brief' },
    { title: 'Direction', detail: 'judge panel critiques the brief, brief amended' },
    { title: 'Story', detail: 'scrollytelling spec with per-section beat sheets' },
    { title: 'Build', detail: 'one builder agent per section, in parallel' },
    { title: 'Assemble', detail: 'route assembled, lazy-loading + metadata wired' },
    { title: 'QA', detail: 'viewport + perf + review gauntlet, corrections, loop until pass' },
  ],
}

// args: { route: "/about-us", pageSlug: "about-us", date: "2026-07-04",
//         maxQaRounds?: 4, serverUp?: boolean }
if (!args || !args.route || !args.pageSlug || !args.date) {
  throw new Error('Required args: { route, pageSlug, date } — e.g. { route: "/about-us", pageSlug: "about-us", date: "2026-07-04" }')
}
const ROUTE = args.route
const SLUG = args.pageSlug
const DATE = args.date
const MAX_ROUNDS = args.maxQaRounds || 4
const ROLE = (name) => `Read the file page-factory/agents/${name}.md and adopt that role completely (its mandatory reading list, rules, and output contract are binding). Today's date: ${DATE}. Target page: route "${ROUTE}", slug "${SLUG}". `

// ---------- schemas ----------
const BRIEF_SCHEMA = {
  type: 'object', required: ['briefPath', 'summary', 'sectionCount'],
  properties: {
    briefPath: { type: 'string' }, summary: { type: 'string' },
    sectionCount: { type: 'number' },
  },
}
const JUDGE_SCHEMA = {
  type: 'object', required: ['score', 'verdict', 'issues'],
  properties: {
    score: { type: 'number', description: '1-10 vs the awwwards bar' },
    verdict: { type: 'string', enum: ['approve', 'revise'] },
    issues: { type: 'array', items: { type: 'string' } },
  },
}
const STORY_SCHEMA = {
  type: 'object', required: ['specPath', 'sections'],
  properties: {
    specPath: { type: 'string' },
    sections: {
      type: 'array', items: {
        type: 'object', required: ['index', 'name', 'componentName', 'file', 'kind'],
        properties: {
          index: { type: 'number' }, name: { type: 'string' },
          componentName: { type: 'string', description: 'PascalCase export' },
          file: { type: 'string', description: 'e.g. src/components/<slug>/HeroChapter.tsx' },
          kind: { type: 'string', enum: ['chapter', 'flow'], description: 'pinned/scrubbed chapter vs normal flow' },
          brief: { type: 'string', description: '2-3 line build instruction summary for the builder' },
        },
      },
    },
  },
}
const BUILD_SCHEMA = {
  type: 'object', required: ['file', 'exportName', 'client'],
  properties: {
    file: { type: 'string' }, exportName: { type: 'string' },
    client: { type: 'boolean' }, deviations: { type: 'string' },
  },
}
const QA_SCHEMA = {
  type: 'object', required: ['verdict', 'findings'],
  properties: {
    verdict: { type: 'string', enum: ['pass', 'fail', 'blocked'] },
    findingsPath: { type: 'string' },
    findings: {
      type: 'array', items: {
        type: 'object', required: ['id', 'severity', 'title', 'location'],
        properties: {
          id: { type: 'string' }, severity: { type: 'string', enum: ['blocker', 'major', 'minor'] },
          title: { type: 'string' }, location: { type: 'string', description: 'file or component' },
          evidence: { type: 'string' },
        },
      },
    },
  },
}
const FIX_SCHEMA = {
  type: 'object', required: ['id', 'verdict'],
  properties: {
    id: { type: 'string' },
    verdict: { type: 'string', enum: ['fixed', 'false-positive', 'needs-redesign'] },
    filesChanged: { type: 'array', items: { type: 'string' } },
    ledgerEntry: { type: 'string' },
  },
}

// ---------- 1. INTAKE ----------
phase('Intake')
log(`Page Factory starting for ${ROUTE}`)
const brief = await agent(
  ROLE('design-researcher') +
  `Produce the design brief for this page at page-factory/briefs/${SLUG}/design-brief.md. ` +
  `If page-factory/design-references/ is empty (besides READMEs), say so in the brief and lean on web research + the existing site's strongest patterns.`,
  { label: 'design-brief', phase: 'Intake', schema: BRIEF_SCHEMA }
)
if (!brief) throw new Error('Intake failed — no design brief produced')
log(`Brief: ${brief.briefPath} (${brief.sectionCount} sections)`)

// ---------- 2. DIRECTION (judge panel, then amend) ----------
phase('Direction')
const LENSES = [
  'awwwards-juror lens: Design 40/Usability 30/Creativity 20/Content 10 — would this brief produce an 8.0+ page or a nice template?',
  'brand-fit lens: does this direction fit a serious technology agency (dark-first, #ff7a2f accent, engineering credibility) and differentiate it from Linear/Vercel clones?',
  'feasibility lens: can this be built performantly in Next.js 16 + GSAP + Lenis with the stated performance budget? Flag anything that will blow LCP/CLS or fight the framework.',
]
const votes = (await parallel(LENSES.map((lens, i) => () =>
  agent(
    `You are a design-direction judge. ${lens}\n` +
    `Read the brief at ${brief.briefPath}, plus page-factory/research/design-trends-2026.md and page-factory/LEARNINGS.md. ` +
    `Score 1-10, verdict approve/revise, and list concrete issues (quote the brief).`,
    { label: `judge:${i + 1}`, phase: 'Direction', schema: JUDGE_SCHEMA }
  )))).filter(Boolean)
const needsRevision = votes.filter(v => v.verdict === 'revise').length >= 2 || votes.some(v => v.score < 6)
if (needsRevision) {
  const allIssues = votes.flatMap(v => v.issues).map(s => `- ${s}`).join('\n')
  await agent(
    ROLE('design-researcher') +
    `The judge panel requires revisions to ${brief.briefPath}. Amend the brief IN PLACE to resolve every issue below while keeping its strengths:\n${allIssues}`,
    { label: 'amend-brief', phase: 'Direction' }
  )
  log('Brief amended per judge panel')
} else {
  log(`Judge panel approved (scores: ${votes.map(v => v.score).join(', ')})`)
}

// ---------- 3. STORY ----------
phase('Story')
const story = await agent(
  ROLE('storytelling-director') +
  `The design brief is at ${brief.briefPath}. Produce the story spec at page-factory/briefs/${SLUG}/story-spec.md. ` +
  `In your structured output, list every section with componentName (PascalCase) and file path under src/components/${SLUG}/.`,
  { label: 'story-spec', phase: 'Story', schema: STORY_SCHEMA }
)
if (!story || !story.sections.length) throw new Error('Story phase produced no sections')
log(`Story spec: ${story.sections.length} sections (${story.sections.filter(s => s.kind === 'chapter').length} chapters)`)

// ---------- 4. BUILD (one agent per section) ----------
phase('Build')
const built = (await parallel(story.sections.map(s => () =>
  agent(
    ROLE('component-builder') +
    `Build section #${s.index}: "${s.name}" → component ${s.componentName} at ${s.file}.\n` +
    `Beat sheet: in ${story.specPath} under this section's heading. Design brief: ${brief.briefPath}.\n` +
    `Section summary: ${s.brief || s.name}. Kind: ${s.kind}.`,
    { label: `build:${s.componentName}`, phase: 'Build', schema: BUILD_SCHEMA }
  )))).filter(Boolean)
if (built.length < story.sections.length) {
  log(`WARNING: ${story.sections.length - built.length} section(s) failed to build — assembler will flag gaps`)
}

// ---------- 5. ASSEMBLE ----------
phase('Assemble')
const componentList = built.map(b => `- ${b.exportName} from ${b.file} (client: ${b.client})`).join('\n')
await agent(
  `You are the Page Assembler for the Page Factory. Read page-factory/LEARNINGS.md and page-factory/research/codebase-map.md first.\n` +
  `Assemble the page for route "${ROUTE}" using these built section components, in story-spec order (${story.specPath}):\n${componentList}\n` +
  `Rules: create/replace the route files under src/app${ROUTE === '/' ? '/(factory-preview)/home-2026' : ROUTE} following the repo's page.tsx metadata pattern (canonical, OG). ` +
  `Heavy/below-fold client sections get next/dynamic with color-matched skeletons. Above-fold section imports statically. ` +
  `Verify every import path exists (Read each component file). Run npx tsc --noEmit if it finishes quickly and fix errors you introduced. ` +
  `Return the route file path and any gaps.`,
  { label: 'assemble-route', phase: 'Assemble' }
)
log(`Route assembled for ${ROUTE}`)

// ---------- 6. QA GAUNTLET LOOP ----------
const allRounds = []
let passed = false
for (let round = 1; round <= MAX_ROUNDS; round++) {
  const P = `QA round ${round}`
  phase(P)
  const outDir = `page-factory/qa/${SLUG}/round-${round}`
  const serverNote = args.serverUp === false
    ? 'NOTE: the dev server is NOT running. Skip the harness command, mark harness-dependent checks as "blocked", and do only the static/code portions of your role.'
    : 'The dev server should be at localhost:3000 — verify before running the harness.'

  const [viewport, perf, review] = await parallel([
    () => agent(ROLE('viewport-checker') + `${serverNote} Output dir: ${outDir}. Round: ${round}.`,
      { label: 'check:viewport', phase: P, schema: QA_SCHEMA }),
    () => agent(ROLE('performance-auditor') + `${serverNote} Output dir: ${outDir}. Round: ${round}.`,
      { label: 'check:perf', phase: P, schema: QA_SCHEMA }),
    () => agent(ROLE('review-agent') + `Brief: ${brief.briefPath}. Story spec: ${story.specPath}. Screenshots (if any): ${outDir}. Round: ${round}. Built components:\n${componentList}`,
      { label: 'check:review', phase: P, schema: QA_SCHEMA }),
  ])
  const reports = [viewport, perf, review].filter(Boolean)
  const findings = reports.flatMap(r => r.findings || []).filter(f => f.severity === 'blocker' || f.severity === 'major')
  const blocked = reports.some(r => r.verdict === 'blocked')
  allRounds.push({ round, verdicts: reports.map(r => r.verdict), actionableFindings: findings.length })

  if (findings.length === 0 && reports.every(r => r.verdict === 'pass')) {
    passed = true
    log(`QA round ${round}: ALL GATES PASS`)
    break
  }
  if (findings.length === 0 && blocked) {
    log(`QA round ${round}: no actionable findings, but harness checks were blocked (dev server down) — stopping loop; run harness manually`)
    break
  }
  log(`QA round ${round}: ${findings.length} blocker/major finding(s) — dispatching correction agents`)

  // corrections: parallel across distinct files, sequential within the same file
  const byLocation = {}
  for (const f of findings) (byLocation[f.location || 'unknown'] ||= []).push(f)
  const fixes = (await parallel(Object.entries(byLocation).map(([loc, group]) => async () => {
    const results = []
    for (const f of group) {
      const r = await agent(
        ROLE('correction-agent') +
        `Fix this finding from QA round ${round}:\n` +
        `ID: ${f.id} | Severity: ${f.severity} | Location: ${f.location}\n` +
        `Title: ${f.title}\nEvidence: ${f.evidence || 'see findings file in ' + outDir}\n` +
        `Brief: ${brief.briefPath} | Story spec: ${story.specPath}`,
        { label: `fix:${f.id}`, phase: P, schema: FIX_SCHEMA }
      )
      if (r) results.push(r)
    }
    return results
  }))).filter(Boolean).flat()
  const fixed = fixes.filter(f => f.verdict === 'fixed').length
  const falsePos = fixes.filter(f => f.verdict === 'false-positive').length
  const redesign = fixes.filter(f => f.verdict === 'needs-redesign')
  log(`Round ${round} corrections: ${fixed} fixed, ${falsePos} false-positive, ${redesign.length} need redesign`)

  if (redesign.length > 0) {
    // structural problems go back to a builder with full context, sequentially
    for (const r of redesign) {
      await agent(
        ROLE('component-builder') +
        `REDESIGN required (correction agent escalated): finding ${r.id}. Read ${outDir}/*-findings.md for full context, ` +
        `rebuild the affected section correctly per the story spec (${story.specPath}), preserving its file path and export name.`,
        { label: `redesign:${r.id}`, phase: P }
      )
    }
  }
}

// ---------- LEARNINGS SYNTHESIS ----------
phase('Learnings')
await agent(
  `You are the Learnings Synthesizer. Read page-factory/LEARNINGS.md and every findings file under page-factory/qa/${SLUG}/. ` +
  `Ensure every blocker/major that was fixed has a GENERALIZED ledger entry (correction agents should have added them — fill any gaps, dedupe near-identical rules, keep the format). ` +
  `Date for new entries: ${DATE}. Do not delete existing entries.`,
  { label: 'sync-ledger', phase: 'Learnings' }
)

return {
  route: ROUTE,
  brief: brief.briefPath,
  storySpec: story.specPath,
  sectionsBuilt: built.map(b => b.file),
  qaRounds: allRounds,
  passed,
  note: passed ? 'All QA gates passed.' : `Stopped after ${allRounds.length} round(s) — see page-factory/qa/${SLUG}/ for remaining findings.`,
}
