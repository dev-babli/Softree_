"use client";

const projects = [
  {
    id: "ai-chatbot",
    title: "AI Chatbot App Development",
    image: "/images/newPortfolio/NewChanges/ai_chatbot.png",
    link: "/ai-chatbot-development-services",
  },
  {
    id: "traffic-ai",
    title: "AI Traffic Management System",
    image: "/images/newPortfolio/NewChanges/traffic_mgt_ai.png",
    link: "/traffic-management-system-using-iot",
  },
  {
    id: "real-estate",
    title: "Real Estate App Development",
    image: "/images/newPortfolio/RealEstate/2.png",
    link: "/real-estate-app-development-company",
  },
  {
    id: "travel-ai",
    title: "AI Travel App Development",
    image: "/images/newPortfolio/NewChanges/ai_travel_app.png",
    link: "/ai-travel-app-development-company",
  },
  {
    id: "recruitment-ai",
    title: "On Demand AI Recruitment",
    image: "/images/newPortfolio/NewChanges/talenti_qube.png",
    link: "/ai-recruitment-software-development",
  },
  {
    id: "car-rental",
    title: "Car Rental App Development",
    image: "/images/newPortfolio/Automotive/4.png",
    link: "/car-rental-application-development",
  },
];

export default function OurRecentProjects() {
  return (
    <section className="relative w-full py-24 bg-gradient-to-b from-[#020617] via-[#020d1a] to-black">
      <div className="max-w-7xl mx-auto px-6">
        {/* ================= HEADING ================= */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-semibold text-slate-100">
            Proven <span className="text-cyan-500">Project Excellence</span>
          </h2>

          <p className="mt-4 max-w-3xl mx-auto text-slate-400">
            Explore our latest projects that combine cutting-edge technology,
            intelligent automation, and user-centric design to drive digital
            transformation.
          </p>
        </div>

        {/* ================= PROJECT GRID ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {projects.map((project) => (
            <a
              key={project.id}
              href={project.link}
              className="group relative block rounded-3xl bg-[#0b0f14] border border-black/5 transition hover:-translate-y-1 overflow-visible"
            >
              {/* IMAGE WRAPPER (ONLY THIS IS CLIPPED) */}
              <div className="relative overflow-hidden rounded-3xl">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-72 object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              {/* FLOATING TITLE (HALF IN / HALF OUT) */}
              <div
                className="
      absolute
      left-1/2
      -translate-x-1/2
      bottom-0
      translate-y-1/2
      bg-white
      text-slate-900
      px-6
      py-3
      rounded-2xl
      shadow-[0_10px_30px_rgba(0,0,0,0.25)]
      text-center
      w-[90%]
      z-10
    "
              >
                <div
                  className="
  bg-gradient-to-br
  from-[#0b0f14]
  via-[#1a1f27]
  to-[#0b0f14]
  px-5 py-3
  rounded-xl
  border border-white/10
  backdrop-blur-md
  shadow-[0_12px_30px_rgba(0,0,0,0.35)]
  relative
  overflow-hidden
"
                >
                  {/* mirror highlight */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

                  <p className="relative font-semibold text-base leading-tight text-slate-100 text-center">
                    {project.title}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* ================= VIEW ALL ================= */}
        <div className="text-center mt-20">
          <a
            href="/portfolio"
            className="inline-block px-10 py-4 rounded-xl bg-cyan-500 text-white font-medium hover:scale-105 transition"
          >
            View All
          </a>
        </div>
      </div>
    </section>
  );
}
