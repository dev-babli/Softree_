"use client";

/* ─────────────────────────────────────────────────────────────────────
 *  Careers Jobs — Light editorial board
 *  ──────────────
 *  Replaces the dark `JobBoard`. Visual recipe pulled from the About
 *  cards: white surface, neutral 900 type, soft borders, and the
 *  Softree amber `#F5B947` accent for badges + hover.
 *
 *  Filtering is client-side; categories are merged from CMS with
 *  whatever distinct categories exist in the supplied jobs list.
 * ───────────────────────────────────────────────────────────────────── */

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Search } from "lucide-react";
import ApplicationFormLight from "./form-light";
import type { CareersJob } from "./types";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const ACCENT = "#F5B947";

const DEFAULT_JOBS: CareersJob[] = [
    {
        title: "AI Engineer",
        category: "AI",
        location: "Hybrid · Bengaluru",
        type: "Full time",
        experience: "3+ yrs",
        salary: "₹18–32 LPA",
        badge: "Hot",
        description:
            "Build and deploy production AI features — RAG pipelines, agent workflows, and ML services on Azure for Fortune 500 clients.",
        tags: ["Python", "LLMs", "Azure AI", "FastAPI"],
    },
    {
        title: "Senior Power BI Developer",
        category: "Power BI",
        location: "Remote",
        type: "Full time",
        experience: "4+ yrs",
        salary: "₹14–24 LPA",
        badge: "New",
        description:
            "Own end-to-end analytics — DAX, semantic models, and embedded Power BI dashboards for enterprise reporting.",
        tags: ["DAX", "Power BI", "SQL", "Tabular Editor"],
    },
    {
        title: "Power Apps Developer",
        category: "Power Platform",
        location: "Remote",
        type: "Full time",
        experience: "2+ yrs",
        salary: "₹10–18 LPA",
        badge: "Open",
        description:
            "Ship canvas and model-driven apps on Microsoft Power Platform with Dataverse and Power Automate cloud flows.",
        tags: ["Power FX", "Dataverse", "Power Automate"],
    },
    {
        title: "QA Automation Engineer",
        category: "QA",
        location: "Hybrid · Bengaluru",
        type: "Full time",
        experience: "2+ yrs",
        salary: "₹9–16 LPA",
        badge: "Urgent",
        description:
            "Drive test strategy and automation — Playwright, Cypress, API testing with Postman, and CI/CD pipeline integration.",
        tags: ["Playwright", "Cypress", "API", "CI/CD"],
    },
    {
        title: "Full-stack Developer",
        category: "Web",
        location: "Hybrid · Bengaluru",
        type: "Full time",
        experience: "3+ yrs",
        salary: "₹14–26 LPA",
        badge: "Open",
        description:
            "Build production web apps end-to-end — Next.js, TypeScript, Node, and Postgres on Azure or AWS.",
        tags: ["Next.js", "TypeScript", "Node", "Postgres"],
    },
];

function badgeStyle(badge?: string) {
    switch ((badge || "").toLowerCase()) {
        case "hot":
        case "urgent":
            return { color: "#9b1c1c", bg: "rgba(220,38,38,0.08)", border: "rgba(220,38,38,0.18)" };
        case "new":
            return { color: "#0c4a6e", bg: "rgba(14,165,233,0.08)", border: "rgba(14,165,233,0.2)" };
        default:
            return { color: "#7c4a03", bg: "rgba(245,185,71,0.18)", border: "rgba(245,185,71,0.3)" };
    }
}

export interface CareersJobsLightProps {
    heading?: string;
    subheading?: string;
    categories?: string[];
    jobs?: CareersJob[];
}

export default function CareersJobsLight({
    heading = "Open roles.",
    subheading = "Find a role that fits how you build best.",
    categories,
    jobs,
}: CareersJobsLightProps) {
    const resolvedJobs = jobs && jobs.length ? jobs : DEFAULT_JOBS;
    const [activeCategory, setActiveCategory] = useState("All");
    const [search, setSearch] = useState("");
    const [openTitle, setOpenTitle] = useState<string | null>(null);

    const allCategories = useMemo(() => {
        const fromJobs = resolvedJobs
            .map((j) => j.category)
            .filter((c): c is string => Boolean(c));
        const merged = ["All", ...(categories ?? []), ...fromJobs];
        return Array.from(new Set(merged));
    }, [categories, resolvedJobs]);

    const filtered = useMemo(() => {
        return resolvedJobs.filter((job) => {
            const matchesCategory =
                activeCategory === "All" || job.category === activeCategory;
            const haystack = [
                job.title,
                job.category,
                job.location,
                ...(job.tags ?? []),
            ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();
            const matchesSearch =
                !search.trim() || haystack.includes(search.trim().toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [resolvedJobs, activeCategory, search]);

    return (
        <section
            id="open-roles"
            className="relative w-full overflow-hidden bg-[#FAFAF8] py-16 sm:py-20 md:py-24 lg:py-28"
        >
            {/* Soft amber wash at the edges */}
            <div
                aria-hidden
                className="pointer-events-none absolute -top-32 right-[-10%] h-[420px] w-[420px] rounded-full opacity-40 blur-[120px]"
                style={{ background: "radial-gradient(circle, rgba(245,185,71,0.45), transparent 70%)" }}
            />

            <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, ease: EASE }}
                    className="mb-10 flex flex-col items-start justify-between gap-6 sm:mb-12 lg:flex-row lg:items-end"
                >
                    <div className="w-full max-w-[640px]">
                        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-neutral-900/10 bg-white px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-700 sm:text-[11px] sm:tracking-[0.22em]">
                            <span className="h-1.5 w-1.5 rounded-full" style={{ background: ACCENT }} />
                            {filtered.length} role{filtered.length === 1 ? "" : "s"} open
                        </span>
                        <h2 className="break-words text-[clamp(2rem,7vw,4rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-neutral-950 sm:leading-[0.92]">
                            {heading.replace(/\.+$/, "")}
                            <span className="text-[#F5B947]">.</span>
                        </h2>
                        <p className="mt-3 max-w-[520px] text-[14px] leading-[1.65] text-neutral-600 sm:mt-4 sm:text-[15px]">
                            {subheading}
                        </p>
                    </div>

                    {/* Search */}
                    <div className="flex w-full items-center gap-2 rounded-full border border-neutral-900/12 bg-white px-4 py-2 shadow-[0_2px_10px_-6px_rgba(10,10,26,0.18)] lg:max-w-[420px]">
                        <Search className="h-4 w-4 flex-shrink-0 text-neutral-400" />
                        <input
                            type="search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search roles, skills, locations..."
                            className="min-w-0 flex-1 bg-transparent text-sm text-neutral-800 outline-none placeholder:text-neutral-400"
                            aria-label="Search open roles"
                        />
                        {search ? (
                            <button
                                type="button"
                                onClick={() => setSearch("")}
                                className="text-xs font-medium text-neutral-500 hover:text-neutral-900"
                            >
                                Clear
                            </button>
                        ) : null}
                    </div>
                </motion.div>

                {/* Category pills — horizontally scrollable on mobile */}
                <div className="-mx-4 mb-6 flex flex-nowrap gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:mb-8 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {allCategories.map((cat) => {
                        const isActive = activeCategory === cat;
                        return (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                type="button"
                                className={`flex-shrink-0 whitespace-nowrap rounded-full border px-4 py-1.5 text-[12px] font-medium transition-all ${isActive
                                    ? "border-neutral-900 bg-neutral-900 text-white"
                                    : "border-neutral-900/15 bg-white text-neutral-700 hover:border-neutral-900/35 hover:text-neutral-900"
                                    }`}
                            >
                                {cat}
                            </button>
                        );
                    })}
                </div>

                {/* Job cards */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {filtered.length === 0 ? (
                        <div className="col-span-full rounded-2xl border border-dashed border-neutral-900/15 bg-white p-12 text-center text-neutral-500">
                            No roles match your filter — try clearing the search or pick a
                            different category.
                        </div>
                    ) : (
                        filtered.map((job, i) => {
                            const bs = badgeStyle(job.badge);
                            return (
                                <motion.button
                                    key={`${job.title}-${i}`}
                                    type="button"
                                    onClick={() => setOpenTitle(job.title || null)}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-60px" }}
                                    transition={{ duration: 0.55, delay: i * 0.05, ease: EASE }}
                                    className="group relative overflow-hidden rounded-3xl border border-neutral-900/10 bg-white p-5 text-left shadow-[0_8px_28px_-16px_rgba(10,10,26,0.12)] transition-all hover:-translate-y-1 hover:border-neutral-900/25 hover:shadow-[0_22px_50px_-22px_rgba(10,10,26,0.25)] sm:p-6 md:p-7"
                                >
                                    {/* Top accent stripe */}
                                    <span
                                        aria-hidden
                                        className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                                        style={{ background: ACCENT }}
                                    />

                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex flex-wrap items-center gap-2">
                                                {job.badge ? (
                                                    <span
                                                        className="rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em]"
                                                        style={{
                                                            color: bs.color,
                                                            background: bs.bg,
                                                            borderColor: bs.border,
                                                        }}
                                                    >
                                                        {job.badge}
                                                    </span>
                                                ) : null}
                                                {job.category ? (
                                                    <span className="rounded-full border border-neutral-900/12 bg-white px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-neutral-600">
                                                        {job.category}
                                                    </span>
                                                ) : null}
                                            </div>
                                            <h3 className="mt-3 text-[20px] font-semibold leading-tight tracking-[-0.02em] text-neutral-950 sm:text-2xl md:text-[26px]">
                                                {job.title}
                                            </h3>
                                            <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-neutral-500">
                                                {job.location ? <span>{job.location}</span> : null}
                                                {job.location && job.type ? <span aria-hidden>·</span> : null}
                                                {job.type ? <span>{job.type}</span> : null}
                                                {(job.location || job.type) && job.experience ? <span aria-hidden>·</span> : null}
                                                {job.experience ? <span>{job.experience}</span> : null}
                                            </div>
                                        </div>

                                        <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full border border-neutral-900/12 text-neutral-700 transition-all group-hover:border-neutral-900 group-hover:bg-neutral-900 group-hover:text-white">
                                            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-0" />
                                        </span>
                                    </div>

                                    {job.description ? (
                                        <p className="mt-4 text-[14px] leading-[1.65] text-neutral-600">
                                            {job.description}
                                        </p>
                                    ) : null}

                                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-neutral-900/8 pt-4">
                                        <div className="flex flex-wrap gap-1.5">
                                            {(job.tags ?? []).map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="rounded-md border border-neutral-900/10 bg-neutral-50 px-2 py-1 text-[11px] font-medium text-neutral-700"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        {job.salary ? (
                                            <span className="text-[12px] font-semibold tabular-nums text-neutral-700">
                                                {job.salary}
                                            </span>
                                        ) : null}
                                    </div>
                                </motion.button>
                            );
                        })
                    )}
                </div>
            </div>

            {/* Application modal */}
            <ApplicationFormLight
                isOpen={openTitle !== null}
                onClose={() => setOpenTitle(null)}
                jobTitle={openTitle ?? ""}
            />
        </section>
    );
}
