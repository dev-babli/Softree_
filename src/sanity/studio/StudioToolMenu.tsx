'use client'

import type { ToolMenuProps } from 'sanity'
import { useCurrentUser } from 'sanity'

const PRIORITY = ['structure', 'presentation', 'content-agent'] as const

/** Hidden in production for everyone; hidden for non-admins in all environments. */
const ADMIN_ONLY_TOOLS = new Set(['vision', 'react-bits', 'gemini-images'])

const HIDDEN_IN_PROD = new Set(['vision'])

function isAdministrator(roles: Array<{ name: string }> | undefined): boolean {
  return roles?.some((role) => role.name === 'administrator') ?? false
}

export function StudioToolMenu(props: ToolMenuProps) {
  const { renderDefault, tools } = props
  const user = useCurrentUser()
  const isDev = process.env.NODE_ENV === 'development'
  const isAdmin = isAdministrator(user?.roles)

  const filtered = tools.filter((tool) => {
    const name = tool.name ?? ''
    if (!isDev && HIDDEN_IN_PROD.has(name)) return false
    if (!isAdmin && ADMIN_ONLY_TOOLS.has(name)) return false
    return true
  })

  const sorted = [...filtered].sort((a, b) => {
    const ai = PRIORITY.indexOf((a.name ?? '') as (typeof PRIORITY)[number])
    const bi = PRIORITY.indexOf((b.name ?? '') as (typeof PRIORITY)[number])
    const aRank = ai === -1 ? 99 : ai
    const bRank = bi === -1 ? 99 : bi
    return aRank - bRank
  })

  return renderDefault({ ...props, tools: sorted })
}
