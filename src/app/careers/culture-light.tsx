"use client";

/* ─────────────────────────────────────────────────────────────────────
 *  Careers Culture — Life at Softree
 *  ──────────────
 *  Mosaic of gallery photos with a side-by-side culture-pillars list.
 *  Same cream + amber palette as the hero so the page reads as a
 *  single editorial spread.
 * ───────────────────────────────────────────────────────────────────── */

import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Users2, Coffee } from "lucide-react";
import type { CareersCulturePillar, CareersImage } from "./types";
import { DEFAULT_GALLERY } from "./types";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const DEFAULT_PILLARS: CareersCulturePillar[] = [
    {
        title: "A real workspace, not a cubicle farm",
        body: "Our Bengaluru floor at Prestige Tech Platina 2 is built for focused work and unscripted conversations — open desks, named huddle rooms, and a café that doesn’t close at five.",
    },
    {
        title: "People who build, not posture",
        body: "We hire engineers, designers, and operators who care about shipping. No internal politics, no busywork, no manager hierarchy thicker than the codebase.",
    },
    {
        title: "Off-sites, demos & celebration weeks",
        body: "Quarterly off-sites, monthly demo days, and a yearly culture week that runs on terrible puns and excellent food. Yes, there’s a room called The Circus.",
    },
];

export interface CareersCultureLightProps {
    heading?: string;
    subheading?: string;
    gallery?: CareersImage[];
    pillars?: CareersCulturePillar[];
}

export default function CareersCultureLight({
    heading = "Life at Softree.",
    subheading = "Open spaces, off-sites, and rooms named after circuses. Our office in Prestige Tech Platina 2, Bengaluru, is built for focused work and unscripted conversations.",
    gallery,
    pillars,
}: CareersCultureLightProps) {
    const images =
        gallery && gallery.length >= 4 ? gallery : DEFAULT_GALLERY;
    const resolvedPillars = pillars && pillars.length ? pillars : DEFAULT_PILLARS;

    // We pick four photos for the mosaic: a tall hero on the left, three
    // smaller tiles on the right. Falls back gracefully if fewer images.
    const [hero, secondary, tertiary, quaternary] = [
        images[0],
        images[1] ?? images[0],
        images[2] ?? images[0],
        images[3] ?? images[1] ?? images[0],
    ];

    return (
        <section
            id="culture"
            className="relative w-full overflow-hidden bg-[#FAFAF8] py-20 md:py-24 lg:py-28"
        >
            <div
                aria-hidden
                className="pointer-events-none absolute -bottom-32 right-[-10%] h-[520px] w-[520px] rounded-full opacity-30 blur-[140px]"
                style={{
                    background:
                        "radial-gradient(circle, rgba(252,165,124,0.45), transparent 70%)",
                }}
            />

            <div className="relative mx-auto max-w-[1400px] px-6 lg:px-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, ease: EASE }}
                    className="mb-12 max-w-[820px]"
                >
                    <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-neutral-900/10 bg-white px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-700">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#F5B947]" />
                        Culture
                    </span>
                    <h2 className="text-[clamp(2.25rem,5.5vw,4rem)] font-semibold leading-[0.92] tracking-[-0.04em] text-neutral-950">
                        {heading.replace(/\.+$/, "")}
                        <span className="text-[#F5B947]">.</span>
                    </h2>
                    <p className="mt-4 max-w-[640px] text-[15px] leading-[1.65] text-neutral-600">
                        {subheading}
                    </p>
                </motion.div>

                {/* Mosaic + pillars */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
                    {/* Mosaic */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.8, ease: EASE }}
                        className="lg:col-span-7"
                    >
                        {/* Mobile: clean 2-up + 2-up stack. Tablet: hero on left, two stacked on right.
                            Desktop: 12-col mosaic with the hero leading. Aspect-ratio keeps tiles
                            square instead of using fixed pixel heights that overflowed before. */}
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-12 sm:auto-rows-[180px] md:auto-rows-[220px] lg:auto-rows-[240px]">
                            <CulturePhoto
                                image={hero}
                                className="col-span-2 aspect-[4/3] sm:col-span-7 sm:row-span-2 sm:aspect-auto sm:h-full"
                            />
                            <CulturePhoto
                                image={secondary}
                                className="col-span-1 aspect-square sm:col-span-5 sm:aspect-auto sm:h-full"
                            />
                            <CulturePhoto
                                image={tertiary}
                                className="col-span-1 aspect-square sm:col-span-3 sm:aspect-auto sm:h-full"
                            />
                            <CulturePhoto
                                image={quaternary}
                                className="col-span-2 aspect-[16/7] sm:col-span-2 sm:aspect-auto sm:h-full"
                            />
                        </div>
                    </motion.div>

                    {/* Pillars */}
                    <motion.div
                        initial={{ opacity: 0, x: 24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
                        className="flex flex-col justify-between gap-6 lg:col-span-5"
                    >
                        <div className="space-y-4">
                            {resolvedPillars.map((pillar, i) => (
                                <div
                                    key={`${pillar.title}-${i}`}
                                    className="rounded-3xl border border-neutral-900/8 bg-white p-6 shadow-[0_8px_28px_-18px_rgba(10,10,26,0.12)] transition-all hover:-translate-y-px hover:border-neutral-900/20 md:p-7"
                                >
                                    <div className="flex items-start gap-4">
                                        <span className="mt-1 grid h-9 w-9 flex-shrink-0 place-items-center rounded-full border border-neutral-900/12 bg-[#FFF8E8] text-[#7c4a03]">
                                            <span className="text-[12px] font-bold tabular-nums">
                                                {String(i + 1).padStart(2, "0")}
                                            </span>
                                        </span>
                                        <div>
                                            <h3 className="text-[18px] font-semibold leading-snug tracking-[-0.01em] text-neutral-950">
                                                {pillar.title}
                                            </h3>
                                            <p className="mt-2 text-[14px] leading-[1.65] text-neutral-600">
                                                {pillar.body}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Office tile */}
                        <div className="rounded-3xl border border-neutral-900/8 bg-neutral-950 p-6 text-white md:p-7">
                            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60">
                                <MapPin className="h-3.5 w-3.5" />
                                Visit our HQs
                            </div>
                            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <p className="text-sm font-semibold">Bengaluru</p>
                                    <p className="mt-1 text-[12px] leading-[1.6] text-white/60">
                                        Prestige Tech Platina 2, Outer Ring Road, Kadubeesanahalli,
                                        Bengaluru 560087
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold">Cuttack (HQ)</p>
                                    <p className="mt-1 text-[12px] leading-[1.6] text-white/60">
                                        Plot 5C/1283, Sector-10, CDA, Cuttack, Odisha 753014
                                    </p>
                                </div>
                            </div>
                            <div className="mt-5 flex flex-wrap items-center gap-4 text-[11px] uppercase tracking-[0.22em] text-white/55">
                                <span className="inline-flex items-center gap-1.5">
                                    <Users2 className="h-3.5 w-3.5" /> 200+ engineers
                                </span>
                                <span className="inline-flex items-center gap-1.5">
                                    <Coffee className="h-3.5 w-3.5" /> Café included
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function CulturePhoto({
    image,
    className,
}: {
    image: CareersImage;
    className?: string;
}) {
    if (!image?.url) return null;
    return (
        <div
            className={`relative overflow-hidden rounded-3xl border border-neutral-900/10 bg-neutral-100 shadow-[0_12px_40px_-20px_rgba(10,10,26,0.25)] transition-transform duration-500 hover:-translate-y-px ${className ?? ""}`}
        >
            <Image
                src={image.url}
                alt={image.alt || "Life at Softree"}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out hover:scale-[1.04]"
            />
            <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/45 to-transparent"
            />
            {image.caption ? (
                <span className="absolute bottom-3 left-3 right-3 z-10 rounded-md bg-black/60 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white backdrop-blur-sm">
                    {image.caption}
                </span>
            ) : null}
        </div>
    );
}
