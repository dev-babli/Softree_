/**
 * Syncs Sanity env vars from repo root .env.local into cms-kit/apps/sanity/.env.local
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootEnvPath = path.resolve(__dirname, '../.env.local')
const cmsEnvPath = path.resolve(__dirname, '../cms-kit/apps/sanity/.env.local')

const KEYS = [
  'NEXT_PUBLIC_SANITY_PROJECT_ID',
  'NEXT_PUBLIC_SANITY_DATASET',
  'NEXT_PUBLIC_SANITY_API_VERSION',
  'SANITY_API_READ_TOKEN',
  'SANITY_API_WRITE_TOKEN',
]

function parseEnv(content) {
  const map = new Map()
  for (const line of content.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    let value = trimmed.slice(eq + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    map.set(key, value)
  }
  return map
}

if (!fs.existsSync(rootEnvPath)) {
  console.error(`Missing ${rootEnvPath}`)
  process.exit(1)
}

const root = parseEnv(fs.readFileSync(rootEnvPath, 'utf8'))
const lines = [
  '# Auto-synced from repo root .env.local — npm run cms:sync-env',
  '',
  `NEXT_PUBLIC_SANITY_PROJECT_ID=${root.get('NEXT_PUBLIC_SANITY_PROJECT_ID') ?? '1zmh4sfw'}`,
  `NEXT_PUBLIC_SANITY_DATASET=${root.get('NEXT_PUBLIC_SANITY_DATASET') ?? 'production'}`,
  `NEXT_PUBLIC_SANITY_API_VERSION=${root.get('NEXT_PUBLIC_SANITY_API_VERSION') ?? '2026-05-21'}`,
  '',
  'NEXT_PUBLIC_SOFTREE_SITE_URL=http://localhost:3000',
  '',
  'NEXT_PUBLIC_SANITY_STUDIO_URL=http://localhost:3000/studio',
  'SANITY_STUDIO_URL=http://localhost:3000/studio',
  '',
  `SANITY_API_READ_TOKEN=${root.get('SANITY_API_READ_TOKEN') ?? ''}`,
  `SANITY_API_WRITE_TOKEN=${root.get('SANITY_API_WRITE_TOKEN') ?? ''}`,
  '',
]

fs.mkdirSync(path.dirname(cmsEnvPath), { recursive: true })
fs.writeFileSync(cmsEnvPath, lines.join('\n'))
console.log(`Wrote ${cmsEnvPath}`)
