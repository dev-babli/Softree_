"use client"
import { useState } from "react";
import Link from "next/link";

export default function CTASection() {
  const [hoveredPrimary, setHoveredPrimary] = useState(false);
  const [hoveredSecondary, setHoveredSecondary] = useState(false);

  return (
    <div style={{
      background: "linear-gradient(to bottom, #fafafa, #ffffff, #fafafa)",
      padding: "80px 40px 96px",
      position: "relative",
      overflow: "hidden",
    }}>

      {/* Background glows */}
      <div style={{
        position: "absolute", top: "-20%", left: "50%", transform: "translateX(-50%)",
        width: 700, height: 500, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(232,98,26,0.06) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "-10%", right: "-5%",
        width: 320, height: 320, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(232,98,26,0.04) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 960, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Top rule */}
        <div style={{
          display: "flex", alignItems: "center", gap: 16, marginBottom: 64,
        }}>
          <div style={{ flex: 1, height: 1, background: "#e8e4e0" }} />
          <div style={{
            fontSize: 9.5, fontWeight: 500,
            letterSpacing: "0.18em", textTransform: "uppercase", color: "#e8621a",
          }}>Get Started</div>
          <div style={{ flex: 1, height: 1, background: "#e8e4e0" }} />
        </div>

        {/* Main content — two-col layout */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          alignItems: "center", gap: 64,
        }}>

          {/* Left: heading + subtext */}
          <div>
            <h2 style={{
              fontSize: "clamp(30px, 4.5vw, 48px)",
              fontWeight: 800, color: "#0e0c0a",
              letterSpacing: "-0.04em", lineHeight: 1.05,
              margin: "0 0 20px",
            }}>
              Ready to Modernize{" "}
              <span style={{
                WebkitTextStroke: "1.8px #0e0c0a",
                WebkitTextFillColor: "transparent",
                color: "transparent",
              }}>Your QA</span>{" "}
              Process?
            </h2>

            <p style={{
              fontSize: 14, color: "#7a736c", lineHeight: 1.75,
              margin: "0 0 0", maxWidth: 380,
            }}>
              Partner with Softree to build scalable AI-powered automation testing solutions that accelerate delivery and improve software quality.
            </p>
          </div>

          {/* Right: buttons + footnote */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>

            <Link
              href="/contact"
              onMouseEnter={() => setHoveredPrimary(true)}
              onMouseLeave={() => setHoveredPrimary(false)}
              style={{
                width: "100%", padding: "15px 28px",
                background: hoveredPrimary
                  ? "linear-gradient(135deg, #d4571a, #b84810)"
                  : "linear-gradient(135deg, #e8621a, #c7500f)",
                border: "none", borderRadius: 11,
                fontSize: 14,
                fontWeight: 700, color: "#fff", letterSpacing: "-0.01em",
                cursor: "pointer", textDecoration: "none",
                boxShadow: hoveredPrimary
                  ? "0 10px 32px rgba(232,98,26,0.45)"
                  : "0 4px 20px rgba(232,98,26,0.3)",
                transform: hoveredPrimary ? "translateY(-1px)" : "translateY(0)",
                transition: "all 0.2s ease",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
              </svg>
              Talk to QA Experts
            </Link>

            <Link
              href="/contact"
              onMouseEnter={() => setHoveredSecondary(true)}
              onMouseLeave={() => setHoveredSecondary(false)}
              style={{
                width: "100%", padding: "15px 28px",
                background: hoveredSecondary ? "rgba(232,98,26,0.05)" : "#ffffff",
                border: `1px solid ${hoveredSecondary ? "rgba(232,98,26,0.45)" : "#e8e4e0"}`,
                borderRadius: 11,
                fontSize: 14,
                fontWeight: 700, color: hoveredSecondary ? "#e8621a" : "#2a2724",
                letterSpacing: "-0.01em", cursor: "pointer", textDecoration: "none",
                boxShadow: hoveredSecondary ? "0 4px 16px rgba(232,98,26,0.07)" : "none",
                transform: hoveredSecondary ? "translateY(-1px)" : "translateY(0)",
                transition: "all 0.2s ease",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="13 17 18 12 13 7"/><polyline points="6 17 11 12 6 7"/>
              </svg>
              Start Automation Journey
            </Link>

            {/* Trust note */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              gap: 16, marginTop: 8,
            }}>
              {["No commitment required", "Free readiness assessment", "Expert onboarding"].map((t, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 5,
                  fontSize: 11.5, color: "#a09890",
                }}>
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="#e8621a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {t}
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Bottom rule */}
        <div style={{ height: 1, background: "#e8e4e0", marginTop: 64 }} />

      </div>
    </div>
  );
}