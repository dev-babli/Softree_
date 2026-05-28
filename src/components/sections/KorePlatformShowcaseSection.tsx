"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type ProductCard = {
  title: string;
  description: string;
  href: string;
};

const PRODUCT_CARDS: ProductCard[] = [
  {
    title: "AI and Agent Solutions",
    description:
      "Custom AI copilots, workflow automation, and production-ready intelligent systems.",
    href: "/services/offshore-ai-development",
  },
  {
    title: "Power Platform Delivery",
    description:
      "Power Apps, Power Automate, and Dataverse implementations that drive adoption.",
    href: "/services/offshore-power-platform-development",
  },
  {
    title: "Web and Mobile Engineering",
    description:
      "Modern product development across web and mobile with strong architecture and UX.",
    href: "/services",
  },
];

export default function KorePlatformShowcaseSection() {
  return (
    <section className="relative overflow-hidden bg-white pb-0">
      <div className="absolute inset-0 z-0">
        <div className="h-full w-full bg-[radial-gradient(120%_90%_at_15%_5%,rgba(24,82,255,0.08),transparent_45%),radial-gradient(120%_90%_at_85%_15%,rgba(255,88,18,0.08),transparent_48%),linear-gradient(180deg,#ffffff_0%,#f5f7fb_72%,#eef2f8_100%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1320px] px-4 pb-20 pt-28 md:px-8 md:pt-32">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-balance text-4xl font-semibold leading-tight tracking-[-0.03em] text-zinc-900 md:text-6xl">
            Great digital outcomes are built on a strong delivery foundation.
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-zinc-700 md:text-2xl">
            Product engineering, AI, and enterprise modernization for ambitious teams.
            <br />
            Built by Softree with speed, clarity, and accountability.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-[6px] bg-zinc-900 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-black"
            >
              Start a project
            </Link>
            <Link
              href="/case-studies"
              className="inline-flex items-center justify-center rounded-[6px] border border-zinc-900 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-zinc-900 transition hover:bg-zinc-900 hover:text-white"
            >
              Case Studies
            </Link>
          </div>
        </div>

        <Link
          href="/about-us"
          className="mx-auto mt-12 block max-w-5xl rounded-2xl border border-zinc-300 bg-white/90 p-6 backdrop-blur md:p-8"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
            The Softree Delivery System
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <h3 className="text-3xl font-semibold tracking-[-0.03em] text-zinc-900 md:text-4xl">
              Meet <span className="text-[#1852FF]">{`{`}</span>{" "}
              <span className="italic">Softree</span>{" "}
              <span className="text-[#1852FF]">{`}`}</span>
            </h3>
            <span className="inline-flex rounded-full bg-zinc-900 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-white">
              New
            </span>
          </div>
          <p className="mt-4 max-w-4xl text-zinc-700">
            A practical execution model that combines strategy, design, engineering,
            and QA to ship reliable products across AI, Power Platform, web, and
            mobile.
          </p>
          <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-zinc-900">
            Explore Softree <ArrowUpRight className="h-4 w-4" />
          </div>
        </Link>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {PRODUCT_CARDS.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="group rounded-2xl border border-zinc-300 bg-white/90 p-5 backdrop-blur transition hover:border-zinc-400"
            >
              <div className="flex items-start justify-between gap-3">
                <h4 className="text-xl font-semibold leading-tight tracking-[-0.02em] text-zinc-900">
                  {card.title}
                </h4>
                <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-zinc-700 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
              <p className="mt-3 text-sm leading-relaxed text-zinc-700">{card.description}</p>
              <div className="mt-5 h-24 rounded-xl bg-gradient-to-br from-zinc-100 to-zinc-200" />
            </Link>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute right-[1.2%] top-0 z-20 hidden h-full items-center lg:flex">
        <div className="flex flex-col items-center">
          <div className="w-4 -rotate-90 whitespace-nowrap text-xs tracking-[0.08em] text-zinc-600">
            Explore Softree services
          </div>
          <div className="relative mt-8 h-10 w-5">
            <span className="side-arrow absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rotate-[-45deg] border-b-2 border-l-2 border-zinc-500" />
            <span className="side-arrow delay-[300ms] absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rotate-[-45deg] border-b-2 border-l-2 border-zinc-500" />
          </div>
        </div>
      </div>

      <div className="relative z-10">
        <div
          className="h-[150px] w-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(24,82,255,0.06)_100%)",
          }}
        />
      </div>

      <style jsx>{`
        .side-arrow {
          opacity: 0;
          animation: sideArrowFlow 1.5s infinite;
        }
        @keyframes sideArrowFlow {
          0% {
            transform: translateX(-50%) rotate(-45deg) translateY(0);
            opacity: 0;
          }
          25%,
          60% {
            opacity: 1;
          }
          100% {
            transform: translateX(-50%) rotate(-45deg) translateY(20px);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}
