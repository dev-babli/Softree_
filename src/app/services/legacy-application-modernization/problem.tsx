"use client";

import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
interface PainPoint {
  id: number;
  icon: string;
  label: string;
  detail: string;
  stat: string;
  statLabel: string;
  accentColor: string;
  glowColor: string;
}

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */
const PAIN_POINTS: PainPoint[] = [
  {
    id: 1,
    icon: "💸",
    label: "Expensive to Maintain",
    detail: "Legacy upkeep consumes 70–80% of IT budgets, leaving almost nothing for innovation.",
    stat: "78%",
    statLabel: "of IT budget wasted",
    accentColor: "#ff5812",
    glowColor: "rgba(255, 88, 18, 0.15)",
  },
  {
    id: 2,
    icon: "🐢",
    label: "Slow Operations",
    detail: "Outdated pipelines create cascading delays across every business function.",
    stat: "3×",
    statLabel: "slower time-to-market",
    accentColor: "#ff5812",
    glowColor: "rgba(255, 88, 18, 0.15)",
  },
  {
    id: 3,
    icon: "🔓",
    label: "Security Risks",
    detail: "Unpatched systems are prime targets — breaches cost an average of $4.5M per incident.",
    stat: "$4.5M",
    statLabel: "avg. breach cost",
    accentColor: "#ff5812",
    glowColor: "rgba(255, 88, 18, 0.15)",
  },
  {
    id: 4,
    icon: "📉",
    label: "Limits Scalability",
    detail: "Rigid monoliths can't handle demand spikes, causing outages at critical moments.",
    stat: "60%",
    statLabel: "fail to scale on demand",
    accentColor: "#ff5812",
    glowColor: "rgba(255, 88, 18, 0.15)",
  },
  {
    id: 5,
    icon: "🤖",
    label: "Prevents AI Adoption",
    detail: "Modern AI and ML tooling requires APIs and architectures that legacy stacks lack.",
    stat: "83%",
    statLabel: "blocked from AI rollout",
    accentColor: "#ff5812",
    glowColor: "rgba(255, 88, 18, 0.15)",
  },
  {
    id: 6,
    icon: "🖐",
    label: "Manual Processes",
    detail: "Hours lost daily to tasks that intelligent automation should handle in seconds.",
    stat: "14h",
    statLabel: "lost per employee / week",
    accentColor: "#ff5812",
    glowColor: "rgba(255, 88, 18, 0.15)",
  },
];

/* ─────────────────────────────────────────────
   Hook — Intersection Observer reveal
───────────────────────────────────────────── */
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

/* ─────────────────────────────────────────────
   Animated noise texture SVG (inline, no CDN)
───────────────────────────────────────────── */
function NoiseBg() {
  return (
    <svg
      aria-hidden
      className="noise-bg"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        opacity: 0.04,
        pointerEvents: "none",
      }}
    >
      <filter id="noise">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.65"
          numOctaves="3"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Grid decorative lines
───────────────────────────────────────────── */
function GridLines() {
  return (
    <svg
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        opacity: 0.05,
      }}
    >
      {Array.from({ length: 8 }).map((_, i) => (
        <line
          key={i}
          x1={`${i * 14.28}%`}
          y1="0"
          x2={`${i * 14.28}%`}
          y2="100%"
          stroke="#000000"
          strokeWidth="0.5"
        />
      ))}
      {Array.from({ length: 12 }).map((_, i) => (
        <line
          key={i}
          x1="0"
          y1={`${i * 9.09}%`}
          x2="100%"
          y2={`${i * 9.09}%`}
          stroke="#000000"
          strokeWidth="0.5"
        />
      ))}
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Pain Card
───────────────────────────────────────────── */
function PainCard({
  point,
  index,
  visible,
}: {
  point: PainPoint;
  index: number;
  visible: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  const delay = `${index * 80}ms`;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        background: hovered
          ? "linear-gradient(135deg, #ffffff 0%, #f5f5f7 100%)"
          : "linear-gradient(135deg, #fafafa 0%, #f0f0f2 100%)",
        border: `2px solid ${hovered ? point.accentColor : "#eaeaea"}`,
        borderRadius: "16px",
        padding: "28px 24px 24px",
        overflow: "hidden",
        cursor: "default",
        transition:
          "border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease, opacity 0.5s ease",
        transform: visible
          ? hovered
            ? "translateY(-4px)"
            : "translateY(0)"
          : "translateY(24px)",
        opacity: visible ? 1 : 0,
        transitionDelay: visible ? delay : "0ms",
        boxShadow: hovered
          ? `0 20px 48px rgba(255, 88, 18, 0.08), 0 0 0 1px ${point.accentColor}22`
          : "0 2px 12px rgba(0,0,0,0.02)",
      }}
    >
      {/* Top accent bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: point.accentColor,
          opacity: hovered ? 1 : 0.8,
          transition: "opacity 0.3s",
        }}
      />

      {/* Glow orb */}
      <div
        style={{
          position: "absolute",
          top: "-40px",
          right: "-20px",
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          background: point.glowColor,
          filter: "blur(40px)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.4s ease",
          pointerEvents: "none",
        }}
      />

      {/* Stat badge */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          background: point.accentColor + "12",
          border: `1px solid ${point.accentColor}33`,
          borderRadius: "8px",
          padding: "4px 10px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "15px",
            fontWeight: 700,
            color: point.accentColor,
            lineHeight: 1.1,
          }}
        >
          {point.stat}
        </div>
        <div
          style={{
            fontSize: "9px",
            color: "#000000",
            fontFamily: "'DM Sans', sans-serif",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            marginTop: "1px",
            whiteSpace: "nowrap",
            fontWeight: 700,
          }}
        >
          {point.statLabel}
        </div>
      </div>

      {/* Icon */}
      <div style={{ fontSize: "28px", marginBottom: "14px", lineHeight: 1 }}>
        {point.icon}
      </div>

      {/* Label */}
      <h3
        style={{
         
          fontSize: "15px",
          fontWeight: 800,
          color: "#000000",
          margin: "0 0 8px",
          letterSpacing: "-0.01em",
        }}
      >
        {point.label}
      </h3>

      {/* Detail */}
      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "13px",
          color: "#000000",
          lineHeight: 1.6,
          margin: 0,
          fontWeight: 500,
        }}
      >
        {point.detail}
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Component
 ───────────────────────────────────────────── */
export default function ProblemSection() {
  const { ref: heroRef, visible: heroVisible } = useReveal(0.1);
  const { ref: gridRef, visible: gridVisible } = useReveal(0.05);
  const { ref: closingRef, visible: closingVisible } = useReveal(0.2);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

        * { box-sizing: border-box; }

        @keyframes scanline {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }

        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.7); }
        }

        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <section
        style={{
          position: "relative",
          background: "#ffffff",
          minHeight: "100vh",
          overflow: "hidden",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <NoiseBg />
        <GridLines />

        {/* Scanline effect */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.015) 50%)",
            backgroundSize: "100% 4px",
            pointerEvents: "none",
            zIndex: 0,
            opacity: 0.3,
          }}
        />

        {/* Moving scanline */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            height: "2px",
            background:
              "linear-gradient(to bottom, transparent, rgba(0,0,0,0.015), transparent)",
            animation: "scanline 8s linear infinite",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />

        {/* Radial glow - top left */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "-200px",
            left: "-200px",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255, 88, 18, 0.05) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: "1280px",
            margin: "0 auto",
            padding: isMobile ? "40px 16px 60px" : "80px 40px 100px",
          }}
        >
          {/* ── HERO ── */}
          <div
            ref={heroRef}
            style={{
              marginBottom: "72px",
            }}
          >
            {/* Section label */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "28px",
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "none" : "translateY(12px)",
                transition: "opacity 0.6s ease, transform 0.6s ease",
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#ff5812",
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "#ff5812",
                    display: "inline-block",
                    animation: "pulse-dot 2s ease-in-out infinite",
                  }}
                />
                Section 01
              </span>
              <div
                style={{ flex: 1, height: "1px", background: "#ff5812" }}
              />
              <span
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#000000",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 700,
                }}
              >
                The Problem
              </span>
            </div>

            {/* Headline */}
            <h1
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
                fontWeight: 700,
                color: "#000000",
                lineHeight: 1.1,
                margin: "0 0 24px",
                letterSpacing: "-0.02em",
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "none" : "translateY(20px)",
                transition:
                  "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
              }}
            >
              Legacy Systems Are Slowing Business Growth
            </h1>

            {/* Sub */}
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "15px",
                fontWeight: 500,
                color: "#000000",
                lineHeight: 1.7,
                maxWidth: "540px",
                margin: 0,
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "none" : "translateY(16px)",
                transition:
                  "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
              }}
            >
              Many organizations still depend on outdated platforms that drain
              resources, block innovation, and prevent adoption of modern
              technology.
            </p>
          </div>

          {/* ── DIVIDER ── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "48px",
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease 0.3s",
            }}
          >
            <div
              style={{
                height: "2px",
                flex: 1,
                background:
                  "linear-gradient(to right, #ff5812, #000000)",
              }}
            />
            <span
              style={{
                fontSize: "11px",
                color: "#000000",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 700,
              }}
            >
              6 critical barriers
            </span>
            <div
              style={{
                height: "2px",
                flex: 1,
                background:
                  "linear-gradient(to left, #ff5812, #000000)",
              }}
            />
          </div>

          {/* ── PAIN GRID ── */}
          <div
            ref={gridRef}
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
              gap: "16px",
              marginBottom: "64px",
            }}
          >
            {PAIN_POINTS.map((point, i) => (
              <PainCard
                key={point.id}
                point={point}
                index={i}
                visible={gridVisible}
              />
            ))}
          </div>

          {/* ── CLOSING STATEMENT ── */}
          <div
            ref={closingRef}
            style={{
              position: "relative",
              border: "2px solid #000000",
              borderLeft: "5px solid #ff5812",
              borderRadius: "0 12px 12px 0",
              background: "linear-gradient(90deg, #ffffff, #fafafa)",
              padding: "28px 32px",
              display: "flex",
              alignItems: "flex-start",
              gap: "20px",
              opacity: closingVisible ? 1 : 0,
              transform: closingVisible
                ? "none"
                : "translateX(-20px)",
              transition:
                "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            <div
              style={{
                fontSize: "28px",
                lineHeight: 1,
                flexShrink: 0,
                marginTop: "2px",
              }}
            >
              ⚠️
            </div>
            <div>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "#000000",
                  margin: "0 0 8px",
                  letterSpacing: "-0.01em",
                }}
              >
                The cost of inaction compounds every quarter.
              </p>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#000000",
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                As technology evolves, legacy platforms become barriers to
                innovation and operational efficiency. Organizations that delay
                modernization don't stand still — they fall behind.
              </p>
            </div>
          </div>

          {/* ── TICKER ── */}
          <div
            style={{
              marginTop: "64px",
              overflow: "hidden",
              borderTop: "2px solid #000000",
              borderBottom: "2px solid #000000",
              padding: "14px 0",
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.8s ease 0.6s",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "48px",
                animation: "marquee 20s linear infinite",
                whiteSpace: "nowrap",
              }}
            >
              {[
                "78% of IT budget lost to maintenance",
                "3× slower time-to-market",
                "$4.5M average breach cost",
                "60% fail to scale on demand",
                "83% blocked from AI rollout",
                "14 hours lost per employee weekly",
                "78% of IT budget lost to maintenance",
                "3× slower time-to-market",
                "$4.5M average breach cost",
                "60% fail to scale on demand",
                "83% blocked from AI rollout",
                "14 hours lost per employee weekly",
              ].map((text, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: "12px",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: i % 2 === 0 ? "#000000" : "#ff5812",
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {text}
                  <span
                    style={{
                      marginLeft: "48px",
                      color: "#ff5812",
                    }}
                  >
                    ◆
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}