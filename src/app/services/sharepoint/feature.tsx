"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const features = [
  {
    title: "Document Management",
    description:
      "Create, upload, manage, and co-author documents with version control, check-in/check-out, and secure collaboration.",
    image: "/images/sharepoint/document.png",
  },
  {
    title: "Team Collaboration",
    description:
      "Empower teams with sites, calendars, task lists, discussions, and seamless Microsoft 365 integration.",
    image: "/images/sharepoint/team.png",
  },
  {
    title: "Content Management",
    description:
      "Publish and manage enterprise content using metadata, approval workflows, and powerful search.",
    image: "/images/sharepoint/content.png",
  },
  {
    title: "Business Process Automation",
    description:
      "Automate approvals, notifications, and workflows to streamline business operations.",
    image: "/images/sharepoint/business-p.png",
  },
  {
    title: "Business Intelligence",
    description:
      "Visualize data with Power BI dashboards, reports, and real-time analytics.",
    image: "/images/sharepoint/business-i.png",
  },
  {
    title: "Security and Permissions",
    description:
      "Protect sensitive data with role-based access control, compliance, and auditing.",
    image: "/images/sharepoint/security.png",
  },
];

export default function SharePointFeaturesAdvanced() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeFeature = features[activeIndex];

  return (
    <section className="relative py-28 overflow-hidden">
      <div className="relative mx-auto max-w-7xl w-[86%]">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl lg:text-5xl font-semibold text-white tracking-tight">
            Microsoft SharePoint Features
          </h2>
          <p className="mt-6 text-gray-400 text-lg">
            A modern collaboration platform designed for secure, scalable, and
            intelligent digital workplaces.
          </p>
        </div>

        {/* Glass Container */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl overflow-hidden">
          {/* LEFT – Tabs */}
          <div
            className="relative lg:col-span-4 p-8 
  bg-gradient-to-br from-[#0b1220] via-[#0e1628] to-[#050814]
  border-r border-white/10"
          >
            {/* Subtle Noise / Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.15),transparent_60%)] pointer-events-none" />

            {/* Animated Indicator */}
            <motion.div
              layout
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute left-0 top-[calc(2rem+var(--active)*3.75rem)] h-[3rem] w-1 
    bg-gradient-to-b from-blue-400 to-purple-500 rounded-full"
              style={
                {
                  "--active": activeIndex,
                } as React.CSSProperties
              }
            />

            <div className="relative space-y-3">
              {features.map((item, index) => (
                <button
                  key={item.title}
                  onClick={() => setActiveIndex(index)}
                  className={`group relative w-full text-left px-6 py-4 rounded-xl transition-all duration-300
    ${
      activeIndex === index
        ? "bg-gradient-to-r from-blue-600/25 to-purple-600/25 text-white shadow-xl"
        : "text-gray-300 hover:bg-white/10"
    }`}
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <span className="text-sm font-semibold text-blue-400">
                      {index + 1}.
                    </span>
                    {item.title}
                  </span>

                  {/* Glow */}
                  {activeIndex === index && (
                    <span className="absolute inset-0 rounded-xl bg-blue-500/10 blur-xl" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT – Content */}
          <div className="lg:col-span-8 p-10 lg:p-14 border-t lg:border-t-0 lg:border-l border-white/10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="text-3xl lg:text-4xl font-semibold text-white">
                  {activeFeature.title}
                </h3>

                <p className="mt-6 text-gray-400 text-lg max-w-2xl">
                  {activeFeature.description}
                </p>

                {/* Image – Full Width / Full Height */}
                <div className="mt-12 relative w-full min-h-[300px] lg:min-h-[380px] rounded-2xl overflow-hidden">
                  <Image
                    src={activeFeature.image}
                    alt={activeFeature.title}
                    fill
                    className="object-cover"
                    priority
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
