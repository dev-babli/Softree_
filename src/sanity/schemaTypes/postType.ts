import {DocumentTextIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {aiAssistExclude} from '../lib/blockContentOptions'
import {fieldAi} from '../lib/fieldAiOptions'
import {publishReadinessValidation, createSeoPreviewPanelField} from '../lib/documentHelpers'
import {reviewStatusField} from '../lib/reviewStatusField'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'seo', title: 'SEO & AEO'},
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required().min(10).max(100),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      group: 'content',
      options: {source: 'title', maxLength: 96, ...aiAssistExclude},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      group: 'content',
      description: fieldAi.excerpt.description,
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'body',
      title: 'Article Content',
      type: 'blockContent',
      group: 'content',
      description: fieldAi.body.description,
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      group: 'content',
      description: 'Set to Archived to hide this post from the website while keeping it in Sanity.',
      options: {
        list: [
          {title: 'Published', value: 'published'},
          {title: 'Draft', value: 'draft'},
          {title: 'Archived', value: 'archived'},
        ],
        layout: 'radio',
        ...aiAssistExclude,
      },
      initialValue: 'published',
      validation: (Rule) => Rule.required(),
    }),
    {...reviewStatusField, group: 'content'},
    defineField({
      name: 'author',
      type: 'reference',
      to: {type: 'author'},
      group: 'content',
    }),
    defineField({
      name: 'mainImage',
      type: 'image',
      group: 'content',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'categories',
      type: 'array',
      group: 'content',
      of: [defineArrayMember({type: 'reference', to: {type: 'category'}})],
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      group: 'content',
      description: 'Displayed on the site when status is Published. Future dates are stored for editorial planning; automatic hide-until scheduling is not yet enabled on the site.',
    }),
    // SEO & AEO fields
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      group: 'seo',
      description: fieldAi.metaTitle.description,
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 2,
      group: 'seo',
      description: fieldAi.metaDescription.description,
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'focusKeyword',
      title: 'Focus Keyword',
      type: 'string',
      group: 'seo',
      description: 'Primary keyword this post targets',
    }),
    defineField({
      name: 'secondaryKeywords',
      title: 'Secondary Keywords',
      type: 'array',
      of: [{type: 'string'}],
      group: 'seo',
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'faqSchema',
      title: 'FAQ Schema (AEO)',
      type: 'array',
      group: 'seo',
      description: 'Add FAQ pairs to generate JSON-LD FAQ schema for answer engine optimization',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'question', type: 'string', title: 'Question', validation: (Rule) => Rule.required()}),
            defineField({name: 'answer', type: 'text', title: 'Answer', description: fieldAi.faqAnswer.description, validation: (Rule) => Rule.required()}),
          ],
          preview: {
            select: {title: 'question'},
          },
        }),
      ],
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      group: 'seo',
      description: 'Image used when shared on social media (1200×630px recommended)',
      options: {hotspot: true},
    }),
    createSeoPreviewPanelField('seo'),
  ],
  validation: (Rule) => publishReadinessValidation(Rule, { requireImage: false }),
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
