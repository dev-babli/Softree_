"use client";

import { useState } from "react";

/* -------------------- DATA -------------------- */
const steps = [
  {
    id: "01",
    title: "Idea Validation and Research",
    description: [
      "Validate product assumptions and business goals",
      "Conduct market and competitor research",
      "Define a clear and differentiated value proposition",
    ],
  },
  {
    id: "02",
    title: "Defining the MVP Scope",
    description: [
      "Identify core features that deliver maximum value",
      "Avoid feature bloat and unnecessary complexity",
      "Ensure scalability and technical feasibility",
    ],
  },
  {
    id: "03",
    title: "Prototyping and Design",
    description: [
      "Create wireframes to map the user journey",
      "Design intuitive and user-friendly interfaces",
      "Focus on usability and visual clarity",
    ],
  },
  {
    id: "04",
    title: "Development",
    description: [
      "Build robust frontend and backend systems",
      "Use modern, scalable architectures",
      "Iterate continuously with feedback loops",
    ],
  },
  {
    id: "05",
    title: "Iteration and Future Planning",
    description: [
      "Analyze user feedback and performance data",
      "Plan feature enhancements and optimizations",
      "Prepare the product for long-term scaling",
    ],
  },
];

/* -------------------- SVG TILE -------------------- */
function StepTile({ active }: { active: boolean }) {
  return (
    <svg
      width="430"
      height="130"
      viewBox="0 0 260 100"
      className={`transition-all duration-300 ${
        active
          ? "drop-shadow-[0_18px_40px_rgba(59,130,246,0.45)]"
          : "opacity-80 hover:opacity-100"
      }`}
      aria-hidden
    >
      <path
        d="M130 0L260 43L130 86L0 43L130 0Z"
        fill={active ? "#2563EB" : "#1F2937"}
      />
      <path
        d="M0 43V55L130 98V86L0 43Z"
        fill={active ? "#1E40AF" : "#111827"}
      />
      <path
        d="M260 43V55L130 98V86L260 43Z"
        fill={active ? "#3B82F6" : "#020617"}
      />
    </svg>
  );
}
const TickIcon = () => (
  <svg
    className="h-4 w-4 text-blue-400 shrink-0"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

/* -------------------- MAIN COMPONENT -------------------- */
export default function MvpProcessLeftRight() {
  const [active, setActive] = useState(1);

  return (
    <section
      className="relative py-24 text-white bg-gradient-to-b from-black via-[#020d1a] to-black
 "
    >
      {/* 7xl BACKGROUND CONTAINER */}
      <div className="absolute inset-0 flex justify-center">
        <div
          className="
        relative w-full max-w-7xl
        rounded-[32px]
        overflow-hidden
        bg-gradient-to-b from-black via-[#020d1a] to-black
        border border-white/5
      "
        >
          {/* Ambient glow */}
          <div
            className="
          pointer-events-none
          absolute inset-0
          bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.18),transparent_45%)]
        "
          />
        </div>
      </div>

      {/* CONTENT */}
      <div className="relative mx-auto max-w-7xl px-6">
        {/* HEADER */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs uppercase tracking-wider text-blue-400">
            Our Process
          </span>

          <h2 className="mt-2 text-3xl font-semibold md:text-4xl">
            Our MVP Development Process
          </h2>

          <p className="mt-4 text-sm leading-relaxed text-neutral-400">
            Select a step to explore how we build scalable MVPs.
          </p>
        </div>

        {/* BODY */}
        <div className="relative mt-12 flex gap-20">
          {/* LEFT — SVG STACK */}
          <div className="relative flex flex-col gap-5">
            {steps.map((step, index) => {
              const isActive = active === index + 1;

              return (
                <button
                  key={step.id}
                  onClick={() => setActive(index + 1)}
                  className={`
              relative
              transition-all duration-300
              focus:outline-none
              ${isActive ? "scale-[1.03]" : "hover:scale-[1.015]"}
            `}
                >
                  <StepTile active={isActive} />

                  {/* Label */}
                  <div className="absolute inset-0 flex items-center justify-center px-6">
                    <span
                      className={`text-xs font-medium tracking-wide transition-colors ${
                        isActive ? "text-white" : "text-neutral-400"
                      }`}
                    >
                      {step.id}. {step.title}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* RIGHT — STEP-ALIGNED CONTENT */}
          <div className="relative flex-1">
            {steps.map((step, index) => {
              const isActive = active === index + 1;

              return (
                <div
                  key={step.id}
                  className={`
              absolute left-0 right-0
              transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)]
              ${isActive ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
            `}
                  style={{
                    transform: `translateY(${index * 120}px)`,
                  }}
                >
                  {/* 🔗 DOTTED CONNECTOR */}
                  <div
                    className={`
                absolute left-[-80px] top-1/2
                w-[80px] h-px
                border-t border-dashed
                transition-all duration-500
                ${isActive ? "border-blue-400/80" : "border-blue-400/30"}
              `}
                    style={{ transform: "translateY(-50%)" }}
                  />

                  {/* CARD */}
                  <div
                    className="
                max-w-xl
                ml-0
                rounded-2xl
                bg-gradient-to-br from-blue-600/20 via-blue-500/10 to-transparent
                backdrop-blur-md
                p-8
                border border-blue-400/30
                shadow-[0_30px_90px_rgba(59,130,246,0.35)]
              "
                  >
                    {/* STEP */}
                    <span className="block text-sm font-semibold text-blue-300">
                      Step {step.id}
                    </span>

                    {/* TITLE */}
                    <h3 className="mt-2 text-xl font-semibold text-white">
                      {step.title}
                    </h3>

                    {/* BULLETS */}
                    <ul className="mt-4 space-y-3 text-sm text-white/85">
                      {step.description.map((point, idx) => (
                        <li key={idx} className="group flex items-start gap-3">
                          <span className="mt-[2px] flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/10 border border-blue-400/30">
                            <TickIcon />
                          </span>

                          <span className="leading-relaxed text-white/85">
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
