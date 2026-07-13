# Product Architecture

**Date**: July 8, 2026
**Architect**: Cascade AI
**Purpose**: Complete product architecture for Neo's AI-native Agency Platform

---

## Platform Hierarchy

```
Neo Platform
├── Applications
│   ├── Studio (Content Management)
│   ├── Analytics (Dashboard & Insights)
│   ├── Settings (Platform Configuration)
│   └── Marketplace (Plugins & Extensions)
├── Modules
│   ├── CMS Module
│   ├── AI Module
│   ├── Permission Module
│   ├── Workspace Module
│   ├── Navigation Module
│   ├── Collaboration Module
│   └── Integration Module
└── Shared Infrastructure
    ├── Design System
    ├── State Management
    ├── API Gateway
    ├── Database Layer
    ├── Cache Layer
    └── Security Layer
```

---

## Core Design Decisions

### 1. Modular Monorepo
- Turborepo + pnpm workspaces
- Shared packages for UI, types, utils, config
- Each application and module is independently deployable

### 2. Custom Studio
- Build a custom studio application, not use Sanity Studio
- Keyboard-first, command palette, dark theme
- Reusable components from shared UI library

### 3. CMS as a Module
- Sanity is used as a headless CMS
- Content schemas live in a shared CMS package
- Future modules can be added without touching CMS code

### 4. AI-Native
- Multi-provider AI gateway
- Context engine, memory, prompt library
- AI woven into every feature, not as a separate page

### 5. Multi-Tenant Workspaces
- Logical isolation per workspace
- Workspace-specific settings, schemas, and permissions
- Agency-focused workflows

---

## Application Architecture

### Studio Application

**Responsibilities**:
- Content creation and management
- Media library
- AI assistant integration
- Team collaboration
- Workspace navigation

**Pages**:
- Dashboard
- Content (list, detail, editor)
- AI Assistant
- Team
- Settings

**Dependencies**:
- @neo/ui
- @neo/cms
- @neo/ai
- @neo/permissions
- @neo/workspace
- @neo/navigation

### Analytics Application

**Responsibilities**:
- Content performance analytics
- User analytics
- Team analytics
- AI usage analytics
- Custom dashboards

**Pages**:
- Overview
- Content Analytics
- User Analytics
- Team Analytics
- AI Analytics
- Dashboards
- Reports

**Dependencies**:
- @neo/ui
- @neo/analytics
- @neo/permissions
- @neo/workspace

### Settings Application

**Responsibilities**:
- Workspace settings
- User profile
- Security configuration
- Billing
- Developer settings

**Pages**:
- Workspace
- Profile
- Security
- Billing
- Developer

**Dependencies**:
- @neo/ui
- @neo/workspace
- @neo/permissions

### Marketplace Application

**Responsibilities**:
- Browse and install plugins
- Browse and install extensions
- Browse workspace templates
- Manage installed items

**Pages**:
- Plugins
- Extensions
- Templates
- My Items

**Dependencies**:
- @neo/ui
- @neo/plugins
- @neo/extensions
- @neo/permissions

---

## Module Architecture

### CMS Module

**Responsibilities**:
- Content types and schemas
- Content CRUD operations
- Media management
- Version control
- Publishing workflow

**Public API**:
```typescript
// Content
cms.createContent(type, data, workspaceId)
cms.getContent(id)
cms.updateContent(id, data)
cms.deleteContent(id)
cms.listContent(type, filters)

// Media
cms.uploadMedia(file, workspaceId)
cms.getMedia(id)
cms.deleteMedia(id)

// Versions
cms.saveVersion(id, data, userId)
cms.getVersions(id)
cms.revertToVersion(id, version)
```

### AI Module

**Responsibilities**:
- Multi-provider AI abstraction
- Streaming responses
- Context management
- Memory storage
- Prompt execution
- Agent orchestration
- Tool calling

**Public API**:
```typescript
// Chat
ai.chat(params, context)
ai.streamChat(params, context)

// Content
ai.generateContent(prompt, context)
ai.enhanceContent(content, context)
ai.summarizeContent(content, context)

// Agents
ai.executeAgent(agentId, input, context)

// Tools
ai.callTool(toolId, params, context)
```

### Permission Module

**Responsibilities**:
- Role-based access control
- Field-level permissions
- Document-level permissions
- Permission checking and caching
- Audit logging

**Public API**:
```typescript
permissions.check(userId, workspaceId, action, context)
permissions.assignRole(userId, workspaceId, roleId)
permissions.getRole(roleId)
permissions.grantDocumentPermission(userId, documentId, actions)
permissions.grantFieldPermission(userId, documentId, fieldId, actions)
```

### Workspace Module

**Responsibilities**:
- Workspace CRUD
- Workspace switching
- Team management
- Activity feeds
- Quota management
- Workspace templates

**Public API**:
```typescript
workspace.create(name, userId, options)
workspace.get(id)
workspace.switch(id, userId)
workspace.addMember(workspaceId, userId, roleId)
workspace.removeMember(workspaceId, userId)
workspace.getActivity(workspaceId)
workspace.checkQuota(workspaceId, quotaType)
```

### Navigation Module

**Responsibilities**:
- Client-side routing
- Keyboard navigation
- Command palette
- Breadcrumbs
- Recent items and favorites

**Public API**:
```typescript
navigation.navigate(path)
navigation.back()
navigation.forward()
navigation.registerShortcut(keys, action)
navigation.generateBreadcrumbs(path)
navigation.addRecent(item)
navigation.addFavorite(item)
```

### Collaboration Module

**Responsibilities**:
- Real-time collaboration
- Comments and mentions
- Review workflow
- Activity feed
- Notifications

**Public API**:
```typescript
collaboration.createReview(contentId, workspaceId, options)
collaboration.approveReview(reviewId, userId)
collaboration.addComment(contentId, userId, content)
collaboration.resolveComment(commentId, userId)
collaboration.sendNotification(userId, notification)
```

### Integration Module

**Responsibilities**:
- Webhook management
- Third-party integrations
- API access
- SDK support

**Public API**:
```typescript
integration.createWebhook(workspaceId, config)
integration.sendWebhook(webhookId, payload)
integration.connectIntegration(workspaceId, type, config)
integration.listIntegrations(workspaceId)
```

---

## Shared Infrastructure

### Design System

**Package**: `@neo/ui`

**Responsibilities**:
- Component library
- Theme tokens
- Typography
- Spacing
- Colors
- Icons
- Motion patterns

### State Management

**Approach**:
- Server state: React Query + Server Actions
- Client state: Zustand or Context API
- Real-time state: WebSocket subscriptions
- AI streaming state: Event streams

### API Gateway

**Responsibilities**:
- Authentication middleware
- Permission middleware
- Rate limiting
- Request routing
- API versioning

### Database Layer

**Components**:
- Sanity for content data
- PostgreSQL for relational data
- Vector database for AI memory
- Redis for caching and real-time

### Cache Layer

**Layers**:
- Browser cache
- CDN cache
- Edge cache
- Redis cache
- In-memory cache

### Security Layer

**Components**:
- JWT authentication
- RBAC authorization
- Field-level permissions
- Document-level permissions
- Audit logging
- Rate limiting
- Encryption

---

## Data Flow

### Content Creation Flow

```
Studio → API Gateway → Permission Check → CMS Module → Sanity
  ↓          ↓                ↓              ↓
Auth    Auth Check    Permission Check    Save Content
  ↓          ↓                ↓              ↓
Workspace  Log Request    Audit Log      Broadcast Change
```

### AI Content Flow

```
Studio → AI Gateway → Provider → Streaming → Studio UI
  ↓          ↓          ↓           ↓
Context  Context      Model    Token chunks
  ↓          ↓          ↓           ↓
Memory   Memory      Response  Update UI
```

### Collaboration Flow

```
Studio → WebSocket → Collaboration Module → Broadcast
  ↓          ↓              ↓
User    Real-time      Activity Feed
```

---

## Scalability Strategy

### Horizontal Scaling
- Stateless API layer
- Redis session store
- Database read replicas
- CDN for static assets

### Workspace Isolation
- Workspace ID as tenant key
- Separate indexes where needed
- Resource quotas per workspace

### AI Scaling
- Provider load balancing
- Request queuing
- Token usage tracking

---

## Next Steps

1. Create module-map.md
2. Create dependency-graph.md
3. Move to Phase 2 (Design System)
