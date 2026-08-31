"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type TabId = "white-label" | "dedicated" | "agentic" | "microsoft" | "flexible" | "long-term";

interface TabData {
  id: TabId;
  label: string;
  heading: string;
  bullets: string[];
  card: {
    eyebrow: string;
    title: string;
    stats: string[];
  };
}

const tabsData: TabData[] = [
  {
    id: "white-label",
    label: "White-Label AI Delivery",
    heading: "Deliver AI solutions under your brand while Softree provides the engineering behind the scenes.",
    bullets: [
      "Seamless brand integration and invisible delivery",
      "Dedicated backend engineering and architecture",
      "Full intellectual property transfer and compliance"
    ],
    card: {
      eyebrow: "PARTNERSHIP",
      title: "Invisible AI Engineering",
      stats: ["100% White-labeled", "Zero overhead"]
    }
  },
  {
    id: "dedicated",
    label: "Dedicated Offshore Teams",
    heading: "Build a focused team of AI architects, engineers, developers, data specialists, and QA professionals.",
    bullets: [
      "Access top-tier AI engineering talent globally",
      "Full control over team management and workflows",
      "Cost-effective scaling for enterprise AI projects"
    ],
    card: {
      eyebrow: "TEAM EXTENSION",
      title: "Elite AI Engineering Talent",
      stats: ["Rapid onboarding", "Dedicated focus"]
    }
  },
  {
    id: "agentic",
    label: "Agentic AI Expertise",
    heading: "Design and build AI agents that can reason, use tools, collaborate, and execute real business workflows.",
    bullets: [
      "Multi-agent collaboration systems and architectures",
      "Autonomous workflow execution and decision making",
      "Custom tool integration and advanced reasoning"
    ],
    card: {
      eyebrow: "AUTONOMOUS AI",
      title: "Next-Generation AI Agents",
      stats: ["Complex reasoning", "Action-oriented"]
    }
  },
  {
    id: "microsoft",
    label: "Microsoft AI Expertise",
    heading: "Build AI solutions across Azure AI, Azure OpenAI, Microsoft Copilot, Copilot Studio, Microsoft 365, and Power Platform.",
    bullets: [
      "Enterprise-grade Azure AI cloud architecture",
      "Custom Copilot and Copilot Studio development",
      "Secure Power Platform AI integration"
    ],
    card: {
      eyebrow: "MICROSOFT STACK",
      title: "Enterprise AI Solutions",
      stats: ["Azure native", "Secure & compliant"]
    }
  },
  {
    id: "flexible",
    label: "Flexible Engagement",
    heading: "Choose project delivery, dedicated teams, staff augmentation, white-label delivery, or managed engineering.",
    bullets: [
      "Tailored to your specific project and timeline needs",
      "Agile adaptation to changing business requirements",
      "Scale engineering capacity up or down effortlessly"
    ],
    card: {
      eyebrow: "ENGAGEMENT",
      title: "Adaptable Partnership Models",
      stats: ["Risk mitigation", "Agile delivery"]
    }
  },
  {
    id: "long-term",
    label: "Long-Term Partnership",
    heading: "Work with an engineering team that can grow with your technology and delivery needs.",
    bullets: [
      "Strategic alignment with long-term business goals",
      "Continuous innovation, maintenance, and support",
      "Future-proof AI infrastructure and architecture planning"
    ],
    card: {
      eyebrow: "GROWTH",
      title: "Strategic Engineering Partner",
      stats: ["Continuous support", "Technology evolution"]
    }
  }
];

export default function WhySoftreeTabs() {
  const [activeTab, setActiveTab] = useState<TabId>("white-label");

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveTab((current) => {
        const currentIndex = tabsData.findIndex((t) => t.id === current);
        const nextIndex = (currentIndex + 1) % tabsData.length;
        return tabsData[nextIndex].id;
      });
    }, 5000); // Change tab every 5 seconds

    return () => clearTimeout(timer);
  }, [activeTab]);

  const activeData = tabsData.find(t => t.id === activeTab)!;

  return (
    <section className="py-12 md:py-16 lg:py-24 font-sans relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-[#050505] rounded-[32px] md:rounded-[48px] px-5 py-12 sm:px-10 md:px-12 md:py-20 relative overflow-hidden shadow-2xl border border-zinc-800/80">
          
          <div className="absolute top-[-20%] left-[50%] translate-x-[-50%] w-[800px] h-[600px] bg-[#FF5812]/10 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute inset-0 rounded-[32px] md:rounded-[48px] ring-1 ring-inset ring-white/5 pointer-events-none" />

          <div className="max-w-5xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-1.5 rounded-full bg-[#FF5812]/10 border border-[#FF5812]/20 text-[#FF5812] text-xs font-bold uppercase tracking-widest mb-6">
                Your AI Practice. Our Engineering Team.
              </div>
              <h2 className="text-4xl md:text-[42px] font-semibold text-white tracking-tight mb-4">
                Why <span className="text-[#FF5812]">Softree</span>
              </h2>
              <p className="text-lg md:text-xl text-zinc-400 font-light max-w-2xl mx-auto">
                You don't always need another AI vendor. You need a reliable engineering partner that can work with your team, your processes, and your clients.
              </p>
            </div>

            {/* Tabs navigation */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 lg:gap-x-8 gap-y-6 border-b border-zinc-800/60 mb-10 px-4">
              {tabsData.map((tab) => {
                const isActive = tab.id === activeTab;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative pb-4 text-[14px] sm:text-[15px] md:text-base font-medium transition-colors whitespace-nowrap ${
                      isActive ? "text-[#FF5812]" : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    {tab.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeTabIndicator"
                        className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-[#FF5812]"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Tab content */}
            <div className="bg-[#FF5812] border border-white/10 rounded-[28px] p-8 sm:p-12 min-h-[460px] relative overflow-hidden">
              <div 
                className="absolute inset-0 pointer-events-none" 
                style={{
                  backgroundImage: `
                    linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 1px)
                  `,
                  backgroundSize: '24px 24px'
                }}
              />
              <div className="absolute inset-0 rounded-[28px] ring-1 ring-inset ring-white/10 pointer-events-none" />
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeData.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col h-full justify-between relative z-10"
                >
                  <div>
                    <h3 className="text-[26px] md:text-[32px] leading-[1.3] font-medium text-white mb-8 max-w-4xl tracking-tight">
                      {activeData.heading}
                    </h3>
                    
                    <ul className="space-y-4 mb-16">
                      {activeData.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-white mt-2.5 shrink-0 shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                          <span className="text-white/90 text-lg font-light">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bottom Card */}
                  <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-white/50 to-transparent opacity-50" />
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-white/80 text-[10px] font-bold tracking-[0.2em] uppercase">
                        {activeData.card.eyebrow}
                      </div>
                      <div className="flex gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] shadow-[0_0_10px_#FF5F56] animate-pulse" style={{ animationDuration: '2s' }} />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] shadow-[0_0_10px_#FFBD2E] animate-pulse" style={{ animationDuration: '2s', animationDelay: '0.4s' }} />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F] shadow-[0_0_10px_#27C93F] animate-pulse" style={{ animationDuration: '2s', animationDelay: '0.8s' }} />
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="text-white font-medium text-lg">
                        {activeData.card.title}
                      </div>
                      <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                        {activeData.card.stats.map((stat, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-white/80 shrink-0" />
                            <span className="text-white/90 text-sm font-medium">{stat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
