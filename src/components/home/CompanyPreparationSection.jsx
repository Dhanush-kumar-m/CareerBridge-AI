"use client";

import React from "react";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import styles from "./CompanyPreparationSection.module.css";

const COMPANIES = [
  {
    name: "TCS",
    category: "Mass Recruiter",
    aptitude: "Numerical, Verbal & Logical",
    coding: "Standard arrays & string iterations",
    technical: "Data Structures, Database Basics",
    progress: 75,
    link: "/companies/tcs"
  },
  {
    name: "Accenture",
    category: "Systems Consultant",
    aptitude: "Cognitive assessment, English",
    coding: "Pseudocode debugging & binary logic",
    technical: "Networking basics, Security basics",
    progress: 45,
    link: "/companies/accenture"
  },
  {
    name: "Amazon",
    category: "Product Giant",
    aptitude: "Online Assessment (OA), Work Styles",
    coding: "Graphs, Trees & Dynamic Programming",
    technical: "System Design, Object Oriented Design",
    progress: 10,
    link: "/companies/amazon"
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
              <span className={company.name === "Amazon" ? styles.companyName : styles.companyName}>
                {company.name}
              </span>
              <span className={styles.categoryBadge}>{company.category}</span>
            </div>

            <div className={styles.prepTopics}>
              <div className={styles.prepTopic}>
                <span>Aptitude patterns:</span>
                <span className={styles.topicVal}>{company.aptitude}</span>
              </div>
              <div className={styles.prepTopic}>
                <span>Coding focus:</span>
                <span className={styles.topicVal}>{company.coding}</span>
              </div>
              <div className={styles.prepTopic}>
                <span>Technical focus:</span>
                <span className={styles.topicVal}>{company.technical}</span>
              </div>
            </div>

            <div className={styles.progressBarArea}>
              <div className={styles.progressBarLabel}>
                <span>My Prep Status</span>
                <span>{company.progress}% ready</span>
              </div>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: `${company.progress}%` }} />
              </div>
            </div>

            <Link href="/companies" className={styles.exploreBtn}>
              <span>Explore Preparation</span>
              <FiArrowRight size={16} />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
