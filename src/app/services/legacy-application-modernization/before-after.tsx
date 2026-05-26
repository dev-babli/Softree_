"use client";

import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────
   Data
 ───────────────────────────────────────────── */
const TRANSFORMATIONS = [
    {
        id: 1,
        before: "Manual approvals",
        after: "Automated workflows",
        icon: "⚡",
        category: "Process",
    },
    {
        id: 2,
        before: "Legacy desktop apps",
        after: "Modern cloud platforms",
        icon: "☁️",
        category: "Infrastructure",
    },
    {
        id: 3,
        before: "Disconnected systems",
        after: "Integrated digital ecosystem",
        icon: "🔗",
        category: "Integration",
    },
    {
        id: 4,
        before: "Slow reporting",
        after: "Real-time dashboards",
        icon: "📊",
        category: "Analytics",
    },
    {
        id: 5,
        before: "High maintenance cost",
        after: "Scalable cloud infrastructure",
        icon: "📉",
        category: "Cost",
    },
    {
        id: 6,
        before: "Outdated UI",
        after: "Modern responsive applications",
        icon: "✦",
        category: "Experience",
    },
];

/* ─────────────────────────────────────────────
   Hooks
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
   Noise + Grid backgrounds
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
            <filter id="n3">
                <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.65"
                    numOctaves="3"
                    stitchTiles="stitch"
                />
                <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#n3)" />
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
                opacity: 0.025,
            }}
        >
            {Array.from({ length: 9 }).map((_, i) => (
                <line key={i} x1={`${i * 12.5}%`} y1="0" x2={`${i * 12.5}%`} y2="100%" stroke="#000" strokeWidth="0.5" />
            ))}
            {Array.from({ length: 13 }).map((_, i) => (
                <line key={i} x1="0" y1={`${i * 8.33}%`} x2="100%" y2={`${i * 8.33}%`} stroke="#000" strokeWidth="0.5" />
            ))}
        </svg>
    );
}

/* ─────────────────────────────────────────────
   Animated transformation row — the core element
   Full-width horizontal band, not a card
 ───────────────────────────────────────────── */
function TransformRow({
    item,
    index,
    visible,
    activeRow,
    setActiveRow,
    isMobile,
}: {
    item: typeof TRANSFORMATIONS[0];
    index: number;
    visible: boolean;
    activeRow: number | null;
    setActiveRow: (id: number | null) => void;
    isMobile: boolean;
}) {
    const isActive = activeRow === item.id;
    const isDimmed = activeRow !== null && !isActive;
    const delay = `${index * 90}ms`;

    if (isMobile) {
        return (
            <div
                onTouchStart={() => setActiveRow(item.id)}
                onClick={() => setActiveRow(item.id === activeRow ? null : item.id)}
                style={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    padding: "20px 16px",
                    borderBottom: item.id === TRANSFORMATIONS.length ? "none" : "1px solid rgba(255, 255, 255, 0.08)",
                    cursor: "pointer",
                    opacity: visible ? (isDimmed ? 0.45 : 1) : 0,
                    transform: visible ? "none" : `translateY(${20 + index * 4}px)`,
                    transition: `opacity 0.5s ease ${delay}, transform 0.5s ease ${delay}, background 0.3s ease`,
                    background: isActive
                        ? "linear-gradient(180deg, rgba(239, 68, 68, 0.08) 0%, rgba(255, 88, 18, 0.08) 100%)"
                        : "transparent",
                    borderRadius: isActive ? "12px" : "0",
                }}
            >
                {/* Active line highlights */}
                {isActive && (
                    <>
                        <div
                            style={{
                                position: "absolute",
                                left: 0,
                                right: 0,
                                top: 0,
                                bottom: 0,
                                borderTop: "1px solid rgba(239, 68, 68, 0.2)",
                                borderBottom: "1px solid rgba(255, 88, 18, 0.2)",
                                pointerEvents: "none",
                            }}
                        />
                        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "3px", background: "#ef4444", pointerEvents: "none" }} />
                        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "3px", background: "#ff5812", pointerEvents: "none" }} />
                    </>
                )}

                {/* Top header row inside card: Index, Category, Icon */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span
                            style={{
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: "10px",
                                fontWeight: 800,
                                color: isActive ? "#ff5812" : "#475569",
                                letterSpacing: "0.1em",
                            }}
                        >
                            0{item.id}
                        </span>
                        <span
                            style={{
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: "9px",
                                fontWeight: 700,
                                letterSpacing: "0.14em",
                                textTransform: "uppercase",
                                color: "#8a8a8f",
                            }}
                        >
                            {item.category}
                        </span>
                    </div>
                    <div
                        style={{
                            fontSize: "18px",
                            lineHeight: 1,
                            opacity: isActive ? 1 : 0.4,
                            transform: isActive ? "scale(1.1)" : "scale(1)",
                            transition: "opacity 0.3s, transform 0.3s",
                        }}
                    >
                        {item.icon}
                    </div>
                </div>

                {/* BEFORE block */}
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                    <div
                        style={{
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            flexShrink: 0,
                            background: isActive ? "#ef4444" : "#334155",
                            boxShadow: isActive ? "0 0 8px rgba(239, 68, 68, 0.5)" : "none",
                            transition: "background 0.3s, box-shadow 0.3s",
                        }}
                    />
                    <span
                        style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "15px",
                            fontWeight: isActive ? 700 : 500,
                            color: isActive ? "#ef4444" : "#94a3b8",
                            lineHeight: 1.3,
                            textDecoration: isActive ? "line-through rgba(239, 68, 68, 0.4)" : "none",
                            transition: "color 0.3s",
                        }}
                    >
                        {item.before}
                    </span>
                </div>

                {/* Down Arrow separator */}
                <div style={{ paddingLeft: "2px", margin: "4px 0", opacity: isActive ? 0.8 : 0.2, transition: "opacity 0.3s" }}>
                    <svg width="12" height="18" viewBox="0 0 12 18">
                        <defs>
                            <linearGradient id={`arr-v-${item.id}`} x1="0" x2="0" y1="0" y2="1">
                                <stop offset="0%" stopColor="#ef4444" />
                                <stop offset="100%" stopColor="#ff5812" />
                            </linearGradient>
                        </defs>
                        <line
                            x1="6"
                            y1="0"
                            x2="6"
                            y2="14"
                            stroke={`url(#arr-v-${item.id})`}
                            strokeWidth="1.5"
                        />
                        <polyline
                            points="1,9 6,14 11,9"
                            fill="none"
                            stroke="#ff5812"
                            strokeWidth="1.5"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>

                {/* AFTER block */}
                <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                    <div
                        style={{
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            flexShrink: 0,
                            background: isActive ? "#ff5812" : "#334155",
                            boxShadow: isActive ? "0 0 8px rgba(255, 88, 18, 0.5)" : "none",
                            transition: "background 0.3s, box-shadow 0.3s",
                        }}
                    />
                    <span
                        style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "15px",
                            fontWeight: isActive ? 700 : 500,
                            color: isActive ? "#ff5812" : "#cbd5e1",
                            lineHeight: 1.3,
                            transition: "color 0.3s",
                        }}
                    >
                        {item.after}
                    </span>
                    {isActive && (
                        <span
                            style={{
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: "8px",
                                fontWeight: 700,
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                                color: "#ff5812",
                                background: "rgba(255, 88, 18, 0.15)",
                                border: "1px solid rgba(255, 88, 18, 0.3)",
                                borderRadius: "4px",
                                padding: "1px 6px",
                                marginLeft: "4px",
                            }}
                        >
                            Modern
                        </span>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div
            onMouseEnter={() => setActiveRow(item.id)}
            onMouseLeave={() => setActiveRow(null)}
            style={{
                position: "relative",
                display: "grid",
                gridTemplateColumns: "1fr 80px 1fr",
                alignItems: "center",
                padding: "0 0",
                borderBottom: item.id === TRANSFORMATIONS.length ? "none" : "1px solid rgba(255, 255, 255, 0.08)",
                cursor: "default",
                opacity: visible ? (isDimmed ? 0.25 : 1) : 0,
                transform: visible ? "none" : `translateY(${20 + index * 4}px)`,
                transition: `opacity 0.5s ease ${delay}, transform 0.5s ease ${delay}`,
                background: isActive
                    ? "linear-gradient(90deg, rgba(239, 68, 68, 0.15) 0%, rgba(239, 68, 68, 0.03) 30%, rgba(255, 88, 18, 0.03) 70%, rgba(255, 88, 18, 0.15) 100%)"
                    : "transparent",
            }}
        >
            {/* Active line highlight & edge indicators */}
            {isActive && (
                <>
                    <div
                        style={{
                            position: "absolute",
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0,
                            borderTop: "1px solid rgba(239, 68, 68, 0.25)",
                            borderBottom: "1px solid rgba(255, 88, 18, 0.25)",
                            pointerEvents: "none",
                        }}
                    />
                    <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "4px", background: "#ef4444", pointerEvents: "none" }} />
                    <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "4px", background: "#ff5812", pointerEvents: "none" }} />
                </>
            )}

            {/* BEFORE side */}
            <div
                style={{
                    padding: "24px 0",
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    justifyContent: "flex-end",
                }}
            >
                {/* Category pill */}
                <span
                    style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "9px",
                        fontWeight: 700,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "#8a8a8f",
                        display: isActive ? "block" : "none",
                        transition: "opacity 0.2s",
                    }}
                >
                    {item.category}
                </span>

                <span
                    style={{
                        fontFamily: "'Syne', sans-serif",
                        fontSize: "clamp(14px, 1.6vw, 18px)",
                        fontWeight: isActive ? 700 : 500,
                        color: isActive ? "#ef4444" : "#94a3b8",
                        textAlign: "right",
                        lineHeight: 1.2,
                        letterSpacing: isActive ? "-0.01em" : "0",
                        transition: "color 0.3s, font-weight 0.2s",
                        textDecoration: isActive ? "line-through rgba(239, 68, 68, 0.45)" : "none",
                    }}
                >
                    {item.before}
                </span>

                {/* Before indicator dot */}
                <div
                    style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        flexShrink: 0,
                        background: isActive ? "#ef4444" : "#334155",
                        boxShadow: isActive ? "0 0 10px rgba(239, 68, 68, 0.5)" : "none",
                        transition: "background 0.3s, box-shadow 0.3s",
                    }}
                />
            </div>

            {/* CENTER — icon + arrow */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    padding: "16px 0",
                }}
            >
                <div
                    style={{
                        fontSize: "20px",
                        lineHeight: 1,
                        opacity: isActive ? 1 : 0.3,
                        transform: isActive ? "scale(1.1)" : "scale(0.85)",
                        transition: "opacity 0.3s, transform 0.3s",
                    }}
                >
                    {item.icon}
                </div>

                {/* Animated arrow */}
                <svg
                    width="32"
                    height="12"
                    viewBox="0 0 32 12"
                    style={{
                        opacity: isActive ? 1 : 0.15,
                        transition: "opacity 0.3s",
                    }}
                >
                    <defs>
                        <linearGradient id={`arr-${item.id}`} x1="0" x2="1" y1="0" y2="0">
                            <stop offset="0%" stopColor="#ef4444" />
                            <stop offset="100%" stopColor="#ff5812" />
                        </linearGradient>
                    </defs>
                    <line
                        x1="0"
                        y1="6"
                        x2="26"
                        y2="6"
                        stroke={`url(#arr-${item.id})`}
                        strokeWidth="1.5"
                    />
                    <polyline
                        points="20,1 27,6 20,11"
                        fill="none"
                        stroke="#ff5812"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                    />
                </svg>

                {/* Index number */}
                <span
                    style={{
                        fontFamily: "'Syne', sans-serif",
                        fontSize: "9px",
                        fontWeight: 800,
                        color: isActive ? "#ff5812" : "#475569",
                        letterSpacing: "0.1em",
                    }}
                >
                    0{item.id}
                </span>
            </div>

            {/* AFTER side */}
            <div
                style={{
                    padding: "24px 0",
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                }}
            >
                {/* After indicator dot */}
                <div
                    style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        flexShrink: 0,
                        background: isActive ? "#ff5812" : "#334155",
                        boxShadow: isActive ? "0 0 10px rgba(255,88,18,0.5)" : "none",
                        transition: "background 0.3s, box-shadow 0.3s",
                    }}
                />

                <span
                    style={{
                        fontFamily: "'Syne', sans-serif",
                        fontSize: "clamp(14px, 1.6vw, 18px)",
                        fontWeight: isActive ? 700 : 500,
                        color: isActive ? "#ff5812" : "#cbd5e1",
                        lineHeight: 1.2,
                        letterSpacing: isActive ? "-0.01em" : "0",
                        transition: "color 0.3s, font-weight 0.2s",
                    }}
                >
                    {item.after}
                </span>

                {/* After badge */}
                {isActive && (
                    <span
                        style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "9px",
                            fontWeight: 700,
                            letterSpacing: "0.14em",
                            textTransform: "uppercase",
                            color: "#ff5812",
                            background: "rgba(255, 88, 18, 0.15)",
                            border: "1px solid rgba(255, 88, 18, 0.3)",
                            borderRadius: "4px",
                            padding: "2px 7px",
                            whiteSpace: "nowrap",
                        }}
                    >
                        Modern
                    </span>
                )}
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────
   Split Header — dramatic typographic treatment
 ───────────────────────────────────────────── */
function SplitColumnHeader({ visible, isMobile }: { visible: boolean; isMobile: boolean }) {
    if (isMobile) {
        return (
            <div
                style={{
                    padding: "20px 0 10px",
                    textAlign: "center",
                    opacity: visible ? 1 : 0,
                    transform: visible ? "none" : "translateY(10px)",
                    transition: "opacity 0.6s ease 0.35s, transform 0.6s ease 0.35s",
                }}
            >
                <span
                    style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "10px",
                        fontWeight: 700,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "#ff5812",
                    }}
                >
                    Interactive Transition Map
                </span>
            </div>
        );
    }

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "1fr 80px 1fr",
                borderBottom: "none",
                marginBottom: "0",
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateY(10px)",
                transition: "opacity 0.6s ease 0.35s, transform 0.6s ease 0.35s",
            }}
        >
            <div
                style={{
                    padding: "20px 0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    gap: "12px",
                }}
            >
                <span
                    style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "10px",
                        fontWeight: 700,
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        color: "#ef4444",
                    }}
                >
                    Before
                </span>
                <div style={{ width: "24px", height: "1px", background: "rgba(239,68,68,0.4)" }} />
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: "1px", height: "40px", background: "#1e293b" }} />
            </div>

            <div
                style={{
                    padding: "20px 0",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                }}
            >
                <div style={{ width: "24px", height: "1px", background: "rgba(255,88,18,0.4)" }} />
                <span
                    style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "10px",
                        fontWeight: 700,
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        color: "#ff5812",
                    }}
                >
                    After
                </span>
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────
   Diagonal split background — purely decorative
 ───────────────────────────────────────────── */
function DiagonalSplit() {
    return (
        <div
            aria-hidden
            style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}
        >
            {/* Left tint — before zone */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    width: "calc(50% - 40px)",
                    background: "linear-gradient(to right, rgba(192,57,43,0.015) 0%, transparent 100%)",
                }}
            />
            {/* Right tint — after zone */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    width: "calc(50% - 40px)",
                    background: "linear-gradient(to left, rgba(255,88,18,0.015) 0%, transparent 100%)",
                }}
            />
        </div>
    );
}

/* ─────────────────────────────────────────────
   Horizontal progress meter — bottom summary
 ───────────────────────────────────────────── */
function TransformMeter({ visible }: { visible: boolean }) {
    const [animated, setAnimated] = useState(false);
    useEffect(() => {
        if (visible) {
            const t = setTimeout(() => setAnimated(true), 600);
            return () => clearTimeout(t);
        }
    }, [visible]);

    const metrics = [
        { label: "Operational Efficiency", pct: 87, color: "#ff5812" },
        { label: "Cost Reduction", pct: 62, color: "#ff5812" },
        { label: "Time-to-Market", pct: 74, color: "#ff5812" },
        { label: "System Reliability", pct: 94, color: "#ff5812" },
    ];

    return (
        <div
            style={{
                marginTop: "72px",
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateY(20px)",
                transition: "opacity 0.7s ease 0.4s, transform 0.7s ease 0.4s",
            }}
        >
            {/* Label */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    marginBottom: "36px",
                }}
            >
                <div style={{ height: "1px", flex: 1, background: "#000000" }} />
                <span
                    style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "10px",
                        fontWeight: 700,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "#000000",
                    }}
                >
                    Post-modernization gains
                </span>
                <div style={{ height: "1px", flex: 1, background: "#000000" }} />
            </div>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: "32px 40px",
                }}
            >
                {metrics.map((m) => (
                    <div key={m.label}>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "baseline",
                                marginBottom: "10px",
                            }}
                        >
                            <span
                                style={{
                                    fontFamily: "'DM Sans', sans-serif",
                                    fontSize: "12px",
                                    fontWeight: 500,
                                    color: "#000000",
                                    letterSpacing: "0.04em",
                                }}
                            >
                                {m.label}
                            </span>
                            <span
                                style={{
                                    fontFamily: "'DM Sans', sans-serif",
                                    fontSize: "14px",
                                    fontWeight: 700,
                                    color: m.color,
                                }}
                            >
                                +{m.pct}%
                            </span>
                        </div>
                        {/* Track */}
                        <div
                            style={{
                                height: "2px",
                                background: "#eaeaea",
                                borderRadius: "2px",
                                overflow: "hidden",
                            }}
                        >
                            <div
                                style={{
                                    height: "100%",
                                    width: animated ? `${m.pct}%` : "0%",
                                    background: m.color,
                                    transition: "width 1.4s cubic-bezier(0.16,1,0.3,1)",
                                    borderRadius: "2px",
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────
   Main Component
 ───────────────────────────────────────────── */
export default function TransformationSection() {
    const { ref: heroRef, visible: heroVisible } = useReveal(0.1);
    const { ref: tableRef, visible: tableVisible } = useReveal(0.05);
    const { ref: meterRef, visible: meterVisible } = useReveal(0.15);

    const [activeRow, setActiveRow] = useState<number | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');
        * { box-sizing: border-box; }
        @keyframes pulse-dot {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:0.4; transform:scale(0.7); }
        }
        @keyframes scanline {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes float-up {
          0%   { transform: translateY(0px); opacity: 0.06; }
          50%  { transform: translateY(-18px); opacity: 0.1; }
          100% { transform: translateY(0px); opacity: 0.06; }
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
                <DiagonalSplit />

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
                        animation: "scanline 10s linear infinite",
                        pointerEvents: "none",
                        zIndex: 1,
                    }}
                />




                <div
                    style={{
                        position: "relative",
                        zIndex: 2,
                        maxWidth: "1200px",
                        margin: isMobile ? "40px auto" : "80px auto",
                        padding: isMobile ? "40px 20px" : "60px 48px",
                        background: "rgba(248, 250, 252, 0.95)",
                        backdropFilter: "blur(8px)",
                        borderRadius: "32px",
                        boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.08)",
                    }}
                >
                    {/* ── HEADER ── */}
                    <div ref={heroRef} style={{ marginBottom: "80px" }}>
                        {/* Section label */}
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
                                Section 03
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
                                Before vs After
                            </span>
                        </div>

                        {/* Two-line dramatic headline */}
                        <div
                            style={{
                                opacity: heroVisible ? 1 : 0,
                                transform: heroVisible ? "none" : "translateY(24px)",
                                transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
                            }}
                        >
                            <h2
                                style={{
                                    fontFamily: "'DM Sans', sans-serif",
                                    fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
                                    fontWeight: 700,
                                    color: "#000000",
                                    lineHeight: 1.1,
                                    margin: "0 0 24px",
                                    letterSpacing: "-0.02em",
                                }}
                            >
                                From Legacy Complexity to Modern Efficiency
                            </h2>
                        </div>

                        {/* Sub line */}
                        <p
                            style={{
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: "15px",
                                fontWeight: 500,
                                color: "#000000",
                                lineHeight: 1.75,
                                maxWidth: "500px",
                                margin: "24px 0 0",
                                opacity: heroVisible ? 1 : 0,
                                transform: heroVisible ? "none" : "translateY(16px)",
                                transition: "opacity 0.7s ease 0.25s, transform 0.7s ease 0.25s",
                            }}
                        >
                            Every element of your legacy stack has a modern counterpart. Here's exactly what changes — and why it matters.
                        </p>
                    </div>

                    {/* ── TRANSFORMATION TABLE WRAPPER ── */}
                    <div
                        ref={tableRef}
                        style={{
                            background: "linear-gradient(135deg, #09090b 0%, #16161a 100%)",
                            border: "2px solid #ff5812",
                            borderRadius: "24px",
                            padding: "8px 32px 0 32px",
                            boxShadow: "0 25px 50px -12px rgba(255, 88, 18, 0.18), 0 0 40px rgba(0, 0, 0, 0.6)",
                            opacity: tableVisible ? 1 : 0,
                            transform: tableVisible ? "none" : "translateY(24px)",
                            transition: "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
                            overflow: "hidden", // So hover highlight clips clean on corners
                        }}
                    >
                        <SplitColumnHeader visible={tableVisible} isMobile={isMobile} />

                        {/* Vertical center spine */}
                        <div style={{ position: "relative" }}>
                            {!isMobile && (
                                <div
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        bottom: 0,
                                        left: "calc(50% - 0.5px)",
                                        width: "1px",
                                        background:
                                            "linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.05) 100%)",
                                        pointerEvents: "none",
                                    }}
                                />
                            )}

                            {TRANSFORMATIONS.map((item, i) => (
                                <TransformRow
                                    key={item.id}
                                    item={item}
                                    index={i}
                                    visible={tableVisible}
                                    activeRow={activeRow}
                                    setActiveRow={setActiveRow}
                                    isMobile={isMobile}
                                />
                            ))}
                        </div>
                    </div>

                    {/* ── GAIN METERS ── */}
                    <div ref={meterRef}>
                        <TransformMeter visible={meterVisible} />
                    </div>

                    {/* ── CLOSING CTA STRIP ── */}
                    <div
                        style={{
                            marginTop: "72px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: "24px",
                            flexWrap: "wrap",
                            borderTop: "2px solid #000000",
                            paddingTop: "40px",
                            opacity: meterVisible ? 1 : 0,
                            transition: "opacity 0.7s ease 0.7s",
                        }}
                    >
                        <div>
                            <p
                                style={{
                                    fontFamily: "'Syne', sans-serif",
                                    fontSize: "20px",
                                    fontWeight: 800,
                                    color: "#000000",
                                    margin: "0 0 6px",
                                    letterSpacing: "-0.01em",
                                }}
                            >
                                Ready to make the shift?
                            </p>
                            <p
                                style={{
                                    fontFamily: "'DM Sans', sans-serif",
                                    fontSize: "13px",
                                    fontWeight: 500,
                                    color: "#000000",
                                    margin: 0,
                                    lineHeight: 1.6,
                                }}
                            >
                                Every transformation above is something we've delivered — repeatedly, reliably, at scale.
                            </p>
                        </div>

                        {/* Visual stat pills — NOT buttons, decorative */}
                        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                            {[
                                { v: "6", l: "Tracks" },
                                { v: "100%", l: "Cloud-ready" },
                                { v: "0", l: "Downtime" },
                            ].map((p) => (
                                <div
                                    key={p.l}
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        padding: "14px 20px",
                                        borderTop: "2px solid #000000",
                                        minWidth: "80px",
                                    }}
                                >
                                    <span
                                        style={{
                                            fontFamily: "'Syne', sans-serif",
                                            fontSize: "22px",
                                            fontWeight: 800,
                                            color: "#ff5812",
                                            lineHeight: 1,
                                        }}
                                    >
                                        {p.v}
                                    </span>
                                    <span
                                        style={{
                                            fontFamily: "'DM Sans', sans-serif",
                                            fontSize: "9px",
                                            fontWeight: 700,
                                            letterSpacing: "0.14em",
                                            textTransform: "uppercase",
                                            color: "#000000",
                                            marginTop: "4px",
                                        }}
                                    >
                                        {p.l}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}