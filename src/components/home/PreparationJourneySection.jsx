"use client";

import React from "react";
import styles from "./PreparationJourneySection.module.css";
import AnimatedContent from "../reactbits/AnimatedContent";

const STEPS = [
  {
    number: "01",
    title: "Assess your current level",
    description: "Understand your current strengths across aptitude, coding, resumes and interviews through an initial diagnostic test."
  },
  {
    number: "02",
    title: "Follow a structured plan",
    description: "Continue with recommended topics, video courses, and adaptive module practices based on your assessment results."
  },
  {
    number: "03",
    title: "Practice company questions",
    description: "Prepare specifically for target company hiring rounds using previous placement papers and common patterns."
  },
  {
    number: "04",
    title: "Track readiness & improve",
    description: "Monitor placement readiness index, take full-length mock tests, refine your weak areas and track your growth."
  }
];

export default function PreparationJourneySection() {
  return (
    <section className={styles.sectionWrapper}>
      <div className={styles.titleArea}>
        <span className={styles.eyebrow}>Learning Path</span>
        <h2>A clear path from preparation to readiness</h2>
      </div>

      <div className={styles.stepsGrid}>
        {STEPS.map((step, index) => (
          <AnimatedContent key={index} delay={index * 0.1} yOffset={20} className={styles.stepCard}>
            <div className={styles.stepNumber}>{step.number}</div>
            <h3 className={styles.stepTitle}>{step.title}</h3>
            <p className={styles.stepDesc}>{step.description}</p>
          </AnimatedContent>
        ))}
      </div>
    </section>
  );
}
