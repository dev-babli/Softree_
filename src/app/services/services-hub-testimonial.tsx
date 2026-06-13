import { homepageTestimonials } from "@/data/homepage-showcase-content";

const featured = homepageTestimonials[0];

export default function ServicesHubTestimonial() {
  return (
    <section
      data-section="services-testimonial"
      className="relative w-full border-y border-[#0a0a1a]/[0.06] bg-[#FFFFFF] py-14 md:py-16"
      aria-labelledby="services-testimonial-heading"
    >
      <div className="mx-auto w-full max-w-[900px] px-4 sm:px-6 lg:px-12">
        <p
          id="services-testimonial-heading"
          className="text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FF5812]"
        >
          Client voice
        </p>
        <blockquote className="mt-6 text-center">
          <p className="text-[clamp(1.125rem,2.2vw,1.5rem)] font-medium leading-relaxed tracking-[-0.02em] text-[#0a0a1a]">
            &ldquo;{featured.quote}&rdquo;
          </p>
          <footer className="mt-6 text-sm text-[#0a0a1a]/55">
            <cite className="not-italic">
              <span className="font-semibold text-[#0a0a1a]">
                {featured.name}
              </span>
              {", "}
              {featured.company}
              {featured.location ? ` · ${featured.location}` : ""}
            </cite>
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
