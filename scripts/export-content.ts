/**
 * Export published posts and case studies to JSON for backup.
 *
 * Usage: npm run sanity:export
 */
import { writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'
import { createClient } from '@sanity/client'

function env(name: string, fallback = '') {
  return (process.env[name] || fallback).replace(/^["']|["']$/g, '')
}

const client = createClient({
  projectId: env('NEXT_PUBLIC_SANITY_PROJECT_ID', '1zmh4sfw'),
  dataset: env('NEXT_PUBLIC_SANITY_DATASET', 'production'),
  apiVersion: env('NEXT_PUBLIC_SANITY_API_VERSION', '2026-05-21'),
  token: env('SANITY_API_READ_TOKEN') || env('SANITY_API_WRITE_TOKEN'),
  useCdn: false,
})

async function main() {
  const [posts, caseStudies, marketingPages] = await Promise.all([
    client.fetch(`*[_type == "post"]`),
    client.fetch(`*[_type == "caseStudy"]`),
    client.fetch(`*[_type == "marketingPage"]`),
  ])

  const outDir = join(process.cwd(), 'exports')
  mkdirSync(outDir, { recursive: true })
  const stamp = new Date().toISOString().slice(0, 10)

  writeFileSync(join(outDir, `posts-${stamp}.json`), JSON.stringify(posts, null, 2))
  writeFileSync(join(outDir, `case-studies-${stamp}.json`), JSON.stringify(caseStudies, null, 2))
  writeFileSync(join(outDir, `marketing-pages-${stamp}.json`), JSON.stringify(marketingPages, null, 2))

  console.log(`Exported to exports/*-${stamp}.json`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
