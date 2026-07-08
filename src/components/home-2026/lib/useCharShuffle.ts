"use client";

/**
 * useCharShuffle — hover char-shuffle for mono/index labels (home-2026).
 * Scrambles through a glyph set and resolves to the original text in ~0.3s.
 * No layout shift: output is always the same length as the input.
 * Respects prefers-reduced-motion (no-op — returns handlers that do nothing).
 */
import { useCallback, useEffect, useRef, useState } from "react";

import { prefersReducedMotion } from "@/lib/motion";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/—·";
const DURATION_MS = 300;
const FRAME_MS = 30;

export function useCharShuffle(text: string) {
  const [display, setDisplay] = useState(text);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef(0);

  useEffect(() => setDisplay(text), [text]);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const shuffle = useCallback(() => {
    if (prefersReducedMotion()) return;
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    startRef.current = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - startRef.current) / DURATION_MS);
      const settled = Math.floor(t * text.length);
      let out = "";
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        if (i < settled || ch === " ") out += ch;
        else out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      setDisplay(out);
      if (t < 1) {
        // throttle to ~FRAME_MS
        rafRef.current = requestAnimationFrame((n) => {
          if (n - now >= FRAME_MS) tick(n);
          else rafRef.current = requestAnimationFrame(tick);
        });
      } else {
        setDisplay(text);
        rafRef.current = null;
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [text]);

  const reset = useCallback(() => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    setDisplay(text);
  }, [text]);

  return { display, shuffle, reset };
}
