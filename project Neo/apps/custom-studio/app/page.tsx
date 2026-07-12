'use client';

import { useState } from 'react';
import { TopBar } from '@/components/top-bar';
import { Sidebar } from '@/components/sidebar';
import { CommandPaletteWrapper } from '@/components/command-palette';
import { useKeyboardShortcuts } from '@/lib/keyboard';
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent } from '@neo/ui';
import { FileText, Clock, Calendar, Activity, Plus, Sparkles } from 'lucide-react';

export default function DashboardPage() {
  const [commandOpen, setCommandOpen] = useState(false);

  useKeyboardShortcuts({
    'meta+k': () => setCommandOpen(true),
    'meta+n': () => window.alert('Create new content'),
  });

  return (
    <div className="flex min-h-screen flex-col bg-neo-base">
      <TopBar onOpenCommandPalette={() => setCommandOpen(true)} />
      <div className="flex flex-1">
        <Sidebar activeItem="dashboard" />
        <main className="flex-1 overflow-auto p-6">
          <div className="mx-auto max-w-6xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-text-primary">Dashboard</h1>
                <p className="text-text-secondary">Welcome back to Neo Studio</p>
              </div>
              <div className="flex gap-2">
                <Button variant="ai" size="sm">
                  <Sparkles className="h-4 w-4" />
                  AI Assistant
                </Button>
                <Button variant="primary" size="sm">
                  <Plus className="h-4 w-4" />
                  New Content
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader>
                  <CardDescription>Total Content</CardDescription>
                  <CardTitle>124</CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardDescription>Published</CardDescription>
                  <CardTitle>98</CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardDescription>Drafts</CardDescription>
                  <CardTitle>18</CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardDescription>In Review</CardDescription>
                  <CardTitle>8</CardTitle>
                </CardHeader>
              </Card>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-text-tertiary" />
                    <CardTitle className="text-base">Recent Content</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  {['About Us', 'Blog Post #3', 'Project Alpha', 'Team Update'].map((item) => (
                    <div
                      key={item}
                      className="flex items-center justify-between rounded-md px-3 py-2 hover:bg-neo-elevated"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4 text-text-tertiary" />
                        <span className="text-sm text-text-primary">{item}</span>
                      </div>
                      <span className="text-xs text-text-tertiary">2h ago</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-text-tertiary" />
                    <CardTitle className="text-base">Team Activity</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  {[
                    'Sarah approved About Us',
                    'John created Blog Post #3',
                    'Mike uploaded hero.png',
                    'Alex published Team Update',
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-text-secondary hover:bg-neo-elevated"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-primary" />
                      {item}
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-text-tertiary" />
                    <CardTitle className="text-base">Scheduled Publishing</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  {['Holiday Post - 6 hours', 'Newsletter - 2 days', 'Launch Page - 5 days'].map((item) => (
                    <div
                      key={item}
                      className="flex items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-neo-elevated"
                    >
                      <span className="text-text-primary">{item.split(' - ')[0]}</span>
                      <span className="text-text-tertiary">{item.split(' - ')[1]}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-brand-primary-subtle to-transparent">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-brand-primary" />
                    <CardTitle className="text-base">AI Quick Actions</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  {['Generate landing page', 'Improve SEO score', 'Summarize content', 'Translate page'].map(
                    (action) => (
                      <Button
                        key={action}
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start text-text-secondary hover:text-text-primary"
                      >
                        {action}
                      </Button>
                    )
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
      <CommandPaletteWrapper open={commandOpen} onOpenChange={setCommandOpen} />
    </div>
  );
}
