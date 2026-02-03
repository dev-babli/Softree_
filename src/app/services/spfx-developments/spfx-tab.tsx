// components/SpfxTabs.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const tabs = [
  {
    id: "tab1",
    title: "Custom SPFx Web Part Development",
    img: "/images/spfx/1.avif",
    desc: "Create dynamic and interactive SharePoint web parts tailored to your business needs. Leverage React or Angular for responsive and reusable components that integrate seamlessly with Microsoft 365 services.",
  },
  {
    id: "tab2",
    title: "SPFx Extension Development",
    img: "/images/spfx/2.avif",
    desc: "Enhance SharePoint functionality with SPFx extensions. Build Application Customizers, Command Set extensions, and Field Customizers to improve workflows, navigation, and user experience.",
  },
  {
    id: "tab3",
    title: "Microsoft 365 Integration",
    img: "/images/spfx/3.jpg",
    desc: "Connect your SPFx solutions to Microsoft 365 apps like Teams, Planner, Power BI, and OneDrive. Automate workflows, fetch real-time data via Microsoft Graph, and enhance collaboration across your organization.",
  },
  {
    id: "tab4",
    title: "Mobile-Optimized SPFx Solutions",
    img: "/images/spfx/4.avif",
    desc: "Design SPFx web parts and extensions that are fully responsive on smartphones and tablets. Ensure smooth navigation, touch-friendly controls, and fast performance for mobile users.",
  },
  {
    id: "tab5",
    title: "SPFx Performance Optimization",
    img: "/images/spfx/5.jpg",
    desc: "Improve web part performance with optimized bundle sizes, lazy loading, and caching strategies. Deliver fast, responsive experiences even on large SharePoint sites.",
  },
  {
    id: "tab6",
    title: "Custom UI/UX Design Services for SPFx",
    img: "/images/spfx/6.jpg",
    desc: "Craft modern, user-friendly interfaces for SharePoint. Apply interactive layouts, consistent branding, and intuitive navigation to enhance user engagement across SPFx web parts and extensions.",
  },
  {
    id: "tab7",
    title: "SPFx Deployment & Maintenance",
    img: "/images/spfx/7.jpg",
    desc: "Deploy SPFx solutions seamlessly to SharePoint Online or on-premises. Manage App Catalog configuration, version control, and ongoing maintenance to ensure optimal performance and security.",
  },
  {
    id: "tab8",
    title: "SPFx Migration & Modernization",
    img: "/images/spfx/8.avif",
    desc: "Upgrade classic SharePoint solutions to modern SPFx web parts and extensions. Modernize legacy components, improve compatibility with SharePoint Online, and take advantage of new features and improved performance.",
  },
];

export default function SpfxTabs() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <section className="bg-gradient-to-b from-zinc-50 via-white to-zinc-50 py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* ================= PREMIUM LIGHT HEADER ================= */}
        <div className="text-center mb-20 max-w-4xl mx-auto">
          {/* Eyebrow */}
          <span
            className="
      inline-block mb-5
      px-4 py-1.5
      rounded-full
      text-xs font-semibold tracking-widest uppercase
      bg-blue-50 text-blue-600
    "
          >
            SharePoint Framework
          </span>

          {/* Title */}
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="
      text-4xl md:text-5xl lg:text-6xl
      font-semibold
      text-zinc-900
      leading-tight
      mb-6
    "
          >
            Modern{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              SPFx Solutions
            </span>{" "}
            for SharePoint
          </motion.h3>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="
      text-zinc-600
      text-base md:text-lg
      leading-relaxed
      max-w-3xl
      mx-auto
    "
          >
            Deliver seamless, scalable, and secure SharePoint experiences with
            custom web parts, extensions, and Microsoft 365 integrations — built
            for performance, usability, and growth.
          </motion.p>
        </div>

        {/* ================= ULTRA ADVANCED TABS ================= */}
        <div
          className="
    bg-gradient-to-br from-white/10 via-white/5 to-white/10
    p-[1px] rounded-3xl overflow-hidden
  "
        >
          <div
            className="
      grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8
      rounded-3xl p-6
      bg-gradient-to-br from-black/60 via-black/70 to-black/80
      backdrop-blur-2xl
      border border-white/10
      min-h-[420px]
    "
          >
            {/* ================= LEFT : TABS NAV ================= */}
            <div
              className="
        flex flex-col gap-3
        h-full
        rounded-2xl
        bg-gradient-to-br from-white/10 to-white/5
        border border-white/10
        p-3
      "
            >
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
            relative w-full px-5 py-4 rounded-xl text-left font-medium
            transition-all duration-300 ease-out
            ${
              activeTab === tab.id
                ? `
                  text-white
                  bg-gradient-to-br from-white/30 via-white/15 to-white/5
                  border border-white/25
                `
                : `
                  text-gray-300
                  bg-white/5
                  border border-white/10
                  hover:bg-white/10 hover:text-white
                `
            }
          `}
                >
                  {/* Soft active glow */}
                  {activeTab === tab.id && (
                    <span
                      className="
                pointer-events-none absolute inset-0 rounded-xl
               
              "
                    />
                  )}

                  <span className="relative z-10">{tab.title}</span>
                </button>
              ))}
            </div>

            {/* ================= RIGHT : TAB CONTENT ================= */}
            <div
              className="
        md:col-span-2
        relative h-full
        rounded-2xl p-6
        bg-gradient-to-br from-white/12 via-white/6 to-white/10
        backdrop-blur-xl
        border border-white/15
        overflow-hidden
      "
            >
              {tabs.map(
                (tab) =>
                  tab.id === activeTab && (
                    <motion.div
                      key={tab.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="relative flex flex-col h-full gap-6"
                    >
                      {/* TEXT */}
                      <div>
                        <h4 className="text-white text-2xl md:text-3xl font-bold mb-3">
                          {tab.title}
                        </h4>
                        <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-2xl">
                          {tab.desc}
                        </p>
                      </div>

                      {/* IMAGE */}
                      <div className="flex-1 flex items-center justify-center">
                        <div
                          className="
                    p-4 rounded-2xl
                    bg-gradient-to-br from-white/10 to-white/5
                    border border-white/10
                    backdrop-blur-md
                  "
                        >
                          <img
                            src={tab.img}
                            alt={tab.title}
                            className="rounded-lg max-h-80 object-contain"
                          />
                        </div>
                      </div>
                    </motion.div>
                  ),
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
