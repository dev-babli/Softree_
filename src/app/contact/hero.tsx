"use client"

import { useRef, useState } from "react"
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

const H1 = [
  [{ t: "Let's", g: false }, { t: "build", g: true }],
  [{ t: "something", g: true }],
  [{ t: "extraordinary.", g: true }],
]

const LOCATIONS = [
  { city: "Kolkata", timezone: "IST +5:30", email: "india@softree.com" },
  { city: "London", timezone: "GMT +0", email: "uk@softree.com" },
  { city: "New York", timezone: "EST -5", email: "us@softree.com" },
  { city: "Dubai", timezone: "GST +4", email: "mea@softree.com" },
]

export default function ContactHero() {
  const sRef = useRef<HTMLElement>(null)
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" })

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

      const formEl = root.querySelector<HTMLElement>("[data-h-form]")
      if (formEl) { gsap.set(formEl, { x: 40, opacity: 0 }); tl.to(formEl, { x: 0, opacity: 1, duration: 0.8 }, 0.4) }

      const locations = root.querySelectorAll<HTMLElement>("[data-h-location]")
      if (locations.length) { gsap.set(locations, { y: 20, opacity: 0 }); tl.to(locations, { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 }, 0.7) }

      return () => { tl.kill() }
    })
    return () => mm.revert()
  }, { scope: sRef })

  return (
    <section ref={sRef} className="relative w-full overflow-hidden" style={{ background: color.canvas, minHeight: "100vh" }}>
      {/* Soft blur orbs */}
      <div className="pointer-events-none absolute" style={{ width: 500, height: 500, right: -150, top: -100, background: `radial-gradient(circle,${color.sunshine}25 0%,transparent 60%)`, filter: "blur(100px)", opacity: 0.25 }} />
      <div className="pointer-events-none absolute" style={{ width: 350, height: 350, left: -100, bottom: -50, background: `radial-gradient(circle,${color.cream}40 0%,transparent 60%)`, filter: "blur(80px)", opacity: 0.4 }} />

      <div className="relative z-10 mx-auto grid w-full max-w-[1320px] grid-cols-1 gap-16 px-6 pb-20 pt-24 md:px-10 md:pb-28 md:pt-32 lg:grid-cols-2 lg:items-center lg:gap-12">
        {/* LEFT - Content */}
        <div className="relative z-10">
          {/* Eyebrow */}
          <div data-h-eyebrow className="mb-8 inline-flex items-center gap-3" style={{ opacity: 0 }}>
            <span className="inline-flex items-center gap-2" style={{ padding: "6px 14px", borderRadius: 999, background: color.ink, color: color.canvas, fontSize: 12, fontWeight: 700, letterSpacing: "0.56px", textTransform: "uppercase" }}>
              <span className="inline-block" style={{ width: 8, height: 8, borderRadius: 999, background: color.signalLight, boxShadow: `0 0 8px ${color.signalLight}` }} />
              Get in touch
            </span>
          </div>

          {/* Headline */}
          <h1 style={{ fontFamily: "inherit", fontSize: "clamp(42px,6vw,80px)", fontWeight: 500, lineHeight: 0.96, letterSpacing: "-0.032em", color: color.ink, textWrap: "balance" }}>
            {H1.map((line, li) => (
              <span key={li} className="block">
                {line.map((w, wi) => (
                  <span key={wi} data-h-word className="inline-block" style={{ marginRight: "0.28em", backgroundImage: w.g ? `linear-gradient(92deg,${color.mistral} 0%,${color.flame} 40%,${color.sunshine} 75%,${color.gold} 100%)` : undefined, backgroundClip: w.g ? "text" : undefined, WebkitBackgroundClip: w.g ? "text" : undefined, color: w.g ? "transparent" : color.ink }}>{w.t}</span>
                ))}
              </span>
            ))}
          </h1>

          <p data-h-sub className="mt-8 max-w-[480px]" style={{ fontSize: 18, fontWeight: 450, lineHeight: 1.5, color: color.charcoal, opacity: 0 }}>
            Ready to transform your enterprise? Our global team is here to help you navigate the complexities of modern technology.
          </p>

          {/* Locations */}
          <div className="mt-12 grid grid-cols-2 gap-4">
            {LOCATIONS.map((loc) => (
              <div key={loc.city} data-h-location className="rounded-xl p-4" style={{ opacity: 0, background: color.white, border: `1px solid ${color.ink}08` }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: color.ink }}>{loc.city}</div>
                <div style={{ fontSize: 12, fontWeight: 450, color: color.slate, marginTop: 2 }}>{loc.timezone}</div>
                <a href={`mailto:${loc.email}`} style={{ fontSize: 12, fontWeight: 450, color: color.mistral, marginTop: 4, display: "block" }}>{loc.email}</a>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT - Form */}
        <div data-h-form className="relative" style={{ opacity: 0 }}>
          <div className="rounded-2xl p-8" style={{ background: color.white, border: `1px solid ${color.ink}08`, boxShadow: "0 4px 24px rgba(0,0,0,0.04)" }}>
            <h2 style={{ fontSize: 24, fontWeight: 500, color: color.ink, marginBottom: 24 }}>Send a message</h2>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 500, color: color.ink, textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: 6 }}>Name</label>
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-lg px-4 py-3 outline-none transition-all focus:ring-2" style={{ background: color.canvas, border: `1px solid ${color.ink}10`, fontSize: 15, color: color.ink }} placeholder="John Doe" />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 500, color: color.ink, textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: 6 }}>Email</label>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-lg px-4 py-3 outline-none transition-all focus:ring-2" style={{ background: color.canvas, border: `1px solid ${color.ink}10`, fontSize: 15, color: color.ink }} placeholder="john@company.com" />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 500, color: color.ink, textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: 6 }}>Company</label>
                <input type="text" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="w-full rounded-lg px-4 py-3 outline-none transition-all focus:ring-2" style={{ background: color.canvas, border: `1px solid ${color.ink}10`, fontSize: 15, color: color.ink }} placeholder="Acme Inc." />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 500, color: color.ink, textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: 6 }}>Message</label>
                <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={4} className="w-full resize-none rounded-lg px-4 py-3 outline-none transition-all focus:ring-2" style={{ background: color.canvas, border: `1px solid ${color.ink}10`, fontSize: 15, color: color.ink }} placeholder="Tell us about your project..." />
              </div>
              <button type="submit" className="w-full rounded-xl py-4 font-medium transition-all hover:-translate-y-px" style={{ background: color.ink, color: color.canvas, fontSize: 16 }}>
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
