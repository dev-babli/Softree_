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
    angle: 200,
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
        inline-block mb-4 px-4 py-1.5 rounded-full
        text-xs uppercase tracking-[0.3em]
        text-white/80
        bg-white/5 border border-white/10
      "
        >
          Process Overview
        </span>

        {/* Title */}
        <h2 className="relative text-4xl md:text-5xl font-semibold tracking-tight mb-6 text-white">
          Mobile App Development Lifecycle
          {/* Underline */}
          <span
            className="
          absolute left-1/2 -bottom-3 w-32 h-[3px]
          -translate-x-1/2 rounded-full
          bg-gradient-to-r from-white/40 via-white/20 to-transparent
        "
          />
        </h2>

        {/* Description */}
        <p className="text-gray-400 text-lg leading-relaxed max-w-3xl mx-auto">
          A structured, transparent process that ensures scalable, secure, and
          high-performance mobile applications.
        </p>
      </div>

      {/* ===== Content ===== */}
      <div className="max-w-7xl mx-auto px-6">
        <div
          className="
        relative rounded-3xl p-10
        bg-gradient-to-br from-[#1b1b1b] via-[#121212] to-[#0b0b0b]
        ring-1 ring-white/10
        backdrop-blur-sm
      "
        >
          {/* Divider */}
          <span className="hidden lg:block absolute top-10 bottom-10 left-1/2 w-px bg-white/10" />

          <div className="grid lg:grid-cols-2 gap-12 items-stretch">
            {/* ================= LEFT ================= */}
            <div className="h-full pr-2">
              <ul className="space-y-5">
                {steps.map((step, index) => {
                  const isActive = active === step.id;

                  return (
                    <li key={step.id}>
                      <button
                        onClick={() => setActive(step.id)}
                        aria-expanded={isActive}
                        className={`w-full flex gap-5 px-5 py-5 rounded-xl text-left transition
                      ${
                        isActive
                          ? "bg-white/8 ring-1 ring-white/15"
                          : "hover:bg-white/5"
                      }`}
                      >
                        {/* Index */}
                        <span
                          className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium
                        ${
                          isActive
                            ? "bg-white text-black"
                            : "bg-white/10 text-gray-400"
                        }`}
                        >
                          {index + 1}
                        </span>

                        {/* Text */}
                        <div className="flex-1">
                          <h3
                            className={`text-lg font-medium ${
                              isActive ? "text-white" : "text-gray-300"
                            }`}
                          >
                            {step.label}
                          </h3>

                          <div
                            className={`grid transition-all duration-300 ease-out ${
                              isActive
                                ? "grid-rows-[1fr] opacity-100 mt-2"
                                : "grid-rows-[0fr] opacity-0"
                            }`}
                          >
                            <p className="overflow-hidden text-sm text-gray-400 leading-relaxed max-w-md">
                              {step.description}
                            </p>
                          </div>
                        </div>

                        {/* Chevron */}
                        <span
                          className={`mt-1 transition-transform ${
                            isActive ? "rotate-180 text-white" : "text-gray-500"
                          }`}
                        >
                          ⌄
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* ================= RIGHT ================= */}
            <div className="h-full flex items-center justify-center pl-2">
              <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                {/* Base ring */}
                <circle
                  cx={center}
                  cy={center}
                  r={radius}
                  fill="none"
                  stroke="#1f2933"
                  strokeWidth="4"
                />

                {/* Progress ring */}
                <circle
                  cx={center}
                  cy={center}
                  r={radius}
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="3"
                  strokeDasharray={2 * Math.PI * radius}
                  strokeDashoffset={
                    ((360 - (activeStep.angle + 90)) / 360) *
                    2 *
                    Math.PI *
                    radius
                  }
                  className="transition-all duration-700 ease-out"
                  opacity="0.9"
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
                        fill={isActive ? "#1f1f1f" : "#0f172a"}
                        stroke="#2a2a2a"
                        strokeWidth={isActive ? 2 : 1}
                      />

                      <foreignObject
                        x={node.x - 18}
                        y={node.y - 18}
                        width="36"
                        height="36"
                      >
                        <Icon
                          size={30}
                          className={isActive ? "text-white" : "text-gray-400"}
                        />
                      </foreignObject>

                      <text
                        x={label.x}
                        y={label.y}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize="10"
                        fontWeight={isActive ? "600" : "400"}
                        fill={isActive ? "#ffffff" : "#9ca3af"}
                      >
                        {step.label}
                      </text>
                    </g>
                  );
                })}

                {/* Center */}
                <text
                  x={center}
                  y={center - 8}
                  textAnchor="middle"
                  fontSize="22"
                  fontWeight="600"
                  fill="#ffffff"
                >
                  SDLC
                </text>

                <text
                  x={center}
                  y={center + 20}
                  textAnchor="middle"
                  fontSize="14"
                  fill="#9ca3af"
                >
                  {activeStep.label}
                </text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
