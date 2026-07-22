"use client";

import { useEffect, useState, useRef, Fragment } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { CONTACT_OFFICE_CLOCKS } from "@/data/contact-page";

function formatOfficeTime(timeZone: string) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date());
}

export default function ContactHero() {
  const [times, setTimes] = useState<Record<string, string>>({});
  const [loaded, setLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoaded(true);
    const tick = () => {
      const next: Record<string, string> = {};
      for (const office of CONTACT_OFFICE_CLOCKS) {
        next[office.city] = formatOfficeTime(office.tz);
      }
      setTimes(next);
    };
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@400;500;700;800;900&family=Instrument+Serif:ital@0;1&display=swap"
        rel="stylesheet"
      />
      <style>{`
          .contact-hero {
            background: #000000;
            font-family: 'Cabinet Grotesk', sans-serif;
            color: #ffffff;
            position: relative;
            width: 100%;
            overflow: hidden;
            padding-bottom: 3.5rem;
            padding-top: 8rem;
          }

          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(28px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to   { opacity: 1; }
          }
          @keyframes pulse-ring {
            0%   { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(249,115,22,0.5); }
            70%  { transform: scale(1);    box-shadow: 0 0 0 12px rgba(249,115,22,0); }
            100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(249,115,22,0); }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50%       { transform: translateY(-8px); }
          }
          @keyframes shimmer {
            0%   { background-position: -200% center; }
            100% { background-position: 200% center; }
          }
          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to   { transform: rotate(360deg); }
          }
          @keyframes counter-spin {
            from { transform: rotate(0deg); }
            to   { transform: rotate(-360deg); }
          }

          .contact-hero .fade-up { animation: fadeUp 0.7s cubic-bezier(.16,1,.3,1) both; }
          .contact-hero .fade-up-1 { animation-delay: 0.05s; }
          .contact-hero .fade-up-2 { animation-delay: 0.15s; }
          .contact-hero .fade-up-3 { animation-delay: 0.25s; }
          .contact-hero .fade-up-4 { animation-delay: 0.38s; }
          .contact-hero .fade-up-5 { animation-delay: 0.5s; }
          .contact-hero .fade-in   { animation: fadeIn 1s ease both; }

          .contact-hero .text-shimmer {
            background: linear-gradient(90deg, #f97316, #fbbf24, #fb923c, #f97316);
            background-size: 200% auto;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: shimmer 3s linear infinite;
          }

          .contact-hero .blueprint-card {
            background: linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.005) 100%);
            border: 1px solid rgba(255,255,255,0.06);
            border-radius: 20px;
            box-shadow: 0 30px 70px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.03);
          }

          .contact-hero .blueprint-grid {
            background-size: 20px 20px;
            background-image: 
              linear-gradient(to right, rgba(255, 255, 255, 0.015) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.015) 1px, transparent 1px);
          }

          .contact-hero .blueprint-node {
            background: rgba(0, 0, 0, 0.85);
            backdrop-filter: blur(12px);
            border-radius: 12px;
            padding: 10px 14px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            position: absolute;
            z-index: 10;
          }
          .contact-hero .blueprint-node:hover {
            border-color: rgba(249, 115, 22, 0.4) !important;
            box-shadow: 0 0 20px rgba(249, 115, 22, 0.1), inset 0 1px 0 rgba(255,255,255,0.05);
            transform: translateY(-2px);
          }
          @keyframes status-pulse {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
          }
          .contact-hero .node-status-dot {
            animation: status-pulse 1.5s ease-in-out infinite;
          }

          .contact-hero .noise-bg::before {
            content: '';
            position: absolute;
            inset: 0;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
            pointer-events: none;
            z-index: 0;
            opacity: 0.04;
          }

          .contact-hero .hero-number {
            font-family: 'Instrument Serif', serif;
            font-style: italic;
          }

          .contact-hero .cursor-glow {
            position: fixed;
            width: 400px;
            height: 400px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(249,115,22,0.06) 0%, transparent 70%);
            pointer-events: none;
            transform: translate(-50%, -50%);
            z-index: 1;
            transition: left 0.1s, top 0.1s;
          }

          .contact-hero .stat-divider { width: 1px; background: rgba(255,255,255,0.08); align-self: stretch; }

          @keyframes blueprint-flow {
            from { stroke-dashoffset: 24; }
            to { stroke-dashoffset: 0; }
          }
          @keyframes node-float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-4px); }
          }
        `}</style>

      <div className="contact-hero" ref={heroRef}>
        {/* Cursor glow */}
        <div
          className="cursor-glow"
          style={{ left: mousePos.x, top: mousePos.y }}
        />

        <div className={`noise-bg w-full ${loaded ? "" : "opacity-0"}`} style={{ transition: "opacity 0.4s" }}>

          {/* Ambient blobs */}
          <div style={{
            position: "absolute", top: -160, left: -160, width: 700, height: 700,
            borderRadius: "50%", background: "radial-gradient(circle, rgba(249,115,22,0.04) 0%, transparent 70%)",
            pointerEvents: "none", zIndex: 0,
          }} />
          <div style={{
            position: "absolute", bottom: -100, right: -100, width: 500, height: 500,
            borderRadius: "50%", background: "radial-gradient(circle, rgba(251,191,36,0.03) 0%, transparent 70%)",
            pointerEvents: "none", zIndex: 0,
          }} />

          {/* Decorative horizontal rule */}
          <div style={{
            position: "absolute", top: 135, left: 0, right: 0, height: 1,
            background: "linear-gradient(90deg, transparent, rgba(249,115,22,0.15), transparent)",
            pointerEvents: "none",
          }} />

          <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-10">

            {/* ── TOP ROW: badge + stats ── */}
            <div className="fade-up fade-up-1 flex flex-col justify-between gap-6 mb-12 md:flex-row md:items-center">
              {/* Badge */}
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "rgba(249,115,22,0.08)",
                border: "1px solid rgba(249,115,22,0.18)",
                borderRadius: 100, padding: "6px 16px",
              }}>
                <span style={{
                  width: 7, height: 7, borderRadius: "50%",
                  background: "#f97316",
                  animation: "pulse-ring 2s ease-in-out infinite",
                  display: "inline-block",
                }} />
                <span style={{ color: "#fb923c", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>
                  Free Consultation · Limited Slots
                </span>
              </div>

              {/* Inline mini stats */}
              <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
                {[
                  { val: "200+", label: "Projects shipped" },
                  { val: "98%", label: "Satisfaction rate" },
                  { val: "< 24h", label: "Response time" },
                ].map((s, i) => (
                  <Fragment key={i}>
                    {i > 0 && <div className="stat-divider" style={{ margin: "0 20px" }} />}
                    <div style={{ textAlign: "center" }}>
                      <div className="hero-number" style={{ fontSize: "1.35rem", color: "#f97316", fontWeight: 700, lineHeight: 1 }}>{s.val}</div>
                      <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.35)", marginTop: 3, letterSpacing: "0.03em" }}>{s.label}</div>
                    </div>
                  </Fragment>
                ))}
              </div>
            </div>

            {/* ── MAIN TITLE AREA ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-10">
              {/* Left: Copy */}
              <div>
                <h1 className="fade-up fade-up-2 font-bold" style={{
                  fontSize: "clamp(2.5rem, 5vw, 3.8rem)",
                  lineHeight: 1.04,
                  letterSpacing: "-0.045em",
                  color: "#fff",
                  marginBottom: "1.5rem",
                }}>
                  Let's build something{" "}
                  <span className="text-shimmer" style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400 }}>
                    extraordinary
                  </span>{" "}
                  <br />
                  <span style={{ color: "rgba(255,255,255,0.35)" }}>together.</span>
                </h1>

                <p className="fade-up fade-up-3" style={{
                  fontSize: "1rem", color: "rgba(255,255,255,0.45)",
                  lineHeight: 1.7, maxWidth: 440, marginBottom: "2rem",
                }}>
                  Tell us what you're building. Pick a time that works for you or send a message. Our engineering leads join prepared — ready to map out your architecture and deliver real results.
                </p>
              </div>

              {/* Right: Architecture Map Blueprint Visual */}
              <div className="fade-up fade-up-3 hidden md:flex items-center justify-center" style={{ position: "relative", width: "100%", height: 320 }}>
                {/* Ambient glow behind blueprint */}
                <div style={{
                  position: "absolute",
                  width: 280, height: 280,
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(249,115,22,0.06) 0%, transparent 70%)",
                  filter: "blur(50px)",
                  zIndex: 0,
                  pointerEvents: "none",
                }} />

                {/* Blueprint Frame Container */}
                <div className="blueprint-card blueprint-grid" style={{
                  width: 500,
                  height: 280,
                  position: "relative",
                  zIndex: 1,
                  overflow: "hidden",
                }}>
                  {/* Cyber Grid Annotations */}
                  <div style={{ position: "absolute", top: 10, left: 14, fontSize: "9px", fontFamily: "monospace", color: "rgba(255,255,255,0.25)", letterSpacing: "0.05em" }}>
                    [SYS_SCHEMA: SOFTREE_ARCH_v4.2]
                  </div>
                  <div style={{ position: "absolute", top: 10, right: 14, fontSize: "9px", fontFamily: "monospace", color: "rgba(34,197,94,0.6)", letterSpacing: "0.05em", display: "flex", alignItems: "center", gap: 4 }}>
                    <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#22c55e" }} />
                    SCHEMA_OK
                  </div>
                  <div style={{ position: "absolute", bottom: 10, left: 14, fontSize: "9px", fontFamily: "monospace", color: "rgba(255,255,255,0.25)", letterSpacing: "0.05em" }}>
                    [INFRA_SCALE: AUTO_ELASTIC]
                  </div>
                  <div style={{ position: "absolute", bottom: 10, right: 14, fontSize: "9px", fontFamily: "monospace", color: "rgba(249,115,22,0.5)", letterSpacing: "0.05em" }}>
                    SECURE // TLS_1.3
                  </div>

                  {/* SVG Paths Background */}
                  <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }}>
                    <defs>
                      <linearGradient id="flow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#f97316" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.8" />
                      </linearGradient>
                    </defs>

                    {/* Base grey background paths */}
                    <path d="M 105 140 L 150 140 L 150 50 L 195 50" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                    <path d="M 105 140 L 150 140 L 150 230 L 195 230" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                    <path d="M 305 50 L 350 50 L 350 140 L 395 140" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                    <path d="M 305 230 L 350 230 L 350 140 L 395 140" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

                    {/* Animated flowing orange/gold paths */}
                    <path d="M 105 140 L 150 140 L 150 50 L 195 50" fill="none" stroke="url(#flow-gradient)" strokeWidth="1.5" strokeDasharray="4, 12" style={{ animation: "blueprint-flow 2.5s linear infinite" }} />
                    <path d="M 105 140 L 150 140 L 150 230 L 195 230" fill="none" stroke="url(#flow-gradient)" strokeWidth="1.5" strokeDasharray="4, 12" style={{ animation: "blueprint-flow 2.5s linear infinite" }} />
                    <path d="M 305 50 L 350 50 L 350 140 L 395 140" fill="none" stroke="url(#flow-gradient)" strokeWidth="1.5" strokeDasharray="4, 12" style={{ animation: "blueprint-flow 2.5s linear infinite" }} />
                    <path d="M 305 230 L 350 230 L 350 140 L 395 140" fill="none" stroke="url(#flow-gradient)" strokeWidth="1.5" strokeDasharray="4, 12" style={{ animation: "blueprint-flow 2.5s linear infinite" }} />

                    {/* Real-time flowing data packet particles using animateMotion */}
                    <circle r="3" fill="#fff" style={{ filter: "drop-shadow(0 0 4px #f97316)" }}>
                      <animateMotion dur="2.8s" repeatCount="indefinite" path="M 105 140 L 150 140 L 150 50 L 195 50" />
                    </circle>
                    <circle r="3" fill="#fff" style={{ filter: "drop-shadow(0 0 4px #fbbf24)" }}>
                      <animateMotion dur="3.4s" repeatCount="indefinite" path="M 105 140 L 150 140 L 150 230 L 195 230" />
                    </circle>
                    <circle r="3" fill="#fff" style={{ filter: "drop-shadow(0 0 4px #f97316)" }}>
                      <animateMotion dur="2.5s" repeatCount="indefinite" path="M 305 50 L 350 50 L 350 140 L 395 140" />
                    </circle>
                    <circle r="3" fill="#fff" style={{ filter: "drop-shadow(0 0 4px #fbbf24)" }}>
                      <animateMotion dur="3.1s" repeatCount="indefinite" path="M 305 230 L 350 230 L 350 140 L 395 140" />
                    </circle>

                    {/* Connection Node glowing circles */}
                    <circle cx="105" cy="140" r="3.5" fill="#f97316" />
                    <circle cx="105" cy="140" r="1.5" fill="#fff" />
                    <circle cx="195" cy="50" r="2.5" fill="#f97316" />
                    <circle cx="195" cy="230" r="2.5" fill="#f97316" />
                    <circle cx="305" cy="50" r="2.5" fill="#f97316" />
                    <circle cx="305" cy="230" r="2.5" fill="#f97316" />
                    <circle cx="395" cy="140" r="3.5" fill="#f97316" />
                    <circle cx="395" cy="140" r="1.5" fill="#fff" />
                  </svg>

                  {/* HTML Blueprint Nodes */}
                  <div className="blueprint-node" style={{
                    left: 10, top: 110, width: 95, height: 60,
                    border: "1px solid rgba(249,115,22,0.22)",
                    background: "linear-gradient(135deg, rgba(249,115,22,0.08) 0%, rgba(12,10,8,0.92) 100%)",
                    animation: "node-float 6s ease-in-out infinite",
                  }}>
                    <div style={{ position: "absolute", top: 6, right: 8, display: "flex", alignItems: "center", gap: 2 }}>
                      <span className="node-status-dot" style={{ width: 4, height: 4, borderRadius: "50%", background: "#22c55e" }} />
                      <span style={{ fontSize: "6px", fontFamily: "monospace", color: "#22c55e", fontWeight: 700 }}>ACTIVE</span>
                    </div>
                    <span style={{ fontSize: "9px", fontFamily: "monospace", color: "#f97316", fontWeight: 700, letterSpacing: "0.05em" }}>
                      01.FRONTEND
                    </span>
                    <span style={{ fontSize: "11px", fontWeight: 800, color: "#fff", marginTop: 2 }}>
                      WEB & MOBILE
                    </span>
                    <span style={{ fontSize: "8px", color: "rgba(255,255,255,0.35)", fontFamily: "monospace", marginTop: 1 }}>
                      React · Next.js · iOS
                    </span>
                  </div>

                  <div className="blueprint-node" style={{
                    left: 195, top: 20, width: 110, height: 60,
                    border: "1px solid rgba(6,182,212,0.22)",
                    background: "linear-gradient(135deg, rgba(6,182,212,0.08) 0%, rgba(12,10,8,0.92) 100%)",
                    animation: "node-float 6s ease-in-out infinite",
                    animationDelay: "-1.5s",
                  }}>
                    <div style={{ position: "absolute", top: 6, right: 8, display: "flex", alignItems: "center", gap: 2 }}>
                      <span className="node-status-dot" style={{ width: 4, height: 4, borderRadius: "50%", background: "#22c55e" }} />
                      <span style={{ fontSize: "6px", fontFamily: "monospace", color: "#22c55e", fontWeight: 700 }}>READY</span>
                    </div>
                    <span style={{ fontSize: "9px", fontFamily: "monospace", color: "#06b6d4", fontWeight: 700, letterSpacing: "0.05em" }}>
                      02.MICROSOFT
                    </span>
                    <span style={{ fontSize: "11px", fontWeight: 800, color: "#fff", marginTop: 2 }}>
                      POWER APPS
                    </span>
                    <span style={{ fontSize: "8px", color: "rgba(255,255,255,0.35)", fontFamily: "monospace", marginTop: 1 }}>
                      SharePoint · SPFx
                    </span>
                  </div>

                  <div className="blueprint-node" style={{
                    left: 195, top: 200, width: 110, height: 60,
                    border: "1px solid rgba(139,92,246,0.22)",
                    background: "linear-gradient(135deg, rgba(139,92,246,0.08) 0%, rgba(12,10,8,0.92) 100%)",
                    animation: "node-float 6s ease-in-out infinite",
                    animationDelay: "-3s",
                  }}>
                    <div style={{ position: "absolute", top: 6, right: 8, display: "flex", alignItems: "center", gap: 2 }}>
                      <span className="node-status-dot" style={{ width: 4, height: 4, borderRadius: "50%", background: "#22c55e" }} />
                      <span style={{ fontSize: "6px", fontFamily: "monospace", color: "#22c55e", fontWeight: 700 }}>ONLINE</span>
                    </div>
                    <span style={{ fontSize: "9px", fontFamily: "monospace", color: "#8b5cf6", fontWeight: 700, letterSpacing: "0.05em" }}>
                      03.ECOSYSTEM
                    </span>
                    <span style={{ fontSize: "11px", fontWeight: 800, color: "#fff", marginTop: 2 }}>
                      O365 SUITE
                    </span>
                    <span style={{ fontSize: "8px", color: "rgba(255,255,255,0.35)", fontFamily: "monospace", marginTop: 1 }}>
                      Power Automate
                    </span>
                  </div>

                  <div className="blueprint-node" style={{
                    left: 395, top: 110, width: 95, height: 60,
                    border: "1px solid rgba(239,68,68,0.22)",
                    background: "linear-gradient(135deg, rgba(239,68,68,0.08) 0%, rgba(12,10,8,0.92) 100%)",
                    animation: "node-float 6s ease-in-out infinite",
                    animationDelay: "-4.5s",
                    boxShadow: "0 0 15px rgba(239,68,68,0.06)",
                  }}>
                    <div style={{ position: "absolute", top: 6, right: 8, display: "flex", alignItems: "center", gap: 2 }}>
                      <span className="node-status-dot" style={{ width: 4, height: 4, borderRadius: "50%", background: "#22c55e" }} />
                      <span style={{ fontSize: "6px", fontFamily: "monospace", color: "#22c55e", fontWeight: 700 }}>LIVE</span>
                    </div>
                    <span style={{ fontSize: "9px", fontFamily: "monospace", color: "#ef4444", fontWeight: 700, letterSpacing: "0.05em" }}>
                      04.CORE AI
                    </span>
                    <span style={{ fontSize: "11px", fontWeight: 800, color: "#fff", marginTop: 2 }}>
                      AI ENGINE
                    </span>
                    <span style={{ fontSize: "8px", color: "rgba(255,255,255,0.35)", fontFamily: "monospace", marginTop: 1 }}>
                      Cognitive · LLMs
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Live office clocks */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.75, ease: [0.21, 1.02, 0.73, 1] }}
              className="mt-16 grid gap-3 sm:grid-cols-3"
            >
              {CONTACT_OFFICE_CLOCKS.map((office) => (
                <div
                  key={office.city}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40">
                    {office.city}
                  </p>
                  <p className="mt-1 font-mono text-[22px] font-medium tabular-nums tracking-tight text-white">
                    {times[office.city] ?? "—"}
                  </p>
                  <p className="mt-0.5 text-[11px] text-white/30">{office.label} now</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
