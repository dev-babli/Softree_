"use client";

import Link from "next/link";
import { Smartphone, Brain, ArrowUpRight, ArrowRight, Sparkles, Globe, AppWindow, Database } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useState, useRef, useCallback, CSSProperties } from "react";

/* ============================================================
   TYPES
============================================================ */
interface Service {
  id: string;
  title: string;
  shortTitle: string;
  imgSrc?: string;
  LucideIcon?: LucideIcon;
  accent: string;
  accentRgb: string;
  description: string;
  tags: string[];
}

/* ============================================================
   DATA
============================================================ */
const SERVICES: Service[] = [
  {
    id: "power-platform",
    title: "Business Applications Delivery Support",
    shortTitle: "Power Platform",
    LucideIcon: AppWindow,
    accent: "#ff7a2f",
    accentRgb: "255,122,47",
    description: "Helping partners execute Power Platform and Dynamics implementations. We operate as your extended Power Platform engineering team.",
    tags: ["Power Apps", "Power Automate", "Dataverse"],
  },
  {
    id: "data-bi",
    title: "Data & Analytics Execution",
    shortTitle: "Data & BI",
    LucideIcon: Database,
    accent: "#ff7a2f",
    accentRgb: "255,122,47",
    description: "Building scalable data solutions and BI environments for partners. We bring reliable data engineering and up-to-date analytics expertise.",
    tags: ["Power BI", "Microsoft Fabric", "Databricks", "Snowflake"],
  },
  {
    id: "intelligent-ai",
    title: "AI & Intelligent Automation",
    shortTitle: "Intelligent AI",
    LucideIcon: Brain,
    accent: "#ff7a2f",
    accentRgb: "255,122,47",
    description: "Integrating AI solutions to improve business processes and experiences. Operate with confidence using our AI integration expertise.",
    tags: ["Azure AI Foundry", "Copilot Integration", "AI Agents", "RAG Workflows"],
  },
  {
    id: "workspace",
    title: "Digital Workspace & App Engineering",
    shortTitle: "Workspace",
    imgSrc: "https://cdn-icons-png.flaticon.com/512/5968/5968705.png",
    accent: "#ff7a2f",
    accentRgb: "255,122,47",
    description: "Enhancing and extending your Microsoft 365 collaboration environments. Securely deliver and support modern workspace solutions.",
    tags: ["SharePoint Online", "Microsoft 365", "Web Applications", "Mobile Applications"],
  },
  {
    id: "ai-automation",
    title: "AI Powered Test Automation",
    shortTitle: "AI Automation",
    LucideIcon: Sparkles,
    accent: "#ff7a2f",
    accentRgb: "255,122,47",
    description: "Accelerating release cycles and software quality using intelligent automated test suites. Achieve continuous quality with modern AI testing workflows.",
    tags: ["Selenium", "Playwright", "CI/CD Integration", "Visual AI Testing"],
  },
  {
    id: "legacy",
    title: "Legacy Application Modernization",
    shortTitle: "Legacy",
    LucideIcon: Globe,
    accent: "#ff7a2f",
    accentRgb: "255,122,47",
    description: "Transforming outdated monolithic architectures into secure, scalable, cloud-native systems. Safely de-risk and rebuild systems for modern scale.",
    tags: ["Microservices", "Cloud Migration", "API Refactoring", "System Rewrites"],
  },
];

const STATS = [
  { value: "50+", label: "Projects" },
  { value: "6", label: "Practices" },
  { value: "98%", label: "Satisfaction" },
  { value: "4yr", label: "Avg. partner" },
];

/* ============================================================
   HOOKS
============================================================ */
function useActiveHash(): string {
  const [hash, setHash] = useState("");
  useEffect(() => {
    const update = () => setHash(window.location.hash.replace("#", ""));
    update();
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);
  return hash;
}

function useInView(ref: React.RefObject<Element>, threshold = 0.08) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [ref, threshold]);
  return visible;
}

/* ============================================================
   ICON
============================================================ */
function SvcIcon({ svc, size = 18 }: { svc: Service; size?: number }) {
  if (svc.imgSrc) {
    return (
      <img
        src={svc.imgSrc}
        alt={svc.title}
        width={size}
        height={size}
        style={{ objectFit: "contain", display: "block", flexShrink: 0 }}
      />
    );
  }
  if (svc.LucideIcon) {
    const Icon = svc.LucideIcon;
    return <Icon size={size} color={svc.accent} strokeWidth={1.75} />;
  }
  return null;
}

/* ============================================================
   SERVICE CARD
============================================================ */
function Card({
  svc,
  lit,
  hovered,
  index,
  onEnter,
  onLeave,
  onClick,
}: {
  svc: Service;
  lit: boolean;
  hovered: boolean;
  index: number;
  onEnter: () => void;
  onLeave: () => void;
  onClick: () => void;
}) {
  const isWide = false;

  const base: CSSProperties = {
    gridColumn: isWide ? "1 / -1" : undefined,
    position: "relative",
    display: "flex",
    flexDirection: isWide ? "row" : "column",
    alignItems: isWide ? "center" : "flex-start",
    gap: isWide ? 16 : 12,
    padding: isWide ? "18px 22px" : "18px 16px",
    borderRadius: 14,
    border: `0.5px solid ${lit ? `rgba(${svc.accentRgb},0.5)` : "rgba(255,255,255,0.08)"}`,
    background: lit ? `rgba(${svc.accentRgb},0.08)` : "rgba(255,255,255,0.025)",
    textDecoration: "none",
    overflow: "hidden",
    cursor: "pointer",
    height: "100%",
    transition: "border-color 0.25s, background 0.25s, transform 0.25s, box-shadow 0.25s",
    transform: hovered && !isWide ? "translateY(-3px)" : "none",
    boxShadow: lit ? `0 8px 28px rgba(${svc.accentRgb},0.14)` : "none",
    animationDelay: `${index * 55}ms`,
    animation: "sh-fadeUp 0.5s both",
  };

  return (
    <Link href={`/services#${svc.id}`} style={base} onMouseEnter={onEnter} onMouseLeave={onLeave} onClick={onClick}>
      {/* glow orb */}
      <div style={{
        position: "absolute", top: -20, right: -20, width: 72, height: 72, borderRadius: "50%",
        background: `radial-gradient(circle, rgba(${svc.accentRgb},0.28) 0%, transparent 70%)`,
        opacity: lit ? 1 : 0, transition: "opacity 0.3s", pointerEvents: "none",
      }} />

      {/* icon box */}
      <div style={{
        width: isWide ? 44 : 36, height: isWide ? 44 : 36, borderRadius: 10,
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        background: lit ? `rgba(${svc.accentRgb},0.18)` : "rgba(255,255,255,0.06)",
        transition: "background 0.25s", position: "relative", zIndex: 1,
      }}>
        <SvcIcon svc={svc} size={isWide ? 22 : 18} />
      </div>

      {/* text */}
      <div style={{ flex: 1, minWidth: 0, position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 4 }}>
          <span style={{ fontSize: isWide ? 14 : 13, fontWeight: 500, color: lit ? "#f0f0f4" : "#9898b0", lineHeight: 1.3, transition: "color 0.2s" }}>
            {svc.title}
          </span>
          <ArrowUpRight size={13} style={{ flexShrink: 0, marginTop: 2, color: lit ? svc.accent : "transparent", transition: "color 0.2s, transform 0.2s", transform: hovered ? "translate(2px,-2px)" : "none" }} />
        </div>

        {(lit || isWide) && (
          <p style={{ fontSize: 11.5, color: "#666677", marginTop: 5, lineHeight: 1.6, display: "-webkit-box" as CSSProperties["display"], WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as CSSProperties["WebkitBoxOrient"], overflow: "hidden" }}>
            {svc.description}
          </p>
        )}

        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 8 }}>
          {svc.tags.slice(0, 3).map((tag) => (
            <span key={tag} style={{
              fontSize: 10, fontWeight: 500, letterSpacing: "0.04em",
              padding: "2px 8px", borderRadius: 20,
              background: lit ? `rgba(${svc.accentRgb},0.12)` : "rgba(255,255,255,0.04)",
              border: `0.5px solid ${lit ? `rgba(${svc.accentRgb},0.28)` : "rgba(255,255,255,0.08)"}`,
              color: lit ? svc.accent : "#55556a", transition: "all 0.2s",
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

/* ============================================================
   DETAIL PANEL
============================================================ */
function Panel({ svc }: { svc: Service }) {
  return (
    <div style={{
      position: "relative", borderRadius: 16, padding: "26px 24px", flex: 1,
      border: `0.5px solid rgba(${svc.accentRgb},0.32)`,
      background: "rgba(255,255,255,0.025)", overflow: "hidden",
      animation: "sh-slideIn 0.3s ease",
      display: "flex", flexDirection: "column"
    }}>
      {/* bg glow */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: `radial-gradient(ellipse at 25% 20%, rgba(${svc.accentRgb},0.09) 0%, transparent 65%)` }} />

      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%", flex: 1 }}>
        <div>
          {/* badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 5,
            fontSize: 9.5, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase",
            padding: "4px 10px", borderRadius: 20, marginBottom: 20,
            background: `rgba(${svc.accentRgb},0.12)`,
            border: `0.5px solid rgba(${svc.accentRgb},0.28)`,
            color: svc.accent,
          }}>
            <Sparkles size={9} /> {svc.tags[0]}
          </div>

          {/* icon + title */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: `rgba(${svc.accentRgb},0.15)` }}>
              <SvcIcon svc={svc} size={22} />
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: "#f0f0f4", lineHeight: 1.25, margin: 0 }}>
              {svc.title}
            </h3>
          </div>

          {/* desc */}
          <p style={{ fontSize: 13, lineHeight: 1.75, color: "#88889a", marginBottom: 20 }}>
            {svc.description}
          </p>
        </div>

        <div>
          <div style={{ height: "0.5px", background: "rgba(255,255,255,0.07)", marginBottom: 18 }} />

          {/* tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 22 }}>
            {svc.tags.map((tag) => (
              <span key={tag} style={{ fontSize: 11, padding: "4px 10px", borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.09)", color: "#77778a" }}>
                {tag}
              </span>
            ))}
          </div>

          {/* cta */}
          <Link href={`/services#${svc.id}`} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 500, color: svc.accent, textDecoration: "none" }}>
            Explore Solution <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   MAIN
============================================================ */
export default function ServicesHeader() {
  const activeHash = useActiveHash();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string>("power-platform");
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef as React.RefObject<Element>);

  const panelSvc =
    SERVICES.find((s) => s.id === (hoveredId ?? (activeHash || selectedId))) ??
    SERVICES[0];

  const select = useCallback((id: string) => setSelectedId(id), []);

  return (
    <>
      <style>{`
        @keyframes sh-fadeUp { from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)} }
        @keyframes sh-slideIn { from{opacity:0;transform:translateX(10px)}to{opacity:1;transform:translateX(0)} }
        @keyframes sh-marquee { from{transform:translateX(0)}to{transform:translateX(-50%)} }
        .sh-get-btn:hover{opacity:.85!important;transform:translateY(-1px)!important}
      `}</style>

      <section
        ref={sectionRef}
        style={{ position: "relative", overflow: "hidden", background: "linear-gradient(160deg,#07070f 0%,#0d0d1a 55%,#080810 100%)" }}
      >
        {/* grid bg */}
        <div aria-hidden style={{ position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(255,255,255,0.022) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.022) 1px,transparent 1px)",backgroundSize:"56px 56px",pointerEvents:"none" }} />
        {/* glows */}
        <div aria-hidden style={{ position:"absolute",width:560,height:560,borderRadius:"50%",top:-140,left:-100,background:"radial-gradient(circle,rgba(245,158,11,0.09) 0%,transparent 65%)",pointerEvents:"none" }} />
        <div aria-hidden style={{ position:"absolute",width:460,height:460,borderRadius:"50%",top:"40%",right:-120,background:"radial-gradient(circle,rgba(245,158,11,0.08) 0%,transparent 65%)",pointerEvents:"none" }} />
        <div aria-hidden style={{ position:"absolute",width:380,height:380,borderRadius:"50%",bottom:-80,left:"35%",background:"radial-gradient(circle,rgba(245,158,11,0.07) 0%,transparent 65%)",pointerEvents:"none" }} />

        <div style={{ position:"relative",zIndex:1,maxWidth:1280,margin:"0 auto",padding:"96px 48px 80px" }}>

          {/* ── HEADER ── */}
          <div style={{
            display:"flex",alignItems:"flex-end",justifyContent:"space-between",
            flexWrap:"wrap",gap:32,marginBottom:56,
            opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(22px)",
            transition:"opacity 0.7s ease,transform 0.7s ease",
          }}>
            <div style={{ maxWidth:600 }}>
              <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:20 }}>
                <div style={{ width:26,height:1,background:"#f59e0b",opacity:.7 }} />
                <span style={{ fontSize:10.5,fontWeight:600,letterSpacing:"0.2em",textTransform:"uppercase",color:"#f59e0b" }}>Our Expertise</span>
              </div>
              <h2 style={{ fontSize:"clamp(36px,4.5vw,58px)",fontWeight:600,lineHeight:1.12,color:"#f0f0f4",margin:0 }}>
                Building digital{" "}
                <span style={{
                  fontStyle: "normal",
                  background: "linear-gradient(135deg, #ff8f3d 0%, #f97316 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: 700
                }}>
                  solutions
                </span>
                <br />that scale with you.
              </h2>
              <p style={{ marginTop:16,fontSize:14.5,lineHeight:1.75,fontWeight:300,color:"#888899",maxWidth:460 }}>
                From SharePoint and Power Platform to modern web, mobile, and AI — we design, build, and scale technology that drives real business impact.
              </p>
            </div>

            <div style={{ display:"flex",gap:32,alignItems:"flex-end",paddingBottom:4 }}>
              {STATS.map((s) => (
                <div key={s.label} style={{ textAlign:"right" }}>
                  <div style={{ fontSize:"clamp(26px,2.8vw,36px)",fontWeight:600,color:"#e8e8f4",lineHeight:1 }}>{s.value}</div>
                  <div style={{ fontSize:10.5,color:"#555566",marginTop:4,fontWeight:300 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── BODY ── */}
          <div style={{
            display:"grid",gridTemplateColumns:"1fr 360px",gap:16,alignItems:"stretch",
            opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(28px)",
            transition:"opacity 0.7s ease 0.15s,transform 0.7s ease 0.15s",
          }}>

            {/* cards */}
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gridTemplateRows:"repeat(3, 1fr)",gap:10,height:"100%" }}>
              {SERVICES.map((svc, i) => (
                <Card
                  key={svc.id}
                  svc={svc}
                  index={i}
                  lit={activeHash === svc.id || selectedId === svc.id || hoveredId === svc.id}
                  hovered={hoveredId === svc.id}
                  onEnter={() => setHoveredId(svc.id)}
                  onLeave={() => setHoveredId(null)}
                  onClick={() => select(svc.id)}
                />
              ))}
            </div>

            {/* right panel */}
            <div style={{ display:"flex",flexDirection:"column",gap:12,height:"100%" }} key={panelSvc.id}>
              <Panel svc={panelSvc} />

              <div style={{ borderRadius:14,padding:"18px 20px",background:"rgba(245,158,11,0.05)",border:"0.5px solid rgba(245,158,11,0.16)",display:"flex",alignItems:"center",justifyContent:"space-between",gap:12 }}>
                <div>
                  <p style={{ fontSize:13,fontWeight:500,color:"#c8c8d8",margin:0 }}>Ready to start a project?</p>
                  <p style={{ fontSize:11.5,color:"#555566",margin:"3px 0 0" }}>We respond within one business day.</p>
                </div>
                <Link href="/contact" className="sh-get-btn" style={{ flexShrink:0,display:"inline-flex",alignItems:"center",gap:6,padding:"9px 18px",borderRadius:10,fontSize:12.5,fontWeight:500,color:"#fff",background:"linear-gradient(135deg,#f59e0b 0%,#ea580c 100%)",textDecoration:"none",transition:"opacity 0.2s,transform 0.2s",whiteSpace:"nowrap" }}>
                  Get in touch <ArrowUpRight size={13} />
                </Link>
              </div>
            </div>
          </div>

          {/* ── MARQUEE ── */}
          <div style={{ marginTop:52,overflow:"hidden",opacity:inView?1:0,transition:"opacity 0.7s ease 0.4s" }}>
            <div style={{ height:"0.5px",background:"rgba(255,255,255,0.06)",marginBottom:20 }} />
            <div style={{ display:"flex",whiteSpace:"nowrap" }}>
              <div style={{ display:"inline-flex",gap:40,alignItems:"center",animation:"sh-marquee 28s linear infinite" }}>
                {[...SERVICES,...SERVICES].map((s,i)=>(
                  <span key={i} style={{ display:"inline-flex",alignItems:"center",gap:8,fontSize:12.5,fontWeight:300,color:"#2e2e3e" }}>
                    <span style={{ display:"inline-block",width:5,height:5,borderRadius:"50%",background:s.accent,flexShrink:0 }} />
                    {s.shortTitle}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}