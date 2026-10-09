"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Building, Settings, Code, Blocks } from "lucide-react";

const NetworkGlobe = dynamic(() => import('@/app/services/ai-development-services/components/NetworkGlobe'), { ssr: true });

export const GlobalPartnersWhoWeServe = () => {
  const items = [
    {
      title: "Microsoft Partners",
      desc: "Extend your Microsoft delivery capacity with experienced engineering teams across Azure, Fabric, Power Platform, Power BI and SharePoint.",
      icon: Blocks,
      color: "text-[#FF6B2C]",
      bg: "bg-orange-50",
    },
    {
      title: "AI & Technology Companies",
      desc: "Add AI engineering, automation, agents, RAG and modern application capabilities to your portfolio.",
      icon: Code,
      color: "text-[#FF6B2C]",
      bg: "bg-orange-50",
    },
    {
      title: "Digital Agencies",
      desc: "Scale delivery capacity through a reliable technology partner working behind the scenes.",
      icon: Settings,
      color: "text-[#FF6B2C]",
      bg: "bg-orange-50",
    },
    {
      title: "SaaS & Product Companies",
      desc: "Accelerate product development with dedicated engineering and AI capabilities.",
      icon: Building,
      color: "text-[#FF6B2C]",
      bg: "bg-orange-50",
    },
  ];

  return (
    <section id="partnership" className="bg-white pt-12 md:pt-16 pb-12 md:pb-16 text-slate-900 scroll-mt-24 border-t border-slate-100">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 lg:gap-x-16 gap-y-4 lg:gap-y-6 items-start">

          {/* Top Area: Eyebrow, then Heading & Intro side-by-side */}
          <div className="lg:col-span-12 flex flex-col">
            <div className="shadow-[inset_2px_2px_5px_#e4e4e7,inset_-2px_-2px_5px_#ffffff] bg-zinc-50/50 px-3.5 py-1 rounded-full border border-white/60 mb-4 inline-block self-start">
              <span className="typo-caption text-[#FF6B2C] uppercase">
                OUR GLOBAL PARTNER NETWORK
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-4 items-start">
              <h2 className="typo-heading-2 text-slate-900 pr-4">
                A Technology Partner Network Built for <span className="text-[#FF6B2C]">Growth</span>
              </h2>

              <p className="typo-description text-slate-500 w-full pt-1.5">
                Our partnerships span technology companies, Microsoft ecosystem partners, digital agencies and product organizations looking to expand their delivery capabilities.
              </p>
            </div>
          </div>

          {/* Bottom Row: Who We Help Items (Left) and Globe (Right) */}
          <div className="lg:col-span-6 flex flex-col justify-start">
            <div className="flex flex-col divide-y divide-slate-100 w-full lg:max-w-[660px]">
              {items.map((item, i) => (
                <div
                  key={i}
                  className="py-4 first:pt-1.5 last:pb-1 group transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className={`shrink-0 w-10 h-10 rounded-lg ${item.bg} border border-orange-100 flex items-center justify-center group-hover:scale-105 group-hover:bg-[#FF6B2C] group-hover:text-white transition-all duration-300 mt-0.5`}>
                      <item.icon className={`w-5 h-5 ${item.color} group-hover:text-white transition-colors`} />
                    </div>
                    <div className="flex flex-col flex-1 min-w-0 pt-1">
                      <h4 className="typo-heading-4 text-slate-900 group-hover:text-[#FF6B2C] transition-colors">
                        {item.title}
                      </h4>
                      <p className="typo-body-lg text-slate-600 mt-1.5 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 w-full flex justify-center lg:justify-end items-stretch h-full">
            <NetworkGlobe
              heading="Where our clients are"
              tagline="Global Reach. Local Understanding."
              storesLabel="13+ countries served"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default GlobalPartnersWhoWeServe;
