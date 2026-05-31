/* ─────────────────────────────────────────────────────────────────────
 *  /careers  ── Server component
 *  ──────────────
 *  Pulls the singleton `careersPage` document from Sanity at request
 *  time and passes typed props down to the new editorial sections.
 *  Every section ships with its own defaults so the page renders
 *  beautifully even before editors fill any field.
 *
 *  Page composition mirrors About + Contact:
 *    1. NavigationClient  (chrome from About/Contact)
 *    2. Hero — light editorial display + image marquee
 *    3. Intro / Why-Softree split with stats + pillars
 *    4. Open roles board with category filter
 *    5. Hiring process timeline
 *    6. Perks spotlight grid
 *    7. Culture / Life at Softree gallery mosaic
 *    8. Talent-pool spontaneous form
 *    9. LightContactSection  (CTA reused from About)
 *   10. LightFAQExact  (FAQ reused from About, with careers content)
 *   11. Footer (chrome from About/Contact)
 * ───────────────────────────────────────────────────────────────────── */

import dynamic from "next/dynamic";
import NavigationClient from "@/components/sections/navigation-client";
import Footer from "@/components/sections/footer";
import LightContactSection from "@/components/qc/homepage-light/LightContactSection";
import { client } from "@/sanity/client";
import { careersPageQuery } from "@/sanity/queries";

import CareersHeroLight from "./hero-light";
import CareersIntroLight from "./intro-light";
import CareersJobsLight from "./jobs-light";
import CareersProcessLight from "./process-light";
import CareersPerksLight from "./perks-light";
import CareersCultureLight from "./culture-light";
import CareersTalentPoolLight from "./talent-pool-light";
import type { CareersPageData } from "./types";

// FAQ component is heavy (GSAP, large grainient) — defer to keep TTFB low.
const LightFAQExactLazy = dynamic(
    () => import("@/components/homepage-light/LightFAQExact"),
    {
        loading: () => (
            <div className="min-h-[60vh] w-full bg-[var(--legacy-fffbf7)]" aria-hidden />
        ),
    },
);

const DEFAULT_CAREERS_FAQS = [
    {
        id: 1,
        serial: "question 01",
        question: "Where does Softree hire?",
        answer:
            "We hire across our Bengaluru and Cuttack offices, as well as fully remote roles for engineers based anywhere in India. Most teams operate hybrid with two days a week in office, but several senior roles are remote-first.",
    },
    {
        id: 2,
        serial: "question 02",
        question: "How long does the hiring process take?",
        answer:
            "Most candidates move from application to offer in under 12 days. We commit to a recruiter response within 48 hours, and every step has a clear timeline communicated upfront.",
    },
    {
        id: 3,
        serial: "question 03",
        question: "Do you sponsor certifications?",
        answer:
            "Yes. We fully sponsor Microsoft, AWS, and Google certifications, plus an annual learning budget for books, courses, and conferences. Time off for exams and prep is part of your work calendar, not your weekends.",
    },
    {
        id: 4,
        serial: "question 04",
        question: "Can I apply if I don’t see the right role?",
        answer:
            "Absolutely. Drop your CV in the talent pool above. When something matching your background opens up, our hiring team reaches out first — usually within a few weeks.",
    },
    {
        id: 5,
        serial: "question 05",
        question: "What does compensation look like?",
        answer:
            "Comp is benchmarked annually against IT-services and product-companies in your city. Offers include base salary, performance bonus, family medical insurance, and a learning budget. Salary ranges are shared during the recruiter call.",
    },
];

export const revalidate = 300; // 5 minutes ISR

async function fetchCareersPage(): Promise<CareersPageData | null> {
    try {
        return await client.fetch<CareersPageData | null>(careersPageQuery);
    } catch {
        // Studio doc not yet created — render with full defaults.
        return null;
    }
}

export default async function CareersPage() {
    const data = (await fetchCareersPage()) ?? {};

    // Merge CMS faqs into the shape `LightFAQExact` expects.
    const faqsFromCms = (data.faqs ?? [])
        .filter((f) => f.question && f.answer)
        .map((f, i) => ({
            id: i + 1,
            serial: `question ${String(i + 1).padStart(2, "0")}`,
            question: f.question!,
            answer: f.answer!,
        }));
    const faqsForFaqSection =
        faqsFromCms.length >= 3 ? faqsFromCms : DEFAULT_CAREERS_FAQS;

    return (
        <main className="min-h-screen pt-[100px]">
            {/* 1. Navigation — chrome from About / Contact */}
            <NavigationClient />

            {/* 2. Hero with marquee image rails */}
            <CareersHeroLight
                eyebrow={data.heroEyebrow}
                headline={data.heroHeadline}
                headlineItalic={data.heroHeadlineItalic}
                subline={data.heroSubline}
                cyclingRoles={data.heroCyclingRoles}
                gallery={data.heroGallery}
            />

            {/* 3. Intro / Why-Softree */}
            <CareersIntroLight
                badge={data.introBadge}
                heading={data.introHeading}
                highlight={data.introHighlight}
                body={data.introBody}
                stats={data.introStats}
                pillars={data.introPillars}
            />

            {/* 4. Open roles */}
            <CareersJobsLight
                heading={data.jobsHeading}
                subheading={data.jobsSubheading}
                categories={data.jobsCategories}
                jobs={data.jobs}
            />

            {/* 5. Hiring process */}
            <CareersProcessLight
                heading={data.processHeading}
                subheading={data.processSubheading}
                steps={data.processSteps}
            />

            {/* 6. Perks */}
            <CareersPerksLight
                heading={data.perksHeading}
                subheading={data.perksSubheading}
                perks={data.perks}
            />

            {/* 7. Culture / Life at Softree */}
            <CareersCultureLight
                heading={data.cultureHeading}
                subheading={data.cultureSubheading}
                gallery={data.cultureGallery}
                pillars={data.culturePillars}
            />

            {/* 8. Talent pool form */}
            <CareersTalentPoolLight
                heading={data.talentHeading}
                body={data.talentBody}
                email={data.talentEmail}
            />

            {/* 9. CTA — reused from About / Contact */}
            <LightContactSection />

            {/* 10. FAQs — reused with careers content */}
            <LightFAQExactLazy faqs={faqsForFaqSection} />

            {/* 11. Footer */}
            <Footer />
        </main>
    );
}
