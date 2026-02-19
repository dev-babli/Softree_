"use client";

import React from "react";
import {
  ClipboardCheck,
  Puzzle,
  Users,
  Lightbulb,
  ShieldCheck,
  Rocket,
  LucideIcon,
} from "lucide-react";

/* ================= TYPES ================= */

type FeatureCardProps = {
  icon: LucideIcon;
  title: string;
  desc: string;
};

/* ================= DATA ================= */

const topCards: FeatureCardProps[] = [
  {
    icon: ClipboardCheck,
    title: "Production-Ready GenAI",
    desc: "Move from experimentation to real-world deployment fast. We design generative AI systems that deliver measurable value, integrate with business workflows, and scale securely across the enterprise.",
  },
  {
    icon: Puzzle,
    title: "Context-Aware Integration",
    desc: "Connect large language models with your knowledge bases, applications, and data pipelines using RAG, APIs, and secure orchestration patterns.",
  },
];

const bottomCards: FeatureCardProps[] = [
  {
    icon: Users,
    title: "Human + AI Collaboration",
    desc: "Empower teams with copilots and assistants that augment expertise, accelerate productivity, and keep humans in control of critical decisions.",
  },
  {
    icon: Lightbulb,
    title: "Smarter Decision Intelligence",
    desc: "Transform information into insight with systems that summarize, reason, recommend actions, and continuously learn from interactions.",
  },
  {
    icon: Rocket,
    title: "Scalable AI Innovation",
    desc: "Adopt modern model strategies, prompt architectures, and evaluation frameworks that grow with your organization.",
  },
  {
    icon: ShieldCheck,
    title: "Responsible & Governed AI",
    desc: "Ensure reliability with guardrails, monitoring, compliance controls, and cost governance built for enterprise trust.",
  },
];

/* ================= COMPONENT ================= */

export default function WhyChooseUs() {
  return (
    <section className="py-25 bg-gradient-to-b from-zinc-50 via-white to-zinc-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* ================= TOP SECTION ================= */}
        <div className="grid lg:grid-cols-3 gap-12 items-stretch">
          {/* LEFT HEADING */}
          <div className="flex">
            <div className="my-auto max-w-xl">
              {/* eyebrow */}
              <p className="text-sm font-semibold uppercase tracking-widest text-purple-600 mb-4">
                Why Leading Enterprises Choose Us
              </p>

              {/* headline */}
              <h2 className="text-3xl md:text-5xl font-semibold leading-tight text-slate-900">
                Your Trusted Partner for{" "}
                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent font-bold">
                  Generative AI Transformation
                </span>
              </h2>

              {/* description */}
              <p className="mt-5 text-lg text-slate-600">
                We architect, deploy, and scale generative AI solutions that
                enhance human capability, streamline operations, and deliver
                secure, measurable business outcomes.
              </p>
            </div>
          </div>

          {/* RIGHT TWO CARDS */}
          <div className="lg:col-span-2 grid md:grid-cols-2 gap-8 h-full">
            {topCards.map((item, i) => (
              <FeatureCard key={i} {...item} />
            ))}
          </div>
        </div>

        {/* ================= BOTTOM SECTION ================= */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
          {bottomCards.map((item, i) => (
            <FeatureCard key={i} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= REUSABLE CARD ================= */

function FeatureCard({ icon: Icon, title, desc }: FeatureCardProps) {
  return (
    <div
      className="group rounded-3xl p-8 text-white bg-gradient-to-br from-blue-900 to-indigo-800
 shadow-lg hover:-translate-y-2 transition duration-300"
    >
      <Icon className="w-8 h-8 text-emerald-300 mb-6" />

      <h3 className="text-xl font-semibold mb-3">{title}</h3>

      <p className="text-emerald-100/80 leading-relaxed">{desc}</p>
    </div>
  );
}
