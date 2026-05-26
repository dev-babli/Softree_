"use client"
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const highlights = [
    {
        label: "Legacy Application Modernization",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" style={{ width: 18, height: 18 }}>
                <rect x="3" y="3" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" />
                <rect x="13" y="13" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" />
                <path d="M13 7h4v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7 13v4h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        label: "Cloud & Platform Migration",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" style={{ width: 18, height: 18 }}>
                <path d="M6 19a4 4 0 01-.5-7.9A6 6 0 0118 13h1a3 3 0 010 6H6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M12 10V6M9 9l3-3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        label: "Workflow Automation",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" style={{ width: 18, height: 18 }}>
                <circle cx="5" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="19" cy="6" r="2" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="19" cy="18" r="2" stroke="currentColor" strokeWidth="1.5" />
                <path d="M7 12h4l2-6h4M7 12h4l2 6h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        label: "AI-Driven Transformation",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" style={{ width: 18, height: 18 }}>
                <path d="M12 2l2 5h5l-4 3 1.5 5L12 12l-4.5 3L9 10 5 7h5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M12 16v6M8 20h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        label: "Offshore Engineering Teams",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" style={{ width: 18, height: 18 }}>
                <circle cx="9" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="17" cy="9" r="2" stroke="currentColor" strokeWidth="1.5" />
                <path d="M2 20c0-4 3.134-7 7-7s7 3 7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M17 13c2.21 0 4 1.79 4 4v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        ),
    },
];

const trustTechs = [
    "Microsoft",
    "Azure",
    "AWS",
    "Power Platform",
    "React",
    "Node.js",
    "Dataverse",
    "Power BI",
    "Snowflake",
    "AI Automation",
];

export default function HeroSection() {
    const [visible, setVisible] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
    const [btn1Hover, setBtn1Hover] = useState(false);
    const [btn2Hover, setBtn2Hover] = useState(false);
    const [activeHighlight, setActiveHighlight] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const t = setTimeout(() => setVisible(true), 80);
        return () => clearTimeout(t);
    }, []);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;
        setMousePos({
            x: ((e.clientX - rect.left) / rect.width) * 100,
            y: ((e.clientY - rect.top) / rect.height) * 100,
        });
    };

    // Duplicate for seamless CSS marquee loop
    const tickerItems = [...trustTechs, ...trustTechs];

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            style={{
                fontFamily: "'Georgia', 'Times New Roman', serif",
                background: "#fff",
                minHeight: "80vh",
                position: "relative",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <style>{`
                @keyframes heroMarquee {
                    0%   { transform: translate3d(0, 0, 0); }
                    100% { transform: translate3d(-50%, 0, 0); }
                }
            `}</style>
            {/* ── BACKGROUND LAYERS ── */}

            {/* Mouse-tracking warm glow */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background: `radial-gradient(ellipse 55% 45% at ${mousePos.x}% ${mousePos.y}%, rgba(255,106,0,0.06) 0%, transparent 70%)`,
                    transition: "background 0.08s ease",
                    pointerEvents: "none",
                    zIndex: 0,
                }}
            />

            {/* Dot grid */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)",
                    backgroundSize: "36px 36px",
                    pointerEvents: "none",
                    zIndex: 0,
                }}
            />

            {/* Orange slash — top right */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: 0,
                    height: 0,
                    borderTop: "clamp(160px, 22vw, 280px) solid #FF6A00",
                    borderLeft: "clamp(160px, 22vw, 280px) solid transparent",
                    opacity: 0.07,
                    pointerEvents: "none",
                    zIndex: 0,
                }}
            />

            {/* Black slash — bottom left */}
            <div
                style={{
                    position: "absolute",
                    bottom: 80,
                    left: 0,
                    width: 0,
                    height: 0,
                    borderBottom: "clamp(100px, 14vw, 180px) solid #111",
                    borderRight: "clamp(100px, 14vw, 180px) solid transparent",
                    opacity: 0.04,
                    pointerEvents: "none",
                    zIndex: 0,
                }}
            />

            {/* Vertical rule — left spine */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: "clamp(1.2rem, 3vw, 3rem)",
                    width: 1,
                    height: "100%",
                    background: "linear-gradient(to bottom, transparent, rgba(255,106,0,0.25) 30%, rgba(255,106,0,0.25) 70%, transparent)",
                    pointerEvents: "none",
                    zIndex: 0,
                }}
            />

         

            {/* ── MAIN CONTENT ── */}
            <div
                style={{
                    position: "relative",
                    zIndex: 10,
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: isMobile ? "2rem 1.25rem 3rem" : "clamp(1.5rem, 4vw, 3rem) clamp(2rem, 6vw, 5rem)",
                    paddingBottom: "2rem",
                    marginTop: isMobile ? "0.5rem" : "2rem",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: isMobile ? "column" : "row",
                        gap: isMobile ? "2.5rem" : "clamp(1.5rem, 4vw, 3.5rem)",
                        alignItems: isMobile ? "stretch" : "flex-start",
                        flexWrap: "wrap",
                    }}
                >
                    {/* LEFT — Headline + CTA */}
                    <div style={{ flex: "1 1 420px", minWidth: 0 }}>

                        {/* Eyebrow */}
                        <div
                            style={{
                                opacity: visible ? 1 : 0,
                                transform: visible ? "none" : "translateY(-10px)",
                                transition: "opacity 0.6s ease, transform 0.6s ease",
                                marginBottom: "1.5rem",
                                display: "flex",
                                alignItems: "center",
                                gap: "0.75rem",
                            }}
                        >
                            <div style={{ width: 6, height: 6, background: "#FF6A00", transform: "rotate(45deg)" }} />
                            <span
                                style={{
                                    fontFamily: "'Courier New', monospace",
                                    fontSize: "0.65rem",
                                    letterSpacing: "0.35em",
                                    color: "#FF6A00",
                                    fontWeight: 700,
                                    textTransform: "uppercase",
                                }}
                            >
                                Enterprise Modernization
                            </span>
                        </div>

                        {/* Main Headline */}
                        <div
                            style={{
                                opacity: visible ? 1 : 0,
                                transform: visible ? "none" : "translateY(28px)",
                                transition: "opacity 0.9s ease 0.1s, transform 0.9s ease 0.1s",
                            }}
                        >
                            <h1
                                style={{
                                    fontSize: "clamp(1.8rem, 4.4vw, 3.6rem)",
                                    fontWeight: 900,
                                    letterSpacing: "-0.03em",
                                    color: "#111",
                                    lineHeight: 0.92,
                                    textTransform: "uppercase",
                                    margin: 0,
                                }}
                            >
                                Legacy
                            </h1>
                            <h1
                                style={{
                                    fontSize: "clamp(1.8rem, 4.4vw, 3.6rem)",
                                    fontWeight: 900,
                                    letterSpacing: "-0.03em",
                                    color: "#111",
                                    lineHeight: 0.92,
                                    textTransform: "uppercase",
                                    margin: 0,
                                }}
                            >
                                System
                            </h1>
                            <h1
                                style={{
                                    fontSize: "clamp(1.8rem, 4.4vw, 3.6rem)",
                                    fontWeight: 900,
                                    letterSpacing: "-0.03em",
                                    color: "#111",
                                    lineHeight: 0.92,
                                    textTransform: "uppercase",
                                    margin: 0,
                                }}
                            >
                                Migration
                            </h1>
                            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "0.4rem" }}>
                                <h1
                                    style={{
                                        fontSize: "clamp(1.8rem, 4.4vw, 3.6rem)",
                                        fontWeight: 900,
                                        letterSpacing: "-0.03em",
                                        color: "#FF6A00",
                                        lineHeight: 0.92,
                                        textTransform: "uppercase",
                                        margin: 0,
                                    }}
                                >
                                    &
                                </h1>
                                <h1
                                    style={{
                                        fontSize: "clamp(1.8rem, 4.4vw, 3.6rem)",
                                        fontWeight: 900,
                                        letterSpacing: "-0.03em",
                                        color: "#111",
                                        lineHeight: 0.92,
                                        textTransform: "uppercase",
                                        margin: 0,
                                    }}
                                >
                                    Modernization
                                </h1>
                            </div>
                        </div>

                        {/* Divider */}
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.75rem",
                                margin: "clamp(1rem, 2.5vw, 1.75rem) 0",
                                opacity: visible ? 1 : 0,
                                transition: "opacity 0.7s ease 0.4s",
                            }}
                        >
                        </div>

                        {/* Subheading */}
                        <p
                            style={{
                                fontSize: "clamp(0.95rem, 1.6vw, 1.15rem)",
                                color: "#555",
                                lineHeight: 1.75,
                                maxWidth: "540px",
                                margin: "0 0 clamp(1.2rem, 3vw, 2rem)",
                                opacity: visible ? 1 : 0,
                                transform: visible ? "none" : "translateY(12px)",
                                transition: "opacity 0.8s ease 0.5s, transform 0.8s ease 0.5s",
                            }}
                        >
                            Transform outdated applications, workflows, and enterprise
                            platforms into scalable, cloud-ready, AI-enabled digital solutions.
                        </p>

                        {/* CTA Buttons */}
                        <div
                            style={{
                                display: "flex",
                                gap: "1rem",
                                flexWrap: "wrap",
                                alignItems: "center",
                                opacity: visible ? 1 : 0,
                                transform: visible ? "none" : "translateY(16px)",
                                transition: "opacity 0.8s ease 0.65s, transform 0.8s ease 0.65s",
                            }}
                        >
                            {/* Primary */}
                            <Link href="/contact" style={{ textDecoration: "none" }}>
                                <button
                                    onMouseEnter={() => setBtn1Hover(true)}
                                    onMouseLeave={() => setBtn1Hover(false)}
                                    style={{
                                        padding: "0.9rem 2rem",
                                        background: btn1Hover ? "#fff" : "#FF6A00",
                                        color: btn1Hover ? "#FF6A00" : "#fff",
                                        border: "2px solid #FF6A00",
                                        fontFamily: "'Courier New', monospace",
                                        fontSize: "0.72rem",
                                        fontWeight: 700,
                                        letterSpacing: "0.18em",
                                        textTransform: "uppercase",
                                        cursor: "pointer",
                                        transition: "all 0.22s ease",
                                        boxShadow: btn1Hover ? "5px 5px 0px #FF6A00" : "none",
                                        transform: btn1Hover ? "translate(-3px,-3px)" : "none",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "0.6rem",
                                    }}
                                >
                                    <svg viewBox="0 0 20 20" fill="none" style={{ width: 15, height: 15 }}>
                                        <rect x="2" y="4" width="16" height="13" rx="1" stroke="currentColor" strokeWidth="1.5" />
                                        <path d="M2 8h16" stroke="currentColor" strokeWidth="1.5" />
                                        <circle cx="6.5" cy="12.5" r="1" fill="currentColor" />
                                    </svg>
                                    Book a Discovery Call
                                </button>
                            </Link>

                            {/* Secondary */}
                            <Link href="/contact" style={{ textDecoration: "none" }}>
                                <button
                                    onMouseEnter={() => setBtn2Hover(true)}
                                    onMouseLeave={() => setBtn2Hover(false)}
                                    style={{
                                        position: "relative",
                                        overflow: "hidden",
                                        padding: "0.9rem 2rem",
                                        background: "transparent",
                                        color: btn2Hover ? "#fff" : "#111",
                                        border: "2px solid #111",
                                        fontFamily: "'Courier New', monospace",
                                        fontSize: "0.72rem",
                                        fontWeight: 700,
                                        letterSpacing: "0.18em",
                                        textTransform: "uppercase",
                                        cursor: "pointer",
                                        transition: "color 0.25s ease, box-shadow 0.22s ease, transform 0.22s ease",
                                        boxShadow: btn2Hover ? "5px 5px 0px #111" : "none",
                                        transform: btn2Hover ? "translate(-3px,-3px)" : "none",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "0.6rem",
                                    }}
                                >
                                    <div
                                        style={{
                                            position: "absolute",
                                            inset: 0,
                                            background: "#111",
                                            transformOrigin: "left",
                                            transform: btn2Hover ? "scaleX(1)" : "scaleX(0)",
                                            transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
                                            zIndex: 0,
                                        }}
                                    />
                                    <svg viewBox="0 0 20 20" fill="none" style={{ width: 15, height: 15, position: "relative", zIndex: 1 }}>
                                        <path d="M10 2a8 8 0 100 16A8 8 0 0010 2z" stroke="currentColor" strokeWidth="1.5" />
                                        <path d="M8 7l5 3-5 3V7z" fill="currentColor" />
                                    </svg>
                                    <span style={{ position: "relative", zIndex: 1 }}>Get Modernization Assessment</span>
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* RIGHT — Highlights panel */}
                    <div
                        style={{
                            flex: isMobile ? "none" : "0 1 340px",
                            width: isMobile ? "100%" : "340px",
                            display: "flex",
                            flexDirection: "column",
                            gap: 0,
                            opacity: visible ? 1 : 0,
                            transform: visible ? "none" : isMobile ? "translateY(20px)" : "translateX(30px)",
                            transition: "opacity 0.9s ease 0.45s, transform 0.9s ease 0.45s",
                            border: "1px solid #e8e8e8",
                            alignSelf: "center",
                            marginTop: isMobile ? "1.5rem" : "2rem",
                        }}
                    >
                        {/* Panel header */}
                        <div
                            style={{
                                background: "#111",
                                padding: "0.85rem 1.5rem",
                                display: "flex",
                                alignItems: "center",
                                gap: "0.75rem",
                            }}
                        >
                            <div style={{ width: 6, height: 6, background: "#FF6A00", transform: "rotate(45deg)" }} />
                            <span
                                style={{
                                    fontFamily: "'Courier New', monospace",
                                    fontSize: "0.6rem",
                                    letterSpacing: "0.3em",
                                    color: "rgba(255,255,255,0.7)",
                                    textTransform: "uppercase",
                                    fontWeight: 700,
                                }}
                            >
                                Core Capabilities
                            </span>
                        </div>

                        {highlights.map((h, i) => (
                            <div
                                key={i}
                                onMouseEnter={() => setActiveHighlight(i)}
                                onMouseLeave={() => setActiveHighlight(null)}
                                style={{
                                    position: "relative",
                                    overflow: "hidden",
                                    borderBottom: i < highlights.length - 1 ? "1px solid #f0f0f0" : "none",
                                    cursor: "default",
                                }}
                            >
                                <div
                                    style={{
                                        position: "absolute",
                                        inset: 0,
                                        background: "#FF6A00",
                                        transformOrigin: "left",
                                        transform: activeHighlight === i ? "scaleX(1)" : "scaleX(0)",
                                        transition: "transform 0.28s cubic-bezier(0.4,0,0.2,1)",
                                        zIndex: 0,
                                    }}
                                />
                                <div
                                    style={{
                                        position: "relative",
                                        zIndex: 1,
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "0.85rem",
                                        padding: "0.9rem 1.5rem",
                                    }}
                                >
                                    <span style={{ color: activeHighlight === i ? "#fff" : "#FF6A00", transition: "color 0.2s ease", flexShrink: 0 }}>
                                        {h.icon}
                                    </span>
                                    <span
                                        style={{
                                            fontFamily: "'Courier New', monospace",
                                            fontSize: "0.72rem",
                                            letterSpacing: "0.06em",
                                            fontWeight: 700,
                                            color: activeHighlight === i ? "#fff" : "#111",
                                            textTransform: "uppercase",
                                            transition: "color 0.2s ease",
                                        }}
                                    >
                                        {h.label}
                                    </span>
                                    <div style={{ flex: 1 }} />
                                    <svg
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        style={{
                                            width: 14,
                                            height: 14,
                                            color: activeHighlight === i ? "rgba(255,255,255,0.7)" : "#ccc",
                                            flexShrink: 0,
                                            transition: "color 0.2s ease, transform 0.2s ease",
                                            transform: activeHighlight === i ? "translateX(3px)" : "none",
                                        }}
                                    >
                                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── TRUST BAR ── */}
            <div
                style={{
                    position: "relative",
                    zIndex: 10,
                    borderTop: "1px solid #e8e8e8",
                    background: "#fff",
                    overflow: "hidden",
                    opacity: visible ? 1 : 0,
                    transition: "opacity 0.8s ease 1s",
                }}
            >
                {/* Label row */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                        padding: "0.85rem clamp(2rem, 6vw, 5rem)",
                        borderBottom: "1px solid #f0f0f0",
                    }}
                >
                    <div style={{ width: 5, height: 5, background: "#FF6A00", transform: "rotate(45deg)", flexShrink: 0 }} />
                    <span
                        style={{
                            fontFamily: "'Courier New', monospace",
                            fontSize: "0.6rem",
                            letterSpacing: "0.3em",
                            color: "#999",
                            textTransform: "uppercase",
                            fontWeight: 700,
                        }}
                    >
                        Trusted Technologies
                    </span>
                    <div style={{ flex: 1, height: 1, background: "#f0f0f0" }} />
                </div>

                {/* Scrolling ticker */}
                <div
                    style={{
                        padding: "1rem 0",
                        position: "relative",
                        overflow: "hidden",
                    }}
                >
                    {/* Left fade */}
                    <div
                        style={{
                            position: "absolute",
                            left: 0,
                            top: 0,
                            bottom: 0,
                            width: 80,
                            background: "linear-gradient(to right, #fff, transparent)",
                            zIndex: 2,
                            pointerEvents: "none",
                        }}
                    />
                    {/* Right fade */}
                    <div
                        style={{
                            position: "absolute",
                            right: 0,
                            top: 0,
                            bottom: 0,
                            width: 80,
                            background: "linear-gradient(to left, #fff, transparent)",
                            zIndex: 2,
                            pointerEvents: "none",
                        }}
                    />

                    <div
                        style={{
                            display: "flex",
                            width: "max-content",
                            animation: "heroMarquee 30s linear infinite",
                            willChange: "transform",
                        }}
                    >
                        {tickerItems.map((tech, i) => (
                            <div
                                key={i}
                                style={{
                                    flexShrink: 0,
                                    width: 180,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.6rem",
                                    paddingRight: "1rem",
                                }}
                            >
                                <div
                                    style={{
                                        width: 4,
                                        height: 4,
                                        background: i % 2 === 0 ? "#FF6A00" : "#ccc",
                                        transform: "rotate(45deg)",
                                        flexShrink: 0,
                                    }}
                                />
                                <span
                                    style={{
                                        fontFamily: "'Courier New', monospace",
                                        fontSize: "0.7rem",
                                        fontWeight: 700,
                                        letterSpacing: "0.08em",
                                        color: "#333",
                                        textTransform: "uppercase",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {tech}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}