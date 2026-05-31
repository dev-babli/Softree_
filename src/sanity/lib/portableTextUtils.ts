type PortableTextBlock = {
  _type?: string
  style?: string
  listItem?: string
  children?: Array<{ text?: string }>
}

export function plainTextFromBlocks(blocks?: PortableTextBlock[] | null): string {
  if (!blocks?.length) return ''
  return blocks
    .map((block) => (block.children || []).map((child) => child.text || '').join(' '))
    .join(' ')
    .trim()
}

export function bulletsFromBlocks(blocks?: PortableTextBlock[] | null): string[] {
  if (!blocks?.length) return []
  return blocks
    .filter((block) => block.listItem === 'bullet' || block.style === 'normal')
    .map((block) => (block.children || []).map((child) => child.text || '').join(' ').trim())
    .filter(Boolean)
}

export function sentencesFromText(text: string, max = 3): string[] {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean)
    .slice(0, max)
}
