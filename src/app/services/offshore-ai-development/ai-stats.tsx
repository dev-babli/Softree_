import React from "react";
import { Users, Brain, Globe, Trophy, LucideIcon } from "lucide-react";
import { COUNTRIES_SERVED } from "@/lib/constants";

/* ================= TYPES ================= */

type Stat = {
  value: string;
  label: string;
  icon: LucideIcon;
};

/* ================= DATA ================= */

const stats: Stat[] = [
  { value: "100+", label: "AI and Data Engineers", icon: Users },
  { value: "75+", label: "AI / ML Models Delivered", icon: Brain },
  { value: COUNTRIES_SERVED, label: "Countries Served", icon: Globe },
  { value: "18+", label: "Years of Innovation", icon: Trophy },
];

/* ================= COMPONENT ================= */

export default function AIStats() {
  return (
    <section className="py-24 bg-gradient-to-b from-zinc-50 via-white to-zinc-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* ================= LEFT ================= */}
          <div className="max-w-xl">
            {/* eyebrow */}
            <p className="text-sm font-semibold uppercase tracking-widest text-purple-600 mb-5">
              Proven Expertise
            </p>

            <h4 className="text-3xl md:text-5xl font-semibold leading-tight text-slate-900">
              Power Your Next Leap with{" "}
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent font-bold">
                Agentic AI
              </span>{" "}
              Delivered by Proven Experts
            </h4>

            {/* support text */}
            <p className="mt-6 text-lg text-slate-600">
              From vision to value, we partner with enterprises to architect,
              deploy, and scale autonomous AI systems that unlock efficiency,
              accelerate decision-making, and create durable competitive
              advantage.
            </p>
          </div>

          {/* ================= RIGHT ================= */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((item, i) => {
              const Icon = item.icon;

              return (
                <div
                  key={i}
                  className="
                    relative
                    rounded-2xl
                    p-6
                    overflow-hidden
                    text-white
                   bg-gradient-to-r from-black via-[#0f2f7a] to-black
                    shadow-lg
                    hover:-translate-y-1
                    hover:shadow-2xl
                    transition duration-300
                  "
                >
                  {/* glow */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />

                  {/* icon */}
                  <Icon className="relative w-8 h-8 mb-4 text-white/90" />

                  {/* value */}
                  <h5 className="relative text-3xl md:text-4xl font-bold">
                    {item.value}
                  </h5>

                  {/* label */}
                  <p className="relative mt-2 text-white/80">{item.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
