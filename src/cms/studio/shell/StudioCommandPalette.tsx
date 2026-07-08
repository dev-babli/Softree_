'use client'

import { SearchIcon } from '@sanity/icons'
import { useClient } from 'sanity'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'sanity/router'

type SearchHit = {
  _id: string
  _type: string
  title?: string
  name?: string
}

const SEARCH_TYPES = ['caseStudy', 'post', 'marketingPage', 'serviceLine', 'tag']

export function StudioCommandPalette() {
  const client = useClient({ apiVersion: '2026-05-21' })
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [hits, setHits] = useState<SearchHit[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setOpen((value) => !value)
      }
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    if (!open) return
    const trimmed = query.trim()
    if (!trimmed) {
      setHits([])
      return
    }

    const timer = window.setTimeout(async () => {
      setLoading(true)
      try {
        const result = await client.fetch<SearchHit[]>(
          `*[_type in $types && (
            title match $q ||
            name match $q ||
            slug.current match $q
          )][0...12]{
            _id,
            _type,
            title,
            name
          }`,
          { types: SEARCH_TYPES, q: `*${trimmed}*` },
        )
        setHits(result)
      } finally {
        setLoading(false)
      }
    }, 200)

    return () => window.clearTimeout(timer)
  }, [client, open, query])

  const openDocument = useCallback(
    (id: string) => {
      setOpen(false)
      setQuery('')
      router.navigateIntent('edit', { id })
    },
    [router],
  )

  const label = useMemo(
    () => ({
      caseStudy: 'Case study',
      post: 'Blog post',
      marketingPage: 'Marketing page',
      serviceLine: 'Service line',
      tag: 'Tag',
    }),
    [],
  )

  if (!open) return null

  return (
    <div
      className="softree-cmdk"
      role="dialog"
      aria-label="Command palette"
      onClick={() => setOpen(false)}
    >
      <div className="softree-cmdk__panel" onClick={(event) => event.stopPropagation()}>
        <div className="softree-cmdk__input-row">
          <SearchIcon />
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search documents… (⌘K)"
            aria-label="Search documents"
          />
        </div>
        <ul className="softree-cmdk__results">
          {loading ? <li className="softree-cmdk__empty">Searching…</li> : null}
          {!loading && query && hits.length === 0 ? (
            <li className="softree-cmdk__empty">No matches</li>
          ) : null}
          {hits.map((hit) => (
            <li key={hit._id}>
              <button type="button" onClick={() => openDocument(hit._id)}>
                <span>{hit.title || hit.name || hit._id}</span>
                <small>{label[hit._type as keyof typeof label] ?? hit._type}</small>
              </button>
            </li>
          ))}
        </ul>
        <p className="softree-cmdk__hint">Esc to close · ⌘K toggle</p>
      </div>
    </div>
  )
}
