"use client";

import { useState } from "react";
import { Zap, Users, TrendingUp, Heart } from "lucide-react";
const items = [
  {
    title: "Faster Time to Market",
    description:
      "Launch your product quicker with an experienced MVP team that removes delays, reduces rework, and delivers production-ready code without compromising quality.",
    icon: Zap,
  },
  {
    title: "Extended Engineering Power",
    description:
      "Instantly strengthen your team with the right skills, senior expertise, and scalable resources tailored to your product goals and timelines.",
    icon: Users,
  },
  {
    title: "Built for Long-Term Growth",
    description:
      "We design MVPs with scalability in mind, ensuring your architecture, tech stack, and decisions support future expansion—not short-term fixes.",
    icon: TrendingUp,
  },
  {
    title: "Startup-First Mindset",
    description:
      "Having built products ourselves, we deeply understand startup constraints, risks, and pressures—allowing us to guide decisions with empathy and clarity.",
    icon: Heart,
  },
];

export default function MvpBenefitsAccordion() {
  const [active, setActive] = useState<number | null>(0);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-black via-[#020d1a] to-black
  text-white">
      <div className="relative mx-auto max-w-7xl px-6 py-28">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            Benefits of Our MVP { }
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Development Services
            </span>
          </h2>

          <p className="mt-6 text-base leading-relaxed text-neutral-300">
            Building an MVP is a critical step toward validating your idea and
            entering the market. With the right development partner, you can
            reduce risk, accelerate delivery, and lay a strong foundation for
            future growth.
          </p>
        </div>

        <div className="mt-20 border-t border-white/10" />

        {/* Accordion */}
        <ul className="mt-2 divide-y divide-white/10">
          {items.map((item, index) => {
            const open = active === index;
            const Icon = item.icon;

            return (
              <li
                key={index}
                className="relative group transition-transform duration-300 hover:translate-x-[2px]"
              >
                {/* Hover / Active Line */}
                <span
                  className={`
                    pointer-events-none
                    absolute left-0 right-0 top-0
                    h-[3px]
                    bg-blue-500
                    origin-left
                    transition-transform duration-300 ease-out
                    ${open ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}
                  `}
                />

                {/* Row */}
                <button
                  onClick={() => setActive(open ? null : index)}
                  className="
                    flex w-full items-center justify-between py-10 text-left
                    transition-all duration-300
                    hover:bg-white/[0.035]
                  "
                >
                  <div className="flex items-center gap-4">
                    {/* Number */}
                    <span
                      className={`
      flex h-8 w-8 items-center justify-center
      rounded-full
      text-sm font-semibold
      transition-all duration-300
      ${
        open
          ? "bg-blue-500 text-white"
          : "bg-white/10 text-white/70 group-hover:bg-blue-500/20"
      }
    `}
                    >
                      {index + 1}
                    </span>

                    {/* Title */}
                    <span className="text-xl font-medium tracking-tight">
                      {item.title}
                    </span>
                  </div>

                  {/* Plus / Minus */}
                  <span
                    className="
                      flex h-11 w-11 items-center justify-center
                      rounded-full
                      border border-white/25
                      text-white
                      transition-all duration-300
                      hover:bg-blue-500/10 hover:border-blue-400/40
                    "
                  >
                    {open ? (
                      <svg width="14" height="2" viewBox="0 0 14 2">
                        <rect
                          width="14"
                          height="2"
                          rx="1"
                          fill="currentColor"
                        />
                      </svg>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 14 14">
                        <rect
                          x="6"
                          width="2"
                          height="14"
                          rx="1"
                          fill="currentColor"
                        />
                        <rect
                          y="6"
                          width="14"
                          height="2"
                          rx="1"
                          fill="currentColor"
                        />
                      </svg>
                    )}
                  </span>
                </button>

                {/* Floating Card */}
                {open && (
                  <div className="relative pb-14">
                    <div
                      className="
                        ml-auto mt-6 max-w-xl
                        rounded-2xl
                        bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700
                        p-8
                        shadow-[0_30px_80px_rgba(59,130,246,0.6)]
                        border border-blue-300/40
                        animate-[fadeSlide_0.35s_ease-out]
                      "
                    >
                      <div className="flex gap-6 items-start">
                        {/* Icon */}
                        <div
                          className="
                            flex h-12 w-12 shrink-0 items-center justify-center
                            rounded-xl
                            bg-white/20
                            border border-white/40
                          "
                        >
                          <Icon
                            className="h-6 w-6 text-white"
                            strokeWidth={1.75}
                          />
                        </div>

                        {/* Text */}
                        <p className="text-sm leading-relaxed text-white">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
