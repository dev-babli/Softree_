import CustomerExperienceCard from "./components/CustomerExperienceCard";
import EmployeeProductivityCard from "./components/EmployeeProductivityCard";
import KoreFourthSection from "./components/KoreFourthSection";

export default function KoreHeroTestPage() {
  return (
    <main className="min-h-screen bg-black w-full block relative">
      {/* Spacer to simulate scrolling down to the section */}
      <div className="h-screen flex items-center justify-center border-b border-white/10 relative z-20 bg-black">
        <h1 className="text-white text-3xl opacity-50">Section 1 (Hero)</h1>
      </div>

      {/* The Scroll-Driven Sequence (Stacked Sticky Sections) */}
      <CustomerExperienceCard />
      
      {/* We set a higher z-index on the later sections so they slide OVER the previous ones */}
      <div className="relative z-20 mt-[-100vh]">
        <EmployeeProductivityCard />
      </div>
      
      <div className="relative z-30 mt-[-100vh]">
        <KoreFourthSection />
      </div>

      {/* Spacer below to simulate scrolling past */}
      <div className="h-[200vh] flex items-center justify-center border-t border-white/10 relative z-40 bg-black">
        <h1 className="text-white text-3xl opacity-50">Footer Section</h1>
      </div>
    </main>
  );
}
