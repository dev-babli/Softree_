"use client";

import { useEffect, useState } from "react";
import {
  CheckCircle,
  Workflow,
  Database,
  Settings,
  Layers,
} from "lucide-react";

const items = [
  {
    title: "Custom Power Apps Development",
    icon: Layers,
    image: "/images/power-apps/custom.png",
    desc: "Tailored enterprise apps built for productivity and faster internal operations.",

    points: ["Approval systems", "Inspection apps", "Internal tools"],

    challenges: ["Manual spreadsheets", "Slow approvals", "Disconnected teams"],
  },

  {
    title: "Business Process Automation",
    icon: Workflow,
    image: "/images/power-apps/business.png",
    desc: "Automate repetitive tasks with intelligent workflows and Power Automate.",

    points: ["Faster approvals", "Reduced errors", "Process transparency"],

    challenges: ["Manual handoffs", "Human mistakes", "Delayed processes"],
  },

  {
    title: "Enterprise Dataverse Design",
    icon: Database,
    image: "/images/power-apps/data.png",
    desc: "Secure, scalable and centralized data architecture for enterprise systems.",

    points: [
      "Microsoft 365 integration",
      "SQL Server sync",
      "API connectivity",
    ],

    challenges: ["Data silos", "Duplicate records", "Poor reporting"],
  },

  {
    title: "Modernization & Support",
    icon: Settings,
    image: "/images/power-apps/modern.png",
    desc: "Upgrade legacy apps and continuously optimize performance and security.",

    points: ["App enhancements", "Performance tuning", "Security & roles"],

    challenges: ["Outdated systems", "Slow performance", "Security risks"],
  },
];

export default function PremiumSlider() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false); // ⭐ new

  /* ================= AUTO SLIDE ================= */
  useEffect(() => {
    if (isPaused) return; // ⭐ stop when hovering

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [isPaused]); // ⭐ depend on pause

  return (
    <section className="relative py-10 overflow-hidden bg-gradient-to-b from-zinc-50 via-white to-zinc-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* ========= HEADER ========= */}
        <div className="text-center mb-1">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
            What We Do with Power Apps
          </h2>

          <p className="text-gray-600 mt-2 text-lg">
            Enterprise-grade solutions that streamline business processes
          </p>
        </div>

        {/* ========= SLIDER ========= */}
        <div
          className="relative overflow-hidden py-12"
          onMouseEnter={() => setIsPaused(true)} // ⭐ pause
          onMouseLeave={() => setIsPaused(false)} // ⭐ resume
        >
          {/* ================= SLIDES ================= */}
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {items.map((item, i) => {
              const Icon = item.icon;

              return (
                <div key={i} className="min-w-full px-6">
                  {/* ===== PREMIUM SPLIT CARD ===== */}
                  <div
                    className="
    group
    grid md:grid-cols-2
    items-stretch
    rounded-[28px]
    min-h-[120px]

 bg-gradient-to-r from-black via-[#4c1c02] to-black

    border border-white/10
    backdrop-blur-xl
    text-white

    overflow-hidden
    transition-all duration-500
    hover:-translate-y-1
    hover:shadow-2xl hover:shadow-orange-950/40
  "
                  >
                    {/* ================= LEFT CONTENT ================= */}
                    <div className="flex flex-col justify-center px-10 py-10 md:px-14 md:py-14">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center">
                          <Icon className="w-7 h-7 text-white" />
                        </div>

                        <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-white drop-shadow-[0_2px_8px_rgba(249,115,22,0.35)]">
                          {item.title}
                        </h3>
                      </div>

                      <p className="text-orange-100/90 text-base mb-8 leading-relaxed max-w-md">
                        {item.desc}
                      </p>

                      <div className="grid grid-cols-2 gap-8">
                        {/* SOLUTIONS */}
                        <div>
                          <p className="text-xs uppercase tracking-wide text-orange-200 mb-3">
                            Solutions
                          </p>

                          <ul className="space-y-2">
                            {item.points.map((p, idx) => (
                              <li
                                key={idx}
                                className="flex gap-2 text-sm text-white/90"
                              >
                                <CheckCircle className="w-4 h-4 text-emerald-300 mt-0.5" />
                                {p}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* CHALLENGES */}
                        {item.challenges && (
                          <div>
                            <p className="text-xs uppercase tracking-wide text-orange-200 mb-3">
                              Challenges
                            </p>

                            <ul className="space-y-2">
                              {item.challenges.map((c, idx) => (
                                <li
                                  key={idx}
                                  className="flex gap-2 text-sm text-white/70"
                                >
                                  <span className="text-red-300">⚡</span>
                                  {c}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* ================= RIGHT IMAGE ================= */}
                    <div className="relative">
                      <img
                        src={item.image}
                        alt=""
                        className="
                          absolute inset-0
                          w-full h-full
                          object-cover
                          group-hover:scale-105
                          transition duration-500
                        "
                      />

                      <div className="absolute inset-0 bg-gradient-to-l from-black/40 via-black/10 to-transparent" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ================= DOTS ================= */}
          <div className="flex justify-center gap-3 mt-6">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`transition-all rounded-full ${
                  index === i
                    ? "w-8 h-2 bg-orange-600"
                    : "w-2 h-2 bg-orange-300 hover:bg-orange-500"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
