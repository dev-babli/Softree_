import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const from = 'coalesce(status, "published")'
const to = 'coalesce(visibility, status, "published")'

function walk(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name)
    if (ent.isDirectory() && !ent.name.startsWith('.') && ent.name !== 'node_modules') {
      walk(p)
    } else if (/\.(ts|tsx|js|jsx|mjs)$/.test(ent.name)) {
      let text = fs.readFileSync(p, 'utf8')
      if (!text.includes(from) || text.includes('coalesce(visibility, status')) continue
      text = text.split(from).join(to)
      fs.writeFileSync(p, text, 'utf8')
      console.log('updated', path.relative(root, p))
    }
  }
}

walk(path.join(root, 'src'))
