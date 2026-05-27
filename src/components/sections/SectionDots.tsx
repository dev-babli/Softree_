"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * SectionDots — Floating section progress indicator (desktop only).
 *
 * Sits on the right edge, shows a vertical strip of dots — one per major
 * homepage section. Active section pulses orange and shows a label on hover.
 * Hidden on mobile (touch users get no benefit; saves screen real estate).
 *
 * Sections expected: each rendered section needs `data-section="<id>"` on its
 * outermost element so this component can observe and link to it.
 */

const SECTIONS = [
    { id: "hero", label: "Hero" },
    { id: "services", label: "Services" },
    { id: "delivery", label: "Delivery" },
    { id: "features", label: "Features" },
    { id: "trust", label: "Trust" },
    { id: "testimonials", label: "Testimonials" },
    { id: "insights", label: "Insights" },
    { id: "tech", label: "Tech" },
    { id: "engagement", label: "Engagement" },
    { id: "faq", label: "FAQ" },
    { id: "contact", label: "Contact" },
];

export default function SectionDots() {
    const [activeId, setActiveId] = useState<string>("hero");
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        // Track scroll position to highlight the current section
        const observer = new IntersectionObserver(
            (entries) => {
                // Pick the entry with the largest intersection ratio
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
                if (visible) {
                    const id = visible.target.getAttribute("data-section");
                    if (id) setActiveId(id);
                }
            },
            {
                rootMargin: "-30% 0px -50% 0px",
                threshold: [0, 0.25, 0.5, 0.75, 1],
            }
        );

        SECTIONS.forEach((s) => {
            const el = document.querySelector(`[data-section="${s.id}"]`);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const handleClick = (id: string) => {
        const el = document.querySelector(`[data-section="${id}"]`);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    if (!mounted) return null;

    return (
        <nav
            aria-label="Section navigation"
            className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-3 pointer-events-auto"
        >
            {SECTIONS.map((section) => {
                const isActive = activeId === section.id;
                const isHovered = hoveredId === section.id;

                return (
                    <button
                        key={section.id}
                        onClick={() => handleClick(section.id)}
                        onMouseEnter={() => setHoveredId(section.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        aria-label={`Jump to ${section.label}`}
                        aria-current={isActive ? "true" : undefined}
                        className="group flex items-center gap-3 cursor-pointer"
                    >
                        <AnimatePresence>
                            {isHovered && (
                                <motion.span
                                    initial={{ opacity: 0, x: 8 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 8 }}
                                    transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                                    className="rounded-full bg-black/85 backdrop-blur-md px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white whitespace-nowrap shadow-lg"
                                >
                                    {section.label}
                                </motion.span>
                            )}
                        </AnimatePresence>
                        <span
                            className={`relative block rounded-full transition-all duration-300 ease-[var(--legacy-ease-0_16_1_0_3_1)]
                ${isActive
                                    ? "h-6 w-1.5 bg-[var(--softree-accent,#FF7A2F)]"
                                    : "h-1.5 w-1.5 bg-white/30 group-hover:bg-white/60"
                                }`}
                        />
                    </button>
                );
            })}
        </nav>
    );
}
