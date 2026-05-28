"use client";

import Image from "next/image";
import Link from "next/link";
import GeneralHeaderHero from "@/components/sections/GeneralHeaderHero";
import type { CaseStudyListingItem } from "./types";

type CaseStudiesListingClientProps = {
  caseStudies: CaseStudyListingItem[];
};

export default function CaseStudiesListingClient({ caseStudies }: CaseStudiesListingClientProps) {
  return (
    <div>
      <GeneralHeaderHero
        title="Customer Stories"
        description="We help the world's leading companies create the best AI agents. Here are a few stories from customers who run Rasa in production."
      />

      <section className="bg-[#f8f4ea] py-20 md:py-28">
        <div className="mx-auto max-w-[1280px] px-5 md:px-8">
          {caseStudies.length === 0 ? (
            <div className="rounded-[18px] border border-[#e6e1f2] bg-white px-8 py-16 text-center">
              <h2 className="text-[1.5rem] font-bold text-[#171717]">No case studies yet</h2>
              <p className="mx-auto mt-3 max-w-xl text-[15px] leading-[1.6] text-[#4c5366]">
                Published customer stories will appear here once they are added in Sanity.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
              {caseStudies.map((study) => {
                const isPlaceholder = !study.image || study.image.endsWith("_chat.svg");

                return (
                  <Link
                    key={study.href}
                    aria-label="Read case study"
                    href={study.href}
                    className="group flex h-full flex-col gap-5 rounded-[18px] bg-white p-5 transition-transform duration-200 ease-out hover:-translate-y-[3px]"
                  >
                    <div
                      className={`relative aspect-[4/3] w-full overflow-hidden rounded-[14px] ${
                        isPlaceholder ? "bg-[#efeae0]" : ""
                      }`}
                    >
                      {study.image && !isPlaceholder ? (
                        <Image
                          src={study.image}
                          alt={study.imageAlt}
                          fill
                          unoptimized
                          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 400px"
                          className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                        />
                      ) : study.image ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Image
                            src={study.image}
                            alt={study.imageAlt}
                            width={120}
                            height={120}
                            unoptimized
                            sizes="120px"
                            className="h-[72px] w-auto object-contain transition-transform duration-300 ease-out group-hover:scale-[1.04]"
                          />
                        </div>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-sm font-medium text-[#6b7694]">
                          {study.title}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col gap-3 px-1 pb-1">
                      <div className="text-[13px] font-semibold text-[#1852ff]">{study.category}</div>
                      <h2 className="text-[1.55rem] font-bold leading-[1.15] tracking-[-0.01em] text-[#171717]">
                        {study.title}
                      </h2>
                      <p className="text-[15px] leading-[1.55] text-[#4c5366]">{study.description}</p>

                      <div className="mt-auto pt-3">
                        <span className="inline-flex items-center rounded-full border border-[#191919] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#191919] transition-colors duration-200 group-hover:bg-[#191919] group-hover:text-white">
                          read case study
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
