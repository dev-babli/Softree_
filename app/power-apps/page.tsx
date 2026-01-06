import RecentWins from "./power-apps";
import PowerPlatformSlider from "./power-slider";
import ServicesSection from "./ser-sec";
import WhoWeServe from "./who-we-ser";

import Footer from "../mobile/footer";
import PowerAppsServices from "./tabs";
import ClientCarousel from "./client-carousel";
import InnovationAndPowerBI from "./innovation";

export default function Home() {
  return (
    <main>
      <section className="relative bg-[#00091A] pt-16 md:pt-24 pb-24 overflow-hidden">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D0057]/70 via-black/40 to-[#240F8E]/30 pointer-events-none"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-20 flex flex-col md:flex-row items-center gap-12">
          {/* Left Column: Text */}
          <div className="flex-1 max-w-xl text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-6 text-white/90">
              Hire a{" "}
              <span className="text-green-500">
                Dedicated PowerApps Developer
              </span>{" "}
              at Softree
            </h1>

            <p className="text-base md:text-lg lg:text-xl text-white/70 mb-6">
              Accelerate your business with Softree Technology’s expert
              Microsoft PowerApps services. We help you build enterprise-grade,
              low-code applications that integrate seamlessly with SharePoint,
              Office 365, and your existing workflows — all in record time.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a
                href="/contact"
                className="bg-green-500 hover:bg-green-400 text-black font-semibold px-6 py-3 md:px-8 md:py-4 rounded-xl shadow-lg transition-transform transform hover:scale-105"
              >
                Talk to Our Expert
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
                src="/images/power-apps/herop.png"
                alt="Softree PowerApps Hero"
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
              Softree Technology delivered a seamless PowerApps solution that
              transformed our business processes and improved productivity
              significantly.
            </p>
            <p className="text-right text-white/70 text-sm md:text-base font-medium">
              - Priya Sharma
            </p>
            <p className="text-right text-white/50 text-xs">
              Project Manager, Enterprise Solutions, Softree Technology
            </p>
          </div>
        </div>
      </section>

      <RecentWins />
      <section className="flex justify-center bg-black px-4 sm:px-6 md:px-12 lg:px-20 py-16">
        <div className="w-full max-w-7xl flex flex-col-reverse md:flex-row items-center gap-12">
          {/* Left Column: Text */}
          <div className="flex-1 bg-gray-900/40 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border border-gray-800">
            <h3 className="text-3xl sm:text-4xl font-extrabold mb-6 tracking-tight text-white">
              Hire a <span className="text-green-500">Dedicated PowerApps</span>{" "}
              Developer
            </h3>

            <p className="text-gray-300 py-2 text-lg leading-relaxed">
              Unlock the true potential of Microsoft PowerApps with Softree
              Technology. Build enterprise-grade applications in record time.
              Our certified consultants streamline your workflow, enhance
              SharePoint and Office 365 integration, and elevate your business
              application development.
            </p>

            <p className="text-gray-300 py-2 text-lg leading-relaxed">
              Empower your organization to optimize business functionalities
              efficiently. Take the next step towards success now. Contact us at{" "}
              <a
                href="tel:+917008699927"
                className="text-green-500 underline hover:text-green-400"
              >
                +91-7008699927
              </a>{" "}
              or email{" "}
              <a
                href="mailto:sales@softreetechnology.com"
                className="text-green-500 underline hover:text-green-400"
              >
                sales@softreetechnology.com
              </a>{" "}
              for immediate support from our expert team.
            </p>

            <button className="mt-6 bg-green-500 hover:bg-green-400 text-black font-semibold px-6 py-3 rounded-xl shadow-lg transition-transform transform hover:scale-105">
              Get Started
            </button>
          </div>

          {/* Right Column: Image */}
          <div className="flex-1 flex justify-center md:justify-end">
            <div className="relative w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border-2 border-gray-700">
              <img
                src="https://www.softreetechnology.com/wp-content/uploads/2024/08/powerappps-300x288.webp"
                alt="PowerApps"
                className="w-full h-[450px] object-cover rounded-3xl transition-transform duration-500 hover:scale-105"
              />
              {/* Optional subtle overlay for style */}
              <div className="absolute inset-0 bg-black/20 rounded-3xl pointer-events-none"></div>
            </div>
          </div>
        </div>
      </section>

      <InnovationAndPowerBI />

      <section className="py-16 px-6 md:px-12 bg-gradient-to-b from-black via-gray-900 to-black text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Our Power Apps Solutions
          </h2>

          <div className="grid gap-10 md:grid-cols-2">
            {/* Canvas App Card */}
            <div className="relative bg-gray-900/50 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden transition-transform duration-300 hover:scale-105">
              <div className="relative p-6 rounded-2xl">
                <img
                  src="https://www.softreetechnology.com/wp-content/uploads/elementor/thumbs/canvas-app-qvxmy79ufi3vl5zomjg67h71pt3arcw93bsn2y6ndq.webp"
                  alt="Canvas App"
                  className="w-full h-64 object-cover rounded-xl transition-transform duration-500 hover:scale-105"
                />
                <div className="mt-6">
                  <h3 className="text-2xl font-bold text-gray-300 mb-3">
                    Canvas App
                  </h3>
                  <p className="text-gray-400 font-semibold mb-3">
                    Custom Power Apps Canvas Applications
                  </p>
                  <ul className="space-y-2 text-gray-400 text-sm">
                    {[
                      "Custom Development: Tailored Power Apps Canvas applications.",
                      "Comprehensive Services: Design, develop, deploy solutions.",
                      "Data Integration: Connect with SharePoint, SQL Server, Dataverse.",
                      "Agile Approach: Flexible methodology for collaboration.",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-gray-400 mt-1">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="/about-us/"
                    className="inline-block mt-4 bg-gray-700 text-white font-semibold px-6 py-2 rounded-full hover:bg-gray-600 transition-all duration-300"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </div>

            {/* Model-Driven App Card */}
            <div className="relative bg-gray-900/50 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden transition-transform duration-300 hover:scale-105">
              <div className="relative p-6 rounded-2xl">
                <img
                  src="https://www.softreetechnology.com/wp-content/uploads/elementor/thumbs/Model-driven-qvcg6p0k8041tcggv0mb2se315i9f4k0fdwb3go3xa.webp"
                  alt="Model Driven App"
                  className="w-full h-64 object-cover rounded-xl transition-transform duration-500 hover:scale-105"
                />
                <div className="mt-6">
                  <h3 className="text-2xl font-bold text-gray-300 mb-3">
                    Model-Driven App
                  </h3>
                  <p className="text-gray-400 font-semibold mb-3">
                    Custom Power Apps Model-Driven Application
                  </p>
                  <ul className="space-y-2 text-gray-400 text-sm">
                    {[
                      "Custom Development: Tailored Model-Driven applications.",
                      "Comprehensive Services: Design, develop, deploy tailored solutions.",
                      "Seamless Integration: Connect with Dataverse, SharePoint, Dynamics 365.",
                      "Agile Approach: Flexible methodology for collaboration.",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-gray-400 mt-1">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="/about-us/"
                    className="inline-block mt-4 bg-gray-700 text-white font-semibold px-6 py-2 rounded-full hover:bg-gray-600 transition-all duration-300"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PowerAppsServices />

      <ServicesSection />
      <WhoWeServe />

      <Footer />
    </main>
  );
}
