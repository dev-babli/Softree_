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

/* -------------------- SVG TILE (LIGHT THEME) -------------------- */
function StepTile({ active }: { active: boolean }) {
  return (
    <svg
      width="360"
      height="110"
      viewBox="0 0 260 100"
      className={`transition-all duration-300 ${active ? "drop-shadow-md" : "opacity-80"}`}
      aria-hidden
    >
      <path
        d="M130 0L260 43L130 86L0 43L130 0Z"
        fill={active ? "#2563EB" : "#E5E7EB"}
      />
      <path
        d="M0 43V55L130 98V86L0 43Z"
        fill={active ? "#1E40AF" : "#D1D5DB"}
      />
      <path
        d="M260 43V55L130 98V86L260 43Z"
        fill={active ? "#3B82F6" : "#D1D5DB"}
      />
    </svg>
  );
}

const TickIcon = () => (
  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 shrink-0" />
);

/* -------------------- MAIN COMPONENT -------------------- */
export default function MvpProcessLeftRight() {
  const [active, setActive] = useState(1);

  return (
    <section className="relative py-14 bg-gradient-to-b from-zinc-50 via-white to-zinc-50">
      <div className="relative mx-auto max-w-7xl px-6">
        {/* ================= HEADER ================= */}
        <div className="mx-auto max-w-3xl text-center mb-10">
          {/* Badge */}
          <span className="inline-block mb-3 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold tracking-[0.18em] uppercase">
            How We Work
          </span>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 leading-tight">
            From Idea to Launch —
            <span className="text-blue-600"> Faster & Smarter</span>
          </h2>

          {/* Description */}
          <p className="mt-4 text-base text-gray-600 leading-relaxed max-w-2xl mx-auto">
            We follow a lean, proven MVP framework to validate ideas quickly,
            reduce risk, and build scalable products that grow with your
            business.
          </p>
        </div>

        {/* ================= BODY ================= */}
        <div className="relative mt-10 flex gap-10">
          {/* LEFT — SVG STACK */}
          <div className="flex flex-col gap-3">
            {steps.map((step, index) => {
              const isActive = active === index + 1;

              return (
                <button
                  key={step.id}
                  onClick={() => setActive(index + 1)}
                  className="relative transition hover:scale-[1.02]"
                >
                  <StepTile active={isActive} />

                  <div className="absolute inset-0 flex items-center justify-center px-4">
                    <span
                      className={`text-xs font-medium ${
                        isActive ? "text-gray-900" : "text-gray-500"
                      }`}
                    >
                      {step.id}. {step.title}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* RIGHT — CONTENT */}
          <div className="relative flex-1">
            {steps.map((step, index) => {
              const isActive = active === index + 1;

              return (
                <div
                  key={step.id}
                  className={`absolute left-0 right-0 transition-all duration-400 ${
                    isActive ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                  style={{
                    transform: `translateY(${index * 85}px)`,
                  }}
                >
                  <div
                    className="absolute left-[-60px] top-1/2 w-[60px] border-t border-dashed border-gray-300"
                    style={{ transform: "translateY(-50%)" }}
                  />

                  {/* CARD */}
                  <div className="max-w-lg rounded-xl bg-white border border-gray-200 p-5 shadow-md">
                    <span className="text-xs font-semibold text-blue-600">
                      Step {step.id}
                    </span>

                    <h3 className="mt-1 text-lg font-semibold text-gray-900">
                      {step.title}
                    </h3>

                    <ul className="mt-3 space-y-2 text-sm text-gray-600">
                      {step.description.map((point, idx) => (
                        <li key={idx} className="flex gap-2 items-start">
                          <TickIcon />
                          <span>{point}</span>
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
