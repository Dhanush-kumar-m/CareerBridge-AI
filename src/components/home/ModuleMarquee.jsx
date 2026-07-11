"use client";

import React from "react";
import styles from "./ModuleMarquee.module.css";

const MARQUEE_ITEMS = [
  "Aptitude Practice",
  "Coding Arena",
  "Resume Preparation",
  "Mock Interviews",
  "Company Preparation",
  "Progress Analytics"
];

export default function ModuleMarquee() {
  // Duplicate list to achieve infinite loop effect
  const doubleItems = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div className={styles.marqueeContainer}>
      <div className={styles.marqueeTrack}>
        {doubleItems.map((item, index) => (
          <div key={index} className={styles.marqueeItem}>
            <span className={styles.marqueeDot} />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
