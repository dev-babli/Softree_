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
    <section className="relative  overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(0,180,255,0.15),transparent_55%)]" />

      <div className="relative w-[86%] max-w-7xl mx-auto py-16 text-white">
        {/* Header */}
        <div className="text-center mb-20 px-4">
          <h2 className="text-3xl lg:text-5xl font-semibold text-gray-900 leading-tight">
            Power Apps{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Consulting & Development
              </span>

              {/* Premium underline accent */}
              <span
                className="
          absolute left-0 -bottom-3 w-full h-[6px]
          bg-gradient-to-r
          from-blue-200
          via-blue-500/60
          to-blue-200
          rounded-full blur-[0.5px]
        "
              />
            </span>{" "}
            Services
          </h2>

          <p className="max-w-[860px] mx-auto mt-7 text-lg leading-relaxed text-gray-600">
            At <span className="font-semibold text-gray-900">Softree</span>, we
            help organizations design and build scalable applications using
            Microsoft Power Apps. Our team delivers end-to-end solutions —
            including canvas apps, model-driven apps, portals, system
            integrations, deployment, and long-term support — tailored to modern
            business workflows.
          </p>
        </div>

        {/* ================= MAIN GRID ================= */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* ================= LEFT PANEL ================= */}
          <div className="md:col-span-1 relative md:sticky top-28 h-full">
            {/* Ambient shadow (neutral) */}
            <div className="absolute -inset-2 bg-black/40 blur-2xl rounded-3xl" />

            <div
              className="
        relative
        bg-[#141414]/90
        backdrop-blur-xl
        p-6 md:p-8
        rounded-2xl
        shadow-[0_30px_80px_rgba(0,0,0,0.6)]
        border border-white/10
        h-full
        flex flex-col
      "
            >
              {/* Badge */}
              <div className="mb-6">
                <span
                  className="
            inline-block
            px-4 py-1.5
            rounded-full
            bg-white/5
            border border-white/10
            text-sm font-semibold
            text-gray-200
          "
                >
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
                    ? "bg-white/10 border-white/25 shadow-[0_10px_40px_rgba(0,0,0,0.6)] scale-[1.03]"
                    : "bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20"
                }
              `}
                    >
                      <div className="relative flex items-start gap-4">
                        {/* Step */}
                        <span
                          className={`text-sm font-mono tracking-widest transition-all
                    ${
                      isActive
                        ? "text-gray-200 scale-110"
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
                        ? "text-gray-200 scale-110"
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
                      ${
                        isActive
                          ? "text-white/75"
                          : "text-white/40 group-hover:text-white/60"
                      }
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
            {/* Ambient shadow */}
            <div className="absolute -inset-2 bg-black/40 blur-2xl rounded-3xl" />

            <div
              className="
        relative
        bg-[#141414]/90
        backdrop-blur-xl
        p-7 md:p-10
        rounded-2xl
        shadow-[0_30px_90px_rgba(0,0,0,0.65)]
        border border-white/10
        md:sticky top-28
        h-full
        flex flex-col
        justify-between
        transition-all duration-500
      "
            >
              {/* Text Panel */}
              <div
                className="
          relative
          bg-black/30
          backdrop-blur-xl
          p-6 md:p-7
          rounded-2xl
          border border-white/10
          shadow-[0_20px_60px_rgba(0,0,0,0.6)]
          transition-all duration-500
          overflow-hidden
        "
              >
                {/* Accent strip (neutral) */}
                <span className="absolute left-0 top-0 h-full w-[3px] bg-white/30" />

                {/* Subtle highlight */}
                <span className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-3xl pointer-events-none" />

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
            shadow-[0_30px_90px_rgba(0,0,0,0.7)]
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
