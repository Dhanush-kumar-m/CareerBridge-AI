"use client";

import Link from "next/link";
import Image from "next/image";
import { FiCode, FiCpu, FiTerminal, FiCheckCircle } from "react-icons/fi";
import AnimatedContent from "../reactbits/AnimatedContent";

export default function PracticeCodingSection() {
  return (
    <section id="coding-practice" style={{ padding: "80px 24px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "50px", alignItems: "center" }}>
        
        {/* Left Side: Text Details */}
        <AnimatedContent delay={0.1} yOffset={20}>
          <div>
            <span style={{ color: "#10b981", fontSize: "0.85rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em" }}>Interactive Coding Arena</span>
            <h2 style={{ fontSize: "2.2rem", color: "#ffffff", margin: "10px 0 20px 0", lineHeight: "1.2" }}>
              Develop Structurally Sound Solutions
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: "1.7", marginBottom: "25px" }}>
              Practice core programming problems in multiple languages. Write, compile, and run code directly in the browser editor. Test your logic against hidden edge cases and time constraints to verify performance.
            </p>
            
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 30px 0", display: "flex", flexDirection: "column", gap: "12px" }}>
              <li style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.92rem", color: "#e2e8f0" }}>
                <FiTerminal style={{ color: "#10b981" }} />
                <span>Compiler support for Python, Java, C++, JS, and C</span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.92rem", color: "#e2e8f0" }}>
                <FiCheckCircle style={{ color: "#10b981" }} />
                <span>Multiple test cases validating time and space limits</span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.92rem", color: "#e2e8f0" }}>
                <FiCpu style={{ color: "#10b981" }} />
                <span>Leaderboard analytics comparing computational speed</span>
              </li>
            </ul>

            <Link href="/coding" className="btn" style={{ 
              display: "inline-flex", 
              alignItems: "center", 
              gap: "8px",
              background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              boxShadow: "0 4px 15px rgba(16, 185, 129, 0.2)",
              padding: "12px 24px",
              borderRadius: "10px",
              fontWeight: "600",
              fontSize: "0.95rem"
            }}>
              <FiCode />
              <span>Practice Coding Arena</span>
            </Link>
          </div>
        </AnimatedContent>

        {/* Right Side: Code-Rendered Compiler Interface */}
        <AnimatedContent delay={0.25} yOffset={20}>
          <div style={{
            position: "relative",
            borderRadius: "16px",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            background: "rgba(6, 8, 20, 0.95)",
            padding: "20px 24px",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px rgba(16, 185, 129, 0.08)",
            fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
            fontSize: "0.8rem",
            color: "#a9b1d6",
            textAlign: "left"
          }}>
            {/* Top Bar controls */}
            <div style={{ display: "flex", gap: "6px", marginBottom: "16px", paddingBottom: "10px", borderBottom: "1px solid rgba(255, 255, 255, 0.05)" }}>
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ef4444" }} />
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#f59e0b" }} />
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#10b981" }} />
              <span style={{ marginLeft: "12px", fontSize: "0.72rem", color: "var(--text-secondary)" }}>two_sum.cpp</span>
            </div>

            {/* Code lines */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", lineHeight: "1.45" }}>
              <div><span style={{ color: "#f7768e" }}>#include</span> <span style={{ color: "#9ece6a" }}>&lt;vector&gt;</span></div>
              <div><span style={{ color: "#f7768e" }}>#include</span> <span style={{ color: "#9ece6a" }}>&lt;unordered_map&gt;</span></div>
              <div style={{ color: "#7aa2f7" }}>class <span style={{ color: "#e0af68" }}>Solution</span> &#123;</div>
              <div style={{ paddingLeft: "16px" }}><span style={{ color: "#7aa2f7" }}>public</span>:</div>
              <div style={{ paddingLeft: "32px" }}><span style={{ color: "#bb9af7" }}>std::vector&lt;int&gt;</span> <span style={{ color: "#7de0ad" }}>twoSum</span>(<span style={{ color: "#bb9af7" }}>std::vector&lt;int&gt;</span>& nums, <span style={{ color: "#bb9af7" }}>int</span> target) &#123;</div>
              <div style={{ paddingLeft: "48px" }}><span style={{ color: "#bb9af7" }}>std::unordered_map&lt;int, int&gt;</span> Map;</div>
              <div style={{ paddingLeft: "48px" }}><span style={{ color: "#f7768e" }}>for</span> (<span style={{ color: "#bb9af7" }}>int</span> i = 0; i &lt; nums.size(); ++i) &#123;</div>
              <div style={{ paddingLeft: "64px" }}><span style={{ color: "#bb9af7" }}>int</span> complement = target - nums[i];</div>
              <div style={{ paddingLeft: "64px" }}><span style={{ color: "#f7768e" }}>if</span> (Map.count(complement)) &#123;</div>
              <div style={{ paddingLeft: "80px" }}><span style={{ color: "#f7768e" }}>return</span> &#123;Map[complement], i&#125;;</div>
              <div style={{ paddingLeft: "64px" }}><span style={{ color: "#737aa2" }}>&#125;</span></div>
              <div style={{ paddingLeft: "64px" }}>Map[nums[i]] = i;</div>
              <div style={{ paddingLeft: "48px" }}><span style={{ color: "#737aa2" }}>&#125;</span></div>
              <div style={{ paddingLeft: "48px" }}><span style={{ color: "#f7768e" }}>return</span> &#123;&#125;;</div>
              <div style={{ paddingLeft: "32px" }}><span style={{ color: "#737aa2" }}>&#125;</span></div>
              <div style={{ paddingLeft: "16px" }}><span style={{ color: "#737aa2" }}>&#125;;</span></div>
            </div>

            {/* Run Output */}
            <div style={{ marginTop: "16px", paddingTop: "12px", borderTop: "1px solid rgba(255, 255, 255, 0.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "#10b981", fontSize: "0.75rem", fontWeight: "600" }}>✓ 3/3 Test Cases Passed</span>
              <span style={{ fontSize: "0.7rem", color: "var(--text-secondary)" }}>Runtime: 4 ms</span>
            </div>
          </div>
        </AnimatedContent>

      </div>
    </section>
  );
}
