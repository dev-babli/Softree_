"use client";

import React from "react";
import { Gallery4, Gallery4Props } from "@/components/blocks/gallery4";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FlowButton } from "@/components/ui/flow-button";

const demoData: Gallery4Props = {
  title: (
    <div className="flex flex-col items-start">
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-200 bg-orange-50 typo-caption text-[#FF6B00] mb-4 w-fit">
        <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></div>
        FEATURED CASE STUDIES
      </div>
      <span className="typo-heading-2 text-slate-900 text-left">
        See Voice AI in Action
      </span>
    </div>
  ) as any,

  description:
    "Explore practical voice AI applications built with Amazon Nova 2 Sonic, Amazon Bedrock, RAG, APIs, and modern cloud engineering to improve customer interactions and automate real-time business workflows.",

  items: [
    {
      id: "ai-voice-doctor-appointment-agent",
      title: "AI Voice Doctor Appointment Agent",
      ctaText: "VIEW CASE STUDY",
      description: (
        <div className="space-y-2.5 bg-[#0a0f1d]/85 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 sm:p-4 shadow-xl min-h-[165px] flex flex-col justify-center">
          <div className="flex items-start gap-2.5 text-xs">
            <span className="typo-caption-meta text-[#FF6B2C] font-mono shrink-0 mt-0.5 w-[75px]">
              Description
            </span>
            <span className="typo-body-sm text-white/90">
              A real-time voice agent that can:<br/>
              Understand → Find Doctor → Check Availability → Book → Confirm
            </span>
          </div>
          <div className="flex items-start gap-2.5 text-xs">
            <span className="typo-caption-meta text-[#FF6B2C] font-mono shrink-0 mt-0.5 w-[75px]">
              Technology
            </span>
            <span className="typo-body-sm text-white/90">
              Nova 2 Sonic · Bedrock · FastAPI · React · AWS
            </span>
          </div>
        </div>
      ),
      href: "#",
      image: "/images/nova-2/voice-agent-1.jpg",
    },
    {
      id: "ai-customer-support-voice-agent",
      title: "AI Customer Support Voice Agent",
      ctaText: "VIEW USE CASE",
      description: (
        <div className="space-y-2.5 bg-[#0a0f1d]/85 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 sm:p-4 shadow-xl min-h-[165px] flex flex-col justify-center">
          <div className="flex items-start gap-2.5 text-xs">
            <span className="typo-caption-meta text-[#FF6B2C] font-mono shrink-0 mt-0.5 w-[75px]">
              Description
            </span>
            <span className="typo-body-sm text-white/90">
              Automate high-volume customer conversations while connecting the agent to enterprise systems and escalating complex requests to human teams.
            </span>
          </div>
          <div className="flex items-start gap-2.5 text-xs">
            <span className="typo-caption-meta text-[#FF6B2C] font-mono shrink-0 mt-0.5 w-[75px]">
              Technology
            </span>
            <span className="typo-body-sm text-white/90">
              Nova 2 Sonic · APIs · RAG · AWS
            </span>
          </div>
        </div>
      ),
      href: "#",
      image: "/images/nova-2/voice-agent-2.jpg",
    },
    {
      id: "ai-voice-order-service-agent",
      title: "AI Voice Order & Service Agent",
      ctaText: "VIEW USE CASE",
      description: (
        <div className="space-y-2.5 bg-[#0a0f1d]/85 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 sm:p-4 shadow-xl min-h-[165px] flex flex-col justify-center">
          <div className="flex items-start gap-2.5 text-xs">
            <span className="typo-caption-meta text-[#FF6B2C] font-mono shrink-0 mt-0.5 w-[75px]">
              Description
            </span>
            <span className="typo-body-sm text-white/90">
              A real-time voice agent that helps customers place orders, check status, and connect with enterprise systems while escalating complex requests.
            </span>
          </div>
          <div className="flex items-start gap-2.5 text-xs">
            <span className="typo-caption-meta text-[#FF6B2C] font-mono shrink-0 mt-0.5 w-[75px]">
              Technology
            </span>
            <span className="typo-body-sm text-white/90">
              Nova 2 Sonic · Bedrock · APIs · RAG · AWS
            </span>
          </div>
        </div>
      ),
      href: "#",
      image: "/images/nova-2/voice-agent-3.jpg",
    }
  ],
};

export function FeaturedCaseStudies() {
  return (
    <div className="relative bg-white flex flex-col items-center -mt-4 md:-mt-8">
      <div className="w-full">
        <Gallery4 
          {...demoData} 
          action={
            <FlowButton 
              href="/case-studies" 
              text="Explore All Case Studies"
              variant="orange-filled"
              className="py-3 px-6 typo-button shadow-md"
            />
          }
        />
      </div>
    </div>
  );
}

export default FeaturedCaseStudies;
