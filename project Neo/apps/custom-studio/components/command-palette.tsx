'use client';

import { useRouter } from 'next/navigation';
import {
  CommandPalette,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
} from '@neo/ui';
import {
  LayoutDashboard,
  FileText,
  Sparkles,
  Users,
  Settings,
  Plus,
  Moon,
  LogOut,
} from 'lucide-react';

interface CommandPaletteWrapperProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPaletteWrapper({ open, onOpenChange }: CommandPaletteWrapperProps) {
  const router = useRouter();

  const navigate = (href: string) => {
    router.push(href);
    onOpenChange(false);
  };

  return (
    <CommandPalette open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search or type a command..." />
      <CommandList>
        <CommandGroup heading="Navigation">
          <CommandItem id="nav-dashboard" icon={<LayoutDashboard className="h-4 w-4" />} shortcut="⌘D" onSelect={() => navigate('/')}>
            Go to Dashboard
          </CommandItem>
          <CommandItem id="nav-content" icon={<FileText className="h-4 w-4" />} shortcut="⌘C" onSelect={() => navigate('/content')}>
            Go to Content
          </CommandItem>
          <CommandItem id="nav-ai" icon={<Sparkles className="h-4 w-4" />} shortcut="⌘A" onSelect={() => navigate('/ai')}>
            Go to AI Assistant
          </CommandItem>
          <CommandItem id="nav-team" icon={<Users className="h-4 w-4" />} shortcut="⌘T" onSelect={() => navigate('/team')}>
            Go to Team
          </CommandItem>
          <CommandItem id="nav-settings" icon={<Settings className="h-4 w-4" />} shortcut="⌘," onSelect={() => navigate('/settings')}>
            Go to Settings
          </CommandItem>
        </CommandGroup>

        <CommandGroup heading="Actions">
          <CommandItem id="action-new-page" icon={<Plus className="h-4 w-4" />} shortcut="⌘N" onSelect={() => navigate('/content/new')}>
            Create new page
          </CommandItem>
          <CommandItem id="action-new-post" icon={<Plus className="h-4 w-4" />} onSelect={() => navigate('/content/new?type=post')}>
            Create new post
          </CommandItem>
          <CommandItem id="action-toggle-theme" icon={<Moon className="h-4 w-4" />} onSelect={() => {}}>
            Toggle theme
          </CommandItem>
          <CommandItem id="action-logout" icon={<LogOut className="h-4 w-4" />} onSelect={() => {}}>
            Sign out
          </CommandItem>
        </CommandGroup>

        <CommandGroup heading="Recent">
          <CommandItem id="recent-about" onSelect={() => navigate('/content/pages/about-us')}>
            About Us
          </CommandItem>
          <CommandItem id="recent-blog" onSelect={() => navigate('/content/posts/blog-post-3')}>
            Blog Post #3
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandPalette>
  );
}
