import { MenuIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

const navLink = defineArrayMember({
  type: 'object',
  name: 'navLink',
  fields: [
    defineField({ name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'href', title: 'URL', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'openInNewTab', title: 'Open in new tab', type: 'boolean', initialValue: false }),
  ],
  preview: { select: { title: 'label', subtitle: 'href' } },
})

export const navigationType = defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  icon: MenuIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Internal title',
      type: 'string',
      initialValue: 'Main navigation',
      readOnly: true,
    }),
    defineField({
      name: 'primaryLinks',
      title: 'Primary links',
      type: 'array',
      of: [navLink],
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA label',
      type: 'string',
    }),
    defineField({
      name: 'ctaHref',
      title: 'CTA URL',
      type: 'string',
    }),
  ],
})
