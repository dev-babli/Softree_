"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useMemo, useRef } from "react"
import { DASHBOARD_TOKENS } from "../tokens"

export function VectorSearchViz() {
  const rootRef = useRef<HTMLDivElement>(null)

  const dots = useMemo(
    () =>
      Array.from({ length: 96 }, (_, i) => ({
        x: 8 + ((i * 13 + 7) % 84),
        y: 8 + ((i * 19 + 11) % 64),
        r: 1.2 + (i % 4) * 0.4,
        color:
          i % 5 === 0
            ? DASHBOARD_TOKENS.primary
            : i % 3 === 0
              ? DASHBOARD_TOKENS.architectureBlue
              : DASHBOARD_TOKENS.orange,
        opacity: 0.35 + (i % 6) * 0.1,
      })),
    [],
  )

  useGSAP(
    () => {
      gsap.to(".vec-dot", {
        opacity: "random(0.3, 0.9)",
        duration: 2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: { each: 0.05, from: "random" },
      })
    },
    { scope: rootRef },
  )

  return (
    <div
      ref={rootRef}
      className="rounded-2xl border bg-white p-3"
      style={{
        borderColor: DASHBOARD_TOKENS.border,
        boxShadow: DASHBOARD_TOKENS.widgetShadow,
      }}
    >
      <p
        className="text-[9px] font-bold uppercase tracking-[0.14em]"
        style={{ color: DASHBOARD_TOKENS.textLight }}
      >
        Vector Search Visualization
      </p>
      <div
        className="relative mt-2.5 h-[88px] overflow-hidden rounded-xl"
        style={{ background: DASHBOARD_TOKENS.navy }}
      >
        <svg viewBox="0 0 100 72" className="h-full w-full" aria-hidden>
          {dots.map((dot, i) => (
            <circle
              key={i}
              className="vec-dot"
              cx={dot.x}
              cy={dot.y}
              r={dot.r}
              fill={dot.color}
              opacity={dot.opacity}
            />
          ))}
          <circle
            cx="52"
            cy="32"
            r="8"
            fill="none"
            stroke={DASHBOARD_TOKENS.primary}
            strokeWidth="0.6"
            opacity="0.8"
          />
          <circle cx="52" cy="32" r="2.5" fill={DASHBOARD_TOKENS.primary} opacity="0.9" />
        </svg>
        <div
          className="absolute bottom-2 left-2 rounded-lg border px-2 py-1.5 text-[8px] leading-snug backdrop-blur-sm"
          style={{
            background: "rgba(255,255,255,0.08)",
            borderColor: "rgba(255,255,255,0.12)",
            color: "#E2E8F0",
          }}
        >
          <span style={{ color: DASHBOARD_TOKENS.textLight }}>Query:</span> &quot;Customer refund policy&quot;
          <br />
          <span style={{ color: DASHBOARD_TOKENS.primaryLight }}>Score: 0.98</span>
        </div>
      </div>
    </div>
  )
}
