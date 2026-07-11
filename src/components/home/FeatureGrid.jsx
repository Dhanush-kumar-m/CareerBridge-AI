import React from 'react';
import styles from './FeatureGrid.module.css';

const structuralMetrics = [
  { metric: "98.4%", label: "Placement Accuracy", desc: "Systematic evaluation profiles locked directly across primary hiring pipelines." },
  { metric: "<60m", label: "Real-Time Compiler", desc: "Instant compiler trace evaluation and deep structural testing vectors." },
  { metric: "88/100", label: "ATS Optimization", desc: "Rigid parsing compliance checks ensuring immediate resume indexing visibility." },
  { metric: "Direct", label: "Hiring Pipeline", desc: "Eliminating secondary UI layers for single-network institutional matching." }
];

export default function FeatureGrid() {
  return (
    <section className={styles.sectionWrapper}>
      {structuralMetrics.map((item, index) => (
        <div key={index} className={styles.gridCell}>
          <div className={styles.cellHeader}>
            <div className={styles.metric}>{item.metric}</div>
            <div className={styles.label}>{item.label}</div>
          </div>
          <p className={styles.description}>{item.desc}</p>
        </div>
      ))}
    </section>
  );
}
