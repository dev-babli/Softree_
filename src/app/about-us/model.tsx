"use client";

import {
  DollarSign,
  Users,
  Clock,
  Layers,
} from "lucide-react";

const models = [
  {
    title: "Scope-Based Engagement",
    desc: "Ideal when requirements are finalized upfront. This approach ensures defined deliverables, controlled costs, and a clear execution roadmap with minimal uncertainty.",
    icon: DollarSign,
  },
  {
    title: "Dedicated Product Squad",
    desc: "A committed team aligned entirely to your product vision. Designed for long-term collaboration, rapid iterations, and continuous innovation.",
    icon: Users,
    active: true,
  },
  {
    title: "Adaptive Delivery Model",
    desc: "Built for initiatives that evolve over time. This model allows you to scale effort dynamically while maintaining transparency and delivery momentum.",
    icon: Clock,
  },
  {
    title: "Blended Engagement",
    desc: "A flexible combination of structured planning and adaptive execution—giving you stability where needed and agility where it matters most.",
    icon: Layers,
  },
];

export default function EngagementModels() {
  return (
    <section className="relative bg-gradient-to-b from-[#121212] via-[#0a0a0a] to-black text-white">
      <div className="container mx-auto px-6 py-24">

        {/* ===== Heading ===== */}
        <div className="max-w-4xl mb-20">
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight mb-6">
            Engagement Models That Adapt <br />
            to Your Business Vision
          </h1>

          <p className="text-lg text-neutral-300 leading-relaxed max-w-3xl">
            Every organization operates differently—and your delivery model
            should reflect that. Our engagement approaches are designed to align
            with your strategy, pace, and level of involvement while keeping
            execution efficient and outcomes measurable.
          </p>
        </div>

        {/* ===== Models Grid ===== */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {models.map((item, i) => {
            const Icon = item.icon;

            return (
              <div key={i} className="relative text-center px-6">

                {/* Divider (desktop only) */}
                {i !== 0 && (
                  <span className="hidden lg:block absolute left-0 top-12 h-48 w-px bg-white/20" />
                )}

                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                    <Icon size={28} className="text-neutral-800" />
                  </div>
                </div>

                {/* Title */}
                <h3
                  className={`text-lg font-semibold mb-4 ${
                    item.active ? "underline underline-offset-4" : ""
                  }`}
                >
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-neutral-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
