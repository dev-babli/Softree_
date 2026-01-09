import IndustrySlider from "./industry";
import WebDevelopmentProcess from "./process";
import SoftreeTechTabs from "./app-tech-lab";
import SoftrreeWebServices from "./softree-web";
import WhyChooseSoftreeWeb from "./why-chose";
import WebDevelopmentSlider from "./web-process";
import WebAppImportance from "./web-app";
import Footer from "@/src/components/footer";
import Navigation from "@/src/components/navigation";
export default function Home() {
  return (
    <main>
      <Navigation />
      <section className="relative bg-[#00091A] pt-16 md:pt-24 pb-24 overflow-hidden">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D0057]/70 via-black/40 to-[#240F8E]/30 pointer-events-none"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-20 flex flex-col md:flex-row items-center gap-12">
          {/* Left Column: Text */}
          <div className="flex-1 max-w-xl text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-6 text-white/90">
              Build{" "}
              <span className="text-green-500">High-Performance Websites</span>{" "}
              with Softree
            </h1>

            <p className="text-base md:text-lg lg:text-xl text-white/70 mb-6">
              Elevate your digital presence with Softree Technology’s expert web
              development services. We design and develop responsive, scalable,
              and user-friendly websites that perfectly align with your business
              goals.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a
                href="/contact"
                className="bg-green-500 hover:bg-green-400 text-black font-semibold px-6 py-3 md:px-8 md:py-4 rounded-xl shadow-lg transition-transform transform hover:scale-105"
              >
                Talk to Our Experts
              </a>
              <a
                href="#services"
                className="border border-green-500 text-green-500 hover:bg-green-500 hover:text-black font-semibold px-6 py-3 md:px-8 md:py-4 rounded-xl transition-transform transform hover:scale-105"
              >
                Explore Services
              </a>
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="flex-1 flex justify-center md:justify-end relative">
            <div className="relative w-full md:w-[600px] rounded-3xl overflow-hidden shadow-2xl border border-gray-700">
              <img
                src="/images/web/herow.png"
                alt="Web Development Hero"
                className="w-full h-[400px] md:h-[500px] lg:h-[550px] object-cover rounded-3xl transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 rounded-3xl pointer-events-none"></div>
            </div>
            {/* Optional floating glow */}
            <div className="absolute -top-16 -right-16 w-64 h-64 bg-green-500/20 rounded-full blur-3xl animate-pulse"></div>
          </div>
        </div>

        {/* Optional Testimonial below hero */}
        <div
          className="relative z-10 mx-auto mt-16 flex gap-4 p-6 rounded-lg w-[90%] md:w-[60%] lg:w-[50%]"
          style={{
            background:
              "linear-gradient(110deg, rgb(2, 119, 249) 0.09%, rgba(0, 7, 67, 0) 26%), rgb(1, 7, 67)",
          }}
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            className="flex-shrink-0"
            aria-hidden="true"
            height="40"
            width="40"
          >
            <path d="M6.5 10c-.223 0-.437.034-.65.065 ..."></path>
          </svg>
          <div>
            <p className="text-white/70 text-base md:text-lg mb-2">
              Softree developed a website for our business that is fast,
              responsive, and visually engaging, perfectly matching our brand
              identity.
            </p>
            <p className="text-right text-white/70 text-sm md:text-base font-medium">
              - Ankit Verma
            </p>
            <p className="text-right text-white/50 text-xs">
              CTO, Softree Technology
            </p>
          </div>
        </div>
      </section>

      <IndustrySlider />
      <WebDevelopmentProcess />
      <SoftreeTechTabs />
      <WebAppImportance />
      <SoftrreeWebServices />
      <WebDevelopmentSlider />
      <WhyChooseSoftreeWeb />
      <Footer />
    </main>
  );
}
