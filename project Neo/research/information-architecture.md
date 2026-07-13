# Information Architecture

**Date**: July 8, 2026
**Analyyst**: Cascade AI
**Purpose**: Define the information architecture for Neo's AI-native Agency Platform

---

## Executive Summary

This document defines the information architecture for Neo, organizing the platform into a logical hierarchy that supports the AI-native Agency Platform vision. The architecture is designed to be modular, scalable, and extensible, with the CMS as one module among many future modules.

---

## Platform Hierarchy

```
Neo Platform
├── Applications
│   ├── Studio (Content Management)
│   ├── Dashboard (Analytics & Overview)
│   ├── Settings (Platform Configuration)
│   └── Marketplace (Plugins & Extensions)
├── Modules
│   ├── CMS Module (Content Management)
│   ├── AI Module (AI Integration)
│   ├── Collaboration Module (Team Features)
│   ├── Analytics Module (Data & Insights)
│   └── Integration Module (Third-party Services)
└── Features
    ├── Content Features
    ├── AI Features
    ├── Collaboration Features
    ├── Analytics Features
    └── Integration Features
```

---

## Application Layer

### Studio Application

**Purpose**: Primary application for content creation and management

**Key Sections**:
- Dashboard (overview, quick actions, recent content)
- Content (content list, content editor)
- Media (media library, uploads)
- AI (AI assistant, prompts, tools)
- Team (team members, roles, permissions)
- Settings (workspace settings, preferences)

**Navigation**:
- Sidebar with collapsible sections
- Command palette (Cmd+K)
- Breadcrumbs for hierarchy
- Recent items and favorites

---

### Dashboard Application

**Purpose**: Analytics and platform overview

**Key Sections**:
- Overview (key metrics, trends)
- Content Analytics (performance, engagement)
- User Analytics (users, sessions)
- Team Analytics (activity, productivity)
- AI Analytics (token usage, costs)
- Custom Dashboards (user-created)

**Navigation**:
- Tab-based navigation
- Time range filters
- Export options

---

### Settings Application

**Purpose**: Platform configuration

**Key Sections**:
- Workspace Settings (name, branding, theme)
- User Settings (profile, preferences, notifications)
- Security Settings (authentication, MFA, API keys)
- Integration Settings (Slack, GitHub, webhooks)
- Billing Settings (plan, usage, invoices)
- Developer Settings (API access, webhooks, SDK)

**Navigation**:
- Tab-based navigation
- Grouped settings by category
- Search for settings

---

### Marketplace Application

**Purpose**: Discover and install plugins and extensions

**Key Sections**:
- Plugins (internal plugins)
- Extensions (community extensions)
- Templates (workspace templates)
- My Plugins (installed plugins)
- My Extensions (installed extensions)

**Navigation**:
- Category filters
- Search
- Sort by popularity, rating, date

---

## Module Layer

### CMS Module

**Purpose**: Content management system

**Sub-modules**:
- Content Types (pages, posts, projects, etc.)
- Schema Management (documents, singletons, objects)
- Field Management (field types, validation)
- Page Builder (visual sections)
- Rich Text Editor (Lexical-based)
- Media Management (uploads, optimization)
- Version Control (history, compare, revert)
- Publishing Workflow (draft, review, publish)

**Content Hierarchy**:
```
Workspace
├── Content Types
│   ├── Pages
│   ├── Posts
│   ├── Projects
│   └── Custom Types
├── Singletons
│   ├── Settings
│   ├── Navigation
│   └── Footer
└── Media
    ├── Images
    ├── Videos
    └── Documents
```

---

### AI Module

**Purpose**: AI integration and features

**Sub-modules**:
- AI Gateway (multi-provider abstraction)
- Provider Registry (OpenAI, Anthropic, Google)
- Streaming Manager (streaming responses)
- Context Engine (user, workspace, document context)
- Memory System (short, long, episodic, semantic)
- Prompt Library (template-based prompts)
- Agent Framework (multi-agent orchestration)
- Tool Calling (MCP integration)

**AI Hierarchy**:
```
AI Module
├── Providers
│   ├── OpenAI
│   ├── Anthropic
│   └── Google
├── Context
│   ├── User Context
│   ├── Workspace Context
│   ├── Document Context
│   └── Conversation Context
├── Memory
│   ├── Short-term Memory
│   ├── Long-term Memory
│   ├── Episodic Memory
│   └── Semantic Memory
├── Prompts
│   ├── Content Generation
│   ├── Content Enhancement
│   ├── SEO Generation
│   └── Custom Prompts
├── Agents
│   ├── Content Creation Agent
│   ├── Code Generation Agent
│   └── Custom Agents
└── Tools
    ├── Content Tools
    ├── SEO Tools
    └── Custom Tools
```

---

### Collaboration Module

**Purpose**: Team collaboration features

**Sub-modules**:
- Real-time Collaboration (live editing, cursors)
- Comments (inline comments, threaded discussions)
- Mentions (@mentions, notifications)
- Activity Feed (real-time activity)
- Notifications (multi-channel notifications)
- Review System (approvals, version control)
- Team Management (invite, roles, permissions)

**Collaboration Hierarchy**:
```
Collaboration Module
├── Real-time
│   ├── Live Editing
│   ├── Cursor Tracking
│   └── Presence
├── Comments
│   ├── Inline Comments
│   ├── Threaded Discussions
│   └── Mentions
├── Activity
│   ├── Activity Feed
│   ├── Notifications
│   └── History
├── Reviews
│   ├── Review Workflow
│   ├── Approvals
│   └── Version Control
└── Team
    ├── Members
    ├── Roles
    └── Permissions
```

---

### Analytics Module

**Purpose**: Data and insights

**Sub-modules**:
- Content Analytics (performance, engagement)
- User Analytics (users, sessions, behavior)
- Team Analytics (activity, productivity)
- AI Analytics (token usage, costs)
- Custom Dashboards (user-created)
- Reports (scheduled, on-demand)
- Export (CSV, PDF, API)

**Analytics Hierarchy**:
```
Analytics Module
├── Content
│   ├── Performance
│   ├── Engagement
│   └── SEO
├── Users
│   ├── Sessions
│   ├── Behavior
│   └── Retention
├── Team
│   ├── Activity
│   ├── Productivity
│   └── Collaboration
├── AI
│   ├── Token Usage
│   ├── Costs
│   └── Performance
├── Dashboards
│   ├── Pre-built
│   └── Custom
└── Reports
    ├── Scheduled
    └── On-demand
```

---

### Integration Module

**Purpose**: Third-party service integration

**Sub-modules**:
- Git Integration (GitHub, GitLab, Bitbucket)
- Slack Integration (notifications, commands)
- GitHub Integration (issues, PRs)
- Webhooks (incoming, outgoing)
- API Access (REST, GraphQL)
- Custom Integrations (extension system)

**Integration Hierarchy**:
```
Integration Module
├── Git
│   ├── GitHub
│   ├── GitLab
│   └── Bitbucket
├── Communication
│   ├── Slack
│   ├── Discord
│   └── Email
├── Development
│   ├── GitHub
│   └── Custom
├── Webhooks
│   ├── Incoming
│   └── Outgoing
└── API
    ├── REST
    ├── GraphQL
    └── SDK
```

---

## Feature Layer

### Content Features

**Hierarchy**:
```
Content Features
├── Creation
│   ├── New Content
│   ├── Page Builder
│   ├── Rich Text Editor
│   └── Media Upload
├── Management
│   ├── Content List
│   ├── Bulk Actions
│   ├── Search
│   └── Filters
├── Editing
│   ├── Inline Editing
│   ├── Visual Editor
│   ├── Drag and Drop
│   └── Keyboard Shortcuts
├── Publishing
│   ├── Draft System
│   ├── Review Workflow
│   ├── Scheduled Publishing
│   └── Multi-Channel Publishing
└── Organization
│   ├── Folders
│   ├── Tags
│   ├── Collections
│   └── Favorites
```

---

### AI Features

**Hierarchy**:
```
AI Features
├── Content Creation
│   ├── Generate Content
│   ├── Continue Writing
│   ├── Rewrite
│   └── Expand
├── Content Enhancement
│   ├── Improve Writing
│   ├── Fix Grammar
│   ├── Enhance Clarity
│   └── Adjust Tone
├── SEO
│   ├── Generate SEO
│   ├── Generate Metadata
│   ├── Generate Alt Text
│   └── Internal Linking
├── Translation
│   ├── Translate Content
│   ├── Localize
│   └── Detect Language
├── Summarization
│   ├── Summarize Content
│   ├── Extract Key Points
│   └── Generate Excerpts
├── Accessibility
│   ├── Improve Accessibility
│   ├── Generate Alt Text
│   └── Check Contrast
└── Custom
    ├── Custom Prompts
    ├── Custom Agents
    └── Custom Tools
```

---

### Collaboration Features

**Hierarchy**:
```
Collaboration Features
├── Real-time
│   ├── Live Editing
│   ├── Cursor Tracking
│   ├── Presence
│   └── Conflict Resolution
├── Communication
│   ├── Comments
│   ├── Mentions
│   ├── Discussions
│   └── Notifications
├── Reviews
│   ├── Request Review
│   ├── Approve
│   ├── Request Changes
│   └── Version History
├── Team
│   ├── Invite Members
│   ├── Assign Roles
│   ├── Manage Permissions
│   └── Activity Feed
└── Workflows
    ├── Approval Workflows
    ├── Custom Workflows
    └── Automation
```

---

### Analytics Features

**Hierarchy**:
```
Analytics Features
├── Content
│   ├── Page Views
│   ├── Engagement
│   ├── Conversion
│   └── SEO Performance
├── Users
│   ├── Active Users
│   ├── Sessions
│   ├── Behavior
│   └── Retention
├── Team
│   ├── Activity
│   ├── Productivity
│   ├── Collaboration
│   └── Performance
├── AI
│   ├── Token Usage
│   ├── Costs
│   ├── Performance
│   └── Usage by Feature
├── Dashboards
│   ├── Overview Dashboard
│   ├── Content Dashboard
│   ├── User Dashboard
│   └── Custom Dashboards
└── Reports
    ├── Scheduled Reports
    ├── On-demand Reports
    └── Export Reports
```

---

### Integration Features

**Hierarchy**:
```
Integration Features
├── Git
│   ├── Commit to Git
│   ├── Sync with Git
│   └── Branch Management
├── Communication
│   ├── Slack Notifications
│   ├── Slack Commands
│   ├── Email Notifications
│   └── Webhooks
├── Development
│   ├── GitHub Issues
│   ├── GitHub PRs
│   └── Custom Integrations
├── API
│   ├── REST API
│   ├── GraphQL API
│   ├── Webhooks
│   └── SDK
└── Custom
    ├── Custom Integrations
    ├── Extension System
    └── Plugin System
```

---

## Content Model Architecture

### Document Types

**Pages**:
- Basic pages (about, contact, etc.)
- Landing pages
- Product pages
- Custom page types

**Posts**:
- Blog posts
- News articles
- Press releases
- Custom post types

**Projects**:
- Portfolio projects
- Case studies
- Custom project types

**People**:
- Team members
- Authors
- Custom person types

**Custom Types**:
- User-defined content types
- Agency-specific types
- Industry-specific types

### Singleton Types

**Settings**:
- Global settings
- SEO settings
- Navigation settings

**Navigation**:
- Main navigation
- Footer navigation
- Custom navigation

**Footer**:
- Footer content
- Social links
- Custom footer

### Object Types

**Sections**:
- Hero section
- Info section
- Call to action
- Custom sections

**Components**:
- Button
- Card
- List
- Custom components

**Fields**:
- Custom field types
- Validation rules
- Conditional logic

---

## User Role Architecture

### System Roles

**Owner**:
- Full access to everything
- Can manage users and roles
- Can manage workspace settings
- Can delete workspace

**Admin**:
- Full access except user/role management
- Can manage content
- Can manage settings

**Editor**:
- Can create, read, update, publish content
- Cannot manage users or settings

**Author**:
- Can create and update own content
- Cannot publish

**Viewer**:
- Can only read content
- Cannot create or update

### Custom Roles

**Account Manager**:
- Manages client relationships
- Can create and update content
- Can publish with approval

**Content Manager**:
- Manages content strategy
- Can create, update, publish content
- Can manage content types

**SEO Specialist**:
- Manages SEO
- Can update SEO fields
- Can generate SEO with AI

**Developer**:
- Can access API
- Can manage integrations
- Can manage webhooks

---

## Workspace Architecture

### Workspace Structure

**Main Workspace**:
- Primary workspace for agency
- All team members
- All content types
- Full feature set

**Client Workspaces**:
- Isolated workspace per client
- Client-specific team members
- Client-specific content types
- Client-specific settings

**Project Workspaces**:
- Workspace per project
- Project-specific team members
- Project-specific content
- Project-specific settings

### Workspace Features

**Workspace Settings**:
- Name and branding
- Theme customization
- Default settings
- Feature toggles

**Workspace Members**:
- Team members
- Roles and permissions
- Activity tracking

**Workspace Content**:
- Content types
- Schemas
- Templates
- Media library

**Workspace Integrations**:
- Slack integration
- GitHub integration
- Custom integrations

---

## Navigation Architecture

### Primary Navigation (Sidebar)

**Workspace Header**:
- Workspace icon
- Workspace name
- Workspace switcher

**Quick Actions**:
- Command palette (Cmd+K)
- New content (Cmd+N)
- Search (Cmd+/)

**Navigation Sections**:
- Dashboard (Cmd+D)
- Content (Cmd+C)
  - Pages
  - Posts
  - Projects
  - Media
- AI (Cmd+A)
  - AI Assistant
  - Prompts
  - Tools
- Team (Cmd+T)
  - Members
  - Roles
  - Activity
- Settings (Cmd+,)

**Recent Items**:
- Last 5 accessed items

**Favorites**:
- Pinned items

**Workspaces**:
- Workspace switcher
- Workspace dots

### Secondary Navigation (Tabs)

**Content List**:
- Filter tabs (All, Published, Draft, Scheduled)
- Sort options
- View options (list, grid)

**Content Editor**:
- Editor tabs
- Preview tab
- Settings tab
- Comments tab

### Tertiary Navigation (Breadcrumbs)

**Hierarchy**:
- Workspace > Content > Type > Item
- Workspace > AI > Prompts > Prompt
- Workspace > Team > Members > Member

---

## Search Architecture

### Global Search

**Search Scope**:
- Content (all types)
- Team members
- Settings
- AI prompts
- Commands

**Search Features**:
- Fuzzy search
- Filters by type
- Filters by status
- Filters by date
- Keyboard navigation

### Command Palette

**Command Types**:
- Content commands (new, edit, delete)
- Navigation commands (go to, go back)
- AI commands (generate, enhance)
- Settings commands (open settings)
- Custom commands (plugins, extensions)

### Spotlight Search

**Search Scope**:
- Content only
- Full-text search
- Content preview
- Keyboard navigation

---

## Settings Architecture

### Workspace Settings

**General**:
- Workspace name
- Workspace description
- Workspace logo
- Workspace theme

**Content**:
- Default content types
- Publishing workflow
- Version history
- Auto-save

**Collaboration**:
- Allow comments
- Allow guests
- Guest permissions

**AI**:
- AI enabled
- AI provider
- AI model
- AI settings

**Integrations**:
- Slack integration
- GitHub integration
- Custom integrations

### User Settings

**Profile**:
- Name
- Email
- Avatar
- Bio

**Preferences**:
- Theme (dark/light)
- Language
- Timezone
- Date format

**Notifications**:
- Email notifications
- Push notifications
- Slack notifications
- Notification preferences

**Security**:
- Password
- MFA
- API keys
- Sessions

---

## Next Steps

1. **Review this information architecture** with product owner
2. **Create sitemap** based on this architecture
3. **Begin Phase 1** (Product Architecture)
4. **Design module map**
5. **Design dependency graph**

---

## Conclusion

The information architecture defines a modular, scalable structure for Neo's AI-native Agency Platform. The architecture separates concerns into applications, modules, and features, with the CMS as one module among many. This design supports the platform vision of extensibility and future growth beyond just content management.
