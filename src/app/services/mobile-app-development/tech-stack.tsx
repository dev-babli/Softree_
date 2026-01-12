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
  icon: React.ElementType;
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
      `[data-tab="${activeTab}"]`
    );

    if (!activeBtn || !indicatorRef.current || !tabsRef.current) return;

    const rect = activeBtn.getBoundingClientRect();
    const parentRect = tabsRef.current.getBoundingClientRect();

    indicatorRef.current.style.width = `${rect.width}px`;
    indicatorRef.current.style.transform = `translateX(${rect.left - parentRect.left}px)`;
  }, [activeTab]);

  return (
    <section className="relative py-28 px-4 overflow-hidden  bg-gradient-to-br from-black via-[#0B1220] to-[#0F1A2E]">
      {/* ===== PURE BLACK BACKGROUND ===== */}
      <div className="absolute inset-0 -z-10 bg-black" />
      <div className="absolute inset-0 -z-10 bg-noise opacity-[0.015]" />

      {/* Subtle vignette (depth, still black) */}
      <div
        className="pointer-events-none absolute inset-0 -z-10
                   bg-gradient-to-t from-black via-transparent to-black
                   opacity-60"
      />

      <div className="max-w-7xl mx-auto">
        {/* ===== ADVANCED HEADER (FINAL) ===== */}
        <div className="relative text-center mb-28">
          {/* Eyebrow */}
          <span className="block mb-4 text-[11px] tracking-[0.35em] uppercase text-emerald-400/70">
            Technology Stack
          </span>

          {/* Title */}
          <h2 className="relative inline-block text-4xl md:text-5xl font-semibold tracking-tight text-white">
            Built with proven, future-ready {}
            <span className="text-emerald-400">Technologies</span>
            <span className="absolute left-1/2 -bottom-4 -translate-x-1/2 h-px w-24 bg-emerald-400/80" />
          </h2>

          {/* Description */}
          <p className="mt-10 max-w-xl mx-auto text-sm md:text-base leading-relaxed text-zinc-400">
            A carefully curated technology stack that empowers us to build
            high-performance, secure, and scalable digital solutions with
            long-term reliability.
          </p>
        </div>

        {/* ================= TABS ================= */}
        <div className="flex justify-center">
          <div className="relative w-full max-w-6xl">
            <div
              ref={tabsRef}
              className="relative flex flex-wrap justify-center gap-4
                         rounded-t-2xl px-6 py-4
                         bg-white/5 backdrop-blur-lg
                         border border-white/10 border-b-0"
            >
              {TABS.map((tab) => (
                <button
                  key={tab}
                  data-tab={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-full text-xs md:text-sm font-medium
                              transition-colors duration-200
                    ${
                      activeTab === tab
                        ? "text-black bg-gradient-to-r from-emerald-500 to-teal-500"
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
          <div className="relative w-full max-w-6xl">
            <div className="relative rounded-b-2xl bg-zinc-950/80 border border-white/10 border-t-0">
              <div className="absolute inset-0 rounded-b-2xl bg-gradient-to-br from-emerald-500/4 to-teal-500/4 pointer-events-none" />

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
                          className="group rounded-2xl p-[1px]
                                        bg-zinc-800 hover:bg-gradient-to-br
                                        hover:from-emerald-500 hover:to-teal-500
                                        transition-colors duration-300"
                        >
                          <div
                            className="rounded-2xl bg-zinc-900/90 p-7
                                          flex flex-col items-center justify-center
                                          border border-white/10
                                          transition-transform duration-300
                                          group-hover:-translate-y-1"
                          >
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/5">
                              <Icon
                                className="h-6 w-6 text-emerald-400"
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
