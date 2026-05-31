"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Smartphone } from "lucide-react"
import type { CaseStudyLayoutData } from "../../types"
import { LayoutFooter } from "../../layout-shared/LayoutFooter"
import { galleryOrFallback, heroImage } from "../../layout-shared/images"
import { Reveal } from "../../layout-shared/motion"
import { TechLogo } from "../../shared/PowerPlatformLogos"

/** Product launch — 50/50 hero, device mockup, app screenshot grid */
export function SplitHeroMockupPage({ data }: { data: CaseStudyLayoutData }) {
  const hero = heroImage(data)
  const shots = galleryOrFallback(data.gallery, 6)

  return (
    <article className="min-h-screen bg-[#FAFAFE] text-[#0F172A]">
      {/* Split hero */}
      <header className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.07]"
          style={{ background: "linear-gradient(135deg, #6366F1, #EC4899)" }}
        />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:py-28">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-indigo-700">
              <Smartphone className="h-3.5 w-3.5" /> Mobile & Web App
            </span>
            <h1 className="mt-6 text-[clamp(2.25rem,5vw,3.75rem)] font-extrabold leading-[1.05] tracking-[-0.03em]">
              {data.headerTitle}
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-[#64748B]">{data.excerpt}</p>
            <a
              href={data.cta.buttonHref}
              className="mt-8 inline-flex items-center gap-2 rounded-2xl px-8 py-4 text-sm font-bold text-white shadow-xl shadow-indigo-500/25 transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 active:scale-[0.98] motion-reduce:transform-none"
              style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)" }}
            >
              {data.cta.buttonText}
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <div className="mt-10 flex flex-wrap gap-8">
              {data.highlights.slice(0, 3).map((h, i) => (
                <div key={i}>
                  <div className="text-3xl font-extrabold text-indigo-600">{h.value}</div>
                  <div className="text-sm text-[#64748B]">{h.label}</div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Device mockup */}
          <Reveal delay={0.1} className="relative flex justify-center lg:justify-end">
            <div className="relative w-[280px] rounded-[2.5rem] border-[10px] border-[#1E1E2E] bg-[#1E1E2E] p-2 shadow-2xl shadow-indigo-500/20 md:w-[320px]">
              <div className="absolute left-1/2 top-3 h-6 w-24 -translate-x-1/2 rounded-full bg-[#1E1E2E]" />
              <div className="relative aspect-[9/19] overflow-hidden rounded-[1.75rem] bg-white">
                <Image src={hero} alt={data.client} fill className="object-cover" priority sizes="320px" />
              </div>
            </div>
            <div className="absolute -right-4 top-1/4 hidden h-48 w-72 overflow-hidden rounded-xl border border-white/20 bg-white shadow-2xl lg:block">
              <Image src={shots[1]?.url || hero} alt="" fill className="object-cover" sizes="288px" />
            </div>
          </Reveal>
        </div>
      </header>

      {/* Screenshot grid */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-center text-2xl font-bold">Product in action</h2>
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-6">
            {shots.map((s, i) => (
              <Reveal key={i} delay={i * 0.05} className={i === 0 ? "col-span-2 row-span-2 md:col-span-1 md:row-span-1" : ""}>
                <div className={`relative overflow-hidden rounded-2xl bg-slate-100 shadow-lg ${i === 0 ? "aspect-[4/3] md:aspect-square" : "aspect-square"}`}>
                  <Image src={s.url} alt={s.alt || ""} fill className="object-cover" sizes="400px" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Challenge / Solution cards */}
      <section className="py-20" style={{ background: "linear-gradient(180deg, #FAFAFE 0%, #EEF2FF 100%)" }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold">{data.challengeHeading}</h2>
              <div className="mt-6 space-y-4">
                {data.challengeCards.map((c, i) => (
                  <div key={i} className="rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm">
                    <h3 className="font-bold text-indigo-900">{c.title}</h3>
                    <p className="mt-2 text-[#64748B]">{c.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold">{data.solutionHeading}</h2>
              <div className="mt-6 space-y-3">
                {data.solutionNodes.map((n, i) => (
                  <div key={i} className="flex gap-4 rounded-2xl bg-white/80 p-5 backdrop-blur">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-sm font-bold text-white">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-bold">{n.title}</h3>
                      <p className="mt-1 text-sm text-[#64748B]">{n.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics strip */}
      <section className="bg-indigo-600 py-16 text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-12 px-6">
          {data.impactMetrics.map((m, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl font-extrabold">{m.value}</div>
              <div className="mt-1 text-sm text-indigo-200">{m.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Tech + testimonial */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="text-xl font-bold">Built with</h2>
        <div className="mt-6 flex flex-wrap gap-4">
          {data.technologies.map((t) => (
            <div key={t} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-3 shadow-sm">
              <TechLogo name={t} className="h-8 w-8" />
              <span className="font-semibold">{t}</span>
            </div>
          ))}
        </div>
        {data.testimonial?.quote ? (
          <blockquote className="mt-16 rounded-3xl bg-gradient-to-br from-indigo-50 to-purple-50 p-10 text-xl font-medium leading-relaxed text-indigo-950">
            &ldquo;{data.testimonial.quote}&rdquo;
            <footer className="mt-4 text-base font-normal text-[#64748B]">
              {data.testimonial.name} · {data.testimonial.role}
            </footer>
          </blockquote>
        ) : null}
      </section>

      {data.related.length > 0 ? (
        <section className="border-t border-slate-200 bg-white py-16">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-xl font-bold">More launches</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {data.related.slice(0, 3).map((r) => (
                <Link key={r._id} href={`/case-studies/${r.slug.current}`} className="group overflow-hidden rounded-2xl border border-slate-200">
                  <div className="relative aspect-video bg-slate-100">
                    {(r.mainImageUrl || r.mainImage?.asset?.url) && (
                      <Image src={r.mainImageUrl || r.mainImage!.asset!.url!} alt="" fill className="object-cover transition-transform group-hover:scale-105" sizes="400px" />
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold">{r.client || r.title}</h3>
                  </div>
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
