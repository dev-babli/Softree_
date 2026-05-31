"use client"

import Link from "next/link"
import { CheckCircle2 } from "lucide-react"
import type { CaseStudyLayoutData } from "../../types"
import { LayoutFooter } from "../../layout-shared/LayoutFooter"
import { Reveal } from "../../layout-shared/motion"
import { TechLogo } from "../../shared/PowerPlatformLogos"

const PHASES = ["Discovery", "Design", "Build", "Deploy", "Optimize"]

/** Vertical timeline — dated milestones, process spine, agile delivery narrative */
export function VerticalTimelinePage({ data }: { data: CaseStudyLayoutData }) {
  const nodes = data.solutionNodes.length > 0 ? data.solutionNodes : data.deliverables

  return (
    <article className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#0284C7]">Multi-phase delivery</p>
          <h1 className="mt-4 text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight">{data.headerTitle}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-[#64748B]">{data.excerpt}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
            <span className="rounded-full bg-sky-100 px-4 py-1.5 font-medium text-sky-800">{data.snapshot.duration}</span>
            <span className="rounded-full bg-slate-100 px-4 py-1.5 font-medium text-slate-700">{data.snapshot.teamSize} team</span>
          </div>
        </div>
      </header>

      {/* Challenge summary */}
      <section className="mx-auto max-w-3xl px-6 py-16">
        <h2 className="text-xl font-bold text-[#0284C7]">{data.challengeHeading}</h2>
        <p className="mt-3 text-[#64748B]">{data.challengeSubheading}</p>
        <ul className="mt-6 space-y-2">
          {data.challengeCards.map((c, i) => (
            <li key={i} className="flex gap-3 text-sm">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sky-500" />
              <span><strong>{c.title}</strong> — {c.description}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Timeline spine */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-12 text-center text-2xl font-bold">{data.solutionHeading}</h2>
          <div className="relative">
            <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-sky-400 via-sky-500 to-sky-300 md:left-1/2 md:-translate-x-px" />
            {nodes.map((node, i) => (
              <Reveal key={i} delay={i * 0.08} className={`relative mb-12 flex gap-8 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                <div className={`hidden flex-1 md:block ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                  {i % 2 === 0 ? (
                    <>
                      <div className="text-xs font-bold uppercase tracking-wider text-sky-600">{PHASES[i % PHASES.length]}</div>
                      <h3 className="mt-1 text-lg font-bold">{node.title}</h3>
                      <p className="mt-2 text-sm text-[#64748B]">{node.description}</p>
                    </>
                  ) : null}
                </div>
                <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-4 border-white bg-sky-500 text-sm font-bold text-white shadow-lg md:absolute md:left-1/2 md:-translate-x-1/2">
                  {i + 1}
                </div>
                <div className={`flex-1 md:pl-12 ${i % 2 === 0 ? "md:hidden" : "md:pr-12 md:text-right md:pl-0"}`}>
                  <div className="text-xs font-bold uppercase tracking-wider text-sky-600">{PHASES[i % PHASES.length]}</div>
                  <h3 className="mt-1 text-lg font-bold">{node.title}</h3>
                  <p className="mt-2 text-sm text-[#64748B]">{node.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Results milestones */}
      <section className="bg-sky-950 py-20 text-white">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-center text-2xl font-bold">{data.impactHeading}</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {data.impactMetrics.map((m, i) => (
              <div key={i} className="rounded-xl border border-sky-800 bg-sky-900/50 p-6 text-center">
                <div className="text-3xl font-bold text-sky-300">{m.value}</div>
                <div className="mt-2 text-sm text-sky-200/80">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16">
        <h2 className="font-bold">Stack & tools</h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {data.technologies.map((t) => (
            <div key={t} className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 shadow-sm ring-1 ring-slate-200">
              <TechLogo name={t} className="h-6 w-6" />
              <span className="text-sm font-medium">{t}</span>
            </div>
          ))}
        </div>
        {data.testimonial?.quote ? (
          <blockquote className="mt-12 border-l-4 border-sky-500 pl-6 italic text-[#475569]">
            &ldquo;{data.testimonial.quote}&rdquo;
            <footer className="mt-2 text-sm not-italic font-semibold text-[#0F172A]">— {data.testimonial.name}</footer>
          </blockquote>
        ) : null}
      </section>

      {data.related.length > 0 ? (
        <section className="border-t border-slate-200 py-14">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="font-bold">Related deliveries</h2>
            <div className="mt-6 space-y-3">
              {data.related.slice(0, 3).map((r) => (
                <Link key={r._id} href={`/case-studies/${r.slug.current}`} className="block rounded-lg border border-slate-200 p-4 transition-colors hover:border-sky-400">
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
