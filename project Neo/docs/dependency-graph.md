# Dependency Graph

**Date**: July 8, 2026
**Architect**: Cascade AI
**Purpose**: Define dependency relationships between Neo's applications, modules, and shared packages

---

## Visual Dependency Graph

```
                              ┌─────────────┐
                              │   @neo/ui   │
                              │  (Design    │
                              │   System)   │
                              └──────┬──────┘
                                     │
        ┌────────────────────────────┼────────────────────────────┐
        │                            │                            │
        ▼                            ▼                            ▼
 ┌─────────────┐            ┌─────────────┐            ┌─────────────┐
 │  @neo/types │            │ @neo/config │            │ @neo/utils  │
 │  (Shared    │            │ (Shared     │            │ (Shared     │
 │   Types)    │            │   Config)   │            │  Utilities) │
 └─────────────┘            └─────────────┘            └─────────────┘
        │                            │                            │
        └────────────────────────────┼────────────────────────────┘
                                     │
                                     ▼
 ┌──────────────────────────────────────────────────────────────────────┐
 │                        @neo/permissions                             │
 │                    (RBAC + Field/Document Access)                     │
 └──────────────────────────────────────────────────────────────────────┘
                                     │
            ┌────────────────────────┼────────────────────────┐
            │                        │                        │
            ▼                        ▼                        ▼
   ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
   │   @neo/workspace │    │   @neo/cms      │    │   @neo/ai       │
   │  (Multi-tenant   │    │  (Content       │    │  (AI Gateway,   │
   │   Workspaces)    │    │   Management)   │    │   Context)      │
   └────────┬─────────┘    └────────┬─────────┘    └────────┬─────────┘
            │                      │                        │
            │                      │                        │
            ▼                      ▼                        ▼
   ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
   │ @neo/navigation  │    │ @neo/collaboration│   │ @neo/integration │
   │  (Routing,      │    │  (Real-time,     │    │  (Webhooks,     │
   │   Shortcuts)     │    │   Reviews)       │    │   API)           │
   └─────────────────┘    └─────────────────┘    └─────────────────┘
            │                      │                        │
            │                      │                        │
            └──────────────────────┼────────────────────────┘
                                   │
                                   ▼
 ┌──────────────────────────────────────────────────────────────────────┐
 │                          Applications                                 │
 │  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐     │
 │  │   Studio   │  │  Analytics │  │  Settings  │  │ Marketplace│     │
 │  └────────────┘  └────────────┘  └────────────┘  └────────────┘     │
 └──────────────────────────────────────────────────────────────────────┘
```

---

## Dependency Rules

### Upward Dependency Rule
Shared packages cannot depend on modules. Modules can depend on shared packages.

### Downward Dependency Rule
Applications can depend on modules and shared packages. Modules can depend on other modules.

### No Circular Dependencies
No two packages can have mutual dependencies.

### Permission-Centric Rule
Permission module is used by all other modules to enforce access control.

### Workspace Scoping Rule
All module operations require a workspace context except authentication and core utilities.

---

## Shared Packages

### @neo/ui

**Type**: Shared Package
**Depends on**: None
**Used by**: All applications, all modules

**Purpose**:
- Design tokens
- Component library
- Theme context

**Exports**:
- Button, Input, Card, Modal, Command, etc.
- ThemeProvider
- useTheme hook

---

### @neo/types

**Type**: Shared Package
**Depends on**: None
**Used by**: All modules and applications

**Purpose**:
- Shared TypeScript interfaces
- API contract types
- Common enums

**Exports**:
- User, Workspace, Content, Role types
- API response types
- Permission types

---

### @neo/config

**Type**: Shared Package
**Depends on**: None
**Used by**: All packages for configuration

**Purpose**:
- ESLint configs
- TypeScript configs
- Tailwind presets

**Exports**:
- eslint-config-neo
- ts-config-neo
- tailwind-preset-neo

---

### @neo/utils

**Type**: Shared Package
**Depends on**: None
**Used by**: All modules

**Purpose**:
- Common utility functions
- Validation helpers
- Date/time formatting

**Exports**:
- cn() (class name merging)
- formatDate()
- generateId()
- debounce()

---

## Module Dependencies

### @neo/permissions

**Type**: Core Module
**Depends on**: @neo/types, @neo/utils
**Used by**: @neo/workspace, @neo/cms, @neo/ai, @neo/navigation, @neo/collaboration, @neo/integration

**Purpose**:
- All permission checks go through this module
- Cached permission results

---

### @neo/workspace

**Type**: Core Module
**Depends on**: @neo/permissions, @neo/types, @neo/utils
**Used by**: @neo/cms, @neo/ai, @neo/collaboration, @neo/integration, all applications

**Purpose**:
- Workspace context and isolation
- Team management
- Quota enforcement

---

### @neo/cms

**Type**: Business Module
**Depends on**: @neo/permissions, @neo/workspace, @neo/types, @neo/utils
**Used by**: @neo/collaboration, @neo/integration, Studio application

**Purpose**:
- Content management
- Media management
- Version control

**External Dependencies**:
- Sanity client
- Sanity schema libraries

---

### @neo/ai

**Type**: Business Module
**Depends on**: @neo/permissions, @neo/workspace, @neo/types, @neo/utils
**Used by**: @neo/cms, @neo/collaboration, Studio application

**Purpose**:
- AI gateway
- Context engine
- Memory system

**External Dependencies**:
- OpenAI SDK
- Anthropic SDK
- Google AI SDK
- Vercel AI SDK

---

### @neo/navigation

**Type**: UI Module
**Depends on**: @neo/permissions, @neo/workspace, @neo/types, @neo/utils, @neo/ui
**Used by**: All applications

**Purpose**:
- Routing
- Keyboard navigation
- Command palette
- Breadcrumbs

---

### @neo/collaboration

**Type**: Business Module
**Depends on**: @neo/permissions, @neo/workspace, @neo/cms, @neo/types, @neo/utils
**Used by**: Studio application

**Purpose**:
- Real-time collaboration
- Comments
- Reviews

**External Dependencies**:
- WebSocket server
- Redis pub/sub

---

### @neo/integration

**Type**: Business Module
**Depends on**: @neo/permissions, @neo/workspace, @neo/types, @neo/utils
**Used by**: Settings application, Studio application

**Purpose**:
- Webhooks
- Third-party integrations
- Public API

**External Dependencies**:
- GitHub API
- Slack API
- Webhook delivery service

---

## Application Dependencies

### Studio Application

**Type**: Application
**Depends on**:
- @neo/ui
- @neo/cms
- @neo/ai
- @neo/permissions
- @neo/workspace
- @neo/navigation
- @neo/collaboration
- @neo/integration
- @neo/types
- @neo/utils

**External Dependencies**:
- Next.js
- React
- Tailwind CSS
- Lexical editor

---

### Analytics Application

**Type**: Application
**Depends on**:
- @neo/ui
- @neo/permissions
- @neo/workspace
- @neo/navigation
- @neo/types
- @neo/utils

**External Dependencies**:
- Next.js
- React
- Chart library (TBD)

---

### Settings Application

**Type**: Application
**Depends on**:
- @neo/ui
- @neo/permissions
- @neo/workspace
- @neo/integration
- @neo/navigation
- @neo/types
- @neo/utils

**External Dependencies**:
- Next.js
- React

---

### Marketplace Application

**Type**: Application
**Depends on**:
- @neo/ui
- @neo/permissions
- @neo/workspace
- @neo/navigation
- @neo/types
- @neo/utils

**External Dependencies**:
- Next.js
- React

---

## API Gateway Dependencies

### API Application

**Type**: Backend Application
**Depends on**:
- @neo/cms
- @neo/ai
- @neo/permissions
- @neo/workspace
- @neo/collaboration
- @neo/integration
- @neo/types
- @neo/utils

**External Dependencies**:
- Express or Fastify
- Redis
- PostgreSQL
- Sanity API

---

## External Service Dependencies

```
┌──────────────────────────────────────────────────────────────┐
│                    EXTERNAL SERVICES                          │
└──────────────────────────────────────────────────────────────┘

Sanity        ← Content storage
PostgreSQL    ← User, workspace, relational data
Redis         ← Cache, sessions, pub/sub
Vector DB     ← AI memory, semantic search
Vercel        ← Hosting, edge functions, analytics
Cloudflare    ← CDN, DDoS protection
WebSocket     ← Real-time collaboration
OpenAI        ← AI provider
Anthropic     ← AI provider
Google AI     ← AI provider
GitHub        ← Git integration
Slack         ← Communication integration
Email         ← Notifications
```

---

## Build Order

```
1. @neo/config          (no dependencies)
2. @neo/types           (no dependencies)
3. @neo/utils           (no dependencies)
4. @neo/ui              (depends on config, utils)
5. @neo/permissions     (depends on types, utils)
6. @neo/workspace       (depends on permissions, types, utils)
7. @neo/cms            (depends on permissions, workspace, types, utils)
8. @neo/ai             (depends on permissions, workspace, types, utils)
9. @neo/navigation     (depends on permissions, workspace, ui, types, utils)
10. @neo/collaboration (depends on permissions, workspace, cms, types, utils)
11. @neo/integration   (depends on permissions, workspace, types, utils)
12. Applications       (depend on modules and shared packages)
13. API Gateway        (depends on modules and shared packages)
```

---

## Circular Dependency Prevention

### Forbidden Dependencies

| Source | Cannot Depend On | Reason |
|--------|-----------------|--------|
| @neo/ui | Any module | UI should be pure |
| @neo/types | Any module | Types are leaf nodes |
| @neo/utils | Any module | Utilities are leaf nodes |
| @neo/permissions | @neo/workspace | Avoid circular |
| @neo/cms | @neo/collaboration | Avoid circular |
| Applications | Other applications | Applications are isolated |

### Detection

Use `madge` or `dpdm` to detect circular dependencies during CI:

```bash
pnpm dlx madge --circular packages/
```

---

## Versioning Strategy

### Shared Packages
- Versioned together with monorepo releases
- Use `workspace:*` in package.json
- Breaking changes require major version bump

### Modules
- Independent versioning per module
- Semantic versioning
- Breaking changes in core modules affect downstream packages

### Applications
- Versioned independently
- Tagged releases

---

## Next Steps

1. Move to Phase 2 (Design System)
2. Define design tokens and component philosophy
3. Create comprehensive design language document
