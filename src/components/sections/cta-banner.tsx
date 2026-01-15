import React from "react";
import Image from "next/image";
import CTAGroup from "@/components/ui/CTAGroup";

const CTABanner = () => {
  const backgroundImage =
    "https://www.softreetechnology.com/wp-content/uploads/elementor/thumbs/white-logo-soft-qt16xqrm9tl34ewl9f9uhep3zaj8m5zkpgualw8uf4.png";

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-black via-[#020d1a] to-black">
      {/* Energy Accent */}
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#f59e0b20,transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)] bg-[size:110px_110px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl w-[87%] py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* LEFT */}
          <div className="max-w-xl -mt-20 md:-mt-32 lg:-mt-44 xl:-mt-52">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-light leading-[1.15] mb-6">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500">
                Engineering Digital Solutions
              </span>
              <span className="block text-white/90 font-normal">
                That Scale Your Business
              </span>
            </h2>

            <p className="text-white/75 text-base md:text-lg leading-relaxed">
              Softree partners with organizations to design, build, and optimize
              modern digital products — from strategy and UX to cloud
              engineering and long-term support.
            </p>
          </div>

          {/* RIGHT – CONTACT FORM */}
          <div className="flex justify-end">
            <div
              className="
      w-full max-w-xl
      rounded-2xl
      bg-gradient-to-br from-white/[0.08] via-white/[0.04] to-white/[0.02]
      backdrop-blur-2xl
      border border-white/10
      p-6 md:p-8
    "
            >
              {/* Form Header */}
              <div className="mb-8">
                <h3 className="text-white text-xl font-semibold mb-2">
                  Start a Conversation
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Share a few details about your project and our team will get
                  back to you within 24 hours.
                </p>
              </div>

              {/* CTA OPTIONS (now part of the form experience) */}
              <div className="mb-8">
                <CTAGroup />
              </div>

              {/* FORM */}
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Full name"
                    className="
            w-full rounded-xl
            bg-black/50
            border border-white/15
            px-4 py-3
            text-white text-sm
            placeholder-white/40
            focus:outline-none focus:border-cyan-400 focus:bg-black/60
          "
                  />
                  <input
                    type="email"
                    placeholder="Work email"
                    className="
            w-full rounded-xl
            bg-black/50
            border border-white/15
            px-4 py-3
            text-white text-sm
            placeholder-white/40
            focus:outline-none focus:border-cyan-400 focus:bg-black/60
          "
                  />
                </div>

                <input
                  type="text"
                  placeholder="Company"
                  className="
          w-full rounded-xl
          bg-black/50
          border border-white/15
          px-4 py-3
          text-white text-sm
          placeholder-white/40
          focus:outline-none focus:border-cyan-400 focus:bg-black/60
        "
                />

                <textarea
                  rows={4}
                  placeholder="Briefly describe your requirements"
                  className="
          w-full rounded-xl
          bg-black/50
          border border-white/15
          px-4 py-3
          text-white text-sm
          placeholder-white/40
          resize-none
          focus:outline-none focus:border-cyan-400 focus:bg-black/60
        "
                />

                {/* Submit */}
                <button
                  type="submit"
                  className="
          w-full mt-2
          rounded-full
          bg-gradient-to-r from-cyan-400 to-violet-500
          text-black font-semibold
          py-3.5
          transition-all duration-300
          hover:-translate-y-0.5
          hover:shadow-[0_10px_30px_rgba(56,189,248,0.35)]
        "
                >
                  Request Consultation
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
