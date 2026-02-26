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
    rounded-3xl
    p-[1px]
    bg-gradient-to-br
    from-slate-200
    via-slate-100
    to-slate-200
    transition-all
    duration-700
    hover:from-cyan-500/60
    hover:via-blue-500/60
    hover:to-indigo-500/60
  "
              >
                {/* INNER CARD */}
                <div
                  className="
      relative
      h-full
      rounded-3xl
      bg-white/80
      backdrop-blur-xl
      border border-white/40
      p-10
      overflow-hidden
      shadow-[0_15px_40px_rgba(0,0,0,0.06)]
      transition-all
      duration-500
      group-hover:-translate-y-3
      group-hover:shadow-[0_35px_80px_rgba(0,0,0,0.15)]
    "
                >
                  {/* Subtle Default Ambient Glow */}
                  <div
                    className="
        pointer-events-none
        absolute
        -bottom-20
        -right-20
        w-72
        h-72
        rounded-full
        bg-blue-100/40
        blur-3xl
        opacity-60
        transition
        duration-700
        group-hover:opacity-100
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
          shadow-[0_12px_30px_rgba(37,99,235,0.30)]
          transition-all duration-500
          group-hover:scale-110
          group-hover:rotate-3
        "
                    >
                      <Icon size={26} strokeWidth={1.8} />
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="relative z-10 space-y-4">
                    <h4 className="text-xl font-semibold text-slate-900 tracking-tight transition duration-300 group-hover:text-blue-700">
                      {item.title}
                    </h4>

                    <p className="text-sm text-slate-600 leading-relaxed transition duration-300 group-hover:text-slate-700">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
