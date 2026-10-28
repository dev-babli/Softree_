"use client";

import React from "react";
import { Building, Settings, Code, Blocks, Building2 } from "lucide-react";
import { FlowButton } from "@/components/ui/flow-button";
import { typography } from "@/lib/typography";

import dynamic from 'next/dynamic';

const NetworkGlobe = dynamic(() => import('@/app/services/ai-development-services/components/NetworkGlobe'), { ssr: true });

export const MobileAppDevServices = ({ simple = false }: { simple?: boolean }) => {
  const items = [
    {
      title: "Businesses & Startups",
      desc: "Build and scale custom mobile apps aligned with your business goals.",
      subdesc: "Develop custom mobile apps for customer engagement, business operations, digital services, and new product launches with flexible offshore engineering support.",
      icon: Building,
      color: "text-[#FF6B2C]",
      bg: "bg-orange-50",
    },
    {
      title: "Digital Agencies",
      desc: "Expand your mobile app delivery without increasing internal headcount.",
      subdesc: "Partner with offshore mobile app developers to deliver client projects, manage development workloads, and support ongoing product enhancements.",
      icon: Blocks,
      color: "text-[#FF6B2C]",
      bg: "bg-orange-50",
    },
    {
      title: "Technology & Product Companies",
      desc: "Accelerate mobile product development with dedicated engineering capacity.",
      subdesc: "Build and enhance iOS, Android, and cross-platform applications with support for frontend development, backend integration, APIs, and application maintenance.",
      icon: Code,
      color: "text-[#FF6B2C]",
      bg: "bg-orange-50",
    },
    {
      title: "Consulting Firms & System Integrators",
      desc: "Extend your capabilities with a dedicated offshore mobile engineering team.",
      subdesc: "Add mobile application development to your client engagements with engineering support for custom apps, enterprise integrations, testing, and deployment.",
      icon: Settings,
      color: "text-[#FF6B2C]",
      bg: "bg-orange-50",
    },
    {
      title: "App Resellers & White-Label Partners",
      desc: "Deliver custom mobile applications under your own brand with white-label support.",
      subdesc: "Use Softree's white-label mobile app development support to serve client projects while your team manages client relationships and project delivery.",
      icon: Building2,
      color: "text-[#FF6B2C]",
      bg: "bg-orange-50",
    },

  ];

  return (
    <section className="bg-white pt-8 md:pt-12 pb-8 md:pb-12 text-slate-900 scroll-mt-24">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 lg:gap-x-16 gap-y-8 lg:gap-y-10 items-stretch">

          {/* Top Area: Eyebrow, then Heading & Intro side-by-side */}
          {!simple && (
            <div className="lg:col-span-12 flex flex-col">
              <div className="shadow-[inset_2px_2px_5px_#e4e4e7,inset_-2px_-2px_5px_#ffffff] bg-zinc-50/50 px-3.5 py-1 rounded-full border border-white/60 mb-4 inline-block self-start">
                <span className={`${typography.caption.default} text-[#FF6B2C] uppercase`}>
                  WHO WE HELP & WHERE WE OPERATE
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-4 items-start">
                <h2 className={`${typography.heading.h2} text-slate-900 pr-4`}>
                  Offshore Mobile App Development for <br className="hidden lg:block" /><span className="text-[#FF6B2C]">Growth & Partnerships</span>
                </h2>

                <p className={`${typography.description.default} text-slate-500 w-full pt-1.5`}>
                  Softree delivers custom iOS, Android, and cross-platform apps with dedicated offshore engineering teams. We help businesses, agencies, and tech partners accelerate mobile product roadmaps with flexible, scalable delivery.
                </p>

              </div>

            </div>
          )}

          {/* Bottom Row: Who We Help Items (Left) and Globe (Right) */}
          <div className="lg:col-span-6 flex flex-col justify-between h-full w-full">
            {/* 5 Content List */}
            <div className="flex flex-col divide-y divide-slate-100">
              {items.map((item, i) => (
                <div
                  key={i}
                  className="py-3 first:pt-1.5 last:pb-1 group transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className={`shrink-0 w-10 h-10 rounded-lg ${item.bg} border border-orange-100 flex items-center justify-center group-hover:scale-105 group-hover:bg-[#FF6B2C] group-hover:text-white transition-all duration-300 mt-0.5`}>
                      <item.icon className={`w-5 h-5 ${item.color} group-hover:text-white transition-colors`} />
                    </div>
                    <div className="flex flex-col flex-1 min-w-0">
                      <h4 className={`${typography.heading.h4} text-slate-900 group-hover:text-[#FF6B2C] transition-colors`}>
                        {item.title}
                      </h4>
                      <p className={`${typography.body.lg} font-semibold text-slate-700 mt-1`}>
                        {item.desc}
                      </p>
                      <p className={`${typography.body.sm} text-slate-500 mt-1`}>
                        {item.subdesc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Single Section-Level CTA Below */}
            <div className="pt-4 mt-auto border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className={`${typography.body.default} text-slate-700 text-center sm:text-left`}>
                Ready to scale your mobile app development capacity?
              </p>
              <FlowButton
                href="/contact"
                text="Explore Partnership"
                variant="orange-filled"
                className="shrink-0"
              />
            </div>
          </div>

          <div className="lg:col-span-6 w-full flex justify-center lg:justify-end items-stretch">
            <NetworkGlobe
              heading="Where our clients are"
              tagline="Global Reach. Local Understanding."
              subheading="Trusted by businesses across 13+ countries, we deliver technology solutions that help organizations build, scale, and transform digitally."
              storesLabel="13+ countries served"
              caption="Trusted by businesses across 13+ countries, we deliver technology solutions that help organizations build, scale, and transform digitally."
            />
          </div>

        </div>
      </div>
    </section>
  );
};


export default MobileAppDevServices;

