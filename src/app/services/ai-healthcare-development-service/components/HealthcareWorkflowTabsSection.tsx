"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Sparkles,
  Search,
  Activity,
  Heart,
  Dna,
  ShieldCheck,
  Check,
  TrendingDown,
  Clock,
  Bot,
} from "lucide-react";

export function HealthcareWorkflowTabsSection() {
  const [activeTab, setActiveTab] = useState<"clinical" | "operations" | "admin" | "support">("clinical");

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTab((current) => {
        const tabs = ["clinical", "operations", "admin", "support"] as const;
        const currentIndex = tabs.indexOf(current);
        return tabs[(currentIndex + 1) % tabs.length];
      });
    }, 5000);
    return () => clearInterval(timer);
  }, [activeTab]);

  return (
    <section className="py-20 md:py-24 bg-gradient-to-b from-zinc-50 via-white to-zinc-50 text-neutral-900 relative overflow-hidden border-t border-zinc-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <div className="text-[#FF5812] text-xs font-semibold uppercase tracking-[0.2em] mb-3 font-mono">
            REAL-WORLD AI IN HEALTHCARE
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight mb-4">
            Healthcare AI Use Cases
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-3xl mx-auto">
            Explore how AI is transforming healthcare across patient care, clinical operations, administration, and intelligent support. Softree Technology develops custom AI healthcare solutions that help hospitals, healthcare providers, clinics, health-tech companies, and digital health platforms automate workflows, improve efficiency, enhance patient experiences, and turn healthcare data into actionable insights.
          </p>
        </div>

        {/* Main Card Container */}
        <div className="bg-white border border-zinc-200 rounded-[32px] p-6 sm:p-10 md:p-14 shadow-xs relative overflow-hidden">
          {/* Top Tab Switcher Bar */}
          <div className="flex flex-wrap items-center gap-3 mb-10">
            {/* Tab 1 */}
            <button
              onClick={() => setActiveTab("clinical")}
              className={`px-6 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                activeTab === "clinical"
                  ? "bg-white border-2 border-[#FF5812] text-[#FF5812] shadow-sm"
                  : "bg-white border border-zinc-200 text-black/60 hover:border-[#FF5812]/50 hover:text-black"
              }`}
            >
              Patient & Clinical
            </button>

            {/* Tab 2 */}
            <button
              onClick={() => setActiveTab("operations")}
              className={`px-6 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                activeTab === "operations"
                  ? "bg-white border-2 border-[#FF5812] text-[#FF5812] shadow-sm"
                  : "bg-white border border-zinc-200 text-black/60 hover:border-[#FF5812]/50 hover:text-black"
              }`}
            >
              Healthcare Operations
            </button>

            {/* Tab 3 */}
            <button
              onClick={() => setActiveTab("admin")}
              className={`px-6 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                activeTab === "admin"
                  ? "bg-white border-2 border-[#FF5812] text-[#FF5812] shadow-sm"
                  : "bg-white border border-zinc-200 text-black/60 hover:border-[#FF5812]/50 hover:text-black"
              }`}
            >
              Business & Administration
            </button>

            {/* Tab 4 */}
            <button
              onClick={() => setActiveTab("support")}
              className={`px-6 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                activeTab === "support"
                  ? "bg-white border-2 border-[#FF5812] text-[#FF5812] shadow-sm"
                  : "bg-white border border-zinc-200 text-black/60 hover:border-[#FF5812]/50 hover:text-black"
              }`}
            >
              Intelligent Support
            </button>
          </div>

          {/* Tab Content Area with AnimatePresence */}
          <AnimatePresence mode="wait">
            {/* TAB 1 CONTENT: Patient & Clinical */}
            {activeTab === "clinical" && (
              <motion.div
                key="clinical"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
              >
                <div className="lg:col-span-6 flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-2xl font-bold text-black mb-4">
                      Patient & Clinical AI
                    </h3>
                    <p className="text-sm sm:text-base text-neutral-700 leading-relaxed mb-6 font-normal">
                      Improve patient engagement, clinical workflows, and healthcare decision support with intelligent AI solutions.
                    </p>

                    <ul className="space-y-4 mb-8">
                      <li className="flex items-start gap-3 text-sm">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5812] shrink-0 mt-1" />
                        <div className="flex flex-col">
                          <span className="text-black font-semibold">Patient Engagement Assistants</span>
                          <span className="text-neutral-600 text-[13px] mt-0.5 leading-relaxed">AI-powered assistants for patient communication, information access, and personalized engagement.</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-3 text-sm">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5812] shrink-0 mt-1" />
                        <div className="flex flex-col">
                          <span className="text-black font-semibold">Medical Document Processing</span>
                          <span className="text-neutral-600 text-[13px] mt-0.5 leading-relaxed">Automate the extraction, classification, summarization, and processing of medical documents and records.</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-3 text-sm">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5812] shrink-0 mt-1" />
                        <div className="flex flex-col">
                          <span className="text-black font-semibold">Clinical Workflow Assistance</span>
                          <span className="text-neutral-600 text-[13px] mt-0.5 leading-relaxed">Support healthcare professionals with AI-powered tools for clinical workflows, documentation, information retrieval, and decision support.</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-3 text-sm">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5812] shrink-0 mt-1" />
                        <div className="flex flex-col">
                          <span className="text-black font-semibold">Patient Data Analysis</span>
                          <span className="text-neutral-600 text-[13px] mt-0.5 leading-relaxed">Analyze healthcare data to identify patterns, generate insights, and support data-driven patient care.</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="lg:col-span-6 relative rounded-3xl overflow-hidden min-h-[380px] flex items-center justify-center p-6 shadow-xl border border-zinc-200 bg-black">
                  <Image
                    src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop"
                    alt="Clinical AI Assistance"
                    fill
                    priority
                    className="object-cover brightness-50 contrast-110"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                  <div className="relative z-10 w-full max-w-sm bg-black/60 backdrop-blur-xl border border-white/20 rounded-2xl p-6 text-white shadow-2xl">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#FF5812] uppercase mb-2">
                      <Sparkles size={16} />
                      <span>Clinical Intelligence</span>
                    </div>
                    <h4 className="text-xl font-bold mb-3">AI Clinical Assistant</h4>
                    <p className="text-xs text-white/80 leading-relaxed">
                      Analyzing real-time patient charts, generating structured clinical summaries, and assisting physician triage.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 2 CONTENT: Healthcare Operations */}
            {activeTab === "operations" && (
              <motion.div
                key="operations"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
              >
                <div className="lg:col-span-6 flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-2xl font-bold text-black mb-4">
                      Healthcare Operations AI
                    </h3>
                    <p className="text-sm sm:text-base text-neutral-700 leading-relaxed mb-6 font-normal">
                      Automate repetitive healthcare processes and optimize day-to-day operations with AI-powered workflow solutions.
                    </p>

                    <ul className="space-y-4 mb-8">
                      <li className="flex items-start gap-3 text-sm">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5812] shrink-0 mt-1" />
                        <div className="flex flex-col">
                          <span className="text-black font-semibold">Appointment Automation</span>
                          <span className="text-neutral-600 text-[13px] mt-0.5 leading-relaxed">Automate scheduling, reminders, confirmations, cancellations, and patient communications.</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-3 text-sm">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5812] shrink-0 mt-1" />
                        <div className="flex flex-col">
                          <span className="text-black font-semibold">Healthcare Workflow Automation</span>
                          <span className="text-neutral-600 text-[13px] mt-0.5 leading-relaxed">Streamline repetitive operational processes across departments and healthcare facilities.</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-3 text-sm">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5812] shrink-0 mt-1" />
                        <div className="flex flex-col">
                          <span className="text-black font-semibold">Staff Productivity</span>
                          <span className="text-neutral-600 text-[13px] mt-0.5 leading-relaxed">Equip healthcare teams with AI assistants and copilots that reduce manual work and improve productivity.</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-3 text-sm">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5812] shrink-0 mt-1" />
                        <div className="flex flex-col">
                          <span className="text-black font-semibold">Resource Optimization</span>
                          <span className="text-neutral-600 text-[13px] mt-0.5 leading-relaxed">Use AI-driven analytics and predictions to optimize staff, facilities, equipment, and other healthcare resources.</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="lg:col-span-6 relative rounded-3xl overflow-hidden min-h-[380px] flex items-center justify-center p-6 shadow-xl border border-zinc-200 bg-black">
                  <Image
                    src="https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1200&auto=format&fit=crop"
                    alt="Healthcare Operations AI"
                    fill
                    priority
                    className="object-cover brightness-50 contrast-110"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                  <div className="relative z-10 w-full max-w-sm bg-black/60 backdrop-blur-xl border border-white/20 rounded-2xl p-6 text-white shadow-2xl">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#FF5812] uppercase mb-2">
                      <Activity size={16} />
                      <span>Operational Automation</span>
                    </div>
                    <h4 className="text-xl font-bold mb-3">Resource & Staff Optimizer</h4>
                    <p className="text-xs text-white/80 leading-relaxed">
                      Automating patient scheduling pipelines, reducing no-shows, and balancing clinic workload dynamically.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 3 CONTENT: Business & Administration */}
            {activeTab === "admin" && (
              <motion.div
                key="admin"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
              >
                <div className="lg:col-span-6 flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-2xl font-bold text-black mb-4">
                      Healthcare Business & Administration AI
                    </h3>
                    <p className="text-sm sm:text-base text-neutral-700 leading-relaxed mb-6 font-normal">
                      Reduce administrative workloads, improve accuracy, and streamline essential healthcare business processes.
                    </p>

                    <ul className="space-y-4 mb-8">
                      <li className="flex items-start gap-3 text-sm">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5812] shrink-0 mt-1" />
                        <div className="flex flex-col">
                          <span className="text-black font-semibold">AI Claims Processing</span>
                          <span className="text-neutral-600 text-[13px] mt-0.5 leading-relaxed">Automate claims-related document processing, data extraction, classification, and workflow management.</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-3 text-sm">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5812] shrink-0 mt-1" />
                        <div className="flex flex-col">
                          <span className="text-black font-semibold">Invoice & Document Automation</span>
                          <span className="text-neutral-600 text-[13px] mt-0.5 leading-relaxed">Use AI to extract, validate, categorize, and process information from invoices and business documents.</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-3 text-sm">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5812] shrink-0 mt-1" />
                        <div className="flex flex-col">
                          <span className="text-black font-semibold">Revenue Cycle Management</span>
                          <span className="text-neutral-600 text-[13px] mt-0.5 leading-relaxed">Apply AI to automate repetitive revenue cycle workflows and improve operational efficiency.</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-3 text-sm">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5812] shrink-0 mt-1" />
                        <div className="flex flex-col">
                          <span className="text-black font-semibold">Healthcare Reporting & Analytics</span>
                          <span className="text-neutral-600 text-[13px] mt-0.5 leading-relaxed">Transform complex healthcare data into actionable business insights through AI-powered reporting and analytics.</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="lg:col-span-6 relative rounded-3xl overflow-hidden min-h-[380px] flex items-center justify-center p-6 shadow-xl border border-zinc-200 bg-black">
                  <Image
                    src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=1200&auto=format&fit=crop"
                    alt="Healthcare Administration AI"
                    fill
                    priority
                    className="object-cover brightness-50 contrast-110"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                  <div className="relative z-10 w-full max-w-sm bg-black/60 backdrop-blur-xl border border-white/20 rounded-2xl p-6 text-white shadow-2xl">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#FF5812] uppercase mb-2">
                      <ShieldCheck size={16} />
                      <span>Admin & Revenue Intelligence</span>
                    </div>
                    <h4 className="text-xl font-bold mb-3">Claims & RCM Automation</h4>
                    <p className="text-xs text-white/80 leading-relaxed">
                      Extracting prior authorization details, verifying billing codes, and providing instant revenue analytics.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 4 CONTENT: Intelligent Support */}
            {activeTab === "support" && (
              <motion.div
                key="support"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
              >
                <div className="lg:col-span-6 flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-2xl font-bold text-black mb-4">
                      Intelligent Healthcare Support
                    </h3>
                    <p className="text-sm sm:text-base text-neutral-700 leading-relaxed mb-6 font-normal">
                      Deliver always-on AI assistance for patients, healthcare professionals, and internal teams.
                    </p>

                    <ul className="space-y-4 mb-8">
                      <li className="flex items-start gap-3 text-sm">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5812] shrink-0 mt-1" />
                        <div className="flex flex-col">
                          <span className="text-black font-semibold">Healthcare AI Chatbots</span>
                          <span className="text-neutral-600 text-[13px] mt-0.5 leading-relaxed">Build conversational AI chatbots for patient support, healthcare information, FAQs, and routine interactions.</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-3 text-sm">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5812] shrink-0 mt-1" />
                        <div className="flex flex-col">
                          <span className="text-black font-semibold">AI Voice Assistants</span>
                          <span className="text-neutral-600 text-[13px] mt-0.5 leading-relaxed">Enable voice-based healthcare interactions for patients, clinicians, and administrative teams.</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-3 text-sm">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5812] shrink-0 mt-1" />
                        <div className="flex flex-col">
                          <span className="text-black font-semibold">Healthcare Knowledge Assistants</span>
                          <span className="text-neutral-600 text-[13px] mt-0.5 leading-relaxed">Give teams faster access to organizational knowledge, policies, procedures, and relevant information.</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-3 text-sm">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5812] shrink-0 mt-1" />
                        <div className="flex flex-col">
                          <span className="text-black font-semibold">Internal AI Copilots</span>
                          <span className="text-neutral-600 text-[13px] mt-0.5 leading-relaxed">Support healthcare teams with AI-powered research, documentation, communication, and workflow assistance.</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="lg:col-span-6 relative rounded-3xl overflow-hidden min-h-[380px] flex items-center justify-center p-6 shadow-xl border border-zinc-200 bg-black">
                  <Image
                    src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200&auto=format&fit=crop"
                    alt="Intelligent Healthcare Support Bot"
                    fill
                    priority
                    className="object-cover brightness-50 contrast-110"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                  <div className="relative z-10 w-full max-w-sm bg-black/60 backdrop-blur-xl border border-white/20 rounded-2xl p-6 text-white shadow-2xl">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#FF5812] uppercase mb-2">
                      <Bot size={16} />
                      <span>Conversational AI</span>
                    </div>
                    <h4 className="text-xl font-bold mb-3">Healthcare AI Copilot</h4>
                    <p className="text-xs text-white/80 leading-relaxed">
                      Instant policy querying, voice-based patient triage, and multi-lingual medical assistance.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
