"use client"

import Image from "next/image"
import Link from "next/link"
import { Quote } from "lucide-react"
import type { CaseStudyLayoutData } from "../../types"
import { LayoutFooter } from "../../layout-shared/LayoutFooter"
import { TechLogo } from "../../shared/PowerPlatformLogos"
import { SIDEBAR_TOKENS, sidebarCssVars } from "./tokens"

const META = (data: CaseStudyLayoutData) => [
  { label: "Client", value: data.client },
  { label: "Industry", value: data.snapshot.industry || data.industry || "—" },
  { label: "Duration", value: data.snapshot.duration || "—" },
  { label: "Team", value: data.snapshot.teamSize || "—" },
  { label: "Region", value: data.snapshot.region || "—" },
  { label: "Users", value: data.snapshot.users || "—" },
]

/** Notion/docs style — narrow content column, sticky spec sidebar, minimal compliance doc feel */
export function SidebarMetadataPage({ data }: { data: CaseStudyLayoutData }) {
  return (
    <article className="min-h-screen bg-[#FBFBFA] text-[#37352F]" style={sidebarCssVars}>
      {/* Minimal doc header */}
      <header className="border-b border-[#E8E8E5] bg-white">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#787774]">
            Case study · {data.snapshot.projectType || data.category || "Enterprise"}
          </p>
          <h1 className="mt-4 font-serif text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.15] tracking-[-0.02em]">
            {data.headerTitle}
          </h1>
          <p className="mt-5 max-w-2xl text-[1.05rem] leading-relaxed text-[#787774]">{data.excerpt}</p>
        </div>
      </header>

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-0 lg:grid-cols-[220px_minmax(0,1fr)]">
        {/* Sticky metadata sidebar */}
        <aside className="border-b border-[#E8E8E5] bg-[#F7F6F3] px-6 py-8 lg:sticky lg:top-24 lg:self-start lg:border-b-0 lg:border-r lg:py-12">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.18em] text-[#787774]">Project spec</p>
          <dl className="space-y-4">
            {META(data).map((m) => (
              <div key={m.label}>
                <dt
                  className="text-[10px] font-medium uppercase tracking-wider text-[#787774]"
                  style={{ fontFamily: SIDEBAR_TOKENS.mono }}
                >
                  {m.label}
                </dt>
                <dd className="mt-0.5 text-[13px] font-medium text-[#37352F]">{m.value}</dd>
              </div>
            ))}
          </dl>
        </aside>

        {/* Narrow narrative column */}
        <main className="px-6 py-10 md:py-14">
          <section className="max-w-[640px]">
            <h2 className="text-lg font-semibold text-[#37352F]">{data.challengeHeading}</h2>
            <p className="mt-2 text-sm text-[#787774]">{data.challengeSubheading}</p>
            <ul className="mt-6 space-y-3">
              {data.challengeCards.map((c, i) => (
                <li key={i} className="rounded-md border border-[#E8E8E5] bg-white px-4 py-3 text-[14px] leading-relaxed">
                  <strong className="font-semibold">{c.title}</strong>
                  <span className="text-[#787774]"> — {c.description}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-14 max-w-[640px]">
            <h2 className="text-lg font-semibold">{data.solutionHeading}</h2>
            <ol className="mt-6 space-y-4 border-l-2 border-[#E8E8E5] pl-5">
              {data.solutionNodes.map((n, i) => (
                <li key={i} className="text-[14px] leading-relaxed">
                  <span className="font-semibold">{n.title}</span>
                  <p className="mt-1 text-[#787774]">{n.description}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-14 max-w-[640px]">
            <h2 className="text-lg font-semibold">{data.impactHeading}</h2>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {data.impactMetrics.map((m, i) => (
                <div key={i} className="rounded-md border border-[#E8E8E5] bg-white p-4 text-center">
                  <div className="text-2xl font-bold tabular-nums" style={{ color: SIDEBAR_TOKENS.accent }}>
                    {m.value}
                  </div>
                  <div className="mt-1 text-[11px] text-[#787774]">{m.label}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-14 max-w-[640px]">
            <h2 className="text-lg font-semibold">Technology</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {data.technologies.map((t) => (
                <div key={t} className="flex items-center gap-2 rounded-md border border-[#E8E8E5] bg-white px-3 py-2">
                  <TechLogo name={t} className="h-6 w-6" />
                  <span className="text-[12px] font-medium">{t}</span>
                </div>
              ))}
            </div>
          </section>

          {data.testimonial?.quote ? (
            <blockquote
              className="mt-14 max-w-[640px] border-l-4 pl-5 italic text-[#37352F]"
              style={{ borderColor: SIDEBAR_TOKENS.accent }}
            >
              <Quote className="mb-2 h-5 w-5" style={{ color: SIDEBAR_TOKENS.accent }} aria-hidden />
              &ldquo;{data.testimonial.quote}&rdquo;
              <footer className="mt-3 text-[13px] not-italic text-[#787774]">
                — {data.testimonial.name}, {data.testimonial.role}
              </footer>
            </blockquote>
          ) : null}
        </main>
      </div>

      {data.related.length > 0 ? (
        <section className="border-t border-[#E8E8E5] bg-white py-14">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[#787774]">Related studies</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {data.related.slice(0, 3).map((r) => (
                <Link
                  key={r._id}
                  href={`/case-studies/${r.slug.current}`}
                  className="rounded-md border border-[#E8E8E5] p-4 text-[13px] transition-[border-color,box-shadow] duration-200 hover:border-indigo-500 hover:shadow-sm"
                >
                  <div className="font-semibold">{r.client || r.title}</div>
                  <div className="mt-1 line-clamp-2 text-[#787774]">{r.excerpt}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <LayoutFooter faqs={data.faqs} faqWrapperClassName="bg-[#FBFBFA]" />
    </article>
  )
}
