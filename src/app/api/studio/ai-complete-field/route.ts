import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

import { completeEditorField } from '@/lib/content-pipeline/field-complete'
import { isStudioApiRequest, studioApiUnauthorized } from '@/lib/studio-api-auth'

const bodySchema = z.object({
  documentType: z.string().min(1),
  fieldName: z.string().min(1),
  fieldTitle: z.string().optional(),
  document: z.record(z.unknown()),
  currentValue: z.string().optional(),
  action: z.enum(['autocomplete', 'rewrite']).optional(),
})

export async function POST(request: NextRequest) {
  if (!isStudioApiRequest(request)) return studioApiUnauthorized()

  if (!process.env.CONTENT_PIPELINE_SECRET && !process.env.SANITY_API_WRITE_TOKEN) {
    return NextResponse.json(
      { ok: false, error: 'Content pipeline is not configured' },
      { status: 503 },
    )
  }

  try {
    const body = bodySchema.parse(await request.json())
    const value = await completeEditorField(body)
    return NextResponse.json({ ok: true, value })
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : 'Autocomplete failed',
      },
      { status: 500 },
    )
  }
}
