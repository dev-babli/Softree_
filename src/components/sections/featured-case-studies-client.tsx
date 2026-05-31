"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { client } from "@/sanity/client"
import { featuredCaseStudiesNavQuery } from "@/sanity/queries"
import type { SanityNavCaseStudy } from "@/sanity/types"

export default function FeaturedCaseStudiesClient() {
  const [studies, setStudies] = useState<SanityNavCaseStudy[]>([])

  useEffect(() => {
    client
      .fetch<SanityNavCaseStudy[]>(featuredCaseStudiesNavQuery, {}, { cache: "no-store" })
      .then((data) => setStudies((data || []).slice(0, 3)))
      .catch(() => {})
  }, [])

  if (studies.length === 0) return null

  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(90,23,238,0.18),transparent_45%)]" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#FF7A2F]">
              Customer stories
            </p>
            <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-white md:text-4xl">
              Outcomes our clients publish
            </h2>
            <p className="mt-3 max-w-xl text-base leading-7 text-white/65">
              Real client outcomes across AI, Power Platform, mobile, web, and SharePoint.
            </p>
          </div>
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-[#FF7A2F]"
          >
            View all case studies
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {studies.map((study) => {
            const image = study.mainImage?.asset?.url || study.mainImageUrl
            const title = study.client || study.title
            const href = `/case-studies/${study.slug.current}`

            return (
              <Link
                key={study._id}
                href={href}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-colors hover:border-[#FF7A2F]/40"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#141414]">
                  {image ? (
                    <Image
                      src={image}
                      alt={study.mainImage?.alt || `${title} case study`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-white/40">
                      Case study
                    </div>
                  )}
                </div>
                <div className="p-5">
                  {study.industry ? (
                    <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#FF7A2F]">
                      {study.industry}
                    </p>
                  ) : null}
                  <h3 className="text-lg font-semibold text-white">{title}</h3>
                  {study.excerpt ? (
                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-white/60">{study.excerpt}</p>
                  ) : null}
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
