import { POST as BasePOST } from 'sanity-plugin-gemini-ai-images-nextjs/route'
import { NextResponse } from 'next/server'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders,
  })
}

export async function POST(request: Request) {
  const response = await BasePOST(request)

  const headers = new Headers(response.headers)
  Object.entries(corsHeaders).forEach(([key, value]) => {
    headers.set(key, value)
  })

  return new NextResponse(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  })
}
