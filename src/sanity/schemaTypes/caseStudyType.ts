import { defineField, defineType, defineArrayMember } from 'sanity'
import { CaseIcon } from '@sanity/icons'

export const caseStudyType = defineType({
    name: 'caseStudy',
    title: 'Case Study',
    type: 'document',
    icon: CaseIcon,
    groups: [
        { name: 'content', title: 'Content', default: true },
        { name: 'metrics', title: 'Metrics & Results' },
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
            validation: (Rule) => Rule.max(250),
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
                    validation: (Rule) => Rule.required(),
                }),
            ],
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
        defineField({
            name: 'body',
            title: 'Full Case Study Content',
            type: 'blockContent',
            group: 'content',
        }),
        // Metrics group
        defineField({
            name: 'metrics',
            title: 'Key Metrics',
            type: 'array',
            group: 'metrics',
            description: 'Outcome metrics displayed on the card (e.g. "Revenue lift: 34%")',
            of: [
                defineArrayMember({
                    type: 'object',
                    fields: [
                        defineField({ name: 'label', type: 'string', title: 'Label', validation: (Rule) => Rule.required() }),
                        defineField({ name: 'value', type: 'string', title: 'Value', validation: (Rule) => Rule.required() }),
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
            ],
        }),
        // SEO group
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
