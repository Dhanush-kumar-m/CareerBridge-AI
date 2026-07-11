import React from "react";
import HeroSection from "../components/home/HeroSection";
import ModuleMarquee from "../components/home/ModuleMarquee";
import StickyModulesSection from "../components/home/StickyModulesSection";
import CompanyPreparationSection from "../components/home/CompanyPreparationSection";
import PreparationJourneySection from "../components/home/PreparationJourneySection";
import StudentProgressSection from "../components/home/StudentProgressSection";
import FinalCTASection from "../components/home/FinalCTASection";

export const metadata = {
  title: "CareerBridge AI — Structured Placement Preparation",
  description: "Prepare for placement aptitude, coding challenges, resume scoring, and mock interviews with structured learning paths.",
};

export default function Home() {
  return (
    <main className="home-page" style={{ padding: "0" }}>
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Module Marquee Strip */}
      <ModuleMarquee />

      {/* 3. Sticky Modules Section */}
      <StickyModulesSection />

      {/* 4. Targeted Company Preparation */}
      <CompanyPreparationSection />

      {/* 5. Process Journey Section */}
      <PreparationJourneySection />

      {/* 6. Student Progress & Analytics */}
      <StudentProgressSection />

      {/* 7. Final Call-to-Action */}
      <FinalCTASection />
    </main>
  );
}