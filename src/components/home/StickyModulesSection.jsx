"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FiCheck, FiCpu, FiFileText, FiMessageSquare, FiArrowRight } from "react-icons/fi";
import styles from "./StickyModulesSection.module.css";

const MODULES = [
  {
    id: 0,
    number: "01",
    total: "04",
    label: "Aptitude Practice",
    title: "Master Quantitative, Logical & Verbal Reasoning",
    description: "Master quantitative, logical, and verbal reasoning through topic-based tests and detailed answer explanations.",
    points: [
      "2,500+ quantitative & logical questions",
      "Company-specific assessment patterns",
      "Detailed step-by-step solutions"
    ],
    href: "/aptitude",
    icon: <FiCheck size={14} />
  },
  {
    id: 1,
    number: "02",
    total: "04",
    label: "Coding Arena",
    title: "Solve Problems in a Full-Featured Compiler",
    description: "Master placement-specific coding questions, algorithms, and data structures in a full-featured code compiler.",
    points: [
      "50+ standard coding challenges",
      "Instant compiler verification feedback",
      "Optimized solutions in C++, Java & Python"
    ],
    href: "/coding",
    icon: <FiCpu size={14} />
  },
  {
    id: 2,
    number: "03",
    total: "04",
    label: "Resume Preparation",
    title: "Optimize Your Resume for ATS Filters",
    description: "Scan your resume against target job profiles, analyze ATS scores, and get instant feedback on missing keywords.",
    points: [
      "Automated ATS score check",
      "Profile keyword matching recommendations",
      "Grammatical and structure checks"
    ],
    href: "/resume/analyzer",
    icon: <FiFileText size={14} />
  },
  {
    id: 3,
    number: "04",
    total: "04",
    label: "Mock Interviews",
    title: "Practice Interviews with Real-Time Feedback",
    description: "Practice technical and HR interview rounds with real-time feedback on confidence, speech pace, and grammar.",
    points: [
      "Simulated HR and Technical interviews",
      "Real-time answer quality evaluation",
      "Detailed speaking confidence metrics"
    ],
    href: "/mock-interview",
    icon: <FiMessageSquare size={14} />
  }
];

export default function StickyModulesSection() {
  const [activeModule, setActiveModule] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      if (window.innerWidth <= 968) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalHeight = rect.height;
      
      // Calculate how far down the section the viewport is
      const scrollStart = -rect.top;
      const scrollRange = totalHeight - windowHeight;
      
      if (scrollRange <= 0) return;

      const progress = Math.max(0, Math.min(0.999, scrollStart / scrollRange));
      const activeIdx = Math.floor(progress * MODULES.length);
      
      setActiveModule(activeIdx);
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToModule = (index) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const totalHeight = rect.height;
    const scrollRange = totalHeight - windowHeight;
    
    if (scrollRange <= 0) return;

    const targetOffset = (index / MODULES.length) * scrollRange;
    const targetScrollY = window.scrollY + rect.top + targetOffset + 10;

    window.scrollTo({
      top: targetScrollY,
      behavior: "smooth"
    });
    setActiveModule(index);
  };

  return (
    <section className={styles.sectionWrapper} id="practice-modules" ref={containerRef}>
      <div className={styles.titleArea}>
        <span className={styles.eyebrow}>Core Capabilities</span>
        <h2>Learn, practice, and track everything in one place.</h2>
      </div>

      {/* Desktop Sticky Scroll Storytelling Layout */}
      <div className={styles.desktopContainer}>
        <div className={styles.stickyContainer}>
          {/* Left Column: Details panel (sticky & updates in place) */}
          <div className={styles.leftColumn}>
            {/* Interactive Step Dots */}
            <div className={styles.dotsIndicator}>
              {MODULES.map((mod, index) => (
                <button
                  key={mod.id}
                  className={`${styles.dotBtn} ${activeModule === index ? styles.dotBtnActive : ""}`}
                  onClick={() => scrollToModule(index)}
                  aria-label={`Go to module ${index + 1}`}
                >
                  <span className={styles.dotNum}>{mod.number}</span>
                  <span className={styles.dotLabel}>{mod.label}</span>
                </button>
              ))}
            </div>

            {/* In-place content transitions */}
            <div className={styles.textContainer}>
              {MODULES.map((mod, index) => (
                <div
                  key={mod.id}
                  className={`${styles.textBlock} ${activeModule === index ? styles.textBlockActive : ""}`}
                  aria-hidden={activeModule !== index}
                >
                  <span className={styles.tabNumber}>{mod.number} / {mod.total}</span>
                  <h3 className={styles.tabTitle}>{mod.title}</h3>
                  <p className={styles.tabDesc}>{mod.description}</p>
                  <ul className={styles.tabPoints}>
                    {mod.points.map((pt, idx) => (
                      <li key={idx}>
                        <span className={styles.tabPointIcon}>{mod.icon}</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                  <div style={{ marginTop: "24px" }}>
                    <Link href={mod.href} className={styles.moduleLink}>
                      <span>Start Preparing</span>
                      <FiArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Previews updating in place with transitions */}
          <div className={styles.rightColumn}>
            <div className={styles.previewContainer}>
              {/* Aptitude Preview */}
              <div className={`${styles.previewItem} ${activeModule === 0 ? styles.previewItemActive : ""}`}>
                <div className={styles.aptitudeUI}>
                  <div className={styles.uiHeader}>
                    <span>Quantitative Aptitude — Probability</span>
                    <span>Q. 14 / 20</span>
                  </div>
                  <p className={styles.uiQuestion}>
                    What is the probability of rolling a prime number with a fair 6-sided die?
                  </p>
                  <div className={styles.uiOptions}>
                    <div className={styles.uiOption}>
                      <span>A. 1/3 (Options: 1, 2)</span>
                    </div>
                    <div className={`${styles.uiOption} ${styles.uiOptionCorrect}`}>
                      <span>B. 1/2 (Options: 2, 3, 5)</span>
                      <span style={{ color: "var(--success)", fontWeight: "bold" }}>✓ Correct</span>
                    </div>
                    <div className={styles.uiOption}>
                      <span>C. 2/3 (Options: 2, 3, 4, 5)</span>
                    </div>
                  </div>
                  <div className={styles.uiExplanation}>
                    <strong>Explanation:</strong> Prime numbers on a die are 2, 3, and 5. The total outcomes are 6. Probability = 3/6 = 1/2.
                  </div>
                </div>
              </div>

              {/* Coding Preview */}
              <div className={`${styles.previewItem} ${activeModule === 1 ? styles.previewItemActive : ""}`}>
                <div className={styles.codingUI}>
                  <div className={styles.uiHeader}>
                    <span>Problem: Max Product of Two Elements</span>
                    <span style={{ color: "var(--success)", fontWeight: "700" }}>Accepted</span>
                  </div>
                  <div className={styles.editorHeader}>
                    <span>solution.cpp</span>
                    <span>C++17</span>
                  </div>
                  <div className={styles.editorBody}>
                    <span style={{ color: "#60a5fa" }}>int</span> <span style={{ color: "#fbbf24" }}>findMaxProduct</span>(<span style={{ color: "#34d399" }}>vector</span>&lt;<span style={{ color: "#60a5fa" }}>int</span>&gt;&amp; nums) &#123;<br />
                    &nbsp;&nbsp;<span style={{ color: "#8b8b90" }}>{"// Sort to find the largest elements"}</span><br />
                    &nbsp;&nbsp;<span style={{ color: "#f3f2ed" }}>sort(nums.begin(), nums.end());</span><br />
                    &nbsp;&nbsp;<span style={{ color: "#60a5fa" }}>int</span> n = nums.size();<br />
                    &nbsp;&nbsp;<span style={{ color: "#60a5fa" }}>return</span> max(nums[n-1] * nums[n-2], nums[0] * nums[1]);<br />
                    &#125;
                  </div>
                  <div className={styles.testResult}>
                    <span>✓ Compilation Success</span>
                  </div>
                </div>
              </div>

              {/* Resume Preview */}
              <div className={`${styles.previewItem} ${activeModule === 2 ? styles.previewItemActive : ""}`}>
                <div className={styles.resumeUI}>
                  <div className={styles.uiHeader}>
                    <span>Resume ATS Match Analyzer</span>
                    <span style={{ color: "var(--success)" }}>Scanned</span>
                  </div>
                  <div className={styles.scoreCard}>
                    <div className={styles.scoreCircle}>88%</div>
                    <div>
                      <h4 className={styles.cardTitle}>Strong Candidate Match</h4>
                      <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginTop: "4px" }}>
                        Optimized for Software Engineer profiles.
                      </p>
                    </div>
                  </div>
                  <div className={styles.resumeTips}>
                    <div className={styles.resumeTip}>
                      <span style={{ color: "var(--success)" }}>●</span>
                      <span>Target keywords found: Algorithms, React, SQL</span>
                    </div>
                    <div className={styles.resumeTip}>
                      <span style={{ color: "var(--warning)" }}>●</span>
                      <span>Missing keywords: System Design, AWS Cloud</span>
                    </div>
                    <div className={styles.resumeTip}>
                      <span style={{ color: "var(--accent)" }}>●</span>
                      <span>Suggested: Quantify achievements in your projects</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interview Preview */}
              <div className={`${styles.previewItem} ${activeModule === 3 ? styles.previewItemActive : ""}`}>
                <div className={styles.interviewUI}>
                  <div className={styles.uiHeader}>
                    <span>Mock Interview Console</span>
                    <span style={{ color: "var(--danger)" }}>● Recording</span>
                  </div>
                  <p className={styles.uiQuestion}>
                    "Why do you want to work with our organization?"
                  </p>
                  <div className={styles.interviewWave}>
                    <div className={`${styles.waveBar} ${styles.waveActive}`} />
                    <div className={`${styles.waveBar} ${styles.waveActive}`} style={{ animationDelay: "0.2s" }} />
                    <div className={`${styles.waveBar} ${styles.waveActive}`} style={{ animationDelay: "0.4s" }} />
                    <div className={`${styles.waveBar} ${styles.waveActive}`} style={{ animationDelay: "0.1s" }} />
                    <div className={`${styles.waveBar} ${styles.waveActive}`} style={{ animationDelay: "0.5s" }} />
                    <div className={`${styles.waveBar} ${styles.waveActive}`} style={{ animationDelay: "0.3s" }} />
                    <div className={styles.waveBar} />
                    <div className={styles.waveBar} />
                  </div>
                  <div className={styles.resumeTips}>
                    <div className={styles.resumeTip}>
                      <span style={{ color: "var(--success)" }}>●</span>
                      <span>Pace: Good (135 words per minute)</span>
                    </div>
                    <div className={styles.resumeTip}>
                      <span style={{ color: "var(--accent)" }}>●</span>
                      <span>Filler words: low (2 instances detected)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Stacked Layout (No pinning, no scroll listening, all content visible) */}
      <div className={styles.mobileContainer}>
        {MODULES.map((mod, index) => (
          <div key={mod.id} className={styles.mobileCard}>
            <div className={styles.mobileText}>
              <span className={styles.tabNumber}>{mod.number} / {mod.total}</span>
              <h3 className={styles.tabTitle}>{mod.title}</h3>
              <p className={styles.tabDesc}>{mod.description}</p>
              <ul className={styles.tabPoints}>
                {mod.points.map((pt, idx) => (
                  <li key={idx}>
                    <span className={styles.tabPointIcon}>{mod.icon}</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className={styles.mobilePreview}>
              {index === 0 && (
                <div className={styles.aptitudeUI}>
                  <div className={styles.uiHeader}>
                    <span>Quantitative Aptitude — Probability</span>
                    <span>Q. 14 / 20</span>
                  </div>
                  <p className={styles.uiQuestion}>
                    What is the probability of rolling a prime number with a fair 6-sided die?
                  </p>
                  <div className={styles.uiOptions}>
                    <div className={styles.uiOption}>
                      <span>A. 1/3 (Options: 1, 2)</span>
                    </div>
                    <div className={`${styles.uiOption} ${styles.uiOptionCorrect}`}>
                      <span>B. 1/2 (Options: 2, 3, 5)</span>
                      <span style={{ color: "var(--success)", fontWeight: "bold" }}>✓ Correct</span>
                    </div>
                    <div className={styles.uiOption}>
                      <span>C. 2/3 (Options: 2, 3, 4, 5)</span>
                    </div>
                  </div>
                  <div className={styles.uiExplanation}>
                    <strong>Explanation:</strong> Prime numbers on a die are 2, 3, and 5. The total outcomes are 6. Probability = 3/6 = 1/2.
                  </div>
                </div>
              )}

              {index === 1 && (
                <div className={styles.codingUI}>
                  <div className={styles.uiHeader}>
                    <span>Problem: Max Product of Two Elements</span>
                    <span style={{ color: "var(--success)", fontWeight: "700" }}>Accepted</span>
                  </div>
                  <div className={styles.editorHeader}>
                    <span>solution.cpp</span>
                    <span>C++17</span>
                  </div>
                  <div className={styles.editorBody}>
                    <span style={{ color: "#60a5fa" }}>int</span> <span style={{ color: "#fbbf24" }}>findMaxProduct</span>(<span style={{ color: "#34d399" }}>vector</span>&lt;<span style={{ color: "#60a5fa" }}>int</span>&gt;&amp; nums) &#123;<br />
                    &nbsp;&nbsp;<span style={{ color: "#8b8b90" }}>{"// Sort to find the largest elements"}</span><br />
                    &nbsp;&nbsp;<span style={{ color: "#f3f2ed" }}>sort(nums.begin(), nums.end());</span><br />
                    &nbsp;&nbsp;<span style={{ color: "#60a5fa" }}>int</span> n = nums.size();<br />
                    &nbsp;&nbsp;<span style={{ color: "#60a5fa" }}>return</span> max(nums[n-1] * nums[n-2], nums[0] * nums[1]);<br />
                    &#125;
                  </div>
                  <div className={styles.testResult}>
                    <span>✓ Compilation Success</span>
                  </div>
                </div>
              )}

              {index === 2 && (
                <div className={styles.resumeUI}>
                  <div className={styles.uiHeader}>
                    <span>Resume ATS Match Analyzer</span>
                    <span style={{ color: "var(--success)" }}>Scanned</span>
                  </div>
                  <div className={styles.scoreCard}>
                    <div className={styles.scoreCircle}>88%</div>
                    <div>
                      <h4 className={styles.cardTitle}>Strong Candidate Match</h4>
                      <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginTop: "4px" }}>
                        Optimized for Software Engineer profiles.
                      </p>
                    </div>
                  </div>
                  <div className={styles.resumeTips}>
                    <div className={styles.resumeTip}>
                      <span style={{ color: "var(--success)" }}>●</span>
                      <span>Target keywords found: Algorithms, React, SQL</span>
                    </div>
                    <div className={styles.resumeTip}>
                      <span style={{ color: "var(--warning)" }}>●</span>
                      <span>Missing keywords: System Design, AWS Cloud</span>
                    </div>
                    <div className={styles.resumeTip}>
                      <span style={{ color: "var(--accent)" }}>●</span>
                      <span>Suggested: Quantify achievements in your projects</span>
                    </div>
                  </div>
                </div>
              )}

              {index === 3 && (
                <div className={styles.interviewUI}>
                  <div className={styles.uiHeader}>
                    <span>Mock Interview Console</span>
                    <span style={{ color: "var(--danger)" }}>● Recording</span>
                  </div>
                  <p className={styles.uiQuestion}>
                    "Why do you want to work with our organization?"
                  </p>
                  <div className={styles.interviewWave}>
                    <div className={`${styles.waveBar} ${styles.waveActive}`} />
                    <div className={`${styles.waveBar} ${styles.waveActive}`} style={{ animationDelay: "0.2s" }} />
                    <div className={`${styles.waveBar} ${styles.waveActive}`} style={{ animationDelay: "0.4s" }} />
                    <div className={`${styles.waveBar} ${styles.waveActive}`} style={{ animationDelay: "0.1s" }} />
                    <div className={`${styles.waveBar} ${styles.waveActive}`} style={{ animationDelay: "0.5s" }} />
                    <div className={`${styles.waveBar} ${styles.waveActive}`} style={{ animationDelay: "0.3s" }} />
                    <div className={styles.waveBar} />
                    <div className={styles.waveBar} />
                  </div>
                  <div className={styles.resumeTips}>
                    <div className={styles.resumeTip}>
                      <span style={{ color: "var(--success)" }}>●</span>
                      <span>Pace: Good (135 words per minute)</span>
                    </div>
                    <div className={styles.resumeTip}>
                      <span style={{ color: "var(--accent)" }}>●</span>
                      <span>Filler words: low (2 instances detected)</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div style={{ marginTop: "16px" }}>
              <Link href={mod.href} className={styles.moduleLink}>
                <span>Start Preparing</span>
                <FiArrowRight size={14} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

