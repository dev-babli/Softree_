import { NextRequest, NextResponse } from 'next/server'

import { pipelineRunSchema } from '@/lib/content-pipeline/types'
import { getContentPipelineLlmEnvSummary } from '@/lib/content-pipeline/llm-config'
import { runContentPipeline } from '@/lib/content-pipeline/run-pipeline'

/**
 * Autonomous blog composer pipeline with optional Content Arena.
 *
 * POST /api/content-pipeline/run
 * Header: Authorization: Bearer {CONTENT_PIPELINE_SECRET}
 *
 * Body: {
 *   topic?: string,
 *   autoPublish?: boolean,
 *   layoutRecipe?: string,
 *   generateImages?: boolean,
 *   useArena?: boolean  // default true — 3 personas compete, judge picks winner
 * }
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
      const message = result.error.toLowerCase()
      const status =
        message.includes('503') ||
        message.includes('unavailable') ||
        message.includes('high demand') ||
        message.includes('rate limit')
          ? 503
          : 500

      return NextResponse.json(result, { status })
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
  const config = getContentPipelineLlmEnvSummary()

  return NextResponse.json({
    service: 'softree-content-pipeline',
    version: '2.2.0',
    methods: ['POST'],
    ...config,
    features: {
      contentArena: {
        enabled: true,
        default: true,
        contestants: ['editor', 'seo-architect', 'practitioner'],
        judgeDimensions: [
          'factualGrounding',
          'seoAeoReadiness',
          'brandVoice',
          'structureCompleteness',
          'originality',
        ],
      },
    },
    requiredEnv: [
      'CONTENT_PIPELINE_SECRET',
      'SANITY_API_WRITE_TOKEN',
      config.llmProvider === 'gemini'
        ? 'GEMINI_API_KEY'
        : config.llmProvider === 'nvidia'
          ? 'NVIDIA_API_KEY'
          : 'ANTHROPIC_API_KEY',
    ],
    optionalEnv: [
      'GOOGLE_GENAI_API_KEY',
      'NVAPI_API_KEY',
      'CONTENT_PIPELINE_LLM_PROVIDER',
      'CONTENT_PIPELINE_IMAGE_PROVIDER',
      'CONTENT_PIPELINE_GEMINI_MODEL',
      'CONTENT_PIPELINE_GEMINI_IMAGE_MODEL',
      'CONTENT_PIPELINE_NVIDIA_MODEL',
      'CONTENT_PIPELINE_NVIDIA_IMAGE_MODEL',
      'CONTENT_PIPELINE_NVIDIA_RPM',
      'CONTENT_PIPELINE_MODEL',
      'PERPLEXITY_API_KEY',
      'ANTHROPIC_API_KEY',
      'NVIDIA_API_KEY',
      'GEMINI_API_KEY',
    ],
  })
}
