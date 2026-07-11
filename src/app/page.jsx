"use client";

import useAuth from "../hooks/useAuth";
import dynamic from "next/dynamic";

// Dynamically import storytelling sections in the logical product flow
const HeroSection = dynamic(() => import("../components/home/HeroSection"), { ssr: false });
const WhyPrepSection = dynamic(() => import("../components/home/WhyPrepSection"), { ssr: false });
const GlobeSection = dynamic(() => import("../components/home/GlobeSection"), { ssr: false });
const FeaturesSection = dynamic(() => import("../components/home/FeaturesSection"), { ssr: false }); // CareerBridge Solution
const JourneySection = dynamic(() => import("../components/home/JourneySection"), { ssr: false }); // Timeline
const PracticeCodingSection = dynamic(() => import("../components/home/PracticeCodingSection"), { ssr: false });
const PracticeAptitudeSection = dynamic(() => import("../components/home/PracticeAptitudeSection"), { ssr: false });
const ResumeAnalyzerSection = dynamic(() => import("../components/home/ResumeAnalyzerSection"), { ssr: false });
const MockInterviewSection = dynamic(() => import("../components/home/MockInterviewSection"), { ssr: false });
const CompanyPreparationSection = dynamic(() => import("../components/home/CompanyPreparationSection"), { ssr: false });
const AnalyticsSection = dynamic(() => import("../components/home/AnalyticsSection"), { ssr: false }); // Analytics Showcase
const StatisticsSection = dynamic(() => import("../components/home/StatisticsSection"), { ssr: false }); // Platform Statistics
const HowItWorksSection = dynamic(() => import("../components/home/HowItWorksSection"), { ssr: false }); // FAQ
const FinalCTASection = dynamic(() => import("../components/home/FinalCTASection"), { ssr: false }); // Final Call-To-Action

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <main className="home-page" style={{ padding: "0" }}>
      {/* 1. Hero */}
      <HeroSection isAuthenticated={isAuthenticated} />
      
      {/* 2. Why Placement Preparation Matters */}
      <WhyPrepSection />

      {/* Globe Section */}
      <GlobeSection />
      
      {/* 3. CareerBridge Solution */}
      <FeaturesSection />
      
      {/* 4. Placement Journey Timeline */}
      <JourneySection />
      
      {/* 5. Coding Practice */}
      <PracticeCodingSection />
      
      {/* 6. Aptitude Training */}
      <PracticeAptitudeSection />
      
      {/* 7. Resume Analyzer */}
      <ResumeAnalyzerSection />
      
      {/* 8. AI Mock Interview */}
      <MockInterviewSection />
      
      {/* 9. Company Preparation */}
      <CompanyPreparationSection />
      
      {/* 10. Student Analytics Dashboard */}
      <AnalyticsSection />
      
      {/* 11. Platform Statistics */}
      <StatisticsSection />
      
      {/* 13. FAQ */}
      <HowItWorksSection />
      
      {/* 14. Final Call-To-Action */}
      <FinalCTASection isAuthenticated={isAuthenticated} />
    </main>
  );
}