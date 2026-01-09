"use client";

import { useState } from "react";
import Image from "next/image";
import {
  FaPaintBrush,
  FaBolt,
  FaDatabase,
  FaGlobe,
  FaRobot,
} from "react-icons/fa";

/* =========================
   TABS DATA
========================= */
const tabs = [
  {
    step: "01",
    title: "Canvas Apps",
    icon: <FaPaintBrush />,
    description:
      "We create intuitive Canvas Apps that offer complete design flexibility, allowing businesses to build task-focused applications tailored to their unique workflows. These apps deliver a seamless user experience across mobile, tablet, and desktop devices.",
    image: "/images/power-apps/1.png",
  },
  {
    step: "02",
    title: "Power Apps",
    icon: <FaBolt />,
    description:
      "Our Power Apps solutions enable organizations to rapidly build secure and scalable applications using low-code capabilities, helping teams streamline operations, reduce development time, and improve productivity.",
    image: "/images/power-apps/2.png",
  },
  {
    step: "03",
    title: "Model-Driven Apps",
    icon: <FaDatabase />,
    description:
      "We develop robust Model-Driven Apps that leverage structured data and business rules to deliver consistent, data-centric experiences, ideal for complex enterprise processes and compliance-driven environments.",
    image: "/images/power-apps/3.png",
  },
  {
    step: "04",
    title: "Portals",
    icon: <FaGlobe />,
    description:
      "Our portal solutions provide secure, role-based access for customers, partners, and employees, enabling seamless external collaboration while maintaining enterprise-grade security and performance.",
    image: "/images/power-apps/4.png",
  },
  {
    step: "05",
    title: "Custom Connectors & AI Builder",
    icon: <FaRobot />,
    description:
      "We enhance Power Apps with custom connectors and AI Builder capabilities to integrate external systems, automate workflows, and introduce intelligent insights that drive smarter business decisions.",
    image: "/images/power-apps/5.png",
  },
];

export default function PowerAppsServices() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative bg-[#00091A] overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(0,180,255,0.15),transparent_55%)]" />

      <div className="relative w-[86%] max-w-7xl mx-auto py-16 text-white">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4.5xl font-medium text-white/90 leading-snug">
            Power Apps{" "}
            <span className="relative inline-block">
              Consulting & Development
              <span className="absolute left-0 -bottom-2 w-full h-[3px] bg-gradient-to-r from-blue-400 to-purple-500 rounded-full" />
            </span>{" "}
            Services
          </h2>

          <p className="max-w-[860px] mx-auto mt-6 text-base leading-relaxed text-white/65">
            At Softree, we help organizations design and build scalable
            applications using Microsoft Power Apps. Our team delivers
            end-to-end solutions — including canvas apps, model-driven apps,
            portals, system integrations, deployment, and long-term support —
            tailored to modern business workflows.
          </p>
        </div>

        {/* ================= MAIN GRID ================= */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* ================= LEFT PANEL ================= */}
          <div className="md:col-span-1 relative md:sticky top-28 h-full">
            <div className="absolute -inset-2 bg-gradient-to-br from-cyan-500/20 to-blue-600/10 blur-2xl rounded-3xl" />

            <div className="relative bg-[#0B1220]/90 backdrop-blur-xl p-6 md:p-8 rounded-2xl shadow-2xl border border-white/10 h-full flex flex-col">
              <div className="mb-6">
                <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-semibold text-white/90">
                  Power Apps Capabilities
                </span>
              </div>

              {/* Tabs */}
              <div className="flex md:flex-col gap-5 overflow-x-auto md:overflow-visible">
                {tabs.map((tab, index) => {
                  const isActive = active === index;

                  return (
                    <button
                      key={index}
                      onClick={() => setActive(index)}
                      className={`
                        relative group
                        min-w-[240px]
                        px-6 py-5
                        rounded-2xl
                        text-left
                        transition-all duration-500
                        border
                        ${
                          isActive
                            ? "bg-gradient-to-br from-white/20 to-white/5 border-white/25 shadow-lg shadow-cyan-500/25 scale-[1.03]"
                            : "bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20"
                        }
                      `}
                    >
                      {/* Active Glow */}
                      {isActive && (
                        <span className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500/30 to-blue-600/20 blur-xl -z-10" />
                      )}

                      {/* Indicator */}
                      <span
                        className={`
                          absolute left-0 top-1/2 -translate-y-1/2
                          h-[65%] w-[4px] rounded-full transition-all duration-500
                          ${
                            isActive
                              ? "bg-gradient-to-b from-cyan-400 to-blue-600 opacity-100"
                              : "opacity-0"
                          }
                        `}
                      />

                      <div className="relative flex items-start gap-4">
                        {/* Step */}
                        <span
                          className={`text-sm font-mono tracking-widest transition-all
                            ${
                              isActive
                                ? "text-cyan-400 scale-110"
                                : "text-white/30 group-hover:text-white/50"
                            }
                          `}
                        >
                          {tab.step}
                        </span>

                        {/* Icon */}
                        <span
                          className={`text-xl transition-all
                            ${
                              isActive
                                ? "text-cyan-400 scale-110"
                                : "text-white/40 group-hover:text-white/70"
                            }
                          `}
                        >
                          {tab.icon}
                        </span>

                        {/* Text */}
                        <div>
                          <h4
                            className={`text-base font-semibold transition-colors
                              ${
                                isActive
                                  ? "text-white"
                                  : "text-white/70 group-hover:text-white"
                              }
                            `}
                          >
                            {tab.title}
                          </h4>
                          <p
                            className={`mt-1.5 text-sm transition-colors line-clamp-1
    ${isActive ? "text-white/75" : "text-white/40 group-hover:text-white/60"}
  `}
                          >
                            {tab.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ================= RIGHT PANEL ================= */}
          <div className="md:col-span-2 relative h-full">
            <div className="absolute -inset-2 bg-gradient-to-br from-cyan-500/20 to-blue-600/10 blur-2xl rounded-3xl" />

            <div className="relative bg-[#0B1220]/90 backdrop-blur-xl p-7 md:p-10 rounded-2xl shadow-2xl md:sticky top-28 h-full flex flex-col justify-between transition-all duration-500">
              <div
                className="
  relative
  bg-[#0B1220]/90
  backdrop-blur-xl
  p-6 md:p-7
  rounded-2xl
  shadow-2xl
  md:sticky top-28
  transition-all duration-500
  overflow-hidden
"
              >
                {/* Accent strip */}
                <span className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-blue-400 via-purple-500 to-transparent" />

                {/* Subtle glow */}
                <span className="absolute -top-8 -right-8 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

                <p className="relative text-sm md:text-base leading-relaxed text-white/90 max-w-[90%] mx-auto text-center tracking-wide">
                  {tabs[active].description}
                </p>
              </div>

              {/* Image */}
              <div className="mt-6 group">
                <Image
                  src={tabs[active].image}
                  alt={tabs[active].title}
                  width={1000}
                  height={520}
                  priority
                  className="
                    mx-auto
                    w-full
                    max-w-[900px]
                    h-[300px]
                    md:h-[420px]
                    lg:h-[460px]
                    rounded-2xl
                    object-cover
                    shadow-2xl shadow-cyan-500/15
                    transition-transform duration-500
                    group-hover:scale-[1.03]
                  "
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
