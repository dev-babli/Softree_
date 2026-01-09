"use client";

import React from "react";
import { FaShareAlt, FaCogs, FaFileAlt } from "react-icons/fa";

const recentWins = [
  {
    title: "Enterprise SharePoint Modernization",
    description:
      "Softree helped a large enterprise migrate classic SharePoint sites to modern UI with responsive pages, automated workflows, and improved governance.",
    results:
      "User adoption up 2X, page load times improved 3X, automated approvals reduced manual effort by 50%.",
    icon: <FaShareAlt size={60} className="text-blue-400" />,
    link: "/casestudy/sharepoint-modernization",
  },
  {
    title: "PowerApps Custom Solutions",
    description:
      "Softree delivered custom PowerApps solutions for inventory management, inspection, and reporting, integrated with Teams and SharePoint.",
    results:
      "Process efficiency increased 1.8X, error rates reduced by 40%, and real-time reporting enabled faster decisions.",
    icon: <FaCogs size={60} className="text-green-400" />,
    link: "/casestudy/powerapps-solutions",
  },
  {
    title: "Automated Document Workflows",
    description:
      "Softree implemented automated workflows for document approvals, notifications, and archiving, reducing bottlenecks and improving compliance.",
    results:
      "Approval cycle time reduced by 60%, document retrieval 3X faster, audit readiness ensured.",
    icon: <FaFileAlt size={60} className="text-yellow-400" />,
    link: "/casestudy/document-workflows",
  },
];

const RecentWins: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white" id="softree-wins">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Recent Wins from Softree Technology
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            These outcomes demonstrate how Softree helps companies modernize SharePoint, automate workflows, and improve business processes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {recentWins.map((win, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-lg p-8 flex flex-col items-start hover:bg-white/10 transition-all duration-300 rounded-3xl border border-white/10"
            >
              <div className="mb-6">
                {win.icon}
              </div>

              <h6 className="text-xl font-semibold mb-3">{win.title}</h6>
              <p className="text-gray-300 mb-3">{win.description}</p>
              <p className="text-green-400 font-medium mb-6">Results: {win.results}</p>
              <a
                href={win.link}
                target="_blank"
                className="text-blue-400 hover:text-blue-500 font-semibold"
              >
                Read Case Study &rarr;
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentWins;
