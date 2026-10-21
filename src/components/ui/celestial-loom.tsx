'use client';

import React, { useEffect, useState } from 'react';

// This is a self-contained React component that creates a "Celestial Loom" effect.
// An evolution of the "Aether Weave", this simulates a cosmic loom with a static
// grid and a dynamic shuttle weaving threads of light. The effect is achieved
// through layered procedural animations and CSS gradients.

interface ShuttleData {
  duration: number;
  delay: number;
  position: number;
  color: string;
}

interface CelestialLoomProps {
  children?: React.ReactNode;
  className?: string;
  colors?: string[];
  runsCount?: number;
}

const DEFAULT_COLORS = [
  "#FF6B00", // Softree Signature Orange
  "#FF8533", // Bright Warm Orange
  "#FF4500", // Fiery Orange-Red
  "#E65100", // Deep Amber Orange
  "#E60000", // Pure Crimson Red
  "#FF1E27", // Bright Tech Red
  "#CC1100", // Deep Red
  "#FF3B30", // Scarlet Red
  "#000000", // True Black
  "#18181B", // Dark Obsidian Black
];

export const Component: React.FC<CelestialLoomProps> = ({
  children,
  className = "",
  colors = DEFAULT_COLORS,
  runsCount = 25,
}) => {
  const [runs, setRuns] = useState<ShuttleData[]>([]);

  useEffect(() => {
    // Generate shuttle data once mounted on client to prevent SSR hydration mismatches
    const random = (min: number, max: number) => Math.random() * (max - min) + min;
    const generated: ShuttleData[] = Array.from({ length: runsCount }, () => ({
      duration: random(5, 12),
      delay: random(0, 10),
      position: random(5, 95),
      color: colors[Math.floor(random(0, colors.length))],
    }));
    setRuns(generated);
  }, [runsCount, colors]);

  return (
    <main className={`hero-section relative w-full overflow-hidden ${className}`}>
      <div className="warp-grid" />

      {/* Procedurally generate multiple shuttle runs */}
      {runs.map((run, i) => (
        <div
          key={i}
          className="shuttle-run"
          style={{
            animationDuration: `${run.duration}s`,
            animationDelay: `${run.delay}s`,
          }}
        >
          <div
            className="shuttle"
            style={
              {
                '--position': `${run.position}%`,
                '--color': run.color,
                animationDuration: `${run.duration}s`,
                animationDelay: `${run.delay}s`,
              } as React.CSSProperties
            }
          />
          <div
            className="weft-thread"
            style={
              {
                '--position': `${run.position}%`,
                '--color': run.color,
                animationDuration: `${run.duration}s`,
                animationDelay: `${run.delay}s`,
              } as React.CSSProperties
            }
          />
        </div>
      ))}

      {/* The content container */}
      {children && (
        <div className="relative z-10 w-full">
          {children}
        </div>
      )}
    </main>
  );
};

export default Component;
