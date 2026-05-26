"use client";

import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────
   Types
 ───────────────────────────────────────────── */
interface Service {
    id: number;
    number: string;
    title: string;
    description: string;
    tags: string[];
    icon: string;
    accentColor: string;
    glowColor: string;
    gradient: string;
}

/* ─────────────────────────────────────────────
   Data
 ───────────────────────────────────────────── */
const SERVICES: Service[] = [
    {
        id: 1,
        number: "01",
        title: "Legacy Application Modernization",
        description:
            "Transform aging desktop, web, and enterprise applications into modern cloud-ready systems built for speed, scale, and longevity.",
        tags: ["Re-architecture", "Cloud-native", "Microservices"],
        icon: "🏗️",
        accentColor: "#ff5812",
        glowColor: "rgba(255, 88, 18, 0.12)",
        gradient: "linear-gradient(135deg, rgba(255, 88, 18, 0.08) 0%, transparent 60%)",
    },
    {
        id: 2,
        number: "02",
        title: "Workflow & Process Modernization",
        description:
            "Replace manual and outdated workflows with intelligent automation solutions that eliminate bottlenecks and accelerate delivery.",
        tags: ["RPA", "Process Mining", "Automation"],
        icon: "⚙️",
        accentColor: "#ff5812",
        glowColor: "rgba(255, 88, 18, 0.12)",
        gradient: "linear-gradient(135deg, rgba(255, 88, 18, 0.08) 0%, transparent 60%)",
    },
    {
        id: 3,
        number: "03",
        title: "Cloud Migration",
        description:
            "Migrate applications, infrastructure, and data to scalable cloud environments with zero-downtime strategies and full security compliance.",
        tags: ["AWS", "Azure", "GCP", "Lift & Shift"],
        icon: "☁️",
        accentColor: "#ff5812",
        glowColor: "rgba(255, 88, 18, 0.12)",
        gradient: "linear-gradient(135deg, rgba(255, 88, 18, 0.08) 0%, transparent 60%)",
    },
    {
        id: 4,
        number: "04",
        title: "Data & Reporting Modernization",
        description:
            "Modernize reporting systems with real-time dashboards and analytics platforms that turn raw data into actionable intelligence.",
        tags: ["BI Dashboards", "Data Pipelines", "Real-time"],
        icon: "📊",
        accentColor: "#ff5812",
        glowColor: "rgba(255, 88, 18, 0.12)",
        gradient: "linear-gradient(135deg, rgba(255, 88, 18, 0.08) 0%, transparent 60%)",
    },
    {
        id: 5,
        number: "05",
        title: "AI-Led Modernization",
        description:
            "Integrate AI automation, copilots, and intelligent workflows into core business operations to unlock productivity at scale.",
        tags: ["LLM Integration", "Copilots", "AI Workflows"],
        icon: "🤖",
        accentColor: "#ff5812",
        glowColor: "rgba(255, 88, 18, 0.12)",
        gradient: "linear-gradient(135deg, rgba(255, 88, 18, 0.08) 0%, transparent 60%)",
    },
    {
        id: 6,
        number: "06",
        title: "UI/UX Modernization",
        description:
            "Upgrade outdated interfaces into responsive, accessible modern user experiences that increase adoption and reduce training time.",
        tags: ["Design Systems", "Responsive", "Accessibility"],
        icon: "✦",
        accentColor: "#ff5812",
        glowColor: "rgba(255, 88, 18, 0.12)",
        gradient: "linear-gradient(135deg, rgba(255, 88, 18, 0.08) 0%, transparent 60%)",
    },
];

/* ─────────────────────────────────────────────
   Hook — Intersection Observer
 ───────────────────────────────────────────── */
function useReveal(threshold = 0.1) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([e]) => {
                if (e.isIntersecting) {
                    setVisible(true);
                    obs.disconnect();
                }
            },
            { threshold }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [threshold]);
    return { ref, visible };
}

/* ─────────────────────────────────────────────
   Background decorations
 ───────────────────────────────────────────── */
function NoiseBg() {
    return (
        <svg
            aria-hidden
            className="noise-bg"
            xmlns="http://www.w3.org/2000/svg"
            style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                opacity: 0.04,
                pointerEvents: "none",
            }}
        >
            <filter id="n2">
                <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.65"
                    numOctaves="3"
                    stitchTiles="stitch"
                />
                <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#n2)" />
        </svg>
    );
}

function GridLines() {
    return (
        <svg
            aria-hidden
            style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
                opacity: 0.05,
            }}
        >
            {Array.from({ length: 8 }).map((_, i) => (
                <line
                    key={i}
                    x1={`${i * 14.28}%`}
                    y1="0"
                    x2={`${i * 14.28}%`}
                    y2="100%"
                    stroke="#000000"
                    strokeWidth="0.5"
                />
            ))}
            {Array.from({ length: 12 }).map((_, i) => (
                <line
                    key={i}
                    x1="0"
                    y1={`${i * 9.09}%`}
                    x2="100%"
                    y2={`${i * 9.09}%`}
                    stroke="#000000"
                    strokeWidth="0.5"
                />
            ))}
        </svg>
    );
}

/* ─────────────────────────────────────────────
   Featured large card (first service)
 ───────────────────────────────────────────── */
function FeaturedCard({ service, visible, isMobile }: { service: Service; visible: boolean; isMobile: boolean }) {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                gridColumn: "1 / -1",
                position: "relative",
                background: hovered
                    ? "linear-gradient(135deg, #ffffff 0%, #f5f5f7 100%)"
                    : "linear-gradient(135deg, #fafafa 0%, #f0f0f2 100%)",
                border: `2px solid ${hovered ? service.accentColor : "#eaeaea"}`,
                borderRadius: "20px",
                padding: isMobile ? "24px 20px" : "48px",
                overflow: "hidden",
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 340px",
                gap: isMobile ? "20px" : "40px",
                alignItems: "center",
                cursor: "default",
                transition:
                    "border-color 0.35s ease, transform 0.35s ease, box-shadow 0.35s ease, opacity 0.7s ease",
                boxShadow: hovered
                    ? `0 20px 48px rgba(255, 88, 18, 0.08), 0 0 0 1px ${service.accentColor}22`
                    : "0 2px 12px rgba(0,0,0,0.02)",
                opacity: visible ? 1 : 0,
                transform: visible
                    ? hovered
                        ? "translateY(-4px)"
                        : "translateY(0)"
                    : "translateY(30px)",
            }}
        >
            {/* Background gradient wash */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background: service.gradient,
                    opacity: hovered ? 1 : 0.4,
                    transition: "opacity 0.4s",
                    pointerEvents: "none",
                }}
            />

            {/* Top accent */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "3px",
                    background: service.accentColor,
                    opacity: hovered ? 1 : 0.8,
                    transition: "opacity 0.3s",
                }}
            />

            {/* Left: content */}
            <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                    <span
                        style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "11px",
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                            color: service.accentColor,
                            fontWeight: 700,
                        }}
                    >
                        {service.number}
                    </span>
                    <div style={{ height: "1px", width: "32px", background: service.accentColor + "44" }} />
                    <span
                        style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "11px",
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                            color: "#000000",
                            fontWeight: 700,
                        }}
                    >
                        Featured Service
                    </span>
                </div>

                <h2
                    style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                        fontWeight: 700,
                        color: "#000000",
                        margin: "0 0 16px",
                        letterSpacing: "-0.025em",
                        lineHeight: 1.1,
                    }}
                >
                    {service.title}
                </h2>
                <p
                    style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "15px",
                        fontWeight: 500,
                        color: "#000000",
                        lineHeight: 1.75,
                        margin: "0 0 28px",
                        maxWidth: "480px",
                    }}
                >
                    {service.description}
                </p>

                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    {service.tags.map((tag) => (
                        <span
                            key={tag}
                            style={{
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: "11px",
                                fontWeight: 700,
                                letterSpacing: "0.08em",
                                textTransform: "uppercase",
                                color: service.accentColor,
                                background: service.accentColor + "12",
                                border: `1px solid ${service.accentColor}33`,
                                borderRadius: "6px",
                                padding: "5px 10px",
                            }}
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Right: large icon display */}
            <div
                style={{
                    position: "relative",
                    zIndex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "180px",
                }}
            >
                <div
                    style={{
                        fontSize: "80px",
                        lineHeight: 1,
                        transition: "transform 0.4s",
                        transform: hovered ? "scale(1.1) rotate(-4deg)" : "scale(1)",
                    }}
                >
                    {service.icon}
                </div>
                {/* Ring decoration */}
                <div
                    style={{
                        position: "absolute",
                        width: "160px",
                        height: "160px",
                        borderRadius: "50%",
                        border: `1px solid ${service.accentColor}22`,
                        animation: "spin-slow 20s linear infinite",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        width: "200px",
                        height: "200px",
                        borderRadius: "50%",
                        border: `1px dashed ${service.accentColor}11`,
                        animation: "spin-slow 30s linear infinite reverse",
                    }}
                />
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────
   Standard service card
 ───────────────────────────────────────────── */
function ServiceCard({
    service,
    index,
    visible,
}: {
    service: Service;
    index: number;
    visible: boolean;
}) {
    const [hovered, setHovered] = useState(false);
    const delay = `${index * 70}ms`;

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                position: "relative",
                background: hovered
                    ? "linear-gradient(135deg, #ffffff 0%, #f5f5f7 100%)"
                    : "linear-gradient(135deg, #fafafa 0%, #f0f0f2 100%)",
                border: `2px solid ${hovered ? service.accentColor : "#eaeaea"}`,
                borderRadius: "16px",
                padding: "32px 28px 28px",
                overflow: "hidden",
                cursor: "default",
                opacity: visible ? 1 : 0,
                transform: visible
                    ? hovered
                        ? "translateY(-4px)"
                        : "translateY(0)"
                    : "translateY(28px)",
                transition:
                    "border-color 0.3s, box-shadow 0.3s, opacity 0.55s, transform 0.55s",
                transitionDelay: visible ? delay : "0ms",
                boxShadow: hovered
                    ? `0 20px 48px rgba(255, 88, 18, 0.08), 0 0 0 1px ${service.accentColor}22`
                    : "0 2px 12px rgba(0,0,0,0.02)",
            }}
        >
            {/* BG gradient wash */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background: service.gradient,
                    opacity: hovered ? 0.8 : 0.3,
                    transition: "opacity 0.4s",
                    pointerEvents: "none",
                }}
            />

            {/* Top bar */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "3px",
                    background: service.accentColor,
                    opacity: hovered ? 1 : 0.8,
                    transition: "opacity 0.3s",
                }}
            />

            {/* Glow orb */}
            <div
                style={{
                    position: "absolute",
                    top: "-50px",
                    right: "-30px",
                    width: "140px",
                    height: "140px",
                    borderRadius: "50%",
                    background: service.glowColor,
                    filter: "blur(50px)",
                    opacity: hovered ? 1 : 0,
                    transition: "opacity 0.4s",
                    pointerEvents: "none",
                }}
            />

            {/* Content */}
            <div style={{ position: "relative", zIndex: 1 }}>
                {/* Number + icon row */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
                    <span
                        style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "11px",
                            fontWeight: 700,
                            letterSpacing: "0.18em",
                            color: service.accentColor,
                        }}
                    >
                        {service.number}
                    </span>
                    <div
                        style={{
                            fontSize: "26px",
                            lineHeight: 1,
                            transition: "transform 0.35s",
                            transform: hovered ? "scale(1.15) rotate(-6deg)" : "scale(1)",
                        }}
                    >
                        {service.icon}
                    </div>
                </div>

                <h3
                    style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "15px",
                        fontWeight: 700,
                        color: "#000000",
                        margin: "0 0 10px",
                        letterSpacing: "-0.01em",
                        lineHeight: 1.25,
                    }}
                >
                    {service.title}
                </h3>

                <p
                    style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "13px",
                        fontWeight: 500,
                        color: "#000000",
                        lineHeight: 1.7,
                        margin: "0 0 20px",
                    }}
                >
                    {service.description}
                </p>

                {/* Tags */}
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {service.tags.map((tag) => (
                        <span
                            key={tag}
                            style={{
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: "10px",
                                fontWeight: 700,
                                letterSpacing: "0.07em",
                                textTransform: "uppercase",
                                color: service.accentColor,
                                background: service.accentColor + "12",
                                border: `1px solid ${service.accentColor}2a`,
                                borderRadius: "5px",
                                padding: "3px 8px",
                            }}
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────
   Main Component
 ───────────────────────────────────────────── */
export default function ModernizeSection() {
    const { ref: heroRef, visible: heroVisible } = useReveal(0.1);
    const { ref: featuredRef, visible: featuredVisible } = useReveal(0.05);
    const { ref: gridRef, visible: gridVisible } = useReveal(0.05);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const remaining = SERVICES.slice(1);

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');
        * { box-sizing: border-box; }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes pulse-dot {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:0.4; transform:scale(0.7); }
        }
        @keyframes marquee2 {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scanline {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
      `}</style>

            <section
                style={{
                    position: "relative",
                    background: "#ffffff",
                    overflow: "hidden",
                    fontFamily: "'DM Sans', sans-serif",
                }}
            >
                <NoiseBg />
                <GridLines />

                {/* Scanline effect */}
                <div
                    aria-hidden
                    style={{
                        position: "absolute",
                        inset: 0,
                        background:
                            "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.015) 50%)",
                        backgroundSize: "100% 4px",
                        pointerEvents: "none",
                        zIndex: 0,
                        opacity: 0.3,
                    }}
                />

                {/* Moving scanline */}
                <div
                    aria-hidden
                    style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        height: "2px",
                        background:
                            "linear-gradient(to bottom, transparent, rgba(0,0,0,0.015), transparent)",
                        animation: "scanline 8s linear infinite",
                        pointerEvents: "none",
                        zIndex: 1,
                    }}
                />

                {/* Ambient glow — top right */}
                <div
                    aria-hidden
                    style={{
                        position: "absolute",
                        top: "-180px",
                        right: "-180px",
                        width: "500px",
                        height: "500px",
                        borderRadius: "50%",
                        background:
                            "radial-gradient(circle,rgba(255, 88, 18, 0.05) 0%,transparent 70%)",
                        pointerEvents: "none",
                    }}
                />
                {/* Ambient glow — bottom left */}
                <div
                    aria-hidden
                    style={{
                        position: "absolute",
                        bottom: "-180px",
                        left: "-100px",
                        width: "500px",
                        height: "500px",
                        borderRadius: "50%",
                        background:
                            "radial-gradient(circle,rgba(255, 88, 18, 0.03) 0%,transparent 70%)",
                        pointerEvents: "none",
                    }}
                />

                <div
                    style={{
                        position: "relative",
                        zIndex: 2,
                        maxWidth: "1280px",
                        margin: "0 auto",
                        padding: isMobile ? "40px 16px 60px" : "100px 40px 100px",
                    }}
                >
                    {/* ── HEADER ── */}
                    <div ref={heroRef} style={{ marginBottom: "64px" }}>
                        {/* Label row */}
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                marginBottom: "28px",
                                opacity: heroVisible ? 1 : 0,
                                transform: heroVisible ? "none" : "translateY(12px)",
                                transition: "opacity 0.6s ease, transform 0.6s ease",
                            }}
                        >
                            <span
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "6px",
                                    fontFamily: "'DM Sans', sans-serif",
                                    fontSize: "11px",
                                    fontWeight: 700,
                                    letterSpacing: "0.2em",
                                    textTransform: "uppercase",
                                    color: "#ff5812",
                                }}
                            >
                                <span
                                    style={{
                                        width: "6px",
                                        height: "6px",
                                        borderRadius: "50%",
                                        background: "#ff5812",
                                        display: "inline-block",
                                        animation: "pulse-dot 2s ease-in-out infinite",
                                    }}
                                />
                                Section 02
                            </span>
                            <div style={{ flex: 1, height: "1px", background: "#ff5812" }} />
                            <span
                                style={{
                                    fontSize: "11px",
                                    letterSpacing: "0.2em",
                                    textTransform: "uppercase",
                                    color: "#000000",
                                    fontFamily: "'DM Sans', sans-serif",
                                    fontWeight: 700,
                                }}
                            >
                                What We Modernize
                            </span>
                        </div>

                        {/* Headline */}
                        <h1
                            style={{
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
                                fontWeight: 700,
                                color: "#000000",
                                lineHeight: 1.1,
                                margin: "0 0 22px",
                                letterSpacing: "-0.02em",
                                opacity: heroVisible ? 1 : 0,
                                transform: heroVisible ? "none" : "translateY(22px)",
                                transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
                            }}
                        >
                            End-to-End Legacy Modernization Services
                        </h1>

                        <p
                            style={{
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: "15px",
                                fontWeight: 500,
                                color: "#000000",
                                lineHeight: 1.75,
                                maxWidth: "520px",
                                margin: 0,
                                opacity: heroVisible ? 1 : 0,
                                transform: heroVisible ? "none" : "translateY(16px)",
                                transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
                            }}
                        >
                            Six purpose-built service tracks that take your organization from legacy constraints to future-ready infrastructure — end to end.
                        </p>
                    </div>

                    {/* ── DIVIDER ── */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "16px",
                            marginBottom: "40px",
                            opacity: heroVisible ? 1 : 0,
                            transition: "opacity 0.6s ease 0.3s",
                        }}
                    >
                        <div
                            style={{
                                height: "2px",
                                flex: 1,
                                background: "linear-gradient(to right, #ff5812, #000000)",
                            }}
                        />
                        <span
                            style={{
                                fontSize: "11px",
                                color: "#000000",
                                letterSpacing: "0.15em",
                                textTransform: "uppercase",
                                fontFamily: "'DM Sans', sans-serif",
                                fontWeight: 700,
                            }}
                        >
                            6 service tracks
                        </span>
                        <div
                            style={{
                                height: "2px",
                                flex: 1,
                                background: "linear-gradient(to left, #ff5812, #000000)",
                            }}
                        />
                    </div>

                    {/* ── FEATURED CARD ── */}
                    <div ref={featuredRef} style={{ marginBottom: "20px" }}>
                        <FeaturedCard service={SERVICES[0]} visible={featuredVisible} isMobile={isMobile} />
                    </div>

                    {/* ── REMAINING GRID ── */}
                    <div
                        ref={gridRef}
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit,minmax(min(100%, 280px),1fr))",
                            gap: "16px",
                            marginBottom: "72px",
                        }}
                    >
                        {remaining.map((svc, i) => (
                            <ServiceCard
                                key={svc.id}
                                service={svc}
                                index={i}
                                visible={gridVisible}
                            />
                        ))}
                    </div>

                    {/* ── SUMMARY BAR ── */}
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))",
                            gap: "2px",
                            background: "#eaeaea",
                            border: "2px solid #000000",
                            borderRadius: "14px",
                            overflow: "hidden",
                            opacity: gridVisible ? 1 : 0,
                            transition: "opacity 0.7s ease 0.5s",
                        }}
                    >
                        {[
                            { value: "6", label: "Service Tracks", color: "#ff5812" },
                            { value: "100%", label: "Cloud-Ready", color: "#ff5812" },
                            { value: "AI-First", label: "Approach", color: "#ff5812" },
                            { value: "Zero", label: "Downtime Target", color: "#ff5812" },
                        ].map((item) => (
                            <div
                                key={item.label}
                                style={{
                                    background: "#ffffff",
                                    padding: "24px 20px",
                                    textAlign: "center",
                                }}
                            >
                                <div
                                    style={{
                                        fontFamily: "'Syne', sans-serif",
                                        fontSize: "24px",
                                        fontWeight: 800,
                                        color: item.color,
                                        marginBottom: "4px",
                                    }}
                                >
                                    {item.value}
                                </div>
                                <div
                                    style={{

                                        fontSize: "11px",
                                        fontWeight: 700,
                                        letterSpacing: "0.1em",
                                        textTransform: "uppercase",
                                        color: "#000000",
                                    }}
                                >
                                    {item.label}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* ── TICKER ── */}
                    <div
                        style={{
                            marginTop: "64px",
                            overflow: "hidden",
                            borderTop: "2px solid #000000",
                            borderBottom: "2px solid #000000",
                            padding: "14px 0",
                            opacity: heroVisible ? 1 : 0,
                            transition: "opacity 0.8s ease 0.6s",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                gap: "48px",
                                animation: "marquee2 24s linear infinite",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {[
                                "Legacy Application Modernization",
                                "Workflow & Process Automation",
                                "Cloud Migration",
                                "Data & Reporting Modernization",
                                "AI-Led Modernization",
                                "UI/UX Modernization",
                                "Legacy Application Modernization",
                                "Workflow & Process Automation",
                                "Cloud Migration",
                                "Data & Reporting Modernization",
                                "AI-Led Modernization",
                                "UI/UX Modernization",
                            ].map((text, i) => (
                                <span
                                    key={i}
                                    style={{
                                        fontSize: "12px",
                                        letterSpacing: "0.15em",
                                        textTransform: "uppercase",
                                        color: i % 2 === 0 ? "#000000" : "#ff5812",
                                        fontWeight: 700,
                                        flexShrink: 0,
                                    }}
                                >
                                    {text}
                                    <span style={{ marginLeft: "48px", color: "#ff5812" }}>◆</span>
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}