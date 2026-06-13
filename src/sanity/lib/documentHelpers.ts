import SeoPreviewInput from "../components/SeoPreviewInput"
import React from "react"
import { defineField } from "sanity"
import EditorProgressInput from "../components/EditorProgressInput"
import type { ObjectInputProps } from "sanity"
import { caseStudyHasStoryContent, type CaseStudyCompletenessDoc } from "./caseStudyCompleteness"
import { getAeoPublishIssues, type AeoCompletenessDoc } from "./aeoCompleteness"

export function createSeoPreviewPanelField(group = "seo") {
  const SeoPreviewPanelInput: React.FC<ObjectInputProps> = () =>
    React.createElement(SeoPreviewInput, {
      siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://www.softreetechnology.com",
    })
  return defineField({
    name: "seoPreviewPanel",
    title: "Search & social preview",
    type: "object",
    group,
    components: {
      input: SeoPreviewPanelInput,
    },
    fields: [
      defineField({
        name: "placeholder",
        type: "string",
        hidden: true,
      }),
    ],
  })
}

export function createEditorProgressPanelField(group = "publish") {
  return defineField({
    name: "editorProgressPanel",
    title: "Editor progress",
    type: "object",
    group,
    components: {
      input: EditorProgressInput,
    },
    fields: [
      defineField({
        name: "placeholder",
        type: "string",
        hidden: true,
      }),
    ],
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
      const mainImage = fields.mainImage as { asset?: { _ref?: string } } | undefined
      if (!mainImage?.asset?._ref && !fields.mainImageUrl) {
        missing.push("cover image")
      }
    }

    const aeoIssues = getAeoPublishIssues(fields as AeoCompletenessDoc)
    if (aeoIssues.length > 0) {
      missing.push(...aeoIssues)
    }

    if (missing.length > 0) {
      return `Before publishing, add: ${missing.join(", ")}`
    }

    return true
  })
}
