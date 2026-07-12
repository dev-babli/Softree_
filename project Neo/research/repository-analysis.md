# Repository Analysis

**Date**: July 8, 2026
**Analyyst**: Cascade AI
**Purpose**: Analyze reference repositories to inform Neo's architecture and feature decisions

---

## Executive Summary

This analysis examines three reference repositories to extract architectural patterns, technical decisions, and implementation approaches that can inform the design of Project Neo's AI-native Agency Platform.

**Repositories Analyzed**:
1. `template-nextjs-personal-website` - Template A
2. `cms-kit` - Template B
3. `sanity-template-nextjs-clean` - Template C

**Key Finding**: Template C (sanity-template-nextjs-clean) should be the primary reference for the CMS module, while Template B (cms-kit) provides valuable patterns for monorepo structure and shared UI libraries.

---

## Repository A: template-nextjs-personal-website

### Overview
A Next.js personal website template with Sanity CMS integration, focusing on simplicity and performance.

### Architecture

**Technology Stack**:
- Next.js 16 with App Router
- React Compiler
- Cache Components
- Live Content API
- Sanity v6 CMS
- Tailwind CSS
- Turbopack

**Folder Structure**:
```
template-nextjs-personal-website/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── navigation.tsx
│   ├── footer.tsx
│   └── ui/
│       ├── button.tsx
│       ├── input.tsx
│       └── card.tsx
├── lib/
│   ├── config.ts (Sanity config)
│   ├── client.ts (Sanity client)
│   ├── live.ts (Live Content API)
│   └── utils.ts
├── next.config.ts (Cache Components)
└── package.json
```

### Key Features

**Performance Optimizations**:
- Cache Components for static routes
- Live Content API for real-time updates
- React Compiler for automatic optimization
- Turbopack for faster builds

**Sanity Integration**:
- Portable Text for rich content
- Custom schema types (duration, milestone, timeline)
- Singleton plugin for global documents
- Presentation Tool for visual editing

**Content Modeling**:
- Documents: page, project
- Singletons: home, settings
- Objects: duration, milestone, timeline
- Custom blocks in Portable Text (timeline)

### Strengths

1. **Performance-First**: Heavy investment in caching and optimization
2. **Clean Architecture**: Simple, straightforward structure
3. **Modern Stack**: Latest Next.js features (App Router, Cache Components)
4. **Type Safety**: TypeScript throughout
5. **SEO**: Built-in robots.txt and sitemap generation

### Weaknesses

1. **Limited Scope**: Only personal website, not extensible
2. **No Monorepo**: Single application structure
3. **No Shared Components**: UI components not reusable
4. **No Plugin System**: Hardcoded features
5. **No Collaboration**: Single-user focused

### Technical Debt

- None significant (template is clean)

### Improvement Opportunities

1. **Extract to Monorepo**: Separate frontend and studio
2. **Add Shared UI Library**: Make components reusable
3. **Add Plugin System**: Enable extensibility
4. **Add Collaboration**: Multi-user support
5. **Add AI Integration**: AI-assisted content creation

---

## Repository B: cms-kit

### Overview
A comprehensive CMS kit with monorepo architecture, shared UI library, and multi-CMS support (Sanity + Storyblok).

### Architecture

**Technology Stack**:
- Turborepo (monorepo)
- pnpm (package manager)
- Next.js 16
- Sanity v6 + Storyblok
- Tailwind CSS
- Shared UI library (@shared/ui)
- Controller pattern
- Adapter pattern

**Folder Structure**:
```
cms-kit/
├── apps/
│   ├── frontend/ (Next.js)
│   │   ├── app/
│   │   ├── components/
│   │   └── lib/
│   └── studio/ (Sanity)
│       ├── schemas/
│       └── sanity.config.ts
├── packages/
│   ├── ui/ (Shared UI components)
│   │   ├── components/
│   │   └── styles/
│   ├── config/ (Shared config)
│   └── types/ (Shared types)
├── package.json (Root)
├── turbo.json (Turborepo config)
└── pnpm-workspace.yaml
```

### Key Features

**Monorepo Architecture**:
- Turborepo for build orchestration
- pnpm workspaces for dependency management
- Shared packages (ui, config, types)
- Cache across builds

**Shared UI Library**:
- Reusable components across apps
- Consistent design system
- Type-safe component props

**Multi-CMS Support**:
- Sanity integration
- Storyblok integration
- Adapter pattern for CMS abstraction
- Presentation Resolver API

**Schema Organization**:
- 15+ custom objects
- Grouped by Content/Style
- Common fields for reusability
- Custom rich text component

### Strengths

1. **Monorepo**: Proper separation of concerns
2. **Shared UI**: Reusable component library
3. **Multi-CMS**: Abstraction layer for multiple CMS
4. **Controller Pattern**: Clean separation of logic
5. **Adapter Pattern**: Flexible CMS integration

### Weaknesses

1. **Complexity**: More complex than needed for single CMS
2. **Over-Engineering**: Multi-CMS support may not be needed
3. **No AI Integration**: No AI features
4. **No Collaboration**: No real-time features
5. **No Plugin System**: Hardcoded extensions

### Technical Debt

- Multi-CMS abstraction adds unnecessary complexity if only using Sanity

### Improvement Opportunities

1. **Simplify to Single CMS**: Focus on Sanity only
2. **Add AI Integration**: AI-assisted content creation
3. **Add Collaboration**: Real-time editing
4. **Add Plugin System**: Enable extensibility
5. **Add Custom Editor**: Replace Sanity Studio

---

## Repository C: sanity-template-nextjs-clean

### Overview
A clean Sanity template with Next.js, featuring a complete schema, page builder, and modern development setup.

### Architecture

**Technology Stack**:
- Next.js 16 with App Router
- Sanity v6 CMS
- Tailwind CSS
- TypeScript
- Page builder with thumbnails
- Grouped fields

**Folder Structure**:
```
sanity-template-nextjs-clean/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── [slug]/
├── components/
│   ├── sections/
│   ├── ui/
│   └── page-builder.tsx
├── lib/
│   ├── client.ts
│   ├── config.ts
│   └── utils.ts
└── studio/
    ├── schemas/
    │   ├── documents/
    │   │   ├── page.ts (page builder)
    │   │   ├── post.ts
    │   │   ├── person.ts
    │   │   └── settings.ts
    │   ├── singletons/
    │   └── objects/
    │       ├── 7 custom objects
    │   └── index.ts
    └── sanity.config.ts
```

### Key Features

**Complete Schema**:
- Documents: page, post, person
- Singletons: settings
- Objects: 7 custom objects (callToAction, infoSection, heroSection, etc.)
- Page builder with visual sections

**Page Builder**:
- Visual section selection with thumbnails
- Drag-and-drop reordering
- 7 section types
- Optimistic UI for sorting

**Field Organization**:
- Grouped fields (4 groups)
- Common fields for reusability
- Custom validation
- Conditional logic

### Strengths

1. **Complete Schema**: Production-ready content model
2. **Page Builder**: Visual content creation
3. **Field Groups**: Organized schema
4. **Optimistic UI**: Smooth interactions
5. **Clean Structure**: Well-organized codebase

### Weaknesses

1. **No Monorepo**: Single application
2. **No Shared UI**: Components not reusable
3. **No AI Integration**: No AI features
4. **No Collaboration**: Single-user
5. **Sanity Studio**: Using default studio

### Technical Debt

- None significant (template is clean)

### Improvement Opportunities

1. **Extract to Monorepo**: Separate frontend and studio
2. **Add Shared UI Library**: Make components reusable
3. **Replace Sanity Studio**: Build custom studio
4. **Add AI Integration**: AI-assisted content creation
5. **Add Collaboration**: Real-time editing

---

## Comparative Analysis

### Monorepo Structure

| Repository | Monorepo | Tool | Shared Packages |
|------------|-----------|------|-----------------|
| Template A | No | - | - |
| Template B | Yes | Turborepo | ui, config, types |
| Template C | No | - | - |

**Decision**: **Adopt Template B's monorepo structure** with Turborepo and pnpm.

### CMS Integration

| Repository | CMS | Integration | Custom Editor |
|------------|-----|-------------|---------------|
| Template A | Sanity | Live Content API | No |
| Template B | Sanity + Storyblok | Adapter pattern | No |
| Template C | Sanity | Presentation Tool | No |

**Decision**: **Use Sanity as CMS** but build custom studio (not Sanity Studio).

### UI Components

| Repository | Shared UI | Component Library | Reusability |
|------------|-----------|------------------|-------------|
| Template A | No | Built-in | Low |
| Template B | Yes | @shared/ui | High |
| Template C | No | Built-in | Low |

**Decision**: **Adopt Template B's shared UI library pattern**.

### Page Builder

| Repository | Page Builder | Visual | Thumbnails | Optimistic UI |
|------------|-------------|--------|------------|---------------|
| Template A | No | - | - | - |
| Template B | Yes (sections) | Yes | No | No |
| Template C | Yes (pageBuilder) | Yes | Yes | Yes |

**Decision**: **Adopt Template C's page builder with thumbnails and optimistic UI**.

### Schema Organization

| Repository | Documents | Singletons | Objects | Field Groups |
|------------|-----------|------------|---------|--------------|
| Template A | 2 | 2 | 3 | No |
| Template B | 15+ | - | 15+ | Yes (Content/Style) |
| Template C | 3 | 1 | 7 | Yes (4 groups) |

**Decision**: **Adopt Template C's schema organization** with documents, singletons, objects, and field groups.

---

## Recommendations

### What to Keep

**From Template A**:
- Cache Components (performance optimization)
- Live Content API (real-time updates)
- React Compiler (automatic optimization)
- Turbopack (faster builds)
- SEO features (robots.txt, sitemap)

**From Template B**:
- Monorepo structure with Turborepo
- pnpm package manager
- Shared UI library (@shared/ui)
- Controller pattern
- Adapter pattern (for future multi-provider support)
- Common fields pattern

**From Template C**:
- Complete schema (documents, singletons, objects)
- Page builder with thumbnails
- Field groups
- Optimistic UI for sorting
- Grouped fields organization

### What to Improve

**From Template A**:
- Extract to monorepo
- Add shared UI library
- Add plugin system
- Add collaboration features
- Add AI integration

**From Template B**:
- Simplify to single CMS (Sanity only)
- Remove Storyblok integration
- Add AI integration
- Add collaboration features
- Build custom studio

**From Template C**:
- Extract to monorepo
- Add shared UI library
- Replace Sanity Studio with custom studio
- Add AI integration
- Add collaboration features

### What to Discard

**From Template A**:
- Single application structure
- Limited scope (personal website only)

**From Template B**:
- Multi-CMS support (Storyblok)
- Over-engineering for single CMS use case

**From Template C**:
- Sanity Studio (build custom instead)
- Single application structure

---

## Technical Debt Assessment

### Current State
All three repositories are relatively clean with minimal technical debt.

### Future Technical Debt Risks

1. **Template A**: Not extensible for platform vision
2. **Template B**: Multi-CMS abstraction adds unnecessary complexity
3. **Template C**: Using Sanity Studio limits customization

### Mitigation Strategies

1. **Start with monorepo structure** (Template B)
2. **Use Sanity as CMS only** (not multi-CMS)
3. **Build custom studio** (not Sanity Studio)
4. **Design for extensibility** from day one
5. **Invest in shared UI library** for consistency

---

## Architecture Recommendations for Neo

### Monorepo Structure

```
project-neo/
├── apps/
│   ├── frontend/ (Next.js)
│   ├── studio/ (Custom Studio)
│   └── api/ (API Gateway)
├── packages/
│   ├── ui/ (Shared UI)
│   ├── config/ (Shared config)
│   ├── types/ (Shared types)
│   ├── ai/ (AI SDK)
│   ├── permissions/ (Permission system)
│   └── workspace/ (Workspace system)
└── turbo.json
```

### Technology Stack

- **Build Tool**: Turborepo
- **Package Manager**: pnpm
- **Frontend**: Next.js 16 with App Router
- **CMS**: Sanity v6 (as module)
- **Styling**: Tailwind CSS
- **UI**: Custom components (not shadcn/ui initially)
- **AI**: Multi-provider (OpenAI, Anthropic, Google)

### Key Architectural Decisions

1. **Monorepo from day one** (Template B pattern)
2. **Shared UI library** (Template B pattern)
3. **Custom Studio** (not Sanity Studio)
4. **Sanity as CMS module only** (not multi-CMS)
5. **Page builder with thumbnails** (Template C pattern)
6. **Field groups** (Template C pattern)
7. **Optimistic UI** (Template C pattern)
8. **Cache Components** (Template A pattern)
9. **Live Content API** (Template A pattern)
10. **Plugin system** (new, not in any template)

---

## Next Steps

1. **Review this analysis** with product owner
2. **Confirm technology stack** decisions
3. **Proceed to competitor analysis**
4. **Create feature matrix** based on this analysis
5. **Design information architecture**
6. **Design sitemap**

---

## Conclusion

Template C (sanity-template-nextjs-clean) provides the best foundation for the CMS module with its complete schema, page builder, and clean organization. Template B (cms-kit) provides the best patterns for monorepo structure and shared UI library. Template A (template-nextjs-personal-website) provides valuable performance optimizations.

The recommended approach is to combine the best patterns from all three repositories while building a custom studio and adding AI-native features, collaboration, and extensibility from the ground up.
