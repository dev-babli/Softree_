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
  Bug,
} from "lucide-react";

/* ================= TYPES ================= */
type Tech = {
  name: string;
  icon: React.ElementType;
};

const TABS = [
  "FRONTEND DEVELOPMENT",
  "BACKEND DEVELOPMENT",
  "DATABASES",
  "DEVOPS & CLOUD",
  "TESTING & QA",
] as const;

/* ================= DATA ================= */
const techData: Record<(typeof TABS)[number], Tech[]> = {
  "FRONTEND DEVELOPMENT": [
    { name: "JavaScript", icon: Braces },
    { name: "TypeScript", icon: FileCode2 },
    { name: "React", icon: Atom },
    { name: "Next.js", icon: Layers },
    { name: "Vue.js", icon: Layers },
  ],

  "BACKEND DEVELOPMENT": [
    { name: "Node.js", icon: Server },
    { name: "Express.js", icon: Server },
    { name: "Python", icon: FileCode2 },
    { name: "Java (Spring Boot)", icon: Cloud },
  ],

  DATABASES: [
    { name: "MongoDB", icon: Database },
    { name: "MySQL", icon: Database },
    { name: "PostgreSQL", icon: Database },
    { name: "Firebase", icon: Cloud },
  ],

  "DEVOPS & CLOUD": [
    { name: "Docker", icon: Cloud },
    { name: "Kubernetes", icon: Layers },
    { name: "AWS", icon: Cloud },
    { name: "CI/CD Pipelines", icon: Server },
  ],

  "TESTING & QA": [
    { name: "Jest", icon: Bug },
    { name: "Cypress", icon: Bug },
    { name: "Selenium", icon: ShieldCheck },
    { name: "Postman", icon: Server },
  ],
};

export default function TechnologiesTabs() {
  const [activeTab, setActiveTab] =
    useState<(typeof TABS)[number]>("FRONTEND DEVELOPMENT");

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
    <section className="relative py-28 px-4 overflow-hidden bg-gradient-to-br from-black via-[#0B1220] to-[#0F1A2E]">
      {/* Background layers */}
      <div className="absolute inset-0 -z-10 bg-black" />
      <div className="absolute inset-0 -z-10 bg-noise opacity-[0.015]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-black via-transparent to-black opacity-60" />

      <div className="max-w-7xl mx-auto">
        {/* ================= HEADER ================= */}
        <div className="relative text-center mb-28">
          <span className="block mb-4 text-[11px] tracking-[0.35em] uppercase text-emerald-400/70">
            Web Development Stack
          </span>

          <h2 className="relative inline-block text-4xl md:text-5xl font-semibold tracking-tight text-white">
            Technologies powering modern
            <span className="text-emerald-400"> Web Applications</span>
            <span className="absolute left-1/2 -bottom-4 -translate-x-1/2 h-px w-24 bg-emerald-400/80" />
          </h2>

          <p className="mt-10 max-w-xl mx-auto text-sm md:text-base leading-relaxed text-zinc-400">
            Our web development stack is designed for performance, scalability,
            and long-term maintainability — from frontend experiences to
            backend systems and cloud infrastructure.
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

        {/* ================= TECH CARDS ================= */}
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
                        <div className="group rounded-2xl p-[1px] bg-zinc-800 hover:bg-gradient-to-br hover:from-emerald-500 hover:to-teal-500 transition-colors">
                          <div className="rounded-2xl bg-zinc-900/90 p-7 flex flex-col items-center justify-center border border-white/10 transition-transform group-hover:-translate-y-1">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/5">
                              <Icon className="h-6 w-6 text-emerald-400" strokeWidth={1.8} />
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
