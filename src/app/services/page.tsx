import Navigation from "@/components/sections/navigation";
import Footer from "@/components/sections/footer";
import ServicesHeader from "./header";
import ServicesDetails from "./service-details";
import CaseStudiesSlider from "./cases";
import Link from "next/link";
export default function Home() {
  return (
    <main>
      <Navigation />
      <ServicesHeader />
      <ServicesDetails />
      <CaseStudiesSlider />
      {/* SERVICES CTA SECTION */}
      <section className="relative bg-black py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div
            className="
        relative
        rounded-3xl
        bg-white/5
        backdrop-blur-xl
        border border-white/10
        px-10
        py-16
        text-center
        overflow-hidden
      "
          >
            {/* STRONG MONOCHROME BOTTOM BORDER */}
            <span
              className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          w-full
          h-[6px]
          bg-gradient-to-r
          from-white
          via-gray-400
          to-black
          shadow-[0_-4px_18px_rgba(255,255,255,0.35)]
        "
            />

            {/* SOFT GLASS SHEEN */}
            <span
              className="
          pointer-events-none
          absolute
          inset-0
          bg-gradient-to-br
          from-white/10
          via-transparent
          to-transparent
          opacity-30
        "
            />

            {/* CONTENT */}
            <div className="relative z-10 max-w-3xl mx-auto space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Let’s build your solution
              </h2>

              <p className="text-lg text-gray-300 leading-relaxed">
                From strategy to execution, we help businesses design, build,
                and scale secure digital solutions tailored to their needs.
              </p>

              {/* CTA BUTTONS */}
              <div className="flex flex-col sm:flex-row justify-center gap-6 pt-4">
                {/* PRIMARY CTA */}
                <a
                  href="/contact"
                  className="
              inline-flex
              items-center
              justify-center
              px-8
              py-4
              rounded-full
              bg-white
              text-black
              font-semibold
              transition
              hover:bg-gray-200
            "
                >
                  Let’s build your solution
                </a>

                {/* SECONDARY CTA */}
                <a
                  href="/case-studies"
                  className="
              inline-flex
              items-center
              justify-center
              px-8
              py-4
              rounded-full
              border border-white/30
              text-white
              font-semibold
              transition
              hover:border-white
              hover:bg-white/5
            "
                >
                  View case studies
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
