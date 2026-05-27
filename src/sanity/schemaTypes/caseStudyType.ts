import { defineField, defineType, defineArrayMember } from 'sanity'
import { CaseIcon } from '@sanity/icons'

export const caseStudyType = defineType({
    name: 'caseStudy',
    title: 'Case Study',
    type: 'document',
    icon: CaseIcon,
    groups: [
        { name: 'content', title: 'Content', default: true },
        { name: 'story', title: 'Story (Challenge / Approach / Outcome)' },
        { name: 'metrics', title: 'Metrics & Testimonials' },
        { name: 'media', title: 'Gallery & Assets' },
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
            description: 'Client name (or anonymized label like "Fortune 500 Retailer")',
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
            description: 'e.g. "5 engineers + 1 designer"',
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
