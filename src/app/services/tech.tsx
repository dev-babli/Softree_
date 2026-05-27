"use client";
import { useState, useEffect, useRef } from "react";

const technologies = [
  // Frontend
  { name: "React", category: "frontend", color: "#f97316", icon: "⚛", description: "Component-based UI library" },
  { name: "Next.js", category: "frontend", color: "#f97316", icon: "▲", description: "Full-stack React framework" },
  { name: "TypeScript", category: "frontend", color: "#f97316", icon: "TS", description: "Typed JavaScript superset" },
  // Backend
  { name: "Node.js", category: "backend", color: "#f97316", icon: "⬡", description: "JavaScript runtime engine" },
  { name: "Python", category: "backend", color: "#f97316", icon: "🐍", description: "Versatile backend language" },
  // Cloud & Platform
  { name: "Azure", category: "cloud", color: "#f97316", icon: "◈", description: "Microsoft cloud platform" },
  { name: "AWS", category: "cloud", color: "#f97316", icon: "◉", description: "Amazon cloud services" },
  { name: "SharePoint", category: "platform", color: "#f97316", icon: "◫", description: "Enterprise content platform" },
  { name: "Power Platform", category: "platform", color: "#f97316", icon: "⚡", description: "Low-code business apps" },
  // AI
  { name: "OpenAI", category: "ai", color: "#f97316", icon: "◎", description: "Generative AI models" },
  { name: "Power BI", category: "platform", color: "#f97316", icon: "📊", description: "Business intelligence & analytics" },
  { name: "Power Apps", category: "platform", color: "#f97316", icon: "◈", description: "Low-code app development" },
  { name: "Power Automate", category: "platform", color: "#f97316", icon: "↻", description: "Workflow automation" },
  { name: "Copilot Studio", category: "ai", color: "#f97316", icon: "✦", description: "Custom AI copilots" },
  { name: "Azure AI", category: "ai", color: "#f97316", icon: "🧠", description: "AI & ML cloud services" },
  { name: "Azure DevOps", category: "cloud", color: "#f97316", icon: "∞", description: "CI/CD & DevOps platform" },
  { name: "CosmosDB", category: "cloud", color: "#f97316", icon: "◎", description: "Globally distributed DB" },
  { name: "API Management", category: "backend", color: "#f97316", icon: "⇌", description: "Enterprise API gateway" },
];

const categoryMeta: Record<string, { label: string; glow: string; bg: string }> = {
  frontend: { label: "Frontend", glow: "#f97316", bg: "rgba(249,115,22,0.08)" },
  backend:  { label: "Backend",  glow: "#f97316", bg: "rgba(249,115,22,0.08)" },
  cloud:    { label: "Cloud",    glow: "#f97316", bg: "rgba(249,115,22,0.08)" },
  platform: { label: "Platform", glow: "#f97316", bg: "rgba(249,115,22,0.08)" },
  ai:       { label: "AI / ML",  glow: "#f97316", bg: "rgba(249,115,22,0.08)" },
};

const allCategories = ["all", ...Object.keys(categoryMeta)];

export default function TechCloudShowcase() {
  const [active, setActive] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<{ x: number; y: number; size: number; speed: number; opacity: number; color: string }[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
    const pts = Array.from({ length: 60 }, () => ({
      x: Math.random() * 1200,
      y: Math.random() * 800,
      size: Math.random() * 1.5 + 0.3,
      speed: Math.random() * 0.3 + 0.1,
      opacity: Math.random() * 0.5 + 0.1,
      color: ["#f97316", "#ff7a2f", "#ff9d5c", "#e05a00", "#ffaa70"][Math.floor(Math.random()*5)],
    }));
    setParticles(pts);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || particles.length === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let pts = particles.map(p => ({ ...p }));

    const draw = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach(p => {
        p.y -= p.speed;
        if (p.y < -5) { p.y = canvas.height + 5; p.x = Math.random() * canvas.width; }
        ctx.beginPath();
        ctx.arc(p.x * canvas.width / 1200, p.y * canvas.height / 800, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(p.opacity * 255).toString(16).padStart(2,"0");
        ctx.fill();
      });
      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [particles]);

  const filtered = filter === "all" ? technologies : technologies.filter(t => t.category === filter);
  const activeTech = technologies.find(t => t.name === active);

  return (
    <section style={{
      background: "#09090f",
      padding: "96px 0 100px",
      position: "relative",
      overflow: "hidden",
      color: "#E8F4FD",
    }}>
      {/* Google Fonts */}
      <style>{`
        * { box-sizing: border-box; }

        .tech-card {
          background: rgba(255,255,255,0.015);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 14px;
          padding: 24px 16px 20px;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          text-align: center;
        }
        .tech-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(249,115,22,0.05) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .tech-card:hover::before, .tech-card.active::before { opacity: 1; }
        .tech-card:hover {
          border-color: rgba(249,115,22,0.35);
          transform: translateY(-5px);
          box-shadow: 0 16px 36px rgba(0,0,0,0.4), 0 0 12px rgba(249,115,22,0.06);
        }
        .tech-card.active {
          border-color: rgba(249,115,22,0.55);
          background: rgba(249,115,22,0.03);
          box-shadow: 0 20px 48px rgba(0,0,0,0.5), inset 0 0 16px rgba(249,115,22,0.08);
        }
        .icon-ring {
          width: 52px; height: 52px;
          border-radius: 50%;
          border: 1.5px solid rgba(255,255,255,0.08);
          display: flex; align-items: center; justify-content: center;
          font-size: 20px;
          color: rgba(255,255,255,0.7);
          background: rgba(255,255,255,0.02);
          position: relative; z-index: 1;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .tech-card:hover .icon-ring, .tech-card.active .icon-ring {
          border-color: #f97316;
          color: #f97316;
          background: rgba(249,115,22,0.08);
          box-shadow: 0 0 16px rgba(249,115,22,0.25), inset 0 0 8px rgba(249,115,22,0.1);
        }
        .tech-name {
          font-size: 13.5px;
          font-weight: 600;
          letter-spacing: -0.01em;
          color: rgba(255,255,255,0.9);
          position: relative; z-index: 1;
          transition: color 0.3s;
        }
        .tech-card:hover .tech-name, .tech-card.active .tech-name {
          color: #f97316;
        }
        .tech-desc {
          font-size: 11px;
          color: rgba(255,255,255,0.36);
          font-weight: 400;
          line-height: 1.4;
          position: relative; z-index: 1;
        }
        .cat-badge {
          font-size: 9px;
          padding: 3px 10px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.06);
          color: rgba(255,255,255,0.3);
          font-weight: 400;
          letter-spacing: 0.08em;
          position: relative; z-index: 1;
          transition: all 0.3s;
          background: rgba(255,255,255,0.01);
          text-transform: uppercase;
        }
        .tech-card:hover .cat-badge, .tech-card.active .cat-badge {
          border-color: rgba(249,115,22,0.25);
          color: #f97316;
          background: rgba(249,115,22,0.04);
        }

        .filter-btn {
          padding: 8px 20px;
          border-radius: 99px;
          border: 1px solid rgba(255,255,255,0.06);
          background: rgba(255,255,255,0.01);
          color: rgba(255,255,255,0.45);
          font-size: 11px;
          letter-spacing: 0.08em;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .filter-btn:hover {
          border-color: rgba(255,255,255,0.15);
          color: rgba(255,255,255,0.85);
          background: rgba(255,255,255,0.03);
          transform: translateY(-1px);
        }
        .filter-btn.active-filter {
          background: rgba(249,115,22,0.06);
          border-color: rgba(249,115,22,0.3);
          color: #f97316;
          box-shadow: 0 4px 16px rgba(249,115,22,0.1);
        }

        .grid-area {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        @media (min-width: 640px) {
          .grid-area {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (min-width: 768px) {
          .grid-area {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        @media (min-width: 1024px) {
          .grid-area {
            grid-template-columns: repeat(6, 1fr);
            gap: 20px;
          }
        }

        .detail-panel {
          background: linear-gradient(145deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.002) 100%);
          border: 1.5px solid rgba(255,255,255,0.05);
          border-radius: 20px;
          padding: 32px;
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          box-shadow: 0 32px 80px rgba(0,0,0,0.5), inset 0 0 1px rgba(255,255,255,0.1);
          animation: slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .corner-deco {
          position: absolute;
          width: 16px; height: 16px;
          border-color: rgba(255,255,255,0.05);
          border-style: solid;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .corner-tl { top: 8px; left: 8px; border-width: 1.5px 0 0 1.5px; }
        .corner-tr { top: 8px; right: 8px; border-width: 1.5px 1.5px 0 0; }
        .corner-bl { bottom: 8px; left: 8px; border-width: 0 0 1.5px 1.5px; }
        .corner-br { bottom: 8px; right: 8px; border-width: 0 1.5px 1.5px 0; }

        .tech-card:hover .corner-deco, .tech-card.active .corner-deco {
          border-color: rgba(249,115,22,0.3);
        }
        .tech-card:hover .corner-tl, .tech-card.active .corner-tl { transform: translate(-2px, -2px); }
        .tech-card:hover .corner-tr, .tech-card.active .corner-tr { transform: translate(2px, -2px); }
        .tech-card:hover .corner-bl, .tech-card.active .corner-bl { transform: translate(-2px, 2px); }
        .tech-card:hover .corner-br, .tech-card.active .corner-br { transform: translate(2px, 2px); }

        @keyframes float {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-4px); }
        }
        .float { animation: float 3s ease-in-out infinite; }

        @keyframes pulse-ring {
          0%   { box-shadow: 0 0 0 0 rgba(249,115,22,0.25); }
          100% { box-shadow: 0 0 0 16px rgba(249,115,22,0); }
        }
        .pulse { animation: pulse-ring 2.5s infinite; }
      `}</style>

      {/* Subtle dot grid */}
      <div
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "linear-gradient(rgba(255,255,255,.012) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.012) 1px,transparent 1px)",
          backgroundSize: "54px 54px"
        }}
      />

      {/* Canvas particles */}
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }} />

      {/* Gradient overlays */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 20% 20%, rgba(249,115,22,0.06) 0%, transparent 60%)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 80% 80%, rgba(249,115,22,0.05) 0%, transparent 60%)", pointerEvents: "none", zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <div style={{ marginBottom: 72 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <div style={{ width: 26, height: 1, background: "#f97316", opacity: 0.65 }} />
            <span style={{
              fontSize: 10.5, letterSpacing: "0.2em", textTransform: "uppercase",
              color: "#f97316", fontWeight: 400,
            }}>
              enterprise technology stack
            </span>
          </div>

          <h2 style={{
            fontSize: "clamp(42px, 6vw, 68px)", fontWeight: 300,
            color: "rgba(255,255,255,.9)", lineHeight: 1.02,
            margin: "0 0 16px", letterSpacing: "-.02em",
          }}>
            Our tech <span style={{
              fontStyle: "normal",
              background: "linear-gradient(135deg, #ff8f3d 0%, #f97316 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: 600
            }}>cloud</span>
          </h2>

          <p style={{
            fontSize: 14.5, color: "rgba(255,255,255,.3)",
            lineHeight: 1.8, maxWidth: 480, fontWeight: 400,
            margin: 0,
          }}>
            A comprehensive ecosystem of enterprise-grade frameworks, backend architectures, and AI systems we deploy to deliver stable software.
          </p>
        </div>

        {/* Stats strip */}
        <div style={{ display: "flex", justifyContent: "flex-start", gap: 48, marginBottom: 48, flexWrap: "wrap" }}>
          {[
            { n: technologies.length, label: "Technologies" },
            { n: Object.keys(categoryMeta).length, label: "Domains" },
            { n: "∞", label: "Scalability" },
          ].map(s => (
            <div key={s.label} style={{
              background: "rgba(255,255,255,0.012)",
              border: "1px solid rgba(255,255,255,0.04)",
              borderRadius: 14,
              padding: "24px 28px",
              minWidth: 160,
              flex: "1 1 0px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
              position: "relative",
              overflow: "hidden"
            }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, #f9731688, transparent)" }} />
              <div style={{ fontSize: 42, fontWeight: 300, color: "#f97316", lineHeight: 1, letterSpacing: "-0.02em" }}>{s.n}</div>
              <div style={{ fontSize: 9, color: "rgba(255,255,255,0.22)", marginTop: 8, letterSpacing: "0.14em", textTransform: "uppercase" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filter buttons */}
        <div style={{ display: "flex", justifyContent: "flex-start", gap: 10, marginBottom: 40, flexWrap: "wrap" }}>
          {allCategories.map(cat => (
            <button key={cat} className={`filter-btn ${filter === cat ? "active-filter" : ""}`}
              onClick={() => setFilter(cat)}>
              {cat === "all" ? "ALL" : categoryMeta[cat].label}
            </button>
          ))}
        </div>

        {/* Tech grid */}
        <div className="grid-area">
          {filtered.map((tech, i) => {
            const meta = categoryMeta[tech.category];
            return (
              <div
                key={tech.name}
                className={`tech-card ${active === tech.name ? "active" : ""}`}
                style={{
                  "--card-color": tech.color,
                  "--card-bg": meta.bg,
                  animationDelay: `${i * 0.05}s`,
                } as React.CSSProperties}
                onClick={() => setActive(active === tech.name ? null : tech.name)}
              >
                <div className="corner-deco corner-tl" />
                <div className="corner-deco corner-tr" />
                <div className="corner-deco corner-bl" />
                <div className="corner-deco corner-br" />
                <div className="icon-ring">{tech.icon}</div>
                <div className="tech-name">{tech.name}</div>
                <div className="tech-desc">{tech.description}</div>
                <div className="cat-badge">{meta.label}</div>
              </div>
            );
          })}
        </div>

        {/* Detail panel */}
        {activeTech && (
          <div className="detail-panel" style={{ marginTop: 36,
            borderColor: "rgba(249,115,22,0.2)",
            boxShadow: "0 32px 80px rgba(0,0,0,0.5)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
              <div style={{
                width: 68, height: 68, borderRadius: "50%",
                border: "1.5px solid #f97316",
                display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center",
                fontSize: 24, color: "#f97316",
                boxShadow: "0 0 24px rgba(249,115,22,0.25)",
                background: "rgba(0,0,0,0.4)",
                flexShrink: 0,
              }} className="float">{activeTech.icon}</div>

              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ fontSize: 28, fontWeight: 300,
                  color: "#f97316", marginBottom: 6, letterSpacing: "-0.01em" }}>{activeTech.name}</div>
                <div style={{ fontSize: 12,
                  color: "rgba(255,255,255,0.45)", marginBottom: 12, lineHeight: 1.5 }}>{activeTech.description}</div>
                <span style={{
                  display: "inline-block", padding: "3px 10px", borderRadius: 999,
                  border: "1px solid rgba(249,115,22,0.25)",
                  color: "#f97316", fontSize: 9.5,
                  letterSpacing: "0.08em", textTransform: "uppercase"
                }}>{categoryMeta[activeTech.category].label}</span>
              </div>

              <button onClick={() => setActive(null)} style={{
                background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.45)", borderRadius: 99, padding: "8px 20px",
                cursor: "pointer", fontSize: 10,
                letterSpacing: "0.08em", transition: "all 0.25s",
              }}
                onMouseOver={e => { e.currentTarget.style.borderColor = "#f97316"; e.currentTarget.style.color = "#f97316"; e.currentTarget.style.background = "rgba(249,115,22,0.06)"; }}
                onMouseOut={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "rgba(255,255,255,0.45)"; e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}
              >✕ CLOSE</button>
            </div>

            {/* Divider */}
            <div style={{ margin: "24px 0", height: 1,
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)" }} />

            {/* Related techs */}
            <div>
              <div style={{ fontSize: 9.5,
                color: "rgba(255,255,255,0.22)", letterSpacing: "0.14em", marginBottom: 14, textTransform: "uppercase" }}>
                Related in {categoryMeta[activeTech.category].label}
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {technologies.filter(t => t.category === activeTech.category && t.name !== activeTech.name).map(t => (
                  <div key={t.name}
                    onClick={() => setActive(t.name)}
                    style={{
                      padding: "6px 14px", borderRadius: 8, cursor: "pointer",
                      border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.015)",
                      color: "rgba(255,255,255,0.65)", fontSize: 10,
                      fontWeight: 500, transition: "all 0.25s",
                    }}
                    onMouseOver={e => { e.currentTarget.style.borderColor = "#f97316"; e.currentTarget.style.color = "#f97316"; e.currentTarget.style.background = "rgba(249,115,22,0.05)"; }}
                    onMouseOut={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "rgba(255,255,255,0.65)"; e.currentTarget.style.background = "rgba(255,255,255,0.015)"; }}
                  >{t.icon} {t.name}</div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Bottom legend */}
        <div style={{ marginTop: 56, display: "flex", justifyContent: "center", gap: 32, flexWrap: "wrap", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 32 }}>
          {Object.entries(categoryMeta).map(([key, m]) => (
            <div key={key} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#f97316", boxShadow: "0 0 8px rgba(249,115,22,0.8)" }} />
              <span style={{ fontSize: 9.5, color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{m.label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}