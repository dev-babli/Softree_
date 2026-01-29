"use client";

"use client";

const projects = [
  {
    id: "wellkies-doctor-app",
    title: "Wellkies Doctor Mobile App",
    image: "/images/wellkies.png",
    link: "https://www.softreetechnology.com/wp-content/uploads/2024/09/Wellkies-Doctor-Document.pdf",
  },
  {
    id: "wellkies-clinic-app",
    title: "Wellkies Clinic App",
    image: "/images/clinic.png",
    link: "https://www.softreetechnology.com/wp-content/uploads/2024/09/Wellkies-Clinic-App.pdf",
  },
  {
    id: "food-wine-website",
    title: "Food & Wine Website",
    image: "/images/food.png",
    link: "https://www.softreetechnology.com/wp-content/uploads/2024/11/FOOD-WINE-WEBSITE.pdf",
  },
  {
    id: "spfx-custom-footer",
    title: "Custom Footer using SPFx",
    image: "/images/footer.png",
    link: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Enhancing-User-Experience-with-a-Custom-Footer-using-SPFx.pdf",
  },
  {
    id: "projects-portfolio-management",
    title: "Projects Portfolio Management",
    image: "/images/project.png",
    link: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Projects-Portfolio-ManagementMicrosoft-Dataverse.pdf",
  },
  {
    id: "students-portal-app",
    title: "Students Portal Mobile App",
    image: "/images/student.png",
    link: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Students-Portal-Mobile-App.pdf",
  },
];

export default function OurRecentProjects() {
  return (
    <section className="relative w-full py-24 bg-gradient-to-b from-black via-[#020d1a] to-black">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project) => (
            <a
              key={project.id}
              href={project.link}
              className="group relative block rounded-4xl bg-[#0b0f14] border border-black/5 transition hover:-translate-y-1 overflow-visible"
            >
              {/* IMAGE WRAPPER (ONLY THIS IS CLIPPED) */}
              <div className="relative overflow-hidden rounded-3xl border border-white/20">
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
    bg-[#14181f]
    text-slate-100
    px-6
    py-3
    rounded-2xl
    shadow-[0_12px_30px_rgba(0,0,0,0.55)]
    text-center
    w-[90%]
    z-10
    border border-white/5
    backdrop-blur-md
  "
              >
                <div
                  className="
      bg-gradient-to-br
      from-[#1b2028]
      via-[#242a33]
      to-[#1b2028]
      px-5
      py-3
      rounded-xl
      border border-white/10
      shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_12px_30px_rgba(0,0,0,0.45)]
      relative
      overflow-hidden
    "
                >
                  {/* mirror highlight */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/5 to-transparent pointer-events-none" />

                  <p className="relative font-semibold text-base leading-tight text-slate-100 text-center tracking-wide">
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
