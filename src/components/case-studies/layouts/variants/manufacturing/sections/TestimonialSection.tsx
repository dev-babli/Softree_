"use client"

import Image from "next/image"
import type { CaseStudyLayoutData } from "../../../types"
import { PageContainer, Reveal } from "../shared"

export function TestimonialSection({
  data,
  surfaceClass = "bg-white",
}: {
  data: CaseStudyLayoutData
  surfaceClass?: string
}) {
  const t = data.testimonial
  if (!t?.quote) return null

  return (
    <section id="testimonial" className={`scroll-mt-24 py-16 md:py-24 ${surfaceClass}`}>
      <PageContainer>
        <Reveal variant="scale" distance={28}>
          <figure className="relative overflow-hidden rounded-2xl border border-[rgba(15,23,42,0.08)] bg-[#141414] px-8 py-10 text-white md:px-12 md:py-14">
            <span
              aria-hidden
              className="pointer-events-none absolute -left-2 top-4 font-serif text-[7rem] leading-none text-white/[0.07]"
            >
              &ldquo;
            </span>
            <blockquote className="relative max-w-3xl">
              <p className="font-serif text-[clamp(1.35rem,2.8vw,1.85rem)] font-normal italic leading-[1.45] tracking-[-0.01em] text-white/95">
                {t.quote}
              </p>
              <figcaption className="mt-8 flex flex-wrap items-center gap-4 border-t border-white/10 pt-6">
                {t.avatarUrl ? (
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-[var(--softree-accent,#FF7A2F)]">
                    <Image src={t.avatarUrl} alt="" fill className="object-cover" sizes="48px" />
                  </div>
                ) : data.clientLogoUrl ? (
                  <div className="relative h-8 w-24 shrink-0 brightness-0 invert opacity-80">
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
                  {t.name ? <p className="text-[0.95rem] font-bold text-white">{t.name}</p> : null}
                  <p className="text-[0.875rem] text-white/60">
                    {[t.role, t.company].filter(Boolean).join(" · ")}
                    {t.location ? ` · ${t.location}` : ""}
                  </p>
                </div>
              </figcaption>
            </blockquote>
          </figure>
        </Reveal>
      </PageContainer>
    </section>
  )
}
