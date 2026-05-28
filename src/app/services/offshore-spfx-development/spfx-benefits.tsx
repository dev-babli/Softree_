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
    icon: <Server size={28} />,
  },
  {
    title: "Seamless Microsoft 365 Connectivity",
    desc: "Integrate SPFx solutions effortlessly with Teams, OneDrive, and Power Platform tools, creating efficient workflows and centralized collaboration.",
    icon: <Zap size={28} />,
  },
  {
    title: "Device-Agnostic Design",
    desc: "Deliver consistent SharePoint experiences across desktops, tablets, and mobile devices, ensuring all users stay productive anywhere.",
    icon: <Globe size={28} />,
  },
  {
    title: "Robust Security & Compliance",
    desc: "Build secure SharePoint apps with SPFx, ensuring compliance with enterprise policies while safeguarding sensitive organizational data.",
    icon: <Shield size={28} />,
  },
  {
    title: "Custom Extensions & Widgets",
    desc: "Enhance SharePoint sites with bespoke web parts, extensions, and widgets tailored to your business processes and reporting needs.",
    icon: <Settings size={28} />,
  },
  {
    title: "Interactive User Interfaces",
    desc: "Use React or Angular within SPFx to create dynamic, engaging, and intuitive interfaces that improve user satisfaction and adoption.",
    icon: <Monitor size={28} />,
  },
  {
    title: "External Data Integration",
    desc: "Connect SharePoint with CRM, ERP, or third-party APIs to deliver real-time insights and streamline data-driven decisions across your organization.",
    icon: <Database size={28} />,
  },
  {
    title: "Optimized Performance",
    desc: "Reduce bundle sizes, implement lazy loading, and fine-tune SPFx apps for fast and responsive experiences, even with large-scale content libraries.",
    icon: <Activity size={28} />,
  },
  {
    title: "Cost-Effective Development",
    desc: "Leverage reusable components and cross-platform frameworks to save development time, reduce costs, and adapt quickly to evolving business needs.",
    icon: <DollarSign size={28} />,
  },
];

export default function SpfxBenefits() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative z-10 w-full">
        {/* ================= PREMIUM HEADER ================= */}
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
            <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
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
          <div className="mt-8 h-[2px] w-20 mx-auto bg-gradient-to-r from-orange-600 to-amber-500 rounded-full" />
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              className="group relative rounded-2xl transition-all"
            >
              {/* Inner card */}
              <div className="bg-gradient-to-br from-zinc-950 via-zinc-900 to-black rounded-2xl p-6 shadow-xl transform transition-all duration-300 flex flex-col h-full relative overflow-hidden border border-zinc-800/80 group-hover:border-orange-500/40 hover:shadow-[0_20px_45px_rgba(249,115,22,0.08)] hover:-translate-y-1">
                {/* Glowing background layer */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#4c1c02]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />

                {/* Card Content */}
                <div className="flex flex-col items-start justify-between h-full relative z-10">
                  {/* Icon */}
                  <div className="flex-shrink-0 bg-gradient-to-br from-orange-500/10 to-amber-500/10 border border-orange-500/20 p-3 rounded-xl shadow-inner flex items-center justify-center group-hover:from-orange-500/20 group-hover:to-amber-500/20 transition-all duration-300 text-orange-400">
                    {card.icon}
                  </div>

                  {/* Text */}
                  <div className="mt-4 flex-1 flex flex-col justify-between">
                    <h4 className="text-white text-lg font-semibold mb-2 tracking-tight transition-colors duration-300 group-hover:text-orange-400">
                      {card.title}
                    </h4>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

