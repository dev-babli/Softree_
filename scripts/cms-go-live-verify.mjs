#!/usr/bin/env node
/**
 * CMS go-live verification — run before shipping Studio to production.
 * Usage: node scripts/cms-go-live-verify.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const requiredFiles = [
  'cms.config.ts',
  'sanity.config.ts',
  'schema.json',
  'sanity.types.ts',
  'src/cms/studio/structure/index.tsx',
  'src/app/studio/[[...tool]]/Studio.tsx',
  'src/app/api/cms/publish/route.ts',
  'src/app/api/draft-mode/enable/route.ts',
]

const envRequired = [
  'NEXT_PUBLIC_SANITY_PROJECT_ID',
  'NEXT_PUBLIC_SANITY_DATASET',
]

const envRecommended = [
  'SANITY_API_READ_TOKEN',
  'SANITY_API_WRITE_TOKEN',
]

let failed = 0
let warned = 0

console.log('=== CMS go-live verify ===\n')

for (const file of requiredFiles) {
  const full = path.join(root, file)
  if (!fs.existsSync(full)) {
    console.error(`MISSING FILE: ${file}`)
    failed++
  } else {
    console.log(`OK file: ${file}`)
  }
}

for (const key of envRequired) {
  if (!process.env[key]) {
    console.error(`MISSING ENV (required): ${key}`)
    failed++
  } else {
    console.log(`OK env: ${key}`)
  }
}

for (const key of envRecommended) {
  if (!process.env[key]) {
    console.warn(`WARN env (recommended for live CMS): ${key}`)
    warned++
  } else {
    console.log(`OK env: ${key}`)
  }
}

// UTF-8 shell check
for (const f of ['SoftreeLogo.tsx', 'SoftreeStudioIcon.tsx', 'theme.ts', 'studio.css']) {
  const p = path.join(root, 'src/cms/studio/shell', f)
  if (!fs.existsSync(p)) continue
  const b = fs.readFileSync(p)
  if ((b[0] === 0xff && b[1] === 0xfe) || (b[0] === 0xfe && b[1] === 0xff)) {
    console.error(`UTF-16 CORRUPTION: src/cms/studio/shell/${f}`)
    failed++
  }
}

console.log('')
if (failed) {
  console.error(`FAILED: ${failed} blocker(s), ${warned} warning(s)`)
  process.exit(1)
}

console.log(`PASSED with ${warned} warning(s) — CMS ready for /studio`)
process.exit(0)
