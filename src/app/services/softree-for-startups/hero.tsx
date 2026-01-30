"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function StartupHero() {
  return (
    <section
      className="
  relative isolate overflow-hidden
  min-h-[70vh]
  bg-black
  text-white
"
    >
      {/* CONTENT */}
      <div className="relative min-h-[70vh] flex items-end">
        <div className="mx-auto max-w-7xl px-6 w-full mt-16 md:mt-24 mb-16 md:mb-24">
          <div
            className="
              text-center
              pt-16 md:pt-20
              pb-16 md:pb-20
              rounded-[32px]
              bg-gradient-to-br from-white/10 via-white/5 to-white/10
              backdrop-blur-2xl
              border border-white/15
              shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]
            "
          >
            {/* BADGE */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-gray-300">
              <Sparkles className="h-4 w-4 text-blue-400" />
              Softree for Startups
            </div>

            {/* HEADLINE */}
            <h1 className="mx-auto max-w-4xl text-5xl md:text-6xl xl:text-5xl font-bold leading-tight text-white">
              Build Products at{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400">
                Startup Speed
              </span>
              <br />
              Without Compromising Scale
            </h1>

            {/* SUBTEXT */}
            <p className="mt-6 mx-auto max-w-2xl text-lg md:text-xl text-gray-400">
              From MVP to growth-ready platforms, we help startups ship faster,
              scale smarter, and build technology investors trust.
            </p>

            {/* CTA */}
            <div className="mt-10 flex flex-wrap justify-center items-center gap-6">
              <Link
                href="/get-in-touch"
                className="
                  inline-flex items-center gap-2 rounded-full
                  bg-gradient-to-r from-blue-500 to-cyan-500
                  px-8 py-4 text-white font-semibold
                  transition hover:scale-105 hover:opacity-90
                "
              >
                Start Your Build
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/case-studies"
                className="text-gray-300 hover:text-white transition underline underline-offset-4"
              >
                View Startup Success Stories
              </Link>
            </div>

            {/* SIGNALS */}
            <div className="mt-14 flex flex-wrap justify-center gap-8 text-sm text-gray-400">
              <span>⚡ MVP-first approach</span>
              <span>🧠 Product-focused engineers</span>
              <span>📈 Built to scale</span>
              <span>🔐 Security by design</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
