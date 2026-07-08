import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import NavigationServer from "@/components/sections/navigation-server"
import Footer from "@/components/sections/footer"
import LightContactSection from "@/components/qc/homepage-light/LightContactSection"
import LightFAQExact from "@/components/homepage-light/LightFAQExact"
import CaseStudyHero from "./CaseStudyHero"
import CaseStudyGridNew from "./CaseStudyGrid"
import CaseStudyProofCTA from "./CaseStudyProofCTA"
import { getCaseStudyItemsByCategory, getCaseStudyCategoryCounts } from "./categoryCards"
import {
  buildCaseStudyCategoryMetadata,
  getCaseStudyCategoryConfig,
  isCaseStudyCategory,
  type CaseStudyCategoryKey,
} from "./categoryConfig"
import { buildCaseStudyCategoryLinks } from "@/cms/lib/buildCaseStudyNav"

type Props = {
  category: CaseStudyCategoryKey
}

export function generateCaseStudyCategoryMetadata(category: string): Metadata {
  if (!isCaseStudyCategory(category)) {
    return { title: "Case Studies Not Found" }
  }
  return buildCaseStudyCategoryMetadata(category)
}

export default async function CaseStudyCategoryView({ category }: Props) {
  const config = getCaseStudyCategoryConfig(category)
  if (!config) notFound()

  const items = await getCaseStudyItemsByCategory(category)
  const categoryCounts = await getCaseStudyCategoryCounts()
  const categoryLinks = buildCaseStudyCategoryLinks(categoryCounts).filter(
    (link) => link.key !== category,
  )

  return (
    <div className="min-h-screen pt-[100px]">
      <NavigationServer />
      <CaseStudyHero
        title={config.title}
        titleItalic={config.titleItalic}
        eyebrow={config.eyebrow}
        description={config.description}
        accentColor={config.accentColor}
        heroStat={config.heroStat}
        heroStatLabel={config.heroStatLabel}
        projectCount={config.projectCount}
      />
      <CaseStudyGridNew
        items={items}
        sectionTitle={config.sectionTitle}
        sectionSubtitle={
          items.length > 0
            ? config.sectionSubtitle
            : `No published stories in this category yet. Browse all customer stories or contact us about a ${config.title} project.`
        }
        accentColor={config.accentColor}
      />
      {items.length === 0 ? (
        <div className="mx-auto max-w-[1280px] px-5 pb-16 md:px-8">
          <div className="rounded-[18px] border border-[#e6e1f2] bg-white px-8 py-10 text-center">
            <p className="text-[15px] text-[#4c5366]">
              Stories are classified automatically from layout and use case. Check the{" "}
              <Link href="/case-studies" className="font-semibold text-[#1852ff] hover:underline">
                full case study library
              </Link>{" "}
              for the latest work.
            </p>
          </div>
        </div>
      ) : null}
      {categoryLinks.length > 0 ? (
        <section className="border-t border-[#e6e1f2] bg-[#faf8f3]">
          <div className="mx-auto max-w-[1280px] px-5 py-10 md:px-8">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6b7694]">
              Explore other technologies
            </p>
            <div className="flex flex-wrap gap-3">
              {categoryLinks.map((cat) => (
                <Link
                  key={cat.key}
                  href={cat.href}
                  className="inline-flex items-center gap-2 rounded-full border border-[#e6e1f2] bg-white px-4 py-2.5 text-[13px] font-semibold text-[#171717] transition-all hover:-translate-y-0.5 hover:shadow-md"
                  style={{ borderColor: `${cat.accentColor}33` }}
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: cat.accentColor }}
                    aria-hidden
                  />
                  {cat.label}
                  <span className="text-[11px] font-medium text-[#6b7694]">({cat.count})</span>
                </Link>
              ))}
              <Link
                href="/case-studies"
                className="inline-flex items-center rounded-full border border-[#171717] bg-[#171717] px-4 py-2.5 text-[13px] font-semibold text-white transition-opacity hover:opacity-90"
              >
                All case studies
              </Link>
            </div>
          </div>
        </section>
      ) : null}
      <CaseStudyProofCTA
        challengeText={config.proofChallenge}
        solutionText={config.proofSolution}
        accentColor={config.accentColor}
        quote={config.proofQuote}
        quoteName={config.proofName}
        quoteRole={config.proofRole}
      />
      <LightContactSection />
      <LightFAQExact faqs={config.faqs} />
      <Footer />
    </div>
  )
}
