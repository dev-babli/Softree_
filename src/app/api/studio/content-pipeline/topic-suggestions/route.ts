import { NextResponse } from 'next/server'

import { suggestMarketTopics } from '@/lib/content-pipeline/research'
import { isStudioApiRequest, studioApiUnauthorized } from '@/lib/studio-api-auth'

export const maxDuration = 60

export async function GET(request: Request) {
  if (!isStudioApiRequest(request)) return studioApiUnauthorized()

  try {
    const topics = await suggestMarketTopics(6)
    return NextResponse.json({
      ok: true,
      topics,
      source: process.env.PERPLEXITY_API_KEY ? 'live-research' : 'editorial-fallback',
      refreshedAt: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : 'Failed to load topic suggestions',
      },
      { status: 500 },
    )
  }
}
