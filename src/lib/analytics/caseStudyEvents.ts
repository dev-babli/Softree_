"use client"

import posthog from "posthog-js"

type CaseStudyEventProps = {
  slug: string
  title?: string
  client?: string
  category?: string
}

export function trackCaseStudyEvent(
  event: "case_study_pdf_download" | "case_study_contact_cta" | "case_study_related_click",
  props: CaseStudyEventProps & Record<string, unknown>,
) {
  if (typeof window === "undefined") return

  posthog.capture(event, {
    page_type: "case_study",
    ...props,
  })
}
