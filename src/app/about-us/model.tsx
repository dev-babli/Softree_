"use client";

import { DollarSign, Users, Clock, Layers } from "lucide-react";

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
    <section className="relative text-black">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* ===== HEADER ===== */}
        <div className="relative max-w-4xl mx-auto mb-20 text-center">
          {/* Eyebrow */}
          <span
            className="
      inline-block mb-6
      px-5 py-2
      rounded-full
      bg-gradient-to-r from-cyan-500/20 to-blue-500/20
      border border-cyan-400/20
      text-cyan-400
      text-xs font-semibold
      uppercase tracking-[0.3em]
      backdrop-blur-sm
    "
          >
            Engagement Models
          </span>

          {/* Title */}
          <h2
            className="
      text-4xl md:text-5xl font-bold leading-tight mb-6
      bg-gradient-to-r from-cyan-500 via-blue-700 to-indigo-500
      bg-clip-text text-transparent
    "
          >
            Engagement Models That Adapt <br />
            to Your Business Vision
          </h2>

          {/* Subheader */}
          <p className="text-lg text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Every organization operates differently—and your delivery model
            should reflect that. Our engagement approaches align with your
            strategy, pace, and level of involvement while keeping outcomes
            measurable.
          </p>
        </div>

        {/* ===== MODELS WRAPPER ===== */}
        <div
          className="
    relative
    rounded-3xl
    px-4 sm:px-8 lg:px-0
    py-8
    overflow-hidden

  bg-white

    border border-white/10
    backdrop-blur-2xl
    shadow-[0_40px_120px_rgba(0,0,0,0.75)]
  "
        >
          {/* Subtle radial light */}
          <div
            className="
      pointer-events-none
      absolute -top-1/2 left-1/2
      h-[600px] w-[600px]
      -translate-x-1/2
      rounded-full
      bg-[radial-gradient(circle,rgba(255,255,255,0.08),transparent_70%)]
    "
          />

          {/* Grid with dividers */}
          <div
            className="
      relative
      grid
      grid-cols-1
      md:grid-cols-2
      lg:grid-cols-4
      divide-y
      md:divide-y-0
      md:divide-x
      divide-white/10
    "
          >
            {models.map((item, i) => {
              const Icon = item.icon;

              return (
                <div
                  key={i}
                  className="
    group
    relative
    px-10
    py-10
    text-left
    rounded-2xl
    transition-all duration-300

    bg-white
    border border-slate-200/70
    shadow-[0_15px_40px_-10px_rgba(15,23,42,0.12)]

    hover:-translate-y-1
    hover:shadow-[0_25px_60px_-10px_rgba(15,23,42,0.18)]
    hover:bg-slate-50
  "
                >
                  {/* ===== ICON ===== */}
                  <div className="mb-6">
                    <div
                      className="
        w-14 h-14
        rounded-xl
        flex items-center justify-center

        bg-gradient-to-br
        from-cyan-500
        to-blue-600

        text-white
        shadow-[0_10px_25px_rgba(37,99,235,0.35)]

        group-hover:scale-110
        transition-transform
      "
                    >
                      <Icon size={22} strokeWidth={1.8} />
                    </div>
                  </div>

                  {/* ===== TITLE ===== */}
                  <h3
                    className="
      relative
      text-lg
      font-semibold
      mb-4
      pb-3

      bg-gradient-to-r
      from-cyan-600
      to-blue-700
      bg-clip-text
      text-transparent
    "
                  >
                    {item.title}

                    <span
                      className="
        absolute left-0 bottom-0
        h-[2px] w-12
        bg-gradient-to-r
        from-cyan-500
        to-transparent
      "
                    />
                  </h3>

                  {/* ===== DESCRIPTION ===== */}
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
