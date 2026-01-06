"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const techTabs = [
  {
    id: "frontend",
    title: "FRONTEND",
    techs: [
      { name: "JavaScript", icon: "https://www.hyperlinkinfosystem.com/assets/img/hire-developer/hire-javascript-developers.svg" },
      { name: "TypeScript", icon: "https://www.hyperlinkinfosystem.com/assets/img/hire-developer/hire-typescript-developers.svg" },
      { name: "React.js", icon: "https://www.hyperlinkinfosystem.com/assets/img/hire-developer/hire-react-js-developers.svg" },
      { name: "Vue.js", icon: "https://www.hyperlinkinfosystem.com/assets/img/hire-developer/hire-vuejs-developers.svg" },
      { name: "Angular", icon: "https://www.hyperlinkinfosystem.com/assets/img/hire-developer/hire-angular-js-developers.svg" },
      { name: "Flutter", icon: "https://www.hyperlinkinfosystem.com/assets/img/hire-developer/flutter.svg" },
    ],
  },
  {
    id: "backend",
    title: "BACKEND",
    techs: [
      { name: "Node.js", icon: "https://www.hyperlinkinfosystem.com/assets/img/hire-developer/hire-node-js-developers.svg" },
      { name: "Python", icon: "https://www.hyperlinkinfosystem.com/assets/img/hire-developer/hire-python-developers.svg" },
      { name: "PHP", icon: "https://www.hyperlinkinfosystem.com/assets/img/hire-developer/hire-php-developers.svg" },
      { name: "Java", icon: "https://www.hyperlinkinfosystem.com/assets/img/hire-developer/java.svg" },
      { name: "Spring", icon: "https://www.hyperlinkinfosystem.com/assets/img/hire-developer/spring.svg" },
      { name: "Django", icon: "https://www.hyperlinkinfosystem.com/assets/img/hire-developer/hire-django-developers.svg" },
    ],
  },
  {
    id: "database",
    title: "DATABASE",
    techs: [
      { name: "MongoDB", icon: "https://www.hyperlinkinfosystem.com/assets/img/hire-developer/mongodb.png" },
      { name: "MySQL", icon: "https://www.hyperlinkinfosystem.com/assets/img/hire-developer/mysql.png" },
      { name: "PostgreSQL", icon: "https://www.hyperlinkinfosystem.com/assets/img/hire-developer/postgresql-tech.svg" },
      { name: "Firebase", icon: "https://www.hyperlinkinfosystem.com/assets/img/hire-developer/firebase.png" },
    ],
  },
  {
    id: "devops",
    title: "DEVOPS",
    techs: [
      { name: "Docker", icon: "https://www.hyperlinkinfosystem.com/assets/img/hire-developer/docker-tech.svg" },
      { name: "Kubernetes", icon: "https://www.hyperlinkinfosystem.com/assets/img/hire-developer/kubernetes-tech.svg" },
      { name: "Jenkins", icon: "https://www.hyperlinkinfosystem.com/assets/img/hire-developer/jenkins-tech.svg" },
      { name: "GitLab", icon: "https://www.hyperlinkinfosystem.com/assets/img/hire-developer/gitlab-tech.svg" },
      { name: "Terraform", icon: "https://www.hyperlinkinfosystem.com/assets/img/hire-developer/terraform-tech.svg" },
    ],
  },
  {
    id: "qa",
    title: "QUALITY ASSURANCE",
    techs: [
      { name: "Selenium", icon: "https://www.hyperlinkinfosystem.com/assets/img/hire-developer/selenium.svg" },
      { name: "Appium", icon: "https://www.hyperlinkinfosystem.com/assets/img/hire-developer/appium.svg" },
      { name: "TestNG", icon: "https://www.hyperlinkinfosystem.com/assets/img/hire-developer/testng.svg" },
      { name: "Cucumber", icon: "https://www.hyperlinkinfosystem.com/assets/img/hire-developer/cucumber.svg" },
      { name: "Postman", icon: "https://www.hyperlinkinfosystem.com/assets/img/hire-developer/postman.svg" },
    ],
  },
];

export default function SoftreeTechTabs() {
  const [activeTab, setActiveTab] = useState("backend");

  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 via-black to-gray-800 text-white relative overflow-hidden">
      {/* Radial Glow Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-700/20 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-green-500/20 rounded-full filter blur-3xl animate-pulse"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 text-center">
        {/* Header */}
        <h2 className="text-4xl md:text-5xl font-extrabold mb-3">
          App Development <br />
          <span className="text-green-400 bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-blue-400">
            Technologies We Work On
          </span>
        </h2>
        <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-16">
          Build feature-rich, scalable, and high-performance applications leveraging the latest technologies.
        </p>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center border-b border-gray-700 mb-16 z-10 relative">
          {techTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === tab.id
                  ? "border-b-4 border-green-400 text-green-300"
                  : "text-gray-400 hover:text-green-300"
              }`}
            >
              {tab.title}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex flex-wrap justify-center gap-10">
          {techTabs
            .find((tab) => tab.id === activeTab)
            ?.techs.map((tech, index, arr) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className={`
                  w-44 md:w-48 lg:w-52 p-8 flex flex-col items-center rounded-3xl shadow-2xl transition-transform duration-300 hover:scale-105
                  ${
                    index % 2 === 1
                      ? "bg-white/10 backdrop-blur-lg border border-white/20"
                      : "bg-white text-black shadow-lg"
                  }
                `}
              >
                <div className="w-20 h-20 mb-4">
                  <img src={tech.icon} alt={tech.name} className="w-full h-full object-contain" />
                </div>
                <span className={`text-lg font-semibold text-center ${index % 2 === 1 ? "bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400" : ""}`}>
                  {tech.name}
                </span>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
}
