"use client";
import React from "react";

const steps = [
  {
    id: "01",
    title: "Strategy & Co-Creation",
    desc: "Align business goals, identify high-value opportunities, and define measurable outcomes.",
  },
  {
    id: "02",
    title: "Governance & Operating Model",
    desc: "Establish security, compliance, and lifecycle guardrails for responsible AI adoption.",
  },
  {
    id: "03",
    title: "Platform & Agent Build",
    desc: "Design reusable architectures, orchestration, integrations, and evaluation pipelines.",
  },
  {
    id: "04",
    title: "Deploy, Run & Optimize",
    desc: "Launch use-case pods, monitor agents, retrain, and scale value continuously.",
  },
];

export default function AgenticFramework() {
  return (
    <section className="w-full py-24 ">
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-zinc-900">
            A Structured Path to Scalable Agentic AI
          </h2>

          <p className="mt-4 text-zinc-600 leading-relaxed">
            Our framework helps enterprises move from experimentation to
            production-ready autonomous systems. We align strategy, governance,
            platform engineering, and continuous optimization to deliver secure,
            measurable, and repeatable business value.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* connector line */}
          <div className="hidden md:block absolute top-8 left-0 right-0 h-[3px]   bg-gradient-to-r from-black via-[#0f2f7a] to-black rounded-full" />

          {/* steps */}
          <div className="grid md:grid-cols-4 gap-10">
            {steps.map((step) => (
              <div key={step.id} className="relative text-center group">
                {/* number circle */}
                <div className="mx-auto w-16 h-16 rounded-full   bg-gradient-to-r from-black via-[#0f2f7a] to-black text-white flex items-center justify-center text-lg font-semibold border-4 border-white shadow-xl relative z-10 group-hover:scale-110 transition">
                  {step.id}
                </div>

                {/* card */}
                <div className="mt-8 rounded-2xl p-6  bg-gradient-to-r from-black via-[#0f2f7a] to-black border border-emerald-100 shadow-md group-hover:shadow-xl transition-all duration-300">
                  <h3 className="font-semibold mb-3 text-zinc-100">
                    {step.title}
                  </h3>

                  <p className="text-sm text-zinc-300 leading-relaxed">
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
