'use client';

import { useState } from 'react';
import { TopBar } from '@/components/top-bar';
import { Sidebar } from '@/components/sidebar';
import { CommandPaletteWrapper } from '@/components/command-palette';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input } from '@neo/ui';
import { Sparkles, Send, Wand2, FileText, Globe, MessageSquare } from 'lucide-react';
import { listPrompts, buildPrompt } from '@neo/ai-gateway';

export default function AIPage() {
  const [commandOpen, setCommandOpen] = useState(false);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const runPrompt = async (templateId: string) => {
    setLoading(true);
    setOutput('');

    const messages = buildPrompt(templateId, { content: input, topic: input });

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages, provider: 'openai', model: 'gpt-4o-mini' }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to get AI response');
      }

      const data = await response.json();
      setOutput(data.content);
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-neo-base">
      <TopBar onOpenCommandPalette={() => setCommandOpen(true)} />
      <div className="flex flex-1">
        <Sidebar activeItem="ai" />
        <main className="flex-1 overflow-auto p-6">
          <div className="mx-auto max-w-4xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-text-primary">AI Assistant</h1>
                <p className="text-text-secondary">Generate, improve, and transform content with AI</p>
              </div>
              <Button variant="ai" size="sm">
                <Sparkles className="h-4 w-4" />
                New Chat
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {listPrompts().map((prompt) => (
                <button
                  key={prompt.id}
                  onClick={() => runPrompt(prompt.id)}
                  className="rounded-lg border border-border bg-neo-surface p-4 text-left transition-colors hover:border-border-hover hover:bg-neo-elevated"
                >
                  <div className="mb-2 flex h-8 w-8 items-center justify-center rounded bg-brand-primary-subtle text-brand-primary">
                    <Wand2 className="h-4 w-4" />
                  </div>
                  <div className="font-medium text-text-primary">{prompt.name}</div>
                  <div className="text-sm text-text-secondary">{prompt.description}</div>
                </button>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Prompt</CardTitle>
                <CardDescription>Enter your content or topic below</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Write a landing page headline for our new AI product..."
                  className="min-h-[120px] w-full rounded-md border border-border bg-neo-base px-3 py-2 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus-visible:border-brand-primary/50 focus-visible:shadow-focus"
                />
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Select a model..."
                    defaultValue="gpt-4o-mini"
                    className="w-48"
                  />
                  <Button
                    variant="primary"
                    size="sm"
                    isLoading={loading}
                    onClick={() => runPrompt('generate-content')}
                  >
                    <Send className="h-4 w-4" />
                    Generate
                  </Button>
                </div>
              </CardContent>
            </Card>

            {output && (
              <Card>
                <CardHeader>
                  <CardTitle>Result</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="whitespace-pre-wrap text-sm text-text-primary">{output}</div>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center gap-2">
                  <FileText className="h-4 w-4 text-text-tertiary" />
                  <CardTitle className="text-base">Recent Prompts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-text-secondary">
                  <div>Generate blog outline</div>
                  <div>Improve SEO for About Us</div>
                  <div>Translate hero section</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-2">
                  <Globe className="h-4 w-4 text-text-tertiary" />
                  <CardTitle className="text-base">Models</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-text-secondary">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-status-success" />
                    OpenAI GPT-4o
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-status-success" />
                    Anthropic Claude 3.5
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-text-tertiary" />
                  <CardTitle className="text-base">Usage</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-text-secondary">
                  <div>24,500 / 100,000 tokens</div>
                  <div className="mt-2 h-2 w-full rounded-full bg-neo-elevated">
                    <div className="h-full w-1/4 rounded-full bg-brand-primary" />
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
