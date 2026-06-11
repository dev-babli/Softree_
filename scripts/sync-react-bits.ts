/**
 * Sync React Bits TS-TW components from _vendor/react-bits into src/components/react-bits.
 *
 * Usage: npm run react-bits:sync
 */
import fs from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '..')
const VENDOR = path.join(ROOT, '_vendor', 'react-bits')
const SOURCE = path.join(VENDOR, 'src', 'ts-tailwind')
const DEST = path.join(ROOT, 'src', 'components', 'react-bits')
const DEMO_DIR = path.join(VENDOR, 'src', 'demo')
const INFO_FILE = path.join(VENDOR, 'src', 'constants', 'Information.js')

type Category = 'Animations' | 'Backgrounds' | 'Components' | 'TextAnimations'

export type ReactBitsCatalogEntry = {
  id: string
  name: string
  category: Category
  description: string
  docsUrl: string
  importPath: string
  defaultProps?: Record<string, unknown>
}

function readMetadata(): Map<string, { name: string; category: Category; description: string; docsUrl: string }> {
  const raw = fs.readFileSync(INFO_FILE, 'utf8')
  const map = new Map<string, { name: string; category: Category; description: string; docsUrl: string }>()

  const blockRe = /'([^']+)':\s*\{([\s\S]*?)\n\s*\}/g
  let match: RegExpExecArray | null
  while ((match = blockRe.exec(raw))) {
    const key = match[1]
    const body = match[2]
    if (!key.includes('/')) continue

    const name = body.match(/name:\s*'([^']+)'/)?.[1]
    const category = body.match(/category:\s*'([^']+)'/)?.[1] as Category | undefined
    const description = body.match(/description:\s*'([^']*)'/)?.[1] ?? ''
    const docsUrl = body.match(/docsUrl:\s*'([^']+)'/)?.[1] ?? 'https://reactbits.dev'

    if (name && category) {
      map.set(key, { name, category, description, docsUrl })
    }
  }

  return map
}

function extractDefaultProps(category: string, name: string): Record<string, unknown> | undefined {
  const demoPath = path.join(DEMO_DIR, category, `${name}Demo.jsx`)
  if (!fs.existsSync(demoPath)) return undefined

  const demo = fs.readFileSync(demoPath, 'utf8')
  const propsMatch = demo.match(/const DEFAULT_PROPS\s*=\s*(\{[\s\S]*?\n\});/)
  if (!propsMatch) return undefined

  try {
    // eslint-disable-next-line no-new-func
    return new Function(`return (${propsMatch[1]})`)() as Record<string, unknown>
  } catch {
    return undefined
  }
}

function copyDir(src: string, dest: string) {
  fs.mkdirSync(dest, { recursive: true })
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const from = path.join(src, entry.name)
    const to = path.join(dest, entry.name)
    if (entry.isDirectory()) copyDir(from, to)
    else fs.copyFileSync(from, to)
  }
}

function copyAssets() {
  const lanyardSrc = path.join(VENDOR, 'src', 'ts-tailwind', 'Components', 'Lanyard')
  const lanyardDest = path.join(DEST, 'Components', 'Lanyard')
  for (const file of ['card.glb', 'lanyard.png']) {
    const from = path.join(lanyardSrc, file)
    if (fs.existsSync(from)) fs.copyFileSync(from, path.join(lanyardDest, file))
  }

  const glbSrc = path.join(VENDOR, 'public', 'assets', '3d')
  const glbDest = path.join(ROOT, 'public', 'assets', '3d')
  if (fs.existsSync(glbSrc)) copyDir(glbSrc, glbDest)
}

function listComponents(): Array<{ id: string; filePath: string; relImport: string }> {
  const items: Array<{ id: string; filePath: string; relImport: string }> = []

  for (const category of fs.readdirSync(SOURCE, { withFileTypes: true })) {
    if (!category.isDirectory()) continue
    const categoryPath = path.join(SOURCE, category.name)
    for (const component of fs.readdirSync(categoryPath, { withFileTypes: true })) {
      if (!component.isDirectory()) continue
      const tsx = path.join(categoryPath, component.name, `${component.name}.tsx`)
      if (!fs.existsSync(tsx)) continue
      const id = `${category.name}/${component.name}`
      items.push({
        id,
        filePath: tsx,
        relImport: `./${category.name}/${component.name}/${component.name}`,
      })
    }
  }

  return items.sort((a, b) => a.id.localeCompare(b.id))
}

function main() {
  if (!fs.existsSync(SOURCE)) {
    console.error('Missing _vendor/react-bits. Run: git clone https://github.com/DavidHDev/react-bits.git _vendor/react-bits')
    process.exit(1)
  }

  const metadata = readMetadata()
  const components = listComponents()

  if (fs.existsSync(DEST)) {
    for (const entry of fs.readdirSync(DEST, { withFileTypes: true })) {
      if (entry.name.startsWith('.')) continue
      if (['ReactBitsPreview.tsx', 'ReactBitsPreviewFrame.tsx', 'ReactBitsShowcase.tsx', 'types.ts', 'README.md', 'catalog.ts', 'registry.ts'].includes(entry.name)) {
        continue
      }
      const target = path.join(DEST, entry.name)
      fs.rmSync(target, { recursive: true, force: true })
    }
  }

  copyDir(SOURCE, DEST)
  copyAssets()

  // Upstream SideRays ships a duplicated component block — keep first export only.
  const sideRaysPath = path.join(DEST, 'Backgrounds', 'SideRays', 'SideRays.tsx')
  if (fs.existsSync(sideRaysPath)) {
    const sideRays = fs.readFileSync(sideRaysPath, 'utf8')
    const marker = 'export default SideRays;'
    const first = sideRays.indexOf(marker)
    if (first !== -1 && sideRays.indexOf(marker, first + marker.length) !== -1) {
      fs.writeFileSync(sideRaysPath, `${sideRays.slice(0, first + marker.length)}\n`)
    }
  }

  const catalog: ReactBitsCatalogEntry[] = components.map(({ id, relImport }) => {
    const meta = metadata.get(id)
    const [category, name] = id.split('/')
    return {
      id,
      name: meta?.name ?? name,
      category: (meta?.category ?? category) as Category,
      description: meta?.description ?? '',
      docsUrl: meta?.docsUrl ?? `https://reactbits.dev`,
      importPath: relImport,
      defaultProps: extractDefaultProps(category, name),
    }
  })

  const catalogTs = `/* eslint-disable */
/** AUTO-GENERATED by scripts/sync-react-bits.ts — do not edit manually */
import type { ReactBitsCatalogEntry } from './types'

export const REACT_BITS_CATALOG: ReactBitsCatalogEntry[] = ${JSON.stringify(catalog, null, 2)}

export const REACT_BITS_BY_ID = Object.fromEntries(
  REACT_BITS_CATALOG.map((entry) => [entry.id, entry]),
) as Record<string, ReactBitsCatalogEntry>

export const REACT_BITS_CATEGORIES = ${JSON.stringify(
    [...new Set(catalog.map((c) => c.category))].sort(),
  )} as const
`

  const registryLines = catalog.map(
    (entry) =>
      `  '${entry.id}': () => import('${entry.importPath}'),`,
  )

  const registryTs = `/* eslint-disable */
/** AUTO-GENERATED by scripts/sync-react-bits.ts — do not edit manually */
import type { ComponentType } from 'react'

export type ReactBitsModule = { default: ComponentType<Record<string, unknown>> }

export const reactBitsRegistry: Record<string, () => Promise<ReactBitsModule>> = {
${registryLines.join('\n')}
}
`

  fs.writeFileSync(path.join(DEST, 'catalog.ts'), catalogTs)
  fs.writeFileSync(path.join(DEST, 'registry.ts'), registryTs)

  console.log(`Synced ${catalog.length} React Bits components (TS-TW) to src/components/react-bits`)
  console.log(`  With default props: ${catalog.filter((c) => c.defaultProps).length}`)
}

main()
