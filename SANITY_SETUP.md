# 🚀 Sanity CMS Setup Guide

Complete guide for setting up and using Sanity CMS with your Next.js 16 project.

---

## 📦 What's Been Set Up

### Content Schemas (10 Types)
| Schema | Purpose | Documents |
|--------|---------|-----------|
| **Service** | Your 15+ service pages | 4+ sample services included |
| **CaseStudy** | Portfolio projects | Ready to add |
| **BlogPost** | Content marketing | Rich editing with Portable Text |
| **Testimonial** | Client reviews | 3 sample testimonials |
| **FAQ** | Answer engine content | 4 sample FAQs |
| **TeamMember** | About page team | 1 sample (Soumeet) |
| **Author** | Blog authors | Ready to add |
| **Category** | Blog taxonomy | Ready to add |
| **Tag** | Content labels | Ready to add |
| **GlobalSettings** | Site-wide config | Includes SEO defaults |

### Features
- ✅ **Visual Editing** - Click content to edit in Studio
- ✅ **Live Preview** - Preview drafts before publishing
- ✅ **MCP Integration** - AI-powered content operations
- ✅ **Real-time Collab** - Google Docs-style editing
- ✅ **GROQ Queries** - 25+ pre-built queries
- ✅ **Image Pipeline** - Auto-optimized images
- ✅ **CDN Edge Cache** - Global instant delivery

---

## 🚀 Quick Start

### 1. Create Sanity Project

```bash
# Install Sanity CLI globally
npm install -g @sanity/cli

# Initialize your project
npx sanity@latest init
```

Or use the web dashboard:
- Go to [sanity.io/manage](https://www.sanity.io/manage)
- Click "Create new project"
- Name it "Softree Technology"

### 2. Get Your API Tokens

From [sanity.io/manage](https://www.sanity.io/manage):

1. **Project ID** - Found on project dashboard
2. **Dataset** - Usually "production"
3. **API Token** - Go to API → Tokens → Add API Token
   - Select "Editor" permissions for write access

### 3. Set Environment Variables

Copy `.env.local.example` to `.env.local`:

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_READ_TOKEN=sk_your_read_token_here
SANITY_PREVIEW_SECRET=your_random_secret_here
```

### 4. Deploy Sanity Studio

```bash
# Deploy the embedded studio
npm run sanity:deploy
```

Your studio will be at: `https://your-project-id.sanity.studio`

### 5. Import Sample Content

```bash
# Import all sample services, testimonials, FAQs, etc.
npm run sanity:import
```

---

## 🎯 Using Sanity in Your Code

### Fetch Services in Server Components

```tsx
import { client } from '@/sanity/lib/client'
import { allServicesQuery, serviceBySlugQuery } from '@/sanity/lib/queries'

// All services
const services = await client.fetch(allServicesQuery)

// Single service
const service = await client.fetch(serviceBySlugQuery, { 
  slug: 'digital-workspace/sharepoint' 
})
```

### Example: Service Page with Sanity

```tsx
// src/app/services/[category]/[slug]/page.tsx
import { client } from '@/sanity/lib/client'
import { serviceBySlugQuery } from '@/sanity/lib/queries'
import { notFound } from 'next/navigation'

export default async function ServicePage({
  params,
}: {
  params: { category: string; slug: string }
}) {
  const fullSlug = `${params.category}/${params.slug}`
  const service = await client.fetch(serviceBySlugQuery, { slug: fullSlug })
  
  if (!service) {
    notFound()
  }

  return (
    <main>
      <h1>{service.title}</h1>
      <p>{service.heroHeadline}</p>
      
      {service.features?.map((feature) => (
        <div key={feature.title}>
          <h3>{feature.title}</h3>
          <p>{feature.description}</p>
        </div>
      ))}
      
      {service.faqs?.map((faq) => (
        <FAQItem key={faq._id} question={faq.question} answer={faq.answer} />
      ))}
    </main>
  )
}
```

### Image Handling

```tsx
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'

// In your component:
<Image
  src={urlFor(service.heroImage).width(1200).height(600).url()}
  alt={service.title}
  width={1200}
  height={600}
  priority
/>
```

---

## 🖥️ Available Routes

| Route | Purpose |
|-------|---------|
| `/studio` | Embedded Sanity Studio |
| `/api/sanity/preview` | Enable preview mode |
| `/api/sanity/exit-preview` | Disable preview mode |

---

## 📚 NPM Scripts

```bash
# Development
npm run sanity:dev          # Run Studio locally
npm run dev                 # Run Next.js + Studio

# Build & Deploy
npm run sanity:build        # Build Studio
npm run sanity:deploy       # Deploy Studio to Sanity.io

# Content Management
npm run sanity:import       # Import sample content
npm run sanity:export       # Export content from pages
npm run sanity:typegen      # Generate TypeScript types

# Studio CLI
npx sanity@latest documents query "*[_type == 'service']"
npx sanity@latest documents create
npx sanity@latest documents delete
```

---

## 🎨 Content Workflow

### Creating New Content

1. **Go to Studio**: `https://your-project-id.sanity.studio`
2. **Click "Services"** (or any content type)
3. **Click "Create new"**
4. **Fill in fields**:
   - Title
   - Slug (auto-generated from title)
   - Category
   - Hero content
   - Features
   - SEO metadata
5. **Click "Publish"**

### Using Visual Editing

1. **Enable Preview Mode**:
   - In Studio, click "Preview" button
   - Or visit: `/api/sanity/preview?secret=your_secret&slug=sharepoint&type=service`

2. **Edit on Your Site**:
   - Hover over content shows edit pencil
   - Click to jump to Studio editor
   - Changes sync in real-time

3. **Exit Preview**:
   - Click "Exit Preview" button
   - Or visit: `/api/sanity/exit-preview`

---

## 📁 Project Structure

```
SOFTREE/
├── sanity.config.ts              # Main Sanity config
├── sanity/
│   ├── lib/
│   │   ├── client.ts             # Sanity client setup
│   │   ├── image.ts              # Image URL builder
│   │   └── queries.ts            # 25+ GROQ queries
│   └── schemas/
│       ├── index.ts              # Schema registry
│       ├── service.ts            # Service pages
│       ├── caseStudy.ts          # Portfolio
│       ├── blogPost.ts           # Blog
│       ├── testimonial.ts        # Reviews
│       ├── faq.ts                # FAQs
│       ├── teamMember.ts         # Team
│       ├── author.ts             # Blog authors
│       ├── category.ts           # Taxonomy
│       ├── tag.ts                # Labels
│       └── globalSettings.ts     # Site config
├── src/
│   ├── app/
│   │   ├── studio/[[...tool]]/     # Embedded Studio route
│   │   └── api/sanity/
│   │       ├── preview/route.ts  # Preview API
│   │       └── exit-preview/     # Exit preview API
│   └── components/sanity/
│       ├── PreviewProvider.tsx   # Visual editing
│       └── PreviewBar.tsx        # Preview indicator
├── scripts/
│   ├── migrate-to-sanity.ts      # Import sample data
│   └── export-content.ts         # Export from pages
└── .env.local.example            # Environment template
```

---

## 🔌 MCP Server Integration

Your Sanity MCP server is configured for AI-powered development:

```bash
# Check MCP status
npx sanity@latest mcp status

# Reconfigure if needed
npx sanity@latest mcp configure
```

**Available Skills**:
- `content-modeling-best-practices`
- `portable-text-conversion`

---

## 🛠️ Troubleshooting

### Build Errors

```bash
# If you see "Cannot find module '@sanity/vision'"
npm install @sanity/vision

# If you see "Cannot find module '@sanity/react-loader'"
npm install @sanity/react-loader
```

### Preview Mode Not Working

1. Check `SANITY_PREVIEW_SECRET` is set
2. Verify token has "Viewer" or "Editor" role
3. Ensure `/api/sanity/preview` route exists

### Content Not Showing

1. Check Studio: Is document published? (not just "draft")
2. Verify `isActive` field is `true`
3. Check GROQ query includes your conditions
4. Clear Next.js cache: `rm -rf .next`

---

## 📖 Next Steps

1. ✅ **Migrate remaining content**:
   ```bash
   npm run sanity:export -- --source=./src/app/services --type=service
   ```

2. ✅ **Add authors and team members** in Studio

3. ✅ **Create blog categories** and tags

4. ✅ **Set up webhooks** for automatic rebuilds on content changes

5. ✅ **Configure image CDN** for optimal delivery

6. ✅ **Train your team** on the Studio interface

---

## 🎓 Learning Resources

- [Sanity Docs](https://www.sanity.io/docs)
- [GROQ Cheat Sheet](https://www.sanity.io/docs/groq)
- [Next.js Integration](https://www.sanity.io/docs/nextjs-introduction)
- [Visual Editing](https://www.sanity.io/docs/visual-editing)
- [Sanity Learn](https://www.sanity.io/learn)

---

**Questions?** Check the [Sanity Community](https://www.sanity.io/community) or [GitHub Discussions](https://github.com/sanity-io/sanity/discussions)
