import { NextResponse } from 'next/server'

import { getContentPipelineLlmEnvSummary } from '@/lib/content-pipeline/llm-config'
import { isStudioApiRequest, studioApiUnauthorized } from '@/lib/studio-api-auth'

export async function GET(request: Request) {
  if (!isStudioApiRequest(request)) return studioApiUnauthorized()
  const llm = getContentPipelineLlmEnvSummary()
  const llmReady =
    llm.gemini.configured || llm.nvidia.configured || llm.anthropic.configured
  const ready =
    Boolean(process.env.CONTENT_PIPELINE_SECRET) &&
    Boolean(process.env.SANITY_API_WRITE_TOKEN) &&
    llmReady

  return NextResponse.json({
    ok: true,
    ready,
    contentPipelineSecret: Boolean(process.env.CONTENT_PIPELINE_SECRET),
    sanityWriteToken: Boolean(process.env.SANITY_API_WRITE_TOKEN),
    perplexityResearch: Boolean(process.env.PERPLEXITY_API_KEY?.trim()),
    llmReady,
    llm,
  })
}
