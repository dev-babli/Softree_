import Image from "next/image";

const services = [
  {
    title: "No-Code & Low-Code MVP Solutions",
    image: "/images/mvp/code.jpg",
    points: [
      "Build and launch functional MVPs in weeks using no-code and low-code platforms.",
      "Lower development costs with visual workflows, ready-made components, and automation.",
      "Extend and scale effortlessly by integrating APIs and third-party tools.",
    ],
  },
  {
    title: "AI-Driven MVP Development",
    image: "/images/mvp/ai.jpg",
    points: [
      "Embed AI features like chatbots, smart automation, and personalized recommendations.",
      "Improve security with AI-powered fraud detection and real-time risk analysis.",
      "Leverage data-driven insights to refine features and boost user engagement.",
    ],
  },
  {
    title: "Custom MVP Software Development",
    image: "/images/mvp/software.avif",
    points: [
      "Develop robust MVPs with API-first architecture using REST and GraphQL.",
      "Ensure scalability through microservices, cloud infrastructure, and containers.",
      "Streamline operations with automation and secure data synchronization.",
    ],
  },
  {
    title: "SaaS MVP Development Services",
    image: "/images/mvp/saas.avif",
    points: [
      "Design multi-tenant SaaS MVPs with role-based access and core features.",
      "Launch faster with built-in subscriptions, billing, and third-party integrations.",
      "Validate your SaaS idea by testing pricing strategies and user adoption.",
    ],
  },
  {
    title: "Marketplace MVP Development",
    image: "/images/mvp/marketplace.avif",
    points: [
      "Build scalable B2B or B2C marketplace MVPs with vendor onboarding and order management.",
      "Test revenue models including commissions, escrow payments, and multi-currency support.",
      "Increase engagement using dashboards, in-app chat, and AI-powered recommendations.",
    ],
  },
  {
    title: "Mobile App MVP Development",
    image: "/images/mvp/mobile.avif",
    points: [
      "Create cross-platform MVPs using React Native, Flutter, Swift, or Kotlin.",
      "Enable real-time features such as tracking, geolocation, and push notifications.",
      "Deliver secure, scalable mobile apps with API-driven architecture.",
    ],
  },
];

export default function MvpServices() {
  return (
    <section
      id="services_sec"
      className="relative bg-gradient-to-b from-black via-[#060b14] to-black py-24 text-white"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-20 max-w-5xl text-center">
          <h2 className="text-4xl font-bold leading-tight md:text-5xl">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              BUILD
            </span>{" "}
            MVPs That Scale Into Products
          </h2>
          <p className="mt-4 text-gray-400">
            We design, build, and launch MVPs that help startups validate ideas,
            attract users, and grow with confidence.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/0 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400/50 hover:shadow-[0_30px_80px_rgba(0,229,255,0.15)]"
            >
              {/* Image */}
              <div className="mb-6 overflow-hidden rounded-xl">
                <Image
                  src={service.image}
                  alt={service.title}
                  width={400}
                  height={220}
                  className="h-[180px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <h3 className="mb-4 text-xl font-semibold">{service.title}</h3>

              <ul className="space-y-3 text-sm text-gray-300">
                {service.points.map((point, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-400" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
