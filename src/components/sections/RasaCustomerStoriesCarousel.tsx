"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";

type Quote = {
    logo: string;
    alt: string;
    quote: string;
    name: string;
    title: string;
};

const QUOTES: Quote[] = [
    {
        logo: "https://cdn.prod.website-files.com/68e92f16754061804418f615/6a079ac6593b8f9b948a9483_6a079aa2343867bc5795ec64_providence-white.svg",
        alt: "providence logo",
        quote:
            "We've built a scalable, compliant platform with Rasa that supports real patient needs and drives measurable outcomes. CALM gives us a framework to keep that momentum going, with the flexibility to grow responsibly as expectations around AI continue to evolve.",
        name: "Wayne Foley",
        title:
            "Director Software Engineering, Digital Innovation Group, at Providence",
    },
    {
        logo: "https://cdn.prod.website-files.com/68e92f16754061804418f615/6a0e2d7c3f5cc942a6af20bf_6902c179134e73373f50b849_cs%2520logo%2520euprava.avif",
        alt: "Serbia eUprava logo",
        quote:
            "With Rasa, we launched quickly and gave citizens a simpler way to access government services. The system allows us to expand at our own pace while controlling how services are delivered. Studio and CALM allow us to build new use cases while maintaining stability as the platform grows.",
        name: "Bogdan Stešević",
        title:
            "Head of the Group for Quality of Services and Development of AI at eUprava",
    },
    {
        logo: "https://cdn.prod.website-files.com/68e92f16754061804418f615/6a079acb1fa98b137182d22c_6a079aa5088fa5614f9615d0_groupe-ima-white.svg",
        alt: "groupe-ima logo",
        quote:
            "We’re not experimenting with voice. We’re deploying it. That’s the difference.",
        name: "Loic Mayet",
        title: "Information Systems Director, Groupe IMA",
    },
    {
        logo: "https://cdn.prod.website-files.com/68e92f16754061804418f615/6a079aca69c67892132dbd3c_6a079aa4c5fb00cf257abc91_eddy-travels-white.svg",
        alt: "eddy-travels logo",
        quote:
            "Switching to Rasa accelerated development. We now process thousands of conversations each month with 96% accuracy, which resulted in better user engagement and more searches per conversation.",
        name: "Edmundas Balčikonis",
        title: "CEO, Eddy Travels",
    },
    {
        logo: "https://cdn.prod.website-files.com/68e92f16754061804418f615/6a079ac987600fd93013f639_6a079aa3fb59efcce62cb908_orange-white.svg",
        alt: "orange logo",
        quote:
            "We developed a real partnership with Rasa based on developing skills rapidly, correcting bugs quickly, and sharing a wish list with the dev team.",
        name: "Richard Popa",
        title: "Project Leader and Solutions Manager, Orange",
    },
    {
        logo: "https://cdn.prod.website-files.com/68e92f16754061804418f615/6a079ac7d754e68eee4e5e4f_6a079aa3c0460e36625e8b8e_albert-heijn-white.svg",
        alt: "albert-heijn logo",
        quote:
            "Albert Heijn adopted Rasa and began migrating to CALM through a coexistence strategy — starting with a single flow and gradually expanding coverage, achieving a 22% improvement in prevented contact rate and a 37% increase in quality score.",
        name: "Albert Heijn",
        title: "Largest supermarket chain in the Netherlands",
    },
    {
        logo: "https://cdn.prod.website-files.com/68e92f16754061804418f615/6a079ac6593b8f9b948a9483_6a079aa2343867bc5795ec64_providence-white.svg",
        alt: "providence logo",
        quote:
            "Grace acts as a multi-purpose patient-facing assistant — booking appointments, routing based on symptoms, and helping users navigate their care journey entirely through our app.",
        name: "Providence Health",
        title: "Digital Innovation Team",
    },
    {
        logo: "https://cdn.prod.website-files.com/68e92f16754061804418f615/6a079ac5343867bc5795f6b3_69037213afd6918bcce68a18_nib%2520logo.svg",
        alt: "nib-group logo",
        quote:
            "With Rasa, we consolidated five bots into a single assistant experience. Fallback rates dropped from 18% to 3.5%, and we’re now expanding to voice.",
        name: "nib Group",
        title: "Digital Team Lead",
    },
    {
        logo: "https://cdn.prod.website-files.com/68e92f16754061804418f615/69dcf786162d6c11ad1052ad_n26.svg",
        alt: "N26 logo",
        quote:
            "N26 transitioned from concept to production in just four weeks, deploying the AI assistant within their secure cloud environment to maintain full data control.",
        name: "N26",
        title: "",
    },
    {
        logo: "https://cdn.prod.website-files.com/68e92f16754061804418f615/69dcf6f6446b5f8fbb5819c0_nib%20group.svg",
        alt: "nib group logo",
        quote:
            "Rasa’s platform enabled us to customize and scale our AI assistant’s capabilities, ensuring it evolved with changing member needs and organizational goals.",
        name: "nib Group",
        title: "",
    },
    {
        logo: "https://cdn.prod.website-files.com/68e92f16754061804418f615/68e930414439d143e674b947_ergo%20logo.svg",
        alt: "ergo logo",
        quote:
            "With Rasa, we at ERGO are completely rethinking how we build customer support experiences. It’s about developing faster and cheaper, and at scale. Rasa helps us to realize these goals.",
        name: "Gregor Wiest",
        title: "Head of Innovation, ERGO Group AG",
    },
    {
        logo: "https://cdn.prod.website-files.com/68e92f16754061804418f615/68e92ff6638de532dba7c2c6_t-mobile.svg",
        alt: "t-mobile logo",
        quote:
            "Since the chatbot based on Rasa CALM can process around 50% of service desk inquiries independently, we reduced the need for human agents by approximately 30%. Thanks to the excellent backend integration capabilities of the Rasa solution, we quickly implemented the chatbot’s self-service features.",
        name: "Roland Csibi",
        title: "Service Hub Owner – User Support Service Hub",
    },
    {
        logo: "https://cdn.prod.website-files.com/68e92f16754061804418f615/68e92fa938a73b8083fc4807_swisscom.svg",
        alt: "swisscom logo",
        quote:
            "Our goal was to align cutting-edge AI technology with customer needs to provide seamless and innovative experiences. Partnering with Rasa allowed us to rethink how conversational AI could transform support.",
        name: "Daniel Schupmann",
        title:
            "Head of CAI/ GenAI @B2C and Digital Care Platforms/ Experience",
    },
    {
        logo: "https://cdn.prod.website-files.com/68e92f16754061804418f615/68e92f3d9bfbe47c60310488_autodesk%20logo.svg",
        alt: "autodesk logo",
        quote:
            "We needed a solution that could scale with our ambitions. Rasa solves some hard problems related to conversational AI that enable us to move faster.",
        name: "James Bradley",
        title: "Senior Director of Data Science & Machine Learning",
    },
];

const ArrowIcon = ({ flipped = false }: { flipped?: boolean }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className={`h-5 w-5 ${flipped ? "rotate-180" : ""}`}
    >
        <path
            d="M14 19L21 12L14 5"
            stroke="currentColor"
            strokeMiterlimit="10"
            strokeWidth="2"
        />
        <path
            d="M21 12H2"
            stroke="currentColor"
            strokeMiterlimit="10"
            strokeWidth="2"
        />
    </svg>
);

export default function RasaCustomerStoriesCarousel() {
    const swiperRef = useRef<SwiperType | null>(null);

    return (
        <section className="relative overflow-hidden bg-black py-20 md:py-28 lg:py-32">
            <div className="mx-auto w-full max-w-[1320px] px-5 md:px-8 lg:px-12">
                {/* Heading block */}
                <div className="mb-12 md:mb-16">
                    <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-white/80 backdrop-blur">
                        customers
                    </span>

                    <h2 className="mt-6 max-w-[18ch] text-[2.25rem] font-medium leading-[1.05] tracking-[-0.02em] text-white md:text-[3rem] lg:text-[3.5rem]">
                        See what our
                        <br />
                        customers are saying
                    </h2>

                    <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
                        Enterprise teams use Rasa to build and deploy high-trust AI agents
                        that perform in production.
                    </p>
                </div>

                {/* Swiper */}
                <div className="rasa-swiper-wrap">
                    <Swiper
                        onSwiper={(s) => {
                            swiperRef.current = s;
                        }}
                        slidesPerView={1.05}
                        spaceBetween={20}
                        loop
                        grabCursor
                        breakpoints={{
                            640: { slidesPerView: 1.6, spaceBetween: 24 },
                            900: { slidesPerView: 2.2, spaceBetween: 28 },
                            1200: { slidesPerView: 3, spaceBetween: 32 },
                        }}
                    >
                        {QUOTES.map((q, i) => (
                            <SwiperSlide key={`${q.name}-${i}`}>
                                <article className="flex h-full min-h-[420px] flex-col justify-between rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.015] p-7 md:min-h-[460px] md:p-8">
                                    <div className="flex h-12 items-start">
                                        <img
                                            src={q.logo}
                                            alt={q.alt}
                                            loading="lazy"
                                            className="max-h-9 w-auto object-contain opacity-90"
                                        />
                                    </div>

                                    <blockquote className="mt-6 flex-1 text-[15px] leading-[1.6] text-white/85 md:text-base">
                                        <p>{q.quote}</p>
                                    </blockquote>

                                    <footer className="mt-8 border-t border-white/10 pt-5">
                                        <div className="text-sm font-semibold text-white">
                                            {q.name}
                                        </div>
                                        {q.title ? (
                                            <div className="mt-1 text-xs leading-snug text-white/55">
                                                {q.title}
                                            </div>
                                        ) : null}
                                    </footer>
                                </article>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Navigation */}
                    <div className="mt-10 flex items-center gap-3">
                        <button
                            type="button"
                            aria-label="Previous slide"
                            onClick={() => swiperRef.current?.slidePrev()}
                            className="group inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-white/60 hover:bg-white hover:text-black"
                        >
                            <ArrowIcon flipped />
                        </button>
                        <button
                            type="button"
                            aria-label="Next slide"
                            onClick={() => swiperRef.current?.slideNext()}
                            className="group inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-white/60 hover:bg-white hover:text-black"
                        >
                            <ArrowIcon />
                        </button>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .rasa-swiper-wrap :global(.swiper) {
          overflow: visible;
        }
        .rasa-swiper-wrap :global(.swiper-slide) {
          height: auto;
        }
      `}</style>
        </section>
    );
}
