"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// ═══════════════════════════════════════════════════════════════════════════════
// AFTER EFFECTS STYLE EASING - Video/Motion Graphics Quality
// ═══════════════════════════════════════════════════════════════════════════════
const AE_EASE = {
  easeOut: "power2.out",
  easeInOut: "power2.inOut",
  expoOut: "expo.out",
  elastic: "elastic.out(1, 0.3)",
  backOut: "back.out(1.7)",
  smooth: "power3.inOut",
  bounce: "bounce.out",
};

// ═══════════════════════════════════════════════════════════════════════════════
// PARTICLE BURST COMPONENT - After Effects Particular Style
// ═══════════════════════════════════════════════════════════════════════════════
function ParticleBurst({ active, color = "#FF7A2F" }: { active: boolean; color?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current || !active) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      size: number;
    }
    
    const particles: Particle[] = [];
    const cx = w / 2;
    const cy = h / 2;
    
    for (let i = 0; i < 30; i++) {
      const angle = (Math.PI * 2 * i) / 30 + Math.random() * 0.5;
      const speed = 2 + Math.random() * 4;
      particles.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        maxLife: 0.6 + Math.random() * 0.4,
        size: 2 + Math.random() * 3,
      });
    }
    
    let raf: number;
    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      let activeCount = 0;
      
      particles.forEach(p => {
        if (p.life > 0) {
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.98;
          p.vy *= 0.98;
          p.life -= 0.015;
          
          const alpha = p.life / p.maxLife;
          const r = parseInt(color.slice(1, 3), 16);
          const g = parseInt(color.slice(3, 5), 16);
          const b = parseInt(color.slice(5, 7), 16);
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
          ctx.fill();
          activeCount++;
        }
      });
      
      if (activeCount > 0) {
        raf = requestAnimationFrame(animate);
      }
    };
    
    animate();
    return () => cancelAnimationFrame(raf);
  }, [active, color]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none z-20"
      style={{ opacity: active ? 1 : 0, transition: "opacity 0.3s" }}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// CANVAS HOOK - Procedural Animation System
// ═══════════════════════════════════════════════════════════════════════════════
function useCanvas(
  drawFn: (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => void
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let t = 0;
    let w = 0;
    let h = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const tick = () => {
      t += 1;
      ctx.clearRect(0, 0, w, h);
      if (w > 0 && h > 0) drawFn(ctx, w, h, t);
      raf = requestAnimationFrame(tick);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    tick();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [drawFn]);

  return canvasRef;
}

// ═══════════════════════════════════════════════════════════════════════════════
// CANVAS DRAW FUNCTIONS - Procedural Visualizations
// ═══════════════════════════════════════════════════════════════════════════════
function drawPowerPlatform(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const pts = 25;
  for (let i = 0; i < pts; i++) {
    const seed = i * 137.508;
    const px = (Math.sin(seed) * 0.5 + 0.5) * w;
    const py = (Math.cos(seed * 0.7) * 0.5 + 0.5) * h;
    const pulse = (Math.sin(t * 0.04 + i * 0.9) + 1) / 2;
    ctx.beginPath();
    ctx.arc(px, py, 2 + pulse * 2, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,122,47,${0.3 + pulse * 0.5})`;
    ctx.fill();
    for (let j = i + 1; j < pts; j++) {
      const seed2 = j * 137.508;
      const qx = (Math.sin(seed2) * 0.5 + 0.5) * w;
      const qy = (Math.cos(seed2 * 0.7) * 0.5 + 0.5) * h;
      const d = Math.hypot(px - qx, py - qy);
      const maxDist = Math.min(w, h) * 0.35;
      if (d < maxDist) {
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(qx, qy);
        ctx.strokeStyle = `rgba(255,122,47,${0.08 * (1 - d / maxDist) * pulse})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        if (pulse > 0.85) {
          const prog = (t * 0.015) % 1;
          ctx.beginPath();
          ctx.arc(px + (qx - px) * prog, py + (qy - py) * prog, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = "#FF7A2F";
          ctx.fill();
        }
      }
    }
  }
}

function drawDataBI(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const drawCylinder = (x: number, y: number, cw: number, ch: number, alpha: number) => {
    const ry = ch * 0.22;
    ctx.fillStyle = `rgba(161,196,255,${alpha})`;
    ctx.fillRect(x, y + ry, cw, ch - ry * 2);
    ctx.beginPath();
    ctx.ellipse(x + cw / 2, y + ry, cw / 2, ry, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(x + cw / 2, y + ch - ry, cw / 2, ry, 0, 0, Math.PI * 2);
    ctx.fill();
  };
  const cw = w * 0.08;
  const spacing = w * 0.12;
  const startX = w * 0.1;
  const dbY = h * 0.4;
  for (let i = 0; i < 4; i++) {
    const ch = h * 0.18 + Math.sin(t * 0.03 + i * 1.2) * h * 0.03;
    drawCylinder(startX + i * spacing, dbY, cw, ch, 0.12);
  }
  const barW = w * 0.035;
  const barStartX = w * 0.55;
  for (let i = 0; i < 10; i++) {
    const bh = (0.15 + 0.25 * Math.sin(t * 0.04 + i * 0.7 + 1)) * h;
    ctx.fillStyle = `rgba(255,122,47,${0.25 + 0.15 * Math.sin(t * 0.06 + i)})`;
    ctx.fillRect(barStartX + i * (barW + 4), h * 0.82 - bh, barW, bh);
  }
  ctx.beginPath();
  ctx.setLineDash([5, 5]);
  ctx.strokeStyle = "rgba(161,196,255,0.15)";
  ctx.lineWidth = 1;
  ctx.moveTo(0, h / 2);
  for (let xi = 0; xi <= w; xi += 15) {
    ctx.lineTo(xi, h / 2 + Math.sin(xi * 0.02 + t * 0.03) * 15);
  }
  ctx.stroke();
  ctx.setLineDash([]);
}

function drawAI(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const cx = w / 2, cy = h / 2;
  const R = Math.min(w, h) * 0.38;
  const angle = t * 0.006;
  ctx.lineWidth = 1;
  for (let lat = -80; lat <= 80; lat += 20) {
    const y0 = Math.sin((lat * Math.PI) / 180) * R;
    const r0 = Math.cos((lat * Math.PI) / 180) * R;
    ctx.beginPath();
    ctx.ellipse(cx, cy + y0, r0, r0 * 0.25, 0, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255,122,47,0.12)";
    ctx.stroke();
  }
  for (let i = 0; i < 6; i++) {
    const phi = angle + (i / 6) * Math.PI * 2;
    const rx = Math.cos(phi) * R;
    const opacity = (Math.cos(phi) + 1) / 2;
    ctx.beginPath();
    ctx.ellipse(cx, cy, Math.abs(rx), R, 0, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(255,122,47,${0.06 + opacity * 0.18})`;
    ctx.stroke();
  }
  ctx.beginPath();
  ctx.ellipse(cx, cy, R, R * 0.25, 0, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(255,122,47,0.25)";
  ctx.lineWidth = 1.5;
  ctx.stroke();
  for (let i = 0; i < 4; i++) {
    const phi2 = angle + (i / 4) * Math.PI * 2;
    const theta = ((i * 40 - 20) * Math.PI) / 180;
    const sx = cx + Math.cos(phi2) * R * 0.65;
    const sy = cy + Math.sin(theta) * R * 0.55;
    const pulse = (Math.sin(t * 0.05 + i * 2) + 1) / 2;
    ctx.beginPath();
    ctx.arc(sx, sy, 3 + pulse * 3, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,154,95,${0.4 + pulse * 0.5})`;
    ctx.fill();
  }
}

function drawWorkspace(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const cx = w / 2, cy = h / 2;
  ctx.strokeStyle = "rgba(255,122,47,0.18)";
  ctx.lineWidth = 1;
  for (let i = 0; i < 5; i++) {
    const off = Math.sin(t * 0.02 + i * 1.1) * 8;
    const fw = w * 0.4 + i * 14;
    const fh = h * 0.3 + i * 10;
    ctx.strokeRect(cx - fw / 2 + off, cy - fh / 2 - off * 0.5, fw, fh);
    ctx.fillStyle = "rgba(255,122,47,0.35)";
    for (let d = 0; d < 3; d++) {
      ctx.beginPath();
      ctx.arc(cx - fw / 2 + off + 8 + d * 8, cy - fh / 2 - off * 0.5 + 6, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  const fs = Math.max(12, Math.round(w * 0.045));
  ctx.font = `bold ${fs}px monospace`;
  ctx.fillStyle = "rgba(255,122,47,0.25)";
  ctx.fillText("</>", cx + w * 0.08 + Math.sin(t * 0.03) * 4, cy - h * 0.06);
}

const services = [
  {
    badge: "Power Platform",
    title: "Business Applications Delivery Support",
    desc: "Helping partners execute Power Platform and Dynamics implementations.",
    tech: ["Power Apps", "Power Automate", "Dataverse"],
    partner: "We operate as your extended Power Platform engineering team.",
    deco: "dots",
    href: "/services/business-applications/power-platform",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff7a2f" strokeWidth="1.5" strokeLinecap="round">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 3H8a2 2 0 0 0-2 2v2h12V5a2 2 0 0 0-2-2z" />
        <path d="M12 12v4M10 14h4" />
      </svg>
    ),
  },
  {
    badge: "Data & BI",
    title: "Data & Analytics Execution",
    desc: "Building scalable data solutions and BI environments for partners.",
    tech: ["Power BI", "Microsoft Fabric", "Databricks", "Snowflake"],
    partner: "We bring reliable data engineering and up-to-date analytics expertise.",
    deco: "bars",
    href: "/services/data-analytics/power-bi",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff7a2f" strokeWidth="1.5" strokeLinecap="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    badge: "Intelligent AI",
    title: "AI & Intelligent Automation",
    desc: "Integrating AI solutions to improve business processes and experiences.",
    tech: ["Azure AI Foundry", "Copilot Integration", "AI Agents", "RAG Workflows"],
    partner: "Operate with confidence using our AI integration expertise.",
    deco: "circles",
    href: "/services/ai-intelligence/agentic-ai",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff7a2f" strokeWidth="1.5" strokeLinecap="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" />
      </svg>
    ),
  },
  {
    badge: "Workspace",
    title: "Digital Workspace & App Engineering",
    desc: "Enhancing and extending your Microsoft 365 collaboration environments.",
    tech: ["SharePoint Online", "Microsoft 365", "Web Applications", "Mobile Applications"],
    partner: "Securely deliver and support modern workspace solutions.",
    deco: "code",
    href: "/services/digital-workspace/sharepoint",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff7a2f" strokeWidth="1.5" strokeLinecap="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// AFTER EFFECTS STYLE SERVICE CARD - Dramatic Timeline Animations, No Mouse Tracking
// ═══════════════════════════════════════════════════════════════════════════════
function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [showBurst, setShowBurst] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { badge, title, desc, tech, partner, deco, icon, href } = service;

  const getCanvasDrawFn = () => {
    switch (deco) {
      case "dots": return drawPowerPlatform;
      case "bars": return drawDataBI;
      case "circles": return drawAI;
      case "code": return drawWorkspace;
      default: return drawPowerPlatform;
    }
  };

  const canvasRef = useCanvas(getCanvasDrawFn());

  const handleMouseEnter = () => {
    setHovered(true);
    setShowBurst(true);
    setTimeout(() => setShowBurst(false), 600);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  // After Effects Style Entrance Timeline
  useEffect(() => {
    if (!cardRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        delay: index * 0.2,
      });

      tl.fromTo(cardRef.current,
        { opacity: 0, scale: 0.8, y: 60 },
        { opacity: 1, scale: 1, y: 0, duration: 0.9, ease: AE_EASE.backOut }
      );

      const elements = contentRef.current?.querySelectorAll('.ae-element');
      if (elements) {
        tl.fromTo(elements,
          { opacity: 0, y: 20, scale: 0.95 },
          { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            duration: 0.4,
            stagger: 0.06,
            ease: AE_EASE.easeOut 
          },
          "-=0.3"
        );
      }
    }, cardRef);

    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="relative overflow-hidden cursor-pointer will-change-transform group"
      style={{
        background: hovered ? "#111" : "#0d0d0d",
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <ParticleBurst active={showBurst} color="#FF7A2F" />

      <div className="absolute inset-0 z-20 pointer-events-none border border-white/10 group-hover:border-white/30 transition-all duration-500 [mask-image:linear-gradient(to_bottom,white,transparent)]" />

      <div 
        className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-[#FF7A2F]/30 to-transparent opacity-40 mix-blend-screen rounded-full blur-[100px] pointer-events-none transition-all duration-700 group-hover:opacity-70"
      />

      <div 
        className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-tl from-[#FF9A5F]/20 to-transparent opacity-0 mix-blend-screen rounded-full blur-[60px] pointer-events-none transition-opacity duration-500"
        style={{ opacity: hovered ? 0.5 : 0 }}
      />

      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 w-full h-full z-0 opacity-40 mix-blend-screen group-hover:opacity-80 transition-all duration-700"
        style={{ display: "block" }}
      />

      <div
        className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-500"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(255,122,47,0.1) 0%, transparent 60%)",
          opacity: hovered ? 1 : 0,
        }}
      />

      <div ref={contentRef} className="relative p-7 flex flex-col gap-4 z-30" style={{ transform: "translateZ(30px)" }}>
        <div className="flex items-start justify-between ae-element">
          <span className="inline-flex items-center px-3 py-1 rounded-full border text-[10px] font-bold tracking-[0.1em] uppercase"
            style={{ background: "rgba(255,122,47,0.15)", borderColor: "rgba(255,122,47,0.3)", color: "#ff9a5f" }}>
            {badge}
          </span>
          <div className="w-[38px] h-[38px] rounded-[10px] border border-[#2a2a2a] flex items-center justify-center transition-colors duration-300"
            style={{ background: hovered ? "#1e1e1e" : "#181818" }}>
            {icon}
          </div>
        </div>

        <p className="text-[15px] font-extrabold text-white tracking-wider uppercase leading-snug m-0 ae-element">
          {title}
        </p>

        <p className="text-[12.5px] leading-snug m-0 ae-element" style={{ color: "rgba(255,255,255,0.4)" }}>
          {desc}
        </p>

        <div className="flex flex-wrap gap-2 ae-element">
          {tech.map((t: string) => (
            <span key={t} className="text-[11px] px-3 py-1.5 rounded-full border transition-colors duration-300"
              style={{
                background: "transparent",
                borderColor: hovered ? "rgba(255,122,47,0.25)" : "rgba(255,255,255,0.15)",
                color: hovered ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.55)",
              }}>
              {t}
            </span>
          ))}
        </div>

        <p className="text-[12px] leading-snug pl-3 border-l-2 m-0 ae-element transition-opacity duration-300"
          style={{ color: "#ff7a2f", borderColor: "#ff7a2f", opacity: hovered ? 1 : 0.75 }}>
          {partner}
        </p>

        <div className="ae-element">
          <Link href={href}
            className="group/btn inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-[11px] font-bold tracking-[0.1em] uppercase border-none cursor-pointer relative overflow-hidden"
            style={{
              background: hovered ? "linear-gradient(135deg, #ff7a2f, #d96820)" : "linear-gradient(135deg, #c75a1a, #8b3a0f)",
              transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              transform: hovered ? "translateX(6px) scale(1.02)" : "translateX(0) scale(1)",
              textDecoration: "none",
              boxShadow: hovered ? "0 10px 30px rgba(255, 122, 47, 0.3)" : "none",
            }}>
            <span className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                transform: hovered ? "translateX(100%)" : "translateX(-100%)",
                transition: "transform 0.6s ease",
              }}
            />
            Explore Solution
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"
              className="transition-transform duration-300 group-hover/btn:translate-x-1">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN SECTION
// ═══════════════════════════════════════════════════════════════════════════════
export default function CoreEngineeringServices() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !headingRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 1,
          ease: AE_EASE.smooth,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      const title = headingRef.current?.querySelector("h2");
      if (title) {
        gsap.fromTo(title,
          { opacity: 0, x: -30, filter: "blur(10px)" },
          {
            opacity: 1, x: 0, filter: "blur(0px)",
            duration: 0.8,
            ease: AE_EASE.expoOut,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
            delay: 0.2,
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#0a0a0a] px-6 md:px-10 py-16 md:py-24 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        <div ref={headingRef} className="mb-10 md:mb-14 relative">
          <div className="absolute -left-10 top-1/2 w-20 h-[1px] bg-gradient-to-r from-[#ff7a2f] to-transparent hidden lg:block"
            style={{ transform: "translateY(-50%)" }}
          />
          <h2 className="text-[clamp(28px,4.5vw,42px)] font-semibold tracking-[-0.02em] leading-tight text-white mb-3">
            Core Engineering Services
          </h2>
          <p className="text-[15px] text-white/45 max-w-[500px] leading-relaxed">
            Four verticals, one delivery standard. Enterprise-grade engineering across Microsoft and modern web stacks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 border border-white/8 rounded-2xl overflow-hidden" style={{ perspective: "1000px" }}>
          {services.map((service, idx) => (
            <div key={service.title}
              className={`${idx === 0 ? "md:border-r border-b border-white/8" : ""} ${idx === 1 ? "border-b border-white/8" : ""} ${idx === 2 ? "md:border-r border-b md:border-b-0 border-white/8" : ""}`}>
              <ServiceCard service={service} index={idx} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
