/**
 * Seeds the default Softree AI Context document for Sanity AI Assist.
 *
 * Usage: npm run sanity:seed-ai-context
 * Requires SANITY_API_WRITE_TOKEN in .env.local
 */
import { createClient } from '@sanity/client'
import { SOFTREE_STYLE_CONTEXT } from '../src/sanity/assist/config'

function env(name: string, fallback?: string) {
  const raw = process.env[name] || fallback || ''
  return raw.replace(/^["']|["']$/g, '')
}

const projectId = env('NEXT_PUBLIC_SANITY_PROJECT_ID', '1zmh4sfw')
const dataset = env('NEXT_PUBLIC_SANITY_DATASET', 'production')
const token = env('SANITY_API_WRITE_TOKEN') || env('SANITY_API_TOKEN')

if (!token) {
  console.error('Missing SANITY_API_WRITE_TOKEN in environment.')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: env('NEXT_PUBLIC_SANITY_API_VERSION', '2026-05-21'),
  useCdn: false,
})

const DOC_ID = 'aiContext-softree-brand-voice'

async function main() {
  await client.createOrReplace({
    _id: DOC_ID,
    _type: 'aiContext',
    title: 'Softree brand voice',
    isDefault: true,
    context: SOFTREE_STYLE_CONTEXT,
  })

  console.log(`✓ AI Context seeded: ${DOC_ID}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
