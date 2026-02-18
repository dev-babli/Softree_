"use client";

import { useState } from "react";
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
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>(
    "FRONTEND DEVELOPMENT",
  );

  return (
    <section className=" py-15 bg-gradient-to-b from-gray-50 via-white to-gray-50 px-4">
      <div className="max-w-7xl mx-auto">
        {/* ================= HEADER ================= */}
        <div className="text-center mb-14">
          <span className="block mb-4 text-[11px] tracking-[0.35em] uppercase text-indigo-600 font-semibold">
            Web Development Stack
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Technologies powering modern{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">
              Web Applications
            </span>
          </h2>

          <p className="mt-8 max-w-2xl mx-auto text-gray-600 text-base leading-relaxed">
            Our stack is built for performance, scalability, and long-term
            maintainability — from frontend experiences to backend systems and
            cloud infrastructure.
          </p>
        </div>

        {/* ================= TABS ================= */}
        <div className="flex justify-center mb-14">
          <div className="flex gap-8 border-b border-gray-200">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  relative pb-3 text-sm font-medium transition

                  ${
                    activeTab === tab
                      ? "text-indigo-600"
                      : "text-gray-800 hover:text-gray-700"
                  }
                `}
              >
                {tab}

                {/* underline indicator */}
                {activeTab === tab && (
                  <span className="absolute left-0 bottom-0 h-[3px] w-full rounded-full bg-indigo-900" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ================= TECH CARDS ================= */}
        <div className="bg-black border border-gray-800 rounded-3xl shadow-sm px-8 py-14">
          <div
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
                  className="
                    group
                    rounded-2xl
                    bg-gray-50
                    border border-gray-800
                    p-7
                    flex flex-col items-center justify-center

                    hover:bg-white
                    hover:shadow-md
                    hover:-translate-y-1
                    transition-all duration-300
                  "
                >
                  {/* icon */}
                  <div className="mb-4 h-12 w-12 flex items-center justify-center rounded-xl bg-indigo-50 group-hover:bg-indigo-600 transition">
                    <Icon className="h-6 w-6 text-indigo-600 group-hover:text-white transition" />
                  </div>

                  {/* name */}
                  <span className="text-sm font-medium text-gray-800 text-center">
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
