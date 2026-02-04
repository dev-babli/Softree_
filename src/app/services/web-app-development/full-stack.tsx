"use client";

import React from "react";

/* ===================== DATA ===================== */
const steps = [
  { label: "Discovery & Research", angle: -90 },
  { label: "UI / UX Design", angle: -45 },
  { label: "Frontend", angle: 5 },
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
    <section className="relative py-12 bg-gradient-to-b from-gray-50 via-white to-gray-50 ">
      <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* ================= LEFT CONTENT ================= */}
        <div className="max-w-xl">
          {/* Eyebrow */}
          <span className="text-xs tracking-[0.3em] uppercase text-indigo-600 font-semibold">
            Our Process
          </span>

          {/* Heading */}
          <h2 className="mt-5 text-4xl sm:text-5xl xl:text-6xl font-bold leading-[1.1] text-gray-900">
            Web development process
            <span className="block mt-2 bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">
              that delivers results
            </span>
          </h2>

          {/* Bullets */}
          <ul className="mt-10 space-y-5 text-gray-600 text-base">
            {[
              "Strategy-driven approach for scalable solutions",
              "Secure architecture built with industry best practices",
              "High-performance apps optimized for speed & reliability",
            ].map((text, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-indigo-600" />
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ================= RIGHT DIAGRAM ================= */}
        <div className="relative flex items-center justify-center">
          <svg viewBox="0 0 600 600" className="w-full max-w-xl">
            {/* ===== Rings (light gray) ===== */}
            {[220, 160, 100].map((r) => (
              <circle
                key={r}
                cx={center}
                cy={center}
                r={r}
                stroke="#101112"
                strokeWidth="2"
                fill="none"
              />
            ))}

            {/* ===== Center Card ===== */}
            <rect
              x="200"
              y="260"
              width="200"
              height="80"
              rx="22"
              fill="#ffffff"
              stroke="#e5e7eb"
            />

            <text
              x={center}
              y={305}
              textAnchor="middle"
              fontSize="14"
              fontWeight="600"
            >
              WEB SUCCESS
            </text>

            {/* Inner labels */}
            <text
              x={center}
              y="220"
              textAnchor="middle"
              fill="#6366f1"
              fontSize="10"
            >
              Strategy & Planning
            </text>

            <text
              x={center}
              y="375"
              textAnchor="middle"
              fill="#6b7280"
              fontSize="10"
            >
              Continuous Improvement
            </text>

            {/* ===== Process Steps ===== */}
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
      {/* pill background */}
      <rect
        x={x - 95}
        y={y - 18}
        width="190"
        height="36"
        rx="18"
        fill="#ffffff"
        stroke="#e5e7eb"
      />

      {/* text */}
      <text
        x={x}
        y={y + 5}
        textAnchor="middle"
        fill="#374151"
        fontSize="12"
        fontWeight="500"
      >
        {label}
      </text>
    </g>
  );
}
