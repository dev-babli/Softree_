"use client"

import Image from "next/image"
import Link from "next/link"
import { useScroll, useTransform, motion } from "framer-motion"
import { useRef } from "react"
import type { CaseStudyLayoutData } from "../../types"
import { LayoutFooter } from "../../layout-shared/LayoutFooter"
import { galleryOrFallback, heroImage } from "../../layout-shared/images"
import { TechLogo } from "../../shared/PowerPlatformLogos"

/** Portfolio UX case study — layered screenshots, parallax, creative spacing */
export function ParallaxScreenshotsPage({ data }: { data: CaseStudyLayoutData }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -80])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -140])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -60])
  const shots = galleryOrFallback(data.gallery, 5)

  return (
    <article className="min-h-screen bg-[#F3F0FF] text-[#2D2640]">
      {/* Creative hero */}
      <header className="relative overflow-hidden px-6 pb-32 pt-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#7C3AED]">UX / UI Design</p>
          <h1 className="mt-4 max-w-3xl text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[1.05] tracking-[-0.03em]">
            {data.headerTitle}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-[#6B6280]">{data.excerpt}</p>
        </div>
        {/* Floating hero screenshot */}
        <div className="relative mx-auto mt-12 max-w-4xl">
          <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-white shadow-2xl shadow-violet-500/20 ring-1 ring-violet-200">
            <Image src={heroImage(data)} alt={data.client} fill className="object-cover" priority sizes="900px" />
          </div>
        </div>
      </header>

      {/* Parallax screenshot stack */}
      <section ref={ref} className="relative min-h-[600px] py-24">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-16 text-center text-2xl font-bold">Interface exploration</h2>
          <div className="relative h-[480px]">
            <motion.div style={{ y: y1 }} className="absolute left-[5%] top-0 w-[55%] overflow-hidden rounded-2xl shadow-xl ring-1 ring-violet-200">
              <div className="relative aspect-[16/10]">
                <Image src={shots[0]?.url || heroImage(data)} alt="" fill className="object-cover" sizes="500px" />
              </div>
            </motion.div>
            <motion.div style={{ y: y2 }} className="absolute right-[5%] top-16 w-[45%] overflow-hidden rounded-2xl shadow-2xl ring-1 ring-violet-200">
              <div className="relative aspect-[4/3]">
                <Image src={shots[1]?.url || shots[0]?.url} alt="" fill className="object-cover" sizes="450px" />
              </div>
            </motion.div>
            <motion.div style={{ y: y3 }} className="absolute bottom-0 left-[25%] w-[50%] overflow-hidden rounded-2xl shadow-lg ring-1 ring-violet-200">
              <div className="relative aspect-[16/9]">
                <Image src={shots[2]?.url || shots[0]?.url} alt="" fill className="object-cover" sizes="500px" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Design process — angled cards */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl font-bold">{data.challengeHeading}</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {data.challengeCards.map((c, i) => (
              <div
                key={i}
                className="rounded-2xl bg-[#F3F0FF] p-8 transition-transform hover:-rotate-1"
                style={{ transform: `rotate(${i % 2 === 0 ? -1 : 1}deg)` }}
              >
                <span className="text-4xl font-black text-violet-200">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 text-lg font-bold">{c.title}</h3>
                <p className="mt-2 text-sm text-[#6B6280]">{c.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution + metrics */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl font-bold">{data.solutionHeading}</h2>
          <div className="mt-8 flex flex-wrap gap-4">
            {data.solutionNodes.map((n, i) => (
              <span key={i} className="rounded-full border-2 border-violet-300 bg-white px-5 py-2 text-sm font-medium">
                {n.title}
              </span>
            ))}
          </div>
          <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4">
            {data.impactMetrics.map((m, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-black text-[#7C3AED]">{m.value}</div>
                <div className="mt-1 text-xs uppercase tracking-wider text-[#6B6280]">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-violet-200 bg-white py-14">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-bold">Tools & stack</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {data.technologies.map((t) => (
              <div key={t} className="flex items-center gap-2 rounded-xl bg-[#F3F0FF] px-4 py-2">
                <TechLogo name={t} className="h-7 w-7" />
                <span className="text-sm font-medium">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {data.testimonial?.quote ? (
        <section className="mx-auto max-w-2xl px-6 py-16 text-center">
          <blockquote className="text-xl font-medium italic text-[#2D2640]">&ldquo;{data.testimonial.quote}&rdquo;</blockquote>
          <p className="mt-4 text-sm text-[#6B6280]">{data.testimonial.name}</p>
        </section>
      ) : null}

      {data.related.length > 0 ? (
        <section className="py-16">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="font-bold">More design work</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {data.related.slice(0, 3).map((r) => (
                <Link key={r._id} href={`/case-studies/${r.slug.current}`} className="group overflow-hidden rounded-2xl bg-white shadow-md">
                  <div className="relative aspect-video bg-violet-100">
                    {(r.mainImageUrl || r.mainImage?.asset?.url) && (
                      <Image src={r.mainImageUrl || r.mainImage!.asset!.url!} alt="" fill className="object-cover transition-transform group-hover:scale-105" sizes="400px" />
                    )}
                  </div>
                  <div className="p-4 font-semibold">{r.client || r.title}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <LayoutFooter faqs={data.faqs} faqWrapperClassName="bg-[#F3F0FF]" />
    </article>
  )
}
