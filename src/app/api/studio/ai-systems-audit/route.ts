import { NextRequest, NextResponse } from 'next/server'

import { runAiSystemsAudit } from '@/sanity/lib/aiSystemsAudit'
import { isStudioApiRequest, studioApiUnauthorized } from '@/lib/studio-api-auth'

export async function GET(request: NextRequest) {
  if (!isStudioApiRequest(request)) return studioApiUnauthorized()

  try {
    const audit = await runAiSystemsAudit()
    return NextResponse.json(audit)
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : 'AI systems audit failed',
      },
      { status: 500 },
    )
  }
}
