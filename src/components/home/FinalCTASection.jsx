"use client";

import React from "react";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";
import styles from "./FinalCTASection.module.css";
import AnimatedContent from "../reactbits/AnimatedContent";

export default function FinalCTASection() {
  const { isAuthenticated } = useAuth();

  return (
    <section className={styles.sectionWrapper}>
      <div className={styles.bgText}>READY</div>
      <AnimatedContent delay={0.1} yOffset={30} className={styles.contentArea}>
        <h2>Start building your placement readiness today</h2>
        <p className={styles.description}>
          Follow a structured path, practice consistently and understand exactly where you need to improve.
        </p>
        <div className={styles.ctaGroup}>
          <Link href={isAuthenticated ? "/dashboard" : "/login"} className={styles.ctaPrimary}>
            <span>Open Student Portal</span>
            <FiArrowRight size={16} />
          </Link>
          <Link href="/coding" className={styles.ctaSecondary}>
            <span>Explore Practice Modules</span>
          </Link>
        </div>
      </AnimatedContent>
    </section>
  );
}
