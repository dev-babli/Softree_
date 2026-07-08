"use client";

/**
 * HomeShell — page wrapper for home-2026.
 * Owns: the single dark canvas, the persistent left index rail (desktop),
 * and the IntersectionObserver that marks the active chapter index.
 * Story-spec: "no per-frame scroll JS" — IO only.
 */
import { useEffect, useRef, useState, type ReactNode } from "react";

import "./lib/ember.css";

const CHAPTERS = [
  { id: "hero", index: "01" },
  { id: "signals", index: "02" },
  { id: "manifesto", index: "03" },
  { id: "capabilities", index: "04" },
  { id: "proof", index: "05" },
  { id: "ai", index: "06" },
  { id: "global", index: "07" },
  { id: "models", index: "08" },
  { id: "contact", index: "09" },
] as const;

export default function HomeShell({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<string>("hero");
  const ratios = useRef<Record<string, number>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.current[entry.target.id] = entry.isIntersecting ? entry.intersectionRatio : 0;
        }
        let best = "hero";
        let bestRatio = 0;
        for (const c of CHAPTERS) {
          const r = ratios.current[c.id] ?? 0;
          if (r > bestRatio) {
            bestRatio = r;
            best = c.id;
          }
        }
        if (bestRatio > 0) setActive(best);
      },
      { threshold: [0, 0.15, 0.35, 0.6] },
    );
    for (const c of CHAPTERS) {
      const el = document.getElementById(c.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white">
      <nav aria-label="Page chapters" className="index-rail font-mono-meta">
        {CHAPTERS.map((c) => (
          <a key={c.id} href={`#${c.id}`} aria-current={active === c.id ? "true" : undefined}>
            {c.index}
          </a>
        ))}
      </nav>
      {children}
    </div>
  );
}
