import {DocumentTextIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {BLOG_LAYOUT_RECIPES} from '../../lib/blog-layout-recipes'
import ComposerSectionsInput from '../components/ComposerSectionsInput'
import {aiAssistExclude} from '../lib/blockContentOptions'
import {fieldAi} from '../lib/fieldAiOptions'
import {createSeoPreviewPanelField, createEditorProgressPanelField} from '../lib/documentHelpers'
import {postHasContent} from '../lib/postCompleteness'
import {getAeoPublishIssues, type AeoCompletenessDoc} from '../lib/aeoCompleteness'
import {reviewStatusField} from '../lib/reviewStatusField'
import {caseStudyComposerInsertMenu, caseStudyComposerMembers} from './caseStudyComposerBlocks'

const isComposerPost = ({document}: {document?: Record<string, unknown>}) =>
  (document?.displayMode as string | undefined) === 'composer'

const hideWhenClassic = ({document}: {document?: Record<string, unknown>}) =>
  !isComposerPost({document})

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
    {name: 'content', title: 'Content'},
    {name: 'composer', title: 'Page composer'},
    {name: 'seo', title: 'SEO & AEO'},
    {name: 'publish', title: 'Publish'},
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
      name: 'displayMode',
      title: 'Page display',
      type: 'string',
      group: 'composer',
      description:
        'Classic = standard article layout. Composer = scroll-based sections (same blocks as case studies). New posts default to Composer.',
      options: {
        list: [
          {title: 'Classic article', value: 'classic'},
          {title: 'Page composer (scroll sections)', value: 'composer'},
        ],
        layout: 'radio',
        ...aiAssistExclude,
      },
      initialValue: 'composer',
    }),
    defineField({
      name: 'layoutRecipe',
      title: 'Layout recipe',
      type: 'string',
      group: 'composer',
      description: 'Used by the AI content pipeline to pick section types. Editors can override.',
      hidden: hideWhenClassic,
      options: {
        list: BLOG_LAYOUT_RECIPES.map((recipe) => ({
          title: recipe.title,
          value: recipe.id,
        })),
      },
    }),
    defineField({
      name: 'composerSections',
      title: 'Page sections',
      type: 'array',
      group: 'composer',
      description: 'Stack narrative, metrics, FAQ, and other sections — same composer as case studies.',
      hidden: hideWhenClassic,
      of: caseStudyComposerMembers,
      components: {
        input: ComposerSectionsInput,
      },
      options: {
        insertMenu: caseStudyComposerInsertMenu,
      },
      validation: (Rule) =>
        Rule.custom((sections, context) => {
          const doc = context.document as {displayMode?: string}
          if (doc?.displayMode !== 'composer') return true
          if (!sections?.length) return 'Add at least one section for composer display mode'
          return true
        }),
    }),
    defineField({
      name: 'heroEyebrow',
      title: 'Hero eyebrow',
      type: 'string',
      group: 'composer',
      description: 'Small label above the title, e.g. "Microsoft 365 · June 2026"',
      hidden: hideWhenClassic,
    }),
    defineField({
      name: 'heroHighlights',
      title: 'Hero highlights',
      type: 'array',
      group: 'composer',
      hidden: hideWhenClassic,
      of: [
        defineArrayMember({
          type: 'object',
          name: 'heroHighlight',
          fields: [
            defineField({name: 'value', type: 'string', validation: (Rule) => Rule.required()}),
            defineField({name: 'label', type: 'string', validation: (Rule) => Rule.required()}),
          ],
          preview: {select: {title: 'value', subtitle: 'label'}},
        }),
      ],
    }),
    defineField({
      name: 'body',
      title: 'Article Content',
      type: 'blockContent',
      group: 'content',
      description: fieldAi.body.description,
      hidden: ({document}) => (document?.displayMode as string | undefined) === 'composer',
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
    defineField({
      ...reviewStatusField,
      group: 'publish',
    }),
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
      options: {
        hotspot: true,
        aiAssist: {
          imageInstructionField: 'featuredImagePrompt',
        },
      },
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
      name: 'featuredImagePrompt',
      title: 'Featured Image AI Prompt',
      type: 'text',
      rows: 3,
      group: 'content',
      description: 'Describe the featured image you want AI to generate. Leave empty to use the title and excerpt as context.',
      hidden: ({document}) => !!(document as any)?.mainImage?.asset,
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
    createEditorProgressPanelField('publish'),
  ],
  validation: (Rule) =>
    Rule.custom((fields: Record<string, unknown> | undefined) => {
      if (!fields || fields.status === 'archived' || fields.status === 'draft') return true

      const missing: string[] = []
      if (!fields.title) missing.push('title')
      if (!(fields.slug as {current?: string} | undefined)?.current) missing.push('slug')
      if (!fields.excerpt) missing.push('excerpt')

      if (!postHasContent(fields as Parameters<typeof postHasContent>[0])) {
        missing.push('content (body or composer sections)')
      }

      const aeoIssues = getAeoPublishIssues(fields as AeoCompletenessDoc)
      if (aeoIssues.length > 0) {
        missing.push(...aeoIssues)
      }

      if (missing.length > 0) {
        return `Before publishing, add: ${missing.join(', ')}`
      }
      return true
    }),
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
