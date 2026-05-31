import { defineArrayMember, defineField, defineType } from "sanity";

/* ─────────────────────────────────────────────────────────────────────
 *  Careers Page — Sanity Schema
 *  ──────────────
 *  Singleton document that drives the entire /careers page. Every
 *  section the marketing team touches has its own field group so the
 *  studio UI stays approachable. The frontend (`src/app/careers`) is
 *  built to fall back to sensible defaults whenever a field is empty,
 *  so editors can launch with partial content and fill in over time.
 * ───────────────────────────────────────────────────────────────────── */

export const careersPageType = defineType({
    name: "careersPage",
    title: "Careers Page",
    type: "document",
    groups: [
        { name: "hero", title: "Hero" },
        { name: "intro", title: "Intro / Values" },
        { name: "jobs", title: "Open Roles" },
        { name: "process", title: "Hiring Process" },
        { name: "perks", title: "Why Softree (Perks)" },
        { name: "culture", title: "Life at Softree" },
        { name: "talent", title: "Talent Pool" },
        { name: "faqs", title: "FAQs" },
        { name: "seo", title: "SEO" },
    ],
    fields: [
        defineField({
            name: "title",
            title: "Internal Title",
            type: "string",
            initialValue: "Careers Page",
            validation: (Rule) => Rule.required(),
        }),

        /* ── Hero ────────────────────────────────────────────────────── */
        defineField({
            name: "heroEyebrow",
            title: "Hero Eyebrow",
            type: "string",
            group: "hero",
            initialValue: "Now hiring across Bengaluru, Cuttack & Remote",
        }),
        defineField({
            name: "heroHeadline",
            title: "Hero Headline",
            type: "string",
            group: "hero",
            description: "Primary line of the editorial display headline.",
            initialValue: "Build careers",
        }),
        defineField({
            name: "heroHeadlineItalic",
            title: "Hero Headline — italic accent",
            type: "string",
            group: "hero",
            description: "Italic serif word(s) shown below the primary line.",
            initialValue: "worth telling.",
        }),
        defineField({
            name: "heroSubline",
            title: "Hero Subline",
            type: "text",
            rows: 3,
            group: "hero",
            initialValue:
                "Senior engineers, real ownership, fixed-scope client work that ships in weeks not quarters. Find the role that fits how you build best.",
        }),
        defineField({
            name: "heroCyclingRoles",
            title: "Hero Cycling Roles",
            type: "array",
            of: [{ type: "string" }],
            group: "hero",
            initialValue: [
                "AI Engineer",
                "Power BI Developer",
                "Power Apps Developer",
                "QA Automation Engineer",
                "Full-stack Developer",
            ],
        }),
        defineField({
            name: "heroGallery",
            title: "Hero Gallery (marquee images)",
            type: "array",
            group: "hero",
            description: "8–12 office / culture photographs. Marquee loops infinitely.",
            of: [
                defineArrayMember({
                    type: "image",
                    options: { hotspot: true },
                    fields: [
                        defineField({ name: "alt", title: "Alt Text", type: "string" }),
                        defineField({ name: "caption", title: "Caption", type: "string" }),
                    ],
                }),
            ],
        }),

        /* ── Intro / Values ──────────────────────────────────────────── */
        defineField({
            name: "introBadge",
            title: "Intro Badge",
            type: "string",
            group: "intro",
            initialValue: "Why Softree",
        }),
        defineField({
            name: "introHeading",
            title: "Intro Heading",
            type: "string",
            group: "intro",
            initialValue: "A team of senior engineers shipping enterprise software.",
        }),
        defineField({
            name: "introHighlight",
            title: "Intro Highlight (accent line)",
            type: "string",
            group: "intro",
            initialValue:
                "200+ enterprise projects delivered. 50+ Microsoft-certified engineers. One culture built around mastery, not management.",
        }),
        defineField({
            name: "introBody",
            title: "Intro Body Paragraph",
            type: "text",
            rows: 4,
            group: "intro",
            initialValue:
                "We hire people who care about the craft. Engineers who can architect, write tests, talk to clients, and ship production software end-to-end. No layered management, no busywork — just clear goals, weekly demos, and senior peers who push you to ship better code than you did last month.",
        }),
        defineField({
            name: "introStats",
            title: "Intro Stats",
            type: "array",
            group: "intro",
            validation: (Rule) => Rule.max(4),
            of: [
                defineArrayMember({
                    type: "object",
                    fields: [
                        defineField({ name: "value", type: "string", title: "Value" }),
                        defineField({ name: "label", type: "string", title: "Label" }),
                    ],
                    preview: { select: { title: "value", subtitle: "label" } },
                }),
            ],
            initialValue: [
                { value: "200+", label: "Engineers across India" },
                { value: "50+", label: "Microsoft-certified specialists" },
                { value: "98%", label: "Offer acceptance rate" },
                { value: "4.9★", label: "Glassdoor rating" },
            ],
        }),
        defineField({
            name: "introPillars",
            title: "Intro Pillar Cards (Mission / Vision style)",
            type: "array",
            group: "intro",
            validation: (Rule) => Rule.max(2),
            of: [
                defineArrayMember({
                    type: "object",
                    fields: [
                        defineField({ name: "label", type: "string", title: "Pill Label" }),
                        defineField({ name: "headline", type: "string", title: "Headline" }),
                        defineField({ name: "body", type: "text", rows: 3, title: "Body" }),
                    ],
                    preview: { select: { title: "headline", subtitle: "label" } },
                }),
            ],
        }),

        /* ── Open Roles ──────────────────────────────────────────────── */
        defineField({
            name: "jobsHeading",
            title: "Jobs Section Heading",
            type: "string",
            group: "jobs",
            initialValue: "Open roles.",
        }),
        defineField({
            name: "jobsSubheading",
            title: "Jobs Section Subheading",
            type: "string",
            group: "jobs",
            initialValue: "Find a role that fits how you build best.",
        }),
        defineField({
            name: "jobsCategories",
            title: "Job Categories (filter pills)",
            type: "array",
            of: [{ type: "string" }],
            group: "jobs",
            initialValue: ["All", "AI", "Power Platform", "Power BI", "Web", "Mobile", "QA", "Marketing", "HR"],
        }),
        defineField({
            name: "jobs",
            title: "Open Positions",
            type: "array",
            group: "jobs",
            of: [
                defineArrayMember({
                    type: "object",
                    fields: [
                        defineField({ name: "title", type: "string", title: "Title", validation: (R) => R.required() }),
                        defineField({ name: "category", type: "string", title: "Category" }),
                        defineField({ name: "location", type: "string", title: "Location", initialValue: "Hybrid" }),
                        defineField({ name: "type", type: "string", title: "Employment Type", initialValue: "Full time" }),
                        defineField({ name: "experience", type: "string", title: "Experience" }),
                        defineField({ name: "salary", type: "string", title: "Salary Range" }),
                        defineField({ name: "badge", type: "string", title: "Badge", description: "e.g. Hot, New, Urgent" }),
                        defineField({ name: "description", type: "text", rows: 3, title: "Description" }),
                        defineField({
                            name: "tags",
                            title: "Tags",
                            type: "array",
                            of: [{ type: "string" }],
                        }),
                    ],
                    preview: { select: { title: "title", subtitle: "category" } },
                }),
            ],
        }),

        /* ── Hiring Process ──────────────────────────────────────────── */
        defineField({
            name: "processHeading",
            title: "Process Heading",
            type: "string",
            group: "process",
            initialValue: "How we hire.",
        }),
        defineField({
            name: "processSubheading",
            title: "Process Subheading",
            type: "string",
            group: "process",
            initialValue:
                "No black holes, no ghosting. Most candidates hear back within 48 hours and the full loop wraps in under two weeks.",
        }),
        defineField({
            name: "processSteps",
            title: "Process Steps",
            type: "array",
            group: "process",
            of: [
                defineArrayMember({
                    type: "object",
                    fields: [
                        defineField({ name: "number", type: "string", title: "Step Number" }),
                        defineField({ name: "title", type: "string", title: "Step Title" }),
                        defineField({ name: "subtitle", type: "string", title: "Subtitle" }),
                        defineField({ name: "duration", type: "string", title: "Duration" }),
                        defineField({ name: "description", type: "text", rows: 2, title: "Description" }),
                        defineField({
                            name: "details",
                            title: "Details (bullets)",
                            type: "array",
                            of: [{ type: "string" }],
                        }),
                    ],
                    preview: { select: { title: "title", subtitle: "duration" } },
                }),
            ],
        }),

        /* ── Perks ──────────────────────────────────────────────────── */
        defineField({
            name: "perksHeading",
            title: "Perks Heading",
            type: "string",
            group: "perks",
            initialValue: "Where great careers actually happen.",
        }),
        defineField({
            name: "perksSubheading",
            title: "Perks Subheading",
            type: "string",
            group: "perks",
            initialValue:
                "We back our people with tools, learning budgets, flexible setups, and the kind of mentorship that compounds over years.",
        }),
        defineField({
            name: "perks",
            title: "Perks",
            type: "array",
            group: "perks",
            of: [
                defineArrayMember({
                    type: "object",
                    fields: [
                        defineField({ name: "icon", type: "string", title: "Icon Glyph" }),
                        defineField({ name: "title", type: "string", title: "Title" }),
                        defineField({ name: "description", type: "text", rows: 2, title: "Description" }),
                        defineField({ name: "stat", type: "string", title: "Stat" }),
                        defineField({ name: "statLabel", type: "string", title: "Stat Label" }),
                    ],
                    preview: { select: { title: "title", subtitle: "stat" } },
                }),
            ],
        }),

        /* ── Culture / Life at Softree ───────────────────────────────── */
        defineField({
            name: "cultureHeading",
            title: "Culture Heading",
            type: "string",
            group: "culture",
            initialValue: "Life at Softree.",
        }),
        defineField({
            name: "cultureSubheading",
            title: "Culture Subheading",
            type: "string",
            group: "culture",
            initialValue:
                "Open spaces, off-sites, and rooms named after circuses. Our office in Prestige Tech Platina 2, Bengaluru, is built for focused work and unscripted conversations.",
        }),
        defineField({
            name: "cultureGallery",
            title: "Culture Gallery",
            type: "array",
            group: "culture",
            description: "6–10 photos showcasing the workplace.",
            of: [
                defineArrayMember({
                    type: "image",
                    options: { hotspot: true },
                    fields: [
                        defineField({ name: "alt", type: "string", title: "Alt Text" }),
                        defineField({ name: "caption", type: "string", title: "Caption" }),
                    ],
                }),
            ],
        }),
        defineField({
            name: "culturePillars",
            title: "Culture Pillars",
            type: "array",
            group: "culture",
            validation: (Rule) => Rule.max(3),
            of: [
                defineArrayMember({
                    type: "object",
                    fields: [
                        defineField({ name: "title", type: "string", title: "Title" }),
                        defineField({ name: "body", type: "text", rows: 3, title: "Body" }),
                    ],
                    preview: { select: { title: "title" } },
                }),
            ],
        }),

        /* ── Talent Pool ─────────────────────────────────────────────── */
        defineField({
            name: "talentHeading",
            title: "Talent Pool Heading",
            type: "string",
            group: "talent",
            initialValue: "Don’t see the right role?",
        }),
        defineField({
            name: "talentBody",
            title: "Talent Pool Body",
            type: "text",
            rows: 3,
            group: "talent",
            initialValue:
                "Drop your CV here. When something matching your background opens up, we’ll come back to you first — usually within a few weeks.",
        }),
        defineField({
            name: "talentEmail",
            title: "Talent Pool Email",
            type: "string",
            group: "talent",
            initialValue: "shradhab@softreetechnology.com",
        }),

        /* ── FAQs ────────────────────────────────────────────────────── */
        defineField({
            name: "faqs",
            title: "Careers FAQs",
            type: "array",
            group: "faqs",
            of: [
                defineArrayMember({
                    type: "object",
                    fields: [
                        defineField({ name: "question", type: "string", title: "Question" }),
                        defineField({ name: "answer", type: "text", rows: 4, title: "Answer" }),
                    ],
                    preview: { select: { title: "question" } },
                }),
            ],
        }),

        /* ── SEO ─────────────────────────────────────────────────────── */
        defineField({ name: "metaTitle", type: "string", title: "Meta Title", group: "seo" }),
        defineField({ name: "metaDescription", type: "text", rows: 3, title: "Meta Description", group: "seo" }),
    ],
    preview: {
        select: { title: "title" },
        prepare({ title }) {
            return { title: title || "Careers Page", subtitle: "Singleton" };
        },
    },
});
