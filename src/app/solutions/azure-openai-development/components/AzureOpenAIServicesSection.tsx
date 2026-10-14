"use client";

import React from "react";
import { Building, Settings, Code, Blocks, Building2 } from "lucide-react";
import { FlowButton } from "@/components/ui/flow-button";

import dynamic from 'next/dynamic';

const NetworkGlobe = dynamic(() => import('@/app/services/ai-development-services/components/NetworkGlobe'), { ssr: true });

export const AzureOpenAIServicesSection = ({ simple = false }: { simple?: boolean }) => {
  const items = [
    {
      title: "Businesses & Organisations",
      desc: "Deploy governed Azure OpenAI solutions inside your private Azure subscription.",
      subdesc: "Architect custom GPT-4o applications, production RAG pipelines, secure VNet landing zones, and Microsoft Copilot integrations that meet your security, governance, and compliance requirements.",
      icon: Building,
      color: "text-[#FF6B2C]",
      bg: "bg-orange-50",
    },
    {
      title: "AI & Engineering Teams",
      desc: "Build production-ready Azure OpenAI applications with offshore engineering capacity.",
      subdesc: "Get expert support for Azure AI Foundry setup, RAG architecture, semantic search, GPT-4o API middleware, token optimization, prompt engineering, evaluation suites, and CI/CD deployment pipelines.",
      icon: Settings,
      color: "text-[#FF6B2C]",
      bg: "bg-orange-50",
    },
    {
      title: "Consulting Firms",
      desc: "Extend your AI engagements with specialized Azure OpenAI engineering expertise.",
      subdesc: "Add engineering capacity for Azure OpenAI architecture, RAG implementation, Microsoft Copilot development, security hardening, and production deployment while retaining full client engagement ownership.",
      icon: Code,
      color: "text-[#FF6B2C]",
      bg: "bg-orange-50",
    },
    {
      title: "System Integrators",
      desc: "Add Azure OpenAI engineering capacity to your client modernization programs.",
      subdesc: "Support GPT-4o application builds, Azure AI Search integrations, Microsoft 365 Copilot extensions, Power Platform AI connectors, production RAG pipelines, and governed AI deployment architectures.",
      icon: Blocks,
      color: "text-[#FF6B2C]",
      bg: "bg-orange-50",
    },
    {
      title: "Microsoft & Technology Partners",
      desc: "Accelerate Azure OpenAI project delivery with dedicated offshore AI engineering teams.",
      subdesc: "Extend your delivery capability with engineers supporting Azure OpenAI solution design, RAG development, Copilot extension builds, security architecture, production deployment, and ongoing model evaluation.",
      icon: Building2,
      color: "text-[#FF6B2C]",
      bg: "bg-orange-50",
    },
  ];

  return (
    <section className="bg-white pt-8 md:pt-12 pb-8 md:pb-12 text-slate-900 scroll-mt-24">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 lg:gap-x-16 gap-y-8 lg:gap-y-10 items-stretch">

          {/* Top Area: Eyebrow, then Heading & Intro side-by-side */}
          {!simple && (
            <div className="lg:col-span-12 flex flex-col">
              <div className="shadow-[inset_2px_2px_5px_#e4e4e7,inset_-2px_-2px_5px_#ffffff] bg-zinc-50/50 px-3.5 py-1 rounded-full border border-white/60 mb-4 inline-block self-start">
                <span className="typo-caption text-[#FF6B2C] uppercase">
                  WHO WE HELP & WHERE WE OPERATE
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-4 items-start">
                <h2 className="typo-heading-2 text-slate-900 pr-4">
                  Azure OpenAI Development for <br className="hidden lg:block" /><span className="text-[#FF6B2C]">Businesses & Technology Partners</span>
                </h2>

                <p className="typo-description text-slate-500 w-full pt-1.5">
                  We help businesses, engineering teams, consulting firms, system integrators, and Microsoft partners design, build, and deploy Azure OpenAI solutions — from GPT-4o applications and RAG pipelines to Copilot extensions and governed AI landing zones.
                </p>
              </div>
            </div>
          )}

          {/* Bottom Row: Who We Help Items (Left) and Globe (Right) */}
          <div className="lg:col-span-6 flex flex-col justify-between h-full w-full">
            {/* 5 Content List */}
            <div className="flex flex-col divide-y divide-slate-100">
              {items.map((item, i) => (
                <div
                  key={i}
                  className="py-3 first:pt-1.5 last:pb-1 group transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className={`shrink-0 w-10 h-10 rounded-lg ${item.bg} border border-orange-100 flex items-center justify-center group-hover:scale-105 group-hover:bg-[#FF6B2C] group-hover:text-white transition-all duration-300 mt-0.5`}>
                      <item.icon className={`w-5 h-5 ${item.color} group-hover:text-white transition-colors`} />
                    </div>
                    <div className="flex flex-col flex-1 min-w-0">
                      <h3 className="typo-heading-4 text-slate-900 group-hover:text-[#FF6B2C] transition-colors">
                        {item.title}
                      </h3>
                      <p className="typo-body-lg font-semibold text-slate-700 mt-1">
                        {item.desc}
                      </p>
                      <p className="typo-body-sm text-slate-500 mt-1">
                        {item.subdesc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Single Section-Level CTA Below */}
            <div className="pt-4 mt-auto border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="typo-body text-slate-700 text-center sm:text-left">
                Ready to build your Azure OpenAI solution?
              </p>
              <FlowButton
                href="/contact"
                text="Explore AI Development Services"
                variant="orange-filled"
                className="shrink-0"
              />
            </div>
          </div>

          <div className="lg:col-span-6 w-full flex justify-center lg:justify-end items-stretch">
            <NetworkGlobe
              heading="Where our clients are"
              tagline="Global Reach. Local Understanding."
              subheading="Trusted by businesses across 13+ countries, we deliver Azure OpenAI solutions that help organisations build, scale, and innovate with AI on Azure."
              storesLabel="13+ countries served"
              caption="Trusted by businesses across 13+ countries, we deliver Azure OpenAI solutions that help organisations build, scale, and innovate with AI on Azure."
            />
          </div>

        </div>
      </div>
    </section>
  );
};
