"use client";

export default function PowerPlatformSection() {
  const CENTER = 350;
  const ORBIT_RADIUS = 240;
  const NODE_RADIUS = 64;
  const ICON_SIZE = 56;

  const nodes = [
    { label: "Power Apps", icon: "/images/power-apps.webp", color: "#D946EF" },
    { label: "Mobile", icon: "/images/mobile.svg", color: "#22c55e" },
    { label: "Web", icon: "/images/web.svg", color: "#22d3ee" },
    { label: "Power BI", icon: "/images/power-bi.webp", color: "#FACC15" },
    { label: "SharePoint", icon: "/images/sp1.svg", color: "#A855F7" },
    { label: "AI", icon: "/images/ai.svg", color: "#a855f7" },
    {
      label: "Power Automate",
      icon: "/images/power-auto.webp",
      color: "#38BDF8",
    },
  ];

  return (
    <section className="relative w-full px-6 py-15 bg-gradient-to-b from-black via-[#020d1a] to-black overflow-hidden">
      <div
        className="
  relative max-w-7xl mx-auto
  rounded-3xl
  bg-gradient-to-br from-[#0b0f14] via-[#141922] to-[#0b0f14]
  border border-white/10
  p-14
  grid grid-cols-1 lg:grid-cols-2
  gap-20
  items-center
  overflow-hidden
  backdrop-blur-xl
"
      >
        {/* Mirror highlights */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Top white reflection */}
          <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/10 to-transparent" />

          {/* Diagonal glass shine */}
          <div
            className="absolute -top-1/4 -left-1/4 w-[150%] h-[150%]
    bg-gradient-to-tr from-white/5 via-transparent to-transparent
    rotate-12"
          />

          {/* Subtle noise / depth */}
          <div className="absolute inset-0 bg-white/[0.02]" />
        </div>

        {/* ================= LEFT : DIAGRAM ================= */}
        <div className="relative flex justify-center">
          <div className="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-3xl" />

          <svg viewBox="0 0 700 700" className="relative w-full max-w-[560px]">
            <defs>
              <radialGradient id="centerGlow">
                <stop offset="0%" stopColor="#E0FDFF" />
                <stop offset="100%" stopColor="#9EE7EB" />
              </radialGradient>

              <filter id="softGlow">
                <feDropShadow
                  dx="0"
                  dy="0"
                  stdDeviation="10"
                  floodColor="#38bdf8"
                  floodOpacity="0.45"
                />
              </filter>

              <marker
                id="arrow"
                markerWidth="10"
                markerHeight="10"
                refX="6"
                refY="3"
                orient="auto"
              >
                <path d="M0,0 L0,6 L9,3 z" fill="#94a3b8" />
              </marker>
            </defs>

            {/* CENTER */}
            <circle
              cx={CENTER}
              cy={CENTER}
              r="95"
              fill="url(#centerGlow)"
              filter="url(#softGlow)"
            />
            <text
              x={CENTER}
              y={CENTER - 18}
              textAnchor="middle"
              fontSize="16"
              fontWeight="600"
              fill="#020617"
            >
              Unified
            </text>
            <text
              x={CENTER}
              y={CENTER + 2}
              textAnchor="middle"
              fontSize="16"
              fontWeight="600"
              fill="#020617"
            >
              Digital
            </text>
            <text
              x={CENTER}
              y={CENTER + 22}
              textAnchor="middle"
              fontSize="16"
              fontWeight="600"
              fill="#020617"
            >
              Solutions
            </text>
            {/* BRANCH NODES – SAME SIZE & SAME DISTANCE */}
            {nodes.map((node, i) => {
              const angle = (360 / nodes.length) * i - 90; // start from top
              const cx =
                CENTER + ORBIT_RADIUS * Math.cos((angle * Math.PI) / 180);
              const cy =
                CENTER + ORBIT_RADIUS * Math.sin((angle * Math.PI) / 180);

              // Vector math for connector (edge → edge)
              const dx = cx - CENTER;
              const dy = cy - CENTER;
              const distance = Math.sqrt(dx * dx + dy * dy);

              const startX = CENTER + (dx / distance) * 95; // center radius
              const startY = CENTER + (dy / distance) * 95;

              const endX = cx - (dx / distance) * NODE_RADIUS; // node radius
              const endY = cy - (dy / distance) * NODE_RADIUS;

              return (
                <g key={i}>
                  {/* DOTTED CONNECTOR (NOT FROM CENTER) */}
                  <line
                    x1={startX}
                    y1={startY}
                    x2={endX}
                    y2={endY}
                    stroke="#9ca3af"
                    strokeWidth="2"
                    strokeDasharray="4 6"
                    strokeLinecap="round"
                    markerEnd="url(#arrow)"
                  />

                  {/* NODE */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={NODE_RADIUS}
                    fill="rgba(255,255,255,0.03)"
                    stroke={node.color}
                    strokeWidth="4"
                  />

                  {/* ICON */}
                  <image
                    href={node.icon}
                    x={cx - ICON_SIZE / 2}
                    y={cy - ICON_SIZE / 2}
                    width={ICON_SIZE}
                    height={ICON_SIZE}
                  />

                  {/* LABEL */}
                  <text
                    x={cx}
                    y={cy + NODE_RADIUS + 24}
                    textAnchor="middle"
                    fontSize="13"
                    fill="#e5e7eb"
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* ================= RIGHT : CONTENT ================= */}
        <div>
          <h2 className="text-4xl font-semibold text-white mb-4">
            Enterprise Digital Platform
          </h2>

          <p className="text-slate-300 leading-relaxed text-justify">
            We design and deliver enterprise-grade Microsoft Power Platform
            solutions that seamlessly integrate Power Apps, Power BI, Power
            Automate, and Power Pages. Our approach focuses on transforming
            business processes through intelligent automation, data-driven
            insights, and scalable application development.
            <br />
            <br />
            By extending these capabilities across Web, Mobile, and AI-driven
            systems, we enable organizations to modernize operations, enhance
            decision-making, and accelerate digital transformation while
            ensuring security, performance, and long-term scalability.
          </p>
        </div>
      </div>
    </section>
  );
}
