"use client"

import { useMemo } from "react"
import { defineAssistFieldAction, defineFieldActionDivider } from "@sanity/assist"
import type { AssistFieldActionProps } from "@sanity/assist"
import { SparklesIcon, ImageIcon, EditIcon } from "@sanity/icons"
import { set, useClient } from "sanity"
import { useToast } from "@sanity/ui"
import type { Path } from "sanity"

import { studioApiUrl, studioFetchInit } from "@/sanity/lib/studioFetch"
import { SOFTREE_STYLE_CONTEXT } from "./constants"
import { studioInstructionTemplates } from "./instructionTemplates"

const AI_CONTEXT_QUERY = `*[_type == "aiContext" && isDefault == true][0].context`

const AUTOCOMPLETE_FIELDS = new Set([
  "excerpt",
  "metaTitle",
  "metaDescription",
  "featuredImagePrompt",
  "heroImagePrompt",
  "answer",
  "challengeSummary",
  "approachSummary",
  "outcomeSummary",
])

const TOP_DOCUMENT_TEMPLATES = studioInstructionTemplates.slice(0, 8)

function pathKey(path: Path | undefined): string {
  if (!path?.length) return ""
  return path[path.length - 1]?.toString() || ""
}

function generateImagePromptFromDocument(doc: Record<string, unknown>, type: "caseStudy" | "post"): string {
  const title = (doc.title as string) || ""
  const excerpt = (doc.excerpt as string) || ""
  const clientName = (doc.client as string) || ""
  const industry = (doc.industry as string) || "Technology"
  const category = (doc.category as string) || "Enterprise Technology"

  if (type === "caseStudy") {
    return `Enterprise case study hero for "${title}" — ${category} for ${clientName} (${industry}). 16:9, cinematic, no text, no faces, Microsoft ecosystem aesthetic, premium editorial.`
  }
  return `Blog hero for "${title}" — ${category}. ${excerpt.slice(0, 100)}. 16:9 editorial tech illustration, no text, no faces.`
}

async function autocompleteField(
  props: AssistFieldActionProps,
  fieldName: string,
  toast: ReturnType<typeof useToast>,
  client: ReturnType<typeof useClient>,
): Promise<void> {
  const doc = { ...(props.getDocumentValue?.() ?? {}) } as Record<string, unknown>
  const documentType = (doc._type as string) || props.documentSchemaType?.name || "document"
  const path = props.path || []

  if (fieldName === "answer" && path.length >= 2) {
    const parent = path[path.length - 2]
    if (typeof parent === "object" && parent && "_key" in parent) {
      const arrayField = path[0]?.toString()
      const key = (parent as { _key: string })._key
      const items = doc[arrayField || "faqSchema"]
      if (Array.isArray(items)) {
        const item = items.find((i) => (i as { _key?: string })._key === key) as {
          question?: string
        }
        if (item?.question) doc.question = item.question
      }
    }
  }

  const res = await fetch(
    studioApiUrl("/api/studio/ai-complete-field"),
    studioFetchInit("POST", {
      documentType,
      fieldName,
      fieldTitle: props.schemaType?.title,
      document: doc,
    }),
  )

  const json = (await res.json()) as { ok?: boolean; value?: string; error?: string }
  if (!json.ok || !json.value) {
    throw new Error(json.error || "Autocomplete failed")
  }

  const documentId = props.documentIdForAction
  if (!documentId) throw new Error("Save the document first")

  if (path.length > 0) {
    await client.patch(documentId).set(set(path, json.value)).commit()
  } else {
    await client.patch(documentId).set({ [fieldName]: json.value }).commit()
  }

  toast.push({
    status: "success",
    title: "Field updated",
    description: `${props.schemaType?.title || fieldName} filled from document context.`,
  })
}

/** Field + document AI actions — autocomplete writes directly; templates copy prompts. */
export function useSoftreeAssistFieldActions(props: AssistFieldActionProps) {
  const { actionType, getDocumentValue, path } = props
  const client = useClient({ apiVersion: "2026-05-21" })
  const toast = useToast()

  return useMemo(() => {
    const fieldName = pathKey(path)

    if (actionType === "field" && AUTOCOMPLETE_FIELDS.has(fieldName)) {
      return [
        defineAssistFieldAction({
          title: "Autocomplete from context",
          icon: SparklesIcon,
          onAction: async () => {
            try {
              await autocompleteField(props, fieldName, toast, client)
            } catch (err) {
              toast.push({
                status: "error",
                title: "Autocomplete failed",
                description: err instanceof Error ? err.message : "Could not complete field",
              })
            }
          },
        }),
      ]
    }

    if (actionType !== "document") return []

    const docActions = [
      defineAssistFieldAction({
        title: "Autocomplete excerpt from story",
        icon: EditIcon,
        onAction: async () => {
          try {
            await autocompleteField({ ...props, path: ["excerpt"] }, "excerpt", toast, client)
          } catch (err) {
            toast.push({
              status: "error",
              title: "Excerpt failed",
              description: err instanceof Error ? err.message : "Error",
            })
          }
        },
      }),
      defineAssistFieldAction({
        title: "Autocomplete SEO package (title + description)",
        icon: SparklesIcon,
        onAction: async () => {
          try {
            const doc = getDocumentValue?.() ?? {}
            const id = props.documentIdForAction
            if (!id) throw new Error("Save the document first")

            const [metaTitleRes, metaDescRes] = await Promise.all([
              fetch(
                studioApiUrl("/api/studio/ai-complete-field"),
                studioFetchInit("POST", {
                  documentType: doc._type,
                  fieldName: "metaTitle",
                  document: doc,
                }),
              ),
              fetch(
                studioApiUrl("/api/studio/ai-complete-field"),
                studioFetchInit("POST", {
                  documentType: doc._type,
                  fieldName: "metaDescription",
                  document: doc,
                }),
              ),
            ])

            const metaTitleJson = (await metaTitleRes.json()) as {
              ok?: boolean
              value?: string
              error?: string
            }
            const metaDescJson = (await metaDescRes.json()) as {
              ok?: boolean
              value?: string
              error?: string
            }
            if (!metaTitleJson.ok || !metaDescJson.ok) {
              throw new Error(metaTitleJson.error || metaDescJson.error || "SEO generation failed")
            }

            await client
              .patch(id)
              .set({
                metaTitle: metaTitleJson.value,
                metaDescription: metaDescJson.value,
              })
              .commit()

            toast.push({ status: "success", title: "SEO metadata generated" })
          } catch (err) {
            toast.push({
              status: "error",
              title: "SEO failed",
              description: err instanceof Error ? err.message : "Error",
            })
          }
        },
      }),
      defineAssistFieldAction({
        title: "Build image prompt from document",
        icon: ImageIcon,
        onAction: async () => {
          const doc = getDocumentValue?.() ?? {}
          const type = doc._type as "caseStudy" | "post"
          if (!["caseStudy", "post"].includes(type)) {
            toast.push({ status: "error", title: "Only for posts and case studies" })
            return
          }
          const prompt = generateImagePromptFromDocument(doc, type)
          const field = type === "caseStudy" ? "heroImagePrompt" : "featuredImagePrompt"
          const id = props.documentIdForAction
          if (!id) {
            await navigator.clipboard.writeText(prompt)
            toast.push({ status: "info", title: "Prompt copied — paste into image prompt field" })
            return
          }
          await client.patch(id).set({ [field]: prompt }).commit()
          toast.push({ status: "success", title: `${field} updated` })
        },
      }),
      defineFieldActionDivider(),
    ]

    const templateActions = TOP_DOCUMENT_TEMPLATES.map((template) =>
      defineAssistFieldAction({
        title: `Copy: ${template.title}`,
        icon: SparklesIcon,
        onAction: async () => {
          const doc = getDocumentValue?.() ?? {}
          const aiContext = await client.fetch<string | null>(AI_CONTEXT_QUERY)
          const contextBlock = aiContext
            ? `\n\nBrand voice:\n${aiContext}`
            : `\n\nBrand voice baseline:\n${SOFTREE_STYLE_CONTEXT.slice(0, 2000)}`

          const instruction = `${template.instruction}${contextBlock}\n\nDocument:\n${JSON.stringify(doc, null, 2).slice(0, 6000)}`

          try {
            await navigator.clipboard.writeText(instruction)
            toast.push({
              status: "success",
              title: "Prompt copied",
              description: "Paste into ✨ on the field you want to fill.",
            })
          } catch {
            toast.push({ status: "info", title: template.title, description: instruction.slice(0, 200) })
          }
        },
      }),
    )

    return [...docActions, ...templateActions]
  }, [actionType, client, getDocumentValue, path, props, toast])
}
