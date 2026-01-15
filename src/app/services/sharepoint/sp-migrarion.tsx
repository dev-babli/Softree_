import Image from "next/image";
import Link from "next/link";

const SharePointMigration = () => {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="relative mx-auto max-w-7xl w-[86%] grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        {/* LEFT CONTENT */}
        <div>
          <span className="inline-block mb-4 px-4 py-1 text-sm tracking-wide uppercase text-blue-400 bg-blue-400/10 rounded-full">
            SharePoint Expertise
          </span>

          <h2 className="text-3xl lg:text-4xl font-semibold leading-tight text-white">
            Seamless{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              SharePoint Migration
            </span>{" "}
            Solutions
          </h2>

          <p className="mt-6 text-gray-300 leading-relaxed">
            Accelerate your digital workplace transformation with our expert
            SharePoint migration services. We leverage advanced automation,
            proven frameworks, and enterprise-grade security practices to ensure
            zero data loss, compliance, and minimal downtime.
          </p>

          <p className="mt-4 text-gray-400 leading-relaxed">
            From legacy SharePoint upgrades to complex tenant-to-tenant and
            system consolidation migrations, our specialists help organizations
            unlock modern collaboration, intelligent content management, and
            scalable business processes.
          </p>

          {/* CTA */}
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="https://www.synapseindia.com/technology/sharepoint-migration.html"
              className="px-7 py-3 rounded-md text-sm font-medium text-black bg-white hover:bg-gray-200 transition"
            >
              Explore Solutions
            </Link>

            <Link
              href="#contact"
              className="px-7 py-3 rounded-md text-sm font-medium text-white border border-white/20 hover:bg-white/10 transition"
            >
              Talk to an Expert
            </Link>
          </div>
        </div>

        {/* RIGHT – IMAGE CARD */}
        <div className="relative">
          {/* Glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl" />

          {/* Card */}
          <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
            <div className="relative w-full h-[360px] lg:h-[420px]">
              <Image
                src="/images/sharepoint/sp.png"
                alt="Enterprise SharePoint Migration Services"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SharePointMigration;
