# Sanity CMS Setup Guide for Softree

## Overview
This guide covers setting up Sanity CMS for your Next.js application, focusing on blog content management with SEO/AEO/GEO optimization.

## Prerequisites
- Next.js 14+ with App Router (already installed)
- Node.js 18+ 
- Sanity account (you have one at https://www.sanity.io/@oWTqFmco0/studio)

## Phase 1: Install Sanity Dependencies

```bash
npm install next-sanity @sanity/image-url @portabletext/react
```

## Phase 2: Configure Sanity Client

Create `sanity/lib/client.ts`:

```typescript
import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: '1zmh4sfw', // Your project ID
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false, // Set to true for production
})

export const sanityClient = client
```

## Phase 3: Create Sanity Configuration

Create `sanity.config.ts`:

```typescript
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'

export default defineConfig({
  name: 'softree-studio',
  title: 'Softree Studio',
  projectId: '1zmh4sfw',
  dataset: 'production',
  
  plugins: [
    structureTool(),
    visionTool(),
  ],
  
  schema: {
    types: schemaTypes,
  },
})
```

## Phase 4: Create Schema Types

### 4.1 Author Schema
Create `sanity/schemas/author.ts`:

```typescript
import { defineType, defineField } from 'sanity'

export const author = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'avatar',
      title: 'Avatar',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
    }),
  ],
})
```

### 4.2 Category Schema
Create `sanity/schemas/category.ts`:

```typescript
import { defineType, defineField } from 'sanity'

export const category = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'color',
      title: 'Color',
      type: 'string',
      initialValue: '#3B82F6',
    }),
  ],
})
```

### 4.3 Blog Post Schema with SEO/AEO/GEO
Create `sanity/schemas/blogPost.ts`:

```typescript
import { defineType, defineField, defineArrayMember } from 'sanity'

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog Posts',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content' },
    { name: 'seo', title: 'SEO' },
    { name: 'settings', title: 'Settings' },
  ],
  fields: [
    // Content fields
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().min(10).max(100),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().min(50).max(200),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
      fields: [
        { name: 'alt', type: 'string', title: 'Alt Text', validation: (Rule) => Rule.required() },
        { name: 'caption', type: 'string', title: 'Caption' },
      ],
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', type: 'string', title: 'Alt Text' },
            { name: 'caption', type: 'string', title: 'Caption' },
          ],
        },
      ],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    
    // SEO/AEO/GEO fields
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      group: 'seo',
      validation: (Rule) => Rule.required().min(30).max(60),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 2,
      group: 'seo',
      validation: (Rule) => Rule.required().min(120).max(160),
    }),
    defineField({
      name: 'focusKeyword',
      title: 'Focus Keyword',
      type: 'string',
      group: 'seo',
      validation: (Rule) => Rule.required().min(3),
    }),
    defineField({
      name: 'secondaryKeywords',
      title: 'Secondary Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'seo',
      validation: (Rule) => Rule.min(3).max(10),
    }),
    defineField({
      name: 'faqSchema',
      title: 'FAQ Schema (JSON-LD)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', type: 'string', title: 'Question' },
            { name: 'answer', type: 'text', title: 'Answer' },
          ],
        },
      ],
      group: 'seo',
    }),
    defineField({
      name: 'geoTargeting',
      title: 'Geo Targeting',
      type: 'object',
      group: 'seo',
      fields: [
        {
          name: 'targetRegion',
          type: 'string',
          title: 'Target Region',
        },
        {
          name: 'targetLocations',
          type: 'array',
          of: [{ type: 'string' }],
          title: 'Target Locations',
        },
      ],
    }),
    defineField({
      name: 'eaiOptimized',
      title: 'AI/Answer Engine Optimized',
      type: 'boolean',
      group: 'seo',
      initialValue: false,
    }),
    
    // Settings
    defineField({
      name: 'isFeatured',
      title: 'Featured Post',
      type: 'boolean',
      initialValue: false,
      group: 'settings',
    }),
    defineField({
      name: 'isDraft',
      title: 'Draft',
      type: 'boolean',
      initialValue: true,
      group: 'settings',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      category: 'category.title',
      media: 'featuredImage',
      isDraft: 'isDraft',
    },
    prepare({ title, author, category, media, isDraft }) {
      return {
        title: `${title} ${isDraft ? '[Draft]' : ''}`,
        subtitle: `${author} • ${category}`,
        media,
      }
    },
  },
})
```

### 4.4 Schema Index
Create `sanity/schemas/index.ts`:

```typescript
import { author } from './author'
import { category } from './category'
import { blogPost } from './blogPost'

export const schemaTypes = [author, category, blogPost]
```

## Phase 5: Environment Variables

Add to `.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=1zmh4sfw
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_READ_TOKEN=your_read_token_here
SANITY_API_WRITE_TOKEN=your_write_token_here
```

## Phase 6: Update Next.js Config

Update `next.config.ts` to include Sanity:

```typescript
import { defineNextStudioConfig } from 'next-sanity/studio'

const studio = defineNextStudioConfig({
  projectId: '1zmh4sfw',
  dataset: 'production',
})

export default studio
```

## Phase 7: Content Migration Script

Create `sanity/lib/migrateBlogs.ts` to import existing markdown:

```typescript
import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '1zmh4sfw',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

// Migration logic here...
```

## Phase 8: Update Blog Pages

Update `/src/app/blog/page.tsx` to fetch from Sanity:

```typescript
import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'

const query = groq`
  *[_type == "blogPost" && !isDraft] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    author->{name, avatar},
    category->{title, color},
    featuredImage,
    isFeatured
  }
`

export default async function BlogPage() {
  const posts = await client.fetch(query)
  // Render posts...
}
```

## Phase 9: Access Sanity Studio

1. Run development server: `npm run dev`
2. Access Studio at: `http://localhost:3000/studio`
3. Or use cloud Studio: `https://www.sanity.io/@oWTqFmco0/studio`

## Best Practices

### Schema Design
- Use field validation to ensure data quality
- Group related fields for better UX
- Use preview selectors for better Studio experience
- Define proper relationships with references

### GROQ Queries
- Use projections to fetch only needed fields
- Filter by `!isDraft` for published content
- Order by `publishedAt desc` for chronological display
- Use coalescing for fallback values

### SEO/AEO/GEO
- Keep meta titles under 60 characters
- Keep meta descriptions 120-160 characters
- Use focus keyword in title and first paragraph
- Include FAQ schema for answer engine optimization
- Set geo targeting for local SEO

### Performance
- Enable CDN for production (`useCdn: true`)
- Use `groq` with proper projections
- Implement ISR (Incremental Static Regeneration)
- Cache frequently accessed content

## Next Steps

1. Install dependencies
2. Create configuration files
3. Set up schemas
4. Configure environment variables
5. Run migration script
6. Update blog pages
7. Test in Studio
8. Deploy to production

## Troubleshooting

**Permission Errors**: Ensure tokens have correct permissions in Sanity dashboard
**CORS Issues**: Add localhost to CORS settings in Sanity project
**Build Errors**: Check that all schema types are exported in index.ts
**Studio Not Loading**: Verify projectId and dataset are correct
