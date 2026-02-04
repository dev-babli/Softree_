"use client";

import React from "react";

type HireItem = {
  title: string;
  icon: string;
};

const hireItems: HireItem[] = [
  {
    title: "PowerApps Experts",
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/powerapps.svg",
  },
  {
    title: "Power BI Experts",
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/powerbi.svg",
  },
  {
    title: "ReactJS Engineers",
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/react.svg",
  },
  {
    title: "Flutter Engineers",
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/flutter.svg",
  },
  {
    title: "NodeJS Engineers",
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/nodedotjs.svg",
  },
  { title: "Web Engineers", icon: "https://api.iconify.design/mdi/web.svg" },
  {
    title: "Mobile App Engineers",
    icon: "https://api.iconify.design/mdi/cellphone.svg",
  },
  {
    title: "AI Engineers",
    icon: "https://api.iconify.design/mdi/robot-outline.svg",
  },
];

export default function HireExperts() {
  return (
    <section className="relative py-10 bg-gradient-to-b from-zinc-50 via-white to-zinc-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="max-w-3xl mb-7">
          <h2 className="text-4xl md:text-5xl font-semibold mb-6 leading-tight text-zinc-900">
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Dedicated Experts
            </span>{" "}
            for Modern Digital Platforms
          </h2>

          <p className="text-lg text-zinc-600">
            Carefully curated engineers and specialists delivering secure,
            scalable, and enterprise-ready solutions.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {hireItems.map((item) => (
            <div
              key={item.title}
              className="
        group relative overflow-hidden
        rounded-3xl
        p-10

        /* 👇 blue-gray surface */
        bg-gradient-to-b from-slate-50 via-white to-blue-50/40

        /* border */
        border border-slate-200

        /* premium depth */
        shadow-[0_8px_25px_-8px_rgba(0,0,0,0.08)]

        transition-all duration-500
        hover:-translate-y-2
        hover:shadow-[0_30px_70px_-15px_rgba(37,99,235,0.25)]
        hover:border-blue-300
      "
            >
              {/* ===== Hover blue fill (bottom → top) ===== */}
              <div
                className="
          absolute inset-0
          bg-gradient-to-t from-blue-600 to-cyan-500
          scale-y-0 group-hover:scale-y-100
          origin-bottom
          transition-transform duration-500
        "
              />

              {/* ===== CONTENT ===== */}
              <div className="relative z-10">
                {/* ICON */}
                <div className="mb-8">
                  <div
                    className="
              w-16 h-16 rounded-2xl flex items-center justify-center
              bg-blue-100 border border-blue-200
              group-hover:bg-white/20
              transition
            "
                  >
                    <img
                      src={item.icon}
                      alt={item.title}
                      className="
                w-8 h-8
                group-hover:brightness-0 group-hover:invert
                transition
              "
                    />
                  </div>
                </div>

                {/* TEXT */}
                <h3
                  className="
            text-lg font-semibold leading-snug
            text-slate-900
            group-hover:text-white
            transition
          "
                >
                  {item.title}
                </h3>

                {/* ACCENT LINE */}
                <div
                  className="
            mt-4 h-[2px] w-12
            bg-gradient-to-r from-blue-500 to-transparent
            group-hover:from-white group-hover:w-24
            transition-all
          "
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
