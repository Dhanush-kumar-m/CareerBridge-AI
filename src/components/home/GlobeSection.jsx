"use client";

import React, { Suspense, useEffect } from "react";
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
  const [hasError, setHasError] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    fetch("https://prod.spline.design/Vet2fBgG-W0ZFEO6/scene.splinecode", {
      method: "HEAD",
      mode: "no-cors",
      signal: controller.signal,
    })
      .then(() => {
        clearTimeout(timeoutId);
        setIsLoaded(true);
      })
      .catch((err) => {
        clearTimeout(timeoutId);
        console.warn("Spline scene check failed, loading static fallback:", err);
        setHasError(true);
      });

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, []);

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
        {hasError ? (
          fallbackUI
        ) : !isLoaded ? (
          <div className={styles.loading}>Loading Interactive Globe...</div>
        ) : (
          <SplineErrorBoundary fallback={fallbackUI}>
            <Suspense fallback={<div className={styles.loading}>Loading Interactive Globe...</div>}>
              <Spline 
                scene="https://prod.spline.design/Vet2fBgG-W0ZFEO6/scene.splinecode" 
                onError={(e) => {
                  console.warn("Spline load error:", e);
                  setHasError(true);
                }}
              />
            </Suspense>
          </SplineErrorBoundary>
        )}
      </div>
    </section>
  );
}
