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
    <section className="bg-black text-white py-24">
      <div className="container mx-auto px-6">
        <div className="mb-14">
          <p className="uppercase tracking-widest text-sm text-cyan-400 mb-3">
            What drives us
          </p>
          <h2 className="text-3xl md:text-4xl font-bold">
            Values That Define Our Work
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((item, i) => {
            const Icon = item.icon;

            return (
              <a
                key={i}
                href="#"
                className="group relative overflow-hidden rounded-3xl 
                   bg-neutral-900/80 backdrop-blur-xl
                   border border-white/10
                   p-8
                   transition-all duration-500
                   hover:-translate-y-3 hover:scale-[1.02]
                   hover:shadow-[0_30px_80px_rgba(0,255,255,0.18)]"
              >
                {/* ===== Gradient Border Glow ===== */}
                <div
                  className="absolute inset-0 rounded-3xl 
                        bg-gradient-to-br from-cyan-500/30 via-transparent to-fuchsia-500/20
                        opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none"
                />

                {/* ===== Animated Noise / Texture ===== */}
                <div className="absolute inset-0 opacity-[0.04] bg-[url('/noise.png')] pointer-events-none" />

                {/* ===== Icon Badge ===== */}
                <div className="relative z-10 mb-8">
                  <div
                    className="w-20 h-20 rounded-2xl 
                          bg-gradient-to-br from-cyan-500/20 to-cyan-500/5
                          flex items-center justify-center
                          shadow-[0_0_40px_rgba(0,255,255,0.25)]
                          group-hover:scale-110 transition duration-500"
                  >
                    <Icon
                      size={42}
                      strokeWidth={1.5}
                      className="text-cyan-400"
                    />
                  </div>
                </div>

                {/* ===== Content ===== */}
                <div className="relative z-10">
                  <h4 className="text-2xl font-semibold mb-4 tracking-tight">
                    {item.title}
                  </h4>

                  <p className="text-neutral-400 leading-relaxed mb-10">
                    {item.desc}
                  </p>
                </div>

                {/* ===== HOVER BORDERS (LEFT | RIGHT | BOTTOM) ===== */}
                <div className="pointer-events-none">
                  {/* Bottom */}
                  <span
                    className="absolute bottom-0 left-1/2 h-[2px] w-0
               bg-gradient-to-r from-cyan-400 via-cyan-300 to-fuchsia-400
               blur-[1px]
               transition-all duration-500
               group-hover:w-full group-hover:left-0"
                  />

                  {/* Left */}
                  <span
                    className="absolute bottom-0 left-0 w-[2px] h-0
               bg-gradient-to-t from-cyan-400 via-cyan-300 to-transparent
               blur-[1px]
               transition-all duration-500
               group-hover:h-full"
                  />

                  {/* Right */}
                  <span
                    className="absolute bottom-0 right-0 w-[2px] h-0
               bg-gradient-to-t from-cyan-400 via-cyan-300 to-transparent
               blur-[1px]
               transition-all duration-500
               group-hover:h-full"
                  />
                </div>

                {/* ===== Ambient Glow Blob ===== */}
                <div
                  className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full 
                        bg-cyan-500/20 blur-3xl opacity-0
                        group-hover:opacity-100 transition duration-700"
                />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
