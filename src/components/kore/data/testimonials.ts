/**
 * Testimonials fixture (Requirement 10.1, 10.2; task 12.1).
 *
 * Source: `public/kore-source-sections.html` — the "Customer testimonials"
 * section `[swiper-slider].swiper-outer` containing 14 `.testimonial-card`
 * slides (`aria-label="1 / 14"` … `"14 / 14"`), in source DOM order.
 *
 * Each source `.testimonial-card` is structured as:
 *   <div class="heading-style-h5">{company}</div>
 *   <div class="testimonial-card-body">
 *     <p>{quote}</p>
 *     <div class="testimonial-card-detail-wrap">
 *       <div class="testimonial-card-detail">
 *         <div>{authorName}</div>
 *         <div class="text-color-charcoal2">{role}</div>
 *       </div>
 *     </div>
 *   </div>
 *
 * ── SOURCING / DEVIATION NOTES ─────────────────────────────────────────────
 *
 *  • NO CUSTOMER LOGOS. The testimonial cards in Source_Document contain NO
 *    `<img>` / logo asset — the customer is rendered as a text company name in
 *    `.heading-style-h5` (e.g. "Morgan Stanley"). Accordingly:
 *      - `assets.ts` has zero `testimonials` entries (confirmed: no such key),
 *        and there are NO CDN logo URLs in the testimonial markup to passthrough.
 *      - design.md `TestimonialSlide` types `customerLogo: AssetRef` as
 *        REQUIRED, but no such asset exists in the source. To stay faithful and
 *        avoid inventing an asset, `customerLogo` is made OPTIONAL here and is
 *        OMITTED on every slide. (Flagged deviation from design.md.)
 *      - The company text is captured in the additive `company` field so the
 *        `.heading-style-h5` content is preserved one-to-one.
 *
 *  • FIELD MAPPING: `customerName` = the testimonial AUTHOR's name (person),
 *    `role` = the author's title, `company` = the `.heading-style-h5` brand.
 *
 *  • VERBATIM TEXT: quotes preserve Source_Document punctuation exactly,
 *    including straight vs. curly quotation marks, en/em dashes, "&" (decoded
 *    from `&amp;`), and source typos ("wasnt", "it;s", "expierence") — this is a
 *    pixel-fidelity clone, so copy is reproduced as-is, not corrected.
 *
 *  • SWIPER CONFIG: Source_Document initializes every `[swiper-slider]` through
 *    a single generic `handleSwiper()` (Swiper 11) with:
 *        slidesPerView: 'auto', spaceBetween: 24 (data-space default),
 *        grabCursor: true, speed: 700, centeredSlides: false,
 *        watchOverflow: true, navigation: { nextEl, prevEl },
 *        breakpoints: { 0: { spaceBetween: 10 }, 768: { spaceBetween: 24 } }
 *    The testimonial `[swiper-slider]` declares NO `data-*` overrides, so the
 *    defaults above apply. Critically, the source config has **no `loop`, no
 *    `autoplay`, and no `pagination`** for this slider (only prev/next
 *    navigation). Although Requirement 10.2 enumerates loop/autoplay/pagination,
 *    the source does NOT declare them, so they are encoded as `loop: false`,
 *    `autoplay: false`, and `pagination` omitted — matching Source_Document
 *    truth. (Flagged: the requirement language is broader than the source init;
 *    surface to the user if pause-on-hover/autoplay behavior is later expected.)
 */

import type { AssetRef } from '../assets';

/**
 * Swiper 11 configuration shape (design.md `SwiperConfig`).
 *
 * `autoplay` is `false` when disabled, or `{ delay, disableOnInteraction }`
 * when enabled. `breakpoints` maps min-width → partial overrides.
 */
export interface SwiperConfig {
    readonly slidesPerView: number | 'auto';
    readonly spaceBetween: number;
    readonly loop: boolean;
    readonly speed: number;
    readonly autoplay: { readonly delay: number; readonly disableOnInteraction: boolean } | false;
    readonly pagination?: { readonly clickable: boolean };
    readonly navigation?: boolean;
    readonly freeMode?: boolean;
    readonly breakpoints?: Readonly<Record<number, Partial<SwiperConfig>>>;
}

/**
 * A single testimonial slide (design.md `TestimonialSlide`).
 *
 * `customerLogo` is OPTIONAL here (omitted on every slide) — Source_Document
 * has no testimonial logo asset; see file header. `company` is additive and
 * holds the `.heading-style-h5` brand text.
 */
export interface TestimonialSlide {
    readonly id: string;
    readonly customerLogo?: AssetRef;
    /** `.heading-style-h5` brand text (additive; no logo asset in source). */
    readonly company: string;
    /** The testimonial author's name. */
    readonly customerName: string;
    /** The testimonial author's title / role. */
    readonly role: string;
    readonly quote: string;
}

/** Props for `KoreTestimonials` (design.md). */
export interface KoreTestimonialsProps {
    readonly slides: readonly TestimonialSlide[];
    readonly swiperConfig: SwiperConfig;
}

// --- Swiper config (verbatim from Source_Document `handleSwiper()` defaults) --

export const testimonialsSwiperConfig: SwiperConfig = {
    slidesPerView: 'auto',
    spaceBetween: 24,
    loop: false,
    speed: 700,
    autoplay: false,
    navigation: true,
    breakpoints: {
        0: { spaceBetween: 10 },
        768: { spaceBetween: 24 },
    },
} as const;

// --- Slides (14, source DOM order 1 → 14) ------------------------------------

const slides: readonly TestimonialSlide[] = [
    {
        id: 'morgan-stanley',
        company: 'Morgan Stanley',
        customerName: 'Shailesh Gavankar',
        role: 'Head, AI Strategy + Execution',
        quote:
            '"What I was really trying to solve was how to give 15–20 minutes back each ' +
            'day to our financial advisors. That extra time lets them reach out to ' +
            'customers more quickly, more effectively, or even make one additional ' +
            'phone call — and that’s a real revenue driver for us."',
    },
    {
        id: 'pfizer',
        company: 'Pfizer',
        customerName: 'Vik Kapoor',
        role: 'Head of GenAI Platforms & Products',
        quote:
            'Since we started with Kore.ai, we’ve deployed 60 AI agents across the ' +
            'enterprise—covering research, development, medical, commercial, and ' +
            'manufacturing across global markets and multiple languages. We needed a ' +
            'scalable platform, and these agents will only continue to become more ' +
            'intelligent.',
    },
    {
        id: 'mphasis',
        company: 'Mphasis',
        customerName: 'Nitin Rakesh',
        role: 'CEO, Mphasis',
        quote:
            'We are proud to be a strategic implementation partner of Kore.ai, and we ' +
            'feel especially confident knowing that Kore.ai’s foundation on AWS, ' +
            'delivering unmatched reliability and scalability.',
    },
    {
        id: 'microsoft',
        company: 'Microsoft',
        customerName: 'Puneet Chandok',
        role: 'President, India and South Asia',
        quote:
            '“Our strategic partnership with Kore.ai marks a significant milestone in ' +
            'our mission to accelerate enterprise AI transformation. By integrating ' +
            'Kore.ai’s advanced conversational and GenAI capabilities with Microsoft’s ' +
            'robust cloud and AI services, we are enabling enterprises to adopt AI at ' +
            'scale and with enterprise-grade security."',
    },
    {
        id: 'amd-jackson',
        company: 'AMD',
        customerName: 'Mark Jackson',
        role: 'Director, Global HR Technology',
        quote:
            '“In the moments that matter most, of course, employees want to connect ' +
            'with people. GenAI frees HR professionals to engage with the employees ' +
            'they serve and be present in the interactions that deliver higher ' +
            'satisfaction.”',
    },
    {
        id: 'aws',
        company: 'AWS',
        customerName: 'Chris Casey',
        role: 'Head of AWS Partnerships, Asia-Pacific and Japan',
        quote:
            'We are excited to expand our collaboration and to reinforce our shared ' +
            'commitment to empowering customers in the AI era',
    },
    {
        id: 'amd-gama',
        company: 'AMD',
        customerName: 'Robert Gama',
        role: 'SVP & Chief Human Resources Officer',
        quote:
            '"As a global leader in AI, we saw a clear opportunity to bring that ' +
            'leadership into our own workplace. Our work with Kore.ai shows what\'s ' +
            'possible when you use AI not to replace people, but to enhance how they ' +
            'work, connect, and lead.',
    },
    {
        id: 'boardwalk-reit',
        company: 'Boardwalk REIT',
        customerName: 'Karine Dal Collo',
        role: 'Director, Customer Service',
        quote:
            '“At Boardwalk, our commitment has always been to put residents first. ' +
            'Partnering with Kore.ai amplified our ability to deliver empathetic, ' +
            'timely service at scale. This is more than technology; it;s a foundation ' +
            'for smarter, more connected community expierence.”',
    },
    {
        id: 'autodoc',
        company: 'Autodoc',
        customerName: 'Yuliya Teteryuk',
        role: 'Customer Care Director',
        quote:
            'We are passionate about using technology to empower our people. That’s why ' +
            'we partnered with Kore.ai to integrate AI into our customer and employee ' +
            'support operations. We have observed 74% first-call resolution and ' +
            'significant savings. Our people are happier. We are excited about the ' +
            'simplicity, potential, and benefits AI for Work bring to the table.',
    },
    {
        id: 'amd-sayer',
        company: 'AMD',
        customerName: 'Lesa Sayer',
        role: 'CVP, Global HR Shared Services',
        quote:
            '"We knew this wasnt just about automating tasks -- it was about creating a ' +
            'smarter, more intuitive HR experience. By designing with our employees in ' +
            'mind, we\'ve built a solution that\'s fast, reliable, and ready to evolve ' +
            'with our business."',
    },
    {
        id: 'guidewell',
        company: 'Guidewell',
        customerName: 'Anne Hoverson',
        role: 'VP, Digital Transformation & Strategy',
        quote:
            'This is about raising the bar—not just implementing technology, but ' +
            'evolving how we deliver healthcare support. With Kore.ai, we’ve moved from ' +
            'siloed experiences to a true ecosystem that’s modern, scalable, and ' +
            'member-centric.',
    },
    {
        id: 'inception',
        company: 'Inception',
        customerName: 'Andrew Jackson',
        role: 'CAIO, G42',
        quote:
            'Partnering with Kore.ai aligns perfectly with our mission to develop ' +
            'AI-powered solutions that drive real business value to the customers in ' +
            'UAE and rest of the world,”',
    },
    {
        id: 'deutsche-bank',
        company: 'Deutsche Bank',
        customerName: 'Paul Hewitt',
        role: 'Head of AI Innovation & Digital Employee Experience, HR',
        quote:
            'I have the honour of representing Deutsche Bank HR, sharing our AI ' +
            'journey—from a humble FAQ chatbot in one region back in 2020 to a ' +
            'multi-jurisdiction automation strategy by 2025.',
    },
    {
        id: 'eli-lilly',
        company: 'Eli Lilly',
        customerName: 'Michael Leist',
        role: 'Associate Director - Tech',
        quote:
            'AI transformed our Tech@Lilly service desk, now handling 70% of requests, ' +
            'enabling colleagues to maximize productivity.',
    },
];

// --- Fixture -----------------------------------------------------------------

export const testimonialsData: KoreTestimonialsProps = {
    slides,
    swiperConfig: testimonialsSwiperConfig,
} as const;
