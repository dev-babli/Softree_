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
    const payload = await generatePostDocument(
      topic,
      research,
      brandContext,
      input.layoutRecipe,
    )
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
    }
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : 'Pipeline failed',
      step: 'runContentPipeline',
    }
  }
}
