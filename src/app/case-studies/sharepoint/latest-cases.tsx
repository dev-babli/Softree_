"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AlertTriangle, TrendingUp, Lightbulb } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* =========================
   CASE STUDIES DATA
========================= */

const caseStudies = [
  {
    title: "Custom Copy & Move Panel for Lists",
    description:
      "A custom SPFx solution built using Fluent UI to enable seamless copy and move operations for SharePoint list items with enhanced user experience.",
    image: "/images/case-study/sharepoint/copy-move-panel.webp",
    href: "https://www.softreetechnology.com/wp-content/uploads/2025/03/Enhancing-SharePoint-List-Management-with-a-Custom-Copy-Move-Panel-Using-SPFx-and-Fluent-UI.pdf",
    challenge:
      "Manual list item transfers caused inefficiencies and data duplication.",
    solution:
      "Built a custom SPFx panel with structured copy/move logic and metadata retention.",
    result: "Improved list management efficiency and reduced manual errors.",
  },

  {
    title: "Enable & Disable MFA Using PowerShell",
    description:
      "A PowerShell automation approach to manage Multi-Factor Authentication (MFA) settings for Microsoft 365 users securely.",
    image: "/images/case-study/sharepoint/mfa-powershell.webp",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/How-To-Enable-And-Disable-MFA-Using-PowerShell-1.pdf",
    challenge: "Managing MFA manually for multiple users was time-consuming.",
    solution:
      "Created a secure PowerShell script to enable and disable MFA in bulk.",
    result:
      "Reduced admin effort and improved Microsoft 365 security compliance.",
  },

  {
    title: "Dynamic Navigation Bar Using SPFx Application Customizer",
    description:
      "An SPFx Application Customizer that delivers a dynamic, role-based navigation bar across modern SharePoint sites.",
    image: "/images/case-study/sharepoint/navigation-bar.webp",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Creating-a-Dynamic-Navigation-Bar-using-SPFx-Application-Customizer.pdf",
    challenge:
      "Lack of centralized navigation created inconsistent user experience.",
    solution:
      "Implemented role-based dynamic navigation using SPFx Application Customizer.",
    result:
      "Enhanced usability and improved cross-site navigation consistency.",
  },

  {
    title: "Custom Footer for SharePoint Online",
    description:
      "A reusable SPFx footer component designed to enhance branding and accessibility.",
    image: "/images/case-study/sharepoint/custom-footer.webp",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Enhancing-User-Experience-with-a-Custom-Footer-using-SPFx.pdf",
    challenge:
      "Maintaining consistent branding across SharePoint sites was difficult.",
    solution:
      "Developed a reusable SPFx footer extension with centralized configuration.",
    result: "Achieved consistent branding and improved user experience.",
  },

  {
    title: "Global Notification Banner in SharePoint",
    description:
      "A SharePoint-wide notification banner using SPFx Application Customizer.",
    image: "/images/case-study/sharepoint/notification-banner.webp",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Implementing-a-Global-Notification-Banner-with-SPFx-Application-Customizer.pdf",
    challenge:
      "Organizations lacked an efficient way to broadcast urgent updates.",
    solution:
      "Built a centralized SPFx banner with configurable messaging controls.",
    result: "Improved internal communication and ensured timely announcements.",
  },
];
export default function SharePointCaseStudies() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % caseStudies.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const study = caseStudies[index];

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-6 text-left max-w-3xl">
          <span
            className="inline-block px-4 py-1.5 rounded-full  bg-gradient-to-r
      from-blue-600
      via-cyan-500
      to-blue-600
      bg-clip-text
      text-transparent text-xs font-semibold uppercase tracking-wider border border-purple-500/20"
          >
            Featured
          </span>

          <h2 className="mt-4 text-3xl md:text-4xl font-semibold text-black leading-tight">
            Featured SharePoint{" "}
            <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent">
              Success Stories
            </span>
          </h2>
             <p className="mt-4 text-gray-600 text-base leading-relaxed">
         Discover how we design and develop powerful SharePoint solutions that streamline collaboration, automate business processes, and deliver secure, scalable digital workplaces.
          </p>
        </div>
        {/* ================= SLIDER ================= */}
        <div className="relative overflow-hidden">
          <div className="relative h-[520px]">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                initial={{ x: 1000 }}
                animate={{ x: 0 }}
                exit={{ x: -1000 }}
                transition={{
                  duration: 0.7,
                  ease: [0.4, 0, 0.2, 1],
                }}
                className="absolute inset-0 grid md:grid-cols-2 gap-10 items-center bg-gradient-to-br from-black via-zinc-900 to-gray-800 rounded-3xl border border-slate-200 shadow-[0_40px_80px_-40px_rgba(15,23,42,0.25)] p-10"
              >
                {/* LEFT CONTENT */}
                <div className="space-y-6 md:pr-10 md:border-r md:border-white/10">
                  <span className="inline-block text-[11px] uppercase tracking-widest text-blue-400 font-semibold">
                    SharePoint Case Study
                  </span>

                  <h2 className="text-2xl md:text-3xl font-semibold text-white leading-snug">
                    {study.title}
                  </h2>

                  <div className="w-14 h-px bg-gradient-to-r from-blue-500 via-blue-400/40 to-transparent"></div>

                  <div className="space-y-5 pt-2">
                    {/* Challenge */}
                    <div className="flex gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/10 text-red-400">
                        <AlertTriangle size={15} />
                      </div>
                      <div>
                        <h4 className="text-[11px] font-semibold text-red-400 uppercase tracking-wider">
                          Challenge
                        </h4>
                        <p className="text-white/70 text-xs mt-1 leading-relaxed">
                          {study.challenge}
                        </p>
                      </div>
                    </div>
                    {/* Solution */}
                    <div className="flex gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                        <Lightbulb size={15} />
                      </div>
                      <div>
                        <h4 className="text-[11px] font-semibold text-blue-400 uppercase tracking-wider">
                          Solution
                        </h4>
                        <p className="text-white/70 text-xs mt-1 leading-relaxed">
                          {study.solution}
                        </p>
                      </div>
                    </div>

                    {/* Result */}
                    <div className="flex gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-500/10 text-green-400">
                        <TrendingUp size={15} />
                      </div>
                      <div>
                        <h4 className="text-[11px] font-semibold text-green-400 uppercase tracking-wider">
                          Results
                        </h4>
                        <p className="text-white/70 text-xs mt-1 leading-relaxed">
                          {study.result}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Link
                    href={study.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2  bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-blue-600/30"
                  >
                    View Full Case Study
                    <span className="text-lg">→</span>
                  </Link>
                </div>

                {/* RIGHT IMAGE */}
                <div>
                  <Image
                    src={study.image}
                    alt={study.title}
                    width={1000}
                    height={600}
                    className="w-full h-[420px] object-cover rounded-2xl"
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
