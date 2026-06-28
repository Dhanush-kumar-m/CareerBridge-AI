"use client";

import { useState } from "react";

export default function ResumeUpload() {
  const [file, setFile] = useState(null);

  const handleUpload = (e) => {
    const uploadedFile = e.target.files[0];

    if (uploadedFile) {
      setFile(uploadedFile.name);
    }
  };

  return (
    <div className="resume-upload-card">

      <div className="upload-header">

        <div className="upload-icon">
          📄
        </div>

        <div>
          <h2>Upload Resume</h2>
          <p>
            Upload your resume for ATS analysis
            and improvement suggestions.
          </p>
        </div>

      </div>

      <label className="upload-box">

        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleUpload}
          hidden
        />

        <div className="upload-content">

          <h3>
            📤 Drag & Drop Resume
          </h3>

          <p>
            PDF, DOC, DOCX (Max 5 MB)
          </p>

          <span className="upload-btn">
            Browse Files
          </span>

        </div>

      </label>

      {file && (

        <div className="uploaded-file-card">

          <div className="file-info">
            <span>📄</span>

            <div>
              <h4>{file}</h4>
              <p>Upload Successful</p>
            </div>
          </div>

          <span className="success-badge">
            ✓ Uploaded
          </span>

        </div>

      )}

    </div>
  );
}