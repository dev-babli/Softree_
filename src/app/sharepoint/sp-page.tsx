"use client";

import React, { useState } from "react";

const stages = [
  {
    id: 1,
    label: "Site Creation",
    color: "#207DE9",
    description:
      "Kickstart your SharePoint journey by creating sites and sub-sites for teams, projects, and departments. Establish the foundation for collaboration.",
  },
  {
    id: 2,
    label: "Document Libraries",
    color: "#37ACA4",
    description:
      "Organize content efficiently in document libraries with metadata, versioning, permissions, and structured folders for easy retrieval.",
  },
  {
    id: 3,
    label: "Workflows & Automation",
    color: "#41D48C",
    description:
      "Automate business processes using Power Automate, alerts, approvals, and custom workflows to boost productivity and reduce manual work.",
  },
  {
    id: 4,
    label: "Governance & Reporting",
    color: "#B6E584",
    description:
      "Ensure security and compliance with governance policies, access controls, and reporting dashboards for informed decision-making.",
  },
];

const funnelStages = [
  { y: 50, rx: 150, ry: 35 },
  { y: 140, rx: 130, ry: 30 },
  { y: 230, rx: 110, ry: 25 },
  { y: 320, rx: 90, ry: 20 },
];

const SharePointTimeline = () => {
  const [activeStage, setActiveStage] = useState<number>(1);
  const currentStage = stages.find((s) => s.id === activeStage);

  return (
    <div className="bg-black text-white min-h-screen py-24 px-6 md:px-16 flex flex-col items-center">
      {/* Heading Section */}
      <div className="text-center mb-20 max-w-5xl mx-auto px-4">
        <h1
          className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text 
                 bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 mb-4 drop-shadow-lg"
        >
          SharePoint Implementation Journey
        </h1>
        <p
          className="text-gray-300 text-lg md:text-xl leading-relaxed 
                max-w-xl mx-auto"
        >
          Discover the key stages of a successful SharePoint setup—from{" "}
          <span className="font-semibold text-white">site creation</span> to{" "}
          <span className="font-semibold text-white">
            governance and reporting
          </span>
          . Hover over each stage on the funnel to explore details
          interactively.
        </p>
      </div>

      {/* Timeline Layout */}
      <div
        className="flex flex-col md:flex-row items-start md:items-center gap-12 md:gap-24 w-full max-w-7xl
             bg-gradient-to-b from-black via-gray-900 to-gray-800 p-8 rounded-2xl shadow-lg
             border border-gray-700"
      >
        {/* Funnel Left */}
        <div className="flex-1 relative flex justify-center">
          <svg
            viewBox="0 0 382 420" // increased height to give more space at top
            xmlns="http://www.w3.org/2000/svg"
            className="w-72 md:w-96"
          >
            {funnelStages.map((stage, index) => {
              const topPadding = 20; // extra space at top
              const y = stage.y + topPadding;

              const isActive = activeStage === stages[index].id;
              return (
                <g
                  key={stages[index].id}
                  onMouseEnter={() => setActiveStage(stages[index].id)}
                  className="cursor-pointer transition-all duration-500"
                >
                  {/* Funnel Layer */}
                  <ellipse
                    cx="191"
                    cy={y}
                    rx={stage.rx}
                    ry={stage.ry}
                    fill={stages[index].color}
                    style={{
                      filter: isActive
                        ? "drop-shadow(0px 6px 12px rgba(255,255,255,0.4))"
                        : "",
                      transition: "all 0.5s ease",
                      transform: isActive ? "scale(1.05)" : "scale(1)",
                    }}
                  />

                  {/* Label */}
                  {isActive && (
                    <text
                      x="191"
                      y={y - stage.ry - 12}
                      textAnchor="middle"
                      fill="white"
                      fontSize="13"
                      fontWeight="bold"
                    >
                      {stages[index].label}
                    </text>
                  )}

                  {/* Glow */}
                  {isActive && (
                    <ellipse
                      cx="191"
                      cy={y}
                      rx={stage.rx * 1.1}
                      ry={stage.ry * 1.2}
                      fill="white"
                      opacity={0.08}
                    />
                  )}
                </g>
              );
            })}
          </svg>

          {/* Arrow pointer */}
          <div
            className="absolute w-3 h-3 bg-white rounded-full animate-pulse transition-all duration-500"
            style={{
              left: "50%",
              transform: "translateX(-50%)",
              top: `${funnelStages[activeStage - 1].y - 6}px`,
            }}
          />
        </div>

        {/* Content Right */}
        <div
          className="flex-1 flex flex-col justify-center space-y-6 p-6 md:p-10 rounded-xl
                  bg-gradient-to-b from-gray-900 via-black/80 to-gray-900 shadow-lg
                  border border-gray-700 transition-all duration-500"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white transition-all duration-500">
            {currentStage?.label}
          </h2>
          <p className="text-gray-300 text-lg md:text-xl transition-all duration-500">
            {currentStage?.description}
          </p>

          {/* Progress bar */}
          <div className="h-2 w-full bg-gray-700 rounded-full mt-4">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-blue-500 via-green-400 to-lime-300 transition-all duration-500"
              style={{
                width: `${(activeStage / stages.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SharePointTimeline;
