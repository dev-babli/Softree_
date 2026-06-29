import { SparklesIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

/** Starter copy — writers customize; bundled Softree guide fills gaps until then. */
const AI_CONTEXT_STARTER = `Customize Softree's AI writing rules here. Content Agent and ✨ field actions read this document when "Default context" is on.

Include:
• Target audience (CTO, IT director, etc.)
• Tone (authoritative, concrete, no buzzwords)
• Forbidden phrases and preferred alternatives
• How to cite metrics and proof points
• CTA style for case studies vs blog posts

Leave blank sections out — the bundled style guide still applies as a fallback.`

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
        'Brand voice and writing rules for ✨ AI Assist (field templates) and the Content Agent pipeline. Mark one document as Default.',
      initialValue: AI_CONTEXT_STARTER,
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
