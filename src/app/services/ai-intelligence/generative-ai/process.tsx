"use client";
import { useState } from "react";

const steps = [
  {
    id: "01",
    title: "Discovery & Use-Case Mapping",
    desc: "We identify high-impact opportunities, define user journeys, and align generative AI capabilities with measurable business outcomes.",
  },
  {
    id: "02",
    title: "Model & Architecture Selection",
    desc: "Choose the right LLMs, multimodal systems, and infrastructure patterns to balance intelligence, cost, performance, and security.",
  },
  {
    id: "03",
    title: "Prompt Engineering & Grounding",
    desc: "Design system prompts, retrieval pipelines, and context strategies to deliver accurate, relevant, and controllable outputs.",
  },
  {
    id: "04",
    title: "Customization & Fine-Tuning",
    desc: "Adapt models with domain knowledge, proprietary data, and feedback loops to improve precision and business alignment.",
  },
  {
    id: "05",
    title: "Integration & Deployment",
    desc: "Embed AI into applications, workflows, and enterprise systems with scalable APIs and production-ready environments.",
  },
  {
    id: "06",
    title: "Monitoring, Safety & Optimization",
    desc: "Continuously evaluate quality, manage hallucinations, optimize cost, and ensure compliance with governance standards.",
  },
];

export default function ProcessSteps() {
  const [start, setStart] = useState(3); // which group we show
  const visible = steps.slice(start, start + 3);

  const prev = () => {
    setStart((s) => Math.max(0, s - 1));
  };

  const next = () => {
    setStart((s) => Math.min(steps.length - 3, s + 1));
  };

  return (
    <section className="bg-gradient-to-b from-zinc-50 via-white to-zinc-50 ">
      <div className="max-w-7xl mx-auto px-6">
        {/* ================= HEADER ================= */}
        <div className="max-w-4xl mb-5">
          {/* eyebrow */}
          <div className="text-xs tracking-[0.25em] uppercase text-zinc-700 mb-1">
            Generative AI
          </div>

          {/* title */}
          <h2 className="text-4xl md:text-4xl font-semibold text-zinc-900 leading-tight">
            From Concept to Intelligent Automation
          </h2>

          {/* description */}
          <p className="mt-2 text-lg text-zinc-600 leading-relaxed">
            We design, build, and deploy enterprise-grade generative AI systems
            that transform workflows, enhance decision-making, and unlock new
            digital capabilities across your organization.
          </p>

          {/* accent */}
          <div className="mt-2 h-px w-24 bg-zinc-300" />
        </div>
        {/* ================= TOP ================= */}
        <div className="flex items-center justify-between mb-3">
          {/* RIGHT */}
          <div className="flex items-center gap-2 bg-white border border-zinc-200 rounded-full p-1 shadow-sm">
            <button
              onClick={prev}
              disabled={start === 0}
              className="
      w-10 h-10
      rounded-full
      text-zinc-700
      hover:bg-zinc-900 hover:text-white
      transition
      disabled:opacity-30
    "
            >
              ←
            </button>

            <button
              onClick={next}
              disabled={start === steps.length - 3}
              className="
      w-10 h-10
      rounded-full
      text-zinc-700
      hover:bg-zinc-900 hover:text-white
      transition
      disabled:opacity-30
    "
            >
              →
            </button>
          </div>
        </div>

        {/* ================= CARDS ================= */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {visible.map((step) => (
            <div
              key={step.id}
              className="
        group relative overflow-hidden
        rounded-[24px]
        bg-gradient-to-b from-zinc-900 to-black
        border border-zinc-800
        p-10
        transition-all duration-300
        hover:-translate-y-2
        hover:border-zinc-700
        hover:shadow-[0_30px_80px_rgba(0,0,0,0.45)]
      "
            >
              {/* subtle top light */}
              <div className="absolute inset-x-0 top-0 h-px bg-white/10" />

              {/* hover ambient */}
              <div className="absolute -right-16 -top-16 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition" />

              {/* step number */}
              <div className="text-zinc-500 text-xs tracking-wider uppercase mb-8 font-medium">
                Step {step.id}
              </div>

              {/* icon */}
              <div className="mb-8 w-14 h-14 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-white shadow-inner group-hover:scale-105 transition">
                ✦
              </div>

              {/* title */}
              <h3 className="text-white text-xl font-semibold mb-4 leading-snug">
                {step.title}
              </h3>

              {/* desc */}
              <p className="text-zinc-400 leading-relaxed text-[15px]">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
