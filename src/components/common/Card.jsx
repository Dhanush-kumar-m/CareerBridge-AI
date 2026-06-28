export default function Card({
  title,
  subtitle,
  children,
  icon,
}) {
  return (
    <div className="common-card">

      {(title || icon) && (
        <div className="card-header">

          {icon && (
            <span className="card-icon">
              {icon}
            </span>
          )}

          <div>

            {title && (
              <h3 className="card-title">
                {title}
              </h3>
            )}

            {subtitle && (
              <p className="card-subtitle">
                {subtitle}
              </p>
            )}

          </div>

        </div>
      )}

      <div className="card-content">

        {children}

      </div>

    </div>
  );
}