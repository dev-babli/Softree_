"use client";

const leftItems = [
  "Microsoft SQL Server Integration Services",
  "Power BI Desktop, Power Apps",
  "CData Connector",
  "Snowflake, Tableau",
  "Azure Synapse, Azure Spark",
  "Azure Stack (ADF, Blob Storage, Synapse Workspace, DevOps, Logic Apps)",
];

const rightItems = [
  "Dynamics GP, Microsoft Dynamics NAV",
  "SAP, Oracle, NetSuite, Salesforce",
  "Qualtrics",
  "Epicor",
  "D365 Finance and Operations, D365 CRM",
  "Google Analytics, NetForum, Sitecore",
];

export default function ProwessSection() {
  return (
    <>
      <style>{`
        .pw-wrap {
          padding: 64px 16px;
          background: transparent;
        }
        .pw-inner {
          max-width: 80rem;
          margin: 0 auto;
        }

        /* Headings row */
        .pw-heads {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          margin-bottom: 24px;
          padding: 0 4px;
        }
        .pw-head {
          font-size: clamp(20px, 2.2vw, 28px);
          font-weight: 700;
          color: #0f172a;
          letter-spacing: -0.02em;
          line-height: 1.2;
        }

        /* Cards row */
        .pw-cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(15,47,122,0.12), 0 2px 8px rgba(0,0,0,0.06);
        }

        .pw-card {
          background: linear-gradient(to right, #000000 0%, #0f2f7a 50%, #000000 100%);
          padding: 40px 36px;
          position: relative;
          overflow: hidden;
        }

        /* Divider between the two cards */
        .pw-card:first-child {
          border-right: 1px solid rgba(255,255,255,0.08);
        }

        /* Ambient glow */
        .pw-card::before {
          content: '';
          position: absolute;
          top: -60px;
          right: -60px;
          width: 240px;
          height: 240px;
          background: radial-gradient(circle, rgba(99,120,255,0.18) 0%, transparent 70%);
          pointer-events: none;
        }
        .pw-card:last-child::before {
          left: -60px;
          right: auto;
          background: radial-gradient(circle, rgba(56,189,248,0.12) 0%, transparent 70%);
        }

        /* Subtle grid */
        .pw-card::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
          mask-image: radial-gradient(ellipse 100% 100% at 50% 0%, black, transparent);
        }

        .pw-card-content {
          position: relative;
          z-index: 2;
        }

        /* Accent bar */
        .pw-accent-bar {
          width: 36px;
          height: 3px;
          background: linear-gradient(90deg, #a5b4fc, #38bdf8);
          border-radius: 2px;
          margin-bottom: 20px;
        }

        .pw-desc {
          font-size: 15px;
          font-weight: 600;
          color: rgba(255,255,255,0.92);
          line-height: 1.65;
          margin-bottom: 28px;
          letter-spacing: -0.01em;
        }

        /* Collapse dash icon */
        .pw-dash {
          position: absolute;
          top: 40px;
          right: 36px;
          width: 20px;
          height: 2px;
          background: rgba(165,180,252,0.5);
          border-radius: 2px;
        }

        /* List */
        .pw-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .pw-list li {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 13.5px;
          color: rgba(200,215,255,0.7);
          line-height: 1.5;
        }
        .pw-bullet {
          flex-shrink: 0;
          margin-top: 5px;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #818cf8;
          box-shadow: 0 0 6px rgba(129,140,248,0.6);
        }

        @media (max-width: 768px) {
          .pw-heads { grid-template-columns: 1fr; gap: 8px; }
          .pw-cards { grid-template-columns: 1fr; }
          .pw-card:first-child { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.08); }
          .pw-card { padding: 32px 24px; }
        }
      `}</style>

      <div className="pw-wrap">
        <div className="pw-inner">

          {/* Column headings */}
          <div className="pw-heads">
            <div className="pw-head">Softree’s Expertise Across Modern Tools</div>
            <div className="pw-head">Targeted Data Source Apps</div>
          </div>

          {/* Cards */}
          <div className="pw-cards">

            {/* LEFT */}
            <div className="pw-card">
              <div className="pw-dash" />
              <div className="pw-card-content">
                <div className="pw-accent-bar" />
                <p className="pw-desc">
                  Our professionals have deep expertise in using industry-leading tools and technologies to deliver innovative solutions that drive efficiency and boost performance.
                </p>
                <ul className="pw-list">
                  {leftItems.map((item, i) => (
                    <li key={i}>
                      <span className="pw-bullet" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* RIGHT */}
            <div className="pw-card">
              <div className="pw-dash" />
              <div className="pw-card-content">
                <div className="pw-accent-bar" />
                <p className="pw-desc">
                  Softree specializes in integrating and optimizing a wide range of data source apps to ensure smooth connection and data flow across your organization.
                </p>
                <ul className="pw-list">
                  {rightItems.map((item, i) => (
                    <li key={i}>
                      <span className="pw-bullet" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}