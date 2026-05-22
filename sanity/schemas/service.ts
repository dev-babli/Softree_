import { defineType, defineField } from 'sanity'

export const service = defineType({
  name: 'service',
  title: 'Services',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content' },
    { name: 'seo', title: 'SEO & Metadata' },
    { name: 'visuals', title: 'Visuals & Media' },
    { name: 'settings', title: 'Settings' },
  ],
  fields: [
    // Basic Info
    defineField({
      name: 'title',
      title: 'Service Title',
      type: 'string',
      validation: (Rule) => Rule.required().min(3).max(100),
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      group: 'settings',
    }),
    defineField({
      name: 'serviceCategory',
      title: 'Service Category',
      type: 'string',
      options: {
        list: [
          { title: 'AI Intelligence', value: 'ai-intelligence' },
          { title: 'Business Applications', value: 'business-applications' },
          { title: 'Data Analytics', value: 'data-analytics' },
          { title: 'Digital Workspace', value: 'digital-workspace' },
          { title: 'Offshore Development', value: 'offshore' },
        ],
      },
      validation: (Rule) => Rule.required(),
      group: 'settings',
    }),
    defineField({
      name: 'subCategory',
      title: 'Sub-Category',
      type: 'string',
      description: 'E.g., agentic-ai, power-platform, sharepoint',
      group: 'settings',
    }),
    
    // Hero Section
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required().max(200),
      group: 'content',
    }),
    defineField({
      name: 'heroSubheadline',
      title: 'Hero Subheadline',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(300),
      group: 'content',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Important for SEO and accessibility',
        },
      ],
      group: 'visuals',
    }),
    
    // Content Sections
    defineField({
      name: 'overview',
      title: 'Service Overview',
      type: 'array',
      of: [{ type: 'block' }],
      group: 'content',
    }),
    defineField({
      name: 'features',
      title: 'Key Features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Feature Title', validation: (Rule) => Rule.required() },
            { name: 'description', type: 'text', title: 'Description', rows: 3 },
            { name: 'icon', type: 'string', title: 'Icon Name (Lucide)' },
          ],
        },
      ],
      group: 'content',
    }),
    defineField({
      name: 'benefits',
      title: 'Benefits',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Benefit Title' },
            { name: 'description', type: 'text', title: 'Description', rows: 2 },
          ],
        },
      ],
      group: 'content',
    }),
    
    // FAQs
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'faq' }],
        },
      ],
      group: 'content',
    }),
    
    // SEO Fields
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Recommended: 50-60 characters',
      validation: (Rule) => Rule.max(60),
      group: 'seo',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 2,
      description: 'Recommended: 150-160 characters',
      validation: (Rule) => Rule.max(160),
      group: 'seo',
    }),
    defineField({
      name: 'keywords',
      title: 'SEO Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      group: 'seo',
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      group: 'seo',
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      description: '1200x630px recommended for social sharing',
      options: {
        hotspot: true,
      },
      group: 'seo',
    }),
    
    // Settings
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first in listings',
      initialValue: 0,
      group: 'settings',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Service',
      type: 'boolean',
      description: 'Show this service in featured sections',
      initialValue: false,
      group: 'settings',
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Inactive services won\'t be published',
      initialValue: true,
      group: 'settings',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      group: 'settings',
    }),
  ],
  
  preview: {
    select: {
      title: 'title',
      subtitle: 'serviceCategory',
      media: 'heroImage',
      isActive: 'isActive',
    },
    prepare({ title, subtitle, media, isActive }) {
      return {
        title: `${title} ${isActive ? '' : '[Draft]' }`,
        subtitle: subtitle?.replace(/-/g, ' ').toUpperCase(),
        media,
      }
    },
  },
  
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Published Date, Newest',
      name: 'publishedDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
})
