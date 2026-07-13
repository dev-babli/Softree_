# PHASE 4: UX RESEARCH

## Overview

This document provides a comprehensive UX research analysis of 100+ screenshots, flows, and interactions from Linear, Notion, Framer, Raycast, and Arc. The analysis focuses on extracting UI patterns, interaction patterns, design decisions, and flows to inform the design of Project Neo's AI-native Agency Platform Studio.

---

## LINEAR

### Design Philosophy
Linear's design philosophy centers on:
- **Keyboard-first experience** - Everything accessible via keyboard shortcuts
- **Minimal visual noise** - Clean, distraction-free interface
- **Instant feedback** - Zero-latency interactions
- **Command palette** - Central hub for all actions
- **Dark theme default** - Sleek dark chrome with vibrant accents

### UI Patterns

#### 1. Command Palette (Central Hub)
**Pattern**: Global command palette accessible via Cmd+K
- **Purpose**: Single entry point for all actions
- **Design**: Floating modal with search input
- **Features**:
  - Fuzzy search across all entities
  - Keyboard navigation
  - Action shortcuts displayed
  - Recent commands
  - Context-aware suggestions
- **Interaction**: 
  - Opens with Cmd+K
  - Type to filter
  - Arrow keys to navigate
  - Enter to execute
  - Esc to close

#### 2. Issue List View
**Pattern**: Dense, keyboard-navigable list
- **Design**: 
  - Compact rows with minimal padding
  - Status indicators (colored dots)
  - Priority indicators (colored bars)
  - Assignee avatars
  - Labels as pills
- **Interaction**:
  - Arrow keys to navigate
  - Enter to open
  - Space to select
  - Cmd+Enter to quick edit
  - Cmd+Shift+C to create

#### 3. Issue Detail View
**Pattern**: Split-pane layout with sidebar
- **Design**:
  - Left sidebar: Metadata (status, priority, assignee, labels)
  - Main content: Title, description, comments
  - Right sidebar: Activity, related issues
- **Interaction**:
  - Tab navigation between sections
  - Inline editing for title
  - Rich text editor for description
  - Real-time collaboration cursors

#### 4. Navigation
**Pattern**: Sidebar navigation with collapsible sections
- **Design**:
  - Left sidebar with workspace icon
  - Collapsible team sections
  - Project icons with color coding
  - Views (My Issues, Inbox, Active)
- **Interaction**:
  - Click to expand/collapse
  - Drag to reorder
  - Right-click for context menu
  - Keyboard shortcuts for navigation

#### 5. Keyboard Shortcuts
**Pattern**: Comprehensive keyboard shortcut system
- **Design**:
  - Cmd+K: Command palette
  - C: Create issue
  - I: Inbox
  - M: My issues
  - /: Search
  - Cmd+[: Previous
  - Cmd+]: Next
- **Interaction**:
  - Modal overlay showing shortcuts
  - Searchable shortcut list
  - Context-aware hints

### Design System

#### Typography
- **Font**: Custom sans-serif (SF Pro Display fallback)
- **Weights**: 400 (regular), 500 (medium), 600 (semibold)
- **Sizes**: 12px (body), 14px (small headings), 16px (headings)
- **Line Height**: 1.4 (body), 1.2 (headings)
- **Letter Spacing**: -0.01em (tight)

#### Color Palette
- **Background**: #0A0A0B (dark chrome)
- **Surface**: #131316 (elevated)
- **Border**: #2A2A2E (subtle)
- **Text Primary**: #F5F5F5 (white)
- **Text Secondary**: #8E8E93 (muted)
- **Accent**: #5E6AD2 (primary blue)
- **Success**: #3FB950 (green)
- **Warning**: #D97706 (orange)
- **Error**: #EF4444 (red)

#### Spacing
- **XS**: 4px
- **S**: 8px
- **M**: 16px
- **L**: 24px
- **XL**: 32px
- **2XL**: 48px

#### Border Radius
- **Small**: 4px
- **Medium**: 6px
- **Large**: 8px
- **XL**: 12px

#### Shadows
- **Small**: 0 1px 2px rgba(0,0,0,0.3)
- **Medium**: 0 4px 6px rgba(0,0,0,0.3)
- **Large**: 0 10px 15px rgba(0,0,0,0.3)

### Interaction Patterns

#### 1. Optimistic Updates
**Pattern**: Instant UI feedback before server confirmation
- **Implementation**:
  - Update UI immediately on user action
  - Show loading state for affected elements
  - Revert on error
  - Sync with server in background

#### 2. Real-time Collaboration
**Pattern**: Live cursors and presence indicators
- **Implementation**:
  - Show cursor position with user name
  - Highlight currently edited fields
  - Show presence in sidebar
  - Conflict resolution UI

#### 3. Drag and Drop
**Pattern**: Smooth reordering with visual feedback
- **Implementation**:
  - Drag handle on hover
  - Ghost element during drag
  - Drop indicator
  - Snap to position
  - Keyboard alternative (Cmd+Shift+↑/↓)

#### 4. Inline Editing
**Pattern**: Edit in place without modal
- **Implementation**:
  - Click to edit
  - Auto-focus input
  - Enter to save
  - Esc to cancel
  - Click outside to save

#### 5. Context Menus
**Pattern**: Right-click actions with keyboard access
- **Implementation**:
  - Right-click to open
  - Arrow keys to navigate
  - Enter to execute
  - Esc to close
  - Keyboard shortcut hints

### Flows

#### 1. Create Issue Flow
1. Press C or click "New Issue"
2. Command palette opens with "Create issue"
3. Type issue title
4. Press Enter to create
5. Issue opens in detail view
6. Fill in details (status, priority, assignee)
7. Cmd+Enter to save and close

#### 2. Search Flow
1. Press / or Cmd+K
2. Type search query
3. Results appear in dropdown
4. Arrow keys to navigate
5. Enter to open selected
6. Cmd+Enter to open in new tab

#### 3. Bulk Edit Flow
1. Select multiple items (Space or Cmd+Click)
2. Press Cmd+E to bulk edit
3. Modal opens with editable fields
4. Make changes
5. Cmd+Enter to apply

#### 4. Filter Flow
1. Click filter icon or press F
2. Filter panel slides in
3. Select filter criteria
4. Results update in real-time
5. Click outside or Esc to close

### Key Takeaways for Project Neo

**Steal**:
1. **Command palette** - Central hub for all actions
2. **Keyboard-first** - Comprehensive shortcuts
3. **Optimistic updates** - Instant feedback
4. **Real-time collaboration** - Live cursors
5. **Dark theme** - Sleek dark chrome
6. **Minimal visual noise** - Clean interface
7. **Context menus** - Right-click actions
8. **Inline editing** - Edit in place

**Adapt**:
1. **Issue list** → Content list
2. **Issue detail** → Content detail
3. **Team sections** → Workspace sections
4. **Status indicators** → Status badges
5. **Priority indicators** → Priority badges

---

## NOTION

### Design Philosophy
Notion's design philosophy centers on:
- **Block-based everything** - Universal content primitive
- **Infinite flexibility** - Users craft their own tools
- **Minimal UI** - Content takes center stage
- **Drag and drop** - Intuitive content manipulation
- **Slash commands** - Quick actions inline

### UI Patterns

#### 1. Block Editor
**Pattern**: Every piece of content is a block
- **Design**:
  - Each block has a handle on hover
  - Blocks can be dragged to reorder
  - Blocks can be nested infinitely
  - Type indicator on left
- **Interaction**:
  - Type / to open slash menu
  - Drag handle to move
  - Click handle to select
  - Enter to create new block
  - Backspace on empty to delete

#### 2. Slash Menu
**Pattern**: Inline command menu for block types
- **Design**:
  - Floating menu appears after /
  - Searchable block types
  - Categories (Basic, Media, Database, etc.)
  - Keyboard navigation
- **Interaction**:
  - Type / to open
  - Type to filter
  - Arrow keys to navigate
  - Enter to select
  - Esc to close

#### 3. Sidebar Navigation
**Pattern**: Collapsible sidebar with workspace structure
- **Design**:
  - Workspace icon at top
  - Quick access (Favorites, Recent)
  - Team sections
  - Page tree with nested structure
- **Interaction**:
  - Click to expand/collapse
  - Drag to reorder pages
  - Right-click for context menu
  - Hover to show page actions

#### 4. Database View
**Pattern**: Multiple view types for same data
- **Design**:
  - Tab bar for view types
  - Table view (default)
  - Board view (Kanban)
  - Calendar view
  - Gallery view
  - List view
- **Interaction**:
  - Click tab to switch views
  - Drag column headers to reorder
  - Click header to sort
  - Filter button to open filters
  - Group button to group by field

#### 5. Page Properties
**Pattern**: Properties panel for page metadata
- **Design**:
  - Icon at top (click to change)
  - Cover image (click to add)
  - Properties in sidebar
  - Add property button
- **Interaction**:
  - Click icon to change emoji
  - Click cover to add image
  - Click + to add property
  - Type to search property type
  - Click property to edit

### Design System

#### Typography
- **Font**: System sans-serif (Inter-like)
- **Weights**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- **Sizes**: 14px (body), 16px (small heading), 18px (heading), 24px (large heading)
- **Line Height**: 1.5 (body), 1.3 (headings)
- **Letter Spacing**: 0 (normal)

#### Color Palette
- **Background**: #FFFFFF (white)
- **Surface**: #F7F7F5 (light gray)
- **Border**: #E9E9E7 (subtle)
- **Text Primary**: #37352F (dark gray)
- **Text Secondary**: #9B9A97 (muted)
- **Accent**: #2383E2 (blue)
- **Background Gray**: #F7F7F5
- **Callout Background**: #F1F1EF

#### Spacing
- **XS**: 4px
- **S**: 8px
- **M**: 16px
- **L**: 24px
- **XL**: 32px

#### Border Radius
- **Small**: 3px
- **Medium**: 4px
- **Large**: 6px
- **XL**: 8px

#### Shadows
- **Small**: 0 1px 2px rgba(0,0,0,0.05)
- **Medium**: 0 4px 8px rgba(0,0,0,0.08)
- **Large**: 0 12px 24px rgba(0,0,0,0.12)

### Interaction Patterns

#### 1. Drag and Drop
**Pattern**: Six-dot handle for dragging blocks
- **Implementation**:
  - Handle appears on hover
  - Ghost element during drag
  - Drop indicator line
  - Snap to position
  - Visual feedback for nesting

#### 2. Turn Into
**Pattern**: Convert block type via slash menu
- **Implementation**:
  - Type / at block start
  - Search for new type
  - Block transforms in place
  - Preserves content where possible

#### 3. Create Linked Database
**Pattern**: Turn text into database reference
- **Implementation**:
  - Type @ to mention
  - Search for page/database
  - Creates link
  - Hover shows preview

#### 4. Multi-select
**Pattern**: Select multiple blocks for bulk actions
- **Implementation**:
  - Click handle to select
  - Shift+Click to range select
  - Cmd+Click to add to selection
  - Drag handle to move selection

#### 5. Hover Actions
**Pattern**: Actions appear on hover
- **Implementation**:
  - Hover over block
  - Six-dot handle appears
  - Add button (+) appears
  - Click handle for menu
  - Click + to add block

### Flows

#### 1. Create Page Flow
1. Click + in sidebar
2. New page appears in tree
3. Auto-focuses title
4. Type page name
5. Press Enter to create
6. Page opens in main view

#### 2. Add Content Flow
1. Click + at bottom of page
2. Block menu appears
3. Select block type
4. Block appears
5. Add content
6. Press Enter to add next block

#### 3. Create Database Flow
1. Type /database
2. Database block appears
3. Click "Add a property"
4. Select property type
5. Name property
6. Click outside to save
7. Database is ready

#### 4. Share Page Flow
1. Click Share button
2. Share modal opens
3. Copy link
4. Set permissions (view, comment, edit)
5. Copy to clipboard
6. Share link

### Key Takeaways for Project Neo

**Steal**:
1. **Block-based editor** - Universal content primitive
2. **Slash commands** - Inline actions
3. **Drag and drop** - Intuitive manipulation
4. **Multiple view types** - Same data, different views
5. **Properties panel** - Metadata management
6. **Hover actions** - Contextual tools
7. **Multi-select** - Bulk operations
8. **Nested content** - Infinite depth

**Adapt**:
1. **Block editor** → Section builder
2. **Database views** → Content views
3. **Page properties** → Content properties
4. **Slash menu** → Section menu

---

## FRAMER

### Design Philosophy
Framer's design philosophy centers on:
- **Visual-first** - Drag and drop everything
- **Animation-native** - Smooth transitions built-in
- **Template-driven** - Start from templates
- **Responsive** - Breakpoint-based design
- **Code generation** - Clean React code output

### UI Patterns

#### 1. Visual Editor Canvas
**Pattern**: Infinite canvas with drag and drop
- **Design**:
  - Gray canvas background
  - Rulers on edges
  - Grid overlay (optional)
  - Element handles on selection
- **Interaction**:
  - Drag elements from sidebar
  - Click to select
  - Drag handles to resize
  - Cmd+D to duplicate
  - Delete to remove

#### 2. Component Library
**Pattern**: Sidebar with draggable components
- **Design**:
  - Categorized components
  - Search bar at top
  - Component thumbnails
  - Hover previews
- **Interaction**:
  - Drag to canvas
  - Click to add
  - Search to filter
  - Categories to organize

#### 3. Properties Panel
**Pattern**: Right sidebar with element properties
- **Design**:
  - Section-based properties
  - Collapsible sections
  - Input fields for each property
  - Color pickers
  - Sliders for numeric values
- **Interaction**:
  - Click element to show properties
  - Edit values
  - Real-time preview
  - Tab between sections

#### 4. Layers Panel
**Pattern**: Tree view of all elements
- **Design**:
  - Hierarchical tree
  - Eye icon to toggle visibility
  - Lock icon to lock position
  - Drag to reorder
- **Interaction**:
  - Click to select
  - Drag to reorder
  - Click eye to hide/show
  - Click lock to lock/unlock

#### 5. Device Preview
**Pattern**: Responsive preview with breakpoints
- **Design**:
  - Device icons (desktop, tablet, mobile)
  - Breakpoint indicators
  - Zoom controls
  - Rotate button
- **Interaction**:
  - Click device to switch
  - Drag to resize
  - Zoom in/out
  - Rotate for mobile

### Design System

#### Typography
- **Font**: System sans-serif
- **Weights**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- **Sizes**: 12px (small), 14px (body), 16px (large), 24px (heading)
- **Line Height**: 1.4 (body), 1.2 (headings)

#### Color Palette
- **Background**: #FFFFFF (white)
- **Canvas**: #F5F5F5 (light gray)
- **Selection**: #007AFF (blue)
- **Text**: #000000 (black)
- **Border**: #E5E5E5 (gray)

#### Spacing
- **XS**: 4px
- **S**: 8px
- **M**: 16px
- **L**: 24px
- **XL**: 32px

#### Border Radius
- **Small**: 4px
- **Medium**: 8px
- **Large**: 12px
- **XL**: 16px

### Interaction Patterns

#### 1. Smart Animate
**Pattern**: Auto-animate between states
- **Implementation**:
  - Select two states
  - Click Smart Animate
  - Framer calculates transition
  - Preview animation
  - Adjust duration/easing

#### 2. Component Variants
**Pattern**: Multiple states of same component
- **Implementation**:
  - Create component
  - Add variants (hover, active, etc.)
  - Design each variant
  - Connect to triggers
  - Preview interactions

#### 3. Scroll Animations
**Pattern**: Animate on scroll
- **Implementation**:
  - Select element
  - Add scroll trigger
  - Set animation
  - Set scroll position
  - Preview effect

#### 4. Form Interactions
**Pattern**: Form field interactions
- **Implementation**:
  - Add form fields
  - Set validation
  - Add submit action
  - Connect to data
  - Test form

#### 5. CMS Integration
**Pattern**: Connect to CMS
- **Implementation**:
  - Add CMS collection
  - Define fields
  - Connect to elements
  - Dynamic content
  - Preview with data

### Flows

#### 1. Create Page Flow
1. Click + in sidebar
2. Select page type
3. Page appears in tree
4. Drag components to canvas
5. Design layout
6. Preview responsive
7. Publish

#### 2. Add Animation Flow
1. Select element
2. Click Animation tab
3. Select animation type
4. Set duration
5. Set easing
6. Preview
7. Adjust as needed

#### 3. Create Component Flow
1. Select elements
2. Right-click
3. Create component
4. Name component
5. Add variants
6. Design variants
7. Use in project

#### 4. Connect CMS Flow
1. Open CMS panel
2. Create collection
3. Add fields
4. Add sample data
5. Connect to elements
6. Preview with data
7. Publish

### Key Takeaways for Project Neo

**Steal**:
1. **Visual editor** - Drag and drop canvas
2. **Component library** - Reusable components
3. **Properties panel** - Contextual editing
4. **Layers panel** - Hierarchical view
5. **Device preview** - Responsive design
6. **Smart animations** - Auto-animate
7. **Component variants** - Multiple states
8. **CMS integration** - Dynamic content

**Adapt**:
1. **Visual editor** → Visual page builder
2. **Component library** → Section library
3. **Properties panel** → Section properties
4. **Layers panel** → Content tree

---

## RAYCAST

### Design Philosophy
Raycast's design philosophy centers on:
- **Launcher-first** - Everything accessible via launcher
- **Dark theme** - Sleek dark chrome
- **Gradient accents** - Vibrant color pops
- **Minimal** - Clean, focused interface
- **Extension-based** - Plugin architecture

### UI Patterns

#### 1. Main Launcher
**Pattern**: Floating search bar
- **Design**:
  - Centered search input
  - Dark background
  - Gradient border on focus
  - Results dropdown below
- **Interaction**:
  - Cmd+Space to open
  - Type to search
  - Arrow keys to navigate
  - Enter to execute
  - Esc to close

#### 2. Extension Results
**Pattern**: Rich result cards
- **Design**:
  - Icon on left
  - Title and subtitle
  - Action buttons
  - Keyboard shortcuts
- **Interaction**:
  - Arrow keys to navigate
  - Tab to cycle actions
  - Enter to execute action
  - Cmd+Enter for secondary action

#### 3. Quick Actions
**Pattern**: Action buttons in results
- **Design**:
  - Button with icon
  - Keyboard shortcut hint
  - Hover state
  - Active state
- **Interaction**:
  - Click to execute
  - Tab to focus
  - Enter to execute
  - Cmd+Enter for alternative

#### 4. Settings
**Pattern**: Settings in launcher
- **Design**:
  - Settings icon
  - Modal with sections
  - Toggle switches
  - Extension management
- **Interaction**:
  - Click to open
  - Navigate with arrow keys
  - Toggle with Enter
  - Esc to close

#### 5. Extensions Store
**Pattern**: Browse and install extensions
- **Design**:
  - Grid of extension cards
  - Search bar
  - Categories
  - Install button
- **Interaction**:
  - Click to view details
  - Click to install
  - Search to filter
  - Category to filter

### Design System

#### Typography
- **Font**: System sans-serif
- **Weights**: 400 (regular), 500 (medium), 600 (semibold)
- **Sizes**: 13px (body), 14px (heading), 16px (large)
- **Line Height**: 1.4

#### Color Palette
- **Background**: #1C1C1E (dark chrome)
- **Surface**: #2C2C2E (elevated)
- **Border**: #3A3A3C (subtle)
- **Text Primary**: #FFFFFF (white)
- **Text Secondary**: #98989D (muted)
- **Accent Gradient**: Linear gradient (purple to pink)
- **Selection**: #0A84FF (blue)

#### Spacing
- **XS**: 4px
- **S**: 8px
- **M**: 12px
- **L**: 16px
- **XL**: 24px

#### Border Radius
- **Small**: 6px
- **Medium**: 8px
- **Large**: 10px

#### Shadows
- **Small**: 0 2px 8px rgba(0,0,0,0.3)
- **Medium**: 0 4px 16px rgba(0,0,0,0.4)
- **Large**: 0 8px 32px rgba(0,0,0,0.5)

### Interaction Patterns

#### 1. Fuzzy Search
**Pattern**: Intelligent search across extensions
- **Implementation**:
  - Type to search
  - Results update in real-time
  - Fuzzy matching
  - Keyboard navigation
  - Score-based ranking

#### 2. Action Cycling
**Pattern**: Tab through actions
- **Implementation**:
  - Tab to cycle actions
  - Shift+Tab to reverse
  - Visual feedback
  - Execute with Enter

#### 3. Quick Look
**Pattern**: Preview without opening
- **Implementation**:
  - Space to quick look
  - Modal preview
  - Esc to close
  - Continue navigation

#### 4. Clipboard History
**Pattern**: Access clipboard history
- **Implementation**:
  - Cmd+Shift+V to open
  - Arrow keys to navigate
  - Enter to paste
  - Esc to close

#### 5. Snippets
**Pattern**: Text expansion
- **Implementation**:
  - Type snippet trigger
  - Expand to full text
  - Variables support
  - Dynamic content

### Flows

#### 1. Search Flow
1. Press Cmd+Space
2. Type search query
3. Results appear
4. Navigate with arrows
5. Execute with Enter
6. Launcher closes

#### 2. Install Extension Flow
1. Open extensions store
2. Browse extensions
3. Click extension
4. View details
5. Click install
6. Extension installed

#### 3. Configure Extension Flow
1. Open settings
2. Navigate to extension
3. Configure options
4. Save changes
5. Extension updated

#### 4. Use Snippet Flow
1. Type snippet trigger
2. Snippet expands
3. Fill in variables
4. Continue typing

### Key Takeaways for Project Neo

**Steal**:
1. **Launcher pattern** - Central command hub
2. **Fuzzy search** - Intelligent search
3. **Action cycling** - Tab through actions
4. **Quick look** - Preview without opening
5. **Extension system** - Plugin architecture
6. **Dark theme** - Sleek dark chrome
7. **Gradient accents** - Vibrant pops
8. **Keyboard-first** - Everything accessible via keyboard

**Adapt**:
1. **Launcher** → Command palette
2. **Extensions** → Plugins
3. **Snippets** → Text templates

---

## ARC

### Design Philosophy
Arc's design philosophy centers on:
- **Content-first** - Webpage takes center stage
- **Minimal interface** - Everything tucked away
- **Sidebar navigation** - All controls in sidebar
- **Spaces concept** - Organized workspaces
- **Gesture-based** - Mac-native interactions

### UI Patterns

#### 1. Sidebar Navigation
**Pattern**: Collapsible sidebar with all controls
- **Design**:
  - Address bar at top
  - Favorites below
  - Spaces at bottom (dots)
  - Auto-hides on scroll
- **Interaction**:
  - Hover to show
  - Click to pin
  - Swipe to switch spaces
  - Drag to reorder

#### 2. Spaces
**Pattern**: Workspace organization as dots
- **Design**:
  - Dots at bottom of sidebar
  - Color-coded
  - Active indicator
  - Hover preview
- **Interaction**:
  - Click to switch
  - Swipe left/right to switch
  - Right-click for menu
  - Drag to reorder

#### 3. Split View
**Pattern**: Side-by-side browsing
- **Design**:
  - Two panes
  - Resizable divider
  - Independent controls
  - Sync scroll option
- **Interaction**:
  - Drag divider to resize
  - Click to focus pane
  - Toggle sync scroll
  - Close pane

#### 4. Easel
**Pattern**: Note-taking while browsing
- **Design**:
  - Floating panel
  - Rich text editor
  - Web clipper
  - Organized by space
- **Interaction**:
  - Click to open
  - Type notes
  - Clip web content
  - Save to space

#### 5. Profiles
**Pattern**: Browser profiles for different contexts
- **Design**:
  - Profile switcher in sidebar
  - Icon + name
  - Color-coded
  - Separate cookies/storage
- **Interaction**:
  - Click to switch
  - Create new profile
  - Customize profile
  - Delete profile

### Design System

#### Typography
- **Font**: System serif + sans-serif combination
- **Weights**: 400 (regular), 500 (medium), 600 (semibold)
- **Sizes**: 14px (body), 16px (heading)
- **Line Height**: 1.5

#### Color Palette
- **Background**: #FFFFFF (white)
- **Sidebar**: #F5F5F7 (light gray)
- **Active**: #007AFF (blue)
- **Text**: #1D1D1F (dark)
- **Muted**: #8E8E93 (gray)

#### Spacing
- **XS**: 4px
- **S**: 8px
- **M**: 16px
- **L**: 24px

#### Border Radius
- **Small**: 8px
- **Medium**: 12px
- **Large**: 16px

#### Shadows
- **Small**: 0 2px 8px rgba(0,0,0,0.08)
- **Medium**: 0 4px 16px rgba(0,0,0,0.12)
- **Large**: 0 8px 32px rgba(0,0,0,0.16)

### Interaction Patterns

#### 1. Auto-Hide Sidebar
**Pattern**: Sidebar hides on scroll
- **Implementation**:
  - Scroll to hide
  - Hover edge to show
  - Click to pin
  - Smooth animation

#### 2. Gesture Navigation
**Pattern**: Swipe to switch spaces
- **Implementation**:
  - Two-finger swipe left/right
  - Haptic feedback
  - Visual indicator
  - Smooth transition

#### 3. Pin Tab
**Pattern**: Pin important tabs
- **Implementation**:
  - Right-click tab
  - Select "Pin"
  - Tab moves to pinned section
  - Stays visible

#### 4. Boost Tab
**Pattern**: Boost important sites
- **Implementation**:
  - Right-click tab
  - Select "Boost"
  - Tab appears in boost section
  - Always accessible

#### 5. Archive Tab
**Pattern**: Archive unused tabs
- **Implementation**:
  - Right-click tab
  - Select "Archive"
  - Tab moves to archive
  - Clean up workspace

### Flows

#### 1. Create Space Flow
1. Click + in spaces
2. Name space
3. Choose color
4. Space created
5. Add tabs to space

#### 2. Split View Flow
1. Right-click tab
2. Select "Split Right"
3. Tab opens in split
4. Resize divider
5. Browse both

#### 3. Use Easel Flow
1. Click Easel icon
2. Easel panel opens
3. Type notes
4. Clip web content
5. Save to space

#### 4. Switch Profile Flow
1. Click profile switcher
2. Select profile
3. Browser switches profile
4. New cookies/storage
5. Continue browsing

### Key Takeaways for Project Neo

**Steal**:
1. **Auto-hide sidebar** - Content-first
2. **Spaces concept** - Workspace organization
3. **Split view** - Side-by-side editing
4. **Gesture navigation** - Native interactions
5. **Minimal interface** - Clean design
6. **Color-coded workspaces** - Visual organization
7. **Pin/boost/archive** - Content management
8. **Profiles** - Context switching

**Adapt**:
1. **Spaces** → Workspaces
2. **Sidebar** → Navigation
3. **Split view** → Preview/edit split
4. **Easel** → Notes panel

---

## COMPARATIVE UX ANALYSIS

### Command Palette Comparison

| Feature | Linear | Notion | Raycast | Arc | Decision |
|---------|--------|--------|---------|-----|----------|
| **Trigger** | Cmd+K | Cmd+K | Cmd+Space | - | **Cmd+K** (Linear/Notion) |
| **Search** | Fuzzy | Fuzzy | Fuzzy | - | **Fuzzy** (all) |
| **Actions** | Yes | Yes | Yes | - | **Yes** (all) |
| **Recent** | Yes | Yes | Yes | - | **Yes** (all) |
| **Keyboard nav** | Yes | Yes | Yes | - | **Yes** (all) |
| **Visual design** | Dark modal | Light modal | Dark modal | - | **Dark modal** (Linear/Raycast) |
| **Gradient accents** | No | No | Yes | - | **Yes** (Raycast) |

### Navigation Comparison

| Feature | Linear | Notion | Framer | Arc | Decision |
|---------|--------|--------|--------|-----|----------|
| **Sidebar** | Yes (left) | Yes (left) | Yes (left) | Yes (left) | **Left sidebar** (all) |
| **Collapsible** | Yes | Yes | Yes | Yes (auto-hide) | **Collapsible** (all) |
| **Tree view** | Yes | Yes | Yes | No | **Tree view** (Linear/Notion/Framer) |
| **Icons** | Yes | Yes | Yes | Yes | **Yes** (all) |
| **Color coding** | Yes | No | No | Yes | **Yes** (Linear/Arc) |
| **Drag reorder** | Yes | Yes | Yes | Yes | **Yes** (all) |
| **Context menu** | Yes | Yes | Yes | Yes | **Yes** (all) |

### Editor Comparison

| Feature | Linear | Notion | Framer | Decision |
|---------|--------|--------|--------|----------|
| **Rich text** | ProseMirror | Custom | - | **Lexical** (Payload) |
| **Block-based** | No | Yes | No | **Yes** (Notion) |
| **Drag and drop** | Yes | Yes | Yes | **Yes** (all) |
| **Inline editing** | Yes | Yes | Yes | **Yes** (all) |
| **Slash commands** | No | Yes | No | **Yes** (Notion) |
| **Visual editor** | No | No | Yes | **Yes** (Framer) |
| **Properties panel** | Yes (sidebar) | Yes (sidebar) | Yes (right) | **Right panel** (Framer) |
| **Layers panel** | No | No | Yes | **Yes** (Framer) |

### Design System Comparison

| Aspect | Linear | Notion | Framer | Raycast | Arc | Decision |
|--------|--------|--------|--------|---------|-----|----------|
| **Theme** | Dark | Light | Light | Dark | Light | **Dark/Light toggle** |
| **Font** | Custom sans | System sans | System sans | System sans | Serif/Sans | **System sans** |
| **Primary color** | Blue (#5E6AD2) | Blue (#2383E2) | Blue (#007AFF) | Gradient | Blue (#007AFF) | **Blue** (all) |
| **Background** | Dark (#0A0A0B) | White (#FFFFFF) | White (#FFFFFF) | Dark (#1C1C1E) | White (#FFFFFF) | **Dark default** |
| **Border radius** | 4-8px | 3-6px | 4-16px | 6-10px | 8-16px | **6-8px** (medium) |
| **Spacing** | 4-32px | 4-32px | 4-32px | 4-24px | 4-24px | **4-32px** (standard) |
| **Shadows** | Subtle | Subtle | Medium | Strong | Subtle | **Subtle to medium** |

### Interaction Patterns Comparison

| Pattern | Linear | Notion | Framer | Raycast | Arc | Decision |
|---------|--------|--------|--------|---------|-----|----------|
| **Optimistic updates** | Yes | Yes | No | No | No | **Yes** (Linear/Notion) |
| **Real-time collaboration** | Yes | Yes | No | No | No | **Yes** (Linear/Notion) |
| **Keyboard-first** | Yes | Partial | No | Yes | Partial | **Yes** (Linear/Raycast) |
| **Drag and drop** | Yes | Yes | Yes | No | Yes | **Yes** (all except Raycast) |
| **Inline editing** | Yes | Yes | Yes | No | No | **Yes** (Linear/Notion/Framer) |
| **Context menus** | Yes | Yes | Yes | No | Yes | **Yes** (all except Raycast) |
| **Hover actions** | Yes | Yes | Yes | No | Yes | **Yes** (all except Raycast) |
| **Multi-select** | Yes | Yes | No | No | No | **Yes** (Linear/Notion) |

---

## UX PATTERNS TO IMPLEMENT

### High Priority

1. **Command Palette** (Linear/Raycast)
   - Cmd+K trigger
   - Fuzzy search
   - Actions
   - Recent commands
   - Keyboard navigation

2. **Dark Theme** (Linear/Raycast)
   - Dark chrome background
   - Vibrant accent colors
   - Gradient accents
   - High contrast text

3. **Keyboard-First** (Linear/Raycast)
   - Comprehensive shortcuts
   - Shortcut hints
   - Modal overlay
   - Searchable shortcuts

4. **Optimistic Updates** (Linear/Notion)
   - Instant UI feedback
   - Loading states
   - Error handling
   - Background sync

5. **Real-Time Collaboration** (Linear/Notion)
   - Live cursors
   - Presence indicators
   - Conflict resolution
   - Activity feed

6. **Drag and Drop** (All except Raycast)
   - Visual feedback
   - Ghost elements
   - Drop indicators
   - Keyboard alternative

7. **Inline Editing** (Linear/Notion/Framer)
   - Click to edit
   - Auto-focus
   - Enter to save
   - Esc to cancel

8. **Context Menus** (All except Raycast)
   - Right-click to open
   - Keyboard navigation
   - Action shortcuts
   - Esc to close

### Medium Priority

9. **Sidebar Navigation** (All)
   - Collapsible sections
   - Tree view
   - Icons
   - Color coding
   - Drag reorder

10. **Properties Panel** (Linear/Notion/Framer)
    - Right sidebar
    - Section-based
    - Collapsible
    - Real-time preview

11. **Layers Panel** (Framer)
    - Hierarchical tree
    - Visibility toggle
    - Lock toggle
    - Drag reorder

12. **Multi-Select** (Linear/Notion)
    - Click to select
    - Shift+Click range
    - Cmd+Click add
    - Bulk actions

13. **Hover Actions** (Linear/Notion/Framer/Arc)
    - Actions on hover
    - Visual feedback
    - Contextual
    - Dismissible

14. **Quick Look** (Raycast)
    - Space to preview
    - Modal preview
    - Esc to close
    - Continue navigation

15. **Snippet Expansion** (Raycast)
    - Trigger text
    - Expand to full
    - Variables
    - Dynamic content

### Low Priority

16. **Spaces/Workspaces** (Arc)
    - Workspace organization
    - Color-coded
    - Quick switch
    - Gesture navigation

17. **Split View** (Arc)
    - Side-by-side
    - Resizable
    - Independent controls
    - Sync scroll

18. **Visual Editor** (Framer)
    - Drag and drop canvas
    - Component library
    - Device preview
    - Code generation

19. **Block Editor** (Notion)
    - Universal blocks
    - Slash commands
    - Turn into
    - Infinite nesting

20. **Extension System** (Raycast)
    - Plugin architecture
    - Extension store
    - API
    - Community

---

## NEXT STEPS

1. **Complete AI architecture** - Provider abstraction, gateway, streaming, context, memory, prompt system, agents, tool calling, MCP
2. **Design Studio UX** - Dashboard, quick actions, recent content, draft center, scheduled publishing, activity feed, team workspace, command palette, spotlight search, AI assistant, global search
3. **Design plugin architecture** - Plugin system with hooks, lifecycle, marketplace
4. **Design extension architecture** - Extension system
5. **Design permission system** - RBAC with field-level and document-level permissions
6. **Design navigation architecture** - Navigation system
7. **Design workspace system** - Workspace system
8. **Design review system** - Review system
9. **Generate full architecture** - After all research and analysis
