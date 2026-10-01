"use client";

import React from "react";
import { Users, Shield, Maximize, Cpu, UserPlus, Globe, Star, Quote } from "lucide-react";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";

export const WhyChooseSoftree = () => {
  const features = [
    {
      title: "Dedicated QA Automation Teams",
      description:
        "Access experienced QA automation engineers who work alongside your development teams to build, maintain, and scale reliable automated testing.",
      icon: Users,
    },
    {
      title: "Scalable Test Automation",
      description:
        "Build reusable and maintainable automation frameworks for web, mobile, API, regression, and end-to-end testing as your application grows.",
      icon: Shield,
    },
    {
      title: "Flexible & Scalable Engagements",
      description:
        "Scale automation testing capacity based on project requirements, application complexity, release schedules, and evolving quality goals.",
      icon: Maximize,
    },
    {
      title: "CI/CD & Continuous Testing",
      description:
        "Integrate automated tests into CI/CD pipelines to accelerate feedback, improve release confidence, and support continuous software delivery.",
      icon: Cpu,
    },
    {
      title: "End-to-End Quality Engineering",
      description:
        "Extend beyond test automation with functional, API, integration, regression, performance, and end-to-end quality engineering practices.",
      icon: UserPlus,
    },
    {
      title: "Cost-Effective Offshore Delivery",
      description:
        "Leverage India-based QA automation expertise to increase testing capacity, reduce repetitive manual effort, and maintain consistent software quality.",
      icon: Globe,
    },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col lg:flex-row gap-16 items-start">

          {/* Left Column - Timeline */}
          <div className="flex-1">
            <div className="mb-12">
              <span className={cn("inline-block py-1 px-3 rounded-full border border-orange-200 bg-orange-50 text-orange-600 mb-4", typography.caption.default)}>
                Why Choose Softree
              </span>
              <h2 className={cn("text-slate-900", typography.heading.h2)}>
                Built for <span className="text-[#F25A28]">Long-Term Impact</span>
              </h2>
            </div>

            <div className="relative border-l border-orange-200 ml-3 md:ml-4 space-y-10 pb-4">
              {features.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <div key={idx} className="relative pl-10 md:pl-12">
                    {/* Number badge */}
                    <div className="absolute -left-[18px] top-0.5 bg-white py-1 text-orange-500 font-bold text-sm">
                      {String(idx + 1).padStart(2, '0')}
                    </div>

                    {/* Icon */}
                    <div className="absolute left-6 top-1 text-orange-500">
                      <Icon size={18} strokeWidth={2.5} />
                    </div>

                    <div>
                      <h3 className={cn("text-slate-900 mb-2", typography.heading.h4)}>
                        {feature.title}
                      </h3>
                      <p className={cn("text-slate-600", typography.body.default)}>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column - Testimonial Card */}
          <div className="w-full lg:w-[480px] shrink-0 sticky top-24">
            <div className="bg-[#0A0A0A] rounded-2xl p-8 md:p-10 shadow-2xl relative overflow-hidden group">
              {/* Subtle background glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-orange-500/10 blur-3xl rounded-full opacity-50 group-hover:opacity-70 transition-opacity duration-700" />

              <div className="relative z-10">
                <div className="text-orange-500 text-xs font-bold tracking-widest uppercase mb-4">
                  Client Feedback
                </div>

                <h3 className={cn("text-white mb-6", typography.heading.h3)}>
                  Trusted by Software Teams
                </h3>

                <div className="flex items-center gap-4 mb-3">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} fill="currentColor" />
                    ))}
                  </div>
                  <div className="text-white font-bold text-lg">
                    4.9 / 5 <span className="text-zinc-400 text-sm font-normal">average rating</span>
                  </div>
                </div>

                <p className="text-zinc-400 text-sm mb-10">
                  Based on <strong className="text-white">150+ client reviews</strong>
                </p>

                <div className="mb-6 flex text-yellow-400 space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} fill="currentColor" />
                  ))}
                </div>

                <blockquote className="text-xl md:text-2xl text-white font-medium leading-snug mb-10">
                  "Overall, we are satisfied with our collaboration in the past and your last action and response to our reported issue, really makes a difference."
                </blockquote>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-orange-500 shrink-0">
                    <UserPlus size={18} />
                  </div>
                  <div>
                    <div className="text-white font-bold text-lg">
                      Arkady Fedorovtsjev
                    </div>
                    <div className="text-zinc-400 text-sm">
                      ECG Group <br />
                      <span className="text-xs">📍 Netherlands</span>
                    </div>
                  </div>
                </div>

                {/* Navigation arrows (decorative) */}
                <div className="flex items-center gap-4 mt-12 text-zinc-500">
                  <button className="hover:text-white transition-colors">&lt;</button>
                  <div className="flex gap-1">
                    <span className="w-1.5 h-4 bg-zinc-600 rounded-full" />
                    <span className="w-1.5 h-4 bg-zinc-600 rounded-full" />
                  </div>
                  <button className="hover:text-white transition-colors">&gt;</button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
