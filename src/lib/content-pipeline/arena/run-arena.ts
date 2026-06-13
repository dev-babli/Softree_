import type { BlogLayoutRecipeId } from '@/lib/blog-layout-recipes'

import { resolveContentPipelineLlmProvider } from '../llm-config'
import { generatePostCandidate } from '../generate-post'
import type { GeneratedPostPayload, ResearchBrief } from '../types'

import { ARENA_CONTESTANTS, type ArenaContestantId } from './contestants'
import { judgeArenaCandidates, type ArenaVerdict } from './judge'

export type ArenaRunResult = {
  winner: GeneratedPostPayload
  verdict: ArenaVerdict
  contestants: ArenaContestantId[]
}

export async function runContentArena(
  topic: string,
  research: ResearchBrief,
  brandContext: string,
  layoutRecipeId?: BlogLayoutRecipeId,
  contestantIds: ArenaContestantId[] = ARENA_CONTESTANTS.map((c) => c.id),
): Promise<ArenaRunResult> {
  const contestants = ARENA_CONTESTANTS.filter((c) => contestantIds.includes(c.id))

  if (contestants.length === 0) {
    throw new Error('Content Arena requires at least one contestant')
  }

  const llmProvider = resolveContentPipelineLlmProvider()
  const runContestant = (contestant: (typeof contestants)[number]) =>
    generatePostCandidate(topic, research, brandContext, layoutRecipeId, contestant).then(
      (payload) => ({ contestantId: contestant.id, payload }),
    )

  // Gemini: limited parallelism to avoid rate-limit fallback. NVIDIA stays sequential (40 RPM).
  async function runWithConcurrency(
    items: typeof contestants,
    limit: number,
  ): Promise<
    Array<{
      contestantId: ArenaContestantId
      payload: Awaited<ReturnType<typeof generatePostCandidate>>
    }>
  > {
    const results: Array<{
      contestantId: ArenaContestantId
      payload: Awaited<ReturnType<typeof generatePostCandidate>>
    }> = new Array(items.length)
    let nextIndex = 0

    async function worker() {
      while (nextIndex < items.length) {
        const index = nextIndex++
        results[index] = await runContestant(items[index])
      }
    }

    await Promise.all(
      Array.from({ length: Math.min(limit, items.length) }, () => worker()),
    )
    return results
  }

  let candidates: Array<{
    contestantId: ArenaContestantId
    payload: Awaited<ReturnType<typeof generatePostCandidate>>
  }>

  if (llmProvider === 'gemini') {
    candidates = await runWithConcurrency(contestants, 2)
  } else {
    candidates = []
    for (const contestant of contestants) {
      candidates.push(await runContestant(contestant))
    }
  }

  const verdict = await judgeArenaCandidates(candidates, topic, research, brandContext)
  const winnerEntry =
    candidates.find((c) => c.contestantId === verdict.winnerId) ?? candidates[0]

  return {
    winner: winnerEntry.payload,
    verdict,
    contestants: contestants.map((c) => c.id),
  }
}
