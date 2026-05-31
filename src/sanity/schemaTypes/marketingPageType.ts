import { EarthGlobeIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'
import { defaultFieldInstructions } from '../assist/config'
import { aiAssistExclude } from '../lib/blockContentOptions'
import { publishReadinessValidation, createSeoPreviewPanelField } from '../lib/documentHelpers'
import { reviewStatusField } from '../lib/reviewStatusField'

export const marketingPageType = defineType({
  name: 'marketingPage',
  title: 'Marketing Page',
  type: 'document',
  icon: EarthGlobeIcon,
  groups: [
    { name: 'content', title: 'Page builder', default: true },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Internal title',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL slug',
      type: 'slug',
      group: 'content',
      options: { source: 'title', maxLength: 96, ...aiAssistExclude },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      group: 'content',
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
    }),
    {...reviewStatusField, group: 'content'},
    defineField({
      name: 'sections',
      title: 'Page sections',
      type: 'array',
      group: 'content',
      description: 'Stack hero, features, testimonials, and CTAs to build landing pages without code.',
      of: [
        defineArrayMember({ type: 'pageHeroBlock' }),
        defineArrayMember({ type: 'pageFeatureGridBlock' }),
        defineArrayMember({ type: 'pageRichTextBlock' }),
        defineArrayMember({ type: 'pageTestimonialBlock' }),
        defineArrayMember({ type: 'pageCtaBlock' }),
      ],
    }),
    defineField({
      name: 'metaTitle',
      title: 'Meta title',
      type: 'string',
      group: 'seo',
      description: defaultFieldInstructions.metaTitle,
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta description',
      type: 'text',
      rows: 2,
      group: 'seo',
      description: defaultFieldInstructions.metaDescription,
      validation: (Rule) => Rule.max(160),
    }),
    createSeoPreviewPanelField('seo'),
  ],
  validation: (Rule) =>
    publishReadinessValidation(Rule, { requireBody: false, requireImage: false }),
  preview: {
    select: { title: 'title', slug: 'slug.current', status: 'status' },
    prepare({ title, slug, status }) {
      return {
        title: title || 'Marketing page',
        subtitle: [slug && `/${slug}`, status].filter(Boolean).join(' · '),
      }
    },
  },
})
