import { NextResponse } from 'next/server'

import { loadBrandContextStatus } from '@/lib/content-pipeline/brand-context'
import { isStudioApiRequest, studioApiUnauthorized } from '@/lib/studio-api-auth'

export async function GET(request: Request) {
  if (!isStudioApiRequest(request)) return studioApiUnauthorized()
  try {
    const status = await loadBrandContextStatus()
    return NextResponse.json({ ok: true, ...status })
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : 'Could not load AI context',
      },
      { status: 500 },
    )
  }
}
