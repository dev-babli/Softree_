"use client";

import { useState } from "react";
import {
  Lightbulb,
  PenTool,
  FileText,
  Code,
  Bug,
  Rocket,
  Settings,
} from "lucide-react";

/* ================= DATA ================= */
const steps = [
  {
    id: "planning",
    label: "Planning",
    angle: -65,
    icon: Lightbulb,
    description:
      "We analyze the business goals, user needs, and technical feasibility to build a strong foundation.",
  },
  {
    id: "designing",
    label: "Designing",
    angle: -35,
    icon: PenTool,
    description:
      "UX/UI experts craft wireframes, visual designs, and interaction flows.",
  },
  {
    id: "defining",
    label: "Defining",
    angle: 15,
    icon: FileText,
    description:
      "Requirements, scope, timelines, and success metrics are clearly documented.",
  },
  {
    id: "building",
    label: "Building",
    angle: 70,
    icon: Code,
    description:
      "Developers implement the solution using scalable and secure technologies.",
  },
  {
    id: "testing",
    label: "Testing",
    angle: 140,
    icon: Bug,
    description:
      "QA teams ensure performance, security, and reliability across devices.",
  },
  {
    id: "deployment",
    label: "Deployment",
    angle: 210,
    icon: Rocket,
    description:
      "The application is released with monitoring and rollback readiness.",
  },
  {
    id: "maintenance",
    label: "Maintenance",
    angle: 255,
    icon: Settings,
    description: "Continuous updates, optimizations, and long-term support.",
  },
];

/* ================= COMPONENT ================= */
export default function MobileAppLifecycleSection() {
  const [active, setActive] = useState(steps[0].id);

  const size = 460;
  const center = size / 2;
  const radius = 150;
  const labelRadius = 215;

  const polar = (angle: number, r: number) => {
    const rad = (angle * Math.PI) / 180;
    return {
      x: center + r * Math.cos(rad),
      y: center + r * Math.sin(rad),
    };
  };

  const labelOffsetY = (angle: number) => {
    if (angle <= -80) return -12;
    if (angle >= 240) return 14;
    return 0;
  };

  const labelOffsetX = (angle: number) =>
    angle > 90 && angle < 270 ? -10 : 10;

  const textAnchor = (angle: number) =>
    angle > 90 && angle < 270 ? "end" : "start";

  const activeStep = steps.find((s) => s.id === active)!;

  return (
    <section className="relative overflow-hidden py-16">
      {/* ===== Header ===== */}
      <div className="max-w-4xl mx-auto px-6 text-center mb-4">
        {/* Eyebrow */}
        <span
          className="
    inline-flex items-center
    mb-5 px-4 py-1.5
    rounded-full
    text-xs font-semibold uppercase tracking-[0.3em]

    bg-orange-50
    text-orange-600
    border border-orange-200
  "
        >
          Process Overview
        </span>

        {/* Title */}
        <h2 className="relative text-4xl md:text-5xl font-bold tracking-tight mb-6 text-slate-900">
          Mobile App Development Lifecycle
          {/* underline accent */}
          <span
            className="
      absolute left-1/2 -bottom-3 w-28 h-[3px]
      -translate-x-1/2 rounded-full
      bg-gradient-to-r from-orange-600 to-amber-500
    "
          />
        </h2>

        {/* Description */}
        <p className="text-slate-600 text-lg leading-relaxed max-w-3xl mx-auto">
          A structured, transparent process that ensures scalable, secure, and
          high-performance mobile applications.
        </p>
      </div>

      {/* ===== CONTENT ===== */}
      <div className="max-w-7xl mx-auto px-4">
        {/* Floating Section Container */}
        <div
          className="
      relative
      rounded-3xl
      bg-gray-50

      px-6 py-6   /* 🔥 tighter */

      border border-gray-100
      shadow-md
    "
        >
          {/* Divider */}
          <span className="hidden lg:block absolute top-8 bottom-8 left-1/2 w-px bg-gray-200" />

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {" "}
            {/* 🔥 tighter gap */}
            {/* ================= LEFT ================= */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-5">
                Our Development Process
              </h3>

              <ul className="space-y-2">
                {" "}
                {/* 🔥 very tight */}
                {steps.map((step, index) => {
                  const isActive = active === step.id;

                  return (
                    <li key={step.id}>
                      <button
                        onClick={() => setActive(step.id)}
                        className={`
                    group relative w-full flex gap-3 px-4 py-3
                    rounded-lg text-left border
                    transition
                    ${
                      isActive
                        ? "bg-white border-gray-200 shadow-sm"
                        : "border-transparent hover:bg-gray-50"
                    }
                  `}
                      >
                        {isActive && (
                          <span className="absolute left-0 top-2 bottom-2 w-[3px] bg-orange-500 rounded-full" />
                        )}

                        {/* Step number */}
                        <span
                          className={`
                      flex h-8 w-8 items-center justify-center
                      rounded-full text-xs font-semibold
                      ${
                        isActive
                          ? "bg-orange-600 text-white"
                          : "bg-gray-100 text-gray-600"
                      }
                    `}
                        >
                          {index + 1}
                        </span>

                        {/* Text */}
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-800">
                            {step.label}
                          </h4>

                          {isActive && (
                            <p className="mt-1 text-xs text-gray-500 leading-relaxed max-w-sm">
                              {step.description}
                            </p>
                          )}
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
            {/* ================= RIGHT ================= */}
            <div className="flex justify-center">
              {/* Diagram Card */}
              <div
                className="
            p-5   /* 🔥 smaller */
            rounded-2xl
            bg-black
            border border-gray-100
            shadow-sm
          "
              >
                {/* 🔥 Smaller SVG */}
                <svg
                  width={size * 0.75}
                  height={size * 0.75}
                  viewBox={`0 0 ${size} ${size}`}
                >
                  {/* Base ring */}
                  <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="4"
                  />

                  {/* Progress ring */}
                  <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="none"
                    stroke="#f97316"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * radius}
                    strokeDashoffset={
                      ((360 - (activeStep.angle + 90)) / 360) *
                      2 *
                      Math.PI *
                      radius
                    }
                    className="transition-all duration-700 ease-out"
                  />

                  {/* Nodes */}
                  {steps.map((step) => {
                    const node = polar(step.angle, radius);
                    const label = polar(step.angle, labelRadius);
                    const Icon = step.icon;
                    const isActive = active === step.id;

                    return (
                      <g
                        key={step.id}
                        onClick={() => setActive(step.id)}
                        className="cursor-pointer"
                      >
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r={isActive ? 24 : 19} /* 🔥 smaller */
                          fill={isActive ? "#111827" : "#f3f4f6"}
                          stroke="#e5e7eb"
                          strokeWidth="2"
                        />

                        <foreignObject
                          x={node.x - 14}
                          y={node.y - 14}
                          width="28"
                          height="28"
                        >
                          <Icon
                            size={20}
                            className={
                              isActive ? "text-white" : "text-gray-600"
                            }
                          />
                        </foreignObject>

                        <text
                          x={label.x}
                          y={label.y}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fontSize="10"
                          fill="#6b7280"
                        >
                          {step.label}
                        </text>
                      </g>
                    );
                  })}

                  {/* Center */}
                  <text
                    x={center}
                    y={center}
                    textAnchor="middle"
                    fontSize="18"
                    fontWeight="700"
                    fill="#111827"
                  >
                    SDLC
                  </text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
