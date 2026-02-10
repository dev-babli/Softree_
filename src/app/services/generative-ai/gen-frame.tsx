"use client";
import React from "react";

const steps = [
  {
    id: "01",
    title: "Use-Case Discovery & Value Mapping",
    desc: "Identify high-impact scenarios, define success metrics, and prioritize where generative AI can augment people, workflows, and decisions.",
  },
  {
    id: "02",
    title: "Model & Knowledge Grounding",
    desc: "Select the right LLMs and connect them to enterprise data using retrieval pipelines, vector stores, and secure access patterns.",
  },
  {
    id: "03",
    title: "Prompt, Workflow & Experience Design",
    desc: "Engineer system prompts, guardrails, and interaction flows that ensure reliable, contextual, and controllable outputs.",
  },
  {
    id: "04",
    title: "Deploy, Evaluate & Improve",
    desc: "Launch into production, monitor quality and cost, reduce hallucinations, and continuously refine performance with feedback loops.",
  },
];

export default function GenAIFramework() {
  return (
    <section className="w-full py-24 bg-gradient-to-b from-zinc-50 via-white to-zinc-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* ================= HEADING ================= */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-zinc-900">
            A Structured Path to Production-Ready Generative AI
          </h2>

          <p className="mt-4 text-zinc-600 leading-relaxed">
            Our framework helps enterprises move from experimentation to
            scalable, secure deployments. We align business priorities, model
            capabilities, and engineering rigor to deliver measurable and
            repeatable outcomes with generative AI.
          </p>
        </div>

        {/* ================= TIMELINE ================= */}
        <div className="relative">
          {/* connector line */}
          <div className="hidden md:block absolute top-8 left-0 right-0 h-[3px] bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-400 rounded-full" />

       {/* steps */}
<div className="grid md:grid-cols-4 gap-10 items-stretch">
  {steps.map((step) => (
    <div key={step.id} className="relative text-center group flex flex-col">
      {/* number circle */}
      <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center text-lg font-semibold border-4 border-white shadow-xl relative z-10 group-hover:scale-110 transition">
        {step.id}
      </div>

      {/* card */}
      <div className="
        mt-8
        rounded-2xl
        p-6
        bg-gradient-to-b from-white to-emerald-50
        border border-emerald-100
        shadow-md
        group-hover:shadow-xl
        transition-all duration-300

        flex flex-col
        flex-1
      ">
        <h3 className="font-semibold mb-3 text-zinc-900">
          {step.title}
        </h3>

        <p className="text-sm text-zinc-600 leading-relaxed">
          {step.desc}
        </p>
      </div>
    </div>
  ))}
</div>

        </div>
      </div>
    </section>
  );
}
