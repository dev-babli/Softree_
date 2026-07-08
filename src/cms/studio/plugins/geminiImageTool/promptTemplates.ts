export type PromptTemplate = {
  title: string
  prompt: string
  aspectRatio: string
}

export const GEMINI_PROMPT_TEMPLATES: PromptTemplate[] = [
  {
    title: "Case Study Hero — Tech Abstract",
    prompt:
      "Modern abstract technology illustration, clean geometric shapes, professional corporate style, subtle gradient background, minimalist composition, enterprise software theme, blue and orange accent colors, high-end digital art, 4K quality",
    aspectRatio: "16:9",
  },
  {
    title: "Case Study Hero — AI / ML",
    prompt:
      "Futuristic AI neural network visualization, glowing nodes and connections, deep blue and purple gradient, abstract data flow, clean modern style, corporate presentation quality",
    aspectRatio: "16:9",
  },
  {
    title: "Blog Featured — Professional",
    prompt:
      "Clean professional blog header image, modern business technology theme, abstract geometric patterns, soft gradient background, corporate blue tones, minimalist design",
    aspectRatio: "16:9",
  },
  {
    title: "Mobile App Showcase",
    prompt:
      "Modern smartphone mockup floating in space, clean UI on screen, professional lighting, soft shadows, minimal background, app development theme",
    aspectRatio: "1:1",
  },
  {
    title: "Web Development",
    prompt:
      "Abstract web development concept, code elements floating, modern browser window, clean interface design, professional tech illustration, blue and white color scheme",
    aspectRatio: "16:9",
  },
  {
    title: "Cloud & DevOps",
    prompt:
      "Cloud infrastructure visualization, server network abstract, flowing data streams, modern tech illustration, blue gradient atmosphere, clean minimal composition",
    aspectRatio: "16:9",
  },
]

export const GEMINI_ASPECT_RATIOS = [
  "1:1",
  "16:9",
  "9:16",
  "4:3",
  "3:2",
  "21:9",
] as const
