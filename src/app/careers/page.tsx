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

import type { Metadata } from "next";
import dynamic from "next/dynamic";
import NavigationServer from "@/components/sections/navigation-server";
import Footer from "@/components/sections/footer";
import LightContactSection from "@/components/qc/homepage-light/LightContactSection";
import { sanityFetch } from "@/cms/lib/fetch";
import { careersPageQuery } from "@/cms/lib/queries/queries";
import { SITE_URL, ogImages, pageOgImage, twitterImages } from "@/lib/site-metadata";

import CareersHeroLight from "./hero-light";
import CareersIntroLight from "./intro-light";
import CareersJobsLight from "./jobs-light";
import CareersProcessLight from "./process-light";
import CareersPerksLight from "./perks-light";
import CareersCultureLight from "./culture-light";
import CareersTalentPoolLight from "./talent-pool-light";
import AnimatedPhotoGallery from "@/components/Gallery/AnimatedPhotoGallery";
import type { CareersPageData } from "./types";

export const metadata: Metadata = {
    title: "Careers at Softree Technology | Engineering & AI Innovation Roles",
    description:
        "Join Softree Technology's world-class engineering team. Explore career opportunities across AI, cloud computing, Power Platform, full-stack development, and QA engineering.",
    alternates: {
        canonical: `${SITE_URL}/careers`,
    },
    openGraph: {
        title: "Careers at Softree Technology | Join Our Engineering Team",
        description:
            "Build cutting-edge AI systems and cloud solutions with Softree Technology. Explore open positions in AI, full stack, and cloud engineering.",
        url: `${SITE_URL}/careers`,
        images: ogImages(pageOgImage("/careers", "Careers at Softree Technology")),
    },
    twitter: {
        card: "summary_large_image",
        title: "Careers at Softree Technology | Engineering Roles",
        description:
            "Explore open engineering, AI, and cloud development roles at Softree Technology.",
        images: twitterImages(pageOgImage("/careers", "Careers at Softree Technology")),
    },
};

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
        question: "What technology services does Softree Technology offer?",
        answer:
            "Softree Technology provides software development, AI development, web application development, data engineering, Microsoft Fabric, Power BI, SharePoint, cloud migration, and software testing services. We help businesses develop, modernize, integrate, and maintain technology systems based on their business goals.",
    },
    {
        id: 2,
        serial: "question 02",
        question: "Does Softree Technology provide AI development services?",
        answer:
            "Yes. Softree Technology offers AI development services, including generative AI applications, AI agents, enterprise copilots, Retrieval-Augmented Generation (RAG), and AI workflow automation. We work with technologies such as Azure OpenAI, LangChain, LangGraph, and Amazon Bedrock to develop AI applications for business use cases.",
    },
    {
        id: 3,
        serial: "question 03",
        question: "Can Softree Technology develop custom software applications?",
        answer:
            "Softree Technology provides custom software development services, including web application development, API development, system integration, application modernization, and maintenance. Our engineering team works with technologies such as React, Next.js, TypeScript, .NET, and cloud platforms based on project requirements.",
    },
    {
        id: 4,
        serial: "question 04",
        question: "How can businesses engage Softree Technology for IT services?",
        answer:
            "Businesses can engage Softree Technology for project-based development, dedicated engineering support, or ongoing technical assistance. Our team evaluates project requirements, technology needs, timelines, and business objectives to help identify an appropriate engagement model.",
    },
    {
        id: 5,
        serial: "question 05",
        question: "What career opportunities are available at Softree Technology?",
        answer:
            "Softree Technology offers career opportunities across technology and engineering roles, depending on current hiring requirements. Candidates can explore relevant openings in software development, AI engineering, data engineering, quality assurance, and other technical areas through our careers page.",
    },
    {
        id: 6,
        serial: "question 06",
        question: "How can I apply for jobs at Softree Technology?",
        answer:
            "To apply for jobs at Softree Technology, review the available openings on our careers page and submit your application with an updated resume. Highlight your technical skills, relevant project experience, and preferred role to help our recruitment team evaluate your profile.",
    },
    {
        id: 7,
        serial: "question 07",
        question: "Does Softree Technology offer remote or hybrid work opportunities?",
        answer:
            "Work arrangements at Softree Technology depend on the role, project requirements, and company policies. Candidates should review individual job descriptions or contact the recruitment team to confirm the available office-based, hybrid, or remote work options.",
    },
    {
        id: 8,
        serial: "question 08",
        question: "How does Softree Technology support employee learning and career growth?",
        answer:
            "Softree Technology encourages employees to develop their technical expertise, strengthen problem-solving skills, and stay updated with evolving technologies. Learning opportunities and career development pathways depend on job responsibilities, project exposure, and applicable company policies.",
    },
];

export const revalidate = 300; // 5 minutes ISR

async function fetchCareersPage(): Promise<CareersPageData | null> {
    try {
        return await sanityFetch<CareersPageData | null>(careersPageQuery);
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
            <NavigationServer />

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

            {/* 4. Open roles
            <CareersJobsLight
                heading={data.jobsHeading}
                subheading={data.jobsSubheading}
                categories={data.jobsCategories}
                jobs={data.jobs}
            /> */}

            {/* 5. Hiring process
            <CareersProcessLight
                heading={data.processHeading}
                subheading={data.processSubheading}
                steps={data.processSteps}
            /> */}

            {/* 6. Perks */}
            <CareersPerksLight
                heading={data.perksHeading}
                subheading={data.perksSubheading}
                perks={data.perks}
            />

            {/* 6b. Workspace gallery — animated rails from /public/Gallery */}
            <AnimatedPhotoGallery
                eyebrow="Our workspaces"
                title="Life at Softree,"
                titleAccent="in motion."
                description="From Prestige Tech Park in Bengaluru to our delivery hubs — see the rooms, desks, and teams you will work alongside."
                showCta={false}
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
