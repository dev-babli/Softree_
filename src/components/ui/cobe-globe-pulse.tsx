"use client";

import { useEffect, useRef, useCallback } from "react";
import createGlobe from "cobe";

export interface PulseMarker {
  id: string;
  location: [number, number];
  delay: number;
}

export interface GlobePulseProps {
  markers?: PulseMarker[];
  className?: string;
  speed?: number;
  baseColor?: [number, number, number];
  markerColor?: [number, number, number];
  glowColor?: [number, number, number];
  pulseColor?: string;
  scale?: number;
}

const defaultMarkers: PulseMarker[] = [
  { id: "pulse-1", location: [51.51, -0.13], delay: 0 },
  { id: "pulse-2", location: [40.71, -74.01], delay: 0.5 },
  { id: "pulse-3", location: [35.68, 139.65], delay: 1 },
  { id: "pulse-4", location: [-33.87, 151.21], delay: 1.5 },
];

export function GlobePulse({
  markers = defaultMarkers,
  className = "",
  speed = 0.003,
  baseColor = [0.5, 0.5, 0.5],
  markerColor = [0.2, 0.8, 0.9],
  glowColor = [0.05, 0.05, 0.05],
  pulseColor = "#33ccdd",
  scale = 0.94,
}: GlobePulseProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<{ x: number; y: number } | null>(null);
  const dragOffset = useRef({ phi: 0, theta: 0 });
  const phiOffsetRef = useRef(0);
  const thetaOffsetRef = useRef(0);
  const isPausedRef = useRef(false);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    pointerInteracting.current = { x: e.clientX, y: e.clientY };
    if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
    isPausedRef.current = true;
  }, []);

  const handlePointerUp = useCallback(() => {
    if (pointerInteracting.current !== null) {
      phiOffsetRef.current += dragOffset.current.phi;
      thetaOffsetRef.current += dragOffset.current.theta;
      dragOffset.current = { phi: 0, theta: 0 };
    }
    pointerInteracting.current = null;
    if (canvasRef.current) canvasRef.current.style.cursor = "grab";
    isPausedRef.current = false;
  }, []);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (pointerInteracting.current !== null) {
        dragOffset.current = {
          phi: (e.clientX - pointerInteracting.current.x) / 300,
          theta: (e.clientY - pointerInteracting.current.y) / 1000,
        };
      }
    };
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [handlePointerUp]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    let globe: ReturnType<typeof createGlobe> | null = null;
    let phi = 0;
    let currentWidth = 0;
    let dpr = 1;

    function init() {
      const measured = canvas.clientWidth || canvas.offsetWidth;
      if (measured === 0 || globe) return;

      currentWidth = measured;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      globe = createGlobe(canvas, {
        devicePixelRatio: dpr,
        width: currentWidth * dpr,
        height: currentWidth * dpr,
        phi: 0,
        theta: 0.2,
        dark: 1,
        diffuse: 1.5,
        mapSamples: 16000,
        mapBrightness: 10,
        baseColor,
        markerColor,
        glowColor,
        scale,
        markers: markers.map((m) => ({ location: m.location, size: 0.035, id: m.id })),
        onRender: (state) => {
          if (!isPausedRef.current) phi += speed;
          state.phi = phi + phiOffsetRef.current + dragOffset.current.phi;
          state.theta = 0.2 + thetaOffsetRef.current + dragOffset.current.theta;
          state.width = currentWidth * dpr;
          state.height = currentWidth * dpr;
        },
      });

      setTimeout(() => {
        if (canvas) canvas.style.opacity = "1";
      });
    }

    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry && entry.contentRect.width > 0) {
        if (!globe) {
          init();
        } else {
          currentWidth = entry.contentRect.width;
        }
      }
    });

    if (canvas.offsetWidth > 0) {
      init();
    }
    ro.observe(canvas);

    return () => {
      ro.disconnect();
      if (globe) globe.destroy();
    };
  }, [markers, speed, baseColor, markerColor, glowColor, scale]);

  return (
    <div className={`relative w-full aspect-square select-none ${className}`}>
      <style>{`
        @keyframes pulse-expand {
          0% { transform: scaleX(0.3) scaleY(0.3); opacity: 0.8; }
          100% { transform: scaleX(1.5) scaleY(1.5); opacity: 0; }
        }
      `}</style>
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        style={{
          width: "100%",
          height: "100%",
          aspectRatio: "1 / 1",
          contain: "layout paint size",
          cursor: "grab",
          opacity: 0,
          transition: "opacity 1s ease",
          touchAction: "none",
        }}
      />
      {markers.map((m) => (
        <div
          key={m.id}
          style={{
            position: "absolute",
            // @ts-expect-error CSS Anchor Positioning
            positionAnchor: `--cobe-${m.id}`,
            bottom: "anchor(center)",
            left: "anchor(center)",
            translate: "-50% 50%",
            width: 40,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none" as const,
            opacity: `var(--cobe-visible-${m.id}, 0)`,
            filter: `blur(calc((1 - var(--cobe-visible-${m.id}, 0)) * 8px))`,
            transition: "opacity 0.4s, filter 0.4s",
          }}
        >
          <span
            style={{
              position: "absolute",
              inset: 0,
              border: `2px solid ${pulseColor}`,
              borderRadius: "50%",
              opacity: 0,
              animation: `pulse-expand 2s ease-out infinite ${m.delay}s`,
            }}
          />
          <span
            style={{
              position: "absolute",
              inset: 0,
              border: `2px solid ${pulseColor}`,
              borderRadius: "50%",
              opacity: 0,
              animation: `pulse-expand 2s ease-out infinite ${m.delay + 0.5}s`,
            }}
          />
          <span
            style={{
              width: 10,
              height: 10,
              background: pulseColor,
              borderRadius: "50%",
              boxShadow: `0 0 0 3px #111, 0 0 0 5px ${pulseColor}`,
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default GlobePulse;
