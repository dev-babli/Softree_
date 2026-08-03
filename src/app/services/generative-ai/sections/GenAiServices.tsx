"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

import SectionBadge from "@/app/services/ai-development-services/components/SectionBadge"
import { genServices } from "../data"

type ServiceType = typeof genServices[0]

export function GenAiServices() {
  const [active, setActive] = useState(1)
  const [isPaused, setIsPaused] = useState(false)
  
  const current = genServices.find((s) => s.id === active) ?? genServices[0]

  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setActive((prev) => {
        const currentIndex = genServices.findIndex((s) => s.id === prev)
        const nextIndex = (currentIndex + 1) % genServices.length
        return genServices[nextIndex].id
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [isPaused])

  return (
    <section id="services" className="w-full pt-4 pb-16 md:pt-8 md:pb-24 lg:pt-10 lg:pb-28 bg-white">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-14 lg:mb-16 flex flex-col items-center"
        >
          <SectionBadge text="CORE CAPABILITIES" variant="line" />
          <h2 className="mt-4 text-2xl md:text-4xl lg:text-[2.25rem] font-extrabold text-[#111827] mb-3 md:mb-4 tracking-tight text-center leading-tight">
            End-to-end Generative AI <span className="text-[#FF5812]">built for enterprise scale</span>
          </h2>
          <p className="text-[15px] lg:text-base text-[#6B7280] text-center max-w-2xl mx-auto leading-relaxed">
            From strategy and model design to deployment and optimization, we help organizations unlock real business value with secure, scalable generative AI.
          </p>
        </motion.div>
      <div 
        className="mt-12 grid gap-6 lg:grid-cols-12 lg:gap-12"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Left Column (Desktop ~35%) */}
        <div className="group/list flex flex-col gap-4 lg:col-span-5 xl:col-span-4">
          {genServices.map((service, index) => {
            const isActive = service.id === active
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <button
                  type="button"
                  onClick={() => setActive(service.id)}
                  className={`group relative flex w-full flex-col items-start gap-2 rounded-2xl border p-5 text-left transition-all duration-300 ${
                    isActive
                      ? "border-[#FF5812] bg-white shadow-[0_8px_30px_rgb(255,88,18,0.12)] ring-1 ring-[#FF5812]/20 opacity-100"
                      : "border-gray-200 bg-gray-50/50 opacity-90 hover:opacity-100 hover:scale-[1.02] hover:border-gray-300 hover:bg-white hover:shadow-lg"
                  }`}
                >
                  {/* Active Indicator Line */}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute left-0 top-1/2 h-1/2 w-1 -translate-y-1/2 rounded-r-full bg-[#FF5812]"
                    />
                  )}
                  
                  <div className="flex items-center gap-4">
                    <span
                      className={`font-mono text-sm font-bold tracking-widest transition-colors duration-300 ${
                        isActive ? "text-[#FF5812]" : "text-gray-400 group-hover:text-[#FF5812]/70"
                      }`}
                    >
                      {String(service.id).padStart(2, "0")}
                    </span>
                    <span
                      className={`text-lg font-bold leading-snug transition-colors duration-300 ${
                        isActive ? "text-gray-900" : "text-gray-600 group-hover:text-gray-900"
                      }`}
                    >
                      {service.title}
                    </span>
                  </div>
                </button>

                {/* Mobile Content Accordion (Visible only on mobile/tablet) */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden lg:hidden"
                    >
                      <div className="mt-4 rounded-3xl border-2 border-[#FF5812] bg-gradient-to-br from-gray-50 to-white p-6 shadow-sm">
                        <ServiceContent current={current} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>

        {/* Right Column (Desktop ~65%) */}
        <div className="hidden lg:block lg:col-span-7 xl:col-span-8 relative">
          <div className="sticky top-32 rounded-3xl border-2 border-[#FF5812] bg-white/60 bg-gradient-to-br from-white via-gray-50/50 to-gray-100/30 p-6 md:p-8 xl:p-10 shadow-[0_8px_40px_rgba(255,88,18,0.1)] backdrop-blur-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="min-h-[400px]"
              >
                <ServiceContent current={current} showGraphic={true} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
      </div>
    </section>
  )
}

function AnimatedServiceGraphic({ serviceId }: { serviceId: number }) {
  const [typedText, setTypedText] = useState("")
  
  useEffect(() => {
    if (serviceId === 2) {
      setTypedText("")
      const text = "Our MVPs deliver in 6-10 weeks with full Azure OpenAI security and governance."
      let i = 0
      const timer = setInterval(() => {
        setTypedText(text.slice(0, i))
        i++
        if (i > text.length) {
          setTimeout(() => { i = 0 }, 2000) // Looping pause
        }
      }, 40)
      return () => clearInterval(timer)
    }
  }, [serviceId])

  // System metrics animation state
  const [latency, setLatency] = useState(124)
  const [uptime, setUptime] = useState(99.98)
  useEffect(() => {
    if (serviceId === 4) {
      const interval = setInterval(() => {
        setLatency(120 + Math.floor(Math.random() * 12))
        setUptime(99.98 + (Math.random() > 0.5 ? 0.01 : -0.01))
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [serviceId])

  switch (serviceId) {
    case 1: // Model Development - Training Dashboard
      return (
        <div className="relative w-full h-[280px] bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl p-5 text-left font-mono overflow-hidden flex flex-col justify-between text-zinc-300">
          {/* Top Window Bar */}
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="text-[10px] text-zinc-500 tracking-wider">model-training.sh</span>
            <div className="w-10" />
          </div>
          
          {/* Dashboard Body */}
          <div className="flex-grow py-3 flex flex-col justify-between text-xs">
            <div className="flex justify-between items-center text-[#FF5812]">
              <span>[STATE] TRAINING_IN_PROGRESS</span>
              <span className="animate-pulse">●</span>
            </div>
            
            {/* Grid of weights */}
            <div className="grid grid-cols-6 gap-2 my-2">
              {Array.from({ length: 18 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="h-3 rounded bg-zinc-800"
                  animate={{
                    backgroundColor: [
                      "rgba(39, 39, 42, 1)", 
                      "rgba(255, 88, 18, 0.4)", 
                      "rgba(39, 39, 42, 1)"
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: (i % 6) * 0.15 + Math.floor(i / 6) * 0.1,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>

            <div className="flex justify-between text-[11px] text-zinc-400">
              <span>Epoch: 142/300</span>
              <span>Loss: 0.024</span>
              <span>Acc: 98.4%</span>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
            <motion.div
              className="bg-gradient-to-r from-[#FF5812] to-amber-500 h-full"
              animate={{ width: ["0%", "85%", "0%"] }}
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
            />
          </div>
        </div>
      )
    case 2: // Replication - Chat Mockup
      return (
        <div className="relative w-full h-[280px] bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl p-5 text-left font-sans overflow-hidden flex flex-col justify-between text-zinc-300">
          {/* Top Window Bar */}
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="text-[10px] text-zinc-500 font-mono tracking-wider">chat-replica.ts</span>
            <div className="w-10" />
          </div>

          <div className="flex-grow flex flex-col justify-end gap-3 py-4 text-xs">
            {/* User message */}
            <div className="self-end max-w-[80%] rounded-2xl bg-zinc-800 px-3.5 py-2 text-zinc-200">
              What is your timeline?
            </div>
            
            {/* Assistant message */}
            <div className="self-start max-w-[85%] rounded-2xl bg-[#FF5812]/10 border border-[#FF5812]/20 px-3.5 py-2 text-zinc-200 flex gap-2 items-start min-h-[50px]">
              <div className="w-5 h-5 rounded-full bg-[#FF5812] flex items-center justify-center text-[10px] shrink-0 font-bold">AI</div>
              <div className="flex-grow font-mono text-[11px] leading-relaxed">
                {typedText}
                <span className="w-1 h-3.5 bg-[#FF5812] inline-block animate-pulse ml-0.5" />
              </div>
            </div>
          </div>
        </div>
      )
    case 3: // Integration - Code Terminal
      return (
        <div className="relative w-full h-[280px] bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl p-5 text-left font-mono overflow-hidden flex flex-col justify-between text-zinc-400">
          {/* Top Window Bar */}
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="text-[10px] text-zinc-500 tracking-wider">api-integration.js</span>
            <div className="w-10" />
          </div>

          {/* Code display */}
          <div className="flex-1 py-4 text-[11px] leading-relaxed overflow-x-auto text-zinc-300">
            <span className="text-purple-400">import</span> {"{ SoftreeAI }"} <span className="text-purple-400">from</span> <span className="text-green-400">"@softree/sdk"</span>;<br />
            <span className="text-purple-400">const</span> client = <span className="text-purple-400">new</span> <span className="text-yellow-400">SoftreeAI</span>();<br />
            <br />
            <span className="text-purple-400">await</span> client.<span className="text-blue-400">integrate</span>({`{`}<br />
            &nbsp;&nbsp;model: <span className="text-green-400">"azure-openai/gpt-4"</span>,<br />
            &nbsp;&nbsp;governance: <span className="text-purple-400">true</span><br />
            {`}`});
          </div>

          {/* Footer deployment banner */}
          <div className="flex items-center justify-between border-t border-zinc-800 pt-3 text-[10px]">
            <span className="text-green-500 flex items-center gap-1 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
              CONNECTED_TO_AZURE
            </span>
            <span className="text-zinc-500">v1.2.0</span>
          </div>
        </div>
      )
    case 4: // Upgrade & Maintenance - MLOps Status
      return (
        <div className="relative w-full h-[280px] bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl p-5 text-left font-mono overflow-hidden flex flex-col justify-between text-zinc-300">
          {/* Top Window Bar */}
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="text-[10px] text-zinc-500 tracking-wider">mlops-dashboard.yaml</span>
            <div className="w-10" />
          </div>

          {/* Metrics list */}
          <div className="flex-grow py-4 flex flex-col justify-around text-xs">
            <div className="flex justify-between border-b border-zinc-900 pb-1.5">
              <span className="text-zinc-500">SYSTEM STATUS:</span>
              <span className="text-green-400 font-bold">HEALTHY</span>
            </div>
            <div className="flex justify-between border-b border-zinc-900 pb-1.5">
              <span className="text-zinc-500">LATENCY:</span>
              <span className="text-zinc-200">{latency} ms</span>
            </div>
            <div className="flex justify-between border-b border-zinc-900 pb-1.5">
              <span className="text-zinc-500">API UPTIME:</span>
              <span className="text-zinc-200">{uptime.toFixed(3)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">CACHE HIT RATE:</span>
              <span className="text-[#FF5812] font-bold">94.8%</span>
            </div>
          </div>

          {/* Graph wave */}
          <div className="h-6 w-full relative overflow-hidden flex items-end">
            <svg className="w-full h-full" viewBox="0 0 100 20" fill="none">
              <motion.path
                d="M0,10 Q10,5 20,15 T40,10 T60,5 T80,15 T100,10"
                stroke="#FF5812"
                strokeWidth="1.5"
                fill="none"
                animate={{
                  d: [
                    "M0,10 Q10,5 20,15 T40,10 T60,5 T80,15 T100,10",
                    "M0,10 Q10,15 20,5 T40,10 T60,15 T80,5 T100,10",
                    "M0,10 Q10,5 20,15 T40,10 T60,5 T80,15 T100,10"
                  ]
                }}
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              />
            </svg>
          </div>
        </div>
      )
    case 5: // Fine-Tuning - Alignment workspace
      return (
        <div className="relative w-full h-[280px] bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl p-5 text-left font-mono overflow-hidden flex flex-col justify-between text-zinc-300">
          {/* Top Window Bar */}
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="text-[10px] text-zinc-500 tracking-wider">alignment-workspace.cfg</span>
            <div className="w-10" />
          </div>

          <div className="flex-grow py-4 flex flex-col justify-between text-xs gap-3">
            {/* System prompt tweaking */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 flex flex-col gap-1">
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">SYS_PROMPT</span>
              <p className="text-[11px] text-zinc-300 leading-normal">
                You are a secure, domain-restricted copilot for clinical operations ...
              </p>
            </div>

            {/* Slider value changes */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-[11px]">
                <span className="text-zinc-500">Fine-Tuning Temp</span>
                <span className="text-[#FF5812] font-bold">0.3 (Deterministic)</span>
              </div>
              <div className="w-full bg-zinc-800 h-1 rounded-full relative flex items-center">
                <motion.div 
                  className="w-3.5 h-3.5 rounded-full bg-white border border-[#FF5812] absolute"
                  animate={{ left: ["10%", "30%", "10%"] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                />
              </div>
            </div>
          </div>
        </div>
      )
    case 6: // Strategy & Consulting - Roadmap Roadmap Checklist
      return (
        <div className="relative w-full h-[280px] bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl p-5 text-left font-mono overflow-hidden flex flex-col justify-between text-zinc-300">
          {/* Top Window Bar */}
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="text-[10px] text-zinc-500 tracking-wider">readiness-roadmap.json</span>
            <div className="w-10" />
          </div>

          {/* Roadmap steps list */}
          <div className="flex-grow py-4 flex flex-col justify-around text-xs text-zinc-400 gap-1.5">
            <div className="flex items-center gap-2 text-zinc-300">
              <span className="text-green-500 font-bold">[✔]</span>
              <span>Enterprise AI Assessment</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-300">
              <span className="text-green-500 font-bold">[✔]</span>
              <span>Use-case Prioritization Matrix</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-200">
              <motion.span 
                className="text-[#FF5812] font-bold"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >[▶]</motion.span>
              <span>IT Security & Compliance Audit</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-600">
              <span>[ ]</span>
              <span>Staged Deployment & Feedback Loop</span>
            </div>
          </div>
        </div>
      )
    default:
      return null
  }
}

function ServiceContent({ current, showGraphic = false }: { current: ServiceType; showGraphic?: boolean }) {
  return (
    <div className="grid gap-6 lg:grid-cols-12 items-center">
      <div className={showGraphic ? "lg:col-span-6" : "lg:col-span-12"}>
        <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#FF5812]">
          Service {String(current.id).padStart(2, "0")}
        </p>
        <h3 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 leading-tight">
          {current.title}
        </h3>
        <p className="mt-4 text-base leading-relaxed text-gray-600">
          {current.desc}
        </p>
        <ul className="mt-8 space-y-4">
          {current.points.map((point: string, i: number) => (
            <motion.li 
              key={point} 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              className="flex items-start gap-4 text-base leading-relaxed text-gray-700"
            >
              <span className="mt-2.5 flex h-2 w-2 shrink-0 items-center justify-center rounded-full bg-[#FF5812] shadow-[0_0_8px_rgba(255,88,18,0.5)]" aria-hidden />
              <span className="min-w-0">{point}</span>
            </motion.li>
          ))}
        </ul>
      </div>
      
      {showGraphic && (
        <div className="lg:col-span-6 flex items-center justify-center">
          <AnimatedServiceGraphic serviceId={current.id} />
        </div>
      )}
    </div>
  )
}
