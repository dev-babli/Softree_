// components/BigServicesCards.tsx
import React from "react";

const services = [
  {
    title: "SharePoint Consulting",
    description:
      "Let our SharePoint experts run you through the benefits of SharePoint Business Process Automation and Enterprise solutions that will enable your organization to orchestrate desired business outcomes. From revamping legacy systems based on older versions of SharePoint to designing workflows and robust SharePoint Intranet Portal deployment, 1Point1 has offered comprehensive consulting services to businesses in domains such as Manufacturing, Construction, Healthcare, Real Estate, Petroleum, Legal, Sports, etc.",
    image: "/images/sharepoint/consult.png", // replace with your image
    onlyImage: false, // flag for first card
  },
  {
    title: "SharePoint Support",
    description:
      "1Point1 offers on-site and offshore SharePoint support and maintenance services to customers who want to ensure the solutions provided continue to run smoothly, and the users execute the desired tasks with no hassle. Our consultants have decades of experience in deploying on-premises and SharePoint Online solutions and are well-equipped to provide on-demand support services that will empower the users by virtue of an error-free collaboration environment.",
    image: "/images/sharepoint/support.png", // replace with your image
    onlyImage: false,
  },
];

const BigServicesCards = () => {
  return (
    <div className="bg-black py-12 px-6">
      <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-2">
        {services.map((service, idx) => (
          <div
            key={idx}
            className="relative group h-[500px] overflow-hidden rounded-3xl shadow-2xl border border-gray-700"
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Overlay only for cards with content */}
            {!service.onlyImage && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8 transition-transform duration-500 translate-y-full group-hover:translate-y-0">
                <h3 className="text-3xl font-bold text-white mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-200 text-sm">{service.description}</p>
              </div>
            )}

            {/* Overlay for first card on hover */}
            {service.onlyImage && (
              <div className="absolute inset-0 bg-gray-900 bg-opacity-70 flex flex-col justify-end p-8 transition-transform duration-500 translate-y-full group-hover:translate-y-0">
                <h3 className="text-3xl font-bold text-white mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-200 text-sm">{service.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BigServicesCards;
