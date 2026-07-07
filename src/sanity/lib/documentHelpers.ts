import SeoPreviewInput from "../components/SeoPreviewInput"
import React, { type ComponentType } from "react"
import { defineField } from "sanity"
import EditorProgressInput from "../components/EditorProgressInput"
import FaqAeoPanelInput from "../components/FaqAeoPanelInput"
import type { StringInputProps } from "sanity"
import { caseStudyHasStoryContent, type CaseStudyCompletenessDoc } from "./caseStudyCompleteness"
import { hasCoverImageAlt } from "./publishReadiness"

const SEO_PREVIEW_SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.softreetechnology.com"

function SeoPreviewPanelInput(_props: StringInputProps) {
  return React.createElement(SeoPreviewInput, { siteUrl: SEO_PREVIEW_SITE_URL })
}

/** Non-persisted UI shell — use string + custom input (object panels break publish mutations). */
function createUiShellField(options: {
  name: string
  title: string
  group: string
  input: ComponentType<StringInputProps>
  fieldset?: string
}) {
  return defineField({
    name: options.name,
    title: options.title,
    type: "string",
    group: options.group,
    fieldset: options.fieldset,
    readOnly: true,
    components: {
      input: options.input,
    },
  })
}

export function createSeoPreviewPanelField(group = "seo") {
  return createUiShellField({
    name: "seoPreviewUi",
    title: "Search & social preview",
    group,
    input: SeoPreviewPanelInput,
  })
}

export function createEditorProgressPanelField(group = "publish") {
  return createUiShellField({
    name: "publishChecklistUi",
    title: "Publish checklist",
    group,
    input: EditorProgressInput,
  })
}

export function createFaqAeoPanelField(group = "publish") {
  return createUiShellField({
    name: "faqReadinessUi",
    title: "FAQ readiness",
    group,
    fieldset: "faqAeoSet",
    input: FaqAeoPanelInput,
  })
}

/** @deprecated Use createSeoPreviewPanelField(group) */
export const seoPreviewPanelField = createSeoPreviewPanelField("seo")

export function publishReadinessValidation(
  Rule: any,
  options?: { requireBody?: boolean; requireImage?: boolean },
): any {
  return Rule.custom((fields: any) => {
    if (!fields || fields.status === "archived" || fields.status === "draft") return true

    const missing: string[] = []
    if (!fields.title) missing.push("title")
    if (!(fields.slug as { current?: string } | undefined)?.current) missing.push("slug")
    if (!fields.excerpt) missing.push("excerpt")

    if (options?.requireBody !== false) {
      const doc = fields as CaseStudyCompletenessDoc
      if (!caseStudyHasStoryContent(doc)) {
        missing.push("story (sections or content)")
      }
    }

    if (options?.requireImage !== false) {
      const mainImage = fields.mainImage as { asset?: { _ref?: string }; alt?: string } | undefined
      if (!mainImage?.asset?._ref && !fields.mainImageUrl) {
        missing.push("cover image")
      } else if (!hasCoverImageAlt(fields)) {
        missing.push("cover image alt text")
      }
    }

    if (missing.length > 0) {
      return `Before publishing, add: ${missing.join(", ")}`
    }

    return true
  })
}
