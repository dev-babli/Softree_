"use client"

import { useRef, useState, useEffect } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger, useGSAP)

const color = {
  canvas: "#F3F0EE",
  lifted: "#FCFBFA",
  white: "#FFFFFF",
  ink: "#141413",
  charcoal: "#262627",
  slate: "#696969",
  mistral: "#fa520f",
  flame: "#fb6424",
  sunshine: "#ffa110",
  gold: "#ffe295",
  cream: "#fff0c2",
  signalLight: "#F37338",
}

const CYCLE_WORDS = ["SharePoint", "Power Apps", "AI Solutions", "Web Apps", "Mobile"]
const CYCLE_MS = 2500

const SERVICES = [
  { id: "sharepoint", title: "SharePoint", subtitle: "Enterprise intranets & SPFx", desc: "Custom intranets, document management, and SPFx web parts for Microsoft 365.", href: "/services/sharepoint", size: "large", color: "cyan" },
  { id: "power", title: "Power Platform", subtitle: "Apps, BI & Automation", desc: "Power Apps, Power BI dashboards, and Power Automate workflows.", href: "/services/power-platform", size: "medium", color: "amber" },
  { id: "ai", title: "AI Solutions", subtitle: "GPT-4o & Claude", desc: "AI agents, RAG pipelines, and document intelligence.", href: "/services/ai", size: "medium", color: "purple" },
  { id: "web", title: "Web Development", subtitle: "React & Next.js", desc: "Modern web applications with React, Next.js, and Node.js.", href: "/services/web", size: "large", color: "emerald" },
  { id: "mobile", title: "Mobile Apps", subtitle: "iOS & Android", desc: "Native and cross-platform mobile applications.", href: "/services/mobile", size: "medium", color: "rose" },
  { id: "analytics", title: "Analytics", subtitle: "Power BI & Data Viz", desc: "Interactive dashboards and business intelligence solutions.", href: "/services/analytics", size: "medium", color: "blue" },
]

const FILTERS = [
  { id: "all", label: "All" },
  { id: "microsoft", label: "Microsoft" },
  { id: "ai", label: "AI" },
  { id: "web", label: "Web & Mobile" },
]

export default function ServicesHero() {
  const sRef = useRef<HTMLElement>(null)
  const [activeFilter, setActiveFilter] = useState("all")
  const [cycleIdx, setCycleIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setCycleIdx(p => (p + 1) % CYCLE_WORDS.length), CYCLE_MS)
    return () => clearInterval(t)
  }, [])

  useGSAP(() => {
    const root = sRef.current
    if (!root) return
    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

      const eyebrow = root.querySelector<HTMLElement>("[data-h-eyebrow]")
      if (eyebrow) { gsap.set(eyebrow, { scale: 0.9, opacity: 0 }); tl.to(eyebrow, { scale: 1, opacity: 1, duration: 0.5 }, 0) }

      const words = root.querySelectorAll<HTMLElement>("[data-h-word]")
      if (words.length) { gsap.set(words, { y: 30, opacity: 0 }); tl.to(words, { y: 0, opacity: 1, duration: 0.9, stagger: 0.07 }, 0.1) }

      const sub = root.querySelector<HTMLElement>("[data-h-sub]")
      if (sub) { gsap.set(sub, { y: 16, opacity: 0 }); tl.to(sub, { y: 0, opacity: 1, duration: 0.7 }, 0.55) }

      const filters = root.querySelector<HTMLElement>("[data-h-filters]")
      if (filters) { gsap.set(filters, { y: 12, opacity: 0 }); tl.to(filters, { y: 0, opacity: 1, duration: 0.6 }, 0.7) }

      const cards = root.querySelectorAll<HTMLElement>("[data-h-card]")
      if (cards.length) { gsap.set(cards, { y: 24, opacity: 0 }); tl.to(cards, { y: 0, opacity: 1, duration: 0.5, stagger: 0.06 }, 0.85) }

      return () => { tl.kill() }
    })
    return () => mm.revert()
  }, { scope: sRef })

  const filtered = activeFilter === "all" ? SERVICES : activeFilter === "microsoft" ? SERVICES.filter(s => ["sharepoint", "power", "analytics"].includes(s.id)) : activeFilter === "ai" ? SERVICES.filter(s => s.id === "ai") : SERVICES.filter(s => ["web", "mobile"].includes(s.id))

  return (
    <section ref={sRef} className="relative w-full overflow-hidden" style={{ background: color.canvas, minHeight: "100vh" }}>
      {/* Soft blur orbs */}
      <div className="pointer-events-none absolute" style={{ width: 600, height: 600, right: -200, top: -180, background: `radial-gradient(circle,${color.sunshine}20 0%,transparent 60%)`, filter: "blur(120px)", opacity: 0.3 }} />
      <div className="pointer-events-none absolute" style={{ width: 420, height: 420, left: -140, bottom: -100, background: `radial-gradient(circle,${color.cream}40 0%,transparent 60%)`, filter: "blur(90px)", opacity: 0.45 }} />

      <div className="relative z-10 mx-auto w-full max-w-[1320px] px-6 pb-20 pt-24 md:px-10 md:pb-28 md:pt-32">
        {/* Header */}
        <div className="mb-8 text-center">
          <div data-h-eyebrow className="mb-6 inline-flex items-center gap-2" style={{ opacity: 0, padding: "6px 14px", borderRadius: 999, background: color.ink, color: color.canvas, fontSize: 12, fontWeight: 700, letterSpacing: "0.56px", textTransform: "uppercase" }}>
            <span style={{ width: 8, height: 8, borderRadius: 999, background: color.signalLight, boxShadow: `0 0 8px ${color.signalLight}` }} />
            Our Expertise
          </div>

          <h1 style={{ fontFamily: "inherit", fontSize: "clamp(42px,7vw,96px)", fontWeight: 500, lineHeight: 0.96, letterSpacing: "-0.032em", color: color.ink, textWrap: "balance" }}>
            <span data-h-word style={{ display: "inline-block", opacity: 0 }}>Engineering</span>
            <br />
            <span style={{ backgroundImage: `linear-gradient(92deg,${color.mistral} 0%,${color.flame} 40%,${color.sunshine} 75%)`, backgroundClip: "text", WebkitBackgroundClip: "text", color: "transparent" }}>{CYCLE_WORDS[cycleIdx]}</span>
          </h1>

          <p data-h-sub className="mx-auto mt-6 max-w-xl" style={{ fontSize: 18, fontWeight: 450, lineHeight: 1.5, color: color.charcoal, opacity: 0 }}>
            From Microsoft enterprise solutions to cutting-edge AI integration — technology that drives business outcomes.
          </p>
        </div>

        {/* Filters */}
        <div data-h-filters className="mb-12 flex flex-wrap items-center justify-center gap-2" style={{ opacity: 0 }}>
          {FILTERS.map(tab => (
            <button key={tab.id} onClick={() => setActiveFilter(tab.id)} className="relative rounded-full px-5 py-2.5 text-sm font-medium transition-all" style={{ background: activeFilter === tab.id ? color.ink : color.white, color: activeFilter === tab.id ? color.canvas : color.ink, border: `1px solid ${activeFilter === tab.id ? color.ink : color.ink}12` }}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Bento Grid */}
        <div className="grid gap-4 md:grid-cols-3">
          {filtered.map((s) => {
            const isLarge = s.size === "large"
            return (
              <div key={s.id} data-h-card style={{ opacity: 0 }} className={`group ${isLarge ? "md:col-span-2" : ""}`}>
                <Link href={s.href} className="block h-full">
                  <div className="h-full rounded-2xl p-6 transition-all hover:shadow-lg" style={{ background: color.white, border: `1px solid ${color.ink}08` }}>
                    <div className="absolute inset-x-0 top-0 h-0.5 opacity-0 transition-opacity group-hover:opacity-100" style={{ background: `linear-gradient(90deg,${color.mistral},${color.sunshine})` }} />
                    <div className="mb-4 flex items-center justify-between">
                      <span className="grid h-12 w-12 place-items-center rounded-xl" style={{ background: color.cream, color: color.mistral, fontSize: 20, fontWeight: 600 }}>{s.title[0]}</span>
                      <span style={{ fontSize: 12, fontWeight: 500, color: color.slate, textTransform: "uppercase", letterSpacing: "0.5px" }}>{s.subtitle}</span>
                    </div>
                    <h3 style={{ fontSize: isLarge ? 24 : 20, fontWeight: 600, color: color.ink, marginBottom: 8 }}>{s.title}</h3>
                    <p style={{ fontSize: 15, fontWeight: 450, color: color.slate, lineHeight: 1.5 }}>{s.desc}</p>
                    <div className="mt-4 flex items-center gap-2" style={{ fontSize: 14, fontWeight: 500, color: color.mistral }}>
                      Explore
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M13 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="mb-6" style={{ fontSize: 16, fontWeight: 450, color: color.slate }}>Need something custom? We tailor solutions to your exact requirements.</p>
          <Link href="/contact" className="group inline-flex items-center gap-2 hover:-translate-y-px transition-all" style={{ padding: "14px 32px", borderRadius: 20, background: color.ink, color: color.canvas, fontSize: 16, fontWeight: 500, textDecoration: "none" }}>
            Discuss Your Project
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
