# PHASE 1 — COMPLETE REPOSITORY ANALYSIS

## REPOSITORY OVERVIEW

### Repository A: template-nextjs-personal-website
**Purpose**: Personal website template with native Sanity Studio integration
**Tech Stack**: Next.js 16.2.9, React 19, Sanity 6.2.0, TypeScript, Tailwind CSS
**Architecture**: Monolithic Next.js app with embedded Sanity Studio

### Repository B: cms-kit
**Purpose**: Production-ready boilerplate for multi-CMS development (Sanity, Storyblok, Payload)
**Tech Stack**: Next.js 15.5.9, React 19, Turbo (monorepo), pnpm workspaces
**Architecture**: Turborepo monorepo with shared UI package, multiple CMS apps

### Repository C: sanity-template-nextjs-clean
**Purpose**: Clean Next.js + Sanity starter with real-time visual editing
**Tech Stack**: Next.js 16.2.7, React 19, Sanity 5.31.1, Turbo (monorepo)
**Architecture**: Turborepo monorepo with separate frontend and studio workspaces

---

## DETAILED INVENTORY

### REPOSITORY A: template-nextjs-personal-website

#### Architecture
- **Pattern**: Monolithic Next.js application
- **Deployment**: Single deployable unit
- **Studio Integration**: Embedded at `/studio` route
- **Data Fetching**: Three-layer pattern (Page → Dynamic → Cached) with Cache Components

#### Folder Structure
```
/
├── app/
│   ├── (website)/          # Route集团
│   │   ├── [slug]/        # Dynamic pages
│   │   ├── projects/      # Project routes
│   │   ├── layout.tsx     # Root layout
│   │   └── page.tsx       # Homepage
│   ├── api/
│   │   └── draft-mode/    # Draft mode API route
│   ├── studio/            # Sanity Studio mount point
│   └── globals.css
├── components/
│   ├── CustomPortableText.tsx
│   ├── Header.tsx
│   ├── ImageBox.tsx
│   ├── Navbar.tsx
│   ├── TimelineItem.tsx
│   └── TimelineSection.tsx
├── sanity/
│   ├── lib/
│   │   ├── api.ts         # Project configuration
│   │   ├── client.ts      # Sanity client
│   │   ├── live.ts        # Live content utilities
│   │   ├── queries.ts     # GROQ queries
│   │   ├── token.ts       # API token
│   │   └── utils.ts       # Utilities
│   ├── plugins/
│   │   ├── resolve.ts     # Presentation resolver
│   │   └── settings.tsx   # Settings plugin
│   └── schemas/
│       ├── documents/     # Page, Project
│       ├── objects/       # Duration, Milestone, Timeline
│       └── singletons/    # Home, Settings
├── .env.local.example
├── next.config.ts
├── sanity.config.ts
├── sanity.cli.ts
├── tailwind.config.js
└── tsconfig.json
```

#### Packages & Dependencies
**Core Dependencies**:
- Next.js 16.2.9 (with Turbopack)
- React 19.2.7
- Sanity 6.2.0
- @sanity/client 7.23.0
- next-sanity 13.1.1
- @sanity/ui 3.2.0
- styled-components 6.4.2
- date-fns 4.4.0
- sonner 2.0.7

**Dev Dependencies**:
- TypeScript 5.9.3
- Tailwind CSS 3.4.19
- ESLint 9.39.4
- Prettier 3.8.4
- babel-plugin-react-compiler 1.0.0

#### Utilities
- `sanity/lib/api.ts` - Project configuration (projectId, dataset, apiVersion)
- `sanity/lib/client.ts` - Sanity client instance
- `sanity/lib/live.ts` - Live content fetching with Cache Components
- `sanity/lib/queries.ts` - GROQ query definitions
- `sanity/lib/token.ts` - API token management
- `sanity/lib/utils.ts` - Helper functions

#### Components
**UI Components**:
- CustomPortableText - Portable text renderer
- Header - Site header
- ImageBox - Image component with hotspot
- Navbar - Navigation bar
- TimelineItem - Timeline entry
- TimelineSection - Timeline container

#### Schemas
**Documents**:
- page - Page content with body array
- project - Project with cover image, duration, client, tags

**Objects**:
- duration - Time duration
- milestone - Timeline milestone
- timeline - Timeline array

**Singletons**:
- home - Homepage configuration with showcase projects
- settings - Global settings (menu items, footer, OG image)

#### Sanity Configuration
- **Plugins**: Presentation Tool, Structure Tool, Singleton Plugin, Unsplash Asset Source, Vision Tool
- **Presentation**: Custom resolver for page/project routes
- **Structure**: Custom structure with singletons
- **API Version**: 2025-02-27

#### Hooks
- No custom hooks identified (uses standard React hooks)

#### Context Providers
- No custom context providers identified

#### API Routes
- `/api/draft-mode/enable` - Draft mode enablement

#### Server Actions
- None identified

#### Libraries
- @sanity/icons - Icon set
- @sanity/image-url - Image URL builder
- @sanity/vision - GROQ query tool
- @sanity/demo - Demo utilities
- @tailwindcss/typography - Typography plugin
- @vercel/speed-insights - Performance monitoring

#### Custom Editors
- None identified beyond standard Sanity field types

#### Media
- Sanity Asset Management
- Unsplash integration via plugin
- Image hotspot support
- Alt text handling

#### Icons
- @sanity/icons

#### Theme System
- Tailwind CSS with custom theme from @sanity/demo
- CSS variables for fonts (--font-mono, --font-sans, --font-serif)
- No dark mode identified

#### Authentication
- Sanity native authentication (Google, GitHub, Email)

#### SEO
- Meta descriptions from overview fields
- Open Graph image support
- Slug-based routing
- No sitemap/robots.txt identified

#### Build Configuration
- Next.js with Turbopack
- Cache Components enabled
- React Compiler enabled
- Sanity manifest extraction on build

#### Developer Experience
- TypeScript with strict: false
- ESLint with React hooks plugin
- Prettier with import sorting
- Turbopack for dev
- Type generation via Sanity CLI

#### Commands
- `npm run dev` - Development with Turbopack
- `npm run build` - Production build
- `npm run typegen` - Generate types from schema
- `npm run lint` - Lint code
- `npm run format` - Format code

#### Documentation
- README.md with setup instructions
- Inline code comments
- No dedicated docs folder

#### Testing
- No testing framework identified
- No test files found

#### CI
- GitHub workflows for Renovate (dependency updates)

---

### REPOSITORY B: cms-kit

#### Architecture
- **Pattern**: Turborepo monorepo
- **Package Manager**: pnpm 9.2.0
- **Workspaces**: apps/*, packages/*
- **Build System**: Turbo with caching

#### Folder Structure
```
/
├── apps/
│   ├── sanity/             # Sanity CMS app
│   │   ├── src/
│   │   │   ├── app/        # Next.js app router
│   │   │   ├── components/
│   │   │   ├── contentSections/  # Page sections
│   │   │   ├── generated/   # Generated types
│   │   │   └── lib/         # Utilities
│   │   └── package.json
│   ├── storyblok/          # Storyblok CMS app
│   │   ├── src/
│   │   └── package.json
│   └── payload/            # Payload CMS (moved)
├── packages/
│   ├── ui/                 # Shared UI components
│   │   ├── components/
│   │   │   ├── sections/   # Section components
│   │   │   └── ui/         # Base UI components
│   │   └── package.json
│   ├── eslint-config/      # Shared ESLint config
│   ├── tailwind-config/    # Shared Tailwind config
│   ├── ts-config/          # Shared TypeScript config
│   └── sanity-template-selector/  # Template selector
├── docs/
│   ├── plans/              # Migration plans
│   └── superpowers/        # Feature specs
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

#### Packages & Dependencies
**Root Dependencies**:
- Turbo 2.2.3
- pnpm 9.2.0
- @manypkg/cli - Workspace management
- @commitlint/cli - Commit linting
- semantic-release - Automated releases

**Sanity App Dependencies**:
- Next.js 15.5.9
- Sanity 3.90.0
- next-sanity 9.12.0
- @portabletext/react 3.1.0
- @tinloof/sanity-studio - Custom studio
- sonner 1.7.1

**Storyblok App Dependencies**:
- Next.js 15.5.9
- @storyblok/react 4.3.2
- storyblok-rich-text-react-renderer 2.9.1

**UI Package Dependencies**:
- Radix UI components (dialog, dropdown, select, etc.)
- class-variance-authority
- tailwind-merge
- clsx
- react-hook-form
- swiper (carousel)

#### Utilities
**Sanity App**:
- `lib/config.ts` - Project configuration
- `lib/client-utils.ts` - Client utilities
- `lib/live.ts` - Live content
- `lib/token.ts` - API token
- `lib/utils.ts` - General utilities
- `lib/renderRichText.tsx` - Rich text renderer
- `lib/adapters/` - CMS adapters
- `lib/loader/` - Content loaders
- `lib/presentation/` - Presentation utilities

**Shared UI**:
- `utils.ts` - cn() utility for class merging

#### Components
**Content Sections (Sanity)**:
- Blog - Blog listing
- CardsGrid - Grid of cards
- Carousel - Image carousel
- Copy - Text copy section
- Hero - Hero section
- LinksList - Links list
- Logos - Logo grid

**UI Components (Shared)**:
- Radix UI primitives (Dialog, Dropdown, Select, etc.)
- Section components (Header, Footer, Hero, etc.)
- EmptyBlock - Empty state

#### Schemas
**Sanity Content Sections**:
- Each section has common fields (theme, padding, background)
- Presets for quick setup
- Field grouping (Content, Style)

**Common Fields**:
- Theme (light, dark, light-gray, dark-gray)
- Padding Y (none, base, large)
- Padding X (none, base)
- Max width (none, base)
- Background (image/video with overlay)

#### Sanity Configuration
- **Plugins**: Custom studio from @tinloof
- **Structure**: Section-based page builder
- **API Version**: 2024-10-28

#### Hooks
- No custom hooks identified

#### Context Providers
- No custom context providers identified

#### API Routes
- Draft mode API routes

#### Server Actions
- actions.ts in app directory

#### Libraries
- @sanity/vision 3.90.0
- @sanity/preview-url-secret 2.0.5
- uuid 10.0.0
- sanity-plugin-simpler-color-input

#### Custom Editors
- @tinloof/sanity-studio - Custom studio configuration

#### Media
- Sanity Asset Management
- Background image/video support
- Overlay configuration

#### Icons
- @radix-ui/react-icons

#### Theme System
- Tailwind CSS 4.1.18
- Theme variants (light, dark, gray)
- Background support (image/video)
- Shared tailwind-config package

#### Authentication
- Sanity native authentication
- Storyblok authentication

#### SEO
- Basic SEO support
- No advanced SEO features identified

#### Build Configuration
- Turbo with caching
- Parallel dev servers
- Workspace dependency management

#### Developer Experience
- Shared configs (ESLint, TypeScript, Tailwind)
- pnpm workspaces
- Turbo for build orchestration
- Type generation for both CMSs
- Component generators (pnpm gen)

#### Commands
- `pnpm dev` - Run all apps in parallel
- `pnpm dev:sa` - Run Sanity app only
- `pnpm dev:sb` - Run Storyblok app only
- `pnpm gen` - Generate new components
- `pnpm typecheck` - Type check all workspaces
- `pnpm lint` - Lint all workspaces

#### Documentation
- README.md with setup instructions
- docs/plans/ - Migration plans
- docs/superpowers/ - Feature specifications

#### Testing
- No testing framework identified

#### CI
- GitHub workflows
- Semantic release configuration
- Commitlint

---

### REPOSITORY C: sanity-template-nextjs-clean

#### Architecture
- **Pattern**: Turborepo monorepo
- **Package Manager**: npm 11.6.2
- **Workspaces**: studio, frontend
- **Build System**: Turbo with typegen dependency

#### Folder Structure
```
/
├── frontend/              # Next.js frontend
│   ├── app/
│   │   ├── [slug]/       # Dynamic pages
│   │   ├── posts/        # Blog routes
│   │   ├── api/          # API routes
│   │   ├── components/   # React components
│   │   ├── actions.ts    # Server actions
│   │   ├── client-utils.ts
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── sanity/           # Sanity client config
│   ├── next.config.ts
│   ├── tailwind.config.ts
│   └── package.json
├── studio/               # Sanity Studio
│   ├── src/
│   │   ├── schemaTypes/
│   │   │   ├── documents/    # Page, Post, Person
│   │   │   ├── objects/      # Block content, CTA, etc.
│   │   │   └── singletons/   # Settings
│   │   ├── structure/       # Studio structure
│   │   └── lib/             # Initial values
│   ├── static/             # Static assets
│   ├── sample-data.tar.gz
│   ├── sanity.config.ts
│   └── package.json
├── sanity.schema.json    # Shared schema
├── turbo.json
└── package.json
```

#### Packages & Dependencies
**Frontend Dependencies**:
- Next.js 16.2.7
- React 19.2.7
- @sanity/client 7.22.1
- next-sanity 13.0.8
- sanity-image 1.1.0
- sonner 2.0.7
- date-fns 4.4.0
- Tailwind CSS 4.3.0

**Studio Dependencies**:
- Sanity 5.31.1
- @sanity/assist 6.0.7
- @sanity/icons 3.7.4
- @sanity/vision 5.31.1
- sanity-plugin-asset-source-unsplash 7.0.7
- styled-components 6.4.2
- date-fns 4.4.0

#### Utilities
**Frontend**:
- `client-utils.ts` - Error handling with Sonner
- `sanity/` - Client configuration

**Studio**:
- `lib/initialValues.ts` - Default values

#### Components
**Frontend Components**:
- Avatar - User avatar
- BlockRenderer - Portable text renderer
- Cta - Call to action
- Date - Date formatter
- DraftModeToast - Draft mode indicator
- Footer - Site footer
- GetStartedCode - Code snippet
- Header - Site header
- InfoSection - Info section
- Onboarding - Onboarding flow
- PageBuilder - Page builder renderer
- PortableText - Portable text component
- Posts - Posts listing
- ResolvedLink - Link resolver
- SanityImage - Image component
- SideBySideIcons - Icon comparison

#### Schemas
**Documents**:
- page - Page with page builder array
- post - Blog post with author, content, cover image
- person - Person profile

**Objects**:
- blockContent - Rich text with internal links
- blockContentTextOnly - Text-only block content
- button - Button component
- callToAction - CTA section
- infoSection - Info section
- link - Link with type (URL/Page/Post)

**Singletons**:
- settings - Global settings with description, OG image

#### Sanity Configuration
- **Plugins**: Presentation Tool, Structure Tool, Assist, Unsplash Asset Source, Vision Tool
- **Presentation**: Advanced resolver with mainDocuments and locations
- **Structure**: Custom structure
- **AI**: @sanity/assist for AI-powered features
- **API Version**: Not specified in config

#### Hooks
- No custom hooks identified

#### Context Providers
- No custom context providers identified

#### API Routes
- `/api/draft-mode/enable` - Draft mode enablement

#### Server Actions
- `actions.ts` - Server actions

#### Libraries
- @sanity/uuid - UUID generation
- @vercel/speed-insights - Performance monitoring

#### Custom Editors
- Page builder with thumbnail previews
- Link type selector (URL/Page/Post)
- AI Assist for image alt text

#### Media
- Sanity Asset Management
- Unsplash integration
- AI Assist for alt text generation
- Hotspot support

#### Icons
- @sanity/icons

#### Theme System
- Tailwind CSS 4.3.0
- No dark mode identified

#### Authentication
- Sanity native authentication

#### SEO
- Open Graph image support
- Sitemap generation
- Robots.txt
- Metadata generation
- Alt text validation

#### Build Configuration
- Turbo with typegen dependency
- Schema extraction before typegen
- Type generation on build

#### Developer Experience
- TypeScript with strict mode
- ESLint with Next.js config
- Prettier with Sanity config
- Type generation workflow
- Sample data import

#### Commands
- `npm run dev` - Run both studio and frontend
- `npm run dev:next` - Run frontend only
- `npm run dev:studio` - Run studio only
- `npm run sanity:typegen` - Generate types
- `npm run import-sample-data` - Import sample data

#### Documentation
- README.md with setup instructions
- Inline code comments
- Vercel installation instructions

#### Testing
- No testing framework identified

#### CI
- GitHub workflows for Renovate
- CODEOWNERS file

---

## FEATURE MATRIX

| Feature | Repo A | Repo B | Repo C |
|---------|--------|--------|--------|
| **CMS Integration** | Sanity | Sanity, Storyblok, Payload | Sanity |
| **Architecture** | Monolithic | Monorepo (Turbo) | Monorepo (Turbo) |
| **Package Manager** | npm | pnpm | npm |
| **Next.js Version** | 16.2.9 | 15.5.9 | 16.2.7 |
| **React Version** | 19.2.7 | 19.2.1 | 19.2.7 |
| **Sanity Version** | 6.2.0 | 3.90.0 | 5.31.1 |
| **Cache Components** | ✅ Yes | ❌ No | ❌ No |
| **Live Content API** | ✅ Yes | ❌ No | ❌ No |
| **Presentation Tool** | ✅ Yes | ✅ Custom | ✅ Yes |
| **Visual Editing** | ✅ Yes | ✅ Yes | ✅ Yes |
| **Page Builder** | ❌ No | ✅ Yes | ✅ Yes |
| **AI Features** | ❌ No | ❌ No | ✅ Assist |
| **Multi-CMS Support** | ❌ No | ✅ Yes | ❌ No |
| **Shared UI Package** | ❌ No | ✅ Yes | ❌ No |
| **Type Generation** | ✅ Yes | ✅ Yes | ✅ Yes |
| **Turbopack** | ✅ Yes | ✅ Yes | ❌ No |
| **SEO Features** | Basic | Basic | Advanced |
| **Sitemap** | ❌ No | ✅ Yes | ✅ Yes |
| **Robots.txt** | ❌ No | ✅ Yes | ✅ Yes |
| **Testing** | ❌ No | ❌ No | ❌ No |
| **CI/CD** | Renovate | GitHub + Semantic Release | Renovate |
| **Documentation** | Basic | Advanced | Basic |

---

## ARCHITECTURE MATRIX

| Aspect | Repo A | Repo B | Repo C |
|--------|--------|--------|--------|
| **Monorepo** | ❌ No | ✅ Turbo + pnpm | ✅ Turbo + npm |
| **Workspace Structure** | N/A | apps/*, packages/* | studio, frontend |
| **Build System** | Next.js | Turbo | Turbo |
| **Code Sharing** | N/A | Shared packages | Schema sharing |
| **Studio Location** | Embedded in app | Embedded in app | Separate workspace |
| **Data Fetching** | 3-layer pattern | Standard | Standard |
| **Caching Strategy** | Cache Components | Standard | Standard |
| **Component Architecture** | Simple | Controller + UI | Simple |
| **Section System** | ❌ No | ✅ Yes | ✅ Yes |
| **Field Grouping** | ❌ No | ✅ Yes | ❌ No |

---

## DEPENDENCY MATRIX

### Critical Dependencies Comparison

| Dependency | Repo A | Repo B | Repo C |
|------------|--------|--------|--------|
| Next.js | 16.2.9 | 15.5.9 | 16.2.7 |
| React | 19.2.7 | 19.2.1 | 19.2.7 |
| Sanity | 6.2.0 | 3.90.0 | 5.31.1 |
| next-sanity | 13.1.1 | 9.12.0 | 13.0.8 |
| TypeScript | 5.9.3 | 5.7.3 | 5.9.3 |
| Tailwind | 3.4.19 | 4.1.18 | 4.3.0 |
| Turbo | ❌ No | 2.2.3 | 2.10.2 |

### Dependency Conflicts Identified
- **Sanity Version Mismatch**: Repo A (6.2.0), Repo B (3.90.0), Repo C (5.31.1) - Major version differences
- **Tailwind Version**: Repo A (3.x), Repo B/C (4.x) - Breaking changes
- **next-sanity**: Repo A (13.x), Repo B (9.x), Repo C (13.x) - API differences

---

## RISK ANALYSIS

### High Risk
1. **Sanity Version Fragmentation**: Three different major versions across repos - incompatible APIs
2. **No Testing**: None of the repositories have testing infrastructure
3. **Tailwind v3 vs v4**: Breaking changes between versions
4. **No Authentication**: No custom auth implementation in any repo

### Medium Risk
1. **TypeScript Strict Mode**: Repo A has strict: false
2. **No Error Boundaries**: No error handling boundaries identified
3. **No Monitoring**: Limited performance monitoring (only Speed Insights in some)
4. **No Analytics**: No analytics integration

### Low Risk
1. **Documentation**: Varies from basic to advanced
2. **CI/CD**: Basic setup with Renovate
3. **Code Quality**: ESLint and Prettier configured

---

## TECHNICAL DEBT ANALYSIS

### Repo A (template-nextjs-personal-website)
- **Type Safety**: strict: false in tsconfig
- **Testing**: No test framework
- **Documentation**: Basic README only
- **Error Handling**: Minimal error handling
- **Performance**: No performance optimization beyond defaults

### Repo B (cms-kit)
- **Complexity**: High complexity due to multi-CMS support
- **Maintenance**: Three CMSs to maintain
- **Testing**: No test framework
- **Documentation**: Advanced but scattered
- **Payload Migration**: Payload app moved (incomplete migration)

### Repo C (sanity-template-nextjs-clean)
- **Testing**: No test framework
- **Documentation**: Basic README only
- **Error Handling**: Basic error handling with Sonner
- **Performance**: No performance optimization

---

## IMPROVEMENT OPPORTUNITIES

### Architecture
1. **Unify Sanity Versions**: Choose one version (recommend Sanity v6 for latest features)
2. **Standardize on Monorepo**: Turbo monorepo provides better developer experience
3. **Implement Testing**: Add Playwright for E2E, Vitest for unit tests
4. **Add Error Boundaries**: Implement React error boundaries
5. **Add Monitoring**: Integrate Sentry for error tracking

### Features
1. **AI Integration**: Leverage Vercel AI SDK for content generation
2. **Advanced SEO**: Implement structured data, advanced metadata
3. **Authentication**: Add custom auth with NextAuth.js
4. **Internationalization**: Add i18n support
5. **Analytics**: Integrate analytics (Vercel Analytics, Plausible)

### Developer Experience
1. **Strict TypeScript**: Enable strict mode
2. **Pre-commit Hooks**: Add Husky for lint-staged
3. **Component Documentation**: Add Storybook or similar
4. **API Documentation**: Add OpenAPI/Swagger for API routes
5. **Performance Budgets**: Add performance budgets in CI

### Content Modeling
1. **Unified Schema**: Create a unified schema approach
2. **Reusable Components**: Create reusable content blocks
3. **Field Validation**: Strengthen field validation
4. **Content Workflows**: Implement publishing workflows
5. **Content Versioning**: Leverage Sanity's versioning better

---

## RECOMMENDATION FOR PROJECT NEO

**Foundation**: Repository C (sanity-template-nextjs-clean)

**Rationale**:
1. **Clean Architecture**: Separate frontend and studio workspaces
2. **Modern Features**: AI Assist, advanced Presentation Tool
3. **Better SEO**: Sitemap, robots.txt, metadata generation
4. **Latest Versions**: Next.js 16, React 19, Sanity 5.31
5. **Sample Data**: Includes sample data for quick start

**Borrow from Repository B**:
1. **Monorepo Structure**: Already using Turbo
2. **Shared UI Package**: Component sharing pattern
3. **Section System**: Page builder with common fields
4. **Field Grouping**: Better schema organization

**Borrow from Repository A**:
1. **Cache Components**: Latest Next.js caching
2. **Live Content API**: Real-time content updates
3. **Three-layer Fetching**: Optimized data fetching pattern

**Target Architecture**:
- Turborepo monorepo (from Repo C)
- Separate frontend and studio workspaces (from Repo C)
- Shared UI package (from Repo B)
- Section-based page builder (from Repo B)
- Cache Components + Live Content (from Repo A)
- AI Assist (from Repo C)
- Advanced SEO (from Repo C)
- Testing infrastructure (new)
- Authentication (new)
