"use client";

import React from "react";

/* ===================== DATA ===================== */
const steps = [
  { label: "Discovery & Research", angle: -90 },
  { label: "UI / UX Design", angle: -45 },
  { label: "Frontend Development", angle: 0 },
  { label: "Backend Development", angle: 45 },
  { label: "Testing & QA", angle: 90 },
  { label: "Deployment", angle: 135 },
  { label: "Monitoring", angle: 180 },
  { label: "Maintenance & Support", angle: -135 },
];

/* ===================== COMPONENT ===================== */
export default function WebDevelopmentProcess() {
  const center = 300;
  const radius = 250;

  return (
    <section className="relative bg-black py-28 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="max-w-xl text-left">
          {/* ===== EYEBROW ===== */}
          <div className="mb-5 flex items-center gap-3">
            <span className="text-xs tracking-[0.3em] uppercase text-teal-200">
              Our Process
            </span>
          </div>

          {/* ===== HEADING ===== */}
          <h2 className="text-4xl sm:text-5xl xl:text-6xl font-light text-white leading-[1.1]">
            <span className="block text-teal-400">Web development</span>
            <span className="block mt-2">process that delivers</span>
            <span className="block mt-2">results</span>
          </h2>

          {/* ===== BULLET POINTS ===== */}
          <ul className="mt-8 space-y-4 text-slate-400 text-base">
            <li className="flex items-start gap-3">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-teal-400" />
              <span>
                Strategy-driven approach for{" "}
                <span className="text-slate-200 font-medium">scalable</span>{" "}
                solutions
              </span>
            </li>

            <li className="flex items-start gap-3">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-teal-400" />
              <span>
                Secure architecture built with{" "}
                <span className="text-slate-200 font-medium">
                  industry best practices
                </span>
              </span>
            </li>

            <li className="flex items-start gap-3">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-teal-400" />
              <span>
                High-performance applications optimized for{" "}
                <span className="text-slate-200 font-medium">
                  speed & reliability
                </span>
              </span>
            </li>
          </ul>
        </div>

        {/* ================= RIGHT DIAGRAM ================= */}
        <div className="relative flex items-center justify-center overflow-visible">
          <svg
            viewBox="0 0 600 600"
            className="w-full max-w-xl overflow-visible"
          >
            {/* Rings */}
            <circle
              cx={center}
              cy={center}
              r="220"
              stroke="#1F2937"
              strokeWidth="2"
              fill="none"
            />
            <circle
              cx={center}
              cy={center}
              r="160"
              stroke="#1F2937"
              strokeWidth="2"
              fill="none"
            />
            <circle
              cx={center}
              cy={center}
              r="100"
              stroke="#1F2937"
              strokeWidth="2"
              fill="none"
            />

            {/* Center Card */}
            <rect
              x="200"
              y="260"
              width="200"
              height="80"
              rx="22"
              fill="#020617"
              stroke="#334155"
            />
            <text
              x={center}
              y={305}
              textAnchor="middle"
              fill="#E5E7EB"
              fontSize="14"
              fontWeight="600"
              letterSpacing="1"
            >
              WEB SUCCESS
            </text>

            {/* Inner labels */}
            <text
              x={center}
              y="220"
              textAnchor="middle"
              fill="#2DD4BF"
              fontSize="12"
            >
              Strategy & Planning
            </text>
            <text
              x={center}
              y="375"
              textAnchor="middle"
              fill="#94A3B8"
              fontSize="12"
            >
              Continuous Improvement
            </text>

            {/* Process Steps */}
            {steps.map((step, index) => {
              const rad = (step.angle * Math.PI) / 180;
              const x = center + radius * Math.cos(rad);
              const y = center + radius * Math.sin(rad);

              return (
                <DiagramLabel key={index} x={x} y={y} label={step.label} />
              );
            })}
          </svg>
        </div>
      </div>
    </section>
  );
}

/* ===================== LABEL ===================== */
function DiagramLabel({
  x,
  y,
  label,
}: {
  x: number;
  y: number;
  label: string;
}) {
  return (
    <g>
      <rect
        x={x - 90}
        y={y - 18}
        width="180"
        height="36"
        rx="18"
        fill="#020617"
        stroke="#334155"
      />
      <text
        x={x}
        y={y + 5}
        textAnchor="middle"
        fill="#E5E7EB"
        fontSize="12"
        fontWeight="500"
      >
        {label}
      </text>
    </g>
  );
}
