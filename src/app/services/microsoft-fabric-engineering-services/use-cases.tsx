"use client";
import { useState } from "react";

const useCases = [
  {
    label: "Enterprise Data Platform\nwith Microsoft Fabric Lakehouse",
    sources: ["SAP ERP", "Oracle Database"],
    hub: { icon: "🗄️", label: "Data Lakehouse" },
    outputs: [
      "Operational Reports",
      "Data Governance Layer",
      "Master Data Hub",
      "Executive Summary",
      "Compliance Reports",
    ],
    points: [
      "Built a centralized data lakehouse consolidating enterprise-wide data from SAP and Oracle into a single governed platform.",
      "Enabled self-service data access for business units, reducing IT dependency for routine reporting by 60%.",
      "Implemented automated data quality checks and lineage tracking to ensure regulatory compliance across all data assets.",
      "Real-time monitoring dashboards give operations teams instant visibility into KPIs without manual data extraction.",
    ],
  },
  {
    label: "Medallion Architecture\non Microsoft Fabric",
    sources: ["Snowflake", "Azure Data Lake"],
    hub: { icon: "⚙️", label: "Medallion Pipeline" },
    outputs: [
      "Bronze Layer",
      "Silver Layer",
      "Gold Layer",
      "Analytics Mart",
      "BI Reports",
    ],
    points: [
      "Designed and deployed a Bronze → Silver → Gold medallion architecture on Microsoft Fabric with Snowflake as the source.",
      "Automated incremental data ingestion pipelines reducing data freshness latency from 24 hours to under 30 minutes.",
      "Gold layer curated datasets power certified Power BI reports consumed by 200+ business users across departments.",
      "Data transformation logic centralized in reusable notebooks, cutting pipeline maintenance effort by 45%.",
    ],
  },
  {
    label: "Unified Data Views\nusing Fabric & Synapse",
    sources: ["Azure SQL DB", "Event Hub"],
    hub: { icon: "🔷", label: "Synapse Analytics" },
    outputs: [
      "Sales View",
      "Inventory View",
      "Customer 360",
      "Forecast Model",
      "KPI Dashboard",
    ],
    points: [
      "Created unified data views in Azure Synapse integrating real-time event streams with historical SQL data.",
      "Customer 360 view aggregates CRM, transactional, and behavioral data enabling personalized marketing campaigns.",
      "Forecasting model built on Synapse ML achieved 92% accuracy in demand prediction for supply chain teams.",
      "All views secured with row-level security ensuring each business unit sees only their authorized data scope.",
    ],
  },
  {
    label: "Real-Time Analytics Solution\nwith Microsoft Fabric",
    sources: ["IoT Sensors", "Salesforce CRM"],
    hub: { icon: "📡", label: "Real-Time Analytics" },
    outputs: [
      "IoT Alerts",
      "Sales Dashboard",
      "Ops Monitor",
      "Anomaly Detection",
      "Field Reports",
    ],
    points: [
      "Deployed a real-time IoT data pipeline ingesting sensor telemetry from 5,000+ devices into Microsoft Fabric.",
      "Anomaly detection models flag equipment failures 4–6 hours before occurrence, reducing unplanned downtime by 38%.",
      "Sales and operations dashboards unified in a single Power BI workspace, eliminating siloed reporting across teams.",
      "Automated alerting system notifies field engineers via Teams when IoT thresholds are breached.",
    ],
  },
  {
    label: "Financial Analytics &\nFabric-Powered Dashboards",
    sources: [
      "Dynamics 365 Finance\nand Operations",
      "Hyperion Financial\nManagement",
    ],
    hub: { icon: "📊", label: "Dashboards" },
    outputs: [
      "Accountant Overview",
      "Assistant Dashboard",
      "Branch Leader Dashboard",
      "Business Line Leader\nDashboard",
      "Financial Overview",
    ],
    points: [
      "Built Fabric-powered financial analytics dashboards for Finance, Accounts Payable, and Accounts Receivable with unified data visibility.",
      "Designed a configurable reporting layer on top of Microsoft Fabric, enabling dynamic chart of accounts and financial report structures directly from the application.",
      "Empowered finance teams with self-service analytics, allowing them to modify reports without dependency on IT or data engineering teams.",
      "Seamlessly integrated Fabric dashboards within Dynamics 365 Finance & Operations to deliver a unified and real-time financial experience.",
    ],
  },
];
export default function UseCasesSection() {
  const [active, setActive] = useState(4);
  const cur = useCases[active];

  return (
    <>
      <style>{`
        .uc-wrap {
          padding: 64px 16px;
          background: transparent;
        }
        .uc-grid-bg {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 52px 52px;
          pointer-events: none;
          mask-image: radial-gradient(ellipse 90% 80% at 50% 50%, black, transparent);
          border-radius: 28px;
        }

        .uc-inner {
          max-width: 80rem;
          margin: 0 auto;
          position: relative;
          z-index: 2;
           background: linear-gradient(to right, #000000 0%, #4c1c02 50%, #000000 100%);
          border-radius: 28px;
          padding: 44px 48px 44px;
          box-shadow:
            0 0 0 1px rgba(249,115,22,0.15),
            0 32px 64px rgba(0,0,0,0.55),
            inset 0 1px 0 rgba(255,255,255,0.05);
          overflow: hidden;
        }

        /* Title */
        .uc-title {
          text-align: center;
          font-size: clamp(22px, 2.8vw, 34px);
          font-weight: 700;
          color: #f0f4ff;
          letter-spacing: -0.02em;
          margin-bottom: 32px;
        }

        /* Tabs */
        .uc-tabs {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 8px;
          margin-bottom: 32px;
        }
        @media (max-width: 900px) {
          .uc-tabs { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .uc-tabs { grid-template-columns: 1fr; }
        }

        .uc-tab {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 12px;
          padding: 14px 14px;
          text-align: center;
          font-size: 12.5px;
          font-weight: 600;
          color: rgba(200,215,255,0.55);
          cursor: pointer;
          transition: all 0.18s ease;
          line-height: 1.4;
          white-space: pre-line;
        }
        .uc-tab:hover {
          border-color: rgba(165,180,252,0.25);
          color: rgba(200,215,255,0.85);
          background: rgba(255,255,255,0.07);
        }
        .uc-tab.on {
          background: linear-gradient(135deg, #ea580c, #d97706);
          border-color: rgba(249,115,22,0.5);
          color: #fff;
          box-shadow: 0 4px 18px rgba(234,88,12,0.45);
        }

        /* Scrollbar for tabs on small screens */
        .uc-tab-scroll {
          overflow-x: auto;
          padding-bottom: 4px;
        }

        /* Content area */
        .uc-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          align-items: start;
        }
        @media (max-width: 768px) {
          .uc-content { grid-template-columns: 1fr; }
        }

        /* Diagram panel */
        .uc-diagram {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 18px;
          padding: 28px 24px;
          min-height: 340px;
        }

        .uc-diagram-inner {
          display: flex;
          align-items: flex-start;
          gap: 0;
          height: 100%;
        }

        /* Sources column */
        .uc-sources-col {
          display: flex;
          flex-direction: column;
          gap: 12px;
          min-width: 148px;
        }

        .uc-sources-label {
          background: linear-gradient(135deg, #d97706, #b45309);
          color: #fff;
          font-size: 12px;
          font-weight: 700;
          padding: 8px 14px;
          border-radius: 8px;
          text-align: center;
          margin-bottom: 8px;
        }

        .uc-source-box {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(165,180,252,0.25);
          border-radius: 8px;
          padding: 8px 10px;
          font-size: 11.5px;
          font-weight: 600;
          color: rgba(200,215,255,0.8);
          text-align: center;
          line-height: 1.35;
          white-space: pre-line;
        }

        /* Connector lines */
        .uc-connector {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 0 6px;
          padding-top: 52px;
          gap: 0;
          flex-shrink: 0;
        }

        .uc-line-h {
          width: 28px;
          height: 1.5px;
          background: linear-gradient(90deg, rgba(74,222,128,0.6), rgba(34,211,238,0.6));
        }

        /* Hub */
        .uc-hub-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex-shrink: 0;
          padding-top: 44px;
        }

        .uc-hub-box {
          background: linear-gradient(135deg, #ea580c, #f97316);
          border-radius: 10px;
          padding: 10px 18px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          font-weight: 700;
          color: #fff;
          white-space: nowrap;
          box-shadow: 0 4px 16px rgba(234,88,12,0.45);
        }
        .uc-hub-icon { font-size: 18px; }

        /* Arrow down from hub */
        .uc-arrow-down {
          width: 1.5px;
          height: 20px;
          background: rgba(249,115,22,0.5);
          margin: 0 auto;
        }
        .uc-arrow-tip {
          width: 0; height: 0;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-top: 7px solid rgba(249,115,22,0.6);
          margin: 0 auto;
        }

        /* Outputs column */
        .uc-outputs-col {
          display: flex;
          flex-direction: column;
          gap: 8px;
          flex: 1;
          padding-top: 0;
        }

        .uc-out-connector {
          display: flex;
          align-items: center;
          gap: 0;
          flex-shrink: 0;
          padding-top: 72px;
          flex-direction: column;
          justify-content: flex-start;
        }

        .uc-out-line {
          width: 20px;
          height: 1.5px;
          background: rgba(34,211,238,0.45);
        }

        .uc-output-box {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(249,115,22,0.25);
          border-radius: 8px;
          padding: 7px 12px;
          font-size: 11.5px;
          font-weight: 600;
          color: rgba(254,215,170,0.85);
          text-align: center;
          white-space: pre-line;
          transition: background 0.15s;
        }
        .uc-output-box:hover {
          background: rgba(249,115,22,0.15);
        }

        /* Right panel - bullets */
        .uc-bullets {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 18px;
          padding: 28px 26px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .uc-bullet-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 13.5px;
          color: rgba(210,220,255,0.75);
          line-height: 1.65;
        }
        .uc-bullet-plus {
          flex-shrink: 0;
          font-size: 15px;
          font-weight: 700;
          color: #f97316;
          margin-top: 1px;
        }

        /* Full diagram layout */
        .uc-diag-layout {
          display: flex;
          align-items: flex-start;
          gap: 4px;
          width: 100%;
        }
        .uc-mid-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex-shrink: 0;
        }
        .uc-branch-lines {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-end;
          flex-shrink: 0;
          padding-top: 52px;
          gap: 0;
        }
        .uc-v-line {
          width: 1.5px;
          background: rgba(74,222,128,0.45);
        }
        .uc-h-branch {
          display: flex;
          align-items: center;
        }
      `}</style>

      <div className="uc-wrap">
        <div className="uc-inner">
          <div className="uc-grid-bg" />

          <h2 className="uc-title">
            <span className="text-orange-500">Microsoft Fabric</span> Use Cases
          </h2>

          {/* Tabs */}
          <div className="uc-tabs">
            {useCases.map((uc, i) => (
              <button
                key={i}
                className={`uc-tab${active === i ? " on" : ""}`}
                onClick={() => setActive(i)}
              >
                {uc.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="uc-content">
            {/* LEFT: Diagram */}
            <div className="uc-diagram">
              <div className="uc-diag-layout">
                {/* Sources */}
                <div className="uc-sources-col">
                  <div className="uc-sources-label">Data Sources</div>
                  {cur.sources.map((s, i) => (
                    <div key={i} className="uc-source-box">
                      {s}
                    </div>
                  ))}
                </div>

                {/* Branch connector from sources to hub */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    paddingTop: "52px",
                    flexShrink: 0,
                  }}
                >
                  {/* Vertical spine */}
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div
                      style={{
                        width: "1.5px",
                        height: `${cur.sources.length * 44}px`,
                        background: "rgba(74,222,128,0.45)",
                        marginRight: 0,
                      }}
                    />
                    {cur.sources.map((_, i) => (
                      <div key={i} style={{ position: "absolute" }} />
                    ))}
                  </div>
                </div>

                {/* Horizontal lines from spine to hub */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                    paddingTop: "52px",
                    flexShrink: 0,
                  }}
                >
                  {cur.sources.map((_, i) => (
                    <div
                      key={i}
                      style={{
                        width: "28px",
                        height: "1.5px",
                        background: "rgba(74,222,128,0.5)",
                      }}
                    />
                  ))}
                </div>

                {/* Hub + down arrow + outputs */}
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 0,
                  }}
                >
                  {/* Hub box */}
                  <div className="uc-hub-box" style={{ marginBottom: "8px" }}>
                    <span className="uc-hub-icon">{cur.hub.icon}</span>
                    {cur.hub.label}
                  </div>

                  {/* Arrow down */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      paddingLeft: "40px",
                      marginBottom: "8px",
                    }}
                  >
                    <div className="uc-arrow-down" />
                    <div className="uc-arrow-tip" />
                  </div>

                  {/* Output boxes */}
                  <div style={{ display: "flex", gap: "6px" }}>
                    {/* Vertical spine for outputs */}
                    <div
                      style={{
                        width: "1.5px",
                        background: "rgba(34,211,238,0.4)",
                        marginRight: "2px",
                        borderRadius: "2px",
                      }}
                    />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                        flex: 1,
                      }}
                    >
                      {cur.outputs.map((o, i) => (
                        <div
                          key={i}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                        >
                          <div
                            style={{
                              width: "12px",
                              height: "1.5px",
                              background: "rgba(34,211,238,0.4)",
                              flexShrink: 0,
                            }}
                          />
                          <div className="uc-output-box" style={{ flex: 1 }}>
                            {o}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: Bullets */}
            <div className="uc-bullets">
              {cur.points.map((p, i) => (
                <div key={i} className="uc-bullet-item">
                  <span className="uc-bullet-plus">+</span>
                  <span>{p}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
