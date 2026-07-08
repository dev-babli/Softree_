import { defineField } from 'sanity'

/** Required alt text on all editorial images */
export const imageAltField = defineField({
  name: 'alt',
  title: 'Alt text',
  type: 'string',
  description: 'Describe the image for screen readers and SEO.',
  validation: (Rule) => Rule.required().warning('Alt text is required for accessibility'),
})

export const editorialImageFields = [
  imageAltField,
  defineField({
    name: 'caption',
    title: 'Caption',
    type: 'string',
  }),
]
