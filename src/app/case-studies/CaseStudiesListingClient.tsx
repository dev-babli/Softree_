"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import GeneralHeaderHero from "@/components/sections/GeneralHeaderHero";
import type { CaseStudyHeroSlide, CaseStudyListingItem } from "./types";

type CaseStudiesListingClientProps = {
  caseStudies: CaseStudyListingItem[];
  heroSlides: CaseStudyHeroSlide[];
};

const INDUSTRY_OPTIONS = [
  "All",
  "Healthcare",
  "Retail",
  "Manufacturing",
  "Finance",
  "Education",
  "Technology",
];

const USE_CASE_OPTIONS = [
  "All",
  "Process Automation",
  "AI Agents",
  "Customer Experience",
  "Operations",
  "Web Platform",
  "Mobile App",
];

const COMPANY_SIZE_OPTIONS = ["All", "Startup", "Mid-market", "Enterprise"];

export default function CaseStudiesListingClient({
  caseStudies,
  heroSlides,
}: CaseStudiesListingClientProps) {
  const [search, setSearch] = useState("");
  const [industry, setIndustry] = useState("All");
  const [useCase, setUseCase] = useState("All");
  const [companySize, setCompanySize] = useState("All");

  const filtered = useMemo(() => {
    return caseStudies.filter((study) => {
      const matchesSearch =
        !search ||
        study.title.toLowerCase().includes(search.toLowerCase()) ||
        study.description.toLowerCase().includes(search.toLowerCase()) ||
        (study.industry || "").toLowerCase().includes(search.toLowerCase()) ||
        (study.useCase || "").toLowerCase().includes(search.toLowerCase());

      const matchesIndustry =
        industry === "All" ||
        (study.industry || "").toLowerCase() === industry.toLowerCase();

      const matchesUseCase =
        useCase === "All" ||
        (study.useCase || "").toLowerCase() === useCase.toLowerCase();

      const matchesSize =
        companySize === "All" ||
        (study.companySize || "").toLowerCase() === companySize.toLowerCase();

      return matchesSearch && matchesIndustry && matchesUseCase && matchesSize;
    });
  }, [caseStudies, search, industry, useCase, companySize]);

  const activeFilterCount = [industry, useCase, companySize].filter(
    (f) => f !== "All"
  ).length;

  return (
    <div>
      <GeneralHeaderHero
        title="Customer Stories"
        description="Real projects. Measurable outcomes. See how ambitious companies build with Softree."
        slides={heroSlides}
      />

      {/* Filters */}
      <section className="border-b border-[#e6e1f2] bg-white">
        <div className="mx-auto max-w-[1280px] px-5 py-6 md:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Search */}
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6b7694]" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search stories..."
                className="w-full rounded-full border border-[#e6e1f2] bg-[#f8f4ea] py-2.5 pl-10 pr-4 text-sm text-[#171717] placeholder:text-[#9ca3af] focus:border-[#1852ff] focus:outline-none focus:ring-1 focus:ring-[#1852ff]"
              />
            </div>

            {/* Filter pills */}
            <div className="flex flex-wrap items-center gap-3">
              <FilterSelect
                label="Industry"
                value={industry}
                options={INDUSTRY_OPTIONS}
                onChange={setIndustry}
              />
              <FilterSelect
                label="Use Case"
                value={useCase}
                options={USE_CASE_OPTIONS}
                onChange={setUseCase}
              />
              <FilterSelect
                label="Size"
                value={companySize}
                options={COMPANY_SIZE_OPTIONS}
                onChange={setCompanySize}
              />

              {activeFilterCount > 0 && (
                <button
                  onClick={() => {
                    setIndustry("All");
                    setUseCase("All");
                    setCompanySize("All");
                  }}
                  className="text-[13px] font-medium text-[#1852ff] hover:underline"
                >
                  Clear ({activeFilterCount})
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="bg-[#f8f4ea] py-20 md:py-28">
        <div className="mx-auto max-w-[1280px] px-5 md:px-8">
          {filtered.length === 0 ? (
            <div className="rounded-[18px] border border-[#e6e1f2] bg-white px-8 py-16 text-center">
              <h2 className="text-[1.5rem] font-bold text-[#171717]">No matching stories</h2>
              <p className="mx-auto mt-3 max-w-xl text-[15px] leading-[1.6] text-[#4c5366]">
                Try adjusting your filters or search terms.
              </p>
            </div>
          ) : (
            <>
              <p className="mb-8 text-[15px] text-[#4c5366]">
                {filtered.length} {filtered.length === 1 ? "story" : "stories"}
              </p>
              <div className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
                {filtered.map((study) => {
                  const isPlaceholder = !study.image || study.image.endsWith("_chat.svg");

                  return (
                    <Link
                      key={study.href}
                      aria-label="Read case study"
                      href={study.href}
                      className="group flex h-full flex-col gap-5 rounded-[18px] bg-white p-5 transition-transform duration-200 ease-out hover:-translate-y-[3px]"
                    >
                      <div
                        className={`relative aspect-[4/3] w-full overflow-hidden rounded-[14px] ${isPlaceholder ? "bg-[#efeae0]" : ""
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
                        <div className="flex items-center gap-2">
                          <span className="text-[13px] font-semibold text-[#1852ff]">
                            {study.industry || study.category}
                          </span>
                          {study.useCase && (
                            <>
                              <span className="text-[#c5c5c5]">·</span>
                              <span className="text-[12px] text-[#6b7694]">{study.useCase}</span>
                            </>
                          )}
                        </div>

                        <h2 className="text-[1.55rem] font-bold leading-[1.15] tracking-[-0.01em] text-[#171717]">
                          {study.title}
                        </h2>

                        {/* Key results */}
                        {study.keyResults && study.keyResults.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {study.keyResults.slice(0, 2).map((r) => (
                              <span
                                key={r.label}
                                className="inline-flex items-center rounded-md bg-[#f0f4ff] px-2.5 py-1 text-[12px] font-semibold text-[#1852ff]"
                              >
                                {r.value} {r.label}
                              </span>
                            ))}
                          </div>
                        )}

                        <p className="text-[15px] leading-[1.55] text-[#4c5366]">
                          {study.description}
                        </p>

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
            </>
          )}
        </div>
      </section>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none rounded-full border border-[#e6e1f2] bg-[#f8f4ea] py-2 pl-4 pr-10 text-[13px] font-medium text-[#171717] focus:border-[#1852ff] focus:outline-none focus:ring-1 focus:ring-[#1852ff]"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt === "All" ? label : opt}
          </option>
        ))}
      </select>
      <svg
        className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#6b7694]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );
}
