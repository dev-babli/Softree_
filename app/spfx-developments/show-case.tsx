import React from "react";

const spfxBenefits = [
  {
    title: "Certified SPFx Experts",
    description:
      "Our team consists of certified SharePoint developers with deep expertise in SPFx, creating custom web parts, extensions, and client-side solutions. " +
      "We follow Microsoft best practices, ensuring your SharePoint environment is modern, secure, and scalable. " +
      "By leveraging our experience, organizations can accelerate development timelines, reduce errors, and deliver high-quality solutions that enhance collaboration, streamline workflows, and improve user adoption across Microsoft 365. " +
      "Whether it's customizing web parts, building extensions, or integrating third-party tools, we ensure every solution aligns perfectly with your business goals.",
    icon: "🎯",
  },

  {
    title: "End-to-End Development",
    description:
      "From design to deployment, we handle the full SPFx lifecycle, delivering modern, responsive, and integrated solutions.",
    icon: "⚡",
  },
  {
    title: "Custom & Scalable",
    description:
      "We build reusable, maintainable SPFx web parts, extensions, and command sets that scale with your organization.",
    icon: "🛠️",
  },
  {
    title: "Microsoft 365 Integration",
    description:
      "Our SPFx solutions seamlessly integrate with Microsoft 365, Teams, Power Platform, and Microsoft Graph API to maximize productivity and collaboration. " +
      "We enable organizations to connect SharePoint web parts and extensions with Teams channels, Power Automate workflows, and Power Apps, creating a unified digital workplace. " +
      "By leveraging deep integration capabilities, we help automate business processes, improve communication, and provide actionable insights, ensuring that your Microsoft 365 ecosystem delivers real business value. " +
      "Our approach ensures solutions are scalable, maintainable, and aligned with enterprise governance standards, enhancing adoption and driving measurable ROI.",
    icon: "🔗",
  },
  {
    title: "Best Practices & Performance",
    description:
      "We follow SPFx and SharePoint best practices, using TypeScript, React, and PnP libraries for optimized, maintainable solutions.",
    icon: "🚀",
  },
  {
    title: "Faster Time-to-Value",
    description:
      "Experienced developers deliver high-quality solutions quickly, reducing development time and accelerating business outcomes.",
    icon: "⏱️",
  },
  {
    title: "Support & Maintenance",
    description:
      "We provide ongoing support, maintenance, and upgrades to ensure your SPFx solutions perform optimally over time.",
    icon: "🛡️",
  },
];

// Helper function to split array into chunks of 3 (1 big + 2 small)
const chunkArray = (arr: any[], size: number) => {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};

export default function SpfxCardsGradient() {
  const rows = chunkArray(spfxBenefits, 3);

  return (
    <section className="py-16 px-6 md:px-12 bg-gradient-to-r from-gray-900 to-black">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
          Why Hire Our SPFx Developers
        </h2>
        <p className="text-gray-300 text-sm md:text-base max-w-3xl mx-auto">
          We deliver modern, scalable, and fully-integrated SharePoint Framework
          (SPFx) solutions that accelerate your business outcomes and optimize
          your Microsoft 365 environment.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid gap-8">
        {rows.map((row, rowIndex) => {
          const isFlip = rowIndex % 2 !== 0; // alternate sides

          const [bigCard, small1, small2] = row;

          return (
            <div key={rowIndex} className="grid md:grid-cols-3 gap-8">
              {isFlip ? (
                <>
                  {/* Empty space for alignment */}
                  <div className="md:col-span-1 grid gap-8">
                    {small1 && <CardSmall {...small1} />}
                    {small2 && <CardSmall {...small2} />}
                  </div>
                  {bigCard && <CardBig {...bigCard} />}
                </>
              ) : (
                <>
                  {bigCard && <CardBig {...bigCard} />}
                  <div className="md:col-span-1 grid gap-8">
                    {small1 && <CardSmall {...small1} />}
                    {small2 && <CardSmall {...small2} />}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

// Big card component
// Big card component with right border
function CardBig({ title, description, icon }: any) {
  return (
    <div className="md:col-span-2 bg-gradient-to-br from-gray-900 via-gray-700 to-black-600 p-8 rounded-3xl shadow-xl hover:shadow-purple-500/50 transition-shadow duration-300 border-r-4 border-gray-100">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-2xl font-semibold text-white mb-3">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
}

// Small card component
// Small card component with gray gradient background and left border
function CardSmall({ title, description, icon }: any) {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-500 to-gray-700 p-6 rounded-2xl shadow-lg hover:shadow-blue-500/40 transition-shadow duration-300 border-l-4 border-gray-100">
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-100 text-sm">{description}</p>
    </div>
  );
}
