'use client';

import { useState } from 'react';
import {
  LayoutDashboard,
  FileText,
  Image,
  Sparkles,
  Users,
  Settings,
  Store,
  ChevronLeft,
  ChevronRight,
  Plus,
} from 'lucide-react';
import { cn } from '@neo/ui';
import Link from 'next/link';
import { WorkspaceSwitcher } from './workspace-switcher';

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ElementType;
  shortcut?: string;
}

const mainNav: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', href: '/', icon: LayoutDashboard, shortcut: 'D' },
  { id: 'content', label: 'Content', href: '/content', icon: FileText, shortcut: 'C' },
  { id: 'media', label: 'Media', href: '/media', icon: Image },
  { id: 'ai', label: 'AI Assistant', href: '/ai', icon: Sparkles, shortcut: 'A' },
  { id: 'team', label: 'Team', href: '/team', icon: Users, shortcut: 'T' },
  { id: 'settings', label: 'Settings', href: '/settings', icon: Settings, shortcut: ',' },
  { id: 'marketplace', label: 'Marketplace', href: '/marketplace', icon: Store },
];

interface SidebarProps {
  activeItem?: string;
}

export function Sidebar({ activeItem = 'dashboard' }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        'flex h-[calc(100vh-48px)] flex-col border-r border-border bg-neo-surface transition-all duration-250',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex items-center justify-between gap-2 border-b border-border p-3">
        {!collapsed && (
          <div className="min-w-0 flex-1">
            <WorkspaceSwitcher />
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="rounded p-1 text-text-tertiary hover:bg-neo-elevated hover:text-text-secondary"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      <div className="p-2">
        <button className="flex w-full items-center justify-center gap-2 rounded-md bg-brand-primary py-1.5 text-sm font-medium text-text-inverse transition-colors hover:bg-brand-primary-hover">
          <Plus className="h-4 w-4" />
          {!collapsed && <span>New</span>}
        </button>
      </div>

      <nav className="flex-1 space-y-1 p-2">
        {mainNav.map((item) => {
          const Icon = item.icon;
          const isActive = item.id === activeItem;

          return (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors',
                isActive
                  ? 'bg-brand-primary-subtle text-text-primary'
                  : 'text-text-secondary hover:bg-neo-elevated hover:text-text-primary',
                collapsed && 'justify-center px-2'
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
              {!collapsed && item.shortcut && (
                <kbd className="ml-auto rounded border border-border bg-neo-base px-1.5 py-0.5 text-xs text-text-tertiary">
                  ⌘{item.shortcut}
                </kbd>
              )}
            </Link>
          );
        })}
      </nav>

      {!collapsed && (
        <div className="border-t border-border p-4">
          <div className="text-xs font-medium text-text-tertiary">Recent</div>
          <div className="mt-2 space-y-1">
            <Link
              href="/content/pages/about-us"
              className="block truncate rounded px-2 py-1 text-sm text-text-secondary hover:bg-neo-elevated hover:text-text-primary"
            >
              About Us
            </Link>
            <Link
              href="/content/posts/blog-post-3"
              className="block truncate rounded px-2 py-1 text-sm text-text-secondary hover:bg-neo-elevated hover:text-text-primary"
            >
              Blog Post #3
            </Link>
          </div>
        </div>
      )}
    </aside>
  );
}
