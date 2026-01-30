"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const caseStudies = [
  {
    title: "Custom Copy & Move Panel for SharePoint Lists",
    category: "SharePoint",
    challenge:
      "Managing list items across SharePoint lists required multiple manual steps and lacked a user-friendly interface.",
    solution:
      "Developed a custom SPFx panel using Fluent UI to enable seamless copy and move operations within SharePoint lists. The solution reduced manual effort, improved accuracy, and delivered a consistent, intuitive user experience across lists and libraries.",

    tech: ["SPFx", "Fluent UI", "SharePoint Online"],
    image: "/images/custom.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2025/03/Enhancing-SharePoint-List-Management-with-a-Custom-Copy-Move-Panel-Using-SPFx-and-Fluent-UI.pdf",
  },
  {
    title: "Custom Footer using SPFx",
    category: "SharePoint",
    solution:
      "Built an SPFx Application Customizer to inject a reusable, branded footer across the tenant.",
    tech: ["SPFx", "SharePoint Online", "TypeScript"],
    image: "/images/footer.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Enhancing-User-Experience-with-a-Custom-Footer-using-SPFx.pdf",
  },
  {
    title: "SPFx Parent Panel for List & Library Creation",
    category: "SharePoint",
    solution:
      "Created a parent SPFx panel with radio-based selection to simplify list and library creation for users.",
    tech: ["SPFx", "React", "SharePoint Online"],
    image: "/images/parent-panel.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/SPFx-1.pdf",
  },
];

export default function SpfxShowcase() {
  const featured = caseStudies[0];
  const rightCards = caseStudies.slice(1);

  return (
    <section className="bg-black text-white py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* HEADING */}
        <div className="mb-16 max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold">SPFx Case Studies</h2>
          <p className="mt-3 text-gray-400">
            Real-world SharePoint Framework solutions solving practical
            enterprise challenges.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ================= LEFT BIG CARD ================= */}
          <div
            className="
      lg:col-span-2 rounded-3xl overflow-hidden
      bg-gradient-to-br from-white/10 via-white/5 to-white/10
      backdrop-blur-xl border border-white/15
      shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]
    "
          >
            <Link href={featured.href} target="_blank" className="group block">
              <div className="relative h-[440px] overflow-hidden">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </Link>

            <div className="p-6 md:p-6">
              <span className="text-sm text-blue-400 font-medium">
                Featured SPFx Case Study
              </span>

              <h3 className="mt-3 text-2xl md:text-3xl font-semibold">
                {featured.title}
              </h3>

              <p className="mt-3 text-gray-300">{featured.solution}</p>

              <div className="mt-5 flex flex-wrap gap-3 text-sm text-gray-400">
                {featured.tech.map((t) => (
                  <span key={t} className="rounded-full bg-white/10 px-3 py-1">
                    {t}
                  </span>
                ))}
              </div>

              <Link
                href={featured.href}
                target="_blank"
                className="mt-6 inline-flex items-center gap-2 text-blue-400 hover:underline"
              >
                View Case Study <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* ================= RIGHT STACK (2 CARDS) ================= */}
          <div className="flex flex-col gap-6">
            {rightCards.map((item) => (
              <div
                key={item.title}
                className="
          rounded-3xl overflow-hidden
          bg-white/5 backdrop-blur-xl
          border border-white/15
          hover:bg-white/10 transition
        "
              >
                <Link href={item.href} target="_blank" className="group block">
                  <div className="relative h-[170px] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </Link>

                <div className="p-5">
                  <h4 className="text-lg font-semibold">{item.title}</h4>

                  <p className="mt-2 text-sm text-gray-400">{item.solution}</p>

                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-gray-400">
                    {item.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-white/10 px-2 py-1"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={item.href}
                    target="_blank"
                    className="mt-4 inline-flex items-center gap-2 text-sm text-indigo-400 hover:underline"
                  >
                    Read PDF <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
