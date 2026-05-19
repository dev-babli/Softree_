import {defineField, defineType} from 'sanity'

export const caseStudyType = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'client',
      title: 'Client Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'industry',
      title: 'Industry / Category',
      type: 'string',
    }),
    defineField({
      name: 'category',
      title: 'Tech Category',
      type: 'string',
      options: {
        list: [
          {title: 'AI & Machine Learning', value: 'ai'},
          {title: 'Web Development', value: 'web'},
          {title: 'Mobile Apps', value: 'mobile'},
          {title: 'Power Platform', value: 'power-platform'},
          {title: 'SharePoint', value: 'sharepoint'},
          {title: 'Cloud & DevOps', value: 'cloud'},
          {title: 'Other', value: 'other'},
        ],
      },
    }),
    defineField({
      name: 'date',
      title: 'Project Date',
      type: 'string',
      description: 'e.g., 2024 or Q1 2024',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'results',
      title: 'Key Results',
      type: 'array',
      of: [{type: 'string'}],
      validation: (rule) => rule.max(4),
    }),
    defineField({
      name: 'image',
      title: 'Featured Image (Upload)',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'imageUrl',
      title: 'Image URL (External)',
      type: 'url',
      description: 'Use this if image is hosted externally (e.g., on softreetechnology.com)',
    }),
    defineField({
      name: 'pdfUrl',
      title: 'Case Study PDF URL',
      type: 'url',
    }),
    defineField({
      name: 'challenge',
      title: 'Challenge',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'solution',
      title: 'Solution',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'result',
      title: 'Result',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'color',
      title: 'Card Color',
      type: 'string',
      options: {
        list: [
          {title: 'Orange (#FF5812)', value: '#FF5812'},
          {title: 'Blue (#1852FF)', value: '#1852FF'},
          {title: 'Green (#10B981)', value: '#10B981'},
          {title: 'Purple (#8B5CF6)', value: '#8B5CF6'},
          {title: 'Amber (#F59E0B)', value: '#F59E0B'},
          {title: 'Pink (#EC4899)', value: '#EC4899'},
        ],
      },
      initialValue: '#FF5812',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Case Study',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'body',
      title: 'Full Content',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      client: 'client',
      industry: 'industry',
      media: 'image',
    },
    prepare({title, client, industry, media}) {
      return {
        title,
        subtitle: `${client} - ${industry}`,
        media,
      }
    },
  },
})
