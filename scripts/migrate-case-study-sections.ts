/**
 * Split legacy case study `body` H2 sections into challengeContent / approachContent / outcomeContent.
 *
 * Usage: npm run sanity:migrate-case-study-sections
 * Requires SANITY_API_WRITE_TOKEN
 */
import { createClient } from '@sanity/client'

function env(name: string, fallback = '') {
  return (process.env[name] || fallback).replace(/^["']|["']$/g, '')
}

const token = env('SANITY_API_WRITE_TOKEN') || env('SANITY_API_TOKEN')
if (!token) {
  console.error('Missing SANITY_API_WRITE_TOKEN')
  process.exit(1)
}

const client = createClient({
  projectId: env('NEXT_PUBLIC_SANITY_PROJECT_ID', '1zmh4sfw'),
  dataset: env('NEXT_PUBLIC_SANITY_DATASET', 'production'),
  apiVersion: env('NEXT_PUBLIC_SANITY_API_VERSION', '2026-05-21'),
  token,
  useCdn: false,
})

type Block = {
  _type?: string
  _key?: string
  style?: string
  children?: Array<{ text?: string }>
}

function headingText(block: Block): string {
  return (block.children || []).map((c) => c.text || '').join(' ').trim().toLowerCase()
}

function splitBody(body: Block[]) {
  const sections: { challenge: Block[]; approach: Block[]; outcome: Block[]; extra: Block[] } = {
    challenge: [],
    approach: [],
    outcome: [],
    extra: [],
  }

  let current: keyof typeof sections = 'extra'

  for (const block of body) {
    if (block._type === 'block' && block.style === 'h2') {
      const h = headingText(block)
      if (h.includes('challenge')) current = 'challenge'
      else if (h.includes('approach') || h.includes('solution')) current = 'approach'
      else if (h.includes('outcome') || h.includes('result')) current = 'outcome'
      else current = 'extra'
      continue
    }
    sections[current].push(block)
  }

  return sections
}

async function main() {
  const studies = await client.fetch<
    Array<{
      _id: string
      title: string
      body?: Block[]
      challengeContent?: Block[]
      approachContent?: Block[]
      outcomeContent?: Block[]
    }>
  >(
    `*[_type == "caseStudy" && defined(body) && count(body) > 0 && (
      !defined(challengeContent) || count(challengeContent) == 0
    )]{ _id, title, body, challengeContent, approachContent, outcomeContent }`,
  )

  let updated = 0
  for (const study of studies) {
    if (!study.body?.length) continue
    const { challenge, approach, outcome, extra } = splitBody(study.body)
    const patch: Record<string, unknown> = {}

    if (challenge.length && !study.challengeContent?.length) patch.challengeContent = challenge
    if (approach.length && !study.approachContent?.length) patch.approachContent = approach
    if (outcome.length && !study.outcomeContent?.length) patch.outcomeContent = outcome
    if (extra.length) patch.body = extra
    else patch.body = []

    if (Object.keys(patch).length === 0) continue

    await client.patch(study._id).set(patch).commit()
    updated++
    console.log(`✓ ${study.title}`)
  }

  console.log(`Done. Migrated ${updated} case studies.`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
