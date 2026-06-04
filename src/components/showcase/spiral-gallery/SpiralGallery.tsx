"use client";

import { Canvas } from "@react-three/fiber";
import dynamic from "next/dynamic";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { SPIRAL_GALLERY_SHELL } from "./config";
import SpiralGalleryControls from "./SpiralGalleryControls";
import { SPIRAL_GALLERY_PRESET, type SpiralGalleryTuning } from "./tuning";
import type { SpiralState } from "./SpiralGalleryCanvas";

const SpiralGalleryScene = dynamic(() => import("./SpiralGalleryCanvas"), { ssr: false });

function ResetIcon({ light }: { light?: boolean }) {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden className="block">
      <circle cx="20" cy="20" r="20" fill={light ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.4)"} />
      <path
        d="M26.3 11.375H15.12l.82-.82a1.2 1.2 0 0 0-1.7-1.72l-3.38 3.38a1.2 1.2 0 0 0 0 1.7l3.38 3.38a1.2 1.2 0 0 0 1.7-1.7l-.82-.82H26.3c1.94 0 3.5 1.56 3.5 3.5v3.54a1.5 1.5 0 1 0 3 0v-3.54c0-2.56-2.12-4.68-4.7-4.68Zm4.58 15.56a1.2 1.2 0 0 0-1.7 0l-.82.82H14.7a3.5 3.5 0 0 1-3.5-3.5v-3.54a1.5 1.5 0 1 0-3 0v3.54c0 2.6 2.12 4.7 4.7 4.7h11.18l-.82.82a1.2 1.2 0 0 0 1.7 1.7l3.38-3.38a1.2 1.2 0 0 0 0-1.7l-3.38-3.38Z"
        fill={light ? "#333333" : "#fff"}
      />
    </svg>
  );
}

type SpiralGalleryProps = {
  className?: string;
  showControls?: boolean;
  initialTuning?: SpiralGalleryTuning;
};

export default function SpiralGallery({
  className = "",
  showControls = false,
  initialTuning = SPIRAL_GALLERY_PRESET,
}: SpiralGalleryProps) {
  const stateRef = useRef<SpiralState>({ offset: 0, velocity: 0 });
  const draggingRef = useRef(false);
  const lastPointer = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const tuningRef = useRef<SpiralGalleryTuning>(initialTuning);
  const shell = SPIRAL_GALLERY_SHELL;

  const [tuning, setTuning] = useState<SpiralGalleryTuning>(initialTuning);
  const [controlsOpen, setControlsOpen] = useState(showControls);

  useEffect(() => {
    tuningRef.current = tuning;
  }, [tuning]);

  const applyDelta = useCallback((delta: number) => {
    stateRef.current.velocity += delta * shell.scrollSensitivity;
    stateRef.current.velocity = Math.max(-0.08, Math.min(0.08, stateRef.current.velocity));
  }, [shell.scrollSensitivity]);

  const onWheel = useCallback(
    (e: React.WheelEvent) => {
      if ((e.target as HTMLElement).closest("aside")) return;
      e.preventDefault();
      applyDelta(e.deltaY);
    },
    [applyDelta],
  );

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest("button, aside, input")) return;
    draggingRef.current = true;
    lastPointer.current = e.clientY;
    containerRef.current?.setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!draggingRef.current) return;
      const delta = e.clientY - lastPointer.current;
      lastPointer.current = e.clientY;
      applyDelta(delta);
    },
    [applyDelta],
  );

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      const delta = e.clientY - lastPointer.current;
      stateRef.current.velocity += delta * shell.windEffectStrength * shell.scrollSensitivity;
      stateRef.current.velocity = Math.max(-0.08, Math.min(0.08, stateRef.current.velocity));
    },
    [shell.scrollSensitivity, shell.windEffectStrength],
  );

  const onResetAnimation = useCallback(() => {
    stateRef.current.offset = 0;
    stateRef.current.velocity = 0;
  }, []);

  const onResetTuning = useCallback(() => {
    setTuning({ ...SPIRAL_GALLERY_PRESET });
  }, []);

  const isLight = shell.theme === "light";

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ backgroundColor: shell.frameBg }}>
      <div
        ref={containerRef}
        className="relative h-full w-full cursor-grab active:cursor-grabbing"
        onWheel={onWheel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        style={{
          background: `radial-gradient(circle, ${shell.cinematicBgInner} 0%, ${shell.cinematicBgOuter} 100%)`,
        }}
      >
        <Suspense
          fallback={
            <div
              className={`flex h-full items-center justify-center text-[12px] ${isLight ? "text-black/35" : "text-white/40"}`}
            >
              Loading gallery…
            </div>
          }
        >
          <Canvas
            className="absolute inset-0 touch-none"
            camera={{
              position: [0, 0, tuning.cameraDistance],
              fov: tuning.cameraFov,
              near: 0.1,
              far: 200,
            }}
            gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
            dpr={[1, 2]}
          >
            <SpiralGalleryScene stateRef={stateRef} draggingRef={draggingRef} tuningRef={tuningRef} tuning={tuning} />
          </Canvas>
        </Suspense>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at center, transparent 38%, rgba(0,0,0,${tuning.edgeFadeStrength * shell.edgeFadeScale}) 100%)`,
          }}
        />

        <button
          type="button"
          onClick={onResetAnimation}
          aria-label="Reset gallery view"
          className="absolute left-[10px] top-[10px] z-10 cursor-pointer rounded-full transition-opacity hover:opacity-90"
        >
          <ResetIcon light={isLight} />
        </button>

        {showControls && (
          <button
            type="button"
            onClick={() => setControlsOpen((v) => !v)}
            className="absolute right-3 bottom-3 z-20 rounded-lg bg-black/70 px-3 py-2 text-[11px] text-white/80 backdrop-blur hover:bg-black/85"
          >
            {controlsOpen ? "Hide controls" : "Show controls"}
          </button>
        )}

        {showControls && controlsOpen && (
          <SpiralGalleryControls tuning={tuning} onChange={setTuning} onReset={onResetTuning} />
        )}
      </div>
    </div>
  );
}

export { SPIRAL_GALLERY_PRESET, FRAMER_DEFAULT_TUNING } from "./tuning";
