// ServicesSectionWithIcons.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaGraduationCap, FaHeartbeat } from "react-icons/fa";

const services = [
  {
    title: "NOTEVED",
    description: `We provide high-performance, scalable, and secure mobile applications for the education sector, designed to enhance learning experiences for students and educators alike. 
Our solutions include interactive learning modules, real-time collaboration tools, and adaptive learning technologies. 
By leveraging cutting-edge technologies such as Ionic, ReactJS, and low-code/no-code platforms, we help educational institutions streamline administration, improve student engagement, and deliver measurable learning outcomes. 
From K-12 to higher education, NOTEVED empowers educators to create immersive, personalized, and impactful learning journeys.`,
    imageSrc: "/wp-content/uploads/elementor/thumbs/responsive_device_64-copy-1-qt16xqs1v62753jfpo19c4kq0nfc307zy8e03zqo0w.webp",
    icon: <FaGraduationCap className="text-4xl text-indigo-500" />,
  },
  {
    title: "WELLKIES",
    description: `We build secure and reliable mobile applications for the healthcare sector, enabling hospitals, clinics, and health-tech companies to improve patient engagement, care delivery, and data management. 
WELLKIES solutions include patient portals, appointment scheduling, telemedicine platforms, and secure electronic health record (EHR) integrations. 
Our mobile apps prioritize data privacy, HIPAA compliance, and seamless user experience, helping healthcare providers offer personalized care, track health metrics, and optimize operational efficiency. 
By combining innovative technologies with industry best practices, WELLKIES empowers the healthcare ecosystem to deliver smarter, safer, and more connected care.`,
    imageSrc: "/wp-content/uploads/elementor/thumbs/responsive_device_64-copy-1-qt16xqs1v62753jfpo19c4kq0nfc307zy8e03zqo0w.webp",
    icon: <FaHeartbeat className="text-4xl text-red-500" />,
  },
];

const imageVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const textVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const ServicesSectionWithIcons = () => {
  return (
    <section className="bg-black text-white py-16">
      <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-0 flex flex-col gap-16">
        {services.map((service, index) => (
          <div
            key={index}
            className={`flex flex-col lg:flex-row items-center gap-8`}
          >
            {/* Animated Image */}
            <motion.div
              className="lg:w-1/2 w-full"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={imageVariants}
            >
              <Image
                src={service.imageSrc}
                alt={service.title}
                width={800}
                height={600}
                className="w-full h-auto object-contain rounded-lg shadow-lg"
              />
            </motion.div>

            {/* Animated Text */}
            <motion.div
              className="lg:w-1/2 w-full flex flex-col gap-4 text-left"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={textVariants}
            >
              {/* Icon */}
              <div>{service.icon}</div>

              <h3 className="text-3xl md:text-4xl font-bold">{service.title}</h3>
              <p className="text-gray-300 text-lg md:text-xl whitespace-pre-line">{service.description}</p>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSectionWithIcons;
