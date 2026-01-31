"use client";

import React from "react";

type HireItem = {
  title: string;
  icon: string;
};

const hireItems: HireItem[] = [
  { title: "PowerApps Experts", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/powerapps.svg" },
  { title: "Power BI Experts", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/powerbi.svg" },
  { title: "ReactJS Engineers", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/react.svg" },
  { title: "Flutter Engineers", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/flutter.svg" },
  { title: "NodeJS Engineers", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/nodedotjs.svg" },
  { title: "Web Engineers", icon: "https://api.iconify.design/mdi/web.svg" },
  { title: "Mobile App Engineers", icon: "https://api.iconify.design/mdi/cellphone.svg" },
  { title: "AI Engineers", icon: "https://api.iconify.design/mdi/robot-outline.svg" },
];

export default function HireExperts() {
  return (
    <section className="relative py-32 bg-black overflow-hidden">
      {/* BACKGROUND GRID */}
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* RADIAL GLOW */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-cyan-500/10 blur-[160px] -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="max-w-3xl mb-20">
          <h2 className="text-4xl md:text-5xl font-semibold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Dedicated Experts
            </span>{" "}
            for Modern Digital Platforms
          </h2>

          <p className="text-lg text-white/70">
            Carefully curated engineers and specialists delivering secure,
            scalable, and enterprise-ready solutions.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {hireItems.map((item) => (
            <div
              key={item.title}
              className="group relative rounded-3xl
                         bg-gradient-to-b from-white/[0.08] to-white/[0.02]
                         border border-white/10
                         backdrop-blur-xl
                         p-10
                         transition-all duration-700
                         hover:-translate-y-3
                         hover:shadow-[0_40px_90px_-25px_rgba(34,211,238,0.35)]"
            >
              {/* GLOW RING */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-700 bg-gradient-to-br from-cyan-500/20 to-blue-500/10 blur-xl" />

              {/* ICON HALO */}
              <div className="relative z-10 mb-8">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-black/40 border border-white/10">
                  <img
                    src={item.icon}
                    alt={item.title}
                    className="w-8 h-8 brightness-0 invert"
                  />
                </div>

                {/* HALO RING */}
                <div className="absolute -inset-3 rounded-2xl border border-cyan-400/20 blur-sm opacity-0 group-hover:opacity-100 transition duration-700" />
              </div>

              {/* TEXT */}
              <h3 className="relative z-10 text-lg font-medium text-white leading-snug">
                {item.title}
              </h3>

              {/* SOFT UNDERLINE */}
              <div className="relative z-10 mt-4 h-[2px] w-10 bg-gradient-to-r from-cyan-400/60 to-transparent" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
