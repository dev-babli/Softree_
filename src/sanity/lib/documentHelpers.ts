import SeoPreviewInput from "../components/SeoPreviewInput"
import { defineField } from "sanity"

export function createSeoPreviewPanelField(group = "seo") {
  return defineField({
    name: "seoPreviewPanel",
    title: "Search & social preview",
    type: "object",
    group,
    components: {
      input: SeoPreviewInput,
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
) {
  return Rule.custom((fields: Record<string, unknown> | undefined) => {
    if (!fields || fields.status === "archived" || fields.status === "draft") return true

    const missing: string[] = []
    if (!fields.title) missing.push("title")
    if (!(fields.slug as { current?: string } | undefined)?.current) missing.push("slug")
    if (!fields.excerpt) missing.push("excerpt")

    if (options?.requireBody !== false) {
      const body = fields.body as unknown[] | undefined
      const challengeContent = fields.challengeContent as unknown[] | undefined
      const approachContent = fields.approachContent as unknown[] | undefined
      const outcomeContent = fields.outcomeContent as unknown[] | undefined
      const legacyChallenge = fields.challenge as unknown[] | undefined
      const sections = fields.sections as unknown[] | undefined
      const hasStory =
        (body?.length ?? 0) > 0 ||
        (challengeContent?.length ?? 0) > 0 ||
        (approachContent?.length ?? 0) > 0 ||
        (outcomeContent?.length ?? 0) > 0 ||
        (legacyChallenge?.length ?? 0) > 0 ||
        (sections?.length ?? 0) > 0
      if (!hasStory) missing.push("story (sections or content)")
    }

    if (options?.requireImage !== false) {
      const mainImage = fields.mainImage as { asset?: { _ref?: string } } | undefined
      if (!mainImage?.asset?._ref && !fields.mainImageUrl) {
        missing.push("cover image")
      }
    }

    if (missing.length > 0) {
      return `Before publishing, add: ${missing.join(", ")}`
    }

    return true
  })
}
