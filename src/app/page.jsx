"use client";

import useAuth from "../hooks/useAuth";
import dynamic from "next/dynamic";

// Dynamically import modular homepage sections with SSR disabled
const HeroSection = dynamic(() => import("../components/home/HeroSection"), { ssr: false });
const JourneySection = dynamic(() => import("../components/home/JourneySection"), { ssr: false });
const FeaturesSection = dynamic(() => import("../components/home/FeaturesSection"), { ssr: false });
const CompanyPreparationSection = dynamic(() => import("../components/home/CompanyPreparationSection"), { ssr: false });
const PracticeSection = dynamic(() => import("../components/home/PracticeSection"), { ssr: false });
const ResumeInterviewSection = dynamic(() => import("../components/home/ResumeInterviewSection"), { ssr: false });
const AnalyticsSection = dynamic(() => import("../components/home/AnalyticsSection"), { ssr: false });
const StatisticsSection = dynamic(() => import("../components/home/StatisticsSection"), { ssr: false });
const HowItWorksSection = dynamic(() => import("../components/home/HowItWorksSection"), { ssr: false });
const FinalCTASection = dynamic(() => import("../components/home/FinalCTASection"), { ssr: false });

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