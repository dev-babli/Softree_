"use client"

import Image from "next/image"
import Link from "next/link"
import { Play } from "lucide-react"
import type { CaseStudyLayoutData } from "../../types"
import { LayoutFooter } from "../../layout-shared/LayoutFooter"
import { GALLERY_IMAGES, heroImage } from "../../layout-shared/images"
import { Reveal } from "../../layout-shared/motion"
import { TechLogo } from "../../shared/PowerPlatformLogos"

/** Cinematic — full-viewport hero, minimal overlay, scroll chapters */
export function VideoHeroPage({ data }: { data: CaseStudyLayoutData }) {
  const hero = heroImage(data)
  const chapters = [
    { label: "The Challenge", heading: data.challengeHeading, body: data.challengeSubheading, items: data.challengeCards },
    { label: "The Solution", heading: data.solutionHeading, body: "Crafted for impact", items: data.solutionNodes },
    { label: "The Impact", heading: data.impactHeading, body: "Measurable outcomes", items: data.impactMetrics.map((m) => ({ title: m.value, description: m.label })) },
  ]

  return (
    <article className="min-h-screen bg-black text-white">
      {/* Full viewport cinematic hero */}
      <header className="relative flex min-h-screen items-end">
        <Image src={hero} alt={data.client} fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-24 pt-32">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/60">Brand experience</p>
          <h1 className="mt-6 max-w-4xl text-[clamp(2.5rem,7vw,5.5rem)] font-light leading-[1.02] tracking-[-0.02em]">
            {data.headerTitle}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/70">{data.excerpt}</p>
          {data.videoUrl ? (
            <a href={data.videoUrl} className="mt-10 inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-medium backdrop-blur transition-colors hover:bg-white/20">
              <Play className="h-4 w-4 fill-white" /> Watch film
            </a>
          ) : (
            <div className="mt-10 inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-medium backdrop-blur">
              <Play className="h-4 w-4 fill-white" /> Experience story
            </div>
          )}
          <div className="mt-16 flex gap-12">
            {data.highlights.slice(0, 3).map((h, i) => (
              <div key={i}>
                <div className="text-3xl font-light">{h.value}</div>
                <div className="mt-1 text-xs uppercase tracking-wider text-white/50">{h.label}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Scroll chapters */}
      {chapters.map((ch, ci) => (
        <section key={ci} className={`py-32 ${ci % 2 === 0 ? "bg-[#0A0A0A]" : "bg-black"}`}>
          <Reveal className="mx-auto max-w-4xl px-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#F472B6]">{ch.label}</p>
            <h2 className="mt-4 text-4xl font-light">{ch.heading}</h2>
            <p className="mt-4 text-white/60">{ch.body}</p>
            <div className="mt-12 space-y-8">
              {ch.items.slice(0, 3).map((item, i) => (
                <div key={i} className="border-t border-white/10 pt-8">
                  <h3 className="text-xl font-medium">{item.title}</h3>
                  <p className="mt-2 text-white/55 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </Reveal>
          {ci < 2 ? (
            <div className="relative mx-auto mt-16 aspect-[21/9] max-w-5xl overflow-hidden px-6">
              <Image src={GALLERY_IMAGES[(ci + 2) % 7]} alt="" fill className="object-cover opacity-80" sizes="1200px" />
            </div>
          ) : null}
        </section>
      ))}

      {data.testimonial?.quote ? (
        <section className="py-24 text-center">
          <blockquote className="mx-auto max-w-3xl px-6 text-2xl font-light italic text-white/90">
            &ldquo;{data.testimonial.quote}&rdquo;
          </blockquote>
          <p className="mt-6 text-sm text-white/50">{data.testimonial.name}</p>
        </section>
      ) : null}

      <section className="border-t border-white/10 py-16">
        <div className="mx-auto max-w-4xl px-6">
          <p className="text-xs uppercase tracking-wider text-white/40">Technologies</p>
          <div className="mt-6 flex flex-wrap gap-4">
            {data.technologies.map((t) => (
              <div key={t} className="flex items-center gap-2 text-sm text-white/70">
                <TechLogo name={t} className="h-6 w-6" /> {t}
              </div>
            ))}
          </div>
        </div>
      </section>

      {data.related.length > 0 ? (
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-sm uppercase tracking-wider text-white/40">More experiences</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {data.related.slice(0, 3).map((r) => (
                <Link key={r._id} href={`/case-studies/${r.slug.current}`} className="group relative aspect-[4/5] overflow-hidden bg-zinc-900">
                  {(r.mainImageUrl || r.mainImage?.asset?.url) && (
                    <Image src={r.mainImageUrl || r.mainImage!.asset!.url!} alt="" fill className="object-cover opacity-70 transition-opacity group-hover:opacity-100" sizes="400px" />
                  )}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black p-4">
                    <span className="text-sm font-medium">{r.client || r.title}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <LayoutFooter faqs={data.faqs} faqWrapperClassName="bg-black" ctaWrapperClassName="bg-black" />
    </article>
  )
}
