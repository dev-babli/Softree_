import { LinkIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const redirectType = defineType({
  name: 'redirect',
  title: 'Redirect',
  type: 'document',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'from',
      title: 'From path',
      type: 'string',
      description: 'Site path starting with /',
      validation: (Rule) =>
        Rule.required().regex(/^\//, { name: 'path', invert: false }),
    }),
    defineField({
      name: 'to',
      title: 'To URL or path',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'permanent',
      title: 'Permanent (301)',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'enabled',
      title: 'Enabled',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: { from: 'from', to: 'to', permanent: 'permanent' },
    prepare({ from, to, permanent }) {
      return {
        title: `${from} → ${to}`,
        subtitle: permanent ? '301' : '302',
      }
    },
  },
})
