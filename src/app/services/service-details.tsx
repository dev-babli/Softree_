"use client";

import { useState, useEffect } from "react";

interface Service {
  id: string;
  slug: string;
  index: string;
  title: string;
  accent: string;
  accentRgb: string;
  tag: string;
  description: string;
  strategies: string[];
  url: string;
}

const SERVICES: Service[] = [
  {
    id: "service-1",
    slug: "sharepoint-development",
    index: "01",
    title: "SharePoint\nDevelopment",
    accent: "#0ea5e9",
    accentRgb: "14,165,233",
    tag: "Microsoft 365",
    description:
      "We design and build enterprise-grade SharePoint solutions that improve collaboration, document management, and intranet experiences across Microsoft 365.",
    strategies: [
      "SharePoint Online Architecture",
      "Intranet & Portal Development",
      "Custom Lists & Libraries",
      "Permission & Security Setup",
      "Content Migration",
      "Performance Optimization",
    ],
    url: "/services/sharepoint",
  },
  {
    id: "service-2",
    slug: "spfx-development",
    index: "02",
    title: "SPFx\nDevelopment",
    accent: "#6366f1",
    accentRgb: "99,102,241",
    tag: "React · TypeScript",
    description:
      "We create modern SharePoint Framework web parts and extensions to deliver rich, scalable user experiences tightly integrated with Microsoft 365.",
    strategies: [
      "Custom Web Parts",
      "Application Customizers",
      "Extensions & Field Customizers",
      "React & TypeScript",
      "Microsoft Graph Integration",
    ],
    url: "/services/spfx-developments",
  },
  {
    id: "service-3",
    slug: "power-apps",
    index: "03",
    title: "Power\nApps",
    accent: "#a855f7",
    accentRgb: "168,85,247",
    tag: "Power Platform",
    description:
      "We build low-code Power Apps to automate workflows and streamline business processes across Microsoft 365 and beyond.",
    strategies: [
      "Canvas Apps",
      "Model-driven Apps",
      "Dataverse Integration",
      "Custom Connectors",
      "User Experience Optimization",
    ],
    url: "/services/power-apps",
  },
  {
    id: "service-4",
    slug: "power-bi",
    index: "04",
    title: "Power\nBI",
    accent: "#f59e0b",
    accentRgb: "245,158,11",
    tag: "Analytics",
    description:
      "We transform raw data into interactive dashboards and reports that drive informed business decisions in real time.",
    strategies: [
      "Data Modeling",
      "DAX Calculations",
      "Interactive Dashboards",
      "Real-time Reporting",
      "Power BI Service Deployment",
    ],
    url: "/services/power-bi",
  },
  {
    id: "service-5",
    slug: "web-development",
    index: "05",
    title: "Web\nDevelopment",
    accent: "#10b981",
    accentRgb: "16,185,129",
    tag: "Next.js · React",
    description:
      "We develop modern, scalable web applications using cutting-edge frontend and backend technologies, built for performance and longevity.",
    strategies: [
      "React / Next.js Applications",
      "API Development",
      "Cloud-ready Architecture",
      "Performance Optimization",
      "Security Best Practices",
    ],
    url: "/services/web-app-development",
  },
  {
    id: "service-6",
    slug: "mobile-app-development",
    index: "06",
    title: "Mobile App\nDevelopment",
    accent: "#ec4899",
    accentRgb: "236,72,153",
    tag: "React Native",
    description:
      "We build secure, high-performance mobile applications for iOS and Android using React Native and Expo.",
    strategies: [
      "iOS & Android Apps",
      "Cross-platform Development",
      "Backend Integration",
      "App Store Deployment",
      "Maintenance & Support",
    ],
    url: "/services/mobile-app-development",
  },
  {
    id: "service-7",
    slug: "ai-solutions",
    index: "07",
    title: "AI\nSolutions",
    accent: "#06b6d4",
    accentRgb: "6,182,212",
    tag: "LLMs · Agents · RAG",
    description:
      "We leverage AI to automate processes, extract insights, and enhance decision-making — from LLM integrations to fully autonomous agents.",
    strategies: [
      "AI Strategy & Consulting",
      "Chatbots & Virtual Assistants",
      "Data Analysis & Predictions",
      "AI Integration with Apps",
      "Responsible AI Practices",
      "RAG & Agent Pipelines",
    ],
    url: "/services/agentic-ai",
  },
];

interface ServiceCardProps {
  service: Service;
  isOpen: boolean;
  onToggle: () => void;
  animationDelay: number;
}

function ServiceCard({ service, isOpen, onToggle, animationDelay }: ServiceCardProps) {
  return (
    <div
      id={service.id}
      onClick={onToggle}
      style={{
        position: "relative",
        borderRadius: "20px",
        border: isOpen
          ? "0.5px solid rgba(255,255,255,0.18)"
          : "0.5px solid rgba(255,255,255,0.08)",
        background: isOpen
          ? "rgba(255,255,255,0.035)"
          : "rgba(255,255,255,0.022)",
        overflow: "hidden",
        marginBottom: "14px",
        cursor: "pointer",
        transition: "border-color .25s, background .25s",
        animation: `sdFadeUp 0.45s ${animationDelay}ms both`,
      }}
    >
      {/* Accent bar */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "4px",
          height: "100%",
          borderRadius: "4px 0 0 4px",
          background: service.accent,
          opacity: 0.7,
          transition: "opacity .3s",
        }}
      />

      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          padding: "24px 28px",
          userSelect: "none",
        }}
      >
        <span
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "13px",
            fontWeight: 700,
            color: isOpen ? "#888899" : "#333344",
            minWidth: "28px",
            transition: "color .25s",
          }}
        >
          {service.index}
        </span>

        <div style={{ flex: 1 }}>
          <div
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(20px, 2.8vw, 28px)",
              fontWeight: 700,
              color: isOpen ? "#f0f0f4" : "#c8c8d8",
              lineHeight: 1.15,
              whiteSpace: "pre-line",
              transition: "color .25s",
            }}
          >
            {service.title}
          </div>
          <span
            style={{
              fontSize: "10px",
              fontWeight: 500,
              letterSpacing: "0.06em",
              padding: "3px 9px",
              borderRadius: "20px",
              marginTop: "6px",
              display: "inline-block",
              border: isOpen
                ? "0.5px solid rgba(255,255,255,0.18)"
                : "0.5px solid rgba(255,255,255,0.1)",
              color: isOpen ? "#888899" : "#555566",
              transition: "all .25s",
            }}
          >
            {service.tag}
          </span>
        </div>

        <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            border: isOpen
              ? "0.5px solid rgba(255,255,255,0.2)"
              : "0.5px solid rgba(255,255,255,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "background .25s, border-color .25s, transform .3s",
            color: isOpen ? "#888" : "#444455",
            fontSize: "14px",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <ChevronIcon />
        </div>
      </div>

      {/* Body */}
      {isOpen && (
        <div
          style={{
            padding: "0 28px 28px",
            borderTop: "0.5px solid rgba(255,255,255,0.07)",
            animation: "sdReveal 0.3s ease",
          }}
        >
          <p
            style={{
              fontSize: "14px",
              lineHeight: 1.75,
              color: "#888899",
              fontWeight: 300,
              padding: "20px 0 22px",
              maxWidth: "680px",
            }}
          >
            {service.description}
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 0,
            }}
          >
            {service.strategies.map((strategy, i) => {
              const isLastRow =
                i >= service.strategies.length - (service.strategies.length % 2 === 0 ? 2 : 1);
              return (
                <div
                  key={strategy}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                    padding: "13px 0",
                    borderBottom: isLastRow
                      ? "none"
                      : "0.5px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      background: `rgba(${service.accentRgb},0.12)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginTop: "1px",
                    }}
                  >
                    <CheckIcon color={service.accent} />
                  </div>
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: 400,
                      color: "#aaaabc",
                      lineHeight: 1.4,
                    }}
                  >
                    {strategy}
                  </span>
                </div>
              );
            })}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: "22px",
              marginTop: "6px",
              borderTop: "0.5px solid rgba(255,255,255,0.07)",
            }}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                window.location.href = service.url;
              }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "7px",
                fontSize: "12.5px",
                fontWeight: 500,
                color: service.accent,
                textDecoration: "none",
                border: "none",
                background: "none",
                cursor: "pointer",
                padding: 0,
                transition: "gap .2s",
                fontFamily: "'DM Sans', sans-serif",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.gap = "11px";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.gap = "7px";
              }}
            >
              Learn more <ArrowRightIcon />
            </button>
            <span
              style={{
                fontSize: "11px",
                color: "#33334a",
                fontWeight: 300,
              }}
            >
              {service.strategies.length} capabilities
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Icon components ──────────────────────────────────────────────────────────

function ChevronIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function CheckIcon({ color }: { color: string }) {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function ServicesDetails() {
  const [openId, setOpenId] = useState<string>("service-7");

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? "" : id));
  };

  // Inject keyframe animations once
  useEffect(() => {
    const styleId = "sd-keyframes";
    if (document.getElementById(styleId)) return;
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');
      @keyframes sdReveal {
        from { opacity: 0; transform: translateY(-6px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes sdFadeUp {
        from { opacity: 0; transform: translateY(10px); }
        to   { opacity: 1; transform: translateY(0); }
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <div
      style={{
        fontFamily: "'DM Sans', sans-serif",
        background: "#09090f",
        padding: "48px 32px 64px",
        borderRadius: "16px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
          pointerEvents: "none",
        }}
      />

      {/* Glow top-left */}
      <div
        style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          pointerEvents: "none",
          top: "-150px",
          left: "-100px",
          background: "radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 65%)",
        }}
      />

      {/* Glow bottom-right */}
      <div
        style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          pointerEvents: "none",
          bottom: "-100px",
          right: "-80px",
          background: "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 65%)",
        }}
      />

      {/* Section label */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "48px",
        }}
      >
        <div
          style={{
            width: "26px",
            height: "1px",
            background: "#06b6d4",
            opacity: 0.7,
          }}
        />
        <span
          style={{
            fontSize: "10.5px",
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#06b6d4",
          }}
        >
          What we build
        </span>
      </div>

      {/* Cards */}
      <div>
        {SERVICES.map((service, idx) => (
          <ServiceCard
            key={service.id}
            service={service}
            isOpen={openId === service.id}
            onToggle={() => handleToggle(service.id)}
            animationDelay={idx * 60}
          />
        ))}
      </div>
    </div>
  );
}