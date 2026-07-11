import React from 'react';
import HeroGlobe from '../components/home/HeroGlobe';
import FeatureGrid from '../components/home/FeatureGrid';
import CompanyMarquee from '../components/home/CompanyMarquee';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.mainShell}>
      {/* 3D Structural Layer */}
      <HeroGlobe/>

      {/* Foreground Text Integration Layer */}
      <section className={styles.heroSection}>
        <div className={styles.textContainer}>
          <h1 className={styles.editorialHeadline}>
            CareerBridge is the new technical infrastructure.
          </h1>
          <p className={styles.editorialSubhead}>
            One network. Transparent optimization. Placement in minutes.
          </p>
        </div>
      </section>

      {/* Continuous Scrolling Corporate Tracks Marquee */}
      <CompanyMarquee/>

      {/* Structured Metric Blocks Intersecting Lower Hemisphere */}
      <FeatureGrid/>
    </main>
  );
}