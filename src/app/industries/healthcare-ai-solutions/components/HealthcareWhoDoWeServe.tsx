"use client";

import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Settings, TrendingUp, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FlowButton } from "@/components/ui/flow-button";

const REVIEWS = [
  {
    id: "01",
    title: "Healthcare Product Companies",
    question: "Need to build, extend, or scale healthcare products faster?",
    asking: [
      "How can we scale our product engineering faster?",
      "Do you have expertise in healthcare compliance and security?",
      "Can you help us integrate AI into our existing products?"
    ],
    howWeHelp: [
      "Provide healthcare-focused engineering teams across AI, cloud, and data.",
      "Accelerate application development and modern software engineering.",
      "Build secure, scalable, and compliant digital health solutions."
    ],
    outcome: "Faster product roadmaps with secure, scalable digital health solutions built by healthcare engineering experts.",
    imageSrc: "/images/serve/healthcare/1.jpg",
    thumbnailSrc: "/images/serve/healthcare/1.jpg",
  },
  {
    id: "02",
    title: "Healthcare Organizations",
    question: "Looking to modernize healthcare operations and digital experiences?",
    asking: [
      "How can we modernize our legacy healthcare operations?",
      "Can you help automate our administrative workflows?",
      "How do we turn our healthcare data into actionable intelligence?"
    ],
    howWeHelp: [
      "Build AI-powered applications for improved digital experiences.",
      "Automate administrative tasks and clinical workflows.",
      "Connect enterprise systems and unify healthcare data."
    ],
    outcome: "Modernized healthcare operations with automated workflows and actionable, AI-driven intelligence.",
    imageSrc: "/images/serve/healthcare/2.jpg",
    thumbnailSrc: "/images/serve/healthcare/2.jpg",
  },
  {
    id: "03",
    title: "Software & Technology Companies",
    question: "Need healthcare expertise to extend your technology capabilities?",
    asking: [
      "How can we add healthcare engineering capacity quickly?",
      "Can you seamlessly integrate with our existing technology teams?",
      "Do you have expertise in healthcare enterprise systems?"
    ],
    howWeHelp: [
      "Extend your team with healthcare-focused engineers across AI and cloud.",
      "Accelerate development without the overhead of expanding internal teams.",
      "Provide deep expertise in healthcare integrations and data systems."
    ],
    outcome: "Accelerated technology development with flexible, healthcare-focused engineering capacity.",
    imageSrc: "/images/serve/healthcare/3.jpg",
    thumbnailSrc: "/images/serve/healthcare/3.jpg",
  },
  {
    id: "04",
    title: "Digital Agencies",
    question: "Have healthcare projects that require specialized engineering expertise?",
    asking: [
      "Can you support our agency's healthcare client projects?",
      "Can you work seamlessly behind our brand?",
      "Do you have specialized expertise in healthcare AI and data?"
    ],
    howWeHelp: [
      "Provide a specialized healthcare engineering team to support your delivery.",
      "Deliver AI solutions, automation, and cloud initiatives under your brand.",
      "Work alongside your team to scale your agency's capabilities."
    ],
    outcome: "More healthcare projects delivered successfully under your brand with specialized engineering support.",
    imageSrc: "/images/serve/healthcare/4.jpg",
    thumbnailSrc: "/images/serve/healthcare/4.jpg",
  },
  {
    id: "05",
    title: "System Integrators",
    question: "Need additional engineering capacity for healthcare technology engagements?",
    asking: [
      "Can you provide additional engineering capacity for our healthcare engagements?",
      "Do you have strong Microsoft and cloud integration capabilities?",
      "Can you complement our existing delivery organization?"
    ],
    howWeHelp: [
      "Act as an engineering extension for your healthcare projects.",
      "Provide specialized AI, data, cloud, and Microsoft capabilities.",
      "Integrate seamlessly with your existing delivery frameworks."
    ],
    outcome: "Scaled delivery capabilities for complex healthcare technology engagements.",
    imageSrc: "/images/serve/healthcare/5.jpg",
    thumbnailSrc: "/images/serve/healthcare/5.jpg",
  },
  {
    id: "06",
    title: "Microsoft Partners",
    question: "Need a trusted healthcare engineering team behind your Microsoft engagements?",
    asking: [
      "Can you support our Microsoft healthcare implementations?",
      "Do you have expertise in Azure AI and Power Platform?",
      "Can you handle complex enterprise integrations?"
    ],
    howWeHelp: [
      "Extend your delivery with engineers specialized in Microsoft technologies.",
      "Deliver solutions across Azure, AI, and Power Platform.",
      "Execute complex healthcare enterprise integrations and application development."
    ],
    outcome: "Successful Microsoft healthcare engagements delivered with specialized engineering expertise.",
    imageSrc: "/images/serve/healthcare/6.jpg",
    thumbnailSrc: "/images/serve/healthcare/6.jpg",
  },
  {
    id: "07",
    title: "Technology Service Providers",
    question: "Need flexible healthcare technology capacity without building another team?",
    asking: [
      "How can we scale our healthcare technology capacity flexibly?",
      "Can we avoid the overhead of building a new internal team?",
      "Do you provide dedicated resources for long-term engagements?"
    ],
    howWeHelp: [
      "Scale your capabilities with dedicated healthcare engineering resources.",
      "Provide flexible capacity across AI, cloud, data, and automation.",
      "Deliver enterprise technology solutions without internal hiring overhead."
    ],
    outcome: "Flexible, scalable healthcare technology delivery without the burden of building new internal teams.",
    imageSrc: "/images/serve/healthcare/7.jpg",
    thumbnailSrc: "/images/serve/healthcare/7.jpg",
  }
];

export default function HealthcareWhoDoWeServe() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [isHovered, setIsHovered] = useState(false);

  React.useEffect(() => {
    if (isHovered) return;

    const timer = setInterval(() => {
      setDirection("right");
      setCurrentIndex((prev) => (prev + 1) % REVIEWS.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [isHovered]);

  const activeReview = REVIEWS[currentIndex];

  const handleNext = () => {
    setDirection("right");
    setCurrentIndex((prev) => (prev + 1) % REVIEWS.length);
  };

  const handlePrev = () => {
    setDirection("left");
    setCurrentIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  const handleThumbnailClick = (index: number) => {
    if (index === currentIndex) return;
    setDirection(index > currentIndex ? "right" : "left");
    setCurrentIndex(index);
  };

  const imageVariants = {
    enter: (direction: "left" | "right") => ({
      y: direction === "right" ? "100%" : "-100%",
      opacity: 0,
    }),
    center: { y: 0, opacity: 1 },
    exit: (direction: "left" | "right") => ({
      y: direction === "right" ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  const textVariants = {
    enter: (direction: "left" | "right") => ({
      x: direction === "right" ? 50 : -50,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (direction: "left" | "right") => ({
      x: direction === "right" ? -50 : 50,
      opacity: 0,
    }),
  };

  return (
    <section className="relative w-full bg-transparent text-slate-900 pt-16 md:pt-24 pb-16 overflow-hidden">
      <div
        className="mx-auto w-full max-w-[1400px] px-6 md:px-12"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Top Header Section */}
        <div className="flex flex-col items-center text-center mb-12 md:mb-16 max-w-4xl mx-auto">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#FF6B2C]/20 bg-[#FF6B2C]/5 px-3 py-1 w-max text-xs font-semibold uppercase tracking-widest text-[#FF6B2C]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF6B2C]"></span>
            WHO DO WE SERVE
          </span>
          <h2 className="text-balance text-[clamp(2.5rem,4vw,3.5rem)] font-extrabold font-['Plus_Jakarta_Sans',sans-serif] leading-[1.05] tracking-tight text-[#0a0a1a]">
            Who Do We Serve?
          </h2>
          <p className="mt-4 md:mt-6 text-pretty text-base md:text-lg leading-relaxed text-[#0a0a1a]/70 font-medium">
            We partner with organizations that need healthcare technology expertise and engineering capacity to build, extend, or deliver industry-specific solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 min-h-[500px]">

          {/* === Left Column: Audience Navigation === */}
          <div className="lg:col-span-3 flex flex-col order-2 lg:order-1">
            <div className="flex items-center mb-4 font-bold text-sm tracking-widest">
              <span className="text-[#FF6B2C]">{activeReview.id}</span>
              <span className="text-[#0a0a1a]/30 mx-2">/</span>
              <span className="text-[#0a0a1a]/50">07</span>
            </div>
            <div className="h-px w-full bg-[#0a0a1a]/10 mb-6" />

            <div className="flex flex-col gap-2">
              {REVIEWS.map((review, index) => {
                const isActive = index === currentIndex;
                return (
                  <button
                    key={review.id}
                    onClick={() => handleThumbnailClick(index)}
                    className={cn(
                      "flex items-center gap-4 p-3 rounded-xl transition-all duration-300 text-left w-full",
                      isActive
                        ? "border border-[#FF6B2C]/20 bg-[#FF6B2C]/5 text-[#0a0a1a] shadow-sm"
                        : "border border-transparent hover:bg-[#0a0a1a]/5 opacity-70 hover:opacity-100"
                    )}
                  >
                    {review.thumbnailSrc || review.imageSrc ? (
                      <img
                        src={review.thumbnailSrc || review.imageSrc}
                        alt=""
                        className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-slate-200 flex-shrink-0" />
                    )}
                    <div className="flex flex-col">
                      <span className={cn("text-xs font-bold mb-0.5", isActive ? "text-[#FF6B2C]" : "text-[#0a0a1a]/50")}>
                        {review.id}
                      </span>
                      <span className="text-sm font-semibold leading-tight text-balance text-[#0a0a1a]">
                        {review.title}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* === Center Column: Main Image === */}
          <div className="lg:col-span-4 relative min-h-[400px] lg:h-full order-1 lg:order-2">
            <AnimatePresence initial={false} custom={direction}>
              {activeReview.imageSrc ? (
                <motion.img
                  key={currentIndex}
                  src={activeReview.imageSrc}
                  alt={activeReview.title}
                  custom={direction}
                  variants={imageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute inset-0 w-full h-full object-cover rounded-[1.5rem]"
                />
              ) : (
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={imageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute inset-0 w-full h-full rounded-[1.5rem] bg-slate-200"
                />
              )}
            </AnimatePresence>
          </div>

          {/* === Right Column: Text Content === */}
          <div className="lg:col-span-5 flex flex-col justify-between order-3 lg:order-3">
            <div className="relative overflow-hidden min-h-[400px]">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={textVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                >
                  <div className="mb-6 flex flex-col gap-2">
                    <span className="text-sm font-bold text-[#0a0a1a]/50 tracking-widest">
                      {activeReview.id} <span className="mx-2">/</span> 07
                    </span>
                    <h3 className="text-[1.3rem] md:text-2xl lg:text-[1.6rem] xl:text-[1.85rem] font-extrabold text-[#0a0a1a] leading-tight tracking-tight">
                      {activeReview.title}
                    </h3>
                  </div>

                  <div className="mt-2 flex flex-col gap-2.5">
                    <p className="text-base md:text-lg font-bold text-[#0a0a1a] leading-snug text-pretty mb-2">
                      {activeReview.question}
                    </p>

                    {/* WHAT YOU MAY BE ASKING Box */}
                    <div className="mt-1 rounded-xl bg-[#FFF5F1] p-3 flex gap-3">
                      <div className="flex-shrink-0 mt-0.5 rounded-full border-2 border-[#FF6B2C]/30 p-1 bg-white h-max">
                        <HelpCircle className="w-4 h-4 text-[#FF6B2C]" />
                      </div>
                      <div className="flex flex-col">
                        <h4 className="text-[#FF6B2C] font-bold text-xs tracking-widest uppercase mb-1.5">What you may be asking</h4>
                        <ul className="flex flex-col gap-1">
                          {activeReview.asking.map((bullet, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-[#0a0a1a]/70">
                              <span className="text-[#FF6B2C] mt-0.5 text-base leading-none">&bull;</span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* HOW WE HELP Box */}
                    <div className="mt-1 rounded-xl bg-[#F8F9FA] p-3 flex gap-3">
                      <div className="flex-shrink-0 mt-0.5 rounded-full border-2 border-[#FF6B2C]/30 p-1 bg-white h-max">
                        <Settings className="w-4 h-4 text-[#FF6B2C]" />
                      </div>
                      <div className="flex flex-col">
                        <h4 className="text-[#FF6B2C] font-bold text-xs tracking-widest uppercase mb-1.5">How we help</h4>
                        <ul className="flex flex-col gap-1">
                          {activeReview.howWeHelp.map((bullet, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-[#0a0a1a]/70">
                              <span className="text-[#FF6B2C] mt-0.5 text-base leading-none">&bull;</span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* THE OUTCOME Box */}
                    <div className="mt-1 rounded-xl bg-[#FFF5F1] p-3 flex gap-3 border border-[#FF6B2C]/10">
                      <div className="flex-shrink-0 mt-0.5 rounded-full border-2 border-[#FF6B2C]/30 p-1 bg-white h-max">
                        <TrendingUp className="w-4 h-4 text-[#FF6B2C]" />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h4 className="text-[#FF6B2C] font-bold text-xs tracking-widest uppercase mb-1">The Outcome</h4>
                        <p className="text-xs font-bold text-[#0a0a1a]">
                          {activeReview.outcome}
                        </p>
                      </div>
                    </div>

                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center space-x-3 mt-8 lg:mt-auto pt-4">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full w-12 h-12 border-[#0a0a1a]/20 text-[#0a0a1a] hover:bg-[#0a0a1a]/5"
                onClick={handlePrev}
                aria-label="Previous review"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="default"
                size="icon"
                className="rounded-full w-12 h-12 bg-[#FF6B2C] text-white hover:bg-[#E54D0C]"
                onClick={handleNext}
                aria-label="Next review"
              >
                <ArrowRight className="w-5 h-5" />
              </Button>
              <span className="text-sm font-semibold ml-4 text-[#0a0a1a]/50">
                {String(currentIndex + 1).padStart(2, "0")} / 07
              </span>
            </div>
          </div>

        </div>

        {/* Bottom CTA */}
        <div className="mt-8 lg:mt-12 flex flex-col items-center text-center border-t border-slate-200 pt-8 md:pt-10 px-6">
          <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-slate-900 w-full max-w-none md:whitespace-nowrap">
            Whatever you&apos;re building, modernizing, or scaling, we&apos;re ready to work alongside you.
          </h3>
          <FlowButton href="/who-do-we-serve" text="Explore Who We Serve" className="mt-6" />
        </div>
      </div>
    </section>
  );
}
