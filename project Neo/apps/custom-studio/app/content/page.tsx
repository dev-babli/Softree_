'use client';

import { useState } from 'react';
import { TopBar } from '@/components/top-bar';
import { Sidebar } from '@/components/sidebar';
import { CommandPaletteWrapper } from '@/components/command-palette';
import { Button, Card, CardContent, Input } from '@neo/ui';
import { Search, Plus, Filter, FileText, MoreHorizontal, Calendar, User } from 'lucide-react';
import Link from 'next/link';

const mockDocuments = [
  { id: '1', title: 'About Us', type: 'Page', status: 'published', author: 'Alex', updated: '2h ago' },
  { id: '2', title: 'Blog Post #3', type: 'Post', status: 'draft', author: 'Sarah', updated: '5h ago' },
  { id: '3', title: 'Product Launch', type: 'Page', status: 'review', author: 'Mike', updated: '1d ago' },
  { id: '4', title: 'Team Update', type: 'Post', status: 'published', author: 'Alex', updated: '2d ago' },
  { id: '5', title: 'Case Study: Acme', type: 'Case Study', status: 'draft', author: 'John', updated: '3d ago' },
  { id: '6', title: 'Holiday Campaign', type: 'Campaign', status: 'scheduled', author: 'Sarah', updated: '4d ago' },
];

const statusColors: Record<string, string> = {
  published: 'bg-status-success/20 text-status-success',
  draft: 'bg-text-muted/20 text-text-secondary',
  review: 'bg-status-warning/20 text-status-warning',
  scheduled: 'bg-brand-primary/20 text-brand-primary',
};

export default function ContentPage() {
  const [commandOpen, setCommandOpen] = useState(false);
  const [query, setQuery] = useState('');

  const filtered = mockDocuments.filter((doc) =>
    doc.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex min-h-screen flex-col bg-neo-base">
      <TopBar onOpenCommandPalette={() => setCommandOpen(true)} />
      <div className="flex flex-1">
        <Sidebar activeItem="content" />
        <main className="flex-1 overflow-auto p-6">
          <div className="mx-auto max-w-6xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-text-primary">Content</h1>
                <p className="text-text-secondary">Manage pages, posts, and documents</p>
              </div>
              <Button variant="primary" size="sm">
                <Plus className="h-4 w-4" />
                New Content
              </Button>
            </div>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-tertiary" />
                    <Input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search content..."
                      className="pl-9"
                    />
                  </div>
                  <Button variant="secondary" size="sm">
                    <Filter className="h-4 w-4" />
                    Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="rounded-lg border border-border bg-neo-surface">
              <div className="grid grid-cols-12 gap-4 border-b border-border px-4 py-3 text-xs font-medium text-text-tertiary">
                <div className="col-span-5">Title</div>
                <div className="col-span-2">Type</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2">Updated</div>
                <div className="col-span-1" />
              </div>
              <div className="divide-y divide-border">
                {filtered.map((doc) => (
                  <Link
                    key={doc.id}
                    href={`/content/${doc.id}`}
                    className="grid grid-cols-12 items-center gap-4 px-4 py-3 transition-colors hover:bg-neo-elevated"
                  >
                    <div className="col-span-5 flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded bg-neo-elevated text-text-tertiary">
                        <FileText className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-medium text-text-primary">{doc.title}</div>
                        <div className="flex items-center gap-2 text-xs text-text-tertiary">
                          <User className="h-3 w-3" />
                          {doc.author}
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2 text-sm text-text-secondary">{doc.type}</div>
                    <div className="col-span-2">
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${statusColors[doc.status]}`}
                      >
                        {doc.status}
                      </span>
                    </div>
                    <div className="col-span-2 flex items-center gap-1.5 text-sm text-text-secondary">
                      <Calendar className="h-3.5 w-3.5 text-text-tertiary" />
                      {doc.updated}
                    </div>
                    <div className="col-span-1 flex justify-end">
                      <span className="rounded p-1 text-text-tertiary hover:text-text-secondary">
                        <MoreHorizontal className="h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
      <CommandPaletteWrapper open={commandOpen} onOpenChange={setCommandOpen} />
    </div>
  );
}
