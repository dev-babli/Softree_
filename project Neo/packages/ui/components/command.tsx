'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { cn } from '../lib/utils';

interface CommandContextType {
  query: string;
  setQuery: (query: string) => void;
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  items: string[];
  registerItem: (id: string) => void;
  unregisterItem: (id: string) => void;
}

const CommandContext = createContext<CommandContextType | undefined>(undefined);

function useCommand() {
  const context = useContext(CommandContext);
  if (!context) {
    throw new Error('Command components must be used within a CommandProvider');
  }
  return context;
}

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export function CommandPalette({ open, onOpenChange, children }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [items, setItems] = useState<string[]>([]);

  const registerItem = (id: string) => {
    setItems((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const unregisterItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item !== id));
  };

  useEffect(() => {
    if (!open) {
      setQuery('');
      setSelectedIndex(0);
    }
  }, [open]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 pt-[20vh] animate-fade-in"
      onClick={() => onOpenChange(false)}
    >
      <div
        className="w-full max-w-2xl overflow-hidden rounded-xl border border-border bg-neo-elevated shadow-lg animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <CommandContext.Provider
          value={{
            query,
            setQuery,
            selectedIndex,
            setSelectedIndex,
            items,
            registerItem,
            unregisterItem,
          }}
        >
          {children}
        </CommandContext.Provider>
      </div>
    </div>
  );
}

export function CommandInput({ placeholder = 'Search...' }: { placeholder?: string }) {
  const { query, setQuery } = useCommand();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="border-b border-border px-4 py-3">
      <input
        ref={inputRef}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-lg text-text-primary placeholder:text-text-tertiary focus:outline-none"
      />
    </div>
  );
}

interface CommandListProps {
  children: React.ReactNode;
}

export function CommandList({ children }: CommandListProps) {
  return <div className="max-h-[60vh] overflow-y-auto p-2">{children}</div>;
}

interface CommandGroupProps {
  heading: string;
  children: React.ReactNode;
}

export function CommandGroup({ heading, children }: CommandGroupProps) {
  return (
    <div className="mb-2">
      <div className="px-3 py-2 text-xs font-medium text-text-tertiary">{heading}</div>
      <div>{children}</div>
    </div>
  );
}

interface CommandItemProps {
  id: string;
  icon?: React.ReactNode;
  shortcut?: string;
  children: React.ReactNode;
  onSelect?: () => void;
}

export function CommandItem({ id, icon, shortcut, children, onSelect }: CommandItemProps) {
  const { selectedIndex, setSelectedIndex, items, registerItem, unregisterItem } = useCommand();
  const index = items.indexOf(id);
  const selected = index === selectedIndex;

  useEffect(() => {
    registerItem(id);
    return () => unregisterItem(id);
  }, [id]);

  if (index === -1) return null;

  return (
    <div
      onMouseMove={() => setSelectedIndex(index)}
      onClick={onSelect}
      className={cn(
        'flex cursor-pointer items-center justify-between rounded-md px-3 py-2 text-sm',
        selected ? 'bg-brand-primary-subtle text-text-primary' : 'text-text-secondary hover:bg-neo-surface'
      )}
    >
      <div className="flex items-center gap-2">
        {icon}
        {children}
      </div>
      {shortcut ? (
        <kbd className="rounded border border-border bg-neo-surface px-1.5 py-0.5 text-xs text-text-tertiary">
          {shortcut}
        </kbd>
      ) : null}
    </div>
  );
}
