'use client'

import { useEffect } from 'react'
import * as Sentry from '@sentry/nextjs'
import Link from 'next/link'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      Sentry.captureException(error)
    }
    console.error('App-level runtime error:', error)
  }, [error])

  return (
    <main className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden bg-[#0a0a0f] px-6 py-24 text-center text-white sm:py-32">
      <div className="relative z-10 mx-auto max-w-xl">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 text-red-400">
          <AlertTriangle className="h-7 w-7" />
        </div>

        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-red-400">
          Application Error
        </span>

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Something went wrong
        </h1>

        <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-base">
          An unexpected error occurred while loading this page. Our engineering team has been notified.
        </p>

        {error?.digest && (
          <p className="mt-2 font-mono text-xs text-zinc-600">
            Error ID: {error.digest}
          </p>
        )}

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 rounded-full bg-[#1852FF] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-200 hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1852FF]"
          >
            <RefreshCw className="h-4 w-4" />
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/10"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}
