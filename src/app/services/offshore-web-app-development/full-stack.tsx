"use client";

import React from "react";
import SectionHeader from "@/components/homepage-light/SectionHeader";

const ACCENT = "#FF5812" as const;

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
    <section
      data-section="web-dev-process"
      className="relative py-16 md:py-20"
    >
      <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-12">
        <div className="max-w-xl">
          <SectionHeader
            badge="Our process"
            accent={ACCENT}
            headline={
              <>
                Web development process
                <span className="block text-[#FF5812]">that delivers results</span>
              </>
            }
            body="Strategy-driven delivery with secure architecture and high-performance apps optimized for speed and reliability."
          />

          <ul className="mt-10 space-y-5 text-base text-[#0a0a1a]/65">
  {[
    "Strategy-driven approach for scalable solutions",
    "Secure architecture built with industry best practices",
    "High-performance apps optimized for speed & reliability",
  ].map((text, i) => (
    <li key={i} className="flex items-start gap-3">
      <svg className="mt-1 shrink-0" width="20" height="20" viewBox="0 0 24 24">
  <path
    d="M12 2l2.5 6.5L21 11l-6.5 2.5L12 20l-2.5-6.5L3 11l6.5-2.5L12 2z"
    fill="#f97316"
    opacity="0.7"
  />
</svg>


      <span>{text}</span>
    </li>
  ))}
</ul>

        </div>
        {/* ================= RIGHT DIAGRAM ================= */}
        <div className="relative flex items-center justify-center">
          <svg
            viewBox="-40 -40 680 680"
            className="w-full max-w-xl overflow-visible"
          >
            {/* ================= DEFINITIONS ================= */}
            <defs>
              {/* stroke gradient */}
              <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#f97316" />
                <stop offset="50%" stopColor="#ea580c" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>

              {/* fills */}
              <radialGradient id="ringFillOuter">
                <stop offset="0%" stopColor="#f97316" stopOpacity="0.10" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </radialGradient>

              <radialGradient id="ringFillMiddle">
                <stop offset="0%" stopColor="#ea580c" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </radialGradient>

              <radialGradient id="ringFillInner">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.10" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </radialGradient>

              {/* center glow */}
              <radialGradient id="pulse">
                <stop offset="0%" stopColor="#f97316" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </radialGradient>

              {/* shadow */}
              <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow
                  dx="0"
                  dy="20"
                  stdDeviation="25"
                  floodColor="#000"
                  floodOpacity="0.18"
                />
              </filter>
            </defs>

            {/* ================= CENTER PULSE ================= */}
            <circle cx={center} cy={center} r="160" fill="url(#pulse)" />

            {/* ================= RINGS ================= */}
            <circle
              cx={center}
              cy={center}
              r="220"
              stroke="url(#ringGrad)"
              strokeWidth="3"
              fill="url(#ringFillOuter)"
            />

            <circle
              cx={center}
              cy={center}
              r="150"
              stroke="url(#ringGrad)"
              strokeWidth="2"
              fill="url(#ringFillMiddle)"
            />

            <circle
              cx={center}
              cy={center}
              r="90"
              stroke="#e5e7eb"
              strokeWidth="2"
              fill="url(#ringFillInner)"
            />

            {/* ================= CENTER CARD ================= */}
            <rect
              x="200"
              y="260"
              width="200"
              height="80"
              rx="22"
              fill="white"
              stroke="#e5e7eb"
              filter="url(#shadow)"
            />

            <text
              x={center}
              y={305}
              textAnchor="middle"
              fontSize="16"
              fontWeight="700"
              fill="#111827"
            >
              WEB SUCCESS
            </text>

            {/* ================= INNER LABELS ================= */}
            <text
              x={center}
              y="225"
              textAnchor="middle"
              fill="#ea580c"
              fontSize="12"
              fontWeight="600"
            >
              Strategy & Planning
            </text>

            <text
              x={center}
              y="380"
              textAnchor="middle"
              fill="#f97316"
              fontSize="12"
              fontWeight="600"
            >
              Continuous Improvement
            </text>

            {/* ================= PROCESS PILLS ================= */}
            {steps.map((step, index) => {
              const rad = (step.angle * Math.PI) / 180;

              const safeRadius = radius - 15;

              const x = center + safeRadius * Math.cos(rad);
              const y = center + safeRadius * Math.sin(rad);

              const colors = [
                "#7c3aed",
                "#22c55e",
                "#3b82f6",
                "#f59e0b",
                "#ef4444",
                "#06b6d4",
              ];

              const color = colors[index % colors.length];

              return (
                <g key={index} transform={`translate(${x}, ${y})`}>
                  <rect
                    x="-60"
                    y="-18"
                    width="120"
                    height="36"
                    rx="18"
                    fill="white"
                    opacity="0.9"
                  />

                  <rect
                    x="-60"
                    y="-18"
                    width="120"
                    height="36"
                    rx="18"
                    fill="none"
                    stroke={color}
                    strokeWidth="1.5"
                  />

                  <text
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="11"
                    fontWeight="600"
                    fill="#111"
                  >
                    {step.label}
                  </text>
                </g>
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
