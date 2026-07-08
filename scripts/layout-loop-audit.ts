/**
 * Premium layout loop — audit + optional fix pass.
 *
 *   npx tsx scripts/layout-loop-audit.ts
 *   npx tsx scripts/layout-loop-audit.ts --apply
 */
import { config as loadEnv } from 'dotenv'
import { createClient } from '@sanity/client'
import { writeFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'

import { PREMIUM_LAYOUT_VALUES, type CaseStudyDetailLayout } from '../src/lib/case-study-layouts'

loadEnv({ path: '.env.local' })
loadEnv()

function env(name: string, fallback = '') {
  return (process.env[name] || fallback).replace(/^["']|["']$/g, '')
}

const apply = process.argv.includes('--apply')
const token = env('SANITY_API_WRITE_TOKEN') || env('SANITY_API_TOKEN')

const client = createClient({
  projectId: env('NEXT_PUBLIC_SANITY_PROJECT_ID', '1zmh4sfw'),
  dataset: env('NEXT_PUBLIC_SANITY_DATASET', 'production'),
  apiVersion: env('NEXT_PUBLIC_SANITY_API_VERSION', '2026-05-21'),
  token: token || undefined,
  useCdn: false,
})

type Row = {
  _id: string
  title: string
  slug: string
  detailLayout?: string
  sectionCount: number
  hasMetrics: boolean
  hasChallenge: boolean
  hasExcerpt: boolean
  hasCover: boolean
  status?: string
}

const query = `*[_type == "caseStudy" && defined(slug.current)]{
  _id,
  title,
  "slug": slug.current,
  detailLayout,
  status,
  "sectionCount": count(composerSections),
  "hasMetrics": count(metrics) > 0 || count(highlights) > 0,
  "hasChallenge": defined(challengeSummary) || count(challengeContent) > 0 || count(challengeCards) > 0,
  "hasExcerpt": defined(excerpt) && length(excerpt) > 10,
  "hasCover": defined(mainImage.asset)
}`

function recommendLayout(row: Row): CaseStudyDetailLayout {
  if (row.sectionCount > 0) return 'page-composer'
  if (row.detailLayout && PREMIUM_LAYOUT_VALUES.includes(row.detailLayout as CaseStudyDetailLayout)) {
    return row.detailLayout as CaseStudyDetailLayout
  }
  if (row.hasMetrics && row.hasChallenge) return 'manufacturing-power-platform'
  return 'page-composer'
}

function scoreRow(row: Row, recommended: CaseStudyDetailLayout): number {
  let score = 10
  const current = row.detailLayout || 'page-composer'
  if (current !== recommended) score -= 4
  if (!row.hasExcerpt) score -= 1
  if (!row.hasCover) score -= 1
  if (recommended === 'page-composer' && row.sectionCount === 0) score -= 2
  if (recommended === 'manufacturing-power-platform' && !row.hasChallenge) score -= 2
  return Math.max(0, score)
}

async function main() {
  const rows = await client.fetch<Row[]>(query)
  const issues: Array<{
    slug: string
    title: string
    current: string
    recommended: string
    score: number
    sectionCount: number
  }> = []

  for (const row of rows) {
    const recommended = recommendLayout(row)
    const current = row.detailLayout || 'page-composer'
    const score = scoreRow(row, recommended)
    if (current !== recommended || score < 9) {
      issues.push({
        slug: row.slug,
        title: row.title,
        current,
        recommended,
        score,
        sectionCount: row.sectionCount,
      })
    }
  }

  const report = {
    auditedAt: new Date().toISOString(),
    total: rows.length,
    issues: issues.length,
    apply,
    rows: issues.sort((a, b) => a.score - b.score),
  }

  const outDir = join(process.cwd(), '.planning', 'cms-rebuild', 'loop-runs')
  mkdirSync(outDir, { recursive: true })
  const outPath = join(outDir, `layout-audit-${Date.now()}.json`)
  writeFileSync(outPath, JSON.stringify(report, null, 2))

  console.log(`Audited ${rows.length} case studies — ${issues.length} issues`)
  console.log(`Report: ${outPath}`)

  for (const issue of issues.slice(0, 15)) {
    console.log(
      `  [${issue.score}/10] ${issue.slug}: ${issue.current} → ${issue.recommended} (sections=${issue.sectionCount})`,
    )
  }
  if (issues.length > 15) console.log(`  … and ${issues.length - 15} more`)

  if (!apply) {
    if (issues.length) console.log('\nRun with --apply to patch detailLayout on published docs (needs token).')
    return
  }

  if (!token) {
    console.error('Missing SANITY_API_WRITE_TOKEN for --apply')
    process.exit(1)
  }

  let fixed = 0
  for (const issue of issues) {
    if (issue.current === issue.recommended) continue
    const row = rows.find((r) => r.slug === issue.slug)
    if (!row) continue
    await client.patch(row._id).set({ detailLayout: issue.recommended }).commit()
    fixed++
    console.log(`  fixed ${issue.slug} → ${issue.recommended}`)
  }
  console.log(`\nApplied ${fixed} layout fixes.`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
