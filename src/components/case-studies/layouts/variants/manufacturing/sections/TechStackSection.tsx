"use client"



import Image from "next/image"

import type { CaseStudyLayoutData } from "../../../types"

import { TechLogo } from "../../../shared/PowerPlatformLogos"

import {

  PageContainer,

  RevealItem,

  RevealStagger,

  SectionHeaderReveal,

  SectionLabel,

  SectionTitle,

} from "../shared"



export type TechStackItem = {

  name: string

  subtitle?: string

  logoUrl?: string

  logoAlt?: string

}



function normalizeTechItems(

  items: TechStackItem[] | undefined,

  data: CaseStudyLayoutData,

): TechStackItem[] {

  if (items?.length) return items

  return (data.technologies || []).map((name) => ({ name }))

}



export function TechStackSection({

  data,

  heading = "Microsoft Power Platform ecosystem",

  description = "Governed low-code components integrated with Azure — built for enterprise scale and plant-floor reliability.",

  label = "Reference tech stack",

  items,

}: {

  data: CaseStudyLayoutData

  heading?: string

  description?: string

  label?: string

  items?: TechStackItem[]

}) {

  const techItems = normalizeTechItems(items, data)

  if (!techItems.length) return null



  return (

    <section

      id="tech-stack"

      className="scroll-mt-24 bg-[var(--softree-bg-dark,#0a0a0a)] py-16 text-white md:py-24"

    >

      <PageContainer>

        <SectionHeaderReveal

          className="mx-auto max-w-2xl text-center"

          label={<SectionLabel className="!text-white/50">{label}</SectionLabel>}

          title={<SectionTitle className="!text-white">{heading}</SectionTitle>}

          description={

            description ? (

              <p className="text-base leading-relaxed text-white/65">{description}</p>

            ) : undefined

          }

        />



        <RevealStagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

          {techItems.map((tech) => (

            <RevealItem key={tech.name} variant="scale">

              <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[var(--softree-surface-1,#141414)] p-5 transition-transform duration-300 hover:-translate-y-1">

                {tech.logoUrl ? (

                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-white/5">

                    <Image

                      src={tech.logoUrl}

                      alt={tech.logoAlt || tech.name}

                      fill

                      className="object-contain p-1.5"

                      sizes="48px"

                    />

                  </div>

                ) : (

                  <TechLogo name={tech.name} className="h-12 w-12 shrink-0" variant="dark" />

                )}

                <div>

                  <p className="font-semibold text-white">{tech.name}</p>

                  <p className="mt-0.5 text-xs text-white/45">

                    {tech.subtitle || "Enterprise integration layer"}

                  </p>

                </div>

              </div>

            </RevealItem>

          ))}

        </RevealStagger>

      </PageContainer>

    </section>

  )

}

