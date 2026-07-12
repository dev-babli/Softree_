# Sitemap

**Date**: July 8, 2026
**Analyyst**: Cascade AI
**Purpose**: Define the URL structure and navigation hierarchy for Neo's AI-native Agency Platform

---

## Executive Summary

This document defines the sitemap for Neo's AI-native Agency Platform, outlining the URL structure, navigation hierarchy, and page organization. The sitemap is designed to be intuitive, scalable, and SEO-friendly, supporting the platform's modular architecture.

---

## URL Structure

### Base URL

```
https://neo.app
```

### Workspace Subdomains

```
https://{workspace}.neo.app
```

### API Base URL

```
https://api.neo.app
```

---

## Studio Application Sitemap

### Root Routes

```
/                          → Dashboard (default)
/login                     → Login page
/signup                    → Signup page
/forgot-password           → Forgot password
/reset-password/{token}    → Reset password
/invite/{token}            → Accept workspace invite
```

### Dashboard Routes

```
/dashboard                 → Main dashboard
/dashboard/overview        → Dashboard overview
/dashboard/activity       → Activity feed
/dashboard/drafts         → Draft center
/dashboard/scheduled      → Scheduled publishing
```

### Content Routes

```
/content                   → Content list (all types)
/content/pages             → Pages list
/content/posts             → Posts list
/content/projects         → Projects list
/content/media            → Media library
/content/new               → Create new content (modal)
/content/{type}/new        → Create new content of type
/content/{type}/{id}       → Content detail
/content/{type}/{id}/edit  → Content editor
/content/{type}/{id}/settings → Content settings
/content/{type}/{id}/versions → Version history
/content/{type}/{id}/compare/{v1}/{v2} → Compare versions
```

### AI Routes

```
/ai                        → AI assistant (default)
/ai/assistant             → AI assistant
/ai/prompts                → Prompt library
/ai/prompts/new            → Create new prompt
/ai/prompts/{id}           → Prompt detail
/ai/prompts/{id}/edit      → Edit prompt
/ai/tools                  → AI tools
/ai/agents                 → AI agents
/ai/agents/new             → Create new agent
/ai/agents/{id}            → Agent detail
/ai/settings               → AI settings
```

### Team Routes

```
/team                      → Team overview
/team/members              → Team members
/team/members/invite       → Invite member
/team/members/{id}         → Member detail
/team/roles                → Roles
/team/roles/new            → Create new role
/team/roles/{id}           → Role detail
/team/permissions          → Permissions
/team/activity             → Team activity
```

### Settings Routes

```
/settings                  → Settings overview
/settings/workspace        → Workspace settings
/settings/workspace/general → General settings
/settings/workspace/branding → Branding settings
/settings/workspace/theme → Theme settings
/settings/workspace/integrations → Integrations
/settings/profile          → Profile settings
/settings/preferences      → Preferences
/settings/security         → Security settings
/settings/security/mfa     → MFA settings
/settings/security/api-keys → API keys
/settings/security/sessions → Sessions
/settings/billing          → Billing settings
/settings/billing/plan     → Plan details
/settings/billing/usage    → Usage
/settings/billing/invoices  → Invoices
/settings/developer        → Developer settings
/settings/developer/api    → API access
/settings/developer/webhooks → Webhooks
/settings/developer/sdk     → SDK documentation
```

### Marketplace Routes

```
/marketplace               → Marketplace overview
/marketplace/plugins       → Plugins
/marketplace/plugins/{id}  → Plugin detail
/marketplace/extensions    → Extensions
/marketplace/extensions/{id} → Extension detail
/marketplace/templates     → Templates
/marketplace/templates/{id} → Template detail
/marketplace/my-plugins    → My plugins
/marketplace/my-extensions → My extensions
```

---

## Dashboard Application Sitemap

### Root Routes

```
/dashboard                 → Dashboard overview (default)
/analytics                 → Analytics overview
```

### Content Analytics Routes

```
/analytics/content          → Content analytics
/analytics/content/performance → Content performance
/analytics/content/engagement → Content engagement
/analytics/content/seo      → Content SEO
```

### User Analytics Routes

```
/analytics/users            → User analytics
/analytics/users/sessions  → User sessions
/analytics/users/behavior   → User behavior
/analytics/users/retention  → User retention
```

### Team Analytics Routes

```
/analytics/team            → Team analytics
/analytics/team/activity   → Team activity
/analytics/team/productivity → Team productivity
/analytics/team/collaboration → Team collaboration
```

### AI Analytics Routes

```
/analytics/ai              → AI analytics
/analytics/ai/usage        → AI token usage
/analytics/ai/costs        → AI costs
/analytics/ai/performance  → AI performance
```

### Dashboard Routes

```
/analytics/dashboards      → Dashboards
/analytics/dashboards/overview → Overview dashboard
/analytics/dashboards/content → Content dashboard
/analytics/dashboards/users → User dashboard
/analytics/dashboards/custom → Custom dashboards
/analytics/dashboards/custom/new → Create custom dashboard
/analytics/dashboards/custom/{id} → Custom dashboard detail
```

### Reports Routes

```
/analytics/reports         → Reports
/analytics/reports/scheduled → Scheduled reports
/analytics/reports/scheduled/new → Create scheduled report
/analytics/reports/scheduled/{id} → Scheduled report detail
/analytics/reports/on-demand → On-demand reports
/analytics/reports/on-demand/new → Create on-demand report
/analytics/reports/on-demand/{id} → On-demand report detail
```

---

## Settings Application Sitemap

### Root Routes

```
/settings                  → Settings overview (default)
```

### Workspace Settings Routes

```
/settings/workspace        → Workspace settings
/settings/workspace/general → General settings
/settings/workspace/branding → Branding settings
/settings/workspace/theme → Theme settings
/settings/workspace/content → Content settings
/settings/workspace/collaboration → Collaboration settings
/settings/workspace/ai → AI settings
/settings/workspace/integrations → Integrations
```

### User Settings Routes

```
/settings/profile          → Profile settings
/settings/preferences      → Preferences
/settings/notifications    → Notifications
```

### Security Settings Routes

```
/settings/security         → Security settings
/settings/security/password → Password
/settings/security/mfa     → MFA
/settings/security/api-keys → API keys
/settings/security/sessions → Sessions
```

### Billing Settings Routes

```
/settings/billing          → Billing
/settings/billing/plan     → Plan
/settings/billing/usage    → Usage
/settings/billing/invoices  → Invoices
/settings/billing/payment-method → Payment method
```

### Developer Settings Routes

```
/settings/developer        → Developer settings
/settings/developer/api    → API
/settings/developer/webhooks → Webhooks
/settings/developer/sdk     → SDK
/settings/developer/documentation → Documentation
```

---

## Marketplace Application Sitemap

### Root Routes

```
/marketplace               → Marketplace (default)
```

### Plugins Routes

```
/marketplace/plugins       → Plugins
/marketplace/plugins/{id}  → Plugin detail
/marketplace/plugins/{id}/install → Install plugin
/marketplace/plugins/{id}/reviews → Plugin reviews
```

### Extensions Routes

```
/marketplace/extensions    → Extensions
/marketplace/extensions/{id} → Extension detail
/marketplace/extensions/{id}/install → Install extension
/marketplace/extensions/{id}/reviews → Extension reviews
```

### Templates Routes

```
/marketplace/templates     → Templates
/marketplace/templates/{id} → Template detail
/marketplace/templates/{id}/use → Use template
```

### My Plugins Routes

```
/marketplace/my-plugins    → My plugins
/marketplace/my-plugins/{id} → Plugin settings
/marketplace/my-plugins/{id}/uninstall → Uninstall plugin
```

### My Extensions Routes

```
/marketplace/my-extensions → My extensions
/marketplace/my-extensions/{id} → Extension settings
/marketplace/my-extensions/{id}/uninstall → Uninstall extension
```

---

## API Sitemap

### Authentication Routes

```
/api/v1/auth/login         → Login
/api/v1/auth/logout        → Logout
/api/v1/auth/signup        → Signup
/api/v1/auth/forgot-password → Forgot password
/api/v1/auth/reset-password → Reset password
/api/v1/auth/refresh       → Refresh token
/api/v1/auth/verify        → Verify token
```

### Workspace Routes

```
/api/v1/workspaces         → List workspaces
/api/v1/workspaces/new     → Create workspace
/api/v1/workspaces/{id}    → Workspace detail
/api/v1/workspaces/{id}/update → Update workspace
/api/v1/workspaces/{id}/delete → Delete workspace
/api/v1/workspaces/{id}/members → List members
/api/v1/workspaces/{id}/members/invite → Invite member
/api/v1/workspaces/{id}/members/{userId} → Member detail
/api/v1/workspaces/{id}/members/{userId}/update → Update member
/api/v1/workspaces/{id}/members/{userId}/remove → Remove member
```

### Content Routes

```
/api/v1/content            → List content
/api/v1/content/new        → Create content
/api/v1/content/{id}       → Content detail
/api/v1/content/{id}/update → Update content
/api/v1/content/{id}/delete → Delete content
/api/v1/content/{id}/publish → Publish content
/api/v1/content/{id}/unpublish → Unpublish content
/api/v1/content/{id}/versions → List versions
/api/v1/content/{id}/versions/{version} → Version detail
/api/v1/content/{id}/versions/{version}/revert → Revert to version
/api/v1/content/{id}/comments → List comments
/api/v1/content/{id}/comments/new → Create comment
/api/v1/content/{id}/comments/{commentId} → Comment detail
/api/v1/content/{id}/comments/{commentId}/update → Update comment
/api/v1/content/{id}/comments/{commentId}/delete → Delete comment
```

### Media Routes

```
/api/v1/media              → List media
/api/v1/media/upload       → Upload media
/api/v1/media/{id}         → Media detail
/api/v1/media/{id}/update → Update media
/api/v1/media/{id}/delete → Delete media
```

### AI Routes

```
/api/v1/ai/chat            → Chat with AI
/api/v1/ai/generate        → Generate content
/api/v1/ai/enhance         → Enhance content
/api/v1/ai/summarize       → Summarize content
/api/v1/ai/translate       → Translate content
/api/v1/ai/prompts          → List prompts
/api/v1/ai/prompts/new     → Create prompt
/api/v1/ai/prompts/{id}    → Prompt detail
/api/v1/ai/prompts/{id}/update → Update prompt
/api/v1/ai/prompts/{id}/delete → Delete prompt
/api/v1/ai/agents          → List agents
/api/v1/ai/agents/new      → Create agent
/api/v1/ai/agents/{id}     → Agent detail
/api/v1/ai/agents/{id}/execute → Execute agent
```

### Team Routes

```
/api/v1/team/members       → List team members
/api/v1/team/members/invite → Invite member
/api/v1/team/members/{id}  → Member detail
/api/v1/team/members/{id}/update → Update member
/api/v1/team/members/{id}/remove → Remove member
/api/v1/team/roles          → List roles
/api/v1/team/roles/new      → Create role
/api/v1/team/roles/{id}     → Role detail
/api/v1/team/roles/{id}/update → Update role
/api/v1/team/roles/{id}/delete → Delete role
/api/v1/team/permissions    → List permissions
/api/v1/team/permissions/check → Check permission
```

### Analytics Routes

```
/api/v1/analytics/content   → Content analytics
/api/v1/analytics/users     → User analytics
/api/v1/analytics/team      → Team analytics
/api/v1/analytics/ai        → AI analytics
/api/v1/analytics/dashboards → List dashboards
/api/v1/analytics/dashboards/new → Create dashboard
/api/v1/analytics/dashboards/{id} → Dashboard detail
/api/v1/analytics/reports   → List reports
/api/v1/analytics/reports/new → Create report
/api/v1/analytics/reports/{id} → Report detail
```

### Webhook Routes

```
/api/v1/webhooks           → List webhooks
/api/v1/webhooks/new       → Create webhook
/api/v1/webhooks/{id}      → Webhook detail
/api/v1/webhooks/{id}/update → Update webhook
/api/v1/webhooks/{id}/delete → Delete webhook
/api/v1/webhooks/{id}/test → Test webhook
```

---

## Navigation Hierarchy

### Primary Navigation (Sidebar)

**Level 1**:
- Dashboard
- Content
- AI
- Team
- Settings
- Marketplace

**Level 2 (Content)**:
- Pages
- Posts
- Projects
- Media

**Level 2 (AI)**:
- Assistant
- Prompts
- Tools
- Agents

**Level 2 (Team)**:
- Members
- Roles
- Permissions
- Activity

**Level 2 (Settings)**:
- Workspace
- Profile
- Security
- Billing
- Developer

---

## Breadcrumb Hierarchy

### Content

```
Dashboard > Content > Pages > {Page Name}
Dashboard > Content > Posts > {Post Name}
Dashboard > Content > Projects > {Project Name}
```

### AI

```
Dashboard > AI > Assistant
Dashboard > AI > Prompts > {Prompt Name}
Dashboard > AI > Agents > {Agent Name}
```

### Team

```
Dashboard > Team > Members > {Member Name}
Dashboard > Team > Roles > {Role Name}
```

### Settings

```
Dashboard > Settings > Workspace > General
Dashboard > Settings > Profile
Dashboard > Settings > Security > API Keys
```

---

## SEO Sitemap

### XML Sitemap Structure

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Static pages -->
  <url>
    <loc>https://neo.app/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://neo.app/login</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://neo.app/signup</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  
  <!-- Workspace subdomains -->
  <url>
    <loc>https://{workspace}.neo.app/</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Content pages (if public) -->
  <url>
    <loc>https://{workspace}.neo.app/content/pages/{slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>
```

---

## Redirects

### Legacy Redirects

```
/old-path → /new-path (301)
```

### Workspace Redirects

```
neo.app → {workspace}.neo.app (if workspace specified)
```

### Authentication Redirects

```
/dashboard → /login (if not authenticated)
/login → /dashboard (if authenticated)
```

---

## URL Patterns

### Content URLs

```
/content/{type}/{id} → Content detail
/content/{type}/{slug} → Content detail (SEO-friendly)
```

### User URLs

```
/team/members/{id} → Member detail
/team/members/{username} → Member detail (SEO-friendly)
```

### Workspace URLs

```
{workspace}.neo.app → Workspace subdomain
```

---

## Internationalization

### Language-Specific URLs

```
/en/content/pages/{slug} → English version
/es/content/pages/{slug} → Spanish version
/fr/content/pages/{slug} → French version
```

### Default Language

```
/content/pages/{slug} → Default language (English)
```

---

## Next Steps

1. **Review this sitemap** with product owner
2. **Begin Phase 1** (Product Architecture)
3. **Design module map**
4. **Design dependency graph**
5. **Begin Phase 2** (Design System)

---

## Conclusion

The sitemap defines a comprehensive URL structure and navigation hierarchy for Neo's AI-native Agency Platform. The structure is designed to be intuitive, scalable, and SEO-friendly, supporting the platform's modular architecture and future growth.
