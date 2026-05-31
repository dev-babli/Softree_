"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion"
import type { CaseStudyLayoutData } from "../../../types"
import { PageContainer, Reveal } from "../shared"

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

export function CTASection({ data }: { data: CaseStudyLayoutData }) {
  return (
    <section id="contact" className="scroll-mt-24 bg-[var(--cs-bg)] px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <PageContainer wide>
        <Reveal>
          <div className="relative overflow-hidden rounded-[8px] bg-[var(--cs-dark)] text-white shadow-[0_34px_100px_-50px_rgba(0,0,0,0.75)]">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:radial-gradient(#fff_0.6px,transparent_0.6px)] [background-size:22px_22px]"
            />

            <div className="relative grid md:min-h-[420px] md:grid-cols-[1fr_1.1fr]">
              <div className="flex flex-col justify-between gap-10 p-8 sm:p-10 md:p-12 lg:p-14">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--cs-accent)]">
                    Next step
                  </p>
                  <h2 className="mt-4 font-[family-name:var(--cs-display)] text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.08] tracking-[-0.02em]">
                    {data.cta.headline}
                  </h2>
                  <p className="mt-4 max-w-md text-base leading-relaxed text-white/65">
                    {data.cta.subtext}
                  </p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Link
                    href={data.cta.buttonHref}
                    className="inline-flex items-center gap-2 rounded-full bg-[var(--cs-accent)] px-7 py-3.5 text-sm font-semibold text-[var(--cs-dark)] transition-transform duration-200 active:scale-[0.97] hover:bg-[#ff8f4d]"
                  >
                    {data.cta.buttonText}
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </Link>
                  <Link
                    href="/case-studies"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/8"
                  >
                    More case studies
                  </Link>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 1.02 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: EASE }}
                className="relative min-h-[240px] md:min-h-full"
              >
                <Image
                  src="/Gallery/Prestige Bangalore-6.webp"
                  alt="Manufacturing team reviewing digital operations dashboard"
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--cs-dark)] via-[var(--cs-dark)]/40 to-transparent md:via-transparent" />
              </motion.div>
            </div>
          </div>
        </Reveal>
      </PageContainer>
    </section>
  )
}
