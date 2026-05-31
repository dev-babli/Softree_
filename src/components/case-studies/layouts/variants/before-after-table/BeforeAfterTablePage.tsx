"use client"

import Link from "next/link"
import { ArrowDown, ArrowUp, Calculator } from "lucide-react"
import type { CaseStudyLayoutData } from "../../types"
import { LayoutFooter } from "../../layout-shared/LayoutFooter"
import { TechLogo } from "../../shared/PowerPlatformLogos"

/** Comparison focused — giant before/after table, ROI numbers-first */
export function BeforeAfterTablePage({ data }: { data: CaseStudyLayoutData }) {
  const rows = data.beforeAfter.length > 0
    ? data.beforeAfter
    : data.impactMetrics.map((m) => ({
        metric: m.label,
        before: "Manual / legacy",
        after: m.value,
      }))

  return (
    <article className="min-h-screen bg-[#FAFAFA] text-[#111]" style={{ fontFamily: "system-ui, sans-serif" }}>
      <header className="border-b-4 border-[#0F172A] bg-white">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <div className="flex items-center gap-2 text-[#0F172A]">
            <Calculator className="h-5 w-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Process automation ROI</span>
          </div>
          <h1 className="mt-4 text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-tight">{data.headerTitle}</h1>
          <p className="mt-4 max-w-2xl text-[#555]">{data.excerpt}</p>
        </div>
      </header>

      {/* Giant comparison table */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="text-center text-sm font-bold uppercase tracking-wider text-[#888]">Before vs After</h2>
        <div className="mt-8 overflow-hidden rounded-2xl border-2 border-[#E5E5E5] bg-white shadow-xl">
          <div className="grid grid-cols-3 bg-[#111] text-white">
            <div className="p-4 text-xs font-bold uppercase tracking-wider">Metric</div>
            <div className="flex items-center justify-center gap-2 border-l border-white/10 p-4 text-xs font-bold uppercase tracking-wider text-red-300">
              <ArrowDown className="h-4 w-4" /> Before
            </div>
            <div className="flex items-center justify-center gap-2 border-l border-white/10 p-4 text-xs font-bold uppercase tracking-wider text-emerald-300">
              <ArrowUp className="h-4 w-4" /> After
            </div>
          </div>
          {rows.map((row, i) => (
            <div key={i} className={`grid grid-cols-3 border-t border-[#E5E5E5] ${i % 2 === 0 ? "bg-white" : "bg-[#FAFAFA]"}`}>
              <div className="p-5 font-semibold">{row.metric}</div>
              <div className="border-l border-[#E5E5E5] p-5 text-center">
                <span className="inline-block rounded-lg bg-red-50 px-4 py-2 text-lg font-bold text-red-700">{row.before}</span>
              </div>
              <div className="border-l border-[#E5E5E5] p-5 text-center">
                <span className="inline-block rounded-lg bg-emerald-50 px-4 py-2 text-lg font-bold text-emerald-700">{row.after}</span>
              </div>
            </div>
          ))}
        </div>

        {/* ROI summary cards */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {data.impactMetrics.slice(0, 3).map((m, i) => (
            <div key={i} className="rounded-xl border-2 border-[#0F172A] bg-slate-50 p-6 text-center">
              <div className="text-4xl font-black tabular-nums text-[#0F172A]">{m.value}</div>
              <div className="mt-2 text-sm font-medium text-[#555]">{m.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Compact narrative */}
      <section className="bg-[#111] py-16 text-white">
        <div className="mx-auto grid max-w-5xl gap-10 px-6 md:grid-cols-2">
          <div>
            <h2 className="text-lg font-bold text-[#0F172A]">{data.challengeHeading}</h2>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              {data.challengeCards.map((c, i) => (
                <li key={i}>• {c.title}: {c.description}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-bold text-emerald-400">{data.solutionHeading}</h2>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              {data.solutionNodes.map((n, i) => (
                <li key={i}>• {n.title}: {n.description}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-14">
        <h2 className="font-bold">Technology</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {data.technologies.map((t) => (
            <div key={t} className="flex items-center gap-2 rounded-lg border border-[#E5E5E5] px-4 py-2">
              <TechLogo name={t} className="h-7 w-7" />
              <span className="text-sm font-medium">{t}</span>
            </div>
          ))}
        </div>
        {data.testimonial?.quote ? (
          <blockquote className="mt-10 rounded-xl bg-[#F5F5F5] p-8 text-lg font-medium">
            &ldquo;{data.testimonial.quote}&rdquo;
            <footer className="mt-3 text-sm font-normal text-[#666]">— {data.testimonial.name}</footer>
          </blockquote>
        ) : null}
      </section>

      {data.related.length > 0 ? (
        <section className="border-t border-[#E5E5E5] py-12">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="font-bold">Similar automation wins</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {data.related.slice(0, 3).map((r) => (
                <Link key={r._id} href={`/case-studies/${r.slug.current}`} className="rounded-lg border border-[#E5E5E5] p-4 transition-colors hover:border-[#0F172A]">
                  {r.client || r.title}
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <LayoutFooter faqs={data.faqs} />
    </article>
  )
}
