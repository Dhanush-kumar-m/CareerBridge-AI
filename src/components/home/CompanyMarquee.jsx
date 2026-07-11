import React from 'react';
import styles from './CompanyMarquee.module.css';

const corporateTracks = [
  "PRODUCT ARCHITECTURE", "SERVICE LAYER AUTOMATION", "STARTUP INFRASTRUCTURE", 
  "QUANTITATIVE METRICS", "ALGORITHMIC VERIFICATION", "ENTERPRISE DEPLOYMENT"
];

export default function CompanyMarquee() {
  // Duplicate track elements array to build seamless wrapping flow loop
  const doubleTracks = [...corporateTracks, ...corporateTracks];

  return (
    <div className={styles.marqueeContainer}>
      <div className={styles.marqueeTrack}>
        {doubleTracks.map((track, idx) => (
          <span key={idx} className={styles.marqueeItem}>
            {track}
          </span>
        ))}
      </div>
    </div>
  );
}
