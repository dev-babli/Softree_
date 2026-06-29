import Anthropic from '@anthropic-ai/sdk'
import { GoogleGenAI } from '@google/genai'
import OpenAI from 'openai'

import {
  getContentPipelineLlmFallbackChain,
  getGeminiApiKey,
  getNvidiaBuildApiKey,
  NVIDIA_INTEGRATE_BASE_URL,
  type ContentPipelineLlmProvider,
  resolveGeminiLlmModel,
  resolveNvidiaLlmModel,
} from './llm-config'
import { isRetryableLlmError, withGeminiRetry, withNvidiaRateLimit } from './rate-limit'
import { parseLlmJson, stripJsonFence } from './utils'

let anthropicClient: Anthropic | null = null
let nvidiaClient: OpenAI | null = null
let geminiClient: GoogleGenAI | null = null

function getAnthropicClient(): Anthropic {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY is not configured')
  }
  if (!anthropicClient) {
    anthropicClient = new Anthropic({ apiKey })
  }
  return anthropicClient
}

function getNvidiaClient(): OpenAI {
  const apiKey = getNvidiaBuildApiKey()
  if (!apiKey) {
    throw new Error(
      'NVIDIA Build API key is not configured. Set NVIDIA_API_KEY or NVAPI_API_KEY from https://build.nvidia.com/settings/api-keys',
    )
  }
  if (!nvidiaClient) {
    nvidiaClient = new OpenAI({
      apiKey,
      baseURL: NVIDIA_INTEGRATE_BASE_URL,
    })
  }
  return nvidiaClient
}

function getGeminiClient(): GoogleGenAI {
  const apiKey = getGeminiApiKey()
  if (!apiKey) {
    throw new Error(
      'Gemini API key is not configured. Set GEMINI_API_KEY or GOOGLE_GENAI_API_KEY from https://aistudio.google.com/apikey',
    )
  }
  if (!geminiClient) {
    geminiClient = new GoogleGenAI({ apiKey })
  }
  return geminiClient
}

export type GenerateJsonOptions = {
  temperature?: number
  model?: string
  maxTokens?: number
}

function extractGeminiText(response: unknown): string {
  const record = response as {
    text?: string
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>
  }

  if (typeof record.text === 'string' && record.text.trim()) {
    return record.text
  }

  const parts = record.candidates?.[0]?.content?.parts || []
  const joined = parts.map((part) => part.text || '').join('').trim()
  if (joined) return joined

  throw new Error('Gemini returned no text content')
}

async function generateJsonWithGemini<T>(
  system: string,
  user: string,
  options: GenerateJsonOptions,
): Promise<T> {
  return withGeminiRetry(async () => {
    const client = getGeminiClient()
    const model = resolveGeminiLlmModel(options.model)

    const response = await client.models.generateContent({
      model,
      contents: user,
      config: {
        systemInstruction: system,
        temperature: options.temperature ?? 0.3,
        maxOutputTokens: options.maxTokens ?? 8000,
        responseMimeType: 'application/json',
      },
    })

    const raw = stripJsonFence(extractGeminiText(response))
    return parseLlmJson<T>(raw)
  })
}

async function generateJsonWithAnthropic<T>(
  system: string,
  user: string,
  options: GenerateJsonOptions,
): Promise<T> {
  const client = getAnthropicClient()
  const message = await client.messages.create({
    model: options.model || process.env.CONTENT_PIPELINE_MODEL || 'claude-sonnet-4-20250514',
    max_tokens: options.maxTokens ?? 8000,
    temperature: options.temperature ?? 0.3,
    system,
    messages: [{ role: 'user', content: user }],
  })

  const textBlock = message.content.find((block) => block.type === 'text')
  if (!textBlock || textBlock.type !== 'text') {
    throw new Error('Anthropic returned no text content')
  }

  const raw = stripJsonFence(textBlock.text)
  return parseLlmJson<T>(raw)
}

async function generateJsonWithNvidia<T>(
  system: string,
  user: string,
  options: GenerateJsonOptions,
): Promise<T> {
  return withNvidiaRateLimit(async () => {
    const client = getNvidiaClient()
    const model = resolveNvidiaLlmModel(options.model)

    const response = await client.chat.completions.create({
      model,
      max_tokens: options.maxTokens ?? 8000,
      temperature: options.temperature ?? 0.3,
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
    })

    const content = response.choices[0]?.message?.content
    if (!content) {
      throw new Error(`NVIDIA NIM (${model}) returned no text content`)
    }

    const raw = stripJsonFence(content)
    return parseLlmJson<T>(raw)
  })
}

async function generateJsonWithProvider<T>(
  provider: ContentPipelineLlmProvider,
  system: string,
  user: string,
  options: GenerateJsonOptions,
): Promise<T> {
  if (provider === 'gemini') {
    return generateJsonWithGemini<T>(system, user, options)
  }
  if (provider === 'nvidia') {
    return generateJsonWithNvidia<T>(system, user, options)
  }
  return generateJsonWithAnthropic<T>(system, user, options)
}

/** Structured JSON generation — Gemini (AI Studio), NVIDIA Build, or Anthropic. */
export async function generateJson<T>(
  system: string,
  user: string,
  options: GenerateJsonOptions = {},
): Promise<T> {
  const providers = getContentPipelineLlmFallbackChain()
  const errors: string[] = []

  for (let index = 0; index < providers.length; index++) {
    const provider = providers[index]
    const hasFallback = index < providers.length - 1

    try {
      return await generateJsonWithProvider<T>(provider, system, user, options)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'LLM request failed'
      errors.push(`${provider}: ${message}`)

      if (hasFallback && isRetryableLlmError(error)) {
        continue
      }

      throw new Error(`Content pipeline LLM (${provider}): ${message}`)
    }
  }

  throw new Error(`Content pipeline LLM failed across providers: ${errors.join(' | ')}`)
}
