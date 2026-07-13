'use client';

import { useEffect, useCallback } from 'react';

interface ShortcutMap {
  [key: string]: () => void;
}

export function useKeyboardShortcuts(shortcuts: ShortcutMap, enabled: boolean = true) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const modifiers: string[] = [];
      if (event.metaKey || event.ctrlKey) modifiers.push('meta');
      if (event.altKey) modifiers.push('alt');
      if (event.shiftKey) modifiers.push('shift');

      const key = event.key.toLowerCase();
      const keyCombo = [...modifiers, key].join('+');

      const handler = shortcuts[keyCombo];
      if (handler) {
        event.preventDefault();
        handler();
      }
    },
    [shortcuts]
  );

  useEffect(() => {
    if (!enabled) return;

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown, enabled]);
}

export function getShortcutLabel(shortcut: string): string {
  const isMac = typeof window !== 'undefined' ? navigator.platform.includes('Mac') : true;
  return shortcut.replace('meta', isMac ? '⌘' : 'Ctrl');
}
