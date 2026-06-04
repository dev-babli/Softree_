"use client";

import { useEffect, useRef } from "react";

/** 4×4 Bayer matrix (0–15) for ordered dither dissolve */
const BAYER = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
] as const;

/** Smoothstep — no harsh linear ramps */
export function smoothstep(t: number): number {
  const x = Math.max(0, Math.min(1, t));
  return x * x * (3 - 2 * x);
}

/** Bell curve 0→1→0 for dither peak (sine, softer than triangle) */
export function ditherEnvelope(t: number): number {
  const x = Math.max(0, Math.min(1, t));
  return Math.sin(Math.PI * x) * 0.82;
}

type DitherOverlayProps = {
  intensity: number;
  variant: "light" | "dark";
  className?: string;
};

export function DitherOverlay({ intensity, variant, className = "" }: DitherOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const intensityRef = useRef(intensity);

  intensityRef.current = intensity;

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio ?? 1, 2);
    let frame = 0;

    const paint = () => {
      const current = intensityRef.current;
      if (current <= 0.008) return;

      const { width, height } = container.getBoundingClientRect();
      if (width < 1 || height < 1) return;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cell = 2;
      const cols = Math.ceil(width / cell);
      const rows = Math.ceil(height / cell);
      const threshold = smoothstep(current) * 16;
      const alpha = 0.22 + current * 0.38;
      const fg =
        variant === "dark"
          ? `rgba(255,255,255,${alpha})`
          : `rgba(12,12,12,${alpha})`;
      const bg =
        variant === "dark"
          ? `rgba(12,12,12,${current * 0.55})`
          : `rgba(243,240,238,${current * 0.65})`;

      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const bayer = BAYER[y % 4][x % 4];
          if (bayer < threshold) {
            ctx.fillStyle = fg;
            ctx.fillRect(x * cell, y * cell, cell, cell);
          }
        }
      }
    };

    const loop = () => {
      paint();
      if (intensityRef.current > 0.008) {
        frame = requestAnimationFrame(loop);
      }
    };

    loop();
    const ro = new ResizeObserver(() => paint());
    ro.observe(container);

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
    };
  }, [variant]);

  useEffect(() => {
    if (intensity > 0.008) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, [intensity]);

  if (intensity <= 0.008) return null;

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute inset-0 z-30 transition-opacity duration-200 ${className}`}
      style={{ opacity: Math.min(1, intensity * 1.15) }}
      aria-hidden
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}

export const DITHER_TOTAL_MS = 1100;
export const TESTIMONIAL_ROTATE_MS = 5500;

export type TransitionProgress = {
  /** 0–1 full transition timeline */
  t: number;
  dither: number;
  /** 0–1 crossfade from outgoing → incoming (ramps second half) */
  crossfade: number;
};

/** Smooth dither + crossfade timeline: swap at midpoint */
export function runSmoothTransition(
  onProgress: (p: TransitionProgress) => void,
  onSwap: () => void,
  reducedMotion: boolean,
): Promise<void> {
  if (reducedMotion) {
    onSwap();
    onProgress({ t: 1, dither: 0, crossfade: 1 });
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    const start = performance.now();
    let swapped = false;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DITHER_TOTAL_MS);
      const dither = ditherEnvelope(t);
      const crossfade =
        t <= 0.5 ? 0 : smoothstep((t - 0.5) / 0.5);

      onProgress({ t, dither, crossfade });

      if (!swapped && t >= 0.5) {
        swapped = true;
        onSwap();
      }

      if (t < 1) {
        requestAnimationFrame(tick);
      } else {
        onProgress({ t: 1, dither: 0, crossfade: 1 });
        resolve();
      }
    };

    requestAnimationFrame(tick);
  });
}
