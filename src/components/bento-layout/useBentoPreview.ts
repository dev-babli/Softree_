"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function useBentoPreview<T extends { id: string; image: string }>(
  items: T[],
  debounceMs = 48,
) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const active = items.find((i) => i.id === activeId) ?? items[0] ?? null;

  const select = useCallback(
    (id: string) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => setActiveId(id), debounceMs);
    },
    [debounceMs],
  );

  const selectImmediate = useCallback((id: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setActiveId(id);
  }, []);

  useEffect(() => {
    if (!items.length) return;
    if (!items.some((i) => i.id === activeId)) {
      setActiveId(items[0].id);
    }
  }, [items, activeId]);

  useEffect(() => {
    if (!active) return;
    const img = new window.Image();
    img.src = active.image;
    const idx = items.findIndex((i) => i.id === active.id);
    const next = items[(idx + 1) % items.length];
    if (next && next.id !== active.id) {
      const preload = new window.Image();
      preload.src = next.image;
    }
  }, [active, items]);

  useEffect(
    () => () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    },
    [],
  );

  return { active, activeId, select, selectImmediate };
}
