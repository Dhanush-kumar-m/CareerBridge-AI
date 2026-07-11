"use client";

import React, { Suspense } from 'react';
import Spline from '@splinetool/react-spline';
import styles from './HeroGlobe.module.css';

// React Error Boundary to catch any network "Failed to fetch" Spline errors
class SplineErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.warn("Spline failed to load. Using fallback.", error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export default function HeroGlobe() {
  const fallbackUI = (
    <div className={styles.fallbackContainer}>
      <div className={styles.fallbackGlobe} />
    </div>
  );

  return (
    <div className={styles.globeContainer}>
      <SplineErrorBoundary fallback={fallbackUI}>
        <Suspense fallback={<div className={styles.fallbackSpinner} />}>
          <Spline 
            className={styles.splineCanvas} 
            scene="https://prod.spline.design/Vet2fBgG-W0ZFEO6/scene.splinecode"
            onError={(e) => {
              console.warn("Spline load error caught:", e);
              throw new Error("Failed to load Spline scene");
            }}
          />
        </Suspense>
      </SplineErrorBoundary>
    </div>
  );
}
