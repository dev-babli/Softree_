"use client";
import React, { useState } from "react";

const STEPS = [
  {
    number: "01",
    title: "Apply",
    subtitle: "Submit your application",
    desc: "Fill out the application form, upload your resume, and tell us why you're a great fit. Takes less than 5 minutes.",
    duration: "Day 1",
    icon: "◎",
    details: ["Online application form", "Resume & portfolio upload", "Cover note (optional)"],
  },
  {
    number: "02",
    title: "HR Screening",
    subtitle: "Quick intro call",
    desc: "A friendly 20-minute call with our HR team to understand your background, expectations, and answer any questions you have.",
    duration: "Day 2–3",
    icon: "◉",
    details: ["20-min video call", "Culture & values fit", "Salary expectations"],
  },
  {
    number: "03",
    title: "Technical Round",
    subtitle: "Skills assessment",
    desc: "A focused technical interview or take-home task relevant to your role. We keep it practical — no trick questions, just real problems.",
    duration: "Day 5–7",
    icon: "◈",
    details: ["Role-specific assessment", "Live problem solving", "Portfolio review"],
  },
  {
    number: "04",
    title: "Final Discussion",
    subtitle: "Meet the team",
    desc: "Meet your future manager and teammates. We discuss your role, growth path, projects you'd own, and answer everything on your mind.",
    duration: "Day 8–10",
    icon: "▣",
    details: ["Meet hiring manager", "Role deep-dive", "Q&A with the team"],
  },
  {
    number: "05",
    title: "Offer Letter",
    subtitle: "Welcome aboard",
    desc: "You'll receive a detailed offer within 48 hours of your final round. Onboarding starts as soon as you're ready.",
    duration: "Day 11–12",
    icon: "◐",
    details: ["Offer within 48 hrs", "Negotiation welcome", "Fast onboarding"],
  },
];

export default function HiringProcess() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div style={s.root}>
      <style>{`
        .process-row {
          display: flex;
          gap: 20px;
          align-items: flex-start;
        }
        @media (max-width: 480px) {
          .process-row {
            gap: 12px;
          }
          .process-circle {
            width: 38px !important;
            height: 38px !important;
          }
          .process-num {
            font-size: 11px !important;
          }
          .process-card {
            padding: 12px 14px !important;
          }
        }
        .process-cta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #141414;
          border: 1px solid #222222;
          border-radius: 16px;
          padding: 24px 28px;
          gap: 20px;
          flex-wrap: wrap;
        }
        @media (max-width: 768px) {
          .process-cta {
            flex-direction: column;
            text-align: center;
            padding: 20px;
          }
        }
      `}</style>

      <div style={s.grid} />
      <div style={s.orb1} />
      <div style={s.orb2} />

      <div style={s.inner}>
        {/* Header */}
        <div style={s.header}>
          <p style={s.eyebrow}>— how it works</p>
          <h2 style={s.title}>
            Our hiring process
            <br />
            <span style={s.titleAccent}>simple & transparent.</span>
          </h2>
          <p style={s.subtitle}>
            No black holes, no ghosting. We move fast and keep you informed at every step.
          </p>
          <div style={s.dividerLine} />
        </div>

        {/* Timeline */}
        <div style={s.timeline}>
          {STEPS.map((step, i) => {
            const isActive = active === i;
            const isLast = i === STEPS.length - 1;
            return (
              <div key={i} className="process-row">
                {/* Left: number + connector */}
                <div style={s.stepLeft}>
                  <button
                    className="process-circle"
                    style={{
                      ...s.stepCircle,
                      ...(isActive ? s.stepCircleActive : {}),
                    }}
                    onClick={() => setActive(isActive ? null : i)}
                    aria-expanded={isActive}
                  >
                    <span
                      className="process-num"
                      style={{
                        ...s.stepNum,
                        ...(isActive ? s.stepNumActive : {}),
                      }}
                    >
                      {isActive ? "✓" : step.number}
                    </span>
                  </button>
                  {!isLast && (
                    <div
                      style={{
                        ...s.connector,
                        background: i < (active ?? -1) ? ORANGE : BORDER,
                      }}
                    />
                  )}
                </div>

                {/* Right: card */}
                <div
                  className="process-card"
                  style={{
                    ...s.stepCard,
                    ...(isActive ? s.stepCardActive : {}),
                    marginBottom: isLast ? 0 : 14,
                  }}
                  onClick={() => setActive(isActive ? null : i)}
                >
                  {/* Top bar */}
                  <div style={{ ...s.cardTopBar, opacity: isActive ? 1 : 0 }} />

                  <div style={s.cardHeader}>
                    <div style={s.cardLeft}>
                      <div style={{ ...s.cardIconBox, ...(isActive ? s.cardIconBoxActive : {}) }}>
                        <span style={s.cardIcon}>{step.icon}</span>
                      </div>
                      <div>
                        <div style={{ ...s.cardTitle, ...(isActive ? s.cardTitleActive : {}) }}>
                          {step.title}
                        </div>
                        <div style={s.cardSub}>{step.subtitle}</div>
                      </div>
                    </div>
                    <div style={s.cardRight}>
                      <span style={s.durationBadge}>{step.duration}</span>
                      <span
                        style={{
                          ...s.chevron,
                          transform: isActive ? "rotate(180deg)" : "rotate(0deg)",
                        }}
                      >
                        ▾
                      </span>
                    </div>
                  </div>

                  {/* Expanded content */}
                  <div
                    style={{
                      ...s.expandBody,
                      maxHeight: isActive ? 200 : 0,
                      opacity: isActive ? 1 : 0,
                      paddingTop: isActive ? 16 : 0,
                      overflow: "hidden",
                      transition:
                        "max-height 0.35s ease, opacity 0.25s ease, padding-top 0.25s ease",
                    }}
                  >
                    <div style={s.expandInner}>
                      <p style={s.expandDesc}>{step.desc}</p>
                      <div style={s.detailsList}>
                        {step.details.map((d) => (
                          <div key={d} style={s.detailItem}>
                            <span style={s.detailDot}>◎</span>
                            <span style={s.detailText}>{d}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="process-cta">
          <div style={s.ctaLeft}>
            <p style={s.ctaTitle}>Ready to start your journey?</p>
            <p style={s.ctaSub}>
              The entire process takes under 2 weeks. We'll keep you posted every step of the way.
            </p>
          </div>
          <button
            style={s.ctaBtn}
            onClick={() => {
              const element = document.getElementById("featured-openings-section") || document.querySelector("section, div[style*='cardsList']");
              element?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Apply now →
          </button>
        </div>
      </div>
    </div>
  );
}

const ORANGE = "#F97316";
const BLACK = "#080808";
const DARK2 = "#141414";
const DARK3 = "#1C1C1C";
const BORDER = "#222222";
const BORDER2 = "#2C2C2C";
const WHITE = "#FFFFFF";
const GRAY = "#888888";

const s: Record<string, React.CSSProperties> = {
  root: {
    position: "relative",
    background: BLACK,
    fontFamily: "'Outfit', 'DM Sans', sans-serif",
    overflow: "hidden",
    padding: "80px 0",
    borderTop: "1px solid #1C1C1C",
  },
  grid: {
    position: "absolute",
    inset: 0,
    backgroundImage: `linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)`,
    backgroundSize: "60px 60px",
    pointerEvents: "none",
    zIndex: 0,
  },
  orb1: {
    position: "absolute",
    top: -100,
    left: -80,
    width: 400,
    height: 400,
    borderRadius: "50%",
    background: ORANGE,
    opacity: 0.06,
    filter: "blur(90px)",
    pointerEvents: "none",
    zIndex: 0,
  },
  orb2: {
    position: "absolute",
    bottom: -60,
    right: -60,
    width: 300,
    height: 300,
    borderRadius: "50%",
    background: ORANGE,
    opacity: 0.05,
    filter: "blur(80px)",
    pointerEvents: "none",
    zIndex: 0,
  },

  inner: {
    position: "relative",
    zIndex: 2,
    maxWidth: 720,
    margin: "0 auto",
    padding: "0 32px",
    display: "flex",
    flexDirection: "column",
    gap: 52,
  },

  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    gap: 14,
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: ORANGE,
    margin: 0,
  },
  title: {
    fontFamily: "'Syne', 'Outfit', sans-serif",
    fontSize: "clamp(28px, 4vw, 46px)",
    fontWeight: 800,
    color: WHITE,
    lineHeight: 1.1,
    margin: 0,
    letterSpacing: "-0.02em",
  },
  titleAccent: { color: ORANGE },
  subtitle: {
    fontSize: 15,
    color: GRAY,
    fontWeight: 300,
    lineHeight: 1.7,
    maxWidth: 440,
    margin: 0,
  },
  dividerLine: {
    width: 48,
    height: 3,
    borderRadius: 999,
    background: ORANGE,
    marginTop: 4,
  },

  timeline: {
    display: "flex",
    flexDirection: "column",
  },

  stepLeft: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexShrink: 0,
    paddingTop: 18,
  },
  stepCircle: {
    width: 44,
    height: 44,
    borderRadius: "50%",
    background: DARK2,
    border: `1.5px solid ${BORDER2}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "background 0.2s, border-color 0.2s",
    flexShrink: 0,
    outline: "none",
  },
  stepCircleActive: {
    background: ORANGE,
    borderColor: ORANGE,
  },
  stepNum: {
    fontFamily: "'Syne', sans-serif",
    fontSize: 12,
    fontWeight: 700,
    color: GRAY,
    transition: "color 0.2s",
  },
  stepNumActive: {
    color: WHITE,
    fontSize: 16,
  },
  connector: {
    width: 2,
    flex: 1,
    minHeight: 24,
    marginTop: 6,
    borderRadius: 999,
    transition: "background 0.3s",
  },

  stepCard: {
    flex: 1,
    background: DARK2,
    border: `1px solid ${BORDER}`,
    borderRadius: 14,
    padding: "16px 18px",
    cursor: "pointer",
    transition: "border-color 0.2s, background 0.2s",
    position: "relative",
    overflow: "hidden",
  },
  stepCardActive: {
    borderColor: ORANGE,
    background: "#100D08",
  },
  cardTopBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    background: ORANGE,
    transition: "opacity 0.2s",
  },

  cardHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  cardLeft: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  cardIconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    background: DARK3,
    border: `1px solid ${BORDER2}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    transition: "background 0.2s, border-color 0.2s",
  },
  cardIconBoxActive: {
    background: "#2A1A08",
    borderColor: ORANGE,
  },
  cardIcon: {
    fontSize: 18,
    color: ORANGE,
  },
  cardTitle: {
    fontFamily: "'Syne', 'Outfit', sans-serif",
    fontSize: 15,
    fontWeight: 700,
    color: WHITE,
    margin: 0,
    transition: "color 0.2s",
  },
  cardTitleActive: {
    color: ORANGE,
  },
  cardSub: {
    fontSize: 12,
    color: GRAY,
    marginTop: 2,
  },
  cardRight: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    flexShrink: 0,
  },
  durationBadge: {
    fontSize: 11,
    fontWeight: 600,
    padding: "3px 10px",
    borderRadius: 999,
    background: "#1A1A1A",
    border: `1px solid ${BORDER2}`,
    color: GRAY,
    letterSpacing: "0.04em",
  },
  chevron: {
    fontSize: 16,
    color: GRAY,
    transition: "transform 0.3s ease",
    display: "inline-block",
  },

  expandBody: {
    borderTop: `1px solid #222`,
    marginTop: 14,
  },
  expandInner: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  expandDesc: {
    fontSize: 13,
    color: GRAY,
    lineHeight: 1.65,
    fontWeight: 300,
    margin: 0,
  },
  detailsList: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  detailItem: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  detailDot: {
    fontSize: 12,
    color: ORANGE,
    flexShrink: 0,
  },
  detailText: {
    fontSize: 12,
    color: "#AAAAAA",
    fontWeight: 500,
  },

  ctaLeft: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  ctaTitle: {
    fontFamily: "'Syne', sans-serif",
    fontSize: 18,
    fontWeight: 700,
    color: WHITE,
    margin: 0,
  },
  ctaSub: {
    fontSize: 13,
    color: GRAY,
    margin: 0,
    fontWeight: 300,
  },
  ctaBtn: {
    background: ORANGE,
    border: "none",
    color: WHITE,
    borderRadius: 9,
    padding: "11px 24px",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "inherit",
    whiteSpace: "nowrap",
    flexShrink: 0,
    transition: "background 0.15s",
  },
};