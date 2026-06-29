"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  FiUploadCloud,
  FiCheckCircle,
  FiAlertTriangle,
  FiFileText,
  FiCpu,
  FiDownload,
  FiRefreshCw,
  FiCheck,
  FiX,
  FiTrendingUp,
  FiBriefcase,
  FiActivity,
  FiLayers,
  FiEye,
  FiSettings,
  FiBookOpen,
  FiAward
} from "react-icons/fi";

const companyRequirements = {
  google: {
    name: "Google",
    cutoff: 85,
    skills: ["Java", "Python", "C++", "Algorithms", "Git"],
    keywords: ["distributed systems", "scalability", "complexity analysis", "multithreading"],
    project: "High-performance distributed key-value store or a complex graph-based routing engine."
  },
  microsoft: {
    name: "Microsoft",
    cutoff: 85,
    skills: ["C++", "Algorithms", "Git", "Docker"],
    keywords: ["cloud services", "object-oriented design", "async programming", "concurrency"],
    project: "Multi-threaded server application or a custom compilers scanner built in C++."
  },
  amazon: {
    name: "Amazon",
    cutoff: 85,
    skills: ["Node.js", "Java", "React", "AWS", "Git"],
    keywords: ["microservices", "leadership principles", "system scalability", "api design"],
    project: "Scalable e-commerce backend with AWS deployment or an optimized task scheduler."
  },
  oracle: {
    name: "Oracle",
    cutoff: 80,
    skills: ["Java", "SQL", "Database", "Git"],
    keywords: ["query optimization", "pl/sql", "relational database", "enterprise security"],
    project: "Custom database management engine or a secure REST API with transaction handling."
  },
  adobe: {
    name: "Adobe",
    cutoff: 82,
    skills: ["C++", "Algorithms", "Python", "Git"],
    keywords: ["data structures", "image processing", "multithreading", "memory optimization"],
    project: "Vector graphic editor app or a multithreaded rendering pipe."
  },
  zoho: {
    name: "Zoho",
    cutoff: 78,
    skills: ["Java", "React", "C", "MySQL"],
    keywords: ["application layers", "data modeling", "mvc architecture", "rest endpoints"],
    project: "Full-stack customer relation app (CRM) using MVC design patterns."
  },
  tcs: {
    name: "TCS",
    cutoff: 60,
    skills: ["Java", "Python", "C", "HTML", "CSS"],
    keywords: ["programming basics", "database schemas", "communication skills", "sdlc"],
    project: "Personal portfolio website or a basic inventory management system."
  },
  infosys: {
    name: "Infosys",
    cutoff: 62,
    skills: ["Python", "Java", "JavaScript", "HTML", "CSS"],
    keywords: ["logical deduction", "testing", "technical documentation", "agile methodologies"],
    project: "Online ticket reservation system or a basic calculator app with logs."
  },
  wipro: {
    name: "Wipro",
    cutoff: 60,
    skills: ["Java", "Python", "C++", "SQL"],
    keywords: ["coding syntax", "technical support basics", "oop concepts", "data operations"],
    project: "Employee directory tracking tool with database storage."
  },
  accenture: {
    name: "Accenture",
    cutoff: 65,
    skills: ["SQL", "Java", "Git", "HTML"],
    keywords: ["business analysis", "cloud models", "testing workflows", "scripting"],
    project: "Customer billing dashboard or a basic web utility."
  },
  cognizant: {
    name: "Cognizant",
    cutoff: 65,
    skills: ["Java", "SQL", "HTML", "CSS"],
    keywords: ["application support", "code debugging", "requirements gathering", "databases"],
    project: "School administration portal or a basic task manager."
  },
  capgemini: {
    name: "Capgemini",
    cutoff: 65,
    skills: ["Java", "React", "SQL", "Git"],
    keywords: ["software delivery", "agile scrums", "code quality", "api consumption"],
    project: "Weather forecasting web application using open API services."
  },
  hcltech: {
    name: "HCLTech",
    cutoff: 60,
    skills: ["Java", "SQL", "HTML", "CSS"],
    keywords: ["infrastructure support", "system administration", "code syntax", "networking"],
    project: "Network monitoring logs parser or a library database."
  },
  ibm: {
    name: "IBM",
    cutoff: 75,
    skills: ["Python", "Docker", "Git", "AWS"],
    keywords: ["cloud virtualization", "containerization", "cognitive APIs", "ai models"],
    project: "Chatbot service integrating cognitive APIs and hosted on Docker containers."
  },
  deloitte: {
    name: "Deloitte",
    cutoff: 70,
    skills: ["SQL", "Git", "HTML", "CSS"],
    keywords: ["consulting workflows", "risk advisory", "business analytics", "case studies"],
    project: "E-Commerce sales analytics dashboard or business reporting utility."
  },
  ey: {
    name: "EY",
    cutoff: 70,
    skills: ["SQL", "Git", "Python"],
    keywords: ["financial auditing", "compliance guidelines", "data analysis", "reporting"],
    project: "Corporate tax auditing scanner or automated PDF parser."
  }
};

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

  const [selectedCompanyKey, setSelectedCompanyKey] = useState("google");

  const fileInputRef = useRef(null);
  const resultsRef = useRef(null);

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
      
      const hasLinkedin = textLower.includes("linkedin") || textLower.includes("lnkd") || textLower.includes("li.com") || textLower.includes("linkdin");
      const hasGithub = textLower.includes("github") || textLower.includes("git") || textLower.includes("version");
      const validResume = hasLinkedin && hasGithub;

      if (!validResume) {
        setTimeout(() => {
          setIsAnalyzing(false);
          setError("Pls upload the resume my friend 🥺📄✨ (LinkedIn & GitHub profiles required)");
          setIsResume(false);
          setFileName("");
          setTimeout(() => {
            setError("");
          }, 4000);
        }, 1200);
        return;
      }

      const hasName = textLower.includes("name") || textLower.includes("dhanush") || fileNameLower.includes("resume") || fileNameLower.includes("cv") || textLower.length > 100;
      const hasEmail = textLower.includes("email") || textLower.includes("@") || textLower.includes("mail") || textLower.includes(".com");
      const hasSkill = textLower.includes("skill") || textLower.includes("skills") || textLower.includes("abilities") || textLower.includes("technologies") || textLower.includes("languages") || textLower.includes("java") || textLower.includes("react") || textLower.includes("python");
      const hasPhone = textLower.includes("phone") || textLower.includes("mobile") || textLower.includes("number") || textLower.includes("contact") || /\d{5,}/.test(textLower);
      const hasCertificate = textLower.includes("certificate") || textLower.includes("certification") || textLower.includes("certified") || textLower.includes("training");
      const hasSummary = textLower.includes("summary") || textLower.includes("profile") || textLower.includes("objective") || textLower.includes("about") || textLower.length > 200;
      const hasEducation = textLower.includes("education") || textLower.includes("academic") || textLower.includes("university") || textLower.includes("college") || textLower.includes("degree") || textLower.includes("cgpa");

      const missingList = [];
      if (!hasName) missingList.push("name");
      if (!hasEmail) missingList.push("email");
      if (!hasLinkedin) missingList.push("linkedin");
      if (!hasGithub) missingList.push("github");
      if (!hasSkill) missingList.push("skill");
      if (!hasPhone) missingList.push("phone number");
      if (!hasCertificate) missingList.push("certificate");
      if (!hasSummary) missingList.push("summary");
      if (!hasEducation) missingList.push("education");

      setTimeout(() => {
        setIsAnalyzing(false);
        setIsResume(true);

        // 1. Structural Section Completeness (40%)
        let structuralScore = 0;
        const hasProjectsSec = textLower.includes("project") || textLower.includes("projects") || textLower.includes("builds");
        const hasExperienceSec = textLower.includes("experience") || textLower.includes("employment") || textLower.includes("work") || textLower.includes("internship");
        
        if (hasSummary) structuralScore += 8;
        if (hasEducation) structuralScore += 8;
        if (hasSkill) structuralScore += 8;
        if (hasProjectsSec) structuralScore += 8;
        if (hasCertificate) structuralScore += 8;

        // 2. Contact details (20%)
        let contactScore = 0;
        if (hasEmail) contactScore += 5;
        if (hasPhone) contactScore += 5;
        if (hasLinkedin) contactScore += 5;
        if (hasGithub) contactScore += 5;

        // 3. Technical competency checks (30%)
        let techScore = 0;
        const foundSkills = [];
        const missing = [];
        const skillsConfig = [
          { name: "Java", keywords: ["java"] },
          { name: "React", keywords: ["react", "reactjs"] },
          { name: "JavaScript", keywords: ["javascript", "js"] },
          { name: "MySQL", keywords: ["mysql", "sql", "database"] },
          { name: "Node.js", keywords: ["node", "nodejs"] },
          { name: "Git", keywords: ["git", "github"] },
          { name: "Docker", keywords: ["docker", "container"] },
          { name: "REST API", keywords: ["rest api", "apis"] },
          { name: "MongoDB", keywords: ["mongodb", "nosql"] },
          { name: "HTML", keywords: ["html", "html5"] },
          { name: "CSS", keywords: ["css", "css3"] },
          { name: "Python", keywords: ["python"] },
          { name: "AWS", keywords: ["aws", "cloud"] },
          { name: "C++", keywords: ["c++", "cpp"] }
        ];

        skillsConfig.forEach(skill => {
          const matched = skill.keywords.some(k => textLower.includes(k));
          if (matched) {
            foundSkills.push(skill.name);
            if (techScore < 30) techScore += 3;
          } else {
            missing.push(skill.name);
          }
        });

        // 4. Action Verbs (10%)
        let verbScore = 0;
        const actionVerbs = ["developed", "implemented", "designed", "built", "optimized", "engineered", "scaled", "led", "managed", "created"];
        actionVerbs.forEach(v => {
          if (textLower.includes(v)) {
            if (verbScore < 10) verbScore += 1.5;
          }
        });
        verbScore = Math.min(Math.round(verbScore), 10);

        let score = structuralScore + contactScore + techScore + verbScore;
        score = Math.round(Math.min(Math.max(score, 15), 98));
        const readiness = Math.round(Math.min(score + 4, 100));

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

  // Company Specific Evaluation calculations
  const companySpecInfo = useMemo(() => {
    if (!analyzed) return null;
    const req = companyRequirements[selectedCompanyKey];
    
    // Skill match logic
    const matchedSkills = req.skills.filter(s => 
      detectedSkills.some(ds => ds.toLowerCase() === s.toLowerCase())
    );
    const missingSkills = req.skills.filter(s => 
      !detectedSkills.some(ds => ds.toLowerCase() === s.toLowerCase())
    );

    const matchPercent = Math.round((matchedSkills.length / req.skills.length) * 100);
    
    // Resume readiness status based on match percentage & overall ATS score
    let readinessStatus = "Ready for Placement";
    let statusColor = "#10b981";
    if (matchPercent < 50 || atsScore < req.cutoff) {
      readinessStatus = "Critical Update Required";
      statusColor = "#ef4444";
    } else if (matchPercent < 75) {
      readinessStatus = "Needs Optimization";
      statusColor = "#f59e0b";
    }

    return {
      name: req.name,
      cutoff: req.cutoff,
      matchPercent,
      missingSkills,
      missingKeywords: req.keywords, // demo keywords list
      recommendedProject: req.project,
      readinessStatus,
      statusColor
    };

  }, [analyzed, detectedSkills, selectedCompanyKey, atsScore]);

  const downloadAuditReport = () => {
    const reportText = `CAREERBRIDGE AI - ATS RESUME AUDIT REPORT
==================================================
Date Analyzed: ${new Date().toLocaleDateString()}
File Name: ${fileName}

CORE METRICS:
------------
* ATS Match Score: ${atsScore}%
* Placement Readiness Index: ${readinessScore}%

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
    <div className="resume-page" style={{ padding: "10px", maxWidth: "1000px", margin: "0 auto" }}>
      {/* Header */}
      <div className="resume-header" style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ display: "inline-flex", alignItems: "center", gap: "12px", fontSize: "2.2rem", fontWeight: "800", color: "#ffffff" }}>
          <FiFileText style={{ color: "var(--primary)" }} />
          <span>AI Resume Analyzer</span>
        </h1>
        <p style={{ marginTop: "10px", color: "var(--text-secondary)", fontSize: "1.05rem" }}>
          Optimize your resume for campus placements. Drag and drop your file to parse headers, 
          check ATS compatibility, and run company-specific evaluations.
        </p>
      </div>

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
        <div className="completed-toast" style={{
          position: "fixed",
          top: "24px",
          left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(239, 68, 68, 0.9)",
          border: "1px solid rgba(239, 68, 68, 0.4)",
          color: "white",
          padding: "16px 28px",
          borderRadius: "12px",
          boxShadow: "0 10px 25px -5px rgba(239, 68, 68, 0.4)",
          backdropFilter: "blur(8px)",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          gap: "10px"
        }}>
          <FiAlertTriangle size={20} />
          <span style={{ fontWeight: "700" }}>{error}</span>
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
          border: dragActive ? "2px dashed var(--primary)" : "2px dashed rgba(255,255,255,0.15)",
          borderRadius: "20px",
          padding: "60px 30px",
          textAlign: "center",
          background: dragActive ? "rgba(99, 102, 241, 0.05)" : "rgba(255, 255, 255, 0.01)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(5px)",
          transition: "all 0.3s ease",
          cursor: "pointer",
          marginBottom: "40px"
        }}
        onClick={onButtonClick}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "15px" }}>
          <div style={{
            width: "70px",
            height: "70px",
            borderRadius: "50%",
            background: "rgba(99, 102, 241, 0.1)",
            color: "var(--primary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "10px"
          }}>
            {isAnalyzing ? (
              <FiRefreshCw size={32} className="spin-loader" style={{ animation: "spin 1.5s linear infinite" }} />
            ) : (
              <FiUploadCloud size={32} />
            )}
          </div>

          <h2 style={{ fontSize: "1.4rem", fontWeight: "700", margin: 0, color: "#ffffff" }}>
            {isAnalyzing ? "Analyzing Document Content..." : "Drag & Drop Resume File"}
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", maxWidth: "550px", margin: "0 auto", lineHeight: "1.6" }}>
            {isAnalyzing ? "Checking formatting structures, layout alignments, and technical keyword densities..." : "Supports PDF, DOC, and DOCX formats. Scans for contacts, summary clarity, education fields, and required keywords."}
          </p>

          {!isAnalyzing && (
            <button className="start-practice-badge-btn" style={{ marginTop: "10px", pointerEvents: "none" }}>
              Browse Files
            </button>
          )}

          {fileName && !isAnalyzing && (
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginTop: "15px", padding: "8px 16px", borderRadius: "8px", background: "rgba(16, 185, 129, 0.1)", color: "#10b981", fontWeight: "700", fontSize: "0.9rem" }}>
              <FiCheckCircle />
              <span>Loaded: {fileName}</span>
            </div>
          )}
        </div>
      </div>

      {/* Analysis Results View */}
      {analyzed && isResume && !isAnalyzing && (
        <div ref={resultsRef} style={{ animation: "fadeIn 0.5s ease" }}>
          
          {/* Score Circle Indicators */}
          <div className="score-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "25px", marginBottom: "35px" }}>
            
            {/* ATS Score Card */}
            <div className="ats-card" style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "30px", borderRadius: "20px", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <h2 style={{ fontSize: "1.1rem", color: "var(--text-secondary)", fontWeight: "600", margin: 0 }}>ATS Match Score</h2>
              <div style={{
                position: "relative",
                width: "130px",
                height: "130px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #6366f1 0%, #a78bfa 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 10px 25px rgba(99, 102, 241, 0.2)",
                margin: "20px 0"
              }}>
                <span style={{ fontSize: "2.2rem", fontWeight: "800", color: "#ffffff" }}>{atsScore}</span>
              </div>
              <span style={{ fontSize: "0.9rem", color: atsScore >= 75 ? "#10b981" : "#f59e0b", fontWeight: "700" }}>
                {atsScore >= 85 ? "Excellent ATS Score" : atsScore >= 70 ? "Good ATS Score" : "Layout Optimization Suggested"}
              </span>
            </div>

            {/* Job Readiness Card */}
            <div className="ats-card" style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "30px", borderRadius: "20px", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <h2 style={{ fontSize: "1.1rem", color: "var(--text-secondary)", fontWeight: "600", margin: 0 }}>Placement Readiness</h2>
              <div style={{
                position: "relative",
                width: "130px",
                height: "130px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #10b981 0%, #06b6d4 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 10px 25px rgba(16, 185, 129, 0.2)",
                margin: "20px 0"
              }}>
                <span style={{ fontSize: "2.2rem", fontWeight: "800", color: "#ffffff" }}>{readinessScore}%</span>
              </div>
              <span style={{ fontSize: "0.9rem", color: "#10b981", fontWeight: "700" }}>Interview Ready</span>
            </div>

          </div>

          {/* Company-Specific Analysis Section */}
          <div className="analysis-card" style={{ padding: "25px", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "20px", marginBottom: "30px" }}>
            <h3 style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "1.3rem", fontWeight: "700", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "12px", marginBottom: "20px", color: "#ffffff" }}>
              <FiBriefcase style={{ color: "var(--primary)" }} />
              <span>Company-Specific Placement Analysis</span>
            </h3>

            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "25px" }}>
              <span style={{ fontSize: "0.92rem", color: "var(--text-secondary)" }}>Select Recruiter to Match:</span>
              <select 
                value={selectedCompanyKey} 
                onChange={(e) => setSelectedCompanyKey(e.target.value)}
                style={{
                  background: "rgba(0,0,0,0.3)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#ffffff",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  fontSize: "0.9rem",
                  cursor: "pointer",
                  fontWeight: "600"
                }}
              >
                {Object.keys(companyRequirements).map((key) => (
                  <option key={key} value={key}>{companyRequirements[key].name}</option>
                ))}
              </select>
            </div>

            {companySpecInfo && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "25px" }}>
                
                {/* Specific stats */}
                <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                  <div style={{ padding: "15px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "10px" }}>
                    <h5 style={{ margin: "0 0 5px 0", color: "var(--text-secondary)", fontSize: "0.8rem", textTransform: "uppercase" }}>Skill Match Percentage</h5>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <strong style={{ fontSize: "1.6rem", color: "#ffffff" }}>{companySpecInfo.matchPercent}%</strong>
                      <span style={{ fontSize: "0.82rem", color: companySpecInfo.matchPercent >= 75 ? "#10b981" : "#f59e0b" }}>
                        ({companySpecInfo.matchPercent >= 75 ? "Excellent Skills Match" : "Keywords Optimization Recommended"})
                      </span>
                    </div>
                  </div>

                  <div style={{ padding: "15px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "10px" }}>
                    <h5 style={{ margin: "0 0 5px 0", color: "var(--text-secondary)", fontSize: "0.8rem", textTransform: "uppercase" }}>Resume Readiness Status</h5>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span className="dot" style={{ width: "8px", height: "8px", borderRadius: "50%", background: companySpecInfo.statusColor }}></span>
                      <strong style={{ color: "#ffffff", fontSize: "1.1rem" }}>{companySpecInfo.readinessStatus}</strong>
                    </div>
                  </div>
                </div>

                {/* Missing & Recommendations */}
                <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                  <div style={{ padding: "15px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "10px" }}>
                    <h5 style={{ margin: "0 0 8px 0", color: "var(--text-secondary)", fontSize: "0.8rem", textTransform: "uppercase" }}>Missing Skills / Keywords</h5>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                      {companySpecInfo.missingSkills.map((s) => (
                        <span key={s} style={{ fontSize: "0.78rem", background: "rgba(239, 68, 68, 0.08)", color: "#f87171", border: "1px solid rgba(239, 68, 68, 0.2)", padding: "2px 8px", borderRadius: "4px" }}>
                          {s}
                        </span>
                      ))}
                      {companySpecInfo.missingSkills.length === 0 && (
                        <span style={{ fontSize: "0.82rem", color: "#10b981", fontWeight: "700" }}>All required skills present!</span>
                      )}
                    </div>
                  </div>

                  <div style={{ padding: "15px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "10px" }}>
                    <h5 style={{ margin: "0 0 5px 0", color: "var(--text-secondary)", fontSize: "0.8rem", textTransform: "uppercase" }}>Recommended Projects</h5>
                    <p style={{ margin: 0, fontSize: "0.86rem", color: "#cbd5e1", lineHeight: "1.4" }}>
                      {companySpecInfo.recommendedProject}
                    </p>
                  </div>
                </div>

              </div>
            )}
          </div>

          {/* Section Compliance Check */}
          <div className="analysis-card" style={{ padding: "25px", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "20px", marginBottom: "30px" }}>
            <h3 style={{ fontSize: "1.2rem", fontWeight: "700", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "12px", marginBottom: "15px", color: "#ffffff" }}>
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
                  border: "1px solid rgba(255,255,255,0.05)"
                }}>
                  <span style={{ fontSize: "0.9rem", textTransform: "capitalize", fontWeight: "600", color: "#ffffff" }}>{secKey}</span>
                  {sections[secKey] ? (
                    <span style={{ color: "#10b981", fontSize: "0.85rem", fontWeight: "bold" }}>PASSED</span>
                  ) : (
                    <span style={{ color: "#ef4444", fontSize: "0.85rem", fontWeight: "bold" }}>MISSING</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Strengths and Focus items */}
          <div className="analysis-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "25px", marginBottom: "30px" }}>
            
            {/* Strengths Card */}
            <div className="analysis-card" style={{ padding: "25px", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "20px" }}>
              <h3 style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "1.2rem", fontWeight: "700", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "12px", marginBottom: "15px", color: "#10b981" }}>
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
            <div className="analysis-card" style={{ padding: "25px", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "20px" }}>
              <h3 style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "1.2rem", fontWeight: "700", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "12px", marginBottom: "15px", color: "#f59e0b" }}>
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

          {/* Detected Skills list */}
          <div className="analysis-card" style={{ padding: "25px", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "20px", marginBottom: "25px" }}>
            <h3 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "15px", display: "flex", alignItems: "center", gap: "8px", color: "#ffffff" }}>
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
          <div className="analysis-card" style={{ padding: "25px", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "20px", marginBottom: "40px" }}>
            <h3 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "15px", display: "flex", alignItems: "center", gap: "8px", color: "#ffffff" }}>
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
              <h4 style={{ margin: 0, fontSize: "1rem", fontWeight: "700", color: "#ffffff" }}>ATS Audit Report</h4>
              <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-secondary)" }}>Save compliance logs, parsed tech keywords list, and key metrics report.</p>
              <button className="start-practice-badge-btn" onClick={downloadAuditReport} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", marginTop: "10px", width: "100%" }}>
                <FiDownload />
                <span>Download ATS Audit Report</span>
              </button>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="resume-actions" style={{ display: "flex", justifyContent: "center", gap: "15px", marginTop: "30px" }}>
            <button className="start-practice-badge-btn" onClick={() => { setFileName(""); setAnalyzed(false); }} style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
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
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .upload-card:hover {
          border-color: var(--primary) !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(99, 102, 241, 0.15) !important;
          background: rgba(255, 255, 255, 0.02) !important;
        }
      `}</style>
    </div>
  );
}