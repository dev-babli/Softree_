'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { TopBar } from '@/components/top-bar';
import { Sidebar } from '@/components/sidebar';
import { CommandPaletteWrapper } from '@/components/command-palette';
import { Button, Card, CardContent, Input, Badge } from '@neo/ui';
import {
  ArrowLeft,
  Save,
  Sparkles,
  Eye,
  MoreHorizontal,
  Calendar,
  User,
  Clock,
  Send,
} from 'lucide-react';
import Link from 'next/link';

const mockDocument = {
  id: '1',
  title: 'About Us',
  type: 'Page',
  status: 'published',
  author: 'Alex Chen',
  updated: '2h ago',
  content:
    'We are a creative agency that helps brands build meaningful digital experiences. Our team combines strategy, design, and technology to deliver work that matters.',
  seo: {
    metaTitle: 'About Us | Neo Agency',
    metaDescription: 'Learn more about Neo Agency, a creative digital agency.',
  },
};

export default function EditorPage() {
  const params = useParams();
  const id = params.id as string;
  const [commandOpen, setCommandOpen] = useState(false);
  const [title, setTitle] = useState(mockDocument.title);
  const [content, setContent] = useState(mockDocument.content);
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiOutput, setAiOutput] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  const runAi = async () => {
    if (!aiPrompt.trim()) return;
    setAiLoading(true);
    setAiOutput('');
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: 'You are a helpful editor. Improve or rewrite the given content based on the prompt.' },
            { role: 'user', content: `Content: ${content}\n\nPrompt: ${aiPrompt}` },
          ],
          provider: 'openai',
          model: 'gpt-4o-mini',
        }),
      });
      const data = await response.json();
      setAiOutput(data.content ?? 'No response');
    } catch (error) {
      setAiOutput(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setAiLoading(false);
    }
  };

  const applyAi = () => {
    if (aiOutput) setContent(aiOutput);
  };

  return (
    <div className="flex min-h-screen flex-col bg-neo-base">
      <TopBar onOpenCommandPalette={() => setCommandOpen(true)} />
      <div className="flex flex-1">
        <Sidebar activeItem="content" />
        <main className="flex-1 overflow-auto">
          <div className="border-b border-border bg-neo-surface px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Link
                  href="/content"
                  className="rounded p-1 text-text-tertiary hover:bg-neo-elevated hover:text-text-secondary"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Link>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-80 border-none bg-transparent text-lg font-semibold text-text-primary shadow-none focus-visible:ring-0"
                />
                <Badge variant={mockDocument.status === 'published' ? 'success' : 'default'}>
                  {mockDocument.status}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="secondary" size="sm">
                  <Eye className="h-4 w-4" />
                  Preview
                </Button>
                <Button variant="primary" size="sm">
                  <Save className="h-4 w-4" />
                  Save
                </Button>
                <button className="rounded p-1 text-text-tertiary hover:bg-neo-elevated hover:text-text-secondary">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="mt-2 flex items-center gap-4 text-xs text-text-tertiary">
              <span className="flex items-center gap-1">
                <User className="h-3 w-3" />
                {mockDocument.author}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {mockDocument.updated}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                ID: {id}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardContent className="p-4">
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="min-h-[400px] w-full resize-none rounded-md bg-transparent p-2 text-base leading-relaxed text-text-primary placeholder:text-text-tertiary focus:outline-none"
                    placeholder="Start writing..."
                  />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="mb-3 text-sm font-medium text-text-primary">AI Assistant</div>
                  <div className="flex items-center gap-2">
                    <Input
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      placeholder="Ask AI to improve, shorten, translate..."
                      className="flex-1"
                      onKeyDown={(e) => e.key === 'Enter' && runAi()}
                    />
                    <Button
                      variant="ai"
                      size="sm"
                      isLoading={aiLoading}
                      onClick={runAi}
                    >
                      <Sparkles className="h-4 w-4" />
                      Run
                    </Button>
                  </div>
                  {aiOutput && (
                    <div className="mt-3 space-y-2">
                      <div className="rounded-md border border-border bg-neo-elevated p-3 text-sm text-text-primary">
                        {aiOutput}
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="secondary" size="sm" onClick={() => setAiOutput('')}>
                          Discard
                        </Button>
                        <Button variant="primary" size="sm" onClick={applyAi}>
                          <Send className="h-4 w-4" />
                          Apply
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-4">
                  <div className="mb-3 text-sm font-medium text-text-primary">SEO</div>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-text-tertiary">Meta Title</label>
                      <Input defaultValue={mockDocument.seo.metaTitle} />
                    </div>
                    <div>
                      <label className="text-xs text-text-tertiary">Meta Description</label>
                      <textarea
                        defaultValue={mockDocument.seo.metaDescription}
                        className="mt-1 min-h-[80px] w-full rounded-md border border-border bg-neo-base px-3 py-2 text-sm text-text-primary focus:outline-none focus-visible:border-brand-primary/50"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="mb-3 text-sm font-medium text-text-primary">Publishing</div>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <div className="flex justify-between">
                      <span>Status</span>
                      <span className="text-text-primary">Published</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last published</span>
                      <span className="text-text-primary">2h ago</span>
                    </div>
                    <div className="flex justify-between">
                      <span>By</span>
                      <span className="text-text-primary">Alex Chen</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="mb-3 text-sm font-medium text-text-primary">Activity</div>
                  <div className="space-y-3">
                    <div className="text-sm text-text-secondary">
                      <div className="text-text-primary">Alex Chen</div>
                      <div className="text-xs text-text-tertiary">Published 2h ago</div>
                    </div>
                    <div className="text-sm text-text-secondary">
                      <div className="text-text-primary">Sarah Kim</div>
                      <div className="text-xs text-text-tertiary">Updated draft 5h ago</div>
                    </div>
                  </div>
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
