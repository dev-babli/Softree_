"use client";

import React, { useRef, useEffect, useCallback } from "react";

interface Character {
  char: string;
  opacity: number;
}

interface Strand {
  x: number;
  y: number;
  speed: number;
  length: number;
  characters: Character[];
  showCursor: boolean;
  layer: number;
  scale: number;
}

export interface MatrixCodeRainProps {
  fontSize?: number;
  speed?: number;
  density?: number;
  textColor?: string;
  colorMode?: "orange-red" | "monochrome";
  className?: string;
  preventPageScroll?: boolean;
}

/** Computes smooth orange-to-red gradient color based on ratio 0 (tail) -> 1 (head) */
function getOrangeRedColor(ratio: number): string {
  if (ratio > 0.85) {
    // 0.85 -> 1.0: Neon orange (#FF6B2C) to warm gold-orange
    const factor = (ratio - 0.85) / 0.15;
    const r = 255;
    const g = Math.round(107 + (160 - 107) * factor);
    const b = Math.round(44 + (90 - 44) * factor);
    return `rgb(${r}, ${g}, ${b})`;
  } else if (ratio > 0.45) {
    // 0.45 -> 0.85: Crimson Red (#DC2626) to Fiery Orange (#FF6B2C)
    const factor = (ratio - 0.45) / 0.4;
    const r = Math.round(220 + (255 - 220) * factor);
    const g = Math.round(38 + (107 - 38) * factor);
    const b = Math.round(38 + (44 - 38) * factor);
    return `rgb(${r}, ${g}, ${b})`;
  } else {
    // 0.0 -> 0.45: Deep Dark Red (#7F1D1D) to Crimson Red (#DC2626)
    const factor = Math.max(0, ratio / 0.45);
    const r = Math.round(160 + (220 - 160) * factor);
    const g = Math.round(24 + (38 - 24) * factor);
    const b = Math.round(24 + (38 - 24) * factor);
    return `rgb(${r}, ${g}, ${b})`;
  }
}

export const Component = ({
  fontSize = 15,
  speed = 0.5,
  density = 1.2,
  textColor = "#FF6B2C",
  colorMode = "orange-red",
  className,
  preventPageScroll = false,
}: MatrixCodeRainProps = {}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null);
  const strands = useRef<Strand[]>([]);
  const lastTime = useRef<number>(0);
  const cursorBlinkTime = useRef<number>(0);
  const dimensionsRef = useRef<{ w: number; h: number }>({ w: 0, h: 0 });

  const characters =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz@#$%&*+-/<>=";

  const getRandomChar = useCallback(() => {
    return characters.charAt(Math.floor(Math.random() * characters.length));
  }, [characters]);

  const createStrand = useCallback(
    (x: number, canvasHeight: number, startY?: number) => {
      const layer = Math.floor(Math.random() * 3);
      const scale = layer === 0 ? 0.85 : layer === 1 ? 1 : 1.15;
      const length = Math.floor(Math.random() * 16) + 14;

      const chars: Character[] = Array(length)
        .fill(null)
        .map(() => ({
          char: getRandomChar(),
          opacity: 1,
        }));

      // Initial seed distributes across full vertical canvas; fresh strands start above top
      const initialY =
        startY !== undefined
          ? startY
          : -length * (fontSize * scale) - Math.random() * 120;

      return {
        x,
        y: initialY,
        speed:
          (Math.random() * 0.4 + 0.8) *
          speed *
          fontSize *
          (layer === 2 ? 1.25 : layer === 1 ? 1 : 0.8),
        length,
        characters: chars,
        showCursor: true,
        layer,
        scale,
      };
    },
    [fontSize, getRandomChar, speed],
  );

  // Pre-seed strands across all available slots so rain is visible immediately
  const seedStrands = useCallback(
    (width: number, height: number) => {
      if (width <= 0 || height <= 0) return;
      const spacing = fontSize * 1.5;
      const numSlots = Math.floor(width / spacing);
      if (numSlots <= 0) return;

      const targetStrands = Math.floor(numSlots * density);
      const newStrands: Strand[] = [];

      for (let i = 0; i < targetStrands; i++) {
        const slotIndex = Math.floor(Math.random() * numSlots);
        const x = slotIndex * spacing;
        const randomY = (Math.random() * 1.6 - 0.4) * height;
        newStrands.push(createStrand(x, height, randomY));
      }

      strands.current = newStrands;
    },
    [fontSize, density, createStrand],
  );

  const updateStrands = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number,
      deltaTime: number,
    ) => {
      if (width <= 0 || height <= 0) return;

      const spacing = fontSize * 1.5;
      const numSlots = Math.floor(width / spacing);
      const maxStrands = Math.floor(numSlots * density);

      // Pre-seed on first frame if empty
      if (strands.current.length === 0) {
        seedStrands(width, height);
      }

      // Fill missing strands actively
      if (strands.current.length < maxStrands) {
        const activeX = new Set(strands.current.map((s) => Math.round(s.x)));
        const availableSlots: number[] = [];
        for (let i = 0; i < numSlots; i++) {
          const x = i * spacing;
          if (!activeX.has(Math.round(x))) {
            availableSlots.push(x);
          }
        }

        const toSpawn = Math.min(
          4,
          maxStrands - strands.current.length,
          availableSlots.length,
        );
        for (let j = 0; j < toSpawn; j++) {
          if (availableSlots.length > 0 && Math.random() < 0.7) {
            const pickIdx = Math.floor(Math.random() * availableSlots.length);
            const x = availableSlots.splice(pickIdx, 1)[0];
            strands.current.push(createStrand(x, height));
          }
        }
      }

      cursorBlinkTime.current += deltaTime;
      if (cursorBlinkTime.current >= 400) {
        strands.current.forEach((strand) => {
          strand.showCursor = !strand.showCursor;
        });
        cursorBlinkTime.current = 0;
      }

      // Deep solid black canvas clear
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, width, height);

      // Sort by depth layer (background to foreground)
      strands.current.sort((a, b) => a.layer - b.layer);

      // Clamp deltaTime to avoid jumps
      const clampedDelta = Math.min(Math.max(deltaTime, 8), 64);

      strands.current = strands.current.filter((strand) => {
        strand.y += strand.speed * clampedDelta * 0.055;

        const baseOpacity =
          strand.layer === 0 ? 0.45 : strand.layer === 1 ? 0.8 : 1.0;
        const blur = strand.layer === 0 ? 1 : strand.layer === 1 ? 3 : 5;
        const scaledFontSize = fontSize * strand.scale;

        ctx.font = `600 ${scaledFontSize}px "Courier New", Courier, monospace`;

        const strandLen = strand.characters.length;

        strand.characters.forEach((char, i) => {
          const y = strand.y + i * scaledFontSize;

          if (y > -scaledFontSize && y < height + scaledFontSize) {
            const isHead = i === strandLen - 1;
            const ratio = i / Math.max(1, strandLen - 1);

            if (isHead) {
              // Radiant white/gold head character with glowing orange shadow
              ctx.fillStyle = "#FFFFFF";
              ctx.shadowColor = colorMode === "orange-red" ? "#FF6B2C" : textColor;
              ctx.shadowBlur = 12;
              ctx.globalAlpha = 1;
              ctx.fillText(char.char, strand.x, y);

              if (strand.showCursor) {
                ctx.fillStyle = "#FFFFFF";
                ctx.fillRect(strand.x, y + 2, scaledFontSize * 0.75, 2);
              }
            } else {
              // Trail character color
              const charColor =
                colorMode === "orange-red"
                  ? getOrangeRedColor(ratio)
                  : textColor;

              const trailRatio = (i + 1) / strandLen;
              const opacity = baseOpacity * Math.max(0.25, trailRatio);

              ctx.fillStyle = charColor;
              ctx.shadowColor = colorMode === "orange-red" ? "#FF4500" : textColor;
              ctx.shadowBlur = blur;
              ctx.globalAlpha = opacity;
              ctx.fillText(char.char, strand.x, y);
            }
          }
        });

        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;

        // Occasional character flicker
        if (Math.random() < 0.04) {
          const randomIndex = Math.floor(
            Math.random() * strand.characters.length,
          );
          strand.characters[randomIndex].char = getRandomChar();
        }

        return strand.y - strand.length * (fontSize * strand.scale) < height;
      });
    },
    [density, fontSize, getRandomChar, textColor, colorMode, createStrand, seedStrands],
  );

  const animate = useCallback(
    (time: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const width = dimensionsRef.current.w || canvas.width;
      const height = dimensionsRef.current.h || canvas.height;

      const deltaTime = lastTime.current ? time - lastTime.current : 16.6;
      lastTime.current = time;

      updateStrands(ctx, width, height, deltaTime);

      animationFrameId.current = requestAnimationFrame(animate);
    },
    [updateStrands],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      const container = canvas.parentElement;
      const w = container?.clientWidth || window.innerWidth || 1200;
      const h = container?.clientHeight || window.innerHeight || 800;

      if (w > 0 && h > 0) {
        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w;
          canvas.height = h;
          dimensionsRef.current = { w, h };
          seedStrands(w, h);
        }
      }
    };

    handleResize();

    const ro = new ResizeObserver(() => {
      handleResize();
    });
    if (canvas.parentElement) {
      ro.observe(canvas.parentElement);
    }
    window.addEventListener("resize", handleResize);

    lastTime.current = performance.now();
    cursorBlinkTime.current = 0;
    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
      ro.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, [animate, seedStrands]);

  return (
    <div
      className={
        className ?? "relative w-screen h-screen overflow-hidden bg-black"
      }
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

      {preventPageScroll && (
        <style>{`
          html, body, :root {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            background-color: #000;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          }
        `}</style>
      )}
    </div>
  );
};

export const MatrixCodeRain = Component;
export default Component;
