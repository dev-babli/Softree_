"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useRouter } from "next/navigation";
import { FileText, AlertTriangle, Lightbulb } from "lucide-react";

import "swiper/css";

const caseStudies = [
  {
    title: "AI-Powered Healthcare Operations Knowledge Assistant",
    category: "Healthcare",
    summary: "Healthcare knowledge assistant reduces document search time by up to 35% while improving access to approved operational procedures.",
    challenge: "Operational knowledge was distributed across multiple documents and repositories. Hospital staff and care coordinators spent significant time manually searching for relevant information.",
    solution: "Developed an AI-powered Healthcare Operations Knowledge Assistant using RAG on Azure. Built a conversational interface using React with a Python FastAPI backend and Azure AI Search.",
    impact: "Reduced document search time by up to 35%, ensuring reliable access to approved healthcare documentation with source traceability.",
    tech: ["Azure OpenAI", "Azure AI Search", "RAG", "Azure Blob Storage", "React 19", "FastAPI", "Python"],
    image: "https://cdn.sanity.io/images/1zmh4sfw/production/6a89ad3a10ddd593bc0c73287dab3ddd22d4c0be-1672x941.png?auto=format",
    href: "/case-studies/ai-powered-healthcare-operations-knowledge-assistant",
  },
  {
    title: "Healthcare AI Test Automation for Patient Management Platform",
    category: "Healthcare",
    summary: "Achieve 85% test automation coverage and 60% faster releases using AI-powered test automation for a leading healthcare provider.",
    challenge: "The organization relied entirely on manual testing across twelve critical application modules. Regression testing required nearly three weeks for every release, delaying deployments.",
    solution: "Designed and implemented an AI-powered end-to-end test automation framework using Playwright, AI-assisted test generation, and Azure DevOps.",
    impact: "Achieved 85% test automation coverage and 60% faster releases. The framework enabled automated regression testing and HIPAA compliance validation.",
    tech: ["Playwright", "Azure DevOps", "GenAI", "Power BI", "Power Automate", "REST APIs", "CI/CD"],
    image: "https://cdn.sanity.io/images/1zmh4sfw/production/e80c17038a8bb76854621a293c795af405b67424-1672x941.png?auto=format",
    href: "/case-studies/healthcare-ai-test-automation-patient-management-platform",
  },
  {
    title: "Intelligent Warehouse Operations Assistant",
    category: "Logistics & Supply Chain",
    summary: "A global logistics company used AI agents, RAG, and voice automation to streamline warehouse operations and accelerate exception resolution.",
    challenge: "Warehouse operators spent excessive hours manually cross-checking inventory and order statuses across disconnected WMS, ERP, and SOP documents.",
    solution: "Voice-enabled multi-agent assistant powered by Amazon Nova 2 Sonic, LangGraph, and RAG for instant hands-free floor intelligence and exception triage.",
    impact: "Significantly faster warehouse issue resolution, reduced manual information searches, and drastically improved overall employee productivity.",
    tech: ["LangChain", "LangGraph", "AutoGen", "Amazon OpenSearch", "AWS", "Python", "FastAPI", "Next.js"],
    image: "https://cdn.sanity.io/images/1zmh4sfw/production/e4cb4151ef2bc2122f60f84e05350b173fc72dae-1672x941.png?auto=format",
    href: "/case-studies/intelligent-warehouse-operations-assistant-with-ai-agents",
  },
];

export default function RAGCaseStudies() {
  const swiperRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();

  return (
    <section className="relative py-16">
      <div className="w-[86%] max-w-7xl mx-auto space-y-8">
        {/* ================= HEADER ================= */}
        <div className="text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-orange-50 text-orange-600 typo-caption">
            Case Studies
          </span>

          <h2 className="typo-heading-2 text-gray-900 mt-2">
            Enterprise RAG in Action:
            <span className="text-orange-600"> Business Success Stories</span>
          </h2>

          <p className="mt-2 max-w-4xl mx-auto typo-description text-gray-600">
            Explore how Softree helps organizations leverage AI, RAG, and AI Agents to unlock the value of their enterprise data.
          </p>
        </div>

        <div
          className="
                w-full
                h-auto min-h-[680px] md:h-[70vh] md:max-h-[680px]
                bg-gradient-to-r from-[#eef2f7] via-[#ffedd5] to-[#eef2f7]
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
            observer={true}
            observeParents={true}
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
                      <h3 className="typo-heading-3 text-white">
                        {item.title} — Case Study
                      </h3>

                      <p className="mt-2 typo-body-sm text-slate-300 flex items-center justify-center gap-2">
                        📍 Client Country
                        <span className="font-medium text-white">
                          United States 🇺🇸
                        </span>
                      </p>
                    </div>

                    {/* Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
                      {/* Image */}
                      <div className="flex justify-center w-full min-w-0 max-w-sm mx-auto lg:max-w-none">
                        <div className="w-full aspect-video overflow-hidden rounded-xl shadow-md ring-1 ring-white/10 shrink-0 bg-black/40">
                          <img
                            src={item.image}
                            alt={item.title}
                            loading="lazy"
                            decoding="async"
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
                            <h4 className="typo-caption-meta text-orange-400 uppercase">
                              Summary
                            </h4>
                          </div>
                          <p className="typo-body-sm text-slate-300 leading-relaxed">
                            {item.summary}
                          </p>
                        </div>

                        {/* PROBLEM */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-rose-400" />
                            <h4 className="typo-caption-meta text-rose-400 uppercase">
                              Problem
                            </h4>
                          </div>
                          <p className="typo-body-sm text-slate-300 leading-relaxed">
                            {item.challenge}
                          </p>
                        </div>

                        {/* SOLUTION */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Lightbulb className="w-4 h-4 text-cyan-400" />
                            <h4 className="typo-caption-meta text-cyan-400 uppercase">
                              Solution
                            </h4>
                          </div>
                          <p className="typo-body-sm text-slate-300 leading-relaxed">
                            {item.solution}
                          </p>
                        </div>

                        {/* IMPACT BOX */}
                        <div
                          className="
                            relative
                            rounded-xl
                            px-5 py-4
                            flex flex-col gap-4
                            xl:flex-row xl:items-center xl:justify-between
                            bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500
                            text-white
                            shadow-lg
                            overflow-hidden
                            w-full
                          "
                        >
                          <div className="relative z-10 space-y-0.5 flex-1 min-w-0 pr-3">
                            <p className="typo-caption-meta text-white/70 truncate uppercase">
                              Impact
                            </p>
                            <p className="typo-body-sm font-semibold break-words">
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
                              typo-button-sm uppercase
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
