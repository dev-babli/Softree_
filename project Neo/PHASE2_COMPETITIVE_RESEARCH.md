# PHASE 2: COMPETITIVE RESEARCH

## Overview

This document provides a comprehensive competitive analysis of leading content management and collaboration platforms: Linear, Notion, Payload, Storyblok, Builder.io, Contentful, Directus, and Framer. The analysis focuses on architecture patterns, technology stacks, feature sets, and decision rationale to inform the design of Project Neo's AI-native Agency Platform.

---

## LINEAR

### Positioning
Linear is a project management and issue tracking platform for software engineering teams. It positions itself as a "local-first sync engine that happens to look like an issue tracker."

### Core Architecture Pattern
**Local-First with Custom Sync Engine**

Linear inverts the traditional relationship between client and server. The actual database the UI reads from is in the browser (IndexedDB). Mutations apply locally first, then asynchronously push to the server, which broadcasts deltas back to other clients via WebSocket.

### Technology Stack

#### Frontend
- **Framework**: React + TypeScript
- **State Management**: MobX (observable graph, granular re-renders)
- **Build Tool**: Rolldown-Vite + plugin-react-oxc (previously Rollup, previously Parcel)
- **Rich Text**: ProseMirror + y-prosemirror (Yjs CRDT for live collab)
- **UI Primitives**: Radix UI
- **Styling**: Emotion + StyleX (compiled to atomic CSS)
- **Worker RPC**: Comlink
- **Local Storage**: idb (IndexedDB wrapper)
- **API Transport**: graphql-request
- **Error Monitoring**: Sentry
- **Font**: Inter Variable (single woff2, font-display: swap)

#### Backend
- **Runtime**: Node.js + TypeScript (single language for all server code)
- **Database**: PostgreSQL on Cloud SQL (issues table partitioned 300 ways)
- **Cache/Event Bus**: Memorystore Redis
- **Vector DB**: turbopuffer (similar-issue detection)
- **Orchestration**: Kubernetes on GCP (one workload per concern)
- **Edge Proxy**: Cloudflare Workers (multi-region)

#### Other Clients
- **Desktop**: Electron (same web JS, native chrome)
- **Mobile**: Swift (iOS) + Kotlin (separate full reimplementation)

#### Marketing Site
- **Framework**: Next.js (static)
- **Styling**: styled-components
- **Icons**: Inline SVG sprite

### Key Architectural Decisions

#### 1. Client is the Source of Truth
**Decision**: Disable your network. Keep working. Every operation succeeds locally. On reconnect, operations replay. Not optimistic UI — a genuinely local-first model with full IndexedDB persistence. Zero perceived latency per keystroke.

**Rationale**: 
- Eliminates perceived latency for all interactions
- Enables offline-first experience
- Reduces server load by batching operations
- Provides instant feedback regardless of network conditions

**Tradeoffs**:
- Increased client-side complexity
- Requires sophisticated sync engine
- Higher initial bundle size
- Complex conflict resolution logic

#### 2. WebSocket Transport with Custom Merge Brain
**Decision**: Long-lived WSS per session. Operations flow up; remote operations flow down. The merge logic isn't a generic CRDT — it's domain-specific (knows about issues, sub-issues, status, ordering).

**Rationale**:
- Generic CRDTs are overkill for domain-specific operations
- Custom merge logic can be optimized for specific use cases
- WebSocket provides true bidirectional real-time updates
- Domain-specific knowledge enables smarter conflict resolution

**Tradeoffs**:
- Custom sync engine requires significant engineering effort
- WebSocket connections are expensive at scale (sticky sessions, reconnect logic)
- Domain-specific logic is harder to maintain and extend
- Not suitable for generic collaborative editing

#### 3. Workspace Logical Sharding
**Decision**: Every customer = workspace. Per-workspace logical shard in Postgres, with the path to physical sharding when scale demands. The shared-MT with cell-readiness pattern.

**Rationale**:
- Multi-tenancy from day one
- Logical sharding enables easy physical sharding later
- Workspace isolation improves security and performance
- Tenant ID in every row enables efficient queries

**Tradeoffs**:
- Increased query complexity (requires tenant filtering)
- Cross-workspace operations are harder
- Initial overhead for small workspaces
- Requires careful schema design

#### 4. Search is a Separate Concern
**Decision**: Search index lives close to the user (per-workspace shard) and is populated by the sync engine on the write path. Reads never hammer FTS against the primary store.

**Rationale**:
- Write-path indexing is dramatically faster than query-time FTS
- Per-workspace shards keep search close to data
- Separation of concerns allows independent scaling
- Search can be optimized independently of primary store

**Tradeoffs**:
- Increased write latency (indexing on write)
- Index consistency requires careful handling
- Additional storage overhead
- More complex infrastructure

#### 5. Two Protocols, Two Audiences
**Decision**: GraphQL for external integrations (selective field queries from partners). Bespoke compact sync protocol over WebSocket for the internal client. Dramatically more efficient for high-frequency bidirectional updates.

**Rationale**:
- GraphQL provides flexibility for external partners
- Custom protocol is optimized for internal use cases
- Separation allows independent evolution
- Reduces bandwidth for high-frequency updates

**Tradeoffs**:
- Two protocols to maintain
- Increased documentation burden
- Potential for feature divergence
- More complex testing

### Features

#### Core Features
- **Issue Tracking**: Create, assign, prioritize, and track issues
- **Project Management**: Organize work into projects, cycles, and roadmaps
- **Real-time Collaboration**: Live updates across team members
- **Custom Views**: Customizable views and filters
- **Integrations**: GitHub, Slack, Figma, etc.
- **API**: Public GraphQL API for integrations
- **Mobile Apps**: Native iOS and Android apps
- **Keyboard-First**: Extensive keyboard shortcuts
- **Dark Mode**: Full dark mode support
- **Similar Issues**: AI-powered duplicate detection (vector search)

#### Advanced Features
- **Local-First**: Full offline support
- **Instant Sync**: Zero-latency updates
- **Custom Workflows**: Customizable issue workflows
- **Automation**: Automations and triggers
- **Time Tracking**: Built-in time tracking
- **Reporting**: Custom reports and dashboards
- **Permissions**: Granular permissions
- **SAML/SSO**: Enterprise authentication
- **Audit Logs**: Complete activity tracking
- **Webhooks**: Webhook integrations

### What to Steal

#### Patterns That Compound
1. **Local-first architecture** - For write-heavy applications
2. **Workspace sharding** - For multi-tenant systems
3. **Write-path indexing** - For search performance
4. **Domain-specific sync** - When generic CRDTs are overkill
5. **Two-protocol approach** - For external vs internal APIs
6. **Service worker caching** - For offline support
7. **Fine-grained chunking** - For vendor cache invalidation
8. **Assume-happy-path auth** - For instant UX

### What to Avoid Copying

#### Unless You're Them
1. **Custom sync engine** - Unless you have domain-specific needs
2. **WebSocket-only transport** - Unless you need sub-second latency
3. **Full local-first** - For read-mostly applications
4. **Custom merge logic** - Unless generic CRDTs don't fit
5. **Physical sharding complexity** - Unless you're at scale

### What This Teardown Can't Tell You
- Physical sharding strategy today
- GDPR right-to-erasure implementation
- Cost-per-workspace at scale
- Conflict-resolution rules at operation level

---

## NOTION

### Positioning
Notion is a modular workspace engine where blocks are the modules. It provides users with extreme customization and flexibility in terms of information positioning within a database. Users can craft their own infinite ways to use Notion.

### Core Architecture Pattern
**Block-Based Graph Data Model**

Notion is built on one core idea: everything is a block. Every piece of content — text, headings, images, database rows, even full pages — is the same type of object called a "block." This single architectural decision shapes everything: how the editor works, how data syncs between users, how permissions cascade through nested content, and why the API looks the way it does.

### Technology Stack

#### Frontend
- **Framework**: React
- **Language**: TypeScript
- **State Management**: Redux, Zustand, or custom state management
- **Rich Text**: Custom editor (not ProseMirror or Lexical)
- **Real-time**: WebSocket connections
- **PWA**: Service workers for offline support
- **Performance**: Code splitting, lazy loading

#### Backend
- **Runtime**: Node.js (microservices architecture)
- **Database**: PostgreSQL on Amazon RDS (96 servers, 5 logical shards as of 2023)
- **Sharding**: Application-level sharding (480 logical shards mapped to 32 physical nodes)
- **Connection Pooling**: PgBouncer
- **Caching**: Redis
- **Real-time**: WebSocket service (MessageStore)
- **Search**: Full-text search
- **Infrastructure**: AWS, Kubernetes

#### Other Clients
- **Native Apps**: SQLite or IndexedDB for local storage
- **Web**: IndexedDB for local storage

### Key Architectural Decisions

#### 1. The Block Model
**Decision**: Every piece of content is a block with a UUID v4 identifier, type, properties, and relationships to other blocks.

**Rationale**:
- Universal content primitive enables extreme flexibility
- Block model simplifies data modeling
- Consistent shape across all content types
- Enables powerful operations (drag, nest, transform)

**Tradeoffs**:
- Complex data model
- Performance overhead for deep nesting
- Challenging to query and render
- Requires sophisticated caching

#### 2. Content Pointers vs Parent Pointers
**Decision**: Notion uses two different relationships between blocks for two different jobs:
- **Content (ordered set of child block IDs)**: used to render nested content
- **Parent (upward pointer)**: used for permissions inheritance

**Rationale**:
- Separates rendering from permissions
- Enables efficient permission checks
- Allows blocks to be referenced in multiple places
- Prevents walking up the tree for permissions

**Tradeoffs**:
- More complex data model
- Requires maintaining two relationships
- Potential for inconsistency
- Additional storage overhead

#### 3. Transaction Model
**Decision**: Operations are grouped into transactions, committed or rejected as a group by the server. Optimistic local apply before server confirmation.

**Rationale**:
- Instant feedback on user actions
- Enables offline editing
- Atomic operations prevent partial updates
- Conflict detection at server level

**Tradeoffs**:
- Complex conflict resolution
- Requires sophisticated sync logic
- Potential for rollbacks
- Increased client-side complexity

#### 4. Application-Level Sharding
**Decision**: 480 logical shards mapped to 32 physical AWS RDS instances. Shard router uses simple space_id % 480 math.

**Rationale**:
- Linear scalability without code changes
- Workspace isolation for performance
- Easy to redistribute shards
- Path to physical sharding

**Tradeoffs**:
- Complex migration process
- Double-writing during migrations
- Potential for data inconsistency
- Requires careful monitoring

#### 5. Shadow Write Migration Strategy
**Decision**: Move billions of rows using "Shadow Write" strategy to keep app live during transition.

**Rationale**:
- Zero-downtime migrations
- No maintenance windows
- Gradual cutover
- Data verification before switch

**Tradeoffs**:
- Complex migration logic
- Double write overhead
- Extended migration duration
- Requires careful coordination

### Features

#### Core Features
- **Block-Based Editor**: Everything is a block
- **Nested Content**: Unlimited nesting depth
- **Databases**: Full database functionality
- **Templates**: Page and database templates
- **Collaboration**: Real-time collaboration
- **Comments**: Inline comments and discussions
- **Mentions**: @mentions for collaboration
- **History**: Page history and restore
- **Integrations**: 100+ integrations
- **API**: Public API for automation

#### Advanced Features
- **Offline Support**: Full offline editing
- **Real-time Sync**: Live updates across devices
- **Permissions**: Granular permissions
- **Workspaces**: Multi-workspace support
- **Webhooks**: Webhook integrations
- **Automation**: Automations and workflows
- **AI Features**: AI writing assistant
- **Embeds**: Rich embed support
- **Sync**: Cross-device sync
- **Export**: Multiple export formats

### What to Steal

#### Patterns That Compound
1. **Block model** - For flexible content systems
2. **Two-pointer system** - For separating concerns
3. **Transaction model** - For offline support
4. **Application-level sharding** - For scalability
5. **Shadow write migrations** - For zero downtime
6. **Optimistic UI** - For instant feedback
7. **WebSocket subscriptions** - For real-time updates
8. **RecordCache pattern** - For local caching

### What to Avoid Copying

#### Unless You're Them
1. **Full block model** - Unless you need extreme flexibility
2. **Deep nesting** - Unless you can handle performance
3. **Custom sync engine** - Unless you have domain-specific needs
4. **480 shards** - Unless you're at Notion scale
5. **Shadow writes** - Unless you need zero downtime

---

## PAYLOAD

### Positioning
Payload is the open-source, fullstack Next.js framework, giving you instant backend superpowers. It's both an app framework and a headless CMS. It's truly the Rails for TypeScript — and you get an admin panel.

### Core Architecture Pattern
**Next.js Native with Code-First Configuration**

Payload v3 represents a fundamental architectural shift. Instead of running as a standalone service, Payload now embeds directly into your Next.js application. Your CMS admin panel, API routes, and content management all live in the same codebase, deployed as one unit.

### Technology Stack

#### Core
- **Framework**: Next.js (native integration)
- **Language**: TypeScript (fully typed)
- **Database**: Postgres (via Drizzle ORM) or MongoDB
- **Admin Panel**: React (Next.js App Router)
- **Rich Text**: Lexical editor
- **API**: REST, GraphQL, and Local API
- **Auth**: Built-in authentication
- **Storage**: Local or cloud storage

#### Deployment
- **Vercel**: One-click deployment with Neon database and Vercel Blob
- **Cloudflare**: One-click deployment with Workers, R2, and D1
- **Self-hosted**: Any Node.js environment

### Key Architectural Decisions

#### 1. Next.js Native
**Decision**: Payload v3 installs as a Next.js plugin. Your admin panel renders as Next.js routes. Your API endpoints are Next.js API routes. There is no separate server to manage.

**Rationale**:
- Eliminates deployment complexity
- No CORS configuration
- No deployment coordination
- One repo, one deploy
- Full access to Next.js features

**Tradeoffs**:
- Tightly coupled to Next.js
- Non-Next frontends lose advantage
- Shared deployment risks
- Monolithic bundle size

#### 2. Database Adapter Pattern
**Decision**: Payload supports both Postgres (via Drizzle ORM) and MongoDB through adapter pattern.

**Rationale**:
- Real database choice
- Easy to switch databases
- Adapter abstraction
- Schema management handled

**Tradeoffs**:
- Limited to supported databases
- Adapter overhead
- Different capabilities per database
- Migration complexity

#### 3. Lexical Editor
**Decision**: Rich text editor built on Meta's Lexical framework, replacing previous Slate-based editor.

**Rationale**:
- Lexical is faster and more extensible
- Better maintained than Slate
- Structured JSON output
- Full control over rendering

**Tradeoffs**:
- Learning curve for Lexical
- Different from standard editors
- Custom serialization
- Plugin ecosystem smaller

#### 4. Collections and Globals
**Decision**: Content modeling uses collections (repeatable content) and globals (singleton content).

**Rationale**:
- Clear separation of concerns
- Automatic CRUD endpoints
- Admin UI generation
- TypeScript types from schema

**Tradeoffs**:
- Less flexible than block model
- Schema-first approach
- Requires planning
- Migration overhead

#### 5. Code-Based Access Control
**Decision**: Every collection, field, and operation can have granular access control functions.

**Rationale**:
- Maximum flexibility
- Type-safe permissions
- No plugin required
- Complex authorization possible

**Tradeoffs**:
- Requires TypeScript knowledge
- More complex than UI-based
- Learning curve
- Potential for errors

### Features

#### Core Features
- **Admin Panel**: Auto-generated React admin
- **Content Modeling**: Collections and globals
- **Rich Text**: Lexical editor
- **Authentication**: Built-in auth
- **Access Control**: Granular permissions
- **APIs**: REST, GraphQL, Local API
- **Hooks**: Document and field-level hooks
- **Localization**: Field-level localization
- **Versions**: Drafts and versions
- **Blocks**: Block-based layout builder

#### Advanced Features
- **Server Components**: Extend admin with RSC
- **Direct DB Access**: Query database in server components
- **Custom Endpoints**: Add your own endpoints
- **Form Builder**: Build forms in admin
- **Multi-Tenancy**: Multi-tenant support
- **File Uploads**: Local or cloud storage
- **Live Preview**: Real-time preview
- **Type Generation**: Auto-generated types
- **Extensibility**: Plugin system
- **Security**: CSRF protection, HTTP-only cookies

### What to Steal

#### Patterns That Compound
1. **Next.js native** - For Next.js projects
2. **Code-first configuration** - For version control
3. **Lexical editor** - For rich text
4. **Local API** - For server-side performance
5. **Access control functions** - For flexibility
6. **Hooks system** - For extensibility
7. **Type generation** - For type safety
8. **One-click deployment** - For developer experience

### What to Avoid Copying

#### Unless You're Them
1. **Next.js coupling** - Unless you're committed to Next.js
2. **Code-first only** - Unless you have technical users
3. **Limited databases** - Unless Postgres/Mongo work for you
4. **Monolithic deployment** - Unless you need simplicity

---

## STORYBLOK

### Positioning
Storyblok is a headless CMS that stands out for its flexible architecture, intuitive editing experience, and enterprise scalability. It's recognized as a Strong Performer in The Forrester Wave™ CMS Report.

### Core Architecture Pattern
**Headless with Visual Editor**

Storyblok's headless architecture gives you the flexibility to integrate with anything, publish everywhere, and significantly boost security and performance. It's cloud-native and built to scale.

### Technology Stack

#### Core
- **Architecture**: Headless CMS
- **Editor**: Visual editor with real-time preview
- **API**: REST API
- **CDN**: Global CDN
- **Infrastructure**: Cloud-native
- **Security**: Enterprise-grade security

#### Integrations
- **Frameworks**: All major frameworks supported
- **Channels**: Web, mobile, IoT, any digital channel
- **Composable**: Integrates with any tech stack

### Key Architectural Decisions

#### 1. Headless Architecture
**Decision**: API-first, headless CMS with visual editor.

**Rationale**:
- Framework agnostic
- Publish to any channel
- Future-proof tech stack
- Developer flexibility

**Tradeoffs**:
- Requires frontend development
- No built-in frontend
- More complex setup
- Steeper learning curve

#### 2. Cloud-Native Infrastructure
**Decision**: Built on cloud-native architecture for scalability.

**Rationale**:
- Automatic scaling
- Global availability
- High performance
- Enterprise reliability

**Tradeoffs**:
- Vendor lock-in
- Cloud costs
- Less control
- Dependency on cloud provider

#### 3. Visual Editor
**Decision**: Visual editor with real-time preview.

**Rationale**:
- Intuitive for marketers
- WYSIWYG editing
- Real-time feedback
- Better UX

**Tradeoffs**:
- Limited flexibility
- Can constrain design
- Requires frontend integration
- Preview complexity

### Features

#### Core Features
- **Visual Editor**: Real-time visual editing
- **Headless API**: REST API
- **Global CDN**: Fast content delivery
- **Multi-channel**: Publish to any channel
- **Real-time**: Live updates
- **Collaboration**: Team collaboration
- **Versioning**: Content versioning
- **Scheduling**: Scheduled publishing
- **Localization**: Multi-language support
- **Webhooks**: Webhook integrations

#### Advanced Features
- **Components**: Reusable components
- **Dynamic Layouts**: Flexible layouts
- **Asset Management**: Digital asset management
- **SEO**: SEO tools
- **Analytics**: Content analytics
- **Roles**: Role-based access
- **Workflows**: Content workflows
- **API Rate Limiting**: Rate limiting
- **Caching**: Advanced caching
- **Security**: Enterprise security

### What to Steal

#### Patterns That Compound
1. **Visual editor** - For marketer-friendly UX
2. **Headless architecture** - For flexibility
3. **Global CDN** - For performance
4. **Real-time preview** - For instant feedback
5. **Component system** - For reusability
6. **Scheduling** - For editorial workflows
7. **Localization** - For global reach
8. **Webhooks** - For integrations

### What to Avoid Copying

#### Unless You're Them
1. **Pure headless** - Unless you need framework agnostic
2. **Visual editor only** - Unless you have simple content
3. **Cloud-native only** - Unless you need auto-scaling

---

## BUILDER.IO

### Positioning
Builder.io is a visual development and content management platform that helps teams build, edit, and publish websites faster. It combines a drag-and-drop editor for marketers and designers with developer-friendly tools like a headless architecture and reusable components.

### Core Architecture Pattern
**Visual Development with Headless Backend**

Builder.io provides a visual drag-and-drop editor for marketers while maintaining a headless architecture for developers. It uses a model-based system where content is structured into Page, Section, and Data models.

### Technology Stack

#### Core
- **Architecture**: Headless CMS with visual editor
- **Models**: Page, Section, Data models
- **Editor**: Drag-and-drop visual editor
- **API**: REST API
- **Integrations**: Framework-specific integrations
- **AI**: AI-powered features

### Key Architectural Decisions

#### 1. Model-Based System
**Decision**: Use one Page model, Section models for parts of pages, and Data models for non-visual structured data.

**Rationale**:
- Clear separation of concerns
- Reusable components
- Structured content
- Developer-friendly

**Tradeoffs**:
- Less flexible than block model
- Requires planning
- Schema overhead
- Migration complexity

#### 2. Visual Editor
**Decision**: Drag-and-drop visual editor for marketers.

**Rationale**:
- Marketer-friendly
- No code required
- Fast iteration
- Visual feedback

**Tradeoffs**:
- Limited flexibility
- Can constrain design
- Requires frontend integration
- Preview complexity

#### 3. Headless Backend
**Decision**: Headless API for developers.

**Rationale**:
- Framework agnostic
- Developer control
- API-first
- Flexible integration

**Tradeoffs**:
- Requires frontend development
- More complex setup
- Steeper learning curve

### Features

#### Core Features
- **Visual Editor**: Drag-and-drop editor
- **Headless API**: REST API
- **Models**: Page, Section, Data models
- **Components**: Reusable components
- **A/B Testing**: Built-in A/B testing
- **Personalization**: Content personalization
- **Integrations**: Framework integrations
- **AI Features**: AI-powered features
- **Collaboration**: Team collaboration
- **Versioning**: Content versioning

#### Advanced Features
- **Dynamic Content**: Dynamic content loading
- **SEO**: SEO tools
- **Analytics**: Content analytics
- **Webhooks**: Webhook integrations
- **Roles**: Role-based access
- **Workflows**: Content workflows
- **Caching**: Advanced caching
- **CDN**: Global CDN
- **Security**: Enterprise security

### What to Steal

#### Patterns That Compound
1. **Model-based system** - For structured content
2. **Visual editor** - For marketer-friendly UX
3. **Headless backend** - For developer control
4. **A/B testing** - For optimization
5. **Personalization** - For targeting
6. **AI features** - For automation

### What to Avoid Copying

#### Unless You're Them
1. **Visual editor only** - Unless you have simple content
2. **Model constraints** - Unless you need structure
3. **Headless only** - Unless you need flexibility

---

## CONTENTFUL

### Positioning
Contentful is a content platform that offers a new approach to content management. It's not a CMS — it's a content infrastructure. It's designed to fit into modern software delivery pipelines connecting to workflows and services used by both developers and content creators.

### Core Architecture Pattern
**Composable Architecture with Microservices**

Contentful is built on a composable architecture where individual microservices are connected through APIs. This modularity and flexibility enables developers to reuse existing components and tap into powerful new capabilities.

### Technology Stack

#### Core
- **Architecture**: Microservices
- **APIs**: REST API, GraphQL API
- **CDN**: Global CDN
- **Database**: Sharded PostgreSQL
- **Infrastructure**: AWS
- **Real-time**: WebSocket support

#### Suggested Tech Stack
- **Frontend**: React
- **Backend**: Node.js
- **Database**: PostgreSQL
- **Search**: Elasticsearch
- **Cache**: Redis
- **Infrastructure**: AWS
- **API**: GraphQL
- **Messaging**: Kafka
- **Infrastructure as Code**: Terraform

### Key Architectural Decisions

#### 1. Composable Architecture
**Decision**: Microservices architecture with API-first design.

**Rationale**:
- Modular components
- Independent scaling
- Best-of-breed tools
- Flexibility

**Tradeoffs**:
- Increased complexity
- More infrastructure
- Distributed systems challenges
- Higher operational overhead

#### 2. Content Infrastructure
**Decision**: Treat content as a layer in the stack, not a CMS.

**Rationale**:
- API-first approach
- Developer-focused
- Integration-friendly
- Modern delivery pipelines

**Tradeoffs**:
- Less marketer-friendly
- Requires technical knowledge
- Steeper learning curve
- More setup required

#### 3. Multi-Environment
**Decision**: Separate staging and production environments via designated APIs.

**Rationale**:
- Safe deployments
- Content staging
- Workflow separation
- Risk mitigation

**Tradeoffs**:
- Increased complexity
- Content duplication
- Sync challenges
- Higher costs

#### 4. CDN-First
**Decision**: Content delivered via CDN for performance.

**Rationale**:
- Global performance
- Low latency
- High availability
- Scalability

**Tradeoffs**:
- Cache invalidation complexity
- Stale content risk
- CDN costs
- Limited real-time

### Features

#### Core Features
- **Content Modeling**: Types and fields
- **Multi-Environment**: Staging/production
- **Localization**: Multi-language
- **Content Delivery API**: CDN-backed API
- **Content Management API**: Admin API
- **App Framework**: Extensions
- **Rich Text Editor**: Rich text editing
- **Roles and Permissions**: RBAC
- **Compose**: Page builder
- **Webhooks**: Webhook integrations

#### Advanced Features
- **Launch**: Scheduling
- **AI Content**: AI-powered content
- **Workflows**: Content workflows
- **Taxonomy**: Content organization
- **Timeline**: Editorial calendar
- **Asset Management**: Digital assets
- **Marketplace**: App marketplace
- **Integrations**: 100+ integrations
- **Enterprise Features**: SSO, SCIM, audit logs
- **Compliance**: SOC2, GDPR

### What to Steal

#### Patterns That Compound
1. **Composable architecture** - For flexibility
2. **Microservices** - For independent scaling
3. **API-first** - For integration
4. **Multi-environment** - For safe deployments
5. **CDN-first** - For performance
6. **App framework** - For extensibility
7. **Marketplace** - For ecosystem
8. **Enterprise features** - For enterprise customers

### What to Avoid Copying

#### Unless You're Them
1. **Pure microservices** - Unless you need independent scaling
2. **Content infrastructure only** - Unless you have technical users
3. **CDN-only** - Unless you can handle cache invalidation

---

## DIRECTUS

### Positioning
Directus is the flexible backend for all your projects. Turn your DB into a headless CMS, admin panels, or apps with a custom UI, instant APIs, auth & more. It wraps any SQL database with a REST and GraphQL API layer and a visual Studio.

### Core Architecture Pattern
**Database-First with Auto-Generated APIs**

Directus wraps any SQL database with a dynamic API and provides an intuitive admin app for managing content. It works with new or existing SQL databases, requiring no migration.

### Technology Stack

#### Core
- **Backend**: Node.js + Express.js
- **Database**: Knex.js abstraction (PostgreSQL, MySQL, SQLite, MariaDB, MS SQL, Oracle, CockroachDB)
- **Frontend**: Vue 3 + Vite + Pinia
- **API**: REST + GraphQL + WebSocket
- **Monorepo**: pnpm workspace (60+ packages)
- **Storage**: Multiple storage drivers (S3, Azure, GCS, Cloudinary, local)

#### Architecture
- **Monorepo**: pnpm workspace
- **Packages**: 35+ shared packages
- **Node Version**: Node.js 22+
- **TypeScript**: Full TypeScript

### Key Architectural Decisions

#### 1. Database-First
**Decision**: Wrap existing SQL databases with auto-generated APIs.

**Rationale**:
- No migration required
- Use existing databases
- Schema stays intact
- No abstraction layer

**Tradeoffs**:
- Tied to database schema
- Limited schema flexibility
- Database constraints
- Migration challenges

#### 2. Policy-Based Access Control
**Decision**: Granular permissions down to the field level using policies.

**Rationale**:
- Maximum flexibility
- Code-based permissions
- No plugin required
- Complex authorization

**Tradeoffs**:
- Requires technical knowledge
- More complex than UI-based
- Learning curve
- Potential for errors

#### 3. Extension System
**Decision**: Nine extension types: hooks, interfaces, layouts, modules, endpoints, etc.

**Rationale**:
- Maximum extensibility
- No core modifications
- Community contributions
- Custom workflows

**Tradeoffs**:
- Extension complexity
- Learning curve
- Fragmentation risk
- Maintenance burden

#### 4. Native AI Integration
**Decision**: Built-in AI Assistant and native MCP server.

**Rationale**:
- AI works with live data
- Governed by same policies
- No special cases
- MCP compatibility

**Tradeoffs**:
- AI complexity
- Policy overhead
- Performance impact
- Security concerns

#### 5. Monorepo Architecture
**Decision**: pnpm workspace with 60+ packages.

**Rationale**:
- Code sharing
- Consistent tooling
- Independent releases
- Clear boundaries

**Tradeoffs**:
- Build complexity
- Dependency management
- Onboarding overhead
- Tooling overhead

### Features

#### Core Features
- **Auto-Generated APIs**: REST + GraphQL from database schema
- **Visual Studio**: Vue 3 admin dashboard
- **Multi-Database**: Support for 7+ SQL databases
- **Real-time**: WebSocket subscriptions
- **Authentication**: Local, OAuth, LDAP, SAML, OpenID
- **Permissions**: Policy-based access control
- **Extensions**: 9 extension types
- **Storage**: Multiple storage drivers
- **Flows**: Automation workflows
- **Webhooks**: Webhook integrations

#### Advanced Features
- **AI Assistant**: Built-in AI assistant
- **MCP Server**: Native MCP server
- **Data Studio**: Visual data management
- **Custom Interfaces**: Custom field inputs
- **Custom Layouts**: Custom data views
- **Custom Endpoints**: Custom API routes
- **Hooks**: Event handlers
- **Audit Logs**: Complete activity tracking
- **Rate Limiting**: Built-in protection
- **Caching**: Redis integration

### What to Steal

#### Patterns That Compound
1. **Database-first** - For existing databases
2. **Policy-based access control** - For flexibility
3. **Extension system** - For extensibility
4. **Native AI integration** - For AI-native
5. **MCP server** - For AI agents
6. **Monorepo** - For code sharing
7. **Multi-database support** - For flexibility
8. **Real-time** - For collaboration

### What to Avoid Copying

#### Unless You're Them
1. **Database-first only** - Unless you have existing databases
2. **Policy-based only** - Unless you have technical users
3. **Monorepo complexity** - Unless you need code sharing

---

## FRAMER

### Positioning
Framer is a visual development platform for building websites. It combines visual editing with code generation, allowing designers and developers to collaborate on building websites.

### Core Architecture Pattern
**Visual Development with Code Generation**

Framer provides a visual editor that generates clean code. It bridges the gap between design and development by allowing designers to build websites visually while developers can export and customize the code.

### Technology Stack

#### Core
- **Editor**: Visual drag-and-drop editor
- **Code Generation**: React/Next.js code
- **Hosting**: Built-in hosting
- **CMS**: Built-in CMS
- **E-commerce**: Built-in e-commerce
- **Animations**: Advanced animations

### Key Architectural Decisions

#### 1. Visual Editor
**Decision**: Visual drag-and-drop editor for designers.

**Rationale**:
- Designer-friendly
- No code required
- Fast iteration
- Visual feedback

**Tradeoffs**:
- Limited flexibility
- Can constrain design
- Code quality concerns
- Developer handoff challenges

#### 2. Code Generation
**Decision**: Generate clean React/Next.js code.

**Rationale**:
- Developer control
- Customizable
- Production-ready
- Exportable

**Tradeoffs**:
- Generation complexity
- Maintenance challenges
- Version control issues
- Round-trip editing

#### 3. Built-in Features
**Decision**: Built-in CMS, e-commerce, hosting.

**Rationale**:
- All-in-one solution
- Easy setup
- Integrated experience
- Fast time to market

**Tradeoffs**:
- Vendor lock-in
- Limited flexibility
- Feature constraints
- Migration challenges

### Features

#### Core Features
- **Visual Editor**: Drag-and-drop editor
- **Code Generation**: React/Next.js code
- **CMS**: Built-in CMS
- **Hosting**: Built-in hosting
- **E-commerce**: Built-in e-commerce
- **Animations**: Advanced animations
- **Templates**: Design templates
- **Collaboration**: Team collaboration
- **SEO**: SEO tools
- **Analytics**: Built-in analytics

#### Advanced Features
- **Components**: Reusable components
- **Design System**: Design system support
- **Integrations**: Third-party integrations
- **Custom Code**: Custom code support
- **Versioning**: Design versioning
- **Publishing**: One-click publishing
- **Domains**: Custom domains
- **SSL**: SSL certificates

### What to Steal

#### Patterns That Compound
1. **Visual editor** - For designer-friendly UX
2. **Code generation** - For developer control
3. **Built-in features** - For all-in-one experience
4. **Animations** - For visual polish
5. **Templates** - For quick start

### What to Avoid Copying

#### Unless You're Them
1. **Visual editor only** - Unless you have simple content
2. **Code generation** - Unless you can handle maintenance
3. **Built-in only** - Unless you need all-in-one

---

## COMPARATIVE ANALYSIS

### Architecture Comparison

| Platform | Core Pattern | Database | API | Real-time | AI | Multi-tenant |
|----------|--------------|----------|-----|-----------|-----|--------------|
| **Linear** | Local-first sync | Postgres (sharded) | GraphQL + custom | WebSocket | Vector search | Workspace sharding |
| **Notion** | Block graph | Postgres (480 shards) | REST | WebSocket | AI assistant | Workspace isolation |
| **Payload** | Next.js native | Postgres/Mongo | REST + GraphQL + Local | - | - | Multi-tenant |
| **Storyblok** | Headless visual | - | REST | Real-time | - | - |
| **Builder.io** | Visual headless | - | REST | - | AI features | - |
| **Contentful** | Composable microservices | Postgres (sharded) | REST + GraphQL | - | AI content | Multi-environment |
| **Directus** | Database-first | 7+ SQL databases | REST + GraphQL + WebSocket | WebSocket | AI + MCP | Multi-tenant |
| **Framer** | Visual code gen | - | - | - | - | - |

### Feature Comparison

#### Core CMS Features
| Feature | Linear | Notion | Payload | Storyblok | Builder.io | Contentful | Directus | Framer |
|---------|--------|--------|--------|----------|-----------|-----------|---------|--------|
| **Content Modeling** | - | Block model | Collections/Globals | Components | Models | Types/Fields | Database schema | - |
| **Visual Editor** | - | - | - | Yes | Yes | - | Yes | Yes |
| **Rich Text** | ProseMirror | Custom | Lexical | - | - | Rich text | - | - |
| **Real-time Sync** | Yes | Yes | - | Yes | - | - | Yes | - |
| **Offline Support** | Yes | Yes | - | - | - | - | - | - |
| **API** | GraphQL | REST | REST + GraphQL + Local | REST | REST | REST + GraphQL | REST + GraphQL | - |
| **Auth** | SAML/SSO | SSO | Built-in | SSO | - | SSO/SCIM | OAuth/LDAP/SAML | - |
| **Permissions** | RBAC | Granular | Code-based | RBAC | RBAC | RBAC | Policy-based | - |
| **Multi-language** | - | Yes | Yes | Yes | - | Yes | - | - |
| **Webhooks** | Yes | Yes | - | Yes | - | Yes | Yes | - |

#### Advanced Features
| Feature | Linear | Notion | Payload | Storyblok | Builder.io | Contentful | Directus | Framer |
|---------|--------|--------|--------|----------|-----------|-----------|---------|--------|
| **AI Integration** | Vector search | AI assistant | - | - | AI features | AI content | AI + MCP | - |
| **Local-First** | Yes | Yes | - | - | - | - | - | - |
| **Workspace System** | Yes | Yes | Multi-tenant | - | - | Multi-env | Multi-tenant | - |
| **Plugin System** | - | - | Yes | - | - | App framework | Extensions | - |
| **Extension System** | - | - | Yes | - | - | App framework | Extensions | - |
| **Command Palette** | Yes | Yes | - | - | - | - | - | - |
| **Global Search** | Yes | Yes | - | - | - | - | - | - |
| **Activity Feed** | Yes | Yes | - | - | - | Audit logs | Audit logs | - |
| **Review System** | - | - | - | - | - | Workflows | Flows | - |
| **Scheduled Publishing** | - | - | - | Yes | - | Launch | - | - |
| **Draft Center** | - | - | Versions | - | - | - | - | - |
| **Dashboard** | - | - | - | - | - | - | - | - |
| **Quick Actions** | - | - | - | - | - | - | - | - |

### Technology Stack Comparison

#### Frontend
| Platform | Framework | Language | State | Rich Text |
|----------|----------|----------|-------|-----------|
| **Linear** | React | TypeScript | MobX | ProseMirror |
| **Notion** | React | TypeScript | Redux/Custom | Custom |
| **Payload** | Next.js | TypeScript | - | Lexical |
| **Storyblok** | - | - | - | - |
| **Builder.io** | - | - | - | - |
| **Contentful** | React | TypeScript | - | Rich text |
| **Directus** | Vue 3 | TypeScript | Pinia | - |
| **Framer** | React | - | - | - |

#### Backend
| Platform | Runtime | Database | API | Real-time |
|----------|---------|----------|-----|-----------|
| **Linear** | Node.js | Postgres | GraphQL + custom | WebSocket |
| **Notion** | Node.js | Postgres | REST | WebSocket |
| **Payload** | Next.js | Postgres/Mongo | REST + GraphQL + Local | - |
| **Storyblok** | - | - | REST | Real-time |
| **Builder.io** | - | - | REST | - |
| **Contentful** | Node.js | Postgres | REST + GraphQL | - |
| **Directus** | Node.js | 7+ SQL | REST + GraphQL + WebSocket | WebSocket |
| **Framer** | - | - | - | - |

### Decision Rationale

#### For Project Neo

**Steal from Linear:**
1. **Local-first architecture** - For AI-native, write-heavy operations
2. **Workspace sharding** - For multi-tenant agency platform
3. **Command palette** - For power user experience
4. **Global search** - For large content libraries
5. **Activity feed** - For collaboration
6. **Keyboard-first** - For productivity

**Steal from Notion:**
1. **Block model** - For flexible content composition
2. **Two-pointer system** - For separating rendering from permissions
3. **Transaction model** - For offline support and conflict resolution
4. **Real-time sync** - For collaboration
5. **Nested content** - For complex page structures

**Steal from Payload:**
1. **Next.js native** - For seamless integration
2. **Code-first configuration** - For version control
3. **Lexical editor** - For rich text
4. **Access control functions** - For maximum flexibility
5. **Hooks system** - For extensibility
6. **Type generation** - For type safety
7. **Local API** - For server-side performance

**Steal from Contentful:**
1. **Composable architecture** - For flexibility
2. **App framework** - For extensibility
3. **Marketplace** - For ecosystem
4. **Enterprise features** - For enterprise customers
5. **Multi-environment** - For safe deployments

**Steal from Directus:**
1. **Policy-based access control** - For field-level permissions
2. **Extension system** - For maximum extensibility
3. **Native AI integration** - For AI-native
4. **MCP server** - For AI agents
5. **Multi-database support** - For flexibility
6. **Real-time** - For collaboration

**Steal from Storyblok:**
1. **Visual editor** - For marketer-friendly UX
2. **Real-time preview** - For instant feedback
3. **Component system** - For reusability

**Steal from Builder.io:**
1. **Model-based system** - For structured content
2. **A/B testing** - For optimization
3. **Personalization** - For targeting

**Steal from Framer:**
1. **Visual polish** - For premium UX
2. **Animations** - For micro-interactions
3. **Templates** - For quick start

### What to Avoid

#### Unless You're at Scale
1. **Linear's custom sync engine** - Use generic CRDTs or existing solutions
2. **Notion's 480 shards** - Start with logical sharding
3. **Contentful's pure microservices** - Use modular monolith initially
4. **Directus's database-first only** - Support both database-first and schema-first

#### Unless You Have Domain-Specific Needs
1. **Linear's domain-specific merge** - Use generic solutions
2. **Notion's block model complexity** - Simplify for CMS use cases
3. **Payload's Next.js coupling** - Support multiple frameworks

#### Unless You Need It
1. **Linear's WebSocket-only** - Support polling/SSE for simpler use cases
2. **Notion's full local-first** - Use hybrid approach for CMS
3. **Contentful's CDN-only** - Support real-time for collaboration

---

## NEXT STEPS

1. **Complete feature matrix** - 500+ features compared across all platforms
2. **Design AI architecture** - Provider abstraction, gateway, streaming, context, memory, prompt system, agents, tool calling, MCP
3. **Design Studio UX** - Dashboard, quick actions, recent content, draft center, scheduled publishing, activity feed, team workspace, command palette, spotlight search, AI assistant, global search
4. **Design plugin architecture** - Plugin system with hooks, lifecycle, marketplace
5. **Design extension architecture** - Extension system
6. **Design permission system** - RBAC with field-level and document-level permissions
7. **Design navigation architecture** - Navigation system
8. **Design workspace system** - Workspace system
9. **Design review system** - Review system
10. **Generate full architecture** - After all research and analysis
