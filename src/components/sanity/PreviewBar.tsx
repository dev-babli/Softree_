'use client'

/**
 * Preview Mode Indicator Bar
 * 
 * Shows when viewing draft content with options to:
 * - View published version
 * - Continue editing in Studio
 * - Exit preview mode
 */

import Link from 'next/link'

interface PreviewBarProps {
  slug?: string
  type?: string
}

export function PreviewBar({ slug, type }: PreviewBarProps) {
  const studioUrl = type && slug 
    ? `/studio/desk/${type};${slug}`
    : '/studio'

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-amber-500 text-black px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="font-semibold">Preview Mode</span>
        <span className="text-sm opacity-75">
          Viewing draft content
        </span>
      </div>
      
      <div className="flex items-center gap-3">
        <Link
          href={studioUrl}
          target="_blank"
          className="bg-black text-white px-4 py-1.5 rounded text-sm font-medium hover:bg-gray-800 transition"
        >
          Edit in Studio
        </Link>
        
        <Link
          href="/api/sanity/exit-preview"
          className="bg-white text-black px-4 py-1.5 rounded text-sm font-medium hover:bg-gray-100 transition"
        >
          Exit Preview
        </Link>
      </div>
    </div>
  )
}
