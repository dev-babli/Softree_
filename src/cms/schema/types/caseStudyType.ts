import { defineField, defineType, defineArrayMember } from 'sanity'
import {
  getCaseStudyCategoryStudioList,
  isCaseStudyCategory,
} from '@/app/case-studies/categoryConfig'
import { CaseIcon } from '@sanity/icons'
import { aiAssistExclude } from '@/cms/lib/studio/blockContentOptions'
import { fieldAi } from '@/cms/lib/studio/fieldAiOptions'
import { createSeoPreviewPanelField, createEditorProgressPanelField, createFaqAeoPanelField, createContentScorePanelField } from '@/cms/lib/studio/documentHelpers'
import { scheduledPublishAtField } from '@/cms/lib/studio/scheduledPublishField'
import { reviewStatusField } from '@/cms/lib/studio/reviewStatusField'
import { visibilityField } from '@/cms/lib/studio/visibilityField'
import { caseStudyHasStoryContent } from '@/cms/lib/studio/caseStudyCompleteness'
import {
  effectiveCaseStudyCategory,
  effectiveCaseStudyHeaderTitle,
  type CaseStudyLegacyDoc,
} from '@/cms/lib/studio/caseStudyLegacy'

import CaseStudySetupInput from '@/cms/studio/inputs/CaseStudySetupInput'
import BulkGalleryUploadInput from '@/cms/studio/inputs/BulkGalleryUploadInput'
import BulkTagsInput from '@/cms/studio/inputs/BulkTagsInput'

const cardItemFields = [
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
]

const beforeAfterFields = [
    defineField({ name: 'metric', type: 'string', title: 'Metric', validation: (Rule) => Rule.required() }),
    defineField({ name: 'before', type: 'string', title: 'Before', validation: (Rule) => Rule.required() }),
    defineField({ name: 'after', type: 'string', title: 'After', validation: (Rule) => Rule.required() }),
]



export const caseStudyType = defineType({
    name: 'caseStudy',
    title: 'Case Study',
    type: 'document',
    icon: CaseIcon,
    groups: [
        { name: 'story', title: 'Story', default: true },
        { name: 'client', title: 'Client' },
        { name: 'sections', title: 'Legacy sections' },
        { name: 'media', title: 'Media' },
        { name: 'publish', title: 'Publish & SEO' },
    ],
    fieldsets: [
        { name: 'identity', title: 'Title', options: { collapsible: false } },
        { name: 'narrative', title: 'Story sections', options: { collapsible: false } },
        { name: 'layout', title: 'Page layout', options: { collapsible: true, collapsed: true } },
        { name: 'snapshot', title: 'Project snapshot', options: { collapsible: true, collapsed: false } },
        { name: 'engagement', title: 'Engagement details', options: { collapsible: true, collapsed: true } },
        { name: 'stats', title: 'Metrics & highlights', options: { collapsible: true, collapsed: false } },
        { name: 'cards', title: 'Cards & lists', options: { collapsible: true, collapsed: true } },
        { name: 'testimonialSet', title: 'Testimonial', options: { collapsible: true, collapsed: true } },
        { name: 'ctaSet', title: 'Call to action', options: { collapsible: true, collapsed: true } },
        { name: 'faqSet', title: 'FAQs', options: { collapsible: true, collapsed: true } },
        { name: 'heroMedia', title: 'Cover & hero', options: { collapsible: true, collapsed: false } },
        { name: 'gallerySet', title: 'Gallery & video', options: { collapsible: true, collapsed: true } },
        { name: 'statusSet', title: 'Status', options: { collapsible: false } },
        { name: 'faqAeoSet', title: 'FAQ (required for publish)', options: { collapsible: false } },
        { name: 'listingSet', title: 'Listing & featured', options: { collapsible: true, collapsed: true } },
        { name: 'seoSet', title: 'SEO', options: { collapsible: true, collapsed: true } },
    ],
    fields: [
        defineField({
            name: 'category',
            title: 'Story setup',
            type: 'string',
            group: 'story',
            fieldset: 'identity',
            description:
              'Service category (where on the site) and page format (how it renders). One create template for all stories.',
            options: {
                list: getCaseStudyCategoryStudioList(),
            },
            components: {
                input: CaseStudySetupInput,
            },
            validation: (Rule) =>
                Rule.custom((value, context) => {
                    const doc = context.document as CaseStudyLegacyDoc | undefined
                    const status = (doc as { status?: string } | undefined)?.status
                    if (status === 'archived') return true
                    if (value && isCaseStudyCategory(value)) return true
                    if (effectiveCaseStudyCategory(doc)) return true
                    return 'Pick a service category so this story appears on the correct category page'
                }),
        }),
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            group: 'story',
            fieldset: 'identity',
            validation: (Rule) => Rule.required().min(10).max(120),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            group: 'story',
            fieldset: 'identity',
            options: { source: 'title', maxLength: 96, ...aiAssistExclude },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'excerpt',
            title: 'Excerpt',
            type: 'text',
            rows: 3,
            group: 'story',
            fieldset: 'narrative',
            description: fieldAi.excerpt.description,
            validation: (Rule) => Rule.max(300),
        }),
        defineField({
            name: 'challengeContent',
            title: 'The Challenge',
            type: 'storyBlockContent',
            group: 'story',
            fieldset: 'narrative',
            description: fieldAi.challengeContent.description,
            validation: (Rule) => Rule.required().error('Challenge narrative is required.'),
        }),
        defineField({
            name: 'approachContent',
            title: 'Our Approach',
            type: 'storyBlockContent',
            group: 'story',
            fieldset: 'narrative',
            description: fieldAi.approachContent.description,
            validation: (Rule) => Rule.required().error('Approach narrative is required.'),
        }),
        defineField({
            name: 'outcomeContent',
            title: 'The Outcome',
            type: 'storyBlockContent',
            group: 'story',
            fieldset: 'narrative',
            description: fieldAi.outcomeContent.description,
            validation: (Rule) => Rule.required().error('Outcome narrative is required.'),
        }),
        defineField({
            name: 'body',
            title: 'Additional sections (optional)',
            type: 'blockContent',
            group: 'story',
            fieldset: 'narrative',
            description:
                'Optional extra content appended after Challenge / Approach / Outcome — e.g. “What’s next”. Leave empty if the three sections above are enough.',
        }),

        defineField({
            name: 'highlights',
            title: 'Hero Highlights (max 3)',
            description:
                'Stat row shown in the hero next to the image. e.g. value: "75-80%" / label: "CSAT". Use exactly 3 for best layout.',
            type: 'array',
            group: 'sections',
            fieldset: 'stats',
            validation: (Rule) => Rule.max(3),
            of: [
                defineArrayMember({
                    type: 'object',
                    name: 'highlight',
                    fields: [
                        defineField({
                            name: 'value',
                            title: 'Value',
                            type: 'string',
                            description: 'e.g. 75-80% or 100% or 35x',
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: 'label',
                            title: 'Label',
                            type: 'string',
                            description: 'e.g. CSAT, products supported, deflection rate',
                            validation: (Rule) => Rule.required(),
                        }),
                    ],
                    preview: { select: { title: 'value', subtitle: 'label' } },
                }),
            ],
        }),
        defineField({
            name: 'pullQuoteImage',
            title: 'Pull-Quote / Highlight Image',
            description: 'Optional inline highlight image rendered between body sections.',
            type: 'image',
            group: 'media',
            fieldset: 'heroMedia',
            options: { hotspot: true },
            fields: [
                defineField({ name: 'alt', type: 'string', title: 'Alt Text' }),
                defineField({ name: 'caption', type: 'string', title: 'Caption' }),
            ],
        }),
        defineField({
            ...visibilityField,
            group: 'publish',
            fieldset: 'statusSet',
        }),
        defineField({
            name: 'status',
            title: 'Status (legacy)',
            type: 'string',
            group: 'publish',
            fieldset: 'statusSet',
            hidden: true,
            readOnly: true,
            description: 'Synced from Website visibility on publish. Prefer the visibility field.',
            options: {
                list: [
                    { title: 'Published', value: 'published' },
                    { title: 'Draft', value: 'draft' },
                    { title: 'Archived', value: 'archived' },
                ],
                layout: 'radio',
                ...aiAssistExclude,
            },
            initialValue: 'published',
        }),
        defineField({
            ...reviewStatusField,
            group: 'publish',
            fieldset: 'statusSet',
        }),
        createEditorProgressPanelField('publish'),
        createContentScorePanelField('publish'),
        createFaqAeoPanelField('publish'),
        defineField({
            ...scheduledPublishAtField,
            group: 'publish',
            fieldset: 'statusSet',
        }),
        defineField({
            name: 'faqSchema',
            title: 'FAQ pairs',
            type: 'array',
            group: 'publish',
            fieldset: 'faqAeoSet',
            description:
              'Question-and-answer pairs for search and AI answers. Page tab FAQ sections also count.',
            of: [
                defineArrayMember({
                    type: 'object',
                    name: 'caseStudyFaqSchema',
                    fields: [
                        defineField({
                            name: 'question',
                            type: 'string',
                            title: 'Question',
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: 'answer',
                            type: 'text',
                            title: 'Answer',
                            rows: 3,
                            description: fieldAi.faqAnswer.description,
                            validation: (Rule) => Rule.required(),
                        }),
                    ],
                    preview: { select: { title: 'question' } },
                }),
            ],
        }),
        defineField({
            name: 'industry',
            title: 'Industry',
            type: 'string',
            group: 'story',
            fieldset: 'identity',
            description: 'E.g. Healthcare, Finance, Retail, Education',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'useCase',
            title: 'Use Case',
            type: 'string',
            group: 'client',
            fieldset: 'engagement',
            description: 'e.g., Process Automation, AI Agents, Customer Experience, Operations',
        }),
        defineField({
            name: 'companySize',
            title: 'Company Size',
            type: 'string',
            group: 'client',
            fieldset: 'engagement',
            options: {
                list: [
                    { title: 'Startup', value: 'startup' },
                    { title: 'Mid-market', value: 'mid-market' },
                    { title: 'Enterprise', value: 'enterprise' },
                ],
            },
        }),

        defineField({
            name: 'clientDetails',
            title: 'Client Details',
            type: 'text',
            rows: 4,
            group: 'client',
            fieldset: 'snapshot',
            description: 'Brief details about the client enterprise. If left empty, a default fallback text will be shown.',
        }),
        defineField({
            name: 'employees',
            title: 'Company Employees',
            type: 'string',
            group: 'client',
            fieldset: 'snapshot',
            description: 'Company headcount, e.g. "2,800" — shown in the case study summary block.',
        }),
        defineField({
            name: 'location',
            title: 'Location',
            type: 'string',
            group: 'client',
            fieldset: 'snapshot',
            description: 'Client location, e.g. "Chicago, Illinois, USA" — shown in case study grids.',
        }),
        defineField({
            name: 'region',
            title: 'Operation Region',
            type: 'string',
            group: 'client',
            fieldset: 'snapshot',
            description: 'Scale of operation region, e.g. "40+ Countries" or "Global" — shown in case study grids.',
        }),
        defineField({
            name: 'scaleOfOperation',
            title: 'Scale of Operation',
            type: 'text',
            rows: 2,
            group: 'client',
            fieldset: 'snapshot',
            description: 'Brief scale statement, e.g. "Used by over 12.8M professionals and 92 of the Fortune Global Top 100" — shown in the case study summary block.',
        }),
        defineField({
            name: 'projectDuration',
            title: 'Project Duration',
            type: 'string',
            group: 'client',
            fieldset: 'engagement',
            description: 'e.g. "12 weeks", "6 months"',
        }),
        defineField({
            name: 'teamSize',
            title: 'Team Size',
            type: 'string',
            group: 'client',
            fieldset: 'engagement',
            description: 'Engagement team size, e.g. "5 engineers + 1 designer" (kept separate from company-wide Employees).',
        }),
        defineField({
            name: 'mainImage',
            title: 'Cover Image',
            type: 'image',
            group: 'media',
            fieldset: 'heroMedia',
            validation: (Rule) => Rule.required().error('Cover Image is required.'),
            options: { 
                hotspot: true,
                aiAssist: {
                    imageInstructionField: 'heroImagePrompt',
                },
            },
            fields: [
                defineField({
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative text',
                    description:
                      'Required for accessibility and SEO — describe what’s in the image (e.g. "Acme Corp dashboard after Power Platform rollout").',
                    validation: (Rule) =>
                        Rule.custom((alt, context) => {
                            const image = context.parent as { asset?: { _ref?: string } } | undefined
                            if (!image?.asset?._ref) return true
                            return alt?.trim()
                                ? true
                                : 'Required when a cover image is uploaded'
                        }),
                }),
            ],
        }),
        defineField({
            name: 'heroImagePrompt',
            title: 'Hero Image AI Prompt',
            type: 'text',
            rows: 3,
            group: 'media',
            fieldset: 'heroMedia',
            description: 'Describe the hero image you want AI to generate. Leave empty to use the title and category as context.',
            hidden: ({document}) => !!(document as any)?.mainImage?.asset,
        }),
        defineField({
            name: 'mainImageUrl',
            title: 'Cover Image URL (external)',
            type: 'url',
            group: 'media',
            fieldset: 'heroMedia',
            description: 'Optional external cover image. If both upload and URL are set, the uploaded image takes precedence on the site.',
            validation: (Rule) =>
                Rule.custom((value, context) => {
                    const doc = context.document as { mainImage?: { asset?: { _ref?: string } } }
                    if (value && doc?.mainImage?.asset?._ref) {
                        return 'Remove either the uploaded cover image or the external URL — only one source is used (upload wins).'
                    }
                    return true
                }),
        }),
        defineField({
            name: 'clientLogo',
            title: 'Client Logo',
            type: 'image',
            group: 'media',
            fieldset: 'heroMedia',
            description: 'SVG or PNG logo of the client company',
            options: { hotspot: true },
        }),
        defineField({
            name: 'heroImage',
            title: 'Hero Image',
            type: 'image',
            group: 'media',
            fieldset: 'heroMedia',
            description: 'Product screenshot or branded visual (not stock photo)',
            options: { hotspot: true },
        }),
        defineField({
            name: 'accentColor',
            title: 'Accent Color',
            type: 'string',
            group: 'client',
            fieldset: 'engagement',
            description: 'Hex color for section accents and badges. Default: #FF7A2F for premium layouts.',
            initialValue: '#FF7A2F',
        }),
        defineField({
            name: 'storyType',
            title: 'Story Archetype (legacy)',
            type: 'string',
            group: 'story',
            fieldset: 'layout',
            description: 'Legacy layout selector. Premium Page Layout below takes precedence on the website.',
            hidden: ({document}) => Boolean(document?.detailLayout),
            options: {
                list: [
                    { title: 'Standard Story', value: 'standard' },
                    { title: 'Transformation Epic', value: 'transformation' },
                    { title: 'Product Showcase', value: 'product-showcase' },
                ],
                layout: 'radio',
            },
            initialValue: 'standard',
            validation: (Rule) =>
                Rule.custom((value, context) => {
                    const doc = context.document as { detailLayout?: string } | undefined
                    if (doc?.detailLayout) return true
                    return value ? true : 'Required when no premium page layout is set'
                }),
        }),
        defineField({
            name: 'heroLayout',
            title: 'Hero Layout (legacy)',
            type: 'string',
            group: 'story',
            fieldset: 'layout',
            description: 'Legacy hero arrangement — only used when Premium Page Layout is empty.',
            hidden: ({document}) => Boolean(document?.detailLayout),
            options: {
                list: [
                    { title: 'Centered Typographic', value: 'centered' },
                    { title: 'Split Screen', value: 'split' },
                    { title: 'Full-Bleed Image', value: 'full-bleed' },
                    { title: 'Magazine Editorial', value: 'editorial' },
                ],
                layout: 'radio',
            },
            initialValue: 'centered',
            validation: (Rule) =>
                Rule.custom((value, context) => {
                    const doc = context.document as { detailLayout?: string } | undefined
                    if (doc?.detailLayout) return true
                    return value ? true : 'Required when no premium page layout is set'
                }),
        }),
        defineField({
            name: 'detailLayout',
            title: 'Page layout',
            type: 'string',
            group: 'story',
            description: 'Managed in Story setup above. Hidden here to avoid duplicate pickers.',
            hidden: () => true,
        }),
        defineField({
            name: 'projectType',
            title: 'Project Type',
            type: 'string',
            group: 'client',
            fieldset: 'snapshot',
            description: 'Shown in the project snapshot bar, e.g. "Power Platform Modernization".',
        }),
        defineField({
            name: 'region',
            title: 'Region',
            type: 'string',
            group: 'client',
            fieldset: 'snapshot',
            description: 'Geographic scope, e.g. "North America & EMEA".',
        }),
        defineField({
            name: 'endUsers',
            title: 'End Users',
            type: 'string',
            group: 'client',
            fieldset: 'snapshot',
            description: 'User count for snapshot bar, e.g. "2,400+ plant users".',
        }),
        defineField({
            name: 'videoUrl',
            title: 'Hero Video URL',
            type: 'url',
            group: 'media',
            fieldset: 'gallerySet',
            description: 'Optional background video for the Video Hero layout.',
        }),
        defineField({
            name: 'challengeCards',
            title: 'Challenge Highlight Cards (optional, max 3)',
            description:
                'Optional summary cards shown BESIDE the main "The Challenge" narrative (written in the Content tab). Leave empty to show the narrative alone — do not duplicate it here.',
            type: 'array',
            group: 'sections',
            hidden: ({ document }) => document?.storyType === 'product-showcase',
            fieldset: 'cards',
            validation: (Rule) => Rule.max(3),
            of: [defineArrayMember({ type: 'object', name: 'challengeCard', fields: cardItemFields })],
        }),
        defineField({
            name: 'solutionArchitecture',
            title: 'Solution Architecture Nodes',
            type: 'array',
            group: 'sections',
            hidden: ({ document }) => document?.storyType !== 'product-showcase',
            fieldset: 'cards',
            validation: (Rule) => Rule.max(6),
            of: [defineArrayMember({ type: 'object', name: 'solutionNode', fields: cardItemFields })],
        }),
        defineField({
            name: 'deliverables',
            title: 'Deliverables',
            type: 'array',
            group: 'sections',
            hidden: ({ document }) => document?.storyType === 'product-showcase',
            fieldset: 'cards',
            validation: (Rule) => Rule.max(6),
            of: [defineArrayMember({ type: 'object', name: 'deliverable', fields: cardItemFields })],
        }),
        defineField({
            name: 'myRole',
            title: 'My Role',
            type: 'string',
            group: 'client',
            fieldset: 'engagement',
            description: 'Shown in the overview bar, e.g. "Lead Product Designer & Developer".',
        }),
        defineField({
            name: 'servicesProvided',
            title: 'Services Provided',
            type: 'string',
            group: 'client',
            fieldset: 'engagement',
            description: 'Comma-separated services for hero metadata, e.g. "Product Design, Web Development".',
        }),
        defineField({
            name: 'solutionSummary',
            title: 'Solution Summary',
            type: 'text',
            rows: 3,
            group: 'sections',
            hidden: ({ document }) => document?.storyType !== 'product-showcase',
            fieldset: 'cards',
            description: 'Paragraph for The Solution section.',
        }),
        defineField({
            name: 'solutionFeatures',
            title: 'Solution Features (checklist)',
            type: 'array',
            group: 'sections',
            hidden: ({ document }) => document?.storyType !== 'product-showcase',
            fieldset: 'cards',
            of: [{ type: 'string' }],
            validation: (Rule) => Rule.max(8),
            description: 'Checklist items for The Solution section.',
        }),
        defineField({
            name: 'approachSteps',
            title: 'Approach Steps (timeline)',
            type: 'array',
            group: 'sections',
            hidden: ({ document }) => document?.storyType !== 'transformation',
            fieldset: 'cards',
            validation: (Rule) => Rule.max(5),
            of: [
                defineArrayMember({
                    type: 'object',
                    name: 'approachStep',
                    fields: [
                        defineField({ name: 'title', type: 'string', title: 'Title', validation: (Rule) => Rule.required() }),
                        defineField({ name: 'description', type: 'text', title: 'Description', rows: 2 }),
                    ],
                    preview: { select: { title: 'title', subtitle: 'description' } },
                }),
            ],
            description: 'Five timeline steps (Discovery → Launch).',
        }),
        defineField({
            name: 'beforeAfter',
            title: 'Before / After Rows',
            type: 'array',
            group: 'sections',
            hidden: ({ document }) => document?.storyType !== 'transformation',
            fieldset: 'stats',
            of: [defineArrayMember({ type: 'object', name: 'beforeAfterRow', fields: beforeAfterFields })],
        }),
        defineField({
            name: 'ctaHeadline',
            title: 'Final CTA Headline',
            type: 'string',
            group: 'sections',
            fieldset: 'ctaSet',
        }),
        defineField({
            name: 'ctaSubtext',
            title: 'Final CTA Subtext',
            type: 'text',
            rows: 2,
            group: 'sections',
            fieldset: 'ctaSet',
        }),
        defineField({
            name: 'ctaButtonText',
            title: 'Final CTA Button Text',
            type: 'string',
            group: 'sections',
            fieldset: 'ctaSet',
        }),
        defineField({
            name: 'faqs',
            title: 'FAQs',
            type: 'array',
            group: 'sections',
            fieldset: 'faqSet',
            description: 'Optional FAQs shown before the contact section.',
            of: [
                defineArrayMember({
                    type: 'object',
                    name: 'caseStudyFaq',
                    fields: [
                        defineField({ name: 'question', type: 'string', title: 'Question', validation: (Rule) => Rule.required() }),
                        defineField({ name: 'answer', type: 'text', title: 'Answer', rows: 3, validation: (Rule) => Rule.required() }),
                    ],
                    preview: { select: { title: 'question' } },
                }),
            ],
        }),
        defineField({
            name: 'heroHeadline',
            title: 'Hero Headline',
            type: 'string',
            group: 'publish',
            fieldset: 'listingSet',
            description: 'Short punchy headline for the listing page hero slider.',
        }),
        defineField({
            name: 'heroEyebrow',
            title: 'Hero Eyebrow',
            type: 'string',
            group: 'publish',
            fieldset: 'listingSet',
            description: 'Eyebrow label for the hero slider, e.g. "Customer Story — Retail".',
        }),
        defineField({
            name: 'featured',
            title: 'Featured (Legacy)',
            type: 'boolean',
            group: 'publish',
            description: 'Show in featured case study lists',
            initialValue: false,
            options: aiAssistExclude,
            hidden: true,
        }),
        defineField({
            name: 'featuredRank',
            title: 'Featured Rank',
            type: 'number',
            group: 'publish',
            fieldset: 'listingSet',
            description: '0 = not featured. 1 = hero banner, 2-3 = secondary featured.',
            initialValue: 0,
        }),
        defineField({
            name: 'relatedSlugs',
            title: 'Related Case Study Slugs',
            type: 'array',
            group: 'publish',
            fieldset: 'listingSet',
            description: 'Slugs of related stories to cross-link at bottom of page',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'keyResults',
            title: 'Listing Card Stats (max 3)',
            description:
                'Stat chips shown on the /case-studies LISTING page cards — not on the detail page. For the on-page "Results & Business Impact" section, use Key Metrics below.',
            type: 'array',
            group: 'sections',
            fieldset: 'stats',
            of: [defineArrayMember({
                type: 'object',
                fields: [
                    defineField({ name: 'value', type: 'string', title: 'Value', description: 'e.g., 50% or $2M' }),
                    defineField({ name: 'label', type: 'string', title: 'Label', description: 'e.g., faster booking or cost saved' }),
                    defineField({ name: 'description', type: 'string', title: 'Short Description' }),
                ],
            })],
            validation: (Rule) => Rule.max(3),
        }),
        defineField({
            name: 'technologies',
            title: 'Technologies Used',
            type: 'array',
            components: {
                input: BulkTagsInput,
            },
            of: [{ type: 'string' }],
            group: 'client',
            fieldset: 'engagement',
            options: { layout: 'tags' },
        }),
        defineField({
            name: 'publishedAt',
            title: 'Published At',
            type: 'datetime',
            group: 'publish',
            fieldset: 'statusSet',
            description: 'Displayed on the site when status is Published. Future dates are stored for editorial planning; automatic hide-until scheduling is not yet enabled on the site.',
        }),

        // Legacy story fields — kept for existing content, hidden from editors.
        defineField({
            name: 'challengeSummary',
            title: 'Challenge Summary (legacy)',
            type: 'text',
            rows: 4,
            hidden: () => true,
        }),
        defineField({
            name: 'challenge',
            title: 'The Challenge (legacy)',
            type: 'blockContent',
            hidden: () => true,
        }),
        defineField({
            name: 'approachSummary',
            title: 'Approach Summary (legacy)',
            type: 'text',
            rows: 4,
            hidden: () => true,
        }),
        defineField({
            name: 'approach',
            title: 'Our Approach (legacy)',
            type: 'blockContent',
            hidden: () => true,
        }),
        defineField({
            name: 'outcomeSummary',
            title: 'Outcome Summary (legacy)',
            type: 'text',
            rows: 4,
            hidden: () => true,
        }),
        defineField({
            name: 'outcome',
            title: 'The Outcome (legacy)',
            type: 'blockContent',
            hidden: () => true,
        }),

        // ───── METRICS & TESTIMONIAL ─────
        defineField({
            name: 'metrics',
            title: 'Key Metrics',
            type: 'array',
            group: 'sections',
            fieldset: 'stats',
            description:
                'Outcome metrics shown in the "Results & Business Impact" section of the case study page (e.g. "Revenue lift: 34%"). Also used as hero stats when Hero Highlights is empty.',
            of: [
                defineArrayMember({
                    type: 'object',
                    fields: [
                        defineField({ name: 'label', type: 'string', title: 'Label', validation: (Rule) => Rule.required() }),
                        defineField({ name: 'value', type: 'string', title: 'Value', validation: (Rule) => Rule.required() }),
                        defineField({ name: 'description', type: 'string', title: 'Description (optional)' }),
                    ],
                    preview: {
                        select: { title: 'label', subtitle: 'value' },
                    },
                }),
            ],
        }),
        defineField({
            name: 'testimonial',
            title: 'Client Testimonial',
            type: 'object',
            group: 'sections',
            fieldset: 'testimonialSet',
            fields: [
                defineField({ name: 'quote', type: 'text', title: 'Quote' }),
                defineField({ name: 'name', type: 'string', title: 'Person Name' }),
                defineField({ name: 'role', type: 'string', title: 'Role / Title' }),
                defineField({ name: 'company', type: 'string', title: 'Company' }),
                defineField({ name: 'location', type: 'string', title: 'Location' }),
                defineField({ name: 'avatar', type: 'image', title: 'Avatar' }),
            ],
        }),


        defineField({
            name: 'gallery',
            title: 'Gallery',
            type: 'array',
            group: 'media',
            fieldset: 'gallerySet',
            description: 'Additional screenshots / visuals for the case study',
            components: {
                input: BulkGalleryUploadInput,
            },
            validation: (Rule) => Rule.required().min(1).error('Gallery must contain at least one image.'),
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
        }),

        defineField({
            name: 'galleryUrls',
            title: 'Gallery (external URLs)',
            type: 'array',
            group: 'media',
            fieldset: 'gallerySet',
            description: 'Image URLs hosted externally (used as gallery fallback)',
            of: [
                defineArrayMember({
                    type: 'object',
                    fields: [
                        defineField({ name: 'url', type: 'url', title: 'Image URL', validation: (Rule) => Rule.required() }),
                defineField({ name: 'alt', type: 'string', title: 'Alt text', validation: (Rule) => Rule.required().warning('Alt text required') }),
                        defineField({ name: 'caption', type: 'string', title: 'Caption' }),
                    ],
                    preview: { select: { title: 'caption', subtitle: 'url' } },
                }),
            ],
        }),
        defineField({
            name: 'pdfUrl',
            title: 'Source PDF (download)',
            type: 'string',
            group: 'media',
            fieldset: 'gallerySet',
            description: 'Path or URL to the original PDF — used as download CTA',
        }),
        defineField({
            name: 'liveUrl',
            title: 'Live Project URL (optional)',
            type: 'url',
            group: 'media',
            fieldset: 'gallerySet',
        }),

        // ───── RELATED ─────
        defineField({
            name: 'relatedCaseStudies',
            title: 'Related Case Studies',
            type: 'array',
            group: 'publish',
            fieldset: 'listingSet',
            description: 'Up to 3 manually-curated related stories. If empty, the latest 3 other case studies are shown automatically.',
            validation: (Rule) => Rule.max(3),
            of: [
                defineArrayMember({
                    type: 'reference',
                    to: [{ type: 'caseStudy' }],
                }),
            ],
        }),

        // ───── SEO ─────
        defineField({
            name: 'ogImage',
            title: 'Open Graph Image',
            type: 'image',
            group: 'media',
            fieldset: 'seoSet',
            description: 'Social sharing image (1200×630 recommended). Falls back to cover image if empty.',
            options: { hotspot: true },
        }),
        defineField({
            name: 'metaTitle',
            title: 'Meta Title',
            type: 'string',
            group: 'publish',
            fieldset: 'seoSet',
            description: fieldAi.metaTitle.description,
            validation: (Rule) => Rule.max(60),
        }),
        defineField({
            name: 'metaDescription',
            title: 'Meta Description',
            type: 'text',
            rows: 2,
            group: 'publish',
            fieldset: 'seoSet',
            description: fieldAi.metaDescription.description,
            validation: (Rule) => Rule.max(160),
        }),
        createSeoPreviewPanelField('publish'),
    ],
    preview: {
        select: {
            title: 'title',
            client: 'client',
            industry: 'industry',
            category: 'category',
            media: 'mainImage',
        },
        prepare({ title, client, industry, category, media }) {
            const categoryLabel = category
                ? getCaseStudyCategoryStudioList().find((item) => item.value === category)?.title
                : undefined
            const parts = [client || 'No client', categoryLabel || industry || 'No category'].filter(Boolean)
            return {
                title,
                subtitle: parts.join(' · '),
                media,
            }
        },
    },
})
