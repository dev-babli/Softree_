"use client"

import { trackCaseStudyEvent } from "@/lib/analytics/caseStudyEvents"

type Props = {
  href: string
  slug: string
  title?: string
  client?: string
  category?: string
  children: React.ReactNode
  className?: string
}

export default function CaseStudyDownloadButton({
  href,
  slug,
  title,
  client,
  category,
  children,
  className,
}: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() =>
        trackCaseStudyEvent("case_study_pdf_download", {
          slug,
          title,
          client,
          category,
          pdf_url: href,
        })
      }
    >
      {children}
    </a>
  )
}
