"use client";

import {
  ShieldCheck,
  Lightbulb,
  Users,
  Handshake,
  UserCheck,
  Award,
  ArrowRight,
} from "lucide-react";

const values = [
  {
    title: "Integrity",
    desc: "We act with transparency, honesty, and uncompromising ethics in everything we do.",
    icon: ShieldCheck,
  },
  {
    title: "Innovation",
    desc: "We challenge conventions and build forward-thinking solutions that create real impact.",
    icon: Lightbulb,
  },
  {
    title: "Client Success",
    desc: "Our success is measured by the growth, trust, and outcomes we deliver to clients.",
    icon: Users,
  },
  {
    title: "Collaboration",
    desc: "We believe the strongest results come from open minds, teamwork, and shared goals.",
    icon: Handshake,
  },
  {
    title: "People First",
    desc: "We empower talent, nurture potential, and create space for people to thrive.",
    icon: UserCheck,
  },
  {
    title: "Excellence",
    desc: "We hold ourselves to the highest standards—always raising the bar.",
    icon: Award,
  },
];

export default function InspiredByOurValues() {
  return (
    <section className=" text-black py-28 ">
      <div className="max-w-7xl mx-auto px-6">
        {/* ===== HEADER ===== */}
        <div className="relative mb-20 max-w-3xl mx-auto text-center">
          {/* Eyebrow */}
          <span
            className="
      inline-block mb-6
      px-5 py-2
      rounded-full
      bg-gradient-to-r from-cyan-500/15 to-blue-500/15
      border border-cyan-400/20
      text-cyan-400
      text-xs font-semibold
      uppercase tracking-[0.25em]
      backdrop-blur-sm
    "
          >
            What drives us
          </span>

          {/* Heading */}
          <h2
            className="
      text-4xl md:text-5xl font-bold leading-tight mb-6
      bg-gradient-to-r from-cyan-600 via-blue-500 to-indigo-600
      bg-clip-text text-transparent
    "
          >
            Values That Define Our Work
          </h2>

          {/* Sub-header */}
          <p
            className="
      text-base md:text-lg
      text-gray-600
      leading-relaxed
      max-w-2xl mx-auto
    "
          >
            Our values guide every decision we make—from how we collaborate with
            clients to how we build, deliver, and support digital solutions at
            scale.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {values.map((item, i) => {
            const Icon = item.icon;

            return (
              <div
                key={i}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-3xl
                  bg-white
                    bg-white

    border border-white/10
    backdrop-blur-2xl
    shadow-[0_40px_120px_rgba(0,0,0,0.75)]
                
                  p-10
                  transition-all duration-500
                  hover:-translate-y-2
                  hover:shadow-[0_30px_80px_rgba(255,255,255,0.12)]
                "
              >
                {/* GLASS SHEEN */}
                <span
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-gradient-to-br
                    from-white/10
                    via-transparent
                    to-transparent
                    opacity-0
                    group-hover:opacity-100
                    transition duration-500
                  "
                />

                {/* STRONG SOLID BOTTOM BORDER */}
                <span
                  className="
    pointer-events-none
    absolute
    bottom-0
    left-0
    w-full
    h-[6px]
    bg-white
    transition-all
    duration-300
    scale-x-0
    origin-left
    group-hover:scale-x-100
  "
                />

                {/* ICON */}
                <div className="relative z-10 mb-8">
                  <div
                    className="
      w-16 h-16
      rounded-2xl
      flex items-center justify-center

      bg-gradient-to-br from-cyan-500 to-blue-600
      text-white

      shadow-[0_10px_25px_rgba(37,99,235,0.35),0_0_35px_rgba(37,99,235,0.25)]

      group-hover:scale-110
      transition-transform duration-300
    "
                  >
                    <Icon size={26} strokeWidth={1.8} />
                  </div>
                </div>

                {/* ===== CONTENT ===== */}
                <div className="relative z-10 space-y-3">
                  {/* TITLE */}
                  <h4
                    className="
      relative
      text-xl font-semibold
      text-slate-900
      tracking-tight
      pl-5
    "
                  >
                    {/* accent bar */}
                    <span
                      className="
        absolute
        left-0 top-1/2
        -translate-y-1/2
        h-5 w-[3px]
        rounded-full
        bg-gradient-to-b
        from-cyan-500
        to-blue-600
      "
                    />

                    {item.title}
                  </h4>

                  {/* DESCRIPTION */}
                  <p
                    className="
      text-sm
      text-slate-600
      leading-relaxed
      group-hover:text-slate-700
      transition-colors
    "
                  >
                    {item.desc}
                  </p>
                </div>

                {/* AMBIENT SOFT GLOW */}
                <div
                  className="
                    pointer-events-none
                    absolute
                    -bottom-24
                    -right-24
                    w-72
                    h-72
                    rounded-full
                    bg-white/10
                    blur-3xl
                    opacity-0
                    group-hover:opacity-100
                    transition duration-700
                  "
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
