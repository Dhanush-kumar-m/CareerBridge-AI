"use client";

import React, { useState, useEffect, useRef } from "react";
import { FiCheck, FiCpu, FiFileText, FiMessageSquare } from "react-icons/fi";
import styles from "./MemorableScrollSection.module.css";

const STEPS = [
  { id: 0, label: "Coding Skill", desc: "Build code accuracy in Python, C++, and Java." },
  { id: 1, label: "Resume ATS", desc: "Optimize formats and keywords for target filters." },
  { id: 2, label: "Interview Prep", desc: "Refine behavioral responses with pace metrics." },
  { id: 3, label: "Placement Readiness", desc: "Build a comprehensive profile to prove your subject mastery." }
];

export default function MemorableScrollSection() {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const start = rect.top;
      const height = rect.height;
      
      if (start < windowHeight && start + height > 0) {
        const progress = (windowHeight - start) / (windowHeight + height);
        const clamped = Math.max(0, Math.min(0.99, progress));
        const step = Math.floor(clamped * 4);
        setActiveStep(step);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className={styles.sectionWrapper} ref={containerRef}>
      <div className={styles.sectionContainer}>
        {/* Left Column: Heading and Workflow Steps */}
        <div className={styles.leftColumn}>
          <div className={styles.headingArea}>
            <span className={styles.eyebrow}>Integrated Prep Console</span>
            <h2>Everything you need.<br />One profile.</h2>
            <p className={styles.subHeading}>
              Your practice across all modules aggregates into a single placement readiness profile to track your growth.
            </p>
          </div>
          <div className={styles.scrollList}>
            {STEPS.map((step) => (
              <div
                key={step.id}
                className={`${styles.scrollItem} ${activeStep === step.id ? styles.scrollItemActive : ""}`}
                onClick={() => setActiveStep(step.id)}
              >
                <div className={styles.stepIndicator}>
                  {activeStep > step.id ? <FiCheck size={14} /> : <span>{step.id + 1}</span>}
                </div>
                <div className={styles.stepText}>
                  <span className={styles.stepLabel}>{step.label}</span>
                  <span className={styles.stepDesc}>{step.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Unified Readiness Profile Card */}
        <div className={styles.rightColumn}>
          <div className={styles.profileCard}>
            <div className={styles.cardHeader}>
              <div className={styles.avatar}>AS</div>
              <div>
                <h4 className={styles.studentName}>Aditya Sharma</h4>
                <p className={styles.studentDept}>Computer Science & Engineering</p>
              </div>
            </div>

            <div className={styles.profileMetrics}>
              {/* Metric 1: Coding */}
              <div className={`${styles.metricRow} ${activeStep === 0 ? styles.metricActive : ""}`}>
                <div className={styles.metricHeader}>
                  <span className={styles.metricLabel}>
                    <FiCpu size={14} style={{ marginRight: "6px" }} />
                    Coding Accuracy
                  </span>
                  <span className={styles.metricVal}>95%</span>
                </div>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{ width: "95%" }} />
                </div>
              </div>

              {/* Metric 2: Resume */}
              <div className={`${styles.metricRow} ${activeStep === 1 ? styles.metricActive : ""}`}>
                <div className={styles.metricHeader}>
                  <span className={styles.metricLabel}>
                    <FiFileText size={14} style={{ marginRight: "6px" }} />
                    Resume ATS Score
                  </span>
                  <span className={styles.metricVal}>88/100</span>
                </div>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{ width: "88%", background: "var(--accent)" }} />
                </div>
              </div>

              {/* Metric 3: Interview */}
              <div className={`${styles.metricRow} ${activeStep === 2 ? styles.metricActive : ""}`}>
                <div className={styles.metricHeader}>
                  <span className={styles.metricLabel}>
                    <FiMessageSquare size={14} style={{ marginRight: "6px" }} />
                    Speaking Pacing
                  </span>
                  <span className={styles.metricVal}>135 WPM</span>
                </div>
                <div className={styles.waveformWrap}>
                  <div className={`${styles.waveBar} ${activeStep === 2 ? styles.waveActive : ""}`} />
                  <div className={`${styles.waveBar} ${activeStep === 2 ? styles.waveActive : ""}`} style={{ animationDelay: "0.2s" }} />
                  <div className={`${styles.waveBar} ${activeStep === 2 ? styles.waveActive : ""}`} style={{ animationDelay: "0.4s" }} />
                  <div className={`${styles.waveBar} ${activeStep === 2 ? styles.waveActive : ""}`} style={{ animationDelay: "0.1s" }} />
                  <div className={`${styles.waveBar} ${activeStep === 2 ? styles.waveActive : ""}`} style={{ animationDelay: "0.3s" }} />
                </div>
              </div>

              {/* Metric 4: Placement Ready */}
              <div className={`${styles.readinessBadge} ${activeStep === 3 ? styles.badgeActive : ""}`}>
                <span className={styles.badgeLabel}>Placement Readiness Status</span>
                <div className={styles.badgeStatus}>
                  <span className={styles.statusPulse} />
                  <span>PLACEMENT ELIGIBLE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
