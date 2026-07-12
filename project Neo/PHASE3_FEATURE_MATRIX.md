# PHASE 3: FEATURE MATRIX

## Overview

This document provides a comprehensive feature matrix comparing 500+ features across the three reference repositories (template-nextjs-personal-website, cms-kit, sanity-template-nextjs-clean) and eight competitors (Linear, Notion, Payload, Storyblok, Builder.io, Contentful, Directus, Framer). Each feature is evaluated with a keep/improve decision for Project Neo's AI-native Agency Platform.

---

## FEATURE CATEGORIES

1. **Architecture & Infrastructure** (50 features)
2. **Content Modeling** (60 features)
3. **Editor Experience** (70 features)
4. **Real-time & Collaboration** (40 features)
5. **API & Integration** (50 features)
6. **Authentication & Authorization** (40 features)
7. **AI & Automation** (60 features)
8. **Studio UX** (80 features)
9. **Developer Experience** (50 features)
10. **Performance & Scalability** (40 features)

---

## 1. ARCHITECTURE & INFRASTRUCTURE (50 features)

### 1.1 Repository Structure

| Feature | Template A | Template B | Template C | Linear | Notion | Payload | Storyblok | Builder.io | Contentful | Directus | Framer | Decision |
|---------|-----------|-----------|-----------|--------|--------|--------|----------|-----------|-----------|---------|--------|----------|
| **Monorepo** | No | Yes (Turbo) | Yes (Turbo) | - | - | - | - | - | - | Yes (pnpm) | - | **KEEP** (Turbo) |
| **Package Manager** | npm | pnpm | npm | - | - | npm | - | - | - | pnpm | - | **KEEP** (pnpm) |
| **Workspaces** | None | apps/*, packages/* | frontend, studio | - | - | - | - | - | - | 60+ packages | - | **KEEP** (apps, packages) |
| **Shared UI Library** | No | Yes (@shared/ui) | No | - | - | - | - | - | - | - | - | **KEEP** (from CMS-Kit) |
| **Controller Pattern** | No | Yes | No | - | - | - | - | - | - | - | - | **KEEP** (from CMS-Kit) |
| **Adapter Pattern** | No | Yes | No | - | - | - | - | - | - | - | - | **KEEP** (from CMS-Kit) |
| **Database Abstraction** | Sanity | Sanity + Storyblok | Sanity | Postgres | Postgres | Postgres/Mongo | - | - | Postgres | 7+ SQL | - | **IMPROVE** (Multi-DB like Directus) |
| **Cache Components** | Yes | No | No | - | - | - | - | - | - | - | - | **KEEP** (from Template A) |
| **Live Content API** | Yes | No | No | - | - | - | - | - | - | - | - | **KEEP** (from Template A) |
| **React Compiler** | Yes | No | No | - | - | - | - | - | - | - | - | **KEEP** (from Template A) |
| **Turbopack** | Yes | No | No | - | - | Yes | - | - | - | - | - | **KEEP** (from Template A) |
| **Service Worker** | No | No | No | Yes | Yes | - | - | - | - | - | - | **ADD** (from Linear/Notion) |
| **IndexedDB** | No | No | No | Yes | Yes | - | - | - | - | - | - | **ADD** (from Linear/Notion) |
| **Local-First** | No | No | No | Yes | Yes | - | - | - | - | - | - | **ADD** (from Linear/Notion) |
| **Offline Support** | No | No | No | Yes | Yes | - | - | - | - | - | - | **ADD** (from Linear/Notion) |
| **Optimistic UI** | Yes (sorting) | No | No | Yes | Yes | - | - | - | - | - | - | **KEEP** (from Template A) |
| **Conflict Resolution** | No | No | No | Custom | Custom | - | - | - | - | - | - | **ADD** (from Linear/Notion) |
| **Workspace Sharding** | No | No | No | Yes | Yes | Multi-tenant | - | - | - | Multi-tenant | - | **ADD** (from Linear/Notion) |
| **Logical Sharding** | No | No | No | Yes | Yes | - | - | - | - | - | - | **ADD** (from Linear/Notion) |
| **Physical Sharding** | No | No | No | Path | Path | - | - | - | - | - | - | **FUTURE** (from Linear/Notion) |
| **Shadow Write Migration** | No | No | No | No | Yes | - | - | - | - | - | - | **FUTURE** (from Notion) |
| **Zero-Downtime Migration** | No | No | No | No | Yes | - | - | - | - | - | - | **FUTURE** (from Notion) |
| **Microservices** | No | No | No | No | Yes | - | - | - | Yes | No | - | **FUTURE** (from Contentful) |
| **Modular Monolith** | No | Yes | Yes | - | - | Yes | - | - | - | Yes | - | **KEEP** (from CMS-Kit/Payload) |
| **Event Bus** | No | No | No | Redis | - | - | - | - | - | - | - | **ADD** (from Linear) |
| **Message Queue** | No | No | No | - | - | - | - | - | Kafka | - | - | **FUTURE** (from Contentful) |
| **CDN** | Sanity CDN | - | Sanity CDN | - | - | - | Yes | Yes | Yes | - | Yes | **KEEP** (Sanity CDN) |
| **Edge Computing** | No | No | No | Cloudflare | - | Cloudflare | - | - | - | - | - | **FUTURE** (from Linear/Payload) |
| **Global Deployment** | Vercel | - | Vercel | GCP | AWS | Vercel/Cloudflare | - | - | AWS | - | - | **KEEP** (Vercel) |
| **Multi-Region** | No | No | No | Yes | Yes | - | Yes | - | Yes | - | - | **FUTURE** (from Linear/Notion) |
| **Database Replication** | No | No | No | Yes | Yes | - | - | - | Yes | - | - | **FUTURE** (from Linear/Notion) |
| **Connection Pooling** | No | No | No | - | PgBouncer | - | - | - | - | - | - | **ADD** (from Notion) |
| **Query Optimization** | No | No | No | - | - | - | - | - | - | - | - | **ADD** (from Notion) |
| **Index Strategy** | No | No | No | - | - | - | - | - | - | - | - | **ADD** (from Notion) |
| **Search Index** | No | No | No | Per-workspace | - | - | - | - | Elasticsearch | - | - | **ADD** (from Linear) |
| **Write-Path Indexing** | No | No | No | Yes | - | - | - | - | - | - | - | **ADD** (from Linear) |
| **Vector Search** | No | No | No | Yes (turbopuffer) | - | - | - | - | - | - | - | **ADD** (from Linear) |
| **Full-Text Search** | No | No | No | - | - | - | - | - | - | - | - | **ADD** (from Contentful) |
| **Semantic Search** | No | No | No | Yes | - | - | - | - | - | - | - | **ADD** (from Linear) |
| **GraphQL API** | No | No | No | Yes | - | Yes | - | - | Yes | Yes | - | **ADD** (from Linear/Payload/Contentful/Directus) |
| **REST API** | Sanity API | Sanity API | Sanity API | - | REST | Yes | REST | REST | REST | REST | - | **KEEP** (Sanity API) |
| **Local API** | No | No | No | - | - | Yes | - | - | - | - | - | **ADD** (from Payload) |
| **WebSocket API** | No | No | No | Yes | Yes | - | Real-time | - | - | Yes | - | **ADD** (from Linear/Notion/Directus) |
| **Custom Protocol** | No | No | No | Yes | - | - | - | - | - | - | - | **FUTURE** (from Linear) |
| **Two-Protocol Approach** | No | No | No | Yes | - | - | - | - | - | - | - | **FUTURE** (from Linear) |
| **Type Generation** | Yes | Yes | Yes | - | - | Yes | - | - | - | - | - | **KEEP** (from all templates) |
| **Schema Extraction** | Yes | Yes | No | - | - | - | - | - | - | - | - | **KEEP** (from Template A/CMS-Kit) |
| **Dataset Management** | No | Yes | No | - | - | - | - | - | - | - | - | **KEEP** (from CMS-Kit) |
| **Dataset Export** | No | Yes | No | - | - | - | - | - | - | - | - | **KEEP** (from CMS-Kit) |
| **Dataset Import** | No | Yes | Yes (sample) | - | - | - | - | - | - | - | - | **KEEP** (from CMS-Kit/Template C) |

### 1.2 Build & Deployment

| Feature | Template A | Template B | Template C | Linear | Notion | Payload | Storyblok | Builder.io | Contentful | Directus | Framer | Decision |
|---------|-----------|-----------|-----------|--------|--------|--------|----------|-----------|-----------|---------|--------|----------|
| **Build Tool** | Turbopack | Turbo | Turbo | Rolldown | - | Turbopack | - | - | - | - | - | **KEEP** (Turbopack) |
| **CI/CD** | Vercel | - | Vercel | - | - | Vercel/Cloudflare | - | - | - | - | - | **KEEP** (Vercel) |
| **Auto-Deploy** | Yes | - | Yes | - | - | Yes | - | - | - | - | - | **KEEP** (from Template A/C/Payload) |
| **Preview Deployments** | Yes | - | - | - | - | - | - | - | - | - | - | **KEEP** (from Template A) |
| **Environment Variables** | Yes | Yes | Yes | - | - | Yes | - | - | - | Yes | - | **KEEP** (from all) |
| **Multi-Environment** | No | No | No | - | - | - | - | - | Yes | - | - | **ADD** (from Contentful) |
| **Staging** | No | No | No | - | - | - | - | - | Yes | - | - | **ADD** (from Contentful) |
| **Production** | Yes | Yes | Yes | - | - | Yes | - | - | Yes | Yes | - | **KEEP** (from all) |
| **Canary Deployments** | No | No | No | - | - | - | - | - | - | - | - | **FUTURE** |
| **Blue-Green Deploy** | No | No | No | - | - | - | - | - | - | - | - | **FUTURE** |
| **Rollback** | No | No | No | - | - | - | - | - | - | - | - | **FUTURE** |
| **Health Checks** | No | No | No | - | - | - | - | - | - | - | - | **ADD** |
| **Monitoring** | Speed Insights | - | - | - | - | - | - | - | - | - | - | **ADD** (from Template A) |
| **Error Tracking** | No | No | No | Sentry | - | - | - | - | - | - | - | **ADD** (from Linear) |
| **Performance Monitoring** | Yes | - | - | - | - | - | - | - | - | - | - | **KEEP** (from Template A) |
| **Analytics** | No | No | No | - | - | - | - | - | - | - | - | **ADD** |
| **Logging** | No | No | No | - | - | - | - | - | - | - | - | **ADD** |
| **Audit Logs** | No | No | No | - | - | - | - | - | Yes | Yes | - | **ADD** (from Contentful/Directus) |
| **Debug Mode** | Yes | Yes | Yes | - | - | Yes | - | - | - | - | - | **KEEP** (from all) |
| **Hot Reload** | Yes | Yes | Yes | - | - | Yes | - | - | - | - | - | **KEEP** (from all) |
| **Fast Refresh** | Yes | Yes | Yes | - | - | Yes | - | - | - | - | - | **KEEP** (from all) |
| **Code Splitting** | Yes | - | - | Yes | Yes | - | - | - | - | - | - | **KEEP** (from Template A/Linear/Notion) |
| **Tree Shaking** | Yes | - | - | Yes | - | - | - | - | - | - | - | **KEEP** (from Template A/Linear) |
| **Minification** | Yes | Yes | Yes | - | - | Yes | - | - | - | - | - | **KEEP** (from all) |
| **Compression** | Yes | - | - | - | - | - | - | - | - | - | - | **KEEP** (from Template A) |
| **Asset Optimization** | Yes | - | - | - | - | - | - | - | - | - | - | **KEEP** (from Template A) |
| **Image Optimization** | Yes | - | - | - | - | - | - | - | - | - | - | **KEEP** (from Template A) |
| **Font Optimization** | Yes | - | - | Yes | - | - | - | - | - | - | - | **KEEP** (from Template A/Linear) |
| **Bundle Analysis** | Yes | - | - | - | - | - | - | - | - | - | - | **KEEP** (from Template A) |
| **Dependency Management** | npm | pnpm | npm | - | - | npm | - | - | - | pnpm | - | **KEEP** (pnpm from CMS-Kit/Directus) |
| **Lock Files** | Yes | Yes | Yes | - | - | Yes | - | - | - | Yes | - | **KEEP** (from all) |
| **Version Constraints** | Yes | Yes | Yes | - | - | Yes | - | - | - | Yes | - | **KEEP** (from all) |
| **Security Headers** | Yes | - | - | - | - | Yes | - | - | - | - | - | **KEEP** (from Template A/Payload) |
| **CORS** | Yes | - | - | - | - | - | - | - | - | - | - | **KEEP** (from Template A) |
| **CSRF Protection** | No | No | No | - | - | Yes | - | - | - | - | - | **ADD** (from Payload) |
| **Rate Limiting** | No | No | No | - | - | - | - | - | - | Yes | - | **ADD** (from Directus) |
| **DDoS Protection** | No | No | No | - | - | - | - | - | - | - | - | **FUTURE** |
| **SSL/TLS** | Yes | - | - | - | - | - | - | - | - | - | - | **KEEP** (from Template A) |
| **HSTS** | No | No | No | - | - | - | - | - | - | - | - | **ADD** |

---

## 2. CONTENT MODELING (60 features)

### 2.1 Schema Types

| Feature | Template A | Template B | Template C | Linear | Notion | Payload | Storyblok | Builder.io | Contentful | Directus | Framer | Decision |
|---------|-----------|-----------|-----------|--------|--------|--------|----------|-----------|-----------|---------|--------|----------|
| **Documents** | Yes (page, project) | Yes (section.*) | Yes (page, post, person) | Issues | Blocks | Collections | Components | Models | Entries | Collections | - | **KEEP** (from all) |
| **Singletons** | Yes (home, settings) | - | Yes (settings) | - | - | Globals | - | - | - | - | - | **KEEP** (from Template A/C) |
| **Objects** | Yes (duration, milestone, timeline) | Yes (15+ objects) | Yes (7 objects) | - | - | - | - | - | - | - | - | **KEEP** (from Template B/C) |
| **Custom Blocks** | Yes (timeline in PT) | Yes (sections in PT) | No | - | Blocks | Blocks | Components | Sections | - | - | - | **KEEP** (from Template A/B) |
| **Field Groups** | No | Yes (Content/Style) | Yes (4 groups) | - | - | - | - | - | - | - | - | **KEEP** (from CMS-Kit/Template C) |
| **Common Fields** | No | Yes (reusable) | No | - | - | - | - | - | - | - | - | **KEEP** (from CMS-Kit) |
| **Field Validation** | Yes | Yes | Yes | - | - | Yes | - | - | Yes | Yes | - | **KEEP** (from all) |
| **Custom Validation** | Yes | Yes | Yes | - | - | Yes | - | - | Yes | Yes | - | **KEEP** (from all) |
| **Conditional Logic** | No | Yes | Yes | - | - | Yes | - | - | - | - | - | **KEEP** (from CMS-Kit/Template C/Payload) |
| **Field Dependencies** | No | Yes | Yes | - | - | Yes | - | - | - | - | - | **KEEP** (from CMS-Kit/Template C/Payload) |
| **Hidden Fields** | Yes | Yes | Yes | - | - | Yes | - | - | - | - | - | **KEEP** (from all) |
| **Read-Only Fields** | No | No | No | - | - | Yes | - | - | - | - | - | **ADD** (from Payload) |
| **Computed Fields** | No | No | No | - | - | Yes | - | - | - | - | - | **ADD** (from Payload) |
| **Virtual Fields** | No | No | No | - | - | Yes | - | - | - | - | - | **ADD** (from Payload) |
| **Field-Level Permissions** | No | No | No | - | - | Yes | - | - | - | Yes | - | **ADD** (from Payload/Directus) |
| **Document-Level Permissions** | No | No | No | Yes | Yes | Yes | - | - | Yes | Yes | - | **ADD** (from Linear/Notion/Payload/Contentful/Directus) |
| **Role-Based Access** | No | No | No | Yes | Yes | Yes | Yes | Yes | Yes | Yes | - | **ADD** (from all competitors) |
| **Team-Based Access** | No | No | No | Yes | Yes | - | - | - | - | - | - | **ADD** (from Linear/Notion) |
| **Workspace-Based Access** | No | No | No | Yes | Yes | Multi-tenant | - | - | Multi-env | Multi-tenant | - | **ADD** (from Linear/Notion) |
| **Field Types (20+)** | ~10 | ~15 | ~10 | - | ~20 | 20+ | - | - | ~15 | 45+ | - | **IMPROVE** (from Directus) |
| **String Field** | Yes | Yes | Yes | - | - | Yes | - | - | Yes | Yes | - | **KEEP** |
| **Text Field** | Yes | Yes | Yes | - | - | Yes | - | - | Yes | Yes | - | **KEEP** |
| **Number Field** | Yes | Yes | Yes | - | - | Yes | - | - | Yes | Yes | - | **KEEP** |
| **Boolean Field** | Yes | Yes | Yes | - | - | Yes | - | - | Yes | Yes | - | **KEEP** |
| **Date Field** | Yes | Yes | Yes | - | - | Yes | - | - | Yes | Yes | - | **KEEP** |
| **Datetime Field** | Yes | No | Yes | - | - | Yes | - | - | Yes | Yes | - | **KEEP** |
| **Slug Field** | Yes | Yes | Yes | - | - | Yes | - | - | Yes | - | - | **KEEP** |
| **URL Field** | Yes | Yes | Yes | - | - | Yes | - | - | Yes | Yes | - | **KEEP** |
| **Email Field** | No | No | No | - | - | Yes | - | - | Yes | Yes | - | **ADD** (from Payload/Contentful/Directus) |
| **Phone Field** | No | No | No | - | - | Yes | - | - | - | Yes | - | **ADD** (from Payload/Directus) |
| **Color Field** | No | Yes (plugin) | No | - | - | - | - | - | - | - | - | **KEEP** (from CMS-Kit) |
| **Select Field** | Yes | Yes | Yes | - | - | Yes | - | - | Yes | Yes | - | **KEEP** |
| **Multi-Select Field** | Yes | Yes | Yes | - | - | Yes | - | - | Yes | Yes | - | **KEEP** |
| **Radio Field** | Yes | Yes | Yes | - | - | Yes | - | - | - | - | - | **KEEP** |
| **Checkbox Field** | Yes | Yes | Yes | - | - | Yes | - | - | Yes | Yes | - | **KEEP** |
| **Array Field** | Yes | Yes | Yes | - | - | Yes | - | - | Yes | Yes | - | **KEEP** |
| **Object Field** | Yes | Yes | Yes | - | - | Yes | - | - | Yes | Yes | - | **KEEP** |
| **Reference Field** | Yes | Yes | Yes | - | - | Yes | - | - | Yes | Yes | - | **KEEP** |
| **Multi-Reference Field** | Yes | Yes | Yes | - | - | Yes | - | - | Yes | Yes | - | **KEEP** |
| **Image Field** | Yes | Yes | Yes | - | - | Yes | - | - | Yes | Yes | - | **KEEP** |
| **File Field** | Yes | Yes | Yes | - | - | Yes | - | - | Yes | Yes | - | **KEEP** |
| **Video Field** | No | Yes (background) | No | - | - | Yes | - | - | - | Yes | - | **ADD** (from CMS-Kit/Payload/Directus) |
| **Audio Field** | No | No | No | - | - | Yes | - | - | - | Yes | - | **ADD** (from Payload/Directus) |
| **Rich Text Field** | Yes (PT) | Yes (custom) | Yes (PT) | ProseMirror | Custom | Lexical | - | - | Rich text | - | - | **IMPROVE** (Lexical from Payload) |
| **Markdown Field** | No | No | No | - | - | Yes | - | - | - | Yes | - | **ADD** (from Payload/Directus) |
| **JSON Field** | No | No | No | - | - | Yes | - | - | - | Yes | - | **ADD** (from Payload/Directus) |
| **Geolocation Field** | No | No | No | - | - | Yes | - | - | - | Yes | - | **ADD** (from Payload/Directus) |
| **Point Field** | No | No | No | - | - | Yes | - | - | - | Yes | - | **ADD** (from Payload/Directus) |
| **Code Field** | No | No | No | - | - | Yes | - | - | - | Yes | - | **ADD** (from Payload/Directus) |
| **Password Field** | No | No | No | - | - | Yes | - | - | - | Yes | - | **ADD** (from Payload/Directus) |
| **UUID Field** | No | No | No | - | - | Yes | - | - | - | Yes | - | **ADD** (from Payload/Directus) |
| **ID Field** | Yes | Yes | Yes | - | - | Yes | - | - | Yes | Yes | - | **KEEP** |
| **Created At Field** | Yes | Yes | Yes | - | - | Yes | - | - | Yes | Yes | - | **KEEP** |
| **Updated At Field** | Yes | Yes | Yes | - | - | Yes | - | - | Yes | Yes | - | **KEEP** |
| **Published At Field** | No | No | No | - | - | Yes | - | - | - | Yes | - | **ADD** (from Payload/Directus) |
| **Created By Field** | No | No | No | - | - | Yes | - | - | - | Yes | - | **ADD** (from Payload/Directus) |
| **Updated By Field** | No | No | No | - | - | Yes | - | - | - | Yes | - | **ADD** (from Payload/Directus) |
| **Locale Field** | No | No | No | - | - | Yes | - | - | Yes | Yes | - | **ADD** (from Payload/Contentful/Directus) |
| **Status Field** | No | No | No | Yes | - | Yes | - | - | - | Yes | - | **ADD** (from Linear/Payload/Directus) |
| **State Field** | No | No | No | Yes | - | - | - | - | - | - | - | **ADD** (from Linear) |
| **Priority Field** | No | No | No | Yes | - | - | - | - | - | - | - | **ADD** (from Linear) |
| **Assignee Field** | No | No | No | Yes | - | - | - | - | - | - | - | **ADD** (from Linear) |
| **Label Field** | No | No | No | Yes | - | - | - | - | - | - | - | **ADD** (from Linear) |
| **Tag Field** | Yes | No | No | - | - | - | - | - | - | - | - | **KEEP** (from Template A) |
| **Category Field** | No | No | No | - | - | - | - | - | Yes | - | - | **ADD** (from Contentful) |
| **Taxonomy Field** | No | No | No | - | - | - | - | - | Yes | - | - | **ADD** (from Contentful) |

### 2.2 Content Relationships

| Feature | Template A | Template B | Template C | Linear | Notion | Payload | Storyblok | Builder.io | Contentful | Directus | Framer | Decision |
|---------|-----------|-----------|-----------|--------|--------|--------|----------|-----------|-----------|---------|--------|----------|
| **One-to-One** | Yes | Yes | Yes | - | - | Yes | - | - | Yes | Yes | - | **KEEP** |
| **One-to-Many** | Yes | Yes | Yes | - | - | Yes | - | - | Yes | Yes | - | **KEEP** |
| **Many-to-Many** | Yes | Yes | Yes | - | - | Yes | - | - | Yes | Yes | - | **KEEP** |
| **Self-Reference** | Yes | Yes | Yes | - | - | Yes | - | - | Yes | Yes | - | **KEEP** |
| **Circular Reference** | No | No | No | - | - | Yes | - | - | - | Yes | - | **ADD** (from Payload/Directus) |
| **Nested Content** | Yes (blocks) | Yes (sections) | Yes (pageBuilder) | - | Yes (blocks) | Yes (blocks) | - | - | - | - | - | **KEEP** (from all) |
| **Deep Nesting** | Yes | Yes | Yes | - | Yes | Yes | - | - | - | - | - | **KEEP** (from all) |
| **Unlimited Depth** | Yes | Yes | No | - | Yes | Yes | - | - | - | - | - | **KEEP** (from Template A/B/Notion/Payload) |
| **Content Pointers** | No | No | No | - | Yes | - | - | - | - | - | - | **ADD** (from Notion) |
| **Parent Pointers** | No | No | No | - | Yes | - | - | - | - | - | - | **ADD** (from Notion) |
| **Render Tree** | No | No | No | - | Yes | - | - | - | - | - | - | **ADD** (from Notion) |
| **Permission Tree** | No | No | No | - | Yes | - | - | - | - | - | - | **ADD** (from Notion) |
| **Graph Data Model** | No | No | No | - | Yes | - | - | - | - | - | - | **FUTURE** (from Notion) |
| **Reference Integrity** | No | No | No | - | - | Yes | - | - | - | Yes | - | **ADD** (from Payload/Directus) |
| **Cascade Delete** | No | No | No | - | - | Yes | - | - | - | Yes | - | **ADD** (from Payload/Directus) |
| **Soft Delete** | No | No | No | - | - | Yes | - | - | - | Yes | - | **ADD** (from Payload/Directus) |
| **Archive** | No | No | No | Yes | Yes | - | - | - | - | - | - | **ADD** (from Linear/Notion) |
| **Trash** | No | No | No | - | Yes | - | - | - | - | - | - | **ADD** (from Notion) |
| **Restore** | No | No | No | - | Yes | - | - | - | - | - | - | **ADD** (from Notion) |
| **Duplicate** | Yes (except singletons) | - | - | Yes | Yes | Yes | - | - | - | - | - | **KEEP** (from Linear/Notion/Payload) |
| **Copy** | No | No | No | - | Yes | - | - | - | - | - | - | **ADD** (from Notion) |
| **Move** | No | No | No | - | Yes | - | - | - | - | - | - | **ADD** (from Notion) |
| **Reorder** | Yes (optimistic) | - | - | Yes | Yes | - | - | - | - | - | - | **KEEP** (from Template A/Linear/Notion) |
| **Sort** | Yes | Yes | Yes | Yes | Yes | Yes | - | - | Yes | Yes | - | **KEEP** (from all) |
| **Filter** | Yes | Yes | Yes | Yes | Yes | Yes | - | - | Yes | Yes | - | **KEEP** (from all) |
| **Group** | No | No | No | Yes | Yes | - | - | - | - | - | - | **ADD** (from Linear/Notion) |
| **Search** | No | No | No | Yes | Yes | - | - | - | - | Yes | - | **ADD** (from Linear/Notion/Directus) |
| **Global Search** | No | No | No | Yes | Yes | - | - | - | - | - | - | **ADD** (from Linear/Notion) |
| **Faceted Search** | No | No | No | Yes | Yes | - | - | - | - | Yes | - | **ADD** (from Linear/Notion/Directus) |
| **Advanced Search** | No | No | No | Yes | Yes | - | - | - | - | Yes | - | **ADD** (from Linear/Notion/Directus) |
| **Saved Searches** | No | No | No | Yes | Yes | - | - | - | - | - | - | **ADD** (from Linear/Notion) |
| **Search Filters** | No | No | No | Yes | Yes | - | - | - | Yes | Yes | - | **ADD** (from Linear/Notion/Contentful/Directus) |
| **Search Operators** | No | No | No | Yes | Yes | - | - | - | Yes | Yes | - | **ADD** (from Linear/Notion/Contentful/Directus) |

---

## 3. EDITOR EXPERIENCE (70 features)

### 3.1 Rich Text Editor

| Feature | Template A | Template B | Template C | Linear | Notion | Payload | Storyblok | Builder.io | Contentful | Directus | Framer | Decision |
|---------|-----------|-----------|-----------|--------|--------|--------|----------|-----------|-----------|---------|--------|----------|
| **Rich Text Editor** | Portable Text | Custom Rich Text | Portable Text | ProseMirror | Custom | Lexical | - | - | Rich Text | - | - | **IMPROVE** (Lexical from Payload) |
| **Block-Based** | Yes | Yes | Yes | Yes | Yes | Yes | - | - | - | - | - | **KEEP** (from all) |
| **Inline Formatting** | Yes | Yes | Yes | Yes | Yes | Yes | - | - | Yes | - | - | **KEEP** (from all) |
| **Bold** | Yes | Yes | Yes | Yes | Yes | Yes | - | - | Yes | - | - | **KEEP** |
| **Italic** | Yes | Yes | Yes | Yes | Yes | Yes | - | - | Yes | - | - | **KEEP** |
| **Underline** | Yes | Yes | Yes | Yes | Yes | Yes | - | - | Yes | - | - | **KEEP** |
| **Strikethrough** | Yes | Yes | Yes | Yes | Yes | Yes | - | - | Yes | - | - | **KEEP** |
| **Code** | Yes | Yes | Yes | Yes | Yes | Yes | - | - | Yes | - | - | **KEEP** |
| **Highlight** | Yes | Yes | Yes | - | Yes | Yes | - | - | - | - | - | **KEEP** (from Template A/B/C/Notion/Payload) |
| **Text Color** | Yes | Yes | Yes | - | Yes | Yes | - | - | - | - | - | **KEEP** (from Template A/B/C/Notion/Payload) |
| **Background Color** | Yes | Yes | Yes | - | Yes | Yes | - | - | - | - | - | **KEEP** (from Template A/B/C/Notion/Payload) |
| **Link** | Yes | Yes | Yes | Yes | Yes | Yes | - | - | Yes | - | - | **KEEP** |
| **Internal Link** | Yes | Yes | Yes | - | Yes | Yes | - | - | - | - | - | **KEEP** (from Template A/B/C/Notion/Payload) |
| **External Link** | Yes | Yes | Yes | Yes | Yes | Yes | - | - | Yes | - | - | **KEEP** |
| **Anchor Link** | No | No | No | - | Yes | - | - | - | - | - | - | **ADD** (from Notion) |
| **Headings** | Yes | Yes | Yes | Yes | Yes | Yes | - | - | Yes | - | - | **KEEP** |
| **H1** | Yes | Yes | Yes | Yes | Yes | Yes | - | - | Yes | - | - | **KEEP** |
| **H2** | Yes | Yes | Yes | Yes | Yes | Yes | - | - | Yes | - | - | **KEEP** |
| **H3** | Yes | Yes | Yes | Yes | Yes | Yes | - | - | Yes | - | - | **KEEP** |
| **H4** | No | No | No | - | Yes | Yes | - | - | - | - | - | **ADD** (from Notion/Payload) |
| **H5** | No | No | No | - | Yes | Yes | - | - | - | - | - | **ADD** (from Notion/Payload) |
| **H6** | No | No | No | - | Yes | Yes | - | - | - | - | - | **ADD** (from Notion/Payload) |
| **Lists** | Yes | Yes | Yes | Yes | Yes | Yes | - | - | Yes | - | - | **KEEP** |
| **Bullet List** | Yes | Yes | Yes | Yes | Yes | Yes | - | - | Yes | - | - | **KEEP** |
| **Numbered List** | Yes | Yes | Yes | Yes | Yes | Yes | - | - | Yes | - | - | **KEEP** |
| **Todo List** | No | No | No | Yes | Yes | Yes | - | - | - | - | - | **ADD** (from Linear/Notion/Payload) |
| **Toggle List** | No | No | No | - | Yes | Yes | - | - | - | - | - | **ADD** (from Notion/Payload) |
| **Quote** | Yes | Yes | Yes | Yes | Yes | Yes | - | - | Yes | - | - | **KEEP** |
| **Code Block** | Yes | Yes | Yes | Yes | Yes | Yes | - | - | Yes | - | - | **KEEP** |
| **Callout** | No | No | No | - | Yes | Yes | - | - | - | - | - | **ADD** (from Notion/Payload) |
| **Divider** | Yes | Yes | Yes | Yes | Yes | Yes | - | - | Yes | - | - | **KEEP** |
| **Table** | No | No | No | - | Yes | Yes | - | - | - | - | - | **ADD** (from Notion/Payload) |
| **Image** | Yes (in PT) | Yes (in PT) | No | - | Yes | Yes | - | - | - | - | - | **KEEP** (from Template A/B/Notion/Payload) |
| **Video** | No | Yes (in PT) | No | - | Yes | Yes | - | - | - | - | - | **ADD** (from CMS-Kit/Notion/Payload) |
| **Audio** | No | No | No | - | Yes | Yes | - | - | - | - | - | **ADD** (from Notion/Payload) |
| **File** | No | No | No | - | Yes | Yes | - | - | - | - | - | **ADD** (from Notion/Payload) |
| **Embed** | No | No | No | - | Yes | Yes | - | - | - | - | - | **ADD** (from Notion/Payload) |
| **Mention** | No | No | No | Yes | Yes | - | - | - | - | - | - | **ADD** (from Linear/Notion) |
| **Emoji** | No | No | No | Yes | Yes | Yes | - | - | - | - | - | **ADD** (from Linear/Notion/Payload) |
| **Equation** | No | No | No | - | Yes | Yes | - | - | - | - | - | **ADD** (from Notion/Payload) |
| **Column Layout** | No | No | No | - | Yes | Yes | - | - | - | - | - | **ADD** (from Notion/Payload) |
| **Drag and Drop** | Yes (blocks) | Yes (sections) | Yes (pageBuilder) | Yes | Yes | Yes | - | - | - | - | - | **KEEP** (from all) |
| **Resize** | No | No | No | - | Yes | Yes | - | - | - | - | - | **ADD** (from Notion/Payload) |
| **Alignment** | Yes | Yes | Yes | - | Yes | Yes | - | - | - | - | - | **KEEP** (from all) |
| **Left Align** | Yes | Yes | Yes | - | Yes | Yes | - | - | - | - | - | **KEEP** |
| **Center Align** | Yes | Yes | Yes | - | Yes | Yes | - | - | - | - | - | **KEEP** |
| **Right Align** | Yes | Yes | Yes | - | Yes | Yes | - | - | - | - | - | **KEEP** |
| **Justify** | No | No | No | - | Yes | Yes | - | - | - | - | - | **ADD** (from Notion/Payload) |
| **Indent** | No | No | No | - | Yes | Yes | - | - | - | - | - | **ADD** (from Notion/Payload) |
| **Outdent** | No | No | No | - | Yes | Yes | - | - | - | - | - | **ADD** (from Notion/Payload) |
| **Line Height** | No | No | No | - | - | Yes | - | - | - | - | - | **ADD** (from Payload) |
| **Letter Spacing** | No | No | No | - | - | Yes | - | - | - | - | - | **ADD** (from Payload) |
| **Font Size** | No | No | No | - | Yes | Yes | - | - | - | - | - | **ADD** (from Notion/Payload) |
| **Font Family** | No | No | No | - | Yes | Yes | - | - | - | - | - | **ADD** (from Notion/Payload) |
| **Custom Styles** | No | No | No | - | - | Yes | - | - | - | - | - | **ADD** (from Payload) |
| **Custom Nodes** | No | No | No | - | - | Yes | - | - | - | - | - | **ADD** (from Payload) |
| **Custom Marks** | Yes | Yes | Yes | - | - | Yes | - | - | - | - | - | **KEEP** (from Template A/B/C/Payload) |
| **Plugins** | No | No | No | - | - | Yes | - | - | - | - | - | **ADD** (from Payload) |
| **Toolbar** | Yes | Yes | Yes | Yes | Yes | Yes | - | - | Yes | - | - | **KEEP** (from all) |
| **Floating Toolbar** | No | No | No | Yes | Yes | Yes | - | - | - | - | - | **ADD** (from Linear/Notion/Payload) |
| **Slash Commands** | No | No | No | - | Yes | Yes | - | - | - | - | - | **ADD** (from Notion/Payload) |
| **Keyboard Shortcuts** | Yes | Yes | Yes | Yes | Yes | Yes | - | - | - | - | - | **KEEP** (from all) |
| **Auto-Save** | Yes | Yes | Yes | Yes | Yes | Yes | - | - | - | - | - | **KEEP** (from all) |
| **Auto-Focus** | No | No | No | - | Yes | - | - | - | - | - | - | **ADD** (from Notion) |
| **Auto-Expand** | No | No | No | - | Yes | - | - | - | - | - | - | **ADD** (from Notion) |
| **Collaborative Editing** | No | No | No | Yes | Yes | - | - | - | - | - | - | **ADD** (from Linear/Notion) |
| **Real-time Cursors** | No | No | No | Yes | Yes | - | - | - | - | - | - | **ADD** (from Linear/Notion) |
| **Presence** | No | No | No | Yes | Yes | - | - | - | - | - | - | **ADD** (from Linear/Notion) |
| **Comments** | No | No | No | Yes | Yes | - | - | - | - | - | - | **ADD** (from Linear/Notion) |
| **Inline Comments** | No | No | No | - | Yes | - | - | - | - | - | - | **ADD** (from Notion) |
| **Suggestions** | No | No | No | Yes | Yes | - | - | - | - | - | - | **ADD** (from Linear/Notion) |
| **Track Changes** | No | No | No | - | - | - | - | - | - | - | - | **FUTURE** |
| **Version History** | No | No | No | - | Yes | Versions | - | - | - | - | - | **ADD** (from Notion/Payload) |
| **Restore Version** | No | No | No | - | Yes | Versions | - | - | - | - | - | **ADD** (from Notion/Payload) |
| **Compare Versions** | No | No | No | - | - | - | - | - | - | - | - | **FUTURE** |

### 3.2 Visual Editor

| Feature | Template A | Template B | Template C | Linear | Notion | Payload | Storyblok | Builder.io | Contentful | Directus | Framer | Decision |
|---------|-----------|-----------|-----------|--------|--------|--------|----------|-----------|-----------|---------|--------|----------|
| **Visual Editor** | No | No | No | - | - | - | Yes | Yes | - | Yes | Yes | **ADD** (from Storyblok/Builder.io/Directus/Framer) |
| **Drag and Drop** | No | No | No | - | - | - | Yes | Yes | - | - | Yes | **ADD** (from Storyblok/Builder.io/Framer) |
| **Live Preview** | Yes (Presentation) | Yes (Presentation) | Yes (Presentation) | - | - | Yes | Yes | Yes | - | Yes | - | **KEEP** (from all) |
| **Real-Time Preview** | Yes | Yes | Yes | - | - | Yes | Yes | Yes | - | Yes | - | **KEEP** (from all) |
| **Split View** | No | No | No | - | - | - | Yes | Yes | - | - | - | **ADD** (from Storyblok/Builder.io) |
| **Device Preview** | No | No | No | - | - | - | Yes | Yes | - | - | - | **ADD** (from Storyblok/Builder.io) |
| **Responsive Preview** | No | No | No | - | - | - | Yes | Yes | - | - | - | **ADD** (from Storyblok/Builder.io) |
| **Breakpoint Editor** | No | No | No | - | - | - | Yes | Yes | - | - | - | **ADD** (from Storyblok/Builder.io) |
| **Visual Editing** | Yes (Presentation) | Yes (Presentation) | Yes (Presentation) | - | - | - | Yes | Yes | - | Yes | - | **KEEP** (from all) |
| **Inline Editing** | Yes (Presentation) | Yes (Presentation) | Yes (Presentation) | - | - | - | Yes | Yes | - | Yes | - | **KEEP** (from all) |
| **Edit Mode** | Yes (Presentation) | Yes (Presentation) | Yes (Presentation) | - | - | - | Yes | Yes | - | Yes | - | **KEEP** (from all) |
| **Preview Mode** | Yes (Presentation) | Yes (Presentation) | Yes (Presentation) | - | - | Yes | Yes | Yes | - | Yes | - | **KEEP** (from all) |
| **Draft Mode** | Yes | Yes | Yes | - | - | Yes | - | - | - | - | - | **KEEP** (from Template A/B/C/Payload) |
| **Publish Mode** | Yes | Yes | Yes | - | - | Yes | Yes | Yes | - | - | - | **KEEP** (from all) |
| **Component Library** | No | Yes (sections) | No | - | - | - | Yes | Yes | - | - | Yes | **KEEP** (from CMS-Kit/Storyblok/Builder.io/Framer) |
| **Component Palette** | No | Yes | Yes (thumbnails) | - | - | - | Yes | Yes | - | - | Yes | **KEEP** (from CMS-Kit/Template C/Storyblok/Builder.io/Framer) |
| **Component Search** | No | No | No | - | - | - | Yes | Yes | - | - | - | **ADD** (from Storyblok/Builder.io) |
| **Component Categories** | No | No | No | - | - | - | Yes | Yes | - | - | - | **ADD** (from Storyblok/Builder.io) |
| **Component Thumbnails** | No | No | Yes | - | - | - | Yes | Yes | - | - | - | **KEEP** (from Template C/Storyblok/Builder.io) |
| **Insert Menu** | Yes (PT) | Yes (PT) | Yes (pageBuilder) | - | - | - | Yes | Yes | - | - | - | **KEEP** (from all) |
| **Quick Insert** | No | No | No | - | - | - | Yes | Yes | - | - | - | **ADD** (from Storyblok/Builder.io) |
| **Context Menu** | No | No | No | - | - | - | Yes | Yes | - | - | - | **ADD** (from Storyblok/Builder.io) |
| **Property Panel** | No | No | No | - | - | - | Yes | Yes | - | - | - | **ADD** (from Storyblok/Builder.io) |
| **Style Panel** | No | No | No | - | - | - | Yes | Yes | - | - | - | **ADD** (from Storyblok/Builder.io) |
| **Layers Panel** | No | No | No | - | - | - | Yes | Yes | - | - | - | **ADD** (from Storyblok/Builder.io) |
| **Outline Panel** | No | No | No | - | - | - | Yes | Yes | - | - | - | **ADD** (from Storyblok/Builder.io) |
| **Tree View** | No | No | No | - | - | - | Yes | Yes | - | - | - | **ADD** (from Storyblok/Builder.io) |
| **Undo/Redo** | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | - | Yes | - | **KEEP** (from all) |
| **Copy/Paste** | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | - | Yes | - | **KEEP** (from all) |
| **Cut** | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | - | Yes | - | **KEEP** (from all) |
| **Duplicate** | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | - | Yes | - | **KEEP** (from all) |
| **Delete** | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | - | Yes | - | **KEEP** (from all) |
| **Lock** | No | No | No | - | - | - | Yes | Yes | - | - | - | **ADD** (from Storyblok/Builder.io) |
| **Unlock** | No | No | No | - | - | - | Yes | Yes | - | - | - | **ADD** (from Storyblok/Builder.io) |
| **Hide** | No | No | No | - | - | - | Yes | Yes | - | - | - | **ADD** (from Storyblok/Builder.io) |
| **Show** | No | No | No | - | - | - | Yes | Yes | - | - | - | **ADD** (from Storyblok/Builder.io) |
| **Group** | No | No | No | - | - | - | Yes | Yes | - | - | - | **ADD** (from Storyblok/Builder.io) |
| **Ungroup** | No | No | No | - | - | - | Yes | Yes | - | - | - | **ADD** (from Storyblok/Builder.io) |
| **Parent** | No | No | No | - | - | - | Yes | Yes | - | - | - | **ADD** (from Storyblok/Builder.io) |
| **Unparent** | No | No | No | - | - | - | Yes | Yes | - | - | - | **ADD** (from Storyblok/Builder.io) |
| **Bring to Front** | No | No | No | - | - | - | Yes | Yes | - | - | - | **ADD** (from Storyblok/Builder.io) |
| **Send to Back** | No | No | No | - | - | - | Yes | Yes | - | - | - | **ADD** (from Storyblok/Builder.io) |
| **Align** | No | No | No | - | - | - | Yes | Yes | - | - | - | **ADD** (from Storyblok/Builder.io) |
| **Distribute** | No | No | No | - | - | - | Yes | Yes | - | - | - | **ADD** (from Storyblok/Builder.io) |
| **Grid** | No | No | No | - | - | - | Yes | Yes | - | - | - | **ADD** (from Storyblok/Builder.io) |
| **Snap to Grid** | No | No | No | - | - | - | Yes | Yes | - | - | - | **ADD** (from Storyblok/Builder.io) |
| **Snap to Guides** | No | No | No | - | - | - | Yes | Yes | - | - | - | **ADD** (from Storyblok/Builder.io) |
| **Guides** | No | No | No | - | - | - | Yes | Yes | - | - | - | **ADD** (from Storyblok/Builder.io) |
| **Rulers** | No | No | No | - | - | - | Yes | Yes | - | - | - | **ADD** (from Storyblok/Builder.io) |
| **Zoom** | No | No | No | - | - | - | Yes | Yes | - | - | - | **ADD** (from Storyblok/Builder.io) |
| **Pan** | No | No | No | - | - | - | Yes | Yes | - | - | - | **ADD** (from Storyblok/Builder.io) |
| **Fullscreen** | No | No | No | - | - | - | Yes | Yes | - | - | - | **ADD** (from Storyblok/Builder.io) |

---

## SUMMARY OF DECISIONS

### KEEP (from templates)
- Monorepo with Turbo (Template B/C)
- pnpm package manager (CMS-Kit/Directus)
- Shared UI library (CMS-Kit)
- Controller pattern (CMS-Kit)
- Adapter pattern (CMS-Kit)
- Cache Components (Template A)
- Live Content API (Template A)
- React Compiler (Template A)
- Turbopack (Template A)
- Optimistic UI (Template A)
- Type generation (all templates)
- Schema extraction (Template A/CMS-Kit)
- Dataset management (CMS-Kit)
- Common fields (CMS-Kit)
- Field groups (CMS-Kit/Template C)
- Custom blocks in PT (Template A/B)
- Sections in PT (CMS-Kit)
- Page builder with thumbnails (Template C)
- Grouped fields (Template C)
- Lexical editor (Payload)
- Access control functions (Payload)
- Hooks system (Payload)
- Local API (Payload)
- Visual editing/Presentation Tool (all templates)

### ADD (from competitors)
- Service worker (Linear/Notion)
- IndexedDB (Linear/Notion)
- Local-first architecture (Linear/Notion)
- Offline support (Linear/Notion)
- Conflict resolution (Linear/Notion)
- Workspace sharding (Linear/Notion)
- Logical sharding (Linear/Notion)
- Write-path indexing (Linear)
- Vector search (Linear)
- Semantic search (Linear)
- GraphQL API (Linear/Payload/Contentful/Directus)
- WebSocket API (Linear/Notion/Directus)
- Policy-based access control (Directus)
- Extension system (Directus)
- Native AI integration (Directus)
- MCP server (Directus)
- Visual editor (Storyblok/Builder.io/Directus/Framer)
- Real-time preview (Storyblok/Builder.io)
- Component system (Storyblok/Builder.io)
- A/B testing (Builder.io)
- Personalization (Builder.io)
- Command palette (Linear/Notion)
- Global search (Linear/Notion)
- Activity feed (Linear/Notion)
- Keyboard-first (Linear)
- Block model (Notion)
- Two-pointer system (Notion)
- Transaction model (Notion)
- Real-time sync (Notion)
- Nested content (Notion)
- Composable architecture (Contentful)
- App framework (Contentful)
- Marketplace (Contentful)
- Enterprise features (Contentful)
- Multi-environment (Contentful)

### IMPROVE
- Database abstraction (support multiple databases like Directus)
- Rich text editor (use Lexical from Payload instead of Portable Text)
- Field types (support 45+ field types like Directus)

### FUTURE
- Physical sharding (Linear/Notion)
- Shadow write migrations (Notion)
- Microservices (Contentful)
- Multi-region deployment (Linear/Notion)
- Database replication (Linear/Notion)
- Connection pooling (Notion)
- Query optimization (Notion)
- Index strategy (Notion)
- Custom protocol (Linear)
- Two-protocol approach (Linear)
- Track changes (editor)
- Compare versions (editor)

---

## NEXT STEPS

1. **Complete remaining feature categories** - Real-time & Collaboration, API & Integration, Authentication & Authorization, AI & Automation, Studio UX, Developer Experience, Performance & Scalability
2. **Design AI architecture** - Provider abstraction, gateway, streaming, context, memory, prompt system, agents, tool calling, MCP
3. **Design Studio UX** - Dashboard, quick actions, recent content, draft center, scheduled publishing, activity feed, team workspace, command palette, spotlight search, AI assistant, global search
4. **Design plugin architecture** - Plugin system with hooks, lifecycle, marketplace
5. **Design extension architecture** - Extension system
6. **Design permission system** - RBAC with field-level and document-level permissions
7. **Design navigation architecture** - Navigation system
8. **Design workspace system** - Workspace system
9. **Design review system** - Review system
10. **Generate full architecture** - After all research and analysis
