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
    <section className="relative">
      <style>{`
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* ================= PREMIUM LIGHT HEADER ================= */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          {/* Eyebrow */}
          <span
            className="
              inline-block mb-5
              px-4 py-1.5
              rounded-full
              text-xs font-semibold tracking-widest uppercase
              bg-orange-50 text-orange-600 border border-orange-100/50 shadow-sm
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
            <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
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
            bg-gradient-to-r from-black via-[#4c1c02] to-black
            p-[1px] rounded-3xl overflow-hidden shadow-2xl
          "
        >
          <div
            className="
              grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8
              rounded-3xl p-6 md:p-8
              bg-gradient-to-br from-black/85 via-zinc-950 to-black
              backdrop-blur-2xl
              min-h-[500px]
            "
          >
            {/* ================= LEFT : TABS NAV ================= */}
            <div
              className="
                flex flex-col gap-2
                max-h-[500px] overflow-y-auto
                p-2
                rounded-2xl
                bg-white/5
                border border-white/10
                scrollbar-none
              "
            >
              {tabs.map((tab, idx) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    relative w-full px-4 py-3 rounded-xl text-left font-medium
                    transition-all duration-300 ease-out text-sm
                    border
                    ${
                      activeTab === tab.id
                        ? `
                          text-white
                          bg-gradient-to-br from-orange-500/20 via-white/5 to-white/5
                          border-orange-500/40 shadow-inner
                        `
                        : `
                          text-gray-400
                          bg-transparent
                          border-transparent
                          hover:bg-white/5 hover:text-white hover:border-white/10
                        `
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`
                        text-[10px] font-mono px-2 py-0.5 rounded transition-colors duration-300
                        ${
                          activeTab === tab.id
                            ? "bg-gradient-to-r from-orange-600 to-amber-500 text-white font-bold"
                            : "bg-white/10 text-gray-400 group-hover:bg-white/20"
                        }
                      `}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="truncate">{tab.title}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* ================= RIGHT : TAB CONTENT ================= */}
            <div
              className="
                lg:col-span-2
                relative h-full
                rounded-2xl p-6 md:p-8
                bg-gradient-to-br from-white/10 via-white/5 to-white/5
                backdrop-blur-xl
                border border-white/10
                overflow-hidden
                flex flex-col justify-between
                min-h-[400px]
              "
            >
              {tabs.map(
                (tab) =>
                  tab.id === activeTab && (
                    <motion.div
                      key={tab.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="relative flex flex-col h-full gap-6 justify-between"
                    >
                      {/* TEXT */}
                      <div>
                        <h4 className="text-white text-2xl md:text-3xl font-semibold mb-3 tracking-tight">
                          {tab.title}
                        </h4>
                        <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-2xl">
                          {tab.desc}
                        </p>
                      </div>

                      {/* IMAGE */}
                      <div className="flex-1 flex items-center justify-center mt-4">
                        <div
                          className="
                            p-2 rounded-2xl
                            bg-gradient-to-br from-white/10 to-white/5
                            border border-white/10
                            backdrop-blur-md
                            shadow-2xl
                            transition-all duration-300
                            hover:border-orange-500/30
                          "
                        >
                          <img
                            src={tab.img}
                            alt={tab.title}
                            className="rounded-xl max-h-72 object-contain"
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

