"use client";

import { useEffect, useState, useRef, Fragment } from "react";
import NavigationClient from "@/components/sections/navigation-client";
import Footer from "@/components/sections/footer";

declare global {
  interface Window {
    Calendly: {
      initInlineWidgets: () => void;
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
        prefill?: Record<string, any>;
        pageSettings?: {
          backgroundColor?: string;
          textColor?: string;
          primaryColor?: string;
        };
      }) => void;
    };
  }
}

const meetingTypes = [
  { icon: "🔍", label: "Discovery Call", duration: "30 min", url: "https://calendly.com/shradhabhagat/new-meeting" },
  { icon: "⚙️", label: "Technical Deep-Dive", duration: "60 min", url: "https://calendly.com/shradhabhagat/new-meeting" },
  { icon: "🎯", label: "Solution Demo", duration: "45 min", url: "https://calendly.com/shradhabhagat/new-meeting" },
  { icon: "🤝", label: "Partnership Talk", duration: "30 min", url: "https://calendly.com/shradhabhagat/new-meeting" },
];

const testimonials = [
  {
    initials: "AM",
    gradient: "from-orange-500 to-rose-600",
    name: "Asif Mohamed",
    role: "Adiva Information Technology LLC, UAE",
    text: "A trusted technology solutions provider with strong expertise in security, compliance, and enterprise delivery.",
  },
  {
    initials: "RR",
    gradient: "from-amber-500 to-orange-600",
    name: "Rahi Radhakrishnan",
    role: "Nuvento, USA",
    text: "Softree demonstrated strong expertise in PowerApps development and delivered the project with excellent communication, responsiveness, and coordination throughout the engagement.",
  },
  {
    initials: "DT",
    gradient: "from-orange-600 to-red-700",
    name: "Darrell Trimble",
    role: "CEO, SP Marketplace, California",
    text: "SOFTREE staff worked with us to learn our installation automation technology and built exactly what we needed.",
  },
];

const trustItems = [
  { icon: "✓", text: "No commitment required" },
  { icon: "⏱", text: "Instant calendar invite" },
  { icon: "🛡", text: "100% free consultation" },
  { icon: "👥", text: "Senior engineers on every call" },
];

export default function BookMeeting() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const [calendlyUrl, setCalendlyUrl] = useState(
    "https://calendly.com/shradhabhagat/new-meeting?hide_gdpr_banner=1&hide_landing_page_details=1"
  );

  const initCalendly = () => {
    if (typeof window !== "undefined") {
      const run = () => {
        if (window.Calendly && typeof window.Calendly.initInlineWidget === "function") {
          const container = document.getElementById("calendly-container");
          if (container) {
            container.innerHTML = "";
            window.Calendly.initInlineWidget({
              url: calendlyUrl,
              parentElement: container,
              prefill: {},
              pageSettings: {
                backgroundColor: "0c0a08",
                textColor: "f5e6d3",
                primaryColor: "f97316",
              }
            });
            return true;
          }
        }
        return false;
      };

      if (!run()) {
        let attempts = 0;
        const interval = setInterval(() => {
          if (run() || attempts > 50) {
            clearInterval(interval);
          }
          attempts++;
        }, 100);
      }
    }
  };

  useEffect(() => {
    setLoaded(true);
    const existingScript = document.getElementById("calendly-script");

    const onLoad = () => {
      initCalendly();
    };

    if (!existingScript) {
      const script = document.createElement("script");
      script.id = "calendly-script";
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      script.onload = onLoad;
      document.body.appendChild(script);
    } else {
      initCalendly();
    }
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://assets.calendly.com/assets/external/widget.css";
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      initCalendly();
    }, 150);
    return () => clearTimeout(timeout);
  }, [calendlyUrl]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleSelectType = (index: number, url: string) => {
    setActiveIndex(index);
    setCalendlyUrl(`${url}?hide_gdpr_banner=1&hide_landing_page_details=1`);
  };

  return (
    <>
      <NavigationClient />
      <title>Book a Meeting | Softree Technology</title>
      <meta name="description" content="Book a free consultation with Softree Technology's engineering team." />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@400;500;700;800;900&family=Instrument+Serif:ital@0;1&display=swap"
        rel="stylesheet"
      />
      <style>{`
          /* Premium Custom Scrollbars */
          ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }
          ::-webkit-scrollbar-track {
            background: #0c0a08;
          }
          ::-webkit-scrollbar-thumb {
            background: rgba(249, 115, 22, 0.3);
            border-radius: 99px;
            border: 2px solid #0c0a08;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: rgba(249, 115, 22, 0.6);
          }

          body {
            background: #0c0a08;
            font-family: 'Cabinet Grotesk', sans-serif;
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
          @keyframes orbit {
            from { transform: rotate(0deg) translateX(110px) rotate(0deg); }
            to   { transform: rotate(360deg) translateX(110px) rotate(-360deg); }
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

          .fade-up { animation: fadeUp 0.7s cubic-bezier(.16,1,.3,1) both; }
          .fade-up-1 { animation-delay: 0.05s; }
          .fade-up-2 { animation-delay: 0.15s; }
          .fade-up-3 { animation-delay: 0.25s; }
          .fade-up-4 { animation-delay: 0.38s; }
          .fade-up-5 { animation-delay: 0.5s; }
          .fade-up-6 { animation-delay: 0.62s; }
          .fade-in   { animation: fadeIn 1s ease both; }

          .text-shimmer {
            background: linear-gradient(90deg, #f97316, #fbbf24, #fb923c, #f97316);
            background-size: 200% auto;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: shimmer 3s linear infinite;
          }

          .pill-active {
            background: linear-gradient(135deg, rgba(249,115,22,0.18), rgba(251,191,36,0.1));
            border-color: rgba(249,115,22,0.7);
            box-shadow: 0 0 20px rgba(249,115,22,0.15), inset 0 1px 0 rgba(255,255,255,0.05);
          }

          .glow-card {
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0.005) 100%);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(249, 115, 22, 0.15);
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05);
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .glow-card:hover {
            border-color: rgba(249, 115, 22, 0.4);
            box-shadow: 0 30px 80px rgba(0, 0, 0, 0.55), 0 0 40px rgba(249, 115, 22, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.08);
            transform: translateY(-6px) scale(1.015);
          }

          .noise-bg::before {
            content: '';
            position: fixed;
            inset: 0;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
            pointer-events: none;
            z-index: 0;
            opacity: 0.4;
          }

          .hero-number {
            font-family: 'Instrument Serif', serif;
            font-style: italic;
          }

          .ring-spin {
            animation: spin-slow 18s linear infinite;
          }
          .ring-counter {
            animation: counter-spin 18s linear infinite;
          }

          .cursor-glow {
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

          .stat-divider { width: 1px; background: rgba(255,255,255,0.08); align-self: stretch; }

          .nav-link {
            position: relative;
            color: rgba(255,255,255,0.45);
            font-size: 0.8125rem;
            font-weight: 500;
            letter-spacing: 0.01em;
            text-decoration: none;
            transition: color 0.2s;
          }
          .nav-link::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            right: 0;
            height: 1px;
            background: #f97316;
            transform: scaleX(0);
            transition: transform 0.2s;
          }
          .nav-link:hover { color: #fff; }
          .nav-link:hover::after { transform: scaleX(1); }

          .back-btn {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            font-size: 0.8rem;
            font-weight: 600;
            color: #f97316;
            background: rgba(249,115,22,0.08);
            border: 1px solid rgba(249,115,22,0.2);
            border-radius: 10px;
            padding: 6px 14px;
            text-decoration: none;
            transition: background 0.2s, border-color 0.2s, transform 0.2s;
            letter-spacing: 0.02em;
          }
          .back-btn:hover {
            background: rgba(249,115,22,0.15);
            border-color: rgba(249,115,22,0.5);
            transform: translateX(-2px);
          }

          /* Architecture Blueprint Map Animations */
          @keyframes blueprint-flow {
            from { stroke-dashoffset: 24; }
            to { stroke-dashoffset: 0; }
          }
          @keyframes blueprint-pulse {
            0% { r: 3px; opacity: 1; }
            100% { r: 12px; opacity: 0; }
          }
          @keyframes node-float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-4px); }
          }

          .blueprint-card {
            background: linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.005) 100%);
            border: 1px solid rgba(255,255,255,0.06);
            border-radius: 20px;
            box-shadow: 0 30px 70px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.03);
          }

          .blueprint-grid {
            background-size: 20px 20px;
            background-image: 
              linear-gradient(to right, rgba(255, 255, 255, 0.015) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.015) 1px, transparent 1px);
          }

          .blueprint-node {
            background: rgba(12, 10, 8, 0.85);
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
          .blueprint-node:hover {
            border-color: rgba(249, 115, 22, 0.4) !important;
            box-shadow: 0 0 20px rgba(249, 115, 22, 0.1), inset 0 1px 0 rgba(255,255,255,0.05);
            transform: translateY(-2px);
          }
          @keyframes status-pulse {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
          }
          .node-status-dot {
            animation: status-pulse 1.5s ease-in-out infinite;
          }
        `}</style>

      {/* Cursor glow */}
      <div
        className="cursor-glow"
        style={{ left: mousePos.x, top: mousePos.y }}
      />

      <div className={`noise-bg min-h-screen bg-[#0c0a08] text-white overflow-x-hidden ${loaded ? "" : "opacity-0"}`} style={{ transition: "opacity 0.4s" }}>

        {/* Ambient blobs */}
        <div style={{
          position: "fixed", top: -160, left: -160, width: 700, height: 700,
          borderRadius: "50%", background: "radial-gradient(circle, rgba(249,115,22,0.07) 0%, transparent 70%)",
          pointerEvents: "none", zIndex: 0,
        }} />
        <div style={{
          position: "fixed", bottom: -100, right: -100, width: 500, height: 500,
          borderRadius: "50%", background: "radial-gradient(circle, rgba(251,191,36,0.05) 0%, transparent 70%)",
          pointerEvents: "none", zIndex: 0,
        }} />
        <div style={{
          position: "fixed", top: "40%", left: "55%", width: 300, height: 300,
          borderRadius: "50%", background: "radial-gradient(circle, rgba(249,115,22,0.04) 0%, transparent 70%)",
          pointerEvents: "none", zIndex: 0,
        }} />

        {/* ─── HERO ────────────────────────────────────── */}
        <section ref={heroRef} className="relative z-10" style={{ paddingTop: "8rem", paddingBottom: "2rem" }}>

          {/* Decorative horizontal rule */}
          <div style={{
            position: "absolute", top: 135, left: 0, right: 0, height: 1,
            background: "linear-gradient(90deg, transparent, rgba(249,115,22,0.15), transparent)",
            pointerEvents: "none",
          }} />

          <div className="max-w-6xl mx-auto px-6 md:px-10">

            {/* ── TOP ROW: badge + stats ── */}
            <div className="fade-up fade-up-1 flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">

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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-14">

              {/* Left: Copy */}
              <div>
                <h1 className="fade-up fade-up-2" style={{
                  fontSize: "clamp(2.5rem, 5vw, 3.8rem)",
                  fontWeight: 900,
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
                  Pick a time that works for you. Our engineering leads join prepared — ready to map out your architecture, challenge your assumptions, and deliver real results.
                </p>

                {/* CTA hint */}
                <div className="fade-up fade-up-4" style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: "50%",
                    background: "linear-gradient(135deg, rgba(249,115,22,0.15), rgba(251,191,36,0.08))",
                    border: "1px solid rgba(249,115,22,0.2)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 16,
                  }}>👇</div>
                  <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.03em" }}>
                    Choose a meeting type below, then pick your slot
                  </span>
                </div>
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
                    {/* Path Definitions for gradients */}
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

                  {/* Node 1: Frontend Web & Mobile */}
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

                  {/* Node 2: Power Apps & SharePoint */}
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

                  {/* Node 3: O365 Suite */}
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

                  {/* Node 4: AI Core Model */}
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

            {/* ── MEETING TYPE PILLS ── */}
            <div className="fade-up fade-up-5 flex flex-wrap gap-3">
              {meetingTypes.map((type, i) => (
                <button
                  key={i}
                  onClick={() => handleSelectType(i, type.url)}
                  style={{
                    display: "flex", alignItems: "center", gap: 8,
                    padding: "10px 18px",
                    borderRadius: 100,
                    border: `1px solid ${activeIndex === i ? "rgba(249,115,22,0.65)" : "rgba(255,255,255,0.08)"}`,
                    background: activeIndex === i
                      ? "linear-gradient(135deg, rgba(249,115,22,0.16), rgba(251,191,36,0.08))"
                      : "rgba(255,255,255,0.025)",
                    color: activeIndex === i ? "#fff" : "rgba(255,255,255,0.6)",
                    fontSize: "0.875rem", fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.2s",
                    boxShadow: activeIndex === i ? "0 0 24px rgba(249,115,22,0.12)" : "none",
                    fontFamily: "'Cabinet Grotesk', sans-serif",
                  }}
                >
                  <span>{type.icon}</span>
                  <span>{type.label}</span>
                  <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.75rem" }}>· {type.duration}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CALENDLY EMBED ──────────────────────────── */}
        <div className="relative z-10 max-w-[850px] mx-auto px-4 md:px-6 pb-10">
          <div className="fade-up fade-up-6" style={{
            position: "relative",
            borderRadius: "24px",
            padding: "1px",
            background: "linear-gradient(135deg, rgba(249, 115, 22, 0.4) 0%, rgba(251, 191, 36, 0.15) 40%, rgba(255, 255, 255, 0.05) 100%)",
            boxShadow: "0 30px 70px -15px rgba(0, 0, 0, 0.9), 0 0 40px rgba(249, 115, 22, 0.12)",
          }}>
            <div style={{
              borderRadius: "23px",
              overflow: "hidden",
              background: "#ffffff",
              position: "relative",
            }}>
              {/* Top accent bar */}
              <div style={{
                height: 4,
                background: "linear-gradient(90deg, #f97316, #fbbf24, #fb923c)",
              }} />
              <div
                id="calendly-container"
                style={{ minWidth: 320, height: 700, background: "#ffffff" }}
              />
            </div>
          </div>
        </div>

        {/* ─── TRUST ROW ───────────────────────────────── */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 pb-16">
          <div style={{
            display: "flex", flexWrap: "wrap", justifyContent: "center",
            gap: "12px 24px",
          }}>
            {trustItems.map((item, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 10,
                fontSize: "0.8125rem", color: "rgba(255,255,255,0.4)",
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 8,
                  background: "rgba(249,115,22,0.08)",
                  border: "1px solid rgba(249,115,22,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#f97316", fontSize: "0.75rem", fontWeight: 700,
                }}>
                  {item.icon}
                </div>
                {item.text}
              </div>
            ))}
          </div>
        </div>

        {/* ─── DIVIDER ─────────────────────────────────── */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 mb-14">
          <div style={{
            height: 1,
            background: "linear-gradient(90deg, transparent, rgba(249,115,22,0.12), rgba(251,191,36,0.08), transparent)",
          }} />
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            marginTop: -10,
          }}>
            <div style={{
              padding: "4px 16px", borderRadius: 100,
              background: "#0c0a08",
              border: "1px solid rgba(249,115,22,0.15)",
              color: "rgba(249,115,22,0.6)",
              fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}>
              What clients say
            </div>
          </div>
        </div>

        {/* ─── TESTIMONIALS ────────────────────────────── */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 pb-28 grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="glow-card relative overflow-hidden flex flex-col justify-between"
              style={{
                borderRadius: "24px",
                padding: "32px 28px",
                minHeight: "310px",
              }}
            >
              {/* Card top gradient accent glow matching avatar */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: "3px",
                backgroundImage: `linear-gradient(90deg, transparent 15%, ${t.gradient.includes("orange-500") ? "#f97316" : t.gradient.includes("amber-500") ? "#f59e0b" : "#ea580c"} 50%, transparent 85%)`,
                opacity: 0.8,
              }} />

              <div>
                {/* Header row: Stars */}
                <div style={{ display: "flex", alignItems: "center", marginBottom: "18px" }}>
                  {/* Glowing gold stars */}
                  <div style={{ display: "flex", gap: "4px" }}>
                    {[...Array(5)].map((_, s) => (
                      <svg key={s} viewBox="0 0 24 24" fill="#f59e0b" style={{ width: "16px", height: "16px", filter: "drop-shadow(0 0 5px rgba(245, 158, 11, 0.45))" }}>
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                </div>

                {/* Elegant serif quote icon with gradient fill */}
                <svg viewBox="0 0 24 24" style={{ width: "32px", height: "32px", marginBottom: "16px", display: "block" }}>
                  <defs>
                    <linearGradient id={`quote-grad-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f97316" />
                      <stop offset="100%" stopColor="#fbbf24" />
                    </linearGradient>
                  </defs>
                  <path 
                    fill={`url(#quote-grad-${i})`}
                    style={{ filter: "drop-shadow(0 2px 5px rgba(249, 115, 22, 0.25))" }}
                    d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.987z" 
                  />
                </svg>

                {/* Testimonial Quote Text */}
                <p style={{
                  fontSize: "0.92rem",
                  color: "rgba(255, 255, 255, 0.82)",
                  lineHeight: "1.75",
                  fontWeight: 450,
                  marginBottom: "28px",
                  marginTop: 0,
                  letterSpacing: "0.01em",
                }}>
                  {t.text}
                </p>
              </div>

              {/* Author footer */}
              <div style={{ display: "flex", alignItems: "center", gap: "14px", marginTop: "auto" }}>
                {/* Avatar with gradient border & glow */}
                <div style={{ position: "relative", flexShrink: 0 }}>
                  {/* Subtle pulsing glow behind avatar */}
                  <div style={{
                    position: "absolute", inset: "-3px", borderRadius: "50%",
                    backgroundImage: `linear-gradient(135deg, ${t.gradient.includes("orange-500") ? "#f97316" : t.gradient.includes("amber-500") ? "#f59e0b" : "#ea580c"}, ${t.gradient.includes("rose-600") ? "#e11d48" : t.gradient.includes("orange-600") ? "#ea580c" : "#b91c1c"})`,
                    filter: "blur(6px)", opacity: 0.45,
                  }} />
                  {/* Avatar Circle */}
                  <div style={{
                    position: "relative",
                    width: "42px", height: "42px", borderRadius: "50%",
                    backgroundImage: `linear-gradient(135deg, ${t.gradient.includes("orange-500") ? "#f97316" : t.gradient.includes("amber-500") ? "#f59e0b" : "#ea580c"}, ${t.gradient.includes("rose-600") ? "#e11d48" : t.gradient.includes("orange-600") ? "#ea580c" : "#b91c1c"})`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#fff", fontSize: "0.85rem", fontWeight: 800,
                    boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                  }}>
                    {t.initials}
                  </div>
                </div>

                {/* Author Name & Info */}
                <div style={{ overflow: "hidden" }}>
                  <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#fff", letterSpacing: "0.01em" }}>
                    {t.name}
                  </div>
                  <div style={{
                    fontSize: "0.72rem",
                    color: "rgba(255, 255, 255, 0.4)",
                    marginTop: "3px",
                    fontWeight: 500,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    letterSpacing: "0.02em"
                  }}>
                    {t.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>



        <Footer />
      </div>
    </>
  );
}