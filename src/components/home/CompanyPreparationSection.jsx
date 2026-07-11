"use client";

import React from "react";
import Link from "next/link";
import { FiArrowRight, FiCheck } from "react-icons/fi";
import styles from "./CompanyPreparationSection.module.css";

const COMPANIES = [
  {
    name: "TCS",
    category: "Mass Recruiter",
    coverage: ["Aptitude", "Coding", "Technical", "HR"],
    questionCount: "140+ Questions",
    progress: 72,
    link: "/companies"
  },
  {
    name: "Accenture",
    category: "Systems Consultant",
    coverage: ["Aptitude", "Coding", "Technical", "HR"],
    questionCount: "95+ Questions",
    progress: 45,
    link: "/companies"
  },
  {
    name: "Amazon",
    category: "Product Giant",
    coverage: ["Aptitude", "Coding", "Technical", "HR"],
    questionCount: "180+ Questions",
    progress: 12,
    link: "/companies"
  }
];

export default function CompanyPreparationSection() {
  return (
    <section className={styles.sectionWrapper}>
      <div className={styles.titleArea}>
        <span className={styles.eyebrow}>Targeted Learning</span>
        <h2>Prepare for the companies you are targeting</h2>
        <p className={styles.description}>
          Study previous assessment patterns, frequently asked coding problems, technical topics and interview questions for specific hiring companies.
        </p>
      </div>

      <div className={styles.cardsGrid}>
        {COMPANIES.map((company, index) => (
          <div key={index} className={styles.companyCard}>
            <div className={styles.cardHeader}>
              <span className={styles.companyName}>
                {company.name}
              </span>
              <span className={styles.categoryBadge}>{company.category}</span>
            </div>

            <div className={styles.coverageSection}>
              <span className={styles.sectionLabel}>Preparation Coverage</span>
              <div className={styles.coverageGrid}>
                {company.coverage.map((cov, i) => (
                  <div key={i} className={styles.coverageItem}>
                    <FiCheck size={14} className={styles.checkIcon} />
                    <span>{cov}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.questionSection}>
              <span className={styles.sectionLabel}>Question Count</span>
              <span className={styles.questionVal}>{company.questionCount}</span>
            </div>

            <div className={styles.progressBarArea}>
              <div className={styles.progressBarLabel}>
                <span>Preparation Progress</span>
                <span>{company.progress}% Complete</span>
              </div>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: `${company.progress}%` }} />
              </div>
            </div>

            <Link href={company.link} className={styles.exploreBtn}>
              <span>Continue Preparation</span>
              <FiArrowRight size={16} />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
