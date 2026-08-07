"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Check, 
  Terminal, 
  Cpu, 
  GitBranch, 
  Code, 
  Sparkles, 
  Settings, 
  ChevronRight,
  User,
  ShieldCheck,
  MessageSquare
} from "lucide-react";
import SectionBadge from "./SectionBadge";

interface AgentData {
  id: string;
  tabLabel: string;
  tabDescription: string;
  agentName: string;
  icon: React.ComponentType<any>;
  query: string;
  status: string;
  response: string;
  codeSnippet?: string;
  steps?: string[];
  points: string[];
}

const AGENTS_DATA: AgentData[] = [
  {
    id: "coding",
    tabLabel: "Unblock engineering with context-aware answers",
    tabDescription: "Orchestrate developer agents to query codebase repositories, diagnose CI/CD logs, and write documented code.",
    agentName: "Coding Agent",
    icon: Code,
    query: "Can you diagnose build failures in our CI/CD pipeline and suggest solutions based on past incidents?",
    status: "RESPONSE COMPLETE",
    response: "Based on historical patterns, the issue likely stems from database migration scripts during integration testing. Here's a solution with a code example:",
    codeSnippet: `// Example: Automated migration test
def test_migration():
    # Run migration script
    run_migration_script()

    # Verify database schema
    assert check_schema_changes(), "Schema changes failed"`,
    points: [
      "Explain APIs with code examples and links to modules, tests, and owners",
      "Diagnose failing builds and propose fixes based on historical patterns",
      "Draft RFCs and suggest reviewers based on ownership graphs"
    ]
  },
  {
    id: "devops",
    tabLabel: "Automate release workflows from CI to deployment",
    tabDescription: "Orchestrate coordination across pipeline gates, verification tests, and change management tools.",
    agentName: "Release Governor Agent",
    icon: GitBranch,
    query: "Deploy build #1042 to staging. Run compliance gates and verify test coverage.",
    status: "DEPLOYMENT SUCCESSFUL",
    response: "Compliance scan and unit tests completed successfully. Staging deployment runner finished:",
    codeSnippet: `[INFO] Initializing deployment runner...
[SUCCESS] Verified security policy compliance.
[SUCCESS] Deployed artifacts to k8s-staging-cluster-04.
[INFO] Deployment active at: https://staging.softree.internal`,
    steps: [
      "Security Audit: Passed (0 critical vulnerabilities)",
      "Test Coverage: 94.2% (Target: >90%)",
      "Gate Reviewer: Slack approval received from @OpsLead"
    ],
    points: [
      "Verify compliance rules and test coverage automatically",
      "Generate detailed release notes from commit history",
      "Deploy to staging/production on slack approval triggers"
    ]
  },
  {
    id: "support",
    tabLabel: "Move faster with a customer insight copilot",
    tabDescription: "Coordinate support, CRM, and product data to resolve client inquiries autonomously.",
    agentName: "Support Copilot Agent",
    icon: Sparkles,
    query: "A client is asking how to configure OAuth2 scopes in our integration portal. Can you write a response?",
    status: "DRAFT SYNCED TO CRM",
    response: "Grounded in our internal API documentation and client record (ID: 8849-A), here is the step-by-step guidance for configuring scopes:",
    codeSnippet: `## OAuth2 Configuration Steps
1. Navigate to Developer Settings > API Credentials.
2. Select scopes: read:assets, write:orders.
3. Update your redirect URI in local config.`,
    steps: [
      "Grounded source: integration-guide-v4.pdf",
      "Client level: Enterprise Tier (Premium support)",
      "Automatic draft synced to Zendesk ticket #40882"
    ],
    points: [
      "Synthesize responses from disparate product documentation files",
      "Automatically draft tickets and sync with Jira/ServiceNow",
      "Transfer complex cases to human support with full context logs"
    ]
  }
];

export default function AgentShowcase() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const activeAgent = AGENTS_DATA[activeTab];
  const ActiveIcon = activeAgent.icon;

  return (
    <section className="relative w-full py-20 lg:py-28 bg-transparent overflow-hidden font-sans">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ================= HEADER ================= */}
        <div className="flex flex-col items-center w-full mb-14 lg:mb-20">
          <SectionBadge text="MULTI-AGENT SYSTEMS" variant="line" />

          <h2 className="text-3xl md:text-4xl lg:text-[2.5rem] font-extrabold text-[#111827] mb-4 tracking-tight text-center leading-tight">
            Empower your teams with custom <span className="text-[#FF5812]">multi-agent systems</span>
          </h2>

          <p className="text-[15px] lg:text-base text-[#6B7280] text-center max-w-2xl leading-relaxed">
            Explore how Softree orchestrates specialized agent teams to handle complex enterprise use cases across the product lifecycle.
          </p>
        </div>

        {/* ================= MAIN CONTAINER ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* ================= LEFT COLUMN: MOCK TERMINAL ================= */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="relative w-full rounded-[24px] bg-[#0A0F1D] border border-slate-800 shadow-[0_30px_70px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col min-h-[480px]">
              
              {/* Terminal Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-[#0B1123]">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#EF4444]/80" />
                  <div className="w-3 h-3 rounded-full bg-[#F59E0B]/80" />
                  <div className="w-3 h-3 rounded-full bg-[#10B981]/80" />
                </div>
                
                <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-[#131B34] border border-slate-700/50">
                  <Terminal size={12} className="text-[#FF5812]" />
                  <span className="text-[11px] font-mono text-slate-300 font-medium tracking-wide">
                    {activeAgent.agentName}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-slate-400">
                  <Settings size={14} className="hover:text-slate-200 cursor-pointer transition" />
                </div>
              </div>

              {/* Terminal Content (Animated) */}
              <div className="p-5 flex-grow font-mono text-xs text-slate-300 flex flex-col gap-5 overflow-y-auto leading-relaxed">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeAgent.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="flex flex-col gap-5"
                  >
                    
                    {/* User Query Block */}
                    <div className="flex gap-3.5 items-start">
                      <div className="w-7 h-7 rounded-lg bg-[#FF5812]/15 border border-[#FF5812]/30 flex items-center justify-center text-[#FF5812] shrink-0 mt-0.5 shadow-sm">
                        <User size={13} />
                      </div>
                      <div className="flex-1 bg-[#121A33] border border-slate-800/80 rounded-xl p-3.5 text-slate-200">
                        <p className="text-[12.5px] leading-relaxed">{activeAgent.query}</p>
                      </div>
                    </div>

                    {/* Agent Response Block */}
                    <div className="flex gap-3.5 items-start">
                      <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5 shadow-sm">
                        <Cpu size={13} />
                      </div>
                      <div className="flex-1 flex flex-col gap-3">
                        {/* Status bar */}
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                            {activeAgent.status}
                          </span>
                        </div>

                        {/* Text explanation */}
                        <p className="text-slate-300 leading-relaxed text-[12.5px]">
                          {activeAgent.response}
                        </p>

                        {/* Automated Process Steps if applicable */}
                        {activeAgent.steps && (
                          <div className="flex flex-col gap-1.5 p-3 rounded-lg bg-[#0F162A] border border-slate-800/50">
                            {activeAgent.steps.map((step, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-slate-400 text-[11.5px]">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#FF5812]/70 shrink-0" />
                                <span>{step}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Code snippet / log snippet */}
                        {activeAgent.codeSnippet && (
                          <div className="relative rounded-xl border border-slate-800 bg-[#070A14] overflow-hidden shadow-inner">
                            <div className="absolute top-2.5 right-3 text-[10px] text-slate-500 select-none tracking-widest uppercase">
                              {activeAgent.id === "coding" ? "python" : "terminal"}
                            </div>
                            <pre className="p-4 text-[11.5px] overflow-x-auto text-slate-200 font-mono leading-relaxed bg-[#080B15]">
                              <code>{activeAgent.codeSnippet}</code>
                            </pre>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Terminal Input Mock */}
              <div className="border-t border-slate-800 bg-[#0B1123] px-5 py-3.5 flex items-center justify-between text-slate-500">
                <div className="flex items-center gap-2">
                  <span className="text-[#FF5812] select-none font-bold font-mono">$</span>
                  <span className="text-slate-400 font-mono text-xs">Ask a follow-up question...</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] tracking-wider text-slate-500">⌘+⏎</span>
                </div>
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: INTERACTIVE ACCORDION ================= */}
          <div className="lg:col-span-5 flex flex-col justify-center gap-4">
            {AGENTS_DATA.map((item, idx) => {
              const isActive = idx === activeTab;
              const Icon = item.icon;

              return (
                <div
                  key={item.id}
                  onClick={() => setActiveTab(idx)}
                  className={`group relative rounded-2xl border p-5 sm:p-6 transition-all duration-300 ease-out cursor-pointer overflow-hidden ${
                    isActive
                      ? "bg-white border-orange-200/80 shadow-[0_20px_50px_rgba(255,88,18,0.06)]"
                      : "bg-[#FAF9F6]/40 border-[#ECEAE7] hover:border-orange-100 hover:bg-white/80"
                  }`}
                >
                  {/* Subtle active background glow */}
                  {isActive && (
                    <span className="absolute inset-0 bg-gradient-to-br from-orange-50/10 via-transparent to-orange-100/10 pointer-events-none" />
                  )}

                  {/* Header row */}
                  <div className="flex items-start gap-4">
                    {/* Icon Box */}
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105 ${
                      isActive
                        ? "bg-[#FF5812] text-white shadow-md shadow-orange-500/20"
                        : "bg-[#F3EFEA] text-slate-600 group-hover:bg-orange-50 group-hover:text-[#FF5812]"
                    }`}>
                      <Icon size={20} />
                    </div>

                    <div className="flex-grow pt-0.5">
                      <h3 className={`text-[16px] sm:text-[17px] font-bold leading-tight transition-colors duration-200 ${
                        isActive ? "text-[#111827]" : "text-slate-700 group-hover:text-[#111827]"
                      }`}>
                        {item.tabLabel}
                      </h3>

                      {/* Expandable Content wrapper */}
                      <div className={`grid transition-all duration-300 ease-in-out ${
                        isActive ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
                      }`}>
                        <div className="overflow-hidden">
                          <p className="text-[13.5px] leading-relaxed text-[#6B7280] mb-5">
                            {item.tabDescription}
                          </p>

                          {/* List of sub-points */}
                          <ul className="space-y-3">
                            {item.points.map((point, pIdx) => (
                              <li key={pIdx} className="flex gap-2.5 items-start">
                                <div className="w-5 h-5 rounded-full bg-[#FF5812]/10 border border-[#FF5812]/15 flex items-center justify-center text-[#FF5812] shrink-0 mt-0.5">
                                  <Check size={11} className="stroke-[3]" />
                                </div>
                                <span className="text-[13px] leading-tight text-slate-700 font-medium">
                                  {point}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Arrow signifier (visible when not active) */}
                    {!isActive && (
                      <ChevronRight 
                        size={18} 
                        className="text-slate-400 mt-1 transition-transform group-hover:translate-x-0.5" 
                      />
                    )}
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
