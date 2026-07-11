"use client";

import React, { useState } from "react";
import { FiCheck, FiCpu, FiFileText, FiMessageSquare, FiArrowRight } from "react-icons/fi";
import styles from "./StickyModulesSection.module.css";

const MODULES = [
  {
    id: 0,
    number: "01 / 04",
    title: "Aptitude Practice",
    description: "Master quantitative, logical, and verbal reasoning through topic-based tests and detailed answer explanations.",
    points: [
      "2,500+ quantitative & logical questions",
      "Company-specific assessment patterns",
      "Detailed step-by-step solutions"
    ],
    icon: <FiCheck size={14} />
  },
  {
    id: 1,
    number: "02 / 04",
    title: "Coding Arena",
    description: "Master placement-specific coding questions, algorithms, and data structures in a full-featured code compiler.",
    points: [
      "50+ standard coding challenges",
      "Instant compiler verification feedback",
      "Optimized solutions in C++, Java & Python"
    ],
    icon: <FiCpu size={14} />
  },
  {
    id: 2,
    number: "03 / 04",
    title: "Resume Preparation",
    description: "Scan your resume against target job profiles, analyze ATS scores, and get instant feedback on missing keywords.",
    points: [
      "Automated ATS score check",
      "Profile keyword matching recommendations",
      "Grammatical and structure checks"
    ],
    icon: <FiFileText size={14} />
  },
  {
    id: 3,
    number: "04 / 04",
    title: "Mock Interviews",
    description: "Practice technical and HR interview rounds with real-time feedback on confidence, speech pace, and grammar.",
    points: [
      "Simulated HR and Technical interviews",
      "Real-time answer quality evaluation",
      "Detailed speaking confidence metrics"
    ],
    icon: <FiMessageSquare size={14} />
  }
];

export default function StickyModulesSection() {
  const [activeModule, setActiveModule] = useState(0);

  return (
    <section className={styles.sectionWrapper} id="practice-modules">
      <div className={styles.titleArea}>
        <span className={styles.eyebrow}>Core Capabilities</span>
        <h2>Learn, practice, and track everything in one place.</h2>
      </div>

      <div className={styles.stickyContainer}>
        {/* Left Column: List of Sticky Storytelling Tabs */}
        <div className={styles.leftColumn}>
          {MODULES.map((mod) => (
            <div
              key={mod.id}
              className={`${styles.moduleTab} ${activeModule === mod.id ? styles.moduleTabActive : ""}`}
              onClick={() => setActiveModule(mod.id)}
            >
              <div className={styles.tabHeader}>
                <span className={styles.tabTitle}>{mod.title}</span>
                <span className={styles.tabNumber}>{mod.number}</span>
              </div>
              <p className={styles.tabDesc}>{mod.description}</p>
              <ul className={styles.tabPoints}>
                {mod.points.map((pt, index) => (
                  <li key={index}>
                    <span className={styles.tabPointIcon}>{mod.icon}</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Right Column: Previews updating smoothly on click */}
        <div className={styles.rightColumn}>
          <div className={styles.previewContainer}>
            <div className={styles.previewWrapper}>
              
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
                    <span style={{ color: "#3157d5" }}>int</span> <span style={{ color: "#090d2e" }}>findMaxProduct</span>(<span style={{ color: "#3157d5" }}>vector</span>&lt;<span style={{ color: "#3157d5" }}>int</span>&gt;&amp; nums) &#123;<br />
                    &nbsp;&nbsp;<span style={{ color: "#854d0e" }}>// Sort to find the largest elements</span><br />
                    &nbsp;&nbsp;<span style={{ color: "#000" }}>sort(nums.begin(), nums.end());</span><br />
                    &nbsp;&nbsp;<span style={{ color: "#3157d5" }}>int</span> n = nums.size();<br />
                    &nbsp;&nbsp;<span style={{ color: "#3157d5" }}>return</span> max(nums[n-1] * nums[n-2], nums[0] * nums[1]);<br />
                    &#125;
                  </div>
                  <div className={styles.testResult}>
                    <span>✓ Compilation Success</span>
                    <button className={styles.nextProblemBtn}>
                      <span>Next Problem</span>
                      <FiArrowRight size={14} />
                    </button>
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
                    <span style={{ color: "var(--danger)", animation: "pulse 1s infinite alternate" }}>● Recording</span>
                  </div>
                  <p className={styles.uiQuestion}>
                    "Why do you want to work with our organization?"
                  </p>
                  
                  {/* Mock Waveform */}
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
    </section>
  );
}
