import React from 'react';

/**
 * SolutionsGrid component
 * Clones the "Future-Ready Solutions" section with a looping background video,
 * featuring a 2x2 grid of service cards with hover-scale effects and glassmorphism styling.
 */
const SolutionsGrid = () => {
  const solutions = [
    {
      title: "Artificial Intelligence and Data Analytics",
      description: "Unlock a high degree of autonomy with AI while leveraging the power of big data to uncover the insights you need to make smarter decisions.",
      href: "/Generative-AI-Services"
    },
    {
      title: "Salesforce",
      description: "Simplify CRM and change the way you engage with customers. We help you deploy and maximize the capabilities of Salesforce, allowing you to skyrocket your ROI.",
      href: "/Salesforce-Development-Services"
    },
    {
      title: "Microsoft Dynamics 365",
      description: "Put everything you need to manage your operations, customer service delivery, and finances in one place. Our solutions simplify data and workflow integration, keeping you efficient.",
      href: "/Dynamics-365-Development-Services"
    },
    {
      title: "Product Engineering",
      description: "Build custom applications, automate your workflows and make big business moves. Our solutions were specially designed to help you work efficiently and capitalize on data.",
      href: "/Product-Engineering-Services"
    }
  ];

  return (
    <section className="relative flex items-center justify-center overflow-hidden">
      {/* Background Video with Overlay */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover"
        >
          <source src="https://www.cynoteck.com/Home/Solutions/bg_solution.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Dark overlay to ensure text readability */}
        <div className="absolute inset-0 bg-[#00091a]/60 backdrop-blur-[2px]"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-[86%] my-20 max-w-7xl grid lg:grid-cols-[40%_60%] gap-[40px] mx-auto text-white">
        
        {/* Left Column: Heading Content */}
        <div className="lg:w-[76%] flex flex-col justify-center">
          <p className="ms-4 text-[#22d3ee] font-normal text-2xl mb-4 tracking-tight">
            Future-Ready Solutions
          </p>
          <h2 className="text-[36px] md:text-[40px] font-normal leading-tight text-white mb-6">
            Technology That Keeps Up With Your Business
          </h2>
          <p className="text-[#FFFFFFCC] font-normal text-lg leading-relaxed mt-3">
            Integrate powerful technology into your business and streamline your operations, as well as maximize efficiency and time to value for your customers and key stakeholders.
          </p>
        </div>

        {/* Right Column: 2x2 Grid of Service Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {solutions.map((item, index) => (
            <a 
              key={index}
              href={item.href}
              className="group relative block p-9 rounded-xl transition-all duration-300 transform hover:scale-105 hover:cursor-pointer overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              {/* Card Content */}
              <h3 className="text-2xl font-bold text-white transition-opacity duration-300 opacity-[0.64] group-hover:opacity-100">
                {item.title}
              </h3>
              <p className="text-white font-normal text-opacity-[56%] mt-3 leading-relaxed transition-opacity duration-300 group-hover:text-opacity-80">
                {item.description}
              </p>
              
              {/* Subtle hover highlight effect */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionsGrid;