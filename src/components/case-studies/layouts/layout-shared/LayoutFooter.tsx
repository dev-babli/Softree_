"use client"

import LightContactSection from "@/components/homepage-light/LightContactSection"
import LightFAQExact from "@/components/homepage-light/LightFAQExact"
import type { CaseStudyFAQ } from "../types"

type Props = {
  faqs: CaseStudyFAQ[]
  /** Optional wrapper class for layout-specific FAQ container */
  faqWrapperClassName?: string
  /** Optional wrapper class for layout-specific CTA container */
  ctaWrapperClassName?: string
}

/** FAQ + contact CTA — wrapped per layout for distinct chrome */
export function LayoutFooter({ faqs, faqWrapperClassName, ctaWrapperClassName }: Props) {
  const faqItems = faqs.map((f, i) => ({
    id: i + 1,
    serial: `question ${String(i + 1).padStart(2, "0")}`,
    question: f.question,
    answer: f.answer,
  }))

  return (
    <>
      {faqItems.length > 0 ? (
        <div className={faqWrapperClassName}>
          <LightFAQExact faqs={faqItems} />
        </div>
      ) : null}
      <div className={ctaWrapperClassName}>
        <LightContactSection />
      </div>
    </>
  )
}
