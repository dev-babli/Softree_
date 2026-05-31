"use client"

import Image from "next/image"
import type { CaseStudyLayoutData } from "../../../types"
import { PageContainer, Reveal } from "../shared"

/** Matches classic Softree case study testimonial card */
export function TestimonialSection({ data }: { data: CaseStudyLayoutData }) {
  const t = data.testimonial
  if (!t?.quote) return null

  const imageSrc =
    t.avatarUrl || data.sectionImages?.testimonial || "/Gallery/Prestige Bangalore-1.webp"

  return (
    <section id="testimonial" className="scroll-mt-24 bg-[var(--softree-bg-light,#fafaf9)] py-16 md:py-24">
      <PageContainer>
        <Reveal>
          <figure className="overflow-hidden rounded-[14px] border border-[#e6e1f2] bg-[#f3eefe] md:p-2">
            <div className="grid gap-8 p-6 md:grid-cols-[1fr_200px] md:items-center md:p-8">
              <blockquote>
                <p className="text-[1.1rem] font-medium leading-[1.6] text-[#2a1f82] md:text-[1.18rem]">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <figcaption className="mt-5">
                  {t.name ? (
                    <p className="text-[0.95rem] font-bold text-[#0d0a23]">{t.name}</p>
                  ) : null}
                  <p className="text-[0.85rem] text-[#6b7694]">
                    {[t.role, t.company].filter(Boolean).join(" · ")}
                    {t.location ? ` · ${t.location}` : ""}
                  </p>
                </figcaption>
              </blockquote>
              <div className="relative mx-auto aspect-square w-full max-w-[200px] overflow-hidden rounded-[14px] bg-white ring-1 ring-[#e6e1f2]">
                <Image
                  src={imageSrc}
                  alt={t.name || "Client"}
                  fill
                  className="object-cover"
                  sizes="200px"
                />
              </div>
            </div>
          </figure>
        </Reveal>
      </PageContainer>
    </section>
  )
}
