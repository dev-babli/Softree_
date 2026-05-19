import { defineType, defineField } from 'sanity'

export const globalSettings = defineType({
  name: 'globalSettings',
  title: 'Global Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      initialValue: 'Softree Technology',
    }),
    defineField({
      name: 'siteUrl',
      title: 'Site URL',
      type: 'url',
      initialValue: 'https://www.softreetechnology.com',
    }),
    defineField({
      name: 'logo',
      title: 'Site Logo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'defaultMetaTitle',
      title: 'Default Meta Title',
      type: 'string',
      description: 'Fallback title for pages without custom SEO',
    }),
    defineField({
      name: 'defaultMetaDescription',
      title: 'Default Meta Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        { name: 'linkedin', type: 'url', title: 'LinkedIn' },
        { name: 'twitter', type: 'url', title: 'Twitter/X' },
        { name: 'github', type: 'url', title: 'GitHub' },
        { name: 'clutch', type: 'url', title: 'Clutch' },
      ],
    }),
    defineField({
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      fields: [
        { name: 'email', type: 'string', title: 'Email' },
        { name: 'phone', type: 'string', title: 'Phone' },
        { name: 'address', type: 'text', title: 'Address', rows: 3 },
      ],
    }),
    defineField({
      name: 'analytics',
      title: 'Analytics IDs',
      type: 'object',
      fields: [
        { name: 'gtmId', type: 'string', title: 'Google Tag Manager ID' },
        { name: 'gaId', type: 'string', title: 'Google Analytics ID' },
        { name: 'posthogKey', type: 'string', title: 'PostHog Project Key' },
      ],
    }),
  ],
})
