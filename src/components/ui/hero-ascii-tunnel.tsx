"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

// ---------------------------------------------------------------------------
// VanishRun — an ultra-smooth, full-bleed ASCII perspective corridor.
// A sequence of superellipse ("squircle") rings advance toward the viewer
// with continuous depth wrapping, hermite edge-feathering (zero popping),
// adaptive perimeter sampling for unbroken lines, and depth-graded color.
// ---------------------------------------------------------------------------

const RAMP = " .:-=+*#%@"; // 10-step density ramp
const DEFAULT_RING_COUNT = 22;
const Z_NEAR = 0.5;
const Z_FAR = 6.4;
const DEFAULT_CYCLE_SECONDS = 4.2; // Smooth cinematic cruising speed
const WORLD_A = 1.55; // squircle half-width, world units
const WORLD_B = 1.0; // squircle half-height, world units
const SQUIRCLE_EXP = 0.5; // 2/n with n=4 — rounded-rect squircle
const VP_RANGE = 0.32; // fraction of render size the vp can travel
const DT_MAX = 0.05;
const CONTENT_FEATHER_PX = 56; // soft falloff distance beyond the children's box

export interface VanishRunProps {
  /** grid cell size in px (default: 13) */
  cellSize?: number;
  /** Primary accent color, e.g. '#FF6B2C' or 'rgb(255, 107, 44)' */
  color?: string;
  /** Secondary highlight color for near glowing edges */
  accentColor?: string;
  /** Speed multiplier (default: 1) */
  speed?: number;
  /** Number of perspective rings (default: 22) */
  ringCount?: number;
  /** headline / CTA centered at the vanishing point */
  children?: ReactNode;
  /** extra classes merged onto the rendered root element */
  className?: string;
  /** extra classes merged onto the children content container */
  contentClassName?: string;
  /** whether children should shift with the pointer or stay centered (default: false) */
  followCursor?: boolean;
}

function parseRgb(colorStr: string): { r: number; g: number; b: number } {
  if (!colorStr) return { r: 255, g: 107, b: 44 }; // Default Softree orange

  if (colorStr.startsWith("#")) {
    const hex = colorStr.slice(1);
    if (hex.length === 3) {
      return {
        r: parseInt(hex[0] + hex[0], 16),
        g: parseInt(hex[1] + hex[1], 16),
        b: parseInt(hex[2] + hex[2], 16),
      };
    }
    return {
      r: parseInt(hex.substring(0, 2), 16) || 255,
      g: parseInt(hex.substring(2, 4), 16) || 107,
      b: parseInt(hex.substring(4, 6), 16) || 44,
    };
  }

  const match = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (match) {
    return {
      r: parseInt(match[1], 10),
      g: parseInt(match[2], 10),
      b: parseInt(match[3], 10),
    };
  }

  return { r: 255, g: 107, b: 44 };
}

export function VanishRun({
  cellSize = 13,
  color = "#FF6B2C",
  accentColor = "#FFA05C",
  speed = 1,
  ringCount = DEFAULT_RING_COUNT,
  children,
  className = "",
  contentClassName = "",
  followCursor = false,
}: VanishRunProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const baseRgb = parseRgb(color);
    const highlightRgb = parseRgb(accentColor);

    const effectiveRingCount = Math.max(12, Math.min(36, ringCount));
    const cycleDuration = DEFAULT_CYCLE_SECONDS / Math.max(0.2, speed);
    const ringSpeed = (Z_FAR - Z_NEAR) / cycleDuration;

    let cellW = cellSize;
    let cellH = cellSize;
    let cols = 0;
    let rows = 0;
    let dpr = 1;
    let sized = false;
    let ready = false;
    let disposed = false;

    let rMinRow = 0;
    let rMaxRow = 0;
    let rMinCol = 0;
    let rMaxCol = 0;
    let renderCx = 0;
    let renderCy = 0;
    let K1 = 0;
    let vpMaxPx = 0;
    let rootW = 0;
    let rootH = 0;

    // -- children's measured box --
    const content = contentRef.current;
    const hasContent = !!content;
    let contentW = 0;
    let contentH = 0;
    const measureContent = () => {
      if (!content) return;
      const r = content.getBoundingClientRect();
      contentW = r.width;
      contentH = r.height;
    };
    measureContent();
    const contentRO = content ? new ResizeObserver(measureContent) : null;
    if (content) contentRO?.observe(content);

    let depthBuf = new Float32Array(0);
    let charBuf = new Uint8Array(0);
    let alphaBuf = new Float32Array(0);

    const ringZ = new Float32Array(effectiveRingCount);
    for (let i = 0; i < effectiveRingCount; i++) {
      ringZ[i] = Z_NEAR + (i * (Z_FAR - Z_NEAR)) / effectiveRingCount;
    }

    const measureCell = (fontFamily: string) => {
      const off = document.createElement("canvas");
      const octx = off.getContext("2d");
      if (!octx) return;
      octx.font = `${cellSize}px ${fontFamily}`;
      cellW = Math.max(4, octx.measureText("MMMMMMMMMM").width / 10);
      cellH = cellSize;
    };

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      if (width < 2 || height < 2) {
        sized = false;
        return;
      }
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const fontFamily =
        getComputedStyle(canvas).fontFamily ||
        "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
      measureCell(fontFamily);
      ctx.font = `600 ${cellSize}px ${fontFamily}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      rootW = width;
      rootH = height;

      cols = Math.max(4, Math.floor(width / cellW));
      rows = Math.max(6, Math.floor(height / cellH));

      rMinRow = 0;
      rMaxRow = rows;
      rMinCol = 0;
      rMaxCol = cols;

      const renderW = rMaxCol * cellW;
      const renderH = rMaxRow * cellH;
      renderCx = renderW / 2;
      renderCy = renderH / 2;
      const minRenderPx = Math.min(renderW, renderH);
      K1 = minRenderPx * 0.48;
      vpMaxPx = minRenderPx * VP_RANGE;

      const totalCells = cols * rows;
      depthBuf = new Float32Array(totalCells);
      charBuf = new Uint8Array(totalCells);
      alphaBuf = new Float32Array(totalCells);
      sized = true;
    };

    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    const onResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resizeTimer = null;
        resize();
        if (reduced) draw();
      }, 100);
    };

    const draw = () => {
      if (!sized) return;
      const w = cols * cellW;
      const h = rows * cellH;
      ctx.clearRect(0, 0, w, h);
      depthBuf.fill(0);
      charBuf.fill(0);
      alphaBuf.fill(0);

      const cx = renderCx + vp.x;
      const cy = renderCy + vp.y;

      // Draw each perspective ring
      for (let i = 0; i < effectiveRingCount; i++) {
        const z = ringZ[i];
        const ooz = 1 / z;

        // Smooth hermite edge envelope to eliminate pop-in & pop-out
        const nearFadeNorm = Math.min(1, Math.max(0, (z - Z_NEAR) / 0.65));
        const farFadeNorm = Math.min(1, Math.max(0, (Z_FAR - z) / 1.3));
        const nearFade = nearFadeNorm * nearFadeNorm * (3 - 2 * nearFadeNorm);
        const farFade = farFadeNorm * farFadeNorm * (3 - 2 * farFadeNorm);
        const ringEnvelope = nearFade * farFade;

        if (ringEnvelope <= 0.01) continue;

        // Depth factor (0 = distant, 1 = near)
        const depthT = Math.min(
          1,
          Math.max(0, 1 - (z - Z_NEAR) / (Z_FAR - Z_NEAR)),
        );

        // Density character index based on depth and envelope
        const li = Math.min(
          RAMP.length - 1,
          Math.max(
            1,
            Math.round(
              Math.pow(depthT, 0.75) * (RAMP.length - 1) * (0.4 + 0.6 * ringEnvelope),
            ),
          ),
        );

        // Adaptive point density: near rings receive more points so lines never fragment
        const approxRadius = K1 * ooz * WORLD_A;
        const ringPoints = Math.max(
          64,
          Math.min(480, Math.round((approxRadius * 2 * Math.PI) / (cellW * 0.8))),
        );
        const thetaStep = (Math.PI * 2) / ringPoints;

        for (let p = 0; p < ringPoints; p++) {
          const theta = p * thetaStep;
          const cosT = Math.cos(theta);
          const sinT = Math.sin(theta);
          const wx =
            WORLD_A * Math.sign(cosT) * Math.pow(Math.abs(cosT), SQUIRCLE_EXP);
          const wy =
            WORLD_B * Math.sign(sinT) * Math.pow(Math.abs(sinT), SQUIRCLE_EXP);

          const px = cx + K1 * ooz * wx;
          const py = cy + K1 * ooz * wy;
          const col = Math.round(px / cellW);
          const row = Math.round(py / cellH);

          if (
            col < rMinCol ||
            col >= rMaxCol ||
            row < rMinRow ||
            row >= rMaxRow
          ) {
            continue;
          }

          const idx = row * cols + col;
          if (ooz > depthBuf[idx]) {
            depthBuf[idx] = ooz;
            charBuf[idx] = li + 1;
            alphaBuf[idx] = ringEnvelope;
          }
        }
      }

      // children's content mask feather box
      const hasContentBox = hasContent && contentW > 0 && contentH > 0;
      const contentCx = rootW / 2 + (followCursor ? vp.x : 0);
      const contentCy = rootH / 2 + (followCursor ? vp.y : 0);
      const innerHalfW = contentW / 2;
      const innerHalfH = contentH / 2;

      // Render buffered characters with smooth alpha and depth-graded orange tones
      for (let row = rMinRow; row < rMaxRow; row++) {
        for (let col = rMinCol; col < rMaxCol; col++) {
          const idx = row * cols + col;
          const ci = charBuf[idx];
          if (ci === 0) continue;

          const li = ci - 1;
          const envelope = alphaBuf[idx] || 1;
          const ooz = depthBuf[idx];
          const z = 1 / ooz;
          const depthT = Math.min(
            1,
            Math.max(0, 1 - (z - Z_NEAR) / (Z_FAR - Z_NEAR)),
          );

          let alpha = (0.2 + (li / (RAMP.length - 1)) * 0.8) * envelope;
          const px = col * cellW + cellW / 2;
          const py = row * cellH + cellH / 2;

          if (hasContentBox) {
            const dx = Math.max(Math.abs(px - contentCx) - innerHalfW, 0);
            const dy = Math.max(Math.abs(py - contentCy) - innerHalfH, 0);
            const dist = Math.sqrt(dx * dx + dy * dy);
            const t = Math.min(1, Math.max(0, dist / CONTENT_FEATHER_PX));
            const atten = t * t * (3 - 2 * t); // smoothstep
            if (atten <= 0.02) continue;
            alpha *= atten;
          }

          // Depth-graded orange color interpolation:
          // Deep far: rich amber-orange, Mid: vivid #FF6B2C, Near: bright radiant peach-orange
          const tColor = Math.pow(depthT, 1.1);
          const r = Math.round(
            baseRgb.r * (1 - tColor * 0.2) + highlightRgb.r * (tColor * 0.2),
          );
          const g = Math.round(
            baseRgb.g * (0.8 + tColor * 0.4) + highlightRgb.g * (tColor * 0.2),
          );
          const b = Math.round(
            baseRgb.b * (0.6 + tColor * 0.6) + highlightRgb.b * (tColor * 0.4),
          );

          ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
          ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
          ctx.fillText(RAMP[li], px, py);
        }
      }
      ctx.globalAlpha = 1;
    };

    // -- Hot-path state with frame-rate independent pointer lerping --
    let raf = 0;
    let last = 0;
    const vp = { tx: 0, ty: 0, x: 0, y: 0 };

    const placeContent = () => {
      const content = contentRef.current;
      if (!content) return;
      if (followCursor) {
        content.style.transform = `translate(-50%, -50%) translate(${vp.x}px, ${vp.y}px)`;
      } else {
        content.style.transform = "translate(-50%, -50%)";
      }
    };

    const loop = (now: number) => {
      const dt = last ? Math.min(DT_MAX, (now - last) / 1000) : 1 / 60;
      last = now;

      // Smooth constant speed treadmill
      for (let i = 0; i < effectiveRingCount; i++) {
        ringZ[i] -= ringSpeed * dt;
        if (ringZ[i] < Z_NEAR) {
          ringZ[i] += Z_FAR - Z_NEAR;
        }
      }

      // Delta-time smoothed spring lerp for silky smooth mouse tracking at any refresh rate
      const easeFactor = 1 - Math.exp(-7.5 * dt);
      vp.x += (vp.tx - vp.x) * easeFactor;
      vp.y += (vp.ty - vp.y) * easeFactor;

      draw();
      placeContent();

      if (!document.hidden) raf = requestAnimationFrame(loop);
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      vp.tx = nx * 2 * vpMaxPx;
      vp.ty = ny * 2 * vpMaxPx;
    };

    const onPointerLeave = () => {
      vp.tx = 0;
      vp.ty = 0;
    };

    const onVis = () => {
      if (!document.hidden && !reduced && ready) {
        last = 0;
        raf = requestAnimationFrame(loop);
      }
    };

    document.fonts.ready.then(() => {
      if (disposed) return;
      resize();
      ready = true;
      if (reduced) {
        draw();
        placeContent();
      } else {
        raf = requestAnimationFrame(loop);
      }
    });

    window.addEventListener("resize", onResize);
    if (!reduced) {
      root.addEventListener("pointermove", onPointerMove);
      root.addEventListener("pointerleave", onPointerLeave);
    }
    document.addEventListener("visibilitychange", onVis);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      if (resizeTimer) clearTimeout(resizeTimer);
      contentRO?.disconnect();
      window.removeEventListener("resize", onResize);
      root.removeEventListener("pointermove", onPointerMove);
      root.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [cellSize, color, accentColor, speed, ringCount, followCursor]);

  return (
    <div
      ref={rootRef}
      className={`relative isolate min-h-screen w-full overflow-hidden bg-[#050505] font-mono ${className}`}
    >
      {/* Subtle radial ambient orange glow behind corridor */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 z-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255, 107, 44, 0.15) 0%, rgba(255, 107, 44, 0.04) 45%, transparent 75%)",
        }}
      />

      <canvas
        ref={canvasRef}
        aria-hidden
        className="absolute inset-0 block h-full w-full pointer-events-none z-[1]"
      />

      {children ? (
        <div
          ref={contentRef}
          className={`absolute left-1/2 top-1/2 flex w-full max-w-2xl flex-col items-center gap-4 px-6 text-center pointer-events-auto z-10 ${contentClassName}`}
          style={{ transform: "translate(-50%, -50%)" }}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}

export default VanishRun;
