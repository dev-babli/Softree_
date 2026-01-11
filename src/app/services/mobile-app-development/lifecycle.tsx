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
    <section className="relative bg-black py-36 text-white overflow-hidden">
      {/* ===== Ambient Glow ===== */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[-30%] left-[-20%] w-[600px] h-[600px] bg-cyan-400/15 blur-[200px] rounded-full animate-glow-float-1" />
        <div className="absolute bottom-[-30%] right-[-20%] w-[600px] h-[600px] bg-purple-500/15 blur-[200px] rounded-full animate-glow-float-2" />
      </div>

      {/* ===== Header ===== */}
      <div className="max-w-4xl mx-auto px-6 text-center mb-24">
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">
          Mobile App Development Lifecycle
        </h2>
        <p className="text-gray-400 text-lg leading-relaxed">
          A structured, transparent process that ensures scalable, secure, and
          high-performance mobile applications.
        </p>
      </div>

      {/* ===== Content ===== */}
      <div className="max-w-7xl mx-auto px-6">
        {/* Shared container */}
        <div
          className="
  relative rounded-3xl p-10
  bg-gradient-to-br
  from-cyan-500/10
  via-blue-500/5
  to-purple-500/10
  ring-1 ring-white/10
  backdrop-blur-sm
"
        >
          {/* Subtle vertical divider */}
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
                        ? "bg-white/8 ring-1 ring-white/10"
                        : "hover:bg-white/5"
                    }`}
                      >
                        {/* Index */}
                        <span
                          className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium
                      ${
                        isActive
                          ? "bg-blue-500 text-white"
                          : "bg-white/10 text-gray-400"
                      }`}
                        >
                          {index + 1}
                        </span>

                        {/* Text */}
                        <div className="flex-1">
                          <h3
                            className={`text-lg font-medium ${
                              isActive ? "text-blue-400" : "text-gray-200"
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
                            isActive
                              ? "rotate-180 text-blue-400"
                              : "text-gray-500"
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
              <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                className="overflow-visible"
              >
                <defs>
                  <linearGradient
                    id="ringGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#22D3EE" />
                    <stop offset="100%" stopColor="#6366F1" />
                  </linearGradient>
                </defs>

                {/* Base ring */}
                <circle
                  cx={center}
                  cy={center}
                  r={radius}
                  fill="none"
                  stroke="#1E293B"
                  strokeWidth="4"
                />

                {/* Progress ring */}
                <circle
                  cx={center}
                  cy={center}
                  r={radius}
                  fill="none"
                  stroke="url(#ringGradient)"
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
                        fill={isActive ? "#27282bff" : "#0F172A"}
                        stroke="#1e2025ff"
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
                          className={isActive ? "text-white" : "text-blue-400"}
                        />
                      </foreignObject>

                      <text
                        x={label.x + labelOffsetX(step.angle)}
                        y={label.y + labelOffsetY(step.angle)}
                        textAnchor={textAnchor(step.angle)}
                        dominantBaseline="middle"
                        fontSize="16"
                        fontWeight={isActive ? "600" : "400"}
                        fill={isActive ? "#60A5FA" : "#94A3B8"}
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
                  fill="#60A5FA"
                >
                  SDLC
                </text>

                <text
                  x={center}
                  y={center + 20}
                  textAnchor="middle"
                  fontSize="14"
                  fill="#94A3B8"
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
