"use client"

import Image from "next/image"
import Link from "next/link"
import type { CaseStudyLayoutData } from "../../types"
import { LayoutFooter } from "../../layout-shared/LayoutFooter"
import { GALLERY_IMAGES, galleryOrFallback, heroImage } from "../../layout-shared/images"
import { Reveal } from "../../layout-shared/motion"
import { TechLogo } from "../../shared/PowerPlatformLogos"

/** Magazine editorial — full-bleed alternating chapters, serif headings, pull quotes */
export function ZigzagAlternatingPage({ data }: { data: CaseStudyLayoutData }) {
  const imgs = galleryOrFallback(data.gallery, 5)
  const chapters = [
    { title: data.challengeHeading, sub: data.challengeSubheading, items: data.challengeCards, img: imgs[0]?.url },
    { title: data.solutionHeading, sub: "How we transformed the operation", items: data.solutionNodes, img: imgs[1]?.url },
    { title: data.deliverablesHeading, sub: "Key deliverables shipped", items: data.deliverables, img: imgs[2]?.url },
  ]

  return (
    <article className="min-h-screen bg-[#F5F0E8] text-[#1A1612]">
      {/* Magazine cover hero */}
      <header className="relative flex min-h-[70vh] items-end bg-[#1A1612] text-[#F5F0E8]">
        <Image src={heroImage(data)} alt={data.client} fill className="object-cover opacity-50" priority sizes="100vw" />
        <div className="relative mx-auto w-full max-w-6xl px-6 pb-20 pt-32">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C4A574]">Transformation story</p>
          <h1 className="mt-6 max-w-4xl font-serif text-[clamp(2.5rem,6vw,5rem)] font-light leading-[1.05] italic">
            {data.headerTitle}
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/75">{data.excerpt}</p>
        </div>
      </header>

      {/* Pull quote band */}
      {data.testimonial?.quote ? (
        <section className="border-y border-[#1A1612]/10 bg-white py-16">
          <blockquote className="mx-auto max-w-4xl px-6 text-center font-serif text-[clamp(1.5rem,3vw,2.25rem)] font-light italic leading-snug text-[#1A1612]">
            &ldquo;{data.testimonial.quote}&rdquo;
          </blockquote>
        </section>
      ) : null}

      {/* Zigzag chapters */}
      {chapters.map((ch, ci) => (
        <section key={ci} className={ci % 2 === 0 ? "bg-[#F5F0E8]" : "bg-white"}>
          <div className={`mx-auto grid max-w-7xl grid-cols-1 items-center gap-0 lg:grid-cols-2 ${ci % 2 === 1 ? "lg:[direction:rtl]" : ""}`}>
            <div className={`relative min-h-[400px] lg:min-h-[560px] ${ci % 2 === 1 ? "lg:[direction:ltr]" : ""}`}>
              <Image src={ch.img || GALLERY_IMAGES[ci % 7]} alt="" fill className="object-cover" sizes="50vw" />
            </div>
            <div className={`px-8 py-16 lg:px-16 ${ci % 2 === 1 ? "lg:[direction:ltr]" : ""}`}>
              <Reveal>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9A7B4F]">Chapter {ci + 1}</span>
                <h2 className="mt-4 font-serif text-4xl font-light">{ch.title}</h2>
                <p className="mt-3 text-[#6B6358]">{ch.sub}</p>
                <div className="mt-8 space-y-6">
                  {ch.items.slice(0, 3).map((item, i) => (
                    <div key={i} className="border-l-2 border-[#9A7B4F] pl-5">
                      <h3 className="font-serif text-xl">{item.title}</h3>
                      <p className="mt-2 text-[#6B6358] leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      ))}

      {/* Impact editorial spread */}
      <section className="bg-[#1A1612] py-24 text-[#F5F0E8]">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h2 className="font-serif text-4xl font-light">{data.impactHeading}</h2>
          <div className="mt-14 grid grid-cols-2 gap-8 md:grid-cols-4">
            {data.impactMetrics.map((m, i) => (
              <div key={i}>
                <div className="font-serif text-5xl font-light tabular-nums text-[#C4A574]">{m.value}</div>
                <div className="mt-2 text-sm uppercase tracking-wider text-white/60">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-serif text-2xl">Technology stack</h2>
          <div className="mt-8 flex flex-wrap gap-4">
            {data.technologies.map((t) => (
              <div key={t} className="flex items-center gap-2 border border-[#1A1612]/15 px-4 py-2">
                <TechLogo name={t} className="h-7 w-7" />
                <span className="text-sm font-medium">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {data.related.length > 0 ? (
        <section className="border-t border-[#1A1612]/10 py-16">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="font-serif text-2xl">More stories</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {data.related.slice(0, 3).map((r) => (
                <Link key={r._id} href={`/case-studies/${r.slug.current}`} className="group">
                  <div className="relative aspect-[3/4] overflow-hidden bg-[#E8E0D4]">
                    {(r.mainImageUrl || r.mainImage?.asset?.url) && (
                      <Image src={r.mainImageUrl || r.mainImage!.asset!.url!} alt="" fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="400px" />
                    )}
                  </div>
                  <h3 className="mt-4 font-serif text-lg">{r.client || r.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <LayoutFooter faqs={data.faqs} faqWrapperClassName="bg-[#F5F0E8]" />
    </article>
  )
}
