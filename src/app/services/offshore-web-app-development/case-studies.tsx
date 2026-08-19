"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useRouter } from "next/navigation";
import { FileText, AlertTriangle, Lightbulb } from "lucide-react";

import "swiper/css";
import SectionHeader from "@/components/homepage-light/SectionHeader";
import { WEB_DEV_VISUALS } from "./web-dev-visuals";

const ACCENT = "#FF5812" as const;

const caseStudies = [
  {
    title: "Enterprise Technology Website Design & Development",
    category: "Web App Development",
    summary: "Rebuilding a high-performance corporate marketing website and developer portal with Next.js, customized block builders, and global edge delivery.",
    challenge: "A slow, rigid legacy CMS hindered content publishing speed, had poor SEO crawlability, and struggled under sudden traffic spikes.",
    solution: "Designed a headless architecture utilizing Next.js, custom block schemas, Tailwind CSS, and Vercel edge caching.",
    impact: "Achieved 98+ Lighthouse performance scores, slashed page load times by 65%, and increased organic search traffic by 40%.",
    tech: ["Next.js", "Headless CMS", "Tailwind CSS", "Vercel Edge"],
    image: "https://cdn.sanity.io/images/1zmh4sfw/production/6244478d7a261c19f6e3fb094eae1e5c21e1f011-1672x941.png",
    href: "https://www.softreetechnology.com/case-studies/enterprise-technology-website-design-development",
  },
  {
    title: "Enterprise AI Website Development",
    category: "Web App Development",
    summary: "Engineering an enterprise-grade AI-powered website using retrieval-augmented generation (RAG) to serve instant compliance, engineering, and sales resources.",
    challenge: "Enterprise buyers struggled to find relevant technical resources across thousands of siloed documents, reducing sales velocity.",
    solution: "Built a custom Next.js web application integrated with secure vector databases, custom RAG pipelines, and conversational search interfaces.",
    impact: "Reduced resource discovery time by 80%, automated 60% of preliminary sales inquiries, and improved user engagement metrics by 2.5×.",
    tech: ["Next.js", "Vector DB", "RAG Pipeline", "LLM Integration"],
    image: "https://cdn.sanity.io/images/1zmh4sfw/production/8cd5b3bbd4a520a2fc4ba28daea7b5670e26195c-1672x941.png",
    href: "https://www.softreetechnology.com/case-studies/enterprise-ai-website-development",
  },
  {
    title: "Multi-Vendor Ecommerce Marketplace Platform",
    category: "Web App Development",
    summary: "A scalable multi-tenant eCommerce marketplace connecting global vendors, offering central stock auditing and fast payment routing.",
    challenge: "Legacy single-vendor stores lacked automated commission distribution, order splitting, and localized payment processing.",
    solution: "Developed a headless Node.js/Next.js store integrated with Stripe Connect and high-performance Elasticsearch.",
    impact: "Enabled seamless scaling to 5,000 active vendors and boosted transactional throughput by 120%.",
    tech: ["Next.js", "Node.js", "Elasticsearch", "Stripe Connect", "PostgreSQL"],
    image: "https://cdn.sanity.io/images/1zmh4sfw/production/9ef8c21a2ec3ded2a64668ab80767bb397a4764e-1536x1024.jpg",
    href: "https://www.softreetechnology.com/case-studies/multi-vendor-ecommerce-marketplace-platform",
  },
  {
    title: "Wellkies Healthcare Consultation Platform",
    category: "Web App Development",
    summary: "A HIPAA-compliant web app facilitating virtual consultation booking, video calls, medical record tracking, and doctor-patient chats.",
    challenge: "Fragmented telehealth tools resulted in scheduling overlap, patient check-in bottlenecks, and insecure communication paths.",
    solution: "Built a unified Next.js dashboard with integrated WebRTC video rooms, calendar scheduling, and secure messaging.",
    impact: "Supported 50k+ monthly virtual consultations, improving patient appointment onboarding efficiency by 65%.",
    tech: ["React.js", "Next.js", "WebRTC", "Node.js", "MongoDB"],
    image: "https://cdn.sanity.io/images/1zmh4sfw/production/444d74f43868f720fee656ea5c8de8ba10bc015a-1536x1024.png",
    href: "https://www.softreetechnology.com/case-studies/wellkies-healthcare-consultation-platform",
  },
  {
    title: "Digital Learning Management Platform",
    category: "Web App Development",
    summary: "A comprehensive digital learning management platform for online course delivery, student progress tracking, and analytics.",
    challenge: "Traditional classroom training models were hard to scale and track across decentralized locations.",
    solution: "Developed a cross-platform learning mobile app with interactive progress tracking, offline access, and automated assessments.",
    impact: "Scaled learning reach to over 10,000 active students and boosted course completion rates by 40%.",
    tech: ["React Native", "Node.js", "MongoDB", "LMS Integration"],
    image: "https://cdn.sanity.io/images/1zmh4sfw/production/515539c70439c2a345c0e88a80a943d4714fe328-1536x1024.png",
    href: "https://www.softreetechnology.com/case-studies/digital-learning-management-platform",
  },
];

export default function WebAppCaseStudies() {
  const swiperRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();

  return (
    <section
      data-section="web-dev-cases"
      className="relative flex items-center overflow-hidden py-16 md:py-20"
    >
      <div className="mx-auto w-full max-w-[1400px] space-y-8 px-4 sm:px-6 lg:px-12">
        <div className="text-center">
          <SectionHeader
            badge="Web app case studies"
            accent={ACCENT}
            headline="Web applications in action: scalable digital solutions"
            body="See how Softree designs and develops modern web applications, portals, and enterprise dashboards that automate workflows, improve efficiency, and deliver secure, high-performance experiences for growing businesses."
            className="mx-auto items-center [&_p]:mx-auto"
          />
        </div>

        <div
          className="
        w-full
        h-auto min-h-[680px] md:h-[70vh] md:max-h-[680px]
        overflow-hidden
        rounded-[32px]
        border border-[#0a0a1a]/[0.06]
        bg-[#0a0a0a]
        shadow-[0_30px_90px_-40px_rgba(10,10,26,0.28)]
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
            {caseStudies.map((item, index) => {
              const cover =
                WEB_DEV_VISUALS.works[index % WEB_DEV_VISUALS.works.length].src;
              return (
              <SwiperSlide key={index} className="h-full w-full">
                <div className="relative h-full w-full overflow-hidden">
                  <img
                    src={cover}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/92 via-[#0a0a0a]/78 to-[#0a0a0a]/55" />

                  <div className="relative flex h-full flex-col justify-center p-8 md:p-12 lg:p-14">
                    <div className="mb-6 text-center lg:text-left">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#FF5812]">
                        {item.category}
                      </p>
                      <h3 className="mt-2 text-2xl font-semibold tracking-[-0.02em] text-white md:text-3xl">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm text-white/55">{item.summary}</p>
                    </div>

                    <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
                      <div className="relative mx-auto aspect-[16/10] w-full max-w-[420px] overflow-hidden rounded-2xl border border-white/10 shadow-2xl lg:mx-0 bg-[#05050a]/60">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-contain"
                        />
                      </div>

                      <div className="min-w-0 space-y-5">
                        {/* SUMMARY */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-[#FF5812]" />
                            <h4 className="text-xs font-semibold uppercase tracking-wide text-[#FF5812]">
                              Summary
                            </h4>
                          </div>
                          <p className="text-xs leading-relaxed text-white/70 sm:text-sm">
                            {item.summary}
                          </p>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-white/70" />
                            <h4 className="text-xs font-semibold uppercase tracking-wide text-white/70">
                              Problem
                            </h4>
                          </div>
                          <p className="text-xs leading-relaxed text-white/65 sm:text-sm">
                            {item.challenge}
                          </p>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Lightbulb className="h-4 w-4 text-[#1852FF]" />
                            <h4 className="text-xs font-semibold uppercase tracking-wide text-[#1852FF]">
                              Solution
                            </h4>
                          </div>
                          <p className="text-xs leading-relaxed text-white/65 sm:text-sm">
                            {item.solution}
                          </p>
                        </div>

                        <div className="relative flex flex-col gap-3 overflow-hidden rounded-xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
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
                            className="relative z-10 inline-flex flex-shrink-0 items-center justify-center rounded-full bg-[#FF5812] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-[#FF6B00]"
                          >
                            View Case Study →
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
            })}
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
                             ? "text-[#FF5812] scale-125"
                             : "text-[#0a0a1a]/35 hover:text-[#0a0a1a]"
                         }
                       `}
                >
                  {String(i + 1).padStart(2, "0")}
                </button>
              ))}
            </div>

            <div className="w-36 h-[3px] bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#FF5812] transition-all duration-500"
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
