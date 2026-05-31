import { defineField, defineType } from 'sanity'

export const calloutBlockType = defineType({
  name: 'callout',
  title: 'Callout',
  type: 'object',
  fields: [
    defineField({
      name: 'variant',
      title: 'Style',
      type: 'string',
      options: {
        list: [
          { title: 'Info', value: 'info' },
          { title: 'Tip', value: 'tip' },
          { title: 'Warning', value: 'warning' },
        ],
        layout: 'radio',
      },
      initialValue: 'info',
    }),
    defineField({ name: 'title', title: 'Title (optional)', type: 'string' }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'text', variant: 'variant' },
    prepare({ title, subtitle, variant }) {
      return {
        title: title || 'Callout',
        subtitle: `${variant || 'info'} · ${subtitle?.slice(0, 72) || ''}`,
      }
    },
  },
})

export const ctaButtonBlockType = defineType({
  name: 'ctaButton',
  title: 'Call to action',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Button label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'href',
      title: 'Link URL',
      type: 'url',
      validation: (Rule) =>
        Rule.required().uri({
          allowRelative: true,
          scheme: ['http', 'https', 'mailto', 'tel'],
        }),
    }),
    defineField({
      name: 'style',
      title: 'Button style',
      type: 'string',
      options: {
        list: [
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
        ],
        layout: 'radio',
      },
      initialValue: 'primary',
    }),
  ],
  preview: {
    select: { title: 'label', subtitle: 'href' },
  },
})

export const statHighlightBlockType = defineType({
  name: 'statHighlight',
  title: 'Stat highlight',
  type: 'object',
  fields: [
    defineField({
      name: 'value',
      title: 'Value',
      type: 'string',
      description: 'e.g. 75%, 3x, $2M',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description (optional)',
      type: 'string',
    }),
  ],
  preview: {
    select: { title: 'value', subtitle: 'label' },
  },
})
