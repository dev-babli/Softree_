"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { 
  ArrowLeft, 
  ArrowRight, 
  ArrowUpRight, 
  AlertCircle, 
  Lightbulb, 
  TrendingUp, 
  Smartphone, 
  Laptop, 
  Tablet, 
  Brain,
  Layers,
  CheckCircle2,
  Calendar,
  MessageSquare,
  Sparkles
} from "lucide-react"

// Define case studies data
const CASE_STUDIES = [
  {
    id: "ai-hr",
    category: "AI & Automation",
    title: "HR Assistant Copilot Agent",
    accent: "#8B5CF6", // AI Violet
    gradient: "from-[#5b21b6] to-[#7c3aed]",
    href: "/case-studies/how-an-enterprise-organization-automated-hr-operations-using-ai",
    challenge: "HR teams struggled with manual onboarding processes and answering repetitive employee queries, leading to delays and data entry errors across 3 core systems.",
    solution: "Developed an AI-powered HR Assistant on Power Platform (Power Apps & Copilot Studio) that automates leave management, employee requests, and workflows.",
    impact: [
      "AI-Powered HR Assistant deployed",
      "End-to-End workflow automation",
      "Real-time employee data updates"
    ]
  },
  {
    id: "sharepoint",
    category: "SharePoint",
    title: "SharePoint Site Pages to PDF",
    accent: "#038387", // SharePoint teal
    gradient: "from-[#005a5e] to-[#038387]",
    href: "/case-studies/sharepoint-site-pages-to-pdf",
    challenge: "Content editors spent hours manually converting SharePoint news and pages to PDF for offline distribution, leading to layout breaks and compliance archiving gaps.",
    solution: "Built a custom SPFx integration allowing one-click high-fidelity page-to-PDF conversion with automatic library archiving.",
    impact: [
      "100% automated PDF rendering",
      "95% reduction in export effort",
      "10-second processing time per page"
    ]
  },
  {
    id: "power-platform",
    category: "Power Apps",
    title: "Barcode Scanner App for Audio Equipment",
    accent: "#742774", // Power Platform deep purple
    gradient: "from-[#4a154b] to-[#742774]",
    href: "/case-studies/barcode-scanner-app-audio-equipment-management",
    challenge: "Managing high-value audio equipment transfers for global events was prone to tracking errors, leading to missing gear and logistics friction.",
    solution: "Created a mobile barcode scanning canvas app for real-time equipment audits, location transfers, and inventory verification.",
    impact: [
      "Deployed for 2026 Winter Olympics",
      "Real-time inventory traceability",
      "Zero lost assets during transport"
    ]
  },
  {
    id: "data-analytics",
    category: "Data & Analytics",
    title: "HR Analytics & Employee Experience Platform",
    accent: "#0F5CC0", // Data Blue
    gradient: "from-[#0b3c80] to-[#0F5CC0]",
    href: "/case-studies/hr-analytics-and-employee-experience-platform",
    challenge: "A Fortune 500 financial services enterprise had employee data scattered across 12 legacy systems, making real-time reporting and onboarding metrics impossible.",
    solution: "Designed a web-based unified portal with analytics dashboards, predictive employee retention metrics, and self-service portals.",
    impact: [
      "80% reporting time saved",
      "65% HR query deflection via AI",
      "90% self-service adoption rate"
    ]
  },
  {
    id: "web",
    category: "Web App",
    title: "AI Competitive Gap Report",
    accent: "#1852FF", // Web Blue
    gradient: "from-[#0f34ac] to-[#2563eb]",
    href: "/case-studies/ai-competitive-gap-report-businesses-outperform-competitors",
    challenge: "Marketing and strategy teams spent weeks manually tracking competitor web changes and benchmarking SEO rankings.",
    solution: "Built an AI-powered benchmarking platform that analyzes competitor websites against 100+ intelligence checkpoints in minutes.",
    impact: [
      "85% manual analysis time reduced",
      "2-minute website analysis time",
      "100+ intelligence checkpoints monitored"
    ]
  }
]

export default function AboutCaseStudies() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(0) // -1 for left, 1 for right
  const [autoplay, setAutoplay] = useState(true)

  const activeStudy = CASE_STUDIES[activeIndex]

  const handleNext = () => {
    setDirection(1)
    setActiveIndex((prev) => (prev + 1) % CASE_STUDIES.length)
    setAutoplay(false)
  }

  const handlePrev = () => {
    setDirection(-1)
    setActiveIndex((prev) => (prev - 1 + CASE_STUDIES.length) % CASE_STUDIES.length)
    setAutoplay(false)
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        handleNext()
      } else if (e.key === "ArrowLeft") {
        handlePrev()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Autoplay functionality
  useEffect(() => {
    if (!autoplay) return
    const timer = setInterval(() => {
      setDirection(1)
      setActiveIndex((prev) => (prev + 1) % CASE_STUDIES.length)
    }, 7000) // Transition every 7s
    return () => clearInterval(timer)
  }, [autoplay])

  return (
    <section className="relative w-full py-16 md:py-24 bg-white text-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header (Outside the black card, on white bg) */}
        <div className="mb-14 max-w-3xl text-left">
          <div className="mb-4 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ff7a2f]" />
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
              Real-World Impact
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight text-neutral-950 mb-6">
            Delivering Tangible Engineering Results for Global Enterprises
          </h2>
          <p className="text-base md:text-lg text-neutral-600 max-w-2xl leading-relaxed">
            Explore our proven track record of automating operational pipelines, building compliant document hubs, launching high-performance mobile audit systems, and integrating generative AI tools.
          </p>
        </div>

        {/* Beautiful Floating Black Card Wrapper */}
        <div className="relative overflow-hidden rounded-[32px] md:rounded-[40px] bg-neutral-950 border border-neutral-800/40 p-8 sm:p-10 md:p-14 lg:p-16 text-white shadow-2xl">
          {/* Background Accent Gradients */}
          <div className="pointer-events-none absolute -left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[120px]" />
          <div className="pointer-events-none absolute -right-1/4 bottom-1/4 h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-[120px]" />

          <div className="w-full">
            {/* Carousel Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Panel: Content (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full min-h-[500px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: direction * 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -direction * 30 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-8"
              >
                {/* Title */}
                <div>
                  <div 
                    className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3 uppercase tracking-wider"
                    style={{ backgroundColor: `${activeStudy.accent}20`, color: activeStudy.accent }}
                  >
                    {activeStudy.category}
                  </div>
                  <h3 className="text-2xl md:text-3.5xl font-bold tracking-tight text-white">
                    {activeStudy.title}
                  </h3>
                </div>

                {/* The Challenge */}
                <div className="flex gap-4">
                  <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-red-500/10 text-red-400">
                    <AlertCircle className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold tracking-wider text-neutral-400 uppercase mb-1">
                      The Challenge
                    </h4>
                    <p className="text-sm md:text-base text-neutral-300 leading-relaxed">
                      {activeStudy.challenge}
                    </p>
                  </div>
                </div>

                {/* The Solution */}
                <div className="flex gap-4">
                  <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-teal-500/10 text-teal-400">
                    <Lightbulb className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold tracking-wider text-neutral-400 uppercase mb-1">
                      The Solution
                    </h4>
                    <p className="text-sm md:text-base text-neutral-300 leading-relaxed">
                      {activeStudy.solution}
                    </p>
                  </div>
                </div>

                {/* The Impact */}
                <div className="flex gap-4">
                  <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-green-500/10 text-green-400">
                    <TrendingUp className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold tracking-wider text-neutral-400 uppercase mb-2">
                      The Impact
                    </h4>
                    <ul className="space-y-2 text-sm md:text-base text-neutral-300">
                      {activeStudy.impact.map((metric, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span 
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                            style={{ backgroundColor: activeStudy.accent }}
                          />
                          <span>{metric}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slider Controls & CTA */}
            <div className="mt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-8 border-t border-neutral-900">
              <Link
                href={activeStudy.href}
                className="group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                style={{ backgroundColor: activeStudy.accent }}
              >
                <span>Explore Full Case Study</span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <div className="flex items-center gap-6">
                {/* Counter */}
                <div className="text-sm font-mono text-neutral-500">
                  <span className="text-white font-semibold">
                    {String(activeIndex + 1).padStart(2, "0")}
                  </span>
                  {" / "}
                  <span>{String(CASE_STUDIES.length).padStart(2, "0")}</span>
                </div>

                {/* Arrow Controls */}
                <div className="flex gap-2">
                  <button
                    onClick={handlePrev}
                    aria-label="Previous slide"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-800 bg-neutral-950 text-neutral-400 hover:border-neutral-700 hover:text-white transition-all active:scale-95"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Next slide"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-800 bg-neutral-950 text-neutral-400 hover:border-neutral-700 hover:text-white transition-all active:scale-95"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel: Showcase Graphic (7 cols) */}
          <div className="lg:col-span-7 relative h-[420px] md:h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center border border-white/10 bg-neutral-950/40 backdrop-blur-sm">
            
            {/* Transitioning Color Background Panel with Mixed Color Mesh blobs and Grid */}
            <div className="absolute inset-0 transition-all duration-1000 ease-in-out">
              {/* Mixed color base gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${activeStudy.gradient} opacity-80`} />
              
              {/* Overlapping Mixed Color Radial Blobs */}
              <div className="absolute -left-20 -top-20 h-[300px] w-[300px] rounded-full bg-cyan-500/30 blur-[90px] mix-blend-screen animate-pulse" />
              <div 
                className="absolute -right-20 -bottom-20 h-[320px] w-[320px] rounded-full blur-[100px] transition-all duration-1000"
                style={{ backgroundColor: `${activeStudy.accent}40` }}
              />
              
              {/* Grid overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:24px_24px]" />
              
              {/* Vignette layer */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.4)_100%)]" />
            </div>

            {/* Interactive Showcase Animation Canvas */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -15 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 w-full h-full flex items-center justify-center p-4 md:p-6"
              >
                
                {/* 1. POWER APPS: Tablet device mockup */}
                {activeStudy.id === "ai-hr" && (
                  <div className="relative w-full max-w-[580px] aspect-[4/3] rounded-[24px] border-[6px] border-neutral-900 bg-neutral-950 shadow-2xl overflow-hidden flex flex-col">
                    {/* Tablet Top Bezel Camera */}
                    <div className="absolute top-1 left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full bg-neutral-800" />
                    
                    {/* App Header */}
                    <div className="bg-[#4a154b] px-4 py-3 flex items-center justify-between border-b border-purple-900/50">
                      <div className="flex items-center gap-2">
                        <Tablet className="h-4 w-4 text-purple-200" />
                        <span className="text-xs font-bold tracking-wide text-white font-mono">HR Assistant Copilot</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] text-emerald-300 font-semibold uppercase">Automation Active</span>
                      </div>
                    </div>

                    {/* App Body */}
                    <div className="p-4 flex-1 bg-[#100b12] text-xs space-y-3 overflow-y-auto">
                      <div className="flex justify-between items-center bg-[#211726] border border-purple-900/30 p-2.5 rounded-lg">
                        <div>
                          <p className="text-neutral-400 text-[10px]">Onboarding Automation Hub</p>
                          <p className="text-white font-semibold">Active Employee Portals</p>
                        </div>
                        <span className="bg-[#742774] text-white px-2 py-0.5 rounded text-[9px] font-bold">Live Integration</span>
                      </div>

                      <div className="space-y-1.5">
                        <p className="text-neutral-400 font-semibold text-[10px] uppercase tracking-wider px-1">Active Run Status</p>
                        
                        <div className="space-y-1">
                          {[
                            { name: "Onboarding document validation", status: "Verified" },
                            { name: "Leave request approval flow", status: "Automated" },
                            { name: "Copilot agent platform synchronization", status: "Synced" }
                          ].map((item, i) => (
                            <motion.div 
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                              key={i} 
                              className="flex items-center justify-between bg-neutral-900/40 p-2 rounded border border-neutral-800/50"
                            >
                              <div className="flex items-center gap-2 text-neutral-300">
                                <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                                <span>{item.name}</span>
                              </div>
                              <span className="text-[9px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded font-medium">{item.status}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Small Chart Mockup */}
                      <div className="bg-[#1b1220] border border-purple-900/30 rounded-lg p-3">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-[10px] text-neutral-300 font-medium">Employee Support Tickets</span>
                          <span className="text-[10px] text-emerald-400 font-bold font-mono">3x Onboarding Speed</span>
                        </div>
                        <div className="h-6 flex items-end gap-1 px-1">
                          {[20, 35, 50, 60, 80, 95].map((val, idx) => (
                            <motion.div 
                              initial={{ height: 0 }}
                              animate={{ height: `${val}%` }}
                              transition={{ duration: 0.6, delay: 0.3 + idx * 0.05 }}
                              key={idx} 
                              className={`flex-1 rounded-t-sm bg-purple-600/60`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. SHAREPOINT: Desktop browser intranet mockup */}
                {activeStudy.id === "sharepoint" && (
                  <div className="relative w-full max-w-[560px] aspect-[16/10] rounded-xl border-[4px] border-neutral-800 bg-neutral-900 shadow-2xl overflow-hidden flex flex-col">
                    {/* Browser Chrome */}
                    <div className="bg-neutral-850 px-3 py-2 flex items-center gap-2 border-b border-neutral-850">
                      <div className="flex gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-red-500/80" />
                        <span className="h-2 w-2 rounded-full bg-yellow-500/80" />
                        <span className="h-2 w-2 rounded-full bg-green-500/80" />
                      </div>
                      <div className="flex-1 max-w-xs mx-auto bg-neutral-950/40 rounded px-3 py-0.5 text-[9px] text-neutral-500 font-mono truncate text-center">
                        sharepoint.softree.com/site-to-pdf
                      </div>
                    </div>

                    <div className="flex-1 flex text-xs">
                      {/* Sidebar */}
                      <div className="w-1/4 bg-neutral-950/40 border-r border-neutral-800 p-2.5 space-y-3.5">
                        <div className="flex items-center gap-1.5">
                          <Layers className="h-3.5 w-3.5 text-teal-400" />
                          <span className="text-[10px] font-bold text-white tracking-wide uppercase">SharePoint</span>
                        </div>
                        <div className="space-y-1">
                          {["Intranet Home", "Document Hub", "PDF Page Export", "IT Settings"].map((item, i) => (
                            <div 
                              key={i} 
                              className={`px-2 py-1 rounded text-[9px] text-neutral-400 ${i === 2 ? "bg-teal-500/10 text-teal-300 font-medium" : ""}`}
                            >
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Main Workspace Area */}
                      <div className="flex-1 bg-neutral-950 p-3.5 flex flex-col gap-3">
                        <div className="flex justify-between items-center border-b border-neutral-800 pb-2">
                          <div>
                            <p className="text-[10px] text-neutral-500">SharePoint Framework (SPFx)</p>
                            <p className="font-semibold text-white">Pages to PDF Archives</p>
                          </div>
                          <span className="bg-teal-500/10 text-teal-400 px-2 py-0.5 rounded text-[8px] border border-teal-500/20 font-bold uppercase tracking-wider">1-Click PDF</span>
                        </div>

                        {/* Intranet Files table mockup */}
                        <div className="space-y-1.5 flex-1">
                          <div className="grid grid-cols-12 text-[9px] text-neutral-500 font-bold uppercase px-1 pb-1">
                            <span className="col-span-6">Export File</span>
                            <span className="col-span-3">Format</span>
                            <span className="col-span-3">Status</span>
                          </div>

                          {[
                            { name: "Audit_Guidelines_2026.pdf", policy: "High-Res PDF", status: "Generated" },
                            { name: "HR_News_Announcement.pdf", policy: "Clean Layout", status: "Generated" },
                            { name: "SOP_Compliance_Print.pdf", policy: "Archived", status: "Generated" }
                          ].map((file, idx) => (
                            <motion.div 
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              key={idx} 
                              className="grid grid-cols-12 items-center bg-neutral-900/60 p-2 rounded border border-neutral-800/40 text-[9px]"
                            >
                              <span className="col-span-6 font-medium text-neutral-200 truncate pr-1">{file.name}</span>
                              <span className="col-span-3 text-neutral-400 font-mono">{file.policy}</span>
                              <span className="col-span-3 text-teal-400 font-semibold">{file.status}</span>
                            </motion.div>
                          ))}
                        </div>

                        {/* retrieval speed stat bar */}
                        <div className="bg-[#0b1c1c] border border-teal-500/20 rounded-lg p-2.5 flex items-center justify-between text-[10px]">
                          <span className="text-neutral-400">PDF Generator Engine</span>
                          <div className="flex items-center gap-1.5 font-bold text-teal-400">
                            <span className="h-1.5 w-16 bg-neutral-800 rounded-full overflow-hidden relative">
                              <motion.span 
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 1.5 }}
                                className="absolute left-0 top-0 h-full bg-teal-400"
                              />
                            </span>
                            <span>10s Export</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. MOBILE: Phone mockup */}
                {activeStudy.id === "power-platform" && (
                  <div className="relative w-[245px] aspect-[9/19] rounded-[36px] border-[5px] border-neutral-900 bg-neutral-950 shadow-2xl overflow-hidden flex flex-col">
                    {/* Speaker/Notch (Dynamic Island) */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 h-4 w-14 rounded-full bg-neutral-900 flex items-center justify-center">
                      <div className="h-1 w-1 rounded-full bg-neutral-800 absolute right-3" />
                    </div>

                    {/* App Header */}
                    <div className="pt-8 pb-3 px-4 bg-[#db2777] text-white flex items-center justify-between">
                      <Smartphone className="h-3 w-3 text-pink-100" />
                      <span className="text-[10px] font-bold font-mono">Barcode Scanner</span>
                      <span className="text-[9px] text-pink-200 font-bold font-mono">Olympics</span>
                    </div>

                    {/* App Body */}
                    <div className="p-3 flex-1 bg-[#120a0e] text-[10px] space-y-3.5 overflow-y-auto">
                      {/* Scan Status */}
                      <div className="bg-[#24111a] border border-pink-500/10 p-2.5 rounded-xl text-center">
                        <p className="text-neutral-400 text-[8px] uppercase tracking-wider font-semibold">Equipment Tracker</p>
                        <p className="text-[15px] font-bold text-white tracking-tight">Real-Time Trace</p>
                        <div className="h-1.5 bg-neutral-800 rounded-full overflow-hidden mt-1.5 relative">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1.2 }}
                            className="absolute left-0 top-0 h-full bg-[#db2777]"
                          />
                        </div>
                        <p className="text-pink-400 text-[8px] mt-1 font-mono">Olympic Broadcast Ready</p>
                      </div>

                      {/* Active Scan Item */}
                      <div className="bg-neutral-900/60 p-2.5 rounded-xl border border-neutral-800 flex gap-2">
                        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-[#db2777]/30 to-pink-900/40 flex items-center justify-center shrink-0 text-xs">
                          🎤
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <p className="font-semibold text-white text-[9px]">Wireless Mic System</p>
                            <p className="text-neutral-500 text-[8px]">ID: #AUDIO-9281-W</p>
                          </div>
                          <div className="flex justify-between items-center mt-1">
                            <span className="font-bold text-white font-mono">Zone Alpha</span>
                            <span className="bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded text-[8px] font-semibold">Transferred</span>
                          </div>
                        </div>
                      </div>

                      {/* Scanner Stats */}
                      <div className="bg-neutral-900/30 p-2 rounded-lg space-y-1 text-[9px] border border-neutral-800/40">
                        <div className="flex justify-between text-neutral-400">
                          <span>Inventory Items</span>
                          <span className="font-mono text-white">4,200+</span>
                        </div>
                        <div className="flex justify-between text-neutral-400">
                          <span>Scan Discrepancies</span>
                          <span className="font-mono text-emerald-400">0%</span>
                        </div>
                      </div>

                      {/* Scan Trigger Button */}
                      <motion.button 
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-[#db2777] text-white py-2 rounded-lg font-bold text-[9px] uppercase tracking-wider text-center"
                      >
                        Scan New Asset
                      </motion.button>
                    </div>

                    {/* Home Indicator */}
                    <div className="h-1 w-20 rounded-full bg-neutral-800 absolute bottom-1.5 left-1/2 -translate-x-1/2" />
                  </div>
                )}

                {/* 4. WEB: Browser with calendar scheduler mockup */}
                {activeStudy.id === "data-analytics" && (
                  <div className="relative w-full max-w-[560px] aspect-[16/10] rounded-xl border-[4px] border-neutral-800 bg-neutral-900 shadow-2xl overflow-hidden flex flex-col">
                    {/* Browser Chrome */}
                    <div className="bg-neutral-850 px-3 py-2 flex items-center gap-2 border-b border-neutral-850">
                      <div className="flex gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-red-500/80" />
                        <span className="h-2 w-2 rounded-full bg-yellow-500/80" />
                        <span className="h-2 w-2 rounded-full bg-green-500/80" />
                      </div>
                      <div className="flex-1 max-w-xs mx-auto bg-neutral-950/40 rounded px-3 py-0.5 text-[9px] text-neutral-500 font-mono truncate text-center">
                        analytics.softree-experience.com
                      </div>
                    </div>

                    {/* App Workspace */}
                    <div className="flex-1 bg-neutral-950 p-4 text-xs flex flex-col gap-3.5">
                      <div className="flex justify-between items-center border-b border-neutral-800 pb-2">
                        <div className="flex items-center gap-2">
                          <Layers className="h-4 w-4 text-blue-400" />
                          <span className="font-bold text-white">HR Analytics Portal</span>
                        </div>
                        <span className="text-[9px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded font-bold">80% Time Saved</span>
                      </div>

                      {/* Active Analytics Grid */}
                      <div className="grid grid-cols-3 gap-2 flex-1">
                        {[
                          { title: "Query Deflection", val: "65%", status: "via AI Bot", color: "bg-blue-600/20 text-blue-400 border-blue-500/20" },
                          { title: "Self-Service", val: "90%", status: "Adoption Rate", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
                          { title: "Onboarding Time", val: "3x Faster", status: "Reduction", color: "bg-blue-600/20 text-blue-400 border-blue-500/20" }
                        ].map((lane, i) => (
                          <motion.div 
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            key={i} 
                            className={`p-3 rounded-lg border ${lane.color} flex flex-col justify-between h-full`}
                          >
                            <div>
                              <p className="text-[8px] text-neutral-500 uppercase font-semibold">{lane.title}</p>
                              <p className="font-bold text-white text-[14px] mt-1">{lane.val}</p>
                            </div>
                            <div className="flex justify-between items-center mt-3">
                              <span className="text-[8px] text-neutral-400">{lane.status}</span>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Bottom Alert / Stats banner */}
                      <div className="bg-[#0b1424] border border-blue-500/20 p-2.5 rounded-lg flex items-center justify-between text-[10px] text-neutral-300">
                        <span className="truncate pr-2">Integrated across 12 legacy HR ecosystems.</span>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-2 py-0.5 rounded text-[9px] tracking-wide shrink-0">Open Report</button>
                      </div>
                    </div>
                  </div>
                )}

                {/* 5. AI: Generative claims workspace dashboard */}
                {activeStudy.id === "web" && (
                  <div className="relative w-full max-w-[550px] aspect-[16/10] rounded-xl border-[4px] border-neutral-800 bg-neutral-950 shadow-2xl overflow-hidden flex text-xs font-sans">
                    
                    {/* Left Panel: Invoice Parser Checklist */}
                    <div className="w-[45%] bg-neutral-900 border-r border-neutral-850 p-3 space-y-3">
                      <div className="flex items-center gap-1.5 border-b border-neutral-800 pb-1.5">
                        <Brain className="h-3.5 w-3.5 text-violet-400" />
                        <span className="text-[9px] font-bold text-white tracking-wide uppercase">AI Benchmarker</span>
                      </div>
                      
                      <div className="space-y-1.5">
                        <p className="text-[8px] text-neutral-500 uppercase font-semibold tracking-wider">Audit Progress</p>
                        {[
                          { label: "Competitor Scanned", val: "competitor.com", check: true },
                          { label: "Checkpoints Checked", val: "100+ Points", check: true },
                          { label: "Manual Effort Saved", val: "85%", check: true },
                          { label: "Analysis Duration", val: "2 Minutes", check: true }
                        ].map((meta, i) => (
                          <div key={i} className="flex flex-col bg-neutral-950/60 p-1.5 rounded border border-neutral-850/40 text-[9px]">
                            <div className="flex justify-between items-center text-neutral-400">
                              <span>{meta.label}</span>
                              {meta.check && <CheckCircle2 className="h-2.5 w-2.5 text-emerald-400" />}
                            </div>
                            <span className="font-semibold text-white font-mono mt-0.5">{meta.val}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right Panel: Chat Interface */}
                    <div className="flex-1 bg-neutral-900 p-3 flex flex-col justify-between">
                      {/* Chat Header */}
                      <div className="flex justify-between items-center border-b border-neutral-800 pb-2 mb-2">
                        <div>
                          <p className="font-bold text-white text-[9px]">SEO Competitive Intelligence</p>
                          <p className="text-[8px] text-neutral-500">Benchmark Engine</p>
                        </div>
                        <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
                      </div>

                      {/* Chat Bubbles */}
                      <div className="flex-1 space-y-2.5 overflow-y-auto mb-3">
                        <div className="bg-[#1c132c] border border-violet-500/10 text-neutral-200 p-2 rounded-lg text-[9px] leading-relaxed">
                          <div className="flex items-center gap-1 text-[8px] text-violet-400 font-bold mb-0.5">
                            <Sparkles className="h-2.5 w-2.5" />
                            <span>Gap Engine</span>
                          </div>
                          Analysis complete. Deployed competitor analysis: found 12 content gaps and 4 high-priority technical optimization opportunities.
                        </div>
                        <motion.div 
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                          className="bg-neutral-950 text-neutral-350 p-2 rounded-lg text-[9px] border border-neutral-850 leading-relaxed"
                        >
                          <span className="text-[9px] text-violet-400 font-bold font-mono">Report Ready to Export</span>
                          <span className="block text-[8px] text-neutral-400 mt-1">Manual analysis reduced by 85%.</span>
                        </motion.div>
                      </div>

                      {/* Input mockup */}
                      <div className="bg-neutral-950 p-1.5 rounded-lg flex items-center justify-between border border-neutral-800">
                        <div className="flex items-center gap-1 text-neutral-500 text-[8px] pl-1 select-none">
                          <MessageSquare className="h-3 w-3" />
                          <span>Generate Gap PDF Report...</span>
                        </div>
                        <button className="bg-violet-600 hover:bg-violet-750 text-white font-bold px-2 py-0.5 rounded text-[8px] uppercase tracking-wide">Build</button>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  </div>
</section>
  )
}
