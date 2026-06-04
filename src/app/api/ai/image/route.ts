import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenAI } from '@google/genai'

const genAI = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY || '' })

export async function POST(req: NextRequest) {
  try {
    const { prompt, aspectRatio = '1:1', editImage } = await req.json()

    if (!process.env.GOOGLE_GENAI_API_KEY) {
      return NextResponse.json(
        { error: 'GOOGLE_GENAI_API_KEY not configured' },
        { status: 500 }
      )
    }

    const response = await genAI.models.generateImages({
      model: 'gemini-2.0-flash-exp-image-generation',
      prompt,
      config: {
        numberOfImages: 1,
        aspectRatio,
        ...(editImage && { editImage }),
      },
    })

    if (!response.generatedImages || response.generatedImages.length === 0) {
      return NextResponse.json(
        { error: 'No images generated' },
        { status: 500 }
      )
    }

    const imageData = response.generatedImages[0].image?.imageBytes
    if (!imageData) {
      return NextResponse.json(
        { error: 'No image data received' },
        { status: 500 }
      )
    }

    // Convert base64 to buffer
    const buffer = Buffer.from(imageData, 'base64')

    return NextResponse.json({
      imageData: buffer.toString('base64'),
      mimeType: 'image/png',
    })
  } catch (error) {
    console.error('AI Image Generation Error:', error)
    return NextResponse.json(
      { error: 'Failed to generate image', details: String(error) },
      { status: 500 }
    )
  }
}
