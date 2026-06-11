import { defineArrayMember, defineField, defineType } from 'sanity'
import {
  BlockContentIcon,
  CaseIcon,
  ChartUpwardIcon,
  ComponentIcon,
  DocumentsIcon,
  HelpCircleIcon,
  ImageIcon,
  SparklesIcon,
  StackCompactIcon,
  ThLargeIcon,
  UsersIcon,
} from '@sanity/icons'

const cardItem = defineArrayMember({
  type: 'object',
  name: 'composerCard',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: { select: { title: 'title', subtitle: 'description' } },
})

const metricItem = defineArrayMember({
  type: 'object',
  name: 'composerMetric',
  fields: [
    defineField({ name: 'value', title: 'Value', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'description', title: 'Description (optional)', type: 'string' }),
  ],
  preview: { select: { title: 'value', subtitle: 'label' } },
})

const faqItem = defineArrayMember({
  type: 'object',
  name: 'composerFaq',
  fields: [
    defineField({ name: 'question', title: 'Question', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'answer', title: 'Answer', type: 'text', rows: 4, validation: (Rule) => Rule.required() }),
  ],
  preview: { select: { title: 'question' } },
})

/** Pulls project snapshot from document identity fields — no extra config needed */
export const csOverviewSectionType = defineType({
  name: 'csOverviewSection',
  title: 'Project overview',
  type: 'object',
  icon: CaseIcon,
  fields: [
    defineField({
      name: 'note',
      title: 'Note',
      type: 'string',
      readOnly: true,
      initialValue: 'Uses client name, excerpt, and project metadata from Client & project tab.',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Project overview', subtitle: 'Client snapshot bar', media: CaseIcon }
    },
  },
})

export const csNarrativeSectionType = defineType({
  name: 'csNarrativeSection',
  title: 'Narrative section',
  type: 'object',
  icon: BlockContentIcon,
  fields: [
    defineField({
      name: 'anchorId',
      title: 'Anchor ID (optional)',
      type: 'string',
      description: 'URL hash for in-page links, e.g. challenge → #challenge',
    }),
    defineField({
      name: 'label',
      title: 'Section label',
      type: 'string',
      description: 'Small uppercase label above the heading',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Body',
      type: 'storyBlockContent',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Text only', value: 'text' },
          { title: 'Text + side image', value: 'split' },
        ],
        layout: 'radio',
      },
      initialValue: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Side image',
      type: 'image',
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.layout !== 'split',
      fields: [defineField({ name: 'alt', type: 'string', title: 'Alt text' })],
    }),
  ],
  preview: {
    select: { title: 'heading', subtitle: 'label', media: 'image' },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Narrative section',
        subtitle: subtitle || 'Story block',
        media: media ?? BlockContentIcon,
      }
    },
  },
})

export const csCardGridSectionType = defineType({
  name: 'csCardGridSection',
  title: 'Card grid',
  type: 'object',
  icon: ThLargeIcon,
  fields: [
    defineField({ name: 'label', title: 'Section label', type: 'string' }),
    defineField({ name: 'heading', title: 'Heading', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [cardItem],
      validation: (Rule) => Rule.min(1).max(6),
    }),
    defineField({
      name: 'showImage',
      title: 'Show contextual image',
      type: 'boolean',
      initialValue: true,
      description: 'Displays an image beside the card grid (Challenge-style layout).',
    }),
    defineField({
      name: 'image',
      title: 'Side image',
      type: 'image',
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.showImage === false,
      fields: [defineField({ name: 'alt', type: 'string', title: 'Alt text' })],
      description: 'Upload a custom image, or leave empty to use the project stock image.',
    }),
  ],
  preview: {
    select: { title: 'heading', cards: 'cards' },
    prepare({ title, cards }) {
      return {
        title: title || 'Card grid',
        subtitle: `${cards?.length || 0} card${cards?.length === 1 ? '' : 's'}`,
        media: ThLargeIcon,
      }
    },
  },
})

export const csMetricsSectionType = defineType({
  name: 'csMetricsSection',
  title: 'Results & metrics',
  type: 'object',
  icon: ChartUpwardIcon,
  fields: [
    defineField({ name: 'label', title: 'Section label', type: 'string', initialValue: 'Impact' }),
    defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'Results & business impact' }),
    defineField({
      name: 'metrics',
      title: 'Metrics',
      type: 'array',
      of: [metricItem],
      validation: (Rule) => Rule.min(1).max(8),
    }),
  ],
  preview: {
    select: { title: 'heading', metrics: 'metrics' },
    prepare({ title, metrics }) {
      return {
        title: title || 'Results & metrics',
        subtitle: `${metrics?.length || 0} metric${metrics?.length === 1 ? '' : 's'}`,
        media: ChartUpwardIcon,
      }
    },
  },
})

export const csSolutionSectionType = defineType({
  name: 'csSolutionSection',
  title: 'Solution summary',
  type: 'object',
  icon: SparklesIcon,
  fields: [
    defineField({ name: 'label', title: 'Section label', type: 'string', initialValue: 'Solution' }),
    defineField({ name: 'heading', title: 'Heading', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'summary', title: 'Summary', type: 'text', rows: 4 }),
    defineField({
      name: 'features',
      title: 'Feature bullets',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
  preview: {
    select: { title: 'heading', features: 'features' },
    prepare({ title, features }) {
      return {
        title: title || 'Solution summary',
        subtitle: `${features?.length || 0} bullet${features?.length === 1 ? '' : 's'}`,
        media: SparklesIcon,
      }
    },
  },
})

export const csGallerySectionType = defineType({
  name: 'csGallerySection',
  title: 'Screenshot gallery',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'subheading', title: 'Subheading', type: 'string' }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', type: 'string', title: 'Alt text' }),
            defineField({ name: 'caption', type: 'string', title: 'Caption' }),
          ],
        }),
      ],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    select: { title: 'heading', images: 'images' },
    prepare({ title, images }) {
      return {
        title: title || 'Screenshot gallery',
        subtitle: `${images?.length || 0} image${images?.length === 1 ? '' : 's'}`,
        media: images?.[0] ?? ImageIcon,
      }
    },
  },
})

export const csTestimonialSectionType = defineType({
  name: 'csTestimonialSection',
  title: 'Client testimonial',
  type: 'object',
  icon: UsersIcon,
  fields: [
    defineField({ name: 'quote', title: 'Quote', type: 'text', rows: 4, validation: (Rule) => Rule.required() }),
    defineField({ name: 'name', title: 'Name', type: 'string' }),
    defineField({ name: 'role', title: 'Role / company', type: 'string' }),
    defineField({
      name: 'avatar',
      title: 'Avatar',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'quote', media: 'avatar' },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Testimonial',
        subtitle: subtitle?.slice(0, 72) || 'Client quote',
        media: media ?? UsersIcon,
      }
    },
  },
})

export const csTechStackSectionType = defineType({
  name: 'csTechStackSection',
  title: 'Tech stack',
  type: 'object',
  icon: StackCompactIcon,
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'Technology stack' }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'techItem',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'subtitle',
              title: 'Subtitle',
              type: 'string',
              description: 'Optional line under the technology name',
            }),
            defineField({
              name: 'logo',
              title: 'Logo',
              type: 'image',
              options: { hotspot: true },
              description: 'Upload a logo, or leave empty to use the built-in icon when available',
            }),
          ],
          preview: {
            select: { title: 'name', subtitle: 'subtitle', media: 'logo' },
            prepare({ title, subtitle, media }) {
              return {
                title: title || 'Technology',
                subtitle: subtitle || 'Tech stack item',
                media,
              }
            },
          },
        }),
      ],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    select: { title: 'heading', technologies: 'technologies' },
    prepare({ title, technologies }) {
      const names = (technologies || [])
        .map((item: { name?: string } | string) =>
          typeof item === 'string' ? item : item?.name,
        )
        .filter(Boolean)
      return {
        title: title || 'Tech stack',
        subtitle: names.slice(0, 4).join(', ') || 'Technologies',
        media: StackCompactIcon,
      }
    },
  },
})

export const csBeforeAfterSectionType = defineType({
  name: 'csBeforeAfterSection',
  title: 'Before / after table',
  type: 'object',
  icon: DocumentsIcon,
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'Before & after' }),
    defineField({
      name: 'rows',
      title: 'Comparison rows',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'metric', title: 'Metric', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'before', title: 'Before', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'after', title: 'After', type: 'string', validation: (Rule) => Rule.required() }),
          ],
          preview: { select: { title: 'metric', subtitle: 'after' } },
        }),
      ],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    select: { title: 'heading', rows: 'rows' },
    prepare({ title, rows }) {
      return {
        title: title || 'Before / after',
        subtitle: `${rows?.length || 0} row${rows?.length === 1 ? '' : 's'}`,
        media: DocumentsIcon,
      }
    },
  },
})

export const csFaqSectionType = defineType({
  name: 'csFaqSection',
  title: 'FAQ accordion',
  type: 'object',
  icon: HelpCircleIcon,
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'Common questions' }),
    defineField({
      name: 'faqs',
      title: 'Questions',
      type: 'array',
      of: [faqItem],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    select: { title: 'heading', faqs: 'faqs' },
    prepare({ title, faqs }) {
      return {
        title: title || 'FAQ',
        subtitle: `${faqs?.length || 0} question${faqs?.length === 1 ? '' : 's'}`,
        media: HelpCircleIcon,
      }
    },
  },
})

export const csRelatedSectionType = defineType({
  name: 'csRelatedSection',
  title: 'Related case studies',
  type: 'object',
  icon: ComponentIcon,
  fields: [
    defineField({
      name: 'note',
      type: 'string',
      readOnly: true,
      initialValue: 'Shows related case studies configured on this document (or category matches).',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Related case studies', subtitle: 'Auto from document', media: ComponentIcon }
    },
  },
})

export const csContactSectionType = defineType({
  name: 'csContactSection',
  title: 'Contact CTA',
  type: 'object',
  icon: SparklesIcon,
  fields: [
    defineField({
      name: 'note',
      type: 'string',
      readOnly: true,
      initialValue: 'Renders the site-wide contact section — no configuration needed.',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Contact CTA', subtitle: 'Site contact block', media: SparklesIcon }
    },
  },
})

export const caseStudyComposerBlockTypes = [
  csOverviewSectionType,
  csNarrativeSectionType,
  csCardGridSectionType,
  csMetricsSectionType,
  csSolutionSectionType,
  csGallerySectionType,
  csTestimonialSectionType,
  csTechStackSectionType,
  csBeforeAfterSectionType,
  csFaqSectionType,
  csRelatedSectionType,
  csContactSectionType,
]

export const caseStudyComposerMembers = caseStudyComposerBlockTypes.map((block) =>
  defineArrayMember({ type: block.name }),
)

export const caseStudyComposerInsertMenu = {
  groups: [
    { name: 'story', title: 'Story', of: ['csOverviewSection', 'csNarrativeSection'] },
    {
      name: 'structure',
      title: 'Structure',
      of: ['csCardGridSection', 'csSolutionSection', 'csGallerySection'],
    },
    {
      name: 'proof',
      title: 'Results & proof',
      of: ['csMetricsSection', 'csBeforeAfterSection', 'csTestimonialSection'],
    },
    {
      name: 'closing',
      title: 'Closing',
      of: ['csTechStackSection', 'csFaqSection', 'csRelatedSection', 'csContactSection'],
    },
  ],
  views: [
    { name: 'list' as const },
    {
      name: 'grid' as const,
      previewImageUrl: (schemaType: string) => `/studio/composer-previews/${schemaType}.svg`,
    },
  ],
}
