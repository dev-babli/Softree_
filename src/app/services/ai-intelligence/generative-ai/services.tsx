"use client";
import { useState } from "react";

const services = [
  {
    id: 1,
    title: "Generative AI Model Development",
    desc: "Design and build production-grade generative AI systems tailored to your business goals.",
    points: [
      "Custom LLM and multimodal model creation",
      "Training pipelines & dataset engineering",
      "Evaluation, guardrails & safety layers",
      "Scalable cloud architecture",
    ],
  },
  {
    id: 2,
    title: "Generative AI Model Replication",
    desc: "Recreate the capabilities of leading AI platforms with full customization and ownership.",
    points: [
      "ChatGPT-like conversational AI",
      "Image & content generation systems",
      "Private model hosting",
      "Enhanced data security & compliance",
    ],
  },
  {
    id: 3,
    title: "Model Integration and Deployment",
    desc: "Embed AI into your apps and workflows with seamless production deployment.",
    points: [
      "API & SDK integrations",
      "Enterprise system connectivity",
      "CI/CD and MLOps setup",
      "Performance monitoring",
    ],
  },
  {
    id: 4,
    title: "Upgrade and Maintenance",
    desc: "Ensure long-term reliability with continuous improvements and monitoring.",
    points: [
      "Model retraining & optimization",
      "Version upgrades",
      "Bug fixes & reliability checks",
      "Cost & speed optimization",
    ],
  },
  {
    id: 5,
    title: "AI Model Fine-Tuning",
    desc: "Increase accuracy and domain intelligence with targeted refinements.",
    points: [
      "Domain adaptation",
      "Prompt optimization",
      "Human-in-the-loop validation",
      "Response quality improvement",
    ],
  },
  {
    id: 6,
    title: "AI Strategy & Consulting",
    desc: "Define the right roadmap to adopt generative AI across your organization with maximum ROI and minimum risk.",
    points: [
      "AI readiness assessment",
      "Use case discovery & prioritization",
      "Architecture & tooling guidance",
      "Governance, risk & compliance planning",
    ],
  },
];

export default function GenerativeServices() {
  const [active, setActive] = useState(2);

  const current = services.find((s) => s.id === active);

  return (
    <section className="w-full py-20 bg-gradient-to-b from-zinc-50 via-white to-zinc-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* ================= HEADER ================= */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          {/* badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-900/20 text-cyan-900 text-sm mb-2">
            <span className="h-2 w-2 rounded-full bg-cyan-700" />
            Generative AI Services
          </div>

          {/* title */}
          <h2 className="text-4xl md:text-5xl font-semibold text-black leading-tight">
            End-to-End Generative AI
            <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Built for Enterprise Scale
            </span>
          </h2>

          {/* description */}
          <p className="mt-3 text-gray-700 text-lg leading-relaxed">
            From strategy and model design to deployment and optimization, we
            help organizations unlock real business value with secure, scalable,
            and production-ready AI solutions.
          </p>
        </div>

        <div className="rounded-3xl overflow-hidden grid lg:grid-cols-2 border border-white/10 bg-white/[0.02] backdrop-blur">
          {/* ================= LEFT ================= */}
          <div className="relative bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700 p-10">
            {/* glow */}
            <div className="absolute inset-0 bg-black/10" />

            <div className="relative space-y-6 h-full overflow-y-auto pr-4">
              {services.map((item, index) => {
                const isActive = active === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => setActive(item.id)}
                    className="w-full text-left group"
                  >
                    <div className="flex items-center gap-4">
                      {/* number */}
                      <span
                        className={`font-semibold transition ${
                          isActive
                            ? "text-white"
                            : "text-white/60 group-hover:text-white"
                        }`}
                      >
                        {String(index + 1).padStart(2, "0")}.
                      </span>

                      {/* title */}
                      <span
                        className={`font-semibold transition ${
                          isActive
                            ? "text-white"
                            : "text-white/70 group-hover:text-white"
                        }`}
                      >
                        {item.title}
                      </span>
                    </div>

                    {/* active indicator */}
                    <div className="mt-4 h-[2px] w-full bg-white/20 overflow-hidden">
                      <div
                        className={`h-full bg-white transition-all duration-500 ${
                          isActive ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ================= RIGHT ================= */}
          <div className="bg-[#0b0f19] p-7">
            <div className="max-w-xl">
              {/* icon */}
              <div className="mb-6 w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-[0_10px_30px_rgba(0,200,255,0.35)]">
                <span className="text-white text-xl">✦</span>
              </div>

              {/* title */}
              <h3 className="text-3xl font-semibold text-white mb-4 leading-tight">
                {current?.title}
              </h3>

              {/* desc */}
              <p className="text-white/60 leading-relaxed text-lg">
                {current?.desc}
              </p>

              {/* divider */}
              <div className="my-6 h-px bg-white/10" />

              {/* points */}
              <ul className="space-y-4">
                {current?.points?.map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/80">
                    <div className=" h-5 w-5 rounded-md bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-xs shadow">
                      ✓
                    </div>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
