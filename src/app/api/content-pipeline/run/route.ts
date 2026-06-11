import { NextRequest, NextResponse } from 'next/server'

import { pipelineRunSchema } from '@/lib/content-pipeline/types'
import { runContentPipeline } from '@/lib/content-pipeline/run-pipeline'

/**
 * Autonomous blog composer pipeline.
 *
 * POST /api/content-pipeline/run
 * Header: Authorization: Bearer {CONTENT_PIPELINE_SECRET}
 *
 * Body: { topic?: string, autoPublish?: boolean, layoutRecipe?: string, generateImages?: boolean }
 */
export async function POST(request: NextRequest) {
  const secret = process.env.CONTENT_PIPELINE_SECRET
  if (!secret) {
    return NextResponse.json(
      { ok: false, error: 'CONTENT_PIPELINE_SECRET is not configured' },
      { status: 503 },
    )
  }

  const auth = request.headers.get('authorization')
  if (auth !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const input = pipelineRunSchema.parse(body)
    const result = await runContentPipeline(input)

    if (!result.ok) {
      return NextResponse.json(result, { status: 500 })
    }

    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : 'Invalid request',
      },
      { status: 400 },
    )
  }
}

export async function GET() {
  return NextResponse.json({
    service: 'softree-content-pipeline',
    version: '1.0.0',
    methods: ['POST'],
    requiredEnv: [
      'CONTENT_PIPELINE_SECRET',
      'SANITY_API_WRITE_TOKEN',
      'ANTHROPIC_API_KEY',
    ],
    optionalEnv: ['PERPLEXITY_API_KEY', 'GEMINI_API_KEY', 'GOOGLE_GENAI_API_KEY'],
  })
}
