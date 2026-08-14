"use client";

import createGlobe, { COBEOptions } from "cobe";
import { useMotionValue, useSpring } from "framer-motion";
import React, { useCallback, useEffect, useRef, useState } from "react";

const MOVEMENT_DAMPING = 1400;
const MIN_CANVAS_PX = 2;

const DEFAULT_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [24 / 255, 82 / 255, 255 / 255],
  glowColor: [0.94, 0.96, 1],
  markers: [],
};

function cn(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

function GlobeFallback({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "absolute inset-0 mx-auto aspect-square w-full max-w-[600px]",
        className,
      )}
      aria-hidden
    >
      <div
        className="size-full rounded-full opacity-80"
        style={{
          background:
            "radial-gradient(circle at 35% 32%, rgba(255, 88, 18, 0.12) 0%, transparent 42%), radial-gradient(circle at 50% 50%, rgba(10, 10, 26, 0.04) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}

export function Globe({
  className,
  config = DEFAULT_CONFIG,
}: {
  className?: string;
  config?: COBEOptions;
}) {
  const phiRef = useRef(0);
  const widthRef = useRef(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const [r, setR] = useState(0);
  const [useFallback, setUseFallback] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const api = useMotionValue(0);
  const springR = useSpring(api, {
    bounce: 0,
    duration: MOVEMENT_DAMPING,
  });

  const onRender = useCallback(
    (state: Record<string, number>) => {
      if (!pointerInteracting.current) phiRef.current += 0.005;
      state.phi = phiRef.current + r;
      state.width = widthRef.current * 2;
      state.height = widthRef.current * 2;
    },
    [r],
  );

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "120px", threshold: 0.01 },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || useFallback) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    let globe: ReturnType<typeof createGlobe> | null = null;
    let disposed = false;

    const initGlobe = () => {
      if (disposed || globe) return;
      const size = Math.floor(canvas.offsetWidth);
      if (size < MIN_CANVAS_PX) return;
      widthRef.current = size;
      try {
        globe = createGlobe(canvas, {
          ...config,
          width: size * 2,
          height: size * 2,
          onRender,
        });
        canvas.style.opacity = "1";
      } catch {
        setUseFallback(true);
      }
    };

    const resizeObserver = new ResizeObserver(initGlobe);
    resizeObserver.observe(canvas);
    initGlobe();

    const onResize = () => {
      widthRef.current = Math.floor(canvas.offsetWidth);
    };
    window.addEventListener("resize", onResize);

    return () => {
      disposed = true;
      resizeObserver.disconnect();
      window.removeEventListener("resize", onResize);
      globe?.destroy();
    };
  }, [config, isVisible, onRender, useFallback]);

  useEffect(() => {
    springR.on("change", (value) => {
      setR(value);
    });
  }, [springR]);

  if (useFallback) {
    return <GlobeFallback className={className} />;
  }

  return (
    <div
      ref={rootRef}
      className={cn(
        "absolute inset-0 mx-auto aspect-square w-full max-w-[600px]",
        className,
      )}
    >
      <canvas
        className="size-full opacity-0 transition-opacity duration-500"
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current =
            e.clientX - pointerInteractionMovement.current;
          if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
        }}
        onPointerUp={() => {
          pointerInteracting.current = null;
          if (canvasRef.current) canvasRef.current.style.cursor = "grab";
        }}
        onPointerOut={() => {
          pointerInteracting.current = null;
          if (canvasRef.current) canvasRef.current.style.cursor = "grab";
        }}
        onMouseMove={(e) => {
          if (pointerInteracting.current !== null) {
            const delta = e.clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta;
            api.set(delta / 200);
          }
        }}
        onTouchMove={(e) => {
          if (pointerInteracting.current !== null && e.touches[0]) {
            const delta = e.touches[0].clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta;
            api.set(delta / 100);
          }
        }}
      />
    </div>
  );
}
