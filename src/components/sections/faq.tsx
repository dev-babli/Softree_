/* eslint-disable softree-design/no-untokenized-design-literals */
"use client";

import { useState } from "react";

const faqs = [
  {
    question: "What kind of technology solutions does Softree Technology specialize in?",
    answer:
      "Softree Technology specializes in enterprise Microsoft solutions, AI-powered automation, modern application engineering, and offshore development services. Our core expertise includes SharePoint + PowerApps, Power Automate, Power BI, Dynamics 365, Microsoft Fabric, Azure AI, AI agents, custom web and mobile applications, and enterprise workflow automation solutions designed to help businesses modernize operations and scale efficiently.",
  },
  {
    question: "Can Softree help businesses replace manual processes and spreadsheet-based operations?",
    answer:
      "Yes. Many organizations still manage approvals, reporting, employee requests, and operational workflows through spreadsheets, emails, and disconnected systems. Softree helps businesses modernize these processes using SharePoint + PowerApps, Power Automate, Dynamics 365, and AI-powered workflow automation solutions that improve operational visibility, reduce manual effort, minimize process delays, and increase efficiency across departments.",
  },
  {
    question: "Does Softree work with companies that already use Microsoft 365?",
    answer:
      "Absolutely. Softree primarily works with businesses already operating within the Microsoft ecosystem. We help organizations extend and optimize Microsoft 365 environments using SharePoint, Teams, Power Platform, Dynamics 365, Power BI, Azure AI, and Microsoft Copilot integrations without disrupting existing operations or requiring large-scale infrastructure changes.",
  },
  {
    question: "Why do companies choose Softree as their Microsoft and AI development partner?",
    answer:
      "Companies choose Softree for its expertise in SharePoint with Power Apps, Power Platform, Dynamics 365, Azure AI, enterprise automation, and custom software development. We combine deep Microsoft ecosystem knowledge with AI engineering capabilities, offshore scalability, transparent delivery processes, and long-term partnership models.",
  },
  {
    question: "How does Softree support enterprise digital transformation initiatives?",
    answer:
      "Softree supports enterprise digital transformation by modernizing legacy systems, automating workflows, improving collaboration, implementing AI-driven business solutions, and building scalable enterprise applications. Our delivery model combines Microsoft technologies, cloud architecture, AI automation, and agile engineering practices to help organizations improve operational agility, accelerate delivery timelines, and reduce dependency on fragmented manual processes.",
  },
  {
    question: "Can Softree build custom AI solutions for enterprise operations?",
    answer:
      "Yes. Softree develops AI-powered enterprise solutions including AI agents, Copilot integrations, intelligent automation systems, document AI, AI-assisted workflows, and Retrieval-Augmented Generation (RAG) solutions. These systems are designed to improve productivity, automate repetitive business operations, streamline knowledge access, and support faster operational decision-making across enterprise environments.",
  },
  {
    question: "What business processes can be automated using Microsoft Power Platform solutions?",
    answer:
      "Businesses use Microsoft Power Platform to automate approvals, onboarding, reporting, inventory tracking, HR operations, document workflows, customer request management, compliance processes, and operational coordination systems. Softree helps organizations identify automation opportunities and implement scalable Power Apps and Power Automate solutions integrated with enterprise systems and existing Microsoft environments.",
  },
  {
    question: "How does Softree ensure data security and compliance in enterprise solutions?",
    answer:
      "Softree aligns all development with Microsoft and industry security best practices. We build solutions within your secure Microsoft 365 tenant or Azure environment, ensuring data privacy, strict access controls, and compliance with enterprise governance policies.",
  },
];

export type FAQItem = {
  question: string;
  answer: string;
};

export default function SoftreeFAQ({ faqs: customFaqs }: { faqs?: FAQItem[] } = {}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const activeFaqs = customFaqs || faqs;

  return (
    <section className="relative w-full py-12 px-4 md:px-6 bg-[#000000]">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-15">
          <p
            className="text-sm uppercase tracking-widest font-semibold mb-3 inline-block bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #ff7a2f 0%, #c75a2a 35%, #6b5b5b 70%, #3a3a3a 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Softree FAQ
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Everything You Need to Know
          </h2>

          <p className="text-slate-500 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Clear answers to common questions about Softree’s enterprise-grade
            digital solutions, platforms, and capabilities.
          </p>
        </div>

        {/* FAQ Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left Column */}
          <div className="flex flex-col gap-8 w-full">
            {activeFaqs.map((faq, index) => {
              if (index % 2 !== 0) return null;
              const isOpen = openIndex === index;

              return (
                <div
                  key={index}
                  className={`
            relative
            rounded-2xl
            border
            p-6
            transition-all
            duration-500
            hover:-translate-y-1
            ${isOpen 
              ? "bg-gradient-to-br from-[#f97316] via-[#7c2d12] to-[#050505] border-[#f97316]/30 shadow-[0_20px_60px_rgba(249,115,22,0.15)]" 
              : "bg-gradient-to-br from-[#f97316]/12 via-[#0a0a0a]/40 to-[#050505] border-[#f97316]/20 hover:border-[#f97316]/50 shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
            }
          `}
                >
                  {/* Mirror Shine */}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-20" />

                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="relative z-10 flex w-full items-start justify-between gap-4 text-left"
                  >
                    <h3 className={`text-lg md:text-xl font-bold transition-colors duration-500 ${isOpen ? "text-black" : "text-white"}`}>
                      {faq.question}
                    </h3>

                    {/* Icon */}
                    <span
                      className={`
                mt-1
                flex h-9 w-9 items-center justify-center
                rounded-full
                border
                text-base
                font-semibold
                transition-all
                duration-500
                ${
                  isOpen
                    ? "rotate-180 bg-black text-white border-black shadow-[0_4px_12px_rgba(0,0,0,0.25)]"
                    : "border-[#f97316]/30 text-[#f97316] hover:bg-[#f97316]/10"
                }
              `}
                    >
                      +
                    </span>
                  </button>

                  {/* Answer */}
                  <div
                    className={`
              grid
              transition-all
              duration-500
              ease-in-out
              ${isOpen ? "grid-rows-[1fr] mt-4" : "grid-rows-[0fr]"}
            `}
                  >
                    <div className="overflow-hidden">
                      <p className={`text-sm md:text-base font-medium leading-relaxed transition-colors duration-500 ${isOpen ? "text-neutral-300" : "text-white/70"}`}>
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-8 w-full">
            {activeFaqs.map((faq, index) => {
              if (index % 2 === 0) return null;
              const isOpen = openIndex === index;

              return (
                <div
                  key={index}
                  className={`
            relative
            rounded-2xl
            border
            p-6
            transition-all
            duration-500
            hover:-translate-y-1
            ${isOpen 
              ? "bg-gradient-to-br from-[#f97316] via-[#7c2d12] to-[#050505] border-[#f97316]/30 shadow-[0_20px_60px_rgba(249,115,22,0.15)]" 
              : "bg-gradient-to-br from-[#f97316]/12 via-[#0a0a0a]/40 to-[#050505] border-[#f97316]/20 hover:border-[#f97316]/50 shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
            }
          `}
                >
                  {/* Mirror Shine */}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-20" />

                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="relative z-10 flex w-full items-start justify-between gap-4 text-left"
                  >
                    <h3 className={`text-lg md:text-xl font-bold transition-colors duration-500 ${isOpen ? "text-black" : "text-white"}`}>
                      {faq.question}
                    </h3>

                    {/* Icon */}
                    <span
                      className={`
                mt-1
                flex h-9 w-9 items-center justify-center
                rounded-full
                border
                text-base
                font-semibold
                transition-all
                duration-500
                ${
                  isOpen
                    ? "rotate-180 bg-black text-white border-black shadow-[0_4px_12px_rgba(0,0,0,0.25)]"
                    : "border-[#f97316]/30 text-[#f97316] hover:bg-[#f97316]/10"
                }
              `}
                    >
                      +
                    </span>
                  </button>

                  {/* Answer */}
                  <div
                    className={`
              grid
              transition-all
              duration-500
              ease-in-out
              ${isOpen ? "grid-rows-[1fr] mt-4" : "grid-rows-[0fr]"}
            `}
                  >
                    <div className="overflow-hidden">
                      <p className={`text-sm md:text-base font-medium leading-relaxed transition-colors duration-500 ${isOpen ? "text-neutral-300" : "text-white/70"}`}>
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
