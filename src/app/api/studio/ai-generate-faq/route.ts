import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

import { loadBrandContext } from '@/lib/content-pipeline/brand-context'
import { generateJson } from '@/lib/content-pipeline/llm'
import { isStudioApiRequest, studioApiUnauthorized } from '@/lib/studio-api-auth'

const bodySchema = z.object({
  documentType: z.string().min(1),
  document: z.record(z.unknown()),
})

function plainText(value: unknown): string {
  if (typeof value === 'string') return value
  if (!Array.isArray(value)) return ''
  return value
    .map((block) => {
      if (typeof block !== 'object' || !block) return ''
      const children = (block as { children?: Array<{ text?: string }> }).children
      return (children || []).map((c) => c.text || '').join('')
    })
    .filter(Boolean)
    .join('\n')
    .slice(0, 6000)
}

export async function POST(request: NextRequest) {
  if (!isStudioApiRequest(request)) return studioApiUnauthorized()

  if (!process.env.CONTENT_PIPELINE_SECRET && !process.env.SANITY_API_WRITE_TOKEN) {
    return NextResponse.json({ ok: false, error: 'Content pipeline is not configured' }, { status: 503 })
  }

  try {
    const body = bodySchema.parse(await request.json())
    const brandContext = await loadBrandContext()
    const doc = body.document

    const context = {
      title: doc.title,
      excerpt: doc.excerpt,
      challenge: plainText(doc.challengeContent),
      approach: plainText(doc.approachContent),
      outcome: plainText(doc.outcomeContent),
      body: plainText(doc.body),
    }

    const result = await generateJson<{ faqs: Array<{ question: string; answer: string }> }>(
      `${brandContext}\n\nGenerate 3–5 FAQ pairs for AEO. Return JSON: {"faqs":[{"question":"...","answer":"..."}]}. Answers 2–4 sentences.`,
      JSON.stringify({ documentType: body.documentType, context }, null, 2),
      { temperature: 0.35, maxTokens: 2048 },
    )

    const faqs = (result.faqs || []).filter((faq) => faq.question?.trim() && faq.answer?.trim())
    if (!faqs.length) throw new Error('AI returned no FAQ pairs')

    return NextResponse.json({ ok: true, faqs })
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : 'FAQ generation failed' },
      { status: 500 },
    )
  }
}
