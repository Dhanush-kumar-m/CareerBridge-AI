import React, { Suspense } from 'react';
import Spline from '@splinetool/react-spline';
import styles from './HeroGlobe.module.css';

export default function HeroGlobe() {
  return (
    <div className={styles.globeContainer}>
      <Suspense fallback={<div className={styles.fallbackSpinner} />}>
        <Spline className={styles.splineCanvas} scene="https://prod.spline.design/Vet2fBgG-W0ZFEO6/scene.splinecode"/>
      </Suspense>
    </div>
  );
}
