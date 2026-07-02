"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useRouter } from "next/navigation";
import { FileText, AlertTriangle, Lightbulb } from "lucide-react";

import "swiper/css";

const caseStudies = [
  {
    title: "SharePoint Site Pages to PDF",
    category: "SharePoint",
    summary: "Automated high-fidelity PDF generation from SharePoint Site Pages for regulatory compliance and document archival.",
    challenge: "Standard browser print actions generated misaligned headers, broken page layouts, and missed crucial metadata.",
    solution: "Designed a custom SPFx solution to render pixel-perfect PDF documents preserving typography, branding, and layouts.",
    impact: "Reduced manual layout adjustments by 95% and automated PDF compilation workflows for auditing.",
    tech: ["SPFx", "PDF Engine", "SharePoint API", "TypeScript"],
    image: "/images/case-study/sharepoint/pdf.png",
    href: "https://www.softreetechnology.com/case-studies/sharepoint-site-pages-to-pdf",
  },
  {
    title: "Contacts Management System Application",
    category: "SharePoint",
    summary: "Unified contact hub integrating directory synchronization, permission management, and custom organizational charts.",
    challenge: "Siloed lists of contacts across departments led to out-of-date directories and duplicate communication efforts.",
    solution: "Created a central directory platform inside SharePoint using SPFx and custom React components.",
    impact: "Saved over 20+ support hours weekly and unified organizational contact data with real-time syncing.",
    tech: ["SharePoint Online", "React", "Graph API", "Fluent UI"],
    image: "/images/case-study/sharepoint/contact.png",
    href: "https://www.softreetechnology.com/case-studies/contacts-management-system-application",
  },
  {
    title: "Claim Request Management Platform",
    category: "SharePoint",
    summary: "Automated business expense and claim request validation pipeline with multi-level approval stages.",
    challenge: "Manual spreadsheet tracking and long email chains delayed expense approvals by weeks.",
    solution: "Implemented a custom SharePoint portal backed by Power Automate for smart validations and notifications.",
    impact: "Reduced approval processing cycles from 14 days down to 48 hours and improved tracking transparency.",
    tech: ["SharePoint Online", "Power Automate", "React", "Microsoft Flow"],
    image: "/images/case-study/sharepoint/claim.png",
    href: "https://www.softreetechnology.com/case-studies/claim-request-management-platform",
  },
  {
    title: "SharePoint SPFx Automation Testing & QA",
    category: "SharePoint",
    summary: "Automated validation framework for SPFx components to secure continuous delivery pipelines.",
    challenge: "Manual QA checks on dynamic custom web parts delayed code releases and risked visual regression on live portals.",
    solution: "Designed a comprehensive unit, integration, and UI testing framework using Jest and Playwright.",
    impact: "Accelerated release cycles by 70% and captured 99% of regression bugs before staging deployment.",
    tech: ["SPFx", "Jest", "Playwright", "CI/CD Pipeline"],
    image: "/images/case-study/sharepoint/sp.png",
    href: "https://www.softreetechnology.com/case-studies/sharepoint-spfx-automation-testing-quality-assurance",
  },
];

export default function SharePointCaseStudies() {
  const swiperRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();

  return (
    <section className="relative py-16">
      <div className="w-[86%] max-w-7xl mx-auto space-y-8">
        <div className="text-center">
          {/* Badge */}
          <span className="inline-block mb-2 px-4 py-1.5 rounded-full bg-orange-50 text-orange-600 text-xs font-semibold tracking-[0.18em] uppercase">
            SharePoint Case Studies
          </span>

          {/* Title */}
          <h2 className="text-3xl lg:text-4xl font-semibold text-gray-900">
            SharePoint in Action:
            <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent font-semibold"> Modern Workplace Solutions</span>
          </h2>

          {/* Description */}
          <p className="mt-3 max-w-3xl mx-auto text-base text-gray-600 leading-relaxed">
            Discover how Softree builds intelligent SharePoint intranets,
            portals, and SPFx solutions that streamline collaboration, automate
            workflows, and enhance productivity across Microsoft 365
            environments.
          </p>
        </div>

        <div
          className="
            w-full
            h-auto min-h-[680px] md:h-[70vh] md:max-h-[680px]
            bg-gradient-to-r from-[#fafafa] via-orange-50/30 to-[#fafafa]
            rounded-[32px]
            border border-slate-200
            shadow-xl
            overflow-hidden
          "
        >
          <Swiper
            modules={[Autoplay]}
            slidesPerView={1}
            loop
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={900}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="h-full w-full overflow-hidden"
          >
            {caseStudies.map((item, index) => (
              <SwiperSlide key={index} className="h-full w-full">
                {/* FULL WIDTH CARD */}
                <div className="relative w-full h-full overflow-hidden rounded-[32px]">
                  {/* Border */}
                  <div className="pointer-events-none absolute inset-0 rounded-[32px] ring-1 ring-white/15" />

                  {/* CARD BODY */}
                  <div
                    className="
                      w-full
                      h-full
                      bg-gradient-to-r from-black via-[#4c1c02] to-black
                      p-10
                      flex flex-col justify-center
                    "
                  >
                    {/* Header */}
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-semibold text-white">
                        {item.title} — Case Study
                      </h3>

                      <p className="mt-2 text-sm text-slate-300 flex items-center justify-center gap-2">
                        📍 Client Country
                        <span className="font-medium text-white">
                          United States 🇺🇸
                        </span>
                      </p>
                    </div>

                    {/* Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
                      {/* Image */}
                      <div className="flex justify-center w-full min-w-0">
                        <div className="w-full max-w-[380px] h-[200px] sm:h-[250px] lg:h-[300px] overflow-hidden rounded-xl shadow-md ring-1 ring-white/10 shrink-0 bg-[#05050a]/60">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>

                      {/* Text */}
                      <div className="space-y-5 min-w-0 w-full">
                        {/* SUMMARY */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-orange-400" />
                            <h4 className="text-xs font-semibold tracking-wide text-orange-400 uppercase">
                              Summary
                            </h4>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                            {item.summary}
                          </p>
                        </div>

                        {/* PROBLEM */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-rose-400" />
                            <h4 className="text-xs font-semibold tracking-wide text-rose-400 uppercase">
                              Problem
                            </h4>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                            {item.challenge}
                          </p>
                        </div>

                        {/* SOLUTION */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Lightbulb className="w-4 h-4 text-amber-400" />
                            <h4 className="text-xs font-semibold tracking-wide text-amber-400 uppercase">
                              Solution
                            </h4>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                            {item.solution}
                          </p>
                        </div>

                        {/* IMPACT BOX */}
                        <div
                          className="
                            relative
                            rounded-xl
                            px-5 py-4
                            flex flex-col gap-3
                            sm:flex-row sm:items-center sm:justify-between
                            bg-gradient-to-r from-orange-600 via-orange-700 to-amber-600
                            text-white
                            shadow-lg
                            overflow-hidden
                          "
                        >
                          <div className="relative z-10 space-y-0.5 flex-1 min-w-0 pr-3">
                            <p className="text-xs uppercase tracking-wider text-white/70 truncate">
                              Impact
                            </p>
                            <p className="text-sm font-semibold leading-snug break-words">
                              {item.impact}
                            </p>
                          </div>

                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                              relative z-10
                              inline-flex items-center justify-center
                              px-4 py-2
                              text-xs font-semibold uppercase tracking-wide
                              rounded-full
                              bg-white text-orange-700
                              hover:scale-105
                              transition-all duration-300
                              whitespace-nowrap
                              flex-shrink-0
                            "
                          >
                            View Case Study →
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* ================= PAGINATION (clean spacing) ================= */}
        <div className="flex justify-center">
          <div className="flex flex-col items-center gap-2 px-6 py-3 rounded-full bg-white border border-gray-200 shadow-md">
            <div className="flex items-center gap-5">
              {caseStudies.map((_, i) => (
                <button
                  key={i}
                  onClick={() => swiperRef.current?.slideToLoop(i)}
                  className={`text-xs font-medium tracking-widest transition
                             ${
                               activeIndex === i
                                 ? "text-orange-600 scale-125"
                                 : "text-gray-400 hover:text-gray-700"
                             }
                           `}
                >
                  {String(i + 1).padStart(2, "0")}
                </button>
              ))}
            </div>

            <div className="w-36 h-[3px] bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-600 to-amber-500 transition-all duration-500"
                style={{
                  width: `${((activeIndex + 1) / caseStudies.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
