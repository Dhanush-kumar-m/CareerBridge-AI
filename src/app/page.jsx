"use client";

import useAuth from "../hooks/useAuth";

// Import modular homepage sections
import HeroSection from "../components/home/HeroSection";
import JourneySection from "../components/home/JourneySection";
import FeaturesSection from "../components/home/FeaturesSection";
import CompanyPreparationSection from "../components/home/CompanyPreparationSection";
import PracticeSection from "../components/home/PracticeSection";
import ResumeInterviewSection from "../components/home/ResumeInterviewSection";
import AnalyticsSection from "../components/home/AnalyticsSection";
import StatisticsSection from "../components/home/StatisticsSection";
import HowItWorksSection from "../components/home/HowItWorksSection";
import FinalCTASection from "../components/home/FinalCTASection";

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <main className="home-page" style={{ padding: "0" }}>
      <HeroSection isAuthenticated={isAuthenticated} />
      <JourneySection />
      <FeaturesSection />
      <CompanyPreparationSection />
      <PracticeSection />
      <ResumeInterviewSection />
      <AnalyticsSection />
      <StatisticsSection />
      <HowItWorksSection />
      <FinalCTASection isAuthenticated={isAuthenticated} />
    </main>
  );
}