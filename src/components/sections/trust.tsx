"use client";

import Image from "next/image";
import Link from "next/link";

export default function TextImageSection() {
  return (
    <section
      className="
    relative
    min-h-[55vh]
    flex items-center
    bg-gradient-to-b from-black via-[#020d1a] to-black
    text-white py-24
  "
    >
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div
          className="
        rounded-3xl
        p-6 md:p-8
        bg-gradient-to-br
        from-[#050b1a]/90
        via-[#020617]/95
        to-black/90
        border border-white/10
        shadow-[0_0_80px_rgba(59,130,246,0.12)]
      "
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* LEFT — TEXT */}
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl md:text-3xl font-bold leading-tight">
                Software Engineered for <br />
                <span className="text-primary">
                  Agility, Scale & Long-Term Growth
                </span>
              </h2>

              <h4 className="mt-2 text-lg md:text-xl font-medium text-gray-300">
                From Strategy to Continuous Delivery — We Build Software That
                Evolves With Your Business
              </h4>

              <div className="mt-3 space-y-4 text-gray-400 leading-relaxed">
                <p>
                  At Softree Technology, we focus on building software that
                  delivers measurable business impact. Our development approach
                  is designed to reduce risk, accelerate time-to-market, and
                  ensure scalability from day one.
                </p>

                <p>
                  <strong className="text-white">Strategic Planning:</strong>{" "}
                  Defining clear roadmaps, scalable architectures, and
                  technology stacks aligned with your business objectives.
                </p>

                <p>
                  <strong className="text-white">Agile Execution:</strong>{" "}
                  Iterative development cycles that enable rapid feedback,
                  flexibility, and faster delivery of value.
                </p>

                <p>
                  <strong className="text-white">Quality & Security:</strong>{" "}
                  Comprehensive testing and security practices to ensure
                  reliable, high-performance, and compliant solutions.
                </p>

                <p>
                  <strong className="text-white">
                    Continuous Improvement:
                  </strong>{" "}
                  Ongoing optimization, upgrades, and support to keep your
                  software future-ready.
                </p>
              </div>
            </div>

            {/* RIGHT — IMAGE */}
            <div className="flex items-center justify-center">
              <div className="scale-[1.25] sm:scale-[1.35] md:scale-[1.5]">
                <Image
                  src="/images/hero/trust.png"
                  alt="Technology Trust & Recognition"
                  width={800}
                  height={800}
                  className="w-full max-w-[520px] object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
