"use client";

import React from "react";
import { Users, Briefcase, UserPlus, Lightbulb, ArrowRight } from "lucide-react";

const models = [
  {
    icon: Users,
    title: "Dedicated AI Team",
    description: "For long-term healthcare AI development.",
    detail: "A fully dedicated team of AI engineers, clinical domain experts, and solution architects working exclusively on your product roadmap.",
    badge: "Most Popular",
    border: "border-blue-200/80 bg-gradient-to-b from-blue-50/50 via-white to-blue-50/30",
    iconColor: "text-blue-600 bg-blue-100/80",
  },
  {
    icon: Briefcase,
    title: "Project-Based Development",
    description: "For a defined AI healthcare project.",
    detail: "End-to-end scope delivery with fixed timelines, milestones, and turnkey execution for specific healthcare AI software deliverables.",
    badge: "Fixed Scope",
    border: "border-orange-200/80 bg-gradient-to-b from-orange-50/50 via-white to-orange-50/30",
    iconColor: "text-orange-600 bg-orange-100/80",
  },
  {
    icon: UserPlus,
    title: "AI Development Augmentation",
    description: "Extend your existing engineering team with AI expertise.",
    detail: "Rapidly add senior offshore AI developers and clinical NLP specialists to augment your in-house engineering capacity.",
    badge: "Flexible Scaling",
    border: "border-purple-200/80 bg-gradient-to-b from-purple-50/50 via-white to-purple-50/30",
    iconColor: "text-purple-600 bg-purple-100/80",
  },
  {
    icon: Lightbulb,
    title: "AI Consulting & POC",
    description: "Validate your healthcare AI idea before full development.",
    detail: "Rapid 2-4 week proof of concept (POC) prototyping and technical feasibility validation for complex medical AI algorithms.",
    badge: "Rapid Validation",
    border: "border-emerald-200/80 bg-gradient-to-b from-emerald-50/50 via-white to-emerald-50/30",
    iconColor: "text-emerald-600 bg-emerald-100/80",
  },
];

export function HealthcareEngagementModelsSection() {
  return (
    <section className="py-20 md:py-24 bg-gradient-to-b from-zinc-50 via-white to-zinc-50 border-t border-zinc-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-orange-600 text-xs font-semibold uppercase tracking-[0.2em] mb-3">
            Flexible Collaboration
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-4">
            Engagement{" "}
            <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
              Models
            </span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Choose the offshore partnership structure that best aligns with your team structure, budget, and development timeline.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {models.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`group relative p-6 sm:p-8 rounded-3xl border ${item.border} shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-12 h-12 rounded-2xl ${item.iconColor} flex items-center justify-center`}>
                      <Icon size={24} />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-white/90 border border-gray-200/80 text-[11px] font-bold text-gray-700 shadow-2xs">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm font-semibold text-gray-800 mb-3">
                    {item.description}
                  </p>
                  <p className="text-xs text-gray-600 leading-relaxed mb-6">
                    {item.detail}
                  </p>
                </div>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-700 group-hover:text-orange-600 transition-colors"
                >
                  <span>Select Model</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
