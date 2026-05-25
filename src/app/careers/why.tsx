import { useState } from "react";

const PERKS = [
    {
        icon: "◎",
        title: "Fast Career Growth",
        desc: "Accelerate your career with structured mentorship, clear promotion paths, and real ownership from day one.",
        stat: "3x",
        statLabel: "faster promotions",
    },
    {
        icon: "⊕",
        title: "Remote & Hybrid",
        desc: "Work from anywhere. We offer fully remote and hybrid setups designed around your life, not the other way.",
        stat: "100%",
        statLabel: "flexible schedules",
    },
    {
        icon: "◈",
        title: "AI & Enterprise Projects",
        desc: "Ship AI-powered products used by Fortune 500 companies. Work with LLMs, Power Platform, and cutting-edge stacks.",
        stat: "50+",
        statLabel: "enterprise clients",
    },
    {
        icon: "▣",
        title: "Learning & Certifications",
        desc: "We fund your growth — Microsoft, AWS, Google certs fully sponsored. Weekly tech talks and hands-on workshops.",
        stat: "$2k",
        statLabel: "annual learning budget",
    },
    {
        icon: "◉",
        title: "Global Client Exposure",
        desc: "Work directly with clients across the US, UK, Europe and Asia. Build a truly international portfolio.",
        stat: "20+",
        statLabel: "countries served",
    },
    {
        icon: "◐",
        title: "Innovative Culture",
        desc: "No bureaucracy. Just a driven, friendly team that ships fast, celebrates wins, and supports each other.",
        stat: "4.9★",
        statLabel: "Glassdoor rating",
    },
];

export default function WhyJoinUs() {
    const [hovered, setHovered] = useState<number | null>(null);

    return (
        <div style={s.root}>
            {/* bg grid */}
            <div style={s.grid} />
            <div style={s.orb1} />
            <div style={s.orb2} />

            <div style={s.inner}>

                {/* Header */}
                <div style={s.header}>
                    <p style={s.eyebrow}>— why softree?</p>
                    <h2 style={s.title}>
                        Where great careers<br />
                        <span style={s.titleAccent}>actually happen.</span>
                    </h2>
                    <p style={s.subtitle}>
                        We're not just another tech company. We build fast, grow people,
                        and work on things that matter.
                    </p>
                    <div style={s.dividerLine} />
                </div>

                {/* Grid of cards */}
                <div style={s.cardsGrid}>
                    {PERKS.map((perk, i) => {
                        const isHovered = hovered === i;
                        return (
                            <div
                                key={i}
                                style={{
                                    ...s.card,
                                    ...(isHovered ? s.cardHovered : {}),
                                }}
                                onMouseEnter={() => setHovered(i)}
                                onMouseLeave={() => setHovered(null)}
                            >
                                {/* Top accent bar */}
                                <div style={{ ...s.topBar, opacity: isHovered ? 1 : 0 }} />

                                {/* Icon */}
                                <div style={{ ...s.iconWrap, ...(isHovered ? s.iconWrapHovered : {}) }}>
                                    <span style={s.iconChar}>{perk.icon}</span>
                                </div>

                                {/* Text */}
                                <div style={s.cardContent}>
                                    <h3 style={{ ...s.cardTitle, ...(isHovered ? s.cardTitleHovered : {}) }}>
                                        {perk.title}
                                    </h3>
                                    <p style={s.cardDesc}>{perk.desc}</p>
                                </div>

                                {/* Stat */}
                                <div style={{ ...s.statRow, ...(isHovered ? s.statRowHovered : {}) }}>
                                    <span style={s.statNum}>{perk.stat}</span>
                                    <span style={s.statLabel}>{perk.statLabel}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom CTA */}
                <div style={s.cta}>
                    <div style={s.ctaLeft}>
                        <p style={s.ctaTitle}>Ready to build something great?</p>
                        <p style={s.ctaSub}>Join 200+ engineers already at Softree.</p>
                    </div>
                    <div style={s.ctaBtns}>
                        <button style={s.btnSecondary}>View open roles</button>
                        <button style={s.btnPrimary}>Apply now →</button>
                    </div>
                </div>

            </div>
        </div>
    );
}

const ORANGE = "#F97316";
const ORANGE_DARK = "#EA6C0A";
const BLACK = "#080808";
const DARK = "#0F0F0F";
const DARK2 = "#141414";
const DARK3 = "#1C1C1C";
const BORDER = "#222222";
const BORDER2 = "#2C2C2C";
const WHITE = "#FFFFFF";
const GRAY = "#888888";
const GRAY2 = "#444444";

const s: Record<string, React.CSSProperties> = {
    root: {
        position: "relative",
        background: BLACK,
        fontFamily: "'Outfit', 'DM Sans', sans-serif",
        overflow: "hidden",
        padding: "80px 0",
    },
    grid: {
        position: "absolute",
        inset: 0,
        backgroundImage: `
      linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)
    `,
        backgroundSize: "60px 60px",
        pointerEvents: "none",
        zIndex: 0,
    },
    orb1: {
        position: "absolute",
        top: -100,
        right: -80,
        width: 420,
        height: 420,
        borderRadius: "50%",
        background: ORANGE,
        opacity: 0.06,
        filter: "blur(90px)",
        pointerEvents: "none",
        zIndex: 0,
    },
    orb2: {
        position: "absolute",
        bottom: -80,
        left: -60,
        width: 320,
        height: 320,
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
        maxWidth: 1080,
        margin: "0 auto",
        padding: "0 32px",
        display: "flex",
        flexDirection: "column",
        gap: 56,
    },

    // Header
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
        fontSize: "clamp(32px, 5vw, 52px)",
        fontWeight: 800,
        color: WHITE,
        lineHeight: 1.1,
        margin: 0,
        letterSpacing: "-0.02em",
    },
    titleAccent: { color: ORANGE },
    subtitle: {
        fontSize: 16,
        color: GRAY,
        fontWeight: 300,
        lineHeight: 1.7,
        maxWidth: 480,
        margin: 0,
    },
    dividerLine: {
        width: 48,
        height: 3,
        borderRadius: 999,
        background: ORANGE,
        marginTop: 6,
    },

    // Cards grid
    cardsGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        gap: 14,
    },

    card: {
        background: DARK2,
        border: `1px solid ${BORDER}`,
        borderRadius: 16,
        padding: "28px 24px 22px",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        cursor: "default",
        transition: "border-color 0.2s, background 0.2s, transform 0.2s",
        position: "relative",
        overflow: "hidden",
    },
    cardHovered: {
        borderColor: ORANGE,
        background: "#141008",
        transform: "translateY(-4px)",
    },

    topBar: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        background: ORANGE,
        borderRadius: "16px 16px 0 0",
        transition: "opacity 0.2s",
    },

    iconWrap: {
        width: 48,
        height: 48,
        borderRadius: 12,
        background: DARK3,
        border: `1px solid ${BORDER2}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background 0.2s, border-color 0.2s",
        flexShrink: 0,
    },
    iconWrapHovered: {
        background: "#2A1A08",
        borderColor: ORANGE,
    },
    iconChar: {
        fontSize: 22,
        color: ORANGE,
        lineHeight: 1,
    },

    cardContent: {
        display: "flex",
        flexDirection: "column",
        gap: 8,
        flex: 1,
    },
    cardTitle: {
        fontFamily: "'Syne', 'Outfit', sans-serif",
        fontSize: 16,
        fontWeight: 700,
        color: WHITE,
        margin: 0,
        lineHeight: 1.2,
        transition: "color 0.2s",
    },
    cardTitleHovered: {
        color: ORANGE,
    },
    cardDesc: {
        fontSize: 13,
        color: GRAY,
        lineHeight: 1.65,
        margin: 0,
        fontWeight: 300,
    },

    statRow: {
        display: "flex",
        alignItems: "baseline",
        gap: 8,
        paddingTop: 14,
        borderTop: `1px solid ${BORDER}`,
        transition: "border-color 0.2s",
    },
    statRowHovered: {
        borderColor: "#3A2A10",
    },
    statNum: {
        fontFamily: "'Syne', sans-serif",
        fontSize: 20,
        fontWeight: 800,
        color: ORANGE,
    },
    statLabel: {
        fontSize: 12,
        color: GRAY,
        fontWeight: 400,
    },

    // CTA
    cta: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: DARK2,
        border: `1px solid ${BORDER}`,
        borderRadius: 16,
        padding: "28px 32px",
        gap: 24,
        flexWrap: "wrap",
    },
    ctaLeft: {
        display: "flex",
        flexDirection: "column",
        gap: 4,
    },
    ctaTitle: {
        fontFamily: "'Syne', sans-serif",
        fontSize: 20,
        fontWeight: 700,
        color: WHITE,
        margin: 0,
    },
    ctaSub: {
        fontSize: 14,
        color: GRAY,
        margin: 0,
        fontWeight: 300,
    },
    ctaBtns: {
        display: "flex",
        gap: 10,
        flexShrink: 0,
    },
    btnSecondary: {
        background: "transparent",
        border: `1px solid ${BORDER2}`,
        color: GRAY,
        borderRadius: 9,
        padding: "11px 20px",
        fontSize: 13,
        fontWeight: 600,
        cursor: "pointer",
        fontFamily: "inherit",
        whiteSpace: "nowrap",
    },
    btnPrimary: {
        background: ORANGE,
        border: "none",
        color: WHITE,
        borderRadius: 9,
        padding: "11px 22px",
        fontSize: 13,
        fontWeight: 700,
        cursor: "pointer",
        fontFamily: "inherit",
        whiteSpace: "nowrap",
    },
};