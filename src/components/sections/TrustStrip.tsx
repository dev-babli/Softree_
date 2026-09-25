"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Award, Globe, Users, Lock, CalendarDays } from "lucide-react";

interface TrustStripProps {
  theme?: "light" | "dark";
}

export default function TrustStrip({ theme = "light" }: TrustStripProps) {
  const isDark = theme === "dark";

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="mt-10 w-full flex flex-col items-center gap-8 text-center z-10 relative"
    >
      {/* Section Heading with Lines */}
      <div className="flex items-center w-full max-w-[90%] md:max-w-4xl gap-4">
        <div className={`h-px flex-1 ${isDark ? "bg-white/20" : "bg-slate-200/70"}`}></div>
        <span className={`typo-caption ${isDark ? "text-white/90" : "text-[#1e293b]"}`}>
          TRUSTED BY BUSINESSES AND TECHNOLOGY PARTNERS WORLDWIDE
        </span>
        <div className={`h-px flex-1 ${isDark ? "bg-white/20" : "bg-slate-200/70"}`}></div>
      </div>

      {/* New Trust Strip Container */}
      <div className={`rounded-[1.5rem] lg:rounded-[2rem] border ${isDark ? "border-white/10 bg-black/80 shadow-[0_8px_32px_rgba(0,0,0,0.5)]" : "border-slate-200/80 bg-white shadow-[0_4px_24px_rgba(10,10,26,0.04)]"} w-full max-w-7xl overflow-hidden mx-auto backdrop-blur-md`}>
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-[1px] ${isDark ? "bg-white/10" : "bg-slate-100"}`}>
          {[
            {
              title: "ISO 27001:2022",
              subtitle: "Information Security\nManagement",
              icon: ShieldCheck,
              color: "text-blue-500",
            },
            {
              title: "ISO 9001:2015",
              subtitle: "Quality Management\nSystems",
              icon: Award,
              color: "text-blue-500",
            },
            {
              title: "OFFSHORE DELIVERY",
              subtitle: "India-Based\nEngineering Teams",
              icon: Globe,
              color: "text-purple-500",
            },
            {
              title: "WHITE-LABEL READY",
              subtitle: "Your Brand.\nOur Delivery.",
              icon: Users,
              color: "text-orange-500",
            },
            {
              title: "NDA & IP PROTECTED",
              subtitle: "Confidential\nEngagements",
              icon: Lock,
              color: "text-green-500",
            },
            {
              title: "13+ YEARS",
              subtitle: "Proven Engineering\nExperience",
              icon: CalendarDays,
              color: "text-red-500",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`${isDark ? "bg-black/90 hover:bg-white/[0.04]" : "bg-white hover:bg-slate-50/50"} group relative flex items-center lg:items-start gap-2.5 p-4 sm:p-5 lg:p-3 xl:p-4 transition-colors duration-300`}
            >
              <div className="shrink-0 lg:pt-0.5">
                <item.icon className={`w-6 h-6 sm:w-7 sm:h-7 ${item.color} stroke-[1.5]`} />
              </div>
              <div className="flex flex-col text-left leading-snug">
                <span className={`typo-caption-meta font-bold ${isDark ? "text-white/90" : "text-slate-800"} tracking-tight whitespace-nowrap`}>
                  {item.title}
                </span>
                <span className={`typo-caption-meta ${isDark ? "text-white/50" : "text-slate-500"} mt-0.5 whitespace-pre-line`}>
                  {item.subtitle}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
