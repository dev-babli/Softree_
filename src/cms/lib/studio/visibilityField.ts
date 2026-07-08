import { defineField } from 'sanity'

import { aiAssistExclude } from './blockContentOptions'

/** ADR-002: canonical website visibility (replaces legacy `status` over time). */
export const visibilityField = defineField({
  name: 'visibility',
  title: 'Website visibility',
  type: 'string',
  description:
    'Controls whether this document appears on the public site. Publish actions sync legacy `status` for backward compatibility.',
  options: {
    list: [
      { title: 'Published', value: 'published' },
      { title: 'Draft', value: 'draft' },
      { title: 'Archived', value: 'archived' },
    ],
    layout: 'radio',
    ...aiAssistExclude,
  },
  initialValue: 'draft',
})

/** GROQ fragment for published-only lists */
export const VISIBILITY_PUBLISHED_FILTER = `coalesce(visibility, status, "published") == "published"`

export const VISIBILITY_DRAFT_FILTER = `coalesce(visibility, status, "published") == "draft"`

export const VISIBILITY_NOT_ARCHIVED = `coalesce(visibility, status, "published") != "archived"`
