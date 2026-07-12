'use client';

import { useState } from 'react';
import { TopBar } from '@/components/top-bar';
import { Sidebar } from '@/components/sidebar';
import { CommandPaletteWrapper } from '@/components/command-palette';
import { Button, Card, Input } from '@neo/ui';
import { Search, Upload, Image, Film, File, MoreHorizontal, Folder } from 'lucide-react';

const mockMedia = [
  { id: '1', name: 'hero-home.jpg', type: 'image', size: '1.2 MB', updated: '2h ago' },
  { id: '2', name: 'about-team.png', type: 'image', size: '856 KB', updated: '5h ago' },
  { id: '3', name: 'product-demo.mp4', type: 'video', size: '12.4 MB', updated: '1d ago' },
  { id: '4', name: 'brand-guidelines.pdf', type: 'document', size: '3.1 MB', updated: '2d ago' },
  { id: '5', name: 'case-study-acme.jpg', type: 'image', size: '2.3 MB', updated: '3d ago' },
  { id: '6', name: 'holiday-asset.svg', type: 'image', size: '24 KB', updated: '4d ago' },
];

function MediaIcon({ type }: { type: string }) {
  switch (type) {
    case 'image':
      return <Image className="h-5 w-5 text-text-secondary" />;
    case 'video':
      return <Film className="h-5 w-5 text-text-secondary" />;
    case 'document':
      return <File className="h-5 w-5 text-text-secondary" />;
    default:
      return <Folder className="h-5 w-5 text-text-secondary" />;
  }
}

export default function MediaPage() {
  const [commandOpen, setCommandOpen] = useState(false);
  const [query, setQuery] = useState('');

  const filtered = mockMedia.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex min-h-screen flex-col bg-neo-base">
      <TopBar onOpenCommandPalette={() => setCommandOpen(true)} />
      <div className="flex flex-1">
        <Sidebar activeItem="media" />
        <main className="flex-1 overflow-auto p-6">
          <div className="mx-auto max-w-6xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-text-primary">Media Library</h1>
                <p className="text-text-secondary">Manage images, videos, and documents</p>
              </div>
              <Button variant="primary" size="sm">
                <Upload className="h-4 w-4" />
                Upload
              </Button>
            </div>

            <Card>
              <div className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-tertiary" />
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search media..."
                    className="pl-9"
                  />
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  className="group relative rounded-lg border border-border bg-neo-surface p-3 transition-colors hover:border-border-hover hover:bg-neo-elevated"
                >
                  <div className="flex aspect-square items-center justify-center rounded-md bg-neo-base">
                    <MediaIcon type={item.type} />
                  </div>
                  <div className="mt-3 truncate text-sm font-medium text-text-primary">{item.name}</div>
                  <div className="text-xs text-text-tertiary">
                    {item.size} · {item.updated}
                  </div>
                  <button className="absolute right-2 top-2 rounded p-1 text-text-tertiary opacity-0 transition-opacity hover:bg-neo-base hover:text-text-secondary group-hover:opacity-100">
                    <MoreHorizontal className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
      <CommandPaletteWrapper open={commandOpen} onOpenChange={setCommandOpen} />
    </div>
  );
}
