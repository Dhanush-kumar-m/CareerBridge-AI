"use client";

import React from "react";
import Link from "next/link";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  const { isAuthenticated, user } = useAuth();

  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContainer}>
        {/* Left Column: Copywriting */}
        <div className={`${styles.heroContent} ${styles.fadeInLeft}`}>
          <span className={styles.eyebrow}>
            Placement Preparation Platform
          </span>
          <h1 className={styles.headline}>
            Prepare for placements with a clear plan.
          </h1>
          <p className={styles.description}>
            Practice aptitude, coding, resumes and interviews in one structured platform designed to help students become placement-ready.
          </p>

          <div className={styles.ctaGroup}>
            <Link href={isAuthenticated ? (user?.role === "admin" ? "/admin" : "/dashboard") : "/register"} className={styles.ctaPrimary}>
              <span>Start Preparing</span>
              <FiArrowRight size={16} />
            </Link>
            <Link href="#practice-modules" className={styles.ctaSecondary}>
              <span>Explore Practice Modules</span>
            </Link>
          </div>

          <div className={styles.trustPoints}>
            <div className={styles.trustPoint}>
              <FiCheckCircle className={styles.trustIcon} size={16} />
              <span>Structured learning paths</span>
            </div>
            <div className={styles.trustPoint}>
              <FiCheckCircle className={styles.trustIcon} size={16} />
              <span>Company-specific questions</span>
            </div>
            <div className={styles.trustPoint}>
              <FiCheckCircle className={styles.trustIcon} size={16} />
              <span>Progress tracking</span>
            </div>
          </div>
        </div>

        {/* Right Column: Polished Realistic Dashboard Preview */}
        <div className={styles.fadeInRight}>
          <div className={styles.dashboardPreview}>
            <div className={styles.panelHeader}>
              <span className={styles.panelTitle}>Student Console</span>
              <span className={styles.panelBadge}>Level 4</span>
            </div>

            {/* Continue Learning card */}
            <div className={styles.previewCard}>
              <div className={styles.cardHeaderFlex}>
                <div>
                  <span className={styles.cardEyebrow}>Continue Learning</span>
                  <h4 className={styles.cardTitle}>Java Arrays</h4>
                </div>
                <span className={styles.cardActionLink}>Continue →</span>
              </div>
              <div className={styles.progressFlex}>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{ width: "35%" }} />
                </div>
                <span className={styles.progressPercent}>35%</span>
              </div>
            </div>

            {/* Upcoming Assessment card */}
            <div className={styles.previewCard}>
              <div className={styles.cardHeaderFlex}>
                <div>
                  <span className={styles.cardEyebrow}>Upcoming</span>
                  <h4 className={styles.cardTitle}>Aptitude Assessment</h4>
                </div>
                <span className={styles.cardActionBtn}>Start</span>
              </div>
              <span className={styles.cardBadgeWarning}>Scheduled Today</span>
            </div>

            {/* Company Track card */}
            <div className={styles.previewCard}>
              <div className={styles.cardHeaderFlex}>
                <div>
                  <span className={styles.cardEyebrow}>Company Track</span>
                  <h4 className={styles.cardTitle}>TCS NQT Prep</h4>
                </div>
                <span className={styles.cardProgressCount}>72%</span>
              </div>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: "72%" }} />
              </div>
            </div>

            {/* Resume Checklist card */}
            <div className={styles.previewCard}>
              <div className={styles.cardHeaderFlex}>
                <div>
                  <span className={styles.cardEyebrow}>Resume score</span>
                  <h4 className={styles.cardTitle}>ATS Analyzer</h4>
                </div>
                <span className={styles.cardBadgeSuccess}>88/100</span>
              </div>
              <p className={styles.cardSubText}>2 Suggestions Remaining</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
