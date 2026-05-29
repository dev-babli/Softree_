import { defineField, defineType, defineArrayMember } from 'sanity'
import { CaseIcon } from '@sanity/icons'

export const caseStudyType = defineType({
    name: 'caseStudy',
    title: 'Case Study',
    type: 'document',
    icon: CaseIcon,
    groups: [
        { name: 'content', title: 'Content', default: true },
        { name: 'header', title: 'Header & Hero' },
        { name: 'story', title: 'Story (Challenge / Approach / Outcome)' },
        { name: 'metrics', title: 'Metrics & Testimonials' },
        { name: 'media', title: 'Gallery & Assets' },
        { name: 'related', title: 'Related Stories' },
        { name: 'seo', title: 'SEO' },
    ],
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            group: 'content',
            validation: (Rule) => Rule.required().min(10).max(120),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            group: 'content',
            options: { source: 'title', maxLength: 96 },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'excerpt',
            title: 'Excerpt',
            type: 'text',
            rows: 3,
            group: 'content',
            description: 'Short summary shown in case study listings (120–200 chars)',
            validation: (Rule) => Rule.max(300),
        }),
        defineField({
            name: 'headerTitle',
            title: 'Header Title (long form)',
            type: 'string',
            group: 'header',
            description:
                'The descriptive title shown next to the hero image. e.g. "JetBrains Centralizes Developer Support at Scale With Rasa". The "Client Name" field is used as the giant H1 above this.',
            validation: (Rule) => Rule.max(180),
        }),
        defineField({
            name: 'highlights',
            title: 'Hero Highlights (max 3)',
            description:
                'Stat row shown in the hero next to the image. e.g. value: "75-80%" / label: "CSAT". Use exactly 3 for best layout.',
            type: 'array',
            group: 'header',
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
            group: 'header',
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
            group: 'content',
            description: 'Set to Archived to hide this case study from the website while keeping it in Sanity.',
            options: {
                list: [
                    { title: 'Published', value: 'published' },
                    { title: 'Archived', value: 'archived' },
                ],
                layout: 'radio',
            },
            initialValue: 'published',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
            group: 'content',
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
            group: 'content',
            description: 'E.g. Healthcare, Finance, Retail, Education',
        }),
        defineField({
            name: 'client',
            title: 'Client Name',
            type: 'string',
            group: 'content',
            description: 'Client name (or anonymized label like "Fortune 500 Retailer"). Shown as the large H1 on the detail page hero.',
        }),
        defineField({
            name: 'location',
            title: 'Client Location',
            type: 'string',
            group: 'content',
            description: 'e.g. "Amsterdam, The Netherlands" — shown in the case study summary block.',
        }),
        defineField({
            name: 'employees',
            title: 'Company Employees',
            type: 'string',
            group: 'content',
            description: 'Company headcount, e.g. "2,800" — shown in the case study summary block.',
        }),
        defineField({
            name: 'scaleOfOperation',
            title: 'Scale of Operation',
            type: 'text',
            rows: 2,
            group: 'content',
            description: 'Brief scale statement, e.g. "Used by over 12.8M professionals and 92 of the Fortune Global Top 100" — shown in the case study summary block.',
        }),
        defineField({
            name: 'projectDuration',
            title: 'Project Duration',
            type: 'string',
            group: 'content',
            description: 'e.g. "12 weeks", "6 months"',
        }),
        defineField({
            name: 'teamSize',
            title: 'Team Size',
            type: 'string',
            group: 'content',
            description: 'Engagement team size, e.g. "5 engineers + 1 designer" (kept separate from company-wide Employees).',
        }),
        defineField({
            name: 'mainImage',
            title: 'Cover Image',
            type: 'image',
            group: 'content',
            options: { hotspot: true },
            fields: [
                defineField({
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative text',
                }),
            ],
        }),
        defineField({
            name: 'mainImageUrl',
            title: 'Cover Image URL (external)',
            type: 'url',
            group: 'content',
            description: 'Use this if cover image is hosted externally (CDN). Falls back to mainImage if empty.',
        }),
        defineField({
            name: 'accentColor',
            title: 'Accent Color',
            type: 'string',
            group: 'content',
            description: 'Hex color for section accents and badges. Default: #1852FF',
            initialValue: '#1852FF',
        }),
        defineField({
            name: 'featured',
            title: 'Featured',
            type: 'boolean',
            group: 'content',
            description: 'Show in featured case study lists',
            initialValue: false,
        }),
        defineField({
            name: 'technologies',
            title: 'Technologies Used',
            type: 'array',
            of: [{ type: 'string' }],
            group: 'content',
            options: { layout: 'tags' },
        }),
        defineField({
            name: 'publishedAt',
            title: 'Published At',
            type: 'datetime',
            group: 'content',
        }),

        // ───── STORY (Challenge / Approach / Outcome) ─────
        defineField({
            name: 'challengeSummary',
            title: 'Challenge Summary',
            type: 'text',
            rows: 4,
            group: 'story',
            description: 'One paragraph framing the problem. Renders as the lead in the Challenge section.',
        }),
        defineField({
            name: 'challenge',
            title: 'The Challenge',
            type: 'blockContent',
            group: 'story',
            description: 'Detailed challenge description (rich text)',
        }),
        defineField({
            name: 'approachSummary',
            title: 'Approach Summary',
            type: 'text',
            rows: 4,
            group: 'story',
        }),
        defineField({
            name: 'approach',
            title: 'Our Approach',
            type: 'blockContent',
            group: 'story',
            description: 'How we solved the problem (rich text)',
        }),
        defineField({
            name: 'outcomeSummary',
            title: 'Outcome Summary',
            type: 'text',
            rows: 4,
            group: 'story',
        }),
        defineField({
            name: 'outcome',
            title: 'The Outcome',
            type: 'blockContent',
            group: 'story',
            description: 'Results and impact (rich text)',
        }),
        defineField({
            name: 'body',
            title: 'Additional Content',
            type: 'blockContent',
            group: 'story',
            description: 'Optional extended content rendered below outcome',
        }),

        // ───── METRICS & TESTIMONIAL ─────
        defineField({
            name: 'metrics',
            title: 'Key Metrics',
            type: 'array',
            group: 'metrics',
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
            group: 'metrics',
            fields: [
                defineField({ name: 'quote', type: 'text', title: 'Quote' }),
                defineField({ name: 'name', type: 'string', title: 'Person Name' }),
                defineField({ name: 'role', type: 'string', title: 'Role / Company' }),
                defineField({ name: 'avatar', type: 'image', title: 'Avatar' }),
            ],
        }),

        // ───── MEDIA / GALLERY ─────
        defineField({
            name: 'gallery',
            title: 'Gallery',
            type: 'array',
            group: 'media',
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
            group: 'media',
            description: 'Image URLs hosted externally (used as gallery fallback)',
            of: [
                defineArrayMember({
                    type: 'object',
                    fields: [
                        defineField({ name: 'url', type: 'url', title: 'Image URL', validation: (Rule) => Rule.required() }),
                        defineField({ name: 'alt', type: 'string', title: 'Alt text' }),
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
            description: 'Path or URL to the original PDF — used as download CTA',
        }),
        defineField({
            name: 'liveUrl',
            title: 'Live Project URL (optional)',
            type: 'url',
            group: 'media',
        }),

        // ───── RELATED ─────
        defineField({
            name: 'relatedCaseStudies',
            title: 'Related Case Studies',
            type: 'array',
            group: 'related',
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
            name: 'metaTitle',
            title: 'Meta Title',
            type: 'string',
            group: 'seo',
            validation: (Rule) => Rule.max(60),
        }),
        defineField({
            name: 'metaDescription',
            title: 'Meta Description',
            type: 'text',
            rows: 2,
            group: 'seo',
            validation: (Rule) => Rule.max(160),
        }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'category',
            media: 'mainImage',
        },
    },
})
