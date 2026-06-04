"use client"

import { useMemo } from "react"
import { defineAssistFieldAction } from "@sanity/assist"
import type { AssistFieldActionProps } from "@sanity/assist"
import { SparklesIcon, ImageIcon, TagIcon, SearchIcon } from "@sanity/icons"
import { useClient } from "sanity"
import { useToast } from "@sanity/ui"

import { SOFTREE_STYLE_CONTEXT } from "./constants"
import { studioInstructionTemplates } from "./instructionTemplates"

const AI_CONTEXT_QUERY = `*[_type == "aiContext" && isDefault == true][0].context`

/** Category-specific image style guides for optimal results */
const CATEGORY_STYLES: Record<string, { style: string; colors: string; elements: string }> = {
  'Power Platform': {
    style: 'Microsoft Fluent Design aesthetic, modern productivity interface elements, clean app icons',
    colors: 'Microsoft blue (#0078D4), white, subtle gray accents, professional office palette',
    elements: 'Power Apps canvas, Power Automate flow diagrams, Dataverse connections, low-code visual cues',
  },
  'SharePoint': {
    style: 'Modern SharePoint interface, collaborative workspace aesthetic, document management visuals',
    colors: 'SharePoint teal (#03787C), Microsoft 365 blue, clean whites, subtle greens',
    elements: 'Team sites, document libraries, intranet dashboards, collaboration icons',
  },
  'AI & Machine Learning': {
    style: 'Futuristic neural network visualization, abstract data flow, sophisticated tech aesthetic',
    colors: 'Deep blue (#0A2540), electric purple (#635BFF), cyan accents (#00D4AA), dark background',
    elements: 'Neural nodes, data streams, algorithmic patterns, AI model visualization, glowing connections',
  },
  'Web Development': {
    style: 'Modern web interface mockups, responsive design elements, code visualization',
    colors: 'Developer blue (#3178C6), React teal (#61DAFB), JavaScript yellow (#F7DF1E), dark code editor theme',
    elements: 'Browser windows, code snippets, responsive breakpoints, component architecture',
  },
  'Mobile Apps': {
    style: 'Premium smartphone mockups, floating UI elements, app interface design, device showcase',
    colors: 'iOS blue (#007AFF), Material Design accents, clean device frames, gradient backgrounds',
    elements: 'iPhone/Android devices, touch gestures, app screens, notification badges',
  },
  'Cloud & DevOps': {
    style: 'Cloud infrastructure visualization, server network abstract, modern data center aesthetic',
    colors: 'Azure blue (#007FFF), AWS orange (#FF9900), cloud white, infrastructure gray, status green',
    elements: 'Cloud services icons, CI/CD pipelines, container orchestration, monitoring dashboards',
  },
  'Data & Analytics': {
    style: 'Dashboard visualization, chart and graph aesthetics, business intelligence interface',
    colors: 'Tableau blue (#1F77B4), Power BI yellow (#F2C811), data visualization palette, clean whites',
    elements: 'Bar charts, line graphs, KPI dashboards, real-time metrics, data flow diagrams',
  },
  'default': {
    style: 'Modern abstract technology illustration, clean geometric shapes, professional corporate aesthetic',
    colors: 'Softree brand blue (#2563EB), warm orange (#F97316), complementary grays, clean whites',
    elements: 'Abstract geometric patterns, data visualization motifs, professional business icons',
  },
}

/** Get optimized style guide for category */
function getCategoryStyle(category: string): { style: string; colors: string; elements: string } {
  const normalizedCategory = category.toLowerCase()

  for (const [key, value] of Object.entries(CATEGORY_STYLES)) {
    if (normalizedCategory.includes(key.toLowerCase())) {
      return value
    }
  }

  return CATEGORY_STYLES.default
}

/** Generate professional image prompt with advanced prompt engineering */
function generateImagePromptFromDocument(doc: Record<string, unknown>, type: 'caseStudy' | 'post'): string {
  const title = (doc.title as string) || ''
  const category = (doc.category as string) || (doc.categoryLabel as string) || 'Enterprise Technology'
  const excerpt = (doc.excerpt as string) || ''
  const client = (doc.client as string) || ''
  const industry = (doc.industry as string) || 'Technology'

  const categoryStyle = getCategoryStyle(category)

  if (type === 'caseStudy') {
    return `SUBJECT: Enterprise software case study hero image for "${title}" - ${category} solution for ${client} in ${industry} sector

COMPOSITION: Wide cinematic 16:9 aspect ratio, professional magazine cover quality, centered focal point with balanced negative space on sides for text overlay compatibility

STYLE: ${categoryStyle.style}, minimalist corporate aesthetic, premium editorial photography style inspired by Wired magazine and MIT Technology Review

COLOR PALETTE: ${categoryStyle.colors}, sophisticated gradient background transitioning from deep professional tones to lighter accents

KEY VISUAL ELEMENTS: ${categoryStyle.elements}, subtle technological motifs, abstract representation of digital transformation, clean iconography suggesting innovation and reliability

TECHNICAL SPECIFICATIONS: 
- Lighting: Soft professional studio lighting with subtle rim light for depth
- Texture: Smooth matte surfaces with subtle grain for premium feel
- Depth: Shallow depth of field effect, sharp focus on central subject
- Quality: 8K resolution, photorealistic rendering, ray-traced reflections

MOOD & ATMOSPHERE: Innovative yet trustworthy, cutting-edge but approachable, enterprise-grade sophistication, morning optimism with professional confidence

NEGATIVE PROMPTS (AVOID): 
- No text, letters, watermarks, or logos
- No human faces, hands, or body parts
- No cluttered or busy compositions
- No cartoonish or overly playful styles
- No stock photo clichés (handshakes, generic meeting rooms)
- No harsh shadows or overexposed areas
- No distorted or abstract shapes that confuse the subject

FINAL TOUCHES: Professional color grading with slight teal-orange contrast, subtle vignette, clean edges suitable for web use, optimized for both light and dark mode viewing`
  }

  // Blog post - more editorial, less client-specific
  return `SUBJECT: Technology blog header image for article "${title}" - exploring ${category} concepts and ${excerpt.slice(0, 80)}...

COMPOSITION: Wide 16:9 aspect ratio perfect for blog hero sections, rule of thirds composition, intentional negative space on left side for text overlay, magazine-quality editorial layout

STYLE: ${categoryStyle.style}, sophisticated editorial illustration style inspired by The Verge, TechCrunch, and premium tech publications, modern flat design meets photorealistic elements

COLOR PALETTE: ${categoryStyle.colors}, balanced contrast for readability, background suitable for both white and dark text overlays

KEY VISUAL ELEMENTS: ${categoryStyle.elements}, conceptual illustration of technology theme, subtle depth layers creating visual interest without distraction

TECHNICAL SPECIFICATIONS:
- Resolution: 4K minimum, web-optimized with crisp edges
- Lighting: Even, diffused lighting with subtle highlights
- Focus: Sharp throughout with gentle depth suggestion
- Style blend: 70% digital illustration, 30% photorealistic texture

MOOD & ATMOSPHERE: Thought leadership confidence, intellectual curiosity, accessible expertise, modern innovation energy balanced with trustworthiness

NEGATIVE PROMPTS (AVOID):
- No text, typography, or watermarks
- No generic stock photography elements
- No overly complex busy backgrounds
- No aggressive or jarring color schemes
- No outdated or retro styling
- No human subjects or faces
- No cluttered iconography

OPTIMIZED FOR: Blog readability, social media sharing, LinkedIn article headers, newsletter thumbnails, presentation slides, SEO featured snippets`
}

/** Generate negative prompt for image refinement */
function generateNegativePrompt(type: 'caseStudy' | 'post'): string {
  const baseNegatives = [
    'text',
    'watermark',
    'signature',
    'logo',
    'human face',
    'human hand',
    'body parts',
    'cluttered',
    'busy composition',
    'cartoon',
    'childish',
    'amateur',
    'low quality',
    'blurry',
    'distorted',
    'oversaturated',
    'harsh shadows',
    'overexposed',
    'generic stock photo',
    'cheesy business imagery',
    'shaking hands',
    'meeting room clichés',
    'outdated technology',
    'retro style',
  ]

  if (type === 'caseStudy') {
    return [...baseNegatives, 'playful', 'casual', 'informal', 'fun', 'comic'].join(', ')
  }

  return [...baseNegatives, 'aggressive', 'jarring', 'shocking', 'clickbait'].join(', ')
}

/** Document-level AI Assist shortcuts wired to Softree instruction templates + aiContext. */
export function useSoftreeAssistFieldActions(props: AssistFieldActionProps) {
  const { actionType, getDocumentValue } = props
  const client = useClient({ apiVersion: "2026-05-21" })
  const toast = useToast()

  return useMemo(() => {
    if (actionType !== "document") return []

    const templates = studioInstructionTemplates.map((template) =>
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

    // Add quick actions for common workflows
    const quickActions = [
      defineAssistFieldAction({
        title: '🎨 Auto-Generate Image Prompt',
        icon: ImageIcon,
        onAction: async () => {
          const doc = getDocumentValue?.() ?? {}
          const type = doc._type as 'caseStudy' | 'post'

          if (!['caseStudy', 'post'].includes(type)) {
            toast.push({
              status: "error",
              title: "Image Prompt",
              description: "This action only works for case studies and blog posts.",
            })
            return
          }

          const prompt = generateImagePromptFromDocument(doc, type)

          try {
            await navigator.clipboard.writeText(prompt)
            toast.push({
              status: "success",
              title: "Image Prompt Generated!",
              description: `Prompt copied to clipboard. Paste it into the "${type === 'caseStudy' ? 'Hero Image AI Prompt' : 'Featured Image AI Prompt'}" field, then click Generate with AI.`,
            })
          } catch {
            toast.push({
              status: "info",
              title: "Image Prompt Generated",
              description: prompt.slice(0, 120) + "...",
            })
          }
        },
      }),
      defineAssistFieldAction({
        title: '⚡ Quick: Generate SEO metadata',
        icon: SearchIcon,
        onAction: async () => {
          toast.push({
            status: "info",
            title: "SEO Generation",
            description: "Use the '� SEO — complete metadata package' template for detailed SEO generation.",
          })
        },
      }),
      defineAssistFieldAction({
        title: '⚡ Quick: Suggest tags',
        icon: TagIcon,
        onAction: async () => {
          toast.push({
            status: "info",
            title: "Auto-tagging",
            description: "Use the '🏷️ Auto-tagging — suggest categories' template for smart categorization.",
          })
        },
      }),
    ]

    return [...templates, ...quickActions]
  }, [actionType, client, getDocumentValue, toast])
}
