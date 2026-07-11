"use client";

import React from "react";
import styles from "./ModuleMarquee.module.css";

const MARQUEE_ITEMS = [
  "Aptitude",
  "Coding",
  "Resume",
  "Interview",
  "Companies",
  "Analytics"
];

export default function ModuleMarquee() {
  // Duplicate list to achieve seamless loop
  const doubleItems = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div className={styles.marqueeContainer}>
      <div className={styles.marqueeTrack}>
        {doubleItems.map((item, index) => (
          <React.Fragment key={index}>
            <div className={styles.marqueeItem}>
              {item}
            </div>
            {index < doubleItems.length - 1 && (
              <span className={styles.divider}>|</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
