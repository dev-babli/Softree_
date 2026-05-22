"use client"
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

/* ─── DATA ─────────────────────────────────────────── */
const models = [
  {
    num: "01",
    tag: "Long-term Partnership",
    title: "Dedicated QA Automation Team",
    desc: "A fully embedded pod of QA engineers that scales with your delivery rhythm — built for sustained, long-term growth.",
    accent: "#e8621a",
    features: ["Dedicated pod of QA engineers", "Scalable team on demand", "Continuous delivery support", "Embedded in your workflow"],
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
  },
  {
    num: "02",
    tag: "Fixed Scope",
    title: "Project-Based Automation",
    desc: "Defined scope, clear milestones. Ideal for specific applications or time-boxed transformation initiatives.",
    accent: "#c7500f",
    features: ["Clear milestones & deliverables", "App-specific automation suites", "Transformation readiness", "Rapid time-to-value"],
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
      </svg>
    ),
  },
  {
    num: "03",
    tag: "Strategic Advisory",
    title: "QA Transformation Consulting",
    desc: "Modernise legacy QA practices from the ground up — strategy, tooling, and team capability in one engagement.",
    accent: "#b04500",
    features: ["Legacy QA audit & roadmap", "Tool & framework selection", "Process modernisation", "Team upskilling programs"],
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.07 4.93a10 10 0 010 14.14"/><path d="M4.93 4.93a10 10 0 000 14.14"/>
        <path d="M15.54 8.46a5 5 0 010 7.07"/><path d="M8.46 8.46a5 5 0 000 7.07"/>
      </svg>
    ),
  },
];

const impacts: { icon: React.ReactNode; label: string; pct: number; display: string }[] = [
  { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e8621a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2"/><path d="M5 3L2 6"/><path d="M22 6l-3-3"/><path d="M12 5V3"/></svg>, label: "Reduce regression testing time", pct: 70, display: "70%" },
  { icon: "🚀", label: "Improve release confidence", pct: 95, display: "95%" },
  { icon: "✅", label: "Increase software quality", pct: 85, display: "85%" },
  { icon: "⚡", label: "Accelerate product delivery", pct: 60, display: "60%" },
  { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e8621a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, label: "Minimize production defects", pct: 80, display: "80%" },
  { icon: "📈", label: "Scale testing operations", pct: 90, display: "3×" },
];

/* ─── HOOK ──────────────────────────────────────────── */
function useInView(ref: React.RefObject<Element>, threshold = 0.12) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return visible;
}

/* ─── MODEL ROW ─────────────────────────────────────── */
function ModelRow({ model, index }: { model: typeof models[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref as React.RefObject<Element>);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="model-row-grid"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.6s ease ${index * 0.12}s, transform 0.6s cubic-bezier(.16,1,.3,1) ${index * 0.12}s`,
        background: hovered ? "#fafafa" : "transparent",
      }}
    >
      {/* Number col */}
      <div className="model-row-num-col">
        <span style={{
          fontSize: 11, fontWeight: 500,
          color: model.accent, letterSpacing: "0.08em", opacity: 0.9,
        }}>{model.num}</span>
      </div>

      {/* Left: title + desc */}
      <div className="model-row-left-col">
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          background: `${model.accent}10`,
          border: `1px solid ${model.accent}22`,
          borderRadius: 6, padding: "3px 10px", marginBottom: 14,
        }}>
          <span style={{ color: model.accent }}>{model.icon}</span>
          <span style={{
            fontSize: 9.5,
            fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase",
            color: model.accent,
          }}>{model.tag}</span>
        </div>

        <h3 style={{
          fontSize: 22, fontWeight: 700,
          color: "#0e0c0a", letterSpacing: "-0.035em", lineHeight: 1.2, marginBottom: 12,
        }}>{model.title}</h3>

        <p style={{ fontSize: 13.5, color: "#6b6560", lineHeight: 1.7, maxWidth: 340 }}>{model.desc}</p>
      </div>

      {/* Divider */}
      <div className="model-row-divider" />

      {/* Right: features */}
      <div className="model-row-right-col">
        {model.features.map((f, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: "9px 0",
            borderBottom: i < model.features.length - 1 ? "1px solid #f0f0f0" : "none",
          }}>
            <div style={{
              width: 20, height: 20, borderRadius: 6,
              background: `${model.accent}12`,
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                <path d="M2 6l3 3 5-5" stroke={model.accent} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span style={{ fontSize: 13, color: "#3d3a37", fontWeight: 400 }}>{f}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── IMPACT ROW ─────────────────────────────────────── */
function ImpactRow({ item, index }: { item: typeof impacts[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref as React.RefObject<Element>);
  const [barW, setBarW] = useState(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (visible) setTimeout(() => setBarW(item.pct), 300 + index * 90);
  }, [visible]);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="impact-row-grid"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-16px)",
        transition: `opacity 0.5s ease ${index * 0.08}s, transform 0.5s ease ${index * 0.08}s`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <span style={{
          fontSize: 18, width: 36, height: 36,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: hovered ? "#fff4ed" : "#fafafa",
          borderRadius: 9, border: "1px solid #f0ede8",
          transition: "background 0.2s ease", flexShrink: 0,
        }}>{item.icon}</span>
        <span style={{ fontSize: 14, color: "#2a2724", fontWeight: 500, letterSpacing: "-0.01em" }}>
          {item.label}
        </span>
      </div>

      <div className="impact-bar-container" style={{ height: 3, background: "#efefef", borderRadius: 2, overflow: "hidden" }}>
        <div style={{
          height: "100%", width: `${barW}%`,
          background: "linear-gradient(90deg, #e8621a, #f59542)",
          borderRadius: 2, transition: "width 1s cubic-bezier(.16,1,.3,1)",
          boxShadow: barW > 0 ? "0 0 8px rgba(232,98,26,0.3)" : "none",
        }} />
      </div>

      <span style={{
        fontSize: 14, fontWeight: 500,
        color: "#e8621a", textAlign: "right", letterSpacing: "-0.02em",
      }}>{item.display}</span>
    </div>
  );
}

/* ─── MAIN ──────────────────────────────────────────── */
export default function EngagementModels() {
  const s1Ref = useRef<HTMLDivElement>(null);
  const s1Visible = useInView(s1Ref as React.RefObject<Element>, 0.05);
  const s2Ref = useRef<HTMLDivElement>(null);
  const s2Visible = useInView(s2Ref as React.RefObject<Element>, 0.05);

  return (
    <div style={{
      background: "linear-gradient(to bottom, #fafafa, #ffffff, #fafafa)",
      minHeight: "100vh",
    }}>
      <style>{`
        .models-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 80px 32px 100px;
        }
        .models-header-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: flex-end;
          margin-bottom: 48px;
          border-bottom: 2px solid #0e0c0a;
          padding-bottom: 20px;
          gap: 32px;
        }
        .models-header-p {
          font-size: 13px;
          color: #8a837c;
          line-height: 1.7;
          max-width: 360px;
          text-align: right;
          margin-left: auto;
        }
        .models-labels-grid {
          display: grid;
          grid-template-columns: 80px 1fr 1px 1fr;
          padding-bottom: 10px;
        }
        .model-row-grid {
          display: grid;
          grid-template-columns: 80px 1fr 1px 1fr;
          gap: 0;
          border-bottom: 1px solid #ebebeb;
          cursor: default;
        }
        .model-row-num-col {
          padding: 40px 0 36px 0;
          display: flex;
          align-items: flex-start;
        }
        .model-row-left-col {
          padding: 36px 40px 36px 16px;
        }
        .model-row-divider {
          background: #ebebeb;
          margin: 28px 0;
        }
        .model-row-right-col {
          padding: 36px 0 36px 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .impact-header-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: flex-end;
          margin-bottom: 48px;
          border-bottom: 2px solid #0e0c0a;
          padding-bottom: 20px;
          gap: 32px;
        }
        .impact-header-p {
          font-size: 13px;
          color: #8a837c;
          line-height: 1.7;
          max-width: 360px;
          text-align: right;
          margin-left: auto;
        }
        .impact-labels-grid {
          display: grid;
          grid-template-columns: 1fr 200px 52px;
          gap: 24px;
          padding-bottom: 10px;
        }
        .impact-row-grid {
          display: grid;
          grid-template-columns: 1fr 200px 52px;
          align-items: center;
          gap: 24px;
          padding: 20px 0;
          border-bottom: 1px solid #ebebeb;
          cursor: default;
        }

        .models-cta-grid {
          margin-top: 72px;
          display: grid;
          grid-template-columns: 1fr auto;
          align-items: center;
          gap: 32px;
          padding: 36px 40px;
          background: #0e0c0a;
          border-radius: 16px;
          position: relative;
          overflow: hidden;
        }

        @media (max-width: 991px) {
          .models-inner {
            padding: 56px 20px 80px;
          }
          .model-row-grid {
            grid-template-columns: 1fr;
            padding: 16px 0;
          }
          .model-row-num-col {
            padding: 12px 0 4px 0;
          }
          .model-row-left-col {
            padding: 12px 0;
          }
          .model-row-right-col {
            padding: 16px 0;
          }
          .model-row-divider {
            display: none !important;
          }
          .models-labels-grid {
            display: none !important;
          }
        }

        @media (max-width: 768px) {
          .models-header-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .models-header-grid p {
            text-align: left !important;
          }
          .models-header-p {
            text-align: left !important;
            max-width: 100% !important;
            margin-left: 0 !important;
          }
          .impact-header-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .impact-header-grid p {
            text-align: left !important;
          }
          .impact-header-p {
            text-align: left !important;
            max-width: 100% !important;
            margin-left: 0 !important;
          }
          .impact-labels-grid {
            display: none !important;
          }
          .impact-row-grid {
            grid-template-columns: 1fr auto;
            gap: 12px;
            padding: 16px 0;
          }
          .impact-bar-container {
            grid-column: span 2;
            margin: 4px 0 8px 0;
            width: 100%;
          }
          .models-cta-grid {
            grid-template-columns: 1fr;
            gap: 24px;
            padding: 32px 24px;
          }
          .models-cta-grid a {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>

      <div className="models-inner">

        {/* ══ SECTION 1: ENGAGEMENT MODELS ══ */}
        <div ref={s1Ref}>
          <div className="models-header-grid" style={{
            opacity: s1Visible ? 1 : 0,
            transform: s1Visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}>
            <div>
              <div style={{
                fontSize: 10.5,
                fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase",
                color: "#e8621a", marginBottom: 10,
              }}>How We Work</div>
              <h2 style={{
                fontSize: "clamp(32px, 5vw, 52px)",
                fontWeight: 800, color: "#0e0c0a",
                letterSpacing: "-0.04em", lineHeight: 1,
              }}>
                Engagement{" "}
                <span style={{
                  WebkitTextStroke: "1.5px #0e0c0a",
                  WebkitTextFillColor: "transparent",
                  color: "transparent",
                }}>Models</span>
              </h2>
            </div>
            <p className="models-header-p">
              Pick the engagement that fits your team and transformation goals.
            </p>
          </div>

          {/* Column labels */}
          <div className="models-labels-grid" style={{
            opacity: s1Visible ? 1 : 0,
            transition: "opacity 0.6s ease 0.1s",
          }}>
            <div />
            <div style={{ paddingLeft: 16, fontSize: 9.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "#b0a9a2" }}>Overview</div>
            <div />
            <div style={{ paddingLeft: 40, fontSize: 9.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "#b0a9a2" }}>Deliverables</div>
          </div>

          <div style={{ borderTop: "1px solid #ebebeb" }}>
            {models.map((m, i) => <ModelRow key={i} model={m} index={i} />)}
          </div>
        </div>

        {/* ── DIVIDER ── */}
        <div style={{ margin: "72px 0", display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ flex: 1, height: 1, background: "#ebebeb" }} />
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#e8621a", boxShadow: "0 0 0 3px rgba(232,98,26,0.15)" }} />
          <div style={{ flex: 1, height: 1, background: "#ebebeb" }} />
        </div>

        {/* ══ SECTION 2: BUSINESS IMPACT ══ */}
        <div ref={s2Ref}>
          <div className="impact-header-grid" style={{
            opacity: s2Visible ? 1 : 0,
            transform: s2Visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}>
            <div>
              <div style={{
                fontSize: 10.5,
                fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase",
                color: "#e8621a", marginBottom: 10,
              }}>Results That Matter</div>
              <h2 style={{
                fontSize: "clamp(32px, 5vw, 52px)",
                fontWeight: 800, color: "#0e0c0a",
                letterSpacing: "-0.04em", lineHeight: 1,
              }}>
                Business{" "}
                <span style={{
                  WebkitTextStroke: "1.5px #0e0c0a",
                  WebkitTextFillColor: "transparent",
                  color: "transparent",
                }}>Impact</span>
              </h2>
            </div>
            <p className="impact-header-p">
              Measurable outcomes across every delivery metric — from release confidence to operational scale.
            </p>
          </div>

          {/* Column labels */}
          <div className="impact-labels-grid" style={{
            opacity: s2Visible ? 1 : 0,
            transition: "opacity 0.6s ease 0.1s",
          }}>
            <div style={{ fontSize: 9.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "#b0a9a2" }}>Metric</div>
            <div style={{ fontSize: 9.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "#b0a9a2" }}>Improvement</div>
            <div style={{ fontSize: 9.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "#b0a9a2", textAlign: "right" }}>Gain</div>
          </div>

          <div style={{ borderTop: "1px solid #ebebeb" }}>
            {impacts.map((item, i) => <ImpactRow key={i} item={item} index={i} />)}
          </div>
        </div>

        {/* ══ CTA ══ */}
        <div className="models-cta-grid">
          <div style={{
            position: "absolute", top: "-50%", right: "-5%",
            width: 300, height: 300, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(232,98,26,0.18) 0%, transparent 65%)",
            pointerEvents: "none",
          }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{
              fontSize: 9.5,
              letterSpacing: "0.15em", textTransform: "uppercase",
              color: "rgba(232,98,26,0.8)", marginBottom: 10,
            }}>Free Assessment</div>
            <div style={{
              fontSize: 22,
              fontWeight: 700, color: "#f5f3f0",
              letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: 6,
            }}>Ready to transform your QA operations?</div>
            <div style={{ fontSize: 13, color: "rgba(245,243,240,0.4)", lineHeight: 1.6 }}>
              Talk to our experts and get a free automation readiness assessment.
            </div>
          </div>
          <Link
            href="/contact"
            style={{
              position: "relative", zIndex: 1,
              padding: "13px 28px", borderRadius: 10,
              background: "linear-gradient(135deg, #e8621a, #c7500f)",
              border: "none", cursor: "pointer",
              fontSize: 13.5, fontWeight: 600, color: "#fff",
              letterSpacing: "-0.01em", textDecoration: "none",
              boxShadow: "0 4px 20px rgba(232,98,26,0.4)",
              whiteSpace: "nowrap", flexShrink: 0,
              transition: "box-shadow 0.2s, transform 0.15s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 32px rgba(232,98,26,0.55)";
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 20px rgba(232,98,26,0.4)";
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
            }}
          >
            Get Started →
          </Link>
        </div>

      </div>
    </div>
  );
}