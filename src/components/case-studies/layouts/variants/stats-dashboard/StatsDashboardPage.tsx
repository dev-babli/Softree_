"use client"

import Image from "next/image"
import Link from "next/link"
import type { CaseStudyLayoutData } from "../../types"
import { LayoutFooter } from "../../layout-shared/LayoutFooter"
import { heroImage } from "../../layout-shared/images"
import { TechLogo } from "../../shared/PowerPlatformLogos"

/** Executive briefing — KPI dashboard at top, compact corporate narrative */
export function StatsDashboardPage({ data }: { data: CaseStudyLayoutData }) {
  const allMetrics = [...data.highlights, ...data.impactMetrics].slice(0, 6)

  return (
    <article className="min-h-screen bg-[#F0F4F8] text-[#1B2838]">
      {/* Corporate navy header band */}
      <header className="bg-[#1B2838] text-white">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#94A3B8]">Enterprise rollout · {data.client}</p>
          <h1 className="mt-3 text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold leading-tight">{data.headerTitle}</h1>
        </div>
      </header>

      {/* KPI dashboard strip — overlaps header */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 -mt-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {allMetrics.map((m, i) => (
            <div
              key={i}
              className="rounded-xl border border-[#DDE4EC] bg-white p-5 shadow-[0_8px_24px_rgba(27,40,56,0.08)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(27,40,56,0.12)] motion-reduce:transform-none"
            >
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">{m.label}</div>
              <div className="mt-2 text-2xl font-bold tabular-nums text-[#1B2838]">{m.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Compact narrative + image */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_360px]">
          <div>
            <p className="text-[15px] leading-relaxed text-[#475569]">{data.excerpt}</p>
            <div className="mt-10 grid gap-8 md:grid-cols-2">
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-[#1B2838]">{data.challengeHeading}</h2>
                <ul className="mt-4 space-y-2 text-sm text-[#475569]">
                  {data.challengeCards.slice(0, 4).map((c, i) => (
                    <li key={i}>{c.title}: {c.description}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-[#1B2838]">{data.solutionHeading}</h2>
                <ul className="mt-4 space-y-2 text-sm text-[#475569]">
                  {data.solutionNodes.slice(0, 4).map((n, i) => (
                    <li key={i}>{n.title}: {n.description}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-[#DDE4EC] shadow-lg">
            <Image src={heroImage(data)} alt={data.client} fill className="object-cover" sizes="360px" />
          </div>
        </div>
      </section>

      {/* Project metadata bar */}
      <section className="border-y border-[#DDE4EC] bg-white py-8">
        <div className="mx-auto flex max-w-6xl flex-wrap gap-x-12 gap-y-4 px-6 text-sm">
          {[
            ["Industry", data.snapshot.industry],
            ["Duration", data.snapshot.duration],
            ["Team", data.snapshot.teamSize],
            ["Region", data.snapshot.region],
            ["Users", data.snapshot.users],
          ].map(([label, value]) => (
            <div key={label}>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">{label}</span>
              <div className="mt-0.5 font-semibold">{value || "—"}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="text-sm font-bold uppercase tracking-wider">Deliverables</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.deliverables.map((d, i) => (
            <div key={i} className="rounded-lg border border-[#DDE4EC] bg-white p-5">
              <h3 className="font-semibold">{d.title}</h3>
              <p className="mt-2 text-sm text-[#64748B]">{d.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#1B2838] py-12 text-white">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#94A3B8]">Technology stack</h2>
          <div className="mt-6 flex flex-wrap gap-4">
            {data.technologies.map((t) => (
              <div key={t} className="flex items-center gap-2 rounded-md bg-white/10 px-4 py-2">
                <TechLogo name={t} className="h-6 w-6" />
                <span className="text-sm">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {data.testimonial?.quote ? (
        <section className="mx-auto max-w-3xl px-6 py-14 text-center">
          <blockquote className="text-lg font-medium text-[#1B2838]">&ldquo;{data.testimonial.quote}&rdquo;</blockquote>
          <p className="mt-3 text-sm text-[#64748B]">{data.testimonial.name}, {data.testimonial.role}</p>
        </section>
      ) : null}

      {data.related.length > 0 ? (
        <section className="border-t border-[#DDE4EC] py-12">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-sm font-bold uppercase tracking-wider">Related briefings</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {data.related.slice(0, 3).map((r) => (
                <Link key={r._id} href={`/case-studies/${r.slug.current}`} className="rounded-lg border border-[#DDE4EC] bg-white p-4 hover:shadow-md">
                  <h3 className="font-semibold">{r.client || r.title}</h3>
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
