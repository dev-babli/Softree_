import Anthropic from '@anthropic-ai/sdk'

import { stripJsonFence } from './utils'

let anthropicClient: Anthropic | null = null

function getClient(): Anthropic {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY is not configured')
  }
  if (!anthropicClient) {
    anthropicClient = new Anthropic({ apiKey })
  }
  return anthropicClient
}

export async function generateJson<T>(system: string, user: string): Promise<T> {
  const client = getClient()
  const message = await client.messages.create({
    model: process.env.CONTENT_PIPELINE_MODEL || 'claude-sonnet-4-20250514',
    max_tokens: 8000,
    temperature: 0.3,
    system,
    messages: [{ role: 'user', content: user }],
  })

  const textBlock = message.content.find((block) => block.type === 'text')
  if (!textBlock || textBlock.type !== 'text') {
    throw new Error('LLM returned no text content')
  }

  const raw = stripJsonFence(textBlock.text)
  return JSON.parse(raw) as T
}
