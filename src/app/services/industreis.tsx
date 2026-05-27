"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface Stat { val: string; lbl: string }

interface Industry {
    id: string;
    name: string;
    icon: React.ReactNode;
    accent: string;
    desc: string;
    caps: string[];
    stats: Stat[];
}

const INDUSTRIES: Industry[] = [
    {
        id: "01", name: "Healthcare", accent: "#f97316",
        icon: <StethoscopeIcon />,
        desc: "We build HIPAA-compliant digital health platforms, patient portals, and AI-assisted diagnostic tools that modernise care delivery and improve clinical outcomes.",
        caps: ["Patient Portals", "EHR Integrations", "Telehealth", "Clinical AI", "Medical IoT", "Compliance Automation"],
        stats: [{ val: "3.2B+", lbl: "Records Managed" }, { val: "99.9%", lbl: "Uptime SLA" }, { val: "40%", lbl: "Cost Reduction" }],
    },
    {
        id: "02", name: "Finance", accent: "#f97316",
        icon: <BankIcon />,
        desc: "From fintech startups to enterprise banks, we engineer secure trading platforms, fraud detection systems, and open banking APIs that meet the demands of regulated markets.",
        caps: ["Core Banking", "Fraud Detection", "Open Banking APIs", "RegTech", "Payments Infrastructure", "Risk Analytics"],
        stats: [{ val: "<50ms", lbl: "Latency Target" }, { val: "$4T+", lbl: "Transactions Handled" }, { val: "ISO 27001", lbl: "Certified" }],
    },
    {
        id: "03", name: "Education", accent: "#f97316",
        icon: <SchoolIcon />,
        desc: "We create adaptive learning platforms, LMS integrations, and intelligent tutoring systems that help institutions deliver personalised education at scale.",
        caps: ["LMS Integration", "Adaptive Learning", "Student Analytics", "Virtual Classrooms", "Assessment Tools", "EdTech APIs"],
        stats: [{ val: "2M+", lbl: "Students Served" }, { val: "78%", lbl: "Engagement Lift" }, { val: "4.8/5", lbl: "Learner Rating" }],
    },
    {
        id: "04", name: "Retail", accent: "#f97316",
        icon: <CartIcon />,
        desc: "We power omnichannel retail experiences with AI recommendation engines, inventory intelligence platforms, and headless commerce architectures built for modern consumers.",
        caps: ["Omnichannel Commerce", "AI Recommendations", "Inventory Intelligence", "POS Systems", "Loyalty Platforms", "Supply Chain Visibility"],
        stats: [{ val: "35%", lbl: "Conversion Uplift" }, { val: "120ms", lbl: "Page Load P95" }, { val: "8.4×", lbl: "ROAS Average" }],
    },
    {
        id: "05", name: "HR & People", accent: "#f97316",
        icon: <UsersIcon />,
        desc: "From talent acquisition pipelines to workforce analytics dashboards, we build HR platforms that automate operations, reduce attrition, and surface actionable people insights.",
        caps: ["ATS Platforms", "Workforce Analytics", "HRIS Integration", "Onboarding Automation", "Performance Tools", "DEI Dashboards"],
        stats: [{ val: "60%", lbl: "Hiring Time Saved" }, { val: "22%", lbl: "Attrition Drop" }, { val: "98%", lbl: "HR Satisfaction" }],
    },
    {
        id: "06", name: "Manufacturing", accent: "#f97316",
        icon: <GearIcon />,
        desc: "We deliver Industry 4.0 solutions — predictive maintenance systems, digital twin platforms, and real-time OEE dashboards that connect shop floor to top floor.",
        caps: ["Predictive Maintenance", "Digital Twins", "OEE Dashboards", "SCADA Integration", "Quality Control AI", "Asset Tracking"],
        stats: [{ val: "28%", lbl: "OEE Improvement" }, { val: "$1.2M", lbl: "Avg Annual Saving" }, { val: "3× ROI", lbl: "Typical Return" }],
    },
    {
        id: "07", name: "Startups", accent: "#f97316",
        icon: <RocketIcon />,
        desc: "We are the technical co-founder you need — from MVP in weeks to scalable architecture — helping founders validate fast, ship confidently, and attract investors.",
        caps: ["MVP Development", "Technical Due Diligence", "Scalable Architecture", "Growth Engineering", "Fundraise-Ready Code", "CTO-as-a-Service"],
        stats: [{ val: "6 wks", lbl: "Avg MVP Timeline" }, { val: "150+", lbl: "Startups Launched" }, { val: "$320M", lbl: "Funding Raised" }],
    },
];

/* ============================================================
   CANVAS PROCEDURAL VISUALIZATIONS FOR INDUSTRIES
============================================================ */
function drawHealthcare(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
    const cy = h / 2;
    ctx.beginPath();
    ctx.strokeStyle = "rgba(249,115,22,0.12)";
    ctx.lineWidth = 1;
    ctx.moveTo(30, cy);
    ctx.lineTo(w - 30, cy);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(30, cy);
    for (let x = 30; x < w - 30; x++) {
        const norm = (x - 30) / (w - 60);
        const speed = t * 0.04;
        const pulsePos = (speed % 1);
        const dist = Math.abs(norm - pulsePos);
        let y = cy;
        if (dist < 0.05) {
            const scale = Math.sin((dist / 0.05) * Math.PI);
            y = cy - Math.sin(x * 0.4) * 26 * scale;
        }
        ctx.lineTo(x, y);
    }
    ctx.strokeStyle = "rgba(249,115,22,0.55)";
    ctx.lineWidth = 1.6;
    ctx.stroke();
}

function drawFinance(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
    const cy = h / 2;
    ctx.strokeStyle = "rgba(249,115,22,0.08)";
    ctx.lineWidth = 0.5;
    for (let i = 0; i < 8; i++) {
        const x = 50 + i * 35;
        ctx.beginPath();
        ctx.moveTo(x, 24);
        ctx.lineTo(x, h - 24);
        ctx.stroke();
    }
    for (let i = 0; i < 7; i++) {
        const x = 60 + i * 35;
        const center = cy + Math.sin(t * 0.04 + i) * 16 - i * 3;
        const high = center - 12 - Math.sin(t * 0.07) * 4;
        const low = center + 12 + Math.sin(t * 0.07) * 4;
        ctx.beginPath();
        ctx.moveTo(x, high);
        ctx.lineTo(x, low);
        ctx.strokeStyle = "rgba(249,115,22,0.35)";
        ctx.stroke();

        ctx.fillStyle = i % 2 === 0 ? "rgba(249,115,22,0.18)" : "rgba(74,222,128,0.18)";
        ctx.strokeStyle = i % 2 === 0 ? "rgba(249,115,22,0.5)" : "rgba(74,222,128,0.5)";
        ctx.fillRect(x - 5, center - 6, 10, 12);
        ctx.strokeRect(x - 5, center - 6, 10, 12);
    }
}

function drawEducation(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
    const cx = w / 2, cy = h / 2;
    const R = 54;
    const angle = t * 0.005;
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(249,115,22,0.12)";
    ctx.stroke();

    for (let i = 0; i < 4; i++) {
        const a = angle + (i * Math.PI) / 2;
        const nx = cx + Math.cos(a) * R;
        const ny = cy + Math.sin(a) * R;
        const pulse = (Math.sin(t * 0.07 + i) + 1) / 2;

        ctx.beginPath();
        ctx.arc(nx, ny, 3.5 + pulse * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(249,115,22,${0.25 + pulse * 0.5})`;
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(nx, ny);
        ctx.strokeStyle = "rgba(249,115,22,0.08)";
        ctx.stroke();
    }
    ctx.beginPath();
    ctx.arc(cx, cy, 7, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(249,115,22,0.5)";
    ctx.fill();
}

function drawRetail(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
    const cx = w / 2, cy = h / 2;
    ctx.strokeStyle = "rgba(249,115,22,0.08)";
    ctx.strokeRect(cx - 100, cy - 45, 200, 90);
    ctx.beginPath();
    ctx.moveTo(cx, cy - 45);
    ctx.lineTo(cx, cy + 45);
    ctx.stroke();

    for (let i = 0; i < 4; i++) {
        const ox = Math.sin(t * 0.04 + i * 2) * 12;
        const oy = Math.cos(t * 0.03 + i * 1.5) * 6;
        const px = cx - 80 + i * 48 + ox;
        const py = cy - 18 + oy;

        ctx.fillStyle = "rgba(249,115,22,0.06)";
        ctx.fillRect(px, py, 26, 20);
        ctx.strokeStyle = "rgba(249,115,22,0.35)";
        ctx.strokeRect(px, py, 26, 20);

        const scanY = py + ((t * 0.07 + i * 3) % 20);
        ctx.beginPath();
        ctx.moveTo(px, scanY);
        ctx.lineTo(px + 26, scanY);
        ctx.strokeStyle = "rgba(249,115,22,0.6)";
        ctx.stroke();
    }
}

function drawHR(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
    const cx = w / 2, cy = h / 2;
    const nodes = [
        { x: cx, y: cy - 26, r: 7 },
        { x: cx - 44, y: cy + 16, r: 5.5 },
        { x: cx + 44, y: cy + 16, r: 5.5 },
        { x: cx - 78, y: cy + 40, r: 3.5 },
        { x: cx - 18, y: cy + 40, r: 3.5 },
        { x: cx + 18, y: cy + 40, r: 3.5 },
        { x: cx + 78, y: cy + 40, r: 3.5 },
    ];

    ctx.strokeStyle = "rgba(249,115,22,0.1)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(nodes[0].x, nodes[0].y); ctx.lineTo(nodes[1].x, nodes[1].y);
    ctx.moveTo(nodes[0].x, nodes[0].y); ctx.lineTo(nodes[2].x, nodes[2].y);
    ctx.moveTo(nodes[1].x, nodes[1].y); ctx.lineTo(nodes[3].x, nodes[3].y);
    ctx.moveTo(nodes[1].x, nodes[1].y); ctx.lineTo(nodes[4].x, nodes[4].y);
    ctx.moveTo(nodes[2].x, nodes[2].y); ctx.lineTo(nodes[5].x, nodes[5].y);
    ctx.moveTo(nodes[2].x, nodes[2].y); ctx.lineTo(nodes[6].x, nodes[6].y);
    ctx.stroke();

    nodes.forEach((n, idx) => {
        const pulse = (Math.sin(t * 0.05 + idx) + 1) / 2;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + pulse * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(249,115,22,${0.25 + pulse * 0.5})`;
        ctx.fill();
        ctx.strokeStyle = "rgba(249,115,22,0.5)";
        ctx.stroke();
    });
}

function drawManufacturing(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
    const cx = w / 2, cy = h / 2;
    const drawGear = (x: number, y: number, r: number, teeth: number, speed: number) => {
        const angle = t * speed;
        ctx.beginPath();
        ctx.arc(x, y, r * 0.75, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(249,115,22,0.02)";
        ctx.fill();
        ctx.strokeStyle = "rgba(249,115,22,0.16)";
        ctx.stroke();

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);
        for (let i = 0; i < teeth; i++) {
            ctx.rotate((Math.PI * 2) / teeth);
            ctx.fillStyle = "rgba(249,115,22,0.35)";
            ctx.fillRect(-3.5, -r - 3.5, 7, 7);
        }
        ctx.restore();

        ctx.beginPath();
        ctx.arc(x, y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(249,115,22,0.55)";
        ctx.fill();
    };

    drawGear(cx - 30, cy - 8, 32, 12, 0.015);
    drawGear(cx + 30, cy + 14, 22, 8, -0.022);
}

function drawStartups(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
    const cx = w / 2, cy = h / 2;
    ctx.beginPath();
    ctx.moveTo(40, h - 24);
    ctx.quadraticCurveTo(cx - 20, h - 24, w - 40, 24);
    ctx.strokeStyle = "rgba(249,115,22,0.12)";
    ctx.lineWidth = 1;
    ctx.stroke();

    const prog = ((t * 0.007) % 1);
    const px = 40 + (w - 80) * prog;
    const t2 = prog;
    const mt = 1 - t2;
    const py = mt * mt * (h - 24) + 2 * mt * t2 * (h - 24) + t2 * t2 * 24;

    const pulse = (Math.sin(t * 0.09) + 1) / 2;
    ctx.beginPath();
    ctx.arc(px, py, 3.5 + pulse * 2, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(249,115,22,${0.35 + pulse * 0.55})`;
    ctx.fill();
    ctx.strokeStyle = "rgba(249,115,22,0.6)";
    ctx.stroke();
}

/* ============================================================
   MAIN COMPONENT
============================================================ */
export default function IndustriesSection() {
    const [active, setActive] = useState(0);
    const [hovered, setHovered] = useState<number | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const getDrawFn = (idx: number) => {
        switch (idx) {
            case 0: return drawHealthcare;
            case 1: return drawFinance;
            case 2: return drawEducation;
            case 3: return drawRetail;
            case 4: return drawHR;
            case 5: return drawManufacturing;
            case 6: return drawStartups;
            default: return drawHealthcare;
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
            const drawFn = getDrawFn(active);
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
    }, [active]);

    const ind = INDUSTRIES[active];

    return (
        <section style={{ background: "#09090f", padding: "96px 0 100px", position: "relative", overflow: "hidden" }}>
            <style>{`
        .ind-tabs-container {
          display: flex;
          gap: 12px;
          overflow-x: auto;
          padding-bottom: 12px;
          margin-bottom: 40px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          scrollbar-width: none; /* Firefox */
        }
        .ind-tabs-container::-webkit-scrollbar {
          display: none; /* Safari and Chrome */
        }
        @media (min-width: 1024px) {
          .ind-tabs-container {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            gap: 16px;
            overflow-x: visible;
            padding-bottom: 0;
            margin-bottom: 48px;
            border-bottom: none;
          }
        }
        .ind-tab-btn {
          position: relative;
          cursor: pointer;
          padding: 20px 16px;
          background: rgba(255,255,255,0.015);
          border: 1px solid rgba(255,255,255,0.04);
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          min-width: 130px;
          text-align: center;
        }
        .ind-tab-btn:hover {
          background: rgba(255,255,255,0.03);
          border-color: rgba(255,255,255,0.08);
          transform: translateY(-2px);
        }
        .ind-tab-btn.selected {
          background: rgba(249,115,22,0.06);
          border-color: rgba(249,115,22,0.3);
          box-shadow: 0 8px 24px rgba(249,115,22,0.08);
        }
        .ind-detail-card {
          border: 1.5px solid rgba(255,255,255,0.05);
          background: linear-gradient(145deg, rgba(255,255,255,0.015) 0%, rgba(255,255,255,0.002) 100%);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 32px;
          box-shadow: 0 32px 96px rgba(0,0,0,0.5);
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
          position: relative;
          overflow: hidden;
        }
        @media (min-width: 1024px) {
          .ind-detail-card {
            grid-template-columns: 1.1fr 1fr;
            gap: 56px;
            padding: 48px;
            align-items: start;
          }
        }
        .ind-stats-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
        }
        @media (min-width: 640px) {
          .ind-stats-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
          }
        }
      `}</style>

            {/* Grid bg */}
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "linear-gradient(rgba(255,255,255,.012) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.012) 1px,transparent 1px)", backgroundSize: "54px 54px" }} />
            {/* Glows */}
            <div style={{ position: "absolute", top: -180, right: -100, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(249,115,22,.05) 0%,transparent 65%)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: -200, left: -100, width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle,rgba(249,115,22,.06) 0%,transparent 65%)", pointerEvents: "none" }} />

            <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>

                {/* Header */}
                <div style={{ marginBottom: 72 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                        <div style={{ width: 26, height: 1, background: "#f97316", opacity: 0.65 }} />
                        <span style={{ fontSize: 10.5, letterSpacing: "0.2em", textTransform: "uppercase", color: "#f97316", fontWeight: 400 }}>
                            industries we serve
                        </span>
                    </div>
                    <h2 style={{ fontSize: "clamp(42px,6vw,68px)", fontWeight: 300, color: "rgba(255,255,255,.9)", lineHeight: 1.02, letterSpacing: "-.02em", marginBottom: 16 }}>
                        Built for <span style={{
                            fontStyle: "normal",
                            background: "linear-gradient(135deg, #ff8f3d 0%, #f97316 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            fontWeight: 600
                        }}>every</span> sector
                    </h2>
                    <p style={{ fontSize: 14.5, color: "rgba(255,255,255,.3)", lineHeight: 1.8, maxWidth: 480, fontWeight: 400 }}>
                        Deep domain expertise across seven core verticals — delivering secure solutions that fit your industry context, not just your tech stack.
                    </p>
                </div>

                {/* Top Tabs Container */}
                <div className="ind-tabs-container">
                    {INDUSTRIES.map((item, i) => {
                        const isSelected = active === i;
                        const isHov = hovered === i;
                        const rowTitleColor = isSelected
                            ? "rgba(255,255,255,.95)"
                            : isHov
                                ? "rgba(255,255,255,.7)"
                                : "rgba(255,255,255,.4)";

                        return (
                            <div
                                key={item.id}
                                onClick={() => setActive(i)}
                                onMouseEnter={() => setHovered(i)}
                                onMouseLeave={() => setHovered(null)}
                                className={`ind-tab-btn ${isSelected ? "selected" : ""}`}
                            >
                                <span style={{
                                    fontSize: 10,
                                    fontWeight: 500,
                                    color: isSelected ? "#f97316" : "rgba(255,255,255,0.25)",
                                    letterSpacing: "0.1em",
                                    transition: "color 0.25s",
                                }}>
                                    {item.id}
                                </span>

                                <div style={{
                                    color: isSelected ? "#f97316" : "rgba(255,255,255,0.4)",
                                    transform: isSelected ? "scale(1.1)" : "scale(1)",
                                    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}>
                                    {item.icon}
                                </div>

                                <span style={{
                                    fontSize: 13,
                                    fontWeight: 600,
                                    color: rowTitleColor,
                                    letterSpacing: "-0.01em",
                                    transition: "color 0.25s",
                                    whiteSpace: "nowrap",
                                }}>
                                    {item.name}
                                </span>

                                <div style={{
                                    position: "absolute",
                                    bottom: 0,
                                    left: "24px",
                                    right: "24px",
                                    height: 2,
                                    background: "#f97316",
                                    borderRadius: "2px 2px 0 0",
                                    opacity: isSelected ? 1 : 0,
                                    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                                    boxShadow: "0 0 10px rgba(249,115,22,0.8)",
                                }} />
                            </div>
                        );
                    })}
                </div>

                {/* Bottom: Immersive Detail showcase panel */}
                <div className="ind-detail-card">
                    
                    {/* Back light glow */}
                    <div style={{
                        position: "absolute", top: -80, right: -80, width: 260, height: 260,
                        background: `radial-gradient(circle, ${ind.accent}15 0%, transparent 70%)`,
                        pointerEvents: "none",
                    }} />

                    {/* Left Column: Info & Description */}
                    <div style={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between" }}>
                        <div>
                            {/* Panel header */}
                            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
                                <div style={{
                                    width: 44, height: 44, borderRadius: 12,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    background: `${ind.accent}22`, border: `1px solid ${ind.accent}33`,
                                    color: ind.accent,
                                }}>
                                    {ind.icon}
                                </div>
                                <span style={{
                                    fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase",
                                    color: ind.accent, fontWeight: 500,
                                }}>
                                    INDUSTRY {ind.id}
                                </span>
                            </div>

                            {/* Title & Desc */}
                            <h3 style={{
                                fontSize: "clamp(30px, 3.5vw, 44px)", fontWeight: 700,
                                color: "rgba(255,255,255,0.92)", lineHeight: 1.1,
                                margin: "0 0 18px", letterSpacing: "-.01em",
                            }}>
                                {ind.name}
                            </h3>

                            <p style={{
                                fontSize: 14.5, lineHeight: 1.8,
                                color: "rgba(255,255,255,0.36)",
                                marginBottom: 32,
                            }}>
                                {ind.desc}
                            </p>

                            <div style={{ height: 1, background: "rgba(255,255,255,0.065)", marginBottom: 24 }} />

                            {/* Capabilities */}
                            <div style={{ marginBottom: 32 }}>
                                <div style={{
                                    fontSize: 9.5, letterSpacing: "0.16em", textTransform: "uppercase",
                                    color: "rgba(255,255,255,.22)", marginBottom: 12,
                                }}>
                                    Core Capabilities
                                </div>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                                    {ind.caps.map((c) => (
                                        <span
                                            key={c}
                                            style={{
                                                fontSize: 9.5, letterSpacing: "0.05em",
                                                color: "rgba(255,255,255,.45)",
                                                padding: "5px 12px", borderRadius: 99,
                                                border: "1px solid rgba(255,255,255,.1)",
                                                background: "rgba(255,255,255,0.015)",
                                            }}
                                        >
                                            {c}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div style={{ height: 1, background: "rgba(255,255,255,0.065)", marginBottom: 24, marginTop: 20 }} />

                        {/* Footer buttons */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <ExploreLink href="/contact" label={ind.name} accent={ind.accent} />
                            <CtaButton />
                        </div>
                    </div>

                    {/* Right Column: Visualizer & Stats */}
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
                        {/* Interactive Procedural Canvas */}
                        <div style={{
                            position: "relative", width: "100%", height: 210,
                            borderRadius: 16, overflow: "hidden",
                            border: "1px solid rgba(255,255,255,0.05)",
                            background: "rgba(0,0,0,0.3)",
                            marginBottom: 32,
                            boxShadow: "inset 0 0 20px rgba(0,0,0,0.5)",
                        }}>
                            <canvas
                                ref={canvasRef}
                                style={{ display: "block", width: "100%", height: "100%" }}
                            />
                        </div>

                        {/* Stats Row */}
                        <div className="ind-stats-grid">
                            {ind.stats.map((s) => (
                                <div
                                    key={s.lbl}
                                    style={{
                                        background: "rgba(255,255,255,0.015)",
                                        border: "1px solid rgba(255,255,255,0.05)",
                                        borderRadius: 14, padding: "18px 20px",
                                    }}
                                >
                                    <div style={{
                                        fontSize: 26, fontWeight: 600,
                                        color: ind.accent, letterSpacing: "-.02em", lineHeight: 1,
                                    }}>
                                        {s.val}
                                    </div>
                                    <div style={{
                                        fontSize: 9, color: "rgba(255,255,255,0.22)",
                                        letterSpacing: "0.06em", textTransform: "uppercase", marginTop: 6,
                                    }}>
                                        {s.lbl}
                                    </div>
                                </div>
                            ))}
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
function ExploreLink({ href, label, accent }: { href: string; label: string; accent: string }) {
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
                color: accent, fontWeight: 600,
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
   INLINE CUSTOM SVG ICONS FOR INDUSTRIES
============================================================ */
function StethoscopeIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
            <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />
            <circle cx="20" cy="10" r="2" />
        </svg>
    );
}

function BankIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M8 10v11M12 10v11M16 10v11M20 10v11" />
        </svg>
    );
}

function SchoolIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 22v-4a2 2 0 0 0-4 0v4" />
            <path d="m18 10 3.447 1.724a1 1 0 0 1 .553.894V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-7.382a1 1 0 0 1 .553-.894L6 10Z" />
            <path d="M18 5v5M6 5v5" />
            <path d="M2 10 12 5l10 5" />
            <rect x="8" y="14" width="8" height="8" />
        </svg>
    );
}

function CartIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="8" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
        </svg>
    );
}

function UsersIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    );
}

function GearIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
        </svg>
    );
}

function RocketIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09Z" />
            <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2Z" />
            <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
            <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
        </svg>
    );
}