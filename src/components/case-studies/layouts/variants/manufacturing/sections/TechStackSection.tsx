"use client"

import type { CaseStudyLayoutData } from "../../../types"
import { TechLogo } from "../../../shared/PowerPlatformLogos"
import { PageContainer, Reveal, SectionLabel, SectionTitle } from "../shared"

export function TechStackSection({ data }: { data: CaseStudyLayoutData }) {
  return (
    <section
      id="tech-stack"
      className="scroll-mt-24 bg-[var(--softree-bg-dark,#0a0a0a)] py-16 text-white md:py-24"
    >
      <PageContainer>
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionLabel className="!text-white/50">Reference tech stack</SectionLabel>
          <SectionTitle className="!text-white">Microsoft Power Platform ecosystem</SectionTitle>
          <p className="mt-4 text-base leading-relaxed text-white/65">
            Governed low-code components integrated with Azure — built for enterprise scale and
            plant-floor reliability.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.technologies.map((tech, i) => (
            <Reveal key={tech} delay={i * 0.04}>
              <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[var(--softree-surface-1,#141414)] p-5 transition-transform duration-200 hover:-translate-y-0.5">
                <TechLogo name={tech} className="h-12 w-12 shrink-0" variant="dark" />
                <div>
                  <p className="font-semibold text-white">{tech}</p>
                  <p className="mt-0.5 text-xs text-white/45">Enterprise integration layer</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </PageContainer>
    </section>
  )
}
