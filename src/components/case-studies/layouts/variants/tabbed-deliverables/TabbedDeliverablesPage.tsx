"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Layers, Workflow, BarChart3, Shield, Zap } from "lucide-react"
import type { CaseStudyLayoutData } from "../../types"
import { LayoutFooter } from "../../layout-shared/LayoutFooter"
import { heroImage } from "../../layout-shared/images"
import { TechLogo } from "../../shared/PowerPlatformLogos"

const TAB_ICONS = [Layers, Workflow, BarChart3, Shield, Zap]

/** SaaS product page — tabbed feature sections, icon grids per tab */
export function TabbedDeliverablesPage({ data }: { data: CaseStudyLayoutData }) {
  const tabs = [
    { id: "overview", label: "Overview", items: data.challengeCards },
    { id: "platform", label: "Platform", items: data.solutionNodes },
    { id: "deliverables", label: "Deliverables", items: data.deliverables },
    { id: "results", label: "Results", items: data.impactMetrics.map((m) => ({ title: m.value, description: m.label })) },
  ]
  const [active, setActive] = useState(tabs[0].id)
  const current = tabs.find((t) => t.id === active) || tabs[0]

  return (
    <article className="min-h-screen bg-[#F4F4F5] text-[#18181B]">
      {/* SaaS hero */}
      <header className="bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 py-20 lg:grid-cols-2">
          <div>
            <span className="rounded-md bg-violet-100 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-violet-700">
              Power Platform Suite
            </span>
            <h1 className="mt-5 text-[clamp(2rem,4vw,3.25rem)] font-bold leading-tight tracking-tight">{data.headerTitle}</h1>
            <p className="mt-4 text-lg text-[#71717A]">{data.excerpt}</p>
            <div className="mt-8 flex gap-4">
              {data.highlights.slice(0, 2).map((h, i) => (
                <div key={i} className="rounded-xl bg-zinc-50 px-5 py-3 ring-1 ring-zinc-200">
                  <div className="text-2xl font-bold text-violet-600">{h.value}</div>
                  <div className="text-xs text-[#71717A]">{h.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-2xl bg-zinc-100 shadow-2xl ring-1 ring-zinc-200">
            <Image src={heroImage(data)} alt={data.client} fill className="object-cover" priority sizes="600px" />
          </div>
        </div>
      </header>

      {/* Tab bar */}
      <div className="sticky top-0 z-20 border-b border-zinc-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActive(tab.id)}
              className={`shrink-0 border-b-2 px-5 py-4 text-sm font-semibold transition-[color,border-color,transform] duration-200 active:scale-[0.98] motion-reduce:transform-none ${
                active === tab.id ? "border-violet-600 text-violet-600" : "border-transparent text-[#71717A] hover:text-[#18181B]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content — icon grid */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {current.items.map((item, i) => {
            const Icon = TAB_ICONS[i % TAB_ICONS.length]
            return (
              <div key={i} className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-zinc-200 transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-md motion-reduce:transform-none">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-bold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#71717A]">{item.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Tech logos row */}
      <section className="border-y border-zinc-200 bg-white py-12">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-center text-xs font-bold uppercase tracking-wider text-[#71717A]">Powered by</p>
          <div className="mt-6 flex flex-wrap justify-center gap-6">
            {data.technologies.map((t) => (
              <div key={t} className="flex flex-col items-center gap-2">
                <TechLogo name={t} className="h-10 w-10" />
                <span className="text-xs font-medium">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {data.testimonial?.quote ? (
        <section className="mx-auto max-w-3xl px-6 py-16 text-center">
          <blockquote className="text-xl font-medium text-[#18181B]">&ldquo;{data.testimonial.quote}&rdquo;</blockquote>
          <p className="mt-4 text-sm text-[#71717A]">{data.testimonial.name} · {data.testimonial.role}</p>
        </section>
      ) : null}

      {data.related.length > 0 ? (
        <section className="bg-white py-14">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="font-bold">Explore more platforms</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {data.related.slice(0, 3).map((r) => (
                <Link key={r._id} href={`/case-studies/${r.slug.current}`} className="rounded-xl bg-zinc-50 p-5 ring-1 ring-zinc-200 hover:ring-violet-300">
                  <h3 className="font-semibold">{r.client || r.title}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-[#71717A]">{r.excerpt}</p>
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
