"use client";

import Link from "next/link";
import { ShieldCheck, BrainCircuit, Rocket, Scale } from "lucide-react";

const cards = [
  {
    title: "AI Risk & Trust Readiness",
    description:
      "Prepare your AI initiatives for real-world adoption with robust risk assessment, compliance checks, and trust frameworks. We ensure your models are secure, explainable, and production-ready while aligning with regulatory and business requirements.",

    icon: ShieldCheck,
    link: "/ai-risk-trust-readiness",
    featured: true, // ⭐ highlighted card
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
];

export default function AIBannerSection() {
  return (
    <section
      id="Banner"
      className="bg-gradient-to-b from-zinc-50 via-white to-zinc-50 py-10"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* ================= HEADING ================= */}
        <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-semibold text-zinc-900 mb-10">
          Build, Scale, and Secure AI That Delivers Results
        </h2>

        {/* ================= GRID ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 auto-rows-fr">
          {cards.map((card) => {
            const Icon = card.icon;
            const isFeatured = card.featured;

            return (
              <div
                key={card.title}
                className={`
          group relative rounded-3xl p-8
          flex flex-col justify-between
          overflow-hidden
          transition-all duration-500

          ${
            isFeatured
              ? `
              lg:col-span-2
              bg-gradient-to-r from-black via-[#0f2f7a] to-black 
              text-white
              shadow-[0_25px_70px_-15px_rgba(37,99,235,0.55)]
              hover:-translate-y-2
            `
              : `
              bg-white
              border-2 border-zinc-200
              shadow-sm
              hover:-translate-y-2
              hover:shadow-xl
            `
          }
        `}
              >
                {/* ===== HOVER FILL ANIMATION (non featured only) ===== */}
                {!isFeatured && (
                  <div
                    className="
              absolute inset-0
             bg-gradient-to-r from-black via-[#0f2f7a] to-black
              scale-y-0 group-hover:scale-y-100
              origin-bottom
              transition-transform duration-500 ease-out
              z-0
            "
                  />
                )}

                {/* ===== Featured Glow ===== */}
                {isFeatured && (
                  <div className="absolute -inset-10 bg-blue-500/30 blur-3xl opacity-40 pointer-events-none" />
                )}

                {/* ===== Badge ===== */}
                {isFeatured && (
                  <span className="absolute top-5 right-5 text-xs font-semibold px-3 py-1 rounded-full bg-white/20 backdrop-blur text-white z-10">
                    Recommended
                  </span>
                )}

                {/* ===== CONTENT ===== */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div
                    className={`
              w-14 h-14 flex items-center justify-center rounded-xl mb-6
              ${
                isFeatured
                  ? "bg-white/20 backdrop-blur"
                  : "bg-blue-50 border border-blue-100 group-hover:bg-white/20"
              }
            `}
                  >
                    <Icon
                      className={`
                w-7 h-7
                ${
                  isFeatured
                    ? "text-white"
                    : "text-blue-600 group-hover:text-white"
                }
                transition
              `}
                      strokeWidth={1.8}
                    />
                  </div>

                  {/* Title */}
                  <h3
                    className={`
              text-xl font-semibold mb-4 transition
              ${
                isFeatured
                  ? "text-white"
                  : "text-zinc-900 group-hover:text-white"
              }
            `}
                  >
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p
                    className={`
              text-sm leading-relaxed transition
              ${
                isFeatured
                  ? "text-white/90"
                  : "text-zinc-600 group-hover:text-white/90"
              }
            `}
                  >
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
