'use client'

import type {ToolMenuProps} from 'sanity'

const PRIORITY = ['structure', 'presentation'] as const
const HIDDEN_IN_PROD = new Set(['vision'])

export function StudioToolMenu(props: ToolMenuProps) {
  const {renderDefault, tools} = props
  const isDev = process.env.NODE_ENV === 'development'

  const filtered = tools.filter((tool) => {
    const name = tool.name ?? ''
    if (!isDev && HIDDEN_IN_PROD.has(name)) return false
    return true
  })

  const sorted = [...filtered].sort((a, b) => {
    const ai = PRIORITY.indexOf((a.name ?? '') as (typeof PRIORITY)[number])
    const bi = PRIORITY.indexOf((b.name ?? '') as (typeof PRIORITY)[number])
    const aRank = ai === -1 ? 99 : ai
    const bRank = bi === -1 ? 99 : bi
    return aRank - bRank
  })

  return renderDefault({...props, tools: sorted})
}
