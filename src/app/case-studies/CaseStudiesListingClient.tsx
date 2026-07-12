"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useInView, useMotionValueEvent, useScroll } from "framer-motion";
import { Search, Sparkles } from "lucide-react";
import GeneralHeaderHero from "@/components/sections/GeneralHeaderHero";
import CaseStudiesCategoryRail from "@/components/case-studies/listing/CaseStudiesCategoryRail";
import CaseStudyListingCard from "@/components/case-studies/listing/CaseStudyListingCard";
import { CASE_STUDIES_HUB_ACCENT } from "./listingConfig";
import type { CaseStudyCategoryKey } from "./categoryConfig";
import type { CaseStudyHeroSlide, CaseStudyListingItem } from "./types";

type CategoryLink = {
  key: CaseStudyCategoryKey;
  label: string;
  href: string;
  count: number;
  accentColor: string;
};

type CaseStudiesListingClientProps = {
  caseStudies: CaseStudyListingItem[];
  heroSlides: CaseStudyHeroSlide[];
  categoryLinks: CategoryLink[];
};

const INDUSTRY_OPTIONS = [
  "All",
  "Healthcare",
  "Retail",
  "Manufacturing",
  "Finance",
  "Education",
  "Technology",
  "Government",
  "Financial Services",
  "Professional Services",
];

const USE_CASE_OPTIONS = [
  "All",
  "Process Automation",
  "AI Agents",
  "Customer Experience",
  "Operations",
  "Web Platform",
  "Mobile App",
  "Product Engineering",
];

const COMPANY_SIZE_OPTIONS = ["All", "Startup", "Mid-market", "Enterprise"];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function CaseStudiesListingClient({
  caseStudies,
  heroSlides,
  categoryLinks,
}: CaseStudiesListingClientProps) {
  const [search, setSearch] = useState("");
  const [techCategory, setTechCategory] = useState<CaseStudyCategoryKey | "All">("All");
  const [industry, setIndustry] = useState("All");
  const [useCase, setUseCase] = useState("All");
  const [companySize, setCompanySize] = useState("All");

  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-80px" });
  const [stickyVisible, setStickyVisible] = useState(false);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", () => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const nextVisible = rect.top < -120 && rect.bottom > 200;
    setStickyVisible((prev) => (prev === nextVisible ? prev : nextVisible));
  });

  const filtered = useMemo(() => {
    return caseStudies.filter((study) => {
      const q = search.trim().toLowerCase();
      const matchesSearch =
        !q ||
        study.title.toLowerCase().includes(q) ||
        study.description.toLowerCase().includes(q) ||
        study.category.toLowerCase().includes(q) ||
        (study.industry || "").toLowerCase().includes(q) ||
        (study.useCase || "").toLowerCase().includes(q);

      const matchesTech = techCategory === "All" || study.categoryKey === techCategory;

      const matchesIndustry =
        industry === "All" ||
        (study.industry || "").toLowerCase().includes(industry.toLowerCase());

      const matchesUseCase =
        useCase === "All" ||
        (study.useCase || "").toLowerCase().includes(useCase.toLowerCase());

      const matchesSize =
        companySize === "All" ||
        (study.companySize || "").toLowerCase() === companySize.toLowerCase();

      return matchesSearch && matchesTech && matchesIndustry && matchesUseCase && matchesSize;
    });
  }, [caseStudies, search, techCategory, industry, useCase, companySize]);

  const featuredStories = useMemo(() => {
    const sorted = [...caseStudies].sort((a, b) => {
      const aTime = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
      const bTime = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
      return bTime - aTime;
    });
    return sorted.slice(0, 2);
  }, [caseStudies]);

  const aggregateStats = useMemo(() => {
    const industries = new Set(filtered.map((s) => s.industry).filter(Boolean)).size;
    const withMetrics = filtered.filter((s) => (s.keyResults?.length ?? 0) > 0).length;
    return {
      total: filtered.length,
      industries,
      withMetrics,
      categories: categoryLinks.length,
    };
  }, [filtered, categoryLinks.length]);

  const activeFilterCount = [techCategory !== "All" ? techCategory : null, industry, useCase, companySize].filter(
    (f) => f && f !== "All",
  ).length;

  const clearFilters = () => {
    setTechCategory("All");
    setIndustry("All");
    setUseCase("All");
    setCompanySize("All");
    setSearch("");
  };

  return (
    <div>
      <GeneralHeaderHero
        title="Customer Stories"
        description="Real projects. Measurable outcomes. See how ambitious companies build with Softree."
        slides={heroSlides}
      />

      <CaseStudiesCategoryRail
        categoryLinks={categoryLinks}
        activeKey={techCategory}
        onSelect={setTechCategory}
        accentColor={CASE_STUDIES_HUB_ACCENT}
      />

      {featuredStories.length > 0 ? (
        <section className="border-b border-[#e6e1f2] bg-white py-10 md:py-14">
          <div className="mx-auto max-w-[1280px] px-5 md:px-8">
            <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p
                  className="text-[11px] font-semibold uppercase tracking-[0.14em]"
                  style={{ color: CASE_STUDIES_HUB_ACCENT }}
                >
                  Featured
                </p>
                <h2 className="mt-1 text-[clamp(1.5rem,3vw,1.85rem)] font-bold tracking-[-0.02em] text-[#171717]">
                  Recently published
                </h2>
              </div>
              <p className="max-w-sm text-[14px] text-[#4c5366]">
                Latest customer stories with outcomes you can trace to delivery.
              </p>
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              {featuredStories.map((study, index) => (
                <FeaturedStoryCard key={study.href} study={study} index={index} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="border-b border-[#e6e1f2] bg-white">
        <div className="mx-auto max-w-[1280px] px-5 py-6 md:px-8">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="relative max-w-md flex-1">
              <Search
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6b7694]"
                aria-hidden
              />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by client, industry, or outcome..."
                aria-label="Search case studies"
                className="w-full rounded-full border border-[#e6e1f2] bg-[#f8f4ea] py-2.5 pl-10 pr-4 text-sm text-[#171717] placeholder:text-[#9ca3af] focus:border-[var(--softree-accent,#FF5812)] focus:outline-none focus:ring-1 focus:ring-[var(--softree-accent,#FF5812)]"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <FilterSelect label="Industry" value={industry} options={INDUSTRY_OPTIONS} onChange={setIndustry} />
              <FilterSelect label="Use case" value={useCase} options={USE_CASE_OPTIONS} onChange={setUseCase} />
              <FilterSelect label="Size" value={companySize} options={COMPANY_SIZE_OPTIONS} onChange={setCompanySize} />
              {activeFilterCount > 0 || search ? (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="min-h-[44px] text-[13px] font-medium hover:underline"
                  style={{ color: CASE_STUDIES_HUB_ACCENT }}
                >
                  Clear filters
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section ref={sectionRef} className="bg-[#f8f4ea] py-16 md:py-24">
        <AnimatePresence>
          {stickyVisible ? (
            <motion.div
              initial={{ opacity: 0, y: -48 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -48 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="fixed left-0 right-0 top-0 z-40 flex items-center justify-between gap-4 border-b border-[#0a0a1a]/8 bg-white/90 px-5 py-3 shadow-sm backdrop-blur-xl md:px-8"
            >
              <div className="flex flex-wrap items-center gap-4 text-[11px]">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5" style={{ color: CASE_STUDIES_HUB_ACCENT }} aria-hidden />
                  <span className="font-bold text-[#0a0a1a]">{aggregateStats.total}</span>
                  <span className="text-[#0a0a1a]/50">stories shown</span>
                </div>
                <div className="hidden h-3 w-px bg-[#0a0a1a]/10 sm:block" />
                <div className="hidden items-center gap-2 sm:flex">
                  <span className="font-bold text-[#0a0a1a]">{aggregateStats.industries}</span>
                  <span className="text-[#0a0a1a]/50">industries</span>
                </div>
                <div className="hidden h-3 w-px bg-[#0a0a1a]/10 md:block" />
                <div className="hidden items-center gap-2 md:flex">
                  <span className="font-bold text-[#0a0a1a]">{aggregateStats.withMetrics}</span>
                  <span className="text-[#0a0a1a]/50">with measured outcomes</span>
                </div>
              </div>
              {techCategory !== "All" ? (
                <span
                  className="rounded-full px-2.5 py-1 text-[10px] font-bold text-white"
                  style={{ backgroundColor: CASE_STUDIES_HUB_ACCENT }}
                >
                  {categoryLinks.find((c) => c.key === techCategory)?.label ?? techCategory}
                </span>
              ) : null}
            </motion.div>
          ) : null}
        </AnimatePresence>

        <div className="mx-auto max-w-[1280px] px-5 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={gridInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
            className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4"
          >
            {[
              { label: "Stories in view", value: String(aggregateStats.total) },
              { label: "Technology areas", value: `${aggregateStats.categories}` },
              { label: "Industries covered", value: `${aggregateStats.industries}+` },
              { label: "With outcome metrics", value: String(aggregateStats.withMetrics) },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-[#0a0a1a]/5 bg-white p-4 text-center shadow-sm"
              >
                <div
                  className="mb-1 text-[26px] font-black leading-none tracking-tight"
                  style={{ color: CASE_STUDIES_HUB_ACCENT }}
                >
                  {stat.value}
                </div>
                <div className="text-[10px] font-medium uppercase tracking-[0.12em] text-[#0a0a1a]/40">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {filtered.length === 0 ? (
            <div className="rounded-[18px] border border-[#e6e1f2] bg-white px-8 py-16 text-center">
              <h2 className="text-[1.5rem] font-bold text-[#171717]">No matching stories</h2>
              <p className="mx-auto mt-3 max-w-xl text-[15px] leading-[1.6] text-[#4c5366]">
                Try clearing filters or browse a technology category above.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-6 inline-flex min-h-[44px] items-center rounded-full px-5 py-2.5 text-sm font-semibold text-white"
                style={{ backgroundColor: CASE_STUDIES_HUB_ACCENT }}
              >
                Reset filters
              </button>
            </div>
          ) : (
            <>
              <p className="mb-8 text-[15px] text-[#4c5366]">
                Showing {filtered.length} {filtered.length === 1 ? "story" : "stories"}
                {techCategory !== "All"
                  ? ` in ${categoryLinks.find((c) => c.key === techCategory)?.label ?? "category"}`
                  : ""}
              </p>
              <div ref={gridRef} className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
                {filtered.map((study, index) => (
                  <motion.div
                    key={study.href}
                    initial={{ opacity: 0, y: 28 }}
                    animate={gridInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: Math.min(index * 0.04, 0.4), ease: EASE }}
                  >
                    <CaseStudyListingCard
                      study={study}
                      accentColor={
                        study.categoryKey
                          ? categoryLinks.find((c) => c.key === study.categoryKey)?.accentColor ??
                            CASE_STUDIES_HUB_ACCENT
                          : CASE_STUDIES_HUB_ACCENT
                      }
                    />
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

function FeaturedStoryCard({ study, index }: { study: CaseStudyListingItem; index: number }) {
  const metric = study.keyResults?.[0];
  const isPlaceholder = !study.image || study.image.endsWith("_chat.svg");

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: EASE }}
    >
      <Link
        href={study.href}
        className="group flex h-full flex-col overflow-hidden rounded-[18px] border border-[#e6e1f2] bg-white transition-transform hover:-translate-y-1 hover:shadow-lg lg:flex-row"
      >
        <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-[#fcfbf9] lg:aspect-auto lg:min-h-[240px] lg:w-[44%]">
          {study.image && !isPlaceholder ? (
            <Image
              src={study.image}
              alt={study.imageAlt}
              fill
              unoptimized
              className={`transition-transform duration-300 group-hover:scale-[1.03] ${
                study.imageFit === "contain" ? "object-contain" : "object-cover"
              }`}
              sizes="(max-width: 1024px) 100vw, 440px"
            />
          ) : (
            <div className="flex h-full min-h-[180px] items-center justify-center bg-[#efeae0] px-6 text-center text-sm text-[#6b7694]">
              {study.title}
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col gap-3 p-6 md:p-8">
          <span
            className="inline-flex w-fit rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white"
            style={{ backgroundColor: CASE_STUDIES_HUB_ACCENT }}
          >
            {study.category}
          </span>
          <h3 className="text-[clamp(1.25rem,2.5vw,1.5rem)] font-bold leading-[1.15] text-[#171717]">
            {study.title}
          </h3>
          <p className="line-clamp-3 text-[14px] leading-[1.55] text-[#4c5366]">{study.description}</p>
          {metric ? (
            <p className="text-[13px] font-semibold" style={{ color: CASE_STUDIES_HUB_ACCENT }}>
              {metric.value === metric.label ? metric.value : `${metric.value} ${metric.label}`}
            </p>
          ) : null}
          <div className="mt-auto pt-2">
            <span className="inline-flex min-h-[44px] items-center rounded-full border border-[#191919] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#191919] transition-colors duration-200 group-hover:bg-[#191919] group-hover:text-white">
              Read case study
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
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
        id={`filter-${label.toLowerCase().replace(/\s+/g, "-")}`}
        name={label.toLowerCase().replace(/\s+/g, "-")}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={label}
        className="min-h-[44px] appearance-none rounded-full border border-[#e6e1f2] bg-[#f8f4ea] py-2 pl-4 pr-10 text-[13px] font-medium text-[#171717] focus:border-[var(--softree-accent,#FF5812)] focus:outline-none focus:ring-1 focus:ring-[var(--softree-accent,#FF5812)]"
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
        aria-hidden
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );
}
