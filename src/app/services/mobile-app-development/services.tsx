"use client";

import { useState } from "react";
import Image from "next/image";
import { Smartphone, Apple, Layers, Globe } from "lucide-react";

/* ================= DATA ================= */
const services = [
  {
    id: 1,
    title: "Android Application Development",
    icon: Smartphone,
    description:
      "Build scalable, secure, and high-performance Android applications tailored to enterprise needs.",
    bullets: [
      "Custom Android solutions",
      "Enterprise-grade security",
      "Scalable architecture",
    ],
    gradient: "from-indigo-500/20 via-purple-500/10 to-cyan-500/20",
    imageHeight: "h-[300px]",
    imageWidth: "w-full",
  },
  {
    id: 2,
    title: "iOS Application Development",
    icon: Apple,
    description:
      "Elegant and high-performance iOS applications built with modern Apple technologies.",
    bullets: [
      "Swift & SwiftUI development",
      "App Store compliant builds",
      "Performance optimized UI",
    ],
    gradient: "from-rose-500/20 via-pink-500/10 to-orange-500/20",
    imageHeight: "h-[340px]",
    imageWidth: "w-full",
  },
  {
    id: 3,
    title: "Flutter Application Development",
    icon: Smartphone,
    description: "Cross-platform mobile apps using a single Flutter codebase.",
    bullets: [
      "Single codebase",
      "Native-like performance",
      "Faster time-to-market",
    ],
    gradient: "from-sky-500/20 via-blue-500/10 to-indigo-500/20",
    imageHeight: "h-[280px]",
    imageWidth: "w-full",
  },
  {
    id: 4,
    title: "React Native Development",
    icon: Layers,
    description:
      "Cross-platform mobile apps built with React Native and modern tooling.",
    bullets: [
      "Reusable components",
      "Fast iteration cycles",
      "Scalable architecture",
    ],
    gradient: "from-emerald-500/20 via-teal-500/10 to-cyan-500/20",
    imageHeight: "h-[360px]",
    imageWidth: "w-full",
  },
  {
    id: 5,
    title: "Progressive Web Applications",
    icon: Globe,
    description:
      "Reliable, fast, and engaging PWAs that feel like native apps.",
    bullets: ["Offline support", "SEO-friendly", "Low maintenance"],
    gradient: "from-fuchsia-500/20 via-purple-500/10 to-indigo-500/20",
    imageHeight: "h-[320px]",
    imageWidth: "w-full",
  },
];

/* ================= COMPONENT ================= */
export default function ServicesShowcaseExactImage() {
  const [active, setActive] = useState(services[0]);

  return (
    <section className="relative overflow-hidden pb-24 py-12">
      {/* ================= SECTION HEADER ================= */}
      <div className="max-w-4xl mx-auto text-center mb-20">
        {/* Eyebrow */}
        <span
          className="inline-block mb-4 px-4 py-1.5 rounded-full
    text-xs uppercase tracking-[0.3em]
    text-cyan-100
    bg-cyan-400/10 border border-cyan-400/20"
        >
          What We Offer
        </span>

        {/* Title */}
        <h2 className="relative text-4xl md:text-5xl font-semibold text-white mb-6">
          Mobile App Development Services
          <span
            className="
    absolute left-0 -bottom-3 w-full h-[5px]
    bg-gradient-to-r
    from-transparent
    via-white/40
    to-transparent
    rounded-full
  "
          />
        </h2>

        {/* Description */}
        <p className="text-gray-400 text-base md:text-lg max-w-3xl mx-auto">
          Scalable, secure, and high-performance mobile solutions tailored to
          your business goals and user expectations.
        </p>
      </div>

      {/* ================= CONNECTED WRAPPER ================= */}
      <div className="relative max-w-7xl mx-auto px-6">
        {/* VERTICAL CONNECTOR LINE */}
        <div
          className="
        hidden lg:block
        absolute left-[420px] top-0 bottom-0 w-px
        bg-gradient-to-b from-transparent via-white/30 to-transparent
      "
        />

        <div className="grid lg:grid-cols-[420px_1fr] items-stretch gap-6">
          {/* ================= LEFT PANEL ================= */}
          <div
            className="
      relative p-6 rounded-3xl
      bg-gradient-to-br
        from-[#1b1b1b]
        via-[#121212]
        to-[#0b0b0b]
      backdrop-blur-xl
      border border-white/10
      shadow-[0_24px_80px_rgba(0,0,0,0.7)]
    "
          >
            <ul className="space-y-3">
              {services.map((service) => {
                const isActive = active.id === service.id;
                const Icon = service.icon;

                return (
                  <li key={service.id}>
                    <button
                      onClick={() => setActive(service)}
                      className={`
                group relative w-full text-left px-6 py-5 rounded-2xl
                transition-all duration-300
                ${
                  isActive
                    ? "bg-gradient-to-r from-black via-gray-900 to-black text-white shadow-lg"
                    : "hover:bg-white/5"
                }
              `}
                    >
                      <div className="flex items-start gap-4">
                        {/* ICON */}
                        <div
                          className={`
                    w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
                    ${
                      isActive
                        ? "bg-white/10 text-white"
                        : "bg-white/5 text-gray-400 group-hover:text-white"
                    }
                  `}
                        >
                          <Icon size={20} />
                        </div>

                        {/* TEXT */}
                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-4">
                            <h4
                              className={`
                        text-sm font-semibold
                        ${
                          isActive
                            ? "text-white"
                            : "text-gray-300 group-hover:text-white"
                        }
                      `}
                            >
                              {service.title}
                            </h4>

                            <span
                              className={`
                        text-lg transition-transform
                        ${
                          isActive
                            ? "text-white translate-x-1"
                            : "text-gray-500 group-hover:text-white group-hover:translate-x-1"
                        }
                      `}
                            >
                              →
                            </span>
                          </div>

                          <p
                            className={`
                      mt-1 text-xs leading-relaxed line-clamp-2
                      ${
                        isActive
                          ? "text-gray-400"
                          : "text-gray-500 group-hover:text-gray-400"
                      }
                    `}
                          >
                            {service.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* ================= RIGHT PANEL ================= */}
          <div
            className="
    relative overflow-hidden rounded-3xl
    border border-white/10
    bg-gradient-to-br
      from-[#1b1b1b]
      via-[#121212]
      to-[#0b0b0b]
    shadow-[0_24px_80px_rgba(0,0,0,0.7)]
  "
          >
            {/* LEFT EDGE GLOW */}
            <div
              className="
      hidden lg:block
      absolute left-0 top-1/2 -translate-y-1/2
      w-6 h-[60%]
      bg-gradient-to-r from-white/15 to-transparent
      blur-xl
    "
            />

            {/* IMAGE */}
            <div
              className={`relative ${active.imageHeight} ${active.imageWidth}`}
            >
              <Image
                src="/images/mobile-app/ReactNativepicture.png"
                alt="Mobile App Development Services"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/50" />
            </div>

            {/* CONTENT */}
            <div className="p-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <active.icon size={22} className="text-white" />
                </div>

                <h3 className="text-xl font-semibold text-white uppercase tracking-wide">
                  {active.title}
                </h3>
              </div>

              <p className="text-gray-400 mb-6 max-w-xl leading-relaxed">
                {active.description}
              </p>

              <ul className="space-y-2 text-gray-300">
                {active.bullets.map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-gray-500">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
