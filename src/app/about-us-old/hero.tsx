"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger, useGSAP)

// Design tokens matching homepage
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

const H1 = [
  [{ t: "Global", g: false }, { t: "delivery", g: true }],
  [{ t: "partner", g: true }, { t: "for", g: false }, { t: "modern", g: false }],
  [{ t: "enterprises.", g: true }],
]

const STATS = [
  { v: 12, s: "+", l: "Years", d: "Of proven excellence" },
  { v: 200, s: "+", l: "Projects", d: "Delivered successfully" },
  { v: 50, s: "+", l: "Clients", d: "Across 4 continents" },
  { v: 4, s: "", l: "Global Hubs", d: "India UK US Dubai" },
]

const GLOBAL_HUBS = [
  { city: "Kolkata", country: "India", role: "HQ", timezone: "IST +5:30" },
  { city: "London", country: "UK", role: "Europe", timezone: "GMT +0" },
  { city: "New York", country: "USA", role: "Americas", timezone: "EST -5" },
  { city: "Dubai", country: "UAE", role: "MEA", timezone: "GST +4" },
]

export default function AboutHero() {
  const sRef = useRef<HTMLElement>(null)

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

      const stats = root.querySelectorAll<HTMLElement>("[data-h-stat]")
      if (stats.length) { gsap.set(stats, { y: 12, opacity: 0 }); tl.to(stats, { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 }, 0.75) }

      const ctas = root.querySelectorAll<HTMLElement>("[data-h-cta]")
      if (ctas.length) { gsap.set(ctas, { scale: 0.96, opacity: 0 }); tl.to(ctas, { scale: 1, opacity: 1, duration: 0.5, stagger: 0.08 }, 0.9) }

      const hubs = root.querySelectorAll<HTMLElement>("[data-h-hub]")
      if (hubs.length) { gsap.set(hubs, { scale: 0.8, opacity: 0 }); tl.to(hubs, { scale: 1, opacity: 1, duration: 0.6, stagger: 0.08 }, 0.6) }

      return () => { tl.kill() }
    })
    return () => mm.revert()
  }, { scope: sRef })

  return (
    <section ref={sRef} className="relative w-full overflow-hidden" style={{ background: color.canvas, minHeight: "100vh" }}>
      {/* Soft blur orbs */}
      <div className="pointer-events-none absolute" style={{ width: 600, height: 600, right: -200, top: -180, background: `radial-gradient(circle,${color.sunshine}30 0%,transparent 60%)`, filter: "blur(120px)", opacity: 0.3 }} />
      <div className="pointer-events-none absolute" style={{ width: 420, height: 420, left: -140, bottom: -100, background: `radial-gradient(circle,${color.cream}50 0%,transparent 60%)`, filter: "blur(90px)", opacity: 0.45 }} />

      <div className="relative z-10 mx-auto grid w-full max-w-[1320px] grid-cols-1 gap-12 px-6 pb-20 pt-24 md:px-10 md:pb-28 md:pt-32 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-8">
        {/* LEFT - Content */}
        <div className="relative z-10">
          {/* Eyebrow */}
          <div data-h-eyebrow className="mb-8 inline-flex items-center gap-3" style={{ opacity: 0 }}>
            <span className="inline-flex items-center gap-2" style={{ padding: "6px 14px", borderRadius: 999, background: color.ink, color: color.canvas, fontSize: 12, fontWeight: 700, letterSpacing: "0.56px", textTransform: "uppercase" }}>
              <span className="inline-block" style={{ width: 8, height: 8, borderRadius: 999, background: color.signalLight, boxShadow: `0 0 8px ${color.signalLight}` }} />
              About Softree
            </span>
          </div>

          {/* Headline */}
          <h1 style={{ fontFamily: "inherit", fontSize: "clamp(42px,7vw,96px)", fontWeight: 500, lineHeight: 0.96, letterSpacing: "-0.032em", color: color.ink, textWrap: "balance" }}>
            {H1.map((line, li) => (
              <span key={li} className="block">
                {line.map((w, wi) => (
                  <span key={wi} data-h-word className="inline-block" style={{ marginRight: "0.28em", backgroundImage: w.g ? `linear-gradient(92deg,${color.mistral} 0%,${color.flame} 40%,${color.sunshine} 75%,${color.gold} 100%)` : undefined, backgroundClip: w.g ? "text" : undefined, WebkitBackgroundClip: w.g ? "text" : undefined, color: w.g ? "transparent" : color.ink }}>{w.t}</span>
                ))}
              </span>
            ))}
          </h1>

          <p data-h-sub className="mt-8 max-w-[560px]" style={{ fontSize: 18, fontWeight: 450, lineHeight: 1.5, color: color.charcoal, opacity: 0 }}>
            We bridge global talent with enterprise outcomes. From our India headquarters
            to hubs in London, New York, and Dubai — one unified team delivering excellence.
          </p>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-4 md:grid-cols-4">
            {STATS.map((st) => (
              <div key={st.l} data-h-stat style={{ opacity: 0 }}>
                <div style={{ fontFamily: "inherit", fontSize: "clamp(28px,3.5vw,40px)", fontWeight: 500, lineHeight: 1, letterSpacing: "-1.5px", color: color.ink }}>
                  {st.v}{st.s}
                </div>
                <div className="mt-1.5" style={{ fontSize: 14, fontWeight: 500, color: color.ink, letterSpacing: "-0.3px" }}>{st.l}</div>
                <div style={{ fontSize: 12, fontWeight: 450, color: color.slate, marginTop: 2 }}>{st.d}</div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <div data-h-cta style={{ opacity: 0 }}>
              <Link href="/contact" className="group inline-flex items-center gap-2 hover:-translate-y-px transition-all duration-220" style={{ padding: "14px 32px", borderRadius: 20, background: color.ink, color: color.canvas, fontSize: 16, fontWeight: 500, letterSpacing: "-0.32px", textDecoration: "none", boxShadow: "0 0 0 0 transparent" }}>
                Start Your Project
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div data-h-cta style={{ opacity: 0 }}>
              <Link href="/services" className="group inline-flex items-center gap-2 hover:-translate-y-px transition-all duration-220" style={{ padding: "14px 32px", borderRadius: 20, background: color.cream, color: color.ink, fontSize: 16, fontWeight: 500, letterSpacing: "-0.32px", textDecoration: "none", border: `1.5px solid ${color.cream}` }}>
                Explore Services
              </Link>
            </div>
          </div>
        </div>

        {/* RIGHT - Global Hubs Map */}
        <div className="relative mx-auto hidden lg:block" style={{ width: 520, height: 520 }}>
          {/* Orbit ring */}
          <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 520 520">
            <circle cx="260" cy="260" r="180" fill="none" stroke={`${color.ink}10`} strokeWidth="1" strokeDasharray="6 6" />
            {GLOBAL_HUBS.map((hub, i) => {
              const angle = (i * 90 * Math.PI) / 180
              const cx = 260 + 180 * Math.cos(angle)
              const cy = 260 + 180 * Math.sin(angle)
              return <line key={hub.city} x1="260" y1="260" x2={cx} y2={cy} stroke={`${color.ink}15`} strokeWidth="1" />
            })}
          </svg>

          {/* Center - India HQ */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ width: 100, height: 100, borderRadius: "50%", background: `radial-gradient(circle,${color.white} 0%,${color.cream} 40%,${color.gold}88 70%,transparent 100%)`, boxShadow: `0 0 60px ${color.sunshine}40`, display: "grid", placeItems: "center" }}>
            <div className="text-center">
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.48px", textTransform: "uppercase", color: color.ink }}>India HQ</div>
              <div style={{ fontSize: 11, color: color.slate }}>Kolkata</div>
            </div>
          </div>

          {/* Satellite hubs */}
          {GLOBAL_HUBS.map((hub, i) => {
            const angle = (i * 90 * Math.PI) / 180
            const nx = 260 + 180 * Math.cos(angle)
            const ny = 260 + 180 * Math.sin(angle)
            return (
              <div key={hub.city} data-h-hub className="absolute" style={{ left: nx, top: ny, transform: "translate(-50%,-50%)", opacity: 0 }}>
                <div className="flex flex-col items-center gap-2 rounded-xl p-3" style={{ background: color.white, border: `1px solid ${color.ink}12`, boxShadow: "rgba(0, 0, 0, 0.04) 0px 4px 24px 0px" }}>
                  <div className="grid h-9 w-9 place-items-center rounded-full" style={{ background: color.cream, color: color.mistral }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <div style={{ fontSize: 12, fontWeight: 600, color: color.ink, letterSpacing: "-0.2px" }}>{hub.city}</div>
                    <div style={{ fontSize: 11, fontWeight: 450, color: color.slate, marginTop: 1 }}>{hub.timezone}</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
