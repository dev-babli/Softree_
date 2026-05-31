import { defineField } from 'sanity'
import { aiAssistExclude } from './blockContentOptions'

export const reviewStatusField = defineField({
  name: 'reviewStatus',
  title: 'Review status',
  type: 'string',
  description: 'Editorial review workflow — separate from publish status.',
  options: {
    list: [
      { title: 'Draft', value: 'draft' },
      { title: 'In review', value: 'in-review' },
      { title: 'Approved', value: 'approved' },
    ],
    layout: 'radio',
    ...aiAssistExclude,
  },
  initialValue: 'draft',
})
