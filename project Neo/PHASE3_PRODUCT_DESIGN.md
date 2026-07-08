# PHASE 3 — PRODUCT DESIGN

## COMPLETE FEATURE MATRIX

### Version 1: CMS Replacement (Current Scope)
**Primary Objective**: Replace existing Sanity Studio with AI-native Agency Platform foundation

#### Core CMS Features
- **Content Management**
  - Document types: Page, Post, Project, Person, Settings
  - Portable Text with custom blocks
  - Image management with hotspot
  - Reference fields for content relationships
  - Array fields for lists
  - Slug generation
  - Validation rules

- **Visual Editing**
  - Presentation Tool with advanced resolvers
  - Live preview with draft mode
  - Click-to-edit (inspired by Hygraph)
  - Field focus (reverse lookup)
  - Real-time updates

- **AI Features**
  - Sanity AI Assist integration
  - Content generation
  - Content rewriting
  - SEO suggestions
  - Alt text generation
  - Slug generation
  - Translation support
  - Custom AI instructions

- **Developer Experience**
  - Type generation from schema
  - GROQ query editor (Vision Tool)
  - Schema validation
  - Hot reload
  - TypeScript strict mode

- **Frontend Features**
  - Next.js 16 with Cache Components
  - Live Content API integration
  - Three-layer data fetching
  - Static generation with ISR
  - SEO optimization
  - Sitemap generation
  - Robots.txt

### Future Modules (Planned)
- **AI Workspace** (v2)
- **Media Management** (v2)
- **SEO Tools** (v2)
- **Website Management** (v2)
- **Client Portal** (v3)
- **CRM** (v3)
- **Analytics** (v3)
- **Marketing Automation** (v3)
- **Knowledge Management** (v3)

---

## INFORMATION ARCHITECTURE

### Content Hierarchy
```
Project Neo
├── Content
│   ├── Pages
│   │   ├── Home (singleton)
│   │   ├── About (singleton)
│   │   ├── Services (singleton)
│   │   └── Custom Pages
│   ├── Posts
│   │   ├── Blog Posts
│   │   ├── News
│   │   └── Articles
│   ├── Projects
│   │   ├── Portfolio Items
│   │   ├── Case Studies
│   │   └── Work
│   ├── People
│   │   ├── Team Members
│   │   ├── Authors
│   │   └── Contributors
│   └── Settings (singleton)
│       ├── Site Configuration
│       ├── Navigation
│       ├── SEO Defaults
│       └── Brand Assets
├── Media
│   ├── Images
│   ├── Videos
│   └── Documents
└── AI
    ├── AI Context Documents
    ├── Instructions
    └── Workflows
```

### Navigation Structure
```
Main Navigation
├── Content
│   ├── Pages
│   ├── Posts
│   ├── Projects
│   └── People
├── Media
│   ├── Images
│   ├── Videos
│   └── Documents
├── AI
│   ├── AI Context
│   ├── Instructions
│   └── Workflows
└── Settings
    ├── Site Settings
    ├── Navigation
    ├── SEO
    └── Integrations
```

---

## CONTENT MODEL

### Document Types

#### Page
```typescript
{
  _type: 'page'
  name: string
  slug: slug
  heading: string
  subheading: string
  pageBuilder: array[
    callToAction | infoSection | heroSection | 
    contentSection | testimonialSection | 
    portfolioSection | contactSection
  ]
  seo: {
    title: string
    description: string
    image: image
    noIndex: boolean
  }
}
```

#### Post
```typescript
{
  _type: 'post'
  title: string
  slug: slug
  excerpt: text
  content: blockContent
  coverImage: image
  date: datetime
  author: reference(person)
  category: reference(category)
  tags: array[string]
  seo: {
    title: string
    description: string
    image: image
  }
}
```

#### Project
```typescript
{
  _type: 'project'
  title: string
  slug: slug
  overview: blockContent
  coverImage: image
  gallery: array[image]
  client: string
  site: url
  tags: array[string]
  services: array[string]
  year: number
  featured: boolean
  caseStudy: reference(post)
}
```

#### Person
```typescript
{
  _type: 'person'
  firstName: string
  lastName: string
  slug: slug
  role: string
  bio: blockContent
  avatar: image
  social: {
    linkedin: url
    twitter: url
    github: url
  }
}
```

#### Settings (Singleton)
```typescript
{
  _type: 'settings'
  siteName: string
  siteDescription: blockContent
  logo: image
  favicon: image
  ogImage: image
  navigation: array[
    {
      title: string
      link: reference(page | post | project)
      externalLink: url
      openInNewTab: boolean
    }
  ]
  footer: blockContent
  contact: {
    email: email
    phone: string
    address: string
  }
  social: {
    linkedin: url
    twitter: url
    instagram: url
  }
  seo: {
    titleTemplate: string
    descriptionTemplate: string
    noIndex: boolean
  }
}
```

### Object Types

#### Block Content
```typescript
{
  _type: 'blockContent'
  content: array[
    block | image | callToAction | 
    customBlock
  ]
}
```

#### Call to Action
```typescript
{
  _type: 'callToAction'
  heading: string
  body: blockContent
  buttons: array[
    {
      text: string
      link: url | reference
      style: 'primary' | 'secondary' | 'ghost'
      openInNewTab: boolean
    }
  ]
  theme: 'light' | 'dark' | 'brand'
}
```

#### Info Section
```typescript
{
  _type: 'infoSection'
  heading: string
  content: blockContent
  image: image
  layout: 'image-left' | 'image-right' | 'image-top'
  theme: 'light' | 'dark' | 'brand'
}
```

#### Hero Section
```typescript
{
  _type: 'heroSection'
  heading: string
  subheading: string
  body: blockContent
  image: image
  buttons: array[button]
  theme: 'light' | 'dark' | 'brand'
  size: 'small' | 'medium' | 'large'
}
```

---

## DATA RELATIONSHIPS

### Reference Relationships
- **Post → Person** (author)
- **Post → Category** (category)
- **Project → Post** (case study)
- **Page → Page/Post/Project** (navigation)
- **Settings → Page/Post/Project** (menu items)

### Array Relationships
- **Settings → Pages/Posts/Projects** (showcase projects)
- **Home → Projects** (showcase projects)
- **Post → Tags** (array of strings)
- **Project → Services** (array of strings)

### Self-Referencing
- **Page → Page** (parent/child pages)
- **Post → Post** (related posts)

---

## PERMISSION MODEL

### Role-Based Access Control (RBAC)
```
Roles:
├── Owner
│   ├── Full access to all features
│   ├── Manage team members
│   ├── Configure billing
│   └── Delete project
├── Admin
│   ├── Full content access
│   ├── Manage settings
│   ├── Manage AI features
│   └── Cannot delete project
├── Editor
│   ├── Create and edit content
│   ├── Publish content
│   ├── Upload media
│   └── Cannot access settings
├── Author
│   ├── Create and edit own content
│   ├── Submit for review
│   ├── Cannot publish directly
│   └── Cannot access settings
└── Viewer
    ├── View content only
    ├── Cannot edit
    └── Cannot publish
```

### Document-Level Permissions
- **Public**: Anyone with project link can view
- **Private**: Only team members can view
- **Draft**: Only author and editors can view
- **Published**: Based on role permissions

### Field-Level Permissions
- **Read-only fields**: Cannot be edited by certain roles
- **Hidden fields**: Not visible to certain roles
- **Required fields**: Must be filled before publishing

---

## MEDIA ARCHITECTURE

### Asset Management
- **Storage**: Sanity Asset Management
- **Image Optimization**: Sanity Image CDN
- **Video Support**: Sanity Asset Management with video types
- **File Types**: Images, Videos, PDFs, Documents
- **Alt Text**: Required for all images (AI-assisted generation)
- **Hotspot**: Image hotspot support for cropping
- **Metadata**: EXIF data preservation

### Image Pipeline
```
Upload → Validation → Optimization → CDN → Delivery
         ↓         ↓           ↓        ↓
      Type     Size/Format   WebP     Cache
      Check    Check        Convert
```

### Media Library Structure
```
Media Library
├── Images
│   ├── Uploads
│   ├── Unsplash
│   └── AI Generated
├── Videos
│   ├── Uploads
│   └── External
└── Documents
    ├── PDFs
    └── Other
```

---

## AI ARCHITECTURE

### AI Integration Layers

#### Layer 1: In-Studio AI (Sanity AI Assist)
- **Content Generation**: Generate content from instructions
- **Content Rewriting**: Improve existing content
- **SEO Suggestions**: Optimize for search engines
- **Alt Text Generation**: Auto-generate image descriptions
- **Slug Generation**: Auto-generate URL slugs
- **Translation**: Translate content to multiple languages
- **Custom Instructions**: Reusable AI prompts

#### Layer 2: Custom AI Workflows (Vercel AI SDK)
- **Content Summarization**: Summarize long-form content
- **Content Expansion**: Expand brief content
- **Tone Adjustment**: Adjust content tone
- **Style Transfer**: Apply brand voice
- **Content Categorization**: Auto-categorize content
- **Tag Generation**: Auto-generate tags
- **Meta Generation**: Generate meta descriptions

#### Layer 3: AI Agents (Autonomous Workflows)
- **SEO Agent**: Analyze and optimize for SEO
- **Content Agent**: Generate and improve content
- **Translation Agent**: Manage translations
- **Research Agent**: Research and gather information
- **Automation Agent**: Automate repetitive tasks

### AI Configuration
```typescript
{
  providers: {
    openai: {
      apiKey: string
      models: ['gpt-4', 'gpt-4-turbo', 'gpt-3.5-turbo']
    },
    anthropic: {
      apiKey: string
      models: ['claude-3-opus', 'claude-3-sonnet']
    }
  },
  gateway: {
    enabled: true
    rateLimit: number
    cache: boolean
    costMonitoring: boolean
  },
  instructions: {
    brandVoice: reference(aiContext)
    styleGuide: reference(aiContext)
    targetAudience: reference(aiContext)
  }
}
```

### AI Context Documents
- **Brand Voice**: Brand guidelines and tone
- **Style Guide**: Writing style and formatting
- **Target Audience**: Audience demographics and preferences
- **SEO Guidelines**: SEO best practices
- **Content Strategy**: Content strategy and goals

---

## SEO ARCHITECTURE

### SEO Features
- **Meta Tags**: Title, description, keywords
- **Open Graph**: OG title, description, image
- **Twitter Cards**: Twitter card meta tags
- **Structured Data**: JSON-LD schema markup
- **Sitemap**: Automatic sitemap generation
- **Robots.txt**: Configurable robots.txt
- **Canonical URLs**: Canonical tag management
- **Hreflang**: Multi-language support
- **Page Speed**: Core Web Vitals optimization
- **Mobile Optimization**: Mobile-first design

### SEO Schema Types
- **Organization**: Company information
- **Article**: Blog posts and articles
- **Person**: Team members and authors
- **Breadcrumb**: Navigation structure
- **FAQ**: Frequently asked questions
- **Product/Service**: Offerings
- **LocalBusiness**: Local business information

### SEO Workflow
```
Content Creation → SEO Analysis → AI Suggestions → 
Optimization → Validation → Publishing
```

---

## SEARCH ARCHITECTURE

### Search Features
- **Full-Text Search**: GROQ full-text search
- **Faceted Search**: Filter by category, tag, date
- **Autocomplete**: Search suggestions
- **Search Analytics**: Track search queries
- **Relevance Scoring**: Boost relevant results
- **Synonyms**: Handle synonyms
- **Fuzzy Search**: Handle typos

### Search Implementation
```typescript
{
  search: {
    index: 'content'
    fields: ['title', 'body', 'excerpt', 'tags']
    filters: {
      category: reference(category)
      tags: array[string]
      date: dateRange
    }
    boost: {
      title: 2.0
      tags: 1.5
      body: 1.0
    }
  }
}
```

---

## SETTINGS ARCHITECTURE

### Settings Categories

#### Site Settings
- Site name and description
- Logo and favicon
- Default theme
- Default language
- Timezone

#### Navigation Settings
- Main navigation
- Footer navigation
- Mobile navigation
- Breadcrumb configuration

#### SEO Settings
- Title template
- Description template
- Default OG image
- Default no-index setting
- Google Analytics ID
- Google Search Console

#### Integration Settings
- Vercel integration
- AI provider configuration
- Webhook configuration
- API keys

#### Team Settings
- Team members
- Roles and permissions
- Invitations
- Activity log

---

## FUTURE MODULE STRATEGY

### Module Architecture
Each future module will be:
- **Self-contained**: Independent functionality
- **API-driven**: Accessible via REST/GraphQL API
- **Plugin-ready**: Extensible via plugins
- **Themeable**: Consistent design system
- **Permission-aware**: Integrated with RBAC

### Module Dependencies
```
Core CMS (v1)
├── AI Workspace (v2) - depends on Core CMS
├── Media Management (v2) - depends on Core CMS
├── SEO Tools (v2) - depends on Core CMS
├── Website Management (v2) - depends on Core CMS
├── Client Portal (v3) - depends on Core CMS, Website Management
├── CRM (v3) - depends on Client Portal
├── Analytics (v3) - depends on Core CMS
├── Marketing Automation (v3) - depends on CRM, Analytics
└── Knowledge Management (v3) - depends on Core CMS, AI Workspace
```

### Module Communication
- **API Gateway**: Central API for all modules
- **Event Bus**: Inter-module communication
- **Shared State**: Global state management
- **Database**: Shared database with module-specific collections

---

## EXTENSION STRATEGY

### Extension Points
- **Custom Field Types**: Add custom field types to schema
- **Custom Validators**: Add validation rules
- **Custom Components**: Add React components to Studio
- **Custom Actions**: Add document actions
- **Custom Workflows**: Add workflow steps
- **Custom Integrations**: Add third-party integrations

### Extension API
```typescript
{
  extensions: {
    fieldTypes: array[customFieldType]
    validators: array[customValidator]
    components: array[customComponent]
    actions: array[customAction]
    workflows: array[customWorkflow]
    integrations: array[customIntegration]
  }
}
```

---

## PLUGIN STRATEGY

### Plugin Types
- **Studio Plugins**: Extend Sanity Studio functionality
- **Frontend Plugins**: Extend frontend functionality
- **AI Plugins**: Extend AI capabilities
- **Integration Plugins**: Third-party integrations

### Plugin Architecture
```typescript
{
  plugins: {
    studio: array[studioPlugin]
    frontend: array[frontendPlugin]
    ai: array[aiPlugin]
    integration: array[integrationPlugin]
  }
}
```

### Plugin Marketplace
- **Official Plugins**: Maintained by Project Neo team
- **Community Plugins**: Community-contributed plugins
- **Plugin Registry**: Central plugin directory
- **Plugin Reviews**: User reviews and ratings
- **Plugin Updates**: Automatic updates

---

## DESIGN SYSTEM SPECIFICATION

### Color Palette (Raycast-inspired)
```css
:root {
  /* Canvas */
  --canvas: #07080a;
  --surface: #0d0d0d;
  --surface-elevated: #101111;
  --surface-card: #121212;
  
  /* Text */
  --text-primary: #ffffff;
  --text-secondary: rgba(255, 255, 255, 0.55);
  --text-tertiary: rgba(255, 255, 255, 0.3);
  
  /* Accent */
  --accent: #ff5757;
  --accent-hover: #ff6b6b;
  
  /* Borders */
  --border: #242728;
  --border-strong: rgba(255, 255, 255, 0.15);
  
  /* Semantic */
  --success: #48bb78;
  --warning: #f6ad55;
  --error: #f56565;
}
```

### Typography
```css
:root {
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, monospace;
  
  /* Font Feature Settings */
  --font-feature-sans: 'calt', 'kern', 'liga', 'ss03';
  
  /* Type Scale */
  --text-xs: 12px;
  --text-sm: 14px;
  --text-base: 16px;
  --text-lg: 18px;
  --text-xl: 20px;
  --text-2xl: 24px;
  --text-3xl: 30px;
  --text-4xl: 36px;
  --text-5xl: 48px;
  --text-6xl: 60px;
}
```

### Spacing
```css
:root {
  --space-0: 0px;
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;
}
```

### Border Radius
```css
:root {
  --radius-none: 0px;
  --radius-sm: 4px;
  --radius-base: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-full: 9999px;
}
```

### Shadows
```css
:root {
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.5);
  --shadow: 0 8px 24px rgba(0, 0, 0, 0.6);
  --shadow-xl: 0 24px 64px rgba(0, 0, 0, 0.75);
}
```

---

## COMPONENT LIBRARY

### Base Components (shadcn/ui)
- Button
- Input
- Select
- Dialog
- Dropdown Menu
- Toast
- Badge
- Avatar
- Card
- Separator

### Custom Components
- Command Palette (Raycast-inspired)
- Data Table
- Rich Text Editor
- Image Uploader
- File Uploader
- Content Preview
- SEO Preview
- AI Chat Interface
- Workflow Builder

---

## PERFORMANCE TARGETS

### Core Web Vitals
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1
- **FCP (First Contentful Paint)**: < 1.8s
- **TTF (Time to First Byte)**: < 600ms

### Build Performance
- **Build Time**: < 2 minutes
- **Incremental Build**: < 10 seconds
- **Dev Server Start**: < 5 seconds
- **Hot Reload**: < 100ms

### Runtime Performance
- **First Paint**: < 1s
- **First Meaningful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Frame Rate**: 60fps (animations)

---

## ACCESSIBILITY STANDARDS

### WCAG 2.1 AA Compliance
- **Color Contrast**: 4.5:1 for normal text, 3:1 for large text
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader**: ARIA labels and roles
- **Focus Indicators**: Visible focus states
- **Alt Text**: All images have alt text
- **Forms**: Proper form labels and error messages
- **Skip Links**: Skip to main content link

### Accessibility Features
- **Reduced Motion**: Respect prefers-reduced-motion
- **High Contrast**: Support high contrast mode
- **Text Resize**: Support text resizing up to 200%
- **Keyboard Shortcuts**: Customizable keyboard shortcuts
- **Screen Reader**: Optimized for screen readers

---

## SECURITY STANDARDS

### Authentication
- **Sanity Native Authentication**: Google, GitHub, Email
- **SSO**: SAML/OIDC support (future)
- **2FA**: Two-factor authentication (future)
- **Session Management**: Secure session handling

### Authorization
- **RBAC**: Role-based access control
- **Field-Level Permissions**: Granular field access
- **Document-Level Permissions**: Document access control
- **API Keys**: Secure API key management

### Data Security
- **Encryption**: Data encryption at rest and in transit
- **Backup**: Automated backups
- **Audit Log**: Activity logging
- **Compliance**: GDPR, CCPA compliance

### API Security
- **Rate Limiting**: API rate limiting
- **CORS**: Configurable CORS policies
- **Input Validation**: Strict input validation
- **Output Encoding**: Prevent XSS attacks
