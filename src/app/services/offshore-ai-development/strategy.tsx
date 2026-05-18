export default function AIServicesSection() {
  const data = [
    {
      id: "01",
      title: "AI Strategy & Consulting",
      points: [
        "Comprehensive AI readiness and maturity assessment",
        "Identification of high-impact business use cases",
        "End-to-end AI roadmap and transformation planning",
        "ROI-driven cost optimization and value analysis",
        "Risk management, compliance, and governance frameworks",
      ],
      btn: "Explore Consulting",
    },
    {
      id: "02",
      title: "Generative AI Solutions",
      points: [
        "Custom GPT-powered applications tailored to business needs",
        "Advanced text, image, and code generation solutions",
        "AI chatbots and copilots for automation and support",
        "Prompt engineering for optimized AI outputs",
        "Content automation for marketing and operations",
      ],
      btn: "Explore Gen AI",
    },
    {
      id: "03",
      title: "Machine Learning",
      points: [
        "End-to-end model development and training pipelines",
        "Predictive analytics for data-driven decision making",
        "Recommendation systems for personalized experiences",
        "Robust data preprocessing and transformation pipelines",
        "Model evaluation, validation, and performance tuning",
      ],
      btn: "Explore ML Services",
    },
    {
      id: "04",
      title: "Computer Vision",
      points: [
        "High-accuracy image classification solutions",
        "Real-time object detection and tracking systems",
        "Facial recognition and biometric verification",
        "Video analytics for surveillance and insights",
        "Automated quality inspection systems",
      ],
      btn: "Explore Vision AI",
    },
    {
      id: "05",
      title: "AI for Product & UX",
      points: [
        "AI-driven UI personalization for enhanced user engagement",
        "Smart search and recommendation engines",
        "Voice-enabled interface design and interactions",
        "User behavior analytics for deeper insights",
        "Conversational interfaces and virtual assistants",
      ],
      btn: "Explore AI UX",
    },
    {
      id: "06",
      title: "AI Infrastructure",
      points: [
        "Cloud-native AI deployment and scalability solutions",
        "MLOps pipelines for continuous integration and delivery",
        "Real-time model monitoring and performance tracking",
        "GPU acceleration and compute optimization strategies",
        "Scalable and resilient AI system architecture",
      ],
      btn: "Explore Infrastructure",
    },
  ];
  return (
   <div className="bg-gradient-to-b from-zinc-50 text-black py-20 px-6">
  <div className="text-center mb-16">
    <h1 className="text-4xl md:text-5xl font-bold text-black">
      AI Services & Solutions
    </h1>
    <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
      Explore our comprehensive suite of AI capabilities designed to help
      businesses innovate, automate, and scale with cutting-edge
      technologies.
    </p>
  </div>

  <div className="max-w-7xl mx-auto space-y-28">
    {[data.slice(0, 3), data.slice(3, 6)].map((row, rowIndex) => (
      <div key={rowIndex} className="relative grid md:grid-cols-3 gap-12">
        
        {/* Horizontal Line */}
        <div className="hidden md:block absolute top-6 left-0 w-full h-[2px] bg-gray-300"></div>

        {row.map((item, index) => (
          <div key={index} className="relative text-center">
            
            {/* Number Pill */}
            <div
              className="absolute top-6 left-1/2 -translate-x-1/2 -translate-y-1/2 
              bg-white border border-gray-300 px-4 py-1 rounded-full text-sm z-10 text-black shadow-sm"
            >
              {item.id}
            </div>

            <div className="mt-14 mb-6 space-y-3">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 leading-snug tracking-tight">
                {item.title}
              </h2>

              <div className="flex justify-center">
                <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
              </div>
            </div>

            <ul className="space-y-3 text-gray-700 text-sm">
              {item.points.map((point, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-blue-500 mt-1">✔</span>
                  <span className="text-left">{point}</span>
                </li>
              ))}
            </ul>

          </div>
        ))}
      </div>
    ))}
  </div>
</div>
  );
}
