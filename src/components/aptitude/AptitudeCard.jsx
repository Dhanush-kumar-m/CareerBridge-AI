import Link from "next/link";

export default function AptitudeCard({
  title,
  description,
  href,
  icon,
}) {
  return (
    <Link
      href={href}
      className="aptitude-card"
    >

      <div className="aptitude-card-top">

        <div className="aptitude-icon">
          {icon}
        </div>

      </div>

      <h3>
        {title}
      </h3>

      <p>
        {description}
      </p>

      <div className="aptitude-footer">

        <span>
          Start Practice →
        </span>

      </div>

    </Link>
  );
}