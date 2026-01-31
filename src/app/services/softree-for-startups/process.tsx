"use client";

import React from "react";

const steps = [
  {
    id: "01",
    title: "Discovery & Planning",
    desc: "We collaborate with stakeholders to understand business goals, user needs, and technical requirements, defining a clear and actionable roadmap.",
    icon: "https://api.iconify.design/mdi/file-document-check-outline.svg",
  },
  {
    id: "02",
    title: "UX & Interface Design",
    desc: "Our designers create intuitive wireframes and engaging user interfaces that balance usability, aesthetics, and brand consistency.",
    icon: "https://api.iconify.design/mdi/palette-outline.svg",
  },
  {
    id: "03",
    title: "Engineering & Development",
    desc: "We architect and build scalable, secure solutions using modern technologies, following best practices and continuous integration.",
    icon: "https://api.iconify.design/mdi/code-braces.svg",
  },
  {
    id: "04",
    title: "Testing & Quality Assurance",
    desc: "Every feature undergoes rigorous testing to ensure performance, security, and reliability across devices and environments.",
    icon: "https://api.iconify.design/mdi/clipboard-check-outline.svg",
  },
  {
    id: "05",
    title: "Launch & Continuous Improvement",
    desc: "We deploy with confidence and provide ongoing support, enhancements, and optimizations to keep your product evolving.",
    icon: "https://api.iconify.design/mdi/truck-delivery-outline.svg",
  },
];

export default function ProcessTimeline() {
  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADING */}
        <h2 className="text-4xl md:text-5xl font-semibold text-center mb-20">
          Deliver{" "}
          <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            Exceptional Quality
          </span>{" "}
          That Continuously Improves
        </h2>

        {/* TIMELINE */}
        <div className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {steps.map((step, index) => (
              <div key={step.id} className="relative text-center">
                {/* NUMBER */}
                <div className="text-cyan-600 font-semibold text-xl mb-4">
                  {step.id}
                </div>

                {/* ICON + CONNECTOR */}
                <div className="relative mx-auto w-24 h-24 flex items-center justify-center">
                  {/* CONNECTOR (right side only, not last item) */}
                  {index !== steps.length - 1 && (
                <svg
  className="hidden lg:block absolute top-1/2 left-full ml-6 -translate-y-1/2"
  width="100"
  height="9"
  viewBox="0 0 80 4"
>
  <defs>
    <marker
      id="arrowhead"
      markerWidth="6"
      markerHeight="6"
      refX="5"
      refY="3"
      orient="auto"
      markerUnits="strokeWidth"
    >
      <path
        d="M0,0 L6,3 L0,6 Z"
        fill="rgb(34,211,238)"
      />
    </marker>
  </defs>

  <line
    x1="0"
    y1="2"
    x2="80"
    y2="2"
    stroke="rgb(34,211,238)"
    strokeWidth="2"
    strokeDasharray="6 6"
    strokeLinecap="round"
    markerEnd="url(#arrowhead)"
  />
</svg>

                  )}

                  {/* OUTER RING */}
                  <div className="absolute inset-0 rounded-full border-4 border-cyan-200" />

                  {/* INNER RING */}
                  <div className="absolute inset-2 rounded-full border-2 border-cyan-500 bg-white flex items-center justify-center">
                    <img
                      src={step.icon}
                      alt={step.title}
                      className="w-10 h-10"
                    />
                  </div>
                </div>

                {/* TITLE */}
                <h3 className="mt-6 text-xl font-semibold text-cyan-400">
                  {step.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="mt-3 text-gray-300 leading-relaxed text-sm">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
