import GlobeScene from "./globe";

export default function Hero() {
  return (
    <section className="w-full min-h-[90vh] bg-black flex items-center">
      <div className="max-w-8xl mx-auto w-full grid md:grid-cols-2 gap-10 items-center px-6 md:px-12">
        {/* LEFT SIDE → Content */}
        <div className="text-white mt-3">
          {/* Badge */}
          <div className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
                alt="Microsoft"
                className="h-5 w-5"
              />
              Microsoft Partner
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Your Trusted{" "}
            <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
              Global Microsoft
            </span>{" "}
            Technology Delivery Partner
          </h1>

          {/* Sub text */}
          <p className="text-lg text-white/80 max-w-xl mb-8">
            Engineering support across Power Platform, Data, AI & Modern
            Applications.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <button className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition">
              Partner With Us
            </button>

            <button className="px-6 py-3 rounded-lg border border-white/30 hover:bg-white/10 transition">
              Schedule a Strategy Call
            </button>
          </div>

          {/* Bottom line */}
          <div className="mt-8 flex items-center text-sm text-white/60 flex-wrap">
            <span>White-Label Friendly</span>

            <span className="mx-3 h-4 w-px bg-white/30" />

            <span>NDA-Driven</span>

            <span className="mx-3 h-4 w-px bg-white/30" />

            <span>Since 2013</span>

            <span className="mx-3 h-4 w-px bg-white/30" />

            <span>Flexible Scaling</span>

            <span className="mx-3 h-4 w-px bg-white/30" />

            <span>Direct Leadership Access</span>
          </div>
        </div>

        {/* RIGHT SIDE → Globe */}
        <div className="h-[450px] md:h-[600px]">
          <GlobeScene />
        </div>
      </div>
    </section>
  );
}
