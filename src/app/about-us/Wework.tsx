"use client";
import React from "react";
import { useLenis } from "@/components/softree-marketing-ui/hooks/use-lenis";

const panels = [
  {
    number: "01",
    title: "Custom AI Development for Business Growth",
    description:
      "Softree Technology builds custom AI solutions designed around your business goals, workflows, and data. Our AI development services combine machine learning, generative AI, natural language processing, predictive analytics, and intelligent automation to solve complex business challenges. From AI-powered applications to enterprise-grade solutions, we create scalable systems that improve efficiency, accelerate decision-making, and deliver measurable business value.",
  },
  {
    number: "02",
    title: "Scalable AI Solutions & Intelligent Infrastructure",
    description:
      "We develop scalable AI infrastructure that integrates seamlessly with your existing technology ecosystem, data platforms, and business applications. Our solutions support evolving data volumes, real-time workloads, cloud environments, and enterprise integrations while maintaining performance and reliability. Softree Technology helps businesses build flexible AI platforms that can adapt as operations, customer needs, and technology requirements grow.",
  },
  {
    number: "03",
    title: "Advanced AI Models Built for Accuracy",
    description:
      "Reliable AI starts with quality data and well-engineered models. Softree Technology applies data preparation, feature engineering, model development, evaluation, and continuous optimization to build accurate AI solutions. We leverage machine learning, deep learning, NLP, generative AI, and predictive analytics to deliver models tailored to specific business requirements, helping organizations turn complex data into actionable insights and smarter decisions.",
  },
  {
    number: "04",
    title: "Responsible AI for Secure Enterprise Adoption",
    description:
      "Our AI development approach focuses on building solutions that are secure, transparent, reliable, and aligned with business requirements. We consider data privacy, model performance, security, monitoring, and responsible AI practices throughout the development lifecycle. From AI consulting and strategy to deployment and ongoing optimization, Softree Technology helps enterprises adopt AI confidently while creating sustainable solutions that support long-term digital transformation.",
  },
];

export default function Wework() {
  useLenis();

  return (
    <section className="w-full px-4 md:px-[60px] lg:px-[100px] py-16 bg-white">
      <div className="w-full max-w-7xl mx-auto rounded-[32px] bg-black border border-zinc-900/60 shadow-[0_24px_80px_-16px_rgba(0,0,0,0.08)] flex flex-col relative">
        {/* Intro Section - Static, non-sticky */}
        <div className="w-full px-6 md:px-12 lg:px-16 pt-20 pb-16 flex justify-start">
          <div className="w-full max-w-[800px] flex flex-col items-start">
            <h2 className="text-white text-3xl md:text-4xl lg:text-[40px] font-normal leading-[1.3] mb-6">
              Why Softree Technology Leads in Custom AI Development for Enterprises
            </h2>
            <p className="text-[#d4d4d8] text-[16px] md:text-[18px] leading-[1.6] font-normal">
              Softree Technology delivers tailored AI development solutions that help businesses turn complex challenges into measurable outcomes. We combine AI strategy, machine learning, generative AI, intelligent automation, and enterprise AI integration to build scalable solutions aligned with your goals. From AI consulting and development to deployment and optimization, we help organizations improve efficiency, accelerate decision-making, and unlock sustainable business growth.
            </p>
          </div>
        </div>

        <div className="w-full">
          {panels.map((panel, index) => {
            const isLastPanel = index === panels.length - 1;
            return (
              <div
                key={panel.number}
                className={`sticky top-[100px] w-full min-h-[350px] md:min-h-[480px] bg-black flex flex-col ${
                  isLastPanel ? 'rounded-b-[32px]' : ''
                }`}
                style={{
                  zIndex: index + 1,
                }}
              >
                {/* Top divider */}
                <div className="w-full border-t border-zinc-800"></div>
              {/* Content container */}
              <div className="w-full h-full flex-grow flex flex-col md:flex-row px-6 md:px-12 lg:px-16">
                {/* Left Column */}
                <div className="w-full md:w-[25%] flex-shrink-0 md:border-r md:border-zinc-800 pt-6 md:pt-16 pb-4 md:pb-0">
                  <span className="text-white text-[16px] md:text-[18px] font-medium leading-none block">
                    {panel.number}
                  </span>
                </div>

                {/* Right Column */}
                <div className="w-full md:w-[75%] pl-0 md:pl-10 lg:pl-[80px] flex flex-col pt-6 md:pt-16 pb-12 md:pb-16 mt-4 md:mt-0">
                  <h2 className="text-white text-[24px] md:text-[28px] font-bold leading-tight mb-6 md:mb-10">
                    {panel.title}
                  </h2>
                  <p className="text-[#e5e5e5] text-[16px] md:text-[20px] leading-[1.55] max-w-[650px] font-normal">
                    {panel.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      </div>
    </section>
  );
}
