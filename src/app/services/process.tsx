"use client";

import { useEffect } from "react";

const steps = [
  {
    id: "01",
    title: "Discovery & Planning",
    desc: "We align on goals, user needs, and requirements — then define a clear roadmap.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="1" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    id: "02",
    title: "UX & Interface Design",
    desc: "Intuitive wireframes and polished interfaces that balance usability and brand.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
        <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
        <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
        <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
      </svg>
    ),
  },
  {
    id: "03",
    title: "Engineering & Development",
    desc: "Scalable, secure solutions built with modern tech and continuous integration.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    id: "04",
    title: "Testing & QA",
    desc: "Rigorous testing across devices to ensure performance, security, and reliability.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="1" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    id: "05",
    title: "Launch & Continuous Improvement",
    desc: "Deploy with confidence and evolve with ongoing support and optimizations.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      </svg>
    ),
  },
];

export default function ProcessTimeline() {
  useEffect(() => {
    const styleId = "pt-keyframes";
    if (document.getElementById(styleId)) return;
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400&family=DM+Sans:wght@300;400;500&display=swap');
      @keyframes ptUp {
        from { opacity: 0; transform: translateY(14px); }
        to   { opacity: 1; transform: translateY(0); }
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <section
      style={{
        fontFamily: "'DM Sans', sans-serif",
        background: "#09090f",
        padding: "72px 40px 80px",
        position: "relative",
        overflow: "hidden",
        width: "7xl"
      }}
    >
      {/* Background grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)",
          backgroundSize: "52px 52px",
          pointerEvents: "none",
        }}
      />

      {/* Glows */}
      <div
        style={{
          position: "absolute",
          top: "-120px",
          left: "-60px",
          width: "420px",
          height: "420px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-80px",
          right: "-40px",
          width: "350px",
          height: "350px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(249,115,22,0.05) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

    <div
  style={{
    maxWidth: "80rem",
    margin: "0 auto",
    position: "relative",
    zIndex: 1,
  }}
>
        {/* Section label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "36px",
            animation: "ptUp 0.5s 0.05s both",
          }}
        >
          <div style={{ width: "26px", height: "1px", background: "#f97316", opacity: 0.7 }} />
          <span
            style={{
              fontSize: "10.5px",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#f97316",
            }}
          >
            How we work
          </span>
        </div>

        {/* Heading */}
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(30px, 4vw, 48px)",
            fontWeight: 900,
            color: "#f0f0f4",
            lineHeight: 1.1,
            margin: "0 0 64px",
            maxWidth: "620px",
            animation: "ptUp 0.6s 0.1s both",
          }}
        >
          Deliver{" "}
          <em style={{ fontStyle: "italic", fontWeight: 400, color: "#888899" }}>
            exceptional
          </em>{" "}
          quality
          <br />
          that{" "}
          <span style={{ color: "#f97316" }}>continuously improves</span>
        </h2>

        {/* Steps grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: 0,
          }}
        >
          {steps.map((step, idx) => (
            <StepCard key={step.id} step={step} idx={idx} isLast={idx === steps.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Step card ─────────────────────────────────────────────────────────────────

interface Step {
  id: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
}

function StepCard({
  step,
  idx,
  isLast,
}: {
  step: Step;
  idx: number;
  isLast: boolean;
}) {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        padding: "0 12px",
        animation: `ptUp 0.55s ${0.15 + idx * 0.09}s both`,
      }}
      className="pt-step-card"
    >
      {/* Top row: number + ring + connector */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", position: "relative" }}>
        {/* Dashed connector line */}
        {!isLast && (
          <>
            <svg
              style={{
                position: "absolute",
                top: "46px",
                left: "calc(50% + 36px)",
                width: "calc(100% - 72px)",
                height: "9px",
                overflow: "visible",
                pointerEvents: "none",
              }}
              viewBox="0 0 100 4"
              preserveAspectRatio="none"
            >
              <defs>
                <marker id={`arrow-${idx}`} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <path d="M0,0 L6,3 L0,6 Z" fill="rgba(249,115,22,0.4)" />
                </marker>
              </defs>
              <line
                x1="0"
                y1="2"
                x2="95"
                y2="2"
                stroke="rgba(249,115,22,0.35)"
                strokeWidth="1.5"
                strokeDasharray="6 5"
                strokeLinecap="round"
                markerEnd={`url(#arrow-${idx})`}
              />
            </svg>
          </>
        )}

        {/* Number */}
        <span
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "11px",
            fontWeight: 700,
            color: "#f97316",
            marginBottom: "10px",
            letterSpacing: "0.06em",
          }}
        >
          {step.id}
        </span>

        {/* Icon ring */}
        <RingIcon>{step.icon}</RingIcon>
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "14px",
          fontWeight: 700,
          color: "#c8c8d8",
          lineHeight: 1.3,
          margin: "18px 0 10px",
        }}
      >
        {step.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontSize: "12px",
          fontWeight: 300,
          color: "#555566",
          lineHeight: 1.65,
          margin: 0,
        }}
      >
        {step.desc}
      </p>
    </div>
  );
}

function RingIcon({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        width: "72px",
        height: "72px",
        borderRadius: "50%",
        border: "0.5px solid rgba(249,115,22,0.25)",
        background: "rgba(249,115,22,0.06)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: "44px",
          height: "44px",
          borderRadius: "50%",
          background: "rgba(249,115,22,0.1)",
          border: "0.5px solid rgba(249,115,22,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#f97316",
        }}
      >
        {children}
      </div>
    </div>
  );
}