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
    title: "Rapid Value Realization",
    desc: "Accelerate from concept to measurable outcomes in weeks. Our structured delivery approach enables fast validation, minimizes risk, and builds executive confidence for broader AI adoption.",
  },
  {
    icon: Puzzle,
    title: "Seamless Enterprise Integration",
    desc: "Embed intelligent agents into your existing platforms, data ecosystems, and workflows with secure, scalable architectures designed for long-term flexibility and growth.",
  },
];

const bottomCards: FeatureCardProps[] = [
  {
    icon: Users,
    title: "Orchestrated Collaboration",
    desc: "Multiple AI agents work together across functions, automating decisions and coordinating complex processes with precision.",
  },
  {
    icon: Lightbulb,
    title: "Predictive Intelligence",
    desc: "Move from reactive operations to forward-looking strategies with systems that anticipate challenges and recommend optimal actions.",
  },
  {
    icon: Rocket,
    title: "Enterprise-Grade Expertise",
    desc: "Leverage deep domain experience, proven methodologies, and modern AI engineering practices to scale innovation confidently.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted & Measurable Outcomes",
    desc: "Deliver transformation with transparency, governance, and KPIs that clearly demonstrate business impact.",
  },
];

/* ================= COMPONENT ================= */

export default function WhyChooseUs() {
  return (
    <section className=" py-15 bg-gradient-to-b from-zinc-50 via-white to-zinc-50">
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
                  Agentic AI Transformation
                </span>
              </h2>

              {/* description */}
              <p className="mt-5 text-lg text-slate-600">
                We architect, deploy, and scale autonomous AI systems that align
                with your business strategy — unlocking efficiency, accelerating
                decisions, and delivering measurable competitive advantage.
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
      className="group rounded-3xl p-8 text-white bg-gradient-to-r from-black via-[#0f2f7a] to-black
 shadow-lg hover:-translate-y-2 transition duration-300"
    >
      <Icon className="w-8 h-8 text-emerald-300 mb-6" />

      <h3 className="text-xl font-semibold mb-3">{title}</h3>

      <p className="text-emerald-100/80 leading-relaxed">{desc}</p>
    </div>
  );
}
