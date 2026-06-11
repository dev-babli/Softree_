/** Convert markdown-ish prose into Sanity Portable Text blocks for storyBlockContent / blockContent. */

type PtBlock = {
  _type: 'block'
  _key: string
  style: string
  children: Array<{ _type: 'span'; _key: string; text: string; marks?: string[] }>
  markDefs?: unknown[]
  listItem?: 'bullet' | 'number'
  level?: number
}

let keyCounter = 0
function blockKey(prefix: string) {
  keyCounter += 1
  return `${prefix}-${keyCounter}-${Math.random().toString(36).slice(2, 8)}`
}

export function proseToPortableText(markdown: string): PtBlock[] {
  keyCounter = 0
  const lines = markdown.split('\n')
  const blocks: PtBlock[] = []
  let paragraph: string[] = []

  const flushParagraph = () => {
    if (!paragraph.length) return
    blocks.push({
      _type: 'block',
      _key: blockKey('p'),
      style: 'normal',
      markDefs: [],
      children: [{ _type: 'span', _key: blockKey('s'), text: paragraph.join(' ') }],
    })
    paragraph = []
  }

  for (const raw of lines) {
    const line = raw.trimEnd()
    if (!line.trim()) {
      flushParagraph()
      continue
    }
    if (line.startsWith('## ')) {
      flushParagraph()
      blocks.push({
        _type: 'block',
        _key: blockKey('h2'),
        style: 'h2',
        markDefs: [],
        children: [{ _type: 'span', _key: blockKey('s'), text: line.replace(/^##\s+/, '') }],
      })
      continue
    }
    if (line.startsWith('### ')) {
      flushParagraph()
      blocks.push({
        _type: 'block',
        _key: blockKey('h3'),
        style: 'h3',
        markDefs: [],
        children: [{ _type: 'span', _key: blockKey('s'), text: line.replace(/^###\s+/, '') }],
      })
      continue
    }
    if (line.startsWith('- ')) {
      flushParagraph()
      blocks.push({
        _type: 'block',
        _key: blockKey('li'),
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        markDefs: [],
        children: [{ _type: 'span', _key: blockKey('s'), text: line.replace(/^-\s+/, '') }],
      })
      continue
    }
    paragraph.push(line.trim())
  }

  flushParagraph()
  return blocks
}
