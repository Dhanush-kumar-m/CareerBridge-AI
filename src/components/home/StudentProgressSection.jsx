"use client";

import React from "react";
import { FiCheck } from "react-icons/fi";
import styles from "./StudentProgressSection.module.css";
import AnimatedContent from "../reactbits/AnimatedContent";

const CATEGORIES = [
  "Weekly learning activity tracking",
  "Topic completion percentages",
  "Coding accuracy and speed analysis",
  "Aptitude performance stats",
  "Company-specific readiness index"
];

// 24 mock days for activity heatmap
const HEATMAP_CELLS = [
  0, 1, 2, 0, 3, 4, 1, 2, 0, 1, 0, 3,
  4, 2, 0, 1, 2, 3, 0, 0, 1, 4, 2, 3
];

export default function StudentProgressSection() {
  return (
    <section className={styles.sectionWrapper}>
      <div className={styles.sectionContainer}>
        {/* Left Column: Descriptive Content */}
        <AnimatedContent delay={0.1} yOffset={25} className={styles.leftColumn}>
          <span className={styles.eyebrow}>Analytics & Insights</span>
          <h2>Know exactly where you need to improve</h2>
          <p className={styles.description}>
            CareerBridge helps students monitor their preparation activity, topic completion, accuracy and company readiness from one dashboard.
          </p>
          <ul className={styles.categoriesList}>
            {CATEGORIES.map((cat, index) => (
              <li key={index} className={styles.categoryItem}>
                <span className={styles.checkIcon}>
                  <FiCheck size={14} />
                </span>
                <span>{cat}</span>
              </li>
            ))}
          </ul>
        </AnimatedContent>

        {/* Right Column: Visual SVG Analytics Dashboard */}
        <div className={styles.analyticsDashboard}>
          <div className={styles.dashboardRow}>
            {/* SVG Line Chart */}
            <AnimatedContent delay={0.2} yOffset={20} className={styles.chartCard}>
              <span className={styles.chartTitle}>Weekly Practice Activity</span>
              <svg className={styles.chartSvg} viewBox="0 0 300 120">
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 110 Q 50 80, 100 95 T 200 40 T 300 30 L 300 120 L 0 120 Z"
                  fill="url(#chartGradient)"
                />
                <path
                  d="M0 110 Q 50 80, 100 95 T 200 40 T 300 30"
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <circle cx="100" cy="95" r="4.5" fill="var(--accent)" />
                <circle cx="200" cy="40" r="4.5" fill="var(--accent)" />
                <circle cx="300" cy="30" r="4.5" fill="var(--accent)" />
              </svg>
            </AnimatedContent>

            {/* SVG Circular Progress Ring */}
            <AnimatedContent delay={0.3} yOffset={20} className={styles.circleCard}>
              <span className={styles.chartTitle}>Placement Readiness</span>
              <div style={{ position: "relative", width: "80px", height: "80px" }}>
                <svg width="80" height="80" className={styles.circleSvg}>
                  <circle
                    cx="40"
                    cy="40"
                    r="34"
                    fill="transparent"
                    stroke="var(--border-subtle)"
                    strokeWidth="6"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="34"
                    fill="transparent"
                    stroke="var(--success)"
                    strokeWidth="6"
                    strokeDasharray="213.6"
                    strokeDashoffset="42.7" // 80% progress
                    strokeLinecap="round"
                  />
                </svg>
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span className={styles.circleText}>80%</span>
                </div>
              </div>
            </AnimatedContent>
          </div>

          {/* Activity Heatmap Grid */}
          <AnimatedContent delay={0.4} yOffset={20} className={styles.heatmapCard}>
            <span className={styles.chartTitle}>Consistency Calendar (Active Days)</span>
            <div className={styles.heatmapGrid}>
              {HEATMAP_CELLS.map((level, i) => {
                let cellClass = styles.heatmapCell;
                if (level === 1) cellClass += ` ${styles.cellActive1}`;
                else if (level === 2) cellClass += ` ${styles.cellActive2}`;
                else if (level === 3) cellClass += ` ${styles.cellActive3}`;
                else if (level === 4) cellClass += ` ${styles.cellActive4}`;
                return <div key={i} className={cellClass} />;
              })}
            </div>
          </AnimatedContent>
        </div>
      </div>
    </section>
  );
}
