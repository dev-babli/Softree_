import { defineType, defineArrayMember, defineField } from 'sanity'
import { ImageIcon } from '@sanity/icons'
import { blockContentInsertMenu } from '../lib/blockContentOptions'
import { calloutBlockType, ctaButtonBlockType, statHighlightBlockType } from './blockObjectTypes'

export { calloutBlockType, ctaButtonBlockType, statHighlightBlockType }

/**
 * Shared rich text schema used by blog posts and case studies.
 * Configured for a Word-like editing experience in Sanity Studio.
 */
export const blockContentType = defineType({
  title: 'Rich Text',
  name: 'blockContent',
  type: 'array',
  options: { ...blockContentInsertMenu },
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Paragraph', value: 'normal' },
        { title: 'Heading 2', value: 'h2' },
        { title: 'Heading 3', value: 'h3' },
        { title: 'Heading 4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [
        { title: 'Bullet list', value: 'bullet' },
        { title: 'Numbered list', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Bold', value: 'strong' },
          { title: 'Italic', value: 'em' },
          { title: 'Underline', value: 'underline' },
          { title: 'Code', value: 'code' },
          { title: 'Strike', value: 'strike-through' },
        ],
        annotations: [
          {
            title: 'Link',
            name: 'link',
            type: 'object',
            fields: [
              defineField({
                title: 'URL',
                name: 'href',
                type: 'url',
                validation: (Rule) =>
                  Rule.uri({
                    allowRelative: true,
                    scheme: ['http', 'https', 'mailto', 'tel'],
                  }),
              }),
              defineField({
                title: 'Open in new tab',
                name: 'blank',
                type: 'boolean',
                initialValue: false,
              }),
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      icon: ImageIcon,
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          validation: (Rule) => Rule.required().warning('Alt text improves accessibility and SEO'),
        }),
        defineField({
          name: 'caption',
          type: 'string',
          title: 'Caption',
        }),
      ],
    }),
    defineArrayMember({ type: 'callout' }),
    defineArrayMember({ type: 'ctaButton' }),
    defineArrayMember({ type: 'statHighlight' }),
  ],
})
