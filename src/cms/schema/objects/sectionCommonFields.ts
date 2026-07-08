import { defineField } from 'sanity'

/**
 * Agency section styling contract — from cms-kit commonFields pattern.
 * Apply to every page-builder / composer section object.
 */
export const sectionStyleGroups = [
  { name: 'content', title: 'Content', default: true },
  { name: 'style', title: 'Style' },
]

export const sectionCommonFields = [
  defineField({
    name: 'theme',
    title: 'Theme',
    type: 'string',
    group: 'style',
    initialValue: 'light',
    options: {
      list: [
        { title: 'Light', value: 'light' },
        { title: 'Dark', value: 'dark' },
        { title: 'Light gray', value: 'light-gray' },
        { title: 'Dark gray', value: 'dark-gray' },
      ],
      layout: 'radio',
    },
  }),
  defineField({
    name: 'paddingY',
    title: 'Vertical padding',
    type: 'string',
    group: 'style',
    initialValue: 'base',
    options: {
      list: [
        { title: 'None', value: 'none' },
        { title: 'Base', value: 'base' },
        { title: 'Large', value: 'large' },
      ],
      layout: 'radio',
    },
  }),
  defineField({
    name: 'paddingX',
    title: 'Horizontal padding',
    type: 'string',
    group: 'style',
    initialValue: 'base',
    options: {
      list: [
        { title: 'None', value: 'none' },
        { title: 'Base', value: 'base' },
      ],
      layout: 'radio',
    },
  }),
  defineField({
    name: 'anchorId',
    title: 'Anchor ID',
    type: 'string',
    group: 'style',
    description: 'Optional in-page link target (e.g. faq, metrics)',
    validation: (Rule) =>
      Rule.regex(/^[a-z][a-z0-9-]*$/, {
        name: 'anchor',
        invert: false,
      }).warning('Use lowercase letters, numbers, and hyphens'),
  }),
]
