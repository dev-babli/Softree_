/** LLM + image provider resolution for the content pipeline. */

import { isGeminiConfigured as isGeminiImageConfigured } from '@/lib/image-generation/gemini'
import { isNvidiaConfigured as isNvidiaImageConfigured } from '@/lib/image-generation/nvidia'

import { DEFAULT_NVIDIA_RPM, nvidiaMinIntervalMs, resolveNvidiaMaxRpm } from './rate-limit'

export { DEFAULT_NVIDIA_RPM, resolveNvidiaMaxRpm }

export const NVIDIA_INTEGRATE_BASE_URL = 'https://integrate.api.nvidia.com/v1'

export type ContentPipelineLlmProvider = 'gemini' | 'nvidia' | 'anthropic'
export type ContentPipelineImageProvider = 'gemini' | 'nvidia'

/** Google AI Studio — https://aistudio.google.com/apikey */
export function getGeminiApiKey(): string | undefined {
  return (
    process.env.GEMINI_API_KEY?.trim() ||
    process.env.GOOGLE_GENAI_API_KEY?.trim() ||
    undefined
  )
}

export function isGeminiConfigured(): boolean {
  return isGeminiImageConfigured()
}

export function getNvidiaBuildApiKey(): string | undefined {
  return (
    process.env.NVIDIA_API_KEY?.trim() ||
    process.env.NVAPI_API_KEY?.trim() ||
    undefined
  )
}

export function isNvidiaBuildConfigured(): boolean {
  return isNvidiaImageConfigured()
}

export const DEFAULT_GEMINI_LLM_MODEL = 'gemini-2.5-flash'

export const DEFAULT_NVIDIA_LLM_MODEL = 'meta/llama-3.3-70b-instruct'

export function resolveGeminiLlmModel(override?: string): string {
  return (
    override?.trim() ||
    process.env.CONTENT_PIPELINE_GEMINI_MODEL?.trim() ||
    process.env.CONTENT_PIPELINE_MODEL?.trim() ||
    DEFAULT_GEMINI_LLM_MODEL
  )
}

export function resolveNvidiaLlmModel(override?: string): string {
  return (
    override?.trim() ||
    process.env.CONTENT_PIPELINE_NVIDIA_MODEL?.trim() ||
    process.env.CONTENT_PIPELINE_MODEL?.trim() ||
    DEFAULT_NVIDIA_LLM_MODEL
  )
}

/**
 * LLM routing:
 * - gemini / nvidia / anthropic — force a provider
 * - auto (default) — Gemini if AI Studio key is set (avoids NVIDIA 40 RPM), else NVIDIA, else Anthropic
 */
export function resolveContentPipelineLlmProvider(): ContentPipelineLlmProvider {
  return getContentPipelineLlmFallbackChain()[0]
}

/** Ordered LLM providers for auto routing and transient-failure fallback. */
export function getContentPipelineLlmFallbackChain(): ContentPipelineLlmProvider[] {
  const explicit = process.env.CONTENT_PIPELINE_LLM_PROVIDER?.trim().toLowerCase()

  if (explicit === 'gemini') return ['gemini']
  if (explicit === 'nvidia') return ['nvidia']
  if (explicit === 'anthropic') return ['anthropic']

  if (explicit && explicit !== 'auto') {
    throw new Error(
      `Invalid CONTENT_PIPELINE_LLM_PROVIDER "${explicit}". Use gemini, nvidia, anthropic, or auto.`,
    )
  }

  const chain: ContentPipelineLlmProvider[] = []
  if (isGeminiConfigured()) chain.push('gemini')
  if (isNvidiaBuildConfigured()) chain.push('nvidia')
  if (process.env.ANTHROPIC_API_KEY?.trim()) chain.push('anthropic')

  return chain.length > 0 ? chain : ['anthropic']
}

/**
 * Image routing:
 * - auto (default) — Gemini when AI Studio key is set (NVIDIA fallback handled by generateImage)
 * - nvidia — force NVIDIA Build image models
 */
export function resolveContentPipelineImageProvider(): ContentPipelineImageProvider {
  const explicit = process.env.CONTENT_PIPELINE_IMAGE_PROVIDER?.trim().toLowerCase()

  if (explicit === 'nvidia') return 'nvidia'
  if (explicit === 'gemini') return 'gemini'

  if (isGeminiConfigured()) return 'gemini'
  if (isNvidiaBuildConfigured()) return 'nvidia'
  return 'gemini'
}

export function getContentPipelineLlmEnvSummary() {
  const llmProvider = resolveContentPipelineLlmProvider()
  const imageProvider = resolveContentPipelineImageProvider()

  return {
    llmProvider,
    imageProvider,
    gemini: {
      configured: isGeminiConfigured(),
      envVars: ['GEMINI_API_KEY', 'GOOGLE_GENAI_API_KEY'],
      modelEnvVars: ['CONTENT_PIPELINE_GEMINI_MODEL', 'CONTENT_PIPELINE_MODEL'],
      imageModelEnvVar: 'CONTENT_PIPELINE_GEMINI_IMAGE_MODEL',
      defaultLlmModel: DEFAULT_GEMINI_LLM_MODEL,
      defaultImageModel: 'gemini-2.5-flash-image',
      portal: 'https://aistudio.google.com/apikey',
    },
    nvidia: {
      configured: isNvidiaBuildConfigured(),
      baseUrl: NVIDIA_INTEGRATE_BASE_URL,
      envVars: ['NVIDIA_API_KEY', 'NVAPI_API_KEY'],
      modelEnvVars: ['CONTENT_PIPELINE_NVIDIA_MODEL', 'CONTENT_PIPELINE_MODEL'],
      imageModelEnvVar: 'CONTENT_PIPELINE_NVIDIA_IMAGE_MODEL',
      rateLimitEnvVar: 'CONTENT_PIPELINE_NVIDIA_RPM',
      defaultRateLimitRpm: DEFAULT_NVIDIA_RPM,
      pacedIntervalMs: nvidiaMinIntervalMs(),
      defaultLlmModel: DEFAULT_NVIDIA_LLM_MODEL,
      defaultImageModel: 'nvidia-flux-1-schnell',
      portal: 'https://build.nvidia.com/settings/api-keys',
    },
    anthropic: {
      configured: Boolean(process.env.ANTHROPIC_API_KEY?.trim()),
      envVars: ['ANTHROPIC_API_KEY'],
      modelEnvVars: ['CONTENT_PIPELINE_MODEL'],
      defaultModel: 'claude-sonnet-4-20250514',
    },
    routing: {
      llmEnvVar: 'CONTENT_PIPELINE_LLM_PROVIDER',
      imageEnvVar: 'CONTENT_PIPELINE_IMAGE_PROVIDER',
      autoLlmOrder: ['gemini', 'nvidia', 'anthropic'],
      autoImageOrder: ['gemini', 'nvidia'],
    },
  }
}
