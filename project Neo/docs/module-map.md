# Module Map

**Date**: July 8, 2026
**Architect**: Cascade AI
**Purpose**: Detailed module map for Neo's AI-native Agency Platform

---

## Module Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        NEO PLATFORM                              │
└─────────────────────────────────────────────────────────────────┘
        │
   ┌────┴────┬──────────┬──────────┬──────────┬──────────┐
   │         │          │          │          │          │
   ▼         ▼          ▼          ▼          ▼          ▼
┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐
│ CMS  │ │ AI   │ │ Perm │ │ WS   │ │ Nav  │ │ Coll │
└──────┘ └──────┘ └──────┘ └──────┘ └──────┘ └──────┐
   │         │          │          │          │          │
   ▼         ▼          ▼          ▼          ▼          ▼
[Schema]  [Gateway] [Roles]   [Teams]  [Router]  [Review]
[Content] [Context] [Checks]  [Switch] [KB]      [Comments]
[Media]   [Memory]  [Audit]   [Quota]  [Recent]  [Activity]
[Version] [Prompts] [Cache]   [Tmplts] [Fav]     [Notify]
[Publish] [Agents]  [FLP]     [Brnd]   [CmdK]    [RT]
```

---

## Module: CMS Module

**Package**: `@neo/cms`

### Purpose
Manage content schemas, content lifecycle, media, and publishing workflows.

### Sub-modules

| Sub-module | Purpose | Key Responsibilities |
|------------|---------|---------------------|
| Schema | Define content types | Documents, singletons, objects, field groups, validation |
| Content | Content CRUD | Create, read, update, delete, list, search, filter |
| Media | Asset management | Upload, optimize, tag, transform, delete |
| Version | Version control | Save, compare, revert, list versions |
| Publish | Publishing workflow | Draft, review, schedule, publish, unpublish |
| PageBuilder | Visual page builder | Sections, thumbnails, drag-drop, optimistic UI |
| RichText | Rich text editor | Lexical integration, AI inline assistance |

### Inputs
- Content data from Studio
- Media files from Studio
- Publishing commands

### Outputs
- Stored content (Sanity)
- Optimized media
- Version history
- Publishing status

### Dependencies
- `@neo/permissions` (document/field access)
- `@neo/workspace` (workspace scoping)
- `@neo/ai` (AI content features)

---

## Module: AI Module

**Package**: `@neo/ai`

### Purpose
Provide a unified AI layer with multi-provider support, streaming, context, memory, and agents.

### Sub-modules

| Sub-module | Purpose | Key Responsibilities |
|------------|---------|---------------------|
| Gateway | Provider abstraction | Route requests, manage keys, fallback logic |
| Providers | AI vendor integrations | OpenAI, Anthropic, Google, others |
| Streaming | Stream responses | SSE, token chunks, progress updates |
| Context | Context management | User, workspace, document, conversation context |
| Memory | Memory storage | Short-term, long-term, episodic, semantic memory |
| Prompts | Prompt library | Templates, variables, optimization, versioning |
| Agents | Multi-agent system | Agent definitions, orchestration, execution |
| Tools | Tool calling | Tool registry, execution, MCP integration |

### Inputs
- User prompts
- Context data
- Tool requests
- Agent execution requests

### Outputs
- Generated content
- Streaming responses
- Tool results
- Agent outputs

### Dependencies
- `@neo/workspace` (workspace context)
- `@neo/permissions` (AI feature access)

---

## Module: Permission Module

**Package**: `@neo/permissions`

### Purpose
Enforce role-based access control with field-level and document-level permissions.

### Sub-modules

| Sub-module | Purpose | Key Responsibilities |
|------------|---------|---------------------|
| Roles | Role management | System roles, custom roles, inheritance |
| UserRoles | User role assignment | Assign, revoke, list roles per workspace |
| Checker | Permission evaluation | Check permissions, cache results |
| DocumentPermissions | Document access | Grant, revoke, check document permissions |
| FieldPermissions | Field access | Grant, revoke, check field permissions |
| Audit | Audit logging | Log permission checks and changes |

### Inputs
- User ID
- Workspace ID
- Action
- Resource context

### Outputs
- Permission result
- Audit log entries

### Dependencies
- `@neo/workspace` (workspace membership)

---

## Module: Workspace Module

**Package**: `@neo/workspace`

### Purpose
Manage workspaces, teams, quotas, and workspace-specific configuration.

### Sub-modules

| Sub-module | Purpose | Key Responsibilities |
|------------|---------|---------------------|
| Manager | Workspace CRUD | Create, update, delete, get workspaces |
| Switcher | Context switching | Switch active workspace, validate access |
| Team | Team management | Invite, remove, update members |
| Activity | Activity feed | Log, query, broadcast workspace activity |
| Quota | Resource quotas | Check, increment, reset quota usage |
| Templates | Workspace templates | Register, list, apply templates |
| Branding | Workspace branding | Theme, logo, custom CSS |

### Inputs
- User ID
- Workspace metadata
- Team operations

### Outputs
- Workspace data
- Team member lists
- Activity feed
- Quota status

### Dependencies
- `@neo/permissions` (workspace actions)

---

## Module: Navigation Module

**Package**: `@neo/navigation`

### Purpose
Provide keyboard-first navigation with routing, command palette, breadcrumbs, and history.

### Sub-modules

| Sub-module | Purpose | Key Responsibilities |
|------------|---------|---------------------|
| Router | Client routing | Route definitions, navigation, history |
| Keyboard | Keyboard shortcuts | Register, handle, display shortcuts |
| CommandPalette | Command center | Commands, search, quick actions |
| Breadcrumbs | Breadcrumb generation | Generate, render, navigate |
| Recent | Recent items | Track, list, clear recent content |
| Favorites | Favorites | Add, remove, list pinned items |

### Inputs
- Route definitions
- User actions
- Navigation commands

### Outputs
- Current route
- Breadcrumbs
- Recent/favorite lists

### Dependencies
- `@neo/workspace` (workspace-specific routes)
- `@neo/permissions` (route access)

---

## Module: Collaboration Module

**Package**: `@neo/collaboration`

### Purpose
Enable real-time collaboration, reviews, comments, and notifications.

### Sub-modules

| Sub-module | Purpose | Key Responsibilities |
|------------|---------|---------------------|
| Realtime | Live editing | WebSocket presence, cursors, conflicts |
| Comments | Comments system | Inline comments, replies, resolution |
| Reviews | Review workflow | Create, approve, reject, request changes |
| Activity | Activity feed | Log, query, broadcast activity |
| Notifications | Notifications | Multi-channel notifications |
| Mentions | User mentions | Parse mentions, notify users |

### Inputs
- User actions
- Content changes
- Review requests

### Outputs
- Real-time updates
- Notifications
- Activity entries

### Dependencies
- `@neo/cms` (content context)
- `@neo/workspace` (workspace context)
- `@neo/permissions` (comment/review access)

---

## Module: Integration Module

**Package**: `@neo/integration`

### Purpose
Connect Neo with third-party services and provide API access.

### Sub-modules

| Sub-module | Purpose | Key Responsibilities |
|------------|---------|---------------------|
| Webhooks | Webhook management | Create, deliver, retry, log webhooks |
| Git | Git integrations | GitHub, GitLab, Bitbucket sync |
| Slack | Slack integration | Notifications, commands |
| API | Public API | REST, GraphQL endpoints |
| SDK | SDK support | TypeScript SDK, documentation |

### Inputs
- Integration configurations
- Webhook events
- API requests

### Outputs
- Webhook deliveries
- Synced content
- API responses

### Dependencies
- `@neo/workspace` (workspace integrations)
- `@neo/permissions` (integration access)

---

## Shared Packages

### @neo/ui
- Component library
- Theme tokens
- Design primitives

### @neo/types
- Shared TypeScript types
- API contracts

### @neo/config
- Shared config (ESLint, TypeScript, Tailwind)

### @neo/utils
- Shared utilities
- Helper functions

---

## Application Modules

| Application | Modules Used | Purpose |
|-------------|-------------|---------|
| Studio | CMS, AI, Workspace, Navigation, Collaboration, Permission | Content management |
| Analytics | Analytics, Workspace, Permission | Insights and reporting |
| Settings | Workspace, Permission, Integration | Configuration |
| Marketplace | Plugins, Extensions, Permission | Discover and install |

---

## Module Interaction Matrix

|  | CMS | AI | Perm | WS | Nav | Coll | Int |
|--|-----|-----|------|-----|-----|------|-----|
| CMS | - | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| AI | ✅ | - | ✅ | ✅ | - | - | - |
| Perm | ✅ | ✅ | - | ✅ | ✅ | ✅ | ✅ |
| WS | ✅ | ✅ | ✅ | - | ✅ | ✅ | ✅ |
| Nav | ✅ | - | ✅ | ✅ | - | - | - |
| Coll | ✅ | - | ✅ | ✅ | - | - | - |
| Int | ✅ | - | ✅ | ✅ | - | - | - |

---

## Module Ownership

| Module | Owner | Critical Decisions |
|--------|-------|-------------------|
| CMS | Platform Team | Sanity as headless; custom studio |
| AI | AI Team | Multi-provider; streaming-first |
| Permission | Security Team | Field-level + document-level |
| Workspace | Platform Team | Logical isolation; templates |
| Navigation | UX Team | Keyboard-first; Cmd+K |
| Collaboration | Platform Team | Real-time; reviews |
| Integration | Platform Team | REST + GraphQL; webhooks |

---

## Next Steps

1. Create dependency-graph.md
2. Move to Phase 2 (Design System)
