import 'server-only'

import { getContentPipelineLlmEnvSummary } from '@/lib/content-pipeline/llm-config'
import { loadBrandContextStatus } from '@/lib/content-pipeline/brand-context'
import { runContentAudit } from '@/cms/lib/contentAudit'
import { readClient } from '@/cms/lib/readClient'

export type AiSystemCheckStatus = 'pass' | 'warn' | 'fail'

export type AiSystemCheck = {
  id: string
  name: string
  status: AiSystemCheckStatus
  message: string
  fixLabel?: string
  fixPath?: string
}

export type AiSystemsAuditResult = {
  ok: true
  score: number
  summary: string
  checks: AiSystemCheck[]
  contentGaps: {
    missingMeta: number
    missingFaq: number
    missingAlt: number
  }
  fetchedAt: string
}

function scoreChecks(checks: AiSystemCheck[]): number {
  if (checks.length === 0) return 0
  const weights = { pass: 1, warn: 0.6, fail: 0 }
  const total = checks.reduce((sum, c) => sum + weights[c.status], 0)
  return Math.round((total / checks.length) * 100)
}

export async function runAiSystemsAudit(): Promise<AiSystemsAuditResult> {
  const checks: AiSystemCheck[] = []
  const llm = getContentPipelineLlmEnvSummary()
  const llmReady = llm.gemini.configured || llm.nvidia.configured || llm.anthropic.configured
  const pipelineReady =
    Boolean(process.env.CONTENT_PIPELINE_SECRET) &&
    Boolean(process.env.SANITY_API_WRITE_TOKEN) &&
    llmReady

  checks.push({
    id: 'content-pipeline',
    name: 'Content Agent pipeline',
    status: pipelineReady ? 'pass' : 'fail',
    message: pipelineReady
      ? `Ready (${llm.llmProvider} LLM, write token configured)`
      : 'Missing CONTENT_PIPELINE_SECRET, SANITY_API_WRITE_TOKEN, or LLM API key',
    fixLabel: pipelineReady ? undefined : 'Check .env.local',
    fixPath: '/studio/content-agent',
  })

  const brand = await loadBrandContextStatus()
  checks.push({
    id: 'ai-brand-voice',
    name: 'AI brand voice (aiContext)',
    status: brand.hasDefaultDocument && !brand.usesBundledFallback ? 'pass' : brand.usesBundledFallback ? 'warn' : 'fail',
    message: brand.hasDefaultDocument
      ? brand.usesBundledFallback
        ? 'Document exists but uses starter copy — customize for richer AI output'
        : `Loaded: ${brand.title || 'Default context'}`
      : 'No default aiContext document — run npm run sanity:seed-ai-context',
    fixLabel: 'Edit AI brand voice',
    fixPath: '/studio/structure/siteSettings;aiContext',
  })

  const imageKeySet = Boolean(process.env.GEMINI_PLUGIN_API_KEY?.trim())
  checks.push({
    id: 'image-api-security',
    name: 'AI Images API security',
    status: imageKeySet ? 'pass' : 'fail',
    message: imageKeySet
      ? 'GEMINI_PLUGIN_API_KEY set — POST /api/studio/generate-image is protected'
      : 'GEMINI_PLUGIN_API_KEY not set — image API accepts unauthenticated POSTs',
    fixLabel: imageKeySet ? undefined : 'Add GEMINI_PLUGIN_API_KEY to .env.local',
  })

  checks.push({
    id: 'research-layer',
    name: 'Live research (Perplexity)',
    status: process.env.PERPLEXITY_API_KEY?.trim() ? 'pass' : 'warn',
    message: process.env.PERPLEXITY_API_KEY?.trim()
      ? 'Perplexity API configured for factual research'
      : 'Using generic fallback research — add PERPLEXITY_API_KEY for citations',
    fixLabel: process.env.PERPLEXITY_API_KEY ? undefined : 'Add PERPLEXITY_API_KEY',
  })

  const authorExists = await readClient.fetch<boolean>(
    `defined(*[_id == "softree-technology"][0]._id)`,
  )
  checks.push({
    id: 'pipeline-author-ref',
    name: 'Content pipeline author ref',
    status: authorExists ? 'pass' : 'warn',
    message: authorExists
      ? 'Default author softree-technology exists'
      : 'Author softree-technology missing — generated posts may fail validation',
    fixLabel: authorExists ? undefined : 'Create author document',
    fixPath: '/studio/structure/blog;authors',
  })

  const layoutSample = await readClient.fetch<
    Array<{ title?: string; detailLayout?: string; sectionCount?: number }>
  >(
    `*[_type == "caseStudy" && defined(slug.current) && coalesce(visibility, status, "published") == "published"][0...8]{
      title,
      detailLayout,
      "sectionCount": count(composerSections)
    }`,
  )

  const missingLayout = (layoutSample || []).filter((s) => !s.detailLayout)
  const composerEmpty = (layoutSample || []).filter(
    (s) => s.detailLayout === 'page-composer' && (s.sectionCount ?? 0) === 0,
  )

  checks.push({
    id: 'case-study-layouts',
    name: 'Case study layout fetch',
    status:
      missingLayout.length === 0 && composerEmpty.length === 0
        ? 'pass'
        : missingLayout.length > 0
          ? 'warn'
          : 'warn',
    message:
      missingLayout.length > 0
        ? `${missingLayout.length} published case studies missing detailLayout`
        : composerEmpty.length > 0
          ? `${composerEmpty.length} page-composer case studies have zero sections`
          : `${layoutSample?.length ?? 0} case studies sampled — layouts OK`,
    fixLabel: missingLayout.length || composerEmpty.length ? 'Fix incomplete content' : undefined,
    fixPath: '/studio/structure/caseStudies;caseStudiesNeedsWork',
  })

  const audit = await runContentAudit()
  const gapTotal =
    audit.missingMeta.length + audit.missingFaq.length + audit.missingAlt.length

  checks.push({
    id: 'content-aeo-audit',
    name: 'Published content AEO gaps',
    status: gapTotal === 0 ? 'pass' : gapTotal <= 5 ? 'warn' : 'fail',
    message: `Meta: ${audit.missingMeta.length} · FAQ: ${audit.missingFaq.length} · Alt: ${audit.missingAlt.length}`,
    fixLabel: gapTotal > 0 ? 'Open content audit' : undefined,
    fixPath: '/studio/content-agent',
  })

  checks.push({
    id: 'field-autocomplete',
    name: 'Field AI autocomplete',
    status: pipelineReady ? 'pass' : 'fail',
    message: pipelineReady
      ? '✨ field menu includes Autocomplete from context (excerpt, meta, FAQ, summaries)'
      : 'Requires working LLM pipeline for field autocomplete API',
    fixPath: '/studio/intent/create/template=post-composer;type=post/',
  })

  const score = scoreChecks(checks)
  const failCount = checks.filter((c) => c.status === 'fail').length
  const warnCount = checks.filter((c) => c.status === 'warn').length

  let summary = 'All AI systems operational.'
  if (failCount > 0) {
    summary = `${failCount} critical issue${failCount === 1 ? '' : 's'} need fixing before writers rely on AI.`
  } else if (warnCount > 0) {
    summary = `${warnCount} improvement${warnCount === 1 ? '' : 's'} recommended for best AI output quality.`
  }

  return {
    ok: true,
    score,
    summary,
    checks,
    contentGaps: {
      missingMeta: audit.missingMeta.length,
      missingFaq: audit.missingFaq.length,
      missingAlt: audit.missingAlt.length,
    },
    fetchedAt: new Date().toISOString(),
  }
}
