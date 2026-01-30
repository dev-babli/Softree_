"use client";

import Link from "next/link";
import { ShieldCheck, BrainCircuit, Rocket, Scale } from "lucide-react";

const cards = [
  {
    title: "AI Risk & Trust Readiness",
    description:
      "Evaluate how secure, compliant, and reliable your AI systems are before they scale into real-world usage.",
    icon: ShieldCheck,
    link: "/ai-risk-trust-readiness",
  },
  {
    title: "AI-Powered Team Productivity",
    description:
      "Enable your teams to work smarter with AI-driven workflows, insights, and automation tailored to your business.",
    icon: BrainCircuit,
    link: "/ai-team-productivity",
  },
  {
    title: "Rapid AI Solution Engineering",
    description:
      "From concept to deployment, we help you build AI capabilities quickly using scalable and future-ready foundations.",
    icon: Rocket,
    link: "/rapid-ai-engineering",
  },
  {
    title: "Scalable AI Governance Frameworks",
    description:
      "Establish clear guardrails for ethical, compliant, and responsible AI adoption as your organization grows.",
    icon: Scale,
    link: "/ai-governance-frameworks",
  },
];

export default function AIBannerSection() {
  return (
    <section
      id="Banner"
      className="bg-gradient-to-b from-black via-neutral-950 to-black text-white py-24"
    >
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-semibold mb-16">
          Build, Scale, and Secure AI That Delivers Results
        </h2>

        {/* CARD GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.title}
                className="group bg-white/5 backdrop-blur-xl
                border border-white/10 rounded-2xl
                p-6 flex flex-col justify-between
                hover:border-blue-500/50 hover:bg-white/10
                transition-all duration-300"
              >
                {/* CONTENT */}
                <div>
                  <Icon
                    className="w-10 h-10 text-blue-400 mb-5"
                    strokeWidth={1.5}
                  />

                 <h3 className="text-lg font-semibold mb-3 leading-snug 
text-transparent bg-clip-text 
bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400">
  {card.title}
</h3>


                  <p className="text-sm text-gray-300">{card.description}</p>
                </div>

                {/* FOOTER */}
                <Link
                  href={card.link}
                  className="mt-6 inline-flex items-center gap-2
                  text-sm font-medium text-blue-400
                  hover:underline"
                >
                  Learn More →
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
