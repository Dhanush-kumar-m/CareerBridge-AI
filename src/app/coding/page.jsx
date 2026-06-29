"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  modules,
  companies,
  mockTests,
  difficultyLevels
} from "../../data/codingCurriculum";
import {
  FiCode,
  FiTerminal,
  FiBookOpen,
  FiTarget,
  FiActivity,
  FiSearch,
  FiChevronDown,
  FiChevronUp,
  FiClock,
  FiBriefcase,
  FiZap,
  FiPlay,
  FiCheck,
  FiTrendingUp,
  FiCheckCircle,
  FiAward
} from "react-icons/fi";

export default function CodingPage() {
  const [activeTab, setActiveTab] = useState("curriculum");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedModule, setExpandedModule] = useState(null);
  const [completedToast, setCompletedToast] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const completed = params.get("completedLevel");
      if (completed) {
        // Find module title
        const m = modules.find((mod) => mod.id === parseInt(completed));
        if (m) {
          setCompletedToast(`Thanks for completing ${m.title}! 🥳`);
          setExpandedModule(parseInt(completed) + 1); // expand next module
          
          // Smooth scroll to next card
          setTimeout(() => {
            const nextEl = document.getElementById(`module-card-${parseInt(completed) + 1}`);
            if (nextEl) {
              nextEl.scrollIntoView({ behavior: "smooth", block: "center" });
            }
          }, 300);

          // Clear toast after 5s
          setTimeout(() => {
            setCompletedToast("");
          }, 5000);
        }
      }
    }
  }, []);

  const toggleModule = (id) => {
    setExpandedModule(expandedModule === id ? null : id);
  };

  // Filter logic
  const filteredModules = useMemo(() => {
    return modules.filter((m) => {
      const matchesSearch =
        m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.topics.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase())) ||
        m.programs.some((p) => p.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory =
        selectedCategory === "All" || m.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="aptitude-home-container coding-home-container" style={{ padding: "10px" }}>
      {/* Toast Alert */}
      {completedToast && (
        <div 
          className="completed-toast"
          style={{
            position: "fixed",
            top: "24px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(16, 185, 129, 0.9)",
            border: "1px solid rgba(16, 185, 129, 0.4)",
            color: "#ffffff",
            padding: "16px 28px",
            borderRadius: "12px",
            fontWeight: "700",
            fontSize: "1.05rem",
            boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.4)",
            backdropFilter: "blur(8px)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            gap: "10px",
            animation: "slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
          }}
        >
          <span>✨</span>
          {completedToast}
        </div>
      )}

      {/* Banner / Header */}
      <header className="aptitude-portal-header">
        <div className="portal-header-info">
          <span className="badge-glow">
            <FiCode style={{ marginRight: "6px" }} />
            DEVELOPER TRACK
          </span>
          <h1>Placement Coding Hub</h1>
          <p>
            Master programming languages, basic levels, data structures, and advanced algorithms. 
            Compile code instantly, solve archives from product companies, and monitor your placement readiness.
          </p>
        </div>
        <div className="portal-header-stats">
          <div className="stat-pill">
            <span className="stat-label">Coding Progress</span>
            <span className="stat-value">54% Completed</span>
            <div className="mini-progress-bar">
              <div className="fill" style={{ width: "54%" }}></div>
            </div>
          </div>
          <div className="stat-pill">
            <span className="stat-label">Readiness Rating</span>
            <span className="stat-value">81 / 100 XP</span>
            <div className="mini-progress-bar">
              <div className="fill glow" style={{ width: "81%" }}></div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation tabs */}
      <nav className="aptitude-tab-nav">
        <button
          onClick={() => setActiveTab("curriculum")}
          className={`tab-link ${activeTab === "curriculum" ? "active" : ""}`}
        >
          <FiBookOpen />
          <span>Curriculum ({modules.length} Levels)</span>
        </button>

        <button
          onClick={() => setActiveTab("companies")}
          className={`tab-link ${activeTab === "companies" ? "active" : ""}`}
        >
          <FiBriefcase />
          <span>Company Archives ({companies.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("tests")}
          className={`tab-link ${activeTab === "tests" ? "active" : ""}`}
        >
          <FiZap />
          <span>Mock Contests</span>
        </button>

        <button
          onClick={() => setActiveTab("analytics")}
          className={`tab-link ${activeTab === "analytics" ? "active" : ""}`}
        >
          <FiActivity />
          <span>Coding Analytics</span>
        </button>
      </nav>

      {/* Tabs content */}
      <main className="aptitude-tab-content" style={{ marginTop: "20px" }}>
        
        {/* Tab 1: Curriculum */}
        {activeTab === "curriculum" && (
          <section className="tab-pane fade-in">
            <div className="filter-controls">
              {/* Search input */}
              <div className="search-wrapper">
                <FiSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search levels, topics, or program solutions (e.g. Recursion, Spiral Matrix)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Category selector */}
              <div className="category-pills">
                {["All", "Basic Programming", "Data Structures", "Algorithms", "Advanced Concepts"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`pill-btn ${selectedCategory === cat ? "active" : ""}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Curriculum grid */}
            <div className="modules-accordion-grid">
              {filteredModules.length > 0 ? (
                filteredModules.map((m) => {
                  const isExpanded = expandedModule === m.id;
                  const categoryColors = {
                    "Basic Programming": "rgba(59, 130, 246, 0.15)",
                    "Data Structures": "rgba(16, 185, 129, 0.15)",
                    Algorithms: "rgba(245, 158, 11, 0.15)",
                    "Advanced Concepts": "rgba(139, 92, 246, 0.15)"
                  };
                  const categoryBorderColors = {
                    "Basic Programming": "#3b82f6",
                    "Data Structures": "#10b981",
                    Algorithms: "#f59e0b",
                    "Advanced Concepts": "#8b5cf6"
                  };
                  return (
                    <article 
                      key={m.id} 
                      id={`module-card-${m.id}`}
                      className={`module-accordion-card ${isExpanded ? "expanded" : ""}`}
                      style={{ borderLeft: `4px solid ${categoryBorderColors[m.category] || "#4b5563"}` }}
                    >
                      <div className="module-header" onClick={() => toggleModule(m.id)}>
                        <div className="module-title-group">
                          <span 
                            className="module-cat-badge" 
                            style={{ 
                              background: categoryColors[m.category] || "rgba(255,255,255,0.05)",
                              color: categoryBorderColors[m.category] || "#94a3b8"
                            }}
                          >
                            {m.category}
                          </span>
                          <h3>{m.title}</h3>
                        </div>
                        <div className="module-interactive-indicators">
                          <span className="topics-count-label">{m.topics.length} topics</span>
                          
                          {/* Start Practice button */}
                          <Link 
                            href={`/coding/practice?level=${m.id}`}
                            className="start-practice-badge-btn"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <FiPlay style={{ marginRight: "4px" }} />
                            <span>Start Practice</span>
                          </Link>

                          <button className="expand-chevron">
                            {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
                          </button>
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="module-body">
                          <div className="topics-list-container">
                            <h4>Core Concepts Covered:</h4>
                            <div className="topics-tags-grid" style={{ marginBottom: "20px" }}>
                              {m.topics.map((topic, i) => (
                                <span key={i} className="topic-tag">
                                  <FiCheck className="bullet-icon" />
                                  {topic}
                                </span>
                              ))}
                            </div>

                            <h4 style={{ marginTop: "15px" }}>Practice Assignments:</h4>
                            <div className="topics-tags-grid">
                              {m.programs.map((prog, i) => (
                                <span key={i} className="topic-tag" style={{ background: "rgba(99, 102, 241, 0.05)", borderColor: "rgba(99, 102, 241, 0.15)" }}>
                                  <FiCode className="bullet-icon" style={{ color: "#818cf8" }} />
                                  {prog}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="module-practice-footer">
                            <span className="practice-label">Select Workspace:</span>
                            <div className="difficulty-actions-group">
                              <Link href={`/coding/compiler?level=${m.id}`} className="practice-action-btn easy">
                                <span>Compiler Sandbox</span>
                              </Link>
                              <Link href={`/coding/practice?level=${m.id}`} className="practice-action-btn hard">
                                <span>Problem Exercises</span>
                              </Link>
                            </div>
                          </div>
                        </div>
                      )}
                    </article>
                  );
                })
              ) : (
                <div className="empty-search-state">
                  <p>No coding levels found matching your query. Adjust search or category filters.</p>
                </div>
              )}
            </div>

            {/* Coding Tips */}
            <div className="practice-tips-section">
              <h3><FiTarget /> Coding Practice Guidelines</h3>
              <div className="tips-grid">
                <div className="tip-box">
                  <span className="tip-num">01</span>
                  <h5>Optimal Time Complexity</h5>
                  <p>Always start with a brute-force approach, then optimize loops and structures to hit O(N) or O(log N).</p>
                </div>
                <div className="tip-box">
                  <span className="tip-num">02</span>
                  <h5>Edge Cases</h5>
                  <p>Think of boundary values: empty arrays, negative parameters, null inputs, and single items.</p>
                </div>
                <div className="tip-box">
                  <span className="tip-num">03</span>
                  <h5>Dry Run</h5>
                  <p>Trace the variables and recursion call stacks manually before executing in the compiler.</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Tab 2: Company Wise */}
        {activeTab === "companies" && (
          <section className="tab-pane fade-in">
            <div className="company-tab-header">
              <div className="tab-title-desc">
                <h2>Corporate Interview Archives</h2>
                <p>Crack coding questions from top MNCs, service, consulting, and product firms.</p>
              </div>
            </div>

            <div className="companies-card-grid">
              {companies.map((c, i) => (
                <div key={i} className="company-prep-card">
                  <div className="company-logo-avatar" style={{ background: "linear-gradient(135deg, #4f46e5 0%, #312e81 100%)" }}>
                    {c.logo}
                  </div>
                  <div className="company-card-details">
                    <div className="company-card-top-row">
                      <h4>{c.name}</h4>
                      <span className="company-cat-tag">{c.category}</span>
                    </div>
                    <p>{c.questions}</p>
                    <div className="company-card-action">
                      <Link href={`/coding/practice?company=${c.name}`} className="company-prep-btn">
                        <span>Solve Archives</span>
                        <span>➔</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tab 3: Mock Contests */}
        {activeTab === "tests" && (
          <section className="tab-pane fade-in">
            <div className="section-title-wrapper">
              <h2>Active Coding Contests</h2>
              <p>Test your speed, syntax correction, and optimization parameters against time boundaries.</p>
            </div>

            <div className="mock-tests-grid">
              {mockTests.map((t, i) => (
                <div key={i} className="mock-test-card">
                  <div className="mock-card-header">
                    <span className={`level-label ${t.difficulty === "Easy" ? "lbl-beginner" : t.difficulty === "Medium" ? "lbl-medium" : t.difficulty === "Hard" ? "lbl-hard" : "lbl-mixed"}`}>
                      {t.difficulty}
                    </span>
                    <span className="duration-label">
                      <FiClock />
                      {t.duration}
                    </span>
                  </div>
                  <h3>{t.name}</h3>
                  <p>{t.questions} compiled directly matching national evaluation platforms.</p>
                  <div className="mock-card-footer">
                    <span className="qs-count">{t.questions}</span>
                    <Link href={`/coding/compiler?mock=${t.name}`} className="start-test-btn">
                      <span>Enter Arena</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="difficulty-reference-panel">
              <h3>Coding Proficiency Standards</h3>
              <div className="diff-standards-row">
                <div className="diff-standard-box">
                  <div className="indicator-row">
                    <div className="color-dot" style={{ backgroundColor: "#10b981" }}></div>
                    <h4>Beginner / Easy</h4>
                  </div>
                  <p>Focuses on basic syntax loops, conditional checks, functions, and string operations.</p>
                </div>
                <div className="diff-standard-box">
                  <div className="indicator-row">
                    <div className="color-dot" style={{ backgroundColor: "#fbbf24" }}></div>
                    <h4>Medium</h4>
                  </div>
                  <p>Involves array indexing manipulations, linear/binary searching, sorting, and recursion calls.</p>
                </div>
                <div className="diff-standard-box">
                  <div className="indicator-row">
                    <div className="color-dot" style={{ backgroundColor: "#ef4444" }}></div>
                    <h4>Hard / Expert</h4>
                  </div>
                  <p>Algorithms, dynamic programming, backtracking, trie traversals, and window indexing strategies.</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Tab 4: Performance Analytics */}
        {activeTab === "analytics" && (
          <section className="tab-pane fade-in">
            <div className="analytics-layout-grid">
              
              <div className="analytics-left-panel">
                <div className="metric-radial-card">
                  <h4>Overall Acceptance Rate</h4>
                  <div className="radial-meter-container">
                    <svg className="radial-svg">
                      <circle className="radial-bg-track" cx="75" cy="75" r="50"></circle>
                      <circle 
                        className="radial-fill-track" 
                        cx="75" 
                        cy="75" 
                        r="50" 
                        style={{ strokeDashoffset: "251.2", strokeDasharray: "251.2" }}
                      ></circle>
                    </svg>
                    <div className="radial-meter-content">
                      <span className="meter-number">74.2%</span>
                      <span className="meter-label">Acceptance</span>
                    </div>
                  </div>
                  <p className="meter-footer-note">Consistent compiling habits observed. Higher accuracy in Linear Arrays.</p>
                </div>

                <div className="analytics-streak-card">
                  <div className="streak-title-row">
                    <div className="streak-icon-wrap"><FiAward /></div>
                    <div>
                      <h4>5-Day Coding Streak</h4>
                      <p>Solve 1 problem daily to preserve your record.</p>
                    </div>
                  </div>
                  <div className="streak-days-row">
                    {["M", "T", "W", "T", "F", "S", "S"].map((day, idx) => (
                      <div key={idx} className={`streak-day-item ${idx < 5 ? "active" : idx === 5 ? "today-pending" : ""}`}>
                        <span className="day-name">{day}</span>
                        <div className="day-circle">{idx < 5 ? "✔" : idx + 1}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="perf-summary-mini-grid">
                  <div className="mini-summary-card">
                    <div className="summary-icon blue"><FiCode /></div>
                    <div className="summary-info">
                      <span className="summary-val">42 Problems</span>
                      <span className="summary-lbl">Solved Count</span>
                    </div>
                  </div>
                  <div className="mini-summary-card">
                    <div className="summary-icon pink"><FiTrendingUp /></div>
                    <div className="summary-info">
                      <span className="summary-val">2,450 XP</span>
                      <span className="summary-lbl">Points Earned</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="analytics-right-panel">
                <div className="topic-breakdown-card">
                  <h4>Competency breakdown</h4>
                  <div className="topic-progress-list">
                    <div className="topic-prog-row">
                      <div className="prog-title-row"><span>Basic Loops & Syntax</span><span>82%</span></div>
                      <div className="progress-bar-track"><div className="progress-bar-fill" style={{ width: "82%", backgroundColor: "#3b82f6" }}></div></div>
                    </div>
                    <div className="topic-prog-row">
                      <div className="prog-title-row"><span>Arrays & Strings</span><span>65%</span></div>
                      <div className="progress-bar-track"><div className="progress-bar-fill" style={{ width: "65%", backgroundColor: "#10b981" }}></div></div>
                    </div>
                    <div className="topic-prog-row">
                      <div className="prog-title-row"><span>Recursion & OOPs</span><span>40%</span></div>
                      <div className="progress-bar-track"><div className="progress-bar-fill" style={{ width: "40%", backgroundColor: "#fbbf24" }}></div></div>
                    </div>
                    <div className="topic-prog-row">
                      <div className="prog-title-row"><span>Data Structures (LL, Stacks)</span><span>28%</span></div>
                      <div className="progress-bar-track"><div className="progress-bar-fill" style={{ width: "28%", backgroundColor: "#a78bfa" }}></div></div>
                    </div>
                    <div className="topic-prog-row">
                      <div className="prog-title-row"><span>Dynamic Programming</span><span>10%</span></div>
                      <div className="progress-bar-track"><div className="progress-bar-fill" style={{ width: "10%", backgroundColor: "#ec4899" }}></div></div>
                    </div>
                  </div>
                </div>

                <div className="strength-weakness-card">
                  <h4>Focus Zones</h4>
                  <div className="sw-grid">
                    <div className="sw-column strength">
                      <h5>Strengths</h5>
                      <ul>
                        <li>Array Traversal speed</li>
                        <li>Brute-force loop logic</li>
                        <li>Spelling/Syntax checks</li>
                      </ul>
                    </div>
                    <div className="sw-column weakness">
                      <h5>Areas to Review</h5>
                      <ul>
                        <li>Recursion depth management</li>
                        <li>Multi-dimensional array indexers</li>
                        <li>Optimal memory complexities</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </section>
        )}

      </main>
    </div>
  );
}