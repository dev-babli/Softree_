"use client"

import { useState, useEffect } from "react"
import { GlobalNetworkMap } from "@/components/homepage/GlobalNetworkMap"
import { DeliveryProcessDiagram } from "@/components/homepage/DeliveryProcessDiagram"
import { FlexibleTechExecutionVisual } from "@/components/homepage/FlexibleTechExecutionVisual"
import { LongTermDeliveryVisual } from "@/components/homepage/LongTermDeliveryVisual"

const SLIDES = [
  { id: "global-delivery", label: "01 · Global Delivery", bg: "#0e0e0e" },
  { id: "delivery-framework", label: "02 · Delivery Framework", bg: "#11100e" },
  { id: "engineering-execution", label: "03 · Engineering Execution", bg: "#050506" },
  { id: "long-term-partnership", label: "04 · Long-Term Partnership", bg: "#0c0c0e" },
]

export default function RecordSlidesPage() {
  const [active, setActive] = useState(0)
  const [revealed, setRevealed] = useState(false)

  // Auto-reveal: curtain drops after 600ms — gives recording the reveal effect
  useEffect(() => {
    const tHide = setTimeout(() => setRevealed(false), 0)
    const tShow = setTimeout(() => setRevealed(true), 600)
    return () => { clearTimeout(tHide); clearTimeout(tShow) }
  }, [active])

  const slide = SLIDES[active]

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "#000",
        display: "flex",
        flexDirection: "column",
        fontFamily: '"Outfit", sans-serif',
      }}
    >
      {/* ── Top bar: slide selector ── */}
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          padding: "0.75rem 1rem",
          background: "rgba(255,255,255,0.04)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          flexShrink: 0,
          zIndex: 100,
        }}
      >
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setActive(i)}
            style={{
              padding: "0.35rem 0.85rem",
              borderRadius: "999px",
              border: `1px solid ${active === i ? "#ff6b00" : "rgba(255,255,255,0.12)"}`,
              background: active === i ? "rgba(255,107,0,0.15)" : "transparent",
              color: active === i ? "#ff6b00" : "rgba(255,255,255,0.5)",
              fontSize: "0.72rem",
              fontWeight: 700,
              cursor: "pointer",
              letterSpacing: "0.04em",
              transition: "all 180ms ease",
            }}
          >
            {s.label}
          </button>
        ))}
        <span
          style={{
            marginLeft: "auto",
            fontSize: "0.62rem",
            color: "rgba(255,255,255,0.3)",
            alignSelf: "center",
            letterSpacing: "0.06em",
          }}
        >
          Click a slide → wait for reveal → screen record
        </span>
      </div>

      {/* ── Main animation canvas ── */}
      <div
        style={{
          flex: 1,
          position: "relative",
          background: slide.bg,
          overflow: "hidden",
        }}
      >
        {/* Reveal curtain — slides up to expose animation */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "#000",
            zIndex: 50,
            transform: revealed ? "translateY(-100%)" : "translateY(0)",
            transition: "transform 0.72s cubic-bezier(0.76, 0, 0.24, 1)",
            pointerEvents: "none",
          }}
        />

        {/* Slide content — full bleed, no padding, no labels */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {slide.id === "global-delivery" && (
            <div style={{ width: "100%", height: "100%" }}>
              <GlobalNetworkMap />
            </div>
          )}
          {slide.id === "delivery-framework" && (
            <div style={{ width: "100%", height: "100%" }}>
              <DeliveryProcessDiagram />
            </div>
          )}
          {slide.id === "engineering-execution" && (
            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
              <FlexibleTechExecutionVisual isActive />
            </div>
          )}
          {slide.id === "long-term-partnership" && (
            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
              <LongTermDeliveryVisual />
            </div>
          )}
        </div>
      </div>

      {/* ── Bottom nav ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.6rem 1rem",
          background: "rgba(255,255,255,0.03)",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          flexShrink: 0,
        }}
      >
        <button
          onClick={() => setActive((p) => Math.max(0, p - 1))}
          disabled={active === 0}
          style={{
            padding: "0.3rem 0.9rem",
            borderRadius: "999px",
            border: "1px solid rgba(255,255,255,0.12)",
            background: "transparent",
            color: active === 0 ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.7)",
            fontSize: "0.72rem",
            fontWeight: 700,
            cursor: active === 0 ? "not-allowed" : "pointer",
          }}
        >
          ← Prev
        </button>

        <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.25)", letterSpacing: "0.12em" }}>
          {active + 1} / {SLIDES.length}
        </span>

        <button
          onClick={() => setActive((p) => Math.min(SLIDES.length - 1, p + 1))}
          disabled={active === SLIDES.length - 1}
          style={{
            padding: "0.3rem 0.9rem",
            borderRadius: "999px",
            border: "1px solid rgba(255,255,255,0.12)",
            background: "transparent",
            color: active === SLIDES.length - 1 ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.7)",
            fontSize: "0.72rem",
            fontWeight: 700,
            cursor: active === SLIDES.length - 1 ? "not-allowed" : "pointer",
          }}
        >
          Next →
        </button>
      </div>
    </div>
  )
}
