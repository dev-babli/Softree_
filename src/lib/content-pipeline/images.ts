import type { SanityClient } from '@sanity/client'

import {
  canGenerateWithGeminiProvider,
  generateImage,
  getModelById,
  isNvidiaConfigured,
  NVIDIA_FALLBACK_MODEL_KEY,
} from '@/lib/image-generation'

import { resolveContentPipelineImageProvider } from './llm-config'
import { withNvidiaRateLimit } from './rate-limit'
import type { GeneratedPostPayload } from './types'

const IMAGE_STYLE =
  'Editorial enterprise technology photography. Softree palette: warm neutrals, subtle orange accent #FF7A2F, clean modern office, no text, no logos, photorealistic.'

function canGeneratePipelineImages(): boolean {
  const provider = resolveContentPipelineImageProvider()
  if (provider === 'nvidia') return isNvidiaConfigured()
  return canGenerateWithGeminiProvider()
}

export async function attachGeneratedImages(
  client: SanityClient,
  payload: GeneratedPostPayload,
): Promise<{ mainImageRef?: string; ogImageRef?: string }> {
  if (!canGeneratePipelineImages()) {
    return {}
  }

  const provider = resolveContentPipelineImageProvider()
  const modelKey =
    provider === 'nvidia'
      ? process.env.CONTENT_PIPELINE_NVIDIA_IMAGE_MODEL?.trim() || NVIDIA_FALLBACK_MODEL_KEY
      : process.env.CONTENT_PIPELINE_GEMINI_IMAGE_MODEL?.trim() || 'gemini-2.5-flash-image'

  const modelDef = getModelById(modelKey)
  if (!modelDef || modelDef.provider !== provider) {
    console.error(`[content-pipeline] Unknown image model for ${provider}: ${modelKey}`)
    return {}
  }

  const prompt = `${IMAGE_STYLE}\n\n${payload.featuredImagePrompt}`

  async function runImageGeneration(imagePrompt: string) {
    const request = {
      provider,
      modelKey,
      modelId: modelDef!.modelId,
      prompt: imagePrompt,
      aspectRatio: '16:9' as const,
    }

    if (provider === 'nvidia') {
      return withNvidiaRateLimit(() => generateImage(request))
    }

    return generateImage(request)
  }

  try {
    const hero = await runImageGeneration(prompt)

    const heroAsset = await client.assets.upload('image', Buffer.from(hero.imageData, 'base64'), {
      filename: `${payload.slug}-hero.webp`,
      contentType: hero.mimeType || 'image/webp',
    })

    const og = await runImageGeneration(
      `${prompt}\nSocial share card composition, 1200x630 safe area.`,
    )

    const ogAsset = await client.assets.upload('image', Buffer.from(og.imageData, 'base64'), {
      filename: `${payload.slug}-og.webp`,
      contentType: og.mimeType || 'image/webp',
    })

    return {
      mainImageRef: heroAsset._id,
      ogImageRef: ogAsset._id,
    }
  } catch (error) {
    console.error('[content-pipeline] Image generation failed:', error)
    return {}
  }
}
