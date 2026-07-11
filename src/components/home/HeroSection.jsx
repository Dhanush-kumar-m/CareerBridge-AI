"use client";

import { FiShield, FiCode, FiArrowRight } from "react-icons/fi";
import SplitText from "../reactbits/SplitText";
import FadeContent from "../reactbits/FadeContent";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      {/* subtle amber glow, replaces the old indigo radial gradient */}
      <div className={styles.heroGlow} aria-hidden="true" />

      <div className={styles.heroInner}>
        {/* Badge — fades in first */}
        <FadeContent duration={600} delay={0} blur={true}>
          <div className={styles.badge}>
            <FiShield size={13} color="var(--accent)" />
            <span>Next-Gen Career Training Infrastructure</span>
          </div>
        </FadeContent>

        {/* Headline — word-by-word split, like fin.com's load-in */}
        <h1 className={styles.headline}>
          <SplitText
            text="Crack Your Dream Job With"
            className={styles.headlineWhite}
            splitType="words"
            delay={80}
            duration={0.7}
          />
          <SplitText
            text="CareerBridge AI"
            className={styles.headlineAccent}
            splitType="words"
            delay={80}
            duration={0.7}
            startDelay={300}
          />
        </h1>

        {/* Description — fades in after headline settles */}
        <FadeContent duration={700} delay={650} blur={true}>
          <p className={styles.description}>
            An institutional-grade platform designed to accelerate candidate
            preparation. Master Aptitude assessments, solve Coding challenges,
            scan ATS resumes, and practice live mock interviews.
          </p>
        </FadeContent>

        {/* CTAs — last to arrive */}
        <FadeContent duration={700} delay={850} blur={false}>
          <div className={styles.ctaRow}>
            <a href="/login" className={styles.ctaPrimary}>
              Access Student Portal <FiArrowRight size={16} />
            </a>
            <a href="/coding" className={styles.ctaSecondary}>
              Practice Coding <FiCode size={16} />
            </a>
          </div>
        </FadeContent>

        {/* Live dashboard mockup — reveals with a slight rise + fade,
            timed just after the CTAs so the eye has somewhere to land */}
        <FadeContent duration={900} delay={1050} blur={true}>
          <div className={styles.dashboardPanel}>
            <div className={styles.panelChrome}>
              <span className={styles.dotRed} />
              <span className={styles.dotYellow} />
              <span className={styles.dotGreen} />
            </div>

            <div className={styles.dashboardGrid}>
              <div className={styles.metricCard}>
                <span className={styles.metricLabel}>Placement Readiness</span>
                <span className={styles.metricValue}>85%</span>
                <span className={styles.metricDelta}>+5% this week</span>
                <div className={styles.progressTrack}>
                  <div className={styles.progressFill} style={{ width: "85%" }} />
                </div>
              </div>

              <div className={styles.metricCard}>
                <span className={styles.metricLabel}>Coding Challenges</span>
                <span className={styles.metricValue}>42 solved</span>
                <span className={styles.metricDelta}>5-day streak</span>
                <div className={styles.streakRow}>
                  {[1, 1, 1, 1, 1, 0, 0].map((lit, i) => (
                    <span
                      key={i}
                      className={lit ? styles.streakBoxLit : styles.streakBox}
                    />
                  ))}
                </div>
              </div>

              <div className={styles.metricCard}>
                <span className={styles.metricLabel}>Resume ATS Match</span>
                <span className={styles.metricValue}>88/100</span>
                <span className={styles.metricDelta}>Strong match</span>
                <div className={styles.progressTrack}>
                  <div className={styles.progressFill} style={{ width: "88%" }} />
                </div>
              </div>
            </div>
          </div>
        </FadeContent>
      </div>
    </section>
  );
}
