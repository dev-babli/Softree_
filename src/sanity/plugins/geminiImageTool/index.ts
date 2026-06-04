import { definePlugin } from "sanity"
import { ImageIcon } from "@sanity/icons"
import GeminiImageStudioTool from "./GeminiImageStudioTool"

export const geminiImageToolPlugin = definePlugin({
  name: "softree-gemini-image-tool",
  tools: (prev) => [
    ...prev,
    {
      name: "gemini-images",
      title: "AI Images",
      icon: ImageIcon,
      component: GeminiImageStudioTool,
    },
  ],
})

export { GEMINI_PROMPT_TEMPLATES, GEMINI_ASPECT_RATIOS } from "./promptTemplates"
