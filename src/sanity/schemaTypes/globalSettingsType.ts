import { CogIcon, SparklesIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

import {
  ACCENT_PRESET_OPTIONS,
  TYPOGRAPHY_PRESET_OPTIONS,
} from '../../lib/design-tokens'

export const globalSettingsType = defineType({
  name: 'globalSettings',
  title: 'Global Settings',
  type: 'document',
  icon: CogIcon,
  groups: [
    { name: 'general', title: 'General', default: true },
    { name: 'design', title: 'Design tokens' },
    { name: 'seo', title: 'SEO defaults' },
    { name: 'contact', title: 'Contact & social' },
  ],
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      group: 'general',
      initialValue: 'Softree Technology',
    }),
    defineField({
      name: 'siteUrl',
      title: 'Site URL',
      type: 'url',
      group: 'general',
      initialValue: 'https://www.softreetechnology.com',
    }),
    defineField({
      name: 'logo',
      title: 'Site Logo',
      type: 'image',
      group: 'general',
      options: { hotspot: true },
    }),
    defineField({
      name: 'designTokens',
      title: 'Composer design tokens',
      type: 'object',
      group: 'design',
      icon: SparklesIcon,
      description:
        'Brand-safe presets for case study and blog composer pages. Writers cannot set arbitrary colors. **Publish Global Settings** after changing — live site and preview read from this singleton. For AI copy tone, use **Site settings → AI brand voice**.',
      fields: [
        defineField({
          name: 'accentPreset',
          title: 'Accent color',
          type: 'string',
          options: {
            list: ACCENT_PRESET_OPTIONS.map((option) => ({
              title: option.title,
              value: option.value,
            })),
            layout: 'radio',
          },
          initialValue: 'softree-orange',
        }),
        defineField({
          name: 'typographyPreset',
          title: 'Heading scale',
          type: 'string',
          options: {
            list: TYPOGRAPHY_PRESET_OPTIONS.map((option) => ({
              title: option.title,
              value: option.value,
            })),
            layout: 'radio',
          },
          initialValue: 'editorial',
        }),
      ],
    }),
    defineField({
      name: 'defaultMetaTitle',
      title: 'Default Meta Title',
      type: 'string',
      group: 'seo',
      description: 'Fallback title for pages without custom SEO',
    }),
    defineField({
      name: 'defaultMetaDescription',
      title: 'Default Meta Description',
      type: 'text',
      group: 'seo',
      rows: 3,
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'object',
      group: 'contact',
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
      group: 'contact',
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
      group: 'general',
      fields: [
        { name: 'gtmId', type: 'string', title: 'Google Tag Manager ID' },
        { name: 'gaId', type: 'string', title: 'Google Analytics ID' },
        { name: 'posthogKey', type: 'string', title: 'PostHog Project Key' },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Global Settings' }
    },
  },
})
