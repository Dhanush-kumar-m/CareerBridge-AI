export default function ResumeTemplateCard({
  template,
}) {
  return (
    <div className="template-card">

      <div className="template-top">

        <span className="template-badge">
          ATS Friendly
        </span>

        <span className="template-category">
          {template.category || "Professional"}
        </span>

      </div>

      <div className="template-preview">

        <div className="preview-header"></div>

        <div className="preview-line"></div>

        <div className="preview-line short"></div>

        <div className="preview-line"></div>

        <div className="preview-section">
          <div className="preview-line"></div>
          <div className="preview-line short"></div>
        </div>

        <div className="preview-section">
          <div className="preview-line"></div>
          <div className="preview-line"></div>
        </div>

      </div>

      <div className="template-content">

        <h3>
          {template.name}
        </h3>

        <p>
          {template.description}
        </p>

      </div>

      <div className="template-footer">

        <div className="template-rating">
          ⭐ {template.rating || "4.9"}
        </div>

        <button className="resume-btn">
          Use Template
        </button>

      </div>

    </div>
  );
}