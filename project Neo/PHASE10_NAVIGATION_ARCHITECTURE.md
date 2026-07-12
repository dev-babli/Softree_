# PHASE 10: NAVIGATION ARCHITECTURE

## Overview

This document provides a comprehensive navigation architecture design for Project Neo's AI-native Agency Platform. The architecture covers the navigation system design, building on patterns from Linear, Notion, Arc, Raycast, and VS Code.

---

## ARCHITECTURE PRINCIPLES

### 1. Keyboard-First
- All navigation accessible via keyboard
- Keyboard shortcuts for common actions
- Mnemonic navigation patterns
- Quick navigation via command palette

### 2. Context-Aware
- Navigation adapts to current context
- Breadcrumbs for hierarchy
- Recent items for quick access
- Smart suggestions based on usage

### 3. Minimal Visual Noise
- Collapsible sections
- Auto-hide navigation
- Clean visual hierarchy
- Intentional spacing

### 4. Performance
- Instant navigation
- Pre-fetched routes
- Cached navigation state
- Smooth transitions

### 5. Discoverability
- Clear visual indicators
- Keyboard shortcut hints
- Searchable navigation
- Onboarding for new users

---

## NAVIGATION STRUCTURE

### Primary Navigation (Sidebar)

```
┌─────────────────────────────────────────────────────────────────┐
│  Sidebar                                                        │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ [Workspace Icon]                                          │   │
│  │ Workspace Name                                           │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                 │
│  Quick Actions                                                 │
│  [⌘K] Command Palette                                         │
│                                                                 │
│  Navigation                                                     │
│  ▼ Dashboard (⌘D)                                              │
│  ▼ Content (⌘C)                                                │
│    ▼ Pages                                                     │
│    ▼ Blog Posts                                                │
│    ▼ Projects                                                  │
│    ▼ Media                                                     │
│  ▼ Analytics (⌘A)                                              │
│  ▼ Team (⌘T)                                                   │
│  ▼ Settings (⌘,)                                               │
│                                                                 │
│  Recent                                                         │
│  📄 About Us                                                    │
│  📝 Blog Post #3                                                │
│  🖼️ Hero Image                                                  │
│                                                                 │
│  Favorites                                                      │
│  ⭐ Dashboard                                                  │
│  ⭐ Analytics                                                  │
│                                                                 │
│  Spaces/Workspaces                                              │
│  ● Main Workspace                                              │
│  ● Client A Workspace                                          │
│  ● Client B Workspace                                          │
└─────────────────────────────────────────────────────────────────┘
```

### Secondary Navigation (Tabs)

```
┌─────────────────────────────────────────────────────────────────┐
│  Content                                         [+ New Content] │
├─────────────────────────────────────────────────────────────────┤
│  [All ▼] [Pages ▼] [Status ▼] [Date ▼]                         │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ 📄 About Us                            Published  2h ago  │   │
│  └──────────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ 📝 Blog Post #3                         Draft  1d ago   │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### Tertiary Navigation (Breadcrumbs)

```
┌─────────────────────────────────────────────────────────────────┐
│  Content > Pages > About Us                                      │
├─────────────────────────────────────────────────────────────────┤
│  [Edit] [View] [Share] [Delete]                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## NAVIGATION COMPONENTS

### Sidebar Component

```typescript
interface SidebarProps {
  workspace: Workspace;
  user: User;
  navigation: NavigationItem[];
  recentItems: RecentItem[];
  favorites: FavoriteItem[];
  workspaces: Workspace[];
  activeItem?: string;
  onNavigate: (path: string) => void;
  onWorkspaceSwitch: (workspaceId: string) => void;
}

interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  keyboardShortcut?: string;
  children?: NavigationItem[];
  badge?: number;
}

function Sidebar({
  workspace,
  user,
  navigation,
  recentItems,
  favorites,
  workspaces,
  activeItem,
  onNavigate,
  onWorkspaceSwitch,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const toggleSection = (id: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedSections(newExpanded);
  };

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      {/* Workspace Header */}
      <WorkspaceHeader
        workspace={workspace}
        workspaces={workspaces}
        onSwitch={onWorkspaceSwitch}
        collapsed={collapsed}
      />

      {/* Quick Actions */}
      <QuickActions collapsed={collapsed} />

      {/* Navigation */}
      <nav className="navigation">
        {navigation.map((item) => (
          <NavigationItem
            key={item.id}
            item={item}
            active={activeItem === item.id}
            expanded={expandedSections.has(item.id)}
            onToggle={() => toggleSection(item.id)}
            onNavigate={onNavigate}
            collapsed={collapsed}
          />
        ))}
      </nav>

      {/* Recent Items */}
      <RecentItems items={recentItems} collapsed={collapsed} />

      {/* Favorites */}
      <Favorites items={favorites} collapsed={collapsed} />

      {/* Workspaces */}
      <Workspaces
        workspaces={workspaces}
        activeWorkspace={workspace.id}
        onSwitch={onWorkspaceSwitch}
        collapsed={collapsed}
      />

      {/* Collapse Toggle */}
      <button
        className="collapse-toggle"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? '→' : '←'}
      </button>
    </aside>
  );
}
```

### Navigation Item Component

```typescript
interface NavigationItemProps {
  item: NavigationItem;
  active: boolean;
  expanded: boolean;
  onToggle: () => void;
  onNavigate: (path: string) => void;
  collapsed: boolean;
}

function NavigationItem({
  item,
  active,
  expanded,
  onToggle,
  onNavigate,
  collapsed,
}: NavigationItemProps) {
  const hasChildren = item.children && item.children.length > 0;

  const handleClick = () => {
    if (hasChildren) {
      onToggle();
    } else {
      onNavigate(item.path);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
    if (e.key === 'ArrowRight' && hasChildren && !expanded) {
      e.preventDefault();
      onToggle();
    }
    if (e.key === 'ArrowLeft' && hasChildren && expanded) {
      e.preventDefault();
      onToggle();
    }
  };

  return (
    <div className="navigation-item">
      <div
        className={`navigation-item-header ${active ? 'active' : ''}`}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-expanded={expanded}
      >
        {hasChildren && (
          <span className="expand-icon">{expanded ? '▼' : '▶'}</span>
        )}
        <span className="icon">{item.icon}</span>
        {!collapsed && <span className="label">{item.label}</span>}
        {!collapsed && item.keyboardShortcut && (
          <span className="shortcut">{item.keyboardShortcut}</span>
        )}
        {!collapsed && item.badge && (
          <span className="badge">{item.badge}</span>
        )}
      </div>

      {hasChildren && expanded && !collapsed && (
        <div className="navigation-item-children">
          {item.children!.map((child) => (
            <NavigationItem
              key={child.id}
              item={child}
              active={active === child.id}
              expanded={false}
              onToggle={() => {}}
              onNavigate={onNavigate}
              collapsed={false}
            />
          ))}
        </div>
      )}
    </div>
  );
}
```

---

## ROUTING ARCHITECTURE

### Route Definitions

```typescript
interface Route {
  path: string;
  component: React.ComponentType;
  layout?: React.ComponentType;
  middleware?: Middleware[];
  meta?: RouteMeta;
}

interface RouteMeta {
  title: string;
  description?: string;
  keywords?: string[];
  permissions?: Permission[];
  keyboardShortcut?: string;
}

const routes: Route[] = [
  {
    path: '/',
    component: Dashboard,
    layout: MainLayout,
    meta: {
      title: 'Dashboard',
      keyboardShortcut: '⌘D',
      permissions: ['workspace:content:read'],
    },
  },
  {
    path: '/content',
    component: ContentList,
    layout: MainLayout,
    meta: {
      title: 'Content',
      keyboardShortcut: '⌘C',
      permissions: ['workspace:content:read'],
    },
  },
  {
    path: '/content/:type',
    component: ContentList,
    layout: MainLayout,
    meta: {
      title: 'Content',
      permissions: ['workspace:content:read'],
    },
  },
  {
    path: '/content/:type/:id',
    component: ContentDetail,
    layout: MainLayout,
    meta: {
      title: 'Content Detail',
      permissions: ['document:read'],
    },
  },
  {
    path: '/content/:type/:id/edit',
    component: ContentEditor,
    layout: MainLayout,
    meta: {
      title: 'Edit Content',
      permissions: ['document:update'],
    },
  },
  {
    path: '/analytics',
    component: Analytics,
    layout: MainLayout,
    meta: {
      title: 'Analytics',
      keyboardShortcut: '⌘A',
      permissions: ['workspace:content:read'],
    },
  },
  {
    path: '/team',
    component: Team,
    layout: MainLayout,
    meta: {
      title: 'Team',
      keyboardShortcut: '⌘T',
      permissions: ['workspace:users:read'],
    },
  },
  {
    path: '/settings',
    component: Settings,
    layout: MainLayout,
    meta: {
      title: 'Settings',
      keyboardShortcut: '⌘,',
      permissions: ['workspace:settings:read'],
    },
  },
];
```

### Router Implementation

```typescript
class Router {
  private routes: Route[];
  private currentRoute: Route | null = null;
  private history: string[] = [];
  private historyIndex = -1;
  private listeners: RouterListener[] = [];

  constructor(routes: Route[]) {
    this.routes = routes;
  }

  navigate(path: string): void {
    // Find matching route
    const route = this.matchRoute(path);
    if (!route) {
      throw new Error(`Route not found: ${path}`);
    }

    // Check permissions
    if (route.meta?.permissions) {
      const hasPermission = this.checkPermissions(route.meta.permissions);
      if (!hasPermission) {
        throw new Error('Permission denied');
      }
    }

    // Update history
    this.history = this.history.slice(0, this.historyIndex + 1);
    this.history.push(path);
    this.historyIndex = this.history.length - 1;

    // Update current route
    this.currentRoute = route;

    // Notify listeners
    this.notifyListeners(path, route);
  }

  back(): void {
    if (this.historyIndex > 0) {
      this.historyIndex--;
      const path = this.history[this.historyIndex];
      this.navigate(path);
    }
  }

  forward(): void {
    if (this.historyIndex < this.history.length - 1) {
      this.historyIndex++;
      const path = this.history[this.historyIndex];
      this.navigate(path);
    }
  }

  canGoBack(): boolean {
    return this.historyIndex > 0;
  }

  canGoForward(): boolean {
    return this.historyIndex < this.history.length - 1;
  }

  getCurrentRoute(): Route | null {
    return this.currentRoute;
  }

  matchRoute(path: string): Route | null {
    for (const route of this.routes) {
      const match = this.matchPath(route.path, path);
      if (match) {
        return route;
      }
    }
    return null;
  }

  private matchPath(routePath: string, actualPath: string): boolean {
    // Simple path matching
    // TODO: Implement proper path matching with parameters
    return routePath === actualPath;
  }

  private checkPermissions(permissions: Permission[]): boolean {
    // Check if user has all required permissions
    return true;
  }

  subscribe(listener: RouterListener): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners(path: string, route: Route): void {
    for (const listener of this.listeners) {
      listener(path, route);
    }
  }
}

interface RouterListener {
  (path: string, route: Route): void;
}
```

---

## KEYBOARD NAVIGATION

### Keyboard Shortcuts

```typescript
interface KeyboardShortcut {
  id: string;
  keys: string[];
  description: string;
  action: () => void;
  context?: string;
}

class KeyboardNavigation {
  private shortcuts = new Map<string, KeyboardShortcut>();
  private currentContext: string | null = null;

  register(shortcut: KeyboardShortcut): void {
    const key = this.getShortcutKey(shortcut.keys);
    this.shortcuts.set(key, shortcut);
  }

  unregister(id: string): void {
    for (const [key, shortcut] of this.shortcuts.entries()) {
      if (shortcut.id === id) {
        this.shortcuts.delete(key);
      }
    }
  }

  setContext(context: string | null): void {
    this.currentContext = context;
  }

  handleKeyDown(event: KeyboardEvent): void {
    const keys = this.getKeysFromEvent(event);
    const key = this.getShortcutKey(keys);
    const shortcut = this.shortcuts.get(key);

    if (!shortcut) {
      return;
    }

    // Check context
    if (shortcut.context && shortcut.context !== this.currentContext) {
      return;
    }

    // Prevent default
    event.preventDefault();

    // Execute action
    shortcut.action();
  }

  private getShortcutKey(keys: string[]): string {
    return keys.sort().join('+');
  }

  private getKeysFromEvent(event: KeyboardEvent): string[] {
    const keys: string[] = [];

    if (event.metaKey || event.ctrlKey) {
      keys.push('⌘');
    }
    if (event.shiftKey) {
      keys.push('⇧');
    }
    if (event.altKey) {
      keys.push('⌥');
    }

    if (event.key === 'Escape') {
      keys.push('Esc');
    } else if (event.key === 'Enter') {
      keys.push('Enter');
    } else if (event.key === ' ') {
      keys.push('Space');
    } else if (event.key === 'Backspace') {
      keys.push('Backspace');
    } else if (event.key === 'Delete') {
      keys.push('Delete');
    } else if (event.key === 'Tab') {
      keys.push('Tab');
    } else if (event.key === 'ArrowUp') {
      keys.push('↑');
    } else if (event.key === 'ArrowDown') {
      keys.push('↓');
    } else if (event.key === 'ArrowLeft') {
      keys.push('←');
    } else if (event.key === 'ArrowRight') {
      keys.push('→');
    } else {
      keys.push(event.key.toUpperCase());
    }

    return keys;
  }
}
```

### Default Shortcuts

```typescript
const defaultShortcuts: KeyboardShortcut[] = [
  {
    id: 'command-palette',
    keys: ['⌘', 'K'],
    description: 'Open command palette',
    action: () => openCommandPalette(),
  },
  {
    id: 'global-search',
    keys: ['⌘', '/'],
    description: 'Global search',
    action: () => openGlobalSearch(),
  },
  {
    id: 'ai-assistant',
    keys: ['⌘', '⇧', 'A'],
    description: 'Open AI assistant',
    action: () => openAIAssistant(),
  },
  {
    id: 'navigate-dashboard',
    keys: ['⌘', 'D'],
    description: 'Navigate to dashboard',
    action: () => navigate('/'),
  },
  {
    id: 'navigate-content',
    keys: ['⌘', 'C'],
    description: 'Navigate to content',
    action: () => navigate('/content'),
  },
  {
    id: 'navigate-analytics',
    keys: ['⌘', 'A'],
    description: 'Navigate to analytics',
    action: () => navigate('/analytics'),
  },
  {
    id: 'navigate-team',
    keys: ['⌘', 'T'],
    description: 'Navigate to team',
    action: () => navigate('/team'),
  },
  {
    id: 'navigate-settings',
    keys: ['⌘', ','],
    description: 'Navigate to settings',
    action: () => navigate('/settings'),
  },
  {
    id: 'go-back',
    keys: ['⌘', '['],
    description: 'Go back',
    action: () => router.back(),
  },
  {
    id: 'go-forward',
    keys: ['⌘', ']'],
    description: 'Go forward',
    action: () => router.forward(),
  },
  {
    id: 'new-content',
    keys: ['⌘', 'N'],
    description: 'Create new content',
    action: () => createNewContent(),
  },
  {
    id: 'save',
    keys: ['⌘', 'S'],
    description: 'Save',
    action: () => save(),
  },
  {
    id: 'publish',
    keys: ['⌘', 'P'],
    description: 'Publish',
    action: () => publish(),
  },
  {
    id: 'close',
    keys: ['⌘', 'W'],
    description: 'Close',
    action: () => close(),
  },
  {
    id: 'escape',
    keys: ['Esc'],
    description: 'Escape / Cancel',
    action: () => escape(),
  },
];
```

---

## BREADCRUMBS

### Breadcrumb Component

```typescript
interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigate: (path: string) => void;
}

function Breadcrumbs({ items, onNavigate }: BreadcrumbsProps) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        {items.map((item, index) => (
          <li key={index}>
            {index > 0 && <span className="separator">/</span>}
            {item.path ? (
              <a href={item.path} onClick={(e) => { e.preventDefault(); onNavigate(item.path!); }}>
                {item.label}
              </a>
            ) : (
              <span className="current">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
```

### Breadcrumb Generation

```typescript
class BreadcrumbGenerator {
  private routes: Route[];

  constructor(routes: Route[]) {
    this.routes = routes;
  }

  generate(path: string): BreadcrumbItem[] {
    const items: BreadcrumbItem[] = [];

    // Split path into segments
    const segments = path.split('/').filter(Boolean);

    // Build breadcrumbs
    let currentPath = '';
    for (let i = 0; i < segments.length; i++) {
      currentPath += `/${segments[i]}`;
      const route = this.matchRoute(currentPath);

      if (route) {
        items.push({
          label: route.meta?.title || segments[i],
          path: i < segments.length - 1 ? currentPath : undefined,
        });
      }
    }

    return items;
  }

  private matchRoute(path: string): Route | null {
    for (const route of this.routes) {
      const match = this.matchPath(route.path, path);
      if (match) {
        return route;
      }
    }
    return null;
  }

  private matchPath(routePath: string, actualPath: string): boolean {
    return routePath === actualPath;
  }
}
```

---

## RECENT ITEMS

### Recent Items Manager

```typescript
interface RecentItem {
  id: string;
  type: string;
  title: string;
  path: string;
  accessedAt: Date;
  icon: string;
}

class RecentItemsManager {
  private items: RecentItem[] = [];
  private maxItems = 10;

  add(item: Omit<RecentItem, 'accessedAt'>): void {
    const existingIndex = this.items.findIndex(i => i.id === item.id);

    if (existingIndex !== -1) {
      // Move to front
      const [existing] = this.items.splice(existingIndex, 1);
      this.items.unshift({ ...existing, accessedAt: new Date() });
    } else {
      // Add to front
      this.items.unshift({ ...item, accessedAt: new Date() });

      // Limit to max items
      if (this.items.length > this.maxItems) {
        this.items = this.items.slice(0, this.maxItems);
      }
    }
  }

  remove(id: string): void {
    this.items = this.items.filter(i => i.id !== id);
  }

  clear(): void {
    this.items = [];
  }

  list(): RecentItem[] {
    return [...this.items];
  }

  get(id: string): RecentItem | undefined {
    return this.items.find(i => i.id === id);
  }
}
```

---

## FAVORITES

### Favorites Manager

```typescript
interface FavoriteItem {
  id: string;
  type: string;
  title: string;
  path: string;
  icon: string;
  addedAt: Date;
}

class FavoritesManager {
  private items: Map<string, FavoriteItem> = new Map();

  add(item: Omit<FavoriteItem, 'addedAt'>): void {
    this.items.set(item.id, { ...item, addedAt: new Date() });
  }

  remove(id: string): void {
    this.items.delete(id);
  }

  toggle(item: Omit<FavoriteItem, 'addedAt'>): void {
    if (this.items.has(item.id)) {
      this.remove(item.id);
    } else {
      this.add(item);
    }
  }

  isFavorite(id: string): boolean {
    return this.items.has(id);
  }

  list(): FavoriteItem[] {
    return Array.from(this.items.values()).sort(
      (a, b) => a.addedAt.getTime() - b.addedAt.getTime()
    );
  }

  get(id: string): FavoriteItem | undefined {
    return this.items.get(id);
  }
}
```

---

## NAVIGATION STATE

### State Management

```typescript
interface NavigationState {
  currentPath: string;
  previousPath: string | null;
  sidebarCollapsed: boolean;
  activeSection: string | null;
  recentItems: RecentItem[];
  favorites: FavoriteItem[];
}

class NavigationStateManager {
  private state: NavigationState;
  private listeners: StateListener[] = [];

  constructor(initialState: NavigationState) {
    this.state = initialState;
  }

  getState(): NavigationState {
    return { ...this.state };
  }

  setState(partial: Partial<NavigationState>): void {
    this.state = { ...this.state, ...partial };
    this.notifyListeners();
  }

  subscribe(listener: StateListener): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners(): void {
    for (const listener of this.listeners) {
      listener(this.state);
    }
  }
}

type StateListener = (state: NavigationState) => void;
```

---

## NEXT STEPS

1. **Design workspace system** - Workspace system
2. **Design review system** - Review system
3. **Generate full architecture** - After all research and analysis
