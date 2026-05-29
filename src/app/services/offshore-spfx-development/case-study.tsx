// components/SpfxShowcase.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const caseStudies = [
  {
    title: "Custom Copy & Move Panel for SharePoint Lists",
    category: "SharePoint Online",
    solution:
      "Developed a custom SPFx panel using Fluent UI to enable seamless copy and move operations within SharePoint lists. Reduced manual effort and improved user productivity.",
    tech: ["SPFx", "Fluent UI", "React"],
    image: "/images/spfx/copy.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2025/03/Enhancing-SharePoint-List-Management-with-a-Custom-Copy-Move-Panel-Using-SPFx-and-Fluent-UI.pdf",
  },
  {
    title: "Custom Footer using SPFx",
    category: "Branding Extension",
    solution:
      "Built an SPFx Application Customizer to inject a reusable branded footer across the tenant.",
    tech: ["SPFx", "TypeScript", "App Customizer"],
    image: "/images/footer.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Enhancing-User-Experience-with-a-Custom-Footer-using-SPFx.pdf",
  },
  {
    title: "SPFx Parent Panel for List & Library Creation",
    category: "Provisioning Tool",
    solution:
      "Created a parent SPFx panel with guided options to simplify list and library creation for business users.",
    tech: ["SPFx", "React", "Fluent UI"],
    image: "/images/spfx/list.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/SPFx-1.pdf",
  },
];

export default function SpfxShowcase() {
  const featured = caseStudies[0];
  const rightCards = caseStudies.slice(1);

  return (
    <section className="relative">
      <div className="w-full">

        {/* ================= HEADER ================= */}
        <div className="mb-16 max-w-3xl">
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-orange-50 text-orange-600 border border-orange-100/50 shadow-sm">
            Success Stories
          </span>

          <h2 className="text-4xl md:text-5xl font-semibold text-zinc-900 tracking-tight leading-tight">
            SPFx{" "}
            <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
              Case Studies
            </span>
          </h2>

          <p className="mt-5 text-lg text-zinc-600 leading-relaxed max-w-2xl">
            Real-world SharePoint Framework solutions solving practical
            enterprise challenges with scalable, secure, and modern digital
            experiences.
          </p>

          <div className="mt-6 h-[2px] w-16 bg-gradient-to-r from-orange-600 to-amber-500 rounded-full" />
        </div>

        {/* ================= BLACK SHOWCASE GRID ================= */}
        <div className="rounded-[32px] p-0.5 bg-gradient-to-br from-zinc-200 via-zinc-100 to-zinc-200 shadow-2xl">
          <div className="rounded-[30px] bg-zinc-950 p-6 md:p-10 border border-white/5">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              {/* ================= FEATURED BIG CARD ================= */}
              <div className="lg:col-span-2 rounded-3xl overflow-hidden bg-zinc-900/90 backdrop-blur border border-zinc-800/80 hover:border-orange-500/40 hover:shadow-[0_20px_50px_rgba(249,115,22,0.12)] transition-all duration-300">
                <Link
                  href={featured.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  {/* IMAGE */}
                  <div className="relative h-[340px] md:h-[420px] overflow-hidden">
                    <Image
                      src={featured.image}
                      alt={featured.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent" />
                  </div>

                  {/* CONTENT */}
                  <div className="p-6 md:p-8">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-orange-500/10 text-orange-400 border border-orange-500/25">
                      Featured SPFx Case Study
                    </span>

                    <h3 className="mt-4 text-2xl md:text-3xl font-semibold text-white group-hover:text-orange-400 transition-colors duration-300">
                      {featured.title}
                    </h3>

                    <p className="mt-3 text-zinc-300 text-sm md:text-base leading-relaxed">
                      {featured.solution}
                    </p>

                    {/* TECH */}
                    <div className="mt-5 flex flex-wrap gap-2">
                      {featured.tech.map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1 text-xs rounded-full bg-zinc-800/60 text-zinc-300 border border-zinc-700/60"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <span className="mt-6 inline-flex items-center gap-2 text-orange-400 font-medium group-hover:text-orange-300 transition-colors">
                      View Case Study <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 duration-300" />
                    </span>
                  </div>
                </Link>
              </div>

              {/* ================= RIGHT SMALL CARDS ================= */}
              <div className="flex flex-col gap-6">
                {rightCards.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-3xl overflow-hidden bg-zinc-900/90 backdrop-blur border border-zinc-800/80 hover:border-orange-500/40 hover:shadow-[0_15px_30px_rgba(249,115,22,0.1)] transition-all duration-300"
                  >
                    <Link
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block"
                    >
                      {/* IMAGE */}
                      <div className="relative h-[180px] overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
                      </div>

                      {/* CONTENT */}
                      <div className="p-5">
                        <span className="inline-block px-2.5 py-0.5 rounded text-[9px] font-semibold tracking-wider uppercase bg-orange-500/10 text-orange-400 border border-orange-500/20 mb-2">
                          {item.category}
                        </span>

                        <h4 className="text-base md:text-lg font-semibold text-white group-hover:text-orange-400 transition-colors duration-300">
                          {item.title}
                        </h4>

                        <p className="mt-2 text-xs text-zinc-300 line-clamp-3">
                          {item.solution}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {item.tech.map((t) => (
                            <span
                              key={t}
                              className="px-2.5 py-0.5 text-[10px] rounded bg-zinc-800/60 border border-zinc-700/60 text-zinc-300"
                            >
                              {t}
                            </span>
                          ))}
                        </div>

                        <span className="mt-4 inline-flex items-center gap-2 text-xs text-orange-400 font-medium group-hover:text-orange-300 transition-colors">
                          Read PDF <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 duration-300" />
                        </span>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

