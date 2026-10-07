import Link from 'next/link'
import { ArrowLeft, Compass, Briefcase, Layers, MessageSquare } from 'lucide-react'

export const metadata = {
  title: '404 - Page Not Found | Softree Technology',
  description: 'The page you are looking for does not exist or has been moved.',
  robots: {
    index: false,
    follow: true,
  },
}

export default function NotFound() {
  return (
    <main className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden bg-[#0a0a0f] px-6 py-24 text-center text-white sm:py-32">
      {/* Background glow effects */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform-gpu blur-3xl"
      >
        <div
          className="aspect-[1155/678] w-[40rem] bg-gradient-to-tr from-[#1852FF]/30 to-[#FF6B00]/20 opacity-40"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-2xl">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#FF6B00]">
          Error 404
        </span>

        <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-6xl">
          Page not found
        </h1>

        <p className="mt-4 text-base leading-relaxed text-zinc-400 sm:text-lg">
          The page you are looking for might have been moved, renamed, or is temporarily unavailable.
        </p>

        {/* Action button */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-[#1852FF] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-200 hover:bg-blue-600 hover:shadow-blue-500/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1852FF]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Return to Homepage
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/10"
          >
            <MessageSquare className="h-4 w-4" aria-hidden />
            Contact Support
          </Link>
        </div>

        {/* Quick Links Section */}
        <div className="mt-16 border-t border-white/10 pt-10 text-left">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Explore Popular Destinations
          </p>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <Link
              href="/services"
              className="group flex flex-col rounded-xl border border-white/5 bg-white/[0.03] p-4 transition-colors hover:border-[#1852FF]/40 hover:bg-white/[0.06]"
            >
              <div className="flex items-center gap-2 text-sm font-semibold text-white group-hover:text-[#1852FF]">
                <Compass className="h-4 w-4 text-[#1852FF]" />
                Services
              </div>
              <p className="mt-1 text-xs text-zinc-400">
                AI, cloud, and engineering capabilities.
              </p>
            </Link>

            <Link
              href="/solutions"
              className="group flex flex-col rounded-xl border border-white/5 bg-white/[0.03] p-4 transition-colors hover:border-[#1852FF]/40 hover:bg-white/[0.06]"
            >
              <div className="flex items-center gap-2 text-sm font-semibold text-white group-hover:text-[#1852FF]">
                <Layers className="h-4 w-4 text-[#1852FF]" />
                Solutions
              </div>
              <p className="mt-1 text-xs text-zinc-400">
                Enterprise AI platforms & automations.
              </p>
            </Link>

            <Link
              href="/case-studies"
              className="group flex flex-col rounded-xl border border-white/5 bg-white/[0.03] p-4 transition-colors hover:border-[#1852FF]/40 hover:bg-white/[0.06]"
            >
              <div className="flex items-center gap-2 text-sm font-semibold text-white group-hover:text-[#1852FF]">
                <Briefcase className="h-4 w-4 text-[#1852FF]" />
                Case Studies
              </div>
              <p className="mt-1 text-xs text-zinc-400">
                Client outcomes and engineering proof.
              </p>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
