# Feature Matrix

**Date**: July 8, 2026
**Analyyst**: Cascade AI
**Purpose**: Comprehensive feature comparison across repositories and competitors with keep/improve decisions for Neo

---

## Legend

- **KEEP**: Adopt feature as-is from reference
- **IMPROVE**: Adopt feature but enhance/modify
- **DISCARD**: Don't adopt feature
- **NEW**: Build feature from scratch (not in references)

---

## Architecture & Infrastructure

| Feature | Template A | Template B | Template C | Sanity | Payload | Directus | Linear | Notion | Neo Decision |
|---------|-----------|-----------|-----------|--------|---------|---------|--------|--------|-------------|
| Monorepo | No | Yes (Turborepo) | No | No | No | No | No | No | **IMPROVE** (Turborepo + pnpm) |
| Package Manager | npm | pnpm | npm | npm | npm | npm | npm | npm | **KEEP** (pnpm) |
| App Router | Yes | Yes | Yes | No | No | No | No | No | **KEEP** (Next.js 16) |
| Cache Components | Yes | No | No | No | No | No | No | No | **KEEP** |
| React Compiler | Yes | No | No | No | No | No | No | No | **KEEP** |
| Turbopack | Yes | No | No | No | No | No | No | No | **KEEP** |
| Shared UI Library | No | Yes | No | No | No | No | No | No | **IMPROVE** (Build comprehensive) |
| TypeScript | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | **KEEP** |
| API Gateway | No | No | No | No | No | No | No | No | **NEW** |
| Multi-Database | No | No | No | No | Yes | Yes | No | No | **IMPROVE** (Sanity + Vector DB) |
| Caching Layer | Yes | No | No | Yes | No | No | Yes | Yes | **IMPROVE** (Multi-layer) |
| CDN Integration | Yes | No | No | Yes | No | No | No | No | **KEEP** (Vercel) |
| Edge Functions | No | No | No | No | No | No | No | No | **NEW** |
| WebSocket | No | No | No | Yes | No | No | Yes | Yes | **NEW** |
| Local-First Sync | No | No | No | No | No | No | Yes | Yes | **NEW** |

---

## Content Modeling

| Feature | Template A | Template B | Template C | Sanity | Payload | Directus | Linear | Notion | Neo Decision |
|---------|-----------|-----------|-----------|--------|---------|---------|--------|--------|-------------|
| Documents | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | **KEEP** |
| Singletons | Yes | No | Yes | Yes | No | No | No | No | **KEEP** |
| Objects | Yes | Yes | Yes | Yes | Yes | Yes | No | No | **KEEP** |
| Field Groups | No | Yes | Yes | No | Yes | Yes | No | No | **KEEP** |
| Common Fields | No | Yes | No | No | Yes | Yes | No | No | **KEEP** |
| Portable Text | Yes | No | Yes | Yes | Yes | No | No | No | **KEEP** |
| Custom Blocks | Yes | Yes | Yes | Yes | Yes | No | No | Yes | **IMPROVE** (Block-based) |
| Page Builder | No | Yes | Yes | No | No | No | No | No | **IMPROVE** (With thumbnails) |
| Visual Editor | No | No | No | No | No | No | No | No | **NEW** (Custom) |
| Rich Text Editor | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | **IMPROVE** (Lexical + AI) |
| Media Management | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | **IMPROVE** (AI tagging) |
| Version Control | No | No | No | Yes | No | No | Yes | Yes | **NEW** (Comprehensive) |
| Draft System | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | **KEEP** |
| Scheduled Publishing | No | No | No | Yes | No | No | No | No | **NEW** |
| Content Types | 2 | 15+ | 3 | Custom | Custom | Custom | Custom | Custom | **IMPROVE** (Agency-focused) |
| Custom Validation | No | Yes | Yes | Yes | Yes | Yes | Yes | Yes | **KEEP** |
| Conditional Logic | No | No | Yes | Yes | Yes | Yes | Yes | Yes | **KEEP** |

---

## Editor Experience

| Feature | Template A | Template B | Template C | Sanity | Payload | Directus | Linear | Notion | Neo Decision |
|---------|-----------|-----------|-----------|--------|---------|---------|--------|--------|-------------|
| Custom Studio | No | No | No | No | No | No | Yes | Yes | **NEW** (Keyboard-first) |
| Keyboard Navigation | No | No | No | No | No | No | Yes | Partial | **NEW** (Comprehensive) |
| Command Palette | No | No | No | No | No | No | Yes | Yes | **NEW** |
| Optimistic Updates | No | No | Yes | No | No | No | Yes | Yes | **KEEP** |
| Real-time Collaboration | No | No | No | Yes | No | No | Yes | Yes | **IMPROVE** (Multi-user) |
| Inline Editing | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | **KEEP** |
| Drag and Drop | No | Yes | Yes | Yes | Yes | Yes | Yes | Yes | **KEEP** |
| Slash Commands | No | No | No | No | No | No | No | Yes | **NEW** |
| AI Autocomplete | No | No | No | Basic | No | Yes | No | Basic | **IMPROVE** (Context-aware) |
| AI Rewrite | No | No | No | Basic | No | Yes | No | Basic | **IMPROVE** (Streaming) |
| AI Continue Writing | No | No | No | No | No | Yes | No | Basic | **NEW** |
| AI Generate SEO | No | No | No | No | No | Yes | No | No | **NEW** |
| AI Generate Metadata | No | No | No | No | No | Yes | No | No | **NEW** |
| AI Generate Alt Text | No | No | No | No | No | Yes | No | No | **NEW** |
| Visual Preview | Yes | Yes | Yes | Yes | Yes | Yes | No | No | **KEEP** |
| Thumbnail Preview | No | No | Yes | No | No | No | No | No | **KEEP** |
| Undo/Redo | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | **KEEP** |
| Multi-Select | No | No | Yes | Yes | Yes | Yes | Yes | Yes | **KEEP** |
| Bulk Actions | No | No | No | Yes | Yes | Yes | Yes | Yes | **NEW** |

---

## AI Features

| Feature | Template A | Template B | Template C | Sanity | Payload | Directus | Linear | Notion | Neo Decision |
|---------|-----------|-----------|-----------|--------|---------|---------|--------|--------|-------------|
| AI Integration | No | No | No | Basic | No | Yes | No | Basic | **NEW** (Comprehensive) |
| Multi-Provider AI | No | No | No | No | No | No | No | No | **NEW** (OpenAI, Anthropic, Google) |
| AI Gateway | No | No | No | No | No | No | No | No | **NEW** |
| Streaming Responses | No | No | No | No | No | No | No | No | **NEW** |
| Context Engine | No | No | No | No | No | No | No | No | **NEW** |
| Memory System | No | No | No | No | No | No | No | No | **NEW** (Short + Long + Episodic) |
| Prompt Library | No | No | No | No | No | No | No | No | **NEW** |
| Agent Framework | No | No | No | No | No | No | No | No | **NEW** |
| Tool Calling | No | No | No | No | No | Yes | No | No | **NEW** (MCP) |
| MCP Integration | No | No | No | No | No | Yes | No | No | **NEW** |
| AI-Assisted Content Creation | No | No | No | Basic | No | Yes | No | Basic | **IMPROVE** (Context-aware) |
| AI Content Enhancement | No | No | No | Basic | No | Yes | No | Basic | **IMPROVE** (Streaming) |
| AI Translation | No | No | No | No | No | Yes | No | Basic | **NEW** |
| AI Summarization | No | No | No | No | No | Yes | No | Basic | **NEW** |
| AI Accessibility | No | No | No | No | No | Yes | No | No | **NEW** |
| AI Internal Linking | No | No | No | No | No | No | No | No | **NEW** |
| AI Brand Voice | No | No | No | No | No | No | No | No | **NEW** |
| AI Publishing Suggestions | No | No | No | No | No | No | No | No | **NEW** |

---

## Collaboration

| Feature | Template A | Template B | Template C | Sanity | Payload | Directus | Linear | Notion | Neo Decision |
|---------|-----------|-----------|-----------|--------|---------|---------|--------|--------|-------------|
| Real-time Collaboration | No | No | No | Yes | No | No | Yes | Yes | **IMPROVE** (Multi-user) |
| Comments | No | No | No | Yes | No | No | Yes | Yes | **IMPROVE** (Threaded) |
| Mentions | No | No | No | Yes | No | No | Yes | Yes | **KEEP** |
| Activity Feed | No | No | No | Yes | No | No | Yes | Yes | **KEEP** |
| Notifications | No | No | No | Yes | No | No | Yes | Yes | **IMPROVE** (Multi-channel) |
| Review System | No | No | No | No | No | No | Yes | No | **NEW** (Approvals) |
| Version History | No | No | No | Yes | No | No | Yes | Yes | **IMPROVE** (Compare) |
| Inline Comments | No | No | No | Yes | No | No | Yes | Yes | **KEEP** |
| Threaded Discussions | No | No | No | No | No | No | Yes | Yes | **NEW** |
| Approval Workflow | No | No | No | No | No | No | Yes | No | **NEW** |
| Change Tracking | No | No | No | Yes | No | No | Yes | Yes | **IMPROVE** (Granular) |
| Conflict Resolution | No | No | No | Yes | No | No | Yes | Yes | **NEW** |

---

## UX Features

| Feature | Template A | Template B | Template C | Sanity | Payload | Directus | Linear | Notion | Neo Decision |
|---------|-----------|-----------|-----------|--------|---------|---------|--------|--------|-------------|
| Dark Theme | No | No | No | Yes | Yes | Yes | Yes | Yes | **IMPROVE** (Raycast-style) |
| Light Theme | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | **KEEP** |
| Theme Toggle | No | No | No | Yes | Yes | Yes | Yes | Yes | **KEEP** |
| Minimal Design | No | No | No | No | No | No | Yes | Yes | **NEW** (Linear/Raycast-style) |
| Gradient Accents | No | No | No | No | No | No | No | No | **NEW** (Raycast-style) |
| Smooth Animations | No | No | No | No | No | No | Yes | Yes | **NEW** (Motion) |
| Keyboard Shortcuts | No | No | No | No | No | No | Yes | Partial | **NEW** (Comprehensive) |
| Command Palette | No | No | No | No | No | No | Yes | Yes | **NEW** |
| Global Search | No | No | No | No | No | No | Yes | Yes | **NEW** |
| Spotlight Search | No | No | No | No | No | No | Yes | Yes | **NEW** |
| Breadcrumbs | No | No | No | No | No | No | Yes | Yes | **NEW** |
| Recent Items | No | No | No | No | No | No | Yes | Yes | **NEW** |
| Favorites | No | No | No | No | No | No | Yes | Yes | **NEW** |
| Quick Actions | No | No | No | No | No | No | Yes | Yes | **NEW** |
| Empty States | No | No | No | Yes | Yes | Yes | Yes | Yes | **IMPROVE** (Illustrated) |
| Loading States | No | No | No | Yes | Yes | Yes | Yes | Yes | **IMPROVE** (Skeleton) |
| Error States | No | No | No | Yes | Yes | Yes | Yes | Yes | **IMPROVE** (Helpful) |

---

## Performance

| Feature | Template A | Template B | Template C | Sanity | Payload | Directus | Linear | Notion | Neo Decision |
|---------|-----------|-----------|-----------|--------|---------|---------|--------|--------|-------------|
| Cache Components | Yes | No | No | No | No | No | No | No | **KEEP** |
| Live Content API | Yes | No | No | Yes | No | No | No | No | **KEEP** |
| ISR | Yes | Yes | Yes | Yes | Yes | Yes | No | No | **KEEP** |
| Code Splitting | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | **KEEP** |
| Lazy Loading | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | **KEEP** |
| Image Optimization | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | **KEEP** |
| Font Optimization | No | No | No | Yes | Yes | Yes | Yes | Yes | **NEW** |
| Prefetching | No | No | No | Yes | Yes | Yes | Yes | Yes | **NEW** |
| CDN | Yes | No | No | Yes | No | No | Yes | Yes | **KEEP** (Vercel) |
| Edge Computing | No | No | No | No | No | No | No | No | **NEW** (Vercel Edge) |
| Performance Monitoring | No | No | No | Yes | No | No | Yes | Yes | **NEW** |

---

## Security

| Feature | Template A | Template B | Template C | Sanity | Payload | Directus | Linear | Notion | Neo Decision |
|---------|-----------|-----------|-----------|--------|---------|---------|--------|--------|-------------|
| Authentication | No | No | No | Yes | Yes | Yes | Yes | Yes | **NEW** (Custom) |
| RBAC | No | No | No | Yes | Yes | Yes | Yes | Yes | **IMPROVE** (Field-level) |
| Field-Level Permissions | No | No | No | No | Yes | Yes | No | No | **NEW** |
| Document-Level Permissions | No | No | No | Yes | Yes | Yes | Yes | Yes | **IMPROVE** |
| Audit Logging | No | No | No | Yes | Yes | Yes | Yes | Yes | **NEW** (Comprehensive) |
| MFA | No | No | No | Yes | No | Yes | Yes | Yes | **NEW** |
| SSO | No | No | No | Yes | No | Yes | Yes | Yes | **NEW** |
| API Keys | No | No | No | Yes | Yes | Yes | Yes | Yes | **NEW** |
| Rate Limiting | No | No | No | Yes | No | Yes | Yes | Yes | **NEW** |
| Encryption at Rest | No | No | No | Yes | Yes | Yes | Yes | Yes | **NEW** |
| Encryption in Transit | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | **KEEP** |

---

## Developer Experience

| Feature | Template A | Template B | Template C | Sanity | Payload | Directus | Linear | Notion | Neo Decision |
|---------|-----------|-----------|-----------|--------|---------|---------|--------|--------|-------------|
| TypeScript | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | **KEEP** |
| Type Generation | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | **KEEP** |
| ESLint | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | **KEEP** |
| Prettier | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | **KEEP** |
| Hot Reload | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | **KEEP** |
| CLI Tool | No | No | No | Yes | Yes | Yes | No | No | **NEW** (Neo CLI) |
| API Documentation | No | No | No | Yes | Yes | Yes | Yes | Yes | **NEW** (Auto-generated) |
| Plugin System | No | No | No | Yes | Yes | Yes | No | No | **IMPROVE** (Comprehensive) |
| Extension System | No | No | No | No | No | No | No | No | **NEW** (Sandboxed) |
| Marketplace | No | No | No | Yes | No | No | No | No | **NEW** |
| Webhooks | No | No | No | Yes | Yes | Yes | Yes | Yes | **NEW** |
| API Access | No | No | No | Yes | Yes | Yes | Yes | Yes | **NEW** (REST + GraphQL) |
| SDK | No | No | No | Yes | Yes | Yes | Yes | Yes | **NEW** (TypeScript SDK) |

---

## Workspace & Multi-Tenancy

| Feature | Template A | Template B | Template C | Sanity | Payload | Directus | Linear | Notion | Neo Decision |
|---------|-----------|-----------|-----------|--------|---------|---------|--------|--------|-------------|
| Multi-Workspace | No | No | No | No | No | No | Yes | Yes | **NEW** (Agency-focused) |
| Workspace Templates | No | No | No | No | No | No | No | No | **NEW** |
| Workspace Switching | No | No | No | No | No | No | Yes | Yes | **NEW** |
| Team Management | No | No | No | Yes | Yes | Yes | Yes | Yes | **IMPROVE** (Agency workflows) |
| Role Management | No | No | No | Yes | Yes | Yes | Yes | Yes | **IMPROVE** (Custom roles) |
| Workspace Settings | No | No | No | No | No | No | Yes | Yes | **NEW** |
| Workspace Branding | No | No | No | No | No | No | No | No | **NEW** |
| Workspace Quotas | No | No | No | No | No | No | No | No | **NEW** |
| Logical Isolation | No | No | No | No | No | No | Yes | Yes | **NEW** |

---

## SEO & Publishing

| Feature | Template A | Template B | Template C | Sanity | Payload | Directus | Linear | Notion | Neo Decision |
|---------|-----------|-----------|-----------|--------|---------|---------|--------|--------|-------------|
| SEO Fields | Yes | Yes | Yes | Yes | Yes | Yes | No | Yes | **KEEP** |
| Sitemap Generation | Yes | No | No | Yes | No | No | No | No | **KEEP** |
| Robots.txt | Yes | No | No | Yes | No | No | No | No | **KEEP** |
| Meta Tags | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | **KEEP** |
| Open Graph | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | **KEEP** |
| Structured Data | No | No | No | Yes | No | Yes | No | No | **NEW** |
| Canonical URLs | No | No | No | Yes | Yes | Yes | No | No | **NEW** |
| Social Preview | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | **KEEP** |
| Publishing Workflow | Yes | Yes | Yes | Yes | Yes | Yes | No | No | **IMPROVE** (Approvals) |
| Scheduled Publishing | No | No | No | Yes | No | No | No | No | **NEW** |
| Multi-Channel Publishing | No | No | No | No | No | No | No | No | **NEW** |

---

## Analytics

| Feature | Template A | Template B | Template C | Sanity | Payload | Directus | Linear | Notion | Neo Decision |
|---------|-----------|-----------|-----------|--------|---------|---------|--------|--------|-------------|
| Content Analytics | No | No | No | Yes | No | No | No | No | **NEW** |
| User Analytics | No | No | No | Yes | No | No | Yes | Yes | **NEW** |
| Performance Analytics | No | No | No | Yes | No | No | Yes | No | **NEW** |
| Custom Dashboards | No | No | No | No | No | No | Yes | Yes | **NEW** |
| Real-time Analytics | No | No | No | Yes | No | No | Yes | Yes | **NEW** |
| Export Reports | No | No | No | Yes | No | No | Yes | Yes | **NEW** |

---

## Integration

| Feature | Template A | Template B | Template C | Sanity | Payload | Directus | Linear | Notion | Neo Decision |
|---------|-----------|-----------|-----------|--------|---------|---------|--------|--------|-------------|
| Git Integration | No | No | No | Yes | No | No | Yes | No | **NEW** |
| Slack Integration | No | No | No | Yes | No | No | Yes | Yes | **NEW** |
| GitHub Integration | No | No | No | Yes | No | No | Yes | Yes | **NEW** |
| Webhooks | No | No | No | Yes | Yes | Yes | Yes | Yes | **NEW** |
| API Access | No | No | No | Yes | Yes | Yes | Yes | Yes | **NEW** |
| Custom Integrations | No | No | No | Yes | Yes | Yes | Yes | Yes | **NEW** (Extension system) |

---

## Summary Statistics

### Keep Features: 67
### Improve Features: 28
### Discard Features: 0
### New Features: 58

### Total Features Analyzed: 153

---

## Key Insights

### What We're Keeping (67 features)
Mostly foundational features that are well-implemented across references:
- TypeScript, ESLint, Prettier
- Next.js App Router, Cache Components
- Sanity's Portable Text, real-time collaboration
- Basic SEO fields, sitemap generation
- Rich text editor, drag and drop
- Undo/redo, multi-select

### What We're Improving (28 features)
Features that exist but need enhancement:
- Monorepo structure (add comprehensive shared packages)
- Shared UI library (build comprehensive design system)
- Page builder (add thumbnails, optimistic UI)
- AI integration (build comprehensive multi-provider system)
- Real-time collaboration (add multi-user, threaded comments)
- Dark theme (Raycast-style with gradient accents)
- Performance (add font optimization, prefetching)
- Security (add field-level permissions, comprehensive audit logging)
- Developer experience (add CLI tool, marketplace)
- Workspace (add agency-focused workflows)

### What We're Building New (58 features)
Features that don't exist in references but are critical for Neo:
- Custom Studio (keyboard-first, not Sanity Studio)
- Command Palette (unified command center)
- AI Gateway (multi-provider with streaming)
- Context Engine (user, workspace, document context)
- Memory System (short, long, episodic, semantic)
- Prompt Library (template-based prompts)
- Agent Framework (multi-agent orchestration)
- Tool Calling (MCP integration)
- Local-First Sync (IndexedDB + sync engine)
- Workspace System (multi-tenant, agency-focused)
- Review System (approvals, version control)
- Keyboard Navigation (comprehensive shortcuts)
- Global Search (spotlight search)
- Breadcrumbs (hierarchical navigation)
- Recent Items, Favorites
- Quick Actions
- Smooth Animations (Motion)
- Performance Monitoring
- Authentication (custom)
- MFA, SSO
- API Keys, Rate Limiting
- CLI Tool
- Extension System (sandboxed)
- Marketplace
- Webhooks
- REST + GraphQL API
- TypeScript SDK
- Workspace Templates
- Workspace Switching
- Workspace Branding
- Workspace Quotas
- Structured Data
- Canonical URLs
- Scheduled Publishing
- Multi-Channel Publishing
- Content Analytics
- User Analytics
- Performance Analytics
- Custom Dashboards
- Real-time Analytics
- Export Reports
- Git Integration
- Slack Integration
- GitHub Integration

---

## Next Steps

1. **Review this feature matrix** with product owner
2. **Prioritize features** for MVP vs future
3. **Create information architecture** based on selected features
4. **Design sitemap** based on information architecture
5. **Begin Phase 1** (Product Architecture)

---

## Conclusion

The feature matrix reveals that Neo will combine the best foundational features from the reference repositories (67 keep) while significantly improving existing patterns (28 improve) and building critical new features (58 new) that differentiate Neo as an AI-native Agency Platform with keyboard-first UX, comprehensive AI integration, and agency-focused workflows.
