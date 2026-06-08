"use client";

import { useEffect, useRef, useState } from "react";
import {
  Braces,
  FileCode2,
  Atom,
  Layers,
  Database,
  Server,
  Cloud,
  ShieldCheck,
} from "lucide-react";

/* ================= TYPES ================= */
type Tech = {
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const TABS = [
  "FRONTEND",
  "BACKEND",
  "DATABASE",
  "DEVOPS",
  "QUALITY ASSURANCE",
] as const;

/* ================= DATA ================= */
const techData: Record<(typeof TABS)[number], Tech[]> = {
  FRONTEND: [
    { name: "JavaScript", icon: Braces },
    { name: "TypeScript", icon: FileCode2 },
    { name: "React JS", icon: Atom },
    { name: "Vue JS", icon: Layers },
    { name: "Angular", icon: Atom },
  ],
  BACKEND: [
    { name: "Node JS", icon: Server },
    { name: "Python", icon: FileCode2 },
    { name: "Java", icon: Braces },
    { name: "Spring", icon: Cloud },
  ],
  DATABASE: [
    { name: "MongoDB", icon: Database },
    { name: "MySQL", icon: Database },
    { name: "PostgreSQL", icon: Database },
    { name: "Firebase", icon: Cloud },
  ],
  DEVOPS: [
    { name: "Docker", icon: Cloud },
    { name: "Kubernetes", icon: Layers },
    { name: "Jenkins", icon: Server },
    { name: "GitLab", icon: ShieldCheck },
  ],
  "QUALITY ASSURANCE": [
    { name: "Selenium", icon: ShieldCheck },
    { name: "Postman", icon: Server },
    { name: "JMeter", icon: Database },
    { name: "Cucumber", icon: Layers },
  ],
};

export default function TechnologiesTabs() {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>("DATABASE");

  const tabsRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  /* ===== Smooth indicator alignment ===== */
  useEffect(() => {
    const activeBtn = tabsRef.current?.querySelector<HTMLButtonElement>(
      `[data-tab="${activeTab}"]`,
    );

    if (!activeBtn || !indicatorRef.current || !tabsRef.current) return;

    const rect = activeBtn.getBoundingClientRect();
    const parentRect = tabsRef.current.getBoundingClientRect();

    indicatorRef.current.style.width = `${rect.width}px`;
    indicatorRef.current.style.transform = `translateX(${rect.left - parentRect.left}px)`;
  }, [activeTab]);

  return (
    <section className="relative px-4 overflow-hidden py-16">
      <div className="max-w-7xl mx-auto">
        {/* ===== ADVANCED HEADER (PREMIUM LIGHT) ===== */}
        <div className="relative text-center mb-10 max-w-5xl mx-auto px-6">
          {/* Eyebrow Badge */}
          <span
            className="
    inline-flex items-center
    px-5 py-2 mb-2
    rounded-full

    text-[11px] font-semibold
    tracking-[0.35em] uppercase

    bg-gradient-to-b from-white to-gray-50
    text-orange-600
    border border-gray-200
    shadow-sm
  "
          >
            Technology Stack
          </span>

          {/* Title */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
            Built with proven, future-ready{" "}
            <span
              className="
      bg-gradient-to-r
      from-orange-600
      via-amber-500
      to-orange-600
      bg-clip-text
      text-transparent
    "
            >
              Technologies
            </span>
          </h2>

          {/* Description */}
          <p className="mt-2 max-w-2xl mx-auto text-gray-600 text-base md:text-lg leading-relaxed">
            A carefully curated technology stack that empowers us to build
            high-performance, secure, and scalable digital solutions with
            long-term reliability.
          </p>
        </div>

        {/* ================= TABS ================= */}
        <div className="flex justify-center shadow-3xl">
          <div className="relative w-full max-w-6xl">
            <div
              ref={tabsRef}
              className="
        relative flex flex-wrap justify-center gap-4
        rounded-t-2xl px-6 py-4
      bg-gradient-to-r from-black via-[#4c1c02] to-black backdrop-blur-lg
        border border-white/10 border-b-0
      "
            >
              {TABS.map((tab) => (
                <button
                  key={tab}
                  data-tab={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-full text-xs md:text-sm font-medium
            transition-all duration-200
            ${
              activeTab === tab
                ? "text-black bg-white shadow-md"
                : "text-zinc-400 hover:text-white hover:bg-white/10"
            }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>
        {/* ================= CARDS ================= */}
        <div className="flex justify-center">
          <div className="relative w-full max-w-6xl ">
            <div className="relative rounded-b-2xl bg-gradient-to-r from-black via-[#4c1c02] to-black border border-white/10 border-t-0">
              {/* Subtle inner glow */}
              <div className="absolute inset-0 rounded-b-2xl bg-white/5 pointer-events-none" />

              <div className="relative px-6 py-16">
                <div
                  key={activeTab}
                  className="grid gap-8 justify-center
            [grid-template-columns:repeat(auto-fit,minmax(190px,1fr))]"
                >
                  {techData[activeTab].map((tech, i) => {
                    const Icon = tech.icon;

                    return (
                      <div
                        key={tech.name}
                        style={{ animationDelay: `${i * 60}ms` }}
                        className="animate-card-in mx-auto w-[190px]"
                      >
                        <div
                          className="
                    group rounded-2xl p-[1px]
                    bg-zinc-800 hover:bg-white/30
                    transition-colors duration-300
                  "
                        >
                          <div
                            className="
                      rounded-2xl bg-zinc-900/90 p-7
                      flex flex-col items-center justify-center
                      border border-white/10
                      transition-all duration-300
                      group-hover:-translate-y-1
                    "
                          >
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/5">
                              <Icon
                                className="h-6 w-6 text-white/80"
                                strokeWidth={1.8}
                              />
                            </div>

                            <span className="text-sm font-medium text-zinc-200 text-center">
                              {tech.name}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
