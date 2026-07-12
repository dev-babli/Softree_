# Project Neo Architecture Visual

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        PROJECT NEO                              │
│                    AI-Native Agency Platform                    │
└─────────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   FRONTEND   │    │    STUDIO    │    │  FUTURE AI   │
│  (Next.js)   │    │  (Sanity)    │    │   MODULES    │
└──────────────┘    └──────────────┘    └──────────────┘
        │                     │                     │
        │                     │                     │
        ▼                     ▼                     ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  App Router  │    │   Schemas    │    │  AI Agents   │
│  Cache Comp  │    │   Types      │    │  Workflows   │
│  Live API    │◄───┤   Plugins    │    │  Gateway     │
└──────────────┘    └──────────────┘    └──────────────┘
        │                     │
        │                     │
        ▼                     ▼
┌──────────────┐    ┌──────────────┐
│  Components  │    │  Documents   │
│  shadcn/ui   │    │  Page/Post   │
│  Design Sys  │    │  Project     │
└──────────────┘    │  Person      │
                   │  Settings    │
                   └──────────────┘
```

## Monorepo Structure

```
project Neo (Turborepo)
│
├── frontend/ (Next.js 16 Workspace)
│   ├── app/ (App Router)
│   │   ├── layout.tsx (Root layout)
│   │   ├── page.tsx (Home page)
│   │   ├── globals.css (Design tokens)
│   │   ├── robots.ts (SEO)
│   │   └── sitemap.ts (SEO)
│   ├── components/
│   │   ├── navigation.tsx
│   │   ├── footer.tsx
│   │   └── ui/ (shadcn/ui components)
│   │       ├── button.tsx
│   │       ├── input.tsx
│   │       └── card.tsx
│   ├── lib/
│   │   ├── config.ts (Sanity config)
│   │   ├── client.ts (Sanity client)
│   │   ├── live.ts (Live Content API)
│   │   └── utils.ts (Utilities)
│   ├── next.config.ts (Cache Components)
│   └── package.json
│
├── studio/ (Sanity v6 Workspace)
│   ├── schemas/
│   │   ├── documents/
│   │   │   ├── page.ts (Page builder)
│   │   │   ├── post.ts (Blog posts)
│   │   │   ├── project.ts (Portfolio)
│   │   │   └── person.ts (Team members)
│   │   ├── singletons/
│   │   │   └── settings.ts (Global settings)
│   │   ├── objects/
│   │   │   ├── callToAction.ts
│   │   │   ├── infoSection.ts
│   │   │   └── heroSection.ts
│   │   └── index.ts
│   ├── sanity.config.ts (Presentation Tool)
│   └── package.json
│
├── package.json (Root workspace)
├── turbo.json (Monorepo config)
└── README.md
```

## Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CONTENT FLOW                             │
└─────────────────────────────────────────────────────────────────┘

┌──────────────┐
│   EDITOR     │
│  (Sanity     │
│   Studio)    │
└──────┬───────┘
       │
       │ 1. Create/Edit Content
       │
       ▼
┌──────────────┐
│   SANITY     │
│   CMS v6     │
│              │
│  • Schemas   │
│  • Plugins   │
│  • AI Assist │
└──────┬───────┘
       │
       │ 2. Live Content API
       │
       ▼
┌──────────────┐
│   NEXT.JS    │
│   FRONTEND   │
│              │
│  • Cache     │
│  • Live API  │
│  • ISR       │
└──────┬───────┘
       │
       │ 3. Render Content
       │
       ▼
┌──────────────┐
│    USER      │
│   (Browser)  │
└──────────────┘
```

## Component Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      COMPONENT LAYER                              │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  LAYOUT COMPONENTS                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │ Navigation  │  │   Layout     │  │   Footer     │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  PAGE COMPONENTS (Dynamic)                                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   HomePage   │  │  PageDetail  │  │  PostDetail  │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  SECTION COMPONENTS (Page Builder)                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │ HeroSection  │  │ InfoSection  │  │ CallToAction │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  UI COMPONENTS (shadcn/ui)                                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Button     │  │    Input     │  │    Card      │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└─────────────────────────────────────────────────────────────────┘
```

## Design System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    DESIGN SYSTEM TOKENS                           │
└─────────────────────────────────────────────────────────────────┘

COLOR PALETTE (Raycast-inspired Dark Theme)
┌─────────────────────────────────────────────────────────────────┐
│  Canvas:      #07080a (Deep charcoal base)                      │
│  Surface:     #0d0d0d (Cards, panels)                           │
│  Surface El:  #101111 (Elevated elements)                      │
│  Surface Card:#121212 (Card background)                         │
│  Text Prim:   #ffffff (Primary text)                            │
│  Text Sec:    rgba(255,255,255,0.55) (Secondary)                │
│  Accent:      #ff5757 (Brand red - single accent)              │
│  Border:      #242728 (Hairline borders)                       │
└─────────────────────────────────────────────────────────────────┘

TYPOGRAPHY
┌─────────────────────────────────────────────────────────────────┐
│  Font:        Inter (with ss03 font-feature-settings)           │
│  Scale:       12px → 60px (9 steps)                            │
│  Features:    calt, kern, liga, ss03 (single-story g)           │
└─────────────────────────────────────────────────────────────────┘

SPACING
┌─────────────────────────────────────────────────────────────────┐
│  Base:        8px                                               │
│  Scale:       4px → 96px (13 steps)                            │
│  Section:     96px (major content blocks)                      │
└─────────────────────────────────────────────────────────────────┘

BORDER RADIUS
┌─────────────────────────────────────────────────────────────────┐
│  Scale:       0px → 9999px (7 steps)                           │
│  Cards:       8px → 16px                                        │
│  Buttons:     8px                                               │
└─────────────────────────────────────────────────────────────────┘

SHADOWS
┌─────────────────────────────────────────────────────────────────┐
│  No drop shadows (elevation via color ladder)                   │
│  Heavy shadows for dark surfaces only                           │
└─────────────────────────────────────────────────────────────────┘
```

## Content Model Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      CONTENT TYPES                                │
└─────────────────────────────────────────────────────────────────┘

DOCUMENTS
┌─────────────────────────────────────────────────────────────────┐
│  PAGE          │  POST          │  PROJECT       │  PERSON      │
│  • name        │  • title       │  • title       │  • firstName  │
│  • slug        │  • slug        │  • slug        │  • lastName   │
│  • heading     │  • content     │  • overview    │  • role       │
│  • subheading  │  • excerpt     │  • coverImage  │  • bio        │
│  • pageBuilder │  • coverImage  │  • gallery     │  • avatar     │
│  • seo         │  • date        │  • client      │  • social     │
│               │  • author      │  • site        │              │
│               │  • tags        │  • tags        │              │
│               │  • seo         │  • services    │              │
│               │               │  • featured    │              │
│               │               │  • caseStudy   │              │
└─────────────────────────────────────────────────────────────────┘

SINGLETONS
┌─────────────────────────────────────────────────────────────────┐
│  SETTINGS                                                      │
│  • siteName                                                    │
│  • siteDescription                                             │
│  • logo, favicon, ogImage                                       │
│  • navigation (array of links)                                │
│  • footer (Portable Text)                                      │
│  • contact (email, phone, address)                             │
│  • social (linkedin, twitter, instagram)                       │
│  • seo (titleTemplate, descriptionTemplate)                    │
└─────────────────────────────────────────────────────────────────┘

OBJECTS (Page Builder Sections)
┌─────────────────────────────────────────────────────────────────┐
│  CALL TO ACTION      │  INFO SECTION      │  HERO SECTION        │
│  • heading           │  • heading          │  • heading           │
│  • body (PT)         │  • content (PT)     │  • subheading       │
│  • buttons           │  • image            │  • body (PT)        │
│  • theme             │  • layout           │  • image            │
│                      │  • theme            │  • buttons          │
│                      │                    │  • theme            │
│                      │                    │  • size             │
└─────────────────────────────────────────────────────────────────┘
```

## Technology Stack

```
┌─────────────────────────────────────────────────────────────────┐
│                    TECHNOLOGY STACK                              │
└─────────────────────────────────────────────────────────────────┘

FRAMEWORK & RUNTIME
┌─────────────────────────────────────────────────────────────────┐
│  Next.js 16.2.9      React 19.2.7      Node.js 20+             │
│  • Cache Components  • React Compiler  • Turbopack             │
│  • App Router        • Server Comps    • ISR                   │
└─────────────────────────────────────────────────────────────────┘

CMS & CONTENT
┌─────────────────────────────────────────────────────────────────┐
│  Sanity v6.2.0                                                  │
│  • Live Content API   • Presentation Tool   • AI Assist          │
│  • Type Generation    • Vision Tool        • Unsplash           │
└─────────────────────────────────────────────────────────────────┘

STYLING & UI
┌─────────────────────────────────────────────────────────────────┐
│  Tailwind CSS 4.1    shadcn/ui          TypeScript 5.9          │
│  • CSS-first         • Registry pattern  • Strict mode          │
│  • Theme variables   • Radix UI          • Path aliases         │
└─────────────────────────────────────────────────────────────────┘

MONOREPO & TOOLING
┌─────────────────────────────────────────────────────────────────┐
│  Turbo               npm                ESLint/Prettier         │
│  • Workspaces        • Package manager  • Linting              │
│  • Caching           • Scripts          • Formatting           │
└─────────────────────────────────────────────────────────────────┘

FUTURE (Not Yet Implemented)
┌─────────────────────────────────────────────────────────────────┐
│  Vercel AI SDK v6    Motion v12         Zod 4                  │
│  • AI Gateway        • Animations       • Validation           │
│  • Tool execution    • 120fps           • Type safety          │
└─────────────────────────────────────────────────────────────────┘
```

## Key Features

```
┌─────────────────────────────────────────────────────────────────┐
│                      KEY FEATURES                                │
└─────────────────────────────────────────────────────────────────┘

✅ IMPLEMENTED
┌─────────────────────────────────────────────────────────────────┐
│  • Turborepo monorepo with frontend/studio workspaces            │
│  • Next.js 16 with Cache Components                              │
│  • Tailwind CSS 4.1 with CSS-first design system                │
│  • shadcn/ui component registry                                 │
│  • Sanity Studio v6 with full schema                            │
│  • Presentation Tool for visual editing                          │
│  • Type generation workflow                                      │
│  • Live Content API integration                                 │
│  • SEO (sitemap, robots.txt, metadata)                          │
│  • Raycast-inspired dark theme design system                     │
└─────────────────────────────────────────────────────────────────┘

🚧 PENDING IMPLEMENTATION
┌─────────────────────────────────────────────────────────────────┐
│  • Page builder renderer                                        │
│  • Visual editing integration                                    │
│  • AI Assist integration                                        │
│  • Vercel AI SDK integration                                    │
│  • Motion animations                                            │
│  • Zod validation                                               │
│  • Advanced SEO features                                       │
│  • Testing and validation                                       │
│  • CI/CD pipeline                                               │
└─────────────────────────────────────────────────────────────────┘
```
