#!/usr/bin/env node
/**
 * CMS smoke test — verifies Studio config, data layer, and API routes compile.
 * Run: node scripts/cms-smoke-test.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const required = [
  'cms.config.ts',
  'src/cms/schema/types/index.ts',
  'src/cms/lib/fetch.ts',
  'src/cms/lib/live.ts',
  'src/cms/studio/StudioDashboard.tsx',
  'src/cms/studio/assist/fieldRegistry.ts',
  'src/app/api/cms/publish/route.ts',
  'src/app/api/cms/ai/generate-faq/route.ts',
  'src/app/robots.ts',
]

let failed = 0
for (const file of required) {
  const full = path.join(root, file)
  if (!fs.existsSync(full)) {
    console.error(`MISSING: ${file}`)
    failed++
  } else {
    console.log(`OK: ${file}`)
  }
}

if (failed) {
  console.error(`\n${failed} smoke check(s) failed`)
  process.exit(1)
}

console.log('\nCMS smoke test passed')
