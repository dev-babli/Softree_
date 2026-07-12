# PHASE 1: DEEP REPOSITORY ANALYSIS

## Overview

This document provides a comprehensive analysis of three reference repositories:
1. **template-nextjs-personal-website** - Sanity's official Next.js personal website template
2. **cms-kit** - Focus Reactive's multi-CMS boilerplate (Sanity + Storyblok)
3. **sanity-template-nextjs-clean** - Sanity's clean Next.js + Sanity template

---

## REPOSITORY A: template-nextjs-personal-website

### Architecture Pattern
- **Type**: Single-repo monolithic application
- **Framework**: Next.js 16.2.9 with App Router
- **CMS**: Sanity v6.2.0
- **Deployment**: Vercel-first
- **Build Tool**: Turbopack (experimental)

### Technology Stack

#### Core Dependencies
```json
{
  "next": "16.2.9",
  "react": "19.2.7",
  "react-dom": "19.2.7",
  "sanity": "6.2.0",
  "@sanity/client": "7.23.0",
  "next-sanity": "13.1.1",
  "tailwindcss": "3.4.19",
  "typescript": "5.9.3"
}
```

#### Key Features
- **Cache Components**: Enabled in next.config.ts
- **React Compiler**: Enabled
- **Live Content API**: Full integration with sanityFetch
- **Presentation Tool**: Visual editing with resolve API
- **Type Generation**: sanity typegen workflow
- **Vision Tool**: GROQ query testing
- **Unsplash Asset Source**: Image integration

### Folder Structure
```
template-nextjs-personal-website/
├── app/
│   ├── (website)/              # Route group for website pages
│   │   ├── layout.tsx         # Root layout with cache pattern
│   │   ├── page.tsx           # Homepage
│   │   ├── [slug]/page.tsx    # Dynamic pages
│   │   └── projects/[slug]/    # Project pages
│   ├── api/
│   │   └── draft-mode/enable/ # Draft mode route
│   ├── studio/[[...tool]]/     # Studio mounting
│   └── globals.css
├── components/
│   ├── CustomPortableText.tsx  # Portable text renderer
│   ├── Header.tsx
│   ├── ImageBox.tsx
│   ├── Navbar.tsx
│   ├── OptimisticSortOrder/   # Drag-and-drop sorting
│   ├── TimelineItem.tsx
│   └── TimelineSection.tsx
├── sanity/
│   ├── lib/
│   │   ├── api.ts             # Project config
│   │   ├── client.ts          # Sanity client
│   │   ├── live.ts            # Live Content API
│   │   ├── queries.ts         # GROQ queries
│   │   └── utils.ts           # Utilities
│   ├── plugins/
│   │   ├── resolve.ts         # Presentation resolver
│   │   └── settings.tsx       # Singleton plugin
│   └── schemas/
│       ├── documents/
│       │   ├── page.ts
│       │   └── project.ts
│       ├── objects/
│       │   ├── duration.ts
│       │   ├── milestone.ts
│       │   └── timeline.ts
│       └── singletons/
│           ├── home.ts
│           └── settings.ts
├── .agents/
├── intro-template/
└── styles/
```

### Schema Structure

#### Documents
**Page** (`page.ts`)
- title (string, required)
- slug (slug, required, source: title)
- overview (Portable Text, max 155 chars, required)
- body (Portable Text with custom blocks)
  - paragraphs with link annotations
  - timeline blocks
  - images with caption/alt

**Project** (`project.ts`)
- title (string, required)
- slug (slug, required, source: title, max 96)
- overview (Portable Text, max 155 chars, required)
- coverImage (image, required, hotspot)
- duration (duration object)
- client (string)
- site (url)
- tags (array of strings, tags layout)
- description (Portable Text with timeline/images)

#### Singletons
**Home** (`home.ts`)
- title (string, required)
- overview (Portable Text, max 155 chars, required)
- showcaseProjects (array of references to project)

**Settings** (`settings.ts`)
- menuItems (array of references to home/page/project)
- footer (Portable Text)
- ogImage (image, hotspot)

#### Objects
**Duration** (`duration.ts`)
- start (date)
- end (date)

**Milestone** (`milestone.ts`)
- title (string, required)
- description (string)
- image (image, hotspot)
- tags (array of strings, tags layout)
- duration (duration, required)

**Timeline** (`timeline.ts`)
- items (array of timeline items, max 2)
  - title (string)
  - milestones (array of milestone)

### Data Fetching Pattern

#### Three-Layer Cache Pattern
```typescript
// Layer 1: Page (dynamic, no cache)
async function DynamicHome() {
  const {perspective, stega} = await getDynamicFetchOptions()
  return <CachedHome perspective={perspective} stega={stega} />
}

// Layer 2: Cached leaf (shared cache)
async function CachedHome({perspective, stega}: DynamicFetchOptions) {
  'use cache'
  const {data} = await sanityFetch({query: homePageQuery, perspective, stega})
  return <Home data={data} />
}

// Layer 3: Metadata (published only)
async function sanityFetchMetadata({query, perspective}) {
  'use cache'
  const {data} = await sanityFetch({query, perspective, stega: false})
  return {data}
}
```

#### Live Content API Integration
```typescript
export const {SanityLive, sanityFetch} = defineLive({
  client,
  serverToken: token,
  browserToken: token,
  strict: true,
})

export async function getDynamicFetchOptions(): Promise<DynamicFetchOptions> {
  const {isEnabled: isDraftMode} = await draftMode()
  if (!isDraftMode) {
    return {perspective: 'published', stega: false}
  }
  const jar = await cookies()
  const perspective = await resolvePerspectiveFromCookies({cookies: jar})
  return {perspective: perspective ?? 'drafts', stega: true}
}
```

### Component Patterns

#### Cache Pattern for Shared Components
```typescript
// Shared cache leaf for navbar and footer
async function fetchSettings({perspective, stega}: DynamicFetchOptions) {
  'use cache'
  const {data} = await sanityFetch({query: settingsQuery, perspective, stega})
  return data
}

async function DynamicNavbar() {
  const {perspective, stega} = await getDynamicFetchOptions()
  return <CachedNavbar perspective={perspective} stega={stega} />
}

async function CachedNavbar({perspective, stega}: DynamicFetchOptions) {
  'use cache'
  const data = await fetchSettings({perspective, stega})
  return <Navbar data={data} />
}
```

#### Visual Editing Integration
```typescript
const dataAttribute = data?._id && data?._type
  ? createDataAttribute({
      baseUrl: studioUrl,
      id: data._id,
      type: data._type,
    })
  : null

<div data-sanity={dataAttribute?.(['showcaseProjects', {_key: project._key}])}>
```

### Plugin System

#### Singleton Plugin
```typescript
export const singletonPlugin = (types: string[]) => {
  return {
    name: 'singletonPlugin',
    document: {
      newDocumentOptions: (prev, {creationContext}) => {
        if (creationContext.type === 'global') {
          return prev.filter((templateItem) => !types.includes(templateItem.templateId))
        }
        return prev
      },
      actions: (prev, {schemaType}) => {
        if (types.includes(schemaType)) {
          return prev.filter(({action}) => action !== 'duplicate')
        }
        return prev
      },
    },
  }
}
```

#### Structure Plugin
```typescript
export const pageStructure = (typeDefArray: DocumentDefinition[]): StructureResolver => {
  return (S) => {
    const singletonItems = typeDefArray.map((typeDef) => {
      return S.listItem()
        .title(typeDef.title!)
        .icon(typeDef.icon)
        .child(S.editor().id(typeDef.name).schemaType(typeDef.name).documentId(typeDef.name))
    })
    const defaultListItems = S.documentTypeListItems().filter(
      (listItem) => !typeDefArray.find((singleton) => singleton.name === listItem.getId()),
    )
    return S.list()
      .title('Content')
      .items([...singletonItems, S.divider(), ...defaultListItems])
  }
}
```

### Presentation Resolver API
```typescript
export const mainDocuments = defineDocuments([
  {
    route: '/projects/:slug',
    filter: `_type == "project" && slug.current == $slug`,
  },
  {
    route: '/:slug',
    filter: `_type == "page" && slug.current == $slug`,
  },
])

export const locations = {
  settings: defineLocations({
    message: 'This document is used on all pages',
    tone: 'caution',
  }),
  home: defineLocations({
    message: 'This document is used to render the front page',
    tone: 'positive',
    locations: [{title: 'Home', href: resolveHref('home')!}],
  }),
  project: defineLocations({
    select: {title: 'title', slug: 'slug.current'},
    resolve: (doc) => ({
      locations: [{
        title: doc?.title || 'Untitled',
        href: resolveHref('project', doc?.slug)!,
      }],
    }),
  }),
  page: defineLocations({
    select: {title: 'title', slug: 'slug.current'},
    resolve: (doc) => ({
      locations: [{
        title: doc?.title || 'Untitled',
        href: resolveHref('page', doc?.slug)!,
      }],
    }),
  }),
}
```

### Build Configuration
```typescript
const config: NextConfig = {
  cacheComponents: true,
  cacheLife: {default: sanity},
  reactCompiler: true,
  images: {
    remotePatterns: [{hostname: 'cdn.sanity.io'}],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  env: {
    SC_DISABLE_SPEEDY: 'false',
  },
}
```

### Scripts
```json
{
  "analyze": "next experimental-analyze --serve",
  "prebuild": "npm run stega-warn",
  "build": "next build --turbopack && sanity manifest extract --path public/studio/static",
  "predev": "npm run typegen && npm run stega-warn",
  "dev": "next --turbopack",
  "format": "npx prettier --write . --ignore-path .gitignore",
  "lint": "eslint .",
  "lint:fix": "npm run format && npm run lint -- --fix",
  "start": "next start",
  "stega-warn": "echo 'This template is using stega to embed Content Source Maps'",
  "type-check": "next typegen && tsc --noEmit",
  "typegen": "sanity schema extract && sanity typegen generate"
}
```

### Key Features Extracted
1. **Cache Components** - Static shell with live updates
2. **Three-layer data fetching** - Page → Dynamic → Cached
3. **Live Content API** - Real-time content updates
4. **Presentation Tool** - Visual editing with resolve API
5. **Type generation** - Auto-generated TypeScript types
6. **Singleton pattern** - Global settings/home
7. **Custom blocks** - Timeline in Portable Text
8. **Optimistic UI** - Drag-and-drop sorting
9. **Draft mode** - Preview unpublished content
10. **Visual editing overlays** - Stega for edit intent
11. **React Compiler** - Automatic optimization
12. **Turbopack** - Fast builds
13. **Vision Tool** - GROQ query testing
14. **Unsplash integration** - Image assets
15. **Speed Insights** - Performance monitoring

### Technical Debt
- No monorepo structure
- No shared UI library
- No multi-CMS support
- No plugin marketplace
- No AI integration
- No advanced permissions
- No workspace system
- No review workflow
- No scheduled publishing
- No activity feed

---

## REPOSITORY B: cms-kit

### Architecture Pattern
- **Type**: Turborepo monorepo
- **Package Manager**: pnpm
- **Workspaces**: apps/*, packages/*
- **Multi-CMS**: Sanity + Storyblok + Payload (moved)
- **Shared UI**: Separate UI package

### Technology Stack

#### Root Dependencies
```json
{
  "turbo": "^2.2.3",
  "pnpm": "9.2.0",
  "@commitlint/cli": "^19.3.0",
  "@manypkg/cli": "^0.21.4",
  "semantic-release": "^24.2.1",
  "vercel": "^42.3.0"
}
```

#### Sanity App Dependencies
```json
{
  "next": "15.5.9",
  "react": "19.2.1",
  "sanity": "3.90.0",
  "@sanity/client": "7.4.0",
  "next-sanity": "9.12.0",
  "@tinloof/sanity-studio": "0.0.0-20250507100413",
  "sanity-plugin-simpler-color-input": "3",
  "tailwindcss": "^4.1.18",
  "typescript": "5.7.3"
}
```

#### Storyblok App Dependencies
```json
{
  "next": "15.5.9",
  "react": "19.2.1",
  "@storyblok/react": "4.3.2",
  "storyblok-rich-text-react-renderer": "2.9.1",
  "storyblok": "^3.34.0",
  "storyblok-backup": "^0.3.0",
  "tailwindcss": "^4.1.18",
  "typescript": "5.7.3"
}
```

### Folder Structure
```
cms-kit/
├── apps/
│   ├── sanity/                  # Sanity CMS app
│   │   ├── src/
│   │   │   ├── app/            # Next.js app
│   │   │   ├── components/     # React components
│   │   │   ├── contentSections/ # Page builder sections
│   │   │   ├── generated/      # Generated types
│   │   │   └── lib/
│   │   │       ├── adapters/   # Data adapters
│   │   │       ├── api/        # API config
│   │   │       ├── loader/     # Data loaders
│   │   │       ├── presentation/
│   │   │       ├── schemas/    # Custom schemas
│   │   │       └── utils/
│   │   ├── CLI/                # Setup CLI
│   │   ├── sanity.config.ts
│   │   └── package.json
│   ├── storyblok/              # Storyblok CMS app
│   │   ├── src/
│   │   │   ├── app/
│   │   │   ├── components/
│   │   │   ├── contentSections/
│   │   │   ├── constants/
│   │   │   ├── generated/
│   │   │   └── lib/
│   │   ├── CLI/
│   │   └── package.json
│   └── payload/                # Payload CMS (moved)
├── packages/
│   ├── ui/                     # Shared UI library
│   │   ├── components/
│   │   │   ├── sections/       # Section components
│   │   │   └── ui/             # Base UI components
│   │   ├── styles/
│   │   ├── components.json
│   │   └── package.json
│   ├── eslint-config/          # Shared ESLint
│   ├── ts-config/              # Shared TypeScript
│   ├── tailwind-config/        # Shared Tailwind
│   └── sanity-template-selector/
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

### Content Section Architecture

#### Section Pattern
Each content section follows this structure:
```
contentSections/SectionName/
├── index.tsx          # Controller component
├── query.ts           # GROQ query
├── schema.ts          # Sanity schema
├── types.ts           # TypeScript types
└── templates/         # UI templates
```

#### Common Fields Pattern
```typescript
export enum CommonGroup {
  Content = "content",
  Style = "style",
}

export const sectionCommonFields = [
  getThemeField(),                    // Light/Dark/Light Gray/Dark Gray
  defineField({
    name: "paddingY",
    type: "string",
    options: {list: ["none", "base", "large"]},
    initialValue: "base",
  }),
  defineField({
    name: "paddingX",
    type: "string",
    options: {list: ["none", "base"]},
    initialValue: "base",
  }),
  defineField({
    name: "maxWidth",
    type: "string",
    options: {list: ["none", "base"]},
    initialValue: "base",
  }),
  defineField({
    name: "background",
    type: "object",
    fields: [
      defineField({name: "type", options: ["image", "video"]}),
      defineField({name: "image", type: "image"}),
      defineField({name: "video", type: "file"}),
      defineField({name: "overlay", options: ["black", "white"]}),
      defineField({name: "opacity", type: "number", initialValue: 35}),
    ],
  }),
]
```

### Available Content Sections

#### Hero Section
- globalData (reference to global hero)
- title (string, required)
- text (customRichText)
- image (customImage)
- links (array of customLink, required)
- + common fields (theme, padding, background)

#### Cards Grid Section
- columns (number: 1, 2, 3)
- items (array of defaultCard)
  - image (customImage)
  - title (string, required)
  - description (string)
  - link (customLink)
  - alignVariant (left/center/right)
  - backgroundColor (light/light-gray/dark-gray/dark/none)
  - rounded (large/none)
- + common fields

#### Blog Section
- text (customRichText, required)
- style (three-column/three-column-with-images/three-column-with-background-images)
- posts (array of blogPost)
  - date (date)
  - link (customLink)
  - image (customImage)
  - text (customRichText)
- + common fields

#### Copy Section
- text (customRichText)
- + common fields

#### Carousel Section
- items (array of carousel items)
- + common fields

#### Links List Section
- items (array of links)
- + common fields

#### Logos Section
- items (array of logos)
- + common fields

### Custom Schema Types

#### customRichText
```typescript
{
  name: "customRichText",
  fields: [
    {
      name: "text",
      type: "array",
      of: [
        {type: "block", marks: {annotations: ["textColor", "highlightColor"]}},
        {type: "break"},
        {type: "customImage"},
        {type: "section.logos"},
        {type: "section.cardsGrid"},
        {type: "section.linksList"},
      ],
    },
    {
      name: "alignVariant",
      type: "string",
      options: Object.values(AlignVariant),
      initialValue: AlignVariant.Left,
    },
    {
      name: "removeInnerMargins",
      type: "boolean",
      initialValue: false,
    },
  ],
}
```

#### customLink
```typescript
{
  name: "customLink",
  fields: [
    {name: "text", type: "string", required},
    {
      name: "type",
      type: "string",
      options: ["url", "internal"],
      initialValue: "internal",
    },
    {name: "href", type: "string", hidden: type !== "url"},
    {
      name: "target",
      type: "string",
      options: ["_self", "_blank", "_parent", "_top"],
      initialValue: "_self",
    },
    {name: "url", type: "reference", to: [{type: "page"}], hidden: type !== "internal"},
    {
      name: "variant",
      type: "string",
      options: Object.values(ButtonVariant),
      initialValue: ButtonVariant.Default,
    },
    {
      name: "size",
      type: "string",
      options: Object.values(ButtonSize),
      initialValue: ButtonSize.Base,
    },
  ],
}
```

#### customImage
```typescript
{
  name: "customImage",
  fields: [
    {
      name: "image",
      type: "image",
      fields: [{name: "alt", type: "string", required}],
      required: true,
    },
    {name: "height", type: "number", required},
    {
      name: "aspectRatio",
      type: "string",
      options: Object.values(ImageAspectRatio),
      initialValue: ImageAspectRatio["auto"],
    },
  ],
}
```

### Adapter Pattern

#### prepareImageProps
```typescript
export const prepareImageProps = (props?: CustomImage): IImageProps => {
  if (!props || !props.image)
    return {src: null, alt: "", aspectRatio: ImageAspectRatio["1/1"], fill: true, fit: "cover"}

  const url = props.image.asset?._ref.endsWith("svg")
    ? urlForImage(props.image)?.url() || ""
    : urlForImage(props.image)
        ?.height(props.height)
        ?.fit("max")
        ?.auto("format")
        ?.url() || ""

  return {
    src: url,
    alt: props.image.alt,
    aspectRatio: stegaClean(props.aspectRatio) as ImageAspectRatio,
    fill: true,
    fit: "cover",
    sizes: "(max-width: 1280px) 100vw, 1280px",
  }
}
```

#### prepareLinkProps
```typescript
export const prepareLinkProps = (props?: CustomLink): LinkProps => {
  if (!props || !props.text) return {text: "", href: ""}

  let href = ""
  if (props.type === "url") {
    href = props.href as string
  }
  if (props.type === "internal") {
    href = props?.url?.slug ? props.url.slug?.join("/") : ""
  }

  return {
    text: props.text,
    href: href,
    variant: stegaClean(props.variant) as ButtonVariantProps["variant"],
    size: stegaClean(props.size) as ButtonVariantProps["size"],
  }
}
```

#### prepareRichTextProps
```typescript
export const prepareRichTextProps = (props?: CustomRichText): IRichTextProps => {
  if (!props || !props.text)
    return {richText: null, removeInnerMargins: false, alignVariant: AlignVariant.Left}

  return {
    richText: renderRichText(props.text),
    removeInnerMargins: props.removeInnerMargins,
    alignVariant: stegaClean(props.alignVariant) as AlignVariant,
  }
}
```

### Shared UI Library

#### UI Components
- button (with variants and sizes)
- image (with aspect ratios)
- link (with variants)
- richText (with alignment)
- GenericCarousel
- horizontalSelect
- switch

#### Section Components
- hero
- cardsGrid
- carousel
- cookieBanner
- copy
- footer
- header
- linksList
- logos
- blog

### Turbo Configuration
```json
{
  "globalDependencies": ["**/.env.*local"],
  "globalEnv": [
    "NEXT_PUBLIC_*",
    "SB_*",
    "SANITY_*",
    "NODE_ENV",
    "VERCEL_ENV",
    "VERCEL_REDEPLOY_HOOK_URL"
  ],
  "tasks": {
    "build": {
      "cache": true,
      "persistent": true,
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**", "dist/**"],
      "env": ["VERCEL_REDEPLOY_HOOK_URL"]
    },
    "start": {"dependsOn": ["^build"]},
    "lint": {"cache": true, "persistent": true},
    "typecheck": {},
    "dev": {"cache": false, "persistent": true}
  }
}
```

### Scripts

#### Root
```json
{
  "build": "turbo run build",
  "dev": "turbo run dev --parallel",
  "dev:sb": "turbo run dev --filter=storyblok",
  "dev:sa": "turbo run dev --filter=sanity",
  "lint": "turbo run lint",
  "lint:fix": "turbo lint -- --fix && manypkg fix",
  "typecheck": "turbo typecheck",
  "format": "prettier --write \"**/*.{ts,tsx,md}\""
}
```

#### Sanity App
```json
{
  "dev": "next dev --turbopack --port=3000",
  "build": "next build",
  "extract-schema": "pnpm sanity schema extract --path src/generated/extracted-schema.json",
  "gen:types": "pnpm extract-schema && pnpm sanity typegen generate",
  "update-dataset": "sanity dataset export production src/generated/initial-data.tar.gz",
  "import-dataset": "sanity dataset import src/generated/initial-data.tar.gz"
}
```

#### Storyblok App
```json
{
  "dev": "next dev --turbopack --port=4050 --experimental-https",
  "sb-login": "pnpm storyblok login",
  "pull-schemas": "pnpm storyblok pull-components --space 293915 --rd --file-name production --path src/generated/",
  "push-schemas": "pnpm storyblok push-components src/generated/components.production.json --presets-source src/generated/presets.production.json --space",
  "gen:types": "pnpm pull-schemas && storyblok generate-typescript-typedefs --sourceFilePaths ./src/generated/components.production.json --destinationFilePath src/generated/extracted-types.ts"
}
```

### Key Features Extracted
1. **Monorepo architecture** - Turborepo with pnpm
2. **Multi-CMS support** - Sanity + Storyblok
3. **Shared UI library** - Reusable components
4. **Controller pattern** - CMS-specific controllers
5. **Adapter pattern** - Data transformation layer
6. **Common fields** - Reusable section fields
7. **Theme system** - Light/dark variants
8. **Background system** - Image/video with overlay
9. **Padding system** - Configurable spacing
10. **Type generation** - Auto-generated types
11. **CLI setup** - Automated project initialization
12. **Dataset management** - Export/import datasets
13. **Schema extraction** - Schema versioning
14. **Rich text with sections** - Nested sections in text
15. **Custom schemas** - Reusable schema types
16. **Presentation resolver** - Visual editing
17. **Pages plugin** - @tinloof/sanity-studio
18. **Color input plugin** - Custom color picker
19. **Commit lint** - Conventional commits
20. **Semantic release** - Automated releases

### Technical Debt
- No AI integration
- No advanced permissions
- No workspace system
- No review workflow
- No scheduled publishing
- No activity feed
- No plugin marketplace
- No extension system
- No command palette
- No search functionality
- No analytics
- No forms
- No SEO center
- No media library beyond basic
- No brand center
- No knowledge base
- No notifications
- No AI agents
- No workflows
- No MCP integration

---

## REPOSITORY C: sanity-template-nextjs-clean

### Architecture Pattern
- **Type**: Turborepo monorepo
- **Package Manager**: npm
- **Workspaces**: frontend, studio
- **Framework**: Next.js 16 with App Router
- **CMS**: Sanity v6

### Technology Stack

#### Root Dependencies
```json
{
  "turbo": "^2.10.2",
  "npm-run-all2": "^5.0.2",
  "prettier": "^3.8.3"
}
```

#### Frontend Dependencies
```json
{
  "next": "16.2.9",
  "react": "19.2.7",
  "react-dom": "19.2.7",
  "@sanity/client": "7.4.0",
  "next-sanity": "9.12.0",
  "@portabletext/react": "3.1.0",
  "tailwindcss": "^4.1.18",
  "typescript": "5.7.3"
}
```

#### Studio Dependencies
```json
{
  "sanity": "6.2.0",
  "@sanity/vision": "6.2.0",
  "sanity-plugin-asset-source-unsplash": "7.0.10",
  "@sanity/assist": "^1.0.0",
  "typescript": "5.7.3"
}
```

### Folder Structure
```
sanity-template-nextjs-clean/
├── frontend/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── posts/[slug]/page.tsx
│   │   ├── [slug]/page.tsx
│   │   ├── api/draft-mode/enable/route.ts
│   │   └── globals.css
│   ├── sanity/
│   │   ├── lib/
│   │   │   ├── api.ts
│   │   │   ├── client.ts
│   │   │   └── utils.ts
│   │   ├── sanity.cli.ts
│   │   ├── sanity.config.ts
│   │   └── sanity.types.ts
│   ├── next.config.ts
│   ├── tailwind.config.ts
│   └── package.json
├── studio/
│   ├── src/
│   │   ├── lib/
│   │   │   └── initialValues.ts
│   │   ├── schemaTypes/
│   │   │   ├── documents/
│   │   │   │   ├── page.ts
│   │   │   │   ├── post.ts
│   │   │   │   └── person.ts
│   │   │   ├── objects/
│   │   │   │   ├── button.ts
│   │   │   │   ├── blockContent.ts
│   │   │   │   ├── blockContentTextOnly.ts
│   │   │   │   ├── callToAction.ts
│   │   │   │   ├── infoSection.ts
│   │   │   │   └── link.ts
│   │   │   └── singletons/
│   │   │       └── settings.tsx
│   │   └── structure/
│   │       └── index.ts
│   ├── static/
│   │   └── page-builder-thumbnails/
│   ├── sanity.cli.ts
│   ├── sanity.config.ts
│   ├── sample-data.tar.gz
│   └── package.json
├── turbo.json
└── package.json
```

### Schema Structure

#### Documents
**Page** (`page.ts`)
- name (string, required)
- slug (slug, required, source: name, max 96)
- heading (string, required)
- subheading (string)
- pageBuilder (array of callToAction, infoSection)
  - insert menu with thumbnail previews

**Post** (`post.ts`)
- title (string, required)
- slug (slug, required, source: title, max 96)
- content (blockContent)
- excerpt (text)
- coverImage (image, hotspot, aiAssist for alt)
  - alt (string, required if image present)
- date (datetime, initial: now)
- author (reference to person)

**Person** (`person.ts`)
- firstName (string, required)
- lastName (string, required)
- slug (slug, required, source: firstName + lastName)
- bio (blockContent)
- portrait (image, hotspot)
- socialLinks (array of social links)

#### Singletons
**Settings** (`settings.tsx`)
- title (string, required, initial: demo value)
- description (blockContent with link annotations, initial: demo value)
  - linkType (href/page/post)
  - href (url, required if linkType: href)
  - page (reference, required if linkType: page)
  - post (reference, required if linkType: post)
  - openInNewTab (boolean)
- ogImage (image, hotspot, aiAssist for alt)
  - alt (string, required if image present)
  - metadataBase (url)

#### Objects
**CallToAction** (`callToAction.ts`)
- Groups: contents, media, button, designSystem
- eyebrow (string)
- heading (string, required)
- body (blockContentTextOnly)
- button (button object)
- image (image, hotspot)
- theme (light/dark, initial: light)
- contentAlignment (textFirst/imageFirst, hidden if no image)

**InfoSection** (`infoSection.ts`)
- heading (string)
- subheading (string)
- content (blockContent)

**Button** (`button.ts`)
- text (string, required)
- url (url)
- variant (primary/secondary/ghost)
- icon (icon selection)

**Link** (`link.ts`)
- linkType (href/page/post)
- href (url)
- page (reference)
- post (reference)
- openInNewTab (boolean)

**BlockContent** (`blockContent.ts`)
- Full portable text with annotations, lists, styles

**BlockContentTextOnly** (`blockContentTextOnly.ts`)
- Minified portable text (no lists, no styles)

### Presentation Tool Configuration

#### Main Documents Resolver
```typescript
mainDocuments: defineDocuments([
  {
    route: '/',
    filter: `_type == "settings" && _id == "siteSettings"`,
  },
  {
    route: '/:slug',
    filter: `_type == "page" && slug.current == $slug || _id == $slug`,
  },
  {
    route: '/posts/:slug',
    filter: `_type == "post" && slug.current == $slug || _id == $slug`,
  },
])
```

#### Locations Resolver
```typescript
locations: {
  settings: defineLocations({
    locations: [{title: 'Home', href: '/'}],
    message: 'This document is used on all pages',
    tone: 'positive',
  }),
  page: defineLocations({
    select: {name: 'name', slug: 'slug.current'},
    resolve: (doc) => ({
      locations: [{
        title: doc?.name || 'Untitled',
        href: resolveHref('page', doc?.slug)!,
      }],
    }),
  }),
  post: defineLocations({
    select: {title: 'title', slug: 'slug.current'},
    resolve: (doc) => ({
      locations: [
        {
          title: doc?.title || 'Untitled',
          href: resolveHref('post', doc?.slug)!,
        },
        {title: 'Home', href: '/'},
      ].filter(Boolean),
    }),
  }),
}
```

### Page Builder Thumbnails
- Static thumbnails for page builder sections
- Located in `studio/static/page-builder-thumbnails/`
- Used in insert menu preview

### AI Integration
- AI Assist for image alt text generation
- Configured in coverImage and ogImage fields
- Uses `aiAssist.imageDescriptionField` mapping

### Turbo Configuration
```json
{
  "ui": "tui",
  "tasks": {
    "sanity:typegen": {"cache": false},
    "dev": {
      "dependsOn": ["sanity:typegen"],
      "cache": false,
      "persistent": true,
      "interactive": true
    }
  }
}
```

### Scripts

#### Root
```json
{
  "dev": "turbo dev",
  "dev:next": "npm run dev --workspace=frontend",
  "dev:studio": "npm run dev --workspace=studio",
  "format": "prettier --cache --write .",
  "import-sample-data": "cd studio && sanity dataset import sample-data.tar.gz --dataset production --replace",
  "lint": "npm run lint --workspace=frontend",
  "type-check": "npm run type-check --workspaces"
}
```

### Key Features Extracted
1. **Monorepo architecture** - Turborepo with npm
2. **Page builder** - Drag-and-drop sections
3. **Visual editing** - Presentation tool with thumbnails
4. **Type generation** - Auto-generated types
5. **AI Assist** - Alt text generation
6. **Grouped fields** - Organized schema fields
7. **Custom validation** - Conditional field requirements
8. **Sample data** - Importable dataset
9. **Unsplash integration** - Image assets
10. **Vision Tool** - GROQ testing
11. **Assist plugin** - AI assistance
12. **Link annotations** - Rich text with links
13. **Person schema** - Team members
14. **Singleton settings** - Global configuration
15. **Draft mode** - Preview unpublished content
16. **Responsive images** - Sanity CDN
17. **Tailwind 4** - CSS-first styling
18. **Portable Text** - Rich text content
19. **Reference fields** - Document relationships
20. **Slug generation** - Auto from title/name

### Key Differences from Template A
1. **Page builder** - Array-based sections vs custom blocks
2. **Grouped fields** - Field organization vs flat structure
3. **Thumbnails** - Visual insert menu vs text-only
4. **AI Assist** - Built-in vs not present
5. **Sample data** - Importable vs manual setup
6. **Monorepo** - Separate workspaces vs single repo
7. **Link annotations** - Complex link types vs simple URLs
8. **Person schema** - Team management vs not present
9. **Settings singleton** - More complex vs simple
10. **No Cache Components** - Standard ISR vs cache pattern

### Technical Debt
- No Cache Components
- No Live Content API
- No React Compiler
- No shared UI library
- No multi-CMS support
- No controller pattern
- No adapter pattern
- No common fields system
- No theme system
- No background system
- No padding system
- No CLI setup
- No dataset management
- No schema extraction
- No rich text with sections
- No custom schemas beyond basics
- No pages plugin
- No color input plugin
- No commit lint
- No semantic release
- No AI beyond alt text
- No advanced permissions
- No workspace system
- No review workflow
- No scheduled publishing
- No activity feed
- No plugin marketplace
- No extension system
- No command palette
- No search
- No analytics
- No forms
- No SEO center
- No media library
- No brand center
- No knowledge base
- No notifications
- No AI agents
- No workflows
- No MCP integration

---

## COMPARATIVE ANALYSIS

### Architecture Comparison

| Aspect | Template A | CMS-Kit | Template C |
|--------|-----------|---------|------------|
| **Repo Type** | Single repo | Monorepo (Turbo) | Monorepo (Turbo) |
| **Package Manager** | npm | pnpm | npm |
| **Workspaces** | None | apps/*, packages/* | frontend, studio |
| **Shared UI** | None | Separate package | None |
| **Multi-CMS** | Sanity only | Sanity + Storyblok | Sanity only |
| **Cache Components** | Yes | No | No |
| **Live Content API** | Yes | No | No |
| **React Compiler** | Yes | No | No |
| **Page Builder** | Custom blocks | Sections | Sections |
| **Visual Editing** | Yes | Yes | Yes |
| **Type Generation** | Yes | Yes | Yes |
| **AI Integration** | No | No | Alt text only |
| **CLI Setup** | No | Yes | No |

### Schema Complexity Comparison

| Aspect | Template A | CMS-Kit | Template C |
|--------|-----------|---------|------------|
| **Documents** | 2 (page, project) | ~5 | 3 (page, post, person) |
| **Singletons** | 2 (home, settings) | ~2 | 1 (settings) |
| **Objects** | 3 (duration, milestone, timeline) | ~15 | 7 (button, link, etc.) |
| **Custom Blocks** | Timeline in PT | Sections in PT | None |
| **Field Groups** | No | Yes (Content/Style) | Yes (4 groups) |
| **Common Fields** | No | Yes (reusable) | No |
| **Theme System** | No | Yes (4 themes) | Yes (2 themes) |
| **Background System** | No | Yes (image/video/overlay) | No |
| **Padding System** | No | Yes (3 levels) | No |
| **Link Types** | Simple URL | URL + internal | URL + page + post |
| **Rich Text** | Basic | With sections | Basic + text-only |
| **Validation** | Basic | Advanced | Advanced (conditional) |

### Data Fetching Comparison

| Aspect | Template A | CMS-Kit | Template C |
|--------|-----------|---------|------------|
| **Pattern** | 3-layer (Page/Dynamic/Cached) | Standard | Standard |
| **Cache Components** | Yes | No | No |
| **Live API** | Yes | No | No |
| **Draft Mode** | Yes | Yes | Yes |
| **Perspective** | Published/Drafts | Published/Drafts | Published/Drafts |
| **Stega** | Yes | Yes | Yes |
| **Metadata** | Cached leaf | Standard | Standard |
| **Static Params** | Cached leaf | Standard | Standard |

### Component Architecture Comparison

| Aspect | Template A | CMS-Kit | Template C |
|--------|-----------|---------|------------|
| **Pattern** | Direct | Controller + UI | Direct |
| **Shared Library** | No | Yes (@shared/ui) | No |
| **Adapters** | No | Yes (prepare*) | No |
| **Sections** | None | 10+ sections | Page builder only |
| **UI Components** | Custom | Reusable | Custom |
| **Optimistic UI** | Yes (sorting) | No | No |
| **Visual Editing** | Yes | Yes | Yes |

### Build Tooling Comparison

| Aspect | Template A | CMS-Kit | Template C |
|--------|-----------|---------|------------|
| **Build Tool** | Turbopack | Turbo | Turbo |
| **Linting** | ESLint | ESLint + Commitlint | ESLint |
| **Formatting** | Prettier | Prettier | Prettier |
| **Type Check** | tsc | tsc | tsc |
| **Schema Extract** | Yes | Yes | No |
| **Dataset Export** | No | Yes | No |
| **Dataset Import** | No | Yes | Yes (sample) |
| **Release** | Manual | Semantic release | Manual |
| **CLI** | Sanity CLI | Custom CLI | Sanity CLI |

### Plugin Comparison

| Plugin | Template A | CMS-Kit | Template C |
|--------|-----------|---------|------------|
| **Presentation Tool** | Yes | Yes | Yes |
| **Vision Tool** | Yes | Yes | Yes |
| **Unsplash** | Yes | No | Yes |
| **Assist** | No | No | Yes |
| **Pages Plugin** | No | Yes (@tinloof) | No |
| **Color Input** | No | Yes | No |
| **Singleton Plugin** | Yes (custom) | No | No |
| **Structure Plugin** | Yes (custom) | Yes (pages) | Yes (custom) |

### Missing Features Across All Repositories

**None of the repositories have:**
1. AI Autocomplete
2. AI Rewrite
3. AI SEO
4. AI Metadata
5. AI FAQ
6. AI CTA
7. AI Alt Text (beyond basic Assist)
8. AI Research
9. AI Brand Voice
10. AI Prompt Library
11. AI Agents
12. AI Context Engine
13. AI Memory
14. AI Gateway
15. AI Provider Switching
16. Tool Calling
17. MCP
18. Streaming
19. Dashboard
20. Quick Actions
21. Recent Content
22. Draft Center
23. Scheduled Publishing
24. Activity Feed
25. Team Workspace
26. Command Palette
27. Spotlight Search
28. Global Search
29. Plugin Marketplace
30. Extension System
31. Permission System (RBAC)
32. Field-level Permissions
33. Document-level Permissions
34. Workspace System
35. Review System
36. Approval Workflows
37. Forms
38. Analytics
39. Media Library (advanced)
40. Brand Center
41. Knowledge Base
42. Notifications
43. Activity Timeline
44. AI Workflows
45. Future Modules

---

## FEATURE MATRIX

### Keep Features

From **Template A**:
- Cache Components architecture
- Three-layer data fetching pattern
- Live Content API integration
- Singleton plugin pattern
- Custom blocks in Portable Text
- Optimistic UI patterns
- React Compiler
- Turbopack

From **CMS-Kit**:
- Monorepo architecture
- Shared UI library
- Controller pattern
- Adapter pattern
- Common fields system
- Theme system
- Background system
- Padding system
- Custom schema types
- CLI setup
- Dataset management
- Schema extraction
- Rich text with sections
- Multi-CMS support (for future)
- Commit lint
- Semantic release

From **Template C**:
- Page builder with thumbnails
- Grouped fields
- AI Assist (alt text)
- Sample data
- Complex link types
- Person schema
- Conditional validation

### Improve Features

**Template A improvements needed:**
- Add monorepo structure
- Add shared UI library
- Add controller pattern
- Add adapter pattern
- Add common fields system
- Add theme system
- Add background system
- Add padding system
- Add CLI setup
- Add dataset management
- Add schema extraction
- Add rich text with sections
- Add AI integration beyond basic
- Add page builder
- Add grouped fields

**CMS-Kit improvements needed:**
- Add Cache Components
- Add Live Content API
- Add React Compiler
- Add AI integration beyond basic
- Add dashboard
- Add quick actions
- Add recent content
- Add draft center
- Add scheduled publishing
- Add activity feed
- Add team workspace
- Add command palette
- Add spotlight search
- Add global search
- Add plugin marketplace
- Add extension system
- Add permission system
- Add workspace system
- Add review system
- Add forms
- Add analytics
- Add media library
- Add brand center
- Add knowledge base
- Add notifications
- Add AI agents
- Add AI workflows
- Add MCP integration

**Template C improvements needed:**
- Add Cache Components
- Add Live Content API
- Add React Compiler
- Add shared UI library
- Add controller pattern
- Add adapter pattern
- Add common fields system
- Add theme system
- Add background system
- Add padding system
- Add CLI setup
- Add dataset management
- Add schema extraction
- Add rich text with sections
- Add AI integration beyond alt text
- Add dashboard
- Add quick actions
- Add recent content
- Add draft center
- Add scheduled publishing
- Add activity feed
- Add team workspace
- Add command palette
- Add spotlight search
- Add global search
- Add plugin marketplace
- Add extension system
- Add permission system
- Add workspace system
- Add review system
- Add forms
- Add analytics
- Add media library
- Add brand center
- Add knowledge base
- Add notifications
- Add AI agents
- Add AI workflows
- Add MCP integration

---

## TECHNICAL DEBT ANALYSIS

### Template A
- No monorepo structure
- No shared UI library
- No controller pattern
- No adapter pattern
- No common fields system
- No theme system
- No background system
- No padding system
- No CLI setup
- No dataset management
- No schema extraction
- No rich text with sections
- No AI integration
- No page builder
- No grouped fields
- No multi-CMS support
- No commit lint
- No semantic release

### CMS-Kit
- No Cache Components
- No Live Content API
- No React Compiler
- No AI integration beyond basic
- No dashboard
- No quick actions
- No recent content
- No draft center
- No scheduled publishing
- No activity feed
- No team workspace
- No command palette
- No spotlight search
- No global search
- No plugin marketplace
- No extension system
- No permission system
- No workspace system
- No review system
- No forms
- No analytics
- No media library
- No brand center
- No knowledge base
- No notifications
- No AI agents
- No AI workflows
- No MCP integration

### Template C
- No Cache Components
- No Live Content API
- No React Compiler
- No shared UI library
- No controller pattern
- No adapter pattern
- No common fields system
- No theme system
- No background system
- No padding system
- No CLI setup
- No dataset management
- No schema extraction
- No rich text with sections
- No AI integration beyond alt text
- No dashboard
- No quick actions
- No recent content
- No draft center
- No scheduled publishing
- No activity feed
- No team workspace
- No command palette
- No spotlight search
- No global search
- No plugin marketplace
- No extension system
- No permission system
- No workspace system
- No review system
- No forms
- No analytics
- No media library
- No brand center
- No knowledge base
- No notifications
- No AI agents
- No AI workflows
- No MCP integration

---

## IMPROVEMENT OPPORTUNITIES

### High Impact
1. **Add Cache Components** - Massive performance improvement
2. **Add Live Content API** - Real-time updates
3. **Add AI Integration** - Competitive advantage
4. **Add Dashboard** - Better UX
5. **Add Command Palette** - Power user feature
6. **Add Global Search** - Essential for large content
7. **Add Permission System** - Multi-tenant requirement
8. **Add Review System** - Content quality
9. **Add Plugin Marketplace** - Extensibility
10. **Add Extension System** - Customization

### Medium Impact
1. **Add Activity Feed** - Collaboration
2. **Add Scheduled Publishing** - Editorial workflow
3. **Add Draft Center** - Content management
4. **Add Team Workspace** - Organization
5. **Add Forms** - Lead generation
6. **Add Analytics** - Data-driven decisions
7. **Add Media Library** - Asset management
8. **Add Brand Center** - Consistency
9. **Add Knowledge Base** - Documentation
10. **Add Notifications** - Communication

### Low Impact
1. **Add Spotlight Search** - Nice to have
2. **Add Quick Actions** - UX improvement
3. **Add Recent Content** - Convenience
4. **Add Knowledge Base** - Documentation
5. **Add Activity Timeline** - Audit trail

---

## NEXT STEPS

1. **Complete competitive research** - Analyze Linear, Notion, Payload, Storyblok, Builder.io, Contentful, Directus, Framer
2. **Design comprehensive feature matrix** - 500+ features compared
3. **Design AI architecture** - Provider abstraction, gateway, streaming, context, memory, prompt system, agents, tool calling, MCP
4. **Design Studio UX** - Dashboard, quick actions, recent content, draft center, scheduled publishing, activity feed, team workspace, command palette, spotlight search, AI assistant, global search
5. **Design plugin architecture** - Plugin system with hooks, lifecycle, marketplace
6. **Design extension architecture** - Extension system
7. **Design permission system** - RBAC with field-level and document-level permissions
8. **Design navigation architecture** - Navigation system
9. **Design workspace system** - Workspace system
10. **Design review system** - Review system
11. **Generate full architecture** - After all research and analysis
