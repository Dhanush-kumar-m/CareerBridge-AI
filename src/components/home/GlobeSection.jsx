"use client";

import React, { Suspense } from "react";
import Spline from "@splinetool/react-spline";
import styles from "./GlobeSection.module.css";

// React Error Boundary to catch any offline "Failed to fetch" Spline errors
class SplineErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.warn("Spline failed to load (offline or blocked). Using fallback.", error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export default function GlobeSection() {
  const fallbackUI = (
    <div className={styles.fallbackContainer}>
      <div className={styles.fallbackGlobe} />
      <span style={{ marginTop: "15px", color: "var(--text-secondary)", fontSize: "0.9rem" }}>
        Interactive placement network visualization offline.
      </span>
    </div>
  );

  return (
    <section className={styles.globeSection}>
      <div className={styles.label}>
        <span className={styles.eyebrow}>Placement network</span>
        <h2>Reaching where the offers are.</h2>
      </div>
      <div className={styles.canvasWrap}>
        <SplineErrorBoundary fallback={fallbackUI}>
          <Suspense fallback={<div className={styles.loading}>Loading Interactive Globe...</div>}>
            <Spline 
              scene="https://prod.spline.design/wXzLfYnDZepS9Wj1/scene.splinecode" 
              onError={(e) => {
                console.warn("Spline load error:", e);
                // Trigger the error boundary
                throw new Error("Failed to load Spline scene");
              }}
            />
          </Suspense>
        </SplineErrorBoundary>
      </div>
    </section>
  );
}
