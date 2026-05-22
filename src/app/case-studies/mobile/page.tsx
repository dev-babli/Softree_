import NavigationClient from "@/components/sections/navigation-client"
import Footer from "@/components/sections/footer"
import LightContactSection from "@/components/qc/homepage-light/LightContactSection"
import LightFAQExact from "@/components/homepage-light/LightFAQExact"
import CaseStudyHero from "../CaseStudyHero"
import CaseStudyGridNew from "../CaseStudyGrid"
import type { CaseStudyItem } from "../CaseStudyGrid"
import CaseStudyProofCTA from "../CaseStudyProofCTA"

const MOBILE_CASE_STUDIES: CaseStudyItem[] = [
  {
    title: "Doctor Appointment Booking System",
    description: "Healthcare mobile app enabling patients to book appointments with real-time notifications — reduced no-shows by 54% and cut booking time by 80%.",
    href: "/pdf/mobile/Doctor-Appointment-Booking.pdf",
    category: "Healthcare",
    image: "/images/case-study/mobile/appointment.avif",
    industry: "Healthcare",
    metrics: [{ label: "No-show Rate", value: "-54%" }, { label: "Booking Time", value: "-80%" }],
  },
  {
    title: "Education App Backend",
    description: "Scalable backend powering mobile education platforms with RESTful APIs and real-time data sync — supporting 10,000+ concurrent users at 99.9% uptime.",
    href: "/pdf/mobile/Education-App-Backend.pdf",
    category: "Education",
    image: "/images/case-study/mobile/education.avif",
    industry: "Education Technology",
    metrics: [{ label: "Concurrent Users", value: "10K+" }, { label: "Uptime", value: "99.9%" }],
  },
  {
    title: "Movie Ticket Booking App",
    description: "High-performance ticket booking app with seat selection and real-time availability — processed 50K+ bookings in launch month with zero payment failures.",
    href: "/pdf/mobile/Movie-Ticket-Booking-App.pdf",
    category: "Entertainment",
    image: "/images/case-study/mobile/movie.png",
    industry: "Entertainment",
    metrics: [{ label: "Launch Month Bookings", value: "50K+" }, { label: "Payment Failures", value: "0" }],
  },
  {
    title: "Payment Gateway Integration",
    description: "Secure multi-payment gateway enabling encrypted transactions across mobile platforms — reduced payment friction 62% and chargebacks by 91%.",
    href: "/pdf/mobile/Payment-Gateway-Integration.pdf",
    category: "Fintech",
    image: "/images/case-study/mobile/payment.avif",
    industry: "Financial Technology",
    metrics: [{ label: "Payment Friction", value: "-62%" }, { label: "Chargebacks", value: "-91%" }],
  },
  {
    title: "Education Mobile App",
    description: "Student-centric app providing courses, assessments, and progress tracking — improved course completion rates by 47% and daily active users by 3x.",
    href: "/pdf/mobile/Education-Mobile-App.pdf",
    category: "Education",
    image: "/images/case-study/mobile/school.avif",
    industry: "E-Learning",
    metrics: [{ label: "Course Completion", value: "+47%" }, { label: "Daily Active Users", value: "+3x" }],
  },
  {
    title: "Resort Management App",
    description: "Hospitality mobile solution for reservations and guest check-ins — cut front-desk wait time by 70% and lifted guest satisfaction scores by 34%.",
    href: "/pdf/mobile/Resort-Management-App.pdf",
    category: "Hospitality",
    image: "/images/case-study/mobile/resort.avif",
    industry: "Hospitality",
    metrics: [{ label: "Wait Time", value: "-70%" }, { label: "Guest Satisfaction", value: "+34%" }],
  },
  {
    title: "Room Rental App",
    description: "Real estate rental platform enabling property search and booking — grew listings by 120% and reduced time-to-booking by 65%.",
    href: "/pdf/mobile/Homi-Room-Rental-App.pdf",
    category: "Real Estate",
    image: "/images/case-study/mobile/room.avif",
    industry: "Real Estate",
    metrics: [{ label: "Listings Growth", value: "+120%" }, { label: "Time-to-Booking", value: "-65%" }],
  },
  {
    title: "Wellkies — Doctors App",
    description: "Healthcare app empowering doctors to manage appointments and digital consultations — reduced admin overhead 55% and improved consultation efficiency by 40%.",
    href: "/pdf/mobile/Wellkies-Doctors-App.pdf",
    category: "Healthcare",
    image: "/images/case-study/mobile/doctor.jpg",
    industry: "Healthcare",
    metrics: [{ label: "Admin Overhead", value: "-55%" }, { label: "Consultation Efficiency", value: "+40%" }],
  },
  {
    title: "Wellkies — Clinic App",
    description: "Clinic management app optimizing patient handling, scheduling, and billing — reduced operational errors by 88% and billing cycle time by 3 days.",
    href: "/pdf/mobile/Wellkies-Clinic-App.pdf",
    category: "Healthcare",
    image: "/images/case-study/mobile/clinic.png",
    industry: "Healthcare Administration",
    metrics: [{ label: "Operational Errors", value: "-88%" }, { label: "Billing Cycle", value: "-3 days" }],
  },
]

const mobileFAQs = [
  { id: 1, serial: "question 01", question: "What mobile app projects are featured in your case studies?", answer: "Our mobile case studies showcase iOS and Android apps, cross-platform solutions, and enterprise mobile applications. We highlight the challenges, technical solutions, and measurable results for each project." },
  { id: 2, serial: "question 02", question: "What technologies do you use for mobile app development?", answer: "We use React Native and Flutter for cross-platform development, and native technologies (Swift, Kotlin) for platform-specific needs. Each case study details the technology stack and rationale." },
  { id: 3, serial: "question 03", question: "How do you measure success in mobile app projects?", answer: "We measure success through app store ratings, user engagement, download numbers, and business impact. Our case studies include quantitative metrics and user feedback on app performance." },
  { id: 4, serial: "question 04", question: "Can you build similar mobile apps for my business?", answer: "Yes, we can build similar mobile solutions tailored to your business requirements. Contact us to discuss your project and we can provide a detailed proposal based on our proven expertise." },
  { id: 5, serial: "question 05", question: "What industries do you serve with mobile app development?", answer: "We serve various industries including healthcare, finance, retail, and logistics. Our case studies demonstrate our experience delivering mobile solutions across different sectors." },
]

/**
 * MOBILE CASE STUDIES — Redesigned to match About Us / Contact / Blog design language.
 */
export default function MobileCaseStudiesPage() {
  return (
    <div className="min-h-screen pt-[100px]">
      <NavigationClient />
      <CaseStudyHero
        title="Mobile"
        titleItalic="case studies"
        eyebrow="iOS&nbsp;&nbsp;&middot;&nbsp;&nbsp;Android&nbsp;&nbsp;&middot;&nbsp;&nbsp;Cross-Platform"
        description="Real-world mobile applications delivering performance, scale, and measurable business impact across iOS and Android."
        accentColor="#F97316"
        heroStat="-54%"
        heroStatLabel="no-show rate for Doctor Appointment Booking System"
        projectCount={30}
      />
      <CaseStudyGridNew
        items={MOBILE_CASE_STUDIES}
        sectionTitle="Mobile app projects"
        sectionSubtitle="Healthcare, fintech, education, and hospitality apps built for real users."
        accentColor="#F97316"
      />
      <CaseStudyProofCTA
        challengeText="Need a mobile app your users will actually keep using?"
        solutionText="From zero-downtime backends to 5-star store ratings — we’ve shipped apps that users return to every day."
        accentColor="#F97316"
        quote="Our no-show rate dropped 54% within 8 weeks of launch. The app paid for itself before the warranty period ended."
        quoteName="Healthcare Operations Lead"
        quoteRole="Medical Practice · Healthcare"
      />
      <LightContactSection />
      <LightFAQExact faqs={mobileFAQs} />
      <Footer />
    </div>
  )
}
