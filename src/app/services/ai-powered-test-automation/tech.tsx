"use client";
import { useState, useEffect } from "react";

/* ─── Data ─────────────────────────────────────────────────── */
const TABS = [
  {
    id: "testing",
    label: "Test Automation",
    subtitle: "E2E · Mobile · Cross-browser",
    count: 4,
    progress: 80,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v11m0 0H5m4 0h4m6-11v11m0 0h-4m4 0h-6"/>
        <circle cx="12" cy="19" r="2"/><path d="M12 17v-5"/>
      </svg>
    ),
    tools: [
      { name: "Playwright",  desc: "Modern cross-browser E2E testing",  tag: "E2E" },
      { name: "Selenium",    desc: "Browser automation standard",        tag: "E2E" },
      { name: "Cypress",     desc: "Fast frontend testing",              tag: "Frontend" },
      { name: "Appium",      desc: "iOS & Android automation",           tag: "Mobile" },
    ],
  },
  {
    id: "api",
    label: "API Testing",
    subtitle: "REST · GraphQL · CLI",
    count: 3,
    progress: 60,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
      </svg>
    ),
    tools: [
      { name: "Postman",      desc: "API development & collaboration platform", tag: "REST" },
      { name: "REST Assured", desc: "Java-based REST validation framework",     tag: "Java" },
      { name: "Newman",       desc: "Postman CLI collection runner",            tag: "CLI" },
    ],
  },
  {
  id: "performance",
  label: "Performance Testing",
  subtitle: "Load · Stress · Scalability",
  count: 3,
  progress: 72,
  icon: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 20v-6" />
      <path d="M6 20V10" />
      <path d="M18 20V4" />
    </svg>
  ),
  tools: [
    {
      name: "JMeter",
      desc: "Open-source load testing platform",
      tag: "Load",
    },
    {
      name: "k6",
      desc: "Modern developer-centric performance testing",
      tag: "Performance",
    },
    {
      name: "LoadRunner",
      desc: "Enterprise-scale stress testing",
      tag: "Enterprise",
    },
  ],
},

{
  id: "security",
  label: "Security Testing",
  subtitle: "Vulnerability · SAST · DAST",
  count: 3,
  progress: 68,
  icon: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  tools: [
    {
      name: "OWASP ZAP",
      desc: "Web application security scanning",
      tag: "DAST",
    },
    {
      name: "SonarQube",
      desc: "Static code quality & security analysis",
      tag: "SAST",
    },
    {
      name: "Burp Suite",
      desc: "Advanced penetration testing toolkit",
      tag: "Security",
    },
  ],
},

{
  id: "cloud",
  label: "Cloud Platforms",
  subtitle: "AWS · Azure · Kubernetes",
  count: 3,
  progress: 75,
  icon: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 17.58A5 5 0 0018 8h-1.26A8 8 0 104 16.25" />
      <line x1="8" y1="16" x2="8.01" y2="16" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
      <line x1="16" y1="16" x2="16.01" y2="16" />
    </svg>
  ),
  tools: [
    {
      name: "AWS",
      desc: "Cloud-native automation infrastructure",
      tag: "Cloud",
    },
    {
      name: "Azure",
      desc: "Enterprise Microsoft cloud ecosystem",
      tag: "Microsoft",
    },
    {
      name: "Kubernetes",
      desc: "Container orchestration & scaling",
      tag: "Containers",
    },
  ],
},
  {
    id: "devops",
    label: "DevOps & CI/CD",
    subtitle: "Pipeline · Build · Deploy",
    count: 3,
    progress: 60,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/>
        <path d="M13 6h3a2 2 0 012 2v7"/><path d="M11 18H8a2 2 0 01-2-2V9"/>
      </svg>
    ),
    tools: [
      { name: "Azure DevOps",   desc: "Microsoft enterprise CI/CD platform", tag: "Cloud" },
      { name: "GitHub Actions", desc: "Automated workflow pipelines",         tag: "CI/CD" },
      { name: "Jenkins",        desc: "Open-source build automation server",  tag: "Build" },
    ],
  },
  {
    id: "reporting",
    label: "Reporting",
    subtitle: "Dashboards · Insights · Trends",
    count: 3,
    progress: 60,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
      </svg>
    ),
    tools: [
      { name: "Allure Reports", desc: "Beautiful interactive test reports", tag: "Reports" },
      { name: "Power BI",       desc: "Real-time data visualisation",       tag: "BI" },
      { name: "Test Analytics", desc: "Deep quality insights & trends",     tag: "Analytics" },
    ],
  },
];

const STATS = [
  { value: "13+",           label: "Tools",            small: false },
  { value: "4",             label: "Categories",       small: false },
  { value: "100%",          label: "CI/CD Ready",      small: false },
  { value: "Cross\nPlatform", label: "Coverage",       small: true  },
];

/* ─── Animated progress bar ─────────────────────────────────── */
function ProgressBar({ progress, animKey }: { progress: number; animKey: number }) {
  const [w, setW] = useState(0);
  useEffect(() => {
    setW(0);
    const t = setTimeout(() => setW(progress), 60);
    return () => clearTimeout(t);
  }, [animKey]);

  return (
    <div style={{ height: 3, background: "#f4f4f5", borderRadius: 2, overflow: "hidden", margin: "14px 20px 0" }}>
      <div style={{
        height: "100%", width: `${w}%`, borderRadius: 2,
        background: "linear-gradient(90deg,#f97316,#fb923c)",
        boxShadow: "0 0 10px rgba(249,115,22,0.5)",
        transition: "width 0.75s cubic-bezier(0.16,1,0.3,1)",
      }} />
    </div>
  );
}

/* ─── Tool row ───────────────────────────────────────────────── */
function ToolRow({ name, desc, tag, delay }: {
  name: string; desc: string; tag: string; delay: number;
}) {
  const [hov, setHov] = useState(false);
  const [vis, setVis] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVis(true), delay); return () => clearTimeout(t); }, [delay]);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", alignItems: "center", gap: 10,
        padding: "11px 14px", borderRadius: 12,
        border: `1px solid ${hov ? "#fed7aa" : "#f4f4f5"}`,
        background: hov ? "#fff7ed" : "#fafafa",
        cursor: "pointer",
        opacity: vis ? 1 : 0,
        transform: vis ? (hov ? "translateX(4px)" : "translateX(0)") : "translateY(8px)",
        transition: `opacity 0.4s ease ${delay}ms, transform 0.3s cubic-bezier(0.16,1,0.3,1)`,
      }}
    >
      <div style={{
        width: 6, height: 6, borderRadius: "50%", flexShrink: 0,
        background: hov ? "#f97316" : "#d4d4d8",
        boxShadow: hov ? "0 0 8px rgba(249,115,22,0.6)" : "none",
        transition: "all 0.2s",
      }} />

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 13, fontWeight: 600, letterSpacing: "-0.01em",
          color: hov ? "#ea580c" : "#27272a", transition: "color 0.2s",
        }}>{name}</div>
        <div style={{
          fontSize: 11, marginTop: 2,
          color: hov ? "#ea580c" : "#71717a",
          transition: "color 0.2s",
        }}>{desc}</div>
      </div>

      <span style={{
        fontSize: 9, fontWeight: 700, padding: "2px 8px", borderRadius: 6,
        letterSpacing: "0.1em", textTransform: "uppercase" as const,
        color: "#ea580c", background: "#fff7ed",
        border: "1px solid #fed7aa", flexShrink: 0,
      }}>{tag}</span>

      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#f97316"
        strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        style={{ opacity: hov ? 1 : 0, transform: hov ? "translateX(0)" : "translateX(-5px)", transition: "all 0.22s", flexShrink: 0 }}>
        <path d="M5 12h14M12 5l7 7-7 7"/>
      </svg>
    </div>
  );
}

/* ─── Tab button ─────────────────────────────────────────────── */
function TabBtn({ tab, isActive, onClick }: { tab: typeof TABS[0]; isActive: boolean; onClick: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", alignItems: "center", gap: 7,
        padding: "9px 14px", borderRadius: 10, cursor: "pointer",
        fontSize: 13, fontWeight: 600,
        letterSpacing: "-0.01em", whiteSpace: "nowrap" as const,
        border: "none", outline: "none",
        background: isActive ? "linear-gradient(135deg,#f97316,#ea6d10)"
          : hov ? "#fff7ed" : "transparent",
        color: isActive ? "#fff" : hov ? "#ea580c" : "#52525b",
        boxShadow: isActive ? "0 4px 18px rgba(249,115,22,0.35),inset 0 1px 0 rgba(255,255,255,0.15)" : "none",
        transition: "all 0.22s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <span style={{ opacity: isActive || hov ? 1 : 0.55, display: "flex", alignItems: "center" }}>
        {tab.icon}
      </span>
      {tab.label}
      <span style={{
        fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 20,
        background: isActive ? "rgba(255,255,255,0.2)" : "#f4f4f5",
        color: isActive ? "#fff" : hov ? "#ea580c" : "#71717a",
      }}>{tab.count}</span>
    </button>
  );
}

/* ─── Root ───────────────────────────────────────────────────── */
export default function TechStack() {
  const [activeId, setActiveId] = useState("testing");
  const [panelKey, setPanelKey] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { const t = setTimeout(() => setMounted(true), 80); return () => clearTimeout(t); }, []);

  const switchTab = (id: string) => {
    if (id === activeId) return;
    setActiveId(id);
    setPanelKey((k) => k + 1);
  };

  const tab = TABS.find((t) => t.id === activeId)!;

  const fu = (delay: number): React.CSSProperties => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(14px)",
    transition: `opacity 0.55s ease ${delay}ms, transform 0.55s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  });

  return (
    <div style={{
      background: "linear-gradient(to bottom, #fafafa, #ffffff, #fafafa)",
      minHeight: "100vh", padding: "64px 24px",
      position: "relative", overflow: "hidden",
    }}>
      <style>{`
        @keyframes tsSlide { from{opacity:0;transform:translateX(10px)} to{opacity:1;transform:translateX(0)} }
        @keyframes tsPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(1.7)} }
        @media (max-width: 768px) {
          .tech-tools-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 640px) {
          .tech-stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 10px !important;
          }
        }
      `}</style>

      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 2 }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 28, ...fu(50) }}>
          <div style={{
            display:"inline-flex",alignItems:"center",gap:7,
            background:"#fff7ed",border:"1px solid #fed7aa",
            borderRadius:30,padding:"4px 14px",marginBottom:12,
          }}>
            <span style={{ width:6,height:6,borderRadius:"50%",background:"#f97316",
              boxShadow:"0 0 8px rgba(249,115,22,.6)",display:"inline-block",
              animation:"tsPulse 1.8s ease-in-out infinite" }} />
            <span style={{ fontSize:10,fontWeight:600,letterSpacing:"0.14em",color:"#ea580c",
              textTransform:"uppercase",}}>Technology Stack</span>
          </div>
          <h2 style={{ fontSize:32,fontWeight:900,letterSpacing:"-0.035em",color:"#18181b",lineHeight:1.1,margin:"0 0 8px",display:"block" }}>
            Our Automation{" "}
            <span style={{ color:"#f97316" }}>Stack</span>
          </h2>
          <p style={{ fontSize:14,color:"#71717a",margin:0,maxWidth:480,marginInline:"auto",lineHeight:1.7 }}>
            Industry-leading tools for every layer of your automation pipeline.
          </p>
          <div style={{ width:40,height:3,background:"#f97316",
            margin:"14px auto 0",borderRadius:2 }} />
        </div>

        {/* Tabs */}
        <div style={{
          display:"flex",flexWrap:"wrap",gap:6,padding:6,
          background:"#ffffff",border:"1px solid #e5e7eb",
          borderRadius:14,marginBottom:12,
          boxShadow:"0 1px 4px rgba(0,0,0,0.04)",
          ...fu(120),
        }}>
          {TABS.map((t) => (
            <TabBtn key={t.id} tab={t} isActive={t.id === activeId} onClick={() => switchTab(t.id)} />
          ))}
        </div>

        {/* Panel */}
        <div key={panelKey} style={{
          background:"#ffffff",border:"1px solid #e5e7eb",
          borderRadius:16,overflow:"hidden",marginBottom:12,
          boxShadow:"0 2px 8px rgba(0,0,0,0.06)",
          animation:"tsSlide 0.3s cubic-bezier(0.16,1,0.3,1) both",
        }}>
          {/* Panel header */}
          <div style={{ padding:"20px 20px 0",display:"flex",alignItems:"center",justifyContent:"space-between" }}>
            <div style={{ display:"flex",alignItems:"center",gap:12 }}>
              <div style={{
                width:42,height:42,borderRadius:12,flexShrink:0,
                background:"#fff7ed",border:"1px solid #fed7aa",
                display:"flex",alignItems:"center",justifyContent:"center",color:"#f97316",
              }}>{tab.icon}</div>
              <div>
                <div style={{ fontSize:15,fontWeight:700,color:"#18181b",letterSpacing:"-0.01em" }}>{tab.label}</div>
                <div style={{ fontSize:10,color:"#a1a1aa",marginTop:2,}}>{tab.subtitle}</div>
              </div>
            </div>
            <div style={{ textAlign:"right" }}>
              <div style={{ fontSize:32,fontWeight:900,letterSpacing:"-0.04em",lineHeight:1,
                color:"#ea580c" }}>{tab.count}</div>
              <div style={{ fontSize:9,fontWeight:600,letterSpacing:"0.12em",textTransform:"uppercase" as const,
                color:"#a1a1aa",marginTop:2 }}>tools</div>
            </div>
          </div>

          <ProgressBar progress={tab.progress} animKey={panelKey} />

          <div style={{ height:1,background:"#f4f4f5",margin:"14px 0" }} />

          {/* Tools grid */}
          <div className="tech-tools-grid" style={{
            padding:"0 14px 16px",
            display:"grid",
            gridTemplateColumns: tab.tools.length === 4 ? "1fr 1fr" : "1fr",
            gap:8,
          }}>
            {tab.tools.map((tool, i) => (
              <ToolRow key={tool.name} {...tool} delay={i * 60} />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="tech-stats-grid" style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8, ...fu(240) }}>
          {STATS.map((s) => (
            <div key={s.label} style={{
              background:"#ffffff",border:"1px solid #e5e7eb",
              borderRadius:12,padding:"12px 8px",textAlign:"center",
              boxShadow:"0 1px 4px rgba(0,0,0,0.04)",
            }}>
              <div style={{
                fontWeight:900,
                fontSize: s.small ? 13 : 22,
                lineHeight: s.small ? 1.3 : 1,
                whiteSpace:"pre-line",
                color:"#ea580c",
                letterSpacing:"-0.03em",marginBottom:4,
              }}>{s.value}</div>
              <div style={{ fontSize:9,fontWeight:600,letterSpacing:"0.1em",textTransform:"uppercase" as const,
                color:"#a1a1aa",}}>{s.label}</div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}