'use client'

import { CaseIcon, DocumentIcon, DocumentTextIcon } from '@sanity/icons'

import type { ActivityItem } from './types'
import { formatRelativeTime, typeLabel } from './utils'

function activityLabel(item: ActivityItem): string {
  if (item._type === 'caseStudy') {
    return item.client || item.title || 'Untitled case study'
  }
  return item.title || 'Untitled'
}

function ActivityIcon({ type }: { type: string }) {
  const style = { width: 14, height: 14 }
  switch (type) {
    case 'caseStudy':
      return <CaseIcon style={style} />
    case 'post':
      return <DocumentTextIcon style={style} />
    default:
      return <DocumentIcon style={style} />
  }
}

export function RecentEditsList({
  items,
  onOpen,
  hideHead = false,
}: {
  items: ActivityItem[]
  onOpen: (id: string, type: string) => void
  hideHead?: boolean
}) {
  if (items.length === 0) {
    return (
      <p className="softree-dash__recent-edits-empty">No recent edits in the last week.</p>
    )
  }

  return (
    <div className="softree-dash__recent-edits">
      {hideHead ? null : <p className="softree-dash__recent-edits-head">Recent edits</p>}
      <ul className="softree-dash__recent-edits-list">
        {items.map((item) => {
          const label = activityLabel(item)
          return (
            <li key={item._id}>
              <button
                type="button"
                className="softree-dash__recent-edits-item"
                aria-label={`Open ${label}`}
                onClick={() => onOpen(item._id, item._type)}
              >
                <span className="softree-dash__recent-edits-icon" aria-hidden>
                  <ActivityIcon type={item._type} />
                </span>
                <span className="softree-dash__recent-edits-title">
                  {label}
                  <span className="softree-dash__recent-edits-type">
                    {' '}
                    · {typeLabel(item._type)}
                  </span>
                </span>
                <span className="softree-dash__recent-edits-time">
                  {formatRelativeTime(item._updatedAt)}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
