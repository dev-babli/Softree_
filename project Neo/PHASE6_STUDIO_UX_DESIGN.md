# PHASE 6: STUDIO UX DESIGN

## Overview

This document provides a comprehensive Studio UX design for Project Neo's AI-native Agency Platform. The design covers dashboard, quick actions, recent content, draft center, scheduled publishing, activity feed, team workspace, command palette, spotlight search, AI assistant, and global search, building on UX patterns from Linear, Notion, Framer, Raycast, and Arc.

---

## DESIGN PHILOSOPHY

### Core Principles

1. **AI-Native First** - AI assistance is woven into every interaction
2. **Keyboard-First** - Power users can do everything without touching the mouse
3. **Dark Theme Default** - Sleek dark chrome with vibrant gradient accents
4. **Minimal Visual Noise** - Content takes center stage
5. **Instant Feedback** - Optimistic updates with zero perceived latency
6. **Context-Aware** - UI adapts to current context and user intent
7. **Progressive Disclosure** - Advanced features revealed when needed

### Design Language

- **Typography**: System sans-serif (Inter-like)
- **Color Palette**: Dark chrome background (#0A0A0B), vibrant gradient accents (purple to pink)
- **Spacing**: 4px grid system (4, 8, 16, 24, 32, 48px)
- **Border Radius**: 6px (medium) for most elements, 8px (large) for cards
- **Shadows**: Subtle to medium for depth
- **Animations**: Smooth, 200-300ms transitions

---

## LAYOUT ARCHITECTURE

### Overall Layout

```
┌─────────────────────────────────────────────────────────────────┐
│  Header: Logo | Workspace Switcher | Search | AI Assistant | User │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────────────────────────────────────────┐ │
│  │          │  │                                              │ │
│  │ Sidebar  │  │              Main Content Area               │ │
│  │          │  │                                              │ │
│  │          │  │                                              │ │
│  │          │  │                                              │ │
│  └──────────┘  └──────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

### Sidebar (Left)

- **Workspace Icon** (top)
- **Quick Actions** (Cmd+K)
- **Navigation Sections** (collapsible)
  - Content
  - Media
  - Analytics
  - Settings
- **Recent Items** (last 5)
- **Favorites** (pinned items)
- **Spaces/Workspaces** (dots at bottom)

### Header (Top)

- **Logo** (left)
- **Workspace Switcher** (dropdown)
- **Global Search** (Cmd+/)
- **AI Assistant** (Cmd+Shift+A)
- **User Menu** (avatar, right)

### Main Content Area

- **Dashboard** (default view)
- **Content List** (when browsing content)
- **Content Editor** (when editing content)
- **Settings** (when in settings)

---

## DASHBOARD

### Dashboard Layout

```
┌─────────────────────────────────────────────────────────────────┐
│  Dashboard                                                      │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │ Quick Stats  │  │ Recent Items │  │ Activity Feed │           │
│  │              │  │              │  │              │           │
│  │              │  │              │  │              │           │
│  └──────────────┘  └──────────────┘  └──────────────┘           │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ Draft Center                                            │   │
│  │                                                          │   │
│  └──────────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ Scheduled Publishing                                    │   │
│  │                                                          │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### Quick Stats Card

**Purpose**: At-a-glance metrics

**Layout**:
- 3-column grid
- Each stat shows:
  - Label (e.g., "Published", "Drafts", "Scheduled")
  - Number (large, bold)
  - Trend (up/down arrow with percentage)
  - Sparkline (mini chart)

**Interactions**:
- Click to navigate to filtered list
- Hover shows tooltip with more details

**Design**:
- Dark background (#131316)
- Accent color for numbers (#5E6AD2)
- Green for positive trends, red for negative
- Smooth hover animation

### Recent Items Card

**Purpose**: Quick access to recently edited content

**Layout**:
- List of 5-10 items
- Each item shows:
  - Icon (content type)
  - Title
  - Status badge (published, draft, scheduled)
  - Last edited time
  - Avatar of last editor

**Interactions**:
- Click to open item
- Hover shows quick actions (edit, duplicate, delete)
- Cmd+Click to open in new tab
- Right-click for context menu

**Design**:
- Compact rows
- Status badges with color coding
- Avatars with initials

### Activity Feed Card

**Purpose**: Real-time activity across workspace

**Layout**:
- List of recent activities
- Each activity shows:
  - User avatar
  - User name
  - Action (published, edited, commented)
  - Content title
  - Time ago

**Interactions**:
- Click to navigate to content
- Hover shows full details
- Filter by user or action

**Design**:
- Timeline-style layout
- Color-coded actions
- Relative timestamps

### Draft Center Card

**Purpose**: Central hub for all drafts

**Layout**:
- Grid of draft cards
- Each card shows:
  - Thumbnail (if image)
  - Title
  - Content type
  - Last edited
  - Progress indicator (completion %)

**Interactions**:
- Click to edit
- Drag to reorder
- Hover shows quick actions

**Design**:
- Card-based layout
- Progress bars
- Gradient accents

### Scheduled Publishing Card

**Purpose**: View and manage scheduled content

**Layout**:
- Timeline view
- Each scheduled item shows:
  - Date/time
  - Title
  - Content type
  - Channel(s)

**Interactions**:
- Click to edit
- Drag to reschedule
- Hover shows details

**Design**:
- Timeline visualization
- Color-coded by channel
- Smooth drag animation

---

## QUICK ACTIONS

### Quick Actions Modal

**Trigger**: Cmd+K or click Quick Actions in sidebar

**Layout**:
```
┌─────────────────────────────────────────┐
│  Quick Actions                    [×]  │
├─────────────────────────────────────────┤
│  🔍 Search actions...                  │
├─────────────────────────────────────────┤
│  Create                                │
│    📄 New Page          Cmd+N         │
│    📝 New Blog Post     Cmd+Shift+N   │
│    🖼️ New Image          Cmd+I         │
│                                         │
│  Navigate                               │
│    🏠 Dashboard          Cmd+D         │
│    📂 Content           Cmd+C         │
│    📊 Analytics         Cmd+A         │
│                                         │
│  AI Actions                             │
│    ✨ Generate Content   Cmd+G         │
│    🤖 AI Assistant       Cmd+Shift+A   │
│    🔍 AI Search         Cmd+Shift+S   │
│                                         │
│  Recent                                 │
│    📄 About Us                          │
│    📝 Blog Post #3                      │
└─────────────────────────────────────────┘
```

**Features**:
- Fuzzy search across all actions
- Keyboard navigation (arrow keys, Enter)
- Section headers
- Keyboard shortcuts displayed
- Recent actions at bottom
- Context-aware suggestions

**Interactions**:
- Type to filter
- Arrow keys to navigate
- Enter to execute
- Esc to close
- Tab to cycle through sections

**Design**:
- Dark modal with blur backdrop
- Gradient border on focus
- Smooth animations
- High contrast text

---

## RECENT CONTENT

### Recent Content View

**Purpose**: Quick access to recently edited content

**Layout**:
```
┌─────────────────────────────────────────────────────────────────┐
│  Recent Content                                    [View All →] │
├─────────────────────────────────────────────────────────────────┤
│  Filter: [All ▼] [Pages ▼] [Status ▼] [Date ▼]              │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ 📄 About Us                          Published  2h ago   │   │
│  │    Last edited by @john                                    │   │
│  └──────────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ 📝 Blog Post #3                       Draft  1d ago   │   │
│  │    Last edited by @sarah                                    │   │
│  └──────────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ 🖼️ Hero Image                         Published  3d ago   │   │
│  │    Last edited by @mike                                     │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

**Features**:
- Filter by content type, status, date
- Sort by date, name, status
- Search within recent content
- Quick actions on hover
- Keyboard navigation

**Interactions**:
- Click to open
- Hover shows quick actions
- Cmd+Click to open in new tab
- Right-click for context menu
- Arrow keys to navigate
- Enter to open

**Design**:
- List view with compact rows
- Status badges with color coding
- Avatar with initials
- Hover effects on rows

---

## DRAFT CENTER

### Draft Center View

**Purpose**: Central hub for all drafts

**Layout**:
```
┌─────────────────────────────────────────────────────────────────┐
│  Draft Center                                                   │
├─────────────────────────────────────────────────────────────────┤
│  Filter: [All ▼] [Pages ▼] [Progress ▼]  Sort: [Recent ▼]     │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │ About Us     │  │ Blog Post #3 │  │ Contact      │           │
│  │ 75% complete │  │ 30% complete │  │ 50% complete │           │
│  │ 2h ago       │  │ 1d ago       │  │ 3d ago       │           │
│  └──────────────┘  └──────────────┘  └──────────────┘           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │ Services     │  │ Team         │  │ FAQ          │           │
│  │ 90% complete │  │ 20% complete │  │ 10% complete │           │
│  │ 5d ago       │  │ 1w ago       │  │ 2w ago       │           │
│  └──────────────┘  └──────────────┘  └──────────────┘           │
└─────────────────────────────────────────────────────────────────┘
```

**Features**:
- Grid view of draft cards
- Progress indicator (completion %)
- Filter by content type, progress
- Sort by date, progress, name
- Quick actions on hover
- Bulk actions (multi-select)

**Interactions**:
- Click to edit
- Hover shows quick actions
- Drag to reorder
- Space to select (multi-select)
- Cmd+Click to add to selection
- Delete key to delete selected

**Design**:
- Card-based layout
- Progress bars with gradient
- Thumbnails for image content
- Smooth hover animations

---

## SCHEDULED PUBLISHING

### Scheduled Publishing View

**Purpose**: View and manage scheduled content

**Layout**:
```
┌─────────────────────────────────────────────────────────────────┐
│  Scheduled Publishing                              [+ Schedule] │
├─────────────────────────────────────────────────────────────────┤
│  View: [Timeline ▼] [Calendar ▼] [List ▼]                      │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ Today                                                   │   │
│  │  ┌────────────────────────────────────────────────┐     │   │
│  │  │ 📝 Blog Post #3  →  2:00 PM  →  Website     │     │   │
│  │  └────────────────────────────────────────────────┘     │   │
│  └──────────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ Tomorrow                                                │   │
│  │  ┌────────────────────────────────────────────────┐     │   │
│  │  │ 📄 About Us      →  10:00 AM →  Website     │     │   │
│  │  └────────────────────────────────────────────────┘     │   │
│  │  ┌────────────────────────────────────────────────┐     │   │
│  │  │ 🖼️ Hero Image    →  2:00 PM  →  Social      │     │   │
│  │  └────────────────────────────────────────────────┘     │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

**Features**:
- Timeline view (default)
- Calendar view
- List view
- Drag to reschedule
- Filter by channel
- Quick actions on hover

**Interactions**:
- Click to edit
- Drag to reschedule
- Hover shows details
- Right-click for context menu
- Double-click to open

**Design**:
- Timeline visualization
- Color-coded by channel
- Smooth drag animation
- Gradient accents for time

---

## ACTIVITY FEED

### Activity Feed View

**Purpose**: Real-time activity across workspace

**Layout**:
```
┌─────────────────────────────────────────────────────────────────┐
│  Activity Feed                                    [Filter ▼]    │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ @john published "About Us"                    2h ago     │   │
│  │    📄 About Us                                             │   │
│  └──────────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ @sarah edited "Blog Post #3"                  1d ago     │   │
│  │    📝 Blog Post #3                                          │   │
│  └──────────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ @mike commented on "Services"               3d ago     │   │
│  │    "Great work on this!"                                   │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

**Features**:
- Real-time updates via WebSocket
- Filter by user, action, content type
- Mark as read
- Subscribe to notifications
- Infinite scroll

**Interactions**:
- Click to navigate to content
- Hover shows full details
- Mark as read on click
- Filter via dropdown

**Design**:
- Timeline-style layout
- Color-coded actions
- Avatar with initials
- Relative timestamps
- Smooth animations for new items

---

## TEAM WORKSPACE

### Team Workspace View

**Purpose**: Collaborative workspace for team

**Layout**:
```
┌─────────────────────────────────────────────────────────────────┐
│  Team Workspace                                    [+ Invite]   │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────────┐  ┌──────────────────────────────────┐   │
│  │ Team Members     │  │ Active Now                      │   │
│  │                  │  │                                  │   │
│  │ @john (Admin)    │  │ @john                           │   │
│  │ @sarah (Editor)  │  │ @sarah                          │   │
│  │ @mike (Viewer)   │  │ @mike                           │   │
│  │                  │  │                                  │   │
│  └──────────────────┘  └──────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ Shared Content                                          │   │
│  │                                                          │   │
│  │ 📄 About Us  📝 Blog Post #3  🖼️ Hero Image             │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

**Features**:
- Team member list with roles
- Active now indicator (presence)
- Shared content
- Team chat
- Activity feed

**Interactions**:
- Click member to view profile
- Click content to open
- Hover shows quick actions
- Right-click for context menu

**Design**:
- Two-column layout
- Avatar with online indicator
- Role badges
- Color-coded presence

---

## COMMAND PALETTE

### Command Palette

**Trigger**: Cmd+K

**Layout**:
```
┌─────────────────────────────────────────┐
│  🔍 Search...                    [×]  │
├─────────────────────────────────────────┤
│  Actions                                │
│    📄 New Page          Cmd+N         │
│    📝 New Blog Post     Cmd+Shift+N   │
│    🖼️ New Image          Cmd+I         │
│                                         │
│  Content                                │
│    📄 About Us                          │
│    📝 Blog Post #3                      │
│    🖼️ Hero Image                        │
│                                         │
│  AI Actions                             │
│    ✨ Generate Content   Cmd+G         │
│    🤖 AI Assistant       Cmd+Shift+A   │
│                                         │
│  Navigation                             │
│    🏠 Dashboard          Cmd+D         │
│    📂 Content           Cmd+C         │
│    📊 Analytics         Cmd+A         │
└─────────────────────────────────────────┘
```

**Features**:
- Unified search across actions, content, AI
- Fuzzy search
- Keyboard navigation
- Section headers
- Keyboard shortcuts displayed
- Recent items
- Context-aware suggestions

**Interactions**:
- Type to search
- Arrow keys to navigate
- Enter to execute
- Tab to cycle sections
- Esc to close
- Cmd+K to refocus

**Design**:
- Dark modal with blur backdrop
- Gradient border on focus
- Smooth animations
- High contrast text
- Keyboard shortcut hints

---

## SPOTLIGHT SEARCH

### Spotlight Search

**Trigger**: Cmd+/

**Layout**:
```
┌─────────────────────────────────────────┐
│  🔍 Search content...          [×]     │
├─────────────────────────────────────────┤
│  Filters: [All ▼] [Pages ▼] [Status ▼]│
├─────────────────────────────────────────┤
│  Results (23)                          │
│                                         │
│  📄 About Us                            │
│     Published  Page  2h ago            │
│     ...content preview...               │
│                                         │
│  📝 Blog Post #3                        │
│     Draft  Blog Post  1d ago            │
│     ...content preview...               │
│                                         │
│  🖼️ Hero Image                          │
│     Published  Image  3d ago            │
│     ...content preview...               │
└─────────────────────────────────────────┘
```

**Features**:
- Full-text search across all content
- Filters by content type, status, date
- Content preview
- Keyboard navigation
- Recent searches
- Saved searches

**Interactions**:
- Type to search
- Arrow keys to navigate
- Enter to open
- Cmd+Enter to open in new tab
- Tab to cycle filters
- Esc to close

**Design**:
- Dark modal with blur backdrop
- Content preview with highlighting
- Smooth animations
- High contrast text

---

## AI ASSISTANT

### AI Assistant Panel

**Trigger**: Cmd+Shift+A or click AI Assistant in header

**Layout**:
```
┌─────────────────────────────────────────┐
│  🤖 AI Assistant                  [×]   │
├─────────────────────────────────────────┤
│  Chat                                   │
│                                         │
│  🤖 How can I help you today?           │
│                                         │
│  👤 Generate a blog post about AI      │
│                                         │
│  🤖 Sure! What topic would you like... │
│                                         │
│  👤 The future of AI in marketing       │
│                                         │
│  [Streaming response...]                │
│                                         │
├─────────────────────────────────────────┤
│  [Type a message...]              [→]  │
└─────────────────────────────────────────┘
```

**Features**:
- Conversational AI interface
- Streaming responses
- Context-aware suggestions
- Quick actions
- History
- Voice input (optional)

**Interactions**:
- Type message
- Enter to send
- Shift+Enter for new line
- Click suggestions
- Voice input (microphone icon)
- Esc to close

**Design**:
- Floating panel (right side)
- Dark theme
- Gradient accents for AI messages
- Smooth streaming animation
- Typing indicator

### AI Quick Actions

**Purpose**: Quick AI-powered actions

**Layout**:
```
┌─────────────────────────────────────────┐
│  ✨ AI Quick Actions                     │
├─────────────────────────────────────────┤
│  📝 Generate Content                    │
│  ✍️ Improve Writing                      │
│  🌐 Translate                            │
│  📊 Summarize                            │
│  🔍 Extract Insights                     │
│  🎨 Generate Image                       │
└─────────────────────────────────────────┘
```

**Features**:
- One-click AI actions
- Context-aware
- Streaming responses
- Custom prompts

**Interactions**:
- Click to execute
- Type to filter
- Enter to execute
- Esc to close

---

## GLOBAL SEARCH

### Global Search Bar

**Location**: Header

**Layout**:
```
┌─────────────────────────────────────────┐
│  🔍 Search...                           │
└─────────────────────────────────────────┘
```

**Features**:
- Search across all content
- Search across actions
- Search across team members
- Keyboard navigation
- Recent searches
- Saved searches

**Interactions**:
- Click to focus
- Type to search
- Arrow keys to navigate
- Enter to execute
- Cmd+K to open command palette
- Esc to close

**Design**:
- Minimal input
- Gradient border on focus
- Smooth animations
- High contrast text

---

## KEYBOARD SHORTCUTS

### Global Shortcuts

| Shortcut | Action |
|----------|--------|
| `Cmd+K` | Command palette |
| `Cmd+/` | Spotlight search |
| `Cmd+Shift+A` | AI assistant |
| `Cmd+N` | New page |
| `Cmd+Shift+N` | New blog post |
| `Cmd+D` | Dashboard |
| `Cmd+C` | Content |
| `Cmd+A` | Analytics |
| `Cmd+S` | Save |
| `Cmd+P` | Publish |
| `Cmd+Shift+P` | Schedule publish |
| `Cmd+F` | Find in document |
| `Cmd+Shift+F` | Find across workspace |
| `Cmd+G` | Generate content with AI |
| `Cmd+Shift+G` | Improve content with AI |
| `Esc` | Close modal / cancel |
| `Cmd+.` | Quick actions |

### Navigation Shortcuts

| Shortcut | Action |
|----------|--------|
| `Cmd+1` | Dashboard |
| `Cmd+2` | Content |
| `Cmd+3` | Media |
| `Cmd+4` | Analytics |
| `Cmd+5` | Settings |
| `Cmd+[` | Go back |
| `Cmd+]` | Go forward |
| `Cmd+Shift+↑` | Go to parent |
| `Cmd+Shift+↓` | Go to child |

### Editing Shortcuts

| Shortcut | Action |
|----------|--------|
| `Cmd+B` | Bold |
| `Cmd+I` | Italic |
| `Cmd+U` | Underline |
| `Cmd+K` | Insert link |
| `Cmd+Shift+K` | Insert image |
| `Cmd+/` | Insert comment |
| `Cmd+Enter` | Save and close |
| `Shift+Enter` | New line in chat |

### Selection Shortcuts

| Shortcut | Action |
|----------|--------|
| `Space` | Select item |
| `Shift+Space` | Select range |
| `Cmd+Space` | Select all |
| `Cmd+A` | Select all |
| `Cmd+D` | Duplicate selection |
| `Cmd+X` | Cut |
| `Cmd+C` | Copy |
| `Cmd+V` | Paste |

---

## RESPONSIVE DESIGN

### Desktop (> 1200px)

- Full sidebar
- Three-column dashboard
- Full command palette
- All features available

### Tablet (768px - 1200px)

- Collapsible sidebar
- Two-column dashboard
- Full command palette
- Most features available

### Mobile (< 768px)

- Bottom navigation
- Single column dashboard
- Full-screen command palette
- Essential features only

---

## ACCESSIBILITY

### Keyboard Navigation

- All features accessible via keyboard
- Clear focus indicators
- Skip to main content
- Logical tab order

### Screen Reader Support

- ARIA labels
- Semantic HTML
- Alt text for images
- Descriptive link text

### Color Contrast

- WCAG AA compliant
- High contrast text
- Color not only indicator
- Dark/light theme toggle

---

## ANIMATIONS

### Micro-Interactions

- Button hover: 150ms scale
- Card hover: 200ms lift
- Modal open: 300ms fade
- Page transition: 200ms slide

### Loading States

- Skeleton screens
- Progress indicators
- Spinners
- Skeleton text

### Feedback Animations

- Success checkmark
- Error shake
- Confetti on publish
- Pulse on new activity

---

## NEXT STEPS

1. **Design plugin architecture** - Plugin system with hooks, lifecycle, marketplace
2. **Design extension architecture** - Extension system
3. **Design permission system** - RBAC with field-level and document-level permissions
4. **Design navigation architecture** - Navigation system
5. **Design workspace system** - Workspace system
6. **Design review system** - Review system
7. **Generate full architecture** - After all research and analysis
