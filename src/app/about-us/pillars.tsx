"use client"

import { useRef } from "react"
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

const PILLARS = [
  { tag: "01", title: "Enterprise-First", desc: "Architected for scale, security, and longevity — not just the MVP." },
  { tag: "02", title: "Microsoft Stack", desc: "Deep expertise across SharePoint, Power Platform, Azure, Teams." },
  { tag: "03", title: "AI-Native", desc: "GPT-4o, Claude, RAG pipelines, and document intelligence." },
  { tag: "04", title: "Global Delivery", desc: "UK, US, India, Middle East — one team, one quality bar." },
  { tag: "05", title: "Agile Enterprise", desc: "Startup agility with enterprise rigor and compliance." },
  { tag: "06", title: "True Partners", desc: "We embed in your teams and own outcomes together." },
]

const STATS = [
  { value: "99.9%", label: "Uptime SLA", sub: "14 cloud regions" },
  { value: "200+", label: "Projects", sub: "Delivered successfully" },
  { value: "50+", label: "Clients", sub: "Across 4 continents" },
  { value: "12+", label: "Years", sub: "Of excellence" },
]

export default function AboutPillars() {
  const sRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const root = sRef.current
    if (!root) return
    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const items = root.querySelectorAll<HTMLElement>("[data-pillar-item]")
      gsap.set(items, { y: 24, opacity: 0 })
      items.forEach((item, i) => {
        ScrollTrigger.create({
          trigger: item,
          start: "top 85%",
          once: true,
          onEnter: () => gsap.to(item, { y: 0, opacity: 1, duration: 0.6, delay: i * 0.06, ease: "power2.out" }),
        })
      })
      return () => { ScrollTrigger.getAll().forEach(st => st.kill()) }
    })
    return () => mm.revert()
  }, { scope: sRef })

  return (
    <section ref={sRef} className="relative w-full overflow-hidden py-24" style={{ background: color.canvas }}>
      <div className="relative z-10 mx-auto max-w-[1320px] px-6 md:px-10">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-6 inline-flex items-center gap-2" style={{ padding: "6px 14px", borderRadius: 999, background: color.ink, color: color.canvas, fontSize: 12, fontWeight: 700, letterSpacing: "0.56px", textTransform: "uppercase" }}>
            <span style={{ width: 8, height: 8, borderRadius: 999, background: color.signalLight, boxShadow: `0 0 8px ${color.signalLight}` }} />
            Why Softree
          </div>
          <h2 style={{ fontFamily: "inherit", fontSize: "clamp(32px,4vw,56px)", fontWeight: 500, lineHeight: 1.05, letterSpacing: "-0.028em", color: color.ink, textWrap: "balance" }}>
            Built for <span style={{ backgroundImage: `linear-gradient(92deg,${color.mistral} 0%,${color.flame} 40%,${color.sunshine} 75%)`, backgroundClip: "text", WebkitBackgroundClip: "text", color: "transparent" }}>enterprises</span>
          </h2>
        </div>

        {/* Stats */}
        <div className="mb-16 grid grid-cols-2 gap-4 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center rounded-2xl p-6" style={{ background: color.white, border: `1px solid ${color.ink}10` }}>
              <div style={{ fontSize: "clamp(28px,3.5vw,40px)", fontWeight: 500, lineHeight: 1, letterSpacing: "-1.5px", color: color.ink }}>{s.value}</div>
              <div style={{ fontSize: 14, fontWeight: 500, color: color.ink, marginTop: 4 }}>{s.label}</div>
              <div style={{ fontSize: 12, fontWeight: 450, color: color.slate }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Pillars */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((p) => (
            <div key={p.tag} data-pillar-item className="group relative overflow-hidden rounded-2xl p-6 transition-all hover:shadow-lg" style={{ opacity: 0, background: color.white, border: `1px solid ${color.ink}08` }}>
              <div className="absolute inset-x-0 top-0 h-0.5 opacity-0 transition-opacity group-hover:opacity-100" style={{ background: `linear-gradient(90deg,${color.mistral},${color.sunshine})` }} />
              <div className="mb-4 flex items-center justify-between">
                <span className="grid h-10 w-10 place-items-center rounded-full" style={{ background: color.cream, color: color.mistral, fontSize: 13, fontWeight: 600 }}>{p.tag}</span>
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: color.ink, marginBottom: 8 }}>{p.title}</h3>
              <p style={{ fontSize: 15, fontWeight: 450, color: color.slate, lineHeight: 1.5 }}>{p.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <Link href="/contact" className="group inline-flex items-center gap-2 hover:-translate-y-px transition-all" style={{ padding: "14px 32px", borderRadius: 20, background: color.ink, color: color.canvas, fontSize: 16, fontWeight: 500, textDecoration: "none" }}>
            Book a discovery call
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
