// components/SpfxShowcase.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const caseStudies = [
  {
    title: "Custom Copy & Move Panel for SharePoint Lists",
    category: "SharePoint",
    solution:
      "Developed a custom SPFx panel using Fluent UI to enable seamless copy and move operations within SharePoint lists. Reduced manual effort and improved user productivity.",
    tech: ["SPFx", "Fluent UI", "SharePoint Online"],
    image: "/images/spfx/copy.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2025/03/Enhancing-SharePoint-List-Management-with-a-Custom-Copy-Move-Panel-Using-SPFx-and-Fluent-UI.pdf",
  },
  {
    title: "Custom Footer using SPFx",
    category: "SharePoint",
    solution:
      "Built an SPFx Application Customizer to inject a reusable branded footer across the tenant.",
    tech: ["SPFx", "TypeScript", "SharePoint Online"],
    image: "/images/footer.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Enhancing-User-Experience-with-a-Custom-Footer-using-SPFx.pdf",
  },
  {
    title: "SPFx Parent Panel for List & Library Creation",
    category: "SharePoint",
    solution:
      "Created a parent SPFx panel with guided options to simplify list and library creation for business users.",
    tech: ["SPFx", "React", "SharePoint Online"],
    image: "/images/spfx/list.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/SPFx-1.pdf",
  },
];

export default function SpfxShowcase() {
  const featured = caseStudies[0];
  const rightCards = caseStudies.slice(1);

  return (
    <section className="bg-gradient-to-b from-zinc-50 via-white to-zinc-50 py-28">
      <div className="mx-auto max-w-7xl px-6">

        {/* ================= HEADER ================= */}
        <div className="mb-20 max-w-3xl">
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-blue-50 text-blue-600">
            Success Stories
          </span>

          <h2 className="text-4xl md:text-5xl font-semibold text-zinc-900 leading-tight">
            SPFx{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Case Studies
            </span>
          </h2>

          <p className="mt-5 text-lg text-zinc-600 leading-relaxed max-w-2xl">
            Real-world SharePoint Framework solutions solving practical
            enterprise challenges with scalable, secure, and modern digital
            experiences.
          </p>

          <div className="mt-6 h-[2px] w-16 bg-gradient-to-r from-blue-600 to-transparent rounded-full" />
        </div>

        {/* ================= BLACK SHOWCASE GRID ================= */}
        <div className="rounded-[32px] p-8 md:p-12">

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* ================= FEATURED BIG CARD ================= */}
            <div className="lg:col-span-2 rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 hover:border-blue-500/40 transition-all duration-300">

              <Link
                href={featured.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                {/* IMAGE */}
                <div className="relative h-[460px] overflow-hidden">
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* CONTENT */}
                <div className="p-8">
                  <span className="text-sm font-medium text-blue-400">
                    Featured SPFx Case Study
                  </span>

                  <h3 className="mt-3 text-2xl md:text-3xl font-semibold text-white group-hover:text-blue-400 transition">
                    {featured.title}
                  </h3>

                  <p className="mt-4 text-zinc-400 leading-relaxed">
                    {featured.solution}
                  </p>

                  {/* TECH */}
                  <div className="mt-6 flex flex-wrap gap-3">
                    {featured.tech.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 text-xs rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <span className="mt-6 inline-flex items-center gap-2 text-blue-400 font-medium">
                    View Case Study <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </div>

            {/* ================= RIGHT SMALL CARDS ================= */}
            <div className="flex flex-col gap-8">
              {rightCards.map((item) => (
                <div
                  key={item.title}
                  className="rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 hover:border-blue-500/40 transition-all duration-300"
                >
                  <Link
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    {/* IMAGE */}
                    <div className="relative h-[190px] overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>

                    {/* CONTENT */}
                    <div className="p-5">
                      <h4 className="text-lg font-semibold text-white group-hover:text-blue-400 transition">
                        {item.title}
                      </h4>

                      <p className="mt-2 text-sm text-zinc-400">
                        {item.solution}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {item.tech.map((t) => (
                          <span
                            key={t}
                            className="px-2.5 py-1 text-[11px] rounded-md bg-zinc-800 border border-zinc-700 text-zinc-300"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      <span className="mt-4 inline-flex items-center gap-2 text-sm text-blue-400 font-medium">
                        Read PDF <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
