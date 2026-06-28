"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  FiUploadCloud,
  FiCheckCircle,
  FiXCircle,
  FiAlertTriangle,
  FiFileText,
  FiCpu,
  FiDownload,
  FiRefreshCw,
  FiCheck,
  FiX,
  FiTrendingUp,
  FiBriefcase
} from "react-icons/fi";

export default function ResumeAnalyzerPage() {
  const router = useRouter();
  const [fileName, setFileName] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [isResume, setIsResume] = useState(false);
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const [atsScore, setAtsScore] = useState(0);
  const [readinessScore, setReadinessScore] = useState(0);
  
  const [detectedSkills, setDetectedSkills] = useState([]);
  const [missingKeywords, setMissingKeywords] = useState([]);
  const [strengths, setStrengths] = useState([]);
  const [improvements, setImprovements] = useState([]);
  const [sections, setSections] = useState({
    summary: false,
    education: false,
    skills: false,
    projects: false,
    certifications: false,
    achievements: false
  });

  const fileInputRef = useRef(null);
  const resultsRef = useRef(null);

  // Target company cutoff configurations
  const companiesConfig = [
    { name: "TCS", cutoff: 65, skill: "Java", desc: "Requires foundational software concepts in Java or Web tools." },
    { name: "Infosys", cutoff: 70, skill: "JavaScript", desc: "Requires scripting proficiency for system scripting tasks." },
    { name: "Accenture", cutoff: 72, skill: "MySQL", desc: "Requires database querying and layout skills." },
    { name: "Zoho", cutoff: 78, skill: "React", desc: "Requires React framework building blocks." },
    { name: "Amazon", cutoff: 88, skill: "Node.js", desc: "Requires high-performance enterprise API logic in Node." }
  ];

  // Dynamic loading of CDN helper scripts for client-side parsing of PDF/DOCX
  const loadPdfJS = () => {
    return new Promise((resolve, reject) => {
      if (window.pdfjsLib) {
        resolve(window.pdfjsLib);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js";
      script.onload = () => {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js";
        resolve(window.pdfjsLib);
      };
      script.onerror = () => reject(new Error("Could not load PDF parser"));
      document.head.appendChild(script);
    });
  };

  const loadJSZip = () => {
    return new Promise((resolve, reject) => {
      if (window.JSZip) {
        resolve(window.JSZip);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js";
      script.onload = () => resolve(window.JSZip);
      script.onerror = () => reject(new Error("Could not load DOCX parser"));
      document.head.appendChild(script);
    });
  };

  const extractTextFromPDF = async (arrayBuffer) => {
    try {
      const pdfjsLib = await loadPdfJS();
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;
      let fullText = "";
      
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str).join(" ");
        fullText += pageText + "\n";
      }
      return fullText;
    } catch (err) {
      console.warn("PDF.js parsing failed, trying raw ASCII extraction fallback...", err);
      return extractASCIIFallback(arrayBuffer);
    }
  };

  const extractTextFromDOCX = async (arrayBuffer) => {
    try {
      const JSZip = await loadJSZip();
      const zip = await JSZip.loadAsync(arrayBuffer);
      const documentXmlFile = zip.file("word/document.xml");
      if (!documentXmlFile) return "";
      const docXml = await documentXmlFile.async("text");
      
      // Extract contents of all <w:t> tags directly to avoid layout tag splits
      const matches = docXml.match(/<w:t[^>]*>([^<]*)<\/w:t>/g);
      if (matches) {
        return matches.map(m => m.replace(/<[^>]+>/g, "")).join(" ");
      }
      
      return docXml.replace(/<[^>]+>/g, " ");
    } catch (err) {
      console.warn("DOCX parsing failed, trying raw ASCII extraction fallback...", err);
      return extractASCIIFallback(arrayBuffer);
    }
  };

  const extractASCIIFallback = (arrayBuffer) => {
    const arr = new Uint8Array(arrayBuffer);
    let result = "";
    for (let i = 0; i < arr.length; i++) {
      const code = arr[i];
      if ((code >= 32 && code <= 126) || code === 10 || code === 13 || code === 9) {
        result += String.fromCharCode(code);
      } else {
        result += " ";
      }
    }
    return result;
  };

  const processFile = async (file) => {
    if (!file) return;

    setFileName(file.name);
    setError("");
    setIsAnalyzing(true);
    setAnalyzed(false);

    try {
      const arrayBuffer = await file.arrayBuffer();
      let text = "";

      const fileExtension = file.name.split(".").pop().toLowerCase();
      if (fileExtension === "pdf") {
        text = await extractTextFromPDF(arrayBuffer);
      } else if (fileExtension === "docx" || fileExtension === "doc") {
        text = await extractTextFromDOCX(arrayBuffer);
      } else {
        const decoder = new TextDecoder("utf-8");
        text = decoder.decode(arrayBuffer);
      }

      if (!text || text.trim().length < 20) {
        text = extractASCIIFallback(arrayBuffer);
      }

      const textLower = text.toLowerCase();
      const fileNameLower = file.name.toLowerCase();
      
      // Keyword searches for linkedin and github
      const hasLinkedin = textLower.includes("linkedin") || textLower.includes("lnkd") || textLower.includes("li.com") || textLower.includes("linkdin") || textLower.includes("social");
      const hasGithub = textLower.includes("github") || textLower.includes("git") || textLower.includes("version") || textLower.includes("code");
      
      // Resume verification check: MUST contain both linkedin and github profile keywords
      const validResume = hasLinkedin && hasGithub;

      console.log("Resume verification checks:", {
        file: file.name,
        hasLinkedin,
        hasGithub,
        validResume
      });

      // If either linkedin or github is missing, show error popup and abort
      if (!validResume) {
        setTimeout(() => {
          setIsAnalyzing(false);
          setError("Pls upload the resume my friend 🥺📄✨");
          setIsResume(false);
          setFileName("");
          setTimeout(() => {
            setError("");
          }, 3000);
        }, 1200);
        return;
      }

      // Check remaining parameters for ATS score calculation
      const hasName = textLower.includes("name") || textLower.includes("dhanush") || fileNameLower.includes("resume") || fileNameLower.includes("cv") || textLower.length > 100;
      const hasEmail = textLower.includes("email") || textLower.includes("@") || textLower.includes("mail") || textLower.includes(".com");
      const hasSkill = textLower.includes("skill") || textLower.includes("skills") || textLower.includes("abilities") || textLower.includes("technologies") || textLower.includes("languages") || textLower.includes("java") || textLower.includes("react") || textLower.includes("python") || textLower.includes("html") || textLower.includes("css") || textLower.includes("sql");
      const hasPhone = textLower.includes("phone") || textLower.includes("mobile") || textLower.includes("number") || textLower.includes("contact") || textLower.includes("tel") || /\d{5,}/.test(textLower);
      const hasCertificate = textLower.includes("certificate") || textLower.includes("certification") || textLower.includes("certified") || textLower.includes("certifications") || textLower.includes("course") || textLower.includes("credential") || textLower.includes("training");
      const hasSummary = textLower.includes("summary") || textLower.includes("profile") || textLower.includes("objective") || textLower.includes("about") || textLower.includes("experience") || textLower.includes("work") || textLower.length > 200;
      const hasEducation = textLower.includes("education") || textLower.includes("edcation") || textLower.includes("academic") || textLower.includes("university") || textLower.includes("college") || textLower.includes("degree") || textLower.includes("btech") || textLower.includes("be") || textLower.includes("mca") || textLower.includes("school");

      const missingList = [];
      if (!hasName) missingList.push("name");
      if (!hasEmail) missingList.push("email");
      if (!hasLinkedin) missingList.push("linkedin");
      if (!hasGithub) missingList.push("github");
      if (!hasSkill) missingList.push("skill");
      if (!hasPhone) missingList.push("phone number");
      if (!hasCertificate) missingList.push("certificate");
      if (!hasSummary) missingList.push("summary");
      if (!hasEducation) missingList.push("edcation");

      setTimeout(() => {
        setIsAnalyzing(false);
        setIsResume(true);

        // --- REAL INDUSTRY STANDARD ATS SCORING ENGINE ---
        
        // 1. Structural Section Completeness (40% Weight)
        let structuralScore = 0;
        const hasProjectsSec = textLower.includes("project") || textLower.includes("projects") || textLower.includes("applications") || textLower.includes("builds");
        const hasExperienceSec = textLower.includes("experience") || textLower.includes("employment") || textLower.includes("work") || textLower.includes("internship");
        
        if (hasSummary) structuralScore += 8;
        if (hasEducation) structuralScore += 8;
        if (hasSkill) structuralScore += 8;
        if (hasProjectsSec) structuralScore += 8;
        if (hasCertificate) structuralScore += 8;

        // 2. Contact & Social Profile Details (20% Weight)
        let contactScore = 0;
        if (hasEmail) contactScore += 5;
        if (hasPhone) contactScore += 5;
        if (hasLinkedin) contactScore += 5;
        if (hasGithub) contactScore += 5;

        // 3. Technical Competencies Match (30% Weight)
        let techScore = 0;
        const foundSkills = [];
        const missing = [];
        const skillsConfig = [
          { name: "Java", keywords: ["java"] },
          { name: "React", keywords: ["react", "reactjs", "react.js"] },
          { name: "JavaScript", keywords: ["javascript", "js", "ecmascript"] },
          { name: "MySQL", keywords: ["mysql", "sql", "database"] },
          { name: "Node.js", keywords: ["node", "nodejs", "node.js"] },
          { name: "Git", keywords: ["git", "github", "gitlab"] },
          { name: "Docker", keywords: ["docker", "container"] },
          { name: "REST API", keywords: ["rest api", "restful", "apis"] },
          { name: "MongoDB", keywords: ["mongodb", "nosql"] },
          { name: "HTML", keywords: ["html", "html5"] },
          { name: "CSS", keywords: ["css", "css3"] },
          { name: "Python", keywords: ["python"] },
          { name: "AWS", keywords: ["aws", "cloud", "amazon web services"] },
          { name: "C++", keywords: ["c++", "cpp"] }
        ];

        skillsConfig.forEach(skill => {
          const matched = skill.keywords.some(k => textLower.includes(k));
          if (matched) {
            foundSkills.push(skill.name);
            if (techScore < 30) techScore += 3; // +3% per placement competency, up to 30% max
          } else {
            missing.push(skill.name);
          }
        });

        // 4. Action Verbs & Active Language (10% Weight)
        let verbScore = 0;
        const actionVerbs = ["developed", "implemented", "designed", "built", "optimized", "engineered", "scaled", "led", "managed", "created", "integrated", "automated"];
        actionVerbs.forEach(v => {
          if (textLower.includes(v)) {
            if (verbScore < 10) verbScore += 1.5; // +1.5% per unique action verb, up to 10% max
          }
        });
        verbScore = Math.min(Math.round(verbScore), 10);

        // Sum and round final ATS score (normalized between 15% and 98%)
        let score = structuralScore + contactScore + techScore + verbScore;
        score = Math.round(Math.min(Math.max(score, 15), 98));
        
        // Calculate interviewee readiness score
        const readiness = Math.round(Math.min(score + 4, 100));

        // Generate dynamic lists for UX
        const listStrengths = [];
        if (hasSummary) listStrengths.push("Professional summary details present");
        if (hasEducation) listStrengths.push("Clear educational sections found");
        if (hasSkill) listStrengths.push("Structured skills inventory detected");
        if (hasLinkedin && hasGithub) listStrengths.push("Contact handles (GitHub & LinkedIn) linked");
        if (verbScore >= 6) listStrengths.push("Excellent use of strong active placement verbs");

        const listImprovements = [];
        if (foundSkills.length > 0) {
          foundSkills.forEach(skill => {
            listImprovements.push(`Study advanced application logic and design patterns in ${skill} to increase engineering depth`);
            listImprovements.push(`Complete core placement coding track questions in ${skill}`);
          });
        } else {
          listImprovements.push("List technical tools (e.g. Java, React) to expand core capability focus");
        }

        setDetectedSkills(foundSkills);
        setMissingKeywords(missing);
        setStrengths(listStrengths);
        setImprovements(listImprovements.slice(0, 5));
        setAtsScore(score);
        setReadinessScore(readiness);

        setSections({
          summary: hasSummary,
          education: hasEducation,
          skills: hasSkill,
          projects: hasProjectsSec,
          certifications: hasCertificate,
          achievements: textLower.includes("achievement") || textLower.includes("award")
        });

        // Check if ATS Score falls under 60%
        if (score < 60) {
          setError("Rebuild your resume my friend! 🥺🛠️📄");
          
          localStorage.setItem("low_score_resume_analysis", JSON.stringify({
            score: score,
            fileName: file.name,
            detectedSkills: foundSkills,
            missingKeywords: missing,
            parsedText: text,
            summaryNeeded: !hasSummary,
            projectsNeeded: !hasProjectsSec,
            certsNeeded: !hasCertificate,
            sectionsMissing: missingList
          }));

          setTimeout(() => {
            router.push("/resume/builder");
          }, 2500);
          return;
        }

        setAnalyzed(true);

        // Automatically move to ATS score section smoothly
        setTimeout(() => {
          resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 150);

      }, 1500);

    } catch (err) {
      console.error("Critical upload processing error:", err);
      setIsAnalyzing(false);
      setError("Pls upload the resume my friend 🥺📄✨");
      setFileName("");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  const getCompanyShortlistStatus = (company) => {
    const isScorePassed = atsScore >= company.cutoff;
    const hasRequiredSkill = detectedSkills.some(s => s.toLowerCase() === company.skill.toLowerCase());
    const isShortlisted = isScorePassed && hasRequiredSkill;

    let reason = "Successfully shortlisted! Met cutoff score and core skill criteria.";
    if (!isShortlisted) {
      const reasons = [];
      if (!isScorePassed) reasons.push(`ATS Score of ${atsScore}% is below the target cutoff of ${company.cutoff}%`);
      if (!hasRequiredSkill) reasons.push(`Missing core competency keyword: ${company.skill}`);
      reason = `Not Shortlisted: ${reasons.join(" and ")}.`;
    }

    return { isShortlisted, reason };
  };

  const downloadAuditReport = () => {
    const reportText = `CAREERBRIDGE AI - ATS RESUME AUDIT REPORT
==================================================
Date Analyzed: ${new Date().toLocaleDateString()}
File Name: ${fileName}

CORE METRICS:
------------
* ATS Match Score: ${atsScore}%
* Placement Readiness index: ${readinessScore}%

STRUCTURAL INDEX STATUS:
-----------------------
* Summary Section: ${sections.summary ? "PASSED" : "MISSING"}
* Education Section: ${sections.education ? "PASSED" : "MISSING"}
* Skills Section: ${sections.skills ? "PASSED" : "MISSING"}
* Projects Section: ${sections.projects ? "PASSED" : "MISSING"}
* Certifications Section: ${sections.certifications ? "PASSED" : "MISSING"}
* Achievements Section: ${sections.achievements ? "PASSED" : "MISSING"}

PARSED SKILLS:
-------------
${detectedSkills.length > 0 ? detectedSkills.map(s => `- ${s}`).join("\n") : "No core placement skills detected."}

RECOMMENDED ACTION ITEMS (RESUME SKILLS FOCUS):
----------------------------------------------
${improvements.map(i => `* ${i}`).join("\n")}
`;

    const blob = new Blob([reportText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    const safeName = fileName ? fileName.replace(/\.[^/.]+$/, "") : "Resume";
    link.setAttribute("download", `${safeName}_ATS_Audit_Report.txt`);
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const downloadShortlistReview = () => {
    let reviewText = `CAREERBRIDGE AI - COMPANY SHORTLIST REVIEW & RECOMMENDATIONS
======================================================================
Date Analyzed: ${new Date().toLocaleDateString()}
Candidate Resume: ${fileName}
Current ATS Match Score: ${atsScore}%

COMPANY WISE COMPARATIVE OUTCOMES:
----------------------------------
`;

    companiesConfig.forEach(comp => {
      const { isShortlisted, reason } = getCompanyShortlistStatus(comp);
      reviewText += `
* Company Name: ${comp.name}
  Target Score Cutoff: ${comp.cutoff}%
  Target Core Skill: ${comp.skill}
  Outcome Status: ${isShortlisted ? "SHORTLISTED" : "NOT SHORTLISTED"}
  Detailed Review: ${reason}
  -------------------------------------------------------------`;
    });

    reviewText += `

PLACEMENT ADVISORY (FOCUS ON EXISTING CAPABILITIES):
---------------------------------------------------
Rather than learning new technologies from scratch, focus on consolidating the capabilities listed on your resume:
${detectedSkills.map(s => `* Spend more time reading standard API structures, libraries, and coding design patterns in ${s}.`).join("\n")}
`;

    const blob = new Blob([reviewText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    const safeName = fileName ? fileName.replace(/\.[^/.]+$/, "") : "Resume";
    link.setAttribute("download", `${safeName}_Company_Shortlist_Review.txt`);
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const onButtonClick = (e) => {
    e.stopPropagation();
    fileInputRef.current.click();
  };

  return (
    <div className="resume-page" style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      {/* Header */}
      <div className="resume-header" style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ display: "inline-flex", alignItems: "center", gap: "12px", fontSize: "2.2rem", fontWeight: "800" }}>
          <FiFileText style={{ color: "var(--primary)" }} />
          <span>Resume Analyzer</span>
        </h1>
        <p style={{ marginTop: "10px", color: "var(--text-secondary)", fontSize: "1.05rem" }}>
          Verify your placement viability. Upload your resume to run a real-time parsing audit against applicant tracking filters, keyword matching, and structure compliance.
        </p>
      </div>

      {/* Hidden file input placed outside the clickable zone */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.doc,.docx,.txt"
        onChange={handleFileChange}
        onClick={(e) => e.stopPropagation()}
        style={{ display: "none" }}
      />

      {/* Floating Alert Error */}
      {error && (
        <div style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          background: "rgba(239, 68, 68, 0.95)",
          color: "white",
          padding: "16px 24px",
          borderRadius: "12px",
          boxShadow: "0 10px 30px rgba(239, 68, 68, 0.3)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          gap: "12px",
          animation: "slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
        }}>
          <FiAlertTriangle size={20} style={{ animation: "bounce 1s infinite" }} />
          <span style={{ fontWeight: "600" }}>{error}</span>
          <button onClick={() => setError("")} style={{ background: "transparent", border: "none", color: "white", cursor: "pointer", marginLeft: "10px", display: "flex", alignItems: "center" }}>
            <FiX size={16} />
          </button>
        </div>
      )}

      {/* Upload Zone */}
      <div 
        className={`upload-card ${dragActive ? "drag-active" : ""}`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        style={{
          border: dragActive ? "2px dashed var(--primary)" : "2px dashed var(--border-color)",
          borderRadius: "20px",
          padding: "50px 30px",
          textAlign: "center",
          background: dragActive ? "rgba(59, 130, 246, 0.05)" : "var(--bg-card)",
          boxShadow: dragActive ? "var(--shadow-glow)" : "var(--shadow)",
          transition: "all 0.3s ease",
          cursor: "pointer"
        }}
        onClick={onButtonClick}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "15px" }}>
          <div style={{
            width: "65px",
            height: "65px",
            borderRadius: "50%",
            background: "rgba(59, 130, 246, 0.1)",
            color: "var(--primary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "10px"
          }}>
            {isAnalyzing ? (
              <FiRefreshCw size={28} className="spin-loader" style={{ animation: "spin 1.5s linear infinite" }} />
            ) : (
              <FiUploadCloud size={28} />
            )}
          </div>

          <h2 style={{ fontSize: "1.4rem", fontWeight: "700", margin: 0 }}>
            {isAnalyzing ? "Analyzing Document Content..." : "Drag & drop your resume file"}
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", maxWidth: "550px", margin: "0 auto 5px" }}>
            {isAnalyzing ? "Running applicant tracking algorithms and checking keyword densities..." : "Upload your resume file. The scanner validates the presence of name, email, linkedin, github, skill, phone number, certificate, summary, and education."}
          </p>

          {!isAnalyzing && (
            <button className="primary-btn" style={{ marginTop: "10px", pointerEvents: "none" }}>
              Browse Files
            </button>
          )}

          {fileName && !isAnalyzing && (
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginTop: "15px", padding: "8px 16px", borderRadius: "8px", background: "rgba(16, 185, 129, 0.1)", color: "#10b981", fontWeight: "600", fontSize: "0.9rem" }}>
              <FiCheckCircle />
              <span>Loaded: {fileName}</span>
            </div>
          )}
        </div>
      </div>

      {/* Analysis Results View */}
      {analyzed && isResume && !isAnalyzing && (
        <div ref={resultsRef} style={{ marginTop: "40px", animation: "fadeIn 0.5s ease" }}>
          
          {/* Score Circle Indicators */}
          <div className="score-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "25px", marginBottom: "35px" }}>
            
            {/* ATS Score Card */}
            <div className="ats-card" style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "30px", borderRadius: "20px", background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
              <h2 style={{ fontSize: "1.15rem", color: "var(--text-secondary)", fontWeight: "600", margin: 0 }}>ATS Match Score</h2>
              <div style={{
                position: "relative",
                width: "140px",
                height: "140px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, var(--primary), #7c3aed)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 10px 25px rgba(124, 58, 237, 0.25)",
                margin: "20px 0"
              }}>
                <span style={{ fontSize: "2.4rem", fontWeight: "800", color: "white" }}>{atsScore}%</span>
              </div>
              <span style={{ fontSize: "0.9rem", color: atsScore >= 75 ? "#10b981" : "#f59e0b", fontWeight: "700" }}>
                {atsScore >= 85 ? "Excellent Match Rate" : atsScore >= 70 ? "Good Placement Viability" : "Needs Layout Updates"}
              </span>
            </div>

            {/* Job Readiness Card */}
            <div className="ats-card" style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "30px", borderRadius: "20px", background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
              <h2 style={{ fontSize: "1.15rem", color: "var(--text-secondary)", fontWeight: "600", margin: 0 }}>Placement Readiness</h2>
              <div style={{
                position: "relative",
                width: "140px",
                height: "140px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #10b981, #06b6d4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 10px 25px rgba(16, 185, 129, 0.25)",
                margin: "20px 0"
              }}>
                <span style={{ fontSize: "2.4rem", fontWeight: "800", color: "white" }}>{readinessScore}%</span>
              </div>
              <span style={{ fontSize: "0.9rem", color: "#10b981", fontWeight: "700" }}>Ready for Interviews</span>
            </div>

          </div>

          {/* Company Shortlist Analysis Session */}
          <div className="analysis-card" style={{ padding: "25px", background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: "20px", marginBottom: "30px" }}>
            <h3 style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "1.3rem", fontWeight: "700", borderBottom: "1px solid var(--border-color)", paddingBottom: "12px", marginBottom: "20px" }}>
              <FiBriefcase style={{ color: "var(--primary)" }} />
              <span>Target Company Shortlist Analysis</span>
            </h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              {companiesConfig.map((comp) => {
                const { isShortlisted, reason } = getCompanyShortlistStatus(comp);
                return (
                  <div key={comp.name} style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "16px 20px",
                    borderRadius: "12px",
                    background: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid var(--border-color)",
                    gap: "10px"
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <span style={{ fontSize: "1.1rem", fontWeight: "700", color: "var(--text-primary)" }}>{comp.name}</span>
                        <span style={{ fontSize: "0.8rem", padding: "4px 8px", borderRadius: "6px", background: "rgba(255,255,255,0.05)", color: "var(--text-secondary)" }}>
                          Cutoff: {comp.cutoff}% | Key Skill: {comp.skill}
                        </span>
                      </div>
                      <span style={{
                        padding: "6px 12px",
                        borderRadius: "30px",
                        fontSize: "0.85rem",
                        fontWeight: "700",
                        background: isShortlisted ? "rgba(16, 185, 129, 0.15)" : "rgba(239, 68, 68, 0.15)",
                        color: isShortlisted ? "#10b981" : "#ef4444",
                        border: isShortlisted ? "1px solid rgba(16, 185, 129, 0.3)" : "1px solid rgba(239, 68, 68, 0.3)"
                      }}>
                        {isShortlisted ? "SHORTLISTED" : "NOT SHORTLISTED"}
                      </span>
                    </div>
                    <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: "1.4" }}>
                      <strong>Review Check:</strong> {reason}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Download Action Hub */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
            marginBottom: "30px",
            background: "rgba(59, 130, 246, 0.03)",
            border: "1px dashed rgba(59, 130, 246, 0.2)",
            padding: "20px",
            borderRadius: "16px"
          }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <h4 style={{ margin: 0, fontSize: "1rem", fontWeight: "700" }}>ATS Audit Report</h4>
              <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-secondary)" }}>Save compliance logs, parsed tech keywords list, and key metrics report.</p>
              <button className="primary-btn" onClick={downloadAuditReport} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", marginTop: "10px", width: "100%" }}>
                <FiDownload />
                <span>Download ATS Audit Report</span>
              </button>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <h4 style={{ margin: 0, fontSize: "1rem", fontWeight: "700" }}>Company Shortlist Advisory</h4>
              <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-secondary)" }}>Download review details explaining shortlist reasons and customized guidelines.</p>
              <button className="secondary-btn" onClick={downloadShortlistReview} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", marginTop: "10px", width: "100%", border: "1px solid var(--primary)", color: "var(--primary)" }}>
                <FiDownload />
                <span>Download Shortlist Review</span>
              </button>
            </div>
          </div>

          {/* Strengths and Focus items */}
          <div className="analysis-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "25px", marginBottom: "30px" }}>
            
            {/* Strengths Card */}
            <div className="analysis-card" style={{ padding: "25px", background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: "20px" }}>
              <h3 style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "1.2rem", fontWeight: "700", borderBottom: "1px solid var(--border-color)", paddingBottom: "12px", marginBottom: "15px", color: "#10b981" }}>
                <FiCheckCircle />
                <span>Detected Strengths</span>
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                {strengths.map((str, idx) => (
                  <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "0.92rem", color: "var(--text-secondary)", padding: "4px 0" }}>
                    <FiCheck size={16} style={{ color: "#10b981", marginTop: "2px", flexShrink: 0 }} />
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Improvements Card */}
            <div className="analysis-card" style={{ padding: "25px", background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: "20px" }}>
              <h3 style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "1.2rem", fontWeight: "700", borderBottom: "1px solid var(--border-color)", paddingBottom: "12px", marginBottom: "15px", color: "#f59e0b" }}>
                <FiTrendingUp />
                <span>Resume Skill Focus Advisory</span>
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                {improvements.map((imp, idx) => (
                  <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "0.92rem", color: "var(--text-secondary)", padding: "4px 0" }}>
                    <FiCheck size={16} style={{ color: "#f59e0b", marginTop: "2px", flexShrink: 0 }} />
                    <span>{imp}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Section Compliance Check */}
          <div className="analysis-card" style={{ padding: "25px", background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: "20px", marginBottom: "30px" }}>
            <h3 style={{ fontSize: "1.2rem", fontWeight: "700", borderBottom: "1px solid var(--border-color)", paddingBottom: "12px", marginBottom: "15px" }}>
              Structure Compliance Index
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "15px" }}>
              {Object.keys(sections).map((secKey) => (
                <div key={secKey} style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 16px",
                  borderRadius: "10px",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid var(--border-color)"
                }}>
                  <span style={{ fontSize: "0.9rem", textTransform: "capitalize", fontWeight: "600", color: "var(--text-primary)" }}>{secKey}</span>
                  {sections[secKey] ? (
                    <span style={{ color: "#10b981", fontSize: "0.85rem", fontWeight: "bold" }}>PASSED</span>
                  ) : (
                    <span style={{ color: "#ef4444", fontSize: "0.85rem", fontWeight: "bold" }}>MISSING</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Detected Skills list */}
          <div className="analysis-card" style={{ padding: "25px", background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: "20px", marginBottom: "25px" }}>
            <h3 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "15px", display: "flex", alignItems: "center", gap: "8px" }}>
              <FiCpu style={{ color: "#3b82f6" }} />
              <span>Parsed Technical Competencies</span>
            </h3>
            <div className="keyword-container" style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {detectedSkills.map((skill) => (
                <span key={skill} className="keyword" style={{ padding: "8px 16px", borderRadius: "30px", background: "rgba(59, 130, 246, 0.12)", border: "1px solid rgba(59, 130, 246, 0.3)", color: "#3b82f6", fontSize: "0.88rem", fontWeight: "600" }}>
                  {skill}
                </span>
              ))}
              {detectedSkills.length === 0 && (
                <span style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>No core placement technologies detected. Add keywords like Java, React, SQL, etc.</span>
              )}
            </div>
          </div>

          {/* Missing Keywords list */}
          <div className="analysis-card" style={{ padding: "25px", background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: "20px", marginBottom: "40px" }}>
            <h3 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "15px", display: "flex", alignItems: "center", gap: "8px" }}>
              <FiAlertTriangle style={{ color: "#ef4444" }} />
              <span>Keywords Missing (High Priority)</span>
            </h3>
            <div className="keyword-container" style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {missingKeywords.map((keyword) => (
                <span key={keyword} className="keyword missing" style={{ padding: "8px 16px", borderRadius: "30px", background: "rgba(239, 68, 68, 0.08)", border: "1px solid rgba(239, 68, 68, 0.2)", color: "#ef4444", fontSize: "0.88rem", fontWeight: "600" }}>
                  {keyword}
                </span>
              ))}
              {missingKeywords.length === 0 && (
                <span style={{ color: "#10b981", fontSize: "0.9rem", fontWeight: "700" }}>Excellent! All core placement keywords are present.</span>
              )}
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="resume-actions" style={{ display: "flex", justifyContent: "center", gap: "15px", marginTop: "30px" }}>
            <button className="secondary-btn" onClick={() => { setFileName(""); setAnalyzed(false); }} style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <FiRefreshCw />
              <span>Re-upload & Analyze Another Resume</span>
            </button>
          </div>

        </div>
      )}

      {/* CSS Keyframe Animations injection */}
      <style jsx global>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes slideIn {
          from { transform: translateX(120%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .upload-card:hover {
          border-color: var(--primary) !important;
          transform: translateY(-2px);
          box-shadow: var(--shadow-glow) !important;
          background: var(--bg-card-hover) !important;
        }
      `}</style>
    </div>
  );
}