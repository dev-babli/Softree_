"use client";

import React from "react";
import Link from "next/link";
import {
  AppWindow,
  Brain,
  Workflow,
  BarChart3,
  Link as LinkIcon,
  ArrowRightLeft,
  Cloud,
  RefreshCcw,
  FileText,
  Settings,
  ArrowRight,
} from "lucide-react";

export const WhoWeHelp = ({ simple = false }: { simple?: boolean }) => {
  const items = [
    {
      title: "Healthcare Applications",
      desc: "Build secure, scalable healthcare applications that improve patient experiences, streamline operations, and support smarter digital healthcare delivery.",
      icon: AppWindow,
      color: "text-[#FF6B00]",
      bg: "bg-orange-50",
    },
    {
      title: "AI & Generative AI Solutions",
      desc: "Accelerate healthcare innovation with AI and Generative AI solutions for intelligent automation, clinical insights, conversational experiences, and knowledge-driven workflows.",
      icon: Brain,
      color: "text-[#FF6B00]",
      bg: "bg-orange-50",
    },
    {
      title: "Clinical & Operational Workflows",
      desc: "Streamline clinical and operational workflows with intelligent solutions that improve efficiency, reduce manual effort, and support better healthcare outcomes.",
      icon: Workflow,
      color: "text-[#FF6B00]",
      bg: "bg-orange-50",
    },
    {
      title: "Healthcare Data & Analytics",
      desc: "Turn complex healthcare data into actionable insights with advanced analytics, AI-powered intelligence, and data solutions that support faster, informed decision-making.",
      icon: BarChart3,
      color: "text-[#FF6B00]",
      bg: "bg-orange-50",
    },
    {
      title: "EHR & Healthcare Integration",
      desc: "Connect healthcare systems and applications with secure EHR integration solutions that enable seamless data exchange, interoperability, and connected care.",
      icon: LinkIcon,
      color: "text-[#FF6B00]",
      bg: "bg-orange-50",
    },
    {
      title: "FHIR & HL7 Solutions",
      desc: "Enable healthcare interoperability with FHIR and HL7 solutions designed to securely exchange clinical data across healthcare applications, systems, and platforms.",
      icon: ArrowRightLeft,
      color: "text-[#FF6B00]",
      bg: "bg-orange-50",
    },
    {
      title: "Healthcare Cloud Solutions",
      desc: "Modernize healthcare infrastructure with secure, scalable cloud solutions that improve accessibility, flexibility, system performance, and operational efficiency.",
      icon: Cloud,
      color: "text-[#FF6B00]",
      bg: "bg-orange-50",
    },
    {
      title: "Legacy Modernization",
      desc: "Transform legacy healthcare systems into modern, scalable platforms that improve performance, integration, security, and long-term digital agility.",
      icon: RefreshCcw,
      color: "text-[#FF6B00]",
      bg: "bg-orange-50",
    },
    {
      title: "Intelligent Document Processing",
      desc: "Automate healthcare document workflows with AI-powered extraction, classification, validation, summarization, and intelligent processing of complex documents.",
      icon: FileText,
      color: "text-[#FF6B00]",
      bg: "bg-orange-50",
    },
    {
      title: "Healthcare Automation",
      desc: "Reduce administrative workload and operational costs by automating repetitive healthcare processes with AI-powered workflows and intelligent automation.",
      icon: Settings,
      color: "text-[#FF6B00]",
      bg: "bg-orange-50",
    }
  ];

  return (
    <div className="flex flex-col justify-between h-full w-full lg:max-w-[660px] mx-auto lg:mx-0 px-4 lg:px-2 pt-0">
      {!simple && (
        <div className="mb-4">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-200 bg-orange-50 text-[10px] sm:text-[11px] font-bold tracking-widest text-[#FF6B00] uppercase mb-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></div>
            WHAT WE HELP OUR PARTNERS BUILD
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] xl:text-[38px] font-extrabold font-['Plus_Jakarta_Sans',sans-serif] text-slate-900 leading-[1.2] mb-3 tracking-tight">
            Healthcare Solutions We Help Build
          </h2>

          {/* Description */}
          <p className="text-slate-600 text-[16px] sm:text-[17px] leading-relaxed mb-4">
            From new healthcare products to AI-powered workflows and modernized platforms, our teams work with you to turn healthcare requirements into production-ready solutions.
          </p>
        </div>
      )}

      {/* Healthcare Use Cases List */}
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
              <h3 className="text-[14px] sm:text-[14.5px] font-bold text-slate-900 leading-snug mb-0.5">
                {item.title}
              </h3>
              <p className="text-[12px] sm:text-[12.5px] text-slate-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Single Section-Level CTA */}
      <div className="pt-4 mt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-[15px] sm:text-[16px] text-slate-700 font-medium text-center sm:text-left">
          Ready to deploy customized AI across your healthcare workflows?
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-[#FF6B00] hover:bg-[#e05e00] text-white text-[15px] sm:text-[16px] font-semibold shadow-md shadow-orange-500/20 transition-all duration-200 shrink-0 group"
        >
          <span>Contact Us</span>
          <ArrowRight className="w-4.5 h-4.5 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};
