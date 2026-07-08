import { NextResponse } from 'next/server'

import { runContentAudit } from '@/cms/lib/contentAudit'
import { isStudioApiRequest, studioApiUnauthorized } from '@/lib/studio-api-auth'

export async function GET(request: Request) {
  if (!isStudioApiRequest(request)) return studioApiUnauthorized()
  try {
    const audit = await runContentAudit()
    return NextResponse.json({ ok: true, ...audit, fetchedAt: new Date().toISOString() })
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : 'Audit failed',
      },
      { status: 500 },
    )
  }
}
