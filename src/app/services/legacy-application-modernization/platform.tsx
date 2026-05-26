"use client";

import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────
   Data
 ───────────────────────────────────────────── */
const ENTERPRISE = [
  { name: "SharePoint",   icon: "SP", color: "#0078d4" }, // index 0
  { name: "InfoPath",     icon: "IP", color: "#7B3F9E" }, // index 1
  { name: "Nintex",       icon: "NX", color: "#E87722" }, // index 2
  { name: "Legacy .NET",  icon: ".N", color: "#512BD4" }, // index 3
  { name: "WPF",          icon: "WP", color: "#5C2D91" }, // index 4
  { name: "WinForms",     icon: "WF", color: "#68217A" }, // index 5
  { name: "SQL Server",   icon: "SQ", color: "#CC2927" }, // index 6
];

const MODERN = [
  { name: "React",            icon: "Re", color: "#ff5812" }, // index 0
  { name: "Node.js",          icon: "Nd", color: "#ff5812" }, // index 1
  { name: "Azure",            icon: "Az", color: "#ff5812" }, // index 2
  { name: "Power Platform",   icon: "PP", color: "#ff5812" }, // index 3
  { name: "Dataverse",        icon: "DV", color: "#ff5812" }, // index 4
  { name: "Power BI",         icon: "BI", color: "#ff5812" }, // index 5
  { name: "Microsoft Fabric", icon: "MF", color: "#ff5812" }, // index 6
];

/* Mapping: each enterprise index → modern index it connects to */
const PAIRS: [number, number][] = [
  [0, 3], // SharePoint -> Power Platform
  [1, 3], // InfoPath -> Power Platform
  [2, 3], // Nintex -> Power Platform
  [3, 0], // Legacy .NET -> React
  [3, 1], // Legacy .NET -> Node.js
  [3, 2], // Legacy .NET -> Azure
  [4, 0], // WPF -> React
  [5, 0], // WinForms -> React
  [6, 2], // SQL Server -> Azure
  [6, 4], // SQL Server -> Dataverse
  [6, 6], // SQL Server -> Microsoft Fabric
];

/* ─────────────────────────────────────────────
   Hooks
 ───────────────────────────────────────────── */
function useReveal(threshold = 0.08) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ─────────────────────────────────────────────
   Helper — position of element relative to an ancestor
 ───────────────────────────────────────────── */
function relativeCenter(el: HTMLElement, ancestor: HTMLElement) {
  let x = 0, y = 0;
  let cur: HTMLElement | null = el;
  while (cur && cur !== ancestor) {
    x += cur.offsetLeft;
    y += cur.offsetTop;
    cur = cur.offsetParent as HTMLElement | null;
  }
  return { x: x + el.offsetWidth / 2, y: y + el.offsetHeight / 2 };
}

/* ─────────────────────────────────────────────
   Connection Canvas — draws active/inactive paths
 ───────────────────────────────────────────── */
function ConnectionCanvas({
  enterpriseRefs,
  modernRefs,
  containerRef,
  visible,
  hoveredEnterprise,
  hoveredModern,
  activeSource,
  isMobile,
}: {
  enterpriseRefs:    any;
  modernRefs:        any;
  containerRef:      any;
  visible:           boolean;
  hoveredEnterprise: number | null;
  hoveredModern:     number | null;
  activeSource:      { type: "enterprise" | "modern"; index: number };
  isMobile:          boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(0);

  useEffect(() => {
    if (isMobile) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let animId: number;

    const resize = () => {
      canvas.width  = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };
    resize();

    const draw = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (visible) {
        progressRef.current = Math.min(progressRef.current + 0.018, 1);
      }

      const p = progressRef.current;
      if (p <= 0) { animId = requestAnimationFrame(draw); return; }

      const eased = 1 - Math.pow(1 - p, 3);
      const now = Date.now() / 1800;

      PAIRS.forEach(([ei, mi], idx) => {
        const eEl = enterpriseRefs.current[ei];
        const mEl = modernRefs.current[mi];
        if (!eEl || !mEl) return;

        const ec = relativeCenter(eEl, container);
        const mc = relativeCenter(mEl, container);

        /* 
           Symmetric connector dot centers:
           - Left item: dot is 19px inside rightmost edge
           - Right item: dot is 19px inside leftmost edge
        */
        const x1 = ec.x + eEl.offsetWidth / 2 - 19;
        const y1 = ec.y;
        const x2 = mc.x - mEl.offsetWidth / 2 + 19;
        const y2 = mc.y;

        const lineDelay = idx * 0.04;
        const lp = Math.max(0, Math.min(1, (eased - lineDelay) / (1 - lineDelay + 0.001)));
        if (lp <= 0) return;

        /* Bezier control points */
        const midX = (x1 + x2) / 2;
        const cx1  = midX;
        const cy1  = y1;
        const cx2  = midX;
        const cy2  = y2;

        const bx = (t: number) => (1-t)**3*x1 + 3*(1-t)**2*t*cx1 + 3*(1-t)*t**2*cx2 + t**3*x2;
        const by = (t: number) => (1-t)**3*y1 + 3*(1-t)**2*t*cy1 + 3*(1-t)*t**2*cy2 + t**3*y2;

        /* Is this pair currently active? */
        const isLineActive = hoveredEnterprise !== null
          ? (hoveredEnterprise === ei)
          : hoveredModern !== null
            ? (hoveredModern === mi)
            : (activeSource.type === "enterprise" ? activeSource.index === ei : activeSource.index === mi);

        if (isLineActive) {
          /* Gradient red -> orange */
          const grad = ctx.createLinearGradient(x1, y1, x2, y2);
          grad.addColorStop(0,   "rgba(239, 68, 68, 0.85)");
          grad.addColorStop(0.5, "rgba(255, 88, 18, 0.95)");
          grad.addColorStop(1,   "rgba(255, 140, 0, 0.85)");

          ctx.beginPath();
          ctx.moveTo(x1, y1);
          const STEPS = 80;
          for (let s = 1; s <= STEPS; s++) {
            const t = (s / STEPS) * lp;
            ctx.lineTo(bx(t), by(t));
          }
          ctx.strokeStyle = grad;
          ctx.lineWidth   = 2.2;
          ctx.stroke();

          /* Animated travelling neon dot */
          if (lp > 0.05) {
            const dotT = ((now + idx * 0.37) % 1) * lp;
            const dx   = bx(dotT);
            const dy   = by(dotT);

            /* Radial glow halo */
            const grd = ctx.createRadialGradient(dx, dy, 0, dx, dy, 7);
            grd.addColorStop(0, "rgba(255, 88, 18, 0.6)");
            grd.addColorStop(1, "rgba(255, 88, 18, 0)");
            ctx.beginPath();
            ctx.arc(dx, dy, 7, 0, Math.PI * 2);
            ctx.fillStyle = grd;
            ctx.fill();

            /* Core spark */
            ctx.beginPath();
            ctx.arc(dx, dy, 3, 0, Math.PI * 2);
            ctx.fillStyle = "#ff5812";
            ctx.fill();
          }
        } else {
          /* Draw inactive blueprint paths faintly */
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          const STEPS = 60;
          for (let s = 1; s <= STEPS; s++) {
            const t = (s / STEPS) * lp;
            ctx.lineTo(bx(t), by(t));
          }
          ctx.strokeStyle = "rgba(148, 163, 184, 0.15)"; // Faint slate for dark mode
          ctx.lineWidth   = 0.95;
          ctx.stroke();
        }
      });

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    const ro = new ResizeObserver(resize);
    ro.observe(container);

    return () => { cancelAnimationFrame(animId); ro.disconnect(); };
  }, [visible, enterpriseRefs, modernRefs, containerRef, hoveredEnterprise, hoveredModern, activeSource, isMobile]);

  if (isMobile) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width:  "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 10,
      }}
    />
  );
}

/* ─────────────────────────────────────────────
   Tech Item — symmetrically ordered row
 ───────────────────────────────────────────── */
function TechItem({
  item,
  index,
  visible,
  side,
  domRef,
  isLast,
  isActive,
  isSecondary,
  onEnter,
  onLeave,
}: {
  item:        { name: string; icon: string; color: string };
  index:       number;
  visible:     boolean;
  side:        "left" | "right";
  domRef:      (el: HTMLDivElement | null) => void;
  isLast:      boolean;
  isActive:    boolean;
  isSecondary: boolean;
  onEnter:     () => void;
  onLeave:     () => void;
}) {
  const isLeft = side === "left";
  const accent = isLeft ? "#ef4444" : "#ff5812";
  const isHighlighted = isActive || isSecondary;

  return (
    <div
      ref={domRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        display:        "flex",
        alignItems:     "center",
        gap:            "16px",
        padding:        "13px 16px",
        borderBottom:   isLast ? "none" : "1px solid rgba(255, 255, 255, 0.08)",
        cursor:         "default",
        position:       "relative",
        opacity:        visible ? 1 : 0,
        transform:      visible ? "none" : isLeft ? "translateX(-18px)" : "translateX(18px)",
        transition:     `opacity 0.55s ease ${index * 60}ms, transform 0.55s ease ${index * 60}ms, background 0.25s ease`,
        background:     isActive
          ? isLeft
            ? "linear-gradient(90deg, rgba(239, 68, 68, 0.15) 0%, transparent 100%)"
            : "linear-gradient(270deg, rgba(255, 88, 18, 0.15) 0%, transparent 100%)"
          : isSecondary
            ? isLeft
              ? "linear-gradient(90deg, rgba(239, 68, 68, 0.05) 0%, transparent 100%)"
              : "linear-gradient(270deg, rgba(255, 88, 18, 0.05) 0%, transparent 100%)"
            : "transparent",
      }}
    >
      {/* Primary Edge Highlight */}
      {isActive && (
        <div style={{
          position: "absolute",
          left:     isLeft ? 0 : undefined,
          right:    isLeft ? undefined : 0,
          top: 0, bottom: 0,
          width: "3px",
          background:   accent,
          borderRadius: "2px",
        }} />
      )}

      {/* Connected Secondary Edge Highlight */}
      {!isActive && isSecondary && (
        <div style={{
          position: "absolute",
          left:     isLeft ? 0 : undefined,
          right:    isLeft ? undefined : 0,
          top: 0, bottom: 0,
          width: "2px",
          background:   accent + "77",
          borderRadius: "1px",
        }} />
      )}

      {/* Symmetrical Left Dot Placement (for Right Side items) */}
      {!isLeft && (
        <div style={{
          width: "6px", height: "6px",
          borderRadius: "50%",
          background:  isActive ? accent : isSecondary ? accent + "88" : "#334155",
          boxShadow:   isActive ? `0 0 6px ${accent}` : "none",
          transition:  "background .25s, box-shadow .25s",
          flexShrink:  0,
        }} />
      )}

      {/* Symmetrical Icon/Monogram Placement */}
      <div style={{
        width: "38px", height: "38px",
        borderRadius: "8px",
        border:      `1px solid ${isActive ? accent + "55" : isSecondary ? accent + "33" : "rgba(255, 255, 255, 0.08)"}`,
        background:   isActive ? accent + "18" : isSecondary ? accent + "0a" : "rgba(255, 255, 255, 0.04)",
        display:      "flex", alignItems: "center", justifyContent: "center",
        flexShrink:   0,
        transition:   "border-color .25s, background .25s",
      }}>
        <span style={{
          fontFamily:    "'DM Sans', sans-serif",
          fontSize:      "11px",
          fontWeight:    700,
          letterSpacing: "-0.02em",
          color:         isHighlighted ? accent : "#64748b",
          transition:    "color .25s",
        }}>
          {item.icon}
        </span>
      </div>

      {/* Text / Name */}
      <span style={{
        fontFamily:    "'DM Sans', sans-serif",
        fontSize:      "14px",
        fontWeight:    isActive ? 700 : isSecondary ? 600 : 500,
        color:         isActive ? "#000000" : isSecondary ? "#475569" : "#64748b",
        flex:          1,
        transition:    "color .25s, font-weight .15s",
        letterSpacing: isActive ? "-0.01em" : "0",
      }}>
        {item.name}
      </span>

      {/* Symmetrical Right Dot Placement (for Left Side items) */}
      {isLeft && (
        <div style={{
          width: "6px", height: "6px",
          borderRadius: "50%",
          background:  isActive ? accent : isSecondary ? accent + "88" : "#334155",
          boxShadow:   isActive ? `0 0 6px ${accent}` : "none",
          transition:  "background .25s, box-shadow .25s",
          flexShrink:  0,
        }} />
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Column Header
 ───────────────────────────────────────────── */
function ColHeader({ label, accent, sub, visible, delay = "0ms" }: {
  label: string; accent: string; sub: string; visible: boolean; delay?: string;
}) {
  return (
    <div style={{
      marginBottom: "28px",
      opacity:   visible ? 1 : 0,
      transform: visible ? "none" : "translateY(12px)",
      transition: `opacity .6s ease ${delay}, transform .6s ease ${delay}`,
    }}>
      <div style={{ height:"2px", background:`linear-gradient(to right,${accent},transparent)`, marginBottom:"14px" }} />
      <div style={{ display:"flex", alignItems:"baseline", gap:"10px" }}>
        <h3 style={{ fontFamily:"'DM Sans', sans-serif", fontSize:"12.5px", fontWeight:700, color:accent, margin:0, letterSpacing:"0.14em", textTransform:"uppercase" }}>
          {label}
        </h3>
        <span style={{ fontFamily:"'DM Sans', sans-serif", fontSize:"11px", color:"#94a3b8", letterSpacing:"0.07em" }}>
          {sub}
        </span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Background Utilities
 ───────────────────────────────────────────── */
function NoiseBg() {
  return (
    <svg aria-hidden style={{ position:"absolute",inset:0,width:"100%",height:"100%",opacity:0.03,pointerEvents:"none" }}>
      <filter id="n4s"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>
      <rect width="100%" height="100%" filter="url(#n4s)"/>
    </svg>
  );
}

function GridLines() {
  return (
    <svg aria-hidden style={{ position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",opacity:0.025 }}>
      {Array.from({length:9}).map((_,i) => <line key={i} x1={`${i*12.5}%`} y1="0" x2={`${i*12.5}%`} y2="100%" stroke="#000" strokeWidth="0.5"/>)}
      {Array.from({length:13}).map((_,i) => <line key={i} x1="0" y1={`${i*8.33}%`} x2="100%" y2={`${i*8.33}%`} stroke="#000" strokeWidth="0.5"/>)}
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Main Component
 ───────────────────────────────────────────── */
export default function ExpertiseSection() {
  const { ref: heroRef,  visible: heroVisible  } = useReveal(0.1);
  const { ref: colsRef,  visible: colsVisible  } = useReveal(0.05);

  const [hoveredEnterprise, setHoveredEnterprise] = useState<number | null>(null);
  const [hoveredModern, setHoveredModern] = useState<number | null>(null);
  const [activeSource, setActiveSource] = useState<{ type: "enterprise" | "modern"; index: number }>({ type: "enterprise", index: 0 });

  const enterpriseRefs = useRef<(HTMLDivElement | null)[]>([]);
  const modernRefs     = useRef<(HTMLDivElement | null)[]>([]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isHovered = hoveredEnterprise !== null || hoveredModern !== null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,700&display=swap');
        *{box-sizing:border-box;}
        @keyframes pulse-dot{0%,100%{opacity:1;transform:scale(1);}50%{opacity:.4;transform:scale(.7);}}
        @keyframes scanline{0%{transform:translateY(-100%);}100%{transform:translateY(100vh);}}
        @keyframes marquee4{0%{transform:translateX(0);}100%{transform:translateX(-50%);}}
      `}</style>

      <section style={{ position:"relative", background:"#ffffff", overflow:"hidden", fontFamily:"'DM Sans', sans-serif" }}>
        <NoiseBg/>
        <GridLines/>

        <div aria-hidden style={{ position:"absolute",left:0,right:0,height:"2px",background:"linear-gradient(to bottom,transparent,rgba(0,0,0,0.01),transparent)",animation:"scanline 10s linear infinite",pointerEvents:"none",zIndex:1 }}/>
        <div aria-hidden style={{ position:"absolute",top:"-100px",left:"-80px",width:"360px",height:"360px",borderRadius:"50%",background:"radial-gradient(circle,rgba(255,88,18,0.05) 0%,transparent 70%)",pointerEvents:"none" }}/>
        <div aria-hidden style={{ position:"absolute",bottom:"-80px",right:"-80px",width:"360px",height:"360px",borderRadius:"50%",background:"radial-gradient(circle,rgba(192,57,43,0.03) 0%,transparent 70%)",pointerEvents:"none" }}/>

        <div style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "1200px",
          margin: isMobile ? "40px auto" : "80px auto",
          padding: isMobile ? "40px 20px" : "60px 48px",
          background: "rgba(248, 250, 252, 0.95)",
          backdropFilter: "blur(8px)",
          borderRadius: "32px",
          boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.08)",
        }}>

          {/* ── HEADER ── */}
          <div ref={heroRef} style={{ marginBottom:"72px" }}>
            <div style={{
              display:"flex",alignItems:"center",gap:"12px",marginBottom:"28px",
              opacity:heroVisible?1:0,transform:heroVisible?"none":"translateY(12px)",
              transition:"opacity .6s ease,transform .6s ease",
            }}>
              <span style={{ display:"inline-flex",alignItems:"center",gap:"6px",fontFamily:"'DM Sans', sans-serif",fontSize:"11px",fontWeight:700,letterSpacing:"0.2em",textTransform:"uppercase",color:"#ff5812" }}>
                <span style={{ width:"6px",height:"6px",borderRadius:"50%",background:"#ff5812",display:"inline-block",animation:"pulse-dot 2s ease-in-out infinite" }}/>
                Section 04
              </span>
              <div style={{ flex:1,height:"1px",background:"linear-gradient(to right,#ff5812,#eaeaea)" }}/>
              <span style={{ fontSize:"11px",letterSpacing:"0.2em",textTransform:"uppercase",color:"#000000",fontFamily:"'DM Sans', sans-serif",fontWeight:700 }}>
                Modernization Expertise
              </span>
            </div>

            <h2 style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
              fontWeight: 700,
              color: "#000000",
              lineHeight: 1.1,
              margin: "0 0 24px",
              letterSpacing: "-0.02em",
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "none" : "translateY(20px)",
              transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
            }}>
              Platforms & Technologies We Modernize
            </h2>

            <p style={{
              fontFamily:"'DM Sans', sans-serif",fontSize:"15px",fontWeight:400,color:"#555555",
              lineHeight:1.75,maxWidth:"500px",margin:0,
              opacity:heroVisible?1:0,transform:heroVisible?"none":"translateY(16px)",
              transition:"opacity .7s ease .25s,transform .7s ease .25s",
            }}>
              We take organizations from entrenched enterprise stacks to the modern platforms that power tomorrow's operations.
            </p>
          </div>

          {/* ── LEGEND ── */}
          <div style={{ display:"flex",alignItems:"center",gap:"32px",marginBottom:"48px",opacity:heroVisible?1:0,transition:"opacity .6s ease .35s" }}>
            <div style={{ height:"1px",flex:1,background:"linear-gradient(to right,rgba(192,57,43,0.3),#eaeaea)" }}/>
            <div style={{ display:"flex",gap:"24px",alignItems:"center" }}>
              <span style={{ display:"inline-flex",alignItems:"center",gap:"7px",fontFamily:"'DM Sans', sans-serif",fontSize:"10px",letterSpacing:"0.15em",textTransform:"uppercase",color:"#c0392b",fontWeight:700 }}>
                <span style={{ width:"20px",height:"1.5px",background:"#c0392b",display:"inline-block" }}/>
                Legacy stack
              </span>
              <span style={{ color:"#cccccc",fontSize:"14px" }}>→</span>
              <span style={{ display:"inline-flex",alignItems:"center",gap:"7px",fontFamily:"'DM Sans', sans-serif",fontSize:"10px",letterSpacing:"0.15em",textTransform:"uppercase",color:"#ff5812",fontWeight:700 }}>
                <span style={{ width:"20px",height:"1.5px",background:"#ff5812",display:"inline-block" }}/>
                Modern stack
              </span>
            </div>
            <div style={{ height:"1px",flex:1,background:"linear-gradient(to left,rgba(255,88,18,0.3),#eaeaea)" }}/>
          </div>

          {/* ── COLUMNS + CANVAS WRAPPER ── */}
          <div style={{ position:"relative" }}>

            <div
              ref={colsRef}
              style={{
                background: "linear-gradient(135deg, #09090b 0%, #16161a 100%)",
                border: "2px solid #ff5812",
                borderRadius: "24px",
                padding: isMobile ? "24px 20px" : "40px 48px",
                position: "relative",
                zIndex: 3,
                opacity: colsVisible ? 1 : 0,
                transform: colsVisible ? "none" : "translateY(20px)",
                transition: "opacity .8s ease .1s,transform .8s ease .1s",
                overflow: "hidden",
                boxShadow: "0 25px 50px -12px rgba(255, 88, 18, 0.18), 0 0 40px rgba(0, 0, 0, 0.6)",
              }}
            >
              {/* Canvas sits INSIDE the relative card wrapper */}
              <ConnectionCanvas
                enterpriseRefs={enterpriseRefs}
                modernRefs={modernRefs}
                containerRef={colsRef}
                visible={colsVisible}
                hoveredEnterprise={hoveredEnterprise}
                hoveredModern={hoveredModern}
                activeSource={activeSource}
                isMobile={isMobile}
              />

              {/* Inner Decorative Background Glows */}
              <div aria-hidden style={{ position: "absolute", top: "-50px", left: "-50px", width: "250px", height: "250px", borderRadius: "50%", background: "radial-gradient(circle, rgba(192,57,43,0.04) 0%, transparent 70%)", pointerEvents: "none", zIndex: 1 }} />
              <div aria-hidden style={{ position: "absolute", bottom: "-50px", right: "-50px", width: "250px", height: "250px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,88,18,0.04) 0%, transparent 70%)", pointerEvents: "none", zIndex: 1 }} />

              <div style={{ 
                display: "grid", 
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1px 1fr", 
                gap: isMobile ? "32px 0" : "0 56px", 
                position: "relative", 
                zIndex: 2 
              }}>

                {/* LEFT (LEGACY) */}
                <div>
                  <ColHeader label="Enterprise Platforms" accent="#ef4444" sub="— legacy foundations" visible={colsVisible}/>
                  {ENTERPRISE.map((item,i) => {
                    const isActive = hoveredEnterprise === i || (!isHovered && activeSource.type === "enterprise" && activeSource.index === i);
                    const isSecondary = (hoveredModern !== null && PAIRS.some(([ei, mi]) => ei === i && mi === hoveredModern)) ||
                      (!isHovered && activeSource.type === "modern" && PAIRS.some(([ei, mi]) => ei === i && mi === activeSource.index));

                    return (
                      <TechItem
                        key={item.name}
                        item={item}
                        index={i}
                        visible={colsVisible}
                        side="left"
                        domRef={el => { enterpriseRefs.current[i] = el; }}
                        isLast={i === ENTERPRISE.length - 1}
                        isActive={isActive}
                        isSecondary={isSecondary}
                        onEnter={() => {
                          setHoveredEnterprise(i);
                          setActiveSource({ type: "enterprise", index: i });
                        }}
                        onLeave={() => setHoveredEnterprise(null)}
                      />
                    );
                  })}
                </div>

                {/* SPINE (HIDDEN ON MOBILE) */}
                {!isMobile ? (
                  <div style={{ background: "linear-gradient(to bottom, transparent 5%, rgba(255, 255, 255, 0.08) 15%, rgba(255, 255, 255, 0.08) 85%, transparent 95%)", position: "relative" }}>
                    <div style={{
                      position: "absolute", top: "50%", left: "50%",
                      transform: "translate(-50%,-50%)",
                      width: "36px", height: "36px", borderRadius: "50%",
                      background: "#0a0a0c", border: "2px solid #ff5812",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      zIndex: 5, fontSize: "14px", color: "#ff5812", fontWeight: 800,
                      boxShadow: "0 2px 10px rgba(255, 88, 18, 0.15)"
                    }}>⇄</div>
                  </div>
                ) : (
                  <div style={{ height: "1px", background: "linear-gradient(to right, transparent, rgba(255, 255, 255, 0.08), transparent)", position: "relative", margin: "8px 0" }}>
                    <div style={{
                      position: "absolute", top: "50%", left: "50%",
                      transform: "translate(-50%,-50%)",
                      width: "36px", height: "36px", borderRadius: "50%",
                      background: "#0a0a0c", border: "2px solid #ff5812",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      zIndex: 5, fontSize: "14px", color: "#ff5812", fontWeight: 800,
                    }}>↓</div>
                  </div>
                )}

                {/* RIGHT (MODERN) */}
                <div>
                  <ColHeader label="Modern Platforms" accent="#ff5812" sub="— where we take you" visible={colsVisible} delay="80ms"/>
                  {MODERN.map((item,i) => {
                    const isActive = hoveredModern === i || (!isHovered && activeSource.type === "modern" && activeSource.index === i);
                    const isSecondary = (hoveredEnterprise !== null && PAIRS.some(([ei, mi]) => mi === i && ei === hoveredEnterprise)) ||
                      (!isHovered && activeSource.type === "enterprise" && PAIRS.some(([ei, mi]) => mi === i && ei === activeSource.index));

                    return (
                      <TechItem
                        key={item.name}
                        item={item}
                        index={i}
                        visible={colsVisible}
                        side="right"
                        domRef={el => { modernRefs.current[i] = el; }}
                        isLast={i === MODERN.length - 1}
                        isActive={isActive}
                        isSecondary={isSecondary}
                        onEnter={() => {
                          setHoveredModern(i);
                          setActiveSource({ type: "modern", index: i });
                        }}
                        onLeave={() => setHoveredModern(null)}
                      />
                    );
                  })}
                </div>

              </div>

              {/* UI Guide Tip (Desktop only) */}
              {!isMobile && (
                <div style={{
                  textAlign: "center",
                  marginTop: "32px",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "#64748b",
                  letterSpacing: "0.03em",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  borderTop: "1px dashed #f1f5f9",
                  paddingTop: "24px"
                }}>
                  <span style={{ color: "#ff5812" }}>✦</span>
                  Hover any platform to trace its automated migration path
                </div>
              )}

            </div>
          </div>

          {/* ── COUNTS ── */}
          <div style={{
            marginTop:"64px",
            display:"grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)",
            borderTop:"2px solid #000000",
            opacity:colsVisible?1:0,
            transition:"opacity .7s ease .6s",
          }}>
            {[
              { v:`${ENTERPRISE.length}`, l:"Legacy platforms",   accent:"#c0392b" },
              { v:`${ENTERPRISE.length+MODERN.length}`, l:"Total technologies", accent:"#ff5812" },
              { v:`${MODERN.length}`, l:"Modern targets",    accent:"#ff5812" },
            ].map((s,i) => (
              <div key={s.l} style={{
                padding:"28px 0",
                borderRight: !isMobile && i < 2 ? "2px solid #000000" : "none",
                borderBottom: isMobile && i < 2 ? "1px solid #e2e8f0" : "none",
                paddingLeft: !isMobile && i > 0 ? "28px" : "0",
                display:"flex",
                flexDirection:"column",
                gap:"4px",
              }}>
                <span style={{ fontFamily:"'DM Sans', sans-serif",fontSize:"40px",fontWeight:700,color:s.accent,letterSpacing:"-0.04em",lineHeight:1 }}>
                  {s.v}
                </span>
                <span style={{ fontFamily:"'DM Sans', sans-serif",fontSize:"10px",fontWeight:700,letterSpacing:"0.14em",textTransform:"uppercase",color:"#000000" }}>
                  {s.l}
                </span>
              </div>
            ))}
          </div>

          {/* ── TICKER ── */}
          <div style={{
            marginTop:"48px",overflow:"hidden",
            borderTop:"2px solid #000000",borderBottom:"2px solid #000000",
            padding:"13px 0",
            opacity:heroVisible?1:0,transition:"opacity .8s ease .7s",
          }}>
            <div style={{ display:"flex",gap:"40px",animation:"marquee4 28s linear infinite",whiteSpace:"nowrap" }}>
              {[...ENTERPRISE,...MODERN,...ENTERPRISE,...MODERN].map((t,i) => (
                <span key={i} style={{
                  fontFamily:"'DM Sans', sans-serif",fontSize:"10px",letterSpacing:"0.18em",
                  textTransform:"uppercase",fontWeight:700,flexShrink:0,
                  display:"flex",alignItems:"center",gap:"10px",
                  color:i%2===0?"#000000":"#ff5812",
                }}>
                  {t.name}<span style={{ color:"#ff5812",fontSize:"8px" }}>◆</span>
                </span>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}