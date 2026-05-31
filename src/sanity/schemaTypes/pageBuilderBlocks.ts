import { defineArrayMember, defineField, defineType } from 'sanity'

export const pageHeroBlockType = defineType({
  name: 'pageHeroBlock',
  title: 'Hero',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'subheadline', title: 'Subheadline', type: 'text', rows: 3 }),
    defineField({
      name: 'primaryCta',
      title: 'Primary CTA',
      type: 'object',
      fields: [
        defineField({ name: 'label', type: 'string', title: 'Label' }),
        defineField({ name: 'href', type: 'string', title: 'URL', description: 'Relative (/contact) or absolute URL' }),
      ],
    }),
    defineField({
      name: 'image',
      title: 'Hero image',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', type: 'string', title: 'Alt text' })],
    }),
  ],
  preview: {
    select: { title: 'headline', subtitle: 'eyebrow', media: 'image' },
  },
})

export const pageFeatureGridBlockType = defineType({
  name: 'pageFeatureGridBlock',
  title: 'Feature grid',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Section heading', type: 'string' }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'title', type: 'string', title: 'Title', validation: (Rule) => Rule.required() }),
            defineField({ name: 'description', type: 'text', title: 'Description', rows: 3 }),
            defineField({ name: 'icon', type: 'string', title: 'Icon name (optional)' }),
          ],
          preview: { select: { title: 'title', subtitle: 'description' } },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title || 'Feature grid' }
    },
  },
})

export const pageCtaBlockType = defineType({
  name: 'pageCtaBlock',
  title: 'Call to action',
  type: 'object',
  fields: [
    defineField({ name: 'headline', title: 'Headline', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'body', title: 'Body', type: 'text', rows: 3 }),
    defineField({ name: 'buttonLabel', title: 'Button label', type: 'string' }),
    defineField({ name: 'buttonHref', title: 'Button URL', type: 'string', description: 'Relative or absolute URL' }),
  ],
  preview: {
    select: { title: 'headline', subtitle: 'buttonLabel' },
  },
})

export const pageRichTextBlockType = defineType({
  name: 'pageRichTextBlock',
  title: 'Rich text',
  type: 'object',
  fields: [
    defineField({ name: 'content', title: 'Content', type: 'blockContent' }),
  ],
  preview: {
    prepare() {
      return { title: 'Rich text section' }
    },
  },
})

export const pageTestimonialBlockType = defineType({
  name: 'pageTestimonialBlock',
  title: 'Testimonial',
  type: 'object',
  fields: [
    defineField({ name: 'quote', title: 'Quote', type: 'text', rows: 4, validation: (Rule) => Rule.required() }),
    defineField({ name: 'name', title: 'Name', type: 'string' }),
    defineField({ name: 'role', title: 'Role / company', type: 'string' }),
    defineField({ name: 'avatar', title: 'Avatar', type: 'image' }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'quote' },
  },
})

export const pageBuilderBlockTypes = [
  pageHeroBlockType,
  pageFeatureGridBlockType,
  pageCtaBlockType,
  pageRichTextBlockType,
  pageTestimonialBlockType,
]
