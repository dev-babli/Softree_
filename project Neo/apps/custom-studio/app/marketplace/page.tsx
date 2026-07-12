'use client';

import { useState } from 'react';
import { TopBar } from '@/components/top-bar';
import { Sidebar } from '@/components/sidebar';
import { CommandPaletteWrapper } from '@/components/command-palette';
import { Card, CardContent, CardHeader, CardTitle, Button, Input } from '@neo/ui';
import { Store, Search, Download, Puzzle, Shield, Zap } from 'lucide-react';

const plugins = [
  { id: '1', name: 'SEO Optimizer', description: 'Auto-generate meta tags and audit content.', author: 'Neo Labs', installs: '2.4k', icon: Zap },
  { id: '2', name: 'Image Compressor', description: 'Optimize media on upload.', author: 'PixelTeam', installs: '1.1k', icon: Puzzle },
  { id: '3', name: 'Content Guard', description: 'Advanced permissions and approval flows.', author: 'Neo Labs', installs: '856', icon: Shield },
];

export default function MarketplacePage() {
  const [commandOpen, setCommandOpen] = useState(false);
  const [query, setQuery] = useState('');

  const filtered = plugins.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="flex min-h-screen flex-col bg-neo-base">
      <TopBar onOpenCommandPalette={() => setCommandOpen(true)} />
      <div className="flex flex-1">
        <Sidebar activeItem="marketplace" />
        <main className="flex-1 overflow-auto p-6">
          <div className="mx-auto max-w-4xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-text-primary">Marketplace</h1>
                <p className="text-text-secondary">Discover plugins and extensions</p>
              </div>
              <Button variant="secondary" size="sm">
                <Store className="h-4 w-4" />
                Submit Plugin
              </Button>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-tertiary" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search marketplace..."
                className="pl-9"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((plugin) => {
                const Icon = plugin.icon;
                return (
                  <Card key={plugin.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base">
                        <div className="flex h-8 w-8 items-center justify-center rounded bg-brand-primary-subtle text-brand-primary">
                          <Icon className="h-4 w-4" />
                        </div>
                        {plugin.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-text-secondary">{plugin.description}</p>
                      <div className="flex items-center justify-between text-xs text-text-tertiary">
                        <span>{plugin.author}</span>
                        <span>{plugin.installs} installs</span>
                      </div>
                      <Button variant="secondary" size="sm" className="w-full">
                        <Download className="h-4 w-4" />
                        Install
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </main>
      </div>
      <CommandPaletteWrapper open={commandOpen} onOpenChange={setCommandOpen} />
    </div>
  );
}
