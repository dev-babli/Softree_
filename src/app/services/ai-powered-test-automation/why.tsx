"use client";
import { useState } from "react";

const pillars = [
  {
    num: "01",
    title: "Enterprise Engineering Expertise",
    desc: "Deep technical capability built across large-scale, complex software environments — so your teams ship with confidence.",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "AI-Driven Automation Strategy",
    desc: "Intelligent frameworks that go beyond scripts — adaptive, self-healing automation built for modern delivery pipelines.",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M9 9h.01M15 9h.01M9 15h6" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Modern DevOps Practices",
    desc: "CI/CD-first, shift-left testing, and seamless pipeline integration that accelerates every release cycle.",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10" />
        <path d="M22 12c0-2.76-1.12-5.26-2.93-7.07" />
        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

const stats = [
  {
    num: "3×",
    label: "Faster testing operations through scalable automation frameworks",
  },
  {
    num: "95%",
    label:
      "Release confidence improvement across quality engineering engagements",
  },
];

function Pillar({
  pillar,
  index,
}: {
  pillar: (typeof pillars)[0];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const isLast = index === pillars.length - 1;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="why-pillar"
      style={{
        flex: 1,
        padding: "32px 28px 28px",
        background: hovered ? "#fdf9f7" : "#ffffff",
        position: "relative",
        borderRight: isLast ? "none" : "1px solid #e8e4e0",
        transition: "background 0.2s ease",
        cursor: "default",
      }}
    >
      {/* Top hover bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: "linear-gradient(90deg, #e8621a, #f59542)",
          transformOrigin: "left",
          transform: hovered ? "scaleX(1)" : "scaleX(0)",
          transition: "transform 0.35s ease",
        }}
      />

      <div
        style={{
          fontSize: 10,
          fontWeight: 500,
          letterSpacing: "0.1em",
          color: "#e8621a",
          opacity: 0.8,
          marginBottom: 18,
        }}
      >
        {pillar.num}
      </div>

      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          background: "rgba(232,98,26,0.08)",
          border: "1px solid rgba(232,98,26,0.16)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#e8621a",
          marginBottom: 18,
        }}
      >
        {pillar.icon}
      </div>

      <div
        style={{
          fontSize: 15.5,
          fontWeight: 700,
          color: "#0e0c0a",
          letterSpacing: "-0.025em",
          lineHeight: 1.25,
          marginBottom: 10,
        }}
      >
        {pillar.title}
      </div>

      <div style={{ fontSize: 13, color: "#7a736c", lineHeight: 1.7 }}>
        {pillar.desc}
      </div>
    </div>
  );
}

function StatCard({ stat }: { stat: (typeof stats)[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="why-stat-card"
      style={{
        flex: 1,
        background: "#ffffff",
        border: `1px solid ${hovered ? "rgba(232,98,26,0.35)" : "#e8e4e0"}`,
        borderRadius: 12,
        padding: "24px 26px",
        display: "flex",
        alignItems: "center",
        gap: 20,
        boxShadow: hovered ? "0 4px 20px rgba(232,98,26,0.07)" : "none",
        transition: "border-color 0.2s ease, box-shadow 0.2s ease",
        cursor: "default",
      }}
    >
      <div
        style={{
          fontSize: 40,
          fontWeight: 800,
          color: "#e8621a",
          letterSpacing: "-0.05em",
          lineHeight: 1,
          flexShrink: 0,
        }}
      >
        {stat.num}
      </div>
      <div style={{ fontSize: 13, color: "#4a4540", lineHeight: 1.6 }}>
        {stat.label}
      </div>
    </div>
  );
}

export default function WhySoftree() {
  return (
    <div
      style={{
        background: "linear-gradient(to bottom, #fafafa, #ffffff, #fafafa)",
        padding: "60px 24px 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @media (max-width: 768px) {
          .why-header {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          .why-pillars-container {
            flex-direction: column !important;
          }
          .why-pillar {
            border-right: none !important;
            border-bottom: 1px solid #e8e4e0 !important;
          }
          .why-pillar:last-child {
            border-bottom: none !important;
          }
          .why-stats-container {
            flex-direction: column !important;
          }
        }
        @media (max-width: 480px) {
          .why-stat-card {
            padding: 16px !important;
            gap: 16px !important;
          }
          .why-stat-card > div:first-child {
            font-size: 32px !important;
          }
        }
      `}</style>
      {/* Background glows */}
      <div
        style={{
          position: "absolute",
          top: "-15%",
          right: "-12%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(232,98,26,0.05) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-15%",
          left: "-8%",
          width: 350,
          height: 350,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(232,98,26,0.04) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 1280,
          width: "100%",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header */}
        <div
          className="why-header"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            alignItems: "flex-end",
            gap: 32,
            marginBottom: 48,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 10.5,
                fontWeight: 500,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#e8621a",
                marginBottom: 14,
              }}
            >
              Why Choose Us
            </div>
            <h2
              style={{
                fontSize: "clamp(34px, 5.5vw, 54px)",
                fontWeight: 800,
                color: "#0e0c0a",
                letterSpacing: "-0.04em",
                lineHeight: 1,
                margin: 0,
              }}
            >
              Why{" "}
              <span
                style={{
                  WebkitTextStroke: "1.8px #0e0c0a",
                  WebkitTextFillColor: "transparent",
                  color: "transparent",
                }}
              >
                Softree
              </span>
            </h2>
          </div>
          <p
            style={{
              fontSize: 14,
              color: "#7a736c",
              lineHeight: 1.75,
              margin: 0,
            }}
          >
            Softree combines enterprise engineering expertise, AI-driven
            automation strategies, and modern DevOps practices to help
            businesses deliver reliable software at speed.
          </p>
        </div>

        {/* Three pillars — joined panel */}
        <div
          className="why-pillars-container"
          style={{
            display: "flex",
            border: "1px solid #e8e4e0",
            borderRadius: 14,
            overflow: "hidden",
            marginBottom: 16,
          }}
        >
          {pillars.map((p, i) => (
            <Pillar key={i} pillar={p} index={i} />
          ))}
        </div>

        {/* Focus line */}
        <div
          style={{
            fontSize: 13,
            color: "#a09890",
            lineHeight: 1.7,
            borderLeft: "2px solid #e8621a",
            paddingLeft: 16,
            marginBottom: 24,
            marginTop: 24,
          }}
        >
          We focus on scalable automation frameworks, intelligent quality
          engineering, and long-term technology partnerships.
        </div>

        {/* Stat cards */}
        <div className="why-stats-container" style={{ display: "flex", gap: 16 }}>
          {stats.map((s, i) => (
            <StatCard key={i} stat={s} />
          ))}
        </div>
      </div>
    </div>
  );
}
