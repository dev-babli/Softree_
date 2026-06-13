import { generateJson } from '../llm'
import type { GeneratedPostPayload, ResearchBrief } from '../types'
import type { ArenaContestantId } from './contestants'

export type ArenaScoreBreakdown = {
  factualGrounding: number
  seoAeoReadiness: number
  brandVoice: number
  structureCompleteness: number
  originality: number
  total: number
}

export type ArenaCandidateScore = {
  contestantId: ArenaContestantId
  title: string
  scores: ArenaScoreBreakdown
}

export type ArenaVerdict = {
  winnerId: ArenaContestantId
  scores: ArenaCandidateScore[]
  rationale: string
}

type JudgeResponse = {
  winnerId: ArenaContestantId
  scores: Array<{
    contestantId: ArenaContestantId
    factualGrounding: number
    seoAeoReadiness: number
    brandVoice: number
    structureCompleteness: number
    originality: number
    total: number
  }>
  rationale: string
}

function summarizeCandidate(payload: GeneratedPostPayload): string {
  const sectionTypes = payload.composerSections.map((s) => s._type).join(', ')
  const faqCount = payload.faqSchema.length
  const excerpt = payload.excerpt.slice(0, 200)

  return [
    `Title: ${payload.title}`,
    `Excerpt: ${excerpt}`,
    `Focus keyword: ${payload.focusKeyword}`,
    `Meta: ${payload.metaTitle} | ${payload.metaDescription}`,
    `Sections (${payload.composerSections.length}): ${sectionTypes}`,
    `FAQ count: ${faqCount}`,
    `Hero highlights: ${JSON.stringify(payload.heroHighlights)}`,
  ].join('\n')
}

export async function judgeArenaCandidates(
  candidates: Array<{ contestantId: ArenaContestantId; payload: GeneratedPostPayload }>,
  topic: string,
  research: ResearchBrief,
  brandContext: string,
): Promise<ArenaVerdict> {
  const system = `${brandContext}

You are the impartial judge of Softree's Content Arena.
Score each candidate 0–20 per dimension (max total 100):
- factualGrounding: uses research facts with sources, no hallucinated stats
- seoAeoReadiness: title/meta/FAQ/headings optimized for search + AI extraction
- brandVoice: matches Softree tone — expert, practical, no buzzword slop
- structureCompleteness: all required section types filled with substantive content
- originality: owns competitor gaps, not generic filler

Pick the single best candidate for publication. Tie-break toward factualGrounding then seoAeoReadiness.
Return ONLY valid JSON.`

  const user = `Topic: ${topic}

Research summary: ${research.summary}
Research facts: ${JSON.stringify(research.facts)}
Competitor gaps to own: ${JSON.stringify(research.competitorGaps)}

Candidates:
${candidates
  .map(
    (c, i) => `--- Candidate ${i + 1}: ${c.contestantId} ---
${summarizeCandidate(c.payload)}`,
  )
  .join('\n\n')}

Return JSON:
{
  "winnerId": "editor" | "seo-architect" | "practitioner",
  "scores": [
    {
      "contestantId": "...",
      "factualGrounding": 0-20,
      "seoAeoReadiness": 0-20,
      "brandVoice": 0-20,
      "structureCompleteness": 0-20,
      "originality": 0-20,
      "total": 0-100
    }
  ],
  "rationale": "2-3 sentences explaining the winner"
}`

  const raw = await generateJson<JudgeResponse>(system, user, { temperature: 0.1 })

  const validIds = new Set(candidates.map((c) => c.contestantId))
  const winnerId = validIds.has(raw.winnerId) ? raw.winnerId : candidates[0].contestantId

  const scores: ArenaCandidateScore[] = candidates.map((candidate) => {
    const match = raw.scores?.find((s) => s.contestantId === candidate.contestantId)
    const breakdown: ArenaScoreBreakdown = {
      factualGrounding: match?.factualGrounding ?? 0,
      seoAeoReadiness: match?.seoAeoReadiness ?? 0,
      brandVoice: match?.brandVoice ?? 0,
      structureCompleteness: match?.structureCompleteness ?? 0,
      originality: match?.originality ?? 0,
      total:
        match?.total ??
        (match?.factualGrounding ?? 0) +
          (match?.seoAeoReadiness ?? 0) +
          (match?.brandVoice ?? 0) +
          (match?.structureCompleteness ?? 0) +
          (match?.originality ?? 0),
    }
    return {
      contestantId: candidate.contestantId,
      title: candidate.payload.title,
      scores: breakdown,
    }
  })

  return {
    winnerId,
    scores,
    rationale: raw.rationale || `Selected ${winnerId} based on composite quality scores.`,
  }
}
