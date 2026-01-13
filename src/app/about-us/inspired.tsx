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
    <section className="bg-black text-white py-28">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="mb-16 max-w-2xl">
          <p className="uppercase tracking-widest text-sm text-gray-400 mb-4">
            What drives us
          </p>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Values That Define Our Work
          </h2>
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
                  bg-white/5
                  backdrop-blur-xl
                  border border-white/10
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
                <div className="relative z-10 mb-10">
                  <div
                    className="
                      w-20 h-20
                      rounded-2xl
                      flex items-center justify-center
                      bg-white/10
                      border border-white/20
                      transition duration-500
                      group-hover:scale-110
                      shadow-[0_0_30px_rgba(255,255,255,0.15)]
                    "
                  >
                    <Icon size={40} strokeWidth={1.5} className="text-white" />
                  </div>
                </div>

                {/* CONTENT */}
                <div className="relative z-10">
                  <h4 className="relative text-2xl font-semibold mb-5 tracking-tight">
                    <span
                      className="
        absolute
        -left-6
        top-1/2
        -translate-y-1/2
        h-6
        w-[2px]
        bg-gradient-to-b
        from-white
        to-gray-500
      "
                    />
                    {item.title}
                  </h4>

                  <p className="text-gray-400 leading-relaxed">{item.desc}</p>
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
