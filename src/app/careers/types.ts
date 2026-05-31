/* ─────────────────────────────────────────────────────────────────────
 *  Careers — shared types
 *  Mirror of the `careersPage` Sanity document. The frontend uses these
 *  directly in props so we never drift from CMS shape. All fields are
 *  optional because editors may launch with partial content; each
 *  component supplies its own defaults.
 * ───────────────────────────────────────────────────────────────────── */

export interface CareersImage {
    url?: string;
    alt?: string;
    caption?: string;
}

export interface CareersStat {
    value?: string;
    label?: string;
}

export interface CareersPillar {
    label?: string;
    headline?: string;
    body?: string;
}

export interface CareersJob {
    title?: string;
    category?: string;
    location?: string;
    type?: string;
    experience?: string;
    salary?: string;
    badge?: string;
    description?: string;
    tags?: string[];
}

export interface CareersProcessStep {
    number?: string;
    title?: string;
    subtitle?: string;
    duration?: string;
    description?: string;
    details?: string[];
}

export interface CareersPerk {
    icon?: string;
    title?: string;
    description?: string;
    stat?: string;
    statLabel?: string;
}

export interface CareersCulturePillar {
    title?: string;
    body?: string;
}

export interface CareersFAQ {
    question?: string;
    answer?: string;
}

export interface CareersPageData {
    heroEyebrow?: string;
    heroHeadline?: string;
    heroHeadlineItalic?: string;
    heroSubline?: string;
    heroCyclingRoles?: string[];
    heroGallery?: CareersImage[];

    introBadge?: string;
    introHeading?: string;
    introHighlight?: string;
    introBody?: string;
    introStats?: CareersStat[];
    introPillars?: CareersPillar[];

    jobsHeading?: string;
    jobsSubheading?: string;
    jobsCategories?: string[];
    jobs?: CareersJob[];

    processHeading?: string;
    processSubheading?: string;
    processSteps?: CareersProcessStep[];

    perksHeading?: string;
    perksSubheading?: string;
    perks?: CareersPerk[];

    cultureHeading?: string;
    cultureSubheading?: string;
    cultureGallery?: CareersImage[];
    culturePillars?: CareersCulturePillar[];

    talentHeading?: string;
    talentBody?: string;
    talentEmail?: string;

    faqs?: CareersFAQ[];

    metaTitle?: string;
    metaDescription?: string;
}

/* ── Default fallbacks shared across server and client components ── */

export const DEFAULT_GALLERY: CareersImage[] = [
    { url: "/Gallery/Prestige Bangalore-1.webp", alt: "Softree Bengaluru reception lounge" },
    { url: "/Gallery/Prestige Bangalore-2.webp", alt: "Softree huddle room" },
    { url: "/Gallery/Prestige Bangalore-3.webp", alt: "Softree open-plan workspace" },
    { url: "/Gallery/Prestige Bangalore-4.webp", alt: "Softree breakout pods" },
    { url: "/Gallery/Prestige Bangalore-5.webp", alt: "Softree café & lunch area" },
    { url: "/Gallery/Prestige Bangalore-6.webp", alt: "Prestige Tech Platina 2 — Bengaluru" },
    { url: "/Gallery/Prestige Bangalore-7.webp", alt: "Softree conference room — The Circus" },
];
