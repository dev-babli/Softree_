"use client";

import React from "react";
import { Gallery4, Gallery4Props } from "@/components/blocks/gallery4";
import { FlowButton } from "@/components/ui/flow-button";
import AnimatedGradient from "@/components/ui/animated-gradient";
import { typography } from "@/lib/typography";
import { successStoriesList } from "./successStoriesData";

const gradientConfigs = [
  {
    preset: "custom" as const,
    color1: "#050505",
    color2: "#FF6B00",
    color3: "#1a0b04",
    rotation: -50,
    proportion: 1,
    scale: 0.01,
    speed: 30,
    distortion: 0,
    swirl: 50,
    swirlIterations: 16,
    softness: 47,
    offset: -299,
    shape: "Checks" as const,
    shapeSize: 45,
  },
  {
    preset: "custom" as const,
    color1: "#FF7300",
    color2: "#000000",
    color3: "#000000",
    rotation: 0,
    proportion: 63,
    scale: 0.75,
    speed: 30,
    distortion: 5,
    swirl: 61,
    swirlIterations: 5,
    softness: 100,
    offset: -168,
    shape: "Checks" as const,
    shapeSize: 28,
  },
  { preset: "Lava" as const },
  {
    preset: "custom" as const,
    color1: "#050505",
    color2: "#FF4500",
    color3: "#050505",
    rotation: 0,
    proportion: 33,
    scale: 0.48,
    speed: 39,
    distortion: 4,
    swirl: 65,
    swirlIterations: 5,
    softness: 100,
    offset: -235,
    shape: "Edge" as const,
    shapeSize: 48,
  },
];

const caseStudyData: Gallery4Props = {
  title: (
    <div className="flex flex-col items-start">
      <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-200 bg-orange-50 ${typography.caption.default} text-[#FF6B00] uppercase mb-4 w-fit`}>
        <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></div>
        CLIENT SUCCESS STORIES
      </div>
      <h2 className={`${typography.heading.h2} text-slate-900 leading-tight text-left`}>
        AI Chatbot Development <span className="text-orange-600">Case Studies</span>
      </h2>
    </div>
  ) as any,

  description:
    "Explore how custom AI chatbots can support customer service, employee self-service, knowledge retrieval, and operational workflows. Softree Technology develops conversational AI solutions that connect users with relevant business information and help streamline everyday interactions.",

  items: successStoriesList.map((story, index) => {
    const config = gradientConfigs[index % gradientConfigs.length];
    const cleanHref = story.caseStudyUrl.replace("https://www.softreetechnology.com", "");

    return {
      id: story.id,
      title: story.title,
      label: story.industryLabel,
      image: story.imageUrl,
      description: (
        <div className="space-y-3 bg-[#0a0f1d]/85 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 sm:p-4 shadow-xl">
          <p className={`text-white/90 ${typography.body.sm} leading-relaxed mb-3 border-b border-white/10 pb-3`}>
            {story.solution}
          </p>
          <div className="flex flex-col gap-2.5">
            {(story.metrics || []).slice(0, 2).map((result, idx) => {
              const hasPrefix = result.value.includes("↑");
              const isWord = /^[A-Za-z]+$/.test(result.value.trim());
              const val = hasPrefix ? result.value : isWord ? result.value : `↑ ${result.value}`;

              return (
                <div key={idx} className="flex items-center gap-2.5 text-xs">
                  <span className="text-[#FF6B2C] font-mono font-bold tracking-tight shrink-0 min-w-[36px]">
                    {val}
                  </span>
                  <span className={`text-white/80 ${typography.caption.meta} uppercase tracking-wider`}>
                    {result.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ),
      href: cleanHref,
      bgComponent: <AnimatedGradient config={config} />,
    };
  }),
};

export function SuccessStories() {
  return (
    <div className="relative bg-white flex flex-col items-center -mt-4 md:-mt-8 -mb-8 md:-mb-12">
      <div className="w-full">
        <Gallery4
          {...caseStudyData}
          action={
            <FlowButton
              href="/case-studies"
              text="Explore AI Chatbot Case Studies"
              variant="orange-filled"
              className="py-3 px-6 text-xs sm:text-sm font-bold shadow-md"
            />
          }
        />
      </div>
    </div>
  );
}

export default SuccessStories;
