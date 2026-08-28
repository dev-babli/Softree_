"use client";

import React, { useState } from "react";
import { Server, Shield, Database, Cpu, GitMerge, Cpu as Chip, Zap, Settings, Activity } from "lucide-react";

// High-fidelity Isometric Server chassis rendering inside Layer 2
const IsometricServerChassis = ({ x, y, size = 60 }: { x: number; y: number; size?: number }) => (
  <g transform={`translate(${x}, ${y})`} className="drop-shadow-[0_8px_16px_rgba(0,195,255,0.25)]">
    {/* Left Isometric Wall */}
    <path d={`M 0 ${size / 2} L 0 ${size} L ${size * 0.86} ${size * 1.5} L ${size * 0.86} ${size} Z`} fill="#0b1e3d" stroke="#00C3FF" strokeWidth="1.2" />
    {/* Right Isometric Wall */}
    <path d={`M ${size * 0.86} ${size} L ${size * 0.86} ${size * 1.5} L ${size * 1.72} ${size} L ${size * 1.72} ${size / 2} Z`} fill="#050e1f" stroke="#00C3FF" strokeWidth="1.2" />
    {/* Top Isometric Plate */}
    <path d={`M 0 ${size / 2} L ${size * 0.86} 0 L ${size * 1.72} ${size / 2} L ${size * 0.86} ${size} Z`} fill="#0e2852" stroke="#00C3FF" strokeWidth="1.5" />

    {/* Front panel details (LED slots & ventilation lines) */}
    <line x1={size * 0.22} y1={size * 0.72} x2={size * 0.65} y2={size * 0.95} stroke="#FF6B2C" strokeWidth="2" className="animate-pulse" />
    <line x1={size * 0.22} y1={size * 0.88} x2={size * 0.65} y2={size * 1.11} stroke="#00F0B4" strokeWidth="2" />
    <line x1={size * 0.22} y1={size * 1.04} x2={size * 0.65} y2={size * 1.27} stroke="#00C3FF" strokeWidth="2" />

    {/* Active cooling vent indicators on the top face */}
    <ellipse cx={size * 0.86} cy={size / 2} rx={size * 0.3} ry={size * 0.15} fill="none" stroke="rgba(0,195,255,0.3)" strokeWidth="1" />
    <circle cx={size * 0.86} cy={size / 2} r="2" fill="#00F0B4" className="animate-ping" />
  </g>
);

export default function AiArchitectureShowcase() {
  const [hoveredLayer, setHoveredLayer] = useState<number | null>(null);
  const [hoveredCardId, setHoveredCardId] = useState<number | null>(null);

  const leftLabels = [
    {
      id: 1,
      num: "01",
      layer: 1,
      title: "AI ARCHITECTS",
      subtitle: "AI & Solution Architecture",
      points: [
        "LLM & GenAI Strategy",
        "Agentic AI Design",
        "Enterprise AI Roadmaps"
      ],
      icon: <Shield className="w-5 h-5 text-orange-500" />,
    },
    {
      id: 2,
      num: "02",
      layer: 2,
      title: "AI ENGINEERS",
      subtitle: "LLM & Generative AI",
      points: [
        "RAG & AI Agents",
        "Model Integration",
        "Prompt Engineering"
      ],
      icon: <BrainIcon className="w-5 h-5 text-blue-500" />,
    },
    {
      id: 3,
      num: "03",
      layer: 3,
      title: "FULL-STACK ENGINEERS",
      subtitle: "Web & Mobile Applications",
      points: [
        "APIs & Microservices",
        "AI Application Integration",
        "UI/UX Development"
      ],
      icon: <GitMerge className="w-5 h-5 text-cyan-400" />,
    },
  ];

  const rightLabels = [
    {
      id: 4,
      num: "04",
      layer: 3,
      title: "DATA ENGINEERS",
      subtitle: "Data Engineering",
      points: [
        "ETL & Data Pipelines",
        "Vector Databases",
        "Data Platforms & Analytics"
      ],
      icon: <Database className="w-5 h-5 text-cyan-400" />,
    },
    {
      id: 5,
      num: "05",
      layer: 4,
      title: "QA & AI TESTING",
      subtitle: "AI Model Validation",
      points: [
        "Test Automation",
        "Functional & API Testing",
        "Performance & Quality Engineering"
      ],
      icon: <Zap className="w-5 h-5 text-orange-400" />,
    },
    {
      id: 6,
      num: "06",
      layer: 4,
      title: "CLOUD & DEVOPS",
      subtitle: "Azure Cloud Engineering",
      points: [
        "CI/CD & MLOps",
        "Cloud Security",
        "Monitoring & Scalability"
      ],
      icon: <Server className="w-5 h-5 text-blue-600" />,
    },
  ];

  const processSteps = ["STRATEGY", "ARCHITECT", "BUILD", "INTEGRATE", "TEST", "DEPLOY", "SCALE"];
  const businessImpacts = ["ACCELERATE DELIVERY", "REDUCE COSTS", "IMPROVE QUALITY", "SCALE AI", "DRIVE INNOVATION"];

  // Helper to determine translation offsets when stack is hovered/expanded
  const getLayerTransform = (layerIndex: number) => {
    const defaultSpacing = [0, 60, 120, 180]; // Visual Z-spacing
    const hoverSpacing = [0, 80, 160, 240]; // Expanded Z-spacing on hover
    
    const baseZ = hoveredLayer !== null ? hoverSpacing[4 - layerIndex] : defaultSpacing[4 - layerIndex];
    const hoverOffset = hoveredLayer === layerIndex ? 20 : 0; // Active shift up
    
    return `translateZ(${baseZ + hoverOffset}px)`;
  };

  // Dynamic Y coordinate matching for 3 row slots inside the taller 560px container
  const getTargetY = (layerIndex: number) => {
    const centerY = 280; // Vertical center of the h-[560px] container
    const zSpacingDefault = [180, 120, 60, 0];
    const zSpacingHover = [240, 160, 80, 0];
    
    let z = zSpacingDefault[layerIndex - 1];
    if (hoveredLayer !== null) {
      z = zSpacingHover[layerIndex - 1];
      if (hoveredLayer === layerIndex) {
        z += 20; // Shift active layer up in Z
      }
    }
    
    // Y visual projection: centerY - Z * sin(55deg) [where sin(55deg) is approx 0.82]
    return centerY - z * 0.82;
  };

  // Dynamic X coordinate calculation to adjust for perspective projection
  const getTargetX = (layerIndex: number, side: "left" | "right") => {
    const centerX = 240; // Horizontal center of the w-[480px] column
    const zSpacingDefault = [180, 120, 60, 0];
    const zSpacingHover = [240, 160, 80, 0];
    
    let z = zSpacingDefault[layerIndex - 1];
    if (hoveredLayer !== null) {
      z = zSpacingHover[layerIndex - 1];
      if (hoveredLayer === layerIndex) {
        z += 20;
      }
    }
    
    // Perspective scale factor: 1500 / (1500 - Z)
    const scale = 1500 / (1500 - z);
    const offset = -120 * scale; // -120px is the default left corner offset of the 340px plate
    
    const targetX = centerX + offset;
    return side === "left" ? targetX : 480 - targetX;
  };

  return (
    <section className="bg-black text-white py-20 lg:py-24 relative overflow-hidden font-sans border-t border-slate-900 select-none">
      {/* Background Matrix/Grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-[#FF6B2C]/[0.03] blur-[150px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] rounded-full bg-blue-500/[0.04] blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ================= SECTION HEADER ================= */}
        <div className="text-center max-w-5xl mx-auto mb-16 lg:mb-20 flex flex-col items-center">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-orange-500/20 bg-orange-500/5 text-orange-500 text-[11px] font-black uppercase tracking-[0.25em] mb-4">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            SOFTREE OFFSHORE AI ENGINEERING
          </div>
          <p className="text-slate-400 font-extrabold text-[12px] md:text-sm tracking-[0.2em] uppercase mb-2">
            Your Extended AI Engineering Team
          </p>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
            End-to-End AI Engineering & Delivery
          </h2>
        </div>

        {/* ================= CONTENT BODY (Grid alignment layout, 3 rows h-[560px]) ================= */}
        <div className="relative w-full max-w-5xl mx-auto flex flex-col lg:flex-row lg:justify-between items-center gap-8 min-h-[560px] z-10">
          
          {/* Left Column: Side Labels (Row height = 186px, 3 rows for 01, 02, 03) */}
          <div className="w-full lg:w-[240px] grid grid-rows-3 h-[560px] relative z-30">
            {leftLabels.map((item) => (
              <div 
                key={item.id}
                onMouseEnter={() => {
                  setHoveredLayer(item.layer);
                  setHoveredCardId(item.id);
                }}
                onMouseLeave={() => {
                  setHoveredLayer(null);
                  setHoveredCardId(null);
                }}
                className="flex items-center w-full py-2.5"
              >
                <div 
                  className={`group flex flex-row-reverse items-start gap-3.5 p-4 rounded-xl border transition-all duration-300 cursor-pointer text-right w-full h-full justify-between ${
                    hoveredCardId === item.id 
                      ? "bg-slate-900/95 border-[#FF6B2C]/40 shadow-[0_4px_25px_rgba(255,107,44,0.12)] scale-102 opacity-100"
                      : "bg-[#050505]/40 border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <div className={`p-2.5 rounded-lg bg-white/[0.02] border border-white/5 transition-all duration-300 shrink-0 ${
                    hoveredCardId === item.id ? "bg-white/[0.06] border-[#FF6B2C]/20 text-[#FF6B2C]" : "text-slate-400 group-hover:text-white"
                  }`}>
                    {item.icon}
                  </div>
                    <span className="text-[10px] font-black text-orange-500/90 tracking-[0.25em] block uppercase font-mono mb-1">
                      {item.num} {"//"} {item.title}
                    </span>
                    <h4 className="text-[16px] font-black text-white group-hover:text-[#FF6B2C] transition-colors duration-300 leading-snug">
                      {item.subtitle}
                    </h4>
                    <ul className="space-y-1.5 mt-3 border-t border-slate-900/60 pt-3">
                      {item.points.map((pt, pIdx) => (
                        <li key={pIdx} className="text-[12.5px] leading-relaxed text-slate-400 font-medium select-none group-hover:text-slate-200 transition-colors duration-300 flex items-start justify-end gap-2">
                          <span>{pt}</span>
                          <span className="text-orange-500/60 font-mono shrink-0">—</span>
                        </li>
                      ))}
                    </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Center Column: 3D Stack Canvas */}
          <div className="w-full lg:w-[480px] flex items-center justify-center relative h-[560px] overflow-visible z-10">
            
            {/* 3D Stack Viewport container */}
            <div 
              className="relative w-[400px] h-[400px] flex items-center justify-center select-none cursor-pointer"
              style={{ perspective: "1500px" }}
              onMouseEnter={() => hoveredLayer === null && setHoveredLayer(1)}
              onMouseLeave={() => setHoveredLayer(null)}
            >
              
              {/* Tilted 3D preservation container */}
              <div 
                className="relative w-[340px] h-[340px] transition-transform duration-700 ease-out animate-[float_8s_ease-in-out_infinite]"
                style={{ 
                  transformStyle: "preserve-3d", 
                  transform: "rotateX(55deg) rotateZ(-45deg)" 
                }}
              >
                
                {/* ================= LAYER 4: BASE PLATFORM (Cloud & QA Testing) ================= */}
                <div 
                  className="absolute inset-0 rounded-2xl bg-slate-950/90 border border-blue-600/50 flex flex-col items-center justify-center transition-all duration-500 shadow-[0_0_25px_rgba(30,64,175,0.25),inset_0_0_15px_rgba(30,64,175,0.15)]"
                  style={{ 
                    transformStyle: "preserve-3d",
                    transform: getLayerTransform(4),
                    opacity: hoveredLayer === null || hoveredLayer === 4 ? 1 : 0.45
                  }}
                  onMouseEnter={() => setHoveredLayer(4)}
                >
                  <div className="absolute inset-2 rounded-xl border border-blue-900/40 bg-[linear-gradient(rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.02)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                  
                  {/* CPU Chips */}
                  <div className="absolute top-[35%] left-[25%] flex flex-col items-center select-none" style={{ transform: "rotateZ(45deg) translateZ(5px)" }}>
                    <div className="w-9 h-9 rounded bg-[#FF6B2C] border-2 border-orange-500 shadow-[0_0_10px_rgba(255,107,44,0.6)] flex items-center justify-center animate-pulse">
                      <Chip className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-[30%] right-[30%] flex flex-col items-center select-none" style={{ transform: "rotateZ(45deg) translateZ(5px)" }}>
                    <div className="w-8 h-8 rounded bg-[#FF6B2C] border-2 border-orange-500 shadow-[0_0_8px_rgba(255,107,44,0.5)] flex items-center justify-center">
                      <Chip className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  <span className="absolute bottom-4 left-6 text-[9.5px] font-black tracking-widest text-blue-500 uppercase">CLOUD & QA TESTING</span>
                </div>


                {/* ================= LAYER 3: INTEGRATION PLATE (Data Engineers) ================= */}
                <div 
                  className="absolute inset-0 rounded-2xl bg-slate-950/90 border border-cyan-500/40 transition-all duration-500 shadow-[0_0_20px_rgba(6,182,212,0.15)] flex items-center justify-center"
                  style={{ 
                    transformStyle: "preserve-3d",
                    transform: getLayerTransform(3),
                    opacity: hoveredLayer === null || hoveredLayer === 3 ? 1 : 0.45
                  }}
                  onMouseEnter={() => setHoveredLayer(3)}
                >
                  <div className="absolute inset-2 rounded-xl border border-cyan-900/30 bg-[linear-gradient(rgba(6,182,212,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.01)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
                  
                  {/* Circuit Paths */}
                  <svg className="w-full h-full p-6 text-cyan-400/35" viewBox="0 0 200 200">
                    <path d="M 20 20 L 70 70 L 130 70 L 180 180" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                    <path d="M 180 20 L 130 70 L 70 130 L 20 180" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                    <circle cx="70" cy="70" r="3.5" fill="#00F0B4" className="animate-pulse" />
                    <circle cx="130" cy="70" r="3.5" fill="#00F0B4" />
                  </svg>

                  <span className="absolute bottom-4 left-6 text-[9.5px] font-black tracking-widest text-cyan-400 uppercase">DATA ENGINEERS</span>
                </div>


                {/* ================= LAYER 2: COMPUTING PLATFORM (AI & Full-Stack Engineers) ================= */}
                <div 
                  className="absolute inset-0 rounded-2xl bg-slate-950/90 border border-blue-500/40 transition-all duration-500 shadow-[0_0_20px_rgba(59,130,246,0.15)] flex items-center justify-center"
                  style={{ 
                    transformStyle: "preserve-3d",
                    transform: getLayerTransform(2),
                    opacity: hoveredLayer === null || hoveredLayer === 2 ? 1 : 0.45
                  }}
                  onMouseEnter={() => setHoveredLayer(2)}
                >
                  {/* Chassis blocks */}
                  <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none" viewBox="0 0 280 280">
                    <IsometricServerChassis x={30} y={80} size={50} />
                    <IsometricServerChassis x={130} y={125} size={54} />
                    <IsometricServerChassis x={195} y={50} size={46} />
                  </svg>

                  <span className="absolute bottom-4 left-6 text-[9.5px] font-black tracking-widest text-blue-400 uppercase">AI & FULL-STACK ENGINEERS</span>
                </div>


                {/* ================= LAYER 1: ORCHESTRATION PLATFORM (AI Architects) ================= */}
                <div 
                  className="absolute inset-0 rounded-2xl bg-orange-600/10 border-2 border-orange-500/60 transition-all duration-500 shadow-[0_0_30px_rgba(251,146,60,0.25),inset_0_0_15px_rgba(251,146,60,0.15)] flex items-center justify-center"
                  style={{ 
                    transformStyle: "preserve-3d",
                    transform: getLayerTransform(1),
                    opacity: hoveredLayer === null || hoveredLayer === 1 ? 1 : 0.45
                  }}
                  onMouseEnter={() => setHoveredLayer(1)}
                >
                  <svg className="w-full h-full p-4 text-orange-500" viewBox="0 0 200 200">
                    <line x1="20" y1="100" x2="180" y2="100" stroke="currentColor" strokeWidth="1.8" />
                    <line x1="100" y1="20" x2="100" y2="180" stroke="currentColor" strokeWidth="1.8" />
                    <circle cx="100" cy="100" r="4.5" fill="#FF6B2C" className="animate-ping" />
                    <circle cx="100" cy="100" r="3.5" fill="#FF6B2C" />
                    <circle cx="60" cy="60" r="2.5" fill="#FFA366" />
                    <circle cx="140" cy="60" r="2.5" fill="#FFA366" />
                  </svg>

                  <span className="absolute bottom-4 left-6 text-[9.5px] font-black tracking-widest text-orange-500 uppercase">AI ARCHITECTS</span>
                </div>

              </div>
            </div>

          </div>

          {/* Right Column: Side Labels (Row height = 186px, 3 rows for 04, 05, 06) */}
          <div className="w-full lg:w-[240px] grid grid-rows-3 h-[560px] relative z-30">
            {rightLabels.map((item) => (
              <div 
                key={item.id}
                onMouseEnter={() => {
                  setHoveredLayer(item.layer);
                  setHoveredCardId(item.id);
                }}
                onMouseLeave={() => {
                  setHoveredLayer(null);
                  setHoveredCardId(null);
                }}
                className="flex items-center w-full py-2.5"
              >
                <div 
                  className={`group flex flex-row items-start gap-3.5 p-4 rounded-xl border transition-all duration-300 cursor-pointer text-left w-full h-full justify-between ${
                    hoveredCardId === item.id 
                      ? "bg-slate-900/95 border-[#FF6B2C]/40 shadow-[0_4px_25px_rgba(255,107,44,0.12)] scale-102 opacity-100"
                      : "bg-[#050505]/40 border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <div className={`p-2.5 rounded-lg bg-white/[0.02] border border-white/5 transition-all duration-300 shrink-0 ${
                    hoveredCardId === item.id ? "bg-white/[0.06] border-[#FF6B2C]/20 text-[#FF6B2C]" : "text-slate-400 group-hover:text-white"
                  }`}>
                    {item.icon}
                  </div>
                    <span className="text-[10px] font-black text-orange-500/90 tracking-[0.25em] block uppercase font-mono mb-1">
                      {item.num} {"//"} {item.title}
                    </span>
                    <h4 className="text-[16px] font-black text-white group-hover:text-[#FF6B2C] transition-colors duration-300 leading-snug">
                      {item.subtitle}
                    </h4>
                    <ul className="space-y-1.5 mt-3 border-t border-slate-900/60 pt-3">
                      {item.points.map((pt, pIdx) => (
                        <li key={pIdx} className="text-[12.5px] leading-relaxed text-slate-400 font-medium select-none group-hover:text-slate-200 transition-colors duration-300 flex items-start gap-2">
                          <span className="text-orange-500/60 font-mono shrink-0">—</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* ================= CENTER/HIGHLIGHT TEXT BADGE ================= */}
        <div className="max-w-xl mx-auto text-center mt-12 bg-slate-950/70 backdrop-blur-md p-6 rounded-2xl border border-orange-500/20 shadow-[0_0_20px_rgba(255,107,44,0.05)]">
          <h3 className="text-lg font-extrabold text-orange-500 tracking-wider uppercase mb-1.5">
            SOFTREE AI ENGINEERING POD
          </h3>
          <p className="text-[14px] font-semibold text-slate-300 leading-relaxed">
            Dedicated offshore teams for enterprise AI innovation, development, and delivery.
          </p>
        </div>

        {/* ================= BOTTOM PROCESS FLOW CHART ================= */}
        <div className="max-w-5xl mx-auto mt-14 py-4 px-6 bg-[#030914] border border-slate-900 rounded-xl relative z-10 shadow-[0_4px_15px_rgba(0,0,0,0.4)]">
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 text-center">
            {processSteps.map((step, idx) => (
              <React.Fragment key={idx}>
                <span className="text-[12px] md:text-[13.5px] font-black uppercase tracking-[0.2em] text-white">
                  {step}
                </span>
                {idx < processSteps.length - 1 && (
                  <span className="text-[#FF6B2C] font-extrabold text-xs select-none">→</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* ================= BOTTOM BUSINESS IMPACT ================= */}
        <div className="max-w-5xl mx-auto mt-6 py-5 px-6 border-t border-slate-900 bg-slate-950/20 text-center">
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
            {businessImpacts.map((impact, idx) => (
              <React.Fragment key={idx}>
                <span className="text-[11px] md:text-[12px] font-black uppercase tracking-[0.25em] text-slate-400 hover:text-white transition-colors duration-300">
                  {impact}
                </span>
                {idx < businessImpacts.length - 1 && (
                  <span className="text-slate-800 font-extrabold select-none">|</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

// Reusable micro Brain Icon for Layer 2
const BrainIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1 0-3.12 3 3 0 0 1 0-4.88 2.5 2.5 0 0 1 0-3.12A2.5 2.5 0 0 1 9.5 2z" />
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 0-3.12 3 3 0 0 0 0-4.88 2.5 2.5 0 0 0 0-3.12A2.5 2.5 0 0 0 14.5 2z" />
  </svg>
);
