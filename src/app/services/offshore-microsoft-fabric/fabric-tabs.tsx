"use client";
import { useState, useEffect } from "react";

const data = [
  {
    title: "Data Engineering",
    desc: "Build reliable, scalable data pipelines in Microsoft Fabric to ensure seamless data flow from source to insight.",
    image: "https://dynatechconsultancy.com/hubfs/data-bricks.jpg",
    accent: "#4ade80",
  },
  {
    title: "Data Science",
    desc: "Unlock the power of AI with machine learning, predictive analytics, and intelligent models that drive smarter decisions.",
    image: "https://dynatechconsultancy.com/hubfs/dataops.jpg",
    accent: "#86efac",
  },
  {
    title: "Master Data Management",
    desc: "Create a unified, trusted data foundation with consistent, accurate, and governed data across your organization.",
    image: "https://dynatechconsultancy.com/hubfs/data-management.jpg",
    accent: "#4ade80",
  },
  {
    title: "Data Integration",
    desc: "Connect and unify data from multiple sources using modern integration tools for real-time and batch processing.",
    image: "https://dynatechconsultancy.com/hubfs/data-integration.jpg",
    accent: "#86efac",
  },
  {
    title: "Business Intelligence",
    desc: "Transform data into actionable insights with interactive dashboards and advanced analytics for faster decision-making.",
    image: "https://dynatechconsultancy.com/hubfs/data-intelligence.jpg",
    accent: "#4ade80",
  },
  {
    title: "Copilot in Fabric",
    desc: "Leverage AI-powered Copilot to automate workflows, generate insights, and accelerate data-driven productivity.",
    image: "https://dynatechconsultancy.com/hubfs/sales-copilot.jpg",
    accent: "#86efac",
  },
  {
    title: "Data Warehouse",
    desc: "Design high-performance, scalable data warehouses optimized for enterprise analytics and seamless Fabric integration.",
    image: "https://dynatechconsultancy.com/hubfs/synapse-analytics.jpg",
    accent: "#4ade80",
  },
];

export default function FabricHeroTabs() {
  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);

  const go = (i:any) => {
    if (i === active) return;
    setFading(true);
    setTimeout(() => { setActive(i); setFading(false); }, 200);
  };

  const cur = data[active];

  return (
    <>
      <style>{`
        .st-wrap {
          padding: 64px 16px;
          background: transparent;
        }
        .st-card {
          max-width: 80rem;
          margin: 0 auto;
          background: linear-gradient(to right, #000000 0%, #4c1c02 50%, #000000 100%);
          border-radius: 28px;
          padding: 44px 48px 36px;
          position: relative;
          overflow: hidden;
          box-shadow:
            0 0 0 1px rgba(249,115,22,0.15),
            0 32px 64px rgba(0,0,0,0.55),
            inset 0 1px 0 rgba(255,255,255,0.04);
        }
        .st-blob {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }
        .st-blob1 {
          top: -80px; right: -80px;
          width: 320px; height: 320px;
          background: radial-gradient(circle, rgba(249,115,22,0.18) 0%, transparent 70%);
        }
        .st-blob2 {
          bottom: -80px; left: -40px;
          width: 280px; height: 280px;
          background: radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 70%);
        }
        .st-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 52px 52px;
          pointer-events: none;
          mask-image: radial-gradient(ellipse 90% 90% at 50% 50%, black, transparent);
        }

        .st-header {
          text-align: center;
          position: relative;
          z-index: 2;
          margin-bottom: 24px;
        }
        .st-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(249,115,22,0.12);
          border: 1px solid rgba(249,115,22,0.25);
          border-radius: 100px;
          padding: 4px 14px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #fdba74;
          margin-bottom: 14px;
        }
        .st-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #f97316;
          box-shadow: 0 0 6px #f97316;
          animation: blink 2.2s ease-in-out infinite;
        }
        @keyframes blink {
          0%,100% { opacity:1; } 50% { opacity:0.3; }
        }
        .st-title {
          font-size: clamp(20px, 2.6vw, 32px);
          font-weight: 700;
          color: #f0fdf4;
          line-height: 1.2;
          letter-spacing: -0.02em;
          margin-bottom: 10px;
        }
        .st-title em {
          font-style: normal;
          background: linear-gradient(90deg, #fdba74, #f97316);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .st-sub {
          color: rgba(254,215,170,0.5);
          font-size: 13.5px;
          max-width: 480px;
          margin: 0 auto;
          line-height: 1.65;
        }

        .st-tabs {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 6px;
          margin-bottom: 28px;
          position: relative;
          z-index: 2;
        }
        .st-tab {
          background: none;
          border: 1px solid rgba(255,255,255,0.08);
          color: rgba(254,215,170,0.45);
          font-size: 12.5px;
          font-weight: 500;
          padding: 6px 15px;
          border-radius: 100px;
          cursor: pointer;
          transition: all 0.18s ease;
        }
        .st-tab:hover {
          border-color: rgba(253,186,116,0.3);
          color: rgba(254,215,170,0.85);
        }
        .st-tab.on {
          background: rgba(255,255,255,0.95);
          border-color: transparent;
          color: #0a1240;
          font-weight: 700;
          box-shadow: 0 2px 16px rgba(249,115,22,0.4);
        }

        .st-panel {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 36px;
          align-items: center;
          position: relative;
          z-index: 2;
          transition: opacity 0.2s ease, transform 0.2s ease;
        }
        .st-panel.fade {
          opacity: 0;
          transform: translateY(8px);
        }
        @media (max-width: 767px) {
          .st-panel { grid-template-columns: 1fr; }
          .st-card { padding: 32px 20px 28px; }
          .st-desktop { display: none; }
          .st-mobile-acc { display: block !important; }
        }
        .st-mobile-acc { display: none; }

        .st-service-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #fdba74;
          margin-bottom: 10px;
        }
        .st-service-line {
          display: inline-block;
          width: 20px; height: 1.5px;
          background: #fdba74;
          border-radius: 2px;
        }
        .st-panel-title {
          font-size: clamp(18px, 1.8vw, 24px);
          font-weight: 700;
          color: #f0f4ff;
          letter-spacing: -0.02em;
          margin-bottom: 10px;
          line-height: 1.25;
        }
        .st-panel-desc {
          color: rgba(254,215,170,0.5);
          font-size: 13.5px;
          line-height: 1.7;
          margin-bottom: 20px;
        }
        .st-cta {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: rgba(255,255,255,0.92);
          color: #0a1240;
          font-size: 12.5px;
          font-weight: 700;
          padding: 8px 20px;
          border-radius: 100px;
          border: none;
          cursor: pointer;
          transition: all 0.18s ease;
          box-shadow: 0 4px 16px rgba(249,115,22,0.3);
          letter-spacing: 0.02em;
        }
        .st-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 22px rgba(249,115,22,0.45);
          background: #ffffff;
        }
        .st-arrow { transition: transform 0.18s; }
        .st-cta:hover .st-arrow { transform: translateX(3px); }

        .st-img-wrap { position: relative; }
        .st-img-frame {
          border-radius: 18px;
          overflow: hidden;
          aspect-ratio: 16/9;
          position: relative;
          box-shadow:
            0 0 0 1px rgba(74,222,128,0.1),
            0 16px 40px rgba(0,0,0,0.5);
        }
        .st-img-frame img {
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.45s ease;
        }
        .st-img-frame:hover img { transform: scale(1.05); }
        .st-img-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(74,222,128,0.08) 0%, transparent 55%);
          pointer-events: none;
        }
        .st-img-chip {
          position: absolute;
          bottom: 12px; left: 12px;
          background: rgba(5,20,10,0.8);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(74,222,128,0.15);
          border-radius: 10px;
          padding: 6px 12px;
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11.5px;
          font-weight: 600;
          color: rgba(187,247,208,0.8);
        }
        .st-chip-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #4ade80;
          box-shadow: 0 0 5px #4ade80;
        }

        .st-acc {
          border: 1px solid rgba(74,222,128,0.08);
          border-radius: 14px;
          margin-bottom: 8px;
          background: rgba(74,222,128,0.03);
          overflow: hidden;
        }
        .st-acc summary {
          padding: 13px 18px;
          cursor: pointer;
          font-weight: 600;
          font-size: 13px;
          color: rgba(187,247,208,0.75);
          list-style: none;
        }
        .st-acc p { padding: 0 18px 14px; font-size: 13px; color: rgba(187,247,208,0.45); line-height: 1.65; }
        .st-acc img { width: calc(100% - 36px); margin: 0 18px 14px; border-radius: 12px; }
      `}</style>

      <div className="st-wrap">
        <div className="st-card">
          <div className="st-blob st-blob1" />
          <div className="st-blob st-blob2" />
          <div className="st-grid" />

          <div className="st-header">
            <div className="st-badge">
              <span className="st-dot" />
              Softree · Microsoft Fabric
            </div>
            <h1 className="st-title">
              Comprehensive <span className="text-orange-500">Microsoft Fabric</span> Services
            </h1>
            <p className="st-sub">
              Advanced tools and deep Microsoft expertise — helping your organization manage data and make smarter decisions.
            </p>
          </div>

          <div className="st-tabs">
            {data.map((item, i) => (
              <button
                key={i}
                className={`st-tab${active === i ? " on" : ""}`}
                onClick={() => go(i)}
              >
                {item.title}
              </button>
            ))}
          </div>

          <div className={`st-panel st-desktop${fading ? " fade" : ""}`}>
            <div>
              <div className="st-service-label">
                <span className="st-service-line" />
                Service {String(active + 1).padStart(2, "0")}
              </div>
              <h2 className="st-panel-title">{cur.title}</h2>
              <p className="st-panel-desc">{cur.desc}</p>
              <button className="st-cta">
                Learn More <span className="st-arrow">→</span>
              </button>
            </div>

            <div className="st-img-wrap">
              <div className="st-img-frame">
                <img src={cur.image} alt={cur.title} />
                <div className="st-img-overlay" />
                <div className="st-img-chip">
                  <span className="st-chip-dot" />
                  {cur.title}
                </div>
              </div>
            </div>
          </div>

          <div className="st-mobile-acc">
            {data.map((item, i) => (
              <details key={i} className="st-acc">
                <summary>{item.title}</summary>
                <p>{item.desc}</p>
                <img src={item.image} alt={item.title} />
              </details>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}