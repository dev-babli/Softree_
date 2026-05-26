"use client";

import { useState, useEffect, useRef } from "react";

const steps = [
  {
    number: "01",
    title: "Discovery &\nAssessment",
    description:
      "We analyze existing systems, workflows, architecture, and dependencies.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" style={{ width: "32px", height: "32px" }}>
        <circle cx="18" cy="18" r="10" stroke="currentColor" strokeWidth="2.5" />
        <path d="M26 26L34 34" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M14 18h8M18 14v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Modernization\nStrategy",
    description:
      "Define migration roadmap, architecture, security, and scalability goals.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" style={{ width: "32px", height: "32px" }}>
        <path d="M6 32L14 20l8 6 8-12 4 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="34" cy="10" r="3" fill="currentColor" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Migration &\nTransformation",
    description:
      "Modernize applications, workflows, databases, and infrastructure.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" style={{ width: "32px", height: "32px" }}>
        <rect x="4" y="8" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="2.5" />
        <rect x="22" y="18" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="2.5" />
        <path d="M18 15h4M20 13v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Testing &\nOptimization",
    description:
      "Ensure performance, reliability, governance, and security.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" style={{ width: "32px", height: "32px" }}>
        <path d="M8 20l8 8 16-16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="2" strokeDasharray="4 3" />
      </svg>
    ),
  },
  {
    number: "05",
    title: "Support &\nContinuous\nImprovement",
    description:
      "Ongoing optimization and modernization support.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" style={{ width: "32px", height: "32px" }}>
        <path d="M20 6v4M20 30v4M6 20h4M30 20h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="20" cy="20" r="8" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="20" cy="20" r="3" fill="currentColor" />
      </svg>
    ),
  },
];

/* ─────────────────────────────────────────────
   Background Utilities
 ───────────────────────────────────────────── */
function NoiseBg() {
  return (
    <svg aria-hidden style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.03, pointerEvents: "none" }}>
      <filter id="n5s">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#n5s)" />
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

export default function ModernizationApproach() {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [visibleSteps, setVisibleSteps] = useState<boolean[]>(Array(steps.length).fill(false));
  const [headerVisible, setHeaderVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const headerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setHeaderVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timers = steps.map((_, i) =>
      setTimeout(() => {
        setVisibleSteps((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, 400 + i * 120)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,700&display=swap');
        @keyframes pulse-dot{0%,100%{opacity:1;transform:scale(1);}50%{opacity:.4;transform:scale(.7);}}
      `}</style>

      <section style={{ position: "relative", background: "#ffffff", overflow: "hidden", fontFamily: "'DM Sans', sans-serif" }}>
        <NoiseBg />
        <GridLines />

        {/* Ambient Blobs (Absolute, scrolling with page instead of fixed viewport) */}
        <div aria-hidden style={{ position: "absolute", top: "100px", right: "-100px", width: "360px", height: "360px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255, 88, 18, 0.04) 0%, transparent 70%)", pointerEvents: "none", zIndex: 1 }} />
        <div aria-hidden style={{ position: "absolute", bottom: "100px", left: "-100px", width: "360px", height: "360px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255, 88, 18, 0.03) 0%, transparent 70%)", pointerEvents: "none", zIndex: 1 }} />

        <div style={{ position: "relative", zIndex: 2, maxWidth: "1280px", margin: "0 auto", padding: isMobile ? "60px 20px" : "100px 40px" }}>

          {/* ── HEADER ── */}
          <div ref={headerRef} style={{ marginBottom: isMobile ? "40px" : "72px" }}>
            <div style={{
              display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px",
              opacity: headerVisible ? 1 : 0, transform: headerVisible ? "none" : "translateY(12px)",
              transition: "opacity .6s ease, transform .6s ease",
            }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#ff5812" }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#ff5812", display: "inline-block", animation: "pulse-dot 2s ease-in-out infinite" }} />
                Section 06
              </span>
              <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, #ff5812, #eaeaea)" }} />
              <span style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#000000", fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>
                Our Methodology
              </span>
            </div>

            <h2 style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
              fontWeight: 700,
              color: "#000000",
              lineHeight: 1.1,
              margin: "0 0 24px",
              letterSpacing: "-0.02em",
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? "none" : "translateY(20px)",
              transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
            }}>
              Our Modernization Approach
            </h2>

            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: "15px", fontWeight: 400, color: "#555555",
              lineHeight: 1.75, maxWidth: "500px", margin: 0,
              opacity: headerVisible ? 1 : 0, transform: headerVisible ? "none" : "translateY(16px)",
              transition: "opacity .7s ease .25s, transform .7s ease .25s",
            }}>
              We guide organizations through a structured, low-risk, phase-by-phase journey from legacy software to resilient cloud solutions.
            </p>
          </div>

          {/* ── DIVIDER STRIP ── */}
          <div style={{
            display: "flex", alignItems: "center", gap: "32px", marginBottom: isMobile ? "40px" : "56px",
            opacity: headerVisible ? 1 : 0, transition: "opacity .6s ease .35s"
          }}>
            <div style={{ height: "1px", flex: 1, background: "linear-gradient(to right, rgba(255, 88, 18, 0.3), #eaeaea)" }} />
            <span style={{ display: "inline-flex", alignItems: "center", gap: "7px", fontFamily: "'DM Sans', sans-serif", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#ff5812", fontWeight: 700 }}>
              <span style={{ width: "20px", height: "1.5px", background: "#ff5812", display: "inline-block" }} />
              5-Step Process
            </span>
            <div style={{ height: "1px", flex: 1, background: "linear-gradient(to left, rgba(255, 88, 18, 0.3), #eaeaea)" }} />
          </div>

          {/* ── STEP TIMELINE ── */}
          <div style={{ position: "relative" }}>
            
            {/* Vertical Connector Line (Dashed slate) */}
            {!isMobile && (
              <div
                style={{
                  position: "absolute",
                  left: "28px",
                  top: "28px",
                  bottom: "28px",
                  width: "2px",
                  background: "repeating-linear-gradient(to bottom, transparent, transparent 4px, #e2e8f0 4px, #e2e8f0 8px)",
                  zIndex: 1,
                }}
              />
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? "24px" : "32px" }}>
              {steps.map((step, i) => {
                const isActive = activeStep === i;
                return (
                  <div
                    key={i}
                    ref={(el) => { stepRefs.current[i] = el; }}
                    style={{
                      position: "relative",
                      display: "flex",
                      flexDirection: isMobile ? "column" : "row",
                      alignItems: isMobile ? "stretch" : "start",
                      gap: isMobile ? "12px" : "32px",
                      opacity: visibleSteps[i] ? 1 : 0,
                      transform: visibleSteps[i] ? "none" : isMobile ? "translateY(16px)" : "translateX(-24px)",
                      transition: "opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)",
                      cursor: "default",
                    }}
                    onMouseEnter={() => setActiveStep(i)}
                    onMouseLeave={() => setActiveStep(null)}
                  >
                    
                    {/* Step Bubble */}
                    <div
                      style={{
                        position: "relative",
                        zIndex: 10,
                        flexShrink: 0,
                        width: "56px",
                        height: "56px",
                        borderRadius: "50%",
                        border: "2px solid #000000",
                        background: isActive ? "#ff5812" : "#ffffff",
                        color: isActive ? "#ffffff" : "#000000",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: isActive ? "0 0 0 6px rgba(255, 88, 18, 0.15)" : "none",
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "14px",
                        fontWeight: 700,
                        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                    >
                      {step.number}
                    </div>

                    {/* Step Card */}
                    <div
                      style={{
                        flex: 1,
                        background: isActive ? "#fff8f4" : "#ffffff",
                        border: "2px solid #000000",
                        borderRadius: "20px",
                        padding: "20px 28px",
                        position: "relative",
                        overflow: "hidden",
                        boxShadow: isActive ? "6px 6px 0px #ff5812" : "2px 2px 0px #000000",
                        transform: isActive ? "translate(-4px, -4px)" : "none",
                        transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                        zIndex: 2,
                      }}
                    >
                      {/* Active Corner Tag Accent */}
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          width: "36px",
                          height: "36px",
                          background: isActive ? "#ff5812" : "#000000",
                          clipPath: "polygon(100% 0, 0 0, 100% 100%)",
                          opacity: isActive ? 1 : 0.08,
                          transition: "all 0.3s ease",
                        }}
                      />

                      {/* Content Area */}
                      <div style={{ position: "relative", zIndex: 2, paddingRight: isMobile ? "0px" : "80px" }}>
                        
                        {/* Animated Icon */}
                        <div
                          style={{
                            marginBottom: "14px",
                            color: isActive ? "#ff5812" : "#000000",
                            transition: "color 0.3s ease",
                          }}
                        >
                          {step.icon}
                        </div>

                        {/* Step Title */}
                        <h3
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "clamp(16px, 2vw, 20px)",
                            fontWeight: 700,
                            textTransform: "uppercase",
                            lineHeight: 1.15,
                            color: "#000000",
                            margin: "0 0 10px",
                            whiteSpace: "pre-line",
                            letterSpacing: "-0.01em",
                          }}
                        >
                          {step.title}
                        </h3>

                        {/* Description */}
                        <p
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "14px",
                            fontWeight: 400,
                            color: "#475569",
                            lineHeight: 1.6,
                            margin: 0,
                            maxWidth: "520px",
                          }}
                        >
                          {step.description}
                        </p>
                      </div>

                      {/* Large Watermark Number (Positioned absolutely inside background) */}
                      <div
                        style={{
                          position: "absolute",
                          bottom: "8px",
                          right: "24px",
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "clamp(3rem, 5vw, 4.5rem)",
                          fontWeight: 700,
                          lineHeight: 1,
                          color: isActive ? "#ff5812" : "#000000",
                          opacity: isActive ? 0.08 : 0.025,
                          letterSpacing: "-0.05em",
                          userSelect: "none",
                          pointerEvents: "none",
                          transition: "all 0.3s ease",
                          zIndex: 1,
                        }}
                      >
                        {step.number}
                      </div>

                    </div>
                    
                  </div>
                );
              })}
            </div>

          </div>

          {/* ── CLOSING BAR (MATCHING BEFORE-AFTER STYLE) ── */}
          <div
            style={{
              marginTop: isMobile ? "48px" : "72px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "24px",
              flexWrap: "wrap",
              borderTop: "2px solid #000000",
              paddingTop: "40px",
              opacity: headerVisible ? 1 : 0,
              transition: "opacity 0.7s ease 0.8s",
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "#000000",
                  margin: "0 0 6px",
                  letterSpacing: "-0.01em",
                }}
              >
                Structured Delivery Framework
              </p>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "#555555",
                  margin: 0,
                  lineHeight: 1.6,
                }}
              >
                Every step is managed, double-validated, and delivered to ensure 100% cloud compliance with zero disruption.
              </p>
            </div>

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {[
                { v: "5", l: "Phases" },
                { v: "Zero", l: "Risk gaps" },
                { v: "100%", l: "Assurance" },
              ].map((p) => (
                <div
                  key={p.l}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "14px 20px",
                    borderTop: "2px solid #000000",
                    minWidth: "80px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "22px",
                      fontWeight: 700,
                      color: "#ff5812",
                      lineHeight: 1,
                    }}
                  >
                    {p.v}
                  </span>
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "9px",
                      fontWeight: 700,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "#000000",
                      marginTop: "4px",
                    }}
                  >
                    {p.l}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}