"use client";

import React from "react";
import Link from "next/link";
import {
  Mic,
  Headphones,
  CalendarDays,
  TrendingUp,
  Briefcase,
  ArrowRight,
} from "lucide-react";

export const WhatYouCanBuild = ({ simple = false }: { simple?: boolean }) => {
  const items = [
    {
      title: "AI Voice Agents",
      desc: "Build conversational real-time voice AI agents powered by Amazon Nova 2 Sonic and Amazon Bedrock that understand nuanced conversations and execute complex business actions.",
      icon: Mic,
      color: "text-[#FF6B00]",
      bg: "bg-orange-50",
    },
    {
      title: "Customer Support",
      desc: "Automate Tier-1 customer support with intelligent speech-to-speech AI that resolves common requests instantly while maintaining natural conversational experiences.",
      icon: Headphones,
      color: "text-[#FF6B00]",
      bg: "bg-orange-50",
    },
    {
      title: "Appointment Agents",
      desc: "Deploy specialized voice agents to autonomously check real-time schedule availability, book, reschedule, and cancel appointments with zero human intervention.",
      icon: CalendarDays,
      color: "text-[#FF6B00]",
      bg: "bg-orange-50",
    },
    {
      title: "Sales Agents",
      desc: "Supercharge your inbound pipeline with automated voice AI sales agents that qualify leads, answer product questions, and seamlessly update CRM systems in real time.",
      icon: TrendingUp,
      color: "text-[#FF6B00]",
      bg: "bg-orange-50",
    },
    {
      title: "Enterprise Voice Copilots",
      desc: "Connect low-latency voice interactions directly to your knowledge base using RAG architecture, turning static data into dynamic conversational enterprise copilots.",
      icon: Briefcase,
      color: "text-[#FF6B00]",
      bg: "bg-orange-50",
    },
  ];

  return (
    <div className="flex flex-col justify-between h-full w-full lg:max-w-[660px] mx-auto lg:mx-0 px-4 lg:px-2 pt-0">
      {!simple && (
        <div className="mb-4">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-200 bg-orange-50 typo-caption text-[#FF6B00] mb-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></div>
            WHAT YOU CAN BUILD
          </div>

          {/* Heading */}
          <h2 className="typo-heading-2 text-slate-900 mb-3">
            From Conversation to Business Action
          </h2>

          {/* Description */}
          <p className="text-slate-600 typo-description mb-4">
            Nova 2 Sonic enables real-time speech-to-speech experiences with capabilities including tool invocation, RAG, multilingual interaction and asynchronous tool use.
          </p>
        </div>
      )}

      {/* Use Cases List */}
      <div className="flex flex-col justify-between flex-1">
        {items.map((item, i) => (
          <div
            key={i}
            className={`flex items-start gap-3.5 sm:gap-4 py-1.5 sm:py-2 ${
              i !== items.length - 1 ? "border-b border-slate-100" : ""
            }`}
          >
            <div className={`shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full ${item.bg} flex items-center justify-center mt-0.5 border border-orange-200/50`}>
              <item.icon className={`w-4.5 h-4.5 sm:w-5 sm:h-5 ${item.color}`} />
            </div>
            <div className="flex flex-col pt-0">
              <h3 className="typo-heading-4 text-slate-900 mb-0.5">
                {item.title}
              </h3>
              <p className="typo-body-sm text-slate-600">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Single Section-Level CTA */}
      <div className="pt-4 mt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="typo-body font-medium text-slate-700 text-center sm:text-left">
          Ready to deploy voice agents?
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-[#FF6B00] hover:bg-[#e05e00] text-white typo-button shadow-md shadow-orange-500/20 transition-all duration-200 shrink-0 group"
        >
          <span>Contact Us</span>
          <ArrowRight className="w-4.5 h-4.5 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};
