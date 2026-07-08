# PHASE 2 — TECHNICAL RESEARCH SUMMARY

## RESEARCH FINDINGS

### Next.js 16 (Latest: 16.2.9)
**Key Features**:
- **Cache Components**: New caching model using `"use cache"` directive for explicit, flexible caching
- **Partial Pre-Rendering (PPR)**: Static shell with dynamic content via Suspense
- **Turbopack**: Improved performance for development builds
- **React Compiler**: Enabled by default in Repo A
- **Improved Caching APIs**: `revalidateTag()`, `updateTag()`, `refresh()`
- **Incremental Prefetching**: Smarter prefetching that cancels when links leave viewport

**What to Adopt**:
- Cache Components for explicit caching control
- Three-layer data fetching pattern (Page → Dynamic → Cached)
- Turbopack for development
- React Compiler for performance

**What to Avoid**:
- Edge runtime with Cache Components (requires Node.js runtime)
- Implicit caching patterns from older Next.js versions

**What to Improve**:
- Combine Cache Components with Live Content API for real-time updates
- Implement proper cache invalidation strategies

---

### Sanity CMS (Latest: v6.2.0)
**Key Features**:
- **Live Content API**: Real-time content updates without rebuilds
- **Presentation Tool**: Advanced visual editing with mainDocuments and locations resolvers
- **AI Assist**: Document-aware AI assistant for content operations (Growth plan+)
- **Asset Source Unsplash**: Free image integration
- **Vision Tool**: GROQ query editor
- **Type Generation**: Auto-generate TypeScript types from schema

**What to Adopt**:
- Sanity v6.2.0 for latest features
- Live Content API for real-time updates
- Presentation Tool with advanced resolvers
- AI Assist for content operations
- Type generation workflow

**What to Avoid**:
- Sanity v3.x (Repo B) - outdated API
- Sanity v5.x (Repo C) - missing latest features

**What to Improve**:
- Combine AI Assist with custom AI workflows
- Implement advanced Presentation Tool resolvers
- Add custom field actions via AI Assist

---

### Vercel AI SDK (Latest: v6)
**Key Features**:
- **Unified API**: Single interface for multiple AI providers (OpenAI, Anthropic, Gemini)
- **Tool Execution**: Structured tool calling with approval workflows
- **Streaming**: Built-in streaming support
- **AI Gateway**: Rate limiting, caching, cost monitoring
- **Agent Support**: Multi-step agent workflows

**What to Adopt**:
- Vercel AI SDK for AI features
- AI Gateway for production AI operations
- Tool execution for structured AI operations
- Streaming for real-time AI responses

**What to Avoid**:
- Direct OpenAI API calls (use SDK instead)
- Multiple AI provider SDKs (unify with AI SDK)

**What to Improve**:
- Implement custom tools for content operations
- Add AI Gateway for cost and rate limiting
- Create agent workflows for complex tasks

---

### React 19 (Latest: 19.2.7)
**Key Features**:
- **React Compiler**: Automatic optimization
- **Improved Suspense**: Better error boundaries and loading states
- **Actions**: Simplified form handling
- **use() API**: Simplified data fetching
- **Server Components**: Improved RSC support

**What to Adopt**:
- React 19 for latest features
- React Compiler (already in Repo A)
- Server Components for data fetching
- Actions for form handling

**What to Avoid**:
- Class components (use functional components)
- Legacy context patterns (use modern context)

**What to Improve**:
- Leverage use() API for data fetching
- Implement proper Suspense boundaries
- Use Actions for all form operations

---

### Tailwind CSS 4 (Latest: v4.1)
**Key Features**:
- **New Engine**: 5x faster full builds, 100x faster incremental builds
- **CSS-first Configuration**: Configure in CSS instead of JavaScript
- **CSS Theme Variables**: Design tokens as native CSS variables
- **Modern CSS Features**: Cascade layers, @property, color-mix()
- **Container Queries**: First-class support
- **Text Shadows**: New text-shadow utilities
- **Mask Utilities**: Image and gradient masking
- **@starting-style**: Enter/exit transitions without JavaScript

**What to Adopt**:
- Tailwind CSS 4.1 for performance
- CSS-first configuration
- CSS theme variables
- Modern CSS features

**What to Avoid**:
- Tailwind CSS 3.x (Repo A) - outdated
- JavaScript configuration (use CSS-first)
- PostCSS plugins for imports (built-in now)

**What to Improve**:
- Use CSS variables for design tokens
- Implement container queries
- Leverage @starting-style for animations

---

### shadcn/ui (Latest: 2026)
**Key Features**:
- **AI-Native Design**: Optimized for AI tools to read and generate
- **Component Registry**: Copy-paste components, not npm package
- **Radix UI Foundation**: Accessible primitives
- **Tailwind CSS**: Styling
- **TypeScript**: Full type safety
- **Customizable**: Full control over components

**What to Adopt**:
- shadcn/ui for component library
- Component registry pattern (not npm package)
- Radix UI primitives
- Full TypeScript support

**What to Avoid**:
- Treating as npm package (use registry pattern)
- Custom components without accessibility

**What to Improve**:
- Create custom components following shadcn patterns
- Implement proper accessibility
- Use component registry for consistency

---

### TypeScript 5.9 (Latest: 5.9.3)
**Key Features**:
- **Minimal tsc --init**: Cleaner default tsconfig
- **import defer**: Deferred module evaluation
- **--module node20**: Stable Node.js 20 module resolution
- **Summary Descriptions in DOM APIs**: Better hover documentation
- **Expandable Hovers**: Collapsible type tooltips
- **Performance Optimizations**: 11% faster type checking
- **Cache Instantiations**: Faster complex type resolution

**What to Adopt**:
- TypeScript 5.9 for performance
- Strict mode by default
- --module node20 for Node.js 20
- Performance optimizations

**What to Avoid**:
- strict: false (Repo A has this)
- Outdated module resolution

**What to Improve**:
- Enable strict mode
- Use --module node20
- Leverage performance optimizations

---

### Zod 4 (Latest: v4.4.3)
**Key Features**:
- **Zod Mini**: Tree-shakable minimal version
- **Simplified Error Customization**: Easier error handling
- **Extensible Foundation**: zod/v4/core for library authors
- **Performance Improvements**: Faster validation
- **Better TypeScript Integration**: Improved type inference

**What to Adopt**:
- Zod 4 for validation
- Zod Mini for bundle size optimization
- Simplified error customization

**What to Avoid**:
- Zod 3.x (outdated)
- Custom validation without Zod

**What to Improve**:
- Use Zod Mini where possible
- Implement custom error messages
- Leverage better type inference

---

### Motion (formerly Framer Motion) (Latest: v12)
**Key Features**:
- **Hybrid Engine**: Web Animations API + JavaScript fallback
- **120fps Performance**: Native browser animations
- **Motion for React**: Import from "motion/react"
- **Scroll Animations**: ScrollTimeline support
- **Gesture Tracking**: Touch and mouse gestures
- **Layout Animations**: FLIP animations

**What to Adopt**:
- Motion v12 for animations
- Import from "motion/react"
- Hybrid engine for performance
- Scroll animations

**What to Avoid**:
- "framer-motion" package (use "motion/react")
- JavaScript-only animations (use hybrid engine)

**What to Improve**:
- Use Web Animations API where possible
- Implement scroll animations
- Add gesture tracking

---

## COMPETING PRODUCTS ANALYSIS

### Payload CMS
**What They Do Well**:
- Code-based configuration (TypeScript-first)
- Full-stack framework (not just CMS)
- Built-in authentication and permissions
- Global and field-level access control
- Rich text with official features
- Live preview

**What to Adopt**:
- Code-based schema approach
- Built-in authentication patterns
- Rich text editor features

**What to Avoid**:
- MongoDB dependency (we're using Sanity)
- Full-stack approach (we need CMS-first)

**What to Improve**:
- Implement similar permission model in Sanity
- Add code-based schema validation

---

### Contentful
**What They Do Well**:
- Mature platform with enterprise features
- Contentful Studio (visual editing)
- AI features (Palmata AI discovery platform)
- Strong ecosystem and integrations
- GraphQL API

**What to Adopt**:
- Visual editing patterns
- AI discovery concepts
- Enterprise-grade features

**What to Avoid**:
- Proprietary lock-in
- Limited customization compared to Sanity

**What to Improve**:
- Implement AI discovery features
- Add enterprise-grade permissions

---

### Storyblok
**What They Do Well**:
- **Storyblok Strata**: Vector data layer for content intelligence
- **Storyblok FlowMotion**: Automation and integration layer (powered by n8n)
- **Custom AI Features**: Bring your own credentials and models
- **Storyblok Blueprints**: Quick project starters
- **Experiments**: A/B testing at story level
- **Figma Integration**: Component creation from designs

**What to Adopt**:
- Custom AI features (bring your own credentials)
- Blueprint concept for project starters
- Experiments for A/B testing
- Figma integration

**What to Avoid**:
- Complex visual editor (Sanity's is cleaner)
- Component-based approach (Sanity's schema is more flexible)

**What to Improve**:
- Implement custom AI provider support
- Add A/B testing capabilities
- Create blueprint system

---

### Directus
**What They Do Well**:
- Database-first approach
- Instant APIs from database
- Custom admin panel
- Authentication and permissions
- Flows (automation)

**What to Avoid**:
- Database-first (we need content-first)
- Less flexible than Sanity

---

### Hygraph
**What They Do Well**:
- **Click to Edit**: Hover over content to edit
- **AI Assist**: Content generation and localization
- **AI Agents**: Autonomous workflow intelligence
- **MCP Server**: Integration with AI tools
- **Variants**: Personalized content experiences
- **Taxonomies**: Hierarchical content classification
- **Content Workflows**: Approval processes

**What to Adopt**:
- Click to Edit concept
- AI Assist for content operations
- AI Agents for workflows
- MCP Server for AI integration
- Taxonomies for content organization
- Content Workflows for approvals

**What to Avoid**:
- GraphQL-only (Sanity has GROQ which is more flexible)
- Enterprise-only features (taxonomies)

**What to Improve**:
- Implement Click to Edit with Presentation Tool
- Add AI Agents for content workflows
- Create MCP Server integration
- Implement taxonomies
- Add content workflows

---

## DESIGN SYSTEMS ANALYSIS

### Linear
**What They Do Well**:
- Minimal, clean interface
- Excellent typography hierarchy
- Keyboard-first navigation
- Fast performance
- Dark mode excellence

**What to Adopt**:
- Minimal aesthetic
- Typography hierarchy
- Keyboard navigation
- Performance focus

**What to Improve**:
- Implement similar minimal design
- Add keyboard shortcuts
- Optimize for performance

---

### Notion
**What They Do Well**:
- Block-based content editing
- Flexible content structure
- Clean, simple interface
- Excellent collaboration features

**What to Adopt**:
- Block-based editing patterns
- Flexible content structure
- Collaboration features

**What to Improve**:
- Add block-based content editing
- Implement real-time collaboration

---

### Raycast
**What They Do Well**:
- Dark-only surface with 4-step ladder
- Single white CTA as universal primary action
- Inter with ss03 font-feature-settings
- Hairline borders instead of shadows
- Red diagonal-stripe gradient (once per page max)
- Command palette design

**What to Adopt**:
- Dark surface ladder
- Single primary action color
- Hairline borders
- Minimal accent usage
- Command palette patterns

**What to Improve**:
- Implement dark surface ladder
- Use hairline borders
- Limit accent colors
- Add command palette

---

### Arc
**What They Do Well**:
- Cream canvas (#fffcec) instead of true white
- High-voltage blue band (#3139fb) once per page
- Oversized CTA card (76px tall, 22px radius)
- Five-family type stack
- Translucent frosted-glass surfaces
- User-selectable theme gradients

**What to Adopt**:
- Warm canvas instead of pure white
- Limited accent usage
- Oversized CTAs for emphasis
- Multiple font families
- Translucent surfaces

**What to Improve**:
- Use warm canvas
- Implement translucent surfaces
- Add theme customization

---

## TECHNICAL DECISIONS SUMMARY

### Core Technology Stack
- **Framework**: Next.js 16.2.9 with Cache Components
- **React**: 19.2.7 with React Compiler
- **CMS**: Sanity v6.2.0 with Live Content API
- **Styling**: Tailwind CSS 4.1 with CSS-first configuration
- **Components**: shadcn/ui (registry pattern)
- **Validation**: Zod 4
- **Animations**: Motion v12
- **TypeScript**: 5.9 with strict mode
- **AI**: Vercel AI SDK v6 with AI Gateway
- **Package Manager**: npm (matching Repo C)
- **Monorepo**: Turbo (matching Repo C)

### Architecture Decisions
- **Monorepo**: Turbo with separate frontend and studio workspaces
- **Data Fetching**: Three-layer pattern (Page → Dynamic → Cached)
- **Caching**: Cache Components with Live Content API
- **Type Generation**: Sanity typegen workflow
- **Component Pattern**: shadcn/ui registry pattern
- **Styling**: CSS-first Tailwind with theme variables
- **AI Integration**: Vercel AI SDK + Sanity AI Assist + Custom AI workflows

### Design Standards
- **Aesthetic**: Minimal, dark-mode inspired (Raycast-like)
- **Typography**: Inter with custom font-feature-settings
- **Colors**: Dark surface ladder, single accent color, hairline borders
- **Spacing**: 8px base scale
- **Components**: shadcn/ui patterns with custom styling
- **Performance**: 120fps animations, instant navigation
- **Accessibility**: WCAG AA compliance, keyboard navigation

### AI Strategy
- **Content Operations**: Sanity AI Assist for in-studio AI
- **Custom Workflows**: Vercel AI SDK for custom AI features
- **AI Gateway**: Rate limiting, caching, cost monitoring
- **AI Agents**: Autonomous workflows for content operations
- **MCP Server**: Integration with AI tools (Claude, Cursor)

### Future-Proofing
- **Modular Architecture**: Easy to add new modules
- **Plugin System**: Extensible plugin architecture
- **API-First**: All features accessible via API
- **Multi-Tenant**: Support for multiple clients
- **Internationalization**: Built-in i18n support
