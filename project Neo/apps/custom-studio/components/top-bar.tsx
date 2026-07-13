'use client';

import { Search, Bell, User } from 'lucide-react';
import { Button, getInitials, getAvatarColor } from '@neo/ui';

interface TopBarProps {
  onOpenCommandPalette: () => void;
}

export function TopBar({ onOpenCommandPalette }: TopBarProps) {
  const userName = 'Alex Anderson';
  const initialColor = getAvatarColor(userName);

  return (
    <header className="flex h-12 items-center justify-between border-b border-border bg-neo-surface px-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-gradient-to-br from-brand-primary to-violet-500 text-xs font-bold text-white">
            N
          </div>
          <span className="font-semibold text-text-primary">Neo Studio</span>
        </div>
        <button
          onClick={onOpenCommandPalette}
          className="flex h-7 w-64 items-center gap-2 rounded-md border border-border bg-neo-base px-3 text-sm text-text-tertiary transition-colors hover:border-border-hover hover:text-text-secondary"
        >
          <Search className="h-3.5 w-3.5" />
          <span>Search or jump to...</span>
          <kbd className="ml-auto rounded border border-border bg-neo-surface px-1.5 py-0.5 text-xs text-text-tertiary">
            ⌘K
          </kbd>
        </button>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-status-error" />
        </Button>
        <button
          className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium text-white"
          style={{ backgroundColor: initialColor }}
        >
          {getInitials(userName)}
        </button>
      </div>
    </header>
  );
}
