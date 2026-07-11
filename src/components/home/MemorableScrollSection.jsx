"use client";

import React, { useState, useEffect, useRef } from "react";
import { FiArrowRight, FiCheck } from "react-icons/fi";
import styles from "./MemorableScrollSection.module.css";

const STEPS = [
  { id: 0, label: "Coding" },
  { id: 1, label: "Resume" },
  { id: 2, label: "Interview" },
  { id: 3, label: "Placement Ready" }
];

export default function MemorableScrollSection() {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate the progress of scroll through the section height
      const start = rect.top;
      const height = rect.height;
      
      if (start < windowHeight && start + height > 0) {
        // Calculate progress ratio (0 to 1)
        const progress = (windowHeight - start) / (windowHeight + height);
        const clamped = Math.max(0, Math.min(0.99, progress));
        const step = Math.floor(clamped * 4);
        setActiveStep(step);
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Initial run
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className={styles.sectionWrapper} ref={containerRef}>
      <div className={styles.sectionContainer}>
        {/* Left Column: Heading and Interactive Step Titles */}
        <div className={styles.leftColumn}>
          <div className={styles.headingArea}>
            <h2>Everything you need.<br />One platform.</h2>
          </div>
          <div className={styles.scrollList}>
            {STEPS.map((step) => (
              <div
                key={step.id}
                className={`${styles.scrollItem} ${activeStep === step.id ? styles.scrollItemActive : ""}`}
                onClick={() => setActiveStep(step.id)}
              >
                <span className={styles.itemArrow}>→</span>
                <span>{step.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Floating dynamic card previews */}
        <div className={styles.rightColumn}>
          <div className={styles.displayCard}>
            <div className={styles.previewWrapper}>
              
              {/* Step 0: Coding */}
              <div className={`${styles.previewItem} ${activeStep === 0 ? styles.previewItemActive : ""}`}>
                <div className={styles.innerCard}>
                  <h4 className={styles.cardTitle}>Coding Challenge</h4>
                  <div className={styles.codeBox}>
                    <span style={{ color: "#3157d5" }}>def</span> <span style={{ color: "#2448b7" }}>twoSum</span>(nums, target):<br />
                    &nbsp;&nbsp;seen = &#123;&#125;<br />
                    &nbsp;&nbsp;<span style={{ color: "#3157d5" }}>for</span> i, n <span style={{ color: "#3157d5" }}>in</span> enumerate(nums):<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;diff = target - n
                  </div>
                </div>
                <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", fontWeight: "500" }}>
                  Solve questions in Python, Java, or C++ with real-time test case verification.
                </div>
              </div>

              {/* Step 1: Resume */}
              <div className={`${styles.previewItem} ${activeStep === 1 ? styles.previewItemActive : ""}`}>
                <div className={styles.innerCard}>
                  <h4 className={styles.cardTitle}>ATS Analyzer score</h4>
                  <div className={styles.atsProgress}>
                    <span className={styles.scoreVal}>88%</span>
                    <span style={{ color: "var(--success)", fontWeight: "bold" }}>✓ Optimized</span>
                  </div>
                </div>
                <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", fontWeight: "500" }}>
                  Get automated feedback on keywords, project impact statements, and formatting structures.
                </div>
              </div>

              {/* Step 2: Interview */}
              <div className={`${styles.previewItem} ${activeStep === 2 ? styles.previewItemActive : ""}`}>
                <div className={styles.innerCard}>
                  <h4 className={styles.cardTitle}>Interview Feedback</h4>
                  <div className={styles.waveGrid}>
                    <div className={`${styles.waveBar} ${styles.waveActive}`} />
                    <div className={`${styles.waveBar} ${styles.waveActive}`} style={{ animationDelay: "0.2s" }} />
                    <div className={`${styles.waveBar} ${styles.waveActive}`} style={{ animationDelay: "0.4s" }} />
                    <div className={`${styles.waveBar} ${styles.waveActive}`} style={{ animationDelay: "0.1s" }} />
                    <div className={`${styles.waveBar} ${styles.waveActive}`} style={{ animationDelay: "0.5s" }} />
                    <div className={styles.waveBar} />
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: "12px", fontWeight: "600" }}>
                    Speech Pace: 130 WPM (Optimal Range)
                  </div>
                </div>
                <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", fontWeight: "500" }}>
                  Practice standard behavioral and technical questions, scoring speaking speed and filler words.
                </div>
              </div>

              {/* Step 3: Placement Ready */}
              <div className={`${styles.previewItem} ${activeStep === 3 ? styles.previewItemActive : ""}`}>
                <div className={styles.readyBadge}>
                  <div className={styles.badgeIcon}>
                    <FiCheck />
                  </div>
                  <span className={styles.badgeTitle}>Placement Ready</span>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                    You have completed all prerequisite modules. Your profile is now visible to partner institutions.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
