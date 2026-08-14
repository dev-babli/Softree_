"use client";

import React, { useState } from "react";
import { industryTechnologyCategories } from "../data/tech-stack";
import SectionBadge from "./SectionBadge";
import { useIndustryConfig } from "../context";

export default function AiTechnologyStack() {
  const { sections } = useIndustryConfig();
  const copy = sections.techStack;
  const [activeTab, setActiveTab] = useState<string>(industryTechnologyCategories[0]?.id || "");
  const activeCategory =
    industryTechnologyCategories.find((cat) => cat.id === activeTab) ||
    industryTechnologyCategories[0];

  return (
    <section className="bg-gradient-to-b from-zinc-50 via-white to-zinc-50 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-[85rem]">
        <div className="mb-10 flex flex-col items-center text-center">
          <SectionBadge text={copy.badge} variant="line" />

          <h2 className="mb-2 text-center text-2xl font-extrabold leading-tight tracking-tight text-[#111827] md:mb-3 md:text-4xl lg:text-[2.25rem]">
            {copy.title}{" "}
            <span className="text-[#FF6A13]">{copy.highlight}</span>
          </h2>

          <p className="mx-auto mb-6 max-w-2xl text-center text-[15px] leading-relaxed text-[#6B7280] lg:mb-8 lg:text-base">
            {copy.description}
          </p>
        </div>

        {/* ================= TABS ================= */}
        <div className="mb-10 flex justify-center">
          <div className="flex flex-wrap justify-center gap-1 border-b border-gray-200 sm:gap-3 md:gap-8">
            {industryTechnologyCategories.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative min-h-[44px] px-3 py-3 text-xs font-medium transition sm:text-sm ${
                  activeTab === tab.id
                    ? "text-orange-600"
                    : "text-gray-800 hover:text-gray-700"
                }`}
              >
                {tab.label}

                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 h-[3px] w-full rounded-full bg-orange-600" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ================= TECH CARDS ================= */}
        <div className="relative rounded-[24px] border border-white/10 bg-gradient-to-r from-black via-[#4c1c02] to-black px-4 py-10 shadow-2xl sm:rounded-[32px] sm:px-10 sm:py-12">
          {/* ambient glow */}
          <div className="pointer-events-none absolute inset-0 flex justify-center overflow-hidden rounded-[24px] sm:rounded-[32px]">
            <div className="h-40 w-full max-w-[520px] rounded-full bg-orange-600/20 blur-[120px]" />
          </div>

          <div
            key={activeTab}
            className="relative z-10 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-8 lg:grid-cols-6"
          >
            {activeCategory?.items.map((tech) => {
              const Icon = tech.icon;

              return (
                <div
                  key={tech.name}
                  className="group relative flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl transition-all duration-300 ease-out hover:bg-white/10 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)] sm:p-7 sm:hover:-translate-y-2"
                >
                  {/* icon container */}
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-orange-600/10 ring-1 ring-orange-600/20 transition group-hover:bg-orange-600 group-hover:ring-orange-600 sm:mb-4 sm:h-12 sm:w-12">
                    <Icon className="h-5 w-5 text-orange-400 transition group-hover:text-white sm:h-6 sm:w-6" />
                  </div>

                  {/* name */}
                  <span className="break-words text-center text-xs font-medium tracking-wide text-gray-200 sm:text-sm">
                    {tech.name}
                  </span>

                  {/* hover glow */}
                  <span className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-600/10 via-transparent to-amber-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
