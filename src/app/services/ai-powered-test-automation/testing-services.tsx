"use client";

import { useState } from "react";
import Link from "next/link";

const services = [
  {
    id: "web",
    label: "Web",
    title: "Web Automation Testing",
    description:
      "Automate enterprise web applications, SaaS platforms, SharePoint portals, and modern React-based systems using scalable automation frameworks.",
    categoryLabel: "Technologies",
    items: ["Playwright", "Selenium", "Cypress"],
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="service-icon"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    accent: "#F97316",
  },
  {
    id: "api",
    label: "API",
    title: "API Automation Testing",
    description:
      "Ensure stability, security, and performance across APIs, microservices, and backend integrations through automated validation workflows.",
    categoryLabel: "Technologies",
    items: ["Postman", "REST Assured", "Newman"],
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="service-icon"
      >
        <path d="M8 9l3 3-3 3M13 15h3" />
        <rect x="2" y="2" width="20" height="20" rx="4" />
      </svg>
    ),
    accent: "#F97316",
  },
  {
    id: "mobile",
    label: "Mobile",
    title: "Mobile App Automation Testing",
    description:
      "Deliver reliable Android and iOS experiences through automated mobile application testing.",
    categoryLabel: "Technologies",
    items: ["Appium", "Detox"],
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="service-icon"
      >
        <rect x="5" y="2" width="14" height="20" rx="3" />
        <circle cx="12" cy="17" r="1" fill="currentColor" />
      </svg>
    ),
    accent: "#F97316",
  },
  {
    id: "ai",
    label: "AI Regression",
    title: "AI-Driven Regression Testing",
    description:
      "Reduce repetitive QA cycles with intelligent automation strategies and AI-assisted testing capabilities.",
    categoryLabel: "Key Capabilities",
    items: [
      "Self-healing test scripts",
      "Smart test prioritization",
      "Automated defect insights",
      "Faster regression validation",
    ],
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="service-icon"
      >
        <path d="M12 2a5 5 0 015 5v1h1a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2V10a2 2 0 012-2h1V7a5 5 0 015-5z" />
        <circle cx="12" cy="14" r="2" />
        <path d="M12 16v2" />
      </svg>
    ),
    accent: "#F97316",
  },
  {
    id: "cicd",
    label: "CI/CD",
    title: "CI/CD Integrated Testing",
    description:
      "Integrate automated quality assurance directly into your DevOps pipeline for continuous delivery confidence.",
    categoryLabel: "Platforms",
    items: ["Azure DevOps", "GitHub Actions", "Jenkins"],
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="service-icon"
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" />
      </svg>
    ),
    accent: "#F97316",
  },
];

export default function AutomationTestingServices() {
  const [active, setActive] = useState(services[0].id);

  const current = services.find((s) => s.id === active)!;

  return (
    <div className="ats-root">
      <style>{`
        .ats-root {
          box-sizing: border-box;
          background: linear-gradient(to bottom, #fafafa, #ffffff, #fafafa);
          color: #27272a;
          position: relative;
        }

        .ats-root *, .ats-root *::before, .ats-root *::after {
          box-sizing: border-box;
        }

        .wrapper {
          position: relative;
          z-index: 1;
          max-width: 1100px;
          margin: 0 auto;
          padding: 56px 32px 64px;
          width: 100%;
        }

        /* Header */
        .eyebrow {
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #71717a;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .eyebrow::before {
          content: '';
          display: inline-block;
          width: 24px;
          height: 1px;
          background: #d4d4d8;
        }

        h1 {
          font-size: clamp(32px, 5vw, 52px);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -0.03em;
          margin-bottom: 12px;
          color: #18181b;
        }
        h1 span {
          -webkit-text-stroke: 1px #F97316;
          -webkit-text-fill-color: transparent;
        }

        .subtitle {
          font-size: 13px;
          color: #71717a;
          font-weight: 300;
          max-width: 440px;
          line-height: 1.7;
          margin-bottom: 56px;
        }

   /* Tabs */
.tabs {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 40px;
}

.tab {
  background: #fff7ed;
  border: 1px solid #fed7aa;
  color: #c2410c;

  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;

  padding: 10px 18px;
  border-radius: 999px;

  cursor: pointer;
  transition: all 0.2s ease;
}

.tab:hover {
  background: #ffedd5;
  border-color: #fdba74;
  color: #ea580c;
}

.tab.active {
  background: #f97316;
  border-color: #f97316;
  color: #ffffff;
}

/* Panel */
.panel {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;

  background: #fed7aa;
  border: 1px solid #fed7aa;

  border-radius: 24px;
  overflow: hidden;

  animation: fadeSlide 0.3s ease;
}

@keyframes fadeSlide {
  from {
    opacity: 0;
    transform: translateY(8px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.panel-left {
  background: #fffaf5;

  padding: 56px 48px;

  display: flex;
  flex-direction: column;
  gap: 24px;

  position: relative;
  overflow: hidden;
}

.panel-left::before {
  content: '';

  position: absolute;
  top: 0;
  right: 0;

  width: 140px;
  height: 140px;

  background: #ffedd5;

  border-radius: 0 0 0 100%;
}

.panel-right {
  background: #ffffff;
  padding: 56px 48px;
}
        .service-icon {
          width: 32px;
          height: 32px;
          color: var(--accent);
        }

        .service-title {
          font-size: 22px;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: #18181b;
          line-height: 1.2;
        }

        .service-desc {
          font-size: 13px;
          color: #71717a;
          font-weight: 300;
          line-height: 1.8;
          flex: 1;
        }

        .cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--accent);
          cursor: pointer;
          transition: gap 0.2s;
          background: none;
          border: none;
          padding: 0;
        }
        .cta:hover { gap: 14px; }
        .cta-arrow {
          width: 16px;
          height: 1px;
          background: var(--accent);
          position: relative;
        }
        .cta-arrow::after {
          content: '';
          position: absolute;
          right: 0;
          top: -3px;
          width: 7px;
          height: 7px;
          border-top: 1px solid var(--accent);
          border-right: 1px solid var(--accent);
          transform: rotate(45deg);
        }

        .panel-right {
          background: #fafafa;
          padding: 48px 40px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .category-label {
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #a1a1aa;
          margin-bottom: 4px;
        }

        .tech-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px 20px;
          border: 1px solid #e4e4e7;
          border-radius: 3px;
          transition: all 0.2s;
          cursor: default;
        }
        .tech-item:hover {
          border-color: var(--accent);
          background: rgba(249,115,22,0.05);
          transform: translateX(4px);
        }
        .tech-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent);
          flex-shrink: 0;
          box-shadow: 0 0 8px var(--accent);
        }
        .tech-name {
          font-size: 13px;
          font-weight: 400;
          color: #3f3f46;
        }
        .tech-num {
          margin-left: auto;
          font-size: 10px;
          color: #d4d4d8;
        }

        /* Stats row */
.stats {
  display: flex;
  gap: 24px;
  margin-top: 48px;
  padding-top: 32px;

  border-top: 1px solid #fed7aa;

  flex-wrap: wrap;
}

.stat {
  min-width: 140px;

  padding: 20px 22px;

  border: 1px solid #fed7aa;
  border-radius: 18px;

  background: #fffaf5;

  display: flex;
  flex-direction: column;
  gap: 6px;

  transition: all 0.2s ease;
}

.stat:hover {
  background: #fff7ed;
  border-color: #fdba74;
}

.stat-value {
  font-size: 32px;
  font-weight: 800;
  letter-spacing: -0.04em;

  color: #ea580c;

  line-height: 1;
}

.stat-label {
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;

  color: #9a3412;

  line-height: 1.6;
}

        @media (max-width: 680px) {
          .wrapper { padding: 36px 20px 48px; }
          .panel { grid-template-columns: 1fr; }
          .panel-left, .panel-right { padding: 32px 24px; }
          .stats { gap: 20px; flex-wrap: wrap; }
        }
        @media (max-width: 480px) {
          .stat {
            flex: 1 1 100% !important;
            min-width: unset !important;
          }
        }
        @media (min-width: 481px) and (max-width: 680px) {
          .stat {
            flex: 1 1 calc(50% - 10px) !important;
            min-width: unset !important;
          }
        }
      `}</style>

      <div className="wrapper">
        <p className="eyebrow">Quality Engineering</p>
        <h1>
          Automation <span>Testing</span> Services
        </h1>
        <p className="subtitle">
          End-to-end test automation across web, API, mobile, and CI/CD
          pipelines — built for scale.
        </p>

        {/* Tabs */}
        <div className="tabs">
          {services.map((s) => (
            <button
              key={s.id}
              className={`tab${active === s.id ? " active" : ""}`}
              style={{ "--accent": s.accent } as React.CSSProperties}
              onClick={() => setActive(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Panel */}
        <div
          key={current.id}
          className="panel"
          style={{ "--accent": current.accent } as React.CSSProperties}
        >
          <div className="panel-left">
            {current.icon}
            <div className="service-title">{current.title}</div>
            <p className="service-desc">{current.description}</p>
            <Link href="/contact" className="cta" style={{ textDecoration: "none" }}>
              Learn more
              <span className="cta-arrow" />
            </Link>
          </div>

          <div className="panel-right">
            <p className="category-label">{current.categoryLabel}</p>
            {current.items.map((item, i) => (
              <div className="tech-item" key={item}>
                <span className="tech-dot" />
                <span className="tech-name">{item}</span>
                <span className="tech-num">0{i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="stats">
          {[
            { value: "5×", label: "Service Areas" },
            { value: "12+", label: "Technologies" },
            { value: "100%", label: "CI/CD Ready" },
            { value: "AI", label: "Powered QA" },
          ].map((s) => (
            <div className="stat" key={s.label}>
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
