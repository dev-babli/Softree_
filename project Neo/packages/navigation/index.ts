import type { NavigationItem } from '@neo/types';

export interface BreadcrumbItem {
  label: string;
  href: string;
  icon?: string;
}

export interface NavigationState {
  items: NavigationItem[];
  activeItemId: string | null;
  breadcrumbs: BreadcrumbItem[];
  recentItems: RecentItem[];
  favorites: string[];
}

export interface RecentItem {
  id: string;
  label: string;
  href: string;
  timestamp: Date;
  type: 'page' | 'document' | 'media' | 'settings';
}

export class NavigationEngine {
  private state: NavigationState;

  constructor(items: NavigationItem[] = []) {
    this.state = {
      items,
      activeItemId: null,
      breadcrumbs: [],
      recentItems: [],
      favorites: [],
    };
  }

  getState(): NavigationState {
    return { ...this.state };
  }

  setActiveItem(id: string): void {
    this.state.activeItemId = id;
    this.state.breadcrumbs = this.buildBreadcrumbs(id);
  }

  private buildBreadcrumbs(id: string): BreadcrumbItem[] {
    const path: BreadcrumbItem[] = [];
    const find = (items: NavigationItem[], parentPath: BreadcrumbItem[] = []): boolean => {
      for (const item of items) {
        const current = [...parentPath, { label: item.label, href: item.href, icon: item.icon }];
        if (item.id === id) {
          path.push(...current);
          return true;
        }
        if (item.children && find(item.children, current)) {
          return true;
        }
      }
      return false;
    };
    find(this.state.items);
    return path;
  }

  addRecentItem(item: Omit<RecentItem, 'timestamp'>): void {
    const newItem: RecentItem = { ...item, timestamp: new Date() };
    this.state.recentItems = [newItem, ...this.state.recentItems.filter((i) => i.id !== item.id)].slice(0, 10);
  }

  toggleFavorite(id: string): void {
    if (this.state.favorites.includes(id)) {
      this.state.favorites = this.state.favorites.filter((f) => f !== id);
    } else {
      this.state.favorites.push(id);
    }
  }

  getShortcutMap(): Record<string, string> {
    const map: Record<string, string> = {};
    const collect = (items: NavigationItem[]) => {
      for (const item of items) {
        if (item.shortcut) {
          map[item.shortcut.toLowerCase()] = item.href;
        }
        if (item.children) collect(item.children);
      }
    };
    collect(this.state.items);
    return map;
  }
}

export function createNavigationItems(): NavigationItem[] {
  return [
    { id: 'dashboard', label: 'Dashboard', href: '/', icon: 'LayoutDashboard', shortcut: 'D' },
    { id: 'content', label: 'Content', href: '/content', icon: 'FileText', shortcut: 'C' },
    { id: 'media', label: 'Media', href: '/media', icon: 'Image' },
    { id: 'ai', label: 'AI Assistant', href: '/ai', icon: 'Sparkles', shortcut: 'A' },
    { id: 'team', label: 'Team', href: '/team', icon: 'Users', shortcut: 'T' },
    { id: 'settings', label: 'Settings', href: '/settings', icon: 'Settings', shortcut: ',' },
    { id: 'marketplace', label: 'Marketplace', href: '/marketplace', icon: 'Store' },
  ];
}

export function createBreadcrumbTrail(items: BreadcrumbItem[]): BreadcrumbItem[] {
  return items;
}
