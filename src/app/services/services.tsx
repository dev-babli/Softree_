"use client";

import { useEffect } from "react";

interface Service {
  id: string;
  title: string;
  desc: string;
  tags: string[];
  url: string;
  icon: React.ReactNode;
}

const SERVICES: Service[] = [
  {
    id: "01",
    title: "Product & Software Engineering",
    desc: "We design and engineer scalable software products, enterprise platforms, and digital experiences that help businesses innovate faster, improve operational efficiency, and confidently scale for long-term growth.",
    tags: [
      "Web Platforms",
      "Mobile Products",
      "Cloud-Native Apps",
      "DevOps & CI/CD",
      "Low-Code",
    ],
    url: "/product-software-engineering",
    icon: <CpuIcon />,
  },
  {
    id: "02",
    title: "Data & Intelligence Platforms",
    desc: "Transform raw and fragmented business data into meaningful insights with modern analytics platforms, real-time dashboards, reporting systems, and scalable intelligence solutions that support smarter decision-making.",
    tags: [
      "Data Engineering",
      "Analytics Pipelines",
      "Business Intelligence",
      "Reporting",
    ],
    url: "/data-intelligence-platforms",
    icon: <ChartIcon />,
  },
  {
    id: "03",
    title: "Applied AI & Machine Learning",
    desc: "Build intelligent AI-powered systems that automate workflows, improve customer experiences, generate insights, and unlock innovative capabilities using practical and business-focused machine learning solutions.",
    tags: [
      "Generative AI",
      "Predictive Models",
      "Computer Vision",
      "Conversational AI",
    ],
    url: "/applied-ai-ml",
    icon: <BrainIcon />,
  },
  {
    id: "04",
    title: "Security & Risk Engineering",
    desc: "Strengthen digital products and infrastructure with proactive security engineering, risk assessments, compliance strategies, and secure development practices built into every stage of delivery.",
    tags: [
      "Secure DevOps",
      "Application Security",
      "Infrastructure Security",
      "Cloud Risk",
    ],
    url: "/security-risk-engineering",
    icon: <ShieldIcon />,
  },
  {
    id: "05",
    title: "Experience & Interface Design",
    desc: "Create intuitive and visually engaging user experiences through strategic UX research, modern interface systems, usability optimization, and customer-centered digital design practices.",
    tags: [
      "User Research",
      "UX Strategy",
      "UI Design Systems",
      "Conversion Optimization",
    ],
    url: "/experience-interface-design",
    icon: <LayoutIcon />,
  },
  {
    id: "06",
    title: "Quality Engineering & Testing",
    desc: "Deliver reliable and high-performing digital solutions through automated testing, quality assurance frameworks, performance validation, and continuous monitoring across platforms and environments.",
    tags: [
      "Functional Testing",
      "Test Automation",
      "Security Validation",
      "Performance Testing",
    ],
    url: "/quality-engineering-testing",
    icon: <ChecklistIcon />,
  },
];

const PATTERNS = [
  "repeating-linear-gradient(45deg, rgba(249,115,22,.04) 0, rgba(249,115,22,.04) 1px, transparent 1px, transparent 14px)",
  "repeating-linear-gradient(135deg, rgba(249,115,22,.04) 0, rgba(249,115,22,.04) 1px, transparent 1px, transparent 14px)",
  "repeating-linear-gradient(0deg, rgba(249,115,22,.04) 0, rgba(249,115,22,.04) 1px, transparent 1px, transparent 14px)",
  "repeating-linear-gradient(90deg, rgba(249,115,22,.04) 0, rgba(249,115,22,.04) 1px, transparent 1px, transparent 14px)",
  "repeating-linear-gradient(45deg, rgba(249,115,22,.04) 0, rgba(249,115,22,.04) 1px, transparent 1px, transparent 20px), repeating-linear-gradient(135deg, rgba(249,115,22,.03) 0, rgba(249,115,22,.03) 1px, transparent 1px, transparent 20px)",
  "repeating-linear-gradient(60deg, rgba(249,115,22,.04) 0, rgba(249,115,22,.04) 1px, transparent 1px, transparent 14px)",
];

export default function ServicesSection() {
  useEffect(() => {
    const styleId = "sf-keyframes";
    if (document.getElementById(styleId)) return;
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400&family=DM+Sans:wght@300;400;500&display=swap');
      @keyframes sfUp {
        from { opacity: 0; transform: translateY(12px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      .sf-scene { perspective: 1000px; cursor: pointer; }
      .sf-inner {
        position: relative; width: 100%; height: 100%;
        transform-style: preserve-3d;
        transition: transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
      }
      .sf-scene:hover .sf-inner { transform: rotateY(180deg); }
      .sf-face {
        position: absolute; inset: 0; border-radius: 16px;
        backface-visibility: hidden; -webkit-backface-visibility: hidden;
        overflow: hidden;
      }
      .sf-learn-btn { transition: gap 0.2s; }
      .sf-learn-btn:hover { gap: 10px !important; }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <section
      style={{
        fontFamily: "'DM Sans', sans-serif",
        background: "#09090f",
        padding: "56px 40px 60px",
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
            "linear-gradient(rgba(255,255,255,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.018) 1px,transparent 1px)",
          backgroundSize: "52px 52px",
          pointerEvents: "none",
        }}
      />

      {/* Glow top-left */}
      <div
        style={{
          position: "absolute",
          top: "-160px",
          left: "-80px",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(249,115,22,.08) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />
      {/* Glow bottom-right */}
      <div
        style={{
          position: "absolute",
          bottom: "-100px",
          right: "-60px",
          width: "420px",
          height: "420px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(249,115,22,.05) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "80rem",
          margin: "0 auto",
          width: "100%",
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "16px",
          }}
        >
          <div
            style={{
              width: "26px",
              height: "1px",
              background: "#f97316",
              opacity: 0.7,
            }}
          />
          <span
            style={{
              fontSize: "10.5px",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#f97316",
            }}
          >
            empower · deliver · excel
          </span>
        </div>

        {/* Heading */}
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(28px, 4vw, 46px)",
            fontWeight: 900,
            color: "#f0f0f4",
            lineHeight: 1.1,
            margin: "0 0 12px",
          }}
        >
          What we{" "}
          <em
            style={{ fontStyle: "italic", fontWeight: 400, color: "#888899" }}
          >
            build
          </em>
        </h2>

        {/* Subtext */}
        <p
          style={{
            fontSize: "14px",
            fontWeight: 300,
            color: "#555566",
            lineHeight: 1.7,
            maxWidth: "480px",
            margin: "0 0 56px",
          }}
        >
          End-to-end capabilities designed to help startups and growing
          businesses move faster and scale with confidence.
        </p>

        {/* 3-column flip card grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px",
          }}
        >
          {SERVICES.map((service, idx) => (
            <FlipCard
              key={service.id}
              service={service}
              pattern={PATTERNS[idx % PATTERNS.length]}
              delay={0.1 + idx * 0.07}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Flip card ─────────────────────────────────────────────────────────────────

function FlipCard({
  service,
  pattern,
  delay,
}: {
  service: Service;
  pattern: string;
  delay: number;
}) {
  return (
    <div
      className="sf-scene"
      style={{ height: "285px", animation: `sfUp 0.5s ${delay}s both` }}
    >
      <div className="sf-inner">
        {/* ── Front face ── */}
        <div
          className="sf-face"
          style={{
            border: "0.5px solid rgba(255,255,255,.08)",
            background: "rgba(255,255,255,.022)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
            padding: "32px 24px",
            textAlign: "center",
          }}
        >
          {/* Icon ring */}
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              border: "0.5px solid rgba(249,115,22,.3)",
              background: "rgba(249,115,22,.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#f97316",
              flexShrink: 0,
            }}
          >
            {service.icon}
          </div>

          <div>
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "17px",
                fontWeight: 700,
                color: "#c8c8d8",
                lineHeight: 1.25,
              }}
            >
              {service.title}
            </div>
            <div
              style={{
                fontSize: "11px",
                color: "#333344",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginTop: "10px",
              }}
            >
              Hover to explore
            </div>
          </div>
        </div>

        {/* ── Back face ── */}
        <div
          className="sf-face"
          style={{
            transform: "rotateY(180deg)",
            background: "#111118",
            border: "0.5px solid rgba(249,115,22,.25)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            padding: "28px 26px",
          }}
        >
          {/* Pattern overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: pattern,
              pointerEvents: "none",
            }}
          />

          <div style={{ position: "relative", zIndex: 1 }}>
            {/* Back header: icon + id + title */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "14px",
                marginBottom: "14px",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  border: "0.5px solid rgba(249,115,22,.25)",
                  background: "rgba(249,115,22,.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#f97316",
                  flexShrink: 0,
                }}
              >
                {service.icon}
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "#f97316",
                    letterSpacing: "0.06em",
                  }}
                >
                  {service.id}
                </div>
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "15px",
                    fontWeight: 700,
                    color: "#f0f0f4",
                    lineHeight: 1.25,
                    marginTop: "2px",
                  }}
                >
                  {service.title}
                </div>
              </div>
            </div>

            {/* Description */}
            <p
              style={{
                fontSize: "12px",
                fontWeight: 300,
                color: "#666677",
                lineHeight: 1.7,
                marginBottom: "14px",
              }}
            >
              {service.desc}
            </p>

            {/* Tags */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "6px",
                marginBottom: "18px",
              }}
            >
              {service.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: "10.5px",
                    color: "#555566",
                    padding: "3px 10px",
                    borderRadius: "20px",
                    border: "0.5px solid rgba(255,255,255,.09)",
                    background: "rgba(255,255,255,.03)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Icons ─────────────────────────────────────────────────────────────────────

function CpuIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 3v18h18" />
      <circle cx="7" cy="14" r="1" fill="currentColor" />
      <circle cx="11" cy="9" r="1" fill="currentColor" />
      <circle cx="15" cy="11" r="1" fill="currentColor" />
      <circle cx="19" cy="6" r="1" fill="currentColor" />
      <path d="M7 14 11 9l4 2 4-5" />
    </svg>
  );
}

function BrainIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.14Z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.14Z" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function LayoutIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 21V9" />
    </svg>
  );
}

function ChecklistIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
      <rect x="9" y="3" width="6" height="4" rx="1" />
      <path d="m9 12 2 2 4-4M9 17h4" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}
