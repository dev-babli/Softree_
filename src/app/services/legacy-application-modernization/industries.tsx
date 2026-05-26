"use client";

import { useState, useEffect } from "react";

const industries = [
  {
    id: "01",
    name: "Manufacturing",
    short: "MFG",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" style={{ width: "100%", height: "100%" }}>
        <rect x="6" y="28" width="8" height="14" stroke="currentColor" strokeWidth="2.5" />
        <rect x="20" y="20" width="8" height="22" stroke="currentColor" strokeWidth="2.5" />
        <rect x="34" y="14" width="8" height="28" stroke="currentColor" strokeWidth="2.5" />
        <path d="M4 42h40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M6 28l8-10 8 4 8-10 8-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3" />
      </svg>
    ),
    tag: "Industrial IoT · ERP · Supply Chain",
  },
  {
    id: "02",
    name: "Healthcare",
    short: "MED",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" style={{ width: "100%", height: "100%" }}>
        <rect x="6" y="10" width="36" height="30" rx="3" stroke="currentColor" strokeWidth="2.5" />
        <path d="M24 18v12M18 24h12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M14 10V7M34 10V7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
    tag: "EHR · Compliance · Telemedicine",
  },
  {
    id: "03",
    name: "Logistics",
    short: "LOG",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" style={{ width: "100%", height: "100%" }}>
        <path d="M4 32h28V14H4zM32 20h8l4 6v6h-12V20z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        <circle cx="12" cy="36" r="4" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="36" cy="36" r="4" stroke="currentColor" strokeWidth="2.5" />
        <path d="M4 22h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
      </svg>
    ),
    tag: "Fleet · WMS · Last-Mile",
  },
  {
    id: "04",
    name: "Education",
    short: "EDU",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" style={{ width: "100%", height: "100%" }}>
        <path d="M24 8L44 18l-20 10L4 18z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M12 23v10c0 4 12 7 12 7s12-3 12-7V23" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M44 18v10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="44" cy="30" r="2" fill="currentColor" />
      </svg>
    ),
    tag: "LMS · Analytics · EdTech",
  },
  {
    id: "05",
    name: "Government",
    short: "GOV",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" style={{ width: "100%", height: "100%" }}>
        <path d="M24 6l20 10H4z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        <rect x="8" y="18" width="6" height="18" stroke="currentColor" strokeWidth="2.5" />
        <rect x="21" y="18" width="6" height="18" stroke="currentColor" strokeWidth="2.5" />
        <rect x="34" y="18" width="6" height="18" stroke="currentColor" strokeWidth="2.5" />
        <path d="M4 38h40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
    tag: "Digital Services · FedRAMP · CX",
  },
  {
    id: "06",
    name: "Enterprise\nServices",
    short: "ENT",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" style={{ width: "100%", height: "100%" }}>
        <rect x="6" y="8" width="36" height="32" rx="2" stroke="currentColor" strokeWidth="2.5" />
        <path d="M6 18h36" stroke="currentColor" strokeWidth="2" />
        <rect x="12" y="24" width="8" height="6" rx="1" stroke="currentColor" strokeWidth="2" />
        <rect x="28" y="24" width="8" height="6" rx="1" stroke="currentColor" strokeWidth="2" />
        <path d="M14 8V6M34 8V6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
    tag: "ERP · CRM · BPM Automation",
  },
  {
    id: "07",
    name: "Retail",
    short: "RTL",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" style={{ width: "100%", height: "100%" }}>
        <path d="M8 12h32l-4 18H12z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        <circle cx="18" cy="36" r="3" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="30" cy="36" r="3" stroke="currentColor" strokeWidth="2.5" />
        <path d="M4 12h4M16 6l-4 6M32 6l4 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    tag: "POS · Omnichannel · Inventory",
  },
  {
    id: "08",
    name: "Financial\nServices",
    short: "FIN",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" style={{ width: "100%", height: "100%" }}>
        <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="2.5" />
        <path d="M24 12v4M24 32v4" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M18 18h7a3 3 0 010 6h-2a3 3 0 010 6h8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
    tag: "Core Banking · RegTech · Payments",
  },
];

/* ─────────────────────────────────────────────
   Background Utilities
 ───────────────────────────────────────────── */
function NoiseBg() {
  return (
    <svg aria-hidden style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.03, pointerEvents: "none" }}>
      <filter id="n6s">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#n6s)" />
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

export default function IndustriesWeSupport() {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState<boolean[]>(Array(industries.length).fill(false));
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const timers = industries.map((_, i) =>
      setTimeout(() => {
        setCardsVisible((prev) => { const n = [...prev]; n[i] = true; return n; });
      }, 400 + i * 90)
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

        {/* Ambient background glows */}
        <div aria-hidden style={{ position: "absolute", top: "100px", right: "-100px", width: "360px", height: "360px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255, 88, 18, 0.04) 0%, transparent 70%)", pointerEvents: "none", zIndex: 1 }} />
        <div aria-hidden style={{ position: "absolute", bottom: "100px", left: "-100px", width: "360px", height: "360px", borderRadius: "50%", background: "radial-gradient(circle, rgba(192, 57, 43, 0.03) 0%, transparent 70%)", pointerEvents: "none", zIndex: 1 }} />

        <div style={{ position: "relative", zIndex: 2, maxWidth: "1280px", margin: "0 auto", padding: isMobile ? "60px 20px" : "100px 40px" }}>

          {/* ── HEADER ── */}
          <div style={{ marginBottom: isMobile ? "40px" : "72px" }}>
            <div style={{
              display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px",
              opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(12px)",
              transition: "opacity .6s ease, transform .6s ease",
            }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#ff5812" }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#ff5812", display: "inline-block", animation: "pulse-dot 2s ease-in-out infinite" }} />
                Section 05
              </span>
              <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, #ff5812, #eaeaea)" }} />
              <span style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#000000", fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>
                Sectors Supported
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
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateY(20px)",
              transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
            }}>
              Industries We Support Through Transition
            </h2>

            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: "15px", fontWeight: 400, color: "#555555",
              lineHeight: 1.75, maxWidth: "500px", margin: 0,
              opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(16px)",
              transition: "opacity .7s ease .25s, transform .7s ease .25s",
            }}>
              We apply proven migration blueprints across highly regulated and complex sectors, ensuring complete operational continuity and compliance.
            </p>
          </div>

          {/* ── DIVIDER STRIP ── */}
          <div style={{
            display: "flex", alignItems: "center", gap: "32px", marginBottom: isMobile ? "40px" : "56px",
            opacity: visible ? 1 : 0, transition: "opacity .6s ease .35s"
          }}>
            <div style={{ height: "1px", flex: 1, background: "linear-gradient(to right, rgba(255, 88, 18, 0.3), #eaeaea)" }} />
            <span style={{ display: "inline-flex", alignItems: "center", gap: "7px", fontFamily: "'DM Sans', sans-serif", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#ff5812", fontWeight: 700 }}>
              <span style={{ width: "20px", height: "1.5px", background: "#ff5812", display: "inline-block" }} />
              {industries.length} Sectors
            </span>
            <div style={{ height: "1px", flex: 1, background: "linear-gradient(to left, rgba(255, 88, 18, 0.3), #eaeaea)" }} />
          </div>

          {/* ── INDUSTRIES GRID ── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 260px), 1fr))",
              gap: "24px",
            }}
          >
            {industries.map((ind, i) => {
              const isActive = activeCard === i;
              return (
                <div
                  key={ind.id}
                  onMouseEnter={() => setActiveCard(i)}
                  onMouseLeave={() => setActiveCard(null)}
                  style={{
                    background: isActive ? "#fff8f4" : "#ffffff",
                    border: "2px solid #000000",
                    borderRadius: "20px",
                    padding: "32px 20px 24px 20px",
                    position: "relative",
                    overflow: "hidden",
                    boxShadow: isActive ? "6px 6px 0px #ff5812" : "2px 2px 0px #000000",
                    transform: isActive ? "translate(-4px, -4px)" : "none",
                    transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                    opacity: cardsVisible[i] ? 1 : 0,
                    minHeight: "220px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    zIndex: 2,
                  }}
                >
                  {/* Large Ghost ID top-right */}
                  <div
                    style={{
                      position: "absolute",
                      top: "16px",
                      right: "20px",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "12px",
                      fontWeight: 700,
                      color: isActive ? "#ff5812" : "#000000",
                      opacity: isActive ? 1.0 : 0.25,
                      letterSpacing: "0.05em",
                      transition: "all 0.3s ease",
                      userSelect: "none",
                      pointerEvents: "none",
                    }}
                  >
                    {ind.id}
                  </div>

                  {/* Icon */}
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      color: isActive ? "#ff5812" : "#000000",
                      transition: "color 0.3s ease",
                      marginBottom: "20px",
                    }}
                  >
                    {ind.icon}
                  </div>

                  {/* Name and Tags */}
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                    <h3
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "clamp(15px, 1.8vw, 19px)",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        lineHeight: 1.15,
                        color: "#000000",
                        margin: "0 0 10px",
                        whiteSpace: "pre-line",
                        letterSpacing: "-0.01em",
                        overflowWrap: "break-word",
                        wordBreak: "break-word",
                      }}
                    >
                      {ind.name}
                    </h3>

                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "11px",
                        fontWeight: 500,
                        color: isActive ? "#ff5812" : "#64748b",
                        letterSpacing: "0.02em",
                        transition: "color 0.3s ease",
                        margin: 0,
                        lineHeight: 1.5,
                      }}
                    >
                      {ind.tag}
                    </p>
                  </div>

                  {/* Bottom Accent line */}
                  <div
                    style={{
                      height: "2px",
                      marginTop: "20px",
                      background: isActive ? "#ff5812" : "#eaeaea",
                      width: isActive ? "100%" : "32px",
                      transition: "all 0.3s ease",
                      borderRadius: "1px",
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* ── FOOTER BAR (MATCHING BEFORE-AFTER STYLE) ── */}
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
              opacity: visible ? 1 : 0,
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
                Deep Domain Capability
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
                Our solutions are tailor-configured for the security mandates, database loads, and performance metrics unique to each sector.
              </p>
            </div>

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {[
                { v: "8", l: "Industries" },
                { v: "100%", l: "Compliance" },
                { v: "Security", l: "Enforced" },
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