/**
 * Manually (and/or automatically) assign a service `category` to every caseStudy.
 *
 * Category is what powers /case-studies/[category] pages, nav, and filters.
 * This script also backfills `headerTitle` from heroHeadline/title when missing,
 * so older stories stop failing the publish checklist.
 *
 * Usage:
 *   npm run sanity:categorize                       # DRY RUN — prints what would change
 *   npm run sanity:categorize -- --apply            # write categories + header titles
 *   npm run sanity:categorize -- --apply --publish  # ...and take every story live
 *
 * Requires SANITY_API_WRITE_TOKEN in .env.local
 *
 * To force a specific category for a given slug, edit MANUAL_CATEGORY_MAP below.
 * Anything not in the map falls back to automatic detection
 * (resolveCaseStudyCategory) from useCase / detailLayout / industry / keywords.
 */
import { config } from 'dotenv'
config({ path: '.env.local' })

import { createClient } from '@sanity/client'

import {
  CASE_STUDY_CATEGORY_KEYS,
  isCaseStudyCategory,
  type CaseStudyCategoryKey,
} from '../src/app/case-studies/categoryConfig'
import { resolveCaseStudyCategory } from '../src/lib/case-study-category'
import {
  buildWebsiteLivePatch,
  draftDocumentId,
  publishedDocumentId,
  type WebsitePublishDoc,
} from '../src/cms/lib/studio/publishWebsiteStatus'
import { STUDIO_UI_ONLY_FIELDS } from '../src/cms/lib/studio/studioUiFields'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '1zmh4sfw'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-05-21'
const token = process.env.SANITY_API_WRITE_TOKEN

const APPLY = process.argv.includes('--apply')
/** Also set the story live (visibility+status=published, create published doc from draft). */
const PUBLISH = process.argv.includes('--publish')

/**
 * Force a category by slug. Keys = slug, values = one of:
 *   'ai' | 'power-platform' | 'sharepoint' | 'web' | 'mobile' | 'data-analytics'
 * Example:
 *   'ai-shipment-delay-prediction-platform': 'ai',
 */
const MANUAL_CATEGORY_MAP: Record<string, CaseStudyCategoryKey> = {
  // --- AI / ML ---
  'ai-shipment-delay-prediction-platform': 'ai',
  'ai-powered-website-performance-platform': 'ai',
  'healthcare-ai-test-automation-patient-management-platform': 'ai',

  // --- Data & Analytics (Fabric / Power BI / BI dashboards) ---
  'customer-360-platform': 'data-analytics',
  'ai-driven-itsm-analytics-platform-microsoft-fabric': 'data-analytics',
  'ai-it-service-management-analytics-platform': 'data-analytics',
  'healthcare-patient-intelligence-platform': 'data-analytics',
  'delivery-performance-sla-analytics-dashboard': 'data-analytics',
  'banking-risk-compliance-analytics-global-bank': 'data-analytics',
  'smart-manufacturing-intelligence-platform': 'data-analytics',
  'hr-analytics-employee-experience-platform': 'data-analytics',

  // --- SharePoint / SPFx ---
  'sharepoint-site-pages-to-pdf': 'sharepoint',
  'sharepoint-asset-tracker-app': 'sharepoint',
  'sharepoint-spfx-automation-testing-quality-assurance': 'sharepoint',
  'sp-marketplace-installation-automation': 'sharepoint',

  // --- Web ---
  'digital-learning-management-platform': 'web',
  'enterprise-technology-website-design-development': 'web',
  'enterprise-ai-website-development': 'web',
  'enterprise-ai-website-transformation': 'web',
  'multi-vendor-ecommerce-marketplace-platform': 'web',
  'wellkies-healthcare-consultation-platform': 'web',

  // --- Mobile ---
  'barcode-scanner-app-audio-equipment-management': 'mobile',

  // --- Power Platform (Power Apps / Automate / Copilot Studio) ---
  'content-scheduler-app-powerapps-sharepoint': 'power-platform',
  'neucart-powerapps-power-automate-qa-testing-case-study': 'power-platform',
  'healthcare-referral-management-insurance-pre-authorization-automation': 'power-platform',
  'hr-process-automation-with-copilot-studio': 'power-platform',
  'claim-request-management-platform': 'power-platform',
  'powerapps-retail-store-opening-automation': 'power-platform',
  'wellkies-clinic-patient-management-app': 'power-platform',
  'employee-separation-process-automation': 'power-platform',
  'electronic-medical-records-emr-workflow-automation-ai-copilot': 'power-platform',
  'ai-powered-task-automation-copilot-power-apps': 'power-platform',
  'power-apps-ceramic-manufacturing-automation': 'power-platform',
  'enterprise-leave-management-system': 'power-platform',
  'ai-powered-process-discovery-copilot': 'power-platform',
  'wicked-point-power-platform-governance': 'power-platform',
  'ecg-group-ai-copilot-transformation': 'power-platform',
  'contacts-management-system-application': 'power-platform',
}

if (!token) {
  console.error('SANITY_API_WRITE_TOKEN is required. Set it in .env.local, then re-run.')
  process.exit(1)
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false })

type Doc = {
  _id: string
  title?: string
  slug?: string
  category?: string
  industry?: string
  useCase?: string
  detailLayout?: string
  client?: string
  headerTitle?: string
  heroHeadline?: string
}

function pickCategory(doc: Doc): CaseStudyCategoryKey | null {
  const slug = doc.slug ?? ''
  if (slug && MANUAL_CATEGORY_MAP[slug]) return MANUAL_CATEGORY_MAP[slug]
  if (doc.category && isCaseStudyCategory(doc.category)) return doc.category
  return resolveCaseStudyCategory({
    category: doc.category,
    industry: doc.industry,
    useCase: doc.useCase,
    detailLayout: doc.detailLayout,
    title: doc.title,
    client: doc.client,
  })
}

function pickHeaderTitle(doc: Doc): string | null {
  if (doc.headerTitle?.trim()) return null // already set, no change
  const fallback = doc.heroHeadline?.trim() || doc.title?.trim() || ''
  return fallback.length >= 10 ? fallback : null
}

async function main() {
  console.log(`Sanity ${projectId}/${dataset} — ${APPLY ? 'APPLY (writing)' : 'DRY RUN'}\n`)

  // perspective:raw returns both drafts.* and published ids so we patch both.
  const docs = await client.fetch<Doc[]>(
    `*[_type == "caseStudy"]{
      _id, title, "slug": slug.current, category, industry, useCase,
      detailLayout, client, headerTitle, heroHeadline
    } | order(_id asc)`,
    {},
    { perspective: 'raw' },
  )

  if (!docs?.length) {
    console.log('No caseStudy documents found.')
    return
  }

  let changed = 0
  let skipped = 0
  let unresolved = 0

  // Base (published) ids to take live when --publish is set — deduped across draft/published.
  const toPublish = new Set<string>()

  for (const doc of docs) {
    const patch: Record<string, string> = {}

    const category = pickCategory(doc)
    if (category && category !== doc.category) patch.category = category

    const headerTitle = pickHeaderTitle(doc)
    if (headerTitle) patch.headerTitle = headerTitle

    const label = `${doc.slug ?? doc._id} — ${doc.title ?? '(untitled)'}`

    if (!category) {
      unresolved++
      console.log(`? UNRESOLVED  ${label}`)
      console.log(`             no category could be inferred — add to MANUAL_CATEGORY_MAP`)
      continue
    }

    if (PUBLISH) toPublish.add(publishedDocumentId(doc._id))

    if (Object.keys(patch).length === 0) {
      skipped++
    } else {
      changed++
      console.log(`✎ ${label}`)
      for (const [k, v] of Object.entries(patch)) console.log(`             ${k} = ${v}`)
      if (APPLY) {
        await client.patch(doc._id).set(patch).commit({ autoGenerateArrayKeys: true })
      }
    }
  }

  if (PUBLISH && toPublish.size > 0) {
    console.log(`\nPublishing ${toPublish.size} case ${toPublish.size === 1 ? 'study' : 'studies'} live...`)
    for (const id of toPublish) {
      if (!APPLY) {
        console.log(`  → ${id}`)
        continue
      }
      const draftId = draftDocumentId(id)
      const [draft, published] = await Promise.all([
        client.getDocument(draftId),
        client.getDocument(id),
      ])
      const live = buildWebsiteLivePatch((published || draft) as WebsitePublishDoc)

      if (draft) {
        // Promote draft -> published: create/replace published from draft, then drop draft.
        console.log(`  → ${id} (promote draft → live)`)
        const draftValue = { ...(draft as Record<string, unknown>) }
        delete draftValue._id
        delete draftValue._rev
        delete draftValue._updatedAt
        for (const field of STUDIO_UI_ONLY_FIELDS) delete draftValue[field]

        await client
          .transaction()
          .createOrReplace({ ...draftValue, ...live.set, _id: id })
          .delete(draftId)
          .commit({ autoGenerateArrayKeys: true })
      } else if (published) {
        // Already published — just flip website visibility live.
        let patch = client.patch(id).set(live.set)
        if (live.unset.length > 0) patch = patch.unset(live.unset)
        console.log(`  → ${id} (set visibility live)`)
        await patch.commit({ autoGenerateArrayKeys: true })
      } else {
        console.log(`  → ${id} (skipped — no document found)`)
      }
    }
  }

  console.log(
    `\nDone. ${changed} to change, ${skipped} already fine, ${unresolved} unresolved.` +
      (PUBLISH ? ` ${toPublish.size} to publish.` : '') +
      (APPLY ? '' : '\nThis was a DRY RUN. Re-run with --apply to write changes.'),
  )
  console.log(`Valid categories: ${CASE_STUDY_CATEGORY_KEYS.join(', ')}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
