"use client";
import { useState, ReactNode } from "react";
import Link from "next/link";

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
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#ff7a2f"
        strokeWidth="1.5"
        strokeLinecap="round"
      >
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
    partner:
      "We bring reliable data engineering and up-to-date analytics expertise.",
    deco: "bars",
    href: "/services/data-analytics/power-bi",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#ff7a2f"
        strokeWidth="1.5"
        strokeLinecap="round"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    badge: "Intelligent AI",
    title: "AI & Intelligent Automation",
    desc: "Integrating AI solutions to improve business processes and experiences.",
    tech: [
      "Azure AI Foundry",
      "Copilot Integration",
      "AI Agents",
      "RAG Workflows",
    ],
    partner: "Operate with confidence using our AI integration expertise.",
    deco: "circles",
    href: "/services/ai-intelligence/agentic-ai",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#ff7a2f"
        strokeWidth="1.5"
        strokeLinecap="round"
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" />
      </svg>
    ),
  },
  {
    badge: "Workspace",
    title: "Digital Workspace & App Engineering",
    desc: "Enhancing and extending your Microsoft 365 collaboration environments.",
    tech: [
      "SharePoint Online",
      "Microsoft 365",
      "Web Applications",
      "Mobile Applications",
    ],
    partner: "Securely deliver and support modern workspace solutions.",
    deco: "code",
    href: "/services/digital-workspace/sharepoint",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#ff7a2f"
        strokeWidth="1.5"
        strokeLinecap="round"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
];

function PowerPlatformBackground({ hovered }: { hovered: boolean }) {
  const tools = [
    { id: "apps",      label: "Power Apps",        x: 350, y: 90,  r: 22, color: "#FB923C", fill: "#FFEDD5", textColor: "#9A3412" },
    { id: "automate",  label: "Power Automate",     x: 350, y: 175, r: 22, color: "#F97316", fill: "#FFF7ED", textColor: "#C2410C" },
    { id: "dataverse", label: "Dataverse",          x: 430, y: 138, r: 30, color: "#EA580C", fill: "#FFEDD5", textColor: "#7C2D12" },
    { id: "fo",        label: "Dynamics 365",   x: 510, y: 90,  r: 22, color: "#F97316", fill: "#FFF7ED", textColor: "#9A3412" },
    { id: "ce",        label: "D365 CE",            x: 510, y: 185, r: 22, color: "#FB923C", fill: "#FFEDD5", textColor: "#C2410C" },
  ];

  const connections = [
    { from: 0, to: 2, color: "#FB923C" },
    { from: 1, to: 2, color: "#F97316" },
    { from: 2, to: 3, color: "#EA580C" },
    { from: 2, to: 4, color: "#C2410C" },
    { from: 0, to: 1, color: "#9A3412" },
  ];

  const icons: Record<string, ReactNode> = {
    apps: (
      <g transform="translate(195, 0)">
        <rect x={143} y={80} width={24} height={18} rx={2} fill="none" stroke="#EA580C" strokeWidth={1.5} />
        <line x1={143} y1={85} x2={167} y2={85} stroke="#EA580C" strokeWidth={1} />
        <rect x={146} y={88} width={7} height={7} rx={1} fill="#EA580C" opacity={0.6} />
        <rect x={155} y={88} width={9} height={3} rx={1} fill="#EA580C" opacity={0.35} />
        <rect x={155} y={93} width={6} height={2} rx={1} fill="#EA580C" opacity={0.25} />
      </g>
    ),
    automate: (
      <g transform="translate(195, 0)">
        <polygon points="161,163 153,175 158,175 149,187 162,174 157,174" fill="#EA580C" opacity={0.75} />
      </g>
    ),
    dataverse: (
      <g transform="translate(60, 0)">
        <ellipse cx={370} cy={126} rx={12} ry={4} fill="none" stroke="#C2410C" strokeWidth={1.3} />
        <line x1={358} y1={126} x2={358} y2={138} stroke="#C2410C" strokeWidth={1.3} />
        <line x1={382} y1={126} x2={382} y2={138} stroke="#C2410C" strokeWidth={1.3} />
        <ellipse cx={370} cy={138} rx={12} ry={4} fill="#FFEDD5" stroke="#C2410C" strokeWidth={1.3} />
      </g>
    ),
    fo: (
      <>
        <circle cx={510} cy={90} r={8} fill="none" stroke="#C2410C" strokeWidth={1.5} />
        <circle cx={510} cy={90} r={3} fill="#C2410C" opacity={0.5} />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          return (
            <line key={i}
              x1={510 + Math.cos(rad) * 8}  y1={90 + Math.sin(rad) * 8}
              x2={510 + Math.cos(rad) * 12} y2={90 + Math.sin(rad) * 12}
              stroke="#C2410C" strokeWidth={1.5} strokeLinecap="round"
            />
          );
        })}
      </>
    ),
    ce: (
      <>
        <rect x={500} y={188} width={5} height={8}  rx={1} fill="#C2410C" opacity={0.7} />
        <rect x={507} y={183} width={5} height={13} rx={1} fill="#C2410C" opacity={0.55} />
        <rect x={514} y={180} width={5} height={16} rx={1} fill="#C2410C" opacity={0.4} />
        <line x1={498} y1={196} x2={522} y2={196} stroke="#C2410C" strokeWidth={1} opacity={0.6} />
      </>
    ),
  };

  return (
    <svg
      className="absolute right-0 bottom-0 pointer-events-none z-0"
      viewBox="320 60 220 170"
      preserveAspectRatio="xMaxYMax meet"
      aria-hidden="true"
      style={{
        width: "35%",
        height: "60%",
      }}
    >
      <defs>
        <marker id="pp-arrow" viewBox="0 0 10 10" refX={8} refY={5} markerWidth={5} markerHeight={5} orient="auto-start-reverse">
          <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
        </marker>
        {connections.map(({ from, to }) => {
          const f = tools[from], t = tools[to];
          const mx = (f.x + t.x) / 2, my = (f.y + t.y) / 2 - 10;
          return <path key={`mp-${from}-${to}`} id={`mp-${from}-${to}`} d={`M${f.x},${f.y} Q${mx},${my} ${t.x},${t.y}`} />;
        })}
      </defs>

      {/* Scatter dots */}
      {[[60,50],[100,30],[80,80],[40,120],[620,50],[600,80],[640,120],[620,220],[250,220],[300,240],[430,230]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r={1.2} fill="#888780"
          style={{ opacity: hovered ? 0.25 : 0.1, transition: "opacity 0.5s" }}
        />
      ))}

      {/* Connection lines */}
      {connections.map(({ from, to, color }) => {
        const f = tools[from], t = tools[to];
        const mx = (f.x + t.x) / 2, my = (f.y + t.y) / 2 - 10;
        return (
          <path key={`conn-${from}-${to}`}
            d={`M${f.x},${f.y} Q${mx},${my} ${t.x},${t.y}`}
            fill="none" stroke={color} strokeWidth={1} strokeDasharray="5 4"
            markerEnd="url(#pp-arrow)"
            style={{ opacity: hovered ? 0.6 : 0.3, transition: "opacity 0.4s" }}
          />
        );
      })}

      {/* Animated flow dots */}
      {hovered && connections.map(({ from, to, color }, i) => (
        <circle key={`dot-${from}-${to}`} r={3} fill={color} opacity={0}>
          <animateMotion dur="3s" repeatCount="indefinite" begin={`${i * 0.5}s`}>
            <mpath href={`#mp-${from}-${to}`} />
          </animateMotion>
          <animate attributeName="opacity" values="0;1;1;0" dur="3s" repeatCount="indefinite" begin={`${i * 0.5}s`} />
        </circle>
      ))}

      {/* Pulse rings */}
      {tools.map(({ x, y, r, color, id }) => (
        <circle key={`pulse-${id}`} cx={x} cy={y} r={r + 8} fill="none" stroke={color} strokeWidth={1}
          style={{
            opacity: hovered ? 0.3 : 0,
            transform: hovered ? "scale(1)" : "scale(0.85)",
            transformOrigin: `${x}px ${y}px`,
            transition: "opacity 0.5s, transform 0.5s",
          }}
        />
      ))}

      {/* Nodes */}
      {tools.map(({ id, x, y, r, color, fill, textColor, label }) => (
        <g key={id}>
          <circle cx={x} cy={y} r={r} fill={fill} stroke={color} strokeWidth={1.5}
            style={{ opacity: hovered ? 1 : 0.75, transition: "opacity 0.4s" }}
          />
          {icons[id]}
          <text x={x} y={y + r + 14} textAnchor="middle" fontSize={10} fontWeight={500} fill={textColor}
            style={{ opacity: hovered ? 1 : 0.6, transition: "opacity 0.4s", fontFamily: "sans-serif" }}
          >
            {label}
          </text>
        </g>
      ))}
    </svg>
  );
}
// Code watermark deco
function CodeBackground({ hovered }: { hovered: boolean }) {
  return (
    <>
      <div
        className="absolute right-8 top-1/2 -translate-y-1/2 font-mono font-black text-white pointer-events-none select-none leading-tight text-right"
        style={{
          fontSize: 52,
          opacity: hovered ? 0.12 : 0.05,
          transform: `translateY(-50%) scale(${hovered ? 1.08 : 1})`,
          transition: "opacity 0.4s ease, transform 0.4s ease",
          letterSpacing: "-0.02em",
        }}
      >
        {"</>"}
      </div>
      <div
        className="absolute right-16 top-8 font-mono text-white pointer-events-none select-none"
        style={{
          fontSize: 13,
          opacity: hovered ? 0.08 : 0.03,
          transition: "opacity 0.5s ease",
          color: "#ff7a2f",
        }}
      >
        {"div.app { }"}
        <br />
        {"const x = ai;"}
      </div>
    </>
  );
}

// Concentric circles deco
function CirclesBackground({ hovered }: { hovered: boolean }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 640 240"
      preserveAspectRatio="xMidYMid slice"
    >
      {[200, 160, 120, 80].map((r, i) => (
        <circle
          key={i}
          cx={160}
          cy={200}
          r={r}
          fill="none"
          stroke="rgba(255,122,47,0.18)"
          strokeWidth="1"
          style={{
            transition: `transform ${0.5 + i * 0.1}s ease, opacity 0.4s ease, r 0.5s ease`,
            transformOrigin: "160px 200px",
            transform: hovered ? `scale(${1.1 + i * 0.05})` : "scale(1)",
            opacity: hovered ? 0.6 : 0.25,
          }}
        />
      ))}
      {/* Mesh lines */}
      {hovered &&
        [0, 45, 90, 135].map((angle, i) => (
          <line
            key={i}
            x1={160}
            y1={200}
            x2={160 + Math.cos((angle * Math.PI) / 180) * 200}
            y2={200 + Math.sin((angle * Math.PI) / 180) * 200}
            stroke="rgba(255,122,47,0.08)"
            strokeWidth="1"
            style={{ transition: "opacity 0.3s ease" }}
          />
        ))}
    </svg>
  );
}

// Animated bar chart deco
function BarsBackground({ hovered }: { hovered: boolean }) {
  const heights = [40, 65, 50, 90, 70, 110, 85, 130, 100];
  return (
    <div className="absolute bottom-0 right-0 flex items-end gap-2 p-6 pointer-events-none">
      {heights.map((h, i) => (
        <div
          key={i}
          className="rounded-sm"
          style={{
            width: 14,
            height: hovered ? h : h * 0.4,
            background: `rgba(255,255,255,${hovered ? 0.12 + i * 0.01 : 0.06})`,
            transition: `height ${0.3 + i * 0.05}s ease, background 0.3s ease`,
            transitionDelay: `${i * 0.04}s`,
          }}
        />
      ))}
    </div>
  );
}

function ServiceCard({ service }: { service: (typeof services)[0] }) {
  const [hovered, setHovered] = useState(false);
  const { badge, title, desc, tech, partner, deco, icon, href } = service;

  return (
    <div
      className="relative overflow-hidden bg-[#0d0d0d] cursor-pointer"
      style={{
        transition: "background 0.3s ease",
        background: hovered ? "#111" : "#0d0d0d",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Animated backgrounds */}
      {deco === "dots" && <PowerPlatformBackground hovered={hovered} />}
      {deco === "bars" && <BarsBackground hovered={hovered} />}
      {deco === "circles" && <CirclesBackground hovered={hovered} />}
      {deco === "code" && <CodeBackground hovered={hovered} />}

      {/* Orange glow on hover */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 80% 20%, rgba(255,122,47,0.06) 0%, transparent 60%)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}
      />

      {/* Content */}
      <div className="relative p-7 flex flex-col gap-4 z-10">
        {/* Top row */}
        <div className="flex items-start justify-between">
          <span
            className="inline-flex items-center px-3 py-1 rounded-full border text-[10px] font-bold tracking-[0.1em] uppercase"
            style={{
              background: "rgba(255,122,47,0.15)",
              borderColor: "rgba(255,122,47,0.3)",
              color: "#ff9a5f",
            }}
          >
            {badge}
          </span>
          <div
            className="w-[38px] h-[38px] rounded-[10px] border border-[#2a2a2a] flex items-center justify-center"
            style={{
              background: hovered ? "#1e1e1e" : "#181818",
              transition: "background 0.3s ease",
            }}
          >
            {icon}
          </div>
        </div>

        {/* Title */}
        <p className="text-[15px] font-extrabold text-white tracking-wider uppercase leading-snug m-0">
          {title}
        </p>

        {/* Description */}
        <p
          className="text-[12.5px] leading-snug m-0"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          {desc}
        </p>

        {/* Tech pills */}
        <div className="flex flex-wrap gap-2">
          {tech.map((t) => (
            <span
              key={t}
              className="text-[11px] px-3 py-1.5 rounded-full border"
              style={{
                background: "transparent",
                borderColor: "rgba(255,255,255,0.15)",
                color: "rgba(255,255,255,0.55)",
                transition: "border-color 0.3s ease, color 0.3s ease",
                ...(hovered
                  ? {
                      borderColor: "rgba(255,122,47,0.25)",
                      color: "rgba(255,255,255,0.7)",
                    }
                  : {}),
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Partner note */}
        <p
          className="text-[12px] leading-snug pl-3 border-l-2 m-0"
          style={{
            color: "#ff7a2f",
            borderColor: "#ff7a2f",
            opacity: hovered ? 1 : 0.75,
            transition: "opacity 0.3s ease",
          }}
        >
          {partner}
        </p>

        {/* CTA Button */}
        <div>
          <Link
            href={href}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-[11px] font-bold tracking-[0.1em] uppercase border-none cursor-pointer"
            style={{
              background: hovered
                ? "linear-gradient(135deg, #d96820, #a04510)"
                : "linear-gradient(135deg, #c75a1a, #8b3a0f)",
              transition: "background 0.3s ease, transform 0.2s ease",
              transform: hovered ? "translateX(4px)" : "translateX(0)",
              textDecoration: "none",
            }}
          >
            Explore Solution
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CoreEngineeringServices() {
  return (
    <section className="bg-gradient-to-b from-black via-[#020d1a] to-black px-10 py-12 font-sans ">
      <div className="max-w-7xl mx-auto w-full">
        {/* Heading */}
        <h2 className="text-[36px] font-extrabold tracking-tight leading-tight mb-8 m-0">
          <span className="text-white">Core Engineering Services</span>
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-2 border border-[#222] rounded-2xl overflow-hidden">
          {services.map((service, idx) => (
            <div
              key={service.title}
              className={`
                ${idx === 0 ? "border-r border-b border-[#222]" : ""}
                ${idx === 1 ? "border-b border-[#222]" : ""}
                ${idx === 2 ? "border-r border-[#222]" : ""}
              `}
            >
              <ServiceCard service={service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
