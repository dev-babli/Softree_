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
    <section className="relative overflow-hidden py-12">
      {/* ===== Header ===== */}
      <div className="max-w-4xl mx-auto px-6 text-center mb-24">
        {/* Eyebrow */}
        <span
          className="
    inline-flex items-center
    mb-5 px-4 py-1.5
    rounded-full
    text-xs font-semibold uppercase tracking-[0.3em]

    bg-slate-100
    text-slate-600
    border border-slate-200
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
      bg-gradient-to-r from-cyan-500 to-blue-600
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
      <div className="max-w-7xl mx-auto px-6 ">
        {/* Floating Section Container */}
        <div
          className="
    relative
    rounded-[40px]
  bg-gray-50

    px-14 py-16

    border border-gray-100

       shadow-[0_24px_80px_rgba(0,0,0,0.7)]
  "
        >
          {/* Divider */}
          <span className="hidden lg:block absolute top-14 bottom-14 left-1/2 w-px bg-gray-200" />

          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* ================= LEFT ================= */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-12">
                Our Development Process
              </h3>

              <ul className="space-y-4">
                {steps.map((step, index) => {
                  const isActive = active === step.id;

                  return (
                    <li key={step.id}>
                      <button
                        onClick={() => setActive(step.id)}
                        className={`
              group relative w-full flex gap-5 px-6 py-5
              rounded-2xl text-left
              transition-all duration-300 border

              ${
                isActive
                  ? "bg-white border-gray-200 shadow-md"
                  : "border-transparent hover:bg-gray-50"
              }
            `}
                      >
                        {/* LEFT ACCENT BAR (premium touch) */}
                        {isActive && (
                          <span className="absolute left-0 top-4 bottom-4 w-[4px] rounded-full bg-gradient-to-b from-indigo-600 to-cyan-500" />
                        )}

                        {/* Step number */}
                        <span
                          className={`
                flex h-10 w-10 items-center justify-center
                rounded-full font-semibold text-sm
                transition-all

                ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 group-hover:bg-gray-200"
                }
              `}
                        >
                          {index + 1}
                        </span>

                        {/* Text */}
                        <div className="flex-1">
                          <h4
                            className={`
                  text-base font-semibold transition
                  ${isActive ? "text-gray-900" : "text-gray-700"}
                `}
                          >
                            {step.label}
                          </h4>

                          {isActive && (
                            <p className="mt-2 text-sm text-gray-500 leading-relaxed max-w-md">
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
          p-12
          rounded-[32px]
          bg-black

          border border-gray-100

          shadow-[
            0_10px_30px_rgba(0,0,0,0.05),
            0_40px_80px_rgba(0,0,0,0.08)
          ]
        "
              >
                <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
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
                    stroke="#06b6d4"
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
                          r={isActive ? 26 : 21}
                          fill={isActive ? "#111827" : "#f3f4f6"}
                          stroke="#e5e7eb"
                          strokeWidth="2"
                        />

                        <foreignObject
                          x={node.x - 18}
                          y={node.y - 18}
                          width="36"
                          height="36"
                        >
                          <Icon
                            size={28}
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
                          fontSize="11"
                          fontWeight={isActive ? "600" : "400"}
                          fill={isActive ? "#666b76" : "#6b7280"}
                        >
                          {step.label}
                        </text>
                      </g>
                    );
                  })}

                  {/* Center */}
                  <text
                    x={center}
                    y={center - 6}
                    textAnchor="middle"
                    fontSize="22"
                    fontWeight="700"
                    fill="#111827"
                  >
                    SDLC
                  </text>

                  <text
                    x={center}
                    y={center + 18}
                    textAnchor="middle"
                    fontSize="14"
                    fill="#ccd3df"
                  >
                    {activeStep.label}
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
