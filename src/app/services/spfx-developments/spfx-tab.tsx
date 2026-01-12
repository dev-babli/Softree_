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
    <section className="bg-black py-24">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0D0057]/70 via-black/40 to-[#240F8E]/30 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4 font-secondary"
          >
            Modern SPFx Solutions for SharePoint
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-300 max-w-3xl mx-auto text-sm md:text-base leading-relaxed"
          >
            Deliver seamless, scalable, and secure SharePoint experiences with
            our SPFx services. From building dynamic web parts and custom
            extensions to integrating with Microsoft 365 and optimizing for
            mobile, we help you unlock the full potential of your SharePoint
            environment.
          </motion.p>
        </div>
{/* ===== Tabs Section ===== */}
<div className="relative bg-gradient-to-r from-indigo-900 via-black to-purple-900 p-[1px] rounded-[28px] shadow-2xl overflow-hidden">
  <div className="relative flex flex-col md:flex-row gap-8 bg-[#0B1220]/95 rounded-[28px] p-8">

    {/* ===== Tabs Navigation ===== */}
    <div className="relative md:w-1/3 flex md:flex-col gap-4 overflow-x-auto md:overflow-visible">

      {/* Accent rail */}
      <div className="hidden md:block absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-cyan-400 via-purple-500 to-pink-500 rounded-full" />

      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`relative group flex-shrink-0 text-left px-6 py-4 rounded-xl font-medium transition-all duration-300
            ${
              activeTab === tab.id
                ? "bg-white/10 text-white shadow-lg"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
        >
          {/* Active indicator */}
          {activeTab === tab.id && (
            <span className="absolute left-0 top-1/2 -translate-y-1/2 h-2/3 w-[3px] bg-gradient-to-b from-cyan-400 to-purple-500 rounded-full" />
          )}

          <span className="relative z-10 text-sm md:text-base">
            {tab.title}
          </span>
        </button>
      ))}
    </div>

    {/* ===== Tabs Content ===== */}
    <div className="relative md:w-2/3 rounded-2xl p-8 overflow-hidden
      bg-white/[0.06] backdrop-blur-2xl
      border border-white/10
      shadow-[0_25px_80px_rgba(0,0,0,0.45)]">

      {tabs.map(
        (tab) =>
          tab.id === activeTab && (
            <motion.div
              key={tab.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="flex flex-col gap-8"
            >
              {/* ===== Text ===== */}
              <div>
                <h4 className="text-white text-2xl md:text-3xl font-bold mb-4">
                  {tab.title}
                </h4>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-2xl">
                  {tab.desc}
                </p>
              </div>

              {/* ===== Image ===== */}
              <div className="w-full flex justify-center">
                <div className="relative p-5 rounded-2xl
                  bg-gradient-to-br from-white/10 to-transparent
                  border border-white/15
                  shadow-inner backdrop-blur-md">

                  <img
                    src={tab.img}
                    alt={tab.title}
                    className="rounded-xl max-h-80 object-contain"
                  />

                  {/* Soft glow */}
                  <div className="absolute inset-0 rounded-2xl bg-cyan-400/10 blur-2xl pointer-events-none" />
                </div>
              </div>
            </motion.div>
          )
      )}
    </div>
  </div>
</div>

      </div>
    </section>
  );
}
