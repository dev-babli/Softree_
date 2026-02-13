"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface TechItem {
  id: number;
  title: string;
  description: string;
  bgImage: string;
  link: string;
}

const techData: TechItem[] = [
  {
    id: 1,
    title: "AI & Automation",
    description:
      "Unlock the power of AI-driven innovation with intelligent copilots, automation pipelines, and data-powered decision systems. We help organizations reduce effort, improve accuracy, and create smarter digital experiences.",
    bgImage:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000&auto=format&fit=crop",
    link: "/agentic-ai",
  },
  {
    id: 2,
    title: "SharePoint Solutions",
    description:
      "We design intelligent intranets, collaboration hubs, and document management systems that empower teams to work smarter. From migration and governance to automation and integrations, our SharePoint solutions enhance productivity while ensuring security and compliance at scale.",
    bgImage:
      "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2000&auto=format&fit=crop",
    link: "/services/sharepoint",
  },
  {
    id: 3,
    title: "Power Automate",
    description:
      "Streamline repetitive tasks and connect systems with intelligent workflows. We build scalable automations that reduce manual effort, improve consistency, and accelerate business operations.",
    bgImage:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop",
    link: "/services/power-automate",
  },
  {
    id: 4,
    title: "Power Apps Development",
    description:
      "Transform manual processes into efficient digital workflows with custom Power Apps. We create low-code applications that connect your data, automate operations, and deliver rapid business value with enterprise-grade reliability.",
    bgImage:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=2000&auto=format&fit=crop",
    link: "/services/power-apps",
  },
  {
    id: 5,
    title: "Power BI & Analytics",
    description:
      "Turn complex data into meaningful insights through interactive dashboards and advanced analytics. We enable leaders to make informed decisions with real-time visibility and powerful reporting capabilities.",
    bgImage:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop",
    link: "/services/power-bi",
  },
  {
    id: 6,
    title: "Mobile App Development",
    description:
      "Build secure, scalable, and intuitive mobile applications designed for performance and growth. From strategy and UX to deployment and support, we deliver seamless cross-platform experiences your users will love.",
    bgImage:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=2000&auto=format&fit=crop",
    link: "/services/mobile-app-development",
  },
  {
    id: 7,
    title: "Web Application Development",
    description:
      "We engineer modern web applications using robust architectures, cloud-native practices, and cutting-edge frameworks. Our solutions are built for speed, security, and long-term scalability.",
    bgImage:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=2000&auto=format&fit=crop",
    link: "/services/web-app/development",
  },
];

const serviceHighlights: Record<number, string[]> = {
  1: [
    "Secure & compliant collaboration",
    "Automated governance workflows",
    "Deep Microsoft 365 integration",
  ],
  2: [
    "Rapid low-code implementation",
    "Unified data connectivity",
    "Operational efficiency at scale",
  ],
  3: [
    "AI-powered decision support",
    "Process intelligence & automation",
    "Future-ready digital innovation",
  ],
  4: [
    "Cross-platform performance",
    "User-centric design",
    "Built for growth & security",
  ],
  5: [
    "Cloud-native architecture",
    "High availability & speed",
    "Scalable for enterprise demand",
  ],
  6: [
    "Real-time data visibility",
    "Executive-ready dashboards",
    "Smarter business decisions",
  ],
  7: [
    "Enterprise-grade security",
    "Compliance and risk management",
    "Identity and access control",
  ],
};

export default function TechnologySlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // autoplay
  useEffect(() => {
    if (isHovering) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % techData.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [isHovering]);

  return (
    <section className="relative h-[600px] w-full overflow-hidden bg-black text-white flex">
      {/* ================= BACKGROUND ================= */}
      {techData.map((item, i) => (
        <div
          key={item.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-700",
            activeIndex === i ? "opacity-100" : "opacity-0",
          )}
          style={{
            backgroundImage: `url(${item.bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>
      ))}

      {/* ================= ACCORDION TABS ================= */}
      <div className="relative h-full flex w-full z-20">
        {techData.map((item, i) => {
          const isActive = activeIndex === i;

          return (
            <div
              key={item.id}
              onMouseEnter={() => {
                setIsHovering(true);
                setActiveIndex(i);
              }}
              onMouseLeave={() => setIsHovering(false)}
              className={cn(
                "relative border-l border-white/10 overflow-hidden transition-all duration-500 flex",
                isActive ? "flex-[7]" : "flex-[1]",
              )}
            >
              {/* ============ COLLAPSED ============ */}
              {!isActive && (
                <>
                  <div className="group flex items-center justify-center w-full cursor-pointer transition-all duration-300">
                    <div
                      className="
        -rotate-90 whitespace-nowrap
        text-base font-semibold tracking-wider
        text-white/70
        transition-all duration-300
        group-hover:text-white group-hover:scale-105
      "
                    >
                      {item.title}
                    </div>
                  </div>

                  {/* BIG ID */}
                  <span
                    className="
      absolute bottom-10 left-1/2 -translate-x-1/2
      text-3xl font-bold
      text-white
      transition-all duration-300
      group-hover:text-white
    "
                  >
                    0{item.id}
                  </span>
                </>
              )}

              {/* ============ EXPANDED ============ */}
              {isActive && (
                <div className="relative w-full p-12 flex flex-col justify-center">
                  {/* blue divider */}
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#2563eb]" />

                  <span className="text-[50px] font-bold text-[#2563eb] mb-4">
                    0{item.id}
                  </span>
                  <h3 className="group relative inline-block text-[28px] font-semibold tracking-tight mb-5">
                    <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
                      {item.title}
                    </span>

                    <span
                      className="
      absolute left-0 -bottom-2 h-[3px]
      w-0 group-hover:w-full
      transition-all duration-500
      rounded-full
      bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-400
    "
                    />
                  </h3>

                  <p className="text-white/70 text-[15px] leading-relaxed max-w-md mb-5">
                    {item.description}
                  </p>
                  {/* ===== HIGHLIGHTS ===== */}
                  <ul className="space-y-3 mb-7">
                    {serviceHighlights[item.id]?.map((point, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-sm text-white/75"
                      >
                        {/* BULLET */}
                        <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 shadow-[0_0_10px_rgba(56,189,248,0.6)]">
                          <span className="text-[11px] font-bold text-white">
                            ✓
                          </span>
                        </span>

                        {point}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={item.link}
                    className="
        self-start
        bg-[#2563eb]
        px-6 py-3
        rounded-full
        hover:bg-[#3b82f6]
        transition
      "
                  >
                    Learn More →
                  </Link>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
