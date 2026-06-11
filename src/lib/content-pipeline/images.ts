import type { SanityClient } from '@sanity/client'

import { canGenerateWithGeminiProvider, generateImage } from '@/lib/image-generation'

import type { GeneratedPostPayload } from './types'

const IMAGE_STYLE =
  'Editorial enterprise technology photography. Softree palette: warm neutrals, subtle orange accent #FF7A2F, clean modern office, no text, no logos, photorealistic.'

export async function attachGeneratedImages(
  client: SanityClient,
  payload: GeneratedPostPayload,
): Promise<{ mainImageRef?: string; ogImageRef?: string }> {
  if (!canGenerateWithGeminiProvider()) {
    return {}
  }

  const prompt = `${IMAGE_STYLE}\n\n${payload.featuredImagePrompt}`

  try {
    const hero = await generateImage({
      provider: 'gemini',
      modelKey: 'gemini-2.5-flash-image',
      prompt,
      aspectRatio: '16:9',
    })

    const heroAsset = await client.assets.upload('image', Buffer.from(hero.imageData, 'base64'), {
      filename: `${payload.slug}-hero.webp`,
      contentType: hero.mimeType || 'image/webp',
    })

    const og = await generateImage({
      provider: 'gemini',
      modelKey: 'gemini-2.5-flash-image',
      prompt: `${prompt}\nSocial share card composition, 1200x630 safe area.`,
      aspectRatio: '16:9',
    })

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
