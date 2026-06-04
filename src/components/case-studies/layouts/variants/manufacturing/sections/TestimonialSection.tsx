"use client"

import Image from "next/image"
import type { CaseStudyLayoutData } from "../../../types"
import { PageContainer, Reveal } from "../shared"

export function TestimonialSection({ data }: { data: CaseStudyLayoutData }) {
  const t = data.testimonial
  if (!t?.quote) return null

  return (
    <section id="testimonial" className="scroll-mt-24 bg-white py-16 md:py-24">
      <PageContainer>
        <Reveal>
          <figure className="overflow-hidden rounded-2xl border border-[rgba(15,23,42,0.08)] bg-[#F7F6F3]">
            <div className="grid gap-8 p-8 md:grid-cols-[1fr_auto] md:items-center md:p-10 lg:gap-12">
              <blockquote>
                <p className="text-[1.2rem] font-medium leading-[1.55] tracking-[-0.01em] text-[#181818] md:text-[1.35rem]">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <figcaption className="mt-6 flex flex-wrap items-center gap-4">
                  {data.clientLogoUrl ? (
                    <div className="relative h-8 w-24 shrink-0 opacity-90">
                      <Image
                        src={data.clientLogoUrl}
                        alt={t.company || data.client}
                        fill
                        className="object-contain object-left"
                        sizes="96px"
                      />
                    </div>
                  ) : null}
                  <div>
                    {t.name ? (
                      <p className="text-[0.95rem] font-bold text-[#181818]">{t.name}</p>
                    ) : null}
                    <p className="text-[0.875rem] text-[var(--cs-text-muted,#64748b)]">
                      {[t.role, t.company].filter(Boolean).join(" · ")}
                      {t.location ? ` · ${t.location}` : ""}
                    </p>
                  </div>
                </figcaption>
              </blockquote>
            </div>
          </figure>
        </Reveal>
      </PageContainer>
    </section>
  )
}
