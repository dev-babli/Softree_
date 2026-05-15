import { Phone, Lightbulb, Rocket } from "lucide-react";

export default function ProjectProcessSection() {
  return (
    <section className="bg-black py-24">
      <div className="mx-auto max-w-7xl px-6 text-center">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-white">
          <span className="text-red-500">Start Your Project</span> with Orient Software Today
        </h2>

        <p className="mt-4 mx-auto max-w-3xl text-gray-400">
          We’d love to connect with you and figure out how we can contribute to your
          success. Get started with an efficient, streamlined process:
        </p>

        {/* CTA */}
        <div className="mt-8">
          <button className="inline-flex items-center gap-2 rounded-full bg-red-500 px-8 py-4 text-white font-semibold transition hover:bg-red-600 hover:scale-105">
            Schedule a Meeting →
          </button>
        </div>

        {/* Steps */}
        <div className="mt-20 grid gap-16 md:grid-cols-3 text-left">
          
          {/* STEP 01 */}
          <div className="relative">
            {/* Big number */}
            <span className="absolute -top-16 left-0 text-[160px] font-bold text-white/5 leading-none z-0">
              01
            </span>

            <div className="relative z-10">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-purple-600">
                <Phone className="text-white" />
              </div>

              <h3 className="text-xl font-bold text-white">
                Schedule a Consultation Call
              </h3>

              <p className="mt-3 text-gray-400">
                Discuss your needs and goals, and learn how we can realize your ideas.
              </p>
            </div>
          </div>

          {/* STEP 02 */}
          <div className="relative">
            <span className="absolute -top-16 left-0 text-[160px] font-bold text-white/5 leading-none z-0">
              02
            </span>

            <div className="relative z-10">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-red-500">
                <Lightbulb className="text-white" />
              </div>

              <h3 className="text-xl font-bold text-white">
                Explore Solutions and Team Setup
              </h3>

              <p className="mt-3 text-gray-400">
                Examine solutions, clarify requirements, and onboard the ideal team for your needs.
              </p>
            </div>
          </div>

          {/* STEP 03 */}
          <div className="relative">
            <span className="absolute -top-16 left-0 text-[160px] font-bold text-white/5 leading-none z-0">
              03
            </span>

            <div className="relative z-10">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-orange-500">
                <Rocket className="text-white" />
              </div>

              <h3 className="text-xl font-bold text-white">
                Kick Off and Monitor the Project
              </h3>

              <p className="mt-3 text-gray-400">
                Our team springs into action, keeping you informed and adjusting when necessary.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
