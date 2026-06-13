import { runContentArena } from './arena/run-arena'
import { loadBrandContext } from './brand-context'
import { generatePostDocument } from './generate-post'
import { publishGeneratedPost } from './publish'
import { researchTopic, suggestTopic } from './research'
import type {
  PipelineRunError,
  PipelineRunInput,
  PipelineRunResult,
} from './types'

export async function runContentPipeline(
  input: PipelineRunInput,
): Promise<PipelineRunResult | PipelineRunError> {
  try {
    const topic = input.topic?.trim() || (await suggestTopic())
    const brandContext = await loadBrandContext()
    const research = await researchTopic(topic)

    let payload
    let arenaReport: PipelineRunResult['arena']

    if (input.useArena) {
      const arena = await runContentArena(topic, research, brandContext, input.layoutRecipe)
      payload = arena.winner
      arenaReport = {
        winnerId: arena.verdict.winnerId,
        rationale: arena.verdict.rationale,
        scores: arena.verdict.scores,
      }
    } else {
      payload = await generatePostDocument(
        topic,
        research,
        brandContext,
        input.layoutRecipe,
      )
    }

    const { documentId, slug } = await publishGeneratedPost(payload, {
      autoPublish: input.autoPublish,
      generateImages: input.generateImages,
    })

    return {
      ok: true,
      documentId,
      slug,
      url: `/blog/${slug}`,
      layoutRecipe: payload.layoutRecipe,
      title: payload.title,
      ...(arenaReport ? { arena: arenaReport } : {}),
    }
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : 'Pipeline failed',
      step: 'runContentPipeline',
    }
  }
}
