"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, useSpring, useTransform } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Sliders,
  Target,
  Cpu,
  Cloud,
  Layers,
} from "lucide-react"

import { Globe } from "@/registry/magicui/globe"
import { COUNTRIES_SERVED_NUMBER } from "@/lib/constants"

// -----------------------------------------------------------------------
// DESIGN TOKENS
// ink        #0B0F19   headings / primary text
// brand      #1852FF   Softree blue (existing brand accent — unchanged)
// signal     #10B981   "operational" status green, used only for live dots
// line       #E4E4E7   hairline dividers / blueprint grid
// graphite   #71717A   secondary text
// mono       ui-monospace (Tailwind `font-mono`, no new font load required)
//            used exclusively for coordinates, module numbers, readouts —
//            the section's signature texture, borrowed from network /
//            infrastructure monitoring panels rather than generic SaaS UI.
// -----------------------------------------------------------------------

const EASE_OUT = [0.22, 1, 0.36, 1] as const

/* ----------------------------- Primitives ----------------------------- */

// Live status dot — used sparingly, only where something is genuinely
// "current" (system status, active stat, connection state).
function StatusDot({ className = "" }: { className?: string }) {
  return (
    <span className={`relative inline-flex h-1.5 w-1.5 ${className}`}>
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60 motion-reduce:animate-none" />
      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
    </span>
  )
}

// Corner-bracket "reticle" frame — the section's signature device.
// Echoes a targeting / telemetry readout, tying the AI + cloud subject
// matter directly into the chrome instead of decorating on top of it.
function Bracket({
  children,
  className = "",
  tone = "zinc",
}: {
  children: React.ReactNode
  className?: string
  tone?: "zinc" | "white"
}) {
  const c = tone === "white" ? "border-white/30" : "border-zinc-300"
  return (
    <div className={`relative ${className}`}>
      <span className={`pointer-events-none absolute -top-1 -left-1 h-2.5 w-2.5 border-t border-l ${c}`} />
      <span className={`pointer-events-none absolute -top-1 -right-1 h-2.5 w-2.5 border-t border-r ${c}`} />
      <span className={`pointer-events-none absolute -bottom-1 -left-1 h-2.5 w-2.5 border-b border-l ${c}`} />
      <span className={`pointer-events-none absolute -bottom-1 -right-1 h-2.5 w-2.5 border-b border-r ${c}`} />
      {children}
    </div>
  )
}

// Count-up numeral, rendered in mono to read like an instrument readout.
function AnimatedNumber({
  value,
  suffix = "",
  delay = 0,
}: {
  value: number
  suffix?: string
  delay?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const [hasAnimated, setHasAnimated] = useState(false)

  const spring = useSpring(Math.round(value * 0.6), {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001,
  })

  const display = useTransform(spring, (current) => Math.round(current))
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const unsubscribe = display.on("change", (v) => setDisplayValue(v))
    return unsubscribe
  }, [display])

  useEffect(() => {
    if (isInView && !hasAnimated) {
      const timeout = setTimeout(() => {
        spring.set(value)
        setHasAnimated(true)
      }, delay * 1000)
      return () => clearTimeout(timeout)
    }
  }, [isInView, hasAnimated, spring, value, delay])

  return (
    <span ref={ref} className="tabular-nums">
      {displayValue}
      {suffix}
    </span>
  )
}

// Floating node tag around the globe — reads as a tagged network endpoint
// rather than a generic floating pill: a mono code, a mono sub-label,
// and a bracket frame instead of a soft shadowed card.
function CoordinateTag({
  code,
  title,
  sub,
  icon,
  className = "",
  delay = 0,
  codeColor = "text-[#1852FF]",
}: {
  code: string
  title: string
  sub: string
  icon: React.ReactNode
  className?: string
  delay?: number
  codeColor?: string
}) {
  return (
    <motion.div
      className={`absolute z-20 ${className}`}
      animate={{ y: ["0%", "-6%", "0%"] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <Bracket>
        <div className="flex items-center gap-2.5 bg-white/95 px-3 py-2 shadow-lg shadow-zinc-900/5 backdrop-blur-md transition-transform duration-300 hover:-translate-y-0.5">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-zinc-50 border border-zinc-100">
            {icon}
          </div>
          <div className="min-w-[104px] leading-tight">
            <div className="flex items-center gap-1.5">
              <span className={`text-[9.5px] font-bold tracking-wide ${codeColor}`}>
                {code}
              </span>
              <span className="h-0.5 w-0.5 rounded-full bg-zinc-300" />
              <span className="text-[9.5px] uppercase tracking-wide text-zinc-400">
                {sub}
              </span>
            </div>
            <h5 className="mt-0.5 text-[12.5px] font-extrabold text-zinc-900">{title}</h5>
          </div>
        </div>
      </Bracket>
    </motion.div>
  )
}

// A single "module" in the capability matrix — numbered like a spec sheet
// section rather than an anonymous icon-card, since the three columns
// genuinely are distinct service modules (this is real sequence-adjacent
// information, not decoration).
// A single horizontal "module row" in the capability matrix
function ModuleRow({
  index,
  title,
  icon,
  items,
  accent,
  className = "",
}: {
  index: string
  title: string
  icon: React.ReactNode
  items: string[]
  accent: string
  className?: string
}) {
  return (
    <div className={`flex flex-col md:flex-row md:items-center gap-4 py-3.5 first:pt-0 last:pb-0 ${className}`}>
      {/* Left side: Icon and Title */}
      <div className="flex items-center gap-3 shrink-0 md:w-[160px]">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 text-orange-500">
          {icon}
        </div>
        <h4 className="text-[13px] font-black uppercase tracking-wider text-white leading-tight">
          {title}
        </h4>
      </div>

      {/* Right side: Items pills */}
      <div className="flex-1 min-w-0">
        <ul className="flex flex-wrap gap-2">
          {items.map((item) => (
            <li
              key={item}
              className="rounded-full border border-zinc-800/80 bg-zinc-900/50 px-3 py-1.5 text-[12px] font-bold text-white transition-all duration-200 hover:border-orange-500/50 hover:bg-orange-950/20 hover:text-orange-400 cursor-default select-none"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

// Custom Globe option configuration for Orange & Black theme
const customGlobeConfig = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 1,
  diffuse: 1.2,
  mapSamples: 16000,
  mapBrightness: 6,
  baseColor: [0.15, 0.15, 0.2] as [number, number, number],
  markerColor: [249 / 255, 115 / 255, 22 / 255] as [number, number, number],
  glowColor: [249 / 255, 115 / 255, 22 / 255] as [number, number, number],
  markers: [
    { location: [14.5995, 120.9842], size: 0.03 },
    { location: [19.076, 72.8777], size: 0.05 },
    { location: [23.8103, 90.4125], size: 0.03 },
    { location: [30.0444, 31.2357], size: 0.04 },
    { location: [39.9042, 116.4074], size: 0.04 },
    { location: [40.7128, -74.006], size: 0.05 },
    { location: [51.5074, -0.1278], size: 0.04 },
    { location: [48.8566, 2.3522], size: 0.03 },
    { location: [-23.5505, -46.6333], size: 0.04 },
    { location: [1.3521, 103.8198], size: 0.03 },
  ] as any[],
};

/* -------------------------------- Section ------------------------------ */

export default function AboutInteractiveCore() {
  const sectionRef = useRef<HTMLDivElement>(null)
  useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section
      ref={sectionRef}
      id="about-core"
      className="relative w-full overflow-hidden border-t border-zinc-100/60 bg-white py-20 font-['DM_Sans',sans-serif] lg:py-24"
    >
      {/* Blueprint grid — faint, technical, ties the whole section to the
          "systems" register instead of sitting as flat white space. */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #f4f4f5 1px, transparent 1px), linear-gradient(to bottom, #f4f4f5 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "linear-gradient(to bottom, black, transparent 85%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">


        {/* Centered Heading above the components */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="mb-4 font-['Syne',sans-serif] text-3xl font-bold leading-[1.15] tracking-tight text-zinc-950 md:text-4xl lg:text-[2.6rem]">
            AI Engineering. Cloud Expertise. <span className="text-[#1852FF]">Dedicated Teams.</span>
          </h2>
          <div className="flex justify-center">
            <span className="border-y border-zinc-200/60 py-1.5 px-4 text-xs font-bold uppercase tracking-[0.16em] text-zinc-400">
              From AI ambition to business impact.
            </span>
          </div>
        </div>

        {/* Main Grid: Left Intro | Center Globe | Right Capability Matrix */}
        <div className="grid grid-cols-1 items-stretch gap-12 lg:grid-cols-12 lg:gap-6">
          {/* LEFT COLUMN: Clean timeline steps and details on white page background */}
          <div className="flex flex-col justify-between py-2 pr-2 lg:col-span-3">
            <div className="flex flex-col">
              <p className="border-l-2 border-orange-500 pl-4 text-[14.5px] font-black leading-snug text-zinc-900 mb-6">
                We engineer intelligent solutions that move AI from experimentation to production.
              </p>

              {/* Connected timeline of key capabilities */}
              <div className="relative border-l border-zinc-200/80 ml-2 pl-6 space-y-4 mt-4">
                <div className="relative">
                  <span className="absolute -left-[28.5px] top-1 h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
                  <h4 className="text-[11.5px] font-black uppercase tracking-wider text-zinc-900 leading-none">
                    AI &amp; Cloud Systems
                  </h4>
                  <p className="text-[12px] font-medium leading-relaxed text-zinc-500 mt-1">
                    Build and scale intelligent solutions across Microsoft Azure, AWS, and modern tech stacks.
                  </p>
                </div>
                <div className="relative">
                  <span className="absolute -left-[28.5px] top-1 h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
                  <h4 className="text-[11.5px] font-black uppercase tracking-wider text-zinc-900 leading-none">
                    Dedicated Teams
                  </h4>
                  <p className="text-[12px] font-medium leading-relaxed text-zinc-500 mt-1">
                    Deploy offshore developer teams that integrate seamlessly as a natural extension of your company.
                  </p>
                </div>
                <div className="relative">
                  <span className="absolute -left-[28.5px] top-1 h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
                  <h4 className="text-[11.5px] font-black uppercase tracking-wider text-zinc-900 leading-none">
                    Enterprise Governance
                  </h4>
                  <p className="text-[12px] font-medium leading-relaxed text-zinc-500 mt-1">
                    Transition AI models into secure, scalable, and fully governed enterprise environments.
                  </p>
                </div>
                <div className="relative">
                  <span className="absolute -left-[28.5px] top-1 h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
                  <h4 className="text-[11.5px] font-black uppercase tracking-wider text-zinc-900 leading-none">
                    Agile Execution
                  </h4>
                  <p className="text-[12px] font-medium leading-relaxed text-zinc-500 mt-1">
                    Deliver iterative development sprint cycles with complete operational transparency.
                  </p>
                </div>
                <div className="relative">
                  <span className="absolute -left-[28.5px] top-1 h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
                  <h4 className="text-[11.5px] font-black uppercase tracking-wider text-zinc-900 leading-none">
                    Proven Outcomes
                  </h4>
                  <p className="text-[12px] font-medium leading-relaxed text-zinc-500 mt-1">
                    Align custom systems directly with your performance metrics and operational goals.
                  </p>
                </div>
              </div>

              {/* Sub-status metrics block to cleanly fill remaining space */}
              <div className="border-t border-zinc-200/50 pt-5 mt-6 ml-2">
                <div className="flex items-center gap-6">
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Governance</span>
                    <p className="text-[11px] font-bold text-zinc-800 leading-none mt-0.5">ISO 9001 / 27001</p>
                  </div>
                  <div className="h-6 w-[1px] bg-zinc-200/80" />
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Security Gate</span>
                    <p className="text-[11px] font-bold text-zinc-800 leading-none mt-0.5">NDA Governed</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-start mt-6">
              <Link
                href="/contact"
                className="group inline-flex w-full items-center justify-center gap-2.5 whitespace-nowrap rounded-xl bg-gradient-to-r from-zinc-950 via-[#1b0900] to-black border border-zinc-800 px-6 py-4 text-xs font-bold uppercase tracking-widest text-white shadow-xl transition-all duration-300 hover:border-orange-500/50 hover:shadow-orange-500/5 active:scale-[0.98]"
              >
                Build Your AI Team
                <ArrowRight className="h-4 w-4 text-orange-500 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* CENTER COLUMN: Globe as a network node map */}
          <div className="relative z-20 flex min-h-[500px] items-center justify-center lg:col-span-4 lg:-mx-0 md:min-h-[520px]">
            <div className="relative mx-auto flex aspect-square w-full max-w-[480px] select-none items-center justify-center">
              {/* Coordinate ticks framing the globe stage */}
              <span className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 text-[8px] tracking-widest text-zinc-300">
                W
              </span>
              <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 text-[8px] tracking-widest text-zinc-300">
                E
              </span>
              {/* Compact tech stack cards placed neatly in a static flex row above the globe */}
              <div className="absolute top-[3%] left-0 right-0 z-20 flex flex-wrap items-center justify-center gap-2 px-2">
                {[
                  { name: "Azure", icon: "/logo/azure.png", label: "AI Foundry" },
                  { name: "AWS", icon: "/logo/aws.jpg", label: "Bedrock" },
                  { name: "Power Platform", icon: "/logo/power.png", label: "Apps" },
                  { name: "AI Agents", icon: "/logo/copilot.png", label: "Copilots" },
                  { name: "Enterprise RAG", icon: "/logo/m365.png", label: "M365" },
                ].map((tech) => (
                  <div
                    key={tech.name}
                    className="flex items-center gap-1.5 rounded-full border border-zinc-200/80 bg-white/90 px-2.5 py-1 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-orange-500/30 hover:scale-[1.02]"
                  >
                    <Image src={tech.icon} alt={tech.name} width={12} height={12} className="object-contain shrink-0" />
                    <span className="text-[10px] font-bold text-zinc-800">{tech.name}</span>
                    <span className="text-[9px] font-bold text-orange-500 bg-orange-50 px-1.5 py-0.5 rounded-full leading-none shrink-0">
                      {tech.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Glowing orange hologram beam behind the globe */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.08),transparent_60%)]" />

              {/* The WebGL Globe */}
              <div className="absolute inset-0 z-10 m-auto flex h-[340px] w-[340px] items-center justify-center md:h-[385px] md:w-[385px]">
                <Globe className="h-[340px] w-[340px] md:h-[385px] md:w-[385px]" config={customGlobeConfig} />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Capability matrix */}
          <div className="flex flex-col gap-4 rounded-2xl border border-zinc-800/80 bg-gradient-to-b from-zinc-950 via-[#2a0e00] to-black p-5 shadow-2xl lg:col-span-5">
            <div className="flex items-start justify-between gap-4">
              <p className="border-l-2 border-orange-500 pl-4 text-[14px] font-bold leading-relaxed text-zinc-300">
                We help enterprises build, integrate, and scale intelligent solutions across
                Microsoft Azure, AWS, and the enterprise technology ecosystem.
              </p>
              <span className="hidden shrink-0 text-[10px] uppercase tracking-widest text-orange-500 sm:block">
                Capability
                <br />
                Matrix
              </span>
            </div>

            <div className="rounded-2xl border border-zinc-800/80 bg-gradient-to-b from-zinc-900/60 via-[#1b0900]/40 to-black/60 backdrop-blur-md p-5 shadow-xl">
              <div className="flex flex-col divide-y divide-zinc-800/80">
                <ModuleRow
                  index="MOD_01"
                  title="AI Engineering"
                  accent="text-purple-600"
                  icon={<Cpu className="h-4.5 w-4.5" />}
                  items={["AI Agents", "Agentic AI", "Enterprise RAG", "AI Automation", "Generative AI"]}
                />
                <ModuleRow
                  index="MOD_02"
                  title="Cloud AI"
                  accent="text-blue-600"
                  icon={<Cloud className="h-4.5 w-4.5" />}
                  items={["Azure AI", "Azure OpenAI", "Azure AI Foundry", "AWS AI", "Amazon Bedrock", "AWS AI Services"]}
                />
                <ModuleRow
                  index="MOD_03"
                  title="Business AI & Auto"
                  accent="text-emerald-600"
                  icon={<Layers className="h-4.5 w-4.5" />}
                  items={["Power Apps", "Power Automate", "Power BI", "Copilot Studio", "AI-powered Workflows"]}
                />
              </div>
            </div>
          </div>
        </div>

        {/* UNIFIED telemetry readout and trust panel in one single outer wrapper */}
        <div className="mt-16 border-t border-zinc-200/50 pt-12">
          <div className="rounded-2xl border border-zinc-800/80 bg-gradient-to-b from-zinc-950 via-[#2a0e00] to-black p-6 shadow-xl backdrop-blur-md">
            
            {/* Upper Section: Stats readout */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 items-stretch divide-zinc-800/50 md:divide-x">
              {[
                { value: 200, suffix: "+", label: "Projects Delivered", note: "Across industries", live: false },
                { value: COUNTRIES_SERVED_NUMBER, suffix: "+", label: "Countries Served", note: "Global presence", live: true },
                { value: null, suffix: "", label: "Engineering Teams", note: "Extension of your team", live: true },
                { value: 98, suffix: "%", label: "Client Retention", note: "Long-term partnerships", live: false },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="flex flex-col justify-between px-6 first:pl-0 last:pr-0"
                >
                  <div className="mb-3 flex items-center justify-between min-h-[14px]">
                    {stat.live ? <StatusDot /> : <div />}
                  </div>
                  <div>
                    <h3 className="mb-1 text-3xl font-black tracking-tight lg:text-4xl text-white">
                      {stat.value !== null ? (
                        <AnimatedNumber value={stat.value} suffix="" delay={0.2 * (idx + 1)} />
                      ) : (
                        "Dedicated"
                      )}
                      {stat.suffix && <span className="text-orange-500">{stat.suffix}</span>}
                    </h3>
                    <p className="text-xs font-bold uppercase tracking-wider text-white">
                      {stat.label}
                    </p>
                    <p className="mt-0.5 text-[11.5px] leading-none text-orange-400">{stat.note}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Horizontal divider inside the unified card */}
            <div className="my-8 border-t border-zinc-800/40" />

            {/* Lower Section: Trust pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 items-stretch divide-zinc-800/50 md:divide-x">
              {[
                { icon: <ShieldCheck className="h-5 w-5" />, title: "Enterprise Security", copy: "Secure by design, compliant with global standards." },
                { icon: <RefreshCw className="h-4.5 w-4.5" />, title: "Agile & Transparent", copy: "Agile delivery with complete visibility and communication." },
                { icon: <Sliders className="h-4.5 w-4.5" />, title: "Scalable & Flexible", copy: "To scale up or down quickly based on your needs." },
                { icon: <Target className="h-5 w-5" />, title: "Outcome-Focused", copy: "We align with your goals and business outcomes." },
              ].map((pillar) => (
                <div key={pillar.title} className="flex gap-3 items-start px-6 first:pl-0 last:pr-0">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border bg-zinc-900 text-orange-500 border-orange-500/20">
                    {pillar.icon}
                  </div>
                  <div>
                    <h5 className="text-[12.5px] font-black uppercase tracking-wider leading-tight text-white">
                      {pillar.title}
                    </h5>
                    <p className="mt-1 text-[11px] font-semibold leading-relaxed text-orange-400 font-medium">
                      {pillar.copy}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>


      </div>
    </section>
  )
}