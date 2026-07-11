"use client";

import Spline from "@splinetool/react-spline/next";
import styles from "./GlobeSection.module.css";

/**
 * Renders the Spline-designed rotating globe scene, inside the same
 * dark-section wrapper used across the rest of the homepage.
 *
 * Note on network dots/arcs: since the globe now lives inside Spline
 * (not raw Three.js), the campus/company nodes and connecting arcs
 * should be added as objects *inside the Spline scene itself* rather
 * than an HTML overlay — Spline doesn't expose per-frame camera/rotation
 * state easily enough to keep an external overlay in sync as it spins.
 * In the Spline editor: duplicate a small sphere for each node, position
 * it on the globe's surface (Position panel, or drag directly on the
 * mesh), color it your accent amber, and use the Curve/Line tool for
 * the arcs between them. They'll then rotate naturally with the globe
 * since they're part of the same 3D scene.
 */
export default function GlobeSection() {
  return (
    <section className={styles.globeSection}>
      <div className={styles.label}>
        <span className={styles.eyebrow}>Placement network</span>
        <h2>Reaching where the offers are.</h2>
      </div>
      <div className={styles.canvasWrap}>
        <Spline scene="https://prod.spline.design/wXzLfYnDZepS9Wj1/scene.splinecode" />
      </div>
    </section>
  );
}
