"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

/**
 * ScatterCluster
 * ----------------
 * A set of particles starts scattered randomly across the container,
 * then animates into a clustered formation (a circle, by default).
 * Hover the container to scatter again, or use the replay button.
 *
 * npm install gsap @gsap/react
 */

export interface ScatterClusterProps {
  /** Number of particles to render. */
  count?: number;
  /** Radius (px) of the clustered formation. */
  clusterRadius?: number;
  /** Diameter (px) of each particle. */
  particleSize?: number;
  /** Duration (s) of the cluster-in animation. */
  duration?: number;
  /** Stagger (s) between each particle's start time. */
  stagger?: number;
  /** GSAP ease for the cluster-in animation. */
  ease?: string;
  /** Particle color. Accepts any CSS color. */
  color?: string;
  /** Re-scatter the cluster when the container is hovered. */
  scatterOnHover?: boolean;
  /** Extra class name for the outer container. */
  className?: string;
}

interface Particle {
  id: number;
  startX: number;
  startY: number;
  startScale: number;
  startRotation: number;
  clusterX: number;
  clusterY: number;
}

function buildParticles(
  count: number,
  clusterRadius: number,
  boundsW: number,
  boundsH: number
): Particle[] {
  return Array.from({ length: count }, (_, id) => {
    // Scattered starting position: anywhere in the bounding box.
    const startX = (Math.random() - 0.5) * boundsW;
    const startY = (Math.random() - 0.5) * boundsH;

    // Clustered target position: packed within a circle, denser toward
    // the center so the cluster reads as a solid mass rather than a ring.
    const angle = Math.random() * Math.PI * 2;
    const r = clusterRadius * Math.sqrt(Math.random());
    const clusterX = Math.cos(angle) * r;
    const clusterY = Math.sin(angle) * r;

    return {
      id,
      startX,
      startY,
      startScale: 0.4 + Math.random() * 0.6,
      startRotation: Math.random() * 360,
      clusterX,
      clusterY,
    };
  });
}

export default function ScatterCluster({
  count = 60,
  clusterRadius = 90,
  particleSize = 10,
  duration = 1.1,
  stagger = 0.015,
  ease = "back.out(1.6)",
  color = "#C94716", // Custom Softree Orange
  scatterOnHover = true,
  className = "",
}: ScatterClusterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<(HTMLSpanElement | null)[]>([]);
  const [particles] = useState(() => buildParticles(count, clusterRadius, 460, 300));
  const clustered = useRef(false);

  const { contextSafe } = useGSAP(
    () => {
      const targets = particlesRef.current.filter(Boolean);

      // Set scattered starting state immediately (no animation).
      gsap.set(targets, {
        x: (i) => particles[i].startX,
        y: (i) => particles[i].startY,
        scale: (i) => particles[i].startScale,
        rotation: (i) => particles[i].startRotation,
        opacity: 0,
      });

      // Animate into the cluster on mount.
      gsap.to(targets, {
        x: (i) => particles[i].clusterX,
        y: (i) => particles[i].clusterY,
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration,
        ease,
        stagger: {
          each: stagger,
          from: "random",
        },
        onComplete: () => {
          clustered.current = true;
        },
      });
    },
    { scope: containerRef, dependencies: [count, clusterRadius, duration, stagger, ease] }
  );

  const scatter = contextSafe(() => {
    const targets = particlesRef.current.filter(Boolean);
    clustered.current = false;
    gsap.to(targets, {
      x: (i) => particles[i].startX,
      y: (i) => particles[i].startY,
      scale: (i) => particles[i].startScale,
      rotation: (i) => particles[i].startRotation * -1,
      duration: duration * 0.7,
      ease: "power2.inOut",
      stagger: {
        each: stagger,
        from: "random",
      },
    });
  });

  const cluster = contextSafe(() => {
    const targets = particlesRef.current.filter(Boolean);
    clustered.current = true;
    gsap.to(targets, {
      x: (i) => particles[i].clusterX,
      y: (i) => particles[i].clusterY,
      scale: 1,
      rotation: 0,
      duration,
      ease,
      stagger: {
        each: stagger,
        from: "random",
      },
    });
  });

  const replay = contextSafe(() => {
    scatter();
    gsap.delayedCall(duration * 0.7 * 0.6, cluster);
  });

  return (
    <div
      ref={containerRef}
      className={className}
      onMouseEnter={scatterOnHover ? scatter : undefined}
      onMouseLeave={scatterOnHover ? cluster : undefined}
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 460,
        height: 300,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "relative", width: 1, height: 1 }}>
        {particles.map((p, i) => (
          <span
            key={p.id}
            ref={(el) => {
              particlesRef.current[i] = el;
            }}
            style={{
              position: "absolute",
              top: -particleSize / 2,
              left: -particleSize / 2,
              width: particleSize,
              height: particleSize,
              borderRadius: "50%",
              background: color,
              willChange: "transform, opacity",
              pointerEvents: "none",
            }}
          />
        ))}
      </div>

      {!scatterOnHover && (
        <button
          type="button"
          onClick={replay}
          style={{
            position: "absolute",
            bottom: 16,
            left: "50%",
            transform: "translateX(-50%)",
            padding: "8px 16px",
            borderRadius: 999,
            border: "1px solid rgba(255,255,255,0.2)",
            background: "rgba(0,0,0,0.4)",
            color: "#fff",
            fontSize: 13,
            cursor: "pointer",
          }}
        >
          Replay
        </button>
      )}
    </div>
  );
}
