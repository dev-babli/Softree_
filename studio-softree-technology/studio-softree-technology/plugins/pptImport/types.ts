export interface PptSlide {
  slideIndex: number
  title?: string
  content: string[]
  notes?: string
  images: PptImage[]
  design?: SlideDesign
  fullSlideImage?: PptImage
}

export interface PptImage {
  id: string
  data: Uint8Array
  mimeType: string
  extension: string
  isSlideBackground?: boolean
  slideIndex?: number
}

export interface PptDesignTheme {
  colors: {
    primary?: string
    secondary?: string
    accent1?: string
    accent2?: string
    accent3?: string
    background?: string
    text?: string
  }
  fonts: {
    heading?: string
    body?: string
  }
}

export interface SlideDesign {
  backgroundColor?: string
  backgroundImageRef?: string
  layout?: string
  colorScheme?: 'dark' | 'light'
}

export interface ParsedPpt {
  title?: string
  slides: PptSlide[]
  metadata: {
    slideCount: number
    hasImages: boolean
    theme?: PptDesignTheme
    dominantColors?: string[]
  }
}

export interface ExtractedCaseStudy {
  title: string
  client: string
  industry: string
  description: string
  challenge?: string
  solution?: string
  result?: string
  keyResults: string[]
  bodyContent: PortableTextBlock[]
  images: PptImage[]
  design?: PptDesignTheme
  slidePreviews?: PptImage[]
  dominantColor?: string
}

export interface PortableTextBlock {
  _type: 'block'
  _key: string
  style: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'blockquote'
  children: PortableTextSpan[]
  markDefs?: any[]
  listItem?: 'bullet' | 'number'
  level?: number
}

export interface PortableTextSpan {
  _type: 'span'
  _key: string
  text: string
  marks: string[]
}
