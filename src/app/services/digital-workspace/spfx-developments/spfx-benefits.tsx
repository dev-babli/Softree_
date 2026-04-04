// components/SpfxBenefits.tsx
"use client";

import { motion } from "framer-motion";
import {
  Server,
  Zap,
  Globe,
  Shield,
  Settings,
  Monitor,
  Database,
  Activity,
  DollarSign,
} from "lucide-react";

// New, unique card content
const cards = [
  {
    title: "Modern SharePoint Architecture",
    desc: "Transform your SharePoint environment with modern frameworks and components, providing faster load times and improved scalability for enterprise applications.",
    icon: <Server size={40} />,
  },
  {
    title: "Seamless Microsoft 365 Connectivity",
    desc: "Integrate SPFx solutions effortlessly with Teams, OneDrive, and Power Platform tools, creating efficient workflows and centralized collaboration.",
    icon: <Zap size={40} />,
  },
  {
    title: "Device-Agnostic Design",
    desc: "Deliver consistent SharePoint experiences across desktops, tablets, and mobile devices, ensuring all users stay productive anywhere.",
    icon: <Globe size={40} />,
  },
  {
    title: "Robust Security & Compliance",
    desc: "Build secure SharePoint apps with SPFx, ensuring compliance with enterprise policies while safeguarding sensitive organizational data.",
    icon: <Shield size={40} />,
  },
  {
    title: "Custom Extensions & Widgets",
    desc: "Enhance SharePoint sites with bespoke web parts, extensions, and widgets tailored to your business processes and reporting needs.",
    icon: <Settings size={40} />,
  },
  {
    title: "Interactive User Interfaces",
    desc: "Use React or Angular within SPFx to create dynamic, engaging, and intuitive interfaces that improve user satisfaction and adoption.",
    icon: <Monitor size={40} />,
  },
  {
    title: "External Data Integration",
    desc: "Connect SharePoint with CRM, ERP, or third-party APIs to deliver real-time insights and streamline data-driven decisions across your organization.",
    icon: <Database size={40} />,
  },
  {
    title: "Optimized Performance",
    desc: "Reduce bundle sizes, implement lazy loading, and fine-tune SPFx apps for fast and responsive experiences, even with large-scale content libraries.",
    icon: <Activity size={40} />,
  },
  {
    title: "Cost-Effective Development",
    desc: "Leverage reusable components and cross-platform frameworks to save development time, reduce costs, and adapt quickly to evolving business needs.",
    icon: <DollarSign size={40} />,
  },
];

export default function SpfxBenefits() {
  return (
    <section className="relative bg-gradient-to-b from-zinc-50 via-white to-zinc-50 py-24 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
        {/* ================= PREMIUM HEADER ================= */}
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
            Benefits
          </span>

          {/* Title */}
          <motion.h4
            initial={{ opacity: 0, y: 30 }}
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
            Why{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              SPFx
            </span>{" "}
            is Essential for Modern SharePoint
          </motion.h4>

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
            The SharePoint Framework enables businesses to build scalable,
            secure, and responsive solutions. Enhance collaboration, streamline
            workflows, and deliver modern digital experiences with confidence.
          </motion.p>

          {/* Accent divider */}
          <div className="mt-8 h-[2px] w-20 mx-auto bg-gradient-to-r from-blue-600 to-transparent rounded-full" />
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, idx) => (
            <motion.a
              key={idx}
              href="#"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group relative rounded-2xl p-1 transition-all"
            >
              {/* Inner card */}
              <div className="bg-[#0B0B1A] rounded-2xl p-6 shadow-lg transform transition-all flex flex-col h-full relative overflow-hidden">
                {/* Always-on overlay */}
                <div className="absolute inset-0 bg-white/5 opacity-20 rounded-2xl pointer-events-none"></div>

                {/* Card Content */}
                <div className="flex flex-col items-start justify-between h-full relative z-10">
                  {/* Icon */}
                  <div className="flex-shrink-0 bg-gray-800 p-3 rounded-full shadow-md flex items-center justify-center group-hover:bg-gray-700 transition-colors">
                    {card.icon}
                  </div>

                  {/* Text */}
                  <div className="mt-4 flex-1 flex flex-col justify-between">
                    <h4 className="text-white text-lg font-semibold mb-2 font-secondary transition-colors group-hover:text-gray-200">
                      {card.title}
                    </h4>
                    <p className="text-gray-300 text-sm line-clamp-5">
                      {card.desc}
                    </p>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
