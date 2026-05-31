import { SparklesIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'
import { defaultFieldInstructions } from '../assist/config'
import { aiAssistExclude } from '../lib/blockContentOptions'

/** Brand voice & style guide consumed by Sanity AI Assist instructions in Studio. */
export const aiContextType = defineType({
  name: 'aiContext',
  title: 'AI Context',
  type: 'document',
  icon: SparklesIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Softree brand voice',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'context',
      title: 'Style guide & instructions',
      type: 'text',
      rows: 16,
      description:
        'Paste brand voice, terminology, and writing rules. This document is automatically loaded by Softree instruction templates in ✨ AI Assist.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isDefault',
      title: 'Default context',
      type: 'boolean',
      description: 'Mark as the primary context document for editors.',
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: 'title', isDefault: 'isDefault' },
    prepare({ title, isDefault }) {
      return {
        title: title || 'AI Context',
        subtitle: isDefault ? 'Default' : 'Supplementary',
      }
    },
  },
})
