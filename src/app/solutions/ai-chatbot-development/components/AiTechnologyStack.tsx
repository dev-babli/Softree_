"use client";

import React, { useState } from "react";
import { aiTechnologyCategories } from "../data/tech-stack";
import SectionBadge from "./SectionBadge";

export default function AiTechnologyStack() {
  const [activeTab, setActiveTab] = useState<string>(aiTechnologyCategories[0]?.id || "");
  const activeCategory = aiTechnologyCategories.find((cat) => cat.id === activeTab) || aiTechnologyCategories[0];

  return (
    <section className="px-4 py-12 md:py-16 lg:py-20 bg-transparent">
      <div className="max-w-7xl mx-auto">
        {/* ================= HEADER ================= */}
        <div className="mb-10 text-center flex flex-col items-center">
          <SectionBadge text="AI TECHNOLOGY STACK" variant="line" />

          <h2 className="text-2xl md:text-4xl lg:text-[2.25rem] font-extrabold text-[#111827] mb-2 md:mb-3 tracking-tight text-center leading-tight">
            Technology Stack for Enterprise{" "}
            <span className="text-[#FF6A13]">AI Chatbot Development</span>
          </h2>

          <p className="text-[15px] lg:text-base text-[#6B7280] mb-6 lg:mb-8 text-center max-w-2xl mx-auto leading-relaxed">
            We build production-ready AI chatbots using leading LLMs, Microsoft Copilot Studio, RAG frameworks, vector databases, cloud platforms, and enterprise security technologies for secure, scalable conversations.
          </p>
        </div>

        {/* ================= TABS ================= */}
        <div className="mb-10 flex justify-center">
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 border-b border-gray-200">
            {aiTechnologyCategories.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative pb-3 text-sm font-medium transition ${
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
        <div className="relative rounded-[32px] border border-white/10 bg-gradient-to-r from-black via-[#4c1c02] to-black px-4 sm:px-10 py-12 shadow-2xl">
          {/* ambient glow */}
          <div className="pointer-events-none absolute inset-0 flex justify-center overflow-hidden rounded-[32px]">
            <div className="h-40 w-full max-w-[520px] rounded-full bg-orange-600/20 blur-[120px]" />
          </div>

          <div
            key={activeTab}
            className="relative z-10 grid gap-8 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6"
          >
            {activeCategory?.items.map((tech) => {
              const Icon = tech.icon;

              return (
                <div
                  key={tech.name}
                  className="group relative flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl transition-all duration-300 ease-out hover:-translate-y-2 hover:bg-white/10 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
                >
                  {/* icon container */}
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-600/10 ring-1 ring-orange-600/20 transition group-hover:bg-orange-600 group-hover:ring-orange-600">
                    <Icon className="h-6 w-6 text-orange-400 group-hover:text-white transition" />
                  </div>

                  {/* name */}
                  <span className="text-center text-sm font-medium text-gray-200 tracking-wide">
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
