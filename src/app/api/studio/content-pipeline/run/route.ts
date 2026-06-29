import { NextRequest, NextResponse } from 'next/server'

import { runContentPipeline } from '@/lib/content-pipeline/run-pipeline'
import { pipelineRunSchema } from '@/lib/content-pipeline/types'
import { isStudioApiRequest, studioApiUnauthorized } from '@/lib/studio-api-auth'

/** Arena + image generation can exceed 60s — allow long-running Studio jobs. */
export const maxDuration = 300

/** Studio-authenticated proxy — keeps CONTENT_PIPELINE_SECRET server-side only. */
export async function POST(request: NextRequest) {
  if (!process.env.CONTENT_PIPELINE_SECRET) {
    return NextResponse.json(
      { ok: false, error: 'CONTENT_PIPELINE_SECRET is not configured' },
      { status: 503 },
    )
  }

  if (!isStudioApiRequest(request)) return studioApiUnauthorized()

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
    service: 'softree-studio-content-pipeline',
    methods: ['POST'],
    studioOnly: true,
  })
}
