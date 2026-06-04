import JSZip from 'jszip'
import {XMLParser} from 'fast-xml-parser'
import type {ParsedPpt, PptSlide, PptImage, ExtractedCaseStudy, PortableTextBlock, PortableTextSpan, PptDesignTheme, SlideDesign} from '../types'

function key(): string {
  return Math.random().toString(36).slice(2, 12)
}

function span(text: string, marks: string[] = []): PortableTextSpan {
  return {_type: 'span', _key: key(), text, marks}
}

function block(
  style: PortableTextBlock['style'],
  children: PortableTextSpan[],
  options?: {listItem?: 'bullet' | 'number'; level?: number}
): PortableTextBlock {
  return {
    _type: 'block',
    _key: key(),
    style,
    children,
    markDefs: [],
    ...options,
  }
}

export async function parsePptxFile(file: File): Promise<ParsedPpt> {
  const arrayBuffer = await file.arrayBuffer()
  const zip = await JSZip.loadAsync(arrayBuffer)

  const slides: PptSlide[] = []
  const images: Map<string, PptImage> = new Map()

  // Extract images from media folder
  const mediaFiles = Object.keys(zip.files).filter((name) =>
    name.startsWith('ppt/media/')
  )

  for (const mediaPath of mediaFiles) {
    const mediaFile = zip.files[mediaPath]
    if (!mediaFile.dir) {
      const data = await mediaFile.async('uint8array')
      const fileName = mediaPath.split('/').pop() || ''
      const extension = fileName.split('.').pop()?.toLowerCase() || 'png'
      const mimeType = extension === 'jpg' || extension === 'jpeg' 
        ? 'image/jpeg' 
        : extension === 'png' 
          ? 'image/png' 
          : 'image/webp'
      
      images.set(mediaPath, {
        id: fileName,
        data,
        mimeType,
        extension,
      })
    }
  }

  // Initialize parser early for theme extraction
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
    parseTagValue: true,
    trimValues: true,
  })

  // Extract theme colors from theme file
  const themeColors = await extractThemeColors(zip, parser)

  // Extract fonts from presentation
  const themeFonts = await extractThemeFonts(zip, parser)

  // Parse slide content
  const slideFiles = Object.keys(zip.files)
    .filter((name) => name.startsWith('ppt/slides/slide') && name.endsWith('.xml'))
    .sort((a, b) => {
      const numA = parseInt(a.match(/slide(\d+)\.xml$/)?.[1] || '0', 10)
      const numB = parseInt(b.match(/slide(\d+)\.xml$/)?.[1] || '0', 10)
      return numA - numB
    })

  for (let i = 0; i < slideFiles.length; i++) {
    const slidePath = slideFiles[i]
    const slideContent = await zip.files[slidePath].async('text')
    const parsed = parser.parse(slideContent)

    const slideImages: PptImage[] = []
    const slideText: string[] = []
    let slideTitle: string | undefined

    // Extract text from shapes
    const shapes = parsed['p:sld']?.['p:cSld']?.['p:spTree']?.['p:sp'] || []
    const shapesArray = Array.isArray(shapes) ? shapes : [shapes]

    for (const shape of shapesArray) {
      if (!shape) continue

      // Check if this is a title shape
      const isTitle = shape['p:nvSpPr']?.['p:nvPr']?.['p:ph']?.['@_type'] === 'title' ||
                      shape['p:nvSpPr']?.['p:nvPr']?.['p:ph']?.['@_type'] === 'ctrTitle'

      const textBody = shape['p:txBody']
      if (textBody) {
        const paragraphs = textBody['a:p'] || []
        const paragraphsArray = Array.isArray(paragraphs) ? paragraphs : [paragraphs]

        for (const para of paragraphsArray) {
          if (!para) continue

          const runs = para['a:r'] || []
          const runsArray = Array.isArray(runs) ? runs : [runs]
          let paraText = ''

          for (const run of runsArray) {
            if (run && run['a:t']) {
              paraText += run['a:t']
            }
          }

          if (paraText.trim()) {
            if (isTitle && !slideTitle) {
              slideTitle = paraText.trim()
            } else {
              slideText.push(paraText.trim())
            }
          }
        }
      }

      // Check for pictures
      const blip = shape['p:blipFill']?.['a:blip']?.['@_embed']
      if (blip) {
        const relsPath = slidePath.replace('ppt/slides/', 'ppt/slides/_rels/') + '.rels'
        if (zip.files[relsPath]) {
          const relsContent = await zip.files[relsPath].async('text')
          const relsParsed = parser.parse(relsContent)
          const relationships = relsParsed?.['Relationships']?.['Relationship'] || []
          const relsArray = Array.isArray(relationships) ? relationships : [relationships]
          
          for (const rel of relsArray) {
            if (rel?.['@_Id'] === blip) {
              const target = rel?.['@_Target']
              if (target) {
                const mediaPath = target.startsWith('../') 
                  ? 'ppt/' + target.replace('../', '')
                  : target.startsWith('/')
                    ? target.slice(1)
                    : 'ppt/' + target
                
                const img = images.get(mediaPath)
                if (img && !slideImages.find((si) => si.id === img.id)) {
                  slideImages.push(img)
                }
              }
            }
          }
        }
      }
    }

    // Extract slide background info
    const slideDesign = await extractSlideDesign(parsed, slidePath, zip, parser)

    slides.push({
      slideIndex: i + 1,
      title: slideTitle,
      content: slideText,
      images: slideImages,
      design: slideDesign,
    })
  }

  // Calculate dominant colors from theme
  const dominantColors = extractDominantColors(themeColors)

  return {
    title: slides[0]?.title,
    slides,
    metadata: {
      slideCount: slides.length,
      hasImages: images.size > 0,
      theme: {
        colors: themeColors,
        fonts: themeFonts,
      },
      dominantColors,
    },
  }
}

function looksLikeHeading(text: string): boolean {
  if (text.length < 5 || text.length > 100) return false
  if (text.endsWith(':')) return true
  const words = text.split(' ')
  const hasFewWords = words.length <= 8
  const mostlyUpper = text.replace(/[^A-Z]/g, '').length > text.length * 0.5
  return hasFewWords && mostlyUpper
}

function looksLikeBullet(text: string): boolean {
  return text.startsWith('•') || text.startsWith('-') || text.startsWith('*') || /^\d+\./.test(text)
}

export function extractCaseStudyFromPpt(parsed: ParsedPpt): ExtractedCaseStudy {
  const allText: string[] = []
  const allImages: PptImage[] = []
  const title = parsed.title || 'Untitled Case Study'

  for (const slide of parsed.slides) {
    if (slide.title && slide.title !== title) {
      allText.push(slide.title)
    }
    allText.push(...slide.content)
    allImages.push(...slide.images)
  }

  // Try to extract structured sections
  let challenge: string | undefined
  let solution: string | undefined
  let result: string | undefined
  const keyResults: string[] = []

  const textString = allText.join(' ')
  const lowerText = textString.toLowerCase()

  // Look for challenge section
  const challengeMatch = textString.match(/(?:challenge|problem|issue|pain point)[s:]?\s*([^]+?)(?=solution|approach|result|outcome|$)/i)
  if (challengeMatch) {
    challenge = challengeMatch[1].trim().slice(0, 300)
  }

  // Look for solution section
  const solutionMatch = textString.match(/(?:solution|approach|implementation|what we did)[s:]?\s*([^]+?)(?=result|outcome|impact|challenge|$)/i)
  if (solutionMatch) {
    solution = solutionMatch[1].trim().slice(0, 300)
  }

  // Look for result section
  const resultMatch = textString.match(/(?:result|outcome|impact|achievement|success)[s:]?\s*([^]+?)(?=challenge|solution|$)/i)
  if (resultMatch) {
    result = resultMatch[1].trim().slice(0, 300)
  }

  // Extract metrics/points as key results
  const lines = allText.filter((t) => t.length > 10 && t.length < 150)
  for (const line of lines.slice(0, 4)) {
    if (/\d+%?|\d+x|increased|decreased|improved|reduced|saved|generated/i.test(line)) {
      keyResults.push(line)
      if (keyResults.length >= 4) break
    }
  }

  // Build Portable Text body
  const bodyBlocks: PortableTextBlock[] = []

  // Add title as h1
  bodyBlocks.push(block('h1', [span(title)]))

  // Process slide content
  for (const slide of parsed.slides) {
    if (slide.title && slide.title !== title) {
      bodyBlocks.push(block('h2', [span(slide.title)]))
    }

    for (const paragraph of slide.content) {
      const trimmed = paragraph.trim()
      if (!trimmed || trimmed === slide.title) continue

      if (looksLikeHeading(trimmed)) {
        bodyBlocks.push(block('h3', [span(trimmed.replace(/[:]$/, ''))]))
      } else if (looksLikeBullet(trimmed)) {
        const cleanText = trimmed.replace(/^[•\-\*]\s*/, '').replace(/^\d+\.\s*/, '')
        bodyBlocks.push(
          block(
            'normal',
            [span(cleanText)],
            {listItem: 'bullet', level: 0}
          )
        )
      } else {
        bodyBlocks.push(block('normal', [span(trimmed)]))
      }
    }
  }

  // Infer client and industry from content
  let client = 'Unknown Client'
  let industry = 'Technology'

  const clientMatch = textString.match(/(?:client|company|for)\s*:?\s*([A-Z][A-Za-z0-9\s&]+?)(?:\s|$|,|\.|;)/)
  if (clientMatch) {
    client = clientMatch[1].trim()
  }

  const industryKeywords: Record<string, string> = {
    'healthcare': 'Healthcare',
    'health': 'Healthcare',
    'medical': 'Healthcare',
    'finance': 'Financial Services',
    'financial': 'Financial Services',
    'banking': 'Financial Services',
    'fintech': 'Financial Services',
    'retail': 'Retail',
    'e-commerce': 'Retail',
    'ecommerce': 'Retail',
    'manufacturing': 'Manufacturing',
    'education': 'Education',
    'edtech': 'Education',
    'logistics': 'Logistics',
    'transport': 'Logistics',
    'real estate': 'Real Estate',
    'energy': 'Energy',
    'telecom': 'Telecommunications',
  }

  for (const [keyword, value] of Object.entries(industryKeywords)) {
    if (lowerText.includes(keyword)) {
      industry = value
      break
    }
  }

  // Get design info from parsed PPT
  const design = parsed.metadata.theme
  const dominantColor = parsed.metadata.dominantColors?.[0]

  // Extract slide preview images (first 3 slides as previews)
  const slidePreviews: PptImage[] = []
  for (const slide of parsed.slides.slice(0, 3)) {
    if (slide.images.length > 0) {
      slidePreviews.push(slide.images[0])
    }
  }

  return {
    title,
    client,
    industry,
    description: allText.slice(0, 3).join(' ').slice(0, 200) + (allText.join(' ').length > 200 ? '...' : ''),
    challenge,
    solution,
    result,
    keyResults: keyResults.slice(0, 4),
    bodyContent: bodyBlocks,
    images: allImages.slice(0, 5),
    design,
    slidePreviews,
    dominantColor,
  }
}

// Helper function to extract theme colors from theme XML
async function extractThemeColors(zip: JSZip, parser: XMLParser): Promise<PptDesignTheme['colors']> {
  const colors: PptDesignTheme['colors'] = {}
  
  const themePath = Object.keys(zip.files).find((name) => 
    name.startsWith('ppt/theme/theme') && name.endsWith('.xml')
  )
  
  if (!themePath || !zip.files[themePath]) {
    return colors
  }

  try {
    const themeContent = await zip.files[themePath].async('text')
    const parsed = parser.parse(themeContent)
    
    const themeElements = parsed['a:theme']?.['a:themeElements']
    if (!themeElements) return colors

    const clrScheme = themeElements['a:clrScheme']
    if (!clrScheme) return colors

    // Extract color values from scheme
    const colorMap: Record<string, keyof PptDesignTheme['colors']> = {
      'dk1': 'text',
      'lt1': 'background',
      'accent1': 'primary',
      'accent2': 'secondary',
      'accent3': 'accent1',
      'accent4': 'accent2',
      'accent5': 'accent3',
      'hlink': 'primary',
    }

    for (const [schemeName, colorKey] of Object.entries(colorMap)) {
      const colorDef = clrScheme[`a:${schemeName}`]
      if (colorDef) {
        const srgbClr = colorDef['a:srgbClr']?.['@_val'] || colorDef['a:sysClr']?.['@_lastClr']
        if (srgbClr) {
          colors[colorKey] = `#${srgbClr}`
        }
      }
    }
  } catch (err) {
    console.warn('Failed to extract theme colors:', err)
  }

  return colors
}

// Helper function to extract theme fonts
async function extractThemeFonts(zip: JSZip, parser: XMLParser): Promise<PptDesignTheme['fonts']> {
  const fonts: PptDesignTheme['fonts'] = {}
  
  const themePath = Object.keys(zip.files).find((name) => 
    name.startsWith('ppt/theme/theme') && name.endsWith('.xml')
  )
  
  if (!themePath || !zip.files[themePath]) {
    return fonts
  }

  try {
    const themeContent = await zip.files[themePath].async('text')
    const parsed = parser.parse(themeContent)
    
    const themeElements = parsed['a:theme']?.['a:themeElements']
    if (!themeElements) return fonts

    const fontScheme = themeElements['a:fontScheme']
    if (!fontScheme) return fonts

    const majorFont = fontScheme['a:majorFont']?.['a:latin']?.['@_typeface']
    const minorFont = fontScheme['a:minorFont']?.['a:latin']?.['@_typeface']

    if (majorFont && majorFont !== '+mj-lt') {
      fonts.heading = majorFont
    }
    if (minorFont && minorFont !== '+mn-lt') {
      fonts.body = minorFont
    }
  } catch (err) {
    console.warn('Failed to extract theme fonts:', err)
  }

  return fonts
}

// Helper function to extract slide background design
async function extractSlideDesign(
  parsed: any, 
  slidePath: string, 
  zip: JSZip, 
  parser: XMLParser
): Promise<SlideDesign | undefined> {
  const design: SlideDesign = {}

  try {
    const slide = parsed['p:sld']
    if (!slide) return undefined

    // Check for background
    const bg = slide['p:cSld']?.['p:bg'] || slide['p:bg']
    if (bg) {
      // Check for solid fill color
      const solidFill = bg['a:solidFill']?.['a:srgbClr']?.['@_val']
      if (solidFill) {
        design.backgroundColor = `#${solidFill}`
      }

      // Check for background image
      const blip = bg['a:blipFill']?.['a:blip']?.['@_embed']
      if (blip) {
        const relsPath = slidePath.replace('ppt/slides/', 'ppt/slides/_rels/') + '.rels'
        if (zip.files[relsPath]) {
          const relsContent = await zip.files[relsPath].async('text')
          const relsParsed = parser.parse(relsContent)
          const relationships = relsParsed?.['Relationships']?.['Relationship'] || []
          const relsArray = Array.isArray(relationships) ? relationships : [relationships]
          
          for (const rel of relsArray) {
            if (rel?.['@_Id'] === blip) {
              design.backgroundImageRef = rel?.['@_Target']
              break
            }
          }
        }
      }
    }

    // Infer color scheme based on background
    if (design.backgroundColor) {
      const bgColor = design.backgroundColor.toLowerCase()
      // Simple heuristic: dark backgrounds have lower RGB sum
      const r = parseInt(bgColor.slice(1, 3), 16) || 0
      const g = parseInt(bgColor.slice(3, 5), 16) || 0
      const b = parseInt(bgColor.slice(5, 7), 16) || 0
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
      design.colorScheme = luminance < 0.5 ? 'dark' : 'light'
    }
  } catch (err) {
    console.warn('Failed to extract slide design:', err)
  }

  return Object.keys(design).length > 0 ? design : undefined
}

// Helper function to extract dominant colors from theme
function extractDominantColors(colors: PptDesignTheme['colors']): string[] {
  const dominant: string[] = []
  
  // Prioritize accent colors as they're most distinctive
  if (colors.primary) dominant.push(colors.primary)
  if (colors.accent1) dominant.push(colors.accent1)
  if (colors.accent2) dominant.push(colors.accent2)
  if (colors.accent3) dominant.push(colors.accent3)
  if (colors.secondary) dominant.push(colors.secondary)
  
  return dominant
}
