"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

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

const MILESTONES = [
  { year: "2012", title: "Founded", desc: "Started in Kolkata with a vision" },
  { year: "2015", title: "Microsoft Partner", desc: "Became certified solutions partner" },
  { year: "2018", title: "Global Expansion", desc: "Opened London and New York offices" },
  { year: "2021", title: "AI Division", desc: "Launched AI/ML practice" },
  { year: "2024", title: "Enterprise Scale", desc: "200+ projects across 4 continents" },
]

export default function AboutStory() {
  const sRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const root = sRef.current
    if (!root) return
    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const items = root.querySelectorAll<HTMLElement>("[data-story-item]")
      gsap.set(items, { y: 24, opacity: 0 })
      items.forEach((item, i) => {
        ScrollTrigger.create({
          trigger: item,
          start: "top 85%",
          once: true,
          onEnter: () => gsap.to(item, { y: 0, opacity: 1, duration: 0.6, delay: i * 0.08, ease: "power2.out" }),
        })
      })
      return () => { ScrollTrigger.getAll().forEach(st => st.kill()) }
    })
    return () => mm.revert()
  }, { scope: sRef })

  return (
    <section ref={sRef} className="relative w-full overflow-hidden py-24" style={{ background: color.lifted }}>
      <div className="relative z-10 mx-auto max-w-[1320px] px-6 md:px-10">
        {/* Header */}
        <div className="mb-16">
          <div className="mb-6 inline-flex items-center gap-2" style={{ padding: "6px 14px", borderRadius: 999, background: color.ink, color: color.canvas, fontSize: 12, fontWeight: 700, letterSpacing: "0.56px", textTransform: "uppercase" }}>
            <span style={{ width: 8, height: 8, borderRadius: 999, background: color.signalLight, boxShadow: `0 0 8px ${color.signalLight}` }} />
            Our Journey
          </div>
          <h2 style={{ fontFamily: "inherit", fontSize: "clamp(32px,4vw,56px)", fontWeight: 500, lineHeight: 1.05, letterSpacing: "-0.028em", color: color.ink, textWrap: "balance" }}>
            <span style={{ backgroundImage: `linear-gradient(92deg,${color.mistral} 0%,${color.flame} 40%,${color.sunshine} 75%)`, backgroundClip: "text", WebkitBackgroundClip: "text", color: "transparent" }}>12 years</span> of building
            <br />enterprise technology
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Line */}
          <div className="absolute left-0 top-0 bottom-0 w-px" style={{ background: `linear-gradient(to bottom, ${color.ink}20, ${color.ink}10, transparent)` }} />

          <div className="space-y-12">
            {MILESTONES.map((m, i) => (
              <div key={m.year} data-story-item style={{ opacity: 0 }} className="relative pl-12">
                {/* Dot */}
                <div className="absolute left-0 top-1 -translate-x-1/2" style={{ width: 12, height: 12, borderRadius: 999, background: i === MILESTONES.length - 1 ? color.signalLight : color.white, border: `2px solid ${i === MILESTONES.length - 1 ? color.signalLight : color.ink}30` }} />

                <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:gap-6">
                  <span style={{ fontFamily: "inherit", fontSize: 28, fontWeight: 500, letterSpacing: "-1px", color: color.ink }}>{m.year}</span>
                  <div>
                    <h3 style={{ fontSize: 18, fontWeight: 600, color: color.ink, marginBottom: 4 }}>{m.title}</h3>
                    <p style={{ fontSize: 15, fontWeight: 450, color: color.slate }}>{m.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
