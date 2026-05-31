import { defineField, defineType, defineArrayMember } from 'sanity'
import { CaseIcon } from '@sanity/icons'
import { aiAssistExclude } from '../lib/blockContentOptions'
import { fieldAi } from '../lib/fieldAiOptions'
import { createSeoPreviewPanelField } from '../lib/documentHelpers'
import { reviewStatusField } from '../lib/reviewStatusField'
import { CASE_STUDY_LAYOUTS } from '../../lib/case-study-layouts'
import DetailLayoutInput from '../components/DetailLayoutInput'
import LayoutReadinessPanel from '../components/LayoutReadinessPanel'

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
        { name: 'proof', title: 'Proof & media' },
        { name: 'publish', title: 'Publish & SEO' },
    ],
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            group: 'story',
            validation: (Rule) => Rule.required().min(10).max(120),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            group: 'publish',
            options: { source: 'title', maxLength: 96, ...aiAssistExclude },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'excerpt',
            title: 'Excerpt',
            type: 'text',
            rows: 3,
            group: 'story',
            description: fieldAi.excerpt.description,
            validation: (Rule) => Rule.max(300),
        }),
        defineField({
            name: 'challengeContent',
            title: 'The Challenge',
            type: 'storyBlockContent',
            group: 'story',
            description: fieldAi.challengeContent.description,
        }),
        defineField({
            name: 'approachContent',
            title: 'Our Approach',
            type: 'storyBlockContent',
            group: 'story',
            description: fieldAi.approachContent.description,
        }),
        defineField({
            name: 'outcomeContent',
            title: 'The Outcome',
            type: 'storyBlockContent',
            group: 'story',
            description: fieldAi.outcomeContent.description,
        }),
        defineField({
            name: 'body',
            title: 'Additional sections (optional)',
            type: 'blockContent',
            group: 'story',
            description:
                'Optional extra content appended after Challenge / Approach / Outcome — e.g. “What’s next”. Leave empty if the three sections above are enough.',
        }),
        defineField({
            name: 'headerTitle',
            title: 'Header Title (long form)',
            type: 'string',
            group: 'publish',
            description:
                'The descriptive title shown next to the hero image. e.g. "JetBrains Centralizes Developer Support at Scale With Rasa". The "Client Name" field is used as the giant H1 above this.',
            validation: (Rule) => Rule.required().min(10).max(180),
        }),
        defineField({
            name: 'highlights',
            title: 'Hero Highlights (max 3)',
            description:
                'Stat row shown in the hero next to the image. e.g. value: "75-80%" / label: "CSAT". Use exactly 3 for best layout.',
            type: 'array',
            group: 'proof',
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
            group: 'proof',
            options: { hotspot: true },
            fields: [
                defineField({ name: 'alt', type: 'string', title: 'Alt Text' }),
                defineField({ name: 'caption', type: 'string', title: 'Caption' }),
            ],
        }),
        defineField({
            name: 'status',
            title: 'Status',
            type: 'string',
            group: 'publish',
            description: 'Set to Archived to hide this case study from the website while keeping it in Sanity.',
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
            validation: (Rule) => Rule.required(),
        }),
        {...reviewStatusField, group: 'publish'},
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
            group: 'story',
            options: {
                list: [
                    { title: 'AI & Machine Learning', value: 'ai' },
                    { title: 'Power Platform', value: 'power-platform' },
                    { title: 'SharePoint', value: 'sharepoint' },
                    { title: 'Web Development', value: 'web' },
                    { title: 'Mobile Development', value: 'mobile' },
                    { title: 'Data Analytics', value: 'data-analytics' },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'industry',
            title: 'Industry',
            type: 'string',
            group: 'story',
            description: 'E.g. Healthcare, Finance, Retail, Education',
        }),
        defineField({
            name: 'client',
            title: 'Client Name',
            type: 'string',
            group: 'story',
            description: 'Client name (or anonymized label like "Fortune 500 Retailer"). Shown as the large H1 on the detail page hero.',
            validation: (Rule) => Rule.required().min(2),
        }),
        defineField({
            name: 'location',
            title: 'Client Location',
            type: 'string',
            group: 'story',
            description: 'e.g. "Amsterdam, The Netherlands" — shown in the case study summary block.',
        }),
        defineField({
            name: 'employees',
            title: 'Company Employees',
            type: 'string',
            group: 'story',
            description: 'Company headcount, e.g. "2,800" — shown in the case study summary block.',
        }),
        defineField({
            name: 'scaleOfOperation',
            title: 'Scale of Operation',
            type: 'text',
            rows: 2,
            group: 'story',
            description: 'Brief scale statement, e.g. "Used by over 12.8M professionals and 92 of the Fortune Global Top 100" — shown in the case study summary block.',
        }),
        defineField({
            name: 'projectDuration',
            title: 'Project Duration',
            type: 'string',
            group: 'story',
            description: 'e.g. "12 weeks", "6 months"',
        }),
        defineField({
            name: 'teamSize',
            title: 'Team Size',
            type: 'string',
            group: 'story',
            description: 'Engagement team size, e.g. "5 engineers + 1 designer" (kept separate from company-wide Employees).',
        }),
        defineField({
            name: 'mainImage',
            title: 'Cover Image',
            type: 'image',
            group: 'publish',
            options: { hotspot: true },
            fields: [
                defineField({
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative text',
                    validation: (Rule) => Rule.required().warning('Alt text is required for accessibility and SEO'),
                }),
            ],
            validation: (Rule) =>
                Rule.custom((value, context) => {
                    const parent = context.document as { mainImageUrl?: string }
                    if (parent?.mainImageUrl) return true
                    if (!value?.asset) return true
                    return (value as { alt?: string }).alt ? true : 'Add alt text to the cover image'
                }),
        }),
        defineField({
            name: 'mainImageUrl',
            title: 'Cover Image URL (external)',
            type: 'url',
            group: 'publish',
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
            name: 'accentColor',
            title: 'Accent Color',
            type: 'string',
            group: 'story',
            description: 'Hex color for section accents and badges. Default: #FF7A2F for premium layouts.',
            initialValue: '#FF7A2F',
        }),
        defineField({
            name: 'layoutReadinessPanel',
            title: 'Layout readiness',
            type: 'object',
            group: 'publish',
            components: {
                input: LayoutReadinessPanel,
            },
            fields: [
                defineField({
                    name: 'placeholder',
                    type: 'string',
                    hidden: true,
                }),
            ],
        }),
        defineField({
            name: 'detailLayout',
            title: 'Detail Page Layout',
            type: 'string',
            group: 'publish',
            description:
                'Choose a premium layout (light/dark Softree-native) or leave empty for the classic light layout. Use the visual picker to preview each option with draft content.',
            components: {
                input: DetailLayoutInput,
            },
            options: {
                list: CASE_STUDY_LAYOUTS.map((layout) => ({
                    title: layout.title,
                    value: layout.value,
                })),
                layout: 'dropdown',
            },
        }),
        defineField({
            name: 'projectType',
            title: 'Project Type',
            type: 'string',
            group: 'story',
            description: 'Shown in the project snapshot bar, e.g. "Power Platform Modernization".',
        }),
        defineField({
            name: 'region',
            title: 'Region',
            type: 'string',
            group: 'story',
            description: 'Geographic scope, e.g. "North America & EMEA".',
        }),
        defineField({
            name: 'endUsers',
            title: 'End Users',
            type: 'string',
            group: 'story',
            description: 'User count for snapshot bar, e.g. "2,400+ plant users".',
        }),
        defineField({
            name: 'videoUrl',
            title: 'Hero Video URL',
            type: 'url',
            group: 'proof',
            description: 'Optional background video for the Video Hero layout.',
        }),
        defineField({
            name: 'challengeCards',
            title: 'Challenge Cards (3)',
            type: 'array',
            group: 'story',
            validation: (Rule) => Rule.max(3),
            of: [defineArrayMember({ type: 'object', name: 'challengeCard', fields: cardItemFields })],
        }),
        defineField({
            name: 'solutionArchitecture',
            title: 'Solution Architecture Nodes',
            type: 'array',
            group: 'story',
            validation: (Rule) => Rule.max(6),
            of: [defineArrayMember({ type: 'object', name: 'solutionNode', fields: cardItemFields })],
        }),
        defineField({
            name: 'deliverables',
            title: 'Deliverables',
            type: 'array',
            group: 'story',
            validation: (Rule) => Rule.max(6),
            of: [defineArrayMember({ type: 'object', name: 'deliverable', fields: cardItemFields })],
        }),
        defineField({
            name: 'myRole',
            title: 'My Role',
            type: 'string',
            group: 'story',
            description: 'Shown in the Nexora overview bar, e.g. "Lead Product Designer & Developer".',
        }),
        defineField({
            name: 'servicesProvided',
            title: 'Services Provided',
            type: 'string',
            group: 'story',
            description: 'Comma-separated services for hero metadata, e.g. "Product Design, Web Development".',
        }),
        defineField({
            name: 'solutionSummary',
            title: 'Solution Summary',
            type: 'text',
            rows: 3,
            group: 'story',
            description: 'Paragraph for The Solution section on Nexora Product Story layout.',
        }),
        defineField({
            name: 'solutionFeatures',
            title: 'Solution Features (checklist)',
            type: 'array',
            group: 'story',
            of: [{ type: 'string' }],
            validation: (Rule) => Rule.max(8),
            description: 'Checklist items for The Solution section on Nexora Product Story layout.',
        }),
        defineField({
            name: 'approachSteps',
            title: 'Approach Steps (timeline)',
            type: 'array',
            group: 'story',
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
            description: 'Five timeline steps for Nexora Product Story layout (Discovery → Launch).',
        }),
        defineField({
            name: 'beforeAfter',
            title: 'Before / After Rows',
            type: 'array',
            group: 'proof',
            of: [defineArrayMember({ type: 'object', name: 'beforeAfterRow', fields: beforeAfterFields })],
        }),
        defineField({
            name: 'ctaHeadline',
            title: 'Final CTA Headline',
            type: 'string',
            group: 'publish',
        }),
        defineField({
            name: 'ctaSubtext',
            title: 'Final CTA Subtext',
            type: 'text',
            rows: 2,
            group: 'publish',
        }),
        defineField({
            name: 'ctaButtonText',
            title: 'Final CTA Button Text',
            type: 'string',
            group: 'publish',
        }),
        defineField({
            name: 'faqs',
            title: 'FAQs',
            type: 'array',
            group: 'publish',
            description: 'Optional FAQs shown before the contact section on premium layouts.',
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
            description: 'Short punchy headline for the listing page hero slider.',
        }),
        defineField({
            name: 'heroEyebrow',
            title: 'Hero Eyebrow',
            type: 'string',
            group: 'publish',
            description: 'Eyebrow label for the hero slider, e.g. "Customer Story — Retail".',
        }),
        defineField({
            name: 'featured',
            title: 'Featured',
            type: 'boolean',
            group: 'publish',
            description: 'Show in featured case study lists',
            initialValue: false,
            options: aiAssistExclude,
        }),
        defineField({
            name: 'technologies',
            title: 'Technologies Used',
            type: 'array',
            of: [{ type: 'string' }],
            group: 'story',
            options: { layout: 'tags' },
        }),
        defineField({
            name: 'publishedAt',
            title: 'Published At',
            type: 'datetime',
            group: 'story',
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
            group: 'proof',
            description: 'Outcome metrics displayed prominently (e.g. "Revenue lift: 34%")',
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
            group: 'proof',
            fields: [
                defineField({ name: 'quote', type: 'text', title: 'Quote' }),
                defineField({ name: 'name', type: 'string', title: 'Person Name' }),
                defineField({ name: 'role', type: 'string', title: 'Role / Title' }),
                defineField({ name: 'company', type: 'string', title: 'Company' }),
                defineField({ name: 'location', type: 'string', title: 'Location' }),
                defineField({ name: 'avatar', type: 'image', title: 'Avatar' }),
            ],
        }),

        // ───── MEDIA / GALLERY ─────
        defineField({
            name: 'gallery',
            title: 'Gallery',
            type: 'array',
            group: 'proof',
            description: 'Additional screenshots / visuals for the case study',
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
            group: 'proof',
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
            group: 'proof',
            description: 'Path or URL to the original PDF — used as download CTA',
        }),
        defineField({
            name: 'liveUrl',
            title: 'Live Project URL (optional)',
            type: 'url',
            group: 'proof',
        }),

        // ───── RELATED ─────
        defineField({
            name: 'relatedCaseStudies',
            title: 'Related Case Studies',
            type: 'array',
            group: 'publish',
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
            group: 'publish',
            description: 'Social sharing image (1200×630 recommended). Falls back to cover image if empty.',
            options: { hotspot: true },
        }),
        defineField({
            name: 'metaTitle',
            title: 'Meta Title',
            type: 'string',
            group: 'publish',
            description: fieldAi.metaTitle.description,
            validation: (Rule) => Rule.max(60),
        }),
        defineField({
            name: 'metaDescription',
            title: 'Meta Description',
            type: 'text',
            rows: 2,
            group: 'publish',
            description: fieldAi.metaDescription.description,
            validation: (Rule) => Rule.max(160),
        }),
        createSeoPreviewPanelField('publish'),
    ],
    validation: (Rule) =>
        Rule.custom((fields) => {
            if (!fields || fields.status === 'archived' || fields.status === 'draft') return true

            const missing: string[] = []
            if (!fields.title) missing.push('title')
            if (!(fields.slug as { current?: string } | undefined)?.current) missing.push('slug')
            if (!fields.excerpt) missing.push('excerpt')
            if (!fields.client) missing.push('client')
            if (!fields.headerTitle) missing.push('headerTitle')

            const body = fields.body as unknown[] | undefined
            const challengeContent = fields.challengeContent as unknown[] | undefined
            const approachContent = fields.approachContent as unknown[] | undefined
            const outcomeContent = fields.outcomeContent as unknown[] | undefined
            const hasStory =
                (body?.length ?? 0) > 0 ||
                (challengeContent?.length ?? 0) > 0 ||
                (approachContent?.length ?? 0) > 0 ||
                (outcomeContent?.length ?? 0) > 0
            if (!hasStory) missing.push('story (sections or content)')

            const mainImage = fields.mainImage as { asset?: { _ref?: string }; alt?: string } | undefined
            if (!mainImage?.asset?._ref && !fields.mainImageUrl) {
                missing.push('cover image')
            } else if (mainImage?.asset?._ref && !mainImage.alt) {
                missing.push('cover image alt text')
            }

            if (missing.length > 0) {
                return `Before publishing, add: ${missing.join(', ')}`
            }

            const layout = fields.detailLayout as string | undefined
            if (layout) {
                const layoutRules = [
                    layout === 'video-hero' && !fields.videoUrl && 'Hero Video URL for Video Hero layout',
                    layout === 'before-after-table' &&
                        !(fields.beforeAfter as unknown[] | undefined)?.length &&
                        'Before / After Rows for Before/After layout',
                ].filter(Boolean)
                if (layoutRules.length) return `For layout "${layout}", add: ${layoutRules.join('; ')}`
            }

            return true
        }),
    preview: {
        select: {
            title: 'title',
            subtitle: 'category',
            media: 'mainImage',
        },
    },
})
