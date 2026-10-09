"use client";

import React from "react";
import dynamic from "next/dynamic";
import { ProjectData } from "@/components/ui/argent-loop-infinite-slider";

const ArgentLoopSlider = dynamic(() => import('@/components/ui/argent-loop-infinite-slider').then(mod => mod.Component), { ssr: true });

const PROJECTS: ProjectData[] = [
  {
    title: "AI & Agentic AI",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1600&q=80",
    category: "01 — ARTIFICIAL INTELLIGENCE",
    year: "AI",
    description: "AI Agents · Agentic Workflows · RAG · AI Automation · Generative AI",
    badge: "Agentic AI",
    buttonText: "Explore Our Capabilities",
  },
  {
    title: "Microsoft",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1600&q=80",
    category: "02 — MICROSOFT ECOSYSTEM",
    year: "Microsoft",
    description: "Azure · Microsoft Fabric · Power Platform · Power BI · SharePoint",
    badge: "Microsoft",
    buttonText: "Explore Our Capabilities",
  },
  {
    title: "Data & Analytics",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80",
    category: "03 — DATA ENGINEERING",
    year: "Data",
    description: "Data Engineering · Data Modernization · Data Analytics · BI",
    badge: "Data",
    buttonText: "Explore Our Capabilities",
  },
  {
    title: "Software Engineering",
    image: "https://images.unsplash.com/photo-1607706189992-eae578626c86?w=1600&q=80",
    category: "04 — SOFTWARE DEVELOPMENT",
    year: "Engineering",
    description: "Web Applications · Cloud · APIs · Full-Stack Development · Mobile",
    badge: "Engineering",
    buttonText: "Explore Our Capabilities",
  },
];

export const GlobalPartnersWhatWeDeliver = () => {
  return (
    <section className="bg-white pt-12 md:pt-16 pb-0 overflow-hidden">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-[2cm] mt-4 md:mt-6 flex flex-col items-start text-left">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-200 bg-orange-50 typo-caption text-[#FF6B00] mb-3 uppercase">
          <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></div>
          4. WHAT WE DELIVER TOGETHER
        </div>
        <h2 className="typo-heading-2 max-w-4xl text-slate-900 mb-4">
          Technology Capabilities That <span className="text-[#FF6B2C]">Extend Your Business</span>
        </h2>
        <p className="typo-description text-slate-500 max-w-5xl">
          Our teams work as an extension of your organization, helping you deliver more projects and capabilities without increasing internal overhead.
        </p>
      </div>

      <div className="max-w-[1600px] mx-auto px-3 xs:px-4 sm:px-8 lg:px-12 mt-8 md:mt-12">
        <div className="relative w-full h-[660px] xs:h-[680px] sm:h-[720px] md:h-[780px] lg:h-[860px] rounded-2xl sm:rounded-3xl overflow-hidden border border-zinc-200/50 shadow-2xl">
          <ArgentLoopSlider projects={PROJECTS} className="h-full w-full" hideBottomDock={true} />
        </div>
      </div>

      {/* CTA Button */}
      {/* <div className="flex justify-center relative z-10">
        <a href="/services" className="group inline-flex items-center gap-2 rounded-full bg-[#FF5812] px-6 py-3 text-[13px] font-bold tracking-[0.1em] text-white uppercase transition-all hover:bg-[#FF4500] hover:shadow-[0_0_20px_rgba(255,88,18,0.4)]">
          Explore Our Capabilities
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
        </a>
      </div> */}
    </section>
  );
};

export default GlobalPartnersWhatWeDeliver;
