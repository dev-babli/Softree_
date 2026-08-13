"use client"

import React, { useEffect, useRef, useMemo } from "react"

/* ─── colour palette ─── */
const C = {
  navy:     "#0A0F3C",
  red:      "#E31E24",
  crimson:  "#9F1239",
  burgundy: "#701A75",
  indigo:   "#312E81",
  deepBlue: "#1E3A8A",
  orange:   "#EA580C",
  deepOrange:"#9A3412",
  charcoal: "#171717",
  nearBlack:"#09090B",
  midnight: "#020617",
  darkPurple:"#4C1D95",
  white05:  "rgba(255,255,255,0.05)",
  white10:  "rgba(255,255,255,0.10)",
  white15:  "rgba(255,255,255,0.15)",
  white20:  "rgba(255,255,255,0.20)",
  white30:  "rgba(255,255,255,0.30)",
  white50:  "rgba(255,255,255,0.50)",
} as const

/* ─── noise overlay ─── */
const NoiseOverlay = () => (
  <div
    className="absolute inset-0 opacity-[0.18] mix-blend-overlay pointer-events-none"
    style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
  />
)

/* ─── CSS keyframes (injected once) ─── */
const KEYFRAMES = `
@keyframes tv-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
@keyframes tv-float-delay { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
@keyframes tv-pulse { 0%,100%{opacity:0.3} 50%{opacity:0.7} }
@keyframes tv-pulse-glow { 0%,100%{opacity:0.15;transform:scale(1)} 50%{opacity:0.4;transform:scale(1.05)} }
@keyframes tv-build-up { 0%{transform:translateY(20px);opacity:0} 100%{transform:translateY(0);opacity:1} }
@keyframes tv-path-draw { 0%{stroke-dashoffset:200} 100%{stroke-dashoffset:0} }
@keyframes tv-expand { 0%{transform:scale(0.4);opacity:0} 100%{transform:scale(1);opacity:1} }
@keyframes tv-ring-expand { 0%{transform:scale(0.6);opacity:0} 100%{transform:scale(1);opacity:0.6} }
@keyframes tv-connect { 0%{stroke-dashoffset:100} 100%{stroke-dashoffset:0} }
@keyframes tv-activate { 0%{opacity:0.1;transform:scale(0.8)} 100%{opacity:1;transform:scale(1)} }
@keyframes tv-grow { 0%{transform:scaleY(0.3)} 100%{transform:scaleY(1)} }
@keyframes tv-fragment { 0%{transform:translate(0,0) rotate(0)} 30%{transform:translate(var(--fx),var(--fy)) rotate(var(--fr))} 100%{transform:translate(0,0) rotate(0)} }
@keyframes tv-stream { 0%{transform:translateX(-100%);opacity:0} 30%{opacity:1} 70%{opacity:1} 100%{transform:translateX(200%);opacity:0} }
@keyframes tv-workflow { 0%{opacity:0.15} 25%{opacity:1} 50%{opacity:0.15} 100%{opacity:0.15} }
@keyframes tv-signal { 0%{transform:scale(0.2);opacity:0.8} 100%{transform:scale(2.5);opacity:0} }
@keyframes tv-orbit { 0%{transform:rotate(0deg) translateX(var(--orbit-r)) rotate(0deg)} 100%{transform:rotate(360deg) translateX(var(--orbit-r)) rotate(-360deg)} }
@keyframes tv-breathe { 0%,100%{transform:scale(1);opacity:0.6} 50%{transform:scale(1.15);opacity:1} }
@keyframes tv-spin-slow { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
@keyframes tv-dash-flow { 0%{stroke-dashoffset:0} 100%{stroke-dashoffset:-40} }
`

let keyframesInjected = false
function useKeyframes() {
  useEffect(() => {
    if (keyframesInjected) return
    keyframesInjected = true
    const style = document.createElement("style")
    style.textContent = KEYFRAMES
    document.head.appendChild(style)
    return () => { /* keep injected across remounts */ }
  }, [])
}

/* ─── shared SVG primitives ─── */

interface NodeProps { cx: number; cy: number; r?: number; fill?: string; delay?: number; glow?: boolean }
const Node = ({ cx, cy, r = 4, fill = C.white30, delay = 0, glow }: NodeProps) => (
  <g>
    {glow && (
      <circle cx={cx} cy={cy} r={r * 3} fill={fill} opacity={0.15}
        style={{ animation: `tv-pulse-glow 3s ease-in-out ${delay}s infinite` }} />
    )}
    <circle cx={cx} cy={cy} r={r} fill={fill}
      style={{ animation: `tv-pulse 2.5s ease-in-out ${delay}s infinite` }} />
  </g>
)

interface LineProps { x1: number; y1: number; x2: number; y2: number; stroke?: string; delay?: number; dash?: boolean }
const FlowLine = ({ x1, y1, x2, y2, stroke = C.white15, delay = 0, dash }: LineProps) => {
  const len = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
  return (
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={stroke} strokeWidth={1}
      strokeDasharray={dash ? "4 4" : len}
      strokeDashoffset={dash ? 0 : len}
      style={{
        animation: dash
          ? `tv-dash-flow 2s linear ${delay}s infinite`
          : `tv-path-draw 1.5s ease-out ${delay}s forwards`
      }} />
  )
}

/* ─── individual year visuals ─── */

/* 2013 — FOUNDATION — blocks assembling into a stable structure */
function Foundation() {
  const blocks = [
    { x: 70, y: 150, w: 60, h: 14, delay: 0 },
    { x: 90, y: 132, w: 50, h: 14, delay: 0.2 },
    { x: 110, y: 114, w: 40, h: 14, delay: 0.4 },
    { x: 130, y: 96, w: 30, h: 14, delay: 0.6 },
    { x: 145, y: 78, w: 20, h: 14, delay: 0.8 },
    // side blocks
    { x: 50, y: 150, w: 18, h: 40, delay: 0.3 },
    { x: 132, y: 150, w: 18, h: 40, delay: 0.5 },
  ]
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: C.navy }}>
      {/* deep glow */}
      <div className="absolute bottom-0 left-1/4 w-3/4 h-3/4 rounded-full opacity-30 blur-[60px]"
        style={{ background: `radial-gradient(circle, ${C.burgundy}, transparent)` }} />
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet">
        {/* grid lines */}
        {[40, 60, 80, 100, 120, 140, 160].map(y => (
          <line key={`gh${y}`} x1="20" y1={y} x2="180" y2={y} stroke={C.white05} strokeWidth={0.5} />
        ))}
        {[40, 60, 80, 100, 120, 140, 160].map(x => (
          <line key={`gv${x}`} x1={x} y1="20" x2={x} y2="180" stroke={C.white05} strokeWidth={0.5} />
        ))}
        {/* foundation blocks */}
        {blocks.map((b, i) => (
          <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} rx={2}
            fill={i < 5 ? C.white10 : `${C.red}30`}
            stroke={i < 5 ? C.white15 : `${C.red}50`} strokeWidth={0.5}
            style={{ animation: `tv-build-up 0.8s ease-out ${b.delay}s both` }} />
        ))}
        {/* structural accent lines */}
        <line x1="100" y1="78" x2="100" y2="170" stroke={`${C.red}40`} strokeWidth={0.5}
          style={{ animation: `tv-build-up 1.2s ease-out 0.5s both` }} />
      </svg>
      <NoiseOverlay />
    </div>
  )
}

/* 2014 — BUILDING DELIVERY — path connecting left to right */
function Delivery() {
  const pathNodes = [
    { cx: 25, cy: 130 }, { cx: 55, cy: 110 }, { cx: 85, cy: 90 },
    { cx: 115, cy: 100 }, { cx: 145, cy: 80 }, { cx: 175, cy: 70 },
  ]
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: "#06112C" }}>
      <div className="absolute top-0 right-0 w-3/4 h-full opacity-25 blur-[50px]"
        style={{ background: `radial-gradient(circle at right, ${C.crimson}, transparent)` }} />
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet">
        {/* horizontal layers */}
        {[60, 100, 140].map((y, i) => (
          <rect key={i} x="15" y={y} width="170" height={1} fill={C.white05} rx={0.5} />
        ))}
        {/* connecting path */}
        <polyline points={pathNodes.map(n => `${n.cx},${n.cy}`).join(" ")}
          fill="none" stroke={`${C.red}60`} strokeWidth={1.5}
          strokeDasharray="300" strokeDashoffset="300"
          strokeLinecap="round" strokeLinejoin="round"
          style={{ animation: "tv-path-draw 2.5s ease-out 0.3s forwards" }} />
        {/* nodes along the path */}
        {pathNodes.map((n, i) => (
          <Node key={i} cx={n.cx} cy={n.cy} r={3.5} fill={C.white30} delay={0.3 + i * 0.3} />
        ))}
        {/* small arrows / direction indicators */}
        {pathNodes.slice(0, -1).map((n, i) => {
          const next = pathNodes[i + 1]
          const mx = (n.cx + next.cx) / 2
          const my = (n.cy + next.cy) / 2
          return (
            <polygon key={`a${i}`} points={`${mx - 2},${my - 2} ${mx + 3},${my} ${mx - 2},${my + 2}`}
              fill={C.white20}
              style={{ animation: `tv-expand 0.6s ease-out ${0.5 + i * 0.3}s both` }} />
          )
        })}
      </svg>
      <NoiseOverlay />
    </div>
  )
}

/* 2015 — DIGITAL ENGINEERING — central core expanding into connected elements */
function Expansion() {
  const branches = Array.from({ length: 8 }, (_, i) => {
    const angle = (i * Math.PI * 2) / 8
    return {
      x: Number((100 + Math.cos(angle) * 55).toFixed(4)),
      y: Number((100 + Math.sin(angle) * 55).toFixed(4)),
      delay: i * 0.15,
    }
  })
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: "#1E1B4B" }}>
      <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] rounded-full opacity-30 blur-[60px]"
        style={{ background: C.deepOrange }} />
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet">
        {/* expanding rings */}
        {[20, 35, 55].map((r, i) => (
          <circle key={i} cx="100" cy="100" r={r} fill="none" stroke={C.white10}
            strokeWidth={0.5} strokeDasharray="3 5"
            style={{ animation: `tv-ring-expand 1.5s ease-out ${i * 0.3}s both` }} />
        ))}
        {/* connection lines from center to branches */}
        {branches.map((b, i) => (
          <FlowLine key={i} x1={100} y1={100} x2={b.x} y2={b.y}
            stroke={`${C.red}30`} delay={0.3 + b.delay} />
        ))}
        {/* branch nodes */}
        {branches.map((b, i) => (
          <g key={`bn${i}`} style={{ animation: `tv-expand 0.6s ease-out ${0.5 + b.delay}s both` }}>
            <rect x={b.x - 6} y={b.y - 6} width={12} height={12} rx={2}
              fill={i % 3 === 0 ? `${C.red}40` : C.white10} stroke={C.white15} strokeWidth={0.5} />
          </g>
        ))}
        {/* central core */}
        <circle cx="100" cy="100" r="10" fill={`${C.red}30`} stroke={C.white20} strokeWidth={1}
          style={{ animation: "tv-breathe 3s ease-in-out infinite" }} />
        <circle cx="100" cy="100" r="4" fill={C.white50} />
      </svg>
      <NoiseOverlay />
    </div>
  )
}

/* 2016 — GROWING WITH CLIENTS — partnership network */
function Connection() {
  const centers = [{ cx: 70, cy: 80 }, { cx: 135, cy: 115 }]
  const satellites = [
    { cx: 40, cy: 60 }, { cx: 55, cy: 120 }, { cx: 95, cy: 50 },
    { cx: 110, cy: 140 }, { cx: 160, cy: 80 }, { cx: 165, cy: 150 },
  ]
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: C.navy }}>
      <div className="absolute bottom-0 left-0 w-full h-3/4 opacity-25 blur-[50px]"
        style={{ background: `radial-gradient(circle at center, ${C.burgundy}, transparent)` }} />
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet">
        {/* connections between centers */}
        <FlowLine x1={centers[0].cx} y1={centers[0].cy} x2={centers[1].cx} y2={centers[1].cy}
          stroke={`${C.red}50`} delay={0.2} />
        {/* connections from centers to satellites */}
        {satellites.map((s, i) => {
          const center = i < 3 ? centers[0] : centers[1]
          return <FlowLine key={i} x1={center.cx} y1={center.cy} x2={s.cx} y2={s.cy}
            stroke={C.white15} delay={0.4 + i * 0.2} />
        })}
        {/* inter-satellite connections */}
        <FlowLine x1={satellites[2].cx} y1={satellites[2].cy} x2={satellites[4].cx} y2={satellites[4].cy}
          stroke={C.white10} delay={1.2} dash />
        <FlowLine x1={satellites[1].cx} y1={satellites[1].cy} x2={satellites[3].cx} y2={satellites[3].cy}
          stroke={C.white10} delay={1.4} dash />
        {/* satellite nodes */}
        {satellites.map((s, i) => (
          <Node key={i} cx={s.cx} cy={s.cy} r={3} fill={C.white30} delay={0.5 + i * 0.15} />
        ))}
        {/* center nodes */}
        {centers.map((c, i) => (
          <Node key={`c${i}`} cx={c.cx} cy={c.cy} r={6} fill={`${C.red}50`} delay={0.2} glow />
        ))}
      </svg>
      <NoiseOverlay />
    </div>
  )
}

/* 2017 — ENTERPRISE SOLUTIONS — structured grid of modules connecting */
function Enterprise() {
  const modules = [
    { x: 30, y: 35, w: 35, h: 25 }, { x: 75, y: 35, w: 50, h: 25 },
    { x: 135, y: 35, w: 35, h: 25 },
    { x: 30, y: 75, w: 50, h: 30 }, { x: 90, y: 75, w: 35, h: 30 },
    { x: 135, y: 75, w: 35, h: 30 },
    { x: 30, y: 120, w: 35, h: 25 }, { x: 75, y: 120, w: 50, h: 25 },
    { x: 135, y: 120, w: 35, h: 25 },
  ]
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: C.charcoal }}>
      <div className="absolute top-0 right-0 w-3/4 h-3/4 opacity-20 blur-[60px]"
        style={{ background: C.crimson }} />
      <div className="absolute bottom-0 left-0 w-2/3 h-2/3 opacity-20 blur-[60px]"
        style={{ background: C.indigo }} />
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 170" preserveAspectRatio="xMidYMid meet">
        {/* modules */}
        {modules.map((m, i) => (
          <g key={i} style={{ animation: `tv-activate 0.6s ease-out ${i * 0.12}s both` }}>
            <rect x={m.x} y={m.y} width={m.w} height={m.h} rx={3}
              fill={[0, 4, 8].includes(i) ? `${C.red}15` : C.white05}
              stroke={[0, 4, 8].includes(i) ? `${C.red}40` : C.white10} strokeWidth={0.5} />
            {/* small detail bars inside modules */}
            <rect x={m.x + 4} y={m.y + 4} width={m.w * 0.5} height={2} rx={1} fill={C.white15} />
            <rect x={m.x + 4} y={m.y + 9} width={m.w * 0.3} height={2} rx={1} fill={C.white10} />
          </g>
        ))}
        {/* vertical connectors */}
        {[47, 100, 152].map((x, i) => (
          <line key={`v${i}`} x1={x} y1="60" x2={x} y2="75" stroke={C.white20} strokeWidth={0.5}
            strokeDasharray="20" strokeDashoffset="20"
            style={{ animation: `tv-path-draw 0.5s ease-out ${0.8 + i * 0.15}s forwards` }} />
        ))}
        {[47, 100, 152].map((x, i) => (
          <line key={`v2${i}`} x1={x} y1="105" x2={x} y2="120" stroke={C.white20} strokeWidth={0.5}
            strokeDasharray="20" strokeDashoffset="20"
            style={{ animation: `tv-path-draw 0.5s ease-out ${1.0 + i * 0.15}s forwards` }} />
        ))}
      </svg>
      <NoiseOverlay />
    </div>
  )
}

/* 2018 — MICROSOFT ECOSYSTEM — four modular tiles connecting */
function Ecosystem() {
  const tiles = [
    { x: 65, y: 55, color: `${C.deepBlue}90` },
    { x: 105, y: 55, color: `${C.red}60` },
    { x: 65, y: 95, color: `${C.indigo}60` },
    { x: 105, y: 95, color: `${C.deepOrange}60` },
  ]
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: C.navy }}>
      <div className="absolute inset-0 opacity-30"
        style={{ background: `linear-gradient(135deg, ${C.deepBlue}, transparent)` }} />
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 opacity-15 blur-[50px]"
        style={{ background: C.red }} />
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet">
        {/* platform grid */}
        {[40, 60, 80, 100, 120, 140, 160].map(v => (
          <React.Fragment key={v}>
            <line x1="40" y1={v} x2="160" y2={v} stroke={C.white05} strokeWidth={0.3} />
            <line x1={v} y1="40" x2={v} y2="160" stroke={C.white05} strokeWidth={0.3} />
          </React.Fragment>
        ))}
        {/* four modular tiles */}
        {tiles.map((t, i) => (
          <g key={i}>
            <rect x={t.x} y={t.y} width={28} height={28} rx={4}
              fill={t.color} stroke={C.white20} strokeWidth={0.5}
              style={{ animation: `tv-expand 0.8s ease-out ${0.3 + i * 0.2}s both` }} />
            {/* inner detail */}
            <rect x={t.x + 6} y={t.y + 6} width={16} height={2} rx={1} fill={C.white20}
              style={{ animation: `tv-expand 0.5s ease-out ${0.6 + i * 0.2}s both` }} />
            <rect x={t.x + 6} y={t.y + 11} width={10} height={2} rx={1} fill={C.white10}
              style={{ animation: `tv-expand 0.5s ease-out ${0.7 + i * 0.2}s both` }} />
          </g>
        ))}
        {/* connection lines between tiles */}
        <line x1="93" y1="69" x2="105" y2="69" stroke={C.white30} strokeWidth={1}
          strokeDasharray="12" strokeDashoffset="12"
          style={{ animation: "tv-path-draw 0.6s ease-out 1.2s forwards" }} />
        <line x1="79" y1="83" x2="79" y2="95" stroke={C.white30} strokeWidth={1}
          strokeDasharray="12" strokeDashoffset="12"
          style={{ animation: "tv-path-draw 0.6s ease-out 1.3s forwards" }} />
        <line x1="119" y1="83" x2="119" y2="95" stroke={C.white30} strokeWidth={1}
          strokeDasharray="12" strokeDashoffset="12"
          style={{ animation: "tv-path-draw 0.6s ease-out 1.4s forwards" }} />
        <line x1="93" y1="109" x2="105" y2="109" stroke={C.white30} strokeWidth={1}
          strokeDasharray="12" strokeDashoffset="12"
          style={{ animation: "tv-path-draw 0.6s ease-out 1.5s forwards" }} />
        {/* outer orbit ring */}
        <circle cx="100" cy="100" r="62" fill="none" stroke={C.white05} strokeWidth={0.5}
          strokeDasharray="3 6" />
      </svg>
      <NoiseOverlay />
    </div>
  )
}

/* 2019 — SCALING ENGINEERING — growing upward structure */
function Scaling() {
  const layers = [
    { y: 150, w: 140, h: 10, nodes: 7 },
    { y: 130, w: 120, h: 10, nodes: 6 },
    { y: 110, w: 100, h: 10, nodes: 5 },
    { y: 90, w: 80, h: 10, nodes: 4 },
    { y: 70, w: 60, h: 10, nodes: 3 },
    { y: 50, w: 40, h: 10, nodes: 2 },
  ]
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: "#2E1065" }}>
      <div className="absolute top-0 left-0 w-full h-full opacity-25 blur-[50px]"
        style={{ background: `linear-gradient(to top right, ${C.crimson}, transparent 60%)` }} />
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet">
        {layers.map((l, i) => {
          const x = 100 - l.w / 2
          return (
            <g key={i} style={{
              transformOrigin: "100px 160px",
              animation: `tv-grow 0.8s ease-out ${i * 0.15}s both`
            }}>
              <rect x={x} y={l.y} width={l.w} height={l.h} rx={2}
                fill={i === 0 ? `${C.red}20` : C.white05}
                stroke={i === 0 ? `${C.red}40` : C.white10} strokeWidth={0.5} />
              {/* nodes on each layer */}
              {Array.from({ length: l.nodes }, (_, ni) => {
                const nx = x + (l.w / (l.nodes + 1)) * (ni + 1)
                return <circle key={ni} cx={nx} cy={l.y + l.h / 2} r={2}
                  fill={C.white20}
                  style={{ animation: `tv-pulse 2s ease-in-out ${i * 0.2 + ni * 0.1}s infinite` }} />
              })}
            </g>
          )
        })}
        {/* upward arrow accent */}
        <line x1="100" y1="165" x2="100" y2="40" stroke={`${C.red}30`} strokeWidth={0.5}
          strokeDasharray="3 4"
          style={{ animation: "tv-build-up 1.5s ease-out 0.5s both" }} />
        <polygon points="96,44 100,35 104,44" fill={`${C.red}40`}
          style={{ animation: "tv-expand 0.5s ease-out 1.5s both" }} />
      </svg>
      <NoiseOverlay />
    </div>
  )
}

/* 2020 — ADAPTATION — fragments reorganizing into structure */
function Adaptation() {
  const fragments = useMemo(() => [
    { x: 40, y: 40, w: 25, h: 20, fx: "-15px", fy: "-20px", fr: "-15deg" },
    { x: 80, y: 30, w: 30, h: 15, fx: "10px", fy: "-25px", fr: "20deg" },
    { x: 130, y: 45, w: 20, h: 25, fx: "20px", fy: "-10px", fr: "-25deg" },
    { x: 35, y: 90, w: 35, h: 15, fx: "-25px", fy: "5px", fr: "12deg" },
    { x: 85, y: 80, w: 25, h: 25, fx: "5px", fy: "15px", fr: "-18deg" },
    { x: 125, y: 85, w: 30, h: 20, fx: "18px", fy: "12px", fr: "22deg" },
    { x: 50, y: 130, w: 20, h: 20, fx: "-12px", fy: "20px", fr: "-10deg" },
    { x: 90, y: 125, w: 35, h: 15, fx: "8px", fy: "18px", fr: "15deg" },
    { x: 140, y: 135, w: 25, h: 18, fx: "22px", fy: "8px", fr: "-20deg" },
  ], [])
  
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: "#0A0A0A" }}>
      <div className="absolute inset-0 opacity-20"
        style={{ background: `linear-gradient(135deg, ${C.crimson}, transparent, ${C.deepOrange})` }} />
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet">
        {/* diagonal disruption lines */}
        <line x1="0" y1="0" x2="200" y2="200" stroke={C.white05} strokeWidth={0.5} />
        <line x1="200" y1="0" x2="0" y2="200" stroke={C.white05} strokeWidth={0.5} />
        {/* fragments */}
        {fragments.map((f, i) => (
          <rect key={i} x={f.x} y={f.y} width={f.w} height={f.h} rx={2}
            fill={i === 4 ? `${C.red}20` : C.white05}
            stroke={i === 4 ? `${C.red}40` : C.white10} strokeWidth={0.5}
            style={{
              "--fx": f.fx, "--fy": f.fy, "--fr": f.fr,
              animation: `tv-fragment 4s ease-in-out ${i * 0.2}s infinite`,
            } as React.CSSProperties} />
        ))}
        {/* reorganization lines (appear after fragments settle) */}
        <line x1="50" y1="100" x2="150" y2="100" stroke={`${C.red}25`} strokeWidth={0.5}
          strokeDasharray="100" strokeDashoffset="100"
          style={{ animation: "tv-path-draw 2s ease-out 1.5s forwards" }} />
        <line x1="100" y1="30" x2="100" y2="160" stroke={`${C.red}25`} strokeWidth={0.5}
          strokeDasharray="130" strokeDashoffset="130"
          style={{ animation: "tv-path-draw 2s ease-out 1.8s forwards" }} />
      </svg>
      <NoiseOverlay />
    </div>
  )
}

/* 2021 — CLOUD & DATA — particles flowing through a network */
function DataFlow() {
  const netNodes = [
    { cx: 40, cy: 60 }, { cx: 100, cy: 40 }, { cx: 160, cy: 55 },
    { cx: 55, cy: 110 }, { cx: 100, cy: 100 }, { cx: 150, cy: 105 },
    { cx: 70, cy: 155 }, { cx: 120, cy: 150 }, { cx: 170, cy: 145 },
  ]
  const connections: [number, number][] = [
    [0, 1], [1, 2], [0, 3], [1, 4], [2, 5],
    [3, 4], [4, 5], [3, 6], [4, 7], [5, 8], [6, 7], [7, 8],
  ]
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: C.midnight }}>
      <div className="absolute top-[15%] left-[15%] w-[70%] h-[70%] opacity-25 blur-[50px]"
        style={{ background: C.indigo }} />
      <div className="absolute bottom-[10%] right-[10%] w-[50%] h-[50%] opacity-15 blur-[40px]"
        style={{ background: C.crimson }} />
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet">
        {/* network connections */}
        {connections.map(([a, b], i) => (
          <FlowLine key={i}
            x1={netNodes[a].cx} y1={netNodes[a].cy}
            x2={netNodes[b].cx} y2={netNodes[b].cy}
            stroke={C.white10} delay={i * 0.1} />
        ))}
        {/* flowing particles along connections */}
        {connections.slice(0, 6).map(([a, b], i) => {
          const na = netNodes[a], nb = netNodes[b]
          const dx = nb.cx - na.cx, dy = nb.cy - na.cy
          const len = Math.sqrt(dx * dx + dy * dy)
          const angle = Number((Math.atan2(dy, dx) * (180 / Math.PI)).toFixed(4))
          return (
            <g key={`p${i}`} transform={`translate(${na.cx},${na.cy}) rotate(${angle})`}>
              <rect x={0} y={-1} width={6} height={2} rx={1} fill={`${C.red}60`}
                style={{
                  animation: `tv-stream ${1.5 + i * 0.3}s ease-in-out ${i * 0.4}s infinite`,
                }} />
            </g>
          )
        })}
        {/* network nodes */}
        {netNodes.map((n, i) => (
          <Node key={i} cx={n.cx} cy={n.cy} r={3.5}
            fill={[1, 4, 7].includes(i) ? `${C.red}60` : C.white30}
            delay={i * 0.1}
            glow={[4].includes(i)} />
        ))}
      </svg>
      <NoiseOverlay />
    </div>
  )
}

/* 2022 — POWER PLATFORM & AUTOMATION — sequential workflow */
function Automation() {
  const stages = [
    { cx: 30, cy: 100, label: "1" },
    { cx: 65, cy: 70, label: "2" },
    { cx: 100, cy: 100, label: "3" },
    { cx: 135, cy: 70, label: "4" },
    { cx: 170, cy: 100, label: "5" },
  ]
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: C.navy }}>
      <div className="absolute inset-0 opacity-25"
        style={{ background: `linear-gradient(to bottom, transparent, ${C.crimson}40, ${C.deepOrange}40)` }} />
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet">
        {/* workflow path */}
        <polyline
          points={stages.map(s => `${s.cx},${s.cy}`).join(" ")}
          fill="none" stroke={C.white15} strokeWidth={1}
          strokeDasharray="300" strokeDashoffset="300"
          strokeLinecap="round" strokeLinejoin="round"
          style={{ animation: "tv-path-draw 2s ease-out 0.3s forwards" }}
        />
        {/* stage nodes */}
        {stages.map((s, i) => (
          <g key={i}>
            {/* outer ring */}
            <circle cx={s.cx} cy={s.cy} r={14} fill="none" stroke={C.white10} strokeWidth={0.5}
              style={{ animation: `tv-expand 0.6s ease-out ${0.3 + i * 0.25}s both` }} />
            {/* inner module */}
            <rect x={s.cx - 9} y={s.cy - 9} width={18} height={18} rx={3}
              fill={`${C.red}15`} stroke={`${C.red}40`} strokeWidth={0.5}
              style={{ animation: `tv-workflow 2.5s ease-in-out ${i * 0.5}s infinite` }} />
            {/* small detail inside */}
            <rect x={s.cx - 5} y={s.cy - 3} width={10} height={2} rx={1} fill={C.white20}
              style={{ animation: `tv-workflow 2.5s ease-in-out ${i * 0.5}s infinite` }} />
            <rect x={s.cx - 5} y={s.cy + 2} width={6} height={2} rx={1} fill={C.white10}
              style={{ animation: `tv-workflow 2.5s ease-in-out ${i * 0.5}s infinite` }} />
          </g>
        ))}
        {/* directional arrows between stages */}
        {stages.slice(0, -1).map((s, i) => {
          const next = stages[i + 1]
          const mx = (s.cx + next.cx) / 2
          const my = (s.cy + next.cy) / 2
          const angle = Number((Math.atan2(next.cy - s.cy, next.cx - s.cx) * 180 / Math.PI).toFixed(4))
          return (
            <polygon key={`arr${i}`}
              points={`0,-2.5 5,0 0,2.5`}
              fill={`${C.red}50`}
              transform={`translate(${mx},${my}) rotate(${angle})`}
              style={{ animation: `tv-workflow 2.5s ease-in-out ${i * 0.5 + 0.2}s infinite` }} />
          )
        })}
      </svg>
      <NoiseOverlay />
    </div>
  )
}

/* 2023 — MODERN MICROSOFT + AI — central intelligence radiating signals */
function Intelligence() {
  const outerNodes = Array.from({ length: 10 }, (_, i) => {
    const angle = (i * Math.PI * 2) / 10 - Math.PI / 2
    const r = 60 + (i % 2 === 0 ? 0 : 10)
    return {
      cx: Number((100 + Math.cos(angle) * r).toFixed(4)),
      cy: Number((100 + Math.sin(angle) * r).toFixed(4)),
      delay: i * 0.15
    }
  })
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: "#1E1B4B" }}>
      <div className="absolute top-0 right-0 w-3/4 h-3/4 opacity-20 blur-[60px]"
        style={{ background: C.burgundy }} />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 opacity-15 blur-[40px]"
        style={{ background: C.red }} />
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet">
        {/* signal pulses from center */}
        {[0, 1, 2].map(i => (
          <circle key={`sig${i}`} cx="100" cy="100" r="12" fill="none"
            stroke={`${C.red}40`} strokeWidth={0.8}
            style={{ animation: `tv-signal 3s ease-out ${i * 1}s infinite` }} />
        ))}
        {/* connection lines */}
        {outerNodes.map((n, i) => (
          <FlowLine key={i} x1={100} y1={100} x2={n.cx} y2={n.cy}
            stroke={`${C.red}20`} delay={0.3 + n.delay} />
        ))}
        {/* modular structures at some nodes */}
        {outerNodes.map((n, i) => (
          <g key={`on${i}`} style={{ animation: `tv-expand 0.6s ease-out ${0.5 + n.delay}s both` }}>
            {i % 2 === 0 ? (
              <rect x={n.cx - 5} y={n.cy - 5} width={10} height={10} rx={2}
                fill={C.white10} stroke={C.white15} strokeWidth={0.5} />
            ) : (
              <circle cx={n.cx} cy={n.cy} r={4} fill={C.white10} stroke={C.white15} strokeWidth={0.5} />
            )}
          </g>
        ))}
        {/* central glowing core */}
        <circle cx="100" cy="100" r="14" fill={`${C.red}20`} stroke={`${C.red}60`} strokeWidth={1}
          style={{ animation: "tv-breathe 2.5s ease-in-out infinite" }} />
        <circle cx="100" cy="100" r="6" fill={C.white50}
          style={{ animation: "tv-pulse 2s ease-in-out infinite" }} />
      </svg>
      <NoiseOverlay />
    </div>
  )
}

/* 2024 — ENTERPRISE AI — convergence of multiple orbiting systems */
function Convergence() {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: C.nearBlack }}>
      <div className="absolute top-0 left-0 w-full h-full opacity-20 blur-[50px]"
        style={{ background: `linear-gradient(135deg, ${C.darkPurple}, transparent, ${C.crimson})` }} />
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet">
        {/* orbit rings */}
        {[30, 50, 70].map((r, i) => (
          <circle key={`ring${i}`} cx="100" cy="100" r={r} fill="none"
            stroke={C.white05} strokeWidth={0.5}
            strokeDasharray={i === 1 ? "4 4" : "none"}
            style={{ animation: `tv-ring-expand 1.5s ease-out ${i * 0.3}s both` }} />
        ))}
        {/* orbiting elements */}
        {[
          { r: 30, dur: "8s", delay: "0s", color: `${C.red}70`, size: 4 },
          { r: 30, dur: "8s", delay: "4s", color: C.white30, size: 3 },
          { r: 50, dur: "12s", delay: "1s", color: `${C.deepBlue}90`, size: 5 },
          { r: 50, dur: "12s", delay: "7s", color: C.white20, size: 3 },
          { r: 70, dur: "16s", delay: "2s", color: `${C.indigo}80`, size: 4 },
          { r: 70, dur: "16s", delay: "10s", color: `${C.deepOrange}60`, size: 3.5 },
        ].map((orb, i) => (
          <g key={`orb${i}`} style={{
            "--orbit-r": `${orb.r}px`,
            transformOrigin: "100px 100px",
            animation: `tv-orbit ${orb.dur} linear ${orb.delay} infinite`,
          } as React.CSSProperties}>
            <circle cx={100 + orb.r} cy={100} r={orb.size}
              fill={orb.color} />
          </g>
        ))}
        {/* data stream lines converging */}
        {[
          { x1: 15, y1: 30, x2: 85, y2: 88 },
          { x1: 185, y1: 40, x2: 115, y2: 90 },
          { x1: 20, y1: 170, x2: 88, y2: 112 },
          { x1: 180, y1: 165, x2: 112, y2: 112 },
        ].map((l, i) => (
          <FlowLine key={`conv${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
            stroke={`${C.red}20`} delay={0.5 + i * 0.3} />
        ))}
        {/* central convergence core */}
        <circle cx="100" cy="100" r="12" fill={`${C.red}15`} stroke={`${C.red}50`} strokeWidth={1}
          style={{ animation: "tv-breathe 3s ease-in-out infinite" }} />
        <circle cx="100" cy="100" r="5" fill={C.white50}
          style={{ animation: "tv-pulse 2s ease-in-out infinite" }} />
      </svg>
      <NoiseOverlay />
    </div>
  )
}

/* 2025 — INTELLIGENT ENTERPRISE — alive ecosystem with flows and intelligence */
function IntelligentEnterprise() {
  const systemNodes = [
    // inner ring (enterprise modules)
    { cx: 100, cy: 55, r: 7, type: "rect" as const },
    { cx: 145, cy: 78, r: 6, type: "rect" as const },
    { cx: 150, cy: 120, r: 6, type: "circle" as const },
    { cx: 125, cy: 155, r: 5, type: "rect" as const },
    { cx: 75, cy: 155, r: 5, type: "circle" as const },
    { cx: 50, cy: 120, r: 6, type: "rect" as const },
    { cx: 55, cy: 78, r: 6, type: "circle" as const },
  ]
  const outerSatellites = [
    { cx: 100, cy: 25 }, { cx: 165, cy: 55 }, { cx: 175, cy: 130 },
    { cx: 140, cy: 175 }, { cx: 60, cy: 175 }, { cx: 25, cy: 130 },
    { cx: 35, cy: 55 },
  ]
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: C.navy }}>
      <div className="absolute inset-0 opacity-20"
        style={{ background: `radial-gradient(ellipse at top right, ${C.deepOrange}80, transparent)` }} />
      <div className="absolute inset-0 opacity-15"
        style={{ background: `radial-gradient(circle at bottom left, ${C.red}80, transparent)` }} />
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet">
        {/* outer orbit ring */}
        <circle cx="100" cy="100" r="80" fill="none" stroke={C.white05} strokeWidth={0.3}
          strokeDasharray="4 6"
          style={{ animation: "tv-spin-slow 60s linear infinite" }} />
        {/* inner orbit ring */}
        <circle cx="100" cy="100" r="55" fill="none" stroke={C.white10} strokeWidth={0.5}
          strokeDasharray="2 4" />
        {/* connections: center → inner nodes */}
        {systemNodes.map((n, i) => (
          <FlowLine key={`ci${i}`} x1={100} y1={100} x2={n.cx} y2={n.cy}
            stroke={`${C.red}25`} delay={i * 0.1} />
        ))}
        {/* connections: inner → outer satellites */}
        {systemNodes.map((n, i) => (
          <FlowLine key={`io${i}`} x1={n.cx} y1={n.cy}
            x2={outerSatellites[i].cx} y2={outerSatellites[i].cy}
            stroke={C.white10} delay={0.5 + i * 0.1} dash />
        ))}
        {/* data streams between adjacent inner nodes */}
        {systemNodes.map((n, i) => {
          const next = systemNodes[(i + 1) % systemNodes.length]
          const dx = next.cx - n.cx, dy = next.cy - n.cy
          const angle = Number((Math.atan2(dy, dx) * (180 / Math.PI)).toFixed(4))
          return (
            <g key={`ds${i}`} transform={`translate(${n.cx},${n.cy}) rotate(${angle})`}>
              <rect x={0} y={-1} width={5} height={2} rx={1} fill={`${C.red}50`}
                style={{ animation: `tv-stream ${2 + i * 0.2}s ease-in-out ${i * 0.3}s infinite` }} />
            </g>
          )
        })}
        {/* inner system nodes */}
        {systemNodes.map((n, i) => (
          <g key={`sn${i}`} style={{ animation: `tv-expand 0.6s ease-out ${0.3 + i * 0.1}s both` }}>
            {n.type === "rect" ? (
              <rect x={n.cx - n.r} y={n.cy - n.r} width={n.r * 2} height={n.r * 2} rx={2}
                fill={i === 0 ? `${C.red}25` : C.white10}
                stroke={i === 0 ? `${C.red}50` : C.white15} strokeWidth={0.5} />
            ) : (
              <circle cx={n.cx} cy={n.cy} r={n.r}
                fill={C.white10} stroke={C.white15} strokeWidth={0.5} />
            )}
          </g>
        ))}
        {/* outer satellite dots */}
        {outerSatellites.map((s, i) => (
          <circle key={`os${i}`} cx={s.cx} cy={s.cy} r={2.5}
            fill={C.white20}
            style={{ animation: `tv-pulse 3s ease-in-out ${i * 0.3}s infinite` }} />
        ))}
        {/* central intelligence core — most prominent */}
        <circle cx="100" cy="100" r="18" fill={`${C.red}10`} stroke={`${C.red}30`} strokeWidth={0.5}
          style={{ animation: "tv-breathe 3s ease-in-out infinite" }} />
        <circle cx="100" cy="100" r="10" fill={`${C.red}20`} stroke={`${C.red}50`} strokeWidth={1}
          style={{ animation: "tv-breathe 2.5s ease-in-out 0.5s infinite" }} />
        <circle cx="100" cy="100" r="4" fill={C.white50}
          style={{ animation: "tv-pulse 2s ease-in-out infinite" }} />
        {/* signal ripples from core */}
        {[0, 1, 2].map(i => (
          <circle key={`rip${i}`} cx="100" cy="100" r="10" fill="none"
            stroke={`${C.red}30`} strokeWidth={0.6}
            style={{ animation: `tv-signal 3.5s ease-out ${i * 1.2}s infinite` }} />
        ))}
      </svg>
      <NoiseOverlay />
    </div>
  )
}

/* ─── visual configuration map ─── */
const timelineVisuals: Record<string, React.ComponentType> = {
  "2013": Foundation,
  "2014": Delivery,
  "2015": Expansion,
  "2016": Connection,
  "2017": Enterprise,
  "2018": Ecosystem,
  "2019": Scaling,
  "2020": Adaptation,
  "2021": DataFlow,
  "2022": Automation,
  "2023": Intelligence,
  "2024": Convergence,
  "2025": IntelligentEnterprise,
}

/* ─── exported visual card component ─── */
interface TimelineVisualCardProps {
  year: string
}

export default function TimelineVisualCard({ year }: TimelineVisualCardProps) {
  useKeyframes()
  const Visual = timelineVisuals[year] || Foundation
  return <Visual />
}
