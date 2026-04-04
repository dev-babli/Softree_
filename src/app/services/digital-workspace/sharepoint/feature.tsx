"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const features = [
  {
    title: "Document Management",
    description:
      "Create, organize, and co-author files with version history, check-in/check-out, and secure collaboration.",
    image: "/images/sharepoint/document.png",
  },
  {
    title: "Team Collaboration",
    description:
      "Empower teams with sites, calendars, tasks, and seamless Microsoft 365 integration.",
    image: "/images/sharepoint/team.png",
  },
  {
    title: "Content Management",
    description:
      "Manage enterprise content with metadata, approvals, governance, and advanced search.",
    image: "/images/sharepoint/content.png",
  },
  {
    title: "Business Automation",
    description:
      "Automate approvals, workflows, and notifications to streamline operations and save time.",
    image: "/images/sharepoint/business-p.png",
  },
  {
    title: "Business Intelligence",
    description:
      "Visualize insights with dashboards, reports, and real-time analytics using Power BI.",
    image: "/images/sharepoint/business-i.png",
  },
  {
    title: "Security & Compliance",
    description:
      "Protect sensitive information with role-based permissions, auditing, and enterprise compliance.",
    image: "/images/sharepoint/security.png",
  },
];

export default function SharePointFeaturesAdvanced() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeFeature = features[activeIndex];

  return (
    <section className="relative bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="mx-auto max-w-7xl w-[90%]">
        {/* ================= HEADER ================= */}
        <div className="text-center max-w-6xl mx-auto mb-4 px-4">
          <h2 className="text-4xl lg:text-5xl font-semibold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent">
            Microsoft SharePoint Features
          </h2>

          <p className="mt-6 text-gray-600 text-lg leading-relaxed">
            A modern collaboration platform designed for secure, scalable, and
            intelligent digital workplaces.
          </p>
        </div>

        {/* ================= MAIN CONTAINER ================= */}
        <div
          className="
            grid grid-cols-1 lg:grid-cols-12
            rounded-3xl
            border border-gray-200
            bg-white
            shadow-[0_30px_90px_rgba(0,0,0,0.08)]
            overflow-hidden
          "
        >
          {/* ================================================= */}
          {/* LEFT – FEATURE TABS (ADVANCED) */}
          {/* ================================================= */}
          <div
            className="
    relative lg:col-span-4 p-8

    rounded-3xl
    bg-gradient-to-b from-[#111827] to-[#0f172a]

    border border-white/10
    backdrop-blur-xl

    shadow-[0_25px_70px_rgba(0,0,0,0.6)]
    hover:shadow-[0_35px_120px_rgba(59,130,246,0.25)]

    hover:-translate-y-2
    transition-all duration-500
  "
          >
            {/* Active sliding indicator */}
            <motion.div
              layout
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
              className="absolute left-0 w-1 h-12 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"
              style={{ top: 32 + activeIndex * 64 }}
            />

            <div className="space-y-3">
              {features.map((item, index) => (
                <button
                  key={item.title}
                  onClick={() => setActiveIndex(index)}
                  className={`
                    group w-full text-left px-6 py-4 rounded-xl
                    transition-all duration-300
                    ${
                      activeIndex === index
                        ? "bg-blue-50 text-blue-700 shadow-md"
                        : "text-gray-600 hover:bg-gray-100"
                    }
                  `}
                >
                  <span className="flex items-center gap-3 font-medium">
                    <span className="text-sm font-semibold text-blue-600">
                      {index + 1}.
                    </span>
                    {item.title}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* ================================================= */}
          {/* RIGHT – CONTENT PANEL (ADVANCED FLOAT DESIGN) */}
          {/* ================================================= */}
          <div className="lg:col-span-8 p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature.title}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.45 }}
                className="flex flex-col"
              >
                {/* Title */}
                <h3 className="text-3xl lg:text-4xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent tracking-tight">
                  {activeFeature.title}
                </h3>

                {/* Description */}
                <p className="mt-6 text-gray-600 text-lg leading-relaxed max-w-2xl">
                  {activeFeature.description}
                </p>

                {/* Image Card */}
                <div
                  className="
                    mt-12 relative w-full
                    min-h-[320px] lg:min-h-[420px]
                    rounded-2xl overflow-hidden
                    shadow-[0_25px_70px_rgba(0,0,0,0.10)]
                    group
                  "
                >
                  {/* subtle glow */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-indigo-500/10 z-10 pointer-events-none" />

                  <Image
                    src={activeFeature.image}
                    alt={activeFeature.title}
                    fill
                    priority
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
