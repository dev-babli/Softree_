"use client"

import { useMemo } from "react"
import { defineAssistFieldAction } from "@sanity/assist"
import type { AssistFieldActionProps } from "@sanity/assist"
import { SparklesIcon } from "@sanity/icons"
import { useClient } from "sanity"
import { useToast } from "@sanity/ui"

import { SOFTREE_STYLE_CONTEXT } from "./constants"
import { studioInstructionTemplates } from "./instructionTemplates"

const AI_CONTEXT_QUERY = `*[_type == "aiContext" && isDefault == true][0].context`

/** Document-level AI Assist shortcuts wired to Softree instruction templates + aiContext. */
export function useSoftreeAssistFieldActions(props: AssistFieldActionProps) {
  const { actionType, getDocumentValue } = props
  const client = useClient({ apiVersion: "2026-05-21" })
  const toast = useToast()

  return useMemo(() => {
    if (actionType !== "document") return []

    return studioInstructionTemplates.map((template) =>
      defineAssistFieldAction({
        title: template.title,
        icon: SparklesIcon,
        onAction: async () => {
          const doc = getDocumentValue?.() ?? {}
          const aiContext = await client.fetch<string | null>(AI_CONTEXT_QUERY)
          const contextBlock = aiContext
            ? `\n\nBrand voice (from AI Context document):\n${aiContext}`
            : `\n\nBrand voice baseline:\n${SOFTREE_STYLE_CONTEXT}`

          const instruction = `${template.instruction}${contextBlock}\n\nDocument:\n${JSON.stringify(doc, null, 2).slice(0, 6000)}`

          try {
            await navigator.clipboard.writeText(instruction)
            toast.push({
              status: "success",
              title: template.title,
              description: "Instruction copied — paste into ✨ Manage instructions or a field prompt.",
            })
          } catch {
            toast.push({
              status: "info",
              title: template.title,
              description: instruction.slice(0, 240) + (instruction.length > 240 ? "…" : ""),
            })
          }
        },
      }),
    )
  }, [actionType, client, getDocumentValue, toast])
}
