"use client";

import { useState, useEffect, useRef } from "react";

const points = [
  {
    id: "01",
    title: "Deep Enterprise\nExperience",
    description:
      "Strong expertise in enterprise modernization and workflow transformation.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" style={{ width: "100%", height: "100%" }}>
        <circle cx="24" cy="16" r="8" stroke="currentColor" strokeWidth="2.5" />
        <path d="M8 40c0-8.837 7.163-16 16-16s16 7.163 16 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M30 14l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M36 18h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "02",
    title: "Offshore Engineering\nAdvantage",
    description:
      "Cost-effective delivery with scalable engineering teams.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" style={{ width: "100%", height: "100%" }}>
        <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="2.5" />
        <path d="M8 24h32M24 8c-4 4-6 10-6 16s2 12 6 16M24 8c4 4 6 10 6 16s-2 12-6 16" stroke="currentColor" strokeWidth="2" />
        <path d="M12 16h24M12 32h24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 2" />
      </svg>
    ),
  },
  {
    id: "03",
    title: "Modern Technology\nStack",
    description:
      "Cloud-native, AI-ready, and automation-focused solutions.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" style={{ width: "100%", height: "100%" }}>
        <path d="M14 30a8 8 0 01-2-15.5A10 10 0 0132 16h2a7 7 0 010 14H14z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M20 34v6M24 34v6M28 34v6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M17 40h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "04",
    title: "Flexible Engagement\nModels",
    description:
      "Project-based, dedicated teams, or T&M engagement.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" style={{ width: "100%", height: "100%" }}>
        <rect x="6" y="10" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="2.5" />
        <rect x="26" y="26" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="2.5" />
        <path d="M14 22v4a4 4 0 004 4h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="34" cy="16" r="5" stroke="currentColor" strokeWidth="2" />
        <path d="M32 16l1.5 1.5L36 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "05",
    title: "Business-Focused\nDelivery",
    description:
      "Focused on operational efficiency, scalability, and modernization outcomes.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" style={{ width: "100%", height: "100%" }}>
        <path d="M8 36l10-12 8 6 8-14 6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="40" cy="22" r="3" fill="currentColor" />
        <path d="M6 40h36" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M8 12v28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

function useReveal(threshold = 0.08) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function NoiseBg() {
  return (
    <svg aria-hidden style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.03, pointerEvents: "none" }}>
      <filter id="nwhy"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" /><feColorMatrix type="saturate" values="0" /></filter>
      <rect width="100%" height="100%" filter="url(#nwhy)" />
    </svg>
  );
}

function GridLines() {
  return (
    <svg aria-hidden style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: 0.025 }}>
      {Array.from({ length: 9 }).map((_, i) => <line key={i} x1={`${i * 12.5}%`} y1="0" x2={`${i * 12.5}%`} y2="100%" stroke="#000" strokeWidth="0.5" />)}
      {Array.from({ length: 13 }).map((_, i) => <line key={i} x1="0" y1={`${i * 8.33}%`} x2="100%" y2={`${i * 8.33}%`} stroke="#000" strokeWidth="0.5" />)}
    </svg>
  );
}

export default function WhyChooseSoftree() {
  const { ref: sectionRef, visible } = useReveal(0.05);
  const [activePoint, setActivePoint] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,700&display=swap');
        * { box-sizing: border-box; }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.4; transform: scale(0.7); }
        }
      `}</style>

      <section
        style={{
          position: "relative",
          background: "#ffffff",
          fontFamily: "'DM Sans', sans-serif",
          padding: "20px 0",
        }}
      >
        <NoiseBg />
        <GridLines />

        <div
          ref={sectionRef}
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: "1200px",
            margin: isMobile ? "40px auto" : "80px auto",
            padding: isMobile ? "40px 20px" : "60px 48px",
            background: "rgba(248, 250, 252, 0.95)",
            backdropFilter: "blur(8px)",
            borderRadius: "32px",
            boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.08)",
          }}
        >
          {/* ── HEADER ── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "40px",
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateY(12px)",
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
              Section 07
            </span>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, #ff5812, #eaeaea)" }} />
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
              Why Softree
            </span>
          </div>

          {/* Two-column layout: heading left, content right */}
          <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: isMobile ? "40px" : "64px" }}>

            {/* LEFT — Sticky heading */}
            <div
              style={{
                flex: isMobile ? "none" : "0 0 38%",
                opacity: visible ? 1 : 0,
                position: isMobile ? "static" : "sticky",
                top: "140px",
                alignSelf: "flex-start",
                transition: "opacity 0.8s ease 0.1s",
              }}
            >
              <h2
  style={{
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "clamp(2.2rem, 4vw, 3.2rem)",
    fontWeight: 700,
    margin: "0 0 24px",
    letterSpacing: "-0.02em",
    lineHeight: 1.1,
    color: "#000000",
    whiteSpace: "normal",
  }}
>
  Why Choose Softree
</h2>


                {/* Sub-label */}
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "13px",
                    lineHeight: 1.6,
                    color: "#64748b",
                    margin: 0,
                    maxWidth: "260px",
                  }}
                >
                  Organizations choose Softree to secure operational outcomes and high-assurance delivery.
                </p>

                {/* Counter badge */}
                <div
                  style={{
                    marginTop: "32px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "12px",
                    border: "2px solid #000000",
                    borderRadius: "12px",
                    padding: "8px 16px",
                    background: "#ffffff",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontSize: "28px",
                      fontWeight: 800,
                      color: "#ff5812",
                      lineHeight: 1,
                    }}
                  >
                    {String(activePoint !== null ? activePoint + 1 : points.length).padStart(2, "0")}
                  </span>
                  <div style={{ width: 1, height: 28, background: "#e2e8f0" }} />
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "9px",
                      letterSpacing: "0.15em",
                      color: "#64748b",
                      textTransform: "uppercase",
                      lineHeight: 1.3,
                      fontWeight: 700,
                    }}
                  >
                    {activePoint !== null ? "Active" : "Total"}<br />Advantage
                  </span>
                </div>
            </div>

            {/* RIGHT — Points list */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              {points.map((point, i) => (
                <div
                  key={i}
                  onMouseEnter={() => setActivePoint(i)}
                  onMouseLeave={() => setActivePoint(null)}
                  style={{
                    position: "relative",
                    cursor: "default",
                    borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
                    opacity: visible ? 1 : 0,
                    transform: visible ? "none" : "translateY(20px)",
                    transition: `opacity 0.6s ease ${200 + i * 80}ms, transform 0.6s ease ${200 + i * 80}ms, background 0.3s ease`,
                    overflow: "hidden",
                    background: activePoint === i ? "#ffffff" : "transparent",
                    borderRadius: activePoint === i ? "16px" : "0",
                    border: activePoint === i ? "2px solid #ff5812" : "2px solid transparent",
                    borderBottomColor: activePoint === i ? "#ff5812" : "rgba(0, 0, 0, 0.08)",
                    boxShadow: activePoint === i ? "0 12px 24px rgba(255, 88, 18, 0.05)" : "none",
                    padding: "24px 20px",
                    marginTop: i > 0 && activePoint === i ? "4px" : "0",
                    marginBottom: activePoint === i ? "4px" : "0",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "20px", position: "relative", zIndex: 2 }}>

                    {/* Number */}
                    <span
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "12px",
                        fontWeight: 700,
                        color: activePoint === i ? "#ff5812" : "#94a3b8",
                        minWidth: "24px",
                        paddingTop: "4px",
                        transition: "color 0.25s ease",
                      }}
                    >
                      {point.id}
                    </span>

                    {/* Icon */}
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        flexShrink: 0,
                        color: activePoint === i ? "#ff5812" : "#000000",
                        transition: "color 0.25s ease",
                      }}
                    >
                      {point.icon}
                    </div>

                    {/* Text */}
                    <div style={{ flex: 1 }}>
                      <h3
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "clamp(15px, 2.2vw, 19px)",
                          fontWeight: 700,
                          color: "#000000",
                          whiteSpace: "pre-line",
                          margin: "0 0 8px 0",
                          lineHeight: 1.25,
                        }}
                      >
                        {point.title}
                      </h3>
                      <p
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "13px",
                          color: "#475569",
                          lineHeight: 1.6,
                          margin: 0,
                          maxWidth: "480px",
                        }}
                      >
                        {point.description}
                      </p>
                    </div>

                    {/* Arrow indicator */}
                    <div
                      style={{
                        flexShrink: 0,
                        opacity: activePoint === i ? 1 : 0,
                        transform: activePoint === i ? "translateX(0)" : "translateX(-8px)",
                        transition: "opacity 0.25s ease, transform 0.25s ease",
                        color: "#ff5812",
                        paddingTop: "4px",
                      }}
                    >
                      <svg viewBox="0 0 24 24" fill="none" style={{ width: 20, height: 20 }}>
                        <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>

                  </div>
                </div>
              ))}

              {/* Bottom CTA strip */}
              <div
                style={{
                  marginTop: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "16px",
                  borderTop: "2px solid #000000",
                  paddingTop: "24px",
                  opacity: visible ? 1 : 0,
                  transition: "opacity 0.6s ease 0.6s",
                }}
              >
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "9px",
                    fontWeight: 700,
                    letterSpacing: "0.22em",
                    color: "#64748b",
                    textTransform: "uppercase",
                  }}
                >
                  Enterprise · Offshore · Cloud-Native
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ height: 1, width: 30, background: "#ff5812" }} />
                  <div style={{ width: 7, height: 7, background: "#000000", transform: "rotate(45deg)" }} />
                  <div style={{ height: 1, width: 12, background: "#000000" }} />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}