"use client";

import { useRef, useState } from "react";
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
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "@/components/homepage-light/SectionHeader";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const ACCENT = "#1852FF" as const;

/* ================= TYPES ================= */
type Tech = {
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
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
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>(
    "FRONTEND DEVELOPMENT",
  );

  useGSAP(
    () => {
      if (!gridRef.current || prefersReducedMotion()) return;
      const cards = gridRef.current.querySelectorAll(".tech-card");
      gsap.fromTo(
        cards,
        { y: 24, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.45,
          stagger: 0.06,
          ease: "power3.out",
        },
      );
    },
    { scope: sectionRef, dependencies: [activeTab] },
  );

  useGSAP(
    () => {
      if (!sectionRef.current || prefersReducedMotion()) return;
      gsap.from(sectionRef.current.querySelector(".stack-panel"), {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      data-section="web-dev-stack"
      className="px-4 py-16 md:py-20"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-14 text-center">
          <SectionHeader
            badge="Web development stack"
            accent={ACCENT}
            headline="Technologies powering modern web applications"
            body="Our stack is built for performance, scalability, and long-term maintainability — from frontend experiences to backend systems and cloud infrastructure."
            className="mx-auto items-center [&_p]:mx-auto"
          />
        </div>

        <div className="mb-14 flex justify-center">
          <div className="flex flex-wrap justify-center gap-4 border-b border-[#0a0a1a]/10 md:gap-8">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative pb-3 text-sm font-medium transition ${
                  activeTab === tab
                    ? "text-[#1852FF]"
                    : "text-[#0a0a1a]/55 hover:text-[#0a0a1a]"
                }`}
              >
                {tab}
                {activeTab === tab ? (
                  <span className="absolute bottom-0 left-0 h-[3px] w-full rounded-full bg-[#1852FF]" />
                ) : null}
              </button>
            ))}
          </div>
        </div>

        <div className="stack-panel rounded-3xl border border-[#0a0a1a]/[0.06] bg-[#0a0a0a] px-6 py-12 shadow-[0_24px_60px_-24px_rgba(10,10,26,0.35)] md:px-8 md:py-14">
          <div
            ref={gridRef}
            key={activeTab}
            className="
              grid gap-8
              [grid-template-columns:repeat(auto-fit,minmax(180px,1fr))]
            "
          >
            {techData[activeTab].map((tech) => {
              const Icon = tech.icon;

              return (
                <div
                  key={tech.name}
                  className="tech-card group flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-7 transition-all duration-300 hover:-translate-y-1 hover:bg-white/10"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#1852FF]/15 transition group-hover:bg-[#1852FF]">
                    <Icon className="h-6 w-6 text-[#1852FF] transition group-hover:text-white" />
                  </div>
                  <span className="text-center text-sm font-medium text-white/90">
                    {tech.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
