"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { COUNTRIES_SERVED } from "@/lib/constants";

// ─── Types ────────────────────────────────────────────────────────────────────

interface StatRowProps {
  label: string;
  value: string;
  badge: string;
  badgeType: "up" | "neutral";
}

interface MetricCardProps {
  num: string;
  label: string;
  delta: string;
}

interface FeatureCardProps {
  icon: string;
  title: string;
  desc: string;
  tag: string;
  featured?: boolean;
}

interface ProgressRowProps {
  name: string;
  pct: number;
}

interface TimelineItemProps {
  title: string;
  step: string;
  desc: string;
  active?: boolean;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatRow({ label, value, badge, badgeType }: StatRowProps) {
  return (
    <div style={styles.statRow}>
      <div>
        <div style={styles.statLabel}>{label}</div>
        <div style={styles.statVal}>{value}</div>
      </div>
      <span
        style={{
          ...styles.statBadge,
          ...(badgeType === "up" ? styles.badgeUp : styles.badgeNeutral),
        }}
      >
        {badge}
      </span>
    </div>
  );
}

function MetricCard({ num, label, delta }: MetricCardProps) {
  return (
    <div style={styles.metricCard}>
      <div style={styles.metricNum}>{num}</div>
      <div style={styles.metricLabel}>{label}</div>
      <div style={styles.metricDelta}>{delta}</div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
  tag,
  featured = false,
}: FeatureCardProps) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{
        ...styles.featCard,
        ...(featured ? styles.featCardFeatured : {}),
        ...(hovered && !featured ? styles.featCardHover : {}),
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          ...styles.featIcon,
          ...(featured ? styles.featIconFeatured : {}),
        }}
      >
        <i
          className={`ti ${icon}`}
          style={{
            color: featured ? vars.zinc300 : vars.zinc600,
            fontSize: 16,
          }}
          aria-hidden="true"
        />
      </div>
      <div
        style={{
          ...styles.featTitle,
          ...(featured ? styles.featTitleFeatured : {}),
        }}
      >
        {title}
      </div>
      <div style={styles.featDesc}>{desc}</div>
      <span
        style={{
          ...styles.featTag,
          ...(featured ? styles.featTagFeatured : {}),
        }}
      >
        {tag}
      </span>
    </div>
  );
}

function ProgressRow({ name, pct }: ProgressRowProps) {
  return (
    <div style={styles.progRow}>
      <div style={styles.progMeta}>
        <span style={styles.progName}>{name}</span>
        <span style={styles.progPct}>{pct}%</span>
      </div>
      <div style={styles.progTrack}>
        <div style={{ ...styles.progFill, width: `${pct}%` }} />
      </div>
    </div>
  );
}

function TimelineItem({
  title,
  step,
  desc,
  active = false,
}: TimelineItemProps) {
  return (
    <div style={styles.tItem}>
      <div
        style={{
          ...styles.tDot,
          ...(active ? styles.tDotActive : {}),
        }}
      />
      <div style={styles.tHead}>
        <span style={styles.tTitle}>{title}</span>
        <span style={styles.tStep}>{step}</span>
      </div>
      <p style={styles.tDesc}>{desc}</p>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function QAForgeLandingPage() {
  const [dotVisible, setDotVisible] = useState(true);

  // Blinking live dot animation
  useEffect(() => {
    const id = setInterval(() => setDotVisible((v) => !v), 800);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap"
        rel="stylesheet"
      />
      {/* Tabler icons */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css"
      />

      <style>{`
        @media (max-width: 991px) {
          .trust-hero {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .trust-metrics {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 16px !important;
          }
          .trust-features {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 768px) {
          .trust-twocol {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .trust-bottom-strip {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
            text-align: center !important;
            padding: 1.5rem !important;
          }
          .trust-strip-meta {
            justify-content: center !important;
            flex-wrap: wrap;
          }
          .trust-strip-cta {
            align-items: center !important;
          }
          .trust-strip-note {
            text-align: center !important;
          }
        }
        @media (max-width: 600px) {
          .trust-features {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 480px) {
          .trust-metrics {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <div style={styles.body}>
        <div style={styles.page}>
          {/* ── NAV ── */}
          <nav style={styles.nav}>
            <div style={styles.navBrand}>
              <span style={styles.brandDot} />
              QAForge
            </div>
            <span style={styles.navTag}>v4.2 — Enterprise</span>
          </nav>

          {/* ── HERO ── */}
          <section className="trust-hero" style={styles.hero}>
            <div>
              <div style={styles.heroEyebrow}>
                <span style={styles.eyebrowPill}>TRUSTED PARTNER</span>
                <span style={styles.eyebrowLine} />
              </div>
              <h1 style={{ ...styles.heroTitle, fontSize: "clamp(26px, 6vw, 2.4rem)" }}>
                Automation for
                <br />
                <em style={{ fontStyle: "normal", color: "var(--zinc-400)" }}>
                  modern
                </em>
                <br />
                enterprises.
              </h1>
              <p style={styles.heroSub}>
                Reduce manual testing effort by 70%. Faster regression cycles,
                seamless CI/CD integration, and AI-assisted workflows built for
                scale.
              </p>
              <div style={styles.heroCtaRow}>
                <Link href="/contact" style={{...styles.btnPrimary, textDecoration: "none"}}>Get started free</Link>
                <Link href="/contact" style={{...styles.btnGhost, textDecoration: "none"}}>View docs →</Link>
              </div>
            </div>

            {/* Stats Panel */}
            <div style={styles.statsPanel}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "var(--zinc-400)",
                  letterSpacing: 1,
                  marginBottom: 4,
                }}
              >
                <span
                  style={{
                    ...styles.liveDot,
                    opacity: dotVisible ? 1 : 0.3,
                    transition: "opacity 0.4s",
                  }}
                />
                LIVE METRICS
              </div>
              <StatRow
                label="Manual Effort Reduced"
                value="70%"
                badge="↑ 12pts"
                badgeType="up"
              />
              <StatRow
                label="Regression Cycle Time"
                value="3.2h"
                badge="↓ 4.8h"
                badgeType="up"
              />
              <StatRow
                label="CI/CD Pipeline Pass Rate"
                value="98.4%"
                badge="↑ stable"
                badgeType="up"
              />
              <StatRow
                label="Test Coverage"
                value="94%"
                badge="target 95%"
                badgeType="neutral"
              />
            </div>
          </section>

          {/* ── METRICS ROW ── */}
          <div className="trust-metrics" style={styles.metricsRow}>
            <MetricCard
              num="2.1k"
              label="Tests automated"
              delta="+18% this sprint"
            />
            <MetricCard num="99%" label="Uptime SLA" delta="Enterprise-grade" />
            <MetricCard num="14m" label="Avg. build time" delta="↓ from 52m" />
            <MetricCard
              num="340+"
              label="Enterprises served"
              delta={`Across ${COUNTRIES_SERVED} countries`}
            />
          </div>

          {/* ── FEATURES GRID ── */}
          <div style={styles.sectionLabel}>Core Capabilities</div>
          <div className="trust-features" style={styles.featuresGrid}>
            <FeatureCard
              icon="ti-robot"
              title="AI-Assisted Testing"
              desc="Self-healing locators and auto-generated test cases from user stories."
              tag="AI CORE"
              featured
            />
            <FeatureCard
              icon="ti-git-branch"
              title="CI/CD Integrated QA"
              desc="Native plugins for GitHub Actions, Jenkins, GitLab CI, and CircleCI."
              tag="PIPELINE"
            />
            <FeatureCard
              icon="ti-refresh"
              title="Faster Regression"
              desc="Parallel execution across 1000+ browser and device combinations."
              tag="SPEED"
            />
            <FeatureCard
              icon="ti-shield-check"
              title="Enterprise Security"
              desc="SOC 2 Type II certified. SSO, RBAC, audit logs included."
              tag="COMPLIANCE"
            />
            <FeatureCard
              icon="ti-chart-dots"
              title="Smart Analytics"
              desc="Flakiness detection, failure clustering, and trend dashboards."
              tag="INSIGHTS"
            />
            <FeatureCard
              icon="ti-plug"
              title="Framework Agnostic"
              desc="Works with Selenium, Playwright, Cypress, and custom stacks."
              tag="FLEXIBLE"
            />
          </div>

          {/* ── PROGRESS + TIMELINE ── */}
          <div className="trust-twocol" style={styles.twoColGrid}>
            {/* Progress */}
            <div style={styles.progSection}>
              <div style={{ ...styles.sectionLabel, marginBottom: 20 }}>
                Automation coverage
              </div>
              <ProgressRow name="UI / E2E" pct={94} />
              <ProgressRow name="API / Integration" pct={88} />
              <ProgressRow name="Unit Tests" pct={97} />
              <ProgressRow name="Performance" pct={76} />
            </div>

            {/* Timeline */}
            <div>
              <div style={styles.sectionLabel}>How it works</div>
              <div style={styles.timeline}>
                <div style={styles.timelineTrack}>
                  <TimelineItem
                    title="Connect your repo"
                    step="01"
                    desc="One-click integration with any Git provider. No manual config needed."
                    active
                  />
                  <TimelineItem
                    title="AI scans your codebase"
                    step="02"
                    desc="Generates a test plan and identifies critical paths automatically."
                    active
                  />
                  <TimelineItem
                    title="Tests run on every push"
                    step="03"
                    desc="Parallel execution with instant Slack & email notifications on failure."
                    active
                  />
                  <TimelineItem
                    title="Ship with confidence"
                    step="04"
                    desc="Gate deployments with quality thresholds. Full audit trail included."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ── BOTTOM STRIP ── */}
          <div className="trust-bottom-strip" style={styles.bottomStrip}>
            <div>
              <div style={styles.stripTitle}>
                Trusted Automation Partner for Modern Enterprises
              </div>
              <div style={styles.stripSub}>
                Join 340+ engineering teams shipping faster with QAForge.
              </div>
              <div className="trust-strip-meta" style={styles.stripMeta}>
                <i
                  className="ti ti-shield-check"
                  style={{ fontSize: 13 }}
                  aria-hidden="true"
                />{" "}
                SOC 2 Type II
                <span style={{ margin: "0 6px", color: "var(--zinc-700)" }}>
                  ·
                </span>
                <i
                  className="ti ti-lock"
                  style={{ fontSize: 13 }}
                  aria-hidden="true"
                />{" "}
                GDPR Ready
                <span style={{ margin: "0 6px", color: "var(--zinc-700)" }}>
                  ·
                </span>
                <i
                  className="ti ti-server"
                  style={{ fontSize: 13 }}
                  aria-hidden="true"
                />{" "}
                99% Uptime SLA
              </div>
            </div>
            <div className="trust-strip-cta" style={styles.stripCta}>
              <Link href="/contact" style={{...styles.btnInvert, textDecoration: "none"}}>Start free trial</Link>
              <div className="trust-strip-note" style={styles.stripNote}>No credit card required</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const vars = {
  zinc50: "#fafafa",
  zinc100: "#f4f4f5",
  zinc200: "#e4e4e7",
  zinc300: "#d4d4d8",
  zinc400: "#a1a1aa",
  zinc500: "#71717a",
  zinc600: "#52525b",
  zinc700: "#3f3f46",
  zinc800: "#27272a",
  zinc900: "#18181b",
  zinc950: "#09090b",
  white: "#ffffff",
};

// Inject CSS variables into :root via a <style> block is not idiomatic in TSX inline styles,
// so we reference them directly. CSS variable strings are kept for properties referencing
// dynamic custom properties via Tabler icons.
const styles: Record<string, React.CSSProperties> = {
  body: {
    background: `linear-gradient(180deg, ${vars.zinc50} 0%, ${vars.white} 40%, ${vars.zinc50} 100%)`,
    color: vars.zinc800,
    minHeight: "100vh",
    overflowX: "hidden",
  },
  page: {
    maxWidth: 1280,
    margin: "0 auto",
    padding: "2rem 1.5rem 4rem",
  },

  // NAV
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 0 2.5rem",
    borderBottom: `1px solid ${vars.zinc200}`,
    marginBottom: "3rem",
  },
  navBrand: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 14,
    fontWeight: 600,
    color: vars.zinc900,
    letterSpacing: -0.3,
  },
  brandDot: {
    width: 8,
    height: 8,
    background: vars.zinc900,
    borderRadius: 2,
    display: "inline-block",
  },
  navTag: {
    fontSize: 11,
    fontWeight: 500,
    background: vars.zinc100,
    border: `1px solid ${vars.zinc200}`,
    color: vars.zinc500,
    padding: "3px 10px",
    borderRadius: 20,
    },

  // HERO
  hero: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "3rem",
    alignItems: "start",
    marginBottom: "4rem",
  },
  heroEyebrow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: "1.25rem",
  },
  eyebrowPill: {
    fontSize: 11,
    fontWeight: 500,
    background: vars.zinc900,
    color: vars.white,
    padding: "4px 12px",
    borderRadius: 20,
    letterSpacing: 0.5,
  },
  eyebrowLine: {
    flex: 1,
    height: 1,
    background: vars.zinc200,
  },
  heroTitle: {
    fontSize: "2.4rem",
    fontWeight: 700,
    lineHeight: 1.1,
    color: vars.zinc950,
    letterSpacing: -1.5,
    marginBottom: "1rem",
  },
  heroSub: {
    fontSize: 14,
    color: vars.zinc500,
    lineHeight: 1.8,
    marginBottom: "2rem",
    fontWeight: 400,
  },
  heroCtaRow: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
  },
  btnPrimary: {
    fontSize: 13,
    fontWeight: 600,
    background: vars.zinc900,
    color: vars.white,
    border: "none",
    padding: "10px 22px",
    borderRadius: 8,
    cursor: "pointer",
    letterSpacing: -0.2,
  },
  btnGhost: {
    fontSize: 13,
    fontWeight: 500,
    background: "transparent",
    color: vars.zinc600,
    border: `1px solid ${vars.zinc300}`,
    padding: "10px 18px",
    borderRadius: 8,
    cursor: "pointer",
  },

  // STATS PANEL
  statsPanel: {
    position: "relative",

    background: "#fffaf5",

    border: "1px solid #fed7aa",

    borderRadius: 28,

    padding: "1.8rem",

    display: "flex",
    flexDirection: "column",
    gap: "1.2rem",

    overflow: "hidden",

    transition: "all 0.25s ease",
  },

  statsPanelGlow: {
    position: "absolute",

    top: "-80px",
    right: "-80px",

    width: 220,
    height: 220,

    borderRadius: "50%",

    background: "#ffedd5",

    pointerEvents: "none",
  },

  statsPanelHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",

    marginBottom: "0.4rem",
  },

  statsPanelTitle: {
    fontSize: 13,

    fontWeight: 700,

    letterSpacing: "0.12em",

    textTransform: "uppercase",

    color: "#9a3412",

    },

  statsPanelBadge: {
    padding: "6px 10px",

    borderRadius: 999,

    background: "#ffedd5",

    border: "1px solid #fdba74",

    fontSize: 10,

    fontWeight: 700,

    color: "#c2410c",

    },

  statsDivider: {
    width: "100%",
    height: 1,

    background: "#fed7aa",
  },
  statRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    padding: "1rem 1.1rem",

    background: "#fffaf5",

    borderRadius: 18,

    border: "1px solid #fed7aa",

    transition: "all 0.2s ease",

    position: "relative",

    overflow: "hidden",
  },

  statLabel: {
    fontSize: 11,

    color: "#9a3412",

    fontWeight: 600,

    letterSpacing: "0.08em",

    textTransform: "uppercase",

    },

  statVal: {
    fontSize: 24,

    fontWeight: 800,

    color: "#ea580c",

    letterSpacing: -1.5,

    lineHeight: 1,
  },

  statBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 5,

    fontSize: 10,

    fontWeight: 700,

    padding: "5px 10px",

    borderRadius: 999,

    letterSpacing: "0.04em",
  },

  badgeUp: {
    background: "#ffedd5",

    border: "1px solid #fdba74",

    color: "#c2410c",
  },

  badgeNeutral: {
    background: "#fff7ed",

    border: "1px solid #fed7aa",

    color: "#9a3412",
  },

  liveDot: {
    width: 7,
    height: 7,

    background: "#f97316",

    borderRadius: "50%",

    display: "inline-block",

    marginRight: 6,
  },
  // METRICS ROW
  metricsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: 18,
    marginBottom: "3.5rem",
  },

  metricCard: {
    position: "relative",

    background: "#fffaf5",

    border: "1px solid #fed7aa",

    borderRadius: 24,

    padding: "1.4rem 1.3rem",

    overflow: "hidden",

    transition: "all 0.25s ease",
  },

  metricNum: {
    fontSize: "2.2rem",

    fontWeight: 800,

    color: "#ea580c",

    letterSpacing: -2,

    lineHeight: 1,
  },

  metricLabel: {
    fontSize: 11,

    color: "#9a3412",

    marginTop: "0.5rem",

    fontWeight: 500,

    letterSpacing: "0.08em",

    textTransform: "uppercase",

    lineHeight: 1.5,
  },

  metricDelta: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,

    marginTop: "1rem",

    padding: "6px 10px",

    borderRadius: 999,

    background: "#ffedd5",

    border: "1px solid #fdba74",

    fontSize: 10,

    fontWeight: 700,

    color: "#c2410c",

    width: "fit-content",
  },

  // SECTION LABEL
  sectionLabel: {
    fontSize: 11,
    fontWeight: 600,
    color: vars.zinc400,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    marginBottom: "1.25rem",
  },

  // FEATURES GRID
  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 12,
    marginBottom: "3rem",
  },
  featCard: {
    background: vars.white,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: vars.zinc200,
    borderRadius: 14,
    padding: "1.25rem 1rem",
    position: "relative",
    transition: "all 0.2s",
    cursor: "default",
  },
  featCardFeatured: {
    background: vars.zinc950,
    borderColor: vars.zinc800,
  },
  featCardHover: {
    borderColor: vars.zinc400,
    transform: "translateY(-2px)",
  },
  featIcon: {
    width: 32,
    height: 32,
    background: vars.zinc100,
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "0.85rem",
    fontSize: 14,
  },
  featIconFeatured: {
    background: vars.zinc800,
  },
  featTitle: {
    fontSize: 13,
    fontWeight: 600,
    color: vars.zinc900,
    marginBottom: "0.35rem",
    letterSpacing: -0.3,
  },
  featTitleFeatured: {
    color: vars.white,
  },
  featDesc: {
    fontSize: 12,
    color: vars.zinc400,
    lineHeight: 1.6,
  },
  featTag: {
    marginTop: "0.75rem",
    fontSize: 10,
    fontWeight: 600,
    background: vars.zinc100,
    color: vars.zinc500,
    padding: "2px 8px",
    borderRadius: 20,
    display: "inline-block",
  },
  featTagFeatured: {
    background: vars.zinc800,
    color: vars.zinc300,
  },

  // TWO-COL GRID
  twoColGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1.5rem",
    marginBottom: "3rem",
  },

  // PROGRESS
  progSection: {
    background: vars.white,
    border: `1px solid ${vars.zinc200}`,
    borderRadius: 14,
    padding: "1.5rem",
  },
  progRow: {
    marginBottom: "1rem",
  },
  progMeta: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  progName: {
    fontSize: 12,
    fontWeight: 500,
    color: vars.zinc700,
  },
  progPct: {
    fontSize: 11,
    color: vars.zinc400,
  },
  progTrack: {
    height: 4,
    background: vars.zinc100,
    borderRadius: 20,
    overflow: "hidden",
  },
  progFill: {
    height: "100%",
    borderRadius: 20,
    background: vars.zinc900,
    transition: "width 1s ease",
  },

  // TIMELINE
  timeline: {
    marginBottom: "3rem",
  },
  timelineTrack: {
    position: "relative",
    paddingLeft: "1.5rem",
    borderLeft: `1px solid ${vars.zinc200}`,
  },
  tItem: {
    position: "relative",
    padding: "0 0 1.5rem 1.5rem",
  },
  tDot: {
    position: "absolute",
    left: "calc(-1.5rem - 7px)",
    top: 4,
    width: 14,
    height: 14,
    background: vars.white,
    border: `2px solid ${vars.zinc300}`,
    borderRadius: "50%",
    zIndex: 1,
  },
  tDotActive: {
    background: vars.zinc900,
    borderColor: vars.zinc900,
  },
  tHead: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: "0.25rem",
  },
  tTitle: {
    fontSize: 13,
    fontWeight: 600,
    color: vars.zinc800,
    letterSpacing: -0.2,
  },
  tStep: {
    fontSize: 10,
    color: vars.zinc400,
    background: vars.zinc100,
    padding: "1px 7px",
    borderRadius: 10,
  },
  tDesc: {
    fontSize: 12,
    color: vars.zinc400,
    lineHeight: 1.6,
  },

  // BOTTOM STRIP
  bottomStrip: {
    background: vars.zinc950,
    borderRadius: 20,
    padding: "2rem",
    display: "grid",
    gridTemplateColumns: "1fr auto",
    gap: "2rem",
    alignItems: "center",
  },
  stripTitle: {
    fontSize: "1.1rem",
    fontWeight: 700,
    color: vars.white,
    letterSpacing: -0.5,
    marginBottom: "0.35rem",
  },
  stripSub: {
    fontSize: 12,
    color: vars.zinc500,
    fontWeight: 400,
  },
  stripMeta: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontSize: 11,
    color: vars.zinc400,
    marginTop: "1rem",
  },
  stripCta: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    alignItems: "flex-end",
  },
  btnInvert: {
    fontSize: 13,
    fontWeight: 600,
    background: vars.white,
    color: vars.zinc950,
    border: "none",
    padding: "10px 22px",
    borderRadius: 8,
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  stripNote: {
    fontSize: 11,
    color: vars.zinc600,
    textAlign: "right",
  },
};
