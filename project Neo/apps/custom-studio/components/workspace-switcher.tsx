'use client';

import { useState } from 'react';
import { Check, Plus, Settings } from 'lucide-react';
import { cn } from '@neo/ui';

interface Workspace {
  id: string;
  name: string;
  slug: string;
  logo?: string;
}

const mockWorkspaces: Workspace[] = [
  { id: '1', name: 'Neo Agency', slug: 'neo-agency' },
  { id: '2', name: 'Acme Corp', slug: 'acme-corp' },
  { id: '3', name: 'Startup Inc', slug: 'startup-inc' },
];

export function WorkspaceSwitcher({ currentId = '1' }: { currentId?: string }) {
  const [selected, setSelected] = useState(currentId);
  const [open, setOpen] = useState(false);

  const current = mockWorkspaces.find((w) => w.id === selected) ?? mockWorkspaces[0];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-2 rounded-md border border-border bg-neo-elevated px-3 py-2 text-left text-sm transition-colors hover:border-border-hover"
      >
        <div className="flex h-6 w-6 items-center justify-center rounded bg-brand-primary text-xs font-bold text-white">
          {current.name[0]}
        </div>
        <span className="flex-1 truncate text-text-primary">{current.name}</span>
        <span className="text-xs text-text-tertiary">▼</span>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute left-0 right-0 top-full z-50 mt-1 rounded-lg border border-border bg-neo-elevated shadow-lg">
            <div className="p-1">
              {mockWorkspaces.map((workspace) => (
                <button
                  key={workspace.id}
                  onClick={() => {
                    setSelected(workspace.id);
                    setOpen(false);
                  }}
                  className={cn(
                    'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors',
                    selected === workspace.id
                      ? 'bg-brand-primary-subtle text-text-primary'
                      : 'text-text-secondary hover:bg-neo-surface hover:text-text-primary'
                  )}
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded bg-neo-surface text-xs font-medium text-text-primary">
                    {workspace.name[0]}
                  </div>
                  <span className="flex-1 truncate text-left">{workspace.name}</span>
                  {selected === workspace.id && <Check className="h-4 w-4 text-brand-primary" />}
                </button>
              ))}
            </div>
            <div className="border-t border-border p-1">
              <button className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-text-secondary transition-colors hover:bg-neo-surface hover:text-text-primary">
                <Plus className="h-4 w-4" />
                Create workspace
              </button>
              <button className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-text-secondary transition-colors hover:bg-neo-surface hover:text-text-primary">
                <Settings className="h-4 w-4" />
                Workspace settings
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
