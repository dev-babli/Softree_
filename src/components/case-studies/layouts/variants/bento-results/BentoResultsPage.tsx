"use client"

import Link from "next/link"
import { TrendingUp, Activity, PieChart } from "lucide-react"
import type { CaseStudyLayoutData } from "../../types"
import { LayoutFooter } from "../../layout-shared/LayoutFooter"
import { TechLogo } from "../../shared/PowerPlatformLogos"

/** Dashboard aesthetic — dark bento metric tiles, data viz mood */
export function BentoResultsPage({ data }: { data: CaseStudyLayoutData }) {
  const metrics = data.impactMetrics
  const bentoLayout = [
    "col-span-2 row-span-2",
    "col-span-1 row-span-1",
    "col-span-1 row-span-1",
    "col-span-1 row-span-2",
    "col-span-2 row-span-1",
    "col-span-1 row-span-1",
  ]

  return (
    <article className="relative min-h-screen overflow-hidden bg-[#0B0F14] text-[#E2E8F0]" style={{ fontFamily: "ui-monospace, monospace" }}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      <header className="relative border-b border-[#1E293B] px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#22D3EE]">Data & Analytics</p>
          <h1 className="mt-4 max-w-3xl text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-tight text-white" style={{ fontFamily: "inherit" }}>
            {data.headerTitle}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#94A3B8]" style={{ fontFamily: "system-ui, sans-serif" }}>
            {data.excerpt}
          </p>
        </div>
      </header>

      {/* Bento dashboard grid */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-3 auto-rows-[120px] gap-3 md:auto-rows-[140px]">
          {metrics.map((m, i) => (
            <div
              key={i}
              className={`flex flex-col justify-between rounded-2xl border border-[#1E293B]/80 bg-[#111827]/90 p-5 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-sm transition-[border-color,transform] duration-200 hover:border-cyan-500/30 hover:-translate-y-0.5 motion-reduce:transform-none ${bentoLayout[i % bentoLayout.length]}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider text-[#64748B]">{m.label}</span>
                {i === 0 ? <TrendingUp className="h-4 w-4 text-[#22D3EE]" /> : i === 1 ? <Activity className="h-4 w-4 text-[#34D399]" /> : <PieChart className="h-4 w-4 text-[#A78BFA]" />}
              </div>
              <div className="text-[clamp(1.75rem,4vw,3rem)] font-bold text-white">{m.value}</div>
              {i === 0 ? (
                <div className="mt-2 h-12 rounded bg-gradient-to-r from-[#22D3EE]/20 to-transparent">
                  <svg viewBox="0 0 200 40" className="h-full w-full" preserveAspectRatio="none">
                    <polyline fill="none" stroke="#22D3EE" strokeWidth="2" points="0,35 40,28 80,20 120,15 160,8 200,5" />
                  </svg>
                </div>
              ) : null}
            </div>
          ))}
          {/* Chart placeholder tiles */}
          <div className="col-span-2 row-span-1 flex items-end gap-1 rounded-xl border border-[#1E293B] bg-[#111827] p-5">
            {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
              <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-[#6366F1] to-[#22D3EE]/50" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      </section>

      {/* Challenge / solution — compact data panels */}
      <section className="border-t border-[#1E293B] bg-[#0F1419] py-16" style={{ fontFamily: "system-ui, sans-serif" }}>
        <div className="mx-auto grid max-w-6xl gap-8 px-6 lg:grid-cols-2">
          <div className="rounded-xl border border-[#1E293B] p-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#22D3EE]">{data.challengeHeading}</h2>
            <ul className="mt-4 space-y-3 text-sm text-[#94A3B8]">
              {data.challengeCards.map((c, i) => (
                <li key={i}><span className="text-white">{c.title}</span> — {c.description}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-[#1E293B] p-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#34D399]">{data.solutionHeading}</h2>
            <ul className="mt-4 space-y-3 text-sm text-[#94A3B8]">
              {data.solutionNodes.map((n, i) => (
                <li key={i}><span className="text-white">{n.title}</span> — {n.description}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12" style={{ fontFamily: "system-ui, sans-serif" }}>
        <h2 className="text-xs font-bold uppercase tracking-wider text-[#64748B]">Stack</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {data.technologies.map((t) => (
            <div key={t} className="flex items-center gap-2 rounded-lg border border-[#1E293B] bg-[#111827] px-3 py-2">
              <TechLogo name={t} className="h-6 w-6" />
              <span className="text-xs">{t}</span>
            </div>
          ))}
        </div>
        {data.testimonial?.quote ? (
          <blockquote className="mt-10 border-l-2 border-[#22D3EE] pl-4 text-sm italic text-[#94A3B8]">
            &ldquo;{data.testimonial.quote}&rdquo;
          </blockquote>
        ) : null}
      </section>

      {data.related.length > 0 ? (
        <section className="border-t border-[#1E293B] py-12">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-xs font-bold uppercase text-[#64748B]">Related analytics</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {data.related.slice(0, 3).map((r) => (
                <Link key={r._id} href={`/case-studies/${r.slug.current}`} className="rounded-lg border border-[#1E293B] p-4 text-sm hover:border-[#22D3EE]">
                  {r.client || r.title}
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <LayoutFooter faqs={data.faqs} faqWrapperClassName="bg-[#0B0F14]" ctaWrapperClassName="bg-[#0B0F14]" />
    </article>
  )
}
