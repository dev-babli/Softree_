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
    shortDesc: "Custom UI apps for mobile, tablet & desktop workflows.",
    description:
      "We create intuitive Canvas Apps that offer complete design flexibility, allowing businesses to build task-focused applications tailored to their unique workflows. These apps deliver a seamless user experience across mobile, tablet, and desktop devices.",
    image: "/images/power-apps/1.png",
  },

  {
    step: "02",
    title: "Power Apps",
    icon: <FaBolt />,
    shortDesc: "Rapid low-code apps to streamline business operations.",
    description:
      "Our Power Apps solutions enable organizations to rapidly build secure and scalable applications using low-code capabilities, helping teams streamline operations, reduce development time, and improve productivity.",
    image: "/images/power-apps/2.png",
  },

  {
    step: "03",
    title: "Model-Driven Apps",
    icon: <FaDatabase />,
    shortDesc: "Enterprise, data-driven solutions using Dataverse.",
    description:
      "We develop robust Model-Driven Apps that leverage structured data and business rules to deliver consistent, data-centric experiences, ideal for complex enterprise processes and compliance-driven environments.",
    image: "/images/power-apps/3.png",
  },

  {
    step: "04",
    title: "Portals",
    icon: <FaGlobe />,
    shortDesc: "Secure external portals for customers & partners.",
    description:
      "Our portal solutions provide secure, role-based access for customers, partners, and employees, enabling seamless external collaboration while maintaining enterprise-grade security and performance.",
    image: "/images/power-apps/4.png",
  },

  {
    step: "05",
    title: "Custom Connectors & AI Builder",
    icon: <FaRobot />,
    shortDesc: "Integrations, automation & AI-powered intelligence.",
    description:
      "We enhance Power Apps with custom connectors and AI Builder capabilities to integrate external systems, automate workflows, and introduce intelligent insights that drive smarter business decisions.",
    image: "/images/power-apps/5.png",
  },
];

export default function PowerAppsServices() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative overflow-hidden">
      <div className="relative w-full px-6 max-w-7xl mx-auto py-6">
        {/* ================= HEADER ================= */}
        <div className="text-center mb-5 px-4">
          <h2 className="text-3xl lg:text-4xl font-semibold text-gray-900 leading-tight">
            Power Apps{" "}
            <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
              Consulting & Development
            </span>{" "}
            Services
          </h2>

          <p className="max-w-[860px] mx-auto mt-3 text-base leading-relaxed text-gray-600">
            At <span className="font-semibold text-gray-900">Softree</span>, we
            design and build scalable Power Apps solutions tailored to modern
            business workflows.
          </p>
        </div>

        {/* ================= MAIN GRID ================= */}
        <div className="max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {/* ================= LEFT PANEL ================= */}
          <div className="md:col-span-1 md:sticky top-20 flex">
            <div
              className="
      relative
  bg-gradient-to-r from-black via-[#4c1c02] to-black
      backdrop-blur-xl
      p-5
      rounded-2xl
      border border-white/10
      shadow-lg

      flex flex-col
      h-full
      w-full
    "
            >
              {/* Badge */}
              <span className="inline-block mb-3 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-200">
                Power Apps Capabilities
              </span>

              {/* ===== NEW SHORT DESCRIPTION ===== */}
              <p className="text-xs text-white/60 leading-relaxed mb-5">
                Explore our core services including app design, automation,
                integrations, and enterprise deployment solutions.
              </p>

              {/* Tabs */}
              <div className="flex md:flex-col gap-3 flex-1">
                {tabs.map((tab, index) => {
                  const isActive = active === index;

                  return (
                    <button
                      key={index}
                      onClick={() => setActive(index)}
                      className={`
    group
    min-w-[220px]
    px-4 py-3
    rounded-xl
    text-left
    border transition-all duration-300
    ${
      isActive
        ? "bg-white/10 border-white/20 text-white"
        : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
    }
  `}
                    >
                      <div className="flex flex-col gap-1.5">
                        {/* title */}
                        <div className="flex items-center gap-3">
                          <span className="text-sm">{tab.icon}</span>
                          <span className="text-sm font-medium">
                            {tab.title}
                          </span>
                        </div>

                        {/* short description */}
                        <p
                          className={`
        text-xs leading-relaxed line-clamp-2
        ${
          isActive ? "text-white/75" : "text-white/40 group-hover:text-white/60"
        }
      `}
                        >
                          {tab.shortDesc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ================= RIGHT PANEL ================= */}
          <div className="md:col-span-2 md:sticky top-20 flex">
            <div
              className="
        relative
      bg-gradient-to-r from-black via-[#4c1c02] to-black
        backdrop-blur-xl
        p-6
        rounded-2xl
        border border-white/10
        shadow-lg

        flex flex-col
        h-full
        w-full
        gap-5
      "
            >
              {/* ================= TEXT ================= */}
              <div className="bg-black/30 p-5 rounded-xl border border-white/10">
                <p className="text-sm text-white/90 text-center leading-relaxed">
                  {tabs[active].description}
                </p>
              </div>

              {/* ================= FIXED HEIGHT IMAGE ================= */}
              <Image
                src={tabs[active].image}
                alt={tabs[active].title}
                width={1000}
                height={590}
                priority
                className="
          w-full
          h-[200px]
          md:h-[260px]
          lg:h-[300px]
          xl:h-[390px]
          rounded-xl
          object-cover
          shadow-lg
          transition
          hover:scale-[1.02]
        "
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
