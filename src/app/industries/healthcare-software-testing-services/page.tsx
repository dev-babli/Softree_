import NavigationClient from '@/components/sections/navigation-client';
import HealthcareTestingHero from "./components/HealthcareTestingHero";
import TrustedBrandsMarquee from "./components/TrustedBrandsMarquee";
import HealthcareTestingPositioning from "./components/HealthcareTestingPositioning";
import HealthcareTestingFramework from "./components/HealthcareTestingFramework";
import OffshoreHealthcareTestingTeam from "./components/OffshoreHealthcareTestingTeam";
import HealthcareTestingCoverage from "./components/HealthcareTestingCoverage";
import HealthcareSecurityTesting from "./components/HealthcareSecurityTesting";
import HealthcareTestAutomation from "./components/HealthcareTestAutomation";
import AgenticHealthcareTesting from "./components/AgenticHealthcareTesting";
import HealthcareTestingWorkflow from "./components/HealthcareTestingWorkflow";
import HealthcareTechnologyTesting from "./components/HealthcareTechnologyTesting";
import WhySoftreeHealthcareTesting from "./components/WhySoftreeHealthcareTesting";
import HealthcareTestingCaseStudies from "./components/HealthcareTestingCaseStudies";
import HealthcareTestingFAQ from "./components/HealthcareTestingFAQ";
import LightContactSection from '@/components/homepage-light/LightContactSection';
import Footer from '@/components/sections/footer';
import NewWhoDoWeServeSection from "@/components/sections/NewWhoDoWeServeSection";

export const metadata = {
  title: "Healthcare Software Testing Services | Offshore QA Team | Softree",
  description: "Improve the quality, security, performance, and reliability of healthcare applications with Softree’s offshore software testing and QA services.",
  alternates: {
    canonical: "https://www.softreetechnology.com/industries/healthcare-software-testing-services",
  },
  keywords: [
    // Primary Keyword
    'Healthcare Software Testing',

    // Secondary Keywords
    'Healthcare Software Testing Services',
    'Software Testing in Healthcare',
    'Medical Software Testing',
    'Healthcare Testing Services',
    'Healthcare Application Testing',
    'Healthcare Software QA',
    'Healthcare QA Testing Services',
    'Healthcare Test Automation',
    'Healthcare Quality Assurance',
    'Medical Application Testing',
    'Healthcare Security Testing',
    'Healthcare Performance Testing',
    'Healthcare API Testing',
    'Healthcare Mobile App Testing',
  ],
  openGraph: {
    title: 'Healthcare Software Testing Services | Offshore QA Team | Softree',
    description: 'Softree’s offshore QA team helps healthcare organizations test applications for quality, security, performance, usability, and reliability.',
    url: 'https://www.softreetechnology.com/industries/healthcare-software-testing-services',
    siteName: 'Softree Technology',
    images: [
      {
        url: '/logo/Softree-Technology-Final-Logo-Dark-BG.webp',
        width: 1200,
        height: 630,
        alt: 'Softree Technology Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Healthcare Software Testing Services | Offshore QA | Softree',
    description: 'Offshore healthcare QA and testing services for reliable, secure, high-performing healthcare applications and digital platforms.',
    images: ['/logo/Softree-Technology-Final-Logo-Dark-BG.webp'],
  },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.softreetechnology.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Industries",
          "item": "https://www.softreetechnology.com/industries"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Healthcare Software Testing Services",
          "item": "https://www.softreetechnology.com/industries/healthcare-software-testing-services"
        }
      ]
    },
    {
      "@type": "Service",
      "name": "Healthcare Software Testing Services",
      "serviceType": "Healthcare Software Testing & Medical QA Engineering Services",
      "description":
        "Improve the quality, security, performance, and reliability of healthcare applications with Softree’s offshore software testing and QA services.",
      "url": "https://www.softreetechnology.com/industries/healthcare-software-testing-services",
      "provider": {
        "@type": "Organization",
        "name": "Softree Technology",
        "url": "https://www.softreetechnology.com"
      },
      "areaServed": "Global"
    },
    {
      "@type": "VideoObject",
      "name": "Healthcare Software Testing Services & Medical Application QA Overview",
      "description":
        "Discover how Softree Technology delivers end-to-end healthcare software testing services, validating EHR/EMR platforms, healthcare APIs, FHIR/HL7 interoperability, medical device software, and HIPAA-compliant digital health applications.",
      "thumbnailUrl": [
        "https://www.softreetechnology.com/images/solutions/ai-for-healthcare/hero.png",
        "https://www.softreetechnology.com/logo/Softree-Technology-Final-Logo-Dark-BG.webp"
      ],
      "uploadDate": "2025-01-15T08:00:00+00:00",
      "contentUrl": "https://www.softreetechnology.com/ai-development-service-video/Healhcare-ai-video.mp4",
      "embedUrl": "https://www.softreetechnology.com/industries/healthcare-software-testing-services",
      "duration": "PT30S",
      "publisher": {
        "@type": "Organization",
        "name": "Softree Technology",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.softreetechnology.com/logo/Softree-Technology-Final-Logo.png"
        }
      }
    }
  ]
};

export default function HealthcareTestingPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <NavigationClient />
      <HealthcareTestingHero />
      <TrustedBrandsMarquee surface="light" />
      <HealthcareTestingPositioning />
      <HealthcareTestingCoverage />
      {/* <NewWhoDoWeServeSection className="bg-white" /> */}
      <HealthcareTestingFramework />
      {/* <OffshoreHealthcareTestingTeam /> */}
      <HealthcareTestingCaseStudies />
      <HealthcareTestAutomation />
      {/* <AgenticHealthcareTesting /> */}
      {/* <HealthcareTestingWorkflow /> */}
      <HealthcareTechnologyTesting />

      {/* <HealthcareSecurityTesting /> */}
      <WhySoftreeHealthcareTesting />
      <HealthcareTestingFAQ />
      <LightContactSection />
      <Footer />
    </main>
  );
}
