"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface Service {
  id: string;
  title: string;
  desc: string;
  tags: string[];
  url: string;
  icon: React.ReactNode;
}

const SERVICES: Service[] = [
  {
    id: "01",
    title: "Product & Software Engineering",
    desc: "We design and engineer scalable software products, enterprise platforms, and digital experiences that help businesses innovate faster, improve operational efficiency, and confidently scale for long-term growth.",
    tags: ["Web Platforms", "Mobile Products", "Cloud-Native Apps", "DevOps & CI/CD", "Low-Code"],
    url: "/product-software-engineering",
    icon: <CpuIcon />,
  },
  {
    id: "02",
    title: "Data & Intelligence Platforms",
    desc: "Transform raw and fragmented business data into meaningful insights with modern analytics platforms, real-time dashboards, reporting systems, and scalable intelligence solutions that support smarter decision-making.",
    tags: ["Data Engineering", "Analytics Pipelines", "Business Intelligence", "Reporting"],
    url: "/data-intelligence-platforms",
    icon: <ChartIcon />,
  },
  {
    id: "03",
    title: "Applied AI & Machine Learning",
    desc: "Build intelligent AI-powered systems that automate workflows, improve customer experiences, generate insights, and unlock innovative capabilities using practical and business-focused machine learning solutions.",
    tags: ["Generative AI", "Predictive Models", "Computer Vision", "Conversational AI"],
    url: "/applied-ai-ml",
    icon: <BrainIcon />,
  },
  {
    id: "04",
    title: "Security & Risk Engineering",
    desc: "Strengthen digital products and infrastructure with proactive security engineering, risk assessments, compliance strategies, and secure development practices built into every stage of delivery.",
    tags: ["Secure DevOps", "Application Security", "Infrastructure Security", "Cloud Risk"],
    url: "/security-risk-engineering",
    icon: <ShieldIcon />,
  },
  {
    id: "05",
    title: "Experience & Interface Design",
    desc: "Create intuitive and visually engaging user experiences through strategic UX research, modern interface systems, usability optimization, and customer-centered digital design practices.",
    tags: ["User Research", "UX Strategy", "UI Design Systems", "Conversion Optimization"],
    url: "/experience-interface-design",
    icon: <LayoutIcon />,
  },
  {
    id: "06",
    title: "Quality Engineering & Testing",
    desc: "Deliver reliable and high-performing digital solutions through automated testing, quality assurance frameworks, performance validation, and continuous monitoring across platforms and environments.",
    tags: ["Functional Testing", "Test Automation", "Security Validation", "Performance Testing"],
    url: "/quality-engineering-testing",
    icon: <ChecklistIcon />,
  },
];

/* ============================================================
   CANVAS PROCEDURAL VISUALIZATIONS
============================================================ */
function drawEngineering(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const cx = w / 2, cy = h / 2;
  ctx.strokeStyle = "rgba(249,115,22,0.12)";
  ctx.lineWidth = 1;
  for (let i = -3; i <= 3; i++) {
    ctx.beginPath();
    ctx.moveTo(cx - 120 + i * 40, cy - 60 + i * 20);
    ctx.lineTo(cx + 120 + i * 40, cy + 60 + i * 20);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx - 120 - i * 40, cy + 60 + i * 20);
    ctx.lineTo(cx + 120 - i * 40, cy - 60 + i * 20);
    ctx.stroke();
  }
  for (let i = 0; i < 5; i++) {
    const pulse = (Math.sin(t * 0.05 + i * 1.5) + 1) / 2;
    const nx = cx + Math.sin(i * 1.2) * 80;
    const ny = cy + Math.cos(i * 1.2) * 40;
    ctx.beginPath();
    ctx.arc(nx, ny, 3.5 + pulse * 2.5, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(249,115,22,${0.25 + pulse * 0.6})`;
    ctx.fill();
    ctx.strokeStyle = `rgba(249,115,22,${0.5 + pulse * 0.4})`;
    ctx.stroke();
  }
}

function drawDataBI(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const cx = w / 2, cy = h / 2;
  for (let i = 0; i < 3; i++) {
    const streamY = cy - 40 + i * 40;
    ctx.beginPath();
    ctx.moveTo(40, streamY);
    ctx.lineTo(w - 40, streamY);
    ctx.strokeStyle = "rgba(249,115,22,0.08)";
    ctx.lineWidth = 1;
    ctx.stroke();
    const prog = ((t * 0.008 + i * 0.3) % 1);
    ctx.beginPath();
    ctx.arc(40 + (w - 80) * prog, streamY, 2.5, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(249,115,22,0.65)";
    ctx.fill();
  }
  for (let i = 0; i < 6; i++) {
    const bh = 30 + Math.sin(t * 0.06 + i * 0.8) * 20;
    const bx = cx - 90 + i * 30;
    ctx.fillStyle = "rgba(249,115,22,0.06)";
    ctx.fillRect(bx, cy + 60 - bh, 18, bh);
    ctx.strokeStyle = "rgba(249,115,22,0.3)";
    ctx.strokeRect(bx, cy + 60 - bh, 18, bh);
  }
}

function drawAI(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const cx = w / 2, cy = h / 2;
  const R = 80;
  const angle = t * 0.005;
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.ellipse(cx, cy, R, R * 0.3, (i * Math.PI) / 3 + angle, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(249,115,22,0.14)";
    ctx.lineWidth = 1;
    ctx.stroke();
  }
  ctx.beginPath();
  ctx.arc(cx, cy, 32, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(249,115,22,0.04)";
  ctx.fill();
  ctx.strokeStyle = "rgba(249,115,22,0.25)";
  ctx.stroke();
}

function drawSecurity(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const cx = w / 2, cy = h / 2;
  const maxR = 90;
  for (let r = 30; r <= maxR; r += 30) {
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(249,115,22,0.08)";
    ctx.stroke();
  }
  const sweepAngle = t * 0.015;
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(cx + Math.cos(sweepAngle) * maxR, cy + Math.sin(sweepAngle) * maxR);
  ctx.strokeStyle = "rgba(249,115,22,0.25)";
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(cx, cy, maxR + 8, sweepAngle - 0.4, sweepAngle + 0.4);
  ctx.strokeStyle = "rgba(249,115,22,0.55)";
  ctx.lineWidth = 2;
  ctx.stroke();
}

function drawUXUI(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const cx = w / 2, cy = h / 2;
  ctx.strokeStyle = "rgba(249,115,22,0.1)";
  ctx.strokeRect(cx - 100, cy - 60, 200, 120);
  ctx.strokeRect(cx - 90, cy - 50, 60, 40);
  ctx.strokeRect(cx - 20, cy - 50, 110, 40);
  for (let i = 0; i < 3; i++) {
    const ox = Math.sin(t * 0.03 + i * 2) * 10;
    const oy = Math.cos(t * 0.02 + i * 1.5) * 8;
    ctx.fillStyle = `rgba(249,115,22,${0.05 + i * 0.03})`;
    ctx.fillRect(cx - 80 + i * 50 + ox, cy + 12 + oy, 40, 30);
    ctx.strokeStyle = `rgba(249,115,22,${0.2 + i * 0.12})`;
    ctx.strokeRect(cx - 80 + i * 50 + ox, cy + 12 + oy, 40, 30);
  }
}

function drawQA(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const cx = w / 2, cy = h / 2;
  ctx.beginPath();
  ctx.moveTo(cx - 120, cy);
  ctx.lineTo(cx + 120, cy);
  ctx.strokeStyle = "rgba(249,115,22,0.12)";
  ctx.stroke();
  for (let i = 0; i < 4; i++) {
    const nx = cx - 120 + i * 80;
    const pulse = (Math.sin(t * 0.05 + i * 1.2) + 1) / 2;
    ctx.beginPath();
    ctx.arc(nx, cy, 4.5, 0, Math.PI * 2);
    ctx.fillStyle = i === 2 ? "rgba(248,113,113,0.75)" : "rgba(74,222,128,0.75)";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(nx, cy, 8 + pulse * 4, 0, Math.PI * 2);
    ctx.strokeStyle = i === 2 ? `rgba(248,113,113,${0.15 + pulse * 0.15})` : `rgba(74,222,128,${0.15 + pulse * 0.15})`;
    ctx.stroke();
  }
  ctx.font = "bold 11px monospace";
  ctx.fillStyle = "rgba(249,115,22,0.5)";
  ctx.fillText("PASS RATE: 98.4%", cx - 50, cy + 45);
}

/* ============================================================
   MAIN COMPONENT
============================================================ */
export default function ServicesSection() {
  const [activeId, setActiveId] = useState<string>("01");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);



  const getDrawFn = (id: string) => {
    switch (id) {
      case "01": return drawEngineering;
      case "02": return drawDataBI;
      case "03": return drawAI;
      case "04": return drawSecurity;
      case "05": return drawUXUI;
      case "06": return drawQA;
      default: return drawEngineering;
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let t = 0;
    let w = 0;
    let h = 0;
    let visible = false;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const tick = () => {
      if (!visible) return;
      t += 1;
      ctx.clearRect(0, 0, w, h);
      const drawFn = getDrawFn(activeId);
      if (w > 0 && h > 0) drawFn(ctx, w, h, t);
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) {
          cancelAnimationFrame(raf);
          tick();
        } else {
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0.08 }
    );

    window.addEventListener("resize", resize);
    io.observe(canvas);
    resize();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      io.disconnect();
    };
  }, [activeId]);

  const activeSvc = SERVICES.find((s) => s.id === activeId) ?? SERVICES[0];

  return (
    <section
      style={{
        background: "#09090f",
        padding: "96px 0 100px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        .srv-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
        }
        @media (min-width: 1024px) {
          .srv-grid {
            grid-template-columns: 1.2fr 1fr;
            gap: 64px;
          }
        }
        .srv-list-row {
          border-bottom: 1px solid rgba(255,255,255,0.065);
          position: relative;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .srv-list-row:hover {
          background: rgba(255,255,255,0.015);
        }
      `}</style>

      {/* Subtle dot grid */}
      <div
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.012) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.012) 1px,transparent 1px)",
          backgroundSize: "54px 54px",
        }}
      />
      {/* Glows */}
      <div style={{
        position: "absolute", top: -200, left: -100, width: 600, height: 600,
        borderRadius: "50%",
        background: "radial-gradient(circle,rgba(249,115,22,.06) 0%,transparent 65%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: -200, right: -100, width: 500, height: 500,
        borderRadius: "50%",
        background: "radial-gradient(circle,rgba(99,102,241,.04) 0%,transparent 65%)",
        pointerEvents: "none",
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        
        {/* Eyebrow */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
          <div style={{ width: 26, height: 1, background: "#f97316", opacity: 0.65 }} />
          <span style={{
            fontSize: 10.5, letterSpacing: "0.2em", textTransform: "uppercase",
            color: "#f97316", fontWeight: 400,
          }}>
            empower · deliver · excel
          </span>
        </div>

        {/* Heading */}
        <h2 style={{
          fontSize: "clamp(42px, 6vw, 68px)", fontWeight: 300,
          color: "rgba(255,255,255,.9)", lineHeight: 1.02,
          margin: "0 0 16px", letterSpacing: "-.02em",
        }}>
          What we{" "}
          <span style={{
            fontStyle: "normal",
            background: "linear-gradient(135deg, #ff8f3d 0%, #f97316 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: 600
          }}>
            build
          </span>
        </h2>

        <p style={{
          fontSize: 14.5, color: "rgba(255,255,255,.3)",
          lineHeight: 1.8, maxWidth: 480, margin: "0 0 72px", fontWeight: 400,
        }}>
          End-to-end capabilities designed to help startups and enterprise platforms move faster, streamline processes, and scale with confidence.
        </p>

        {/* 7XL Dashboard Grid */}
        <div className="srv-grid">
          
          {/* Left: Service Rows */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,.065)" }}>
            {SERVICES.map((svc) => {
              const isSelected = activeId === svc.id;
              const isHov = hoveredId === svc.id;
              const rowTitleColor = isSelected
                ? "rgba(255,255,255,.95)"
                : isHov
                ? "rgba(255,255,255,.7)"
                : "rgba(255,255,255,.4)";

              return (
                <div
                  key={svc.id}
                  className="srv-list-row"
                  onClick={() => setActiveId(svc.id)}
                  onMouseEnter={() => setHoveredId(svc.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  style={{
                    padding: isSelected ? "32px 16px 32px 24px" : "26px 16px",
                  }}
                >
                  {/* Glow active bar */}
                  <div style={{
                    position: "absolute", left: 0, top: 0, bottom: 0, width: 2,
                    background: "#f97316",
                    opacity: isSelected ? 1 : 0,
                    transition: "opacity 0.25s",
                  }} />

                  <div style={{ display: "grid", gridTemplateColumns: "60px 1fr auto", alignItems: "center" }}>
                    <span style={{
                      fontSize: 14, fontWeight: 600, letterSpacing: "0.08em",
                      color: isSelected ? "#f97316" : "rgba(255,255,255,.16)",
                      transition: "color 0.25s",
                    }}>
                      {svc.id}
                    </span>

                    <span style={{
                      fontSize: "clamp(20px, 3vw, 32px)", fontWeight: 300,
                      color: rowTitleColor, letterSpacing: "-.01em", lineHeight: 1.2,
                      transition: "color 0.25s",
                    }}>
                      {svc.title}
                    </span>

                    <div style={{
                      width: 32, height: 32, borderRadius: "50%",
                      border: isSelected ? "1px solid rgba(249,115,22,.45)" : "1px solid rgba(255,255,255,.1)",
                      background: isSelected ? "rgba(249,115,22,.09)" : "transparent",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: isSelected ? "#f97316" : "rgba(255,255,255,.3)",
                      transform: isSelected ? "translateX(4px)" : "none",
                      transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: State-of-the-Art Showcase Panel */}
          <div style={{
            position: "sticky",
            top: 120,
            borderRadius: 20,
            padding: "36px 32px",
            border: "1.5px solid rgba(255,255,255,0.05)",
            background: "linear-gradient(145deg, rgba(255,255,255,0.015) 0%, rgba(255,255,255,0.002) 100%)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            overflow: "hidden",
            boxShadow: "0 24px 80px rgba(0,0,0,0.4)",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}>
            {/* Glow orb */}
            <div style={{
              position: "absolute", top: -80, right: -80, width: 260, height: 260,
              background: "radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)",
              pointerEvents: "none",
            }} />

            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%", flex: 1, zIndex: 1, position: "relative" }}>
              <div>
                {/* Interactive Procedural Canvas */}
                <div style={{
                  position: "relative", width: "100%", height: 160,
                  borderRadius: 14, overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.04)",
                  background: "rgba(0,0,0,0.2)",
                  marginBottom: 32,
                }}>
                  <canvas
                    ref={canvasRef}
                    style={{ display: "block", width: "100%", height: "100%" }}
                  />
                </div>

                {/* Title & Desc */}
                <h3 style={{
                  fontSize: "clamp(24px, 2.5vw, 36px)", fontWeight: 700,
                  color: "#f97316", lineHeight: 1.15,
                  margin: "0 0 16px", letterSpacing: "-.01em",
                }}>
                  {activeSvc.title}
                </h3>

                <p style={{
                  fontSize: 13.5, lineHeight: 1.8,
                  color: "rgba(255,255,255,0.36)",
                  marginBottom: 28,
                }}>
                  {activeSvc.desc}
                </p>
              </div>

              <div>
                <div style={{ height: 1, background: "rgba(255,255,255,0.065)", marginBottom: 24 }} />

                {/* Tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
                  {activeSvc.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: 10, letterSpacing: "0.06em",
                        color: "rgba(255,255,255,.45)",
                        padding: "4px 10px", borderRadius: 99,
                        border: "1px solid rgba(255,255,255,.1)",
                        background: "rgba(255,255,255,0.015)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA button */}
                <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                  <CtaButton />
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

/* ============================================================
   EXPLORE & CTA ACTIONS
============================================================ */
function ExploreLink({ href, label }: { href: string; label: string }) {
  const [hov, setHov] = useState(false);
  return (
    <Link
      href={href}
      aria-label={`Explore ${label}`}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        fontSize: 11, letterSpacing: "0.13em", textTransform: "uppercase",
        color: "#f97316", fontWeight: 600,
        textDecoration: "none", opacity: hov ? 1 : 0.7,
        transition: "opacity 0.2s",
      }}
    >
      Explore Solution
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
        style={{ transform: hov ? "translateX(4px)" : "none", transition: "transform 0.2s" }}>
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    </Link>
  );
}

function CtaButton() {
  const [hov, setHov] = useState(false);
  return (
    <Link
      href="/contact"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        fontSize: 11, fontWeight: 600,
        letterSpacing: "0.1em", textTransform: "uppercase",
        color: hov ? "#fff" : "rgba(255,255,255,.6)",
        background: hov ? "linear-gradient(135deg, #f97316, #d95d00)" : "rgba(255,255,255,0.02)",
        border: hov ? "1px solid #f97316" : "1px solid rgba(255,255,255,.12)",
        padding: "10px 22px", borderRadius: 99,
        textDecoration: "none",
        cursor: "pointer", transition: "all 0.25s",
        boxShadow: hov ? "0 10px 30px rgba(249, 115, 22, 0.25)" : "none",
      }}
    >
      Work with us
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    </Link>
  );
}

/* ============================================================
   INLINE CUSTOM SVG ICONS
============================================================ */
function CpuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" />
      <path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18" />
      <circle cx="7" cy="14" r="1" fill="currentColor" />
      <circle cx="11" cy="9" r="1" fill="currentColor" />
      <circle cx="15" cy="11" r="1" fill="currentColor" />
      <circle cx="19" cy="6" r="1" fill="currentColor" />
      <path d="M7 14 11 9l4 2 4-5" />
    </svg>
  );
}

function BrainIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.14Z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.14Z" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function LayoutIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 21V9" />
    </svg>
  );
}

function ChecklistIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
      <rect x="9" y="3" width="6" height="4" rx="1" />
      <path d="m9 12 2 2 4-4M9 17h4" />
    </svg>
  );
}