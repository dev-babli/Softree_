"use client"
import { useState, useEffect } from "react";

const ROLES = ["AI Engineer", "Power BI Developer", "Power Apps Developer", "QA Engineer", "Web Developer"];

const TAGS = ["AI", "Power Apps", "Power BI", "Testing", "Marketing", "HR", "Web", "Mobile"];

export default function Hero({ searchQuery, setSearchQuery }: { searchQuery: string; setSearchQuery: (val: string) => void }) {
    const [roleIndex, setRoleIndex] = useState(0);
    const [visible, setVisible] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setVisible(false);
            setTimeout(() => {
                setRoleIndex((i) => (i + 1) % ROLES.length);
                setVisible(true);
            }, 350);
        }, 2600);
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={s.root}>
            {/* Background grid lines */}
            <div style={s.gridOverlay} />

            {/* Orbs */}
            <div style={s.orb1} />
            <div style={s.orb2} />
            <div style={s.orb3} />



            {/* Hero body */}
            <div style={s.body}>

                {/* Eyebrow */}
                <div style={{
                    ...s.eyebrowPill,
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? "translateY(0)" : "translateY(12px)",
                    transition: "opacity 0.5s ease, transform 0.5s ease",
                }}>
                    <span style={s.eyebrowDot} />
                    <span style={s.eyebrowText}>Join us and build the future of enterprise tech</span>
                    <span style={s.eyebrowArrow}>→</span>
                </div>

                {/* Headline */}
                <h1 style={{
                    ...s.headline,
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? "translateY(0)" : "translateY(20px)",
                    transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
                }}>
                    Land your dream job
                    <br />
                    as a{" "}
                    <span style={{
                        ...s.roleCycler,
                        opacity: visible ? 1 : 0,
                        transform: visible ? "translateY(0px)" : "translateY(8px)",
                        transition: "opacity 0.3s ease, transform 0.3s ease",
                    }}>
                        {ROLES[roleIndex]}
                    </span>
                </h1>

                {/* Sub */}
                <p style={{
                    ...s.sub,
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? "translateY(0)" : "translateY(16px)",
                    transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
                }}>
                    Work on cutting-edge AI, Microsoft Power Platform, and QA automation.
                    <br />
                    Join our global engineering team and build products that matter.
                </p>
            </div>
        </div>
    );
}

const ORANGE = "#F97316";
const ORANGE_DARK = "#EA6C0A";
const BLACK = "#080808";
const DARK = "#0F0F0F";
const DARK2 = "#161616";
const DARK3 = "#1E1E1E";
const BORDER = "#242424";
const BORDER2 = "#2E2E2E";
const WHITE = "#FFFFFF";
const GRAY = "#888888";
const GRAY2 = "#555555";

const s: Record<string, React.CSSProperties> = {
    root: {
        position: "relative",
        background: BLACK,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        fontFamily: "'Outfit', 'DM Sans', sans-serif",
    },

    gridOverlay: {
        position: "absolute",
        inset: 0,
        backgroundImage: `
      linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
    `,
        backgroundSize: "60px 60px",
        pointerEvents: "none",
        zIndex: 0,
    },

    orb1: {
        position: "absolute",
        top: -180,
        right: -120,
        width: 500,
        height: 500,
        borderRadius: "50%",
        background: ORANGE,
        opacity: 0.07,
        filter: "blur(80px)",
        pointerEvents: "none",
        zIndex: 0,
    },
    orb2: {
        position: "absolute",
        bottom: 60,
        left: -100,
        width: 380,
        height: 380,
        borderRadius: "50%",
        background: ORANGE,
        opacity: 0.05,
        filter: "blur(80px)",
        pointerEvents: "none",
        zIndex: 0,
    },
    orb3: {
        position: "absolute",
        top: "40%",
        left: "40%",
        width: 200,
        height: 200,
        borderRadius: "50%",
        background: ORANGE,
        opacity: 0.04,
        filter: "blur(60px)",
        pointerEvents: "none",
        zIndex: 0,
    },



    // Body
    body: {
        position: "relative",
        zIndex: 2,
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "72px 24px 56px",
        gap: 28,
        textAlign: "center",
    },

    eyebrowPill: {
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        background: DARK2,
        border: `1px solid ${BORDER2}`,
        borderRadius: 999,
        padding: "6px 14px 6px 10px",
    },
    eyebrowDot: {
        width: 7,
        height: 7,
        borderRadius: "50%",
        background: ORANGE,
        display: "inline-block",
        boxShadow: `0 0 6px ${ORANGE}`,
    },
    eyebrowText: {
        fontSize: 12,
        color: GRAY,
        fontWeight: 500,
    },
    eyebrowArrow: {
        fontSize: 12,
        color: ORANGE,
    },

    headline: {
        fontFamily: "'Syne', 'Outfit', sans-serif",
        fontSize: "clamp(36px, 6vw, 64px)",
        fontWeight: 800,
        color: WHITE,
        lineHeight: 1.1,
        margin: 0,
        letterSpacing: "-0.02em",
        maxWidth: 780,
    },
    roleCycler: {
        color: ORANGE,
        display: "inline-block",
        borderBottom: `3px solid ${ORANGE}`,
        paddingBottom: 2,
    },

    sub: {
        fontSize: 16,
        color: GRAY,
        lineHeight: 1.7,
        margin: 0,
        maxWidth: 520,
        fontWeight: 300,
    },

    // Search
    searchWrap: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 14,
        width: "100%",
        maxWidth: 660,
    },
    searchBox: {
        display: "flex",
        alignItems: "center",
        background: DARK2,
        border: `1px solid ${BORDER2}`,
        borderRadius: 14,
        padding: "5px 5px 5px 16px",
        width: "100%",
        gap: 0,
    },
    searchIconLeft: {
        fontSize: 20,
        color: GRAY2,
        marginRight: 10,
        flexShrink: 0,
    },
    searchInput: {
        flex: 1,
        background: "transparent",
        border: "none",
        outline: "none",
        color: WHITE,
        fontSize: 15,
        fontFamily: "inherit",
        minWidth: 0,
    },
    searchDivider: {
        width: 1,
        height: 22,
        background: BORDER2,
        margin: "0 12px",
        flexShrink: 0,
    },
    searchSelect: {
        background: "transparent",
        border: "none",
        outline: "none",
        color: GRAY,
        fontSize: 13,
        fontFamily: "inherit",
        cursor: "pointer",
        paddingRight: 8,
        flexShrink: 0,
    },
    searchBtn: {
        background: ORANGE,
        color: WHITE,
        border: "none",
        borderRadius: 10,
        padding: "11px 22px",
        fontSize: 14,
        fontWeight: 700,
        cursor: "pointer",
        fontFamily: "inherit",
        flexShrink: 0,
        whiteSpace: "nowrap",
    },
    quickTags: {
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 7,
        justifyContent: "center",
    },
    quickLabel: {
        fontSize: 12,
        color: GRAY2,
        fontWeight: 500,
    },
    quickTag: {
        background: "transparent",
        border: `1px solid ${BORDER2}`,
        color: GRAY,
        borderRadius: 999,
        padding: "4px 12px",
        fontSize: 12,
        fontWeight: 500,
        cursor: "pointer",
        fontFamily: "inherit",
        transition: "all 0.15s",
    },

    // Stats
    statsRow: {
        display: "flex",
        alignItems: "center",
        gap: 0,
        background: DARK2,
        border: `1px solid ${BORDER}`,
        borderRadius: 14,
        padding: "16px 32px",
    },
    statItem: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
        padding: "0 28px",
        position: "relative",
    },
    statDivider: {
        position: "absolute",
        left: 0,
        top: "10%",
        height: "80%",
        width: 1,
        background: BORDER,
    },
    statNum: {
        fontFamily: "'Syne', sans-serif",
        fontSize: 22,
        fontWeight: 800,
        color: WHITE,
    },
    statLabel: {
        fontSize: 12,
        color: GRAY,
        fontWeight: 400,
    },

};
