"use client";

import React from "react";
import Link from "next/link";
import { FiArrowRight, FiCheckCircle, FiActivity } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  const { isAuthenticated } = useAuth();

  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContainer}>
        {/* Left Column: Storytelling Copy */}
        <div className={styles.heroContent}>
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
            <Link href={isAuthenticated ? "/dashboard" : "/register"} className={styles.ctaPrimary}>
              <span>Start Preparing</span>
              <FiArrowRight size={16} />
            </Link>
            <Link href="/coding" className={styles.ctaSecondary}>
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

        {/* Right Column: Dashboard Preview Panel */}
        <div className={styles.dashboardPreview}>
          <div className={styles.panelHeader}>
            <span className={styles.panelTitle}>Student Console</span>
            <span className={styles.panelBadge}>Level 4</span>
          </div>

          {/* Goal Progress */}
          <div className={styles.previewCard}>
            <div className={styles.cardMeta}>
              <span>Weekly Prep Goal</span>
              <span>85% Completed</span>
            </div>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: "85%" }} />
            </div>
          </div>

          {/* Code Streak */}
          <div className={styles.previewCard}>
            <div className={styles.cardMeta}>
              <span>Coding Streak</span>
              <span>5 days</span>
            </div>
            <div className={styles.streakGrid}>
              <div className={`${styles.streakDot} ${styles.streakDotActive}`} />
              <div className={`${styles.streakDot} ${styles.streakDotActive}`} />
              <div className={`${styles.streakDot} ${styles.streakDotActive}`} />
              <div className={`${styles.streakDot} ${styles.streakDotActive}`} />
              <div className={`${styles.streakDot} ${styles.streakDotActive}`} />
              <div className={styles.streakDot} />
              <div className={styles.streakDot} />
            </div>
          </div>

          {/* Active Tasks & Stats */}
          <div className={styles.previewCard}>
            <div className={styles.upcomingTask}>
              <div className={styles.taskIndicator} />
              <div className={styles.taskDetail}>
                <span className={styles.taskName}>Aptitude assessment</span>
                <span className={styles.taskTime}>Scheduled for today</span>
              </div>
            </div>
          </div>

          <div className={styles.previewCard}>
            <div className={styles.upcomingTask}>
              <FiActivity size={16} style={{ color: "var(--accent)" }} />
              <div className={styles.taskDetail}>
                <span className={styles.taskName}>TCS Prep Progress</span>
                <span className={styles.taskTime}>12/15 rounds solved</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
